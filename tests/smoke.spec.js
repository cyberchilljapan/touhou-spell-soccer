const { test, expect } = require("@playwright/test");
const path = require("path");

test.use({ channel: "msedge" });

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
  await expect(page.locator('.cutin img[src="./assets/cutins/aya.png"]')).toBeVisible();
});

test("non-leader character also shows dedicated cut-in art", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /ドリブル/ }).click();
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  await expect(page.locator('.cutin img[src="./assets/cutins/sanae.png"]')).toBeVisible();
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
  await expect(page.locator('[data-action="resolve"][data-option="spell"]')).toContainText("弾幕シュート");
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

test("shoot action does not reuse pass spell name", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /シュート/ }).click();
  const spellButton = page.locator('[data-action="resolve"][data-option="spell"]');
  await expect(spellButton).toContainText("弾幕シュート");
  await expect(spellButton).not.toContainText("パス");
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
