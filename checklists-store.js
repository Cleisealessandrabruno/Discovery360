const CHECKLIST_INSTANCES_KEY = 'discovery_checklist_instances';

function getChecklistInstances(checklistId) {
  return JSON.parse(localStorage.getItem(CHECKLIST_INSTANCES_KEY) || '[]').filter((instance) => instance.checklist_id === checklistId);
}

function getAllChecklistInstances() {
  return JSON.parse(localStorage.getItem(CHECKLIST_INSTANCES_KEY) || '[]');
}

function saveChecklistInstance(instance) {
  const instances = getAllChecklistInstances();
  const index = instances.findIndex((item) => item.instance_id === instance.instance_id);
  const saved = { ...instance, atualizado_em: new Date().toISOString() };
  if (index === -1) instances.push(saved); else instances[index] = saved;
  localStorage.setItem(CHECKLIST_INSTANCES_KEY, JSON.stringify(instances));
  return saved;
}

function createChecklistInstance(checklistId, nome, meetingId = null) {
  const now = new Date().toISOString();
  return saveChecklistInstance({ instance_id: `inst_${Date.now()}`, checklist_id: checklistId, nome_instancia: nome, meeting_id: meetingId, itens_marcados: {}, criado_em: now, atualizado_em: now });
}

function toggleChecklistItem(instanceId, itemText, checked) {
  const instance = getAllChecklistInstances().find((item) => item.instance_id === instanceId);
  if (!instance) return null;
  instance.itens_marcados = { ...(instance.itens_marcados || {}), [itemText]: checked };
  return saveChecklistInstance(instance);
}

function getChecklistProgress(instanceId, checklist) {
  const instance = getAllChecklistInstances().find((item) => item.instance_id === instanceId);
  const items = (checklist?.secoes || []).flatMap((section) => section.itens || []);
  const marked = items.filter((item) => instance?.itens_marcados?.[item] === true).length;
  return { marked, total: items.length, percent: items.length ? Math.round((marked / items.length) * 100) : 0 };
}
