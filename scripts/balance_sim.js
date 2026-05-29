// バランス検証 Monte Carlo シム。 game.js のシュート解決式をミラーし、 現状 vs 提案 を比較。
//   node scripts/balance_sim.js
// 目標(近距離・ace vs 強GK・AI加重): 通常~30% / スペル~48% / 究極~62%、 必殺 vs スペルセーブ ~35%(クラッシュ拮抗)
// 解析ツール。 確定したら proposed の値を game.js に反映する。

const SETS = {
  // current = game.js に適用済みの値 (propC2)。 v6 の旧値は git 履歴参照。
  current: {
    atk: { normal: 6, spell: 34, ultimate: 52 },
    gkDefMod: { catch: 1.06, punch: 1.16, rush: 0.82, spellsave: 1.34 },
    gkSpellSaveBonus: 7, gkUseSpellBonus: 4, blockCoef: 0.19,
    distStart: 20, distCoef: 0.60, variance: 28,
  },
  propC2: {
    atk: { normal: 6, spell: 34, ultimate: 52 },
    gkDefMod: { catch: 1.06, punch: 1.16, rush: 0.82, spellsave: 1.34 },
    gkSpellSaveBonus: 7, gkUseSpellBonus: 4, blockCoef: 0.19,
    distStart: 20, distCoef: 0.60, variance: 28,
  },
  propC3: {
    atk: { normal: 8, spell: 34, ultimate: 52 },
    gkDefMod: { catch: 1.05, punch: 1.15, rush: 0.82, spellsave: 1.32 },
    gkSpellSaveBonus: 6, gkUseSpellBonus: 4, blockCoef: 0.18,
    distStart: 22, distCoef: 0.58, variance: 28,
  },
  propC: {
    atk: { normal: 2, spell: 34, ultimate: 52 },
    gkDefMod: { catch: 1.06, punch: 1.16, rush: 0.82, spellsave: 1.38 },
    gkSpellSaveBonus: 9, gkUseSpellBonus: 4, blockCoef: 0.19,
    distStart: 20, distCoef: 0.60, variance: 28,
  },
};

function rint(n) { return Math.floor(Math.random() * n); }

function goalRate(S, gkOption, cfg, { shoot, keep, block, goalDist, tier, fatigue = 0, diffMod = 0 }, N = 150000) {
  const useSpell = tier !== "normal";
  const spellSave = gkOption === "spellsave";
  let goals = 0;
  for (let i = 0; i < N; i++) {
    const opt = gkOption === "ai" ? aiPick(tier) : gkOption;
    const ss = opt === "spellsave";
    const distPen = Math.max(0, goalDist - cfg.distStart) * cfg.distCoef;
    const atk = (shoot + cfg.atk[tier] - distPen - fatigue + diffMod) + rint(cfg.variance);
    const def = (keep * (cfg.gkDefMod[opt] || 1) + block * cfg.blockCoef + (useSpell ? cfg.gkUseSpellBonus : 0) + (ss ? cfg.gkSpellSaveBonus : 0) + diffMod) + rint(cfg.variance);
    if (atk >= def) goals++;
  }
  return goals / N;
}
function aiPick(tier) {
  const isSpell = tier !== "normal";
  if (isSpell && Math.random() < (tier === "ultimate" ? 0.55 : 0.4)) return "spellsave";
  return ["catch", "punch", "rush"][rint(3)];
}
const P = (x) => (x * 100).toFixed(0) + "%";

const ace = { shoot: 88 }, gk = { keep: 86, block: 84 };
const dists = { "近12": 12, "中25": 25, "遠40": 40 };
const tiers = ["normal", "spell", "ultimate"];

console.log("目標(近AI加重): 通常~30 / スペル~48 / 究極~62、 究極vsスペルセーブ~35(クラッシュ)\n");
for (const setName of Object.keys(SETS)) {
  const cfg = SETS[setName];
  const r = (tier, gd, opt = "ai", fat = 0) => P(goalRate(ace.shoot, opt, cfg, { ...ace, ...gk, tier, goalDist: gd, fatigue: fat }));
  console.log(`===== ${setName} =====`);
  console.log(`  AI加重 近: 通常${r("normal", 12)} スペル${r("spell", 12)} 究極${r("ultimate", 12)}` +
    ` | 中: ${r("normal", 25)}/${r("spell", 25)}/${r("ultimate", 25)}` +
    ` | 遠: ${r("normal", 40)}/${r("spell", 40)}/${r("ultimate", 40)}`);
  console.log(`  近 vs spellsave: スペル${r("spell", 12, "spellsave")} 究極${r("ultimate", 12, "spellsave")}` +
    ` | 近 vs catch: 通常${r("normal", 12, "catch")} 究極${r("ultimate", 12, "catch")}` +
    ` | 究極 息切れ: ${r("ultimate", 12, "ai", 14)}`);
}
