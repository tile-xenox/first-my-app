import json
from pathlib import Path

p = str(Path(__file__).resolve().parent) + "/setting.json"
with open(p, encoding="utf-8") as f:
    data = json.load(f)

PayKbn = data["paykbn"]
User = data["user"]
Store = data["store"]
Family = int(data["family"])

def updateFamily(num):
    global Family
    Family = int(num)
    data["family"] = str(num)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
