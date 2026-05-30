// CT3忠実化UIの確認スクショ。 試合画面(全体)と下段パネル(寄り)を撮る。
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
  await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, "ct3ui_full.png") });
  const panel = await p.$(".ct3-panel");
  if (panel) await panel.screenshot({ path: path.join(OUT, "ct3ui_panel.png") });
  // コマンド行に hover して赤反転を確認
  const shootRow = await p.$('.cmd-row[data-type="shoot"]');
  if (shootRow) { await shootRow.hover(); await p.waitForTimeout(150); }
  if (panel) await panel.screenshot({ path: path.join(OUT, "ct3ui_panel_hover.png") });
  await b.close();
  console.log("shots done");
})();
