// 多段演出(発動→過程→相手対応→合否)を実プレイで各beat撮影する検証スクリプト。
//   node scripts/shot_sequence.js
const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const URL = "http://127.0.0.1:8787/";
const OUT = path.resolve(__dirname, "../_shots/seq");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await page.goto(URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.waitForTimeout(300);

  // シュートコマンド(移動せず即) → バトルカード normal → away GK 相手に全beat結合。
  await page.locator('.cmd-row[data-type="shoot"]').click();
  await page.waitForTimeout(150);
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  await page.waitForTimeout(300);

  // 各 beat を ▶次へ で送りながら撮影 (最大8枚)。
  for (let i = 0; i < 8; i++) {
    const area = await page.$(".match-area");
    if (area) await area.screenshot({ path: path.join(OUT, `beat_${i}.png`) });
    const msg = await page.evaluate(() => {
      const p = document.querySelector(".action-scene p");
      return p ? p.textContent : "";
    });
    console.log(`beat ${i}: ${msg}`);
    const adv = page.locator(".advance-btn");
    if (await adv.count()) { await adv.click(); await page.waitForTimeout(220); }
    else break;
  }
  await browser.close();
})();
