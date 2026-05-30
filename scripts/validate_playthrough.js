// 多段演出が長い試合で破綻しないか自動プレイで検証 (pageerror/スタック検出)。
//   node scripts/validate_playthrough.js
const { chromium } = require("@playwright/test");
const URL = "http://127.0.0.1:8787/";

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await page.goto(URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => { const a = document.querySelector('.auto-toggle'); if (a) a.click(); });

  let steps = 0, lastTurn = 0, stuck = 0, goals = 0;
  const snap = () => page.evaluate(() => ({
    turn: (document.querySelector(".ct3-clock") || {}).textContent || "",
    score: (document.querySelector(".ct3-scoreline") || {}).textContent || "",
    hasCmd: !!document.querySelector('.cmd-row[data-type="dribble"]:not([disabled])'),
    hasGk: !!document.querySelector('[data-action="gk-choice"]'),
    hasInterrupt: !!document.querySelector('[data-action="interrupt"]'),
    hasAdvance: !!document.querySelector(".advance-btn"),
    finished: !!document.querySelector(".result-panel"),
  }));

  const click = async (sel) => { try { await page.locator(sel).first().click({ timeout: 1500, force: true }); } catch (e) { /* detached on re-render: ignore */ } };
  for (steps = 0; steps < 800; steps++) {
    const st = await snap();
    if (st.finished) { console.log(`FINISHED at step ${steps}, score ${st.score}`); break; }
    if (st.hasGk) {
      await click('[data-action="gk-choice"]');
    } else if (st.hasInterrupt) {
      await click('[data-action="interrupt"][data-option="tackle"]');
    } else if (st.hasCmd) {
      const c = ["dribble", "pass", "shoot", "team", "dribble", "shoot"][steps % 6];
      await click(`.cmd-row[data-type="${c}"]`);
      await page.waitForTimeout(40);
      // 受け手選択(pass)
      const badge = page.locator('.pass-target-badge');
      if (await badge.count()) await click('.pass-target-badge');
      // tier を巡回 (normal/spell/ultimate) で全 beat 経路を踏む
      const tier = ["normal", "normal", "spell", "ultimate"][steps % 4];
      await page.waitForTimeout(30);
      let r = page.locator(`[data-action="resolve"][data-option="${tier}"]`);
      if (!(await r.count())) r = page.locator('[data-action="resolve"][data-option="normal"]');
      await click(`[data-action="resolve"][data-option="${(await r.count()) ? tier : "normal"}"]`);
    } else if (st.hasAdvance) {
      await click(".advance-btn");
    } else {
      try { await page.keyboard.press("Space"); } catch (e) { /* ignore */ }
    }
    await page.waitForTimeout(50);
    const t = parseInt((st.turn.match(/TURN\s+(\d+)/) || [])[1] || "0", 10);
    if (t === lastTurn) stuck++; else { stuck = 0; lastTurn = t; }
    if (steps % 30 === 0) console.log(`step ${steps} turn ${t} ${JSON.stringify({ cmd: st.hasCmd, gk: st.hasGk, int: st.hasInterrupt, adv: st.hasAdvance })}`);
    if (stuck > 120) {
      console.log(`STUCK at turn ${t} (step ${steps}) state=${JSON.stringify(st)}`);
      const detail = await page.evaluate(() => {
        const d = window.__touhouSpellFutsalDebug;
        const m = (window.state || {});
        return {
          possession: document.querySelector(".ct3-label") ? document.querySelector(".ct3-label").textContent : "",
          actionMsg: (document.querySelector(".action-scene p") || {}).textContent || "",
          vnName: (document.querySelector(".vn-name") || {}).textContent || "",
          dialogs: [...document.querySelectorAll(".dialog-banner")].map((x) => x.textContent),
        };
      });
      console.log("STUCK detail:", JSON.stringify(detail));
      break;
    }
    if (errors.length) break;
  }
  console.log(`steps=${steps} lastTurn=${lastTurn} errors=${errors.length}`);
  errors.slice(0, 6).forEach((e) => console.log("ERR:", e.slice(0, 200)));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
