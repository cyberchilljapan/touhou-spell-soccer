// 実機CT3 (EmulatorJS @8788) をヘッドレスで駆動し、 進行を逐次スクショ。
//   PW_CHANNEL=chromium node scripts/ct3_capture_seq.js
// キー: Arrow=dpad, z/x/a/s=SNESボタン, Enter=Start, Shift=Select。
const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const OUT = path.resolve(__dirname, "../_ct3ref/real");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const STEPS = JSON.parse(process.env.CT3_STEPS || "null") || [
  // [label, key, postWaitMs]
  ["00_boot", null, 0],
  ["01_enter", "Enter", 2500],
  ["02_enter", "Enter", 2500],
  ["03_z", "z", 2200],
  ["04_z", "z", 2200],
  ["05_enter", "Enter", 2200],
  ["06_x", "x", 2200],
  ["07_z", "z", 2200],
  ["08_enter", "Enter", 2200],
  ["09_z", "z", 2200],
  ["10_x", "x", 2200],
];

(async () => {
  const b = await chromium.launch({ args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-gl=angle", "--use-angle=d3d11", "--autoplay-policy=no-user-gesture-required", "--disable-features=CalculateNativeWinOcclusion"] });
  const p = await b.newPage({ viewport: { width: 1000, height: 820 } });
  p.on("console", (m) => { const t = m.text(); if (/EJS|ready|start|error/i.test(t)) console.log("PAGE:", t.slice(0, 90)); });
  await p.goto("http://127.0.0.1:8788/", { waitUntil: "domcontentloaded" });
  console.log("booting emulator...");
  await p.waitForTimeout(14000);
  // Start Game オーバーレイがあれば押す
  for (const sel of ['.ejs_start_button', 'div:has-text("Start Game")']) {
    const el = await p.$(sel); if (el) { try { await el.click({ timeout: 1200 }); console.log("clicked", sel); } catch (e) {} }
  }
  await p.waitForTimeout(2000);
  const canvas = async () => (await p.$("canvas")) || (await p.$("#game canvas"));
  // 入力/オーディオ有効化のため canvas を一度クリック (ユーザジェスチャ)。
  try { const c0 = await canvas(); if (c0) await c0.click({ timeout: 1500 }); } catch (e) {}
  const shot = async (name) => {
    const c = await canvas();
    if (c) await c.screenshot({ path: path.join(OUT, name + ".png") });
    else await p.screenshot({ path: path.join(OUT, name + "_page.png") });
    console.log("shot", name);
  };
  for (const [label, key, wait] of STEPS) {
    if (key) { await p.keyboard.press(key); }
    await p.waitForTimeout(wait || 800);
    await shot(label);
  }
  const info = await p.evaluate(() => { const c = document.querySelector("canvas"); return c ? { w: c.width, h: c.height } : null; });
  console.log("canvas:", JSON.stringify(info));
  await b.close();
  console.log("done");
})();
