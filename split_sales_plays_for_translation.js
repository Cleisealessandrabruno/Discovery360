const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const output = path.resolve(root, '..', '..', 'outputs', 'sales-plays-translation');
const source = fs.readFileSync(path.join(root, 'sales_plays_data.js'), 'utf8');
const context = {};
vm.runInNewContext(`${source}\nthis.data = salesPlaysData;`, context);
fs.mkdirSync(output, { recursive: true });

const shared = {
  tipos_de_oportunidade: context.data.tipos_de_oportunidade,
  perguntas_obrigatorias_qualificacao: context.data.perguntas_obrigatorias_qualificacao,
  checklist_qualificacao: context.data.checklist_qualificacao
};
fs.writeFileSync(path.join(output, '00_conteudo_compartilhado.json'), JSON.stringify(shared, null, 2));

for (let start = 0; start < context.data.sales_plays.length; start += 5) {
  const part = Math.floor(start / 5) + 1;
  const payload = { sales_plays: context.data.sales_plays.slice(start, start + 5) };
  fs.writeFileSync(path.join(output, `${String(part).padStart(2, '0')}_sales_plays_${start + 1}_a_${start + payload.sales_plays.length}.json`), JSON.stringify(payload, null, 2));
}
