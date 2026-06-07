// 演出の現状を目視診断するための一括スクショ。
//   node scripts/shot_show.js   → _show/*.png
const { chromium } = require("@playwright/test");
const fs = require("fs");
const URL = "http://127.0.0.1:8787/";
const OUT = "_show";

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
  page.on("pageerror", (e) => console.log("ERR", String(e).slice(0, 160)));
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
  await page.goto(URL);
  const shot = async (name) => { await page.screenshot({ path: `${OUT}/${name}.png` }); console.log("shot", name); };
  const D = (fn) => page.evaluate(fn);

  // 1. セットアップ(チーム選択) = 全体のアートディレクション
  await shot("01_setup");

  // 試合開始
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.waitForTimeout(300);
  await shot("02_match_kickoff");

  // 2. VS画面
  await D(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await page.waitForTimeout(120);
  await shot("03_vs_screen");

  // 3. バトルカード(コマンド選択) = VSを消してから
  await page.waitForTimeout(800);
  await shot("04_battle_card");

  // 4. スペルカットイン (shoot→spell)
  await D(() => { const d = window.__touhouSpellFutsalDebug; d.getState().battle = null; d.startBattle("shoot"); });
  await page.waitForTimeout(800);
  await page.locator('[data-action="resolve"][data-option="spell"]').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(260);
  await shot("05_spell_cutin");

  // 5. アクションシーン(競り合い)
  await D(() => window.__touhouSpellFutsalDebug.showAction("contest", "success"));
  await page.waitForTimeout(200);
  await shot("06_action_contest");

  // 6. アクションシーン(シュート)
  await D(() => window.__touhouSpellFutsalDebug.showAction("shoot", "success", "volley"));
  await page.waitForTimeout(200);
  await shot("07_action_shoot");

  // 7. アクションシーン(ドリブル)
  await D(() => window.__touhouSpellFutsalDebug.showAction("dribble", "success"));
  await page.waitForTimeout(200);
  await shot("08_action_dribble");

  // 8. ゴール判定スタンプ
  await D(() => window.__touhouSpellFutsalDebug.forceJudge("goal"));
  await page.waitForTimeout(200);
  await shot("09_judge_goal");

  // 9. GK スペルセーブ選択
  await D(() => window.__touhouSpellFutsalDebug.forceGkChoice(true));
  await page.waitForTimeout(150);
  await shot("10_gk_spellsave");

  // 10. リアルなゴール → 歓喜カット (rigged shoot)
  await D(() => {
    const d = window.__touhouSpellFutsalDebug;
    const m = d.getState().match;
    const c = [...m.home.players, ...m.away.players].find((p) => p.id === m.carrierId) || m.home.players[1];
    m.possession = "home"; m.carrierId = c.id; c.x = 90; c.stats.shoot = 220; c.guts = 220;
    const gk = m.away.players.find((p) => p.role === "GK"); gk.stats.keep = 1; gk.stats.block = 1; gk.guts = 5;
    d.getState().battle = null; d.seedRng(20260607); d.startBattle("shoot");
  });
  await page.locator('[data-action="resolve"][data-option="normal"]').first().click({ force: true }).catch(() => {});
  // goal beat あたりで止めて撮る
  await page.waitForTimeout(900);
  await shot("11_goal_a");
  await page.locator(".advance-btn").first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(700);
  await shot("12_goal_celebrate");

  await browser.close();
})();
