// パッケージ済み release/ が file:// 直開きで起動し試合まで入れるかの確認。
const { chromium } = require("@playwright/test");
const path = require("path");

(async () => {
  const b = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  const url = `file:///${path.resolve(__dirname, "..", "release", "touhou_spell_futsal", "index.html").replace(/\\/g, "/")}`;
  await p.goto(url);
  await p.waitForSelector(".setup", { timeout: 8000 });
  const font = await p.evaluate(async () => { await document.fonts.ready; return document.fonts.check('16px "DotGothic16"'); });
  await p.evaluate(() => { window.__touhouSpellFutsalSkipStory = true; });
  await p.getByRole("button", { name: "異変開始" }).click();
  await p.waitForSelector(".match-stage", { timeout: 8000 });
  await p.screenshot({ path: path.resolve(__dirname, "..", "_shots", "release_check.png") });
  console.log("release build boots OK / font:", font, "/ pageerrors:", errors.length);
  if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
  await b.close();
})();
