// VN クリック送りが効かない問題の診断: 何が .vn-box-large を覆っているか。
const { chromium } = require("@playwright/test");
const URL = "http://127.0.0.1:8787/";

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  // キャンペーン開始 → opening VN をクリックで送れるか
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.waitForSelector(".vn-modal", { timeout: 3000 });
  const probe = async (label) => {
    const r = await page.evaluate(() => {
      const box = document.querySelector(".vn-box-large");
      if (!box) return { box: false };
      const rect = box.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const el = document.elementFromPoint(cx, cy);
      const D = window.__touhouSpellFutsalDebug.getState();
      return {
        box: true,
        idx: D.vnScene ? D.vnScene.index : -1,
        total: D.vnScene ? D.vnScene.panels.length : -1,
        hit: el ? `${el.tagName}.${String(el.className).slice(0, 60)}` : "none",
        hitIsInsideBox: el ? box.contains(el) : false,
      };
    });
    console.log(label, JSON.stringify(r));
    return r;
  };
  await probe("opening:before-click");
  await page.locator(".vn-box-large").click({ timeout: 1500 }).catch((e) => console.log("opening click FAILED:", String(e).split("\n")[0]));
  await probe("opening:after-click");
  // VN を全部スキップ → 試合 → autoWin → 次の対戦へ → win VN でクリック診断
  await page.evaluate(() => window.__touhouSpellFutsalDebug.skipVnAll());
  await page.waitForSelector(".match-stage", { timeout: 5000 });
  await page.evaluate(() => window.__touhouSpellFutsalDebug.autoWinMatch());
  await page.waitForSelector('[data-action="nextCampaign"]', { timeout: 3000 });
  await page.locator('[data-action="nextCampaign"]').click();
  await page.waitForSelector(".vn-modal", { timeout: 3000 });
  const r1 = await probe("match2-winvn:before-click");
  await page.locator(".vn-box-large").click({ timeout: 1500 }).catch((e) => console.log("winvn click FAILED:", String(e).split("\n")[0]));
  const r2 = await probe("match2-winvn:after-click");
  console.log("advanced:", r1.idx, "->", r2.idx);
  console.log("pageerrors:", errors);
  await browser.close();
})();
