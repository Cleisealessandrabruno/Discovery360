const MEETINGS_STORAGE_KEY = 'discovery_meetings';
const AUDIT_STORAGE_KEY = 'discovery_audit';
const FINAL_CHECKLIST_STORAGE_KEY = 'discovery_final_checklists';
const REPORT_STORAGE_KEY = 'discovery_reports';

function getMeetings() {
  try {
    const stored = localStorage.getItem(MEETINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveMeeting(meeting) {
  const meetings = getMeetings();
  const now = new Date().toISOString();
  const savedMeeting = { ...meeting, updated_at: now };
  const existingIndex = meetings.findIndex((item) => item.id === meeting.id);

  if (existingIndex === -1) {
    savedMeeting.created_at = meeting.created_at || now;
    meetings.push(savedMeeting);
  } else {
    savedMeeting.created_at = meetings[existingIndex].created_at || now;
    meetings[existingIndex] = savedMeeting;
  }

  localStorage.setItem(MEETINGS_STORAGE_KEY, JSON.stringify(meetings));
  return savedMeeting;
}

function getMeetingById(id) {
  return getMeetings().find((meeting) => meeting.id === id) || null;
}

function getKpis() {
  const meetings = getMeetings();
  return {
    emAndamento: meetings.filter((meeting) => meeting.status === 'em_andamento').length,
    totalReunioes: meetings.length,
    oportunidades: meetings.filter((meeting) => meeting.gerou_oportunidade === true).length,
    proximosPassosPendentes: meetings.filter((meeting) => meeting.proximo_passo && meeting.status !== 'concluida').length
  };
}

function updateStoredCollection(key, id, value) {
  const collection = JSON.parse(localStorage.getItem(key) || '{}');
  collection[id] = value;
  localStorage.setItem(key, JSON.stringify(collection));
  return value;
}

function getAudit(meetingId) { return JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || '{}')[meetingId] || []; }
function registrarAuditoria(meetingId, evento) {
  const events = [...getAudit(meetingId), { data_hora: new Date().toISOString(), descricao: evento }];
  return updateStoredCollection(AUDIT_STORAGE_KEY, meetingId, events);
}
function getFinalChecklist(meetingId) { return JSON.parse(localStorage.getItem(FINAL_CHECKLIST_STORAGE_KEY) || '{}')[meetingId] || null; }
function saveFinalChecklist(meetingId, checklist) { return updateStoredCollection(FINAL_CHECKLIST_STORAGE_KEY, meetingId, checklist); }
function getReportMaterial(meetingId) { return JSON.parse(localStorage.getItem(REPORT_STORAGE_KEY) || '{}')[meetingId] || {}; }
function saveReportMaterial(meetingId, material) { return updateStoredCollection(REPORT_STORAGE_KEY, meetingId, { ...getReportMaterial(meetingId), ...material }); }
