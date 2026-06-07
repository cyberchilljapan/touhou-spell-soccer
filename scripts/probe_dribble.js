// 「好きな方向にドリブルできない」を切り分け。 各方向で保持者が実際に動くか/即エンカウントで止まるかを計測。
//   node scripts/probe_dribble.js
const { chromium } = require("@playwright/test");
const URL = "http://127.0.0.1:8787/";
(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  page.on("pageerror", (e) => console.log("ERR", String(e).slice(0, 160)));
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await page.goto(URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.waitForTimeout(200);

  const read = () => page.evaluate(() => {
    const D = window.__touhouSpellFutsalDebug; const s = D.getState(); const m = s.match;
    const c = [...m.home.players, ...m.away.players].find((p) => p.id === m.carrierId);
    const nearest = (() => {
      const opp = m.away.players.filter((p) => p.role !== "GK").map((p) => ({ id: p.id, d: Math.hypot(p.x - c.x, p.y - c.y) })).sort((a, b) => a.d - b.d)[0];
      return opp ? opp.d.toFixed(1) : "?";
    })();
    const stageEl = document.querySelector(".match-stage");
    const fieldEl = document.querySelector(".field");
    const fieldVisible = fieldEl ? getComputedStyle(fieldEl).visibility !== "hidden" : false;
    return { id: c.id, x: +c.x.toFixed(1), y: +c.y.toFixed(1), guts: c.guts, possession: m.possession, battle: !!s.battle, advance: !!s.advance, playSeq: !!s.playSeq, stage: stageEl ? (stageEl.classList.contains("stage-pitch") ? "pitch" : "cg") : "?", fieldVisible, canMove: (s.screen === "match" && !m.finished && m.possession === "home" && !s.battle && !s.advance && !s.playSeq && !s.passPicker && !s.gkChoice && !s.interrupt && !s.vnScene), nearestOppDist: nearest };
  });

  console.log("START", JSON.stringify(await read()));
  const keys = ["w", "a", "s", "d", "q", "e", "z", "c"];
  for (const k of keys) {
    const before = await read();
    await page.keyboard.press(k);
    await page.waitForTimeout(120);
    const after = await read();
    const moved = (after.x !== before.x || after.y !== before.y);
    console.log(`key ${k}: moved=${moved} (${before.x},${before.y})->(${after.x},${after.y}) stage=${after.stage} fieldVisible=${after.fieldVisible} battle=${after.battle} nearOpp=${before.nearestOppDist}`);
    // エンカウントしたら逃がして継続
    if (after.battle) { await page.keyboard.press("Escape").catch(() => {}); await page.waitForTimeout(120); }
    if (after.advance) { await page.locator(".advance-btn").first().click({ force: true }).catch(() => {}); await page.waitForTimeout(150); }
  }
  await browser.close();
})();
