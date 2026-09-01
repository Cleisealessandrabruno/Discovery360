import re
from html.parser import HTMLParser
from pathlib import Path

root = Path(__file__).parent
html = (root / 'index.html').read_text(encoding='utf-8')
js = (root / 'i18n.js').read_text(encoding='utf-8')
keys = set(re.findall(r"'([^']+)'\s*:\s*\[", js))
class TextParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.texts = []
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
    def handle_endtag(self, tag):
        if tag in ('script', 'style') and self.skip:
            self.skip -= 1
    def handle_data(self, data):
        if not self.skip and data.strip():
            self.texts.append(' '.join(data.split()))

parser = TextParser()
parser.feed(html)
texts = parser.texts
missing = []
for value in texts:
    if len(value) <= 1 or re.fullmatch(r'[0-9+·/#?×▾↗— .:]+', value):
        continue
    if not any(key in value for key in keys):
        missing.append(value)
print('\n'.join(dict.fromkeys(missing)))

print('\n--- JS literals not covered ---')
for filename in ('app.js', 'call-audit.js', 'visual-library.js', 'meeting-report.js', 'word-export.js'):
    source = (root / filename).read_text(encoding='utf-8')
    values = re.findall(r"(?<![\\w])(['\"])(.*?)(?<!\\)\\1", source)
    uncovered = []
    for _, value in values:
        if len(value) < 4 or '${' in value or '<' in value or '\\n' in value:
            continue
        if not re.search(r'[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]|\\b(?:não|reunião|cliente|pergunta|resposta|próximo|dados|acesso|salvar|informe|selecione|nenhum|resultado|parceiro|oportunidade)\\b', value, re.I):
            continue
        if not any(key in value for key in keys):
            uncovered.append(value)
    if uncovered:
        print(f'[{filename}]')
        print('\n'.join(dict.fromkeys(uncovered)))
