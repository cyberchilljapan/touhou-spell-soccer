// 幻想郷トーナメント 自動 playthrough + 全 phase スクリーンショット。
// 使い方:
//   1. 別 shell で `python -m http.server 8787 -b 127.0.0.1` を起動
//   2. `node scripts/playthrough.js` を実行
// 出力先: playthrough/*.png

const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

const HTTP_URL = "http://127.0.0.1:8787/";
const OUT = path.resolve(__dirname, "..", "playthrough");

const OPPONENTS = ["kouma", "youkai_mountain", "eientei", "chireiden", "myouren", "shinreibyo", "rebel_beast"];

async function advanceVnUntilDone(page, label) {
  // VN modal が消えるまで Space を押す。各 panel で screenshot。
  let i = 0;
  // 初回出現を最大 2 秒待つ
  try {
    await page.waitForSelector(".vn-modal", { state: "visible", timeout: 2000 });
  } catch {}
  while (await page.locator(".vn-modal").count() > 0) {
    const safeLabel = label.replace(/[^a-zA-Z0-9_-]/g, "_");
    await page.screenshot({ path: path.join(OUT, `${safeLabel}_${String(i).padStart(2, "0")}.png`), fullPage: false });
    i++;
    // click on vn box (more reliable than keyboard)
    await page.locator(".vn-box-large").click({ timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(220);
    if (i > 30) { console.error("VN advance loop overflow at " + label); break; }
  }
  console.log(`  ${label}: ${i} panels advanced`);
}

async function autoWinMatch(page) {
  // 簡易: debug API で勝利状態に遷移。
  await page.evaluate(() => window.__touhouSpellFutsalDebug.autoWinMatch());
  await page.waitForTimeout(420);
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  console.log("Launching browser...");
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // 既存セーブをクリアしてクリーンスタート
  await page.goto(HTTP_URL);
  await page.evaluate(() => { window.localStorage.clear(); });
  await page.reload();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector(".setup", { timeout: 6000 });
  await page.waitForTimeout(500);

  // resume banner があれば discard
  const discardBtn = page.getByRole("button", { name: "破棄" });
  if (await discardBtn.count() > 0) {
    await discardBtn.click();
    await page.waitForTimeout(300);
  }
  // mode を campaign に確実にする (default のはず)
  const modeCampaign = page.locator('[data-action="mode"][data-mode="campaign"]');
  if (await modeCampaign.count() > 0) {
    const cls = await modeCampaign.getAttribute("class") || "";
    if (!cls.includes("selected-mode")) {
      await modeCampaign.click();
      await page.waitForTimeout(200);
    }
  }

  await page.screenshot({ path: path.join(OUT, "00_setup_initial.png") });
  console.log("setup screenshot OK");

  // 異変開始 → opening VN
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.waitForTimeout(600);
  const stateInfo = await page.evaluate(() => ({
    screen: state.screen,
    mode: state.mode,
    hasVn: !!state.vnScene,
    hasCampaign: !!state.campaign,
    skipStory: !!window.__touhouSpellFutsalSkipStory,
  }));
  console.log("After click:", JSON.stringify(stateInfo));
  await page.screenshot({ path: path.join(OUT, "01_after_click.png") });
  await advanceVnUntilDone(page, "01_opening");

  // 1 試合目 (kouma) は startMatch 内で pre-match VN 起動するはず
  for (let m = 0; m < OPPONENTS.length; m++) {
    const opp = OPPONENTS[m];
    const prefix = `${String(m + 2).padStart(2, "0")}_match${m + 1}_${opp}`;
    console.log(`Match ${m + 1} / ${OPPONENTS.length}: ${opp}`);
    // pre-match VN (kouma 試合の前 → opening 完了後 startMatch が呼ぶ → pre VN)
    if (await page.locator(".vn-modal").count() > 0) {
      await advanceVnUntilDone(page, `${prefix}_pre`);
    } else {
      console.log(`  ${prefix}: no pre VN (already in match)`);
    }
    // 試合画面 screenshot
    await page.waitForSelector(".field", { timeout: 6000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, `${prefix}_field.png`) });

    // 自動勝利
    await autoWinMatch(page);
    await page.waitForTimeout(420);
    await page.screenshot({ path: path.join(OUT, `${prefix}_result.png`) });

    if (m < OPPONENTS.length - 1) {
      // 次の対戦へ → win VN → pre VN of next
      const nextBtn = page.getByRole("button", { name: "次の対戦へ" });
      if (await nextBtn.count() > 0) {
        await nextBtn.click();
        await page.waitForTimeout(420);
        // win VN
        await advanceVnUntilDone(page, `${prefix}_win`);
      }
    } else {
      // 最終試合の勝利後はエンディングを見るボタン
      const endBtn = page.getByRole("button", { name: "エンディングを見る" });
      if (await endBtn.count() > 0) {
        await endBtn.click();
        await page.waitForTimeout(420);
        await advanceVnUntilDone(page, `${prefix}_win`);
        // ending VN がそのまま続く想定
        await advanceVnUntilDone(page, "99_ending");
      }
    }
  }

  // 最終 setup screenshot
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, "99_setup_final.png") });
  console.log("Final setup screenshot OK");

  await browser.close();
  console.log("DONE. Screenshots in: " + OUT);
}

main().catch((e) => {
  console.error("playthrough failed:", e);
  process.exit(1);
});
