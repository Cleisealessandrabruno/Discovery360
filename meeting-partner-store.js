const PARTNER_DATA_KEY = 'discovery_meeting_partners';

function getDadosParceiro(meetingId) {
  return JSON.parse(localStorage.getItem(PARTNER_DATA_KEY) || '{}')[meetingId] || null;
}

function salvarDadosParceiro(meetingId, dados) {
  const allData = JSON.parse(localStorage.getItem(PARTNER_DATA_KEY) || '{}');
  const saved = { ...dados, meeting_id: meetingId, atualizado_em: new Date().toISOString() };
  allData[meetingId] = saved;
  localStorage.setItem(PARTNER_DATA_KEY, JSON.stringify(allData));
  return saved;
}

function normalizePartnerSearch(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
}

function findPartnerByName(name) {
  return PARTNERS_LIST.find((partner) => normalizePartnerSearch(partner.nome) === normalizePartnerSearch(name)) || null;
}

function calcularDasEOwner(motion, partner, distributor = null) {
  const source = partner || distributor;
  const responsible = source?.responsaveis?.[motion];
  return { das: responsible || 'Não identificado', owner: responsible || 'Não identificado' };
}
