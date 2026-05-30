// CT3忠実化の演出カット確認: ゴール(赤レターボックス)と必殺技(青スピード線)。
const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const OUT = path.resolve(__dirname, "../_shots");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await p.goto("http://127.0.0.1:8799/");
  await p.getByRole("button", { name: "異変開始" }).click();
  await p.waitForTimeout(400);

  // ゴール演出 (赤レターボックス+顔アップ叫び)
  await p.evaluate(() => window.__touhouSpellFutsalDebug.showAction("shoot", "goal"));
  await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, "cut_goal.png") });

  // 必殺技カットイン (青スピード線背景)
  await p.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await p.waitForTimeout(200);
  const spell = await p.$('[data-action="resolve"][data-option="spell"]');
  if (spell) { await spell.click(); await p.waitForTimeout(450); }
  await p.screenshot({ path: path.join(OUT, "cut_spell.png") });
  await b.close();
  console.log("cut shots done");
})();
