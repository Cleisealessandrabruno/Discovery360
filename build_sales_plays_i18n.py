import concurrent.futures
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "sales_plays_data.js"
OUTPUT = ROOT / "sales_plays_i18n.js"
CACHE = ROOT / ".sales_plays_translation_cache.json"


def load_source():
    raw = SOURCE.read_text(encoding="utf-8").strip()
    match = re.fullmatch(r"const salesPlaysData = (.*);", raw, re.S)
    if not match:
        raise RuntimeError("Formato inesperado em sales_plays_data.js")
    return json.loads(match.group(1))


def collect_strings(value, found):
    if isinstance(value, str):
        found.add(value)
    elif isinstance(value, list):
        for item in value:
            collect_strings(item, found)
    elif isinstance(value, dict):
        for item in value.values():
            collect_strings(item, found)


def translate_one(text, target):
    params = urllib.parse.urlencode({
        "client": "gtx", "sl": "pt", "tl": target, "dt": "t", "q": text
    })
    url = "https://translate.googleapis.com/translate_a/single?" + params
    last_error = None
    for attempt in range(5):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(request, timeout=25) as response:
                payload = json.loads(response.read().decode("utf-8"))
            return "".join(part[0] for part in payload[0] if part and part[0])
        except Exception as exc:
            last_error = exc
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Falha traduzindo {text!r} para {target}: {last_error}")


def main():
    data = load_source()
    strings = set()
    collect_strings(data, strings)
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {"en": {}, "es": {}}
    for target in ("en", "es"):
        pending = sorted(text for text in strings if text not in cache[target])
        print(f"{target}: {len(pending)} traducoes pendentes de {len(strings)}")
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
            futures = {executor.submit(translate_one, text, target): text for text in pending}
            completed = 0
            for future in concurrent.futures.as_completed(futures):
                text = futures[future]
                cache[target][text] = future.result()
                completed += 1
                if completed % 25 == 0:
                    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
                    print(f"{target}: {completed}/{len(pending)}")
        CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")

    payload = json.dumps(cache, ensure_ascii=False, separators=(",", ":"))
    OUTPUT.write_text(
        "window.SALES_PLAYS_TRANSLATIONS = " + payload + ";\n",
        encoding="utf-8",
    )
    print(f"Gerado: {OUTPUT}")


if __name__ == "__main__":
    main()
