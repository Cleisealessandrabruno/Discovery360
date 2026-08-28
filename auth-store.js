const SESSION_KEY = 'discovery_session';
const USERS_KEY = 'discovery_users';
const ACCESS_REQUESTS_KEY = 'discovery_access_requests';
const SIMULATED_EMAILS_KEY = 'discovery_simulated_emails';
const FIREBASE_ADMIN_EMAIL = 'v-cleand@microsoft.com';

firebase.initializeApp({
  apiKey: 'AIzaSyDMX675rxTd00LJItK5PlPcAW3YxhZgozE',
  authDomain: 'discovery-360.firebaseapp.com',
  projectId: 'discovery-360',
  storageBucket: 'discovery-360.firebasestorage.app',
  messagingSenderId: '446241775891',
  appId: '1:446241775891:web:af7c1144412b3f75453ae6'
});
const firebaseAuth = firebase.auth();
const firestoreDb = firebase.firestore();
let accessRequestsCache = JSON.parse(localStorage.getItem(ACCESS_REQUESTS_KEY) || '[]');
let stopAccessRequestsListener = null;

function simpleHash(value) { let hash = 2166136261; for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619); return `simulada_${(hash >>> 0).toString(16)}`; }
function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
function getAccessRequests() { return accessRequestsCache; }
function saveAccessRequests(requests) { accessRequestsCache = requests; localStorage.setItem(ACCESS_REQUESTS_KEY, JSON.stringify(requests)); }
function getSimulatedEmails() { return JSON.parse(localStorage.getItem(SIMULATED_EMAILS_KEY) || '[]'); }
function addSimulatedEmail(email) { const emails = getSimulatedEmails(); emails.push({ ...email, email_id: `email_${Date.now()}_${emails.length}`, enviado_em: new Date().toISOString() }); localStorage.setItem(SIMULATED_EMAILS_KEY, JSON.stringify(emails)); }
function getActiveSession() { const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null; }
function saveSession(user, remember) { const session = JSON.stringify({ user_id: user.user_id, nome: user.nome, perfil: user.perfil, email: user.email, logado_em: new Date().toISOString() }); (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, session); }
function clearSession() { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); }
function ensureDemoAdmin() {}

async function authenticate(email, password) {
  const credential = await firebaseAuth.signInWithEmailAndPassword(email.trim(), password);
  const signedEmail = (credential.user.email || '').toLowerCase();
  return { user_id: credential.user.uid, nome: signedEmail === FIREBASE_ADMIN_EMAIL ? 'Cleise' : (credential.user.displayName || signedEmail.split('@')[0]), perfil: signedEmail === FIREBASE_ADMIN_EMAIL ? 'Administrador' : 'CLM', email: signedEmail };
}

async function createAccessRequest(data) {
  const request = { ...data, status: 'pendente', aprovado_por: null, aprovado_em: null, rejeitado_por: null, rejeitado_em: null, motivo_rejeicao: null, criado_em: new Date().toISOString() };
  const reference = await firestoreDb.collection('access_requests').add(request);
  return { ...request, request_id: reference.id };
}

async function updateAccessRequest(request) {
  const { request_id, ...data } = request;
  await firestoreDb.collection('access_requests').doc(request_id).set(data, { merge: true });
}

function startAccessRequestsSync() {
  if (stopAccessRequestsListener) stopAccessRequestsListener();
  stopAccessRequestsListener = firestoreDb.collection('access_requests').orderBy('criado_em', 'desc').onSnapshot((snapshot) => {
    const previousPending = accessRequestsCache.filter((item) => item.status === 'pendente').length;
    saveAccessRequests(snapshot.docs.map((doc) => ({ request_id: doc.id, ...doc.data() })));
    window.dispatchEvent(new CustomEvent('discovery:access-requests-updated', { detail: { previousPending } }));
  }, (error) => console.error('Não foi possível carregar as solicitações:', error));
}

firebaseAuth.onAuthStateChanged((user) => {
  const session = getActiveSession();
  if (user && session && user.email?.toLowerCase() === FIREBASE_ADMIN_EMAIL) startAccessRequestsSync();
});

function generateTemporaryPassword() { return Math.random().toString(36).slice(2, 10); }
