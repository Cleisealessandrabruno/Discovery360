ensureDemoAdmin();
const CURRENT_SESSION = getActiveSession();
const USER_NAME = CURRENT_SESSION?.nome || 'Cleise';
const USER_ROLE = CURRENT_SESSION?.perfil || '';
const isAdmin = () => USER_ROLE === 'ADMIN' || USER_ROLE === 'Administrador';
const QUALIFICATION_CHECKLISTS = typeof window.QUALIFICATION_CHECKLISTS !== 'undefined' ? window.QUALIFICATION_CHECKLISTS : [];
const state = { plays: salesPlaysData.sales_plays, filter: 'TODOS', query: '', activeMeetingId: null, editingMeetingId: null, readOnly: false };
const SPIN_STAGES = [
  { id: 'situacao', label: 'Situação', source: 'situacao' },
  { id: 'problema', label: 'Problema', source: 'problema' },
  { id: 'implicacao', label: 'Implicação', source: 'implicacao' },
  { id: 'need_payoff', label: 'Need-Payoff', source: 'need_payoff' },
  { id: 'qualificacao', label: 'Qualificação' },
  { id: 'proximo_passo', label: 'Próximo passo' }
];
const QUALIFICATION_ITEMS = salesPlaysData.checklist_qualificacao;
let activePlayId = state.plays[0]?.id;
let activeDiscoveryStage = 'situacao';
let selectedQuestion = null;
let finalChecklistDraft = [];
let selectedLibraryPlayId = null;
const elements = {
  grid: document.getElementById('playsGrid'),
  empty: document.getElementById('emptyState'),
  input: document.getElementById('searchInput'),
  count: document.getElementById('resultCount'),
  title: document.getElementById('resultsTitle'),
  focusCount: document.getElementById('focusCount'),
  panel: document.getElementById('detailPanel'),
  backdrop: document.getElementById('panelBackdrop')
};

const views = {
  login: document.getElementById('loginView'),
  dashboard: document.getElementById('dashboardView'),
  form: document.getElementById('meetingFormView'),
  workspace: document.getElementById('workspaceView')
  ,report: document.getElementById('reportView')
  ,library: document.getElementById('libraryView')
  ,access: document.getElementById('accessView')
  ,checklists: document.getElementById('checklistsView')
  ,callAudit: document.getElementById('callAuditView')
};

function navigate(view, meetingId = null) {
  const routeByView = { form: 'nova-reuniao', library: 'biblioteca', access: 'validacao-acessos', callAudit: 'auditoria-ligacao' };
  const hash = view === 'report' ? `relatorio/${meetingId}` : view === 'workspace' ? `reuniao/${meetingId}` : (routeByView[view] || view);
  window.location.hash = hash;
  state.activeMeetingId = meetingId;
  views.dashboard.hidden = view !== 'dashboard';
  views.form.hidden = view !== 'form';
  views.workspace.hidden = view !== 'workspace';
  views.report.hidden = view !== 'report';
  views.library.hidden = view !== 'library';
  views.access.hidden = view !== 'access';
  views.checklists.hidden = view !== 'checklists';
  views.callAudit.hidden = view !== 'callAudit';
  views.login.hidden = view !== 'login';
  document.querySelector('.app-shell').hidden = view === 'login';
  if (view === 'dashboard') renderDashboard();
  if (view === 'form') openMeetingForm(meetingId);
  if (view === 'workspace') { openWorkspace(meetingId); const meeting = getMeetingById(meetingId); if (meeting) document.getElementById('activeMeetingLabel').textContent = `${meeting.cliente} — ${meeting.assunto} · ${meeting.identificador_tipo === 'oportunidade' ? 'Oportunidade' : 'Lead'} ${meeting.identificador_numero || 'não informada'}`; }
  if (view === 'report') renderReport(meetingId);
  if (view === 'library') renderLibrary();
  if (view === 'access') renderAccessView();
  if (view === 'checklists') renderChecklists();
  if (view === 'callAudit') initializeCallAudit();
  if (view === 'login') clearSession();
}

function renderDashboard() {
  const kpis = getKpis();
  document.getElementById('userName').textContent = USER_NAME;
  document.getElementById('kpiInProgress').textContent = kpis.emAndamento;
  document.getElementById('kpiTotal').textContent = kpis.totalReunioes;
  document.getElementById('kpiOpportunities').textContent = kpis.oportunidades;
  document.getElementById('kpiNextSteps').textContent = kpis.proximosPassosPendentes;
  const meetings = getMeetings().sort((first, second) => new Date(second.data || second.updated_at) - new Date(first.data || first.updated_at));
  document.getElementById('dashboardMeetingCount').textContent = `${meetings.length} ${meetings.length === 1 ? 'reunião' : 'reuniões'}`;
  document.getElementById('dashboardEmpty').hidden = meetings.length > 0;
  document.getElementById('meetingsTableBody').innerHTML = meetings.map((meeting) => `<tr><td><strong>${meeting.cliente}</strong><small>${meeting.empresa}</small></td><td>${meeting.assunto}</td><td>${formatDate(meeting.data)}</td><td><span class="status-pill ${meeting.status}">${statusLabel(meeting.status)}</span></td><td><button class="table-action" data-meeting-id="${meeting.id}">${meeting.status === 'em_andamento' ? 'Continuar' : 'Abrir'} <span>↗</span></button></td></tr>`).join('');
  document.querySelectorAll('.table-action').forEach((button) => button.addEventListener('click', () => openSavedMeeting(button.dataset.meetingId)));
}

function formatDate(value) { return value ? new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR') : '-'; }
function statusLabel(status) { return ({ rascunho: 'Rascunho', em_andamento: 'Em andamento', concluida: 'Concluída' })[status] || status; }
function createMeeting() { const now = new Date().toISOString(); return { id: `m_${Date.now()}`, cliente: '', empresa: '', identificador_tipo: 'lead', identificador_numero: '', tpid: '', segmento: '', data: '', assunto: '', solucao_ms: '', contexto_previo: '', contextos_adicionais: [], observacoes_preparacao: '', status: 'rascunho', gerou_oportunidade: false, proximo_passo: '', sales_play_ativo: null, respostas: {}, created_at: now, updated_at: now }; }

function openMeetingForm(id = null) {
  const meeting = id ? getMeetingById(id) : createMeeting();
  state.editingMeetingId = id;
  document.getElementById('formTitle').textContent = id ? 'Editar reunião' : 'Nova reunião';
  const form = document.getElementById('meetingForm');
  form.reset();
  document.getElementById('identifierTypeToggle').checked = meeting.identificador_tipo === 'oportunidade';
  form.elements.identificador_numero.value = meeting.identificador_numero || '';
  updateMeetingIdentifierField();
  ['cliente', 'empresa', 'tpid', 'segmento', 'data', 'assunto', 'solucao_ms', 'contexto_previo', 'observacoes_preparacao'].forEach((name) => { form.elements[name].value = meeting[name] || ''; });
  document.getElementById('additionalContexts').innerHTML = '';
  (meeting.contextos_adicionais || []).forEach((context) => addContextField(context));
  document.getElementById('formError').textContent = '';
  document.querySelectorAll('#meetingForm input, #meetingForm textarea').forEach((field) => field.classList.remove('invalid'));
}

function updateMeetingIdentifierField() { const opportunity = document.getElementById('identifierTypeToggle').checked; const type = opportunity ? 'Oportunidade' : 'Lead'; document.getElementById('identifierTypeLabel').textContent = type; document.getElementById('identifierNumberLabel').textContent = `Número da ${type} *`; document.getElementById('identifierNumber').placeholder = `Informe o número da ${type}`; }

function addContextField(value = '') { const container = document.getElementById('additionalContexts'); const number = container.children.length + 1; const label = document.createElement('label'); label.className = 'full-width'; label.innerHTML = `Contexto adicional ${number}<textarea name="contexto_adicional" rows="3" placeholder="Outro contexto relevante para a conversa."></textarea>`; label.querySelector('textarea').value = value; container.appendChild(label); }
function collectMeetingForm() { const form = document.getElementById('meetingForm'); const meeting = state.editingMeetingId ? getMeetingById(state.editingMeetingId) : createMeeting(); meeting.cliente = form.elements.cliente.value.trim(); meeting.empresa = form.elements.empresa.value.trim(); meeting.identificador_tipo = document.getElementById('identifierTypeToggle').checked ? 'oportunidade' : 'lead'; meeting.identificador_numero = form.elements.identificador_numero.value.trim(); meeting.tpid = form.elements.tpid.value.trim(); meeting.segmento = form.elements.segmento.value.trim(); meeting.data = form.elements.data.value; meeting.assunto = form.elements.assunto.value.trim(); meeting.solucao_ms = form.elements.solucao_ms.value.trim(); meeting.contexto_previo = form.elements.contexto_previo.value.trim(); meeting.contextos_adicionais = [...document.querySelectorAll('[name="contexto_adicional"]')].map((field) => field.value.trim()).filter(Boolean); meeting.observacoes_preparacao = form.elements.observacoes_preparacao.value.trim(); return meeting; }
function saveFromForm(status) { const meeting = collectMeetingForm(); const required = ['cliente', 'empresa', 'identificador_numero', 'data', 'assunto']; const missing = required.filter((field) => !meeting[field]); document.querySelectorAll('#meetingForm input, #meetingForm textarea').forEach((field) => field.classList.remove('invalid')); if (missing.length) { missing.forEach((field) => document.querySelector(`[name="${field}"]`).classList.add('invalid')); document.getElementById('formError').textContent = 'Preencha os campos obrigatórios destacados, incluindo o número da Lead ou Oportunidade.'; return; } const duplicate = getMeetings().find((item) => item.id !== meeting.id && item.identificador_tipo === meeting.identificador_tipo && item.identificador_numero === meeting.identificador_numero); if (duplicate) { document.getElementById('identifierNumber').classList.add('invalid'); document.getElementById('formError').textContent = 'Este número já está associado a outra reunião.'; return; } const wasNew = !state.editingMeetingId; meeting.status = status; const saved = saveMeeting(meeting); if (wasNew) registrarAuditoria(saved.id, `${meeting.identificador_tipo === 'oportunidade' ? 'Oportunidade' : 'Lead'} ${meeting.identificador_numero} · ${status === 'em_andamento' ? 'Reunião criada e iniciada.' : 'Reunião criada como rascunho.'}`); else if (status === 'em_andamento') registrarAuditoria(saved.id, 'Reunião iniciada.'); if (status === 'em_andamento') navigate('workspace', saved.id); else navigate('dashboard'); }
function openSavedMeeting(id) { const meeting = getMeetingById(id); if (!meeting) return; if (meeting.status === 'rascunho') navigate('form', id); else { navigate('workspace', id); if (meeting.status === 'concluida') setMeetingTab('summary'); } }
function updateActiveMeeting() { if (!state.activeMeetingId || state.readOnly) return; const meeting = getMeetingById(state.activeMeetingId); if (!meeting) return; meeting.gerou_oportunidade = document.getElementById('opportunityInput').checked; meeting.proximo_passo = document.getElementById('nextStepInput').value.trim(); saveMeeting(meeting); }
function renderMeetingTabs() { const meeting = state.activeMeetingId ? getMeetingById(state.activeMeetingId) : null; document.getElementById('meetingTabs').hidden = !meeting; if (!meeting) return; document.getElementById('historyCount').textContent = allSavedResponses(meeting).length; document.getElementById('workspaceTranscript').textContent = gerarTranscricaoCompleta(meeting.id); document.getElementById('workspaceSummary').innerHTML = `<p class="partial-summary">${meeting.status === 'concluida' ? '' : 'Este é um resumo parcial, gerado com as respostas registradas até o momento. Finalize a reunião para gerar o relatório completo.'}</p>${document.getElementById('reportCards')?.innerHTML || ''}`; }
function setMeetingTab(tab) { document.querySelectorAll('.meeting-tab').forEach((button) => button.classList.toggle('active', button.dataset.meetingTab === tab)); document.getElementById('questionsPane').hidden = tab !== 'questions'; document.getElementById('historyPane').hidden = tab !== 'history'; document.getElementById('partnerPane').hidden = tab !== 'partner'; document.getElementById('summaryPane').hidden = tab !== 'summary'; if (tab === 'history') { const meeting = getMeetingById(state.activeMeetingId); document.getElementById('historyCount').textContent = allSavedResponses(meeting).length; document.getElementById('workspaceTranscript').textContent = gerarTranscricaoCompleta(state.activeMeetingId); } if (tab === 'partner') renderPartnerPane(); if (tab === 'summary') { renderReport(state.activeMeetingId); const complete = getMeetingById(state.activeMeetingId)?.status === 'concluida'; document.getElementById('workspaceSummary').innerHTML = `<div class="summary-actions"><button id="workspaceWordButton" class="primary-button">▣ Baixar como Word</button><button id="workspaceEditButton" class="secondary-button">Editar materiais</button></div>${!complete ? '<p class="partial-summary">Este é um resumo parcial, gerado com as respostas registradas até o momento. Finalize a reunião para gerar o relatório completo.</p>' : ''}${document.getElementById('reportCards').innerHTML}`; document.getElementById('workspaceWordButton').addEventListener('click', () => { baixarRelatorioComoWord(state.activeMeetingId); setMeetingTab('summary'); }); document.getElementById('workspaceEditButton').addEventListener('click', () => toggleMaterialEditing(state.activeMeetingId)); } }
function renderLibrary() { const query = (document.getElementById('librarySearchInput')?.value || '').toLocaleLowerCase('pt-BR'); const filter = document.querySelector('#libraryFilterGroup .active')?.dataset.filter || 'TODOS'; const plays = state.plays.filter((play) => (filter === 'TODOS' || play.categoria.includes(filter)) && [play.titulo, play.gatilho, play.solucao_potencial, ...play.categoria].join(' ').toLocaleLowerCase('pt-BR').includes(query)); document.getElementById('libraryResultCount').textContent = `${plays.length} resultados`; document.getElementById('libraryGrid').innerHTML = plays.map((play) => `<article class="play-card" data-library-id="${play.id}"><div class="card-top"><span class="play-number">${String(play.id).padStart(2, '0')}</span><div class="chips">${play.categoria.map((category) => `<span class="chip">${category}</span>`).join('')}</div></div><h3>${play.titulo}</h3><p class="trigger">${play.gatilho}</p><div class="card-footer"><span>${play.solucao_potencial}</span><span class="arrow">↗</span></div></article>`).join(''); document.querySelectorAll('[data-library-id]').forEach((card) => card.addEventListener('click', () => openDetail(Number(card.dataset.libraryId)))); }
function renderAccessView() { if (!isAdmin()) { navigate('dashboard'); showToast('Você não tem permissão para acessar esta página.'); return; } renderAccessRequests(); renderSimulatedEmails(); const meetings = getMeetings(); const people = {}; meetings.forEach((meeting) => { const person = meeting.usuario_responsavel || USER_NAME; people[person] = people[person] || []; people[person].push(meeting); }); document.getElementById('accessPeopleBody').innerHTML = Object.entries(people).map(([person, items]) => `<tr><td>${person}</td><td>${items.length}</td><td>${items.filter((item) => item.status === 'rascunho').length}</td><td>${items.filter((item) => item.status === 'em_andamento').length}</td><td>${items.filter((item) => item.status === 'concluida').length}</td><td>${formatDate(items.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0].data)}</td></tr>`).join('') || '<tr><td colspan="6">Nenhum dado disponível.</td></tr>'; const events = meetings.flatMap((meeting) => getAudit(meeting.id).map((event) => ({ ...event, meeting }))).sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora)); document.getElementById('accessAuditBody').innerHTML = events.map((event) => `<tr><td>${new Date(event.data_hora).toLocaleString('pt-BR')}</td><td>${event.descricao}</td><td>${event.meeting.empresa}</td></tr>`).join('') || '<tr><td colspan="3">Nenhum evento registrado.</td></tr>'; }
let requestFilter = 'todos'; let selectedRequestId = null;
function updateAccessNotification() { const count = getAccessRequests().filter((request) => request.status === 'pendente').length; const visible = isAdmin() && count > 0; const badge = document.getElementById('accessNotificationBadge'); if (badge) { badge.textContent = count; badge.hidden = !visible; } const alertButton = document.getElementById('accessAlertButton'); const alertCount = document.getElementById('accessAlertCount'); if (alertButton) alertButton.hidden = !visible; if (alertCount) alertCount.textContent = count; const nav = document.getElementById('accessNav'); if (nav) nav.setAttribute('aria-label', count ? `Validação de acessos: ${count} solicitação${count === 1 ? '' : 'ões'} pendente${count === 1 ? '' : 's'}` : 'Validação de acessos'); return count; }

function openPendingAccessRequests() { requestFilter = 'pendente'; document.querySelectorAll('.access-filters .filter').forEach((button) => button.classList.toggle('active', button.dataset.requestFilter === 'pendente')); document.querySelectorAll('.access-tab').forEach((button) => button.classList.toggle('active', button.dataset.accessTab === 'requests')); document.getElementById('accessRequestsPane').hidden = false; document.getElementById('accessEmailsPane').hidden = true; document.getElementById('accessOverviewPane').hidden = true; navigate('access'); renderAccessRequests(); }
function renderAccessRequests() { const requests = getAccessRequests().filter((request) => requestFilter === 'todos' || request.status === requestFilter).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em)); document.getElementById('pendingRequestCount').textContent = getAccessRequests().filter((request) => request.status === 'pendente').length; document.getElementById('accessRequestsBody').innerHTML = requests.map((request) => `<tr><td>${new Date(request.criado_em).toLocaleDateString('pt-BR')}</td><td><strong>${request.nome}</strong></td><td>${request.empresa}</td><td>${request.email}</td><td>${request.cargo}</td><td><span class="status-pill ${request.status}">${request.status}</span></td><td>${request.status === 'pendente' ? `<select class="role-select" data-approve-request="${request.request_id}"><option value="">Perfil...</option><option>Administrador</option><option>Gerente</option><option>CLM</option><option>Especialista</option><option>Parceiro</option></select><button class="table-action" data-view-request="${request.request_id}">Detalhes</button><button class="table-action reject-action" data-reject-request="${request.request_id}">Rejeitar</button>` : `<button class="table-action" data-view-request="${request.request_id}">Detalhes</button>`}</td></tr>`).join('') || '<tr><td colspan="7">Nenhuma solicitação encontrada.</td></tr>'; document.querySelectorAll('[data-approve-request]').forEach((select) => select.addEventListener('change', () => { if (select.value) approveRequest(select.dataset.approveRequest, select.value); })); document.querySelectorAll('[data-reject-request]').forEach((button) => button.addEventListener('click', () => openRejectRequest(button.dataset.rejectRequest))); document.querySelectorAll('[data-view-request]').forEach((button) => button.addEventListener('click', () => showRequestDetails(button.dataset.viewRequest))); }
function showRequestDetails(id) { const request = getAccessRequests().find((item) => item.request_id === id); if (request) showToast(`${request.nome} · ${request.email} · ${request.descricao_uso}`); }
function approveRequest(id, perfil) { const request = getAccessRequests().find((item) => item.request_id === id); if (!request) return; const password = generateTemporaryPassword(); const users = getUsers(); users.push({ user_id: `u_${Date.now()}`, nome: request.nome, email: request.email, senha_hash: simpleHash(password), perfil, empresa: request.empresa, cargo: request.cargo, status: 'ativo', criado_em: new Date().toISOString(), origem_solicitacao_id: id }); saveUsers(users); request.status = 'aprovado'; request.aprovado_por = USER_NAME; request.aprovado_em = new Date().toISOString(); updateAccessRequest(request); addSimulatedEmail({ de: 'sistema@discovery360.local', para: request.email, assunto: 'Acesso aprovado — Discovery 360', corpo: `Olá, ${request.nome}.\n\nSeu acesso foi aprovado.\nE-mail: ${request.email}\nSenha temporária: ${password}\nPerfil: ${perfil}` , relacionado_a: { tipo: 'solicitacao_acesso', id } }); showToast(`Acesso aprovado. Senha temporária: ${password}`); renderAccessView(); }
function openRejectRequest(id) { selectedRequestId = id; document.getElementById('rejectReason').value = ''; document.getElementById('rejectError').textContent = ''; document.getElementById('rejectRequestModal').hidden = false; }
function rejectRequest() { const reason = document.getElementById('rejectReason').value.trim(); if (!reason) { document.getElementById('rejectError').textContent = 'Informe o motivo da rejeição.'; return; } const request = getAccessRequests().find((item) => item.request_id === selectedRequestId); if (!request) return; request.status = 'rejeitado'; request.rejeitado_por = USER_NAME; request.rejeitado_em = new Date().toISOString(); request.motivo_rejeicao = reason; updateAccessRequest(request); addSimulatedEmail({ de: 'sistema@discovery360.local', para: request.email, assunto: 'Solicitação de acesso não aprovada', corpo: `Olá, ${request.nome}.\n\nSua solicitação não foi aprovada.\nMotivo: ${reason}`, relacionado_a: { tipo: 'solicitacao_acesso', id: request.request_id } }); document.getElementById('rejectRequestModal').hidden = true; renderAccessView(); }
function renderSimulatedEmails() { document.getElementById('simulatedEmailsList').innerHTML = getSimulatedEmails().slice().reverse().map((email) => `<details class="simulated-email"><summary>${email.assunto} <span>${email.para}</span></summary><pre>${email.corpo}</pre></details>`).join('') || '<p class="empty-state">Nenhum e-mail simulado.</p>'; }
function openRequestModal() {
  document.getElementById('accessRequestForm')?.reset();  document.getElementById('accessRequestForm')?.reset();
  const errorEl = document.getElementById('requestError');
  if (errorEl) errorEl.textContent = '';
  document.getElementById('accessRequestModal').hidden = false;
}
function closeRequestModal() { document.getElementById('accessRequestModal').hidden = true; }
function submitAccessRequest(event) { event.preventDefault(); const form = event.currentTarget; const data = Object.fromEntries(new FormData(form).entries()); const request = createAccessRequest(data); addSimulatedEmail({ de: data.email, para: 'cleise.andre@microsoft.com', assunto: `Nova solicitação de acesso — ${data.nome}`, corpo: Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n'), relacionado_a: { tipo: 'solicitacao_acesso', id: request.request_id } }); addSimulatedEmail({ de: 'sistema@discovery360.local', para: data.email, assunto: 'Solicitação de acesso recebida', corpo: `Olá, ${data.nome}.\n\nSua solicitação foi recebida e está pendente de análise.`, relacionado_a: { tipo: 'solicitacao_acesso', id: request.request_id } }); form.reset(); closeRequestModal(); showToast('Solicitação enviada com sucesso.'); }
function showToast(message) { const toast = document.getElementById('toastMessage'); toast.textContent = message; toast.hidden = false; setTimeout(() => { toast.hidden = true; }, 2800); }
let partnerState = { motion: '', partner: null, manual: '', distributor: null, manualMode: false };
function openWorkspace(id) { const meeting = id ? getMeetingById(id) : null; state.readOnly = meeting?.status === 'concluida'; const bar = document.getElementById('activeMeetingBar'); bar.hidden = !meeting; document.getElementById('meetingTabs').hidden = !meeting; if (!meeting) return; partnerState = { motion: '', partner: null, manual: '', distributor: null, manualMode: false }; document.getElementById('activeMeetingLabel').textContent = `${meeting.cliente} — ${meeting.assunto}`; document.getElementById('opportunityInput').checked = meeting.gerou_oportunidade; document.getElementById('nextStepInput').value = meeting.proximo_passo || ''; document.getElementById('opportunityInput').disabled = state.readOnly; document.getElementById('nextStepInput').disabled = state.readOnly; document.getElementById('completeMeetingButton').hidden = state.readOnly; activePlayId = meeting.sales_play_ativo || activePlayId; activeDiscoveryStage = meeting.etapa_discovery_ativa || activeDiscoveryStage; renderDiscovery(); renderReport(id); renderMeetingTabs(); }
function savePartnerState() { if (!state.activeMeetingId || state.readOnly) return; const partnerName = partnerState.partner?.nome || partnerState.manual || ''; document.getElementById('distributorError').hidden = !partnerState.manual || Boolean(partnerState.distributor); if (!partnerState.motion || !partnerName || (partnerState.manual && !partnerState.distributor)) { document.getElementById('partnerSaveState').textContent = partnerState.manual && !partnerState.distributor ? 'Distribuidora pendente' : 'Preenchimento pendente'; return; } const responsibleSource = partnerState.partner || partnerState.distributor; const calculated = calcularDasEOwner(partnerState.motion, responsibleSource); salvarDadosParceiro(state.activeMeetingId, { opportunity_intent: partnerState.motion, parceiro_nome: partnerName, parceiro_manual: Boolean(partnerState.manual), distribuidora: partnerState.distributor?.nome || '', das: calculated.das, primary_partner: partnerName, engajamento: 'Engajar via QRP', owner: calculated.owner }); document.getElementById('partnerSaveState').textContent = 'Salvo'; }
function renderPartnerSuggestions(input, container, list, onSelect) { const query = normalizePartnerSearch(input.value); container.innerHTML = list.filter((item) => normalizePartnerSearch(item.nome).includes(query)).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')).map((item) => `<button type="button" data-partner-name="${encodeURIComponent(item.nome)}">${item.nome}</button>`).join('') + (list === PARTNERS_LIST ? '<button type="button" class="manual-option" data-manual="true">+ Não encontrei — digitar manualmente</button>' : ''); container.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => onSelect(button)));
}
function closePartnerSuggestions() { document.getElementById('partnerSuggestions').innerHTML = ''; document.getElementById('distributorSuggestions').innerHTML = ''; }
function renderPartnerPane() { const saved = state.activeMeetingId ? getDadosParceiro(state.activeMeetingId) : null; if (saved) { partnerState.motion = saved.opportunity_intent || ''; partnerState.partner = saved && !saved.parceiro_manual ? findPartnerByName(saved.parceiro_nome) : null; partnerState.manual = saved.parceiro_manual ? saved.parceiro_nome : ''; partnerState.manualMode = Boolean(saved.parceiro_manual); partnerState.distributor = saved.distribuidora ? findPartnerByName(saved.distribuidora) : null; } document.getElementById('opportunityIntentOptions').innerHTML = OPPORTUNITY_MOTIONS.map((motion) => `<button type="button" class="intent-pill ${motion.id === partnerState.motion ? 'active' : ''}" data-motion="${motion.id}">${motion.label}</button>`).join(''); document.getElementById('partnerSearch').value = partnerState.partner?.nome || partnerState.manual; document.getElementById('manualPartnerInput').value = partnerState.manual; document.getElementById('distributorSearch').value = partnerState.distributor?.nome || ''; document.getElementById('manualPartnerField').hidden = !partnerState.manualMode; document.getElementById('distributorField').hidden = !partnerState.manualMode; document.getElementById('distributorError').hidden = !partnerState.manualMode || Boolean(partnerState.distributor); const calculated = calcularDasEOwner(partnerState.motion, partnerState.partner, partnerState.distributor); document.getElementById('partnerDas').value = partnerState.motion ? calculated.das : 'Selecione o motion e o parceiro'; document.getElementById('partnerOwner').value = partnerState.motion ? calculated.owner : 'Não identificado'; document.getElementById('primaryPartner').value = partnerState.partner?.nome || partnerState.manual || ''; document.querySelectorAll('.intent-pill').forEach((button) => button.addEventListener('click', () => { partnerState.motion = button.dataset.motion; partnerState.partner = null; partnerState.manual = ''; partnerState.manualMode = false; partnerState.distributor = null; savePartnerState(); renderPartnerPane(); })); renderPartnerSuggestions(document.getElementById('partnerSearch'), document.getElementById('partnerSuggestions'), PARTNERS_LIST, (button) => { if (button.dataset.manual) { partnerState.partner = null; partnerState.manual = ''; document.getElementById('manualPartnerField').hidden = false; document.getElementById('distributorField').hidden = false; document.getElementById('manualPartnerInput').focus(); } else { partnerState.partner = findPartnerByName(decodeURIComponent(button.dataset.partnerName)); partnerState.manual = ''; partnerState.manualMode = false; partnerState.distributor = null; savePartnerState(); renderPartnerPane(); } }); renderPartnerSuggestions(document.getElementById('distributorSearch'), document.getElementById('distributorSuggestions'), DISTRIBUTORS_LIST, (button) => { partnerState.distributor = findPartnerByName(decodeURIComponent(button.dataset.partnerName)); savePartnerState(); renderPartnerPane(); }); }
let activeChecklistId = QUALIFICATION_CHECKLISTS[0]?.id || '';
let activeChecklistInstanceId = '';
function renderChecklists() { const tabs = document.getElementById('checklistTabs'); if (!QUALIFICATION_CHECKLISTS.length) { tabs.innerHTML = ''; document.getElementById('checklistContent').innerHTML = '<div class="empty-state">O arquivo de dados dos 5 checklists ainda não foi adicionado ao projeto.</div>'; return; } tabs.innerHTML = QUALIFICATION_CHECKLISTS.map((checklist) => `<button class="checklist-tab ${checklist.id === activeChecklistId ? 'active' : ''}" data-checklist="${checklist.id}">${checklist.icone || '▣'} ${checklist.titulo || checklist.nome}</button>`).join(''); document.querySelectorAll('.checklist-tab').forEach((tab) => tab.addEventListener('click', () => { activeChecklistId = tab.dataset.checklist; activeChecklistInstanceId = ''; renderChecklists(); })); const checklist = QUALIFICATION_CHECKLISTS.find((item) => item.id === activeChecklistId) || QUALIFICATION_CHECKLISTS[0]; const instances = getChecklistInstances(checklist.id); if (!activeChecklistInstanceId || !instances.some((item) => item.instance_id === activeChecklistInstanceId)) activeChecklistInstanceId = instances[0]?.instance_id || ''; document.getElementById('checklistInstanceSelect').innerHTML = instances.map((instance) => `<option value="${instance.instance_id}">${instance.nome_instancia}</option>`).join('') || '<option value="">Nenhuma instância</option>'; document.getElementById('checklistInstanceSelect').value = activeChecklistInstanceId; const progress = getChecklistProgress(activeChecklistInstanceId, checklist); document.getElementById('checklistContent').innerHTML = `<div class="checklist-intro"><p class="eyebrow">Checklist operacional</p><h2>${checklist.titulo}</h2><p>${checklist.subtitulo || ''}</p><div class="checklist-progress"><div><span style="width:${progress.percent}%"></span></div><strong>${progress.percent}%</strong><small>${progress.marked} de ${progress.total} itens marcados</small></div></div>${(checklist.secoes || []).map((section) => `<section class="checklist-section"><h3>${section.nome}</h3>${(section.itens || []).map((item) => `<label class="checklist-item"><input type="checkbox" data-checklist-item="${encodeURIComponent(item)}" ${activeChecklistInstanceId && getAllChecklistInstances().find((instance) => instance.instance_id === activeChecklistInstanceId)?.itens_marcados?.[item] ? 'checked' : ''} ${activeChecklistInstanceId ? '' : 'disabled'}><span>${item}</span></label>`).join('')}</section>`).join('') || '<div class="empty-state">O seed não contém seções para este checklist.</div>'}`; document.querySelectorAll('[data-checklist-item]').forEach((input) => input.addEventListener('change', () => { toggleChecklistItem(activeChecklistInstanceId, decodeURIComponent(input.dataset.checklistItem), input.checked); renderChecklists(); })); }
function createChecklistInstanceFromPrompt() { if (!activeChecklistId) return; document.getElementById('newChecklistInstanceForm').hidden = false; document.getElementById('newChecklistInstanceName').focus(); }
function confirmChecklistInstance() { const input = document.getElementById('newChecklistInstanceName'); if (!input.value.trim()) { input.classList.add('invalid'); return; } const instance = createChecklistInstance(activeChecklistId, input.value.trim(), state.activeMeetingId || null); activeChecklistInstanceId = instance.instance_id; input.value = ''; input.classList.remove('invalid'); document.getElementById('newChecklistInstanceForm').hidden = true; renderChecklists(); }
function getActivePlay() { return state.plays.find((play) => play.id === Number(activePlayId)) || state.plays[0]; }
function getResponseKey(playId, stage, questionUid) { return `${state.activeMeetingId}:${playId}:${stage}:${questionUid}`; }
function getSavedResponse(questionUid, stage) { const meeting = state.activeMeetingId ? getMeetingById(state.activeMeetingId) : null; return meeting?.respostas?.[getResponseKey(activePlayId, stage, questionUid)] || null; }
function saveDiscoveryResponse(questionUid, stage, value, status = 'respondida', pergunta = '') { if (!state.activeMeetingId || state.readOnly) return; const meeting = getMeetingById(state.activeMeetingId); const now = new Date().toISOString(); const key = getResponseKey(activePlayId, stage, questionUid); meeting.respostas = { ...(meeting.respostas || {}), [key]: { meeting_id: state.activeMeetingId, sales_play_id: Number(activePlayId), etapa_spin: stage, question_uid: questionUid, pergunta, resposta: value, status, usuario_responsavel: USER_NAME, created_at: meeting.respostas?.[key]?.created_at || now, updated_at: now } }; saveMeeting(meeting); registrarAuditoria(state.activeMeetingId, `Resposta registrada — ${stageLabels[stage] || stage}: ${pergunta || questionUid}.`); }
function renderDiscovery() { const play = getActivePlay(); if (!play) return; document.getElementById('discoveryPlayTitle').textContent = play.titulo; document.getElementById('discoveryPlayMeta').textContent = `Categoria: ${play.categoria.join(' / ')}`; document.getElementById('discoveryPlayTrigger').textContent = `Gatilho: ${play.gatilho}`; document.getElementById('discoveryPlayGuidance').textContent = play.orientacao_clm; document.getElementById('salesPlaySelector').innerHTML = state.plays.map((item) => `<option value="${item.id}" ${item.id === play.id ? 'selected' : ''}>${item.titulo}</option>`).join(''); document.getElementById('spinTabs').innerHTML = SPIN_STAGES.map((stage) => `<button role="tab" class="spin-tab ${stage.id === activeDiscoveryStage ? 'active' : ''}" data-stage="${stage.id}">${stage.label}</button>`).join(''); document.querySelectorAll('.spin-tab').forEach((tab) => tab.addEventListener('click', () => { activeDiscoveryStage = tab.dataset.stage; selectedQuestion = null; if (state.activeMeetingId && !state.readOnly) { const meeting = getMeetingById(state.activeMeetingId); meeting.etapa_discovery_ativa = activeDiscoveryStage; saveMeeting(meeting); } renderDiscovery(); })); if (activeDiscoveryStage === 'qualificacao') renderQualification(play); else if (activeDiscoveryStage === 'proximo_passo') renderNextStep(play); else renderSpinQuestions(play, activeDiscoveryStage); }
function renderSpinQuestions(play, stage) { const questions = [...(play[SPIN_STAGES.find((item) => item.id === stage).source] || []), ...getCustomQuestions(play.id, stage)]; document.getElementById('discoveryQuestionList').innerHTML = questions.map((question, index) => { const questionUid = question.id || `custom-${index}`; const response = getSavedResponse(questionUid, stage); return `<article class="discovery-question-row"><div><span class="question-number">${index + 1}</span><p>${question.text || question}</p><small>Fonte: ${question.custom ? 'Pergunta personalizada' : 'Planilha 360'} · ${SPIN_STAGES.find((item) => item.id === stage).label}</small></div><button class="ask-question-button" data-question="${encodeURIComponent(question.text || question)}" data-question-uid="${questionUid}">${response?.status === 'respondida' ? 'Editar resposta' : 'Fazer esta pergunta'}</button></article>`; }).join(''); document.querySelectorAll('.ask-question-button').forEach((button) => button.addEventListener('click', () => selectQuestion(decodeURIComponent(button.dataset.question), button.dataset.questionUid, stage))); }
function getCustomQuestions(playId, stage) { const meeting = state.activeMeetingId ? getMeetingById(state.activeMeetingId) : null; return (meeting?.perguntas_personalizadas || []).filter((question) => question.sales_play_id === playId && question.etapa_spin === stage); }
function selectQuestion(text, uid, stage) { selectedQuestion = { text, uid, stage }; const saved = getSavedResponse(uid, stage); document.getElementById('selectedQuestionText').textContent = text; document.getElementById('answerSolution').textContent = getActivePlay().solucao_potencial; document.getElementById('answerStage').textContent = SPIN_STAGES.find((item) => item.id === stage)?.label || stage; document.getElementById('answerTime').textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); document.getElementById('answerInput').value = saved?.resposta || ''; document.getElementById('answerInput').disabled = state.readOnly; }
function renderQualification(play) { const meeting = state.activeMeetingId ? getMeetingById(state.activeMeetingId) : null; document.getElementById('discoveryQuestionList').innerHTML = QUALIFICATION_ITEMS.map((item, index) => { const saved = meeting?.respostas?.[getResponseKey(play.id, 'qualificacao', `qual-${index + 1}`)]; return `<div class="qualification-row"><p><span class="question-number">${index + 1}</span>${item}</p><div class="qualification-controls"><select data-qualification="qual-${index + 1}" ${state.readOnly ? 'disabled' : ''}><option value="">Selecionar</option><option ${saved?.resposta === 'Sim' ? 'selected' : ''}>Sim</option><option ${saved?.resposta === 'Não' ? 'selected' : ''}>Não</option><option ${saved?.resposta === 'Não confirmado' ? 'selected' : ''}>Não confirmado</option></select><input data-qualification-note="qual-${index + 1}" value="${saved?.observacao || ''}" placeholder="Observação" ${state.readOnly ? 'disabled' : ''}></div></div>`; }).join(''); document.querySelectorAll('[data-qualification]').forEach((field) => field.addEventListener('change', () => { const note = document.querySelector(`[data-qualification-note="${field.dataset.qualification}"]`).value; saveDiscoveryResponse(field.dataset.qualification, 'qualificacao', field.value, 'respondida'); const meeting = getMeetingById(state.activeMeetingId); const key = getResponseKey(play.id, 'qualificacao', field.dataset.qualification); meeting.respostas[key].observacao = note; saveMeeting(meeting); })); }
function renderNextStep(play) { const meeting = state.activeMeetingId ? getMeetingById(state.activeMeetingId) : null; const values = meeting?.proximo_passo_detalhado || {}; document.getElementById('discoveryQuestionList').innerHTML = `<div class="next-step-form"><label>Próxima melhor ação<input data-next-field="acao" value="${values.acao || ''}" ${state.readOnly ? 'disabled' : ''}></label><label>Responsável<input data-next-field="responsavel" value="${values.responsavel || ''}" ${state.readOnly ? 'disabled' : ''}></label><label>Data / prazo<input data-next-field="prazo" type="date" value="${values.prazo || ''}" ${state.readOnly ? 'disabled' : ''}></label><label>Cliente / stakeholder envolvido<input data-next-field="stakeholder" value="${values.stakeholder || ''}" ${state.readOnly ? 'disabled' : ''}></label><label>Parceiro envolvido<input data-next-field="parceiro" value="${values.parceiro || ''}" ${state.readOnly ? 'disabled' : ''}></label><label>Reunião necessária<input data-next-field="reuniao" value="${values.reuniao || ''}" ${state.readOnly ? 'disabled' : ''}></label><label>Dados pendentes<textarea data-next-field="dados" rows="3" ${state.readOnly ? 'disabled' : ''}>${values.dados || ''}</textarea></label><label>Observações<textarea data-next-field="observacoes" rows="3" ${state.readOnly ? 'disabled' : ''}>${values.observacoes || ''}</textarea></label></div>`; document.querySelectorAll('[data-next-field]').forEach((field) => field.addEventListener('change', () => { if (!state.activeMeetingId || state.readOnly) return; const currentMeeting = getMeetingById(state.activeMeetingId); currentMeeting.proximo_passo_detalhado = { ...(currentMeeting.proximo_passo_detalhado || {}), [field.dataset.nextField]: field.value }; saveMeeting(currentMeeting); })); }

function renderFinalChecklist() { const previous = getFinalChecklist(state.activeMeetingId); finalChecklistDraft = FINAL_QUALIFICATION_QUESTIONS.map((pergunta, index) => ({ pergunta, resposta: previous?.respostas?.[index]?.resposta || '' })); document.getElementById('finalChecklistItems').innerHTML = FINAL_QUALIFICATION_QUESTIONS.map((pergunta, index) => `<div class="final-check-item" data-final-row="${index}"><span>${index + 1}. ${pergunta}</span><div class="final-check-options"><button type="button" data-final-check="${index}" data-value="sim">Sim</button><button type="button" data-final-check="${index}" data-value="nao">Não</button></div></div>`).join(''); document.querySelectorAll('[data-final-check]').forEach((button) => button.addEventListener('click', () => { finalChecklistDraft[Number(button.dataset.finalCheck)].resposta = button.dataset.value; updateFinalChecklistMessage(); })); updateFinalChecklistMessage(); }
function getFinalChecklistValues() { return finalChecklistDraft; }
function updateFinalChecklistMessage() { const values = getFinalChecklistValues(); const answered = values.filter((item) => item.resposta); const total = values.filter((item) => item.resposta === 'sim').length; const complete = answered.length === values.length; const percent = total * 10; const message = document.getElementById('qualificationMessage'); document.querySelectorAll('.final-check-item').forEach((item, index) => { item.classList.toggle('is-no', values[index].resposta === 'nao'); item.classList.toggle('is-unanswered', !values[index].resposta); item.querySelectorAll('[data-final-check]').forEach((button) => button.classList.toggle('selected', button.dataset.value === values[index].resposta)); }); message.className = `qualification-message ${!complete || percent < 80 ? 'warning' : 'positive'}`; message.textContent = !complete ? `Responda todas as 10 perguntas para continuar. (${answered.length}/10 respondidas)` : percent < 80 ? `Apenas ${percent}% das perguntas foram confirmadas como "Sim". Recomendamos buscar mais informações antes de finalizar.` : `${percent}% de aderência. Esta reunião apresenta bons indicadores de oportunidade com alto potencial de pipeline.`; document.getElementById('qualificationConfirmButton').disabled = !complete; document.getElementById('qualificationConfirmButton').textContent = percent < 80 ? 'Finalizar mesmo assim' : 'Finalizar reunião'; document.getElementById('qualificationBackButton').hidden = complete && percent >= 80; }
function openQualificationModal() { renderFinalChecklist(); document.getElementById('qualificationModal').hidden = false; }
function closeQualificationModal() { document.getElementById('qualificationModal').hidden = true; }
function finalizeMeeting() { const values = getFinalChecklistValues(); const total = values.filter((item) => item.resposta === 'sim').length; const checklist = { meeting_id: state.activeMeetingId, respostas: values, total_sim: total, percentual: total * 10, decisao_usuario: total < 8 ? 'finalizou_apos_alerta' : 'finalizar_direto', respondido_em: new Date().toISOString() }; saveFinalChecklist(state.activeMeetingId, checklist); registrarAuditoria(state.activeMeetingId, `Checklist de qualificação final registrado (${total}/10 · ${total * 10}%).`); const meeting = getMeetingById(state.activeMeetingId); meeting.status = 'concluida'; saveMeeting(meeting); registrarAuditoria(state.activeMeetingId, 'Reunião finalizada e relatório gerado.'); closeQualificationModal(); navigate('workspace', state.activeMeetingId); setMeetingTab('summary'); }
function reportCard(title, content, key = '') { const friendlyTitles = { accountPlan: 'Account Plan', followUpEmail: 'Follow Up Email', crmDescription: 'Profile Description', executiveSummary: 'Executive Summary', nextSteps: 'Next Steps', customerProfile: 'Customer Profile', businessChallenges: 'Business Challenges' }; const displayTitle = friendlyTitles[title] || title.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (letter) => letter.toUpperCase()); const meeting = state.activeMeetingId ? getMeetingById(state.activeMeetingId) : null; const identifier = title === 'Dados da reunião' && meeting ? `<p class="report-identifier"><b>${meeting.identificador_tipo === 'oportunidade' ? 'Oportunidade' : 'Lead'}:</b> ${escapeHtml(meeting.identificador_numero || 'Não informado')}</p>` : ''; const editable = REPORTABLE_MATERIALS.includes(key); return `<article class="report-card ${editable ? 'editable-report-card' : ''}"><div class="report-card-heading"><h2>${displayTitle}</h2>${editable ? `<button class="save-material-button" data-material-key="${key}" hidden>Salvar</button>` : ''}</div><div class="report-card-content" data-material-content="${key}">${identifier}${editable ? `<p>${escapeHtml(content).replaceAll('\n', '<br>')}</p>` : content}</div></article>`; }
function renderReport(meetingId) { const meeting = getMeetingById(meetingId); if (!meeting) return; const intelligence = gerarInteligenciaEstruturada(meetingId); const materials = getReportMaterials(meetingId); const checklist = getFinalChecklist(meetingId); const partner = getDadosParceiro(meetingId); document.getElementById('reportTitle').textContent = `${meeting.empresa}${meeting.tpid ? ` (${meeting.tpid})` : ''}`; document.getElementById('reportSubtitle').textContent = `${primaryPlay(meeting)?.titulo || meeting.assunto} · atualizado em ${new Date(meeting.updated_at).toLocaleString('pt-BR')}`; const checklistHtml = checklist ? `<strong>${checklist.total_sim}/10 · ${checklist.percentual}%</strong><ul>${checklist.respostas.map((item) => `<li class="${item.resposta === 'nao' ? 'report-no' : ''}">${item.resposta === 'sim' ? '✓' : '×'} ${escapeHtml(item.pergunta)}</li>`).join('')}</ul><p>${checklist.percentual < 80 ? 'Reunião finalizada abaixo do recomendado (80%), por decisão do CLM.' : 'Esta reunião apresenta bons indicadores de oportunidade.'}</p>` : '<p>Não registrado.</p>'; const dataHtml = `<p><b>Cliente:</b> ${escapeHtml(meeting.cliente)}<br><b>TPID:</b> ${escapeHtml(meeting.tpid || 'Não informado')}<br><b>Status:</b> Concluída<br><b>Participantes:</b> ${escapeHtml(meeting.cliente)} (Cliente), ${USER_NAME} (CLM)</p><p><b>Anotações originais:</b><br>${escapeHtml([meeting.contexto_previo, ...(meeting.contextos_adicionais || [])].filter(Boolean).join('\n') || 'Não informado.')}</p>`; const intelligenceHtml = `<p>${escapeHtml(intelligence.opening)}</p><p><b>Produtos:</b> ${escapeHtml(intelligence.products.join(', '))}<br><b>SPIN:</b> ${escapeHtml(intelligence.spin)}<br><b>Oportunidades:</b> ${escapeHtml(intelligence.opportunities.join(', '))}<br><b>${escapeHtml(intelligence.qualification)}</b></p>`; const partnerHtml = partner ? `<p><b>Opportunity Intent:</b> ${escapeHtml((OPPORTUNITY_MOTIONS.find((motion) => motion.id === partner.opportunity_intent) || {}).label || partner.opportunity_intent)}<br><b>Parceiro:</b> ${escapeHtml(partner.parceiro_nome)}${partner.distribuidora ? `<br><b>Distribuidora:</b> ${escapeHtml(partner.distribuidora)}` : ''}<br><b>DAS / Owner:</b> ${escapeHtml(partner.das)}<br><b>Engajamento:</b> ${escapeHtml(partner.engajamento)}</p>` : '<p>Não informado.</p>'; document.getElementById('reportCards').innerHTML = reportCard('Dados da reunião', dataHtml) + reportCard('Parceiro envolvido', partnerHtml) + reportCard('Inteligência estruturada', intelligenceHtml) + reportCard('accountPlan', materials.account_plan, 'account_plan') + reportCard('followUpEmail', materials.follow_up_email, 'follow_up_email') + reportCard('crmDescription', materials.crm_description, 'crm_description') + reportCard('executiveSummary', materials.executive_summary, 'executive_summary') + reportCard(`Perguntas e Respostas Registradas (${allSavedResponses(meeting).length})`, `<pre>${escapeHtml(gerarTranscricaoCompleta(meetingId))}</pre><button id="copyTranscriptButton" class="copy-button">Copiar como texto</button>`) + reportCard('Checklist de Qualificação Final', checklistHtml) + reportCard('Auditoria', `<ul class="audit-list">${auditHtml(meetingId)}</ul>`); bindReportActions(meetingId); }
function bindReportActions(meetingId) { document.getElementById('copyTranscriptButton')?.addEventListener('click', () => navigator.clipboard?.writeText(gerarTranscricaoCompleta(meetingId))); document.querySelectorAll('.save-material-button').forEach((button) => button.addEventListener('click', () => { const key = button.dataset.materialKey; const editor = button.parentElement.nextElementSibling.querySelector('textarea'); saveReportMaterial(meetingId, { [key]: editor.value }); registrarAuditoria(meetingId, `Texto de ${key} editado manualmente por ${USER_NAME}.`); renderReport(meetingId); })); }
function toggleMaterialEditing(meetingId) { document.querySelectorAll('.editable-report-card').forEach((card) => { const content = card.querySelector('.report-card-content'); const key = content.dataset.materialContent; const current = getReportMaterials(meetingId)[key]; content.innerHTML = `<textarea>${escapeHtml(current)}</textarea>`; card.querySelector('.save-material-button').hidden = false; }); }

function getVisiblePlays() {
  const query = state.query.toLocaleLowerCase('pt-BR');
  return state.plays.filter((play) => {
    const matchesFilter = state.filter === 'TODOS' || play.categoria.includes(state.filter);
    const searchable = [play.titulo, play.gatilho, play.solucao_potencial, play.sinais_alto_potencial, ...play.categoria].join(' ').toLocaleLowerCase('pt-BR');
    return matchesFilter && searchable.includes(query);
  });
}

function render() {
  const visible = getVisiblePlays();
  elements.grid.innerHTML = visible.map((play, index) => `
    <article class="play-card" data-id="${play.id}" style="animation-delay: ${Math.min(index * 35, 280)}ms">
      <div class="card-top"><span class="play-number">${String(play.id).padStart(2, '0')}</span><div class="chips">${play.categoria.map((category) => `<span class="chip">${category}</span>`).join('')}</div></div>
      <h3>${play.titulo}</h3><p class="trigger">${play.gatilho}</p>
      <div class="card-footer"><span>${play.solucao_potencial}</span><span class="arrow">↗</span></div>
    </article>`).join('');
  elements.empty.hidden = visible.length > 0;
  elements.count.textContent = `${visible.length} ${visible.length === 1 ? 'resultado' : 'resultados'}`;
  elements.title.textContent = state.filter === 'TODOS' ? 'Todos os plays' : state.filter;
  elements.grid.querySelectorAll('.play-card').forEach((card) => card.addEventListener('click', () => {
    const playId = Number(card.dataset.id);
    openDetail(playId);
    if (state.activeMeetingId && !state.readOnly) {
      const meeting = getMeetingById(state.activeMeetingId);
      if (meeting) { meeting.sales_play_ativo = playId; saveMeeting(meeting); }
    }
  }));
}

function setList(id, values) {
  document.getElementById(id).innerHTML = values.map((value) => `<li>${value}</li>`).join('');
}

function openDetail(id) {
  const play = state.plays.find((item) => item.id === id);
  if (!play) return;
  selectedLibraryPlayId = id;
  document.getElementById('detailCategory').textContent = `${play.categoria.join(' + ')} · PLAY ${String(play.id).padStart(2, '0')}`;
  document.getElementById('detailTitle').textContent = play.titulo;
  document.getElementById('detailTrigger').textContent = play.gatilho;
  document.getElementById('detailSolution').textContent = play.solucao_potencial;
  document.getElementById('detailPotential').textContent = play.sinais_alto_potencial;
  document.getElementById('detailClm').textContent = play.orientacao_clm;
  setList('detailSituation', play.situacao);
  setList('detailProblem', play.problema);
  setList('detailImplication', play.implicacao);
  setList('detailPayoff', play.need_payoff);
  elements.panel.classList.add('open');
  elements.backdrop.classList.add('open');
  elements.panel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  elements.panel.classList.remove('open');
  elements.backdrop.classList.remove('open');
  elements.panel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('filterGroup').addEventListener('click', (event) => {
  const button = event.target.closest('.filter');
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
  render();
});
elements.input.addEventListener('input', (event) => { state.query = event.target.value; render(); });
document.getElementById('closePanel').addEventListener('click', closeDetail);
elements.backdrop.addEventListener('click', closeDetail);
document.getElementById('usePlayButton').addEventListener('click', () => { const active = getMeetings().filter((meeting) => meeting.status === 'em_andamento').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]; if (!active) { closeDetail(); navigate('form'); showToast('Nenhuma reunião em andamento no momento.'); return; } const play = state.plays.find((item) => item.id === selectedLibraryPlayId); const meeting = getMeetingById(active.id); meeting.sales_play_ativo = play?.id || null; saveMeeting(meeting); closeDetail(); navigate('workspace', active.id); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDetail(); });
document.getElementById('newMeetingButton').addEventListener('click', () => navigate('form'));document.getElementById('formBackButton').addEventListener('click', () => navigate('dashboard'));
document.getElementById('identifierTypeToggle').addEventListener('change', updateMeetingIdentifierField);
document.getElementById('cancelFormButton').addEventListener('click', () => navigate('dashboard'));
document.getElementById('addContextButton').addEventListener('click', () => addContextField());
document.getElementById('saveDraftButton').addEventListener('click', () => saveFromForm('rascunho'));
document.getElementById('meetingForm').addEventListener('submit', (event) => { event.preventDefault(); saveFromForm('em_andamento'); });
document.getElementById('workspaceBackButton').addEventListener('click', () => { updateActiveMeeting(); navigate('dashboard'); });
document.getElementById('completeMeetingButton').addEventListener('click', () => { if (!state.activeMeetingId) return; updateActiveMeeting(); openQualificationModal(); });
document.getElementById('qualificationConfirmButton').addEventListener('click', finalizeMeeting);
document.getElementById('qualificationBackButton').addEventListener('click', closeQualificationModal);
document.getElementById('reportWordButton').addEventListener('click', () => { baixarRelatorioComoWord(state.activeMeetingId); renderReport(state.activeMeetingId); });
document.getElementById('editMaterialsButton').addEventListener('click', () => toggleMaterialEditing(state.activeMeetingId));
document.getElementById('reportBackButton').addEventListener('click', () => navigate('dashboard'));
document.querySelectorAll('.global-nav a').forEach((link) => link.addEventListener('click', (event) => { const target = link.getAttribute('href').slice(1); if (target === 'nova-reuniao') { event.preventDefault(); navigate('form'); } else if (target === 'validacao-acessos' && !isAdmin()) { event.preventDefault(); navigate('dashboard'); showToast('Você não tem permissão para acessar esta página.'); } }));
document.getElementById('checklistInstanceSelect').addEventListener('change', (event) => { activeChecklistInstanceId = event.target.value; renderChecklists(); });
document.getElementById('newChecklistInstanceButton').addEventListener('click', createChecklistInstanceFromPrompt);
document.getElementById('confirmChecklistInstanceButton').addEventListener('click', confirmChecklistInstance);
document.querySelectorAll('.meeting-tab').forEach((button) => button.addEventListener('click', () => setMeetingTab(button.dataset.meetingTab)));
document.getElementById('copyWorkspaceTranscript').addEventListener('click', () => navigator.clipboard?.writeText(gerarTranscricaoCompleta(state.activeMeetingId)));
document.getElementById('logoutButton').addEventListener('click', () => {
  clearSession();
  navigate('login');
});
document.getElementById('opportunityInput').addEventListener('change', updateActiveMeeting);
document.getElementById('nextStepInput').addEventListener('change', updateActiveMeeting);
document.getElementById('partnerSearch').addEventListener('input', () => { renderPartnerSuggestions(document.getElementById('partnerSearch'), document.getElementById('partnerSuggestions'), PARTNERS_LIST, (button) => { if (button.dataset.manual) { partnerState.partner = null; partnerState.manual = ''; renderPartnerPane(); closePartnerSuggestions(); document.getElementById('manualPartnerInput').focus(); } else { partnerState.partner = findPartnerByName(decodeURIComponent(button.dataset.partnerName)); partnerState.manual = ''; partnerState.distributor = null; savePartnerState(); renderPartnerPane(); closePartnerSuggestions(); } }); });
document.getElementById('distributorSearch').addEventListener('input', () => renderPartnerSuggestions(document.getElementById('distributorSearch'), document.getElementById('distributorSuggestions'), DISTRIBUTORS_LIST, (button) => { partnerState.distributor = findPartnerByName(decodeURIComponent(button.dataset.partnerName)); savePartnerState(); renderPartnerPane(); closePartnerSuggestions(); }));
document.getElementById('manualPartnerInput').addEventListener('input', (event) => { partnerState.manual = event.target.value.trim(); savePartnerState(); renderPartnerPane(); });
document.addEventListener('click', (event) => { const manualOption = event.target.closest('#partnerSuggestions [data-manual="true"]'); if (manualOption) { partnerState.partner = null; partnerState.manual = ''; partnerState.manualMode = true; closePartnerSuggestions(); document.getElementById('manualPartnerField').hidden = false; document.getElementById('distributorField').hidden = false; document.getElementById('distributorError').hidden = false; document.getElementById('manualPartnerInput').value = ''; document.getElementById('manualPartnerInput').focus(); return; } if (!event.target.closest('#partnerSearch, #partnerSuggestions, #distributorSearch, #distributorSuggestions')) closePartnerSuggestions(); });
document.getElementById('partnerSuggestions').addEventListener('click', (event) => { const manualOption = event.target.closest('[data-manual="true"]'); if (!manualOption) return; event.preventDefault(); event.stopImmediatePropagation(); partnerState.partner = null; partnerState.manual = ''; partnerState.manualMode = true; closePartnerSuggestions(); document.getElementById('manualPartnerField').hidden = false; document.getElementById('distributorField').hidden = false; document.getElementById('distributorError').hidden = false; document.getElementById('manualPartnerInput').value = ''; document.getElementById('manualPartnerInput').focus(); }, true);
document.getElementById('salesPlayOptions').innerHTML = state.plays.map((play) => `<option value="${play.titulo}">`).join('');
document.getElementById('matrixBody').innerHTML = OPPORTUNITY_MATRIX.map((row) => `<tr><td>${row.sinal}</td><td>${row.abordagem}</td><td>${row.tipo}</td></tr>`).join('');
document.getElementById('matrixSearch').addEventListener('input', (event) => { const query = event.target.value.toLocaleLowerCase('pt-BR'); document.querySelectorAll('#matrixBody tr').forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase('pt-BR').includes(query); }); });
document.getElementById('libraryFilterGroup').innerHTML = ['TODOS', 'CROSS-SELL', 'UPSELL', 'ADOPTION', 'EXPANSION', 'MODERNIZATION', 'CONSOLIDATION'].map((filter) => `<button class="filter ${filter === 'TODOS' ? 'active' : ''}" data-filter="${filter}">${filter === 'TODOS' ? 'Todos' : filter}</button>`).join('');
document.getElementById('libraryFilterGroup').addEventListener('click', (event) => { const button = event.target.closest('.filter'); if (!button) return; document.querySelectorAll('#libraryFilterGroup .filter').forEach((item) => item.classList.toggle('active', item === button)); renderLibrary(); });
document.getElementById('librarySearchInput').addEventListener('input', renderLibrary);
document.getElementById('accessNav').hidden = !isAdmin(); document.getElementById('roleLabel').textContent = USER_ROLE; const pendingAccessRequests = updateAccessNotification(); if (isAdmin() && pendingAccessRequests) setTimeout(() => showToast(`${pendingAccessRequests} nova${pendingAccessRequests === 1 ? '' : 's'} solicitação${pendingAccessRequests === 1 ? '' : 'ões'} de acesso aguardando análise.`), 500);
document.getElementById('accessAlertButton').addEventListener('click', openPendingAccessRequests);
document.querySelectorAll('.access-filters .filter').forEach((button) => button.addEventListener('click', () => { requestFilter = button.dataset.requestFilter; document.querySelectorAll('.access-filters .filter').forEach((item) => item.classList.toggle('active', item === button)); renderAccessRequests(); }));
document.querySelectorAll('.access-tab').forEach((button) => button.addEventListener('click', () => { const tab = button.dataset.accessTab; document.querySelectorAll('.access-tab').forEach((item) => item.classList.toggle('active', item === button)); document.getElementById('accessRequestsPane').hidden = tab !== 'requests'; document.getElementById('accessEmailsPane').hidden = tab !== 'emails'; document.getElementById('accessOverviewPane').hidden = tab !== 'overview'; }));
window.addEventListener('storage', (event) => { if (event.key === 'discovery_access_requests') { const previous = Number(document.getElementById('accessAlertCount').textContent || 0); const current = updateAccessNotification(); if (isAdmin() && current > previous) showToast('Nova solicitação de acesso recebida.'); if (!document.getElementById('accessView').hidden) renderAccessRequests(); } });
if (isAdmin()) setInterval(updateAccessNotification, 3000);
document.getElementById('saveAnswerButton').addEventListener('click', () => { if (!selectedQuestion) return; saveDiscoveryResponse(selectedQuestion.uid, selectedQuestion.stage, document.getElementById('answerInput').value.trim(), 'respondida', selectedQuestion.text); renderDiscovery(); selectQuestion(selectedQuestion.text, selectedQuestion.uid, selectedQuestion.stage); });
document.getElementById('cancelAnswerButton').addEventListener('click', () => { if (selectedQuestion) selectQuestion(selectedQuestion.text, selectedQuestion.uid, selectedQuestion.stage); });
document.querySelectorAll('[data-answer-status]').forEach((button) => button.addEventListener('click', () => { if (!selectedQuestion) return; saveDiscoveryResponse(selectedQuestion.uid, selectedQuestion.stage, '', button.dataset.answerStatus, selectedQuestion.text); renderDiscovery(); selectQuestion(selectedQuestion.text, selectedQuestion.uid, selectedQuestion.stage); }));
document.getElementById('addCustomQuestionButton').addEventListener('click', () => { if (!state.activeMeetingId || state.readOnly || !['situacao', 'problema', 'implicacao', 'need_payoff'].includes(activeDiscoveryStage)) return; const text = window.prompt('Digite a pergunta personalizada:'); if (!text?.trim()) return; const meeting = getMeetingById(state.activeMeetingId); meeting.perguntas_personalizadas = [...(meeting.perguntas_personalizadas || []), { id: `custom-${Date.now()}`, text: text.trim(), sales_play_id: Number(activePlayId), etapa_spin: activeDiscoveryStage, custom: true }]; saveMeeting(meeting); renderDiscovery(); });
document.getElementById('workspaceView').addEventListener('change', (event) => { const selector = event.target.closest('#salesPlaySelector'); if (!selector) return; activePlayId = Number(selector.value); selectedQuestion = null; if (state.activeMeetingId && !state.readOnly) { const meeting = getMeetingById(state.activeMeetingId); meeting.sales_play_ativo = activePlayId; saveMeeting(meeting); } renderDiscovery(); });
renderDiscovery();

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const remember = document.getElementById('rememberLogin').checked;
  const user = authenticate(email, password);
  const errorEl = document.getElementById('loginError');
  if (!user) {
    errorEl.textContent = 'E-mail ou senha inválidos.';
    return;
  }
  errorEl.textContent = '';
  saveSession(user, remember);
  location.reload();
});

document.getElementById('togglePassword').addEventListener('click', () => {
  const field = document.getElementById('loginPassword');
  const button = document.getElementById('togglePassword');
  const isHidden = field.type === 'password';
  field.type = isHidden ? 'text' : 'password';
  button.textContent = isHidden ? 'Ocultar' : 'Mostrar';
});

document.getElementById('forgotPassword').addEventListener('click', () => {
  showToast('Entre em contato com o administrador da plataforma para redefinir sua senha.');
});

document.getElementById('microsoftLogin').addEventListener('click', () => {
  showToast('Integração com Microsoft Entra ID disponível apenas em ambiente de produção.');
});

document.getElementById('requestAccessButton').addEventListener('click', openRequestModal);
document.getElementById('closeRequestButton').addEventListener('click', closeRequestModal);
document.getElementById('cancelRequestButton').addEventListener('click', closeRequestModal);
document.getElementById('accessRequestForm').addEventListener('submit', submitAccessRequest);

document.getElementById('helpButton').addEventListener('click', () => { document.getElementById('helpModal').hidden = false; });
document.getElementById('closeHelpButton').addEventListener('click', () => { document.getElementById('helpModal').hidden = true; });

document.getElementById('cancelRejectButton').addEventListener('click', () => { document.getElementById('rejectRequestModal').hidden = true; });
document.getElementById('closeRejectButton').addEventListener('click', () => { document.getElementById('rejectRequestModal').hidden = true; });
document.getElementById('confirmRejectButton').addEventListener('click', rejectRequest);

window.addEventListener('hashchange', () => {
  const view = window.location.hash.slice(1);
  if (view === 'dashboard' || !view) navigate('dashboard');
  if (view.startsWith('reuniao/')) navigate('workspace', view.split('/')[1]);
  if (view.startsWith('relatorio/')) { navigate('workspace', view.split('/')[1]); setMeetingTab('summary'); }
  if (view === 'nova-reuniao') navigate('form');
  if (view === 'biblioteca') navigate('library');
  if (view === 'checklists') navigate('checklists');
  if (view === 'auditoria-ligacao') navigate('callAudit');
  if (view === 'validacao-acessos') { if (isAdmin()) navigate('access'); else { navigate('dashboard'); showToast('Você não tem permissão para acessar esta página.'); } }
});

elements.focusCount.textContent = state.plays.length;
render();
const initialRoute = window.location.hash.slice(1);
if (!CURRENT_SESSION) {
  navigate('login');
} else if (initialRoute.startsWith('relatorio/')) { navigate('workspace', initialRoute.split('/')[1]); setMeetingTab('summary'); }
else if (initialRoute.startsWith('reuniao/')) navigate('workspace', initialRoute.split('/')[1]);
else if (initialRoute === 'biblioteca') navigate('library');
else if (initialRoute === 'checklists') navigate('checklists');
else if (initialRoute === 'auditoria-ligacao') navigate('callAudit');
else if (initialRoute === 'validacao-acessos') { if (isAdmin()) navigate('access'); else navigate('dashboard'); }
else if (initialRoute === 'nova-reuniao') navigate('form');
else navigate('dashboard');
