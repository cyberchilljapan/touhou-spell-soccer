// 守備/GK の十字方向プロンプト確認スクショ。
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
  // GK 必殺セーブ 4択クロス
  await p.evaluate(() => window.__touhouSpellFutsalDebug.forceGkChoice(true));
  await p.waitForTimeout(300);
  const gk = await p.$(".gk-card");
  if (gk) await gk.screenshot({ path: path.join(OUT, "prompt_gk.png") });
  await b.close();
  console.log("prompt shots done");
})();
