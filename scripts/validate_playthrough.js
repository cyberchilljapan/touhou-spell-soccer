// 多段演出が長い試合で破綻しないか自動プレイで検証 (pageerror/スタック/得点フロー死を検出)。
//   node scripts/validate_playthrough.js
// 旧版は .ct3-clock(残り時間カウントダウン)を turn と誤読し stuck 検知が無効化、
// かつ得点が一度も入らなくても緑だった。今は debug.matchSnapshot() で実 turn/shots/goals を読み、
// (a) turn/得点/保持が一定手数まったく動かなければ STUCK、(b) 完走後に総シュート0 or 総得点0 を FAIL とする。
const { chromium } = require("@playwright/test");
const URL = "http://127.0.0.1:8787/";
const MATCHES = Number(process.env.MATCHES || 3);

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  let fail = false;
  const totals = { shots: 0, goals: 0 };
  for (let m = 0; m < MATCHES; m++) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
    await page.goto(URL);
    await page.getByRole("button", { name: "フリー対戦" }).click();
    await page.getByRole("button", { name: "試合開始" }).click();
    await page.evaluate(() => { const a = document.querySelector('.auto-toggle'); if (a) a.click(); });

    // DOM の局面 + debug の実進行スナップショットを1回で取得。
    const snap = () => page.evaluate(() => {
      const D = window.__touhouSpellFutsalDebug;
      const ms = (D && D.matchSnapshot && D.matchSnapshot()) || null;
      const distEl = document.querySelector(".ct3-dist b");
      return {
        hasCmd: !!document.querySelector('.cmd-row[data-action]:not([disabled])'),
        canShoot: !!document.querySelector('.cmd-row[data-type="shoot"]:not([disabled])'),
        canPass: !!document.querySelector('.cmd-row[data-type="pass"]:not([disabled])'),
        hasBattle: !!document.querySelector('[data-action="resolve"]'),
        hasGk: !!document.querySelector('[data-action="gk-choice"]'),
        hasInterrupt: !!document.querySelector('[data-action="interrupt"]'),
        hasAdvance: !!document.querySelector(".advance-btn"),
        finished: !!document.querySelector(".result-panel") || (ms && ms.finished),
        goalDist: distEl ? parseInt(distEl.textContent, 10) : -1,
        ms,
      };
    });

    const click = async (sel) => { try { await page.locator(sel).first().click({ timeout: 1500, force: true }); } catch (e) { /* detached on re-render */ } };

    let steps = 0, stuck = 0, lastSig = "";
    for (steps = 0; steps < 900; steps++) {
      const st = await snap();
      if (st.finished) { console.log(`M${m} FINISHED step ${steps} ${st.ms ? JSON.stringify(st.ms.score) : ""} shots=${st.ms ? st.ms.shots : "?"} goals=${st.ms ? st.ms.goals : "?"}`); break; }
      if (st.hasGk) {
        await click('[data-action="gk-choice"]');
      } else if (st.hasInterrupt) {
        await click('[data-action="interrupt"][data-option="tackle"]');
      } else if (st.hasBattle) {
        const tier = ["normal", "normal", "spell", "ultimate"][steps % 4];
        const r = page.locator(`[data-action="resolve"][data-option="${tier}"]`);
        await click(`[data-action="resolve"][data-option="${(await r.count()) ? tier : "normal"}"]`);
      } else if (st.hasCmd) {
        // 近ければ撃つ / 遠ければ前進(W)、 時々パスで展開。
        if (st.canShoot && st.goalDist >= 0 && st.goalDist < 22) {
          await click('.cmd-row[data-type="shoot"]');
        } else if (st.canPass && steps % 5 === 4) {
          await click('.cmd-row[data-type="pass"]');
          await page.waitForTimeout(40);
          const badge = page.locator('.pass-target-badge');
          if (await badge.count()) await click('.pass-target-badge');
        } else {
          try { await page.keyboard.press("w"); } catch (e) { /* ignore */ }
        }
      } else if (st.hasAdvance) {
        await click(".advance-btn");
      } else {
        try { await page.keyboard.press("Space"); } catch (e) { /* ignore */ }
      }
      await page.waitForTimeout(45);

      // 実進行シグナル: turn / 得点 / 保持 のどれかが動けば進行とみなす。 何も動かない手数を stuck カウント。
      const sig = st.ms ? `${st.ms.turn}|${st.ms.scoreTotal}|${st.ms.shots}|${st.ms.possession}` : `dom${steps}`;
      if (sig === lastSig) stuck++; else { stuck = 0; lastSig = sig; }
      if (steps % 60 === 0) console.log(`M${m} step ${steps} ${st.ms ? `turn ${st.ms.turn} score ${st.ms.scoreTotal} shots ${st.ms.shots}` : "(no snapshot)"}`);
      if (stuck > 120) {
        const detail = await page.evaluate(() => {
          const D = window.__touhouSpellFutsalDebug;
          const s = (D && D.getState && D.getState()) || {};
          return {
            possession: s.match ? s.match.possession : "",
            actionMsg: (document.querySelector(".action-scene .vn-box p") || document.querySelector(".action-scene p") || {}).textContent || "",
            vnName: (document.querySelector(".vn-name") || {}).textContent || "",
            banners: [...document.querySelectorAll(".dialog-banner")].map((x) => x.textContent),
            modals: { battle: !!(s.match && s.battle), gk: !!s.gkChoice, interrupt: !!s.interrupt, passPicker: !!s.passPicker, advance: !!s.advance, playSeq: !!s.playSeq },
          };
        });
        console.log(`M${m} STUCK at step ${steps} sig=${sig}`, JSON.stringify(detail));
        fail = true;
        break;
      }
      if (errors.length) break;
    }

    const fin = await page.evaluate(() => { const D = window.__touhouSpellFutsalDebug; return (D && D.matchSnapshot && D.matchSnapshot()) || null; });
    if (fin) { totals.shots += fin.shots; totals.goals += fin.goals; }
    console.log(`M${m} steps=${steps} errors=${errors.length} ${fin ? `shots=${fin.shots} goals=${fin.goals}` : "no-snapshot"}`);
    errors.slice(0, 6).forEach((e) => console.log("ERR:", e.slice(0, 200)));
    if (errors.length) fail = true;
    await page.close();
  }

  console.log(`\nTOTALS over ${MATCHES} matches: shots=${totals.shots} goals=${totals.goals}`);
  // 得点フローの死活: 全試合通算でシュート0 or 得点0 は退行 (偽greenの根絶)。
  if (totals.shots === 0) { console.log("FAIL: 総シュート0 — 攻撃が一度も成立していない (得点フロー死)"); fail = true; }
  if (totals.goals === 0) { console.log("FAIL: 総得点0 — シュートが一度も決まっていない (得点フロー退行)"); fail = true; }
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
