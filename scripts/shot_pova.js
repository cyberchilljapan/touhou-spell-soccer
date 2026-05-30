const { chromium } = require("@playwright/test");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await p.goto("http://127.0.0.1:8799/");
  await p.getByRole("button", { name: "異変開始" }).click();
  await p.waitForTimeout(400);
  // シュートvsGK (GK行動=focus defender) → POV-A 遠近カット
  await p.evaluate(() => window.__touhouSpellFutsalDebug.showAction("shoot", "fail", "header", null, null, "defender"));
  await p.waitForTimeout(400);
  const cg = await p.$(".field-cg");
  if (cg) await cg.screenshot({ path: path.resolve(__dirname, "../_shots/cut_pova.png") });
  await b.close();
  console.log("pova shot done");
})();
