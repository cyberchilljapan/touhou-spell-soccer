// 実フローで「シュートが何本撃たれ、距離/結果がどうか」を計測する診断プローブ。
// 0-0 が「数式破綻」か「ボットが近距離シュートに持ち込めてないだけ」かを切り分ける。
//   node scripts/probe_shots.js
const { chromium } = require("@playwright/test");
const URL = "http://127.0.0.1:8787/";

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const tally = { shootOpen: 0, gkBeat: 0, goal: 0, save: 0, post: 0, cover: 0, spill: 0, distSum: 0, distN: 0, distHist: {} };
  const lines = [];
  for (let m = 0; m < 2; m++) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
    page.on("pageerror", (e) => lines.push("PAGEERR " + String(e).slice(0, 160)));
    page.on("console", (msg) => {
      const t = msg.text();
      if (/⚽|ゴール|シュート|セーブ|弾い|止め|ポスト|カバー|決ま|つきささ/.test(t)) lines.push(`M${m} ` + t.slice(0, 160));
    });
    await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
    await page.goto(URL);
    await page.getByRole("button", { name: "フリー対戦" }).click();
    await page.getByRole("button", { name: "試合開始" }).click();
    await page.evaluate(() => { const a = document.querySelector('.auto-toggle'); if (a) a.click(); });

    const snap = () => page.evaluate(() => ({
      score: (document.querySelector(".ct3-scoreline") || {}).textContent || "",
      hasCmd: !!document.querySelector('.cmd-row[data-type="pass"]:not([disabled])'),
      hasBattle: !!document.querySelector('[data-action="resolve"]'),
      hasGk: !!document.querySelector('[data-action="gk-choice"]'),
      hasInterrupt: !!document.querySelector('[data-action="interrupt"]'),
      hasAdvance: !!document.querySelector(".advance-btn"),
      finished: !!document.querySelector(".result-panel"),
      goalDist: (function(){ const b = document.querySelector(".ct3-dist b"); return b ? parseInt(b.textContent, 10) : -1; })(),
    }));
    const click = async (sel) => { try { await page.locator(sel).first().click({ timeout: 1500, force: true }); } catch (e) {} };
    for (let steps = 0; steps < 900; steps++) {
      const st = await snap();
      if (st.finished) { lines.push(`M${m} FINISHED score ${st.score}`); break; }
      if (st.hasGk) { tally.gkBeat++; await click('[data-action="gk-choice"]'); }
      else if (st.hasInterrupt) { await click('[data-action="interrupt"][data-option="tackle"]'); }
      else if (st.hasBattle) {
        const tier = ["normal", "normal", "spell", "ultimate"][steps % 4];
        let r = page.locator(`[data-action="resolve"][data-option="${tier}"]`);
        await click(`[data-action="resolve"][data-option="${(await r.count()) ? tier : "normal"}"]`);
      } else if (st.hasCmd) {
        const r6 = steps % 6;
        if (r6 < 4) { try { await page.keyboard.press("w"); } catch (e) {} }   // もっと前進させてから
        else {
          // 近ければシュート、遠ければパス
          if (st.goalDist >= 0 && st.goalDist < 22) {
            tally.shootOpen++;
            if (st.goalDist >= 0) { tally.distSum += st.goalDist; tally.distN++; const b = Math.floor(st.goalDist/10)*10; tally.distHist[b]=(tally.distHist[b]||0)+1; }
            await click(`.cmd-row[data-type="shoot"]`);
          } else {
            await click(`.cmd-row[data-type="pass"]`);
            await page.waitForTimeout(40);
            const badge = page.locator('.pass-target-badge');
            if (await badge.count()) await click('.pass-target-badge');
          }
        }
      } else if (st.hasAdvance) { await click(".advance-btn"); }
      else { try { await page.keyboard.press("Space"); } catch (e) {} }
      await page.waitForTimeout(40);
    }
    await page.close();
  }
  // 集計
  for (const l of lines) {
    if (/決ま|つきささ/.test(l)) tally.goal++;
    else if (/ポスト/.test(l)) tally.post++;
    else if (/カバー/.test(l)) tally.cover++;
    else if (/こぼれ|弾い/.test(l)) tally.spill++;
    else if (/止め|セーブ|受け止め|阻止/.test(l)) tally.save++;
  }
  console.log("=== PLAY-BY-PLAY (filtered) ===");
  lines.forEach((l) => console.log(l));
  console.log("\n=== TALLY ===", JSON.stringify(tally));
  console.log("avgShootDist=", tally.distN ? (tally.distSum/tally.distN).toFixed(1) : "n/a", "hist", JSON.stringify(tally.distHist));
  await browser.close();
  process.exit(0);
})();
