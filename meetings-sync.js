/**
 * Sincronização das reuniões com o Firestore.
 *
 * O app continua usando o localStorage como cache (síncrono e rápido). Este arquivo:
 *  - envia (com debounce) cada reunião alterada para a coleção "meetings";
 *  - ao entrar, baixa as reuniões do usuário e mescla com o cache (vence o updated_at mais recente);
 *  - envia reuniões que só existiam neste navegador (migração das reuniões atuais);
 *  - permite que o administrador leia todas as reuniões (visão geral).
 * Se o Firestore estiver indisponível ou as regras ainda não tiverem sido publicadas, o app
 * segue funcionando normalmente só com o localStorage.
 *
 * Carregar depois de meetings-store.js, meeting-partner-store.js e auth-store.js, e antes do app.js.
 */
(function () {
  'use strict';
  if (typeof firebase === 'undefined' || typeof firestoreDb === 'undefined' || typeof firebaseAuth === 'undefined') return;

  const COLLECTION = 'meetings';
  const OWNERS_KEY = 'discovery_meeting_owners';
  const PUSH_DELAY_MS = 1500;
  const timers = {};
  const pending = new Set();
  let currentUser = null;
  let warned = false;

  const readJson = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch (error) { return fallback; } };
  const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const docId = (uid, meetingId) => `${uid}_${meetingId}`;
  const ownerName = (user) => getActiveSession()?.nome || user.displayName || (user.email || '').split('@')[0];

  function warnOnce(error) {
    console.warn('Sincronização de reuniões indisponível:', error);
    if (warned) return;
    warned = true;
    if (typeof showToast === 'function') showToast('Não foi possível sincronizar as reuniões agora. Seus dados continuam salvos neste navegador.');
  }

  function bundleFor(meetingId) {
    const meeting = getMeetingById(meetingId);
    if (!meeting) return null;
    return {
      meeting,
      audit: readJson(AUDIT_STORAGE_KEY, {})[meetingId] || [],
      final_checklist: readJson(FINAL_CHECKLIST_STORAGE_KEY, {})[meetingId] || null,
      report: readJson(REPORT_STORAGE_KEY, {})[meetingId] || {},
      partner: readJson(PARTNER_DATA_KEY, {})[meetingId] || null
    };
  }

  function applyRemote(bundle) {
    const meeting = bundle?.meeting;
    if (!meeting?.id) return;
    const meetings = getMeetings();
    const index = meetings.findIndex((item) => item.id === meeting.id);
    if (index === -1) meetings.push(meeting); else meetings[index] = meeting;
    writeJson(MEETINGS_STORAGE_KEY, meetings);
    const setIn = (key, value, emptyCheck) => {
      const collection = readJson(key, {});
      if (emptyCheck) delete collection[meeting.id]; else collection[meeting.id] = value;
      writeJson(key, collection);
    };
    setIn(AUDIT_STORAGE_KEY, bundle.audit || [], false);
    setIn(FINAL_CHECKLIST_STORAGE_KEY, bundle.final_checklist, !bundle.final_checklist);
    setIn(REPORT_STORAGE_KEY, bundle.report || {}, false);
    setIn(PARTNER_DATA_KEY, bundle.partner, !bundle.partner);
  }

  async function push(meetingId) {
    if (!currentUser) { pending.add(meetingId); return; }
    const bundle = bundleFor(meetingId);
    if (!bundle) return;
    const user = currentUser;
    try {
      await firestoreDb.collection(COLLECTION).doc(docId(user.uid, meetingId)).set({
        owner_uid: user.uid,
        owner_email: (user.email || '').toLowerCase(),
        owner_name: ownerName(user),
        meeting_id: meetingId,
        status: bundle.meeting.status || '',
        empresa: bundle.meeting.empresa || '',
        cliente: bundle.meeting.cliente || '',
        data: bundle.meeting.data || '',
        updated_at: bundle.meeting.updated_at || new Date().toISOString(),
        payload: JSON.stringify(bundle)
      });
      pending.delete(meetingId);
      const owners = readJson(OWNERS_KEY, {});
      owners[meetingId] = user.uid;
      writeJson(OWNERS_KEY, owners);
    } catch (error) { pending.add(meetingId); warnOnce(error); }
  }

  function schedulePush(meetingId) {
    if (!meetingId) return;
    pending.add(meetingId);
    clearTimeout(timers[meetingId]);
    timers[meetingId] = setTimeout(() => push(meetingId), PUSH_DELAY_MS);
  }

  function flushPending() { [...pending].forEach((id) => { clearTimeout(timers[id]); push(id); }); }

  async function pull(user) {
    currentUser = user;
    try {
      const snapshot = await firestoreDb.collection(COLLECTION).where('owner_uid', '==', user.uid).get();
      const remote = {};
      snapshot.docs.forEach((doc) => { const data = doc.data(); remote[data.meeting_id] = data; });
      const owners = readJson(OWNERS_KEY, {});
      Object.values(remote).forEach((data) => {
        const local = getMeetingById(data.meeting_id);
        if (!local || (data.updated_at || '') > (local.updated_at || '')) {
          try { applyRemote(JSON.parse(data.payload)); } catch (error) { console.warn('Reunião remota inválida:', data.meeting_id, error); }
        }
        owners[data.meeting_id] = user.uid;
      });
      writeJson(OWNERS_KEY, owners);
      getMeetings().forEach((meeting) => {
        if (owners[meeting.id] && owners[meeting.id] !== user.uid) return; // reunião de outro usuário deste navegador
        const data = remote[meeting.id];
        if (!data || (meeting.updated_at || '') > (data.updated_at || '')) schedulePush(meeting.id);
      });
      pending.forEach((id) => { if (!timers[id]) schedulePush(id); });
      window.dispatchEvent(new CustomEvent('discovery:meetings-synced', { detail: { count: Object.keys(remote).length } }));
    } catch (error) { warnOnce(error); }
  }

  /* Visão do administrador: todas as reuniões de todos os CLMs */
  window.fetchAllMeetingsRemote = async function fetchAllMeetingsRemote() {
    const snapshot = await firestoreDb.collection(COLLECTION).get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      let audit = [];
      try { audit = JSON.parse(data.payload)?.audit || []; } catch (error) { audit = []; }
      return { meeting_id: data.meeting_id, owner_name: data.owner_name, owner_email: data.owner_email, status: data.status, empresa: data.empresa, cliente: data.cliente, data: data.data, updated_at: data.updated_at, audit };
    });
  };

  /* Ganchos: qualquer gravação local agenda o envio */
  const baseSaveMeeting = saveMeeting;
  saveMeeting = function saveMeetingAndSync(meeting) { const saved = baseSaveMeeting(meeting); schedulePush(saved.id); return saved; };
  const baseUpdateStoredCollection = updateStoredCollection;
  updateStoredCollection = function updateStoredCollectionAndSync(key, id, value) {
    const result = baseUpdateStoredCollection(key, id, value);
    if ([AUDIT_STORAGE_KEY, FINAL_CHECKLIST_STORAGE_KEY, REPORT_STORAGE_KEY].includes(key)) schedulePush(id);
    return result;
  };
  const baseSalvarDadosParceiro = salvarDadosParceiro;
  salvarDadosParceiro = function salvarDadosParceiroAndSync(meetingId, dados) { const result = baseSalvarDadosParceiro(meetingId, dados); schedulePush(meetingId); return result; };

  document.addEventListener('visibilitychange', () => { if (document.hidden) flushPending(); });
  window.addEventListener('pagehide', flushPending);

  firebaseAuth.onAuthStateChanged((user) => {
    if (user && getActiveSession()) pull(user);
    else { flushPending(); currentUser = null; }
  });
}());
