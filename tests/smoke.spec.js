const { test, expect } = require("@playwright/test");
const path = require("path");

// channel / webServer は playwright.config.js が管理 (ローカル=Edge / CI=chromium)。

const HTTP_URL = "http://127.0.0.1:8787/";
const FILE_URL = `file:///${path.resolve(__dirname, "../index.html").replace(/\\/g, "/")}`;

// 全 test の前に story VN を skip (test 動作向け)
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = true; });
});

// フリー対戦の自チームは「ストーリーで撃破して解放」ゲートが掛かるため、
// 任意チームを使うテストは事前に全解放しておく。
const ALL_TEAM_IDS = ["hakurei", "kouma", "youkai_mountain", "eientei", "chireiden", "myouren", "shinreibyo", "rebel_beast"];
const unlockAllTeams = (page) => page.addInitScript((ids) => {
  window.localStorage.setItem("touhouSpellFutsalSaveV1", JSON.stringify({ unlockedTeams: ids }));
}, ALL_TEAM_IDS);

test("campaign match starts and resolves a command battle", async ({ page }) => {
  await page.goto(HTTP_URL);
  await expect(page.getByRole("heading", { name: "東方スペルサッカー" })).toBeVisible();
  await expect(page.locator('img[src="./assets/team_cg/hakurei.png"]').first()).toBeVisible();

  await page.getByRole("button", { name: "異変開始" }).click();
  // キックオフ/操作中は盤面(ナビ可能)を表示 (CGショーケースはアクション時のみ)。
  await expect(page.locator(".match-stage.stage-pitch")).toBeVisible();
  await expect(page.locator(".ct3-timer")).toContainText("1ST");
  await expect(page.locator(".ct3-panel")).toBeVisible();

  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await expect(page.locator(".battle-card")).toBeVisible();
  await expect(page.locator(".action-scene")).toContainText("COMMAND / ドリブル突破");
  await expect(page.locator('.battle-card img[src="./assets/portraits/sanae.png"]')).toBeVisible();
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  await expect(page.locator(".battle-card")).toHaveCount(0);
  // 行動は多段演出(仕掛け→守備→合否)。 合否beatまで送ると 攻撃値/守備値 が出る。
  await page.evaluate(() => window.__touhouSpellFutsalDrainSeq({ untilResult: true }));
  await expect(page.locator(".action-scene")).toContainText(/攻撃値|守備値/);
  // ログは原作CT3に無いので補助ドロワー(既定で畳む)へ。 開いて確認。
  await page.locator('.mt-btn[data-action="toggleDrawer"]').click();
  await expect(page.locator(".log-entry").first()).toBeVisible();
});

test("all team portraits can appear in battle", async ({ page }) => {
  await unlockAllTeams(page);
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
    await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
    await expect(page.locator(`.battle-card img[src="./assets/portraits/${item.portrait}"]`).first()).toBeVisible();
  }
});

test("spell command shows dedicated cut-in art", async ({ page }) => {
  await unlockAllTeams(page);
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.locator('[data-select="home"][data-team="youkai_mountain"]').click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  // カットインは {id}.png(タメ) と {id}_b.png(放出) を交互にめくるので両フレームを許容。
  await expect(page.locator(".cutin img")).toBeVisible();
  await expect(page.locator(".cutin img")).toHaveAttribute("src", /\/assets\/cutins\/aya(_b)?\.png$/);
});

test("non-leader character also shows dedicated cut-in art", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
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

test("command UI uses a Captain-Tsubasa-3-like vertical command list", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await expect(page.locator(".command-title")).toContainText("コマンド");
  await expect(page.locator(".cmd-row").filter({ hasText: "ドリブル" })).toBeVisible();
  await expect(page.locator(".cmd-row").filter({ hasText: "パス" })).toBeVisible();
  await expect(page.locator(".cmd-row").filter({ hasText: "シュート" })).toBeVisible();
  await expect(page.locator(".cmd-row").filter({ hasText: "連携スペル" })).toBeVisible();
});

test("sprite VN action scene explains the current play", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await expect(page.locator(".action-scene")).toContainText("キックオフ");
  await page.getByRole("button", { name: /シュート/ }).click();
  await expect(page.locator(".action-scene")).toContainText("COMMAND / シュート勝負");
  // 保持者は博麗神社の MF 早苗。スペル段はアクションに一致した技名 (シュート系) を表示する。
  await expect(page.locator('[data-action="resolve"][data-option="spell"]')).toContainText("シュート");
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  // シュートは多段演出(発射→着弾→GK→合否)。 合否beatまで送ると GK値/攻撃値 が出る。
  await page.evaluate(() => window.__touhouSpellFutsalDrainSeq({ untilResult: true }));
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

test("spell move name matches the action (shoot stays a shoot move)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.getByRole("button", { name: /シュート/ }).click();
  // シュートのスペル技名は必ず「シュート」を含み (アクション一致)、 究極は「・真」付き。
  await expect(page.locator('[data-action="resolve"][data-option="spell"]')).toContainText("シュート");
  await expect(page.locator('[data-action="resolve"][data-option="ultimate"]')).toContainText("・真");
  await expect(page.locator('[data-action="resolve"][data-option="normal"]')).toContainText("通常シュート");
});

test("result panel shows winner and loser dialogues", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceResult("home"));
  // 勝者の win と敗者の lose を併記 (lose 8本が到達不能だった旧分岐の回帰防止)
  await expect(page.locator('.result-dialogue[data-result="win"]')).toContainText("よし、異変解決に一歩前進ね");
  await expect(page.locator('.result-dialogue[data-result="lose"]')).toContainText("紅魔館を本気にさせたわね");
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
  // 位置把握は下段フィールドマップ(レーダー)。 上段は保持者のドリブルCG。
  await expect(page.locator(".ct3-map .radar")).toBeVisible();
  await expect(page.locator(".player-token.carrier")).toBeAttached();
  await expect(page.locator(".encounter-badge")).toBeAttached();
});

test("vs screen appears when battle starts", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
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
  // 原作CT3: ↑ドリブル(移動)/←パス/→シュート/↓ワンツー。 →シュートはGK戦バトルカードを開く。
  await page.keyboard.press("ArrowRight");
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

// 回帰防止: 行動後(結果シーンが残った状態)でもパスピッカーの badge が見えて「クリックで」通ること。
// 旧バグ: ピッカーが .field 内→stage-cg で visibility:hidden / badge が scale パルスでクリック不安定。
test("pass target badge is clickable after a prior action (not just by keyboard)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  // 直前の行動の結果シーン (phase=result) を残してから開く = 実プレイの状況
  await page.evaluate(() => window.__touhouSpellFutsalDebug.showAction("dribble", "success"));
  await page.evaluate(() => window.__touhouSpellFutsalDebug.openPassPicker());
  const badge = page.locator(".pass-target-badge").first();
  await expect(badge).toBeVisible();
  await badge.click(); // force なしで通る = 安定してクリックできる
  // パスは VS 画面 or バトルカードへ進む (ピッカーは閉じる)
  await expect(page.locator(".pass-picker-overlay")).toHaveCount(0);
  await expect(page.locator(".vs-screen, .battle-card").first()).toBeVisible();
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
  await expect(page.locator(".campaign-note").first()).toContainText("博麗神社専用");
  await expect(page.locator(".team-button.campaign-locked")).toHaveCount(8);
  // フリー対戦では相手枠ロックは無し。自チームは解放ゲート (初期=博麗のみ) で7チームがロックのまま。
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await expect(page.locator(".team-button.campaign-locked")).toHaveCount(7);
  await expect(page.locator('[data-select="away"][data-team="hakurei"]')).toBeVisible();
});

test("spell cut-in shows the action-matched move name (dribble move)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  // ドリブルのスペル技名はドリブル系の技名 (アクション一致) を出す。
  await expect(page.locator(".cutin .spell-name")).toContainText("突破");
});

test("spell cut-in plays a 2-frame delay sprite animation", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await page.locator('[data-action="resolve"][data-option="spell"]').click();
  // タメ(frame0) から 放出(frame1) へディレイ式にめくれることを確認。
  await expect(page.locator('.cutin img[data-frame="0"]')).toBeVisible();
  await expect(page.locator('.cutin img[data-frame="1"]')).toBeVisible({ timeout: 2000 });
});

test("normal action shows the CG showcase on top, not a full-screen cut-in overlay", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  await page.evaluate(() => window.__touhouSpellFutsalDrainSeq({ untilResult: true }));
  // 通常アクションは全画面カットインoverlayを出さない (見せ場限定)。結果は上段CGショーケース(.field-cg)+下段実況で見せる。
  await expect(page.locator(".cutin.action-cutin")).toHaveCount(0);
  await expect(page.locator(".field-cg")).toBeVisible();
  await expect(page.locator(".action-scene")).toContainText(/攻撃値|守備値/);
});

test("ball carrier dribbles across the pitch via W key and move bar", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  // 盤面ドリブル移動パッド(自由8方向)が出ている。
  await expect(page.locator(".move-pad")).toBeVisible();
  // W で保持者(ボール)が攻撃方向(home=右)へ前進する。
  const beforeX = await page.evaluate(() => parseFloat(document.querySelector(".ball").style.left));
  await page.keyboard.press("w");
  const afterX = await page.evaluate(() => parseFloat(document.querySelector(".ball").style.left));
  expect(afterX).toBeGreaterThan(beforeX);
});

test("each action pauses for message-advance (paced play-by-play)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  // 行動後はメッセージ送り待ち: 「▶ 次へ」が出て、 送るまで展開が止まる。
  await expect(page.locator(".advance-btn")).toBeVisible();
  // 多段演出の beat 1 (仕掛け) が表示され、送ると beat 2 (守備対応) へ実際に進む。
  // (旧アサーションは常在の .match-stage を見ていて送り動作を検証していなかった)
  await expect(page.locator(".action-scene")).toContainText("ボールを運ぶ");
  await page.locator(".advance-btn").click();
  await expect(page.locator(".action-scene")).toContainText("間合いを詰める");
});

test("auto-advance toggle is saved", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.locator('[data-action="toggleAuto"]').first().click();
  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem("touhouSpellFutsalSaveV1")));
  expect(saved.autoAdvance).toBe(true);
});

test("spell shot offers the GK a spell-save counter option", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceGkChoice(true));
  // 必殺シュートには GK 固有スペルでの「スペルセーブ」第4択が出る。
  await expect(page.locator(".gk-actions .gk-spellsave")).toBeVisible();
  await expect(page.locator(".gk-card")).toContainText("必殺シュート迫る");
  // 選ぶと GK行動→必殺 vs 必殺の鍔迫り合いクラッシュ beat へ。 送ってクラッシュまで進める。
  await page.locator('[data-action="gk-choice"][data-option="spellsave"]').click();
  await page.evaluate(() => window.__touhouSpellFutsalDrainSeq({ untilCrash: true }));
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

test("seeded RNG is deterministic (balance verification foundation)", async ({ page }) => {
  await page.goto(HTTP_URL);
  const r = await page.evaluate(() => {
    const d = window.__touhouSpellFutsalDebug;
    const a = JSON.stringify(d.rngProbe(7, 8));
    const b = JSON.stringify(d.rngProbe(7, 8));
    const c = JSON.stringify(d.rngProbe(8, 8));
    return { sameSeedMatches: a === b, differentSeedDiffers: a !== c };
  });
  expect(r.sameSeedMatches).toBe(true);
  expect(r.differentSeedDiffers).toBe(true);
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
  await expect(page.locator(".match-stage.stage-pitch")).toBeVisible();
  await expect(page.locator(".player-token")).toHaveCount(22);
});

test("high ball (cross) enables an aerial shot and shows the indicator", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  // 高い球をセット → 空中シュートUI (バッジ + コマンド表記) が出る。
  const air = await page.evaluate(() => window.__touhouSpellFutsalDebug.setHighBall(true));
  expect(air).toBe(true);
  await expect(page.locator(".air-badge")).toBeVisible();
  await expect(page.locator(".cmd-row.aerial")).toContainText("空中シュート");
  // 距離別に空中シュート種別が割り当たる (近=ヘディング/オーバーヘッド, 遠=ボレー/ダイビングヘッド)。
  const kinds = await page.evaluate(() => [8, 20, 40].map((d) => window.__touhouSpellFutsalDebug.aerialKindAt(d)));
  const valid = new Set(["header", "overhead", "volley", "diving_header"]);
  for (const k of kinds) expect(valid.has(k)).toBe(true);
});

test("dribbling grounds a high ball (no stale aerial state)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.setHighBall(true));
  await expect(page.locator(".air-badge")).toBeVisible();
  // W で運ぶと球は地上に戻り、 空中シュートUIが消える。
  await page.keyboard.press("w");
  await expect(page.locator(".air-badge")).toHaveCount(0);
});

// 検証ハーネス土台: DOM由来でない実進行スナップショット (validate_playthrough が turn を時計と誤読していた件の根治)。
test("debug.matchSnapshot exposes real progress signals", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  const s = await page.evaluate(() => window.__touhouSpellFutsalDebug.matchSnapshot());
  expect(typeof s.turn).toBe("number");
  expect(typeof s.scoreTotal).toBe("number");
  expect(typeof s.shots).toBe("number");
  expect(["home", "away"]).toContain(s.possession);
});

// 回帰防止(最重要): 実シュートが apply() 経路 (match.score[side] += 1, goal beat) を通って得点が入ること。
// forceJudge はスタンプ描画のみでスコア加算経路をバイパスするため、本物の得点フロー死を検出できなかった。
test("a real shoot resolves through apply() and increments the score", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  // ゴール至近 + 圧倒的攻撃 + セーブほぼ不能の GK を仕込み、 決定的シードで必ずゴールにする。
  const before = await page.evaluate(() => {
    const D = window.__touhouSpellFutsalDebug;
    const m = D.getState().match;
    const all = [...m.home.players, ...m.away.players];
    const c = all.find((p) => p.id === m.carrierId) || m.home.players[1];
    m.possession = "home"; m.carrierId = c.id;
    c.x = 90; c.stats.shoot = 220; c.guts = 220;
    const gk = m.away.players.find((p) => p.role === "GK");
    gk.stats.keep = 1; gk.stats.block = 1; gk.guts = 5;
    D.getState().battle = null;
    D.seedRng(20260607);
    D.startBattle("shoot");
    return D.matchSnapshot().scoreTotal;
  });
  await page.locator('[data-action="resolve"][data-option="normal"]').click();
  await page.evaluate(() => window.__touhouSpellFutsalDrainSeq({ untilResult: true }));
  const after = await page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.matchSnapshot();
    window.__touhouSpellFutsalDebug.clearRng();
    return s.scoreTotal;
  });
  expect(after).toBe(before + 1);
});

// 回帰防止: VS演出をクリックでスキップでき、 下層の決着ボタン(tier)へ誤爆しないこと。
// 旧バグ: .vs-screen が pointer-events:none で、 スキップのつもりのクリックが下層 tier ボタンを誤爆=「勝手に決まる」。
test("clicking the VS overlay skips it without prematurely resolving the tier", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("dribble"));
  await expect(page.locator(".vs-screen")).toBeVisible();
  await page.locator(".vs-screen").click({ force: true, position: { x: 640, y: 410 } });
  await expect(page.locator(".vs-screen")).toHaveCount(0);
  // tier は勝手に確定しない = バトルカードが残る (pointer-events:none 退行なら下層 tier を誤爆し resolve される)
  await expect(page.locator(".battle-card")).toBeVisible();
});

// 回帰防止: モーダル(パスピッカー等)中に g/h/m グローバルキーで画面離脱しないこと。
test("global hotkeys do not fire during a modal (pass picker)", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.openPassPicker());
  await expect(page.locator(".pass-target-badge").first()).toBeVisible();
  await page.keyboard.press("g");
  await expect(page.locator(".pass-target-badge").first()).toBeVisible();
  const screen = await page.evaluate(() => window.__touhouSpellFutsalDebug.getState().screen);
  expect(screen).toBe("match");
});

// 回帰防止: コマンドメニューの方向クリックが入れ子二重発火ガードを通っても正しく選択され閉じること。
test("command menu direction click selects through the nested-click guard", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.keyboard.press(" "); // Bボタン = コマンドメニューを開く
  await expect(page.locator(".command-menu-overlay")).toBeVisible();
  await page.locator('.cc-btn[data-dir="left"]').click(); // 左=パス
  await expect(page.locator(".command-menu-overlay")).toHaveCount(0);
});

// 回帰防止: 試合で稼いだ playerXp(成長)が、 設定を一切触らなくても試合終了で永続化されること。
// 旧バグ: gainXp/bumpPlayerStat に saveProgress が無く、 設定を触らず閉じると育成が巻き戻っていた。
test("player XP earned in a match is persisted at match end", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.autoWinMatch());
  const xpTotal = await page.evaluate(() => {
    const raw = localStorage.getItem("touhouSpellFutsalSaveV1");
    const px = (raw && JSON.parse(raw).playerXp) || {};
    return Object.values(px).reduce((s, x) => s + ((x && x.xp) || 0), 0);
  });
  expect(xpTotal).toBeGreaterThan(0);
});

// 回帰防止: 制覇カウントが同一最終戦の再勝利(retry相当)で水増しされないこと(対戦indexごと一度きり)。
test("campaign clear count is idempotent across a repeated final win", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceCampaignClear("normal"));
  const before = await page.evaluate(() => window.__touhouSpellFutsalDebug.getState().progress.campaignClears);
  const after = await page.evaluate(() => {
    window.__touhouSpellFutsalDebug.autoWinMatch(); // 同一campaign/最終戦を再び勝利確定 (retry相当)
    return window.__touhouSpellFutsalDebug.getState().progress.campaignClears;
  });
  expect(before).toBeGreaterThan(0);
  expect(after).toBe(before);
});

// 主要ゲームループの完走保証: 開幕→7連勝→エンディング→setup復帰 を通しで踏み、
// 進行不能・クラッシュ・campaign 進捗の取りこぼしが無いこと (個別画面テストでは拾えない遷移バグの面検知)。
test("campaign full loop: seven straight wins reach the ending and return to setup", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(String(e)));
  await page.goto(HTTP_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "異変開始" }).click();
  for (let i = 0; i < 7; i += 1) {
    await expect(page.locator(".match-stage")).toBeVisible();
    await page.evaluate(() => window.__touhouSpellFutsalDebug.autoWinMatch());
    await expect(page.locator(".result-panel h2")).toContainText("WIN");
    if (i < 6) {
      await page.locator('[data-action="nextCampaign"]').click();
    } else {
      await expect(page.locator(".ending-cta-text")).toContainText("制覇");
      await page.locator('[data-action="viewEnding"]').click();
    }
  }
  // skipStory フラグで ED VN は即時完了 → setup へ戻る
  await expect(page.locator(".setup")).toBeVisible();
  const prog = await page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.getState();
    return { clears: s.progress.campaignClears, wins: s.campaign ? s.campaign.wins : -1, unlocked: s.progress.unlockedTeams.length };
  });
  expect(prog.clears).toBeGreaterThanOrEqual(1);
  expect(prog.wins).toBe(7);
  expect(prog.unlocked).toBeGreaterThanOrEqual(7); // 7 敗北チームすべて解放
  expect(pageErrors).toEqual([]);
});

// 回帰防止: 勝利後 VN がリザルトパネル(z65)に覆われてクリックで進めなくなる詰みの再発防止。
// キーボード無しのプレイヤーは VN を一切送れなくなる (キー処理は VN 優先でも表示が最前面でないと無意味)。
test("victory VN stays clickable above the result overlay", async ({ page }) => {
  await page.addInitScript(() => { window.__touhouSpellFutsalSkipStory = false; });
  await page.goto(HTTP_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => { window.__touhouSpellFutsalSkipStory = true; });
  await page.getByRole("button", { name: "異変開始" }).click();
  await expect(page.locator(".match-stage")).toBeVisible();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.autoWinMatch());
  // 勝利後 VN は skip せず実表示させる
  await page.evaluate(() => { window.__touhouSpellFutsalSkipStory = false; });
  await page.locator('[data-action="nextCampaign"]').click();
  await expect(page.locator(".vn-modal")).toBeVisible();
  const before = await page.evaluate(() => window.__touhouSpellFutsalDebug.getState().vnScene.index);
  await page.locator(".vn-box-large").click({ timeout: 2000 }); // 覆われていると actionability で落ちる
  const after = await page.evaluate(() => window.__touhouSpellFutsalDebug.getState().vnScene.index);
  expect(after).toBe(before + 1);
});

// 回帰防止: 相手ボール保持のままセーブ→再開すると敵ターンが誰からも起動されず詰んでいた softlock。
test("resuming an away-possession save restarts the enemy turn", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.getState();
    const fw = s.match.away.players.find((p) => p.role === "FW") || s.match.away.players[0];
    s.match.possession = "away";
    s.match.carrierId = fw.id;
    window.__touhouSpellFutsalDebug.saveCurrentMatch();
  });
  await page.reload();
  await page.locator('[data-action="resumeMatch"]').click();
  // 敵ターンが実際に動き出す (バトル/守備介入/多段演出/送り待ち のいずれかが数秒以内に立つ)
  await expect.poll(() => page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.getState();
    return Boolean(s.battle || s.interrupt || s.playSeq || s.advance || s.gkChoice || s.match.possession === "home");
  }), { timeout: 8000 }).toBe(true);
});

// 回帰防止: 敵手番のバトル窓で Esc/数字キーが効いてしまい、Esc 1発で away の1手が消滅して
// 試合が永久停止 (または 1 連打で敵スペルを normal に乗っ取り) していた問題。
test("enemy battle window ignores player keys and still resolves", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.getState();
    const fw = s.match.away.players.find((p) => p.role === "FW") || s.match.away.players[0];
    s.match.possession = "away";
    s.match.carrierId = fw.id;
    window.__touhouSpellFutsalDebug.saveCurrentMatch();
  });
  await page.reload();
  await page.locator('[data-action="resumeMatch"]').click();
  // 敵手番の進行中に Esc / 1 を乱打しても、手番は消滅せず試合が前に進み続ける
  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press("Escape");
    await page.keyboard.press("1");
    await page.waitForTimeout(250);
  }
  await expect.poll(() => page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.getState();
    return Boolean(s.battle || s.interrupt || s.playSeq || s.advance || s.gkChoice || s.match.possession === "home");
  }), { timeout: 8000 }).toBe(true);
});

// 回帰防止: 壊れた途中セーブがあるとタイトル(setup)の初回 render が TypeError で白画面になり、
// 「破棄」ボタンにも到達できなかった問題 (loadMatch の検疫 + schemaVersion)。
test("corrupted mid-match save does not white-screen the title", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("touhouSpellSoccerMatchV1", JSON.stringify({ match: { finished: false } }));
  });
  await page.reload();
  await expect(page.getByRole("heading", { name: "東方スペルサッカー" })).toBeVisible();
  // 壊れセーブは検疫で自動破棄され、resume バナーは出ない
  await expect(page.locator(".resume-banner")).toHaveCount(0);
  const cleaned = await page.evaluate(() => localStorage.getItem("touhouSpellSoccerMatchV1"));
  expect(cleaned).toBeNull();
});

// チーム解放の実ゲート: 未解放チームはフリー対戦の自チームに選べず、解放済みなら選べる。
test("free play locks home teams until they are unlocked", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "フリー対戦" }).click();
  // 初期解放は博麗神社のみ → 他チームの自チームボタンは disabled
  await expect(page.locator('[data-select="home"][data-team="hakurei"]')).toBeVisible();
  await expect(page.locator('.team-select-grid > div').first().locator('button.campaign-locked')).toHaveCount(7);
  // 相手チームは自由 (スパーリング相手)
  await expect(page.locator('[data-select="away"][data-team="kouma"]')).toBeVisible();
});

// 回帰防止: 因縁VNのキー未ソートで 16/32 ペアが永久に発火しなかった問題。
// 正規化後はどちらの語順でも引けること + 会話データに未知ID参照が無いこと。
test("rivalry dialogues resolve regardless of id order and VN data is consistent", async ({ page }) => {
  await page.goto(HTTP_URL);
  const probe = await page.evaluate(() => ({
    // 旧バグで死んでいた代表ペア (データ上 "marisa|flandre" と逆順で書かれていた決勝級の因縁)
    deadPair: window.__touhouSpellFutsalDebug.rivalryFor("flandre", "marisa"),
    reversed: window.__touhouSpellFutsalDebug.rivalryFor("marisa", "flandre"),
    audit: window.__touhouSpellFutsalDebug.vnDataAudit(),
  }));
  expect(probe.deadPair).toBe(true);
  expect(probe.reversed).toBe(true);
  expect(probe.audit).toEqual([]);
});

// 回帰防止: ワンツーのバトルモーダルが title/tierLabel/SPELL_MOVE_WORD の oneTwo 欠落で「undefined」表示だった問題。
test("one-two battle modal has no undefined labels", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "フリー対戦" }).click();
  await page.getByRole("button", { name: "試合開始" }).click();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.startBattle("oneTwo"));
  await expect(page.locator(".battle-card .versus")).toContainText("ワンツー勝負");
  const text = await page.locator(".battle-card").innerText();
  expect(text).not.toContain("undefined");
});

// 敗北ルートの導線: campaign で負けても進行を保持したまま「再戦する」で同じ相手に再挑戦できること。
test("campaign defeat offers a retry that keeps campaign progress", async ({ page }) => {
  await page.goto(HTTP_URL);
  await page.getByRole("button", { name: "異変開始" }).click();
  await expect(page.locator(".match-stage")).toBeVisible();
  await page.evaluate(() => window.__touhouSpellFutsalDebug.forceResult("away"));
  await expect(page.locator(".result-panel h2")).toContainText("WIN"); // 相手の WIN 表示
  // 敗北時は「次の対戦へ」は出ず、「再戦する」が出る
  await expect(page.locator('[data-action="nextCampaign"]')).toHaveCount(0);
  await page.locator('[data-action="retry"]').click();
  await expect(page.locator(".match-stage")).toBeVisible();
  const after = await page.evaluate(() => {
    const s = window.__touhouSpellFutsalDebug.getState();
    return { mode: s.mode, index: s.campaign ? s.campaign.index : -1, away: s.match.away.id };
  });
  expect(after.mode).toBe("campaign");
  expect(after.index).toBe(0); // 進捗は据え置きで同じ相手に再挑戦
  expect(after.away).toBe("kouma");
});
