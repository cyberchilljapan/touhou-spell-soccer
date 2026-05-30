"""Anima (CircleStone/Comfy Org, Qwen-3 text encoder) で各キャラの基本動作 CG を生成。
自然言語プロンプト + 各キャラ本来の衣装 + 白背景 (矛盾回避)。

公式テンプレ image_anima_preview.json 準拠:
  UNETLoader(anima-base-v1.0) + CLIPLoader(qwen_3_06b, stable_diffusion) + VAELoader(qwen_image_vae)
  + EmptyLatentImage 1024x1024 + KSampler(steps30, cfg4, er_sde, simple, denoise1)
  正prompt接頭「masterpiece, best quality, score_7, safe. anime, 」

  python scripts/generate_anima_actions.py            # サンプル数体
  python scripts/generate_anima_actions.py --full     # (将来) 全キャラ
"""
import argparse
import json
import urllib.request
from pathlib import Path

from generate_spell_cutins import COMFY, request_json, wait_for_prompt, download_output, ROOT
from generate_character_portraits import CHARACTERS
from cutout_actions import cutout as cutout_white

OUT_DIR = ROOT / "assets" / "actions"


def look_from_character(char_id):
    """CHARACTERS の prompt からキャラ名を取り、 Anima 用の自然言語 look を作る
    (サッカーユニフォームでなく本来の東方衣装を、 キャラ名から Anima に描かせる)。"""
    for _t, cid, prompt in CHARACTERS:
        if cid != char_id:
            continue
        # prompt 先頭の "name, touhou project, <descriptor> soccer ..." から name と descriptor を抽出。
        parts = [p.strip() for p in prompt.split(",")]
        name = parts[0]
        desc = ""
        for p in parts[2:]:
            low = p.lower()
            if "soccer" in low or "uniform" in low:
                # "shrine maiden soccer goalkeeper" → "shrine maiden"
                desc = low.split("soccer")[0].strip()
                break
        look = f"{name} from Touhou Project"
        if desc:
            look += f", a {desc}"
        look += ", wearing the character's iconic canonical Touhou outfit"
        return look
    return None

# 動作別の最適コマ数。 ドリブルは走りのパラパラで 3、 パス/シュートは溜め→振り抜き 2、 守備系は対峙カット 1。
FRAME_BUDGET = {"dribble": 3, "pass": 2, "shoot": 2, "block": 1, "intercept": 2, "tackle": 3, "contest": 2, "save": 3,
                "header": 3, "overhead": 3, "volley": 3, "diving_header": 3}

POS_PREFIX = "masterpiece, best quality, score_7, safe. anime, "
# ボールは焼き込まない (別スプライトで飛ばすため)。 soccer ball / ball を negative に。
# 指/手の破綻も強めに排除。
NEG = ("worst quality, low quality, score_1, score_2, score_3, blurry, jpeg artifacts, sepia, "
       "soccer uniform, jersey, sports kit, stadium, crowd, multiple people, text, watermark, "
       "soccer ball, ball, football, holding a ball, "
       "top hat, tuxedo, business suit, magician costume, modern clothes, "
       "military uniform, soldier, army helmet, steel helmet, peaked cap, backpack, rifle, gun, "
       "bad hands, bad anatomy, malformed hands, mutated hands, extra fingers, missing fingers, "
       "fused fingers, too many fingers, extra arms, extra legs, extra limbs, deformed")

# 各動作 3 コマ (タメ→動作→振り抜き) のポーズ。 ボール無し・キャラ本来の衣装・白背景・全身。
ACTION_PHASES = {
    "dribble": [
        "in a running dribble stride, one leg forward, leaning into the run",
        "mid sprint, both legs in fast running motion, body leaning forward hard",
        "pushing off explosively at full speed, dynamic forward lean",
    ],
    "pass": [
        "planting the standing foot, the kicking leg drawn back ready to pass",
        "swinging the kicking leg through, instep fully extended in a passing motion",
        "follow-through after the pass, kicking leg raised across the body",
    ],
    "shoot": [
        "winding up, kicking leg pulled far back for a powerful shot, body coiled",
        "striking, kicking leg driving forward fully extended, explosive shooting motion",
        "follow-through after the powerful kick, body twisting through",
    ],
    "block": [
        "lowering into a defensive blocking stance, bracing",
        "throwing the whole body in front to block, arms and chest guarding",
        "recovering after the block, body turned and off balance",
    ],
    "intercept": [
        "reading the play and stepping into the passing lane, alert stance",
        "lunging with one leg extended to intercept, stretching out",
        "fully stretched at the moment of the cut, dynamic reach",
    ],
    "tackle": [
        "launching into a sliding tackle, one leg thrust forward low, body leaning back, just starting to slide",
        "in a full-speed sliding tackle, sliding low along the ground, one leg stretched far out to hook the ball, dynamic action pose, grass spraying",
        "at the end of a sliding tackle, body fully extended along the ground, leg swept all the way across, dramatic",
    ],
    "contest": [
        "leaning a shoulder forward into a one-on-one duel",
        "pushing shoulder to shoulder, straining against the opponent",
        "winning the lean and driving forward through the duel",
    ],
    "save": [
        "a goalkeeper crouched low in a ready stance, hands open and spread, eyes focused",
        "a goalkeeper diving sideways through the air for a save, body fully stretched horizontal, both arms reaching out",
        "a goalkeeper landing from the dive, body low along the ground, arms extended forward",
    ],
    # 球の高低別シュート (空中技)。
    "header": [
        "jumping up to meet a high ball, rising into the air, eyes locked on the ball above",
        "heading the high ball powerfully with the forehead at the peak of the leap, neck snapping forward",
        "landing after the header, body coming back down, momentum forward",
    ],
    "overhead": [
        "leaping backward into the air for an overhead bicycle kick, body starting to invert",
        "upside down horizontal in mid-air, the kicking leg scissoring over the head to strike, acrobatic",
        "falling back toward the ground after the overhead kick, one arm bracing for the landing",
    ],
    "volley": [
        "tracking a dropping ball, planting and turning the body sideways, the kicking leg cocked back",
        "striking the dropping ball out of the air with a sideways volley, kicking leg swung level, torso twisted",
        "follow-through after the volley, the body rotated all the way through",
    ],
    "diving_header": [
        "diving forward and low toward a low ball, the whole body launching horizontal just off the ground",
        "fully stretched horizontal in mid-air, the forehead meeting the low ball, both arms swept back",
        "crashing down onto the grass after the diving header, body sliding forward",
    ],
}

# キャラの自然言語の見た目 (本来の東方衣装)。 look_from_character より優先。
# QA で名前ベース導出が失敗したキャラ(難読・苗字読み・神格名・オリジナル枠)は明示記述で矯正。
SAMPLE_CHARS = {
    "reimu": "Hakurei Reimu from Touhou Project, a shrine maiden with brown hair and a large red hair ribbon, wearing her red and white shrine maiden outfit with detached sleeves",
    "marisa": "Kirisame Marisa from Touhou Project, a witch with long blonde hair, wearing a black witch dress, white apron and a big black witch hat",
    "sakuya": "Izayoi Sakuya from Touhou Project, a silver haired maid with braids, wearing a blue and white maid uniform with a white headdress",
    # --- 実在キャラの誤導出を矯正 ---
    "suika": "Ibuki Suika from Touhou Project, a small energetic oni girl with very long wild orange-brown hair and two short brown horns, wearing a white sleeveless blouse with a purple ribbon and a long purple frilled skirt, one thin chain on her wrist, clear full body",
    "patchouli": "Patchouli Knowledge from Touhou Project, a calm bookish witch girl with very long straight light-purple hair, wearing a long loose pink robe-like pajama dress with purple trim, and a big soft round pink bonnet sleeping-cap with a yellow crescent moon ornament and ribbons on it",
    "merlin": "Merlin Prismriver from Touhou Project, a cheerful poltergeist girl with short wavy blonde hair, wearing a frilly blue and white dress with puffy sleeves",
    "kogasa": "Tatara Kogasa from Touhou Project, a cheerful girl with short blue-green hair, wearing a blue vest over a white blouse and a blue skirt, carrying a pale-blue karakasa umbrella that has one big eye and a long red tongue",
    "eirin": "Yagokoro Eirin from Touhou Project, a tall composed woman with very long braided silver-grey hair, wearing a red and blue dress decorated with white star and crescent-moon symbols",
    "yuugi": "Hoshiguma Yuugi from Touhou Project, a strong oni woman with long wavy brown hair and a single red horn, wearing a white sleeveless top and a long purple skirt, a large iron star ornament with chains on one arm",
    "unzan": "Unzan from Touhou Project, a huge muscular bald nyudo cloud spirit with a long white beard and stern face, his lower body wreathed in swirling white cloud",
    "tojiko": "Soga no Tojiko from Touhou Project, a ghost girl with green hair tied in a side ponytail with a yellow ribbon, wearing a green and white robe, a faint blue ghostly flame tail",
    # --- オリジナル枠 (チーム補充): 東方同人風の一貫した意匠を明示 ---
    "kuroni": "a fierce oni warrior girl with ashen-grey skin, two black curved horns, wild black hair with crimson streaks, wearing a black and dark-red traditional Japanese fighting outfit bound with iron chains, Touhou doujin style",
    "kasha": "a kasha cat-youkai girl with flaming red twin-tails, black cat ears and a forked tail, wearing a dark-red short kimono with orange flame patterns, Touhou doujin style",
    "jigoku": "a hell-raven youkai girl with messy short black hair, large glossy black raven wings, wearing a black and white dress, a glowing cylindrical control rod strapped to one arm, Touhou doujin style",
    "sogashadow": "a stoic taoist warrior girl with dark teal-green hair, wearing a dark-green and purple Taoist robe with shadowy patterns and a faint spectral aura, Touhou doujin style",
    "mononobe": "a Taoist hermit disciple girl with black hair tied up, wearing a tall thin pointed black Taoist court hat (tate-eboshi), dressed in white and pale-brown flowing ancient Japanese Taoist robes with wide sleeves, Touhou doujin style",
    "guardian": "an ancient shrine guardian woman with long grey hair, wearing grey and gold ceremonial Japanese guardian armor over a white under-robe, solemn, Touhou doujin style",
    "futatsuiwa": "a tanuki youkai girl with messy brown hair and round glasses, fluffy brown tanuki ears and a striped tail, wearing a brown and cream kimono decorated with leaf motifs, Touhou doujin style",
    "tsukuyomi": "a mystical moon-priestess girl with long flowing midnight-blue hair, wearing a midnight-blue and white kimono patterned with silver crescent moons and stars, an ethereal glow, Touhou doujin style",
    "byoudou": "a noble Taoist hermit woman with long dark hair, wearing an imperial black and gold Taoist robe with wide flowing sleeves and a tall thin pointed black Taoist court hat (tate-eboshi), dignified, Touhou doujin style",
    "myouon": "a yamabiko shrine-maiden girl with grey hair and floppy dog ears, wearing white and red Buddhist temple robes, holding a small ritual bell, Touhou doujin style",
}


def workflow(char_id, action, phase_desc, nl_look, seed):
    positive = f"{POS_PREFIX}{nl_look}, {phase_desc}, plain solid white background, clean cel shading, full body visible, single character, dynamic action pose, no ball"
    return {
        "1": {"class_type": "UNETLoader", "inputs": {"unet_name": "anima-base-v1.0.safetensors", "weight_dtype": "default"}},
        "2": {"class_type": "CLIPLoader", "inputs": {"clip_name": "qwen_3_06b_base.safetensors", "type": "stable_diffusion", "device": "default"}},
        "3": {"class_type": "VAELoader", "inputs": {"vae_name": "qwen_image_vae.safetensors"}},
        "4": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": positive}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["2", 0], "text": NEG}},
        "6": {"class_type": "EmptyLatentImage", "inputs": {"width": 1024, "height": 1024, "batch_size": 1}},
        "7": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0], "positive": ["4", 0], "negative": ["5", 0], "latent_image": ["6", 0],
                "seed": seed, "steps": 30, "cfg": 4, "sampler_name": "er_sde", "scheduler": "simple", "denoise": 1,
            },
        },
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["7", 0], "vae": ["3", 0]}},
        "9": {"class_type": "SaveImage", "inputs": {"images": ["8", 0], "filename_prefix": f"touhou_spell_futsal/anima/{char_id}_{action}"}},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--chars", nargs="*", default=["reimu", "marisa", "sakuya"])
    parser.add_argument("--actions", nargs="*", default=["dribble", "shoot", "tackle"])
    parser.add_argument("--full", action="store_true", help="全88体 (look はキャラ名から自動導出)")
    parser.add_argument("--all-actions", action="store_true", help="全7動作")
    parser.add_argument("--frames", type=int, default=0, help="コマ数を一律制限 (0=全3コマ)")
    parser.add_argument("--budget", action="store_true", help="動作別に最適コマ数 (dribble3/pass2/shoot2/守備1)")
    parser.add_argument("--force", action="store_true", help="既存画像も再生成")
    parser.add_argument("--no-cutout", action="store_true", help="白背景の透過処理をしない")
    args = parser.parse_args()
    if args.full:
        args.chars = [cid for _t, cid, _p in CHARACTERS]
    if args.all_actions:
        args.actions = list(ACTION_PHASES.keys())

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    manifest_path = OUT_DIR / "anima_manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    idx = 0
    for char_id in args.chars:
        look = SAMPLE_CHARS.get(char_id) or look_from_character(char_id)
        if not look:
            print(f"no look for {char_id}, skip"); continue
        entry = manifest.get(char_id, {})
        for action in args.actions:
            phases = ACTION_PHASES[action]
            if args.frames:
                phases = phases[: args.frames]
            elif args.budget:
                phases = phases[: FRAME_BUDGET.get(action, len(phases))]
            frame_rels = []
            for fi, phase in enumerate(phases, 1):
                idx += 1
                dest = OUT_DIR / f"{char_id}_{action}_{fi}.png"
                rel = str(dest.relative_to(ROOT)).replace("\\", "/")
                frame_rels.append(rel)
                if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
                    print(f"[{idx}] skip {dest.name}")
                    continue
                seed = 770528000 + idx
                print(f"[{idx}] anima {char_id}_{action}_{fi} seed={seed}")
                # 1プロンプトのタイムアウト/失敗で全バッチを落とさない (最大2回試行→駄目ならスキップ)。
                ok = False
                for attempt in range(2):
                    try:
                        queued = request_json("/prompt", {"prompt": workflow(char_id, action, phase, look, seed + attempt * 7), "client_id": "touhou_anima"})
                        history = wait_for_prompt(queued["prompt_id"])
                        images = []
                        for output in history.get("outputs", {}).values():
                            images.extend(output.get("images", []))
                        if not images:
                            raise RuntimeError("No image returned")
                        download_output(images[0], dest)
                        if not args.no_cutout:
                            try:
                                cutout_white(dest)
                            except Exception as e:
                                print(f"  cutout fail {dest.name}: {e}")
                        print(f"  saved {dest.name}")
                        ok = True
                        break
                    except Exception as e:
                        print(f"  !! {dest.name} attempt {attempt + 1} failed: {e}")
                if not ok:
                    print(f"  XX skipped {dest.name} (will retry on next run)")
            entry[action] = frame_rels
        manifest[char_id] = entry
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"done ({len(manifest)} chars in manifest)")


if __name__ == "__main__":
    main()
