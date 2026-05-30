const { chromium } = require("@playwright/test");
const path = require("path");
(async () => {
  const b = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const p = await b.newPage({ viewport: { width: 1200, height: 820 } });
  await p.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await p.goto("http://127.0.0.1:8787/");
  await p.getByRole("button", { name: "フリー対戦" }).click();
  await p.getByRole("button", { name: "試合開始" }).click();
  await p.waitForTimeout(400);
  // 自由方向ドリブル検証: W/A/S/D で ball 位置が各方向に動くか
  const ballPos = () => p.evaluate(() => { const b = document.querySelector(".ball"); return { x: parseFloat(b.style.left), y: parseFloat(b.style.top) }; });
  const p0 = await ballPos();
  await p.keyboard.press("w"); await p.waitForTimeout(120); const pW = await ballPos();
  await p.keyboard.press("a"); await p.waitForTimeout(120); const pA = await ballPos();
  await p.keyboard.press("s"); await p.waitForTimeout(120); const pS = await ballPos();
  await p.keyboard.press("d"); await p.waitForTimeout(120); const pD = await ballPos();
  console.log("start", p0, "W", pW, "A", pA, "S", pS, "D", pD);
  console.log("W前進(x+):", pW.x > p0.x, " A左(y-):", pA.y < pW.y, " S後退(x-):", pS.x < pA.x, " D右(y+):", pD.y > pS.y);
  await p.screenshot({ path: path.resolve(__dirname, "../_shots/layout_free_move.png") });
  await b.close();
})();
