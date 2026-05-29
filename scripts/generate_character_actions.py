"""各キャラの基本動作 CG を ComfyUI で生成する (キャプ翼3 的な動作スプライト)。

動作: dribble / pass / shoot / block / intercept(パスカット) / tackle / contest(競り合い)。
出力: assets/actions/{char_id}_{action}.png、 manifest=assets/actions/manifest.json
88 体 × 7 動作 = 616 枚 (大規模)。 --chars / --actions / --limit で分割可。

ComfyUI を 127.0.0.1:8188 で起動した状態で:
    python scripts/generate_character_actions.py --chars reimu --actions dribble shoot   # 検証
    python scripts/generate_character_actions.py                                          # 全量
    python scripts/generate_character_actions.py --actions dribble pass shoot             # 動作限定で全キャラ
"""
import argparse
import json
from pathlib import Path

from generate_character_portraits import CHARACTERS
from generate_spell_cutins import (
    NEGATIVE,
    download_output,
    request_json,
    wait_for_prompt,
    ROOT,
)

OUT_DIR = ROOT / "assets" / "actions"

ACTION_DESC = {
    "dribble": "the player sprinting and dribbling, whole body in dynamic motion, leaning into the run, ball just ahead of the feet",
    "pass": "the player passing the ball, whole body follow-through after striking the ball, dynamic kicking pose",
    "shoot": "the player unleashing a powerful shot, whole body driving the kicking leg through the ball, explosive dynamic strike",
    "block": "the player throwing the whole body in front of the ball to block a shot, arms and chest guarding, dynamic bracing pose",
    "intercept": "the player lunging to intercept a pass, whole body stretched, leg extended to cut the ball, dynamic reaction pose",
    "tackle": "the player making a sliding tackle, whole body lunging low along the grass to win the ball, dynamic slide",
    "contest": "the player straining in a one-on-one duel for the ball, whole body leaning shoulder-to-shoulder, intense determined face",
}

# キャラ本人(顔・全身)を主役にし、 ボール/足だけのクローズアップを避ける。
COMMON = (
    "anime soccer game action cut-in, cel shading, the character is the main subject, "
    "full figure visible, face clearly visible, solo, one player only, mid-action dynamic pose, "
    "dynamic angle, motion blur, dramatic lighting, soccer pitch and stadium background, "
    "no text, polished doujin game art, masterpiece, best quality"
)

ACTION_NEG = (
    NEGATIVE + ", figurine, diorama, miniature, toy, chibi, multiple people, two people, crowd, "
    "lineup, standing still, static pose, T-pose, extreme close-up of ball, ball fills the frame, "
    "foot close-up only, cropped face, faceless, no character, headless"
)


def char_prompt(char_id):
    for _team, cid, prompt in CHARACTERS:
        if cid == char_id:
            return prompt
    return None


def workflow(char_id, action, prompt, seed):
    positive = f"{prompt}, {ACTION_DESC[action]}, {COMMON}"
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "songmix_v13.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": positive}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": ACTION_NEG}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 768, "height": 448, "batch_size": 1}},
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0], "positive": ["2", 0], "negative": ["3", 0], "latent_image": ["4", 0],
                "seed": seed, "steps": 26, "cfg": 4.5, "sampler_name": "euler_ancestral", "scheduler": "normal", "denoise": 1,
            },
        },
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"touhou_spell_futsal/actions/{char_id}_{action}"}},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--limit", type=int, default=0, help="先頭から N キャラに限定")
    parser.add_argument("--chars", nargs="*", default=None, help="char_id を限定")
    parser.add_argument("--actions", nargs="*", default=None, help="動作を限定 (dribble pass shoot block intercept tackle contest)")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    char_ids = [cid for _t, cid, _p in CHARACTERS]
    if args.chars:
        wanted = set(args.chars)
        char_ids = [c for c in char_ids if c in wanted]
    if args.limit:
        char_ids = char_ids[: args.limit]
    actions = args.actions or list(ACTION_DESC.keys())

    manifest_path = OUT_DIR / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}

    seed_base = 580528000
    idx = 0
    total = len(char_ids) * len(actions)
    for ci, char_id in enumerate(char_ids):
        prompt = char_prompt(char_id)
        if not prompt:
            print(f"!! no prompt for {char_id}, skip")
            continue
        entry = manifest.get(char_id, {})
        for action in actions:
            idx += 1
            dest = OUT_DIR / f"{char_id}_{action}.png"
            rel = str(dest.relative_to(ROOT)).replace("\\", "/")
            entry[action] = rel
            if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
                print(f"[{idx}/{total}] skip {dest.name}")
                continue
            seed = seed_base + ci * 31 + actions.index(action)
            print(f"[{idx}/{total}] generate {char_id}_{action} seed={seed}")
            queued = request_json("/prompt", {"prompt": workflow(char_id, action, prompt, seed), "client_id": "touhou_spell_futsal_actions"})
            history = wait_for_prompt(queued["prompt_id"])
            images = []
            for output in history.get("outputs", {}).values():
                images.extend(output.get("images", []))
            if not images:
                raise RuntimeError(f"No image for {char_id}_{action}")
            download_output(images[0], dest)
        manifest[char_id] = entry
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"done ({len(manifest)} chars in manifest)")


if __name__ == "__main__":
    main()
