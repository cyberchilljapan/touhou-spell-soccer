"""汎用アクションスプライト (キャラ非依存) を ComfyUI で生成する。

キャプ翼/東方サッカー考察に基づく『パス/シュート/ドリブル/タックル/インターセプト/
GKセーブ/ゴール/キックオフ』のディレイ式2-3枚スプライト。 ゲーム側 (renderActionScene)
で行動種別に応じて frame0->frame1(->frame2) をめくり、 タメ->放出 の手触りを出す。

出力: assets/anim/{scene}_{n}.png、 manifest=assets/anim/manifest.json
ComfyUI を 127.0.0.1:8188 で起動した状態で実行:
    python scripts/generate_action_sprites.py                  # 全シーン
    python scripts/generate_action_sprites.py --scenes shoot dribble goal   # 検証
    python scripts/generate_action_sprites.py --force
"""
import argparse
import json
from pathlib import Path

from generate_spell_cutins import (
    NEGATIVE,
    download_output,
    request_json,
    wait_for_prompt,
    ROOT,
)

OUT_DIR = ROOT / "assets" / "anim"

COMMON = (
    "anime game art, cel shading, solo, one player only, mid-action motion, "
    "dynamic low camera angle, motion blur, dramatic lighting, no text, "
    "polished doujin game art, masterpiece, best quality"
)

# 汎用アクション専用ネガティブ。 figurine/diorama/複数人/直立棒立ちを潰す。
ACTION_NEG = (
    NEGATIVE + ", figurine, diorama, miniature, toy, chibi, multiple people, two people, "
    "crowd, lineup, standing still, static pose, T-pose, full body portrait centered"
)

# 各シーンの frame ごとプロンプト (タメ -> 放出/インパクト)。 キャラ非依存のシルエット寄り。
SCENES = {
    "shoot": [
        "soccer player winding up a powerful shot mid-stride, leg cocked back, ball at feet, explosive energy gathering, dynamic action shot, " + COMMON,
        "soccer player just kicked powerful shot, leg follow-through swing, ball rocketing away with motion blur, radial speed lines, dynamic explosive pose, " + COMMON,
    ],
    "pass": [
        "soccer player preparing to pass ball, ball at feet, takeback, planting stance, flowing pose, " + COMMON,
        "soccer player passing ball, foot follow-through, ball leaving toward teammate with light motion, flowing pose, " + COMMON,
    ],
    "dribble": [
        "soccer player sprinting while dribbling, ball just ahead of running feet, body leaning hard into the run, motion blur, " + COMMON,
        "soccer player bursting past defender at high speed, ball pushed forward, afterimage smear, strong horizontal speed lines, " + COMMON,
    ],
    "tackle": [
        "soccer defender lunging into tackle, low center of gravity, leading leg extended, dynamic contact pose, " + COMMON,
        "soccer defender at moment of tackle contact, winning the ball, ball knocked loose, impact burst, dynamic contact pose, " + COMMON,
    ],
    "intercept": [
        "soccer defender reading the pass, anticipation stance, leading foot forward, eyes ahead, quick reaction pose, " + COMMON,
        "soccer defender intercepting pass, leg extended to cut the ball, sharp reaction burst, quick reaction pose, " + COMMON,
    ],
    "gk_save": [
        "soccer goalkeeper ready stance, knees bent, arms wide, eyes on ball, reflexive pose, " + COMMON,
        "soccer goalkeeper diving save, full stretch, hands reaching the ball, dynamic dive, reflexive save pose, " + COMMON,
    ],
    "goal": [
        "soccer striker unleashing a decisive strike mid-swing, leg driving through the ball, intense determination, dynamic action shot, " + COMMON,
        "soccer striker striking the ball into goal, ball flying into net, impact burst, explosive pose, " + COMMON,
        "soccer player celebrating goal, both arms raised, joyful victory expression, triumphant celebration pose, " + COMMON,
    ],
    "kickoff": [
        "soccer player kicking off at center circle, foot on ball, starting pose, dynamic starting pose, " + COMMON,
    ],
}


def workflow(scene, frame_index, prompt, seed):
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "songmix_v13.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": prompt}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": ACTION_NEG}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 768, "height": 448, "batch_size": 1}},
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "seed": seed,
                "steps": 26,
                "cfg": 4.5,
                "sampler_name": "euler_ancestral",
                "scheduler": "normal",
                "denoise": 1,
            },
        },
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": f"touhou_spell_futsal/anim/{scene}_{frame_index + 1}"}},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--scenes", nargs="*", default=None, help="生成するシーンを限定 (shoot dribble goal 等)")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stats = request_json("/system_stats")
    print(f"ComfyUI OK: {stats['system']['comfyui_version']}")

    scenes = SCENES if not args.scenes else {k: v for k, v in SCENES.items() if k in set(args.scenes)}
    manifest_path = OUT_DIR / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}

    seed_base = 470528000
    si = 0
    for scene, prompts in scenes.items():
        frames = []
        for fi, prompt in enumerate(prompts):
            dest = OUT_DIR / f"{scene}_{fi + 1}.png"
            rel = str(dest.relative_to(ROOT)).replace("\\", "/")
            frames.append(rel)
            if dest.exists() and dest.stat().st_size > 10_000 and not args.force:
                print(f"skip existing {dest.name}")
                si += 1
                continue
            seed = seed_base + si
            si += 1
            print(f"generate {scene}_{fi + 1} seed={seed}")
            queued = request_json("/prompt", {"prompt": workflow(scene, fi, prompt, seed), "client_id": "touhou_spell_futsal_anim"})
            history = wait_for_prompt(queued["prompt_id"])
            images = []
            for output in history.get("outputs", {}).values():
                images.extend(output.get("images", []))
            if not images:
                raise RuntimeError(f"No image output for {scene}_{fi + 1}")
            download_output(images[0], dest)
            print(f"saved {dest}")
        manifest[scene] = frames

    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"done ({len(manifest)} scenes)")


if __name__ == "__main__":
    main()
