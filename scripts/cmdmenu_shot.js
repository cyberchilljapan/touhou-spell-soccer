const { chromium } = require("@playwright/test");
(async () => {
  const b = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const p = await b.newPage({ viewport: { width: 1200, height: 800 } });
  await p.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await p.goto("http://127.0.0.1:8787/");
  await p.getByRole("button", { name: "フリー対戦" }).click();
  await p.getByRole("button", { name: "試合開始" }).click();
  await p.waitForTimeout(300);
  await p.keyboard.press(" ");
  await p.waitForTimeout(250);
  const has = await p.evaluate(() => !!document.querySelector(".cmd-cross"));
  console.log("commandMenu open:", has);
  await p.screenshot({ path: require("path").resolve(__dirname, "../_shots/command_menu.png") });
  await b.close();
})();
