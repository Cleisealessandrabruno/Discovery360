const CALL_AUDIT_KEY = 'discovery_call_audits';
const CALL_AUDIT_SECTIONS = [
  { title: 'Introdução e preparação', questions: ['O representante informou seu nome?', 'O representante informou sua função?', 'O representante mencionou sua ligação com a Microsoft?', 'O representante confirmou se o cliente tinha tempo disponível para a ligação?', 'O representante explicou o objetivo da ligação e o valor que a Microsoft pode oferecer?'] },
  { title: 'Descoberta e engajamento', questions: ['O representante fez perguntas abertas para compreender as necessidades do cliente, seguindo uma abordagem consultiva Microsoft?', 'O representante ouviu ativamente e adaptou a conversa com base nas respostas do cliente?', 'O representante construiu confiança e conexão, demonstrando uma atitude centrada no cliente?', 'O representante manteve o controle da conversa enquanto promovia a colaboração?'] },
  { title: 'Entrega de valor', questions: ['As soluções Microsoft, como Azure, Microsoft 365 ou Dynamics 365, foram apresentadas naturalmente durante a conversa?', 'O representante demonstrou de forma eficaz como as soluções Microsoft atendem às necessidades específicas do negócio do cliente?', 'A conversa foi alinhada às principais propostas de valor da Microsoft: segurança, escalabilidade e inovação?', 'As informações técnicas foram comunicadas de maneira fácil de compreender?'] },
  { title: 'Tratamento de preocupações', questions: ['O representante reconheceu e validou as objeções utilizando uma abordagem baseada em empatia?', 'As objeções foram tratadas utilizando soluções Microsoft e histórias de sucesso relevantes?'] },
  { title: 'Fechamento e próximos passos', questions: ['O representante resumiu os pontos principais e confirmou o entendimento mútuo?', 'Um próximo passo claro foi proposto e acordado?', 'O representante agradeceu o tempo do cliente e encerrou a conversa de maneira profissional?'] }
];

let activeCallAudit = { lead: '', answers: {}, score: null, analysis: null };
const callAuditQuestionCount = CALL_AUDIT_SECTIONS.reduce((total, section) => total + section.questions.length, 0);
function callAuditEscape(value) { return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function getCallAudits() { try { return JSON.parse(localStorage.getItem(CALL_AUDIT_KEY) || '[]'); } catch { return []; } }
function calculateCallAuditScore() { const yes = Object.values(activeCallAudit.answers).filter((answer) => answer === 'sim').length; const raw = 1 + (4 * yes / callAuditQuestionCount); return Math.round(raw * 2) / 2; }
function sectionResult(section, sectionIndex) { const answers = section.questions.map((_, questionIndex) => activeCallAudit.answers[`${sectionIndex}-${questionIndex}`]); const yes = answers.filter((answer) => answer === 'sim').length; return { yes, total: answers.length, percentage: Math.round(yes / answers.length * 100) }; }
function resultPhrase(result, positive, improvement) { return result.percentage >= 75 ? positive : improvement; }

function buildCallAuditAnalysis() {
  const results = CALL_AUDIT_SECTIONS.map(sectionResult);
  const strengths = results.map((result, index) => ({ result, title: CALL_AUDIT_SECTIONS[index].title })).filter((item) => item.result.percentage >= 75).map((item) => `${item.title}: ${item.result.percentage}% de aderência.`);
  const improvements = results.map((result, index) => ({ result, title: CALL_AUDIT_SECTIONS[index].title })).filter((item) => item.result.percentage < 75).map((item) => `${item.title}: reforçar os comportamentos esperados; aderência atual de ${item.result.percentage}%.`);
  return {
    strengths: strengths.length ? strengths : ['A avaliação não identificou uma área com aderência igual ou superior a 75%.'],
    improvements: improvements.length ? improvements : ['Manter a consistência dos comportamentos observados em todas as etapas.'],
    process: resultPhrase({ percentage: Math.round(results.reduce((sum, item) => sum + item.percentage, 0) / results.length) }, 'Boa aderência geral ao processo Microsoft.', 'Aderência parcial ao processo Microsoft; recomenda-se reforçar o roteiro completo.'),
    discovery: resultPhrase(results[1], 'A descoberta demonstrou escuta ativa e abordagem consultiva.', 'A descoberta precisa de mais perguntas abertas, escuta ativa e adaptação.'),
    value: resultPhrase(results[2], 'A entrega de valor conectou soluções Microsoft às necessidades do cliente.', 'A entrega de valor deve conectar melhor as soluções Microsoft aos desafios do cliente.'),
    objections: resultPhrase(results[3], 'As objeções foram acolhidas e tratadas com empatia.', 'Praticar validação das objeções e utilizar casos de sucesso relevantes.'),
    closing: resultPhrase(results[4], 'O fechamento estabeleceu entendimento e próximos passos claros.', 'Reforçar o resumo, o acordo de próximo passo e o encerramento profissional.'),
    recommendations: ['Preparar uma abertura curta com nome, função, vínculo Microsoft e objetivo da conversa.', 'Priorizar perguntas abertas e registrar exemplos concretos apresentados pelo cliente.', 'Relacionar cada solução recomendada a uma necessidade de negócio identificada.', 'Encerrar confirmando responsável, ação e prazo do próximo passo.']
  };
}

function renderCallAuditAnalysis() {
  const panel = document.getElementById('callAuditAnalysis');
  const content = document.getElementById('callAuditAnalysisContent');
  if (!panel || !content || !activeCallAudit.analysis) { if (panel) panel.hidden = true; return; }
  const analysis = activeCallAudit.analysis;
  content.innerHTML = `<div class="audit-analysis-grid"><article><h3>Pontos fortes</h3><ul>${analysis.strengths.map((item) => `<li>${callAuditEscape(item)}</li>`).join('')}</ul></article><article><h3>Oportunidades de melhoria</h3><ul>${analysis.improvements.map((item) => `<li>${callAuditEscape(item)}</li>`).join('')}</ul></article></div><article><h3>Feedback estruturado para o representante</h3><dl><dt>Aderência ao processo Microsoft</dt><dd>${callAuditEscape(analysis.process)}</dd><dt>Qualidade da descoberta</dt><dd>${callAuditEscape(analysis.discovery)}</dd><dt>Entrega de valor</dt><dd>${callAuditEscape(analysis.value)}</dd><dt>Tratamento de objeções</dt><dd>${callAuditEscape(analysis.objections)}</dd><dt>Fechamento e próximos passos</dt><dd>${callAuditEscape(analysis.closing)}</dd></dl><h3>Recomendações práticas</h3><ul>${analysis.recommendations.map((item) => `<li>${callAuditEscape(item)}</li>`).join('')}</ul></article>`;
  panel.hidden = false;
}

function renderCallAudit() {
  const container = document.getElementById('callAuditQuestions');
  if (!container) return;
  const meetings = typeof getMeetings === 'function' ? getMeetings().filter((meeting) => meeting.identificador_numero) : [];
  document.getElementById('callAuditMeetingIdentifiers').innerHTML = meetings.map((meeting) => `<option value="${callAuditEscape(meeting.identificador_numero)}">${meeting.identificador_tipo === 'oportunidade' ? 'Oportunidade' : 'Lead'} · ${callAuditEscape(meeting.empresa)} · ${callAuditEscape(meeting.assunto)}</option>`).join('');
  document.getElementById('callAuditLead').value = activeCallAudit.lead;
  document.getElementById('callAuditScore').textContent = activeCallAudit.score ?? '—';
  container.innerHTML = CALL_AUDIT_SECTIONS.map((section, sectionIndex) => `<section class="call-audit-group"><div class="call-audit-group-heading"><span>${String(sectionIndex + 1).padStart(2, '0')}</span><h2>${section.title}</h2></div>${section.questions.map((question, questionIndex) => { const key = `${sectionIndex}-${questionIndex}`; return `<div class="call-audit-question"><p>${question}</p><div class="audit-answer-options" role="group" aria-label="Resposta para: ${callAuditEscape(question)}"><button type="button" data-audit-key="${key}" data-audit-answer="sim" class="${activeCallAudit.answers[key] === 'sim' ? 'selected yes' : ''}">Sim</button><button type="button" data-audit-key="${key}" data-audit-answer="nao" class="${activeCallAudit.answers[key] === 'nao' ? 'selected no' : ''}">Não</button></div></div>`; }).join('')}</section>`).join('');
  container.querySelectorAll('[data-audit-answer]').forEach((button) => button.addEventListener('click', () => { activeCallAudit.answers[button.dataset.auditKey] = button.dataset.auditAnswer; activeCallAudit.analysis = null; activeCallAudit.score = null; renderCallAudit(); }));
  renderCallAuditAnalysis();
}

function generateCallAnalysis() {
  const lead = document.getElementById('callAuditLead').value.trim();
  const message = document.getElementById('callAuditMessage');
  if (!lead) { message.textContent = 'Informe o número da Lead ou Oportunidade.'; return; }
  const meeting = typeof getMeetings === 'function' ? getMeetings().find((item) => item.identificador_numero === lead) : null;
  if (!meeting) { message.textContent = 'Não foi encontrada uma reunião com esse número de Lead ou Oportunidade.'; return; }
  if (Object.keys(activeCallAudit.answers).length !== callAuditQuestionCount) { message.textContent = `Responda Sim ou Não para todas as ${callAuditQuestionCount} perguntas.`; return; }
  activeCallAudit.lead = lead;
  activeCallAudit.meetingId = meeting.id;
  activeCallAudit.identifierType = meeting.identificador_tipo;
  activeCallAudit.score = calculateCallAuditScore();
  activeCallAudit.analysis = buildCallAuditAnalysis();
  activeCallAudit.updatedAt = new Date().toISOString();
  const audits = getCallAudits(); const existing = audits.findIndex((audit) => audit.lead === lead); if (existing >= 0) audits[existing] = activeCallAudit; else audits.push(activeCallAudit); localStorage.setItem(CALL_AUDIT_KEY, JSON.stringify(audits));
  message.textContent = 'Auditoria salva e análise gerada com sucesso.';
  renderCallAudit();
}

function exportCallAuditWord() {
  const message = document.getElementById('callAuditMessage');
  if (!activeCallAudit.analysis) { message.textContent = 'Gere a análise antes de exportar.'; return; }
  const rows = CALL_AUDIT_SECTIONS.map((section, sectionIndex) => `<h2>${section.title}</h2><table><tr><th>Pergunta</th><th>Resposta</th></tr>${section.questions.map((question, questionIndex) => `<tr><td>${callAuditEscape(question)}</td><td>${activeCallAudit.answers[`${sectionIndex}-${questionIndex}`] === 'sim' ? 'Sim' : 'Não'}</td></tr>`).join('')}</table>`).join('');
  const analysis = document.getElementById('callAuditAnalysisContent').innerHTML;
  const identifierLabel = activeCallAudit.identifierType === 'oportunidade' ? 'Oportunidade' : 'Lead';
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial;color:#17121f;margin:32px}h1,h2,h3{color:#5b168b}table{width:100%;border-collapse:collapse;margin-bottom:22px}th,td{border:1px solid #d8c3e5;padding:8px;text-align:left}th{background:#f0e2fa}</style></head><body><h1>Auditoria de Ligação</h1><p><b>${identifierLabel}:</b> ${callAuditEscape(activeCallAudit.lead)}<br><b>Overall Call Score:</b> ${activeCallAudit.score} de 5</p>${rows}<h2>Análise da Ligação</h2>${analysis}</body></html>`;
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob(['\ufeff', html], { type: 'application/msword' })); link.download = `Auditoria_Ligacao_${activeCallAudit.lead.replace(/[^a-z0-9_-]/gi, '_')}.doc`; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function initializeCallAudit() {
  if (document.getElementById('callAuditInitialized')) return;
  const marker = document.createElement('span'); marker.id = 'callAuditInitialized'; marker.hidden = true; document.getElementById('callAuditView').appendChild(marker);
  document.getElementById('callAuditLead').addEventListener('input', (event) => { activeCallAudit.lead = event.target.value; });
  document.getElementById('generateCallAnalysisButton').addEventListener('click', generateCallAnalysis);
  document.getElementById('exportCallAuditButton').addEventListener('click', exportCallAuditWord);
  document.getElementById('newCallAuditButton').addEventListener('click', () => { activeCallAudit = { lead: '', answers: {}, score: null, analysis: null }; document.getElementById('callAuditMessage').textContent = ''; renderCallAudit(); });
  renderCallAudit();
}
