// 実機CT3(EmulatorJS)をPlaywrightで起動し、 各状態を撮影して観察する。
//   node scripts/emu_capture.js
const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const OUT = path.resolve(__dirname, "../_ct3ref/emu");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge", headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--ignore-gpu-blocklist", "--enable-webgl"] });
  const page = await browser.newPage({ viewport: { width: 900, height: 760 } });
  page.on("console", (m) => { const t = m.text(); if (/error|fail|EJS|core/i.test(t)) console.log("PAGE:", t.slice(0, 120)); });
  await page.goto("http://127.0.0.1:8788/", { waitUntil: "domcontentloaded" });
  // EmulatorJS のコア(WASM)ダウンロード+ブート待ち
  console.log("waiting for emulator boot...");
  await page.waitForTimeout(8000);
  // 「Start Game」overlay があればクリック (audio policy)
  for (const sel of ['.ejs_start_button', 'div:has-text("Start Game")', 'button:has-text("Start")']) {
    const el = await page.$(sel);
    if (el) { try { await el.click({ timeout: 1500 }); console.log("clicked", sel); } catch (e) {} }
  }
  await page.waitForTimeout(12000);
  const shot = async (name) => { await page.screenshot({ path: path.join(OUT, name + ".png") }); console.log("shot", name); };
  await shot("00_boot");
  // タイトル → Start(Enter) を数回送って進める
  for (let i = 0; i < 6; i++) { await page.keyboard.press("Enter"); await page.waitForTimeout(1500); }
  await shot("01_after_start");
  // さらに方向+決定で進める (チーム選択等)
  for (let i = 0; i < 5; i++) { await page.keyboard.press("z"); await page.waitForTimeout(900); }
  await shot("02_after_z");
  const canvasInfo = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    return c ? { w: c.width, h: c.height } : null;
  });
  console.log("canvas:", JSON.stringify(canvasInfo));
  await browser.close();
})();
