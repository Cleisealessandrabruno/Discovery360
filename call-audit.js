const CALL_AUDIT_KEY = 'discovery_call_audits';
const callAuditTr = (text) => window.DiscoveryI18n?.translate?.(text) || text;
const callAuditLanguage = () => window.DiscoveryI18n?.getLanguage?.() || 'pt';
const CALL_AUDIT_COPY = {
  adherence: { pt: '{title}: {value}% de aderência.', en: '{title}: {value}% adherence.', es: '{title}: {value}% de adherencia.' },
  improve: { pt: '{title}: reforçar os comportamentos esperados; aderência atual de {value}%.', en: '{title}: reinforce expected behaviors; current adherence is {value}%.', es: '{title}: reforzar los comportamientos esperados; adherencia actual de {value}%.' },
  noStrength: { pt: 'A avaliação não identificou uma área com aderência igual ou superior a 75%.', en: 'The assessment did not identify an area with adherence of 75% or higher.', es: 'La evaluación no identificó un área con adherencia igual o superior al 75%.' },
  keepConsistency: { pt: 'Manter a consistência dos comportamentos observados em todas as etapas.', en: 'Maintain consistent observed behaviors across all stages.', es: 'Mantener la consistencia de los comportamientos observados en todas las etapas.' },
  processGood: { pt: 'Boa aderência geral ao processo Microsoft.', en: 'Good overall adherence to the Microsoft process.', es: 'Buena adherencia general al proceso Microsoft.' },
  processImprove: { pt: 'Aderência parcial ao processo Microsoft; recomenda-se reforçar o roteiro completo.', en: 'Partial adherence to the Microsoft process; reinforce the complete framework.', es: 'Adherencia parcial al proceso Microsoft; se recomienda reforzar el marco completo.' },
  discoveryGood: { pt: 'A descoberta demonstrou escuta ativa e abordagem consultiva.', en: 'Discovery demonstrated active listening and a consultative approach.', es: 'El descubrimiento demostró escucha activa y un enfoque consultivo.' },
  discoveryImprove: { pt: 'A descoberta precisa de mais perguntas abertas, escuta ativa e adaptação.', en: 'Discovery needs more open-ended questions, active listening and adaptation.', es: 'El descubrimiento necesita más preguntas abiertas, escucha activa y adaptación.' },
  valueGood: { pt: 'A entrega de valor conectou soluções Microsoft às necessidades do cliente.', en: 'Value delivery connected Microsoft solutions to customer needs.', es: 'La entrega de valor conectó las soluciones Microsoft con las necesidades del cliente.' },
  valueImprove: { pt: 'A entrega de valor deve conectar melhor as soluções Microsoft aos desafios do cliente.', en: 'Value delivery should connect Microsoft solutions more clearly to customer challenges.', es: 'La entrega de valor debe conectar mejor las soluciones Microsoft con los desafíos del cliente.' },
  objectionsGood: { pt: 'As objeções foram acolhidas e tratadas com empatia.', en: 'Objections were acknowledged and handled with empathy.', es: 'Las objeciones fueron reconocidas y tratadas con empatía.' },
  objectionsImprove: { pt: 'Praticar validação das objeções e utilizar casos de sucesso relevantes.', en: 'Practice validating objections and use relevant success stories.', es: 'Practicar la validación de objeciones y utilizar casos de éxito relevantes.' },
  closingGood: { pt: 'O fechamento estabeleceu entendimento e próximos passos claros.', en: 'The closing established shared understanding and clear next steps.', es: 'El cierre estableció entendimiento y próximos pasos claros.' },
  closingImprove: { pt: 'Reforçar o resumo, o acordo de próximo passo e o encerramento profissional.', en: 'Reinforce the summary, next-step agreement and professional close.', es: 'Reforzar el resumen, el acuerdo del próximo paso y el cierre profesional.' },
  recommendations: {
    pt: ['Preparar uma abertura curta com nome, função, vínculo Microsoft e objetivo da conversa.', 'Priorizar perguntas abertas e registrar exemplos concretos apresentados pelo cliente.', 'Relacionar cada solução recomendada a uma necessidade de negócio identificada.', 'Encerrar confirmando responsável, ação e prazo do próximo passo.'],
    en: ['Prepare a concise opening with name, role, Microsoft affiliation and call purpose.', 'Prioritize open-ended questions and capture concrete customer examples.', 'Connect every recommended solution to an identified business need.', 'Close by confirming the owner, action and deadline for the next step.'],
    es: ['Preparar una apertura breve con nombre, función, vínculo con Microsoft y objetivo de la conversación.', 'Priorizar preguntas abiertas y registrar ejemplos concretos del cliente.', 'Relacionar cada solución recomendada con una necesidad de negocio identificada.', 'Cerrar confirmando responsable, acción y plazo del próximo paso.']
  }
};
function callAuditCopy(key, variables = {}) { const value = CALL_AUDIT_COPY[key]; const language = callAuditLanguage(); const template = value?.[language] || value?.pt || ''; return Object.entries(variables).reduce((text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement), template); }
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
  const strengths = results.map((result, index) => ({ result, title: callAuditTr(CALL_AUDIT_SECTIONS[index].title) })).filter((item) => item.result.percentage >= 75).map((item) => callAuditCopy('adherence', { title: item.title, value: item.result.percentage }));
  const improvements = results.map((result, index) => ({ result, title: callAuditTr(CALL_AUDIT_SECTIONS[index].title) })).filter((item) => item.result.percentage < 75).map((item) => callAuditCopy('improve', { title: item.title, value: item.result.percentage }));
  return {
    strengths: strengths.length ? strengths : [callAuditCopy('noStrength')],
    improvements: improvements.length ? improvements : [callAuditCopy('keepConsistency')],
    process: resultPhrase({ percentage: Math.round(results.reduce((sum, item) => sum + item.percentage, 0) / results.length) }, callAuditCopy('processGood'), callAuditCopy('processImprove')),
    discovery: resultPhrase(results[1], callAuditCopy('discoveryGood'), callAuditCopy('discoveryImprove')),
    value: resultPhrase(results[2], callAuditCopy('valueGood'), callAuditCopy('valueImprove')),
    objections: resultPhrase(results[3], callAuditCopy('objectionsGood'), callAuditCopy('objectionsImprove')),
    closing: resultPhrase(results[4], callAuditCopy('closingGood'), callAuditCopy('closingImprove')),
    recommendations: CALL_AUDIT_COPY.recommendations[callAuditLanguage()] || CALL_AUDIT_COPY.recommendations.pt
  };
}

function renderCallAuditAnalysis() {
  const panel = document.getElementById('callAuditAnalysis');
  const content = document.getElementById('callAuditAnalysisContent');
  if (!panel || !content || !activeCallAudit.analysis) { if (panel) panel.hidden = true; return; }
  const analysis = activeCallAudit.analysis;
  content.innerHTML = `<div class="audit-analysis-grid"><article><h3>${callAuditTr('Pontos fortes')}</h3><ul>${analysis.strengths.map((item) => `<li>${callAuditEscape(item)}</li>`).join('')}</ul></article><article><h3>${callAuditTr('Oportunidades de melhoria')}</h3><ul>${analysis.improvements.map((item) => `<li>${callAuditEscape(item)}</li>`).join('')}</ul></article></div><article><h3>${callAuditTr('Feedback estruturado para o representante')}</h3><dl><dt>${callAuditTr('Aderência ao processo Microsoft')}</dt><dd>${callAuditEscape(analysis.process)}</dd><dt>${callAuditTr('Qualidade da descoberta')}</dt><dd>${callAuditEscape(analysis.discovery)}</dd><dt>${callAuditTr('Entrega de valor')}</dt><dd>${callAuditEscape(analysis.value)}</dd><dt>${callAuditTr('Tratamento de objeções')}</dt><dd>${callAuditEscape(analysis.objections)}</dd><dt>${callAuditTr('Fechamento e próximos passos')}</dt><dd>${callAuditEscape(analysis.closing)}</dd></dl><h3>${callAuditTr('Recomendações práticas')}</h3><ul>${analysis.recommendations.map((item) => `<li>${callAuditEscape(item)}</li>`).join('')}</ul></article>`;
  panel.hidden = false;
}

function renderCallAudit() {
  const container = document.getElementById('callAuditQuestions');
  if (!container) return;
  const meetings = typeof getMeetings === 'function' ? getMeetings().filter((meeting) => meeting.identificador_numero) : [];
  document.getElementById('callAuditMeetingIdentifiers').innerHTML = meetings.map((meeting) => `<option value="${callAuditEscape(meeting.identificador_numero)}">${callAuditTr(meeting.identificador_tipo === 'oportunidade' ? 'Oportunidade' : 'Lead')} · ${callAuditEscape(meeting.empresa)} · ${callAuditEscape(meeting.assunto)}</option>`).join('');
  document.getElementById('callAuditLead').value = activeCallAudit.lead;
  document.getElementById('callAuditScore').textContent = activeCallAudit.score ?? '—';
  container.innerHTML = CALL_AUDIT_SECTIONS.map((section, sectionIndex) => `<section class="call-audit-group"><div class="call-audit-group-heading"><span>${String(sectionIndex + 1).padStart(2, '0')}</span><h2>${callAuditTr(section.title)}</h2></div>${section.questions.map((question, questionIndex) => { const key = `${sectionIndex}-${questionIndex}`; return `<div class="call-audit-question"><p>${callAuditTr(question)}</p><div class="audit-answer-options" role="group" aria-label="${callAuditTr('Resposta do cliente')}: ${callAuditEscape(callAuditTr(question))}"><button type="button" data-audit-key="${key}" data-audit-answer="sim" class="${activeCallAudit.answers[key] === 'sim' ? 'selected yes' : ''}">${callAuditTr('Sim')}</button><button type="button" data-audit-key="${key}" data-audit-answer="nao" class="${activeCallAudit.answers[key] === 'nao' ? 'selected no' : ''}">${callAuditTr('Não')}</button></div></div>`; }).join('')}</section>`).join('');
  container.querySelectorAll('[data-audit-answer]').forEach((button) => button.addEventListener('click', () => { activeCallAudit.answers[button.dataset.auditKey] = button.dataset.auditAnswer; activeCallAudit.analysis = null; activeCallAudit.score = null; renderCallAudit(); }));
  renderCallAuditAnalysis();
}

function generateCallAnalysis() {
  const lead = document.getElementById('callAuditLead').value.trim();
  const message = document.getElementById('callAuditMessage');
  if (!lead) { message.textContent = callAuditTr('Informe o número da Lead ou Oportunidade.'); return; }
  const meeting = typeof getMeetings === 'function' ? getMeetings().find((item) => item.identificador_numero === lead) : null;
  if (!meeting) { message.textContent = callAuditTr('Não foi encontrada uma reunião com esse número de Lead ou Oportunidade.'); return; }
  if (Object.keys(activeCallAudit.answers).length !== callAuditQuestionCount) { message.textContent = `Responda Sim ou Não para todas as ${callAuditQuestionCount} perguntas.`; return; }
  activeCallAudit.lead = lead;
  activeCallAudit.meetingId = meeting.id;
  activeCallAudit.identifierType = meeting.identificador_tipo;
  activeCallAudit.score = calculateCallAuditScore();
  activeCallAudit.analysis = buildCallAuditAnalysis();
  activeCallAudit.updatedAt = new Date().toISOString();
  const audits = getCallAudits(); const existing = audits.findIndex((audit) => audit.lead === lead); if (existing >= 0) audits[existing] = activeCallAudit; else audits.push(activeCallAudit); localStorage.setItem(CALL_AUDIT_KEY, JSON.stringify(audits));
  message.textContent = callAuditTr('Auditoria salva e análise gerada com sucesso.');
  renderCallAudit();
}

function exportCallAuditWord() {
  const message = document.getElementById('callAuditMessage');
  if (!activeCallAudit.analysis) { message.textContent = callAuditTr('Gere a análise antes de exportar.'); return; }
  const rows = CALL_AUDIT_SECTIONS.map((section, sectionIndex) => `<h2>${section.title}</h2><table><tr><th>Pergunta</th><th>Resposta</th></tr>${section.questions.map((question, questionIndex) => `<tr><td>${callAuditEscape(question)}</td><td>${activeCallAudit.answers[`${sectionIndex}-${questionIndex}`] === 'sim' ? 'Sim' : 'Não'}</td></tr>`).join('')}</table>`).join('');
  const analysis = document.getElementById('callAuditAnalysisContent').innerHTML;
  const identifierLabel = activeCallAudit.identifierType === 'oportunidade' ? 'Oportunidade' : 'Lead';
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial;color:#17121f;margin:32px}h1,h2,h3{color:#5b168b}table{width:100%;border-collapse:collapse;margin-bottom:22px}th,td{border:1px solid #d8c3e5;padding:8px;text-align:left}th{background:#f0e2fa}</style></head><body><h1>Auditoria de Ligação</h1><p><b>${identifierLabel}:</b> ${callAuditEscape(activeCallAudit.lead)}<br><b>Overall Call Score:</b> ${activeCallAudit.score} de 5</p>${rows}<h2>Análise da Ligação</h2>${analysis}</body></html>`;
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob(['\ufeff', html], { type: 'application/msword' })); link.download = `Auditoria_Ligacao_${activeCallAudit.lead.replace(/[^a-z0-9_-]/gi, '_')}.doc`; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function initializeCallAudit() {
  if (document.getElementById('callAuditInitialized')) { if (activeCallAudit.analysis) activeCallAudit.analysis = buildCallAuditAnalysis(); renderCallAudit(); return; }
  const marker = document.createElement('span'); marker.id = 'callAuditInitialized'; marker.hidden = true; document.getElementById('callAuditView').appendChild(marker);
  document.getElementById('callAuditLead').addEventListener('input', (event) => { activeCallAudit.lead = event.target.value; });
  document.getElementById('generateCallAnalysisButton').addEventListener('click', generateCallAnalysis);
  document.getElementById('exportCallAuditButton').addEventListener('click', exportCallAuditWord);
  document.getElementById('newCallAuditButton').addEventListener('click', () => { activeCallAudit = { lead: '', answers: {}, score: null, analysis: null }; document.getElementById('callAuditMessage').textContent = ''; renderCallAudit(); });
  renderCallAudit();
}
