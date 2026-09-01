const fs = require('fs');
const path = require('path');

const input = 'C:\\Users\\v-cleand\\Downloads\\traduzao';
const output = path.join(__dirname, 'sales_plays_en.js');
const shared = JSON.parse(fs.readFileSync(path.join(input, '00_conteudo_compartilhado_en-US.json'), 'utf8'));
const salesPlays = [];

for (let part = 1; part <= 5; part += 1) {
  const start = (part - 1) * 5 + 1;
  const end = part * 5;
  const name = `${String(part).padStart(2, '0')}_sales_plays_${start}_a_${end}_en-US.json`;
  const data = JSON.parse(fs.readFileSync(path.join(input, name), 'utf8'));
  if (!Array.isArray(data.sales_plays) || data.sales_plays.length !== 5) throw new Error(`${name} deve conter 5 Sales Plays.`);
  salesPlays.push(...data.sales_plays);
}

const ids = salesPlays.map((play) => play.id);
if (ids.length !== 25 || ids.some((id, index) => id !== index + 1)) throw new Error(`IDs inválidos: ${ids.join(', ')}`);
const merged = { ...shared, sales_plays: salesPlays };
fs.writeFileSync(output, `window.salesPlaysEnglishData = ${JSON.stringify(merged)};\n`, 'utf8');
console.log(`English Sales Plays generated: ${salesPlays.length}`);
