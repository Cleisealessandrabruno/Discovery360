const SESSION_KEY = 'discovery_session';
const USERS_KEY = 'discovery_users';
const ACCESS_REQUESTS_KEY = 'discovery_access_requests';
const SIMULATED_EMAILS_KEY = 'discovery_simulated_emails';

// SIMULAÇÃO: autenticação client-side apenas para fins de protótipo, sem segurança real de produção.
function simpleHash(value) { let hash = 2166136261; for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619); return `simulada_${(hash >>> 0).toString(16)}`; }
function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
function getAccessRequests() { return JSON.parse(localStorage.getItem(ACCESS_REQUESTS_KEY) || '[]'); }
function saveAccessRequests(requests) { localStorage.setItem(ACCESS_REQUESTS_KEY, JSON.stringify(requests)); }
function getSimulatedEmails() { return JSON.parse(localStorage.getItem(SIMULATED_EMAILS_KEY) || '[]'); }
function addSimulatedEmail(email) { const emails = getSimulatedEmails(); emails.push({ ...email, email_id: `email_${Date.now()}_${emails.length}`, enviado_em: new Date().toISOString() }); localStorage.setItem(SIMULATED_EMAILS_KEY, JSON.stringify(emails)); }
function getActiveSession() { const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null; }
function saveSession(user, remember) { const session = JSON.stringify({ user_id: user.user_id, nome: user.nome, perfil: user.perfil, email: user.email, logado_em: new Date().toISOString() }); (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, session); }
function clearSession() { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); }
function ensureDemoAdmin() { const users = getUsers(); if (!users.length) { users.push({ user_id: 'u_admin_demo', nome: 'Cleise Andre', email: 'cleise.alessandra@gmail.com', senha_hash: simpleHash('Discovery360!'), perfil: 'Administrador', empresa: 'Discovery 360', cargo: 'Administradora', status: 'ativo', criado_em: new Date().toISOString() }); saveUsers(users); } }
function authenticate(email, password) { return getUsers().find((user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.senha_hash === simpleHash(password) && user.status === 'ativo') || null; }
function createAccessRequest(data) { const requests = getAccessRequests(); const request = { ...data, request_id: `req_${Date.now()}`, status: 'pendente', aprovado_por: null, aprovado_em: null, rejeitado_por: null, rejeitado_em: null, motivo_rejeicao: null, criado_em: new Date().toISOString() }; requests.push(request); saveAccessRequests(requests); return request; }
function updateAccessRequest(request) { const requests = getAccessRequests(); const index = requests.findIndex((item) => item.request_id === request.request_id); if (index >= 0) requests[index] = request; saveAccessRequests(requests); }
function generateTemporaryPassword() { return Math.random().toString(36).slice(2, 10); }
