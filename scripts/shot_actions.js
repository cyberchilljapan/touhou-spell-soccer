// アクションCG/競り合い/ボール演出をブラウザでスクショ検証する一回限りスクリプト。
//   node scripts/shot_actions.js
const { chromium } = require("@playwright/test");
const path = require("path");

const URL = "http://127.0.0.1:8787/";
const OUT = path.resolve(__dirname, "../_shots");
const fs = require("fs");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// 生成済みキャラ (reimu=GK, suika=DF) で検証 (Anima フレームが存在する)。
const A = "reimu", D = "suika";
const SHOTS = [
  ["contest", "success", null, A, D, "contest_attacker_win"],
  ["contest", "fail", null, D, A, "contest_defender_tackle"],
  ["shoot", "goal", null, A, D, "goal_celebration"],
  ["shoot", "fail", null, D, A, "shoot_gk_save"],
  ["pass", "success", null, A, D, "pass"],
  ["dribble", "success", null, A, D, "dribble_solo"],
];

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await page.goto(URL);
  await page.waitForTimeout(400);
  // 試合開始 (storyスキップ)
  await page.evaluate(() => { window.__touhouSpellFutsalDebug && window.__touhouSpellFutsalDebug.showAction("contest", "success"); });
  await page.waitForTimeout(300);

  for (const [type, outcome, shotKind, actorId, defId, name] of SHOTS) {
    await page.evaluate(([t, o, k, a, d]) => window.__touhouSpellFutsalDebug.showAction(t, o, k, a, d), [type, outcome, shotKind, actorId, defId]);
    // フリップ/競り合いアニメの中盤(クラッシュ後)を捉える
    await page.waitForTimeout(560);
    const stage = await page.$(".field-cg");
    if (stage) {
      await stage.screenshot({ path: path.join(OUT, `${name}.png`) });
      console.log("shot", name);
    } else {
      console.log("NO field-cg for", name);
    }
    if (name === "contest_attacker_win" || name === "goal_celebration") {
      const area = await page.$(".match-area");
      if (area) { await area.screenshot({ path: path.join(OUT, `layout_${name}.png`) }); console.log("shot layout_" + name); }
    }
  }

  await browser.close();
})();
