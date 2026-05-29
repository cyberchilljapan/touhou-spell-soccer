const { test, expect } = require("@playwright/test");
const path = require("path");

// channel / webServer は playwright.config.js が管理 (ローカル=Edge / CI=chromium)。

const HTTP_URL = "http://127.0.0.1:8787/";
const FILE_URL = `file:///${path.resolve(__dirname, "../index.html").replace(/\\/g, "/")}`;

// 全 test の前に story VN を skip (test 動作向け)
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
});

test("campaign match starts and resolves a command battle", async ({ page }) => {
  await page.goto(HTTP_URL);
  await expect(page.getByRole("heading", { name: "東方スペルサッカー" })).toBeVisible();
  await expect(page.locator('img[src="./assets/team_cg/hakurei.png"]').first()).toBeVisible();

  await page.getByRole("button", { name: "異変開始" }).click();
  await expect(page.locator(".field")).toBeVisible();
  await expect(page.locator(".clock")).toContainText("TURN 1 / 30");
  await expect(page.locator(".play-banner")).toContainText("保持");
  await expect(page.locator(".play-banner")).toContainText("攻撃方向");

  await page.getByRole("button", { name: /ドリブル/ }).click();
  await expect(page.locator(".battle-card")).toBeVisible();
  await expect(page.locator(".action-scene")).toContainText("COMMAND / ドリブル突破");
  await expect(page.locator('.battle-card img[src="./assets/portraits/sanae.png"]')).toBeVisible();
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  await expect(page.locator(".battle-card")).toHaveCount(0);
  await expect(page.locator(".action-scene")).toContainText(/攻撃値|守備値/);
  await expect(page.locator(".log-entry").first()).toBeVisible();
});

test("all team portraits can appear in battle", async ({ page }) => {
  const cases = [
    { team: "妖怪山", portrait: "aya.png" },
    { team: "永遠亭", portrait: "kaguya.png" },
    { team: "地霊殿", portrait: "satori.png" },
    { team: "命蓮寺", portrait: "shou.png" },
    { team: "神霊廟", portrait: "futo.png" },
    { team: "反逆獣連合", portrait: "seija.png" },
  ];

  for (const item of cases) {
    await page.goto(HTTP_URL);
    await page.getByRole("button", { name: "フリー対戦" }).click();
    await page.locator(`[data-select="home"][data-team]`, { hasText: item.team }).click();
    await page.getByRole("button", { name: "試合開始" }).click();
    await page.getByRole("button", { name: /ドリブル/ }).click();
    await expect(page.locator(`.battle-card img[src="./assets/portraits/${item.portrait}"]`).first()).toBeVisible();
  }
});

test("spell command shows dedicated cut-in art", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.locator('[data-select="home"][data-team="youkai_mountain"]').click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  // カットインは {id}.png(タメ) と {id}_b.png(放出) を交互にめくるので両フレームを許容。
  await expect(page.locator(".cutin img")).toBeVisible();
  await expect(page.locator(".cutin img")).toHaveAttribute("src", /\/assets\/cutins\/aya(_b)?\.png$/);
});

test("non-leader character also shows dedicated cut-in art", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  await expect(page.locator(".cutin img")).toBeVisible();
  await expect(page.locator(".cutin img")).toHaveAttribute("src", /\/assets\/cutins\/sanae(_b)?\.png$/);
});

test("saved unlock progress is shown on setup screen", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("touhouSpellFutsalSaveV1", JSON.stringify({
      unlockedTeams: ["hakurei", "kouma", "youkai_mountain", "eientei", "chireiden", "myouren", "shinreibyo", "rebel_beast"],
      campaignClears: 1,
      lastUnlocked: "rebel_beast",
    }));
  });
  await page.goto(HTTP_URL);
  await expect(page.locator(".progress-summary")).toContainText("解放チーム 8 / 8");
  await expect(page.locator(".progress-summary")).toContainText("クリア回数 1");
});

test("audio mute toggle is saved", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "音 OFF" }).click();
  await expect(page.getByRole("button", { name: "音 ON" })).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem("touhouSpellFutsalSaveV1")));
  expect(saved.audioMuted).toBe(true);
});

test("difficulty selection is saved", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "HARD" }).click();
  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem("touhouSpellFutsalSaveV1")));
  expect(saved.difficulty).toBe("hard");
  await expect(page.getByRole("button", { name: "HARD" })).toHaveClass(/selected-mode/);
});

test("match starts with a pre-match event dialogue", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await expect(page.locator(".event-dialogue")).toBeVisible();
  await expect(page.locator(".event-dialogue")).toContainText("レミリア");
  await expect(page.locator(".event-dialogue")).toContainText("運命ごと蹴り返してあげる");
});

test("command UI uses a captain-tsubasa-like cross layout", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await expect(page.locator(".command-title")).toContainText("どうする？");
  await expect(page.getByRole("button", { name: /↑ ドリブル/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /← パス/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /→ シュート/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /↓ 連携スペル/ })).toBeVisible();
});

test("sprite VN action scene explains the current play", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await expect(page.locator(".action-scene")).toContainText("キックオフ");
  await page.getByRole("button", { name: /シュート/ }).click();
  await expect(page.locator(".action-scene")).toContainText("COMMAND / シュート勝負");
  // 保持者は博麗神社の MF 早苗。スペル段はキャラ固有スペルカード名を表示する。
  await expect(page.locator('[data-action="resolve"][data-option="spell"]')).toContainText("奇跡のスルーパス");
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  await expect(page.locator(".action-scene")).toContainText(/GK値|攻撃値/);
});

test("goalkeepers stay in front of each goal", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  const homeGk = await page.locator('[data-role="GK"].home').first().evaluate((el) => getComputedStyle(el).left);
  const awayGk = await page.locator('[data-role="GK"].away').first().evaluate((el) => getComputedStyle(el).left);
  expect(parseFloat(homeGk)).toBeLessThan(80);
  expect(parseFloat(awayGk)).toBeGreaterThan(760);
  await expect(page.locator(".field")).toContainText("自陣ゴール");
  await expect(page.locator(".field")).toContainText("相手ゴール");
});

test("spell tier uses the carrier's own signature spell card name", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /シュート/ }).click();
  // 博麗神社の MF 早苗が保持者。固有スペル「奇跡のスルーパス」が技名に、究極は「・真」付きで出る。
  await expect(page.locator('[data-action="resolve"][data-option="spell"]')).toContainText("奇跡のスルーパス");
  await expect(page.locator('[data-action="resolve"][data-option="ultimate"]')).toContainText("奇跡のスルーパス・真");
  // 通常段は固有スペル名を使わない。
  await expect(page.locator('[data-action="resolve"][data-option="normal"]')).toContainText("通常シュート");
});

test("result panel shows character dialogue", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceResult("home"));
  await expect(page.locator(".result-dialogue")).toBeVisible();
  await expect(page.locator(".result-dialogue")).toContainText("よし、異変解決に一歩前進ね");
  await expect(page.locator('.result-dialogue img[src="./assets/portraits/reimu.png"]')).toBeVisible();
});

test("game opens directly from file URL", async ({ page }) => {
  await page.goto(FILE_URL);
  await expect(page.getByRole("heading", { name: "東方スペルサッカー" })).toBeVisible();
  await expect(page.locator('img[src="./assets/team_cg/hakurei.png"]').first()).toBeVisible();
});

test("favicon is provided by the app", async ({ page }) => {
  await page.goto(HTTP_URL);
  const response = await page.request.get(`${HTTP_URL}assets/favicon.svg`);
  expect(response.ok()).toBe(true);
});

test("gallery shows generated CG collections", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "ギャラリー" }).first().click();
  await expect(page.getByRole("heading", { name: "ギャラリー" })).toBeVisible();
  await expect(page.locator(".team-gallery figure")).toHaveCount(8);
  await expect(page.locator(".portrait-gallery figure")).toHaveCount(88);
  await expect(page.locator(".cutin-gallery figure")).toHaveCount(88);
  await expect(page.locator('.cutin-gallery img[src="./assets/cutins/reimu.png"]')).toBeVisible();
});

test("help screen explains spirit power", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "遊び方" }).click();
  await expect(page.getByRole("heading", { name: "遊び方" })).toBeVisible();
  await expect(page.locator(".help-screen")).toContainText("霊力");
  await expect(page.locator(".help-screen")).toContainText("コマンドRPG");
});

test("campaign clear stores difficulty reward and applies spirit bonus", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceCampaignClear("hard"));
  await expect(page.locator(".reward-message")).toContainText("HARD報酬");
  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem("touhouSpellFutsalSaveV1")));
  expect(saved.difficultyClears.hard).toBe(true);

  await page.getByRole("button", { name: "チーム選択へ戻る" }).click();
  await expect(page.locator(".progress-summary")).toContainText("HARD制覇");
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await expect(page.locator(".log-entry").first()).toContainText("キックオフ");
  await expect(page.locator(".log")).toContainText("初期霊力+12");
});

test("each team has 11 players in 4-4-2 formation", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await expect(page.locator(".player-token")).toHaveCount(22);
  await expect(page.locator(".player-token.home")).toHaveCount(11);
  await expect(page.locator(".player-token.away")).toHaveCount(11);
  await expect(page.locator('.player-token[data-role="GK"].home')).toHaveCount(1);
  await expect(page.locator('.player-token[data-role="DF"].home')).toHaveCount(4);
  await expect(page.locator('.player-token[data-role="MF"].home')).toHaveCount(4);
  await expect(page.locator('.player-token[data-role="FW"].home')).toHaveCount(2);
});

test("encounter visualization shows carrier aura and threat indicators", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await expect(page.locator(".player-token.carrier")).toBeVisible();
  await expect(page.locator(".encounter-badge")).toBeAttached();
});

test("vs screen appears when battle starts", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await expect(page.locator(".vs-screen")).toBeVisible();
});

test("judge stamp shows for successful shot", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => {
    window.__touhouSpellFutsalDebug.forceJudge("goal");
  });
  await expect(page.locator(".judge-stamp[data-kind='goal']")).toBeVisible();
});

test("keyboard arrow keys trigger commands", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.keyboard.press("ArrowUp");
  await expect(page.locator(".battle-card")).toBeVisible();
});

test("pass picker opens with candidate badges", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => {
    window.__touhouSpellFutsalDebug.openPassPicker();
  });
  await expect(page.locator(".pass-target-badge").first()).toBeVisible();
});

test("mid-match save and resume button appears", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  // wait for turn to settle
  await page.evaluate(() => {
    window.__touhouSpellFutsalDebug.saveCurrentMatch();
  });
  await page.reload();
  await expect(page.getByRole("button", { name: /試合を再開/ })).toBeVisible();
});

test("animation speed selection is saved", async ({ page }) => {
  await page.goto(HTTP_URL);
  // 「高速」はチーム説明文 (高速連携型) とも部分一致するため exact 指定。
  await page.getByRole("button", { name: "高速", exact: true }).click();
  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem("touhouSpellFutsalSaveV1")));
  expect(saved.animSpeed).toBe("fast");
  await expect(page.getByRole("button", { name: "高速", exact: true })).toHaveClass(/selected-mode/);
});

test("story mode locks home to Hakurei and the enemy slot away from Hakurei", async ({ page }) => {
  await page.goto(HTTP_URL);
  // 既定はストーリーモード。自チーム枠は博麗以外 (7) が、相手チーム枠は博麗 (1) がロックされる。
  await expect(page.locator(".campaign-note")).toContainText("博麗神社専用");
  await expect(page.locator(".team-button.campaign-locked")).toHaveCount(8);
  // フリー対戦に切替えるとロックは外れる。
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await expect(page.locator(".team-button.campaign-locked")).toHaveCount(0);
});

test("spell cut-in shows the character spell flavor text", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  // 早苗の固有スペル名とフレーバー (spellText) がカットインに出る。
  await expect(page.locator(".cutin .spell-name")).toContainText("奇跡のスルーパス");
  await expect(page.locator(".cutin .spell-flavor")).toBeVisible();
});

test("spell cut-in plays a 2-frame delay sprite animation", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  // タメ(frame0) から 放出(frame1) へディレイ式にめくれることを確認。
  await expect(page.locator('.cutin img[data-frame="0"]')).toBeVisible();
  await expect(page.locator('.cutin img[data-frame="1"]')).toBeVisible({ timeout: 2000 });
});

test("normal action shows a generic Captain-Tsubasa-style action cut-in", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  // 通常ドリブルは汎用アクションスプライト(突破 or 被タックル)の大型カットインを前面表示。
  await expect(page.locator(".cutin.action-cutin img")).toBeVisible();
  await expect(page.locator(".cutin.action-cutin img")).toHaveAttribute("src", /\/assets\/anim\/(dribble|tackle)_\d\.png$/);
});

test("spell shot offers the GK a spell-save counter option", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceGkChoice(true));
  // 必殺シュートには GK 固有スペルでの「スペルセーブ」第4択が出る。
  await expect(page.locator(".gk-actions .gk-spellsave")).toBeVisible();
  await expect(page.locator(".gk-card")).toContainText("必殺シュート迫る");
  // 選ぶと必殺 vs 必殺の鍔迫り合いクラッシュ演出 (CLASH ゲージ) が出る。
  await page.locator('[data-action="gk-choice"][data-option="spellsave"]').click();
  await expect(page.locator(".crash-scene .crash-banner")).toContainText("CLASH");
  await expect(page.locator(".crash-gauge")).toBeVisible();
  await expect(page.locator(".action-scene")).toContainText(/GK値|攻撃値/);
});

test("normal shot does not show the spell-save option", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceGkChoice(false));
  await expect(page.locator(".gk-card")).toBeVisible();
  await expect(page.locator(".gk-actions .gk-spellsave")).toHaveCount(0);
});

test("low spirit power applies a fatigue penalty (stamina drama)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  // 霊力満タンは補正0、25%未満で-14。
  const penalties = await page.evaluate(() => {
    const id = window.__touhouSpellFutsalDebug;
    const carrierId = "sanae";
    return { full: id.setGutsRatio(carrierId, 1.0), low: id.setGutsRatio(carrierId, 0.1) };
  });
  expect(penalties.full).toBe(0);
  expect(penalties.low).toBe(14);
});

test("position reset stays consistent even if formation changed mid-match", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  // 試合開始(4-4-2)後にフォメを 3-5-2 へ変えても、リセットは開始時スロットを保つ(GKがFW位置へ等の入替なし)。
  const ok = await page.evaluate(() => window.__touhouSpellFutsalDebug.resetPositionsAfterFormationChange("3-5-2"));
  expect(ok).toBe(true);
});

test("progress reset keeps the game playable (no playerXp crash)", async ({ page }) => {
  await page.goto(HTTP_URL);
  // 進行リセット後すぐフリー対戦を開始してもクラッシュしないこと (formation/tactic/playerXp 脱落バグ回帰)。
  page.on("pageerror", (err) => { throw err; });
  await page.getByRole("button", { name: "進行リセット" }).click();
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await expect(page.locator(".field")).toBeVisible();
  await expect(page.locator(".player-token")).toHaveCount(22);
});
