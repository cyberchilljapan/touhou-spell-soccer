import argparse
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path


COMFY = "http://127.0.0.1:8188"
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "portraits"

NEGATIVE = (
    "lowres, blurry, worst quality, bad anatomy, bad hands, extra fingers, "
    "missing fingers, extra arms, deformed face, text, logo, watermark, signature, "
    "nsfw, nude, cleavage focus"
)

CHARACTERS = [
    # Hakurei (11)
    ("hakurei", "reimu", "hakurei reimu, touhou project, shrine maiden soccer goalkeeper, red white sport uniform, confident"),
    ("hakurei", "marisa", "kirisame marisa, touhou project, blonde witch soccer striker, black white sport uniform, energetic grin"),
    ("hakurei", "sanae", "kochiya sanae, touhou project, green haired shrine maiden soccer midfielder, blue white sport uniform, cheerful"),
    ("hakurei", "youmu", "konpaku youmu, touhou project, silver bob hair swordswoman soccer midfielder, green white sport uniform, focused"),
    ("hakurei", "suika", "ibuki suika, touhou project, small oni soccer defender, orange sport uniform, powerful smile"),
    ("hakurei", "daiyousei", "daiyousei, touhou project, great fairy with green hair and yellow ribbon soccer defender, white blue sport uniform, gentle expression"),
    ("hakurei", "rumia", "rumia, touhou project, short blonde hair girl with red ribbon soccer defender, black sport uniform, mysterious smile"),
    ("hakurei", "wriggle", "wriggle nightbug, touhou project, short green hair firefly girl soccer defender, dark green sport uniform, antennae"),
    ("hakurei", "kasen", "ibaraki kasen, touhou project, pink haired hermit girl with horn soccer midfielder, red white sport uniform, calm wise"),
    ("hakurei", "cirno", "cirno, touhou project, blue hair ice fairy soccer midfielder, cyan white sport uniform, confident smirk"),
    ("hakurei", "lily", "lily white, touhou project, blonde spring fairy soccer striker, white sport uniform, cheerful spring aura"),

    # Kouma (11)
    ("kouma", "remilia", "remilia scarlet, touhou project, vampire soccer striker, crimson black sport uniform, elegant confident"),
    ("kouma", "flandre", "flandre scarlet, touhou project, blonde vampire soccer striker, red sport uniform, playful intense"),
    ("kouma", "sakuya", "izayoi sakuya, touhou project, silver maid soccer midfielder, blue silver sport uniform, cool expression"),
    ("kouma", "meiling", "hong meiling, touhou project, red haired martial artist soccer defender, green sport uniform, determined"),
    ("kouma", "patchouli", "patchouli knowledge, touhou project, purple haired magician soccer goalkeeper, violet sport uniform, calm"),
    ("kouma", "koakuma", "koakuma, touhou project, red haired little devil with bat wings soccer defender, black red sport uniform, sly smile"),
    ("kouma", "lunasa", "lunasa prismriver, touhou project, blonde ponytail violinist ghost soccer defender, deep blue sport uniform, melancholic"),
    ("kouma", "tokiko", "tokiko, touhou project, glasses bookworm girl soccer defender, dark green sport uniform, studious"),
    ("kouma", "merlin", "merlin prismriver, touhou project, blonde curly hair trumpet ghost soccer midfielder, gold sport uniform, lively energetic"),
    ("kouma", "lyrica", "lyrica prismriver, touhou project, gray hair keyboardist ghost soccer midfielder, purple sport uniform, calm composed"),
    ("kouma", "hecatia", "hecatia lapislazuli, touhou project, red hair goddess with planet hat soccer midfielder, black red orange sport uniform, dominant"),

    # Youkai Mountain (11)
    ("youkai_mountain", "aya", "shameimaru aya, touhou project, tengu soccer midfielder, black white red sport uniform, fast wind aura"),
    ("youkai_mountain", "momiji", "inubashiri momiji, touhou project, white wolf tengu soccer defender, white red sport uniform, serious"),
    ("youkai_mountain", "nitori", "kawashiro nitori, touhou project, kappa soccer midfielder, teal sport uniform, gadget motif"),
    ("youkai_mountain", "kanako", "yasaka kanako, touhou project, goddess soccer striker, red blue sport uniform, majestic"),
    ("youkai_mountain", "suwako", "moriya suwako, touhou project, frog hat soccer goalkeeper, yellow green sport uniform, mischievous"),
    ("youkai_mountain", "hina", "kagiyama hina, touhou project, green hair girl with red dress soccer defender, dark green red sport uniform, gentle spin"),
    ("youkai_mountain", "shizuha", "aki shizuha, touhou project, autumn leaves goddess soccer defender, brown orange sport uniform, calm"),
    ("youkai_mountain", "medicine", "medicine melancholy, touhou project, doll girl with poison flower soccer defender, dark purple sport uniform, cold gaze"),
    ("youkai_mountain", "kogasa", "tatara kogasa, touhou project, blue hair umbrella girl soccer midfielder, light blue sport uniform, surprise smile"),
    ("youkai_mountain", "yuuka", "kazami yuuka, touhou project, green hair sunflower lady soccer midfielder, red green sport uniform, confident grin"),
    ("youkai_mountain", "minoriko", "aki minoriko, touhou project, autumn harvest goddess soccer striker, gold red sport uniform, plump cheerful"),

    # Eientei (11)
    ("eientei", "kaguya", "houraisan kaguya, touhou project, moon princess soccer midfielder, navy white sport uniform, elegant"),
    ("eientei", "eirin", "yagokoro eirin, touhou project, silver haired moon doctor soccer goalkeeper, red blue sport uniform, composed"),
    ("eientei", "reisen", "reisen udongein inaba, touhou project, rabbit ears soccer midfielder, purple sport uniform, sharp eyes"),
    ("eientei", "tei", "inaba tewi, touhou project, rabbit girl soccer defender, pink white sport uniform, lucky grin"),
    ("eientei", "mokou", "fujiwara no mokou, touhou project, white haired immortal soccer striker, red white sport uniform, fiery"),
    ("eientei", "junko", "junko, touhou project, blonde divine spirit goddess soccer defender, white red sport uniform, serene cold"),
    ("eientei", "ringo", "ringo, touhou project, orange hair moon rabbit with dango soccer defender, orange white sport uniform, cheerful"),
    ("eientei", "clownpiece", "clownpiece, touhou project, jester fairy with torch soccer defender, purple yellow sport uniform, deranged smile"),
    ("eientei", "ringo2", "suzuho, touhou project, blue twin hair moon rabbit soccer midfielder, blue white sport uniform, gentle"),
    ("eientei", "seiran", "seiran, touhou project, blue twin tail rabbit moon warrior soccer midfielder, dark blue sport uniform, calm sharp"),
    ("eientei", "iku", "nagae iku, touhou project, oarfish messenger with red dress soccer striker, red blue sport uniform, dignified"),

    # Chireiden (11)
    ("chireiden", "satori", "komeiji satori, touhou project, pink haired soccer midfielder, purple sport uniform, third eye motif"),
    ("chireiden", "koishi", "komeiji koishi, touhou project, green haired soccer striker, yellow green sport uniform, unconscious aura"),
    ("chireiden", "orin", "kaenbyou rin, touhou project, red haired cat soccer midfielder, black red sport uniform, lively"),
    ("chireiden", "utsuho", "reiuji utsuho, touhou project, black winged soccer striker, black green sport uniform, nuclear flame"),
    ("chireiden", "yuugi", "hoshiguma yuugi, touhou project, oni soccer goalkeeper, red black sport uniform, strong"),
    ("chireiden", "parsee", "mizuhashi parsee, touhou project, blonde envious bridge spirit soccer defender, green brown sport uniform, jealous eyes"),
    ("chireiden", "yamame", "kurodani yamame, touhou project, blonde earth spider girl soccer defender, yellow brown sport uniform, web aura"),
    ("chireiden", "kisume", "kisume, touhou project, well bucket girl with green hair soccer defender, dark green sport uniform, peeking shy"),
    ("chireiden", "kuroni", "original shadow oni warrior, dark oni defender with horns soccer defender, black red sport uniform, fierce"),
    ("chireiden", "kasha", "original fiery cat soldier inspired by touhou kasha, soccer midfielder, dark red sport uniform, blazing"),
    ("chireiden", "jigoku", "original hell crow warrior inspired by touhou utsuho, black crow midfielder soccer, black sport uniform, sharp gaze"),

    # Myouren (11)
    ("myouren", "byakuren", "hijiri byakuren, touhou project, long gradient hair soccer striker, black gold sport uniform, holy aura"),
    ("myouren", "shou", "toramaru shou, touhou project, tiger motif soccer midfielder, orange white sport uniform, treasure light"),
    ("myouren", "nazrin", "nazrin, touhou project, mouse girl soccer midfielder, gray blue sport uniform, clever"),
    ("myouren", "ichirin", "kumoi ichirin, touhou project, monk soccer defender, blue white sport uniform, cloud aura"),
    ("myouren", "murasa", "murasa minamitsu, touhou project, sailor soccer goalkeeper, navy white sport uniform, anchor motif"),
    ("myouren", "unzan", "unzan, touhou project, giant cloud spirit fist soccer defender, white blue sport uniform, stoic massive"),
    ("myouren", "mamizou", "futatsuiwa mamizou, touhou project, glasses tanuki yokai soccer defender, brown white sport uniform, sly mature"),
    ("myouren", "myouon", "original bell ringer shrine maiden inspired by myouren temple, soccer defender, white gold sport uniform, serene"),
    ("myouren", "kyouko", "kasodani kyouko, touhou project, brown hair echo yokai soccer midfielder, red white sport uniform, energetic"),
    ("myouren", "nue", "houjuu nue, touhou project, black hair chimera youkai soccer midfielder, dark purple red sport uniform, mysterious"),
    ("myouren", "disciple", "original young monk disciple inspired by toramaru shou, soccer striker, gold white sport uniform, devoted"),

    # Shinreibyo (11)
    ("shinreibyo", "miko", "toyosatomimi no miko, touhou project, noble soccer striker, purple gold sport uniform, headphones"),
    ("shinreibyo", "futo", "mononobe no futo, touhou project, taoist soccer midfielder, white brown sport uniform, plate motif"),
    ("shinreibyo", "tojiko", "soga no tojiko, touhou project, ghost soccer midfielder, green purple sport uniform, lightning"),
    ("shinreibyo", "seiga", "kaku seiga, touhou project, blue haired hermit soccer defender, cyan sport uniform, sly smile"),
    ("shinreibyo", "yoshika", "miyako yoshika, touhou project, jiangshi soccer goalkeeper, blue green sport uniform, talisman"),
    ("shinreibyo", "sogashadow", "original shadow taoist warrior inspired by soga no tojiko, soccer defender, dark green purple sport uniform, stoic"),
    ("shinreibyo", "mononobe", "original plate disciple soldier inspired by mononobe no futo, soccer defender, white brown sport uniform, calm"),
    ("shinreibyo", "guardian", "original ancient shrine temple guard, soccer defender, gray gold sport uniform, ancient stoic"),
    ("shinreibyo", "futatsuiwa", "original twin rock wild spirit inspired by youkai, soccer midfielder, brown sport uniform, wild grin"),
    ("shinreibyo", "tsukuyomi", "original moonlight envoy inspired by tsukuyomi shrine, soccer midfielder, midnight blue sport uniform, mystical"),
    ("shinreibyo", "byoudou", "original imperial era taoist warrior inspired by miko, soccer striker, gold black sport uniform, noble"),

    # Rebel Beast (11)
    ("rebel_beast", "shinmyoumaru", "sukuna shinmyoumaru, touhou project, tiny soccer striker, red blue sport uniform, miracle mallet"),
    ("rebel_beast", "seija", "kijin seija, touhou project, rebel soccer midfielder, black red sport uniform, inverted motif"),
    ("rebel_beast", "kagerou", "imaizumi kagerou, touhou project, wolf girl soccer defender, brown white sport uniform, full moon"),
    ("rebel_beast", "yachie", "kicchou yachie, touhou project, dragon turtle boss soccer midfielder, teal black sport uniform"),
    ("rebel_beast", "mayumi", "joutouguu mayumi, touhou project, haniwa soldier soccer goalkeeper, armor sport uniform, disciplined"),
    ("rebel_beast", "oniko", "original small rebel oni child warrior, soccer defender, red orange sport uniform, fierce"),
    ("rebel_beast", "bakeneko", "original nine tail bakeneko leader yokai, soccer defender, dark gray sport uniform, predatory"),
    ("rebel_beast", "kageyachie", "original shadow dragon turtle inspired by kicchou yachie, soccer defender, black teal sport uniform, dark commanding"),
    ("rebel_beast", "baketanuki", "original shapeshift tanuki yokai warrior, soccer midfielder, tan white sport uniform, mischievous"),
    ("rebel_beast", "oniwaka", "original young oni warrior teen fighter, soccer midfielder, red black sport uniform, fierce determined"),
    ("rebel_beast", "hangyakushi", "original rebel beast tribe striker warrior, soccer striker, dark red sport uniform, ferocious"),
]


def request_json(path, payload=None):
    if payload is None:
        with urllib.request.urlopen(f"{COMFY}{path}", timeout=15) as res:
            return json.loads(res.read().decode("utf-8"))
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFY}{path}",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.loads(res.read().decode("utf-8"))


def workflow(char_id, prompt, seed):
    positive = (
        f"{prompt}, solo portrait, upper body, facing viewer, futsal arena background, "
        "spell card lighting, clean anime cel shading, polished doujin game character portrait, "
        "masterpiece, best quality"
    )
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "songmix_v13.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": positive}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": NEGATIVE}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 512, "height": 640, "batch_size": 1}},
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "seed": seed,
                "steps": 24,
                "cfg": 4.5,
                "sampler_name": "euler_ancestral",
                "scheduler": "normal",
                "denoise": 1,
            },
        },
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"touhou_spell_futsal/portraits/{char_id}"}},
    }


def wait_for_prompt(prompt_id):
    for _ in range(180):
        history = request_json(f"/history/{urllib.parse.quote(prompt_id)}")
        if prompt_id in history:
            return history[prompt_id]
        time.sleep(1)
    raise TimeoutError(f"ComfyUI prompt timed out: {prompt_id}")


def download_output(image_info, dest):
    query = urllib.parse.urlencode(
        {
            "filename": image_info["filename"],
            "subfolder": image_info.get("subfolder", ""),
            "type": image_info.get("type", "output"),
        }
    )
    with urllib.request.urlopen(f"{COMFY}/view?{query}", timeout=30) as res:
        dest.write_bytes(res.read())


def selected_characters(teams, limit):
    chars = [item for item in CHARACTERS if not teams or item[0] in teams]
    if limit:
        chars = chars[:limit]
    return chars


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--teams", nargs="*", default=[])
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    manifest = {}
    for index, (_team_id, char_id, prompt) in enumerate(selected_characters(set(args.teams), args.limit)):
        dest = OUT_DIR / f"{char_id}.png"
        if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
            print(f"skip existing {dest.name}")
            manifest[char_id] = str(dest.relative_to(ROOT)).replace("\\", "/")
            continue
        seed = 260527000 + index
        print(f"generate {char_id} seed={seed}")
        queued = request_json("/prompt", {"prompt": workflow(char_id, prompt, seed), "client_id": "touhou_spell_futsal_portraits"})
        history = wait_for_prompt(queued["prompt_id"])
        images = []
        for output in history.get("outputs", {}).values():
            images.extend(output.get("images", []))
        if not images:
            raise RuntimeError(f"No image output for {char_id}")
        download_output(images[0], dest)
        manifest[char_id] = str(dest.relative_to(ROOT)).replace("\\", "/")
        print(f"saved {dest}")

    existing_manifest = OUT_DIR / "manifest.json"
    if existing_manifest.exists():
        current = json.loads(existing_manifest.read_text(encoding="utf-8"))
    else:
        current = {}
    current.update(manifest)
    existing_manifest.write_text(json.dumps(current, ensure_ascii=False, indent=2), encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
