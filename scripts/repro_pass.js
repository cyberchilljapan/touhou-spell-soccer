// home のパス全フロー検証: パス選択→ピッカー→対象選択→battle→resolve→beat送りで完了するか。
const { chromium } = require("@playwright/test");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await p.goto("http://127.0.0.1:8799/");
  await p.getByRole("button", { name: "異変開始" }).click();
  await p.waitForTimeout(400);
  // パスコマンド (key 2) → ピッカー
  await p.keyboard.press("2");
  await p.waitForTimeout(300);
  const pickerOpen = await p.evaluate(() => !!document.querySelector(".pass-picker-overlay"));
  const nBadges = await p.evaluate(() => document.querySelectorAll(".pass-target-badge").length);
  // 対象1を選択 (key 1)
  await p.keyboard.press("1");
  await p.waitForTimeout(300);
  const battleOpen = await p.evaluate(() => !!document.querySelector(".battle-card"));
  // 通常パスで解決 (key 1)
  await p.keyboard.press("1");
  await p.waitForTimeout(300);
  // beat を送って結果まで (drain)
  const drain = await p.evaluate(() => window.__touhouSpellFutsalDrainSeq({ untilResult: true }));
  const sceneMsg = await p.evaluate(() => { const s = document.querySelector(".action-scene"); return s ? s.textContent.replace(/\s+/g," ").slice(0,80) : null; });
  console.log(JSON.stringify({ pickerOpen, nBadges, battleOpen, drain, sceneMsg, errs }, null, 2));
  await b.close();
})();
