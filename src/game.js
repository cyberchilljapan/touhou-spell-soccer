const TEAMS = [
  {
    id: "hakurei",
    name: "博麗神社",
    style: "万能型",
    formation: "4-4-2",
    members: [
      p("reimu", "霊夢", "GK", { shoot: 68, pass: 74, dribble: 76, tackle: 70, block: 75, keep: 82, speed: 72, guts: 135 }, "夢想封印セーブ", "結界で軌道をねじ伏せる守護技"),
      p("suika", "萃香", "DF", { shoot: 74, pass: 58, dribble: 62, tackle: 86, block: 88, keep: 58, speed: 54, guts: 145 }, "鬼神チャージ", "守備とこぼれ球に強いパワーブロック"),
      p("daiyousei", "大妖精", "DF", { shoot: 52, pass: 72, dribble: 64, tackle: 76, block: 80, keep: 42, speed: 70, guts: 122 }, "妖精ガード", "DFラインに安定をもたらす補助技"),
      p("rumia", "ルーミア", "DF", { shoot: 64, pass: 52, dribble: 70, tackle: 78, block: 80, keep: 38, speed: 72, guts: 118 }, "宵闇マーキング", "相手の視界を奪う影の守備"),
      p("wriggle", "リグル", "DF", { shoot: 62, pass: 64, dribble: 68, tackle: 82, block: 76, keep: 40, speed: 76, guts: 120 }, "蛍光フォーメーション", "蛍の群れで進路を塞ぐ"),
      p("sanae", "早苗", "MF", { shoot: 70, pass: 84, dribble: 72, tackle: 58, block: 62, keep: 36, speed: 70, guts: 132 }, "奇跡のスルーパス", "次の味方行動に大きな補正を渡すパス"),
      p("youmu", "妖夢", "MF", { shoot: 78, pass: 66, dribble: 86, tackle: 74, block: 64, keep: 26, speed: 84, guts: 124 }, "半霊ダブルタッチ", "接触戦を抜けやすい高速ドリブル"),
      p("kasen", "茨木華扇", "MF", { shoot: 70, pass: 80, dribble: 76, tackle: 78, block: 70, keep: 42, speed: 72, guts: 138 }, "仙人の采配", "攻守万能の中盤司令塔技"),
      p("cirno", "チルノ", "MF", { shoot: 72, pass: 60, dribble: 80, tackle: 70, block: 64, keep: 34, speed: 78, guts: 126 }, "アイシクルフォール", "敵フィールドを凍結させる⑨技"),
      p("marisa", "魔理沙", "FW", { shoot: 90, pass: 68, dribble: 78, tackle: 52, block: 48, keep: 20, speed: 82, guts: 128 }, "マスタースパークシュート", "直線火力でGKを押し切る超威力シュート"),
      p("lily", "リリーホワイト", "FW", { shoot: 78, pass: 60, dribble: 76, tackle: 50, block: 48, keep: 22, speed: 88, guts: 110 }, "春告げシュート", "シーズン到来とともに撃ち抜く快速ボレー"),
    ],
  },
  {
    id: "kouma",
    name: "紅魔館",
    style: "高火力型",
    formation: "4-4-2",
    members: [
      p("patchouli", "パチュリー", "GK", { shoot: 80, pass: 78, dribble: 50, tackle: 48, block: 76, keep: 84, speed: 38, guts: 105 }, "五行ウォール", "属性壁でシュート威力を削るGK技"),
      p("meiling", "美鈴", "DF", { shoot: 62, pass: 62, dribble: 72, tackle: 88, block: 82, keep: 48, speed: 76, guts: 140 }, "彩光タックル", "接触戦の守備値を大きく上げる"),
      p("koakuma", "小悪魔", "DF", { shoot: 60, pass: 76, dribble: 66, tackle: 78, block: 82, keep: 44, speed: 64, guts: 118 }, "魔界補佐", "後方からスペル補助で味方守備を底上げ"),
      p("lunasa", "ルナサ", "DF", { shoot: 64, pass: 78, dribble: 68, tackle: 76, block: 80, keep: 40, speed: 62, guts: 120 }, "メランコリック弦", "重低音で相手の意気を削るDF技"),
      p("tokiko", "朱鷺子", "DF", { shoot: 56, pass: 70, dribble: 64, tackle: 84, block: 78, keep: 38, speed: 66, guts: 122 }, "本能の壁", "本に喰い込ませる予測ブロック"),
      p("sakuya", "咲夜", "MF", { shoot: 72, pass: 88, dribble: 78, tackle: 78, block: 66, keep: 32, speed: 80, guts: 122 }, "時止めインターセプト", "パスカットとショートパスが強い司令塔技"),
      p("merlin", "メルラン", "MF", { shoot: 76, pass: 78, dribble: 70, tackle: 64, block: 60, keep: 40, speed: 72, guts: 122 }, "ホーンアタック", "活発な高音ラッパで前線を駆ける"),
      p("lyrica", "リリカ", "MF", { shoot: 72, pass: 80, dribble: 68, tackle: 62, block: 58, keep: 42, speed: 74, guts: 118 }, "鍵盤の旋律", "鍵盤で繋ぐ可変パス"),
      p("hecatia", "ヘカーティア", "MF", { shoot: 84, pass: 74, dribble: 72, tackle: 70, block: 66, keep: 38, speed: 70, guts: 138 }, "三相の地獄", "地獄の女神らしい多段攻撃"),
      p("remilia", "レミリア", "FW", { shoot: 88, pass: 70, dribble: 82, tackle: 62, block: 56, keep: 26, speed: 84, guts: 130 }, "運命の槍シュート", "低確率で防御補正を無視する決定力"),
      p("flandre", "フラン", "FW", { shoot: 96, pass: 48, dribble: 72, tackle: 66, block: 54, keep: 18, speed: 72, guts: 110 }, "禁忌レーヴァテイン", "燃費は悪いが全技中トップ級の火力"),
    ],
  },
  {
    id: "youkai_mountain",
    name: "妖怪山",
    style: "高速連携型",
    formation: "4-4-2",
    members: [
      p("suwako", "諏訪子", "GK", { shoot: 74, pass: 76, dribble: 82, tackle: 64, block: 70, keep: 86, speed: 74, guts: 128 }, "土着神キャッチ", "低弾道シュートに強い変則セーブ"),
      p("momiji", "椛", "DF", { shoot: 58, pass: 68, dribble: 66, tackle: 86, block: 84, keep: 42, speed: 78, guts: 132 }, "千里眼カット", "相手パスの成功率を落とす守備技"),
      p("hina", "雛", "DF", { shoot: 62, pass: 68, dribble: 64, tackle: 80, block: 84, keep: 40, speed: 70, guts: 128 }, "厄回しスピン", "回転で相手の流れを逸らす守備技"),
      p("shizuha", "静葉", "DF", { shoot: 60, pass: 70, dribble: 62, tackle: 82, block: 80, keep: 38, speed: 68, guts: 124 }, "落葉ブロック", "秋葉で視界と進路を塞ぐ"),
      p("medicine", "メディスン", "DF", { shoot: 64, pass: 60, dribble: 66, tackle: 78, block: 82, keep: 42, speed: 70, guts: 120 }, "毒霧フェンス", "近づく相手の判定を毒で削る"),
      p("aya", "文", "MF", { shoot: 72, pass: 82, dribble: 88, tackle: 62, block: 52, keep: 22, speed: 96, guts: 126 }, "天狗風ドリブル", "距離を一気に詰める最速突破"),
      p("nitori", "にとり", "MF", { shoot: 68, pass: 84, dribble: 74, tackle: 60, block: 64, keep: 30, speed: 70, guts: 118 }, "河童ギミックパス", "ランダム補正の振れ幅が大きいトリックパス"),
      p("kogasa", "多々良小傘", "MF", { shoot: 70, pass: 72, dribble: 80, tackle: 64, block: 60, keep: 32, speed: 74, guts: 120 }, "オドロカシ突破", "驚かせで相手DFの判断を鈍らせる"),
      p("yuuka", "風見幽香", "MF", { shoot: 82, pass: 74, dribble: 78, tackle: 76, block: 70, keep: 36, speed: 70, guts: 142 }, "マスタースパーク散布", "向日葵の畑で前線を制圧"),
      p("kanako", "神奈子", "FW", { shoot: 86, pass: 70, dribble: 66, tackle: 82, block: 80, keep: 50, speed: 58, guts: 150 }, "御柱ロングシュート", "遠距離でも威力が落ちにくい"),
      p("minoriko", "穣子", "FW", { shoot: 80, pass: 64, dribble: 74, tackle: 56, block: 50, keep: 24, speed: 76, guts: 118 }, "豊穣ボレー", "秋の実りで威力を膨らませる"),
    ],
  },
  {
    id: "eientei",
    name: "永遠亭",
    style: "妨害回復型",
    formation: "4-4-2",
    members: [
      p("eirin", "永琳", "GK", { shoot: 64, pass: 88, dribble: 58, tackle: 62, block: 78, keep: 90, speed: 50, guts: 136 }, "月薬リカバー", "味方の霊力を戻す守護者"),
      p("tei", "てゐ", "DF", { shoot: 58, pass: 72, dribble: 84, tackle: 76, block: 68, keep: 32, speed: 88, guts: 118 }, "幸運スティール", "低コストで番狂わせを起こす奪取"),
      p("junko", "純狐", "DF", { shoot: 72, pass: 70, dribble: 68, tackle: 84, block: 80, keep: 38, speed: 66, guts: 132 }, "純化の盾", "怒りで研ぎ澄ます後方守備"),
      p("ringo", "玉兎・烏丸", "DF", { shoot: 60, pass: 66, dribble: 72, tackle: 78, block: 76, keep: 36, speed: 78, guts: 120 }, "団子バリア", "兎の連携で穴を埋める"),
      p("clownpiece", "クラウンピース", "DF", { shoot: 68, pass: 64, dribble: 78, tackle: 76, block: 72, keep: 34, speed: 80, guts: 122 }, "星条狂気", "守備中に相手の集中を奪う"),
      p("kaguya", "輝夜", "MF", { shoot: 76, pass: 86, dribble: 70, tackle: 54, block: 66, keep: 36, speed: 52, guts: 138 }, "永夜の時間稼ぎ", "ターン消費を抑えつつ位置を整える"),
      p("reisen", "鈴仙", "MF", { shoot: 78, pass: 76, dribble: 78, tackle: 70, block: 58, keep: 28, speed: 76, guts: 122 }, "狂気のフェイント", "相手守備を乱すドリブル技"),
      p("ringo2", "鈴瑚", "MF", { shoot: 70, pass: 78, dribble: 72, tackle: 66, block: 60, keep: 32, speed: 74, guts: 120 }, "月の柏餅パス", "癒し系の安定したパス"),
      p("seiran", "清蘭", "MF", { shoot: 74, pass: 72, dribble: 76, tackle: 68, block: 62, keep: 30, speed: 78, guts: 122 }, "うさみみショット", "兎の俊敏さで決定的なパスを通す"),
      p("mokou", "妹紅", "FW", { shoot: 88, pass: 60, dribble: 76, tackle: 74, block: 66, keep: 24, speed: 76, guts: 150 }, "不死鳥ボレー", "失敗後もこぼれ球判定が強い"),
      p("iku", "衣玖", "FW", { shoot: 84, pass: 68, dribble: 72, tackle: 60, block: 56, keep: 26, speed: 74, guts: 128 }, "雷雲シュート", "稲妻のような曲線弾"),
    ],
  },
  {
    id: "chireiden",
    name: "地霊殿",
    style: "読心火力型",
    formation: "4-4-2",
    members: [
      p("yuugi", "勇儀", "GK", { shoot: 82, pass: 58, dribble: 60, tackle: 90, block: 92, keep: 84, speed: 52, guts: 155 }, "怪力パンチング", "弾くが失点しにくいパワーセーブ"),
      p("parsee", "パルスィ", "DF", { shoot: 64, pass: 68, dribble: 70, tackle: 84, block: 80, keep: 38, speed: 68, guts: 128 }, "嫉妬の橋", "近づく相手の士気を削る守備技"),
      p("yamame", "ヤマメ", "DF", { shoot: 62, pass: 66, dribble: 72, tackle: 82, block: 78, keep: 40, speed: 72, guts: 124 }, "土蜘蛛ネット", "蜘蛛糸で相手の足を絡める"),
      p("kisume", "キスメ", "DF", { shoot: 58, pass: 60, dribble: 68, tackle: 80, block: 84, keep: 42, speed: 64, guts: 120 }, "釣瓶落とし", "上空からの圧で侵入を阻止"),
      p("kuroni", "黒影の鬼", "DF", { shoot: 70, pass: 64, dribble: 70, tackle: 86, block: 82, keep: 38, speed: 70, guts: 134 }, "鬼影ブロック", "影の中から守る大型DF"),
      p("satori", "さとり", "MF", { shoot: 68, pass: 88, dribble: 66, tackle: 74, block: 72, keep: 40, speed: 54, guts: 126 }, "読心パスカット", "相手の次手を読んで守備補正"),
      p("orin", "お燐", "MF", { shoot: 72, pass: 76, dribble: 82, tackle: 68, block: 58, keep: 24, speed: 84, guts: 122 }, "火車スルーパス", "前線へ押し込む速攻パス"),
      p("kasha", "火車隊員", "MF", { shoot: 70, pass: 72, dribble: 78, tackle: 70, block: 62, keep: 28, speed: 80, guts: 118 }, "業火ダッシュ", "横入りカウンターの先頭"),
      p("jigoku", "地獄烏", "MF", { shoot: 78, pass: 70, dribble: 74, tackle: 64, block: 60, keep: 30, speed: 78, guts: 120 }, "業炎フィード", "高温のロングフィード"),
      p("koishi", "こいし", "FW", { shoot: 82, pass: 62, dribble: 92, tackle: 58, block: 48, keep: 18, speed: 88, guts: 120 }, "無意識ドリブル", "マークをすり抜ける突破技"),
      p("utsuho", "お空", "FW", { shoot: 98, pass: 44, dribble: 64, tackle: 70, block: 72, keep: 22, speed: 60, guts: 132 }, "核熱シュート", "最大火力だが霊力消費が重い"),
    ],
  },
  {
    id: "myouren",
    name: "命蓮寺",
    style: "支援守備型",
    formation: "4-4-2",
    members: [
      p("murasa", "村紗", "GK", { shoot: 70, pass: 66, dribble: 64, tackle: 72, block: 80, keep: 88, speed: 62, guts: 128 }, "沈没アンカー", "相手シュートの速度を落とすGK技"),
      p("ichirin", "一輪", "DF", { shoot: 68, pass: 60, dribble: 58, tackle: 86, block: 88, keep: 54, speed: 56, guts: 138 }, "雲山ブロック", "シュートブロックが強い壁役"),
      p("unzan", "雲山", "DF", { shoot: 72, pass: 62, dribble: 60, tackle: 88, block: 90, keep: 50, speed: 52, guts: 142 }, "鉄拳の壁", "一輪と同期する重圧パンチング守備"),
      p("mamizou", "マミゾウ", "DF", { shoot: 70, pass: 72, dribble: 74, tackle: 80, block: 78, keep: 42, speed: 70, guts: 134 }, "化け狸の影", "化身でDFラインを補強"),
      p("myouon", "妙音", "DF", { shoot: 64, pass: 70, dribble: 66, tackle: 78, block: 80, keep: 40, speed: 66, guts: 122 }, "梵鐘ブロック", "鐘の響きで相手の集中を散らす"),
      p("shou", "星", "MF", { shoot: 76, pass: 82, dribble: 70, tackle: 74, block: 76, keep: 38, speed: 68, guts: 134 }, "宝塔レーザーパス", "長距離パスの精度が高い"),
      p("nazrin", "ナズーリン", "MF", { shoot: 58, pass: 80, dribble: 82, tackle: 72, block: 60, keep: 24, speed: 84, guts: 116 }, "ダウジングカット", "こぼれ球を拾いやすい"),
      p("kyouko", "響子", "MF", { shoot: 74, pass: 74, dribble: 78, tackle: 68, block: 62, keep: 30, speed: 80, guts: 122 }, "山彦パス", "声で味方位置を補正するエコー技"),
      p("nue", "封獣ぬえ", "MF", { shoot: 82, pass: 70, dribble: 82, tackle: 70, block: 64, keep: 32, speed: 78, guts: 128 }, "正体不明シュート", "弾道が読みにくいトリックシュート"),
      p("byakuren", "聖", "FW", { shoot: 86, pass: 80, dribble: 74, tackle: 76, block: 74, keep: 44, speed: 72, guts: 145 }, "魔人経巻シュート", "万能型の高威力シュート"),
      p("disciple", "寅丸星弟子", "FW", { shoot: 80, pass: 66, dribble: 76, tackle: 60, block: 54, keep: 22, speed: 78, guts: 120 }, "光輪シュート", "聖の指導で磨かれた弟子の決定力"),
    ],
  },
  {
    id: "shinreibyo",
    name: "神霊廟",
    style: "状態異常型",
    formation: "4-4-2",
    members: [
      p("yoshika", "芳香", "GK", { shoot: 58, pass: 42, dribble: 48, tackle: 86, block: 90, keep: 82, speed: 36, guts: 160 }, "キョンシー壁", "低速だがしぶとい肉壁セーブ"),
      p("seiga", "青娥", "DF", { shoot: 66, pass: 78, dribble: 80, tackle: 78, block: 70, keep: 36, speed: 72, guts: 118 }, "邪仙トラップ", "ドリブル相手を止めやすい"),
      p("sogashadow", "蘇我影武者", "DF", { shoot: 64, pass: 68, dribble: 64, tackle: 84, block: 80, keep: 38, speed: 66, guts: 126 }, "影武者ブロック", "屠自古の影で防御を増強"),
      p("mononobe", "物部従士", "DF", { shoot: 68, pass: 64, dribble: 66, tackle: 82, block: 80, keep: 40, speed: 68, guts: 128 }, "皿陣の構え", "布都の皿陣を継承する守備技"),
      p("guardian", "神霊衛兵", "DF", { shoot: 70, pass: 62, dribble: 62, tackle: 86, block: 84, keep: 36, speed: 64, guts: 130 }, "廟堂ガード", "廟を守る古参の鉄壁"),
      p("futo", "布都", "MF", { shoot: 74, pass: 78, dribble: 76, tackle: 72, block: 68, keep: 28, speed: 78, guts: 124 }, "皿回しパス", "守備方向をズラす曲線パス"),
      p("tojiko", "屠自古", "MF", { shoot: 82, pass: 72, dribble: 70, tackle: 76, block: 66, keep: 30, speed: 70, guts: 120 }, "雷鳴ミドル", "中距離から強い感電シュート"),
      p("futatsuiwa", "二岩荒神", "MF", { shoot: 76, pass: 74, dribble: 74, tackle: 70, block: 64, keep: 32, speed: 72, guts: 122 }, "二岩連携", "獣の感応で繋ぐ中盤パス"),
      p("tsukuyomi", "月夜見使者", "MF", { shoot: 78, pass: 80, dribble: 72, tackle: 68, block: 62, keep: 34, speed: 70, guts: 120 }, "月読パス", "夜の精度で通すフィード"),
      p("miko", "神子", "FW", { shoot: 88, pass: 82, dribble: 76, tackle: 68, block: 66, keep: 32, speed: 74, guts: 136 }, "十七条レーザー", "高精度のエースシュート"),
      p("byoudou", "廟堂戦士", "FW", { shoot: 82, pass: 60, dribble: 74, tackle: 58, block: 54, keep: 22, speed: 76, guts: 122 }, "聖徳の槍", "神子直系の前線アタッカー"),
    ],
  },
  {
    id: "rebel_beast",
    name: "反逆獣連合",
    style: "変則奇襲型",
    formation: "4-4-2",
    members: [
      p("mayumi", "磨弓", "GK", { shoot: 70, pass: 68, dribble: 62, tackle: 84, block: 88, keep: 86, speed: 62, guts: 140 }, "埴輪陣形セーブ", "組織守備で枠内シュートを止める"),
      p("kagerou", "影狼", "DF", { shoot: 72, pass: 60, dribble: 78, tackle: 84, block: 76, keep: 40, speed: 82, guts: 130 }, "満月プレス", "近距離接触に強い守備"),
      p("oniko", "鬼っ子", "DF", { shoot: 70, pass: 62, dribble: 68, tackle: 82, block: 80, keep: 38, speed: 72, guts: 132 }, "鬼火ガード", "鬼の血で覚醒する防壁"),
      p("bakeneko", "化け猫頭目", "DF", { shoot: 68, pass: 66, dribble: 74, tackle: 80, block: 78, keep: 36, speed: 74, guts: 126 }, "猫又千鳥", "九尾の獣で多方向防御"),
      p("kageyachie", "影八千慧", "DF", { shoot: 72, pass: 70, dribble: 70, tackle: 86, block: 82, keep: 40, speed: 68, guts: 138 }, "影武者の采配", "八千慧の影で守備を采配"),
      p("seija", "正邪", "MF", { shoot: 72, pass: 76, dribble: 86, tackle: 72, block: 58, keep: 24, speed: 78, guts: 120 }, "リバースフェイント", "攻守補正を入れ替える変則技"),
      p("yachie", "八千慧", "MF", { shoot: 80, pass: 84, dribble: 74, tackle: 76, block: 72, keep: 38, speed: 68, guts: 138 }, "組長の采配", "味方全体を底上げする指揮技"),
      p("baketanuki", "化け狸", "MF", { shoot: 74, pass: 74, dribble: 78, tackle: 70, block: 64, keep: 30, speed: 76, guts: 124 }, "変身フェイク", "次の判定の予測を狂わせる"),
      p("oniwaka", "鬼若", "MF", { shoot: 78, pass: 70, dribble: 72, tackle: 72, block: 66, keep: 32, speed: 74, guts: 130 }, "鬼若ラッシュ", "若鬼の俊敏なミドルレンジ攻撃"),
      p("shinmyoumaru", "針妙丸", "FW", { shoot: 78, pass: 70, dribble: 88, tackle: 54, block: 46, keep: 18, speed: 86, guts: 112 }, "小槌トリックシュート", "サイズ差でGKのタイミングを外す"),
      p("hangyakushi", "反逆獣戦士", "FW", { shoot: 86, pass: 60, dribble: 74, tackle: 58, block: 50, keep: 22, speed: 76, guts: 126 }, "反逆突撃", "獣連合最強の若手アタッカー"),
    ],
  },
];

const FORMATIONS = {
  "4-4-2": {
    GK: [{ x: 6, y: 50 }],
    DF: [{ x: 18, y: 22 }, { x: 18, y: 42 }, { x: 18, y: 58 }, { x: 18, y: 78 }],
    MF: [{ x: 36, y: 22 }, { x: 36, y: 42 }, { x: 36, y: 58 }, { x: 36, y: 78 }],
    FW: [{ x: 54, y: 36 }, { x: 54, y: 64 }],
  },
  "4-3-3": {
    GK: [{ x: 6, y: 50 }],
    DF: [{ x: 18, y: 22 }, { x: 18, y: 42 }, { x: 18, y: 58 }, { x: 18, y: 78 }],
    MF: [{ x: 36, y: 32 }, { x: 36, y: 50 }, { x: 36, y: 68 }],
    FW: [{ x: 54, y: 26 }, { x: 54, y: 50 }, { x: 54, y: 74 }],
  },
  "3-5-2": {
    GK: [{ x: 6, y: 50 }],
    DF: [{ x: 18, y: 30 }, { x: 18, y: 50 }, { x: 18, y: 70 }],
    MF: [{ x: 32, y: 18 }, { x: 32, y: 36 }, { x: 32, y: 54 }, { x: 32, y: 72 }, { x: 42, y: 50 }],
    FW: [{ x: 54, y: 36 }, { x: 54, y: 64 }],
  },
};

const TACTICS = {
  normal:    { offset: 0,  label: "通常",       aiBias: { shoot: 1.0, pass: 1.0, dribble: 1.0, team: 1.0 } },
  offensive: { offset: 7,  label: "攻撃的",     aiBias: { shoot: 1.35, pass: 1.0, dribble: 1.2, team: 0.7 } },
  defensive: { offset: -7, label: "守備的",     aiBias: { shoot: 0.7, pass: 1.25, dribble: 0.8, team: 1.3 } },
  counter:   { offset: -4, label: "カウンター", aiBias: { shoot: 1.4, pass: 0.95, dribble: 1.4, team: 0.5 } },
};

const state = {
  screen: "setup",
  homeTeamId: "hakurei",
  awayTeamId: "kouma",
  mode: "campaign",
  campaign: null,
  match: null,
  battle: null,
  cutin: null,
  cutinTimer: null,
  cutinFrameTimer: null,
  hitstop: false,
  hitstopTimer: null,
  crashScene: null,
  crashSceneTimer: null,
  advance: null,
  advanceTimer: null,
  screenFlash: false,
  screenFlashTimer: null,
  actionScene: null,
  actionSceneTimer: null,
  previousScreen: "setup",
  progress: loadProgress(),
  advanceGateId: 0,
  logs: [],
  judge: null,
  judgeTimer: null,
  fieldShake: false,
  fieldShakeTimer: null,
  vsScreen: null,
  vsScreenTimer: null,
  passPicker: null,
  interrupt: null,
  gkChoice: null,
  vnScene: null,
  halftimeReport: false,
  halftimeReportTimer: null,
  playSeq: null,      // 多段演出シーケンサ (発動→過程→相手対応→合否)
  ballMotion: null,   // ⚽スプライト挙動 { mode, from, to }
  commandMenu: null,  // 原作Bボタン式の方向コマンドメニュー (上ドリブル/左パス/右シュート/下ワンツー)
  drawerOpen: false,  // 補助ドロワー (ログ/ステータス/チームCG)。 原作CT3に無いので試合中は既定で畳む。
};

const SAVE_KEY = "touhouSpellFutsalSaveV1";
const MATCH_SAVE_KEY = "touhouSpellSoccerMatchV1";

function saveMatch() {
  if (!state.match || state.match.finished) return;
  try {
    window.localStorage.setItem(MATCH_SAVE_KEY, JSON.stringify({
      match: state.match,
      mode: state.mode,
      campaign: state.campaign,
      timestamp: Date.now(),
    }));
  } catch (_error) {}
}

function loadMatch() {
  try {
    const raw = window.localStorage.getItem(MATCH_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.match || parsed.match.finished) return null;
    return parsed;
  } catch (_error) {
    return null;
  }
}

function clearMatchSave() {
  try { window.localStorage.removeItem(MATCH_SAVE_KEY); } catch (_error) {}
}

function resumeMatch(saved) {
  cancelPendingTimers();
  state.match = saved.match;
  state.match.matchToken = ++matchSeq;
  state.mode = saved.mode || "campaign";
  state.campaign = saved.campaign || null;
  state.screen = "match";
  state.battle = null;
  state.gkChoice = null;
  state.interrupt = null;
  state.passPicker = null;
  audio.ensure();
  audio.startMusic();
  render();
}
const DIFFICULTY_REWARDS = {
  easy: { label: "EASY制覇", spiritBonus: 4, message: "EASY報酬: 次回以降、自チーム全員の初期霊力+4。" },
  normal: { label: "NORMAL制覇", spiritBonus: 8, message: "NORMAL報酬: 次回以降、自チーム全員の初期霊力+8。" },
  hard: { label: "HARD制覇", spiritBonus: 12, message: "HARD報酬: 次回以降、自チーム全員の初期霊力+12。" },
};

function defaultProgress() {
  return {
    unlockedTeams: ["hakurei"],
    campaignClears: 0,
    lastUnlocked: "hakurei",
    audioMuted: false,
    difficulty: "normal",
    difficultyClears: { easy: false, normal: false, hard: false },
    formation: "4-4-2",
    tactic: "normal",
    playerXp: {},
    animSpeed: "normal",
    autoAdvance: false,
  };
}

function loadProgress() {
  const fallback = defaultProgress();
  try {
    const raw = window.localStorage.getItem("touhouSpellFutsalSaveV1");
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    const unlockedTeams = Array.isArray(parsed.unlockedTeams) && parsed.unlockedTeams.length
      ? [...new Set(parsed.unlockedTeams)]
      : fallback.unlockedTeams;
    return {
      unlockedTeams,
      campaignClears: Number(parsed.campaignClears || 0),
      lastUnlocked: parsed.lastUnlocked || unlockedTeams[unlockedTeams.length - 1],
      audioMuted: Boolean(parsed.audioMuted),
      difficulty: ["easy", "normal", "hard"].includes(parsed.difficulty) ? parsed.difficulty : "normal",
      difficultyClears: {
        easy: Boolean(parsed.difficultyClears && parsed.difficultyClears.easy),
        normal: Boolean(parsed.difficultyClears && parsed.difficultyClears.normal),
        hard: Boolean(parsed.difficultyClears && parsed.difficultyClears.hard),
      },
      formation: ["4-4-2", "4-3-3", "3-5-2"].includes(parsed.formation) ? parsed.formation : "4-4-2",
      tactic: ["normal", "offensive", "defensive", "counter"].includes(parsed.tactic) ? parsed.tactic : "normal",
      playerXp: (parsed.playerXp && typeof parsed.playerXp === "object") ? parsed.playerXp : {},
      animSpeed: ["normal", "fast", "instant"].includes(parsed.animSpeed) ? parsed.animSpeed : "normal",
      autoAdvance: Boolean(parsed.autoAdvance),
    };
  } catch (_error) {
    return fallback;
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state.progress));
  } catch (_error) {
    // The game remains playable if browser storage is unavailable.
  }
}

function unlockTeam(teamId) {
  if (!teamId || state.progress.unlockedTeams.includes(teamId)) return false;
  state.progress.unlockedTeams.push(teamId);
  state.progress.lastUnlocked = teamId;
  saveProgress();
  return true;
}

function resetProgress() {
  // 進行リセット。音設定 / 難易度 / 演出速度の「設定」は引き継ぎ、
  // 解放 / クリア / XP / 編成は初期化する (formation/tactic/playerXp 脱落クラッシュ修正)。
  const kept = {
    audioMuted: state.progress.audioMuted,
    difficulty: state.progress.difficulty,
    animSpeed: state.progress.animSpeed,
  };
  state.progress = { ...defaultProgress(), ...kept };
  saveProgress();
}

const BGM_MELODIES = {
  normal:  [392, 440, 523, 587, 523, 440, 392, 330],
  defense: [294, 330, 349, 330, 294, 247, 220, 247],
  intense: [523, 587, 659, 698, 659, 587, 523, 440],
  result:  [523, 659, 784, 1046, 880, 698, 587, 523],
};
const BGM_TEMPO = { normal: 360, defense: 420, intense: 280, result: 320 };

const audio = {
  ctx: null,
  musicTimer: null,
  step: 0,
  currentBgm: null,
  ensure() {
    if (state.progress.audioMuted) return null;
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },
  tone(freq, duration = 0.08, type = "square", gain = 0.035, when = 0) {
    const ctx = this.ensure();
    if (!ctx || state.progress.audioMuted) return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + when);
    amp.gain.setValueAtTime(0.0001, ctx.currentTime + when);
    amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + when + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + when + duration);
    osc.connect(amp).connect(ctx.destination);
    osc.start(ctx.currentTime + when);
    osc.stop(ctx.currentTime + when + duration + 0.02);
  },
  noise(duration = 0.08, gain = 0.025, when = 0) {
    const ctx = this.ensure();
    if (!ctx || state.progress.audioMuted) return;
    const start = ctx.currentTime + when;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(gain, start);
    amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.buffer = buffer;
    source.connect(amp).connect(ctx.destination);
    source.start(start);
  },
  play(name) {
    if (state.progress.audioMuted) return;
    if (name === "select") this.tone(660, 0.05, "triangle", 0.025);
    if (name === "battle") {
      this.tone(220, 0.06, "square", 0.03);
      this.tone(330, 0.08, "square", 0.025, 0.055);
    }
    if (name === "spell") {
      this.tone(440, 0.08, "sawtooth", 0.035);
      this.tone(660, 0.1, "sawtooth", 0.035, 0.08);
      this.tone(990, 0.14, "triangle", 0.03, 0.18);
    }
    if (name === "goal") {
      [523, 659, 784, 1046].forEach((freq, index) => this.tone(freq, 0.11, "triangle", 0.04, index * 0.08));
    }
    if (name === "save") {
      this.tone(784, 0.07, "triangle", 0.025);
      this.tone(1175, 0.09, "triangle", 0.025, 0.08);
    }
    if (name === "result") this.tone(392, 0.18, "triangle", 0.03);
    if (name === "error") this.tone(140, 0.12, "sawtooth", 0.025);
    if (name === "kick") this.noise(0.06, 0.02);
    if (name === "pass-success") {
      this.tone(660, 0.05, "triangle", 0.025);
      this.tone(990, 0.07, "triangle", 0.025, 0.05);
    }
    if (name === "intercept") {
      this.tone(140, 0.08, "sawtooth", 0.025);
      this.noise(0.04, 0.015);
    }
    if (name === "encounter") {
      [880, 1100, 1320].forEach((f, i) => this.tone(f, 0.04, "square", 0.018, i * 0.05));
    }
    if (name === "whistle") {
      this.tone(2200, 0.16, "triangle", 0.025);
    }
    if (name === "ovation") {
      this.noise(0.4, 0.012);
      this.tone(440, 0.18, "sine", 0.015, 0.05);
      this.tone(550, 0.22, "sine", 0.012, 0.18);
    }
    if (name === "dribble-break") {
      this.tone(520, 0.04, "square", 0.022);
      this.tone(780, 0.05, "square", 0.022, 0.04);
    }
    if (name === "tackle") {
      this.noise(0.05, 0.025);
      this.tone(180, 0.06, "sawtooth", 0.025, 0.02);
    }
    if (name === "page-turn") {
      this.tone(880, 0.02, "triangle", 0.018);
      this.tone(1320, 0.025, "triangle", 0.012, 0.02);
    }
    // 必殺技 SE: チャージ(タメ) → スプライトが放出フレームにめくれた瞬間のインパクト。
    if (name === "spell-charge") {
      [196, 262, 330, 392].forEach((f, i) => this.tone(f, 0.12, "sawtooth", 0.016 + i * 0.004, i * 0.05));
      this.tone(523, 0.16, "triangle", 0.02, 0.2);
    }
    if (name === "spell-impact") {
      this.noise(0.14, 0.03);
      this.tone(90, 0.18, "sawtooth", 0.03);
      this.tone(660, 0.1, "square", 0.028, 0.01);
      this.tone(990, 0.14, "triangle", 0.024, 0.05);
    }
    if (name === "ultimate-charge") {
      [110, 165, 220, 294, 392].forEach((f, i) => this.tone(f, 0.14, "sawtooth", 0.015 + i * 0.004, i * 0.06));
      this.tone(587, 0.2, "triangle", 0.022, 0.3);
    }
    if (name === "ultimate-impact") {
      this.noise(0.22, 0.034);
      this.tone(70, 0.26, "sawtooth", 0.034);
      [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.16, "triangle", 0.024, i * 0.03));
    }
    // 通常アクションの「タメ→着弾」2段 SE (必殺との差別化: 軽い square/saw/triangle, ノイズ層なし)。
    if (name === "shoot-charge") {
      this.tone(220, 0.12, "sawtooth", 0.022);
      this.tone(440, 0.12, "sawtooth", 0.018, 0.04);
    }
    if (name === "shoot-impact") {
      this.noise(0.05, 0.028);
      this.tone(160, 0.08, "square", 0.026, 0.005);
    }
    if (name === "pass-charge") {
      this.tone(523, 0.04, "triangle", 0.02);
    }
    if (name === "hitstop-cue") {
      this.tone(80, 0.04, "square", 0.03);
    }
    // 必殺シュート vs 必殺セーブのクラッシュ火花 (低周波うなり + 金属ノイズ)。
    if (name === "clash-spark") {
      this.tone(80, 0.12, "square", 0.03);
      this.noise(0.12, 0.026);
      this.tone(80, 0.12, "square", 0.03, 0.1);
      this.noise(0.12, 0.024, 0.1);
    }
    if (name === "goal-stamp") {
      this.tone(1300, 0.05, "square", 0.04);
      this.tone(1300, 0.05, "square", 0.04, 0.1);
    }
    if (name === "crowd-rumble") {
      this.noise(0.5, 0.01);
      this.tone(60, 0.4, "sine", 0.012, 0.05);
    }
  },
  playBgm(name) {
    if (state.progress.audioMuted) return;
    this.stopMusic();
    const melody = BGM_MELODIES[name] || BGM_MELODIES.normal;
    const tempo = BGM_TEMPO[name] || 360;
    this.currentBgm = name;
    this.step = 0;
    this.musicTimer = window.setInterval(() => {
      if (state.progress.audioMuted) return;
      const freq = melody[this.step % melody.length];
      this.tone(freq, 0.11, "triangle", 0.012);
      if (this.step % 2 === 0) this.tone(freq / 2, 0.14, "sine", 0.01);
      this.step += 1;
    }, tempo);
  },
  startMusic() {
    if (state.progress.audioMuted || this.musicTimer) return;
    this.playBgm("normal");
  },
  stopMusic() {
    if (this.musicTimer) window.clearInterval(this.musicTimer);
    this.musicTimer = null;
    this.currentBgm = null;
  },
  setMuted(muted) {
    state.progress.audioMuted = muted;
    saveProgress();
    if (muted) this.stopMusic();
    else {
      this.play("select");
      if (state.screen === "match") this.startMusic();
    }
  },
};

const AVAILABLE_PORTRAITS = new Set([
  "aya",
  "bakeneko",
  "baketanuki",
  "byakuren",
  "byoudou",
  "cirno",
  "clownpiece",
  "daiyousei",
  "disciple",
  "eirin",
  "flandre",
  "futatsuiwa",
  "futo",
  "guardian",
  "hangyakushi",
  "hecatia",
  "hina",
  "ichirin",
  "iku",
  "jigoku",
  "junko",
  "kagerou",
  "kageyachie",
  "kaguya",
  "kanako",
  "kasen",
  "kasha",
  "kisume",
  "koakuma",
  "kogasa",
  "koishi",
  "kuroni",
  "kyouko",
  "lily",
  "lunasa",
  "lyrica",
  "mamizou",
  "marisa",
  "mayumi",
  "medicine",
  "meiling",
  "merlin",
  "miko",
  "minoriko",
  "mokou",
  "momiji",
  "mononobe",
  "murasa",
  "myouon",
  "nazrin",
  "nitori",
  "nue",
  "oniko",
  "oniwaka",
  "orin",
  "parsee",
  "patchouli",
  "reimu",
  "reisen",
  "remilia",
  "ringo",
  "ringo2",
  "rumia",
  "sakuya",
  "sanae",
  "satori",
  "seiga",
  "seija",
  "seiran",
  "shinmyoumaru",
  "shizuha",
  "shou",
  "sogashadow",
  "suika",
  "suwako",
  "tei",
  "tojiko",
  "tokiko",
  "tsukuyomi",
  "unzan",
  "utsuho",
  "wriggle",
  "yachie",
  "yamame",
  "yoshika",
  "youmu",
  "yuugi",
  "yuuka",
]);

const AVAILABLE_CUTINS = new Set([
  "aya",
  "bakeneko",
  "baketanuki",
  "byakuren",
  "byoudou",
  "cirno",
  "clownpiece",
  "daiyousei",
  "disciple",
  "eirin",
  "flandre",
  "futatsuiwa",
  "futo",
  "guardian",
  "hangyakushi",
  "hecatia",
  "hina",
  "ichirin",
  "iku",
  "jigoku",
  "junko",
  "kagerou",
  "kageyachie",
  "kaguya",
  "kanako",
  "kasen",
  "kasha",
  "kisume",
  "koakuma",
  "kogasa",
  "koishi",
  "kuroni",
  "kyouko",
  "lily",
  "lunasa",
  "lyrica",
  "mamizou",
  "marisa",
  "mayumi",
  "medicine",
  "meiling",
  "merlin",
  "miko",
  "minoriko",
  "mokou",
  "momiji",
  "mononobe",
  "murasa",
  "myouon",
  "nazrin",
  "nitori",
  "nue",
  "oniko",
  "oniwaka",
  "orin",
  "parsee",
  "patchouli",
  "reimu",
  "reisen",
  "remilia",
  "ringo",
  "ringo2",
  "rumia",
  "sakuya",
  "sanae",
  "satori",
  "seiga",
  "seija",
  "seiran",
  "shinmyoumaru",
  "shizuha",
  "shou",
  "sogashadow",
  "suika",
  "suwako",
  "tei",
  "tojiko",
  "tokiko",
  "tsukuyomi",
  "unzan",
  "utsuho",
  "wriggle",
  "yachie",
  "yamame",
  "yoshika",
  "youmu",
  "yuugi",
  "yuuka",
]);

const RESULT_DIALOGUES = {
  hakurei: {
    speaker: "reimu",
    win: "よし、異変解決に一歩前進ね。この調子で全部勝つわ。",
    lose: "まだ終わりじゃないわ。次は守り方を変える。",
    draw: "決着は持ち越しね。もう一試合やるわよ。",
  },
  kouma: {
    speaker: "remilia",
    win: "運命は最初からこちらに傾いていたのよ。",
    lose: "面白いじゃない。紅魔館を本気にさせたわね。",
    draw: "引き分けなんて退屈ね。次は決着をつけるわ。",
  },
  youkai_mountain: {
    speaker: "aya",
    win: "今の突破、号外にできますね。風向きは完全にこちらです。",
    lose: "記事にはしません。再戦で上書きしますから。",
    draw: "いい試合でした。けど見出しには勝利が必要です。",
  },
  eientei: {
    speaker: "kaguya",
    win: "永い夜の中では、焦った方から崩れるのよ。",
    lose: "少し遊びすぎたわね。次は月の策でいくわ。",
    draw: "退屈しない勝負ね。もう少し続けましょう。",
  },
  chireiden: {
    speaker: "satori",
    win: "次に何をするか、全部読めていました。",
    lose: "読めても止められない力がありますね。",
    draw: "心の揺れがそのままスコアに出ました。",
  },
  myouren: {
    speaker: "byakuren",
    win: "力だけではなく、信じる連携が勝利を呼びました。",
    lose: "敗北も修行です。次は迷いなく踏み込みます。",
    draw: "互いに譲らぬ良い試合でした。",
  },
  shinreibyo: {
    speaker: "miko",
    win: "人の声もボールの流れも、私には聞こえています。",
    lose: "この敗北、次の布石として受け取りましょう。",
    draw: "まだ天命は結論を出していないようですね。",
  },
  rebel_beast: {
    speaker: "shinmyoumaru",
    win: "小さくても勝てるって、これで証明できたでしょ。",
    lose: "くやしい。でも反逆はここからだよ。",
    draw: "引き分けなら、まだひっくり返せるってことだね。",
  },
};

const PRE_MATCH_DIALOGUES = {
  kouma: {
    speaker: "remilia",
    message: "夜の芝に出るなんて悪くないわ。博麗の巫女、運命ごと蹴り返してあげる。",
  },
  youkai_mountain: {
    speaker: "aya",
    message: "天狗の取材対象として最高ですね。勝敗まで含めて一面にします。",
  },
  eientei: {
    speaker: "kaguya",
    message: "焦るほど足元が乱れるわ。永い夜のペースについてこられるかしら。",
  },
  chireiden: {
    speaker: "satori",
    message: "作戦はもう読めています。あとはボールが心の通りに動くかどうかです。",
  },
  myouren: {
    speaker: "byakuren",
    message: "勝負は修行、連携は信仰。正々堂々、最後まで走りましょう。",
  },
  shinreibyo: {
    speaker: "miko",
    message: "歓声も迷いも聞こえています。この試合の流れ、私が導きます。",
  },
  rebel_beast: {
    speaker: "shinmyoumaru",
    message: "大きいチームだけが勝つなんて決まり、ひっくり返してみせるよ。",
  },
};

function p(id, name, role, stats, spell, spellText) {
  return { id, name, role, stats, spell, spellText };
}

const STORY_OPENING = [
  { speaker: "reimu",   text: "また異変ね。「幻想郷フットボール協会」だって？聞いたこともない団体が、賞金付きの大会を勝手に開いてる。胡散臭いったらない。", cast: ["reimu", "marisa"] },
  { speaker: "marisa",  text: "胡散臭いから面白いんじゃないか。賞金は祠の修繕費、私のキノコ採取資金、お賽銭箱の補強……山分けでいいよな霊夢？", cast: ["reimu", "marisa"] },
  { speaker: "reimu",   text: "山分けじゃなくて全部神社の金庫よ。ともかく、相手は紅魔館、永遠亭、命蓮寺、神霊廟……どれも一筋縄じゃいかない連中ばかり。", cast: ["reimu", "marisa", "sanae"] },
  { speaker: "sanae",   text: "外の世界と同じ11対11、前後半90分。ロスタイムがどれだけ延びるかは神のみぞ知る。守矢一同、必勝の祝詞を上げてきます！", cast: ["sanae", "kanako", "suwako"] },
  { speaker: "youmu",   text: "幽々子様より「優勝旗は美味しそうだから持ち帰ってきて」とのご命令を承りました。半霊と二人分、ご期待に応えます。", cast: ["youmu", "reimu"] },
  { speaker: "suika",   text: "DFラインは鬼の私に任せろ。萃集無能力で相手を集めて、ぜんぶまとめて吹き飛ばすからな。お酒も忘れずに……。", cast: ["suika", "youmu", "reimu"] },
  { speaker: "reimu",   text: "幻想郷トーナメント、博麗神社一同で挑む。覚悟しなさい、相手チームたち。", cast: ["reimu", "marisa", "sanae", "youmu", "suika"] },
];

const STORY_PRE = {
  kouma: [
    { speaker: "remilia",   text: "夜の芝に出てくるなんて運命の悪戯ね、博麗の巫女。紅霧異変で私を退治した借りは、ここで返してもらうわ。", cast: ["remilia", "sakuya", "flandre", "patchouli"] },
    { speaker: "sakuya",    text: "時を止められない試合は不慣れですが、お嬢様のために完璧なメイドが完璧な司令塔を演じます。", cast: ["sakuya", "remilia"] },
    { speaker: "patchouli", text: "魔理沙……無断借用された蔵書全72冊、そろそろ返すか、シュート1本ごとに利息を払いなさい。", cast: ["patchouli", "marisa"] },
    { speaker: "marisa",    text: "図書館の本？まあ……研究中だぜ。利息は試合で払ってやる。マスタースパーク、避けるなよ？", cast: ["marisa", "patchouli"] },
    { speaker: "flandre",   text: "お姉さま、観客席の壊し方は知ってる？4枚の羽根、ピッチの上で全開にしていい？", cast: ["flandre", "remilia"] },
    { speaker: "reimu",     text: "1回戦から紅魔館とはツイてない。でも吸血鬼相手なら、ただ太陽が出るまで耐えればいい。90分、押し切る。", cast: ["reimu", "marisa", "suika"] },
  ],
  youkai_mountain: [
    { speaker: "aya",     text: "文々。新聞 号外！『博麗チーム、紅魔館撃破！次なる獲物は妖怪山か』──見出しはこれで決まりですね。", cast: ["aya", "momiji", "nitori"] },
    { speaker: "kanako",  text: "守矢の名にかけて、神奈子は御柱ロングシュートで天を裂く。早苗、見ているか？母なる神の本気を。", cast: ["kanako", "sanae", "suwako"] },
    { speaker: "sanae",   text: "神奈子様……守矢の御柱と博麗の御幣、どちらが強いか今日決めましょう。子孫として恥ずかしくない戦いをします。", cast: ["sanae", "kanako"] },
    { speaker: "suwako",  text: "ケロちゃん、土着神は柔軟だから何でもありね。GKでもFWでもこなしてみせるよ。", cast: ["suwako", "kanako"] },
    { speaker: "momiji",  text: "白狼天狗の千里眼カット、絶対に外しません。文先輩、私が後ろは固めますから。", cast: ["momiji", "aya"] },
    { speaker: "marisa",  text: "風読みの天狗か。マスタースパークは光速だ。読まれる前に撃ち抜くだけだぜ。", cast: ["marisa", "aya"] },
  ],
  eientei: [
    { speaker: "kaguya",  text: "永い夜の中では、焦った方から崩れるのよ。蓬莱の薬を一千年飲み続けた私の前で、巫女ごときが息切れせずにいられて？", cast: ["kaguya", "eirin", "reisen"] },
    { speaker: "eirin",   text: "1300年前、私が妹紅にも飲ませた薬。その因縁の試合を、今宵もう一度。妹紅、君も覚悟はあるね？", cast: ["eirin", "mokou", "kaguya"] },
    { speaker: "mokou",   text: "永琳……お前を恨むのは1000年ほど前にやめた。輝夜、お前への恨みも忘れた。だがフィールドの上では遠慮しない。私の不死鳥ボレーで決める。", cast: ["mokou", "kaguya", "eirin"] },
    { speaker: "reisen",  text: "狂気のフェイントで、皆さまの目を狂わせます。月の兎、敗北は知りません。", cast: ["reisen", "tei"] },
    { speaker: "youmu",   text: "幽々子様のお友達である輝夜様……失礼ながら、楼観剣の切れ味は変わりません。半霊で月の夜を断ち切ります。", cast: ["youmu", "kaguya"] },
    { speaker: "sanae",   text: "奇跡のスルーパス、永遠の夜を切り裂けるかは私たちの団結次第です！", cast: ["sanae", "youmu", "reimu"] },
  ],
  chireiden: [
    { speaker: "satori",  text: "全員の作戦、もう読めています。霊夢、貴女の最初のコマンドが見える……ふふ、わかってしまえば怖くないでしょう？", cast: ["satori", "koishi", "orin", "utsuho"] },
    { speaker: "koishi",  text: "お姉様、私は心を閉じてるから読めないわよ。無意識ドリブルでマーカーすり抜けて、ふらっとゴール決めるだけ。", cast: ["koishi", "satori"] },
    { speaker: "utsuho",  text: "神奈子様にもらった八咫烏の力で、核熱シュートを撃つわ。芝が燃えても気にしないでね。", cast: ["utsuho", "orin"] },
    { speaker: "yuugi",   text: "萃香、また会えたな！四天王の鬼同士、フィールドでも力比べだ！怪力パンチング、もちろん耐えてくれよな！", cast: ["yuugi", "suika"] },
    { speaker: "suika",   text: "勇儀！！長いこと地下でくすぶってないで、今日は鬼神同士で本気の角ぶつけ合おうぜ。萃集無能力、解禁だ。", cast: ["suika", "yuugi"] },
    { speaker: "youmu",   text: "半霊は心を持たない。さとり様が読めるのは私の生身だけ。半身に任せれば、思考も気持ちも空欄のまま勝負できます。", cast: ["youmu", "satori"] },
  ],
  myouren: [
    { speaker: "byakuren",  text: "勝負は修行、連携は信仰。仏の道に背くことなく、命蓮寺一同、全力で挑みます。早苗、神道側との因縁、今日決着しましょう。", cast: ["byakuren", "shou", "ichirin", "murasa", "nazrin"] },
    { speaker: "sanae",     text: "聖さん、神道と仏教の代理戦争にする気はありませんが……守矢の血脈、ここで負けるわけにはいきません！", cast: ["sanae", "byakuren"] },
    { speaker: "shou",      text: "毘沙門天の眷属として、宝塔レーザーパスで聖さまの道を開きます。ナズーリン、ダウジングで的確に。", cast: ["shou", "nazrin", "byakuren"] },
    { speaker: "ichirin",   text: "雲山、信じてるよ。あなたの鉄拳ブロック、何本でも止めて。", cast: ["ichirin", "unzan"] },
    { speaker: "murasa",    text: "沈没アンカーで全シュートを海の底に沈める。妖夢、私は船幽霊、亡霊同士、礼儀正しく勝負しよう。", cast: ["murasa", "youmu"] },
    { speaker: "marisa",    text: "聖はマジで強い。封印されてた千年妖怪だぜ。準決勝にふさわしい相手だな、霊夢！", cast: ["marisa", "reimu"] },
  ],
  shinreibyo: [
    { speaker: "miko",      text: "聖徳道士、豊聡耳神子。十七条の条文ごとに、十七人分の声を聞き分ける耳で、貴女方の作戦も全て見抜く。", cast: ["miko", "futo", "tojiko", "seiga"] },
    { speaker: "futo",      text: "蘇我のあやつらにこの皿陣を破られて以来、何百年。今日は物部一族の名誉をかけて、屠自古めを抑えながら勝つ。", cast: ["futo", "miko"] },
    { speaker: "tojiko",    text: "布都……お前と組まされるのは1400年経っても気が進まんがな。雷鳴ミドル、お前の頭上をかすめて飛ばすぞ。", cast: ["tojiko", "futo"] },
    { speaker: "seiga",     text: "邪仙トラップで、ドリブルしてくる相手の足を地面に縫い付けてあげる。芳香、後ろは任せたわよ。", cast: ["seiga", "yoshika"] },
    { speaker: "byakuren",  text: "(観戦中) 太子……仏教を排した道教者として、千年越しの遺恨があるが……今は応援する側ではない。霊夢、頼んだ。", cast: ["byakuren", "miko"] },
    { speaker: "reimu",     text: "十七条のレーザー、当たれば終わり。早苗、サナエ・スルーパスで先手必勝。一気に決める。", cast: ["reimu", "sanae", "suika", "marisa"] },
  ],
  rebel_beast: [
    { speaker: "shinmyoumaru", text: "決勝の舞台に小さい私が立ってる。ひっくり返ってるでしょ？それが反逆獣連合よ。輝針城の主の意地、見せてあげる。", cast: ["shinmyoumaru", "seija", "yachie", "kagerou"] },
    { speaker: "seija",        text: "「常識を破る天邪鬼」、ここで博麗の巫女を倒すのが私の悲願よ。リバースフェイントで攻守逆転、楽しみだわ。", cast: ["seija", "shinmyoumaru"] },
    { speaker: "yachie",       text: "獣の道に従う者として、組長の采配で全員が動く。霊夢、退治屋として歴代の獣たちを倒してきた貴女、覚悟は？", cast: ["yachie", "kagerou", "shinmyoumaru"] },
    { speaker: "kagerou",      text: "椛、お前は白狼天狗で、私は妖狼……月が満ちる夜、結局狼は走る。満月プレスで止めてみせる。", cast: ["kagerou", "yachie"] },
    { speaker: "mayumi",       text: "埴輪兵団の名にかけて、決勝戦の枠内シュートはひとつも入れさせません。", cast: ["mayumi", "shinmyoumaru"] },
    { speaker: "marisa",       text: "輝針城の異変からずっと待ってたぜ。あの小槌、また見られるとはな。", cast: ["marisa", "shinmyoumaru"] },
    { speaker: "reimu",        text: "ここまで来た。決勝戦。博麗神社が幻想郷を代表する。負けるわけにはいかない。", cast: ["reimu", "marisa", "sanae", "youmu", "suika"] },
  ],
};

const STORY_WIN = {
  kouma: [
    { speaker: "remilia",   text: "面白いじゃない。1回戦で散る紅魔館は紅魔館じゃないけれど……運命を打ち返した巫女、認めてあげる。", cast: ["remilia", "flandre", "sakuya"] },
    { speaker: "patchouli", text: "(本を渡しながら) 魔理沙、利息分の本、今日返してくれた。次は新しい呪文書を貸してあげる。但しシュート1本につき1ページよ。", cast: ["patchouli", "marisa"] },
    { speaker: "flandre",   text: "お姉さま、また外で遊ばせてね。今度はゴルフがいいかな……ボール壊しちゃうかも。", cast: ["flandre", "remilia"] },
    { speaker: "marisa",    text: "夜より先に決まる勝負はないって聞いてたぜ。次は妖怪山だ。", cast: ["marisa", "reimu"] },
  ],
  youkai_mountain: [
    { speaker: "kanako",  text: "御柱は折れた。だが守矢は再建する。早苗、母の負けを糧にもっと強くなりなさい。", cast: ["kanako", "sanae", "suwako"] },
    { speaker: "sanae",   text: "神奈子様……勝てました。守矢の血、博麗神社で恥じない働きができた、と思います。", cast: ["sanae", "kanako"] },
    { speaker: "aya",     text: "号外！博麗チーム快進撃中、優勝候補に躍り出る、と書きましょう。文々。新聞、博麗チームの応援に転向です。", cast: ["aya", "marisa"] },
    { speaker: "reimu",   text: "風読みも結局は走るしかなかった。永遠亭、次に来なさい。", cast: ["reimu", "sanae"] },
  ],
  eientei: [
    { speaker: "kaguya",  text: "少し遊びすぎたわね。月の策でなく、地上の意地に押し切られたわ。蓬莱の薬の名折れね、永琳。", cast: ["kaguya", "eirin"] },
    { speaker: "mokou",   text: "輝夜……負けたが、お前と肩を並べて戦ったのは妙な気分だった。1000年の恨みは……まあ、もう少し預ける。", cast: ["mokou", "kaguya"] },
    { speaker: "eirin",   text: "妹紅、お前を不老不死にした罪滅ぼしに、薬学を授けようか。月の薬じゃない、地の薬を。", cast: ["eirin", "mokou"] },
    { speaker: "sanae",   text: "奇跡を信じる勝負、私たちが上でした。次は地霊殿……心を読まれます。", cast: ["sanae", "youmu", "reimu"] },
  ],
  chireiden: [
    { speaker: "satori",  text: "読めても、止められない力がありますね。完敗です。心を持つということ、力でもあると今日学びました。", cast: ["satori", "koishi"] },
    { speaker: "yuugi",   text: "萃香！いい試合だった！次は地下で一杯やろう！萃集無能力もパンチングも、酒のつまみだったな！", cast: ["yuugi", "suika"] },
    { speaker: "utsuho",  text: "(神奈子に向かって) おかーさまから貰った力、ぜんぶ使ったのに負けちゃった……ごめんなさい。", cast: ["utsuho", "kanako", "satori"] },
    { speaker: "youmu",   text: "半霊は心を持たないと言ったが、皆の心が私を勝たせてくれた。半身に礼を言うべきは、こちら側だな。", cast: ["youmu", "reimu"] },
  ],
  myouren: [
    { speaker: "byakuren",  text: "敗北も修行。次に向けて、命蓮寺で皆を鍛え直しましょう。早苗、神道側の勝利、今日は素直に祝福します。", cast: ["byakuren", "shou", "sanae"] },
    { speaker: "shou",      text: "(ナズーリンに) 毘沙門天の眷属としても、敗北の重みを受け止めねば。命蓮寺、来年こそ。", cast: ["shou", "nazrin"] },
    { speaker: "ichirin",   text: "雲山、ありがとう。あなたの拳は最後まで止まらなかった。", cast: ["ichirin", "unzan"] },
    { speaker: "marisa",    text: "聖を倒した！残り神霊廟と反逆獣連合だぜ霊夢！", cast: ["marisa", "reimu", "suika"] },
  ],
  shinreibyo: [
    { speaker: "miko",   text: "この敗北、次の布石として受け取りましょう。十七条憲法、いずれサッカーにも条文を追加します。", cast: ["miko", "futo", "tojiko"] },
    { speaker: "futo",   text: "屠自古め、お前の雷鳴で皿陣が崩れた瞬間、まあ……協力したな。一度だけ礼を言うぞ、千四百年ぶりに。", cast: ["futo", "tojiko"] },
    { speaker: "tojiko", text: "(布都に) フ、ン。1400年ぶりの礼で気が抜けるとは、お前らしくないな布都。次は逆に私が敗ける番、ということだ。", cast: ["tojiko", "futo"] },
    { speaker: "suika",  text: "決勝に手が届いた！反逆獣、ぶっ飛ばすぞ霊夢！萃集無能力も全開だ！", cast: ["suika", "reimu", "marisa"] },
  ],
  rebel_beast: [
    { speaker: "shinmyoumaru", text: "くやしい……でも反逆はここからだよ。小さくても次は勝つ。覚えてなさい博麗の巫女！", cast: ["shinmyoumaru", "seija"] },
    { speaker: "seija",        text: "天邪鬼として『今日は負ける』と言うのが本来の私……ふん、敗北の天邪鬼、舐めるな。", cast: ["seija", "shinmyoumaru"] },
    { speaker: "yachie",       text: "組長として一礼。博麗神社、幻想郷の頂、お見事。獣連合、貴女方を認める。", cast: ["yachie", "shinmyoumaru", "kagerou"] },
    { speaker: "kagerou",      text: "(椛に向かって) 椛、白い狼と灰色の狼、結局は同じ月を見上げてるな。次は満月の夜に勝負だ。", cast: ["kagerou", "momiji"] },
  ],
};

// 因縁ペア (carrier_id|defender_id ソート済 string)
// 各 entry は 1-3 panel の短い掛け合い VN。 contact 時に確率で挿入。
const RIVALRY_DIALOGUES = {
  "reimu|remilia": [
    { speaker: "remilia", text: "博麗の巫女、紅霧異変の借りを今宵返す。運命ごと吹き飛ばしてあげる。", cast: ["reimu", "remilia"] },
    { speaker: "reimu",   text: "夜のうちに片付けないと、面倒くさい吸血鬼。あの時と同じ、結界で抑え込む。", cast: ["reimu", "remilia"] },
  ],
  "marisa|patchouli": [
    { speaker: "patchouli", text: "魔理沙……返却期限を 18 ヶ月過ぎてる本が、まだ我が館に大量にあるのよね。", cast: ["marisa", "patchouli"] },
    { speaker: "marisa",    text: "それを言うなって。研究中なんだぜ。今日はサッカーで利息を返す。", cast: ["marisa", "patchouli"] },
  ],
  "marisa|flandre": [
    { speaker: "flandre",   text: "魔理沙ー、お姉さまが言ってたよ。「あいつは私の友達」って。手加減してあげる！", cast: ["marisa", "flandre"] },
    { speaker: "marisa",    text: "おう、フランは可愛いから手加減してくれよな。レーヴァテインだけは勘弁な。", cast: ["marisa", "flandre"] },
  ],
  "marisa|meiling": [
    { speaker: "meiling",   text: "また門を勝手にすり抜けて図書館に行く気だな、魔理沙！今日は通さん！", cast: ["marisa", "meiling"] },
    { speaker: "marisa",    text: "美鈴、サッカーで真面目に守ろうとするの初めて見たぜ。きっと寝てたんだろ普段。", cast: ["marisa", "meiling"] },
  ],
  "sanae|kanako": [
    { speaker: "kanako",   text: "早苗、守矢の血脈、母の前で見せてごらん。神々しき御柱、ロングシュートで貫く。", cast: ["sanae", "kanako"] },
    { speaker: "sanae",    text: "神奈子様、子孫として恥ずかしくない走りをします。奇跡のスルーパス、神の上を行きます！", cast: ["sanae", "kanako"] },
  ],
  "sanae|suwako": [
    { speaker: "suwako",   text: "ケロケロ、早苗ちゃん、土着神は身軽だよー。ピョン！", cast: ["sanae", "suwako"] },
    { speaker: "sanae",    text: "諏訪子様、その身軽さで上を狙うのですね。私もボールを神の如く扱います！", cast: ["sanae", "suwako"] },
  ],
  "sanae|byakuren": [
    { speaker: "byakuren", text: "早苗、神道と仏教、今宵フィールドで決着しましょう。", cast: ["sanae", "byakuren"] },
    { speaker: "sanae",    text: "聖さん、宗教論争は試合後にしましょう。今は純粋にサッカーで挑みます。", cast: ["sanae", "byakuren"] },
  ],
  "kaguya|mokou": [
    { speaker: "mokou",   text: "輝夜……このピッチで千年の決着を。私の不死鳥ボレー、お前の永遠を断ち切る。", cast: ["kaguya", "mokou"] },
    { speaker: "kaguya", text: "妹紅、サッカーで歴史を変える気？永遠の夜の中で、お前は何度蘇るのかしら。", cast: ["kaguya", "mokou"] },
  ],
  "mokou|eirin": [
    { speaker: "mokou",  text: "永琳……お前を恨むのは 1000 年ほど前にやめた。だが今日は別だ。", cast: ["mokou", "eirin"] },
    { speaker: "eirin",  text: "妹紅、あの薬の罪は今もこの胸にある。せめてフィールドで償わせて。", cast: ["mokou", "eirin"] },
  ],
  "kaguya|eirin": [
    { speaker: "eirin",  text: "輝夜様、後ろは私が固めます。蓬莱の薬を一千年分、足腰に効かせてください。", cast: ["kaguya", "eirin"] },
    { speaker: "kaguya", text: "永琳、月の頃の話みたいね。あなたが居れば、夜は永遠よ。", cast: ["kaguya", "eirin"] },
  ],
  "suika|yuugi": [
    { speaker: "yuugi",  text: "萃香！四天王の鬼同士、フィールドで本気の角ぶつけ合おうじゃないか！", cast: ["suika", "yuugi"] },
    { speaker: "suika",  text: "勇儀！地下から出てきたな！萃集無能力で散らかしたあと、酒で乾杯だ！", cast: ["suika", "yuugi"] },
  ],
  "reimu|satori": [
    { speaker: "satori", text: "霊夢、次の動きが見えますよ……ふふ、心を読まれる気分はいかが？", cast: ["reimu", "satori"] },
    { speaker: "reimu",  text: "さとり、読めても止められないわよ。私の動きは私の心より速い。", cast: ["reimu", "satori"] },
  ],
  "marisa|satori": [
    { speaker: "satori", text: "魔理沙、次もマスタースパーク？読みやすすぎますよ。", cast: ["marisa", "satori"] },
    { speaker: "marisa", text: "読まれてもいいんだ。マスタースパークは光速、避けられないからな。", cast: ["marisa", "satori"] },
  ],
  "utsuho|kanako": [
    { speaker: "utsuho", text: "おかーさま！八咫烏の力、ぜんぶ使うね！核熱シュート、見ててね！", cast: ["utsuho", "kanako"] },
    { speaker: "kanako", text: "お空、その力は授けた私が責任を持って受け止める。お母さんの胸に飛び込んで来なさい。", cast: ["utsuho", "kanako"] },
  ],
  "byakuren|miko": [
    { speaker: "byakuren", text: "太子……仏教を排した道教者として、千年越しの遺恨があるけれど、今はピッチの上。", cast: ["byakuren", "miko"] },
    { speaker: "miko",     text: "聖、私は十七条で「和を以て貴しと為す」と書いた。フィールドの上では和を破ろう。", cast: ["byakuren", "miko"] },
  ],
  "byakuren|futo": [
    { speaker: "futo",     text: "仏教徒め、千四百年経ってもこの皿陣の前では止まるしかない！", cast: ["byakuren", "futo"] },
    { speaker: "byakuren", text: "布都、物部の名にかけてもサッカーは別物。仏の慈悲はフィールド外で。", cast: ["byakuren", "futo"] },
  ],
  "futo|tojiko": [
    { speaker: "futo",   text: "屠自古め、お前と組まされるのは 1400 年経っても気が進まんがな。", cast: ["futo", "tojiko"] },
    { speaker: "tojiko", text: "フ、ン。私もだ。だが太子様の御為だ、雷鳴ミドル、お前の頭上をかすめて飛ばすぞ。", cast: ["futo", "tojiko"] },
  ],
  "miko|futo": [
    { speaker: "miko",   text: "布都、皿陣の左を抑えて。屠自古の雷鳴を活かす道を作る。", cast: ["miko", "futo"] },
    { speaker: "futo",   text: "御意、太子様。物部一族、フィールドの上でも忠誠は揺るぎませぬ。", cast: ["miko", "futo"] },
  ],
  "miko|tojiko": [
    { speaker: "miko",   text: "屠自古、お前の感電シュートで決める。蘇我の名誉、ピッチで示せ。", cast: ["miko", "tojiko"] },
    { speaker: "tojiko", text: "太子様の御為、千年経っても変わりません。雷鳴、行きます。", cast: ["miko", "tojiko"] },
  ],
  "shinmyoumaru|reimu": [
    { speaker: "shinmyoumaru", text: "博麗の巫女！輝針城の異変では追い詰められたけど、今日はサッカーで反逆するよ！", cast: ["shinmyoumaru", "reimu"] },
    { speaker: "reimu",        text: "針妙丸、小槌で大きくならないように見張ってる。サッカーは小さい方が有利じゃないわよ。", cast: ["shinmyoumaru", "reimu"] },
  ],
  "shinmyoumaru|marisa": [
    { speaker: "marisa",       text: "針妙丸、その小槌、また見られるとはな。輝針城ぶりだぜ。", cast: ["shinmyoumaru", "marisa"] },
    { speaker: "shinmyoumaru", text: "魔理沙！あの時の仕返し、トリックシュートでGKを抜いてやる！", cast: ["shinmyoumaru", "marisa"] },
  ],
  "seija|reimu": [
    { speaker: "seija", text: "霊夢、天邪鬼に常識通用しないよ？私の動き、リバースだから読むの無駄。", cast: ["reimu", "seija"] },
    { speaker: "reimu", text: "正邪、常識じゃ動かない方が読みやすいわよ。逆を予想すればいいだけ。", cast: ["reimu", "seija"] },
  ],
  "seija|marisa": [
    { speaker: "seija",  text: "魔理沙ー、輝針城のあの仕打ち、忘れてないわよ。今日はひっくり返してやる。", cast: ["marisa", "seija"] },
    { speaker: "marisa", text: "リバースフェイント、面白いじゃん。だがマスタースパークは真っ直ぐだぜ。", cast: ["marisa", "seija"] },
  ],
  "kagerou|momiji": [
    { speaker: "kagerou", text: "椛、白い狼と灰色の狼、結局は同じ月を見上げてる。今夜は満月、本気だよ。", cast: ["kagerou", "momiji"] },
    { speaker: "momiji",  text: "影狼、白狼天狗の千里眼、お前の動きは全部見えてる。月の力に頼るなら、私の眼に頼られる。", cast: ["kagerou", "momiji"] },
  ],
  "aya|momiji": [
    { speaker: "aya",    text: "椛、新聞の取材中の判定は私にお任せ。あなたは後ろを固めて。", cast: ["aya", "momiji"] },
    { speaker: "momiji", text: "文先輩、その「取材」って言葉、走り回るための言い訳ですよね。", cast: ["aya", "momiji"] },
  ],
  "kanako|suwako": [
    { speaker: "kanako",  text: "諏訪子、御柱と土着神、守矢神社の二柱で 11 人を圧倒する。", cast: ["kanako", "suwako"] },
    { speaker: "suwako",  text: "ケロちゃん、ロングシュートとカエル跳び、コンビネーション決めようね。", cast: ["kanako", "suwako"] },
  ],
  "ringo|reisen": [
    { speaker: "ringo",  text: "鈴仙先輩！同じ月の兎として、私も負けません！", cast: ["ringo", "reisen"] },
    { speaker: "reisen", text: "鈴瑚、月から地上へ降りて来てなお団子を持ってるの、貴女くらいよ。狂気で行くわ。", cast: ["ringo", "reisen"] },
  ],
  "seiran|reisen": [
    { speaker: "seiran", text: "鈴仙先輩、月の戦士として、地上のスペル抜きで本気のドリブル見せます！", cast: ["seiran", "reisen"] },
    { speaker: "reisen", text: "清蘭、月の俊敏さ……月から見ていたあの頃と変わらないわね。", cast: ["seiran", "reisen"] },
  ],
  "youmu|murasa": [
    { speaker: "murasa", text: "妖夢、亡霊と半霊、海と地、似て非なるものね。沈没アンカーで沈めてあげる。", cast: ["youmu", "murasa"] },
    { speaker: "youmu",  text: "村紗、亡霊同士礼儀正しく勝負しよう。半霊と二人分で挑む。", cast: ["youmu", "murasa"] },
  ],
  "youmu|shinmyoumaru": [
    { speaker: "shinmyoumaru", text: "妖夢のお姉さま！その楼観剣、小槌でひっくり返してやる！", cast: ["youmu", "shinmyoumaru"] },
    { speaker: "youmu",        text: "針妙丸、剣と小槌、刃物 vs 玩具の図だな。だが斬る方が勝つ。", cast: ["youmu", "shinmyoumaru"] },
  ],
  "yuugi|byakuren": [
    { speaker: "yuugi",    text: "聖、地下の鬼が浮かれて出てきたぞ！パンチング、お経で止めてみるか？", cast: ["yuugi", "byakuren"] },
    { speaker: "byakuren", text: "勇儀、地下に閉じ込められていた頃の同志として、今日は本気でぶつかる。", cast: ["yuugi", "byakuren"] },
  ],
  "patchouli|sanae": [
    { speaker: "patchouli", text: "五行を司る私の前で、神道の祝詞がどこまで通用するか拝見しましょう。", cast: ["patchouli", "sanae"] },
    { speaker: "sanae",     text: "パチュリーさん、魔法と神術、ここで五分五分にしますよ！", cast: ["patchouli", "sanae"] },
  ],
};

function rivalryKey(a, b) {
  return [a.id, b.id].sort().join("|");
}

function findRivalryDialogue(a, b) {
  return RIVALRY_DIALOGUES[rivalryKey(a, b)] || null;
}

const STORY_ENDING = [
  { speaker: "reimu",    text: "幻想郷トーナメント、優勝。賞金で本殿の屋根が直せそうね。", cast: ["reimu", "marisa", "sanae"] },
  { speaker: "marisa",   text: "マスタースパーク何発撃ったかもう数えてないぜ。最高のサッカーだった。", cast: ["marisa", "youmu", "suika"] },
  { speaker: "sanae",    text: "守矢の名にもかけて、外の世界の競技を持ち込んだ意義、ありました！", cast: ["sanae", "kanako", "suwako"] },
  { speaker: "remilia",  text: "私たちも次は本気の本気を見せるわ。覚悟しておきなさい。", cast: ["remilia", "sakuya", "flandre", "patchouli"] },
  { speaker: "byakuren", text: "敗北を経て、次の修行が始まる。命蓮寺、再起します。", cast: ["byakuren", "shou", "ichirin", "murasa"] },
  { speaker: "miko",     text: "天命に逆らえぬが、次回大会では十七条の真の意味を見せよう。", cast: ["miko", "futo", "tojiko"] },
  { speaker: "shinmyoumaru", text: "今日の敗北は、明日の反逆だよ。覚えてなさい博麗の巫女！", cast: ["shinmyoumaru", "seija", "yachie", "kagerou"] },
  { speaker: "reimu",    text: "全員、また異変があれば呼んでね。今度は別の競技で。次回作にご期待ください。", cast: ["reimu", "marisa", "sanae", "youmu", "suika"] },
  { speaker: "marisa",   text: "  ─── 完 ─── 幻想郷フットボール協会 公認 / 制作: 博麗神社 / 開発: Claude × Stayg", cast: ["reimu", "marisa", "sanae", "youmu", "suika", "suwako", "kanako", "byakuren"] },
];


function mirrorSlot(slot) {
  return { x: 100 - slot.x, y: slot.y };
}

function formationSlots(formation, side) {
  const base = FORMATIONS[formation] || FORMATIONS["4-4-2"];
  const mirror = side === "away";
  const tactic = side === "home" ? TACTICS[(state.progress && state.progress.tactic) || "normal"] : TACTICS.normal;
  const offset = tactic.offset;
  const shiftX = (s, isGk) => ({ x: isGk ? s.x : clamp(s.x + offset, 8, 58), y: s.y });
  return {
    GK: base.GK.map((s) => (mirror ? mirrorSlot(shiftX(s, true)) : shiftX(s, true))),
    DF: base.DF.map((s) => (mirror ? mirrorSlot(shiftX(s, false)) : shiftX(s, false))),
    MF: base.MF.map((s) => (mirror ? mirrorSlot(shiftX(s, false)) : shiftX(s, false))),
    FW: base.FW.map((s) => (mirror ? mirrorSlot(shiftX(s, false)) : shiftX(s, false))),
  };
}

function redistributeForFormation(members, formationKey) {
  const formation = FORMATIONS[formationKey] || FORMATIONS["4-4-2"];
  const required = { GK: formation.GK.length, DF: formation.DF.length, MF: formation.MF.length, FW: formation.FW.length };
  const buckets = {
    GK: members.filter((m) => m.role === "GK"),
    DF: members.filter((m) => m.role === "DF"),
    MF: members.filter((m) => m.role === "MF"),
    FW: members.filter((m) => m.role === "FW"),
  };
  function promote(from, to, key) {
    while (buckets[from].length > required[from] && buckets[to].length < required[to]) {
      buckets[from].sort((a, b) => b.stats[key] - a.stats[key]);
      const promoted = buckets[from].shift();
      buckets[to].push({ ...promoted, role: to, originalRole: promoted.originalRole || promoted.role });
    }
  }
  function demote(from, to, key) {
    while (buckets[from].length > required[from] && buckets[to].length < required[to]) {
      buckets[from].sort((a, b) => a.stats[key] - b.stats[key]);
      const demoted = buckets[from].shift();
      buckets[to].push({ ...demoted, role: to, originalRole: demoted.originalRole || demoted.role });
    }
  }
  // 4-3-3 needs 3 MF + 3 FW (vs 4 MF + 2 FW): promote 1 MF→FW by shoot
  promote("MF", "FW", "shoot");
  // 3-5-2 needs 3 DF + 5 MF (vs 4 DF + 4 MF): promote 1 DF→MF by pass
  promote("DF", "MF", "pass");
  // Reverse direction for completeness (currently no formation needs it but future-proof)
  demote("FW", "MF", "shoot");
  demote("MF", "DF", "pass");
  return [...buckets.GK, ...buckets.DF, ...buckets.MF, ...buckets.FW];
}

function cloneTeam(team, side) {
  const userFormation = side === "home" ? (state.progress && state.progress.formation) || team.formation || "4-4-2" : team.formation || "4-4-2";
  const slots = formationSlots(userFormation, side);
  const usedSlots = { GK: 0, DF: 0, MF: 0, FW: 0 };
  const redistributed = redistributeForFormation(team.members, userFormation);
  return {
    ...team,
    side,
    formation: userFormation,
    players: redistributed.map((member) => {
      const roleSlots = slots[member.role] || slots.MF;
      const slot = roleSlots[usedSlots[member.role] % roleSlots.length];
      usedSlots[member.role] += 1;
      // XP boost: home 側 only、登録済み xp から stat ↑
      const xpInfo = (side === "home" && state.progress.playerXp && state.progress.playerXp[member.id]) || null;
      const boost = xpInfo ? Math.min((xpInfo.level - 1) * 2, 20) : 0;
      const boostedStats = boost > 0 ? Object.fromEntries(
        Object.entries(member.stats).map(([k, v]) => [k, Math.min(99, v + boost)])
      ) : member.stats;
      const guts = boostedStats.guts;
      return {
        ...member,
        stats: boostedStats,
        side,
        teamName: team.name,
        guts,
        maxGuts: guts,
        x: slot.x,
        y: slot.y,
        initialSlot: { x: slot.x, y: slot.y },
        xpLevel: xpInfo ? xpInfo.level : 1,
        xpTotal: xpInfo ? xpInfo.xp : 0,
        statBoost: boost,
      };
    }),
  };
}

const XP_TABLE = {
  goal: 60,
  save: 18,
  tackle: 12,
  intercept: 14,
  pass: 4,
  dribble: 4,
  spell: 8,
  ultimate: 16,
  win: 80,
};

function gainXp(player, key) {
  if (!player || player.side !== "home") return; // home roster のみ成長
  const amt = XP_TABLE[key] || 0;
  if (!amt) return;
  if (!state.progress.playerXp) state.progress.playerXp = {};
  if (!state.progress.playerXp[player.id]) state.progress.playerXp[player.id] = { xp: 0, level: 1 };
  const x = state.progress.playerXp[player.id];
  const oldLevel = x.level;
  x.xp += amt;
  x.level = 1 + Math.floor(x.xp / 100);
  if (x.level > oldLevel) {
    log(`✨ ${player.name} がレベル ${x.level} に成長！全ステ +${(x.level - 1) * 2} (cap +20)`);
  }
}

function rewardSpiritBonus() {
  if (state.progress.difficultyClears.hard) return DIFFICULTY_REWARDS.hard.spiritBonus;
  if (state.progress.difficultyClears.normal) return DIFFICULTY_REWARDS.normal.spiritBonus;
  if (state.progress.difficultyClears.easy) return DIFFICULTY_REWARDS.easy.spiritBonus;
  return 0;
}

function applyClearReward(team) {
  const bonus = rewardSpiritBonus();
  if (!bonus) return;
  team.players.forEach((player) => {
    player.maxGuts += bonus;
    player.guts += bonus;
  });
}

// 試合世代カウンタ。 画面遷移後に生き残った setTimeout / VN onComplete が
// 破棄済み or 別試合の battle を触るレースを防ぐためトークン照合に使う。
let matchSeq = 0;

// シード可能な乱数。 未シード(_rngState===null)時は Math.random で本番挙動を変えない。
// seedRng() でシードするとバランス検証/テストが決定的になる (mulberry32)。
let _rngState = null;
function seedRng(seed) { _rngState = (seed >>> 0) || 1; }
function clearRng() { _rngState = null; }
function rng() {
  if (_rngState === null) return Math.random();
  _rngState = (_rngState + 0x6D2B79F5) | 0;
  let t = Math.imul(_rngState ^ (_rngState >>> 15), 1 | _rngState);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// 演出速度。 standard=1 / fast=0.5 / instant=0.12 でタイマーを一括スケール。
function animScale() {
  // どの設定でも人間が追える範囲に。 旧 instant(0.12=8倍速)は blur なので緩和。
  return { normal: 1.15, fast: 0.75, instant: 0.5 }[(state.progress && state.progress.animSpeed) || "normal"] || 1.15;
}

function animMs(ms) {
  return Math.max(60, Math.round(ms * animScale()));
}

function scheduleAdvance(ms) {
  window.clearTimeout(state.advanceTimer);
  const gateId = ++state.advanceGateId;
  state.advanceTimer = window.setTimeout(() => {
    if (state.advanceGateId !== gateId) return;
    advancePlay();
  }, ms);
}

// インパクト保持/ヒットストップ専用。 下限を 120ms に引き上げ、 fast/instant でも「当たり」を潰さない。
function impactMs(ms) {
  return Math.max(120, Math.round(ms * animScale()));
}

// メッセージ送りゲート: 1 行動の結果を見せ、 進む入力 (またはauto) まで次の展開を止める。
// 人間が一手ずつ確実に把握できるようにするための要。
function gate() {
  state.advance = true;
  render();
  window.clearTimeout(state.advanceTimer);
  if (state.progress && state.progress.autoAdvance) {
    // auto トグル ON のときだけ、 読める速度で自動送り。
    scheduleAdvance(animMs(1100));
  }
}

function advancePlay() {
  // 入力 beat (GK選択/守備じゃんけん) で停止中は、 送りでは進めない (モーダルの選択で進む)。
  if (state.gkChoice || state.interrupt) return;
  // 多段演出シーケンス中は beat を1つ進める (送りボタン/Space/クリック 共通)。
  if (state.playSeq) {
    window.clearTimeout(state.advanceTimer);
    state.advanceGateId += 1;
    state.advance = null;
    advancePlaySeq();
    return;
  }
  if (!state.advance) return;
  window.clearTimeout(state.advanceTimer);
  state.advanceGateId += 1;
  state.advance = null;
  if (!state.match || state.match.finished) { render(); return; }
  if (state.match.possession === "away") {
    render();
    enemyTurn(); // 相手の 1 手 → 結果 → 再び gate
  } else {
    render(); // プレイヤーのコマンド待ち
  }
}

// ===== 多段演出シーケンサ (発動→過程→相手の対応→合否を 1手ずつメッセージ送りで見せる) =====
// 設計: 結果計算は即時 / 効果適用は最終(合否)beatまで遅延 / 自動消滅オーバーレイは beat 寿命に吸収。

// VS/cutin/crash/judge の自動消滅 timer を畳む (beat が寿命を握る)。
function cancelTransientOverlays() {
  [state.cutinTimer, state.cutinFrameTimer, state.vsScreenTimer, state.crashSceneTimer, state.judgeTimer]
    .forEach((t) => { if (t) window.clearTimeout(t); });
  state.cutin = null; state.vsScreen = null; state.crashScene = null; state.judge = null;
}

// beat 寿命のスペルカットイン (消滅 timer を張らず、 次 beat で差し替え)。 めくりアニメのみ継続。
function buildBeatCutin(name, player) {
  let frames = [];
  if (player && AVAILABLE_CUTINS.has(player.id)) frames = [cutinFramePath(player, 0), cutinFramePath(player, 1)];
  else if (player && AVAILABLE_PORTRAITS.has(player.id)) frames = [portraitPath(player)];
  const isUlti = typeof name === "string" && name.endsWith("真");
  state.cutin = { text: name, flavor: "", playerName: player ? player.name : "", isSpell: Boolean(player), frames, frameIndex: 0, fallback: frames[0] || "" };
  if (player) audio.play(isUlti ? "ultimate-charge" : "spell-charge");
  window.clearTimeout(state.cutinFrameTimer);
  if (frames.length > 1) {
    const flip = () => {
      if (!state.cutin) return;
      state.cutin.frameIndex = (state.cutin.frameIndex + 1) % state.cutin.frames.length;
      if (state.cutin.frameIndex === 1) audio.play(isUlti ? "ultimate-impact" : "spell-impact");
      render();
      state.cutinFrameTimer = window.setTimeout(flip, animMs(180));
    };
    state.cutinFrameTimer = window.setTimeout(flip, animMs(180));
  }
}

// 1 beat を画面へ反映 (単一 actionScene スロットを全置換)。
function showBeat(beat) {
  const s = beat.scene;
  setActionScene(s.type, s.attacker, s.defender, s.message, s.detail || "", s.outcome || "", s.phase || "result");
  if (state.actionScene) {
    state.actionScene.focus = s.focus || null;          // 上段CGで誰を主役にするか
    state.actionScene.forceAction = s.forceAction || null;
    if (s.shotKind) state.actionScene.shotKind = s.shotKind;
  }
  window.clearTimeout(state.vsScreenTimer); state.vsScreen = beat.vs || null;
  window.clearTimeout(state.crashSceneTimer); state.crashScene = beat.crash || null;
  if (beat.cutin) buildBeatCutin(beat.cutin.name, beat.cutin.player);
  else { window.clearTimeout(state.cutinFrameTimer); state.cutin = null; }
  (beat.se || []).forEach((k) => audio.play(k));
  if (beat.judge) showJudge(beat.judge);
  if (beat.hitstop) hitstop(beat.hitstop);
  if (beat.flash) screenFlash();
  if (beat.onEnter) beat.onEnter();
  render();
}

// シーケンス開始。
function runPlay(beats, applyFn, token) {
  cancelTransientOverlays();
  window.clearTimeout(state.advanceTimer);
  state.advanceGateId += 1;
  state.advance = null;
  state.battle = null;
  state.playSeq = { token, beats, i: -1, apply: applyFn || null, applied: false };
  advancePlaySeq();
}

// beat を1つ進める。 終端で効果適用→endTurn。 input beat で停止 (対話)。
function advancePlaySeq() {
  const ps = state.playSeq;
  if (!ps) return;
  if (!matchAlive(ps.token)) { state.playSeq = null; state.ballMotion = null; return; }
  ps.i += 1;
  if (ps.i >= ps.beats.length) {
    state.playSeq = null;
    state.ballMotion = null;
    if (ps.apply && !ps.applied) { ps.applied = true; ps.apply(); }
    // 合否beatの送りがターン終了の送りを兼ねる → 余分なゲートを挟まず次の展開へ。
    endTurnBookkeeping();
    if (!state.match || state.match.finished) { render(); return; }
    if (state.match.possession === "away") { render(); enemyTurn(); }
    else { render(); }
    return;
  }
  const beat = ps.beats[ps.i];
  // 合否(result) beat の直前で効果適用 (possession/score を最終beatで確定)。
  if (beat.scene.phase === "result" && ps.apply && !ps.applied) { ps.applied = true; ps.apply(); }
  showBeat(beat);
  // 対話 beat: その beat に到達したときだけモーダルを立てて停止 (事前表示しない)。
  if (beat.input === "gk") { if (beat.gk) state.gkChoice = beat.gk; render(); return; }
  if (beat.input === "interrupt") { if (beat.interrupt) state.interrupt = beat.interrupt; render(); return; }
  gateBeat(beat);
}

// beat 単位の送りゲート (既存 state.advance を流用=送りボタン/キー互換)。
function gateBeat(beat) {
  state.advance = true;
  window.clearTimeout(state.advanceTimer);
  state.advanceTimer = null;
  render();
  if (beat.auto !== false && state.progress && state.progress.autoAdvance) {
    scheduleAdvance(animMs(beat.ms || 1100));
  }
}

// 走行中シーケンスの末尾に beat を足して再開 (GK/じゃんけんの選択後)。
function resumePlaySeq(beats, applyFn) {
  if (!state.playSeq) return;
  state.playSeq.beats.push(...beats);
  if (applyFn) state.playSeq.apply = applyFn;
  advancePlaySeq();
}

// テスト用: playSeq を同期的に進める (入力 beat / 任意の停止条件で止める)。
if (typeof window !== "undefined") {
  window.__touhouSpellFutsalDrainSeq = function (opts = {}) {
    const max = opts.max || 40;
    let n = 0;
    while (state.playSeq && n < max) {
      if (state.gkChoice || state.interrupt) break;             // 入力待ちで停止
      if (opts.untilCrash && state.crashScene) break;
      advancePlaySeq();
      n += 1;
      if (opts.untilCrash && state.crashScene) break;
      if (opts.untilResult && state.actionScene && state.actionScene.phase === "result") break;
      if (opts.untilGoal && state.actionScene && state.actionScene.outcome === "goal") break;
    }
    return { playSeqActive: !!state.playSeq, gkChoice: !!state.gkChoice, outcome: state.actionScene && state.actionScene.outcome };
  };
}

// ゴール時の全画面白フラッシュ (CT3 の衝撃演出)。
function screenFlash() {
  state.screenFlash = true;
  window.clearTimeout(state.screenFlashTimer);
  state.screenFlashTimer = window.setTimeout(() => {
    state.screenFlash = false;
    render();
  }, animMs(420));
}

// ヒットストップ: 決着の瞬間に演出を一瞬止め、 体感強度を上げる (視覚のみ。 ロジックは進行)。
function hitstop(ms) {
  state.hitstop = true;
  audio.play("hitstop-cue");
  window.clearTimeout(state.hitstopTimer);
  state.hitstopTimer = window.setTimeout(() => {
    state.hitstop = false;
    render();
  }, impactMs(ms));
}

// 遅延コールバック内で「今もこの試合か」を照合するガード。
function matchAlive(token) {
  return Boolean(state.match) && !state.match.finished && state.match.matchToken === token;
}

// 画面遷移 / 試合開始時に保留中の全タイマーと一時オーバーレイを破棄する。
function cancelPendingTimers() {
  [
    state.vsScreenTimer,
    state.actionSceneTimer,
    state.judgeTimer,
    state.halftimeReportTimer,
    state.fieldShakeTimer,
    state.cutinTimer,
    state.cutinFrameTimer,
    state.hitstopTimer,
    state.crashSceneTimer,
    state.advanceTimer,
    state.screenFlashTimer,
  ].forEach((t) => { if (t) window.clearTimeout(t); });
  state.vsScreenTimer = null;
  state.actionSceneTimer = null;
  state.judgeTimer = null;
  state.halftimeReportTimer = null;
  state.fieldShakeTimer = null;
  state.cutinTimer = null;
  state.cutinFrameTimer = null;
  state.hitstopTimer = null;
  state.crashSceneTimer = null;
  state.advanceTimer = null;
  state.screenFlashTimer = null;
  state.hitstop = false;
  state.crashScene = null;
  state.advance = null;
  state.screenFlash = false;
  state.vsScreen = null;
  state.cutin = null;
  state.judge = null;
  state.fieldShake = false;
  state.halftimeReport = false;
  state.playSeq = null;
  state.ballMotion = null;
}

// VS 画面を出して一定時間後に消す処理を集約 (演出速度を一元適用)。
function showVsScreen(attacker, defender, label) {
  state.vsScreen = { attacker, defender, label };
  window.clearTimeout(state.vsScreenTimer);
  state.vsScreenTimer = window.setTimeout(() => { state.vsScreen = null; render(); }, animMs(740));
}

// 必殺技名は「キャラ名 + そのアクション」で必ず行動に一致させる
// (固有スペル player.spell はパス/ドリブル/シュートのどれか1つにしか合わないため、
//  技名はアクション準拠にし、 固有スペルはステータス/ギャラリーで見せる)。
const SPELL_MOVE_WORD = { dribble: "幻惑突破", pass: "電光スルーパス", shoot: "烈火シュート", team: "連携スペル" };

function characterSpellName(player, type) {
  return `${player.name}・${SPELL_MOVE_WORD[type] || "スペル"}`;
}

function characterUltimateName(player, type) {
  return `${characterSpellName(player, type)}・真`;
}

// 消耗ドラマ: 霊力が尽きかけると技のキレが鈍る (攻撃値への負補正)。
function fatiguePenalty(player) {
  const r = player.maxGuts > 0 ? player.guts / player.maxGuts : 1;
  if (r < 0.25) return 14;
  if (r < 0.5) return 6;
  return 0;
}

// 状況実況: ゴール時に点差・残ターン・文脈から煽り文を生成する。
function pushCommentary(text) {
  if (text) log(text);
}

function goalCommentary(scorer) {
  const m = state.match;
  const mine = m.score[scorer.side];
  const theirs = m.score[opponentSide(scorer.side)];
  const diff = mine - theirs;
  // 残り時間(分・概算)。 後半のロスタイム帯は「終了間際」。
  const left = m.half === 2 ? Math.max(0, 45 - m.clock) : (45 - m.clock) + 45;
  const inStoppage = m.clock > 45;
  const teamName = teamBySide(scorer.side).name;
  if ((inStoppage || (m.half === 2 && left <= 5)) && diff >= 0 && diff <= 1) return `📢 ${inStoppage ? "ロスタイム" : "終了間際"}! ${scorer.name}の決勝点級ゴールが突き刺さった!`;
  if (diff === 0) return `📢 ${scorer.name}が同点弾! ${teamName}が試合を振り出しに戻した!`;
  if (diff === 1 && theirs >= 1) return `📢 ${scorer.name}が勝ち越し! ${teamName}がリードを奪い返す!`;
  if (diff >= 3) return `📢 ${scorer.name}がダメ押し! ${teamName}が突き放す!`;
  if (m.half === 2 && left <= 12) return `📢 終盤、${scorer.name}が均衡を破った!`;
  return `📢 ${scorer.name}のゴール! ${teamName} ${mine}-${theirs} とする!`;
}

function startMatchCore(options = {}) {
  cancelPendingTimers();
  audio.ensure();
  audio.play("kick");
  audio.playBgm("normal");
  const homeId = options.homeTeamId || state.homeTeamId;
  const awayId = options.awayTeamId || state.awayTeamId;
  state.homeTeamId = homeId;
  state.awayTeamId = awayId;
  const home = cloneTeam(findTeam(homeId), "home");
  const away = cloneTeam(findTeam(awayId), "away");
  applyClearReward(home);
  const carrier = home.players.find((player) => player.role === "MF") || home.players[1];
  state.match = {
    matchToken: ++matchSeq,
    home,
    away,
    turn: 1,
    maxTurns: 30,
    // 原作CT3式の時間制: 前後半45分 + 隠しロスタイム (どれだけ延びるか不明=熱い)。
    half: 1,
    clock: 0,                                 // 当該ハーフの経過分 (0→45+ロスタイム)
    stoppage: 1 + Math.floor(rng() * 3),      // 前半ロスタイム 1-3分 (プレイヤーには非表示)
    score: { home: 0, away: 0 },
    possession: "home",
    carrierId: carrier.id,
    boost: 0,
    finished: false,
    winner: null,
    unlockedTeamId: null,
    rewardMessage: "",
    preMatchDialogue: preMatchDialogue(home, away),
    halftimeShown: false,
    rivalryShown: {},
    stats: {
      home: { shots: 0, passes: 0, dribbles: 0, tackles: 0, saves: 0, intercepts: 0, goals: 0, spellsUsed: 0 },
      away: { shots: 0, passes: 0, dribbles: 0, tackles: 0, saves: 0, intercepts: 0, goals: 0, spellsUsed: 0 },
    },
  };
  const bonus = rewardSpiritBonus();
  state.logs = [
    `${home.name} vs ${away.name}、キックオフ。${carrier.name}がボールを持った。`,
    ...(bonus ? [`制覇報酬で自チーム全員の初期霊力+${bonus}。`] : []),
  ];
  state.screen = "match";
  state.battle = null;
  state.cutin = null;
  state.actionScene = {
    type: "kickoff",
    title: "キックオフ",
    attacker: carrier,
    defender: nearestOpponent(carrier),
    message: `${carrier.name}がボールを持って攻撃開始。接触したらコマンド選択です。`,
    detail: "ドリブル / パス / シュート / 連携スペル",
    outcome: "",
    phase: "choice",
  };
  render();
}

function startMatch(options = {}) {
  // campaign mode で pre-match story がある場合は VN → match
  if (state.mode === "campaign" && state.campaign) {
    const awayId = options.awayTeamId || state.awayTeamId;
    const preStory = STORY_PRE[awayId];
    if (preStory && !options.skipStory) {
      startVn(preStory, `第${state.campaign.index + 1}試合 / ${findTeam(awayId).name}`, () => {
        startMatchCore(options);
      });
      return;
    }
  }
  startMatchCore(options);
}

function startCampaign() {
  const opponents = TEAMS.map((team) => team.id).filter((id) => id !== state.homeTeamId);
  state.mode = "campaign";
  state.campaign = {
    homeTeamId: state.homeTeamId,
    opponents,
    index: 0,
    wins: 0,
    storyShown: { opening: false },
  };
  // Opening VN を見せてから 1 試合目開始
  startVn(STORY_OPENING, "幻想郷トーナメント 開幕", () => {
    state.campaign.storyShown.opening = true;
    startMatch({ homeTeamId: state.homeTeamId, awayTeamId: opponents[0] });
  });
}

function nextCampaignMatch() {
  if (!state.campaign) return;
  audio.play("select");
  // 直前試合の勝利後 VN を先に見せる
  const justWonTeamId = state.campaign.opponents[state.campaign.index];
  const winStory = STORY_WIN[justWonTeamId];
  const advance = () => {
    state.campaign.index += 1;
    if (state.campaign.index >= state.campaign.opponents.length) {
      // 全試合制覇 → ending
      startVn(STORY_ENDING, "幻想郷トーナメント 優勝", () => {
        state.screen = "setup";
        state.logs = ["幻想郷フットボール異変を制覇。優勝旗を獲得した。"];
        render();
      });
      return;
    }
    startMatch({
      homeTeamId: state.campaign.homeTeamId,
      awayTeamId: state.campaign.opponents[state.campaign.index],
    });
  };
  if (winStory) {
    startVn(winStory, `${findTeam(justWonTeamId).name} 撃破`, advance);
  } else {
    advance();
  }
}

function findTeam(id) {
  return TEAMS.find((team) => team.id === id);
}

function teamCg(team) {
  return `./assets/team_cg/${team.id}.png`;
}

function portraitPath(player) {
  return `./assets/portraits/${player.id}.png`;
}

function cutinPath(player) {
  return `./assets/cutins/${player.id}.png`;
}

// スプライト風アニメ用フレーム: frame0 = 既存カットイン (タメ/詠唱)、 frame1 = {id}_b.png (放出/インパクト)。
function cutinFramePath(player, frame) {
  return frame >= 1 ? `./assets/cutins/${player.id}_b.png` : cutinPath(player);
}

function preMatchDialogue(home, away) {
  const data = PRE_MATCH_DIALOGUES[away.id] || {
    speaker: away.players[0].id,
    message: `${home.name}との一戦、こちらも全力で受けて立ちます。`,
  };
  const speaker = away.players.find((player) => player.id === data.speaker) || away.players[0];
  return { speaker, message: data.message };
}

function allRosterPlayers() {
  return TEAMS.flatMap((team) => team.members.map((member) => ({ ...member, teamName: team.name, teamId: team.id, side: "home" })));
}

function renderPortrait(player, extraClass = "") {
  const image = AVAILABLE_PORTRAITS.has(player.id)
    ? `<img src="${portraitPath(player)}" alt="${player.name}" />`
    : "";
  return `
    <div class="portrait ${player.side} ${extraClass}">
      ${image}
      <span>${player.name.slice(0, 1)}</span>
    </div>
  `;
}

function renderCutin() {
  const cutin = state.cutin;
  if (!cutin) return "";
  const frames = (cutin.frames && cutin.frames.length) ? cutin.frames : (cutin.fallback ? [cutin.fallback] : []);
  const src = frames[cutin.frameIndex] || cutin.fallback || "";
  // frameB ({id}_b.png) 未生成のキャラは onerror で frame0 にフォールバックし破綻させない。
  const imageMarkup = src
    ? `<img src="${src}" alt="${cutin.playerName || cutin.text}" data-frame="${cutin.frameIndex}" onerror="this.onerror=null;this.src='${cutin.fallback || src}'" />`
    : "";
  const variant = cutin.isAction ? "action-cutin" : (cutin.isSpell ? "spell-cutin" : "quick-cutin");
  return `
    <div class="cutin ${variant} ${cutin.frameIndex >= 1 ? "cutin-impact" : ""}">
      ${cutin.isSpell ? `
        <div class="speed-bg"></div>
        <div class="grass-slope"></div>
        <div class="spell-frame"></div>
        <div class="spell-burst"></div>
        <div class="spell-scanline"></div>
      ` : ""}
      ${imageMarkup}
      <div class="cutin-shade"></div>
      <div class="cutin-copy">
        ${cutin.isSpell ? `<span class="spell-banner">SPELL CARD</span>` : ""}
        ${cutin.playerName ? `<strong>${cutin.playerName}</strong>` : ""}
        <span class="spell-name">${cutin.text}</span>
        ${cutin.flavor ? `<span class="spell-flavor">${cutin.flavor}</span>` : ""}
      </div>
    </div>
  `;
}

// 行動の主役キャラと動作 → そのキャラの動作CG (assets/actions)。
// 動作別のコマ数 (生成側 FRAME_BUDGET と一致)。 ドリブルは走りで 3、 シュート/パスは 2、 守備は 1。
const ACTION_FRAME_COUNT = {
  dribble: 3, pass: 2, shoot: 2, block: 1, intercept: 2, tackle: 3, contest: 2, save: 3,
  header: 3, overhead: 3, volley: 3, diving_header: 3,
};

// 空中シュートの種別ラベル。
const AERIAL_LABEL = { header: "ヘディングシュート", overhead: "オーバーヘッドキック", volley: "ボレーシュート", diving_header: "ダイビングヘッド" };

// 空中球のシュート種別をゴールまでの距離で選ぶ (近=ヘディング/オーバーヘッド、 中=ボレー、 遠=ボレー/ダイビングヘッド)。
function pickAerialShot(p) {
  const gd = goalDistance(p);
  if (gd <= 12) return rng() < 0.35 ? "overhead" : "header";
  if (gd <= 26) return rng() < 0.45 ? "volley" : "header";
  return rng() < 0.6 ? "volley" : "diving_header";
}

// scene から「主役キャラ」と「動作名」を決める。 シュート阻止は GK の save。
function actionActor(scene) {
  // beat が主役/動作を明示指定していればそれに従う (多段演出)。
  if (scene.focus && scene.forceAction) {
    return { actor: scene.focus === "defender" ? scene.defender : scene.attacker, action: scene.forceAction };
  }
  const ok = scene.outcome === "success" || scene.outcome === "goal";
  // 開けたドリブル(stepCarrier)は対決でなく走り。 常に保持者のドリブル姿。
  if (scene.type === "dribble") return { actor: scene.attacker, action: "dribble" };
  if (scene.type === "pass") return { actor: ok ? scene.attacker : scene.defender, action: ok ? "pass" : "intercept" };
  if (scene.type === "shoot") {
    // 高低別シュート: scene.shotKind があればそれを使う (header/overhead/volley/diving_header)。
    const kind = ok ? (scene.shotKind || "shoot") : "save";
    return { actor: ok ? scene.attacker : scene.defender, action: kind };
  }
  return { actor: null, action: null };
}

function actionCGSrc(scene) {
  const { actor, action } = actionActor(scene);
  if (!actor || !action) return "";
  return `./assets/actions/${actor.id}_${action}.png`;
}

// 動作 → 汎用スプライト(assets/anim) のフォールバック種別。
const GENERIC_ANIM_FOR = { dribble: "dribble", tackle: "tackle", pass: "pass", shoot: "shoot", intercept: "intercept", save: "gk_save" };
// 未生成動作は「意味の近い既存動作CG」へフォールバック (空中シュート→shoot 等)。 破綻より関連ポーズ。
const FALLBACK_ACTION = { volley: "shoot", header: "shoot", overhead: "shoot", diving_header: "shoot", save: "block", contest: "tackle", block: "tackle", intercept: "tackle" };

// 欠損画像の追跡 + フォールバック前進 (再render時の 404 連打を抑える)。
if (typeof window !== "undefined") {
  window.__imgMiss = window.__imgMiss || new Set();
  window.__imgFallback = function (img) {
    try {
      window.__imgMiss.add(img.getAttribute("src"));
      const chain = JSON.parse(img.getAttribute("data-chain") || "[]");
      const next = chain.find((s) => !window.__imgMiss.has(s));
      if (next && next !== img.getAttribute("src")) { img.src = next; }
      else { img.onerror = null; img.style.display = "none"; }
    } catch (e) { img.onerror = null; img.style.display = "none"; }
  };
}

// 1コマ分の <img>。 候補チェーン(frame→単体CG→代替動作CG→汎用)を順に試し、
// 既知の欠損(window.__imgMiss)は飛ばして再render時の404スパム/画像破綻を防ぐ。
function actionFrameImg(actor, action, i, cls) {
  const alt = FALLBACK_ACTION[action];
  const gtype = GENERIC_ANIM_FOR[action] || (alt && GENERIC_ANIM_FOR[alt]) || "shoot";
  const chain = [`./assets/actions/${actor.id}_${action}_${i}.png`, `./assets/actions/${actor.id}_${action}.png`];
  if (alt) chain.push(`./assets/actions/${actor.id}_${alt}_1.png`);
  chain.push(`./assets/anim/${gtype}_1.png`);
  const miss = (typeof window !== "undefined" && window.__imgMiss) || null;
  const start = (miss && chain.find((s) => !miss.has(s))) || chain[0];
  return `<img class="hf ${cls}" src="${start}" alt="" data-chain='${JSON.stringify(chain)}' onerror="window.__imgFallback&&window.__imgFallback(this)" />`;
}

function actionFlipImgs(actor, action) {
  const n = ACTION_FRAME_COUNT[action] || 1;
  let imgs = "";
  for (let i = 1; i <= n; i++) imgs += actionFrameImg(actor, action, i, `hf${i}`);
  return imgs;
}

// ボール別スプライトの挙動クラス。 CG にはボールを焼き込まないので、 ここで重ねて動かす。
function ballClassFor(action) {
  if (action === "dribble") return "ball-foot";          // 足元で転がる
  if (["pass", "shoot", "volley", "overhead", "header", "diving_header"].includes(action)) return "ball-fly"; // 飛行
  if (action === "save") return "ball-save";             // GK の正面へ
  return "";
}

// 競り合い(1対1): 両者の CG を回転しながらカットイン → 勝者が敗者を吹っ飛ばす。
// 勝者=攻撃成功なら carrier(ドリブル突破)、 失敗なら defender(スライディングタックル)。
function contestArenaHtml(scene) {
  const attWon = scene.outcome === "success" || scene.outcome === "goal";
  const att = scene.attacker, def = scene.defender;
  if (!att || !def) return "";
  const attAction = attWon ? "dribble" : "contest";
  const defAction = attWon ? "contest" : "tackle";
  const attRole = attWon ? "winner" : "loser";
  const defRole = attWon ? "loser" : "winner";
  const winnerSide = attWon ? "left" : "right";
  // 勝者は決めポーズの中盤コマ (タックルは滑り込みの 2コマ目)。
  const attImg = actionFrameImg(att, attAction, attAction === "dribble" ? 2 : 1, "cf-img");
  const defImg = actionFrameImg(def, defAction, defAction === "tackle" ? 2 : 1, "cf-img");
  return `
    <div class="contest-arena">
      <div class="contest-fighter left ${attRole} act-${attAction}">${attImg}<span class="cf-name">${att.name}</span></div>
      <div class="contest-fighter right ${defRole} act-${defAction}">${defImg}<span class="cf-name">${def.name}</span></div>
      <div class="clash-flash"></div>
      <div class="hero-ball ball-foot contest-ball ${winnerSide}"><span class="ball-icon">⚽</span></div>
    </div>`;
}

// 3コマフリップブック (パラパラ躍動) + ボール別スプライト。
// 競り合い/ドリブル対決は両者カットインのアリーナ表示。
function actionHeroHtml(scene) {
  if (scene.type === "contest") return contestArenaHtml(scene);
  const { actor, action } = actionActor(scene);
  if (!actor || !action) return "";
  const n = ACTION_FRAME_COUNT[action] || 1;
  const imgs = actionFlipImgs(actor, action);
  const ballCls = ballClassFor(action);
  const ball = ballCls ? `<div class="hero-ball ${ballCls}"><span class="ball-icon">⚽</span></div>` : "";
  return `<div class="action-hero flip-${n}">${imgs}${ball}</div>`;
}

// 下段中央: メッセージ枠のみ (CG は上段 .field-cg が actionHeroHtml で表示)。
// .action-scene class とテキストはテスト互換のため温存。
function renderActionScene() {
  const scene = state.actionScene;
  if (!scene) return "";
  const phaseLabel = scene.phase === "choice" ? "COMMAND" : scene.phase === "flow" ? "PLAY" : scene.phase === "move" ? "DRIBBLE" : "RESULT";
  // 実機CT3 メッセージ窓: 左に話者の丸顔ドットアイコン + ギザギザ吹き出し(白二重枠)。
  const speaker = scene.focus === "defender" ? scene.defender : scene.attacker;
  return `
    <div class="action-scene ${scene.type} ${scene.outcome || ""}">
      <div class="vn-msg-wrap">
        ${speaker ? `<div class="msg-face">${renderPortrait(speaker, "msg-face-portrait")}</div>` : ""}
        <div class="vn-box jagged">
          <div class="vn-name">${phaseLabel} / ${scene.title}</div>
          <p>${scene.message}</p>
          ${scene.detail ? `<div class="vn-detail">${scene.detail}</div>` : ""}
          ${state.advance ? `<div class="vn-advance-hint">▼ クリック / Space で次へ</div>` : ""}
        </div>
      </div>
    </div>
  `;
}

// 実機CT3 中央カラム: 局面ラベル(みかたOF/てきDF) + 関係者名の小ボックス。
// エンカウント/対決中は てきDF[守備者] + みかたOF[アクション]、 通常は保持者の局面。
function renderCt3MatchupBox(scene, carrier, defender) {
  const m = state.match;
  const onoff = (side, off) => `${side === "home" ? "みかた" : (off ? "あいて" : "てき")} ${off ? "OF" : "DF"}`;
  const inDuel = scene && (scene.phase === "flow" || scene.phase === "result") && scene.defender && scene.attacker;
  if (inDuel) {
    return `
      <div class="ct3-matchup">
        <div class="ct3-mu-col">
          <div class="ct3-mu-label">${onoff(scene.defender.side, false)}</div>
          <div class="ct3-box ct3-mu-box">${scene.defender.name}</div>
        </div>
        <div class="ct3-mu-col">
          <div class="ct3-mu-label">${onoff(scene.attacker.side, true)}</div>
          <div class="ct3-box ct3-mu-box">${scene.title || scene.attacker.name}</div>
        </div>
      </div>
    `;
  }
  return `
    <div class="ct3-matchup single">
      <div class="ct3-mu-col">
        <div class="ct3-mu-label">${onoff(m.possession, true)}</div>
        <div class="ct3-box ct3-mu-box">${carrier ? carrier.name : ""}</div>
      </div>
    </div>
  `;
}

// 得点者の掛け声 (実機CT3 のゴール演出は GOAL ロゴでなく顔アップ叫び+掛け声)。
// render毎の乱数flickerを避けるため得点合計で固定。
const GOAL_SHOUTS = ["ゴオオオル!!", "ねじ込んだあああ!!", "決まったあああ!!", "ぶち抜いたあああ!!", "うわあああ 入った!!"];
function goalShout(p) {
  const m = state.match;
  return `${p.name}、${GOAL_SHOUTS[(m.score.home + m.score.away) % GOAL_SHOUTS.length]}`;
}

// ゴール演出: 実機CT3=赤レターボックス帯 + 白水平スピード線 + 得点者の顔アップ叫び + 掛け声。
// (GOAL ロゴは原作に無いので廃止。 赤い全面カット+絶叫で爽快感と視認性を両立。)
function renderGoalBanner(scene) {
  const m = state.match;
  const scorer = scene.attacker;
  const face = `./assets/cutins/${scorer.id}.png`;
  const fallback = `./assets/portraits/${scorer.id}.png`;
  return `
    <div class="goal-banner">
      <div class="goal-speedlines"></div>
      <div class="goal-band">
        <img class="goal-face" src="${face}" alt="${scorer.name}" onerror="this.onerror=null;this.src='${fallback}'" />
        <div class="goal-shout-wrap">
          <div class="goal-shout">${goalShout(scorer)}</div>
          <div class="goal-score"><b>${m.score.home}</b><span>-</span><b>${m.score.away}</b></div>
          <div class="goal-by">${scorer.role} ${scorer.name}　${scorer.side === "home" ? m.home.name : m.away.name}</div>
        </div>
      </div>
    </div>
  `;
}

// 実機CT3 の歓喜カット (赤フラッシュの直後): スタジアム帯で得点者+味方がガッツポーズ + ★ + 看板色帯。
function renderCelebrateBanner(scene) {
  const m = state.match;
  const scorer = scene.attacker;
  const face = `./assets/cutins/${scorer.id}.png`;
  const fb = `./assets/portraits/${scorer.id}.png`;
  // 同チームの味方を2名ほど歓喜の脇役に。
  const mates = (scorer.side === "home" ? m.home.players : m.away.players).filter((p) => p.id !== scorer.id).slice(0, 2);
  const mateImgs = mates.map((p) => `<img class="celebrate-mate" src="./assets/portraits/${p.id}.png" alt="" onerror="this.style.display='none'" />`).join("");
  return `
    <div class="celebrate-banner">
      <div class="celebrate-band">
        <div class="celebrate-crowd"></div>
        <div class="celebrate-ad">★ TECMO ★</div>
        <div class="celebrate-figs">
          ${mateImgs}
          <img class="celebrate-hero" src="${face}" alt="${scorer.name}" onerror="this.onerror=null;this.src='${fb}'" />
        </div>
      </div>
    </div>
  `;
}

// 実機CT3 シュートvsGKの背後ローアングルPOV (POV-A): 手前に守備の背中シルエットを大きく並べ、
// 奥の主役は小さく見せて遠近を強調。 専用CG素材が無いので頭+肩のCSSシルエットで近似。
function renderPovForeground() {
  // 手前に4人ぶんの背中シルエット (左右に見切れ、 中央2人が大きい)。
  // 生成済みの背中ビューCG(assets/ui/pov_df_*)があれば暗転して使い、 無ければCSSシルエットにフォールバック。
  const fig = (i) => `<div class="pov-fig f${i}"><img class="pov-fig-img" src="./assets/ui/pov_df_${i}.png" alt="" onload="this.parentElement.classList.add('img-ok')" onerror="this.style.display='none'" /></div>`;
  return `
    <div class="pov-foreground">
      ${fig(0)}${fig(1)}${fig(2)}${fig(3)}
    </div>
  `;
}

// CT3 右カラムの保持者ステータス (相手ターン中など、 コマンドを出さないときに表示)。
function renderCarrierStatBox(p) {
  if (!p) return "";
  return `
    <div class="ct3-stat">
      <div class="ct3-stat-name">${p.role} ${p.name}</div>
      <div class="ct3-stat-row"><span>ガッツ</span><b>${p.guts}</b></div>
      <div class="ct3-stat-row"><span>ドリブル</span><b>${p.stats.dribble}</b></div>
      <div class="ct3-stat-row"><span>パス</span><b>${p.stats.pass}</b></div>
      <div class="ct3-stat-row"><span>シュート</span><b>${p.stats.shoot}</b></div>
    </div>
  `;
}

function allPlayers() {
  const match = state.match;
  return [...match.home.players, ...match.away.players];
}

function getCarrier() {
  return allPlayers().find((player) => player.id === state.match.carrierId);
}

function teamBySide(side) {
  return state.match[side];
}

function opponentSide(side) {
  return side === "home" ? "away" : "home";
}

function log(message) {
  state.logs.unshift(message);
  state.logs = state.logs.slice(0, 40);
  // プレイバイプレイをコンソールにも出力 (開発時に流れを追う/デバッグ用)。
  try { console.log("⚽", message); } catch (_e) {}
}

function actionTitle(type) {
  return {
    dribble: "ドリブル突破",
    pass: "パス展開",
    oneTwo: "ワンツー",
    shoot: "シュート勝負",
    team: "連携スペル",
  }[type] || "コマンド";
}

// 実機CT3 タイマー: 局面ラベル「1ST/2ND」。
function halfLabel(m) {
  return m.half === 1 ? "1ST" : "2ND";
}

// 実機CT3 = 前後半30分。 各ハーフをこの分数からカウントダウン表示。
const HALF_MIN = 30;

// 黄7セグ表示用の MM:00 (実機CT3=カウントダウン)。 ロスタイム中は 0:00 を点滅(残量は伏せる=いつ終わるか不明)。
function clockTime(m) {
  const remain = HALF_MIN - m.clock;
  if (remain <= 0) return "0:00";
  return `${String(remain).padStart(2, "0")}:00`;
}

// 互換: ログ/ハーフタイム等の文中表示用 (例: "1ST 22:00 ロスタイム")。
function clockLabel(m) {
  const stop = m.clock >= HALF_MIN ? " ロスタイム" : "";
  return `${halfLabel(m)} ${clockTime(m)}${stop}`;
}

// 実機CT3 のチーム識別色 (レーダーのドットと統一: home=紅 / away=青)。
function teamColor(side) {
  return side === "home" ? "#e25a5a" : "#5a8ae0";
}

function setActionScene(type, attacker, defender, message, detail = "", outcome = "", phase = "result") {
  const direction = attacker.side === "home" ? "右ゴールへ攻撃" : "左ゴールへ攻撃";
  state.actionScene = {
    type,
    title: actionTitle(type),
    attacker,
    defender,
    message,
    detail: detail ? `${direction} / ${detail}` : direction,
    outcome,
    phase,
  };
}

function nearestOpponent(player) {
  if (!player) return null;
  const opponents = teamBySide(opponentSide(player.side)).players;
  const outfield = opponents
    .filter((opponent) => opponent.role !== "GK")
    .map((opponent) => ({ opponent, d: distance(player, opponent) }))
    .sort((a, b) => a.d - b.d)[0];
  return outfield ? outfield.opponent : (opponents[0] || null);
}

function nearestMateAhead(player) {
  const dir = player.side === "home" ? 1 : -1;
  return teamBySide(player.side).players
    .filter((mate) => mate.id !== player.id && mate.role !== "GK" && (mate.x - player.x) * dir > -4)
    .map((mate) => ({ mate, forward: (mate.x - player.x) * dir, d: distance(player, mate) }))
    .sort((a, b) => (b.forward - a.forward) || (a.d - b.d))[0]?.mate
    || teamBySide(player.side).players.find((mate) => mate.id !== player.id && mate.role !== "GK");
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// 原作の「ゴールデンコンビ」翻案: 特定ペアのワンツーは威力ボーナス。
const COMBO_PAIRS = [
  ["reimu", "marisa"], ["lunasa", "merlin"], ["lunasa", "lyrica"], ["merlin", "lyrica"],
  ["sakuya", "remilia"], ["sanae", "kanako"], ["youmu", "kasen"], ["suika", "yuugi"],
  ["nitori", "momiji"], ["satori", "orin"], ["byakuren", "ichirin"], ["miko", "futo"],
];
function isComboPair(a, b) {
  if (!a || !b) return false;
  return COMBO_PAIRS.some(([x, y]) => (a.id === x && b.id === y) || (a.id === y && b.id === x));
}

// 点 p から線分 a-b への最短距離 (パスの導線=ボール軌道に対する近さ判定用)。
function distToSegment(p, a, b) {
  const vx = b.x - a.x, vy = b.y - a.y;
  const len2 = vx * vx + vy * vy;
  if (len2 === 0) return distance(p, a);
  let t = ((p.x - a.x) * vx + (p.y - a.y) * vy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * vx), p.y - (a.y + t * vy));
}

// パスの遮断者 = 保持者→受け手の線分(ボール軌道)に最も近い敵。 線から遠い敵はカットできない。
function passInterceptor(from, to) {
  const opps = teamBySide(opponentSide(from.side)).players.filter((p) => p.role !== "GK");
  let best = null;
  for (const p of opps) {
    const d = distToSegment(p, from, to);
    if (!best || d < best.laneDist) best = { p, laneDist: d };
  }
  return best || { p: nearestOpponent(from), laneDist: 99 };
}

function goalDistance(player) {
  return player.side === "home" ? 100 - player.x : player.x;
}

function spend(player, cost) {
  player.guts = Math.max(0, player.guts - cost);
}

function recoverTeam(side, amount) {
  teamBySide(side).players.forEach((player) => {
    player.guts = Math.min(player.maxGuts, player.guts + amount);
  });
}

function roll(base, variance = 24) {
  return base + Math.floor(rng() * variance);
}

function difficultyModifier(side) {
  if (side !== "away") return 0;
  return { easy: -10, normal: 0, hard: 12 }[state.progress.difficulty] || 0;
}

function actionSpellName(player, type) {
  if (type === "shoot") return `${player.name} 弾幕シュート`;
  if (type === "pass") return `${player.name} 霊脈パス`;
  if (type === "dribble") return `${player.name} 幻走ドリブル`;
  if (type === "team") return `${teamBySide(player.side).name} 連携スペル`;
  return player.spell;
}

function setDifficulty(difficulty) {
  state.progress.difficulty = difficulty;
  saveProgress();
}

function clearRewardLabels() {
  return Object.entries(DIFFICULTY_REWARDS)
    .filter(([difficulty]) => state.progress.difficultyClears[difficulty])
    .map(([, reward]) => reward.label);
}

const VS_LABELS = {
  dribble: "DRIBBLE BREAK",
  pass: "PASS PLAY",
  oneTwo: "ONE-TWO",
  shoot: "SHOOT vs GK",
  team: "TEAM SPELL",
};

function openPassPicker() {
  const carrier = getCarrier();
  if (!carrier) return;
  const mates = teamBySide(carrier.side).players
    .filter((m) => m.id !== carrier.id && m.role !== "GK")
    .map((m) => {
      const forward = (m.x - carrier.x) * (carrier.side === "home" ? 1 : -1);
      return { ...m, forward, d: distance(carrier, m) };
    })
    .sort((a, b) => b.forward - a.forward)
    .slice(0, 4)
    .map((m) => ({ ...m, successRate: calcPassRate(carrier, m) }));
  state.passPicker = { candidates: mates };
  audio.play("encounter");
  render();
}

function calcPassRate(from, to) {
  // 導線(ボール軌道)に近い遮断者ほどカット力が高い。 線から遠ければほぼ通る。
  const intc = passInterceptor(from, to);
  const def = intc.p ? intc.p.stats.block + intc.p.stats.speed * 0.2 - intc.laneDist * 1.6 : 0;
  const atk = from.stats.pass;
  return clamp(0.5 + (atk - def) / 60, 0.08, 0.97);
}

function selectPassTarget(index) {
  const picker = state.passPicker;
  if (!picker || !picker.candidates[index]) return;
  const target = picker.candidates[index];
  state.passPicker = null;
  const carrier = getCarrier();
  if (!carrier) return;
  // カット役は「保持者→受け手の導線(ボール軌道)に最も近い敵」。 線から外れた敵はカットしない。
  const intc = passInterceptor(carrier, target);
  const defender = intc.p;
  if (!defender) return;
  state.battle = {
    type: "pass",
    carrierId: carrier.id,
    defenderId: defender.id,
    passTargetId: target.id,
    laneDist: intc.laneDist,
  };
  showVsScreen(carrier, defender, VS_LABELS.pass);
  setActionScene("pass", carrier, defender, `${target.name}へパスを狙う。`, "通常かスペルを選択", "", "choice");
  audio.play("battle");
  render();
}

function renderPassPicker() {
  if (!state.passPicker) return "";
  const carrier = getCarrier();
  const cx = carrier ? carrier.x : 50;
  const cy = carrier ? carrier.y : 50;
  return `
    <div class="pass-picker-overlay">
      <svg class="pass-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${state.passPicker.candidates.map((p) => {
          const r = p.successRate;
          const col = r > 0.6 ? "#7ee08a" : r > 0.35 ? "#f0d058" : "#e06a6a";
          return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="${col}" stroke-width="0.7" stroke-dasharray="2.4 1.6" />`;
        }).join("")}
      </svg>
      ${state.passPicker.candidates.map((p, i) => `
        <div class="pass-target-badge" data-index="${i}" style="left:${p.x}%;top:${p.y}%;">
          <span class="ptb-num">${i + 1}</span>
          <span class="ptb-name">${p.name}</span>
          <span class="ptb-rate">${Math.round(p.successRate * 100)}%</span>
        </div>
      `).join("")}
      <div class="pass-picker-hint">パス先を選ぶ (1-${state.passPicker.candidates.length} or クリック / Esc キャンセル)</div>
    </div>
  `;
}

function openBattle(type, skipRivalry = false) {
  if (!state.match || state.match.finished) return;
  if (type === "pass" && state.match.possession === "home" && !state.battle) {
    // home の pass はピッカーを開く (但し rivalry VN 復帰時はスキップ)
    openPassPicker();
    return;
  }
  const carrier = getCarrier();
  // pass は受け手への導線(ボール軌道)に近い敵をカット役にする (away/AI も同様)。
  let passExtra = {};
  let defender = null;
  if (carrier) {
    if (type === "shoot") {
      defender = teamBySide(opponentSide(carrier.side)).players.find((player) => player.role === "GK");
    } else if (type === "pass") {
      const receiver = nearestMateAhead(carrier);
      const intc = passInterceptor(carrier, receiver);
      defender = intc.p;
      if (receiver) passExtra = { passTargetId: receiver.id, laneDist: intc.laneDist };
    } else if (type === "oneTwo") {
      // ワンツー: 壁役=前方の味方。 行き(保持者→壁)導線の敵がカット役。
      const wall = nearestMateAhead(carrier);
      const intc = wall ? passInterceptor(carrier, wall) : { p: nearestOpponent(carrier), laneDist: 99 };
      defender = intc.p || nearestOpponent(carrier);
      if (wall) passExtra = { wallId: wall.id, laneDist: intc.laneDist };
    } else {
      defender = nearestOpponent(carrier);
    }
  }
  // carrier / defender が解決できない (試合差し替え等) なら何もしない。
  if (!carrier || !defender) return;
  // 因縁掛け合い VN (1 試合 1 ペア 1 回まで、 50% 確率)
  if (!skipRivalry && state.match && state.match.rivalryShown) {
    const key = rivalryKey(carrier, defender);
    const dialogue = findRivalryDialogue(carrier, defender);
    if (dialogue && !state.match.rivalryShown[key] && rng() < 0.5) {
      state.match.rivalryShown[key] = true;
      const token = state.match.matchToken;
      audio.play("encounter");
      startVn(dialogue, `因縁: ${carrier.name} vs ${defender.name}`, () => {
        if (!matchAlive(token)) return; // VN 中に試合差し替え / 終了したら通常 flow に戻さない
        openBattle(type, true); // 通常 flow へ
      });
      return;
    }
  }
  audio.play("battle");
  audio.play("encounter");
  state.battle = { type, carrierId: carrier.id, defenderId: defender.id, ...passExtra };
  showVsScreen(carrier, defender, VS_LABELS[type] || "VS");
  setActionScene(type, carrier, defender, battleText(type, carrier, defender), "通常かスペルを選択", "", "choice");
  render();
}

function renderVsScreen() {
  const vs = state.vsScreen;
  if (!vs) return "";
  const attImg = AVAILABLE_PORTRAITS.has(vs.attacker.id) ? portraitPath(vs.attacker) : "";
  const defImg = AVAILABLE_PORTRAITS.has(vs.defender.id) ? portraitPath(vs.defender) : "";
  return `
    <div class="vs-screen">
      <div class="vs-blade vs-blade-att" data-side="${vs.attacker.side}">
        ${attImg ? `<img src="${attImg}" alt="${vs.attacker.name}" />` : `<span class="vs-fallback">${vs.attacker.name.slice(0, 1)}</span>`}
        <span class="vs-name">${vs.attacker.name}</span>
      </div>
      <div class="vs-center">
        <span class="vs-label">${vs.label}</span>
        <span class="vs-text">VS</span>
      </div>
      <div class="vs-blade vs-blade-def" data-side="${vs.defender.side}">
        ${defImg ? `<img src="${defImg}" alt="${vs.defender.name}" />` : `<span class="vs-fallback">${vs.defender.name.slice(0, 1)}</span>`}
        <span class="vs-name">${vs.defender.name}</span>
      </div>
    </div>
  `;
}

// CT3 風 左上レーダー (全体マップ): 全選手とボールを点で表示。
function renderRadar(carrier) {
  const dot = (p) => `<circle cx="${p.x}" cy="${p.y}" r="3.4" fill="${p.side === "home" ? "#e25a5a" : "#5a8ae0"}" stroke="rgba(0,0,0,0.5)" stroke-width="0.6" />`;
  // 実機CT3 レーダー: 暗緑地 + 白細線でフィールド枠・センターサークル・両ペナルティエリア。
  const line = `stroke="rgba(255,255,255,0.6)" stroke-width="1.1" fill="none"`;
  return `
    <div class="radar">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0" y="0" width="100" height="100" fill="rgba(22,60,38,0.92)" />
        <rect x="2" y="3" width="96" height="94" ${line} />
        <line x1="50" y1="3" x2="50" y2="97" ${line} />
        <circle cx="50" cy="50" r="11" ${line} />
        <rect x="2" y="28" width="15" height="44" ${line} />
        <rect x="83" y="28" width="15" height="44" ${line} />
        ${allPlayers().map(dot).join("")}
        ${carrier ? `<circle cx="${carrier.x}" cy="${carrier.y}" r="5.5" fill="#fff" stroke="#000" stroke-width="1.6" />` : ""}
      </svg>
    </div>
  `;
}

function renderCrashScene() {
  const cs = state.crashScene;
  if (!cs) return "";
  const gkPct = 100 - cs.atkPct;
  const winner = cs.atkPct >= 50 ? "atk" : "def";
  return `
    <div class="crash-scene" data-winner="${winner}">
      <div class="crash-spark"></div>
      <div class="crash-banner">CLASH!!</div>
      <div class="crash-gauge">
        <span class="crash-side crash-atk" style="width:${cs.atkPct}%">${cs.atkName}</span>
        <span class="crash-side crash-def" style="width:${gkPct}%">${cs.gkName}</span>
      </div>
      <div class="crash-sub">必殺 vs 必殺セーブ ── ${winner === "atk" ? "押し勝った!" : "受け止めた!"}</div>
    </div>
  `;
}

function resolveBattle(option) {
  // 遅延発火で battle が消えていたり試合が終了 / 差し替わっていたら何もしない。
  if (!state.match || state.match.finished || !state.battle) return;
  const match = state.match;
  const carrier = getCarrier();
  const defender = allPlayers().find((player) => player.id === state.battle.defenderId);
  if (!carrier || !defender) { state.battle = null; render(); return; }
  const boost = match.boost || 0;
  match.boost = 0;
  // 旧 option (normal/spell) と新 option (normal/spell/ultimate) を統合
  const tier = ["normal", "spell", "ultimate"].includes(option) ? option : "normal";
  const isSpell = tier === "spell" || tier === "ultimate";
  const isUlti = tier === "ultimate";
  const t = state.battle.type;
  const cost = tierCost(t, tier);
  const atkBonus = tierAtkBonus(t, tier);
  // 空中球(クロスで上がった高い球)。 シュート以外の行動を選ぶと地面に落ちる。
  const ballAir = match.ballAir || false;
  if (t !== "shoot") match.ballAir = false;

  if (state.battle.type === "dribble") {
    const atk = roll(carrier.stats.dribble + carrier.stats.speed * 0.35 + boost + atkBonus - fatiguePenalty(carrier) + difficultyModifier(carrier.side));
    const def = roll(defender.stats.tackle + defender.stats.speed * 0.25 + difficultyModifier(defender.side));
    spend(carrier, cost);
    bumpStat(carrier.side, "dribbles");
    bumpPlayerStat(carrier, "dribbles");
    if (isSpell) { bumpStat(carrier.side, "spellsUsed"); bumpPlayerStat(carrier, isUlti ? "ultimatesUsed" : "spellsUsed"); }
    const win = atk >= def;
    const detail = `攻撃値 ${Math.round(atk)} / 守備値 ${Math.round(def)} / 段階: ${tier}`;
    const spellName = isUlti ? characterUltimateName(carrier, "dribble") : characterSpellName(carrier, "dribble");
    // 多段: 仕掛け → DFの守備対応 → 合否(競り合いアリーナで突破 or スライディング奪取)。
    const beats = [
      { scene: { type: "dribble", attacker: carrier, defender, message: `${carrier.name}、ボールを運ぶ — 立ちはだかる${defender.name}！`, detail: `段階: ${tier}`, outcome: "", phase: "flow", focus: "attacker", forceAction: "dribble" }, se: ["kick"], ms: 850, ...(isSpell ? { cutin: { name: spellName, player: carrier } } : {}) },
      { scene: { type: "dribble", attacker: carrier, defender, message: `${defender.name}が間合いを詰める — 体を寄せる！`, detail: `段階: ${tier}`, outcome: "", phase: "flow", focus: "defender", forceAction: "tackle" }, se: ["tackle"], ms: 850 },
      win
        ? { scene: { type: "contest", attacker: carrier, defender, message: `${carrier.name}が${defender.name}を${isUlti ? "切り裂いて" : "抜いて"}前進！`, detail, outcome: "success", phase: "result" }, judge: "break", se: [isSpell ? "spell" : "dribble-break"], hitstop: isSpell ? 120 : null }
        : { scene: { type: "contest", attacker: carrier, defender, message: `${defender.name}がスライディングで奪った！ボールは相手へ。`, detail, outcome: "fail", phase: "result" }, judge: "stop", se: ["save", "tackle"], hitstop: 66 },
    ];
    const apply = () => {
      if (win) {
        advanceCarrier(carrier, isUlti ? 22 : isSpell ? 18 : 11);
        const ddir = carrier.side === "home" ? 1 : -1;
        defender.x = clamp(defender.x - ddir * 16, 6, 94);
        defender.y = clamp(defender.y + (rng() * 10 - 5), 12, 88);
      } else {
        bumpStat(defender.side, "tackles"); bumpPlayerStat(defender, "tackles");
        knockbackBall(carrier, defender, isUlti ? 14 : isSpell ? 10 : 7);
        turnover(defender, `${defender.name}が${carrier.name}を止めた (${tier})。${detail}。`);
      }
    };
    log(`${carrier.name} vs ${defender.name} ドリブル勝負 (${tier})。${detail}。`);
    return runPlay(beats, apply, match.matchToken);
  }

  if (state.battle.type === "pass") {
    const receiver = state.battle.passTargetId
      ? (allPlayers().find((p) => p.id === state.battle.passTargetId) || nearestMateAhead(carrier))
      : nearestMateAhead(carrier);
    const atk = roll(carrier.stats.pass + boost + atkBonus - fatiguePenalty(carrier) + difficultyModifier(carrier.side));
    const laneDist = (state.battle && state.battle.laneDist) || 0;
    const def = roll(defender.stats.block + defender.stats.speed * 0.2 - laneDist * 1.6 + difficultyModifier(defender.side));
    spend(carrier, cost);
    bumpStat(carrier.side, "passes");
    bumpPlayerStat(carrier, "passes");
    if (isSpell) { bumpStat(carrier.side, "spellsUsed"); bumpPlayerStat(carrier, isUlti ? "ultimatesUsed" : "spellsUsed"); }
    const win = atk >= def;
    const detail = `攻撃値 ${Math.round(atk)} / カット値 ${Math.round(def)} / 段階: ${tier}`;
    const spellName = isUlti ? characterUltimateName(carrier, "pass") : characterSpellName(carrier, "pass");
    const isCross = win && distance(carrier, receiver) >= 22 && goalDistance(receiver) < 30;
    // 多段: 出す → ボールが受け手へ向かう(導線上の敵がカット狙い) → 合否。
    const beats = [
      { scene: { type: "pass", attacker: carrier, defender, message: `${carrier.name}、${receiver.name}へパス！`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "attacker", forceAction: "pass" }, se: [isSpell ? "spell" : "pass-charge"], ms: 850, ...(isSpell ? { cutin: { name: spellName, player: carrier } } : {}) },
      { scene: { type: "pass", attacker: carrier, defender, message: `ボールが${receiver.name}へ走る — ${defender.name}が導線を狙う！`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "defender", forceAction: "intercept" }, se: ["select"], ms: 850 },
      win
        ? { scene: { type: "pass", attacker: carrier, defender, message: isCross ? `${carrier.name}が高く上げた！${receiver.name}が空中の球を狙える！` : `${receiver.name}へのパス成功。${isUlti ? "電光石火の前進。" : "攻撃が前へ進む。"}`, detail, outcome: "success", phase: "result", focus: "attacker", forceAction: "pass" }, judge: "through", se: ["pass-success"] }
        : { scene: { type: "pass", attacker: carrier, defender, message: `${defender.name}がパスカット！保持が入れ替わる。`, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "intercept" }, judge: "cut", se: ["save", "intercept"], hitstop: 66 },
    ];
    const apply = () => {
      if (win) {
        match.carrierId = receiver.id;
        receiver.x = clamp(receiver.x + (receiver.side === "home" ? (isUlti ? 14 : 8) : (isUlti ? -14 : -8)), 8, 92);
        match.ballAir = isCross;
      } else {
        bumpStat(defender.side, "intercepts"); bumpPlayerStat(defender, "intercepts");
        knockbackBall(carrier, defender, isUlti ? 12 : isSpell ? 9 : 6);
        turnover(defender, `${defender.name}がパスカット (${tier})。`);
      }
    };
    log(`${carrier.name}→${receiver.name} パス勝負 (${tier})。${detail}。`);
    return runPlay(beats, apply, match.matchToken);
  }

  if (state.battle.type === "oneTwo") {
    // 原作ワンツー: 保持者→壁役へパス→ワンタッチでリターン→保持者が前へ抜け出して受け直す。
    const wall = state.battle.wallId ? allPlayers().find((p) => p.id === state.battle.wallId) : nearestMateAhead(carrier);
    spend(carrier, cost);
    bumpStat(carrier.side, "passes"); bumpPlayerStat(carrier, "passes");
    if (isSpell) { bumpStat(carrier.side, "spellsUsed"); bumpPlayerStat(carrier, isUlti ? "ultimatesUsed" : "spellsUsed"); }
    if (!wall) {
      // 壁役不在 → 単独前進にフォールバック。
      const beats0 = [{ scene: { type: "dribble", attacker: carrier, defender, message: `${carrier.name}、壁役が見つからず単独で運ぶ。`, detail: `段階: ${tier}`, outcome: "success", phase: "result", focus: "attacker", forceAction: "dribble" }, judge: "break", se: ["kick"] }];
      return runPlay(beats0, () => advanceCarrier(carrier, 10), match.matchToken);
    }
    const combo = isComboPair(carrier, wall);
    const laneDist = (state.battle && state.battle.laneDist) || 0;
    const atk = roll((carrier.stats.pass + wall.stats.pass) / 2 + (combo ? 18 : 0) + boost + atkBonus - fatiguePenalty(carrier) + difficultyModifier(carrier.side));
    const def = roll(defender.stats.block + defender.stats.speed * 0.2 - laneDist * 1.6 + difficultyModifier(defender.side));
    const win = atk >= def;
    const detail = `攻撃値 ${Math.round(atk)} / カット値 ${Math.round(def)} / 段階: ${tier}${combo ? " / コンビ冴え" : ""}`;
    const spellName = isUlti ? characterUltimateName(carrier, "pass") : characterSpellName(carrier, "pass");
    const beats = [
      { scene: { type: "pass", attacker: carrier, defender, message: `${carrier.name}、${wall.name}へワンツー！`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "attacker", forceAction: "pass" }, se: [isSpell ? "spell" : "pass-charge"], ms: 800, ...(isSpell ? { cutin: { name: spellName, player: carrier } } : {}) },
      { scene: { type: "pass", attacker: wall, defender, message: `${wall.name}がワンタッチでリターン！ ${carrier.name}が前へ走り込む！`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "attacker", forceAction: "pass" }, se: ["select"], ms: 800 },
      win
        ? { scene: { type: "pass", attacker: carrier, defender, message: `${combo ? `${carrier.name}と${wall.name}のコンビが冴える！ ` : ""}壁パスが通った！ ${carrier.name}が抜け出した！`, detail, outcome: "success", phase: "result", focus: "attacker", forceAction: "pass" }, judge: "through", se: ["pass-success"] }
        : { scene: { type: "pass", attacker: carrier, defender, message: `${defender.name}がワンツーを読んでカット！`, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "intercept" }, judge: "cut", se: ["save", "intercept"], hitstop: 66 },
    ];
    const apply = () => {
      if (win) {
        advanceCarrier(carrier, isUlti ? 26 : isSpell ? 22 : 18); // 大きく前進して受け直し(キープ)
        match.carrierId = carrier.id;
      } else {
        bumpStat(defender.side, "intercepts"); bumpPlayerStat(defender, "intercepts");
        knockbackBall(carrier, defender, isUlti ? 12 : 8);
        turnover(defender, `${defender.name}が${carrier.name}のワンツーをカット (${tier})。`);
      }
    };
    log(`${carrier.name}⇔${wall.name} ワンツー (${tier})。${detail}。`);
    return runPlay(beats, apply, match.matchToken);
  }

  if (state.battle.type === "shoot") {
    const distancePenalty = Math.max(0, goalDistance(carrier) - 20) * 0.6;
    const fatigue = fatiguePenalty(carrier);
    const baseAtk = roll(carrier.stats.shoot + boost + atkBonus - distancePenalty - fatigue + difficultyModifier(carrier.side), 34);
    if (fatigue >= 14) log(`💨 ${carrier.name}は息が上がり、シュートに伸びがない。`);
    spend(carrier, cost);
    bumpStat(carrier.side, "shots");
    bumpPlayerStat(carrier, "shots");
    if (isSpell) {
      bumpStat(carrier.side, "spellsUsed");
      bumpPlayerStat(carrier, isUlti ? "ultimatesUsed" : "spellsUsed");
    }
    // 空中球なら球の高低・位置で空中シュート種別を決める (ヘディング/オーバーヘッド/ボレー/ダイビングヘッド)。
    const shotKind = ballAir ? pickAerialShot(carrier) : "shoot";
    match.ballAir = false;
    match.pendingShotKind = shotKind;
    if (ballAir) log(`${carrier.name}、空中の球を${AERIAL_LABEL[shotKind] || "シュート"}!`);
    const shotName = isSpell ? (isUlti ? characterUltimateName(carrier, "shoot") : characterSpellName(carrier, "shoot")) : (AERIAL_LABEL[shotKind] || "シュート");
    const gkSide = opponentSide(carrier.side);
    const token = match.matchToken;
    // 原作CT3の流れ: シュート発射 → ボールがゴールへ向かう演出 → GK行動 → 合否(goal/キャッチ/こぼれ球)。
    const head = [
      { scene: { type: "shoot", attacker: carrier, defender, message: `${carrier.name}、${shotName}！`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "attacker", forceAction: shotKind, shotKind }, se: [isSpell ? "spell" : "shoot-charge"], ms: 900, ...(isSpell ? { cutin: { name: shotName, player: carrier } } : {}) },
      { scene: { type: "shoot", attacker: carrier, defender, message: `ボールはゴールへ突き刺さる軌道！ GK ${defender.name} の前へ —`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "attacker", forceAction: shotKind, shotKind }, se: ["shoot-impact", "whistle"], ms: 900 },
    ];
    if (gkSide === "home") {
      // home GK = ユーザー4択。 入力 beat に到達したときモーダルを立てる (事前表示しない)。
      const inputBeat = {
        scene: { type: "shoot", attacker: carrier, defender, message: `${defender.name}、どう止める!?`, detail: `段階: ${tier}`, outcome: "", phase: "flow", focus: "defender", forceAction: "save" },
        input: "gk", auto: false,
        gk: { carrierId: carrier.id, gkId: defender.id, baseAtk, useSpell: isSpell, tier, shotKind, resumeSeq: true },
      };
      runPlay([...head, inputBeat], null, token);
    } else {
      // away GK = AI 即決 → 後続 beat を結合。
      const pick = aiGkPick(defender, isSpell, isUlti);
      const tail = buildShootTailBeats(carrier, defender, baseAtk, pick, isSpell, tier, shotKind);
      runPlay([...head, ...tail.beats], tail.apply, token);
    }
    return;
  }

  if (state.battle.type === "team") {
    spend(carrier, cost);
    recoverTeam(carrier.side, TIER_TEAM_RECOVER[tier]);
    if (isSpell) bumpStat(carrier.side, "spellsUsed");
    const teamName = teamBySide(carrier.side).name;
    const spellName = isUlti ? `${actionSpellName(carrier, "team")}・真` : actionSpellName(carrier, "team");
    const beats = [
      { scene: { type: "team", attacker: carrier, defender, message: `${teamName}、${spellName}発動！`, detail: `段階: ${tier}`, outcome: "success", phase: "flow", focus: "attacker", forceAction: "contest" }, cutin: { name: spellName, player: carrier }, se: ["spell"], ms: 900 },
      { scene: { type: "team", attacker: carrier, defender, message: `${teamName}が${isUlti ? "全身全霊で前へ出る" : "全員で前へ出る"}！`, detail: `次の判定+${TIER_TEAM_BOOST[tier]} / 全員霊力+${TIER_TEAM_RECOVER[tier]}`, outcome: "success", phase: "result", focus: "attacker", forceAction: "contest" }, judge: "support" },
    ];
    const apply = () => { match.boost = TIER_TEAM_BOOST[tier]; };
    log(`${teamName}が連携スペル (${tier})。次判定+${TIER_TEAM_BOOST[tier]}、霊力+${TIER_TEAM_RECOVER[tier]}。`);
    return runPlay(beats, apply, match.matchToken);
  }

  state.battle = null;
  endTurn(); // (フォールバック) 通常はここに到達しない
}

function renderGkChoice() {
  if (!state.gkChoice) return "";
  const gc = state.gkChoice;
  const carrier = allPlayers().find((p) => p.id === gc.carrierId);
  const gk = allPlayers().find((p) => p.id === gc.gkId);
  const opts = [
    { key: "catch", label: "ジャンプキャッチ", desc: "確実なキャッチ (霊力6)", cost: 6 },
    { key: "punch", label: "パンチング", desc: "弾く守備、こぼれ球リスク (霊力10)", cost: 10 },
    { key: "rush", label: "飛び出し", desc: "間合いを詰める。抜かれリスク高 (霊力14)", cost: 14 },
  ];
  // 必殺シュート (spell/ultimate) に対しては GK 固有スペルで真っ向対抗できる第4択。
  if (gc.useSpell) {
    opts.push({ key: "spellsave", label: `スペルセーブ: ${gk.spell}`, desc: "必殺に必殺で対抗。守備値大 (霊力20)", cost: 20 });
  }
  return `
    <div class="dialog-overlay gk-overlay">
      <div class="dialog-card gk-card">
        <div class="dialog-banner gk-banner">${gc.useSpell ? "必殺シュート迫る!!" : "GK SAVE!"}</div>
        <p>${carrier.name} の${gc.useSpell ? (gc.tier === "ultimate" ? characterUltimateName(carrier, "shoot") : characterSpellName(carrier, "shoot")) : "シュート"}が ${gk.name} に迫る!</p>
        <div class="dialog-actions gk-actions cross-actions">
          <button class="dir-up" data-action="gk-choice" data-option="punch" ${gk.guts < 10 ? "disabled" : ""}>▲ パンチング<span class="gk-desc">弾く守備 (霊力10)</span></button>
          <button class="dir-left" data-action="gk-choice" data-option="catch" ${gk.guts < 6 ? "disabled" : ""}>◀ ジャンプキャッチ<span class="gk-desc">確実 (霊力6)</span></button>
          <button class="dir-right" data-action="gk-choice" data-option="rush" ${gk.guts < 14 ? "disabled" : ""}>飛び出し ▶<span class="gk-desc">間合い詰め (霊力14)</span></button>
          ${gc.useSpell ? `<button class="dir-down gk-spellsave" data-action="gk-choice" data-option="spellsave" ${gk.guts < 20 ? "disabled" : ""}>▼ スペルセーブ<span class="gk-desc">${gk.spell} (霊力20)</span></button>` : `<div class="dir-down cross-empty">—</div>`}
          <div class="cross-center">GK</div>
        </div>
      </div>
    </div>
  `;
}

// AI GK の選択 (必殺には一定確率でスペルセーブ対抗)。
function aiGkPick(gk, useSpell, isUlti) {
  if (useSpell && gk.guts >= 20 && rng() < (isUlti ? 0.55 : 0.4)) return "spellsave";
  const affordable = ["catch", "punch", "rush"].filter((o) => gk.guts >= ({ catch: 6, punch: 10, rush: 14 })[o]);
  return affordable.length ? affordable[Math.floor(rng() * affordable.length)] : "catch";
}

function resolveGkChoice(option) {
  const gc = state.gkChoice;
  if (!gc) return;
  const carrier = allPlayers().find((p) => p.id === gc.carrierId);
  const gk = allPlayers().find((p) => p.id === gc.gkId);
  state.gkChoice = null;
  const tail = buildShootTailBeats(carrier, gk, gc.baseAtk, option, gc.useSpell, gc.tier, gc.shotKind || "shoot");
  if (state.playSeq && gc.resumeSeq) {
    resumePlaySeq(tail.beats, tail.apply);   // 走行中シーケンスに GK行動→合否 beat を継ぐ
  } else {
    runPlay(tail.beats, tail.apply, state.match ? state.match.matchToken : null); // forceGkChoice 等の単独経路
  }
}

// finalizeShoot を「合否計算 + GK行動→合否の beat 列 + 効果適用関数」に分解 (即計算・適用遅延)。
function buildShootTailBeats(carrier, gk, baseAtk, gkOption, useSpell, attackTier, shotKind) {
  const match = state.match;
  const isUlti = attackTier === "ultimate";
  const spellSave = gkOption === "spellsave";
  const cost = { catch: 6, punch: 10, rush: 14, spellsave: 20 }[gkOption] || 6;
  // バランス #7: 究極支配の解体。 catch を 1.06→1.18 で「究極vsキャッチ=100%」の確定をほどき、 spellsaveをやや軟化。
  const defMod = { catch: 1.18, punch: 1.16, rush: 0.82, spellsave: 1.32 }[gkOption] || 1.0;
  spend(gk, cost);
  const def = roll(gk.stats.keep * defMod + gk.stats.block * 0.19 + (useSpell ? 4 : 0) + (spellSave ? 6 : 0) + difficultyModifier(gk.side), 34);
  const margin = baseAtk - def;
  const atkName = useSpell ? (isUlti ? characterUltimateName(carrier, "shoot") : characterSpellName(carrier, "shoot")) : "シュート";
  const clash = useSpell && (spellSave || Math.abs(margin) <= 12);
  const goal = margin >= 0;
  const spill = !goal && (gkOption === "punch" || (useSpell && margin >= -12));
  // 原作CT3: GK突破後のアクシデント段階。 種別(威力帯)が高いほどポスト外れ確率↑。
  // in=ねじ込みゴール / post=ポスト外れ / cover=カバー阻止 / force=威力でこじ開け救済。
  let accident = "in";
  if (goal) {
    const shotType = isUlti ? 6 : useSpell ? 4 : 0;
    const postP = { 0: 0.08, 4: 0.15, 6: 0.24 }[shotType] || 0.08;
    const r = rng();
    if (r < postP) accident = "post";
    else if (r < postP + 0.12) accident = margin >= 18 ? "force" : "cover";
  }
  const scored = goal && (accident === "in" || accident === "force");
  const gkLabel = { catch: "ジャンプキャッチ", punch: "パンチング", rush: "飛び出し", spellsave: `スペルセーブ「${gk.spell}」` }[gkOption] || "セーブ";
  const detail = `攻撃値 ${Math.round(baseAtk)} / GK値 ${Math.round(def)}`;
  const beats = [];
  // GK 行動 beat (キーパーの行動)
  beats.push({
    scene: { type: "shoot", attacker: carrier, defender: gk, message: `GK ${gk.name}、${gkLabel}！`, detail, outcome: "", phase: "flow", focus: "defender", forceAction: "save" },
    se: [spellSave ? "spell" : "save"], ms: 900,
    ...(spellSave ? { cutin: { name: `${gk.name} ${gk.spell}`, player: gk } } : {}),
  });
  // 必殺 vs スペルセーブ/僅差はクラッシュ beat
  if (clash) {
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: `${atkName} と ${gk.name} のセーブが激突！火花が散る！`, detail, outcome: "", phase: "flow", focus: "defender", forceAction: "save" },
      crash: { atkName, gkName: gk.name, gkSpell: spellSave ? gk.spell : "セーブ", atkPct: clamp(Math.round(50 + margin * 2.5), 12, 88) },
      se: ["clash-spark"], hitstop: 120, ms: 1100,
    });
  }
  // 合否 beat
  if (scored) {
    const msg = accident === "force" ? `${gk.name}を破り、カバーもこじ開けてねじ込んだ！`
      : (clash && margin < 12) ? `火花を散らし、わずかにねじ込んだ！`
      : (useSpell && margin >= 18) ? `${atkName}が${gk.name}のセーブを粉砕！`
      : `${carrier.name}のシュートが決まった！${gk.name}届かず。`;
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: msg, detail: `${detail} (${gkOption})`, outcome: "goal", phase: "result", focus: "attacker", forceAction: shotKind, shotKind },
      goal: true, judge: "goal", flash: true, hitstop: (useSpell || margin >= 18) ? 220 : 150, se: ["goal", "goal-stamp", "crowd-rumble", "ovation"], ms: 1700,
    });
    // 実機CT3 の歓喜カット+実況メッセージ窓 (赤フラッシュの直後に続く)。
    const oppTeam = carrier.side === "home" ? state.match.away.name : state.match.home.name;
    const shotName = AERIAL_LABEL[shotKind] || (useSpell ? (characterSpellName(carrier, "shoot") || "シュート") : "シュート");
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: `${carrier.name}の${shotName}！ ${oppTeam}のゴールに つきささりました！！`, detail: "", outcome: "celebrate", phase: "result", focus: "attacker" },
      celebrate: true, se: ["ovation"], ms: 2000,
    });
  } else if (goal && accident === "post") {
    // GKは破ったがポスト/枠外。
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: `${gk.name}は破った…が、ポスト！わずかに外れた！`, detail, outcome: "fail", phase: "result", focus: "attacker", forceAction: shotKind, shotKind },
      judge: "save", se: ["whistle"], hitstop: 140,
    });
  } else if (goal && accident === "cover") {
    // GKは破ったがカバーDFがゴール前で掻き出す。
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: `${gk.name}を破った！しかしカバーが入った！ゴール前で掻き出した！`, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "block" },
      judge: "save", se: ["save"], hitstop: 110,
    });
  } else if (spill) {
    const msg = (useSpell && gkOption !== "punch") ? `${gk.name}が${atkName}を弾いた！こぼれ球が転がる！` : `${gk.name}がパンチング！こぼれ球が転がる。`;
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: msg, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "save" },
      judge: "save", se: ["save"], hitstop: clash ? 150 : null,
    });
  } else {
    const how = spellSave ? `スペルセーブ「${gk.spell}」で` : gkOption === "catch" ? "ジャンプキャッチで" : gkOption === "rush" ? "飛び出しで" : "";
    const msg = spellSave ? `${gk.name}が${atkName}を真っ向から受け止めた！完全セーブ！` : `${gk.name}が${how}阻止。`;
    beats.push({
      scene: { type: "shoot", attacker: carrier, defender: gk, message: msg, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "save" },
      judge: "save", se: ["save"], hitstop: spellSave ? 200 : 66,
    });
  }
  // 効果適用 (最終 result beat 直前に1回)。
  const apply = () => {
    if (!state.match) return;
    if (scored) {
      bumpStat(carrier.side, "goals"); bumpPlayerStat(carrier, "goals");
      match.score[carrier.side] += 1;
      pushCommentary(goalCommentary(carrier)); // 「○○のゴール! 1-0とする!」(これ1本に集約)
      kickoff(opponentSide(carrier.side));
    } else if (goal && (accident === "post" || accident === "cover")) {
      // 枠外/カバー阻止 → 得点なし、 守備側ボール (ポスト=GKからゴールキック相当)。
      bumpStat(gk.side, "saves"); bumpPlayerStat(gk, "saves");
      turnover(gk, accident === "post" ? `${carrier.name}のシュートは枠を外れた。` : `カバーが${carrier.name}のシュートを掻き出した。`);
    } else if (spill) {
      bumpStat(gk.side, "saves"); bumpPlayerStat(gk, "saves");
      const nearby = allPlayers().filter((p) => p.id !== gk.id && p.role !== "GK").map((p) => ({ p, d: distance(p, gk) })).sort((a, b) => a.d - b.d)[0];
      const nc = nearby ? nearby.p : gk;
      match.possession = nc.side; match.carrierId = nc.id;
      log(`${gk.name}が弾いた。${nc.name}が拾った。`);
    } else {
      bumpStat(gk.side, "saves"); bumpPlayerStat(gk, "saves");
      turnover(gk, `${gk.name}が${carrier.name}の${atkName}を止めた。${detail}。`);
    }
    match.pendingShotKind = null;
  };
  return { beats, apply };
}

function advanceCarrier(player, amount) {
  if (player.role === "GK") {
    keepGoalkeeperInGoal(player);
    return;
  }
  const dir = player.side === "home" ? 1 : -1;
  player.x = clamp(player.x + amount * dir, player.side === "home" ? 14 : 8, player.side === "home" ? 92 : 86);
  player.y = clamp(player.y + (rng() * 16 - 8), 18, 82);
}

// 保持者を盤面で歩かせられる状態か (自軍ターン・バトル/送り待ち/各種モーダル中でない)。
function carrierCanMove() {
  return state.screen === "match" && Boolean(state.match) && !state.match.finished
    && state.match.possession === "home" && !state.battle && !state.advance && !state.playSeq
    && !state.passPicker && !state.gkChoice && !state.interrupt && !state.vnScene;
}

// 原作CT3: ドリブル = 自由移動(8方向)。 まず自由に動き、 守備者と「接触」した瞬間だけエンカウント。
// dirX: +1=前進(攻撃方向) / -1=後退、 dirY: -1=左 / +1=右。 敵を避けて自由に回り込める。
const CONTACT_RANGE = 10; // この至近に守備者が来たらエンカウント (これより遠ければ自由移動)
const STEP_X = 7, STEP_Y = 9;
function stepCarrier(dirX, dirY = 0) {
  if (!carrierCanMove()) return;
  const carrier = getCarrier();
  if (!carrier || carrier.role === "GK") return;
  const adir = carrier.side === "home" ? 1 : -1; // 攻撃方向
  if (state.match) state.match.ballAir = false;
  spend(carrier, 1); // 原作: ドリブル(歩行)でガッツ漸減
  // 自由移動 (どの方向にも動ける)。
  carrier.x = clamp(carrier.x + dirX * adir * STEP_X, 8, 92);
  carrier.y = clamp(carrier.y + dirY * STEP_Y, 16, 84);
  moveAiPlayers();
  audio.play("kick");
  // 移動後、 守備者と接触していればエンカウント (突破バトルへ)。
  const after = nearestOpponent(carrier);
  if (after && distance(carrier, after) < CONTACT_RANGE) {
    openBattle("dribble");
    return;
  }
  // 自由移動継続。 上段にドリブルのスプライトアニメ + 芝スクロール。
  if (goalDistance(carrier) < 16) {
    setActionScene("dribble", carrier, after, `${carrier.name}、ゴール前へ斬り込む！ シュートだ!`, "WASD=自由移動 / 2パス 3シュート 4ワンツー", "success", "move");
  } else {
    setActionScene("dribble", carrier, after, `${carrier.name}、ドリブルで運ぶ。`, "WASD=自由8方向移動 / 2パス 3シュート 4ワンツー / 接触でエンカウント", "", "move");
  }
  render();
}

// 原作CT3のBボタン式コマンドメニュー: 移動を止めて方向でコマンド選択。
// 上=ドリブル(前進移動) / 左=パス / 右=シュート / 下=ワンツー。 既存パネル/数字キーと併存。
function openCommandMenu() {
  if (!carrierCanMove()) return;
  state.commandMenu = true;
  audio.play("select");
  render();
}
function closeCommandMenu() {
  state.commandMenu = null;
  render();
}
function selectCommand(dir) {
  if (!state.commandMenu) return;
  state.commandMenu = null;
  if (dir === "up") stepCarrier(1, 0);        // ドリブル(前進。 敵が近ければエンカウント)
  else if (dir === "left") openBattle("pass");
  else if (dir === "right") openBattle("shoot");
  else if (dir === "down") openBattle("oneTwo");
}

function renderCommandMenu() {
  if (!state.commandMenu) return "";
  const c = getCarrier();
  const air = state.match && state.match.ballAir;
  return `
    <div class="command-menu-overlay" data-action="cmdClose">
      <div class="cmd-cross" data-stop="1">
        <div class="cmd-cross-title">${c ? c.name : ""} — コマンド</div>
        <button class="cc-btn cc-up" data-action="cmdSelect" data-dir="up">▲ ドリブル<span>移動/突破</span></button>
        <button class="cc-btn cc-left" data-action="cmdSelect" data-dir="left">◀ パス</button>
        <button class="cc-btn cc-right" data-action="cmdSelect" data-dir="right">${air ? "空中シュート" : "シュート"} ▶</button>
        <button class="cc-btn cc-down" data-action="cmdSelect" data-dir="down">▼ ワンツー</button>
        <div class="cmd-cross-hint">方向キー/WASD で選択 ・ Esc で閉じる</div>
      </div>
    </div>
  `;
}

// 原作チームコマンド: みんなあがれ(全員前進) / みんなもどれ(全員後退)。 陣形(initialSlot)を恒久シフト。
function teamCommand(cmd) {
  if (!state.match || state.match.finished || state.match.possession !== "home") return;
  if (state.battle || state.advance || state.playSeq || state.passPicker || state.gkChoice || state.interrupt) return;
  const team = teamBySide("home");
  const off = (cmd === "advance" ? 1 : cmd === "retreat" ? -1 : 0) * 8;
  if (!off) return;
  team.players.forEach((p) => {
    if (p.role === "GK" || !p.initialSlot) return;
    p.initialSlot.x = clamp(p.initialSlot.x + off, 16, 82);
    p.x = clamp(p.x + off, 12, 90);
  });
  log(cmd === "advance" ? "チームコマンド: みんなあがれ！ 全員が前へ出る。" : "チームコマンド: みんなもどれ！ 全員が下がって守る。");
  audio.play("select");
  render();
}

function knockbackBall(carrier, defender, strength) {
  // ball を defender 側に少し動かす (失敗 carrier から離れる)
  const dir = defender.side === "home" ? 1 : -1;
  // 攻撃方向の反対へ knockback
  carrier.x = clamp(carrier.x - dir * strength * 0.3, 6, 94);
  carrier.y = clamp(carrier.y + (rng() * 8 - 4), 14, 86);
  // defender も少し進める
  defender.x = clamp(defender.x + dir * (strength * 0.2), 6, 94);
}

function turnover(newCarrier, message) {
  const loser = getCarrier();
  state.match.ballAir = false; // 保持が入れ替われば高い球は仕切り直し
  state.match.possession = newCarrier.side;
  state.match.carrierId = newCarrier.id;
  if (newCarrier.role === "GK") keepGoalkeeperInGoal(newCarrier);
  else advanceCarrier(newCarrier, 10); // 奪取者を前へ運び、 奪われた側と分離
  // 奪われた側を後方へ離す (「奪われた直後にすぐ再接触/タックル」の不自然さを防ぐ)。
  if (loser && loser.id !== newCarrier.id && loser.role !== "GK") {
    const ldir = loser.side === "home" ? 1 : -1;
    loser.x = clamp(loser.x - ldir * 12, 6, 94);
  }
  // 直後の 1 手は介入を起こさない (間を作る)。
  state.match.freshTurnover = true;
  log(message);
}

function kickoff(side) {
  state.match.ballAir = false;
  state.match.possession = side;
  const team = teamBySide(side);
  const carrier = team.players.find((player) => player.role === "MF") || team.players[1];
  state.match.carrierId = carrier.id;
  resetPositions();
}

function resetPositions() {
  // 各選手を試合開始時に確定した initialSlot へ戻す。 cloneTeam を再呼びしないので、
  // 途中保存後に setup でフォーメーションを変えて再開しても、 現 progress.formation に
  // 引きずられて選手とスロットが入れ替わる不整合 (GKがFW位置へ等) が起きない。
  allPlayers().forEach((player) => {
    if (player.role === "GK") {
      keepGoalkeeperInGoal(player);
    } else if (player.initialSlot) {
      player.x = player.initialSlot.x;
      player.y = player.initialSlot.y;
    }
  });
}

function keepGoalkeeperInGoal(player) {
  player.x = player.side === "home" ? 6 : 94;
  player.y = 50;
}

// ターン終了の簿記 (回復/turn++/ハーフ/終了判定/save)。 gate は呼ばない。
function endTurn() {
  endTurnBookkeeping();
  if (!state.match || state.match.finished) { render(); return; }
  gate(); // 非シーケンス経路 (じゃんけん等) はここで送りゲート
}

function endTurnBookkeeping() {
  const match = state.match;
  // 霊力経済をやや引き締め (消耗ドラマを効かせ、 終盤の残量を意思決定にする)。
  recoverTeam("home", 2);
  recoverTeam("away", 2);
  match.turn += 1;
  moveAiPlayers();
  // 時間を進める (1手=2〜4分。 局面でばらつき=ロスタイムの不確実性に寄与)。
  const HALF = HALF_MIN;
  match.clock += 2 + Math.floor(rng() * 3);
  // 前半終了(ロスタイム込み) → ハーフタイム → 後半へ
  if (match.half === 1 && match.clock >= HALF + match.stoppage) {
    match.half = 2;
    match.clock = 0;
    match.stoppage = 1 + Math.floor(rng() * 4); // 後半ロスタイム 1-4分 (非表示)
    match.halftimeShown = true;
    recoverTeam("home", 20);
    recoverTeam("away", 20);
    showJudge("halftime");
    state.halftimeReport = true;
    window.clearTimeout(state.halftimeReportTimer);
    state.halftimeReportTimer = window.setTimeout(() => {
      state.halftimeReport = false;
      render();
    }, animMs(3200));
    log(`ハーフタイム。両軍が霊力 +20 を回復。スコア ${match.home.name} ${match.score.home} - ${match.score.away} ${match.away.name}。`);
  }
  // BGM 切替 (後半終盤=intense)
  const late = match.half === 2 && match.clock >= HALF_MIN - 8;
  if (late && audio.currentBgm !== "intense") audio.playBgm("intense");
  else if (!late && match.possession === "away" && audio.currentBgm !== "defense") audio.playBgm("defense");
  else if (!late && match.possession === "home" && audio.currentBgm !== "normal") audio.playBgm("normal");
  // 後半終了(ロスタイム込み) → 試合終了 (タイムアップの瞬間は誰にも分からない=熱い)
  if (match.half === 2 && match.clock >= HALF + match.stoppage) {
    audio.stopMusic();
    audio.play("result");
    audio.playBgm("result");
    clearMatchSave();
    match.finished = true;
    match.winner = match.score.home === match.score.away ? "draw" : match.score.home > match.score.away ? "home" : "away";
    // 勝利 XP (死に設定だった XP_TABLE.win を解消)。 home roster のみ成長。
    if (match.winner === "home") match.home.players.forEach((p) => gainXp(p, "win"));
    if (state.mode === "campaign" && match.winner === "home" && state.campaign) {
      state.campaign.wins += 1;
      if (unlockTeam(match.away.id)) {
        match.unlockedTeamId = match.away.id;
        log(`${match.away.name}がフリー対戦で使用可能になった。`);
      }
      if (state.campaign.index >= state.campaign.opponents.length - 1) {
        state.progress.campaignClears += 1;
        const difficulty = state.progress.difficulty;
        if (!state.progress.difficultyClears[difficulty]) {
          state.progress.difficultyClears[difficulty] = true;
          match.rewardMessage = DIFFICULTY_REWARDS[difficulty].message;
          log(match.rewardMessage);
        }
        saveProgress();
      }
    }
    const result = match.winner === "draw" ? "引き分け" : match.winner === "home" ? `${match.home.name}の勝利` : `${match.away.name}の勝利`;
    log(`試合終了。${match.home.name} ${match.score.home} - ${match.score.away} ${match.away.name}。${result}。`);
  } else {
    saveMatch();
  }
}

// 守備じゃんけん: 相手の dribble/pass に対し、 近接 home DF がいれば防御選択を出す。
// タックル⇔ドリブル / パスカット⇔パス の読み合い。 aiAction/aiTier を保持して resolveInterrupt で解決。
function offerDefense(carrier, aiAction, aiTier) {
  if (state.interrupt) return false;
  // 奪取直後の 1 手は介入させない (奪われてすぐ守備の不自然さを回避)。
  if (state.match.freshTurnover) { state.match.freshTurnover = false; return false; }
  const defender = teamBySide("home").players
    .filter((p) => p.role !== "GK")
    .map((p) => ({ p, d: distance(p, carrier) }))
    .sort((a, b) => a.d - b.d)[0];
  if (!defender || defender.d > 30) return false;
  state.interrupt = { attacker: carrier, defender: defender.p, aiAction, aiTier };
  audio.play("encounter");
  return true;
}

function enemyTurn() {
  if (!state.match || state.match.finished || state.match.possession !== "away" || state.battle) return;
  const token = state.match.matchToken;
  const carrier = getCarrier();
  if (!carrier) return;
  const action = aiPickAction(carrier);
  const tier = aiPickTier(carrier, action);
  // 守備じゃんけん(原作CT3 DF4コマンド): 敵の dribble/pass/shoot に、 近接 home DF がいれば守備選択を出す。
  if ((action === "dribble" || action === "pass" || action === "shoot") && offerDefense(carrier, action, tier)) {
    render();
    return;
  }
  runAiAction(carrier, action, tier, token);
}

// AI の 1 手 (dribble/pass/shoot/team) を実行する。 enemyTurn と防御「様子見」から共用。
function runAiAction(carrier, action, tier, token) {
  if (!matchAlive(token)) return;
  if (action === "team") {
    state.battle = { type: "team", carrierId: carrier.id, defenderId: nearestOpponent(carrier).id };
    showVsScreen(carrier, nearestOpponent(carrier), VS_LABELS.team);
    render();
    setTimeout(() => { if (matchAlive(token) && state.battle) resolveBattle(tier); }, animMs(720));
    return;
  }
  openBattle(action);
  const tryResolve = () => {
    if (!matchAlive(token)) return;
    if (state.vnScene) setTimeout(tryResolve, animMs(240));
    else if (state.battle) setTimeout(() => { if (matchAlive(token) && state.battle) resolveBattle(tier); }, animMs(760));
    else setTimeout(tryResolve, animMs(240));
  };
  setTimeout(tryResolve, animMs(200));
}

function aiPickAction(carrier) {
  // AWAY のみ AI なので tactic bias は適用しない (home tactic は home の意思決定にのみ影響)。
  // ただし home 側に手動操作はなく AI fallback もここを使う場合に備えて bias 適用。
  const bias = carrier.side === "home" ? TACTICS[(state.progress && state.progress.tactic) || "normal"].aiBias : TACTICS.normal.aiBias;
  const scores = {
    shoot: scoreShoot(carrier) * bias.shoot,
    dribble: scoreDribble(carrier) * bias.dribble,
    pass: scorePass(carrier) * bias.pass,
    team: scoreTeam(carrier) * bias.team,
  };
  const diff = state.progress.difficulty;
  if (diff === "easy") {
    if (rng() < 0.3) {
      const keys = Object.keys(scores);
      return keys[Math.floor(rng() * keys.length)];
    }
  }
  if (diff === "hard") {
    for (const a of Object.keys(scores)) {
      scores[a] += lookaheadOneStep(carrier, a) * 0.4;
    }
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function scoreShoot(p) {
  const dist = goalDistance(p);
  return (p.stats.shoot / 100) * Math.max(0.1, 1 - dist / 40) * (p.guts > 30 ? 1.2 : 0.5);
}

function scoreDribble(p) {
  return (p.stats.dribble / 100) * Math.min(1, goalDistance(p) / 50) * (p.guts > 22 ? 1.0 : 0.5);
}

function scorePass(p) {
  const ahead = nearestMateAhead(p);
  if (!ahead) return 0;
  const forward = Math.max(0, (ahead.x - p.x) * (p.side === "home" ? 1 : -1));
  return (p.stats.pass / 100) * Math.min(1, forward / 50) * (p.guts > 18 ? 1.0 : 0.6);
}

function scoreTeam(p) {
  if (state.match.boost > 0) return 0;
  const team = teamBySide(p.side).players;
  const avgGuts = team.reduce((s, x) => s + x.guts / x.maxGuts, 0) / team.length;
  return 0.3 * (avgGuts < 0.5 ? 1.5 : 0.4);
}

function lookaheadOneStep(carrier, action) {
  if (action === "pass") {
    const ahead = nearestMateAhead(carrier);
    return ahead ? scoreShoot(ahead) * 0.6 : 0.2;
  }
  if (action === "dribble") return scoreShoot(carrier) * 0.4;
  return 0.3;
}

function aiShouldUseSpell(p, action) {
  const tier = aiPickTier(p, action);
  return tier === "spell" || tier === "ultimate";
}

function aiPickTier(p, action) {
  const costs = TIER_COSTS[action] || { normal: 0, spell: 0, ultimate: 0 };
  const dist = goalDistance(p);
  const guts = p.guts;
  // 究極を狙う: 霊力十分 + 近距離 shoot or 50% dribble or rare pass
  if (guts >= costs.ultimate + 4) {
    if (action === "shoot" && dist < 22 && rng() < 0.6) return "ultimate";
    if (action === "dribble" && guts > 70 && rng() < 0.3) return "ultimate";
    if (action === "team" && rng() < 0.18) return "ultimate";
  }
  if (guts >= costs.spell + 8) {
    if (action === "shoot" && dist < 28) return "spell";
    if (action === "dribble" && rng() < 0.4) return "spell";
    if (rng() < 0.32) return "spell";
  }
  return "normal";
}

function renderInterruptPrompt() {
  if (!state.interrupt) return "";
  const ip = state.interrupt;
  return `
    <div class="dialog-overlay interrupt-overlay">
      <div class="dialog-card interrupt-card">
        <div class="dialog-banner">DEFENSE!!</div>
        <p>${ip.attacker.name} が仕掛けてくる! ${ip.defender.name} はどう守る? <span class="defense-hint">(方向キーで選択)</span></p>
        <div class="dialog-actions cross-actions">
          <button class="dir-up" data-action="interrupt" data-option="tackle">▲ タックル<span class="gk-desc">ドリブルに強い (霊力10)</span></button>
          <button class="dir-left" data-action="interrupt" data-option="intercept">◀ パスカット<span class="gk-desc">パスに強い (霊力8)</span></button>
          <button class="dir-right" data-action="interrupt" data-option="block">ブロック ▶<span class="gk-desc">シュートに強い (霊力12)</span></button>
          <button class="dir-down" data-action="interrupt" data-option="wait">▼ うごかない<span class="gk-desc">読み合いを避ける</span></button>
          <div class="cross-center">守備</div>
        </div>
      </div>
    </div>
  `;
}

function resolveInterrupt(option) {
  const ip = state.interrupt;
  if (!ip) return;
  if (!state.match || state.match.finished) { state.interrupt = null; return; }
  const token = state.match.matchToken;
  state.interrupt = null;
  const { attacker, defender, aiAction, aiTier } = ip;
  const aiLabel = aiAction === "dribble" ? "ドリブル" : aiAction === "shoot" ? "シュート" : "パス";
  if (option === "wait") {
    log(`${defender.name}はうごかない。 ${attacker.name}の${aiLabel}を見送る。`);
    runAiAction(attacker, aiAction, aiTier, token);
    return;
  }
  const cost = { tackle: 10, intercept: 8, block: 12 }[option] || 10;
  if (defender.guts < cost) {
    log(`${defender.name}の霊力不足。 守りきれない。`);
    runAiAction(attacker, aiAction, aiTier, token);
    return;
  }
  spend(defender, cost);
  const optLabel = { tackle: "タックル", intercept: "パスカット", block: "ブロック" }[option] || option;
  // 原作DFじゃんけん: タックル⇔ドリブル / パスカット⇔パス / ブロック⇔シュート が刺さる。
  const matched = (option === "tackle" && aiAction === "dribble") || (option === "intercept" && aiAction === "pass") || (option === "block" && aiAction === "shoot");
  const matchBonus = matched ? 26 : -24;
  const atkStat = aiAction === "dribble" ? attacker.stats.dribble : aiAction === "shoot" ? attacker.stats.shoot : attacker.stats.pass;
  const atk = roll(atkStat + difficultyModifier(attacker.side));
  const defStat = option === "tackle" ? defender.stats.tackle : option === "block" ? defender.stats.block : defender.stats.block;
  const def = roll(defStat + defender.stats.speed * 0.3 + matchBonus);
  const defWin = def >= atk;
  // シュート守備で防ぎ切れなければ、 シュートはGKへ continue (こぼさず原作通りGK勝負)。
  if (aiAction === "shoot" && !defWin) {
    log(`${defender.name}の${optLabel}及ばず。 ${attacker.name}のシュートはGKへ。`);
    runAiAction(attacker, "shoot", aiTier, token);
    return;
  }
  const defForce = option === "tackle" ? "tackle" : option === "block" ? "block" : "intercept";
  const detail = `守備値 ${Math.round(def)} / 攻撃値 ${Math.round(atk)}${matched ? " / 読み的中" : " / 読み外し"}`;
  const flowType = aiAction === "dribble" ? "contest" : aiAction === "shoot" ? "shoot" : "pass";
  // 多段: 敵の仕掛け+こちらの守備発動 → 読み合いの合否。
  const beats = [
    { scene: { type: flowType, attacker, defender, message: `${attacker.name}の${aiLabel}！ ${defender.name}が${optLabel}で読む！`, detail: matched ? "読み的中！" : "読み合い…", outcome: "", phase: "flow", focus: "defender", forceAction: defForce }, se: [defForce], ms: 900 },
  ];
  if (defWin) {
    // 阻止: タックル=競り合いアリーナ / パスカット=インターセプト / ブロック=シュート阻止。
    if (option === "tackle") {
      beats.push({ scene: { type: "contest", attacker, defender, message: `${defender.name}の${optLabel}が刺さった！${matched ? "読み的中、" : ""}ボール奪取！`, detail, outcome: "fail", phase: "result" }, judge: "tackle", se: ["save"], hitstop: 66 });
    } else if (option === "block") {
      beats.push({ scene: { type: "shoot", attacker, defender, message: `${defender.name}が体を投げ出してブロック！${matched ? "読み的中、" : ""}シュートを止めた！`, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "block" }, judge: "save", se: ["save"], hitstop: 80 });
    } else {
      beats.push({ scene: { type: "pass", attacker, defender, message: `${defender.name}が${optLabel}！${matched ? "読み的中、" : ""}ボール奪取！`, detail, outcome: "fail", phase: "result", focus: "defender", forceAction: "intercept" }, judge: "intercept", se: ["save"], hitstop: 66 });
    }
  } else {
    beats.push(aiAction === "dribble"
      ? { scene: { type: "contest", attacker, defender, message: `${attacker.name}が${defender.name}の${optLabel}をかわして突破！`, detail, outcome: "success", phase: "result" }, judge: "break", se: ["dribble-break"] }
      : { scene: { type: "pass", attacker, defender, message: `${attacker.name}が${defender.name}を越えてパスを通した！`, detail, outcome: "success", phase: "result", focus: "attacker", forceAction: "pass" }, judge: "through", se: ["pass-success"] });
  }
  const apply = () => {
    if (defWin) {
      const stat = option === "tackle" ? "tackles" : option === "block" ? "saves" : "intercepts";
      bumpStat(defender.side, stat); bumpPlayerStat(defender, stat);
      knockbackBall(attacker, defender, 9);
      turnover(defender, `${defender.name}が${attacker.name}の${aiLabel}を${optLabel}で止めた。`);
    } else if (aiAction === "dribble") {
      advanceCarrier(attacker, 14);
    } else {
      const recv = nearestMateAhead(attacker);
      if (recv) { state.match.carrierId = recv.id; recv.x = clamp(recv.x + (recv.side === "home" ? 8 : -8), 8, 92); }
    }
  };
  log(`${defender.name} ${optLabel} vs ${attacker.name} ${aiLabel}。${detail}。`);
  runPlay(beats, apply, token);
}

function moveAiPlayers() {
  const carrier = getCarrier();
  allPlayers().forEach((player) => {
    if (player.role === "GK") {
      keepGoalkeeperInGoal(player);
      return;
    }
    if (player.id === carrier.id) return;
    const dir = player.side === "home" ? 1 : -1;
    const ballPull = player.side === carrier.side ? 2.5 : -1.5;
    const initial = player.initialSlot || { x: player.x, y: player.y };
    const homePull = 0.07;
    const bounds = roleBounds(player);
    player.x = clamp(
      player.x + dir * (rng() * 3 + ballPull) + (initial.x - player.x) * homePull,
      bounds.minX,
      bounds.maxX,
    );
    player.y = clamp(
      player.y + (carrier.y - player.y) * 0.06 + (initial.y - player.y) * homePull + (rng() * 6 - 3),
      12,
      88,
    );
  });
}

function roleBounds(player) {
  const home = player.side === "home";
  if (player.role === "DF") return home ? { minX: 10, maxX: 44 } : { minX: 56, maxX: 90 };
  if (player.role === "MF") return home ? { minX: 22, maxX: 68 } : { minX: 32, maxX: 78 };
  if (player.role === "FW") return home ? { minX: 38, maxX: 92 } : { minX: 8, maxX: 62 };
  return home ? { minX: 6, maxX: 6 } : { minX: 94, maxX: 94 };
}

const JUDGE_MAP = {
  goal: { kind: "goal", text: "GOAL!!", sub: "ゴーーール!!" },
  save: { kind: "save", text: "SAVE!!", sub: "セービング" },
  cut: { kind: "cut", text: "CUT!!", sub: "ぱすカット" },
  stop: { kind: "stop", text: "STOP!", sub: "クリーンタックル" },
  break: { kind: "break", text: "BREAK!!", sub: "突破" },
  through: { kind: "through", text: "THROUGH!", sub: "スルーパス成功" },
  support: { kind: "support", text: "SUPPORT!!", sub: "連携スペル" },
  intercept: { kind: "cut", text: "INTERCEPT!", sub: "インターセプト" },
  tackle: { kind: "stop", text: "TACKLE!", sub: "タックル成功" },
  halftime: { kind: "support", text: "HALFTIME", sub: "前半終了 / 全員霊力+20" },
};

function showJudge(key) {
  const data = JUDGE_MAP[key];
  if (!data) return;
  state.judge = { kind: data.kind, text: data.text, subText: data.sub };
  if (key === "goal") {
    state.fieldShake = true;
    window.clearTimeout(state.fieldShakeTimer);
    state.fieldShakeTimer = window.setTimeout(() => {
      state.fieldShake = false;
      render();
    }, animMs(330));
  }
  window.clearTimeout(state.judgeTimer);
  state.judgeTimer = window.setTimeout(() => {
    state.judge = null;
    render();
  }, animMs(key === "halftime" ? 1200 : 470));
}

function bumpStat(side, key) {
  if (!state.match || !state.match.stats) return;
  state.match.stats[side][key] = (state.match.stats[side][key] || 0) + 1;
}

function bumpPlayerStat(player, key) {
  if (!state.match) return;
  if (!state.match.playerStats) state.match.playerStats = {};
  const ps = state.match.playerStats[player.id] || (state.match.playerStats[player.id] = { id: player.id, name: player.name, side: player.side, role: player.role, goals: 0, saves: 0, tackles: 0, intercepts: 0, passes: 0, dribbles: 0, spellsUsed: 0, ultimatesUsed: 0 });
  ps[key] = (ps[key] || 0) + 1;
  // XP grant (home roster only)
  gainXp(player, key === "ultimatesUsed" ? "ultimate" : key === "spellsUsed" ? "spell" : key === "goals" ? "goal" : key === "saves" ? "save" : key === "tackles" ? "tackle" : key === "intercepts" ? "intercept" : key === "passes" ? "pass" : key === "dribbles" ? "dribble" : null);
}

function renderJudge() {
  const j = state.judge;
  if (!j) return "";
  return `
    <div class="judge-overlay" data-kind="${j.kind}">
      <div class="judge-flash" data-kind="${j.kind}"></div>
      ${j.kind === "goal" ? `<div class="judge-burst"></div>` : ""}
      <div class="judge-stamp" data-kind="${j.kind}">
        <span class="judge-text">${j.text}</span>
        ${j.subText ? `<span class="judge-sub">${j.subText}</span>` : ""}
      </div>
    </div>
  `;
}

function startVn(panels, title, onComplete) {
  // テスト/デバッグ用の skip フラグ
  if (window.__touhouSpellFutsalSkipStory) {
    if (onComplete) onComplete();
    else render();
    return;
  }
  state.vnScene = { panels, index: 0, title: title || "", onComplete: onComplete || null };
  audio.play("select");
  render();
}

function advanceVn() {
  if (!state.vnScene) return;
  audio.play("page-turn");
  state.vnScene.index += 1;
  if (state.vnScene.index >= state.vnScene.panels.length) {
    const cb = state.vnScene.onComplete;
    state.vnScene = null;
    if (cb) cb();
    else render();
  } else {
    render();
  }
}

function skipVn() {
  if (!state.vnScene) return;
  const cb = state.vnScene.onComplete;
  state.vnScene = null;
  if (cb) cb();
  else render();
}

function findRosterChar(id) {
  for (const team of TEAMS) {
    const found = team.members.find((m) => m.id === id);
    if (found) return { ...found, teamId: team.id, teamName: team.name };
  }
  return null;
}

function renderVnScene() {
  if (!state.vnScene) return "";
  const panel = state.vnScene.panels[state.vnScene.index];
  if (!panel) return "";
  const speakerChar = findRosterChar(panel.speaker);
  const cast = (panel.cast || [panel.speaker]).map(findRosterChar).filter(Boolean);
  const portraits = cast.map((c) => {
    const has = AVAILABLE_PORTRAITS.has(c.id);
    const isActive = c.id === panel.speaker;
    return `<div class="vn-cast ${isActive ? "active" : ""}">
      ${has ? `<img src="${portraitPath(c)}" alt="${c.name}" />` : `<span class="vn-cast-fallback">${c.name.slice(0, 1)}</span>`}
    </div>`;
  }).join("");
  const total = state.vnScene.panels.length;
  return `
    <div class="vn-modal">
      <div class="vn-modal-bg"></div>
      ${state.vnScene.title ? `<div class="vn-title-banner">${state.vnScene.title}</div>` : ""}
      <div class="vn-cast-row">${portraits}</div>
      <div class="vn-box-large" data-action="vn-advance">
        <div class="vn-speaker">${speakerChar ? speakerChar.name : ""}<span class="vn-speaker-team">${speakerChar ? speakerChar.teamName : ""}</span></div>
        <p class="vn-text">${panel.text}</p>
        <div class="vn-progress">${state.vnScene.index + 1} / ${total}　<span class="vn-hint">▼ クリック / Space で進む / Esc でスキップ</span></div>
      </div>
    </div>
  `;
}

function showCutin(text, player = null, flavor = "") {
  window.clearTimeout(state.cutinTimer);
  window.clearTimeout(state.cutinFrameTimer);
  // スペルカットイン(見せ場)は VS 画面より前面に立てる。 早押しで VS が残っていても消す。
  if (player) {
    window.clearTimeout(state.vsScreenTimer);
    state.vsScreen = null;
  }
  // 表示フレーム列。 スペルカットイン (player有) は {id}.png(タメ) + {id}_b.png(放出) を
  // ディレイ式にめくってスプライト風アニメにする。 _b.png 欠落時は onerror で frame0 にフォールバック。
  let frames = [];
  if (player && AVAILABLE_CUTINS.has(player.id)) {
    frames = [cutinFramePath(player, 0), cutinFramePath(player, 1)];
  } else if (player && AVAILABLE_PORTRAITS.has(player.id)) {
    frames = [portraitPath(player)];
  }
  const isUlti = typeof text === "string" && text.endsWith("真");
  state.cutin = {
    text,
    flavor: flavor || "",
    playerName: player ? player.name : "",
    isSpell: Boolean(player),
    frames,
    frameIndex: 0,
    fallback: frames[0] || "",
  };
  // 必殺技 SE: 表示時にチャージ(タメ)音。
  if (player) audio.play(isUlti ? "ultimate-charge" : "spell-charge");
  // 2 枚以上ならディレイ式にめくり、 放出フレーム到達時にインパクト音を同期。
  if (frames.length > 1) {
    const flip = () => {
      if (!state.cutin) return;
      state.cutin.frameIndex = (state.cutin.frameIndex + 1) % state.cutin.frames.length;
      if (state.cutin.frameIndex === 1) audio.play(isUlti ? "ultimate-impact" : "spell-impact");
      render();
      state.cutinFrameTimer = window.setTimeout(flip, animMs(180));
    };
    state.cutinFrameTimer = window.setTimeout(flip, animMs(180));
  }
  state.cutinTimer = window.setTimeout(() => {
    state.cutin = null;
    render();
  }, animMs(player ? 1200 : 540));
}

// 汎用アクションスプライト (assets/anim/{type}_{n}.png) のフレーム数。 ディレイ式にめくる。
const ACTION_ANIM_FRAMES = {
  shoot: 2, pass: 2, dribble: 2, tackle: 2, intercept: 2, gk_save: 2, goal: 3, kickoff: 1,
};

function actionAnimFrames(type) {
  const n = ACTION_ANIM_FRAMES[type];
  if (!n) return [];
  return Array.from({ length: n }, (_, i) => `./assets/anim/${type}_${i + 1}.png`);
}

// 見せ場 (シュート/ゴール/セーブ) は長く、 routine (ドリブル/パス/守備) は短く=周回テンポ確保。
const ACTION_CUTIN_BIG = new Set(["shoot", "goal", "gk_save"]);

// キャプ翼風: 通常アクションの見せ場を汎用スプライトの大型カットインで前面表示 (タメ→放出のめくり)。
function showActionCutin(type, label, flavor = "") {
  const frames = actionAnimFrames(type);
  if (!frames.length) return;
  window.clearTimeout(state.cutinTimer);
  window.clearTimeout(state.cutinFrameTimer);
  window.clearTimeout(state.vsScreenTimer);
  state.vsScreen = null;
  const big = ACTION_CUTIN_BIG.has(type);
  state.cutin = {
    text: label,
    flavor: flavor || "",
    playerName: "",
    isSpell: false,
    isAction: true,
    frames,
    frameIndex: 0,
    fallback: frames[0],
  };
  if (frames.length > 1) {
    const flip = () => {
      if (!state.cutin) return;
      state.cutin.frameIndex = (state.cutin.frameIndex + 1) % state.cutin.frames.length;
      render();
      state.cutinFrameTimer = window.setTimeout(flip, animMs(big ? 150 : 130));
    };
    state.cutinFrameTimer = window.setTimeout(flip, animMs(big ? 150 : 130));
  }
  state.cutinTimer = window.setTimeout(() => {
    state.cutin = null;
    render();
  }, animMs(big ? 900 : 620));
}

function clearActionSceneLater() {
  window.clearTimeout(state.actionSceneTimer);
  state.actionSceneTimer = window.setTimeout(() => {
    if (!state.match || state.battle || state.match.finished) return;
    state.actionScene = null;
    render();
  }, animMs(2600));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function render() {
  const app = document.getElementById("app");
  const screenHtml = state.screen === "setup"
    ? renderSetup()
    : state.screen === "gallery"
      ? renderGallery()
      : state.screen === "help"
        ? renderHelp()
        : renderMatch();
  // VN scene は screen に関わらず常時 overlay (campaign opening 時 setup から呼ばれる)
  app.innerHTML = screenHtml + (state.vnScene ? renderVnScene() : "");
  bindEvents();
  bindKeyboardEvents();
}

function renderSetup() {
  const home = findTeam(state.homeTeamId);
  const away = findTeam(state.awayTeamId);
  const rewards = clearRewardLabels();
  const savedMatch = loadMatch();
  return `
    <section class="setup">
      ${savedMatch ? `
        <div class="resume-banner">
          <div>
            <strong>途中の試合があります</strong>
            <span>${findTeam(savedMatch.match.home.id).name} ${savedMatch.match.score.home} - ${savedMatch.match.score.away} ${findTeam(savedMatch.match.away.id).name} (${savedMatch.match.half === 2 ? "後半" : "前半"})</span>
          </div>
          <div class="resume-actions">
            <button class="primary" data-action="resumeMatch">試合を再開する</button>
            <button data-action="discardMatch">破棄</button>
          </div>
        </div>
      ` : ""}
      <div class="hero">
        <div class="hero-copy">
          <h1>東方スペルサッカー</h1>
          <p class="setup-copy">11vs11、前後半の時間制(ロスタイムあり)。接触はコマンドバトル、シュートはGK戦。8チーム88キャラ入り、キャプテン翼風スペルバトル。</p>
        </div>
        <div class="versus-preview">
          <img src="${teamCg(home)}" alt="${home.name}" />
          <img src="${teamCg(away)}" alt="${away.name}" />
        </div>
      </div>
      <div class="progress-summary">
        <strong>解放チーム ${state.progress.unlockedTeams.length} / ${TEAMS.length}</strong>
        <span>クリア回数 ${state.progress.campaignClears}</span>
        <span>報酬 ${rewards.length ? rewards.join(" / ") : "未獲得"}</span>
        <button data-action="toggleAudio">${state.progress.audioMuted ? "音 ON" : "音 OFF"}</button>
        <button data-action="resetProgress">進行リセット</button>
      </div>
      <div class="difficulty-row">
        <button class="${state.progress.difficulty === "easy" ? "selected-mode" : ""}" data-action="difficulty" data-difficulty="easy">EASY</button>
        <button class="${state.progress.difficulty === "normal" ? "selected-mode" : ""}" data-action="difficulty" data-difficulty="normal">NORMAL</button>
        <button class="${state.progress.difficulty === "hard" ? "selected-mode" : ""}" data-action="difficulty" data-difficulty="hard">HARD</button>
      </div>
      <div class="formation-row">
        <span class="formation-label">フォーメーション</span>
        <button class="formation-btn ${state.progress.formation === "4-4-2" ? "selected-mode" : ""}" data-action="formation" data-formation="4-4-2">
          ${renderFormationDiagram("4-4-2")}
          <span>4-4-2</span>
        </button>
        <button class="formation-btn ${state.progress.formation === "4-3-3" ? "selected-mode" : ""}" data-action="formation" data-formation="4-3-3">
          ${renderFormationDiagram("4-3-3")}
          <span>4-3-3</span>
        </button>
        <button class="formation-btn ${state.progress.formation === "3-5-2" ? "selected-mode" : ""}" data-action="formation" data-formation="3-5-2">
          ${renderFormationDiagram("3-5-2")}
          <span>3-5-2</span>
        </button>
      </div>
      <div class="tactic-row">
        <span class="formation-label">戦術</span>
        <button class="${state.progress.tactic === "normal" ? "selected-mode" : ""}" data-action="tactic" data-tactic="normal">通常</button>
        <button class="${state.progress.tactic === "offensive" ? "selected-mode" : ""}" data-action="tactic" data-tactic="offensive">攻撃的</button>
        <button class="${state.progress.tactic === "defensive" ? "selected-mode" : ""}" data-action="tactic" data-tactic="defensive">守備的</button>
        <button class="${state.progress.tactic === "counter" ? "selected-mode" : ""}" data-action="tactic" data-tactic="counter">カウンター</button>
      </div>
      <div class="anim-speed-row difficulty-row">
        <span class="formation-label">演出速度</span>
        <button class="${state.progress.animSpeed === "normal" ? "selected-mode" : ""}" data-action="animSpeed" data-speed="normal">標準</button>
        <button class="${state.progress.animSpeed === "fast" ? "selected-mode" : ""}" data-action="animSpeed" data-speed="fast">高速</button>
        <button class="${state.progress.animSpeed === "instant" ? "selected-mode" : ""}" data-action="animSpeed" data-speed="instant">瞬間</button>
      </div>
      <div class="mode-row">
        <button class="${state.mode === "campaign" ? "selected-mode" : ""}" data-action="mode" data-mode="campaign">ストーリー</button>
        <button class="${state.mode === "free" ? "selected-mode" : ""}" data-action="mode" data-mode="free">フリー対戦</button>
        <button data-action="openGallery">ギャラリー</button>
        <button data-action="openHelp">遊び方</button>
      </div>
      <div class="team-select-grid">
        <div>
          <h2 class="section-title">自チーム${state.mode === "campaign" ? ` <span class="campaign-note">ストーリーは博麗神社専用</span>` : ""}</h2>
          <div class="team-list">${TEAMS.map((team) => teamButton(team, "home", state.mode === "campaign" && team.id !== "hakurei")).join("")}</div>
        </div>
        <div>
          <h2 class="section-title">相手チーム</h2>
          <div class="team-list">${TEAMS.map((team) => teamButton(team, "away", state.mode === "campaign" && team.id === "hakurei")).join("")}</div>
        </div>
      </div>
      <div class="start-row">
        <span>${state.mode === "campaign" ? `${home.name}で7連戦に挑む` : `選択中: ${home.name} vs ${away.name}`}</span>
        <button class="primary" data-action="${state.mode === "campaign" ? "startCampaign" : "start"}">${state.mode === "campaign" ? "異変開始" : "試合開始"}</button>
      </div>
    </section>
  `;
}

function teamButton(team, side, locked = false) {
  const selected = side === "home" ? state.homeTeamId === team.id : state.awayTeamId === team.id;
  const unlocked = state.progress.unlockedTeams.includes(team.id);
  // locked = ストーリーモードで博麗神社以外の自チーム枠 (POV 整合のため選択不可)。
  const attrs = locked ? "disabled" : `data-select="${side}" data-team="${team.id}"`;
  return `
    <button class="team-button ${selected ? "selected" : ""} ${unlocked ? "unlocked" : "locked"} ${locked ? "campaign-locked" : ""}" ${attrs}>
      <img src="${teamCg(team)}" alt="${team.name}" />
      <span class="team-button-copy">
        <strong>${team.name}</strong>
        <span>${locked ? "ストーリー対象外" : `${team.style} / ${unlocked ? "解放済み" : "未解放"}`}</span>
        <span class="team-members">${team.members.map((member) => member.name).join(" / ")}</span>
      </span>
    </button>
  `;
}

function renderMatch() {
  const match = state.match;
  const carrier = getCarrier();
  const defender = carrier ? nearestOpponent(carrier) : null;
  // 上段の大スロット = アニメ主役・フィールド従。 演出/結果/エンカウント/送り待ち時は CG ショーケース、
  // 自由移動・コマンド選択中はピッチ。 (.field は DOM 常駐=ボール座標/トークン/cutin/テスト互換)
  const scene = state.actionScene;
  // 上段は常にアニメ主役。 自由移動中は保持者のドリブルスプライト、 エンカウント/結果は action CG。
  const freeMove = match.possession === "home" && !state.battle && !state.advance && !state.passPicker
    && !state.gkChoice && !state.interrupt && !state.playSeq && carrier;
  let stageScene = (scene && (scene.phase === "result" || scene.phase === "flow" || scene.phase === "move")) ? scene : null;
  if (!stageScene && freeMove) {
    stageScene = { type: "dribble", attacker: carrier, defender, message: "", detail: "", outcome: "", phase: "move", focus: "attacker", forceAction: "dribble" };
  }
  // パス先ピッカー中はピッチを表示する (badge は .field 内に座標配置=CG showcase で隠れると
  // クリック不能になるため)。 パスは「ピッチ上で味方位置を見て出す」ので原作的にも正しい。
  const showCG = !state.passPicker && !!(state.battle || state.gkChoice || state.advance || state.cutin || state.playSeq || stageScene);
  const isGoal = !!(scene && scene.outcome === "goal");
  const isCelebrate = !!(scene && scene.outcome === "celebrate");
  // POV-A: シュートがGKに迫る局面 (GK行動=focus defender) を背後ローアングル遠近で見せる。
  const isPovA = !!(scene && scene.type === "shoot" && scene.focus === "defender" && !isGoal && !isCelebrate);
  return `
    <div class="app-shell in-match">
      <section class="match-area ct3">
        <div class="match-toolbar">
          <span class="mt-title">東方スペルサッカー</span>
          <span class="mt-spacer"></span>
          <button class="mt-btn" data-action="openGallery">ギャラリー</button>
          <button class="mt-btn" data-action="openHelp">遊び方</button>
          <button class="mt-btn auto-toggle ${state.progress.autoAdvance ? "on" : ""}" data-action="toggleAuto" title="ONで自動的にメッセージを送る">自動送り ${state.progress.autoAdvance ? "ON" : "OFF"}</button>
          <button class="mt-btn" data-action="toggleDrawer" title="ログ/ステータス">${state.drawerOpen ? "▾ 閉じる" : "▸ 詳細"}</button>
          ${!match.finished ? `<button class="mt-btn" data-action="reset">チーム選択へ戻る</button>` : ""}
        </div>
        <div class="match-stage ${showCG ? "stage-cg" : "stage-pitch"} ${state.fieldShake ? "shake" : ""} ${state.hitstop ? "hitstop" : ""}">
          <div class="field ${encounterFieldClass(carrier, defender)}">
            <div class="goal-label home-goal">自陣ゴール</div>
            <div class="goal-label away-goal">相手ゴール</div>
            <div class="attack-arrow">攻撃方向 →</div>
            ${allPlayers().map((player) => renderToken(player, carrier, defender)).join("")}
            <div class="ball" style="left:${carrier.x}%;top:${carrier.y}%;"><span class="ball-icon">⚽</span></div>
            ${renderThreatOverlay(carrier, defender)}
            ${state.passPicker ? renderPassPicker() : ""}
          </div>
          ${showCG ? `<div class="field-cg ${stageScene ? stageScene.type : ""} ${stageScene && stageScene.type === "dribble" ? "grass-scroll" : ""} ${isGoal ? "is-goal" : ""} ${isCelebrate ? "is-celebrate" : ""} ${isPovA ? "is-povA" : ""}">
            ${stageScene && !isCelebrate ? actionHeroHtml(stageScene) : ""}
            ${isPovA ? renderPovForeground() : ""}
            ${isGoal ? renderGoalBanner(scene) : ""}
            ${isCelebrate ? renderCelebrateBanner(scene) : ""}
          </div>` : ""}
          ${state.cutin ? renderCutin() : ""}
        </div>
        <div class="ct3-panel">
          <div class="ct3-col ct3-left">
            <div class="ct3-box ct3-timer">
              <span class="ct3-half">${halfLabel(match)}</span>
              <span class="ct3-clock ${match.clock >= HALF_MIN ? "stoppage" : ""}">${clockTime(match)}</span>
            </div>
            <div class="ct3-box ct3-score" title="${match.home.name} ${match.score.home} - ${match.score.away} ${match.away.name}">
              <div class="ct3-score-flags">
                <span class="ct3-team-chip ${match.possession === "home" ? "on" : ""}" style="background:${teamColor("home")};color:${teamColor("home")}"></span>
                <span class="ct3-vs">×</span>
                <span class="ct3-team-chip ${match.possession === "away" ? "on" : ""}" style="background:${teamColor("away")};color:${teamColor("away")}"></span>
              </div>
              <div class="ct3-scoreline"><b>${match.score.home}</b><span class="ct3-hyphen">-</span><b>${match.score.away}</b></div>
            </div>
            <div class="ct3-box ct3-dist">${carrier.name} / ゴールまで <b>${Math.round(goalDistance(carrier))}</b>${match.ballAir ? `<span class="air-badge">⤴ 高い球! シュートで空中技</span>` : ""}</div>
          </div>
          <div class="ct3-col ct3-mid">
            ${renderCt3MatchupBox(scene, carrier, defender)}
            ${scene && scene.type === "kickoff" && match.preMatchDialogue ? renderEventDialogue(match.preMatchDialogue) : ""}
            ${renderActionScene()}
            <div class="ct3-box ct3-map" title="フィールドマップ"><div class="ct3-map-title">MAP</div>${renderRadar(carrier)}</div>
          </div>
          <div class="ct3-col ct3-right">
            ${state.advance ? `
              <button class="advance-btn" data-action="advancePlay">▶ 次へ<span class="advance-hint">クリック / Space / Enter${state.progress.autoAdvance ? " (自動送りON)" : ""}</span></button>
            ` : disableHomeTurn() ? `
              ${renderCarrierStatBox(carrier)}
            ` : `
              <div class="command-title">コマンド <button class="cmd-menu-open" data-action="openCommandMenu" ${disableHomeTurn()} title="原作Bボタン式 方向コマンドメニュー">▤ メニュー(Space)</button></div>
              <button class="cmd-row" data-action="step" data-dx="1" data-dy="0" ${disableHomeTurn()}><span class="cmd-cursor">▌</span> ドリブル前進<span class="cmd-key">1</span></button>
              <button class="cmd-row" data-action="battle" data-type="pass" ${disableHomeTurn()}><span class="cmd-cursor">▌</span> パス<span class="cmd-key">2</span></button>
              <button class="cmd-row ${match.ballAir ? "aerial" : ""}" data-action="battle" data-type="shoot" ${disableHomeTurn()}><span class="cmd-cursor">▌</span> ${match.ballAir ? "空中シュート" : "シュート"}<span class="cmd-key">3</span></button>
              <button class="cmd-row" data-action="battle" data-type="oneTwo" ${disableHomeTurn()}><span class="cmd-cursor">▌</span> ワンツー<span class="cmd-key">4</span></button>
              <button class="cmd-row" data-action="battle" data-type="team" ${disableHomeTurn()}><span class="cmd-cursor">▌</span> 連携スペル<span class="cmd-key">5</span></button>
              <div class="team-cmd-row">
                <span class="team-cmd-label">チーム</span>
                <button class="team-cmd-btn" data-action="teamCmd" data-cmd="advance" ${disableHomeTurn()} title="全員前へ">みんなあがれ</button>
                <button class="team-cmd-btn" data-action="teamCmd" data-cmd="retreat" ${disableHomeTurn()} title="全員後ろへ">みんなもどれ</button>
              </div>
              <div class="move-pad" title="自由8方向移動 (WASD/QEZC) — 敵が近いとエンカウント">
                <button class="move-btn" data-action="step" data-dx="1" data-dy="-1" title="前左 (Q)">↖</button>
                <button class="move-btn primary" data-action="step" data-dx="1" data-dy="0" title="前進 (W)">▲</button>
                <button class="move-btn" data-action="step" data-dx="1" data-dy="1" title="前右 (E)">↗</button>
                <button class="move-btn" data-action="step" data-dx="0" data-dy="-1" title="左 (A)">◀</button>
                <span class="move-center">移動</span>
                <button class="move-btn" data-action="step" data-dx="0" data-dy="1" title="右 (D)">▶</button>
                <button class="move-btn" data-action="step" data-dx="-1" data-dy="-1" title="後左 (Z)">↙</button>
                <button class="move-btn" data-action="step" data-dx="-1" data-dy="0" title="後退 (S)">▼</button>
                <button class="move-btn" data-action="step" data-dx="-1" data-dy="1" title="後右 (C)">↘</button>
              </div>
            `}
          </div>
        </div>
      </section>
      <aside class="match-drawer ${state.drawerOpen ? "open" : ""}" aria-hidden="${state.drawerOpen ? "false" : "true"}">
        <div class="drawer-head">
          <span class="drawer-title">詳細 / ログ</span>
          <button class="drawer-close" data-action="toggleDrawer">✕</button>
        </div>
        <div class="team-cg-strip">
          <img src="${teamCg(match.home)}" alt="${match.home.name}" />
          <img src="${teamCg(match.away)}" alt="${match.away.name}" />
        </div>
        <div class="panel-section">
          <h2 class="section-title">保持者ステータス</h2>
          ${renderStatusCard(carrier)}
        </div>
        <div class="panel-section">
          <h2 class="section-title">対峙者ステータス</h2>
          ${renderStatusCard(defender)}
        </div>
        <div class="panel-section">
          ${state.mode === "campaign" && state.campaign ? `<div class="campaign-progress">STAGE ${state.campaign.index + 1} / ${state.campaign.opponents.length}　勝利 ${state.campaign.wins}</div>` : ""}
        </div>
        <div class="log">${state.logs.map((entry) => `<div class="log-entry">${entry}</div>`).join("")}</div>
      </aside>
    </div>
    ${match.finished ? `<div class="result-overlay">${renderResultPanel()}</div>` : ""}
    ${state.battle ? renderBattle() : ""}
    ${state.vsScreen ? renderVsScreen() : ""}
    ${state.interrupt ? renderInterruptPrompt() : ""}
    ${state.gkChoice ? renderGkChoice() : ""}
    ${state.commandMenu ? renderCommandMenu() : ""}
    ${state.crashScene ? renderCrashScene() : ""}
    ${state.screenFlash ? `<div class="screen-flash"></div>` : ""}
    ${state.judge ? renderJudge() : ""}
    ${state.halftimeReport ? renderHalftimeReport() : ""}
  `;
}

function renderHalftimeReport() {
  if (!state.match || !state.match.stats) return "";
  const m = state.match;
  return `
    <div class="halftime-report">
      <div class="ht-card">
        <div class="ht-title">HALFTIME REPORT</div>
        <div class="ht-score">${m.home.name} <span class="ht-score-num">${m.score.home}</span> - <span class="ht-score-num">${m.score.away}</span> ${m.away.name}</div>
        ${renderMatchStats(m)}
        <div class="ht-hint">後半 開始 — 全員霊力 +20 回復</div>
      </div>
    </div>
  `;
}

function renderResultPanel() {
  const match = state.match;
  const text = match.score.home === match.score.away
    ? "DRAW"
    : match.score.home > match.score.away
      ? `${match.home.name} WIN`
      : `${match.away.name} WIN`;
  const campaignWon = state.mode === "campaign" && match.winner === "home";
  const campaignCleared = campaignWon && state.campaign && state.campaign.index >= state.campaign.opponents.length - 1;
  const dialogue = resultDialogue(match);
  return `
    <div class="panel-section result-panel">
      <h2>${text}</h2>
      ${renderResultDialogue(dialogue)}
      ${renderMvp(match)}
      ${renderMatchStats(match)}
      ${match.unlockedTeamId ? `<p>${findTeam(match.unlockedTeamId).name} 解放</p>` : ""}
      ${match.rewardMessage ? `<p class="reward-message">${match.rewardMessage}</p>` : ""}
      ${campaignWon && !campaignCleared ? `<button class="primary" data-action="nextCampaign">次の対戦へ</button>` : ""}
      ${campaignCleared ? `<p class="ending-cta-text">幻想郷トーナメント 制覇</p><button class="primary" data-action="viewEnding">エンディングを見る</button>` : ""}
      <button class="primary" data-action="retry">再戦する</button>
      <button data-action="reset">チーム選択へ戻る</button>
    </div>
  `;
}

function pickMvp(match) {
  if (!match.playerStats) return null;
  const candidates = Object.values(match.playerStats);
  if (!candidates.length) return null;
  // 重み付け: goal x5 + save x3 + tackle x2 + intercept x2 + ultimate x2 + spell x1
  const score = (s) => (s.goals||0)*5 + (s.saves||0)*3 + (s.tackles||0)*2 + (s.intercepts||0)*2 + (s.ultimatesUsed||0)*2 + (s.spellsUsed||0) + (s.passes||0)*0.5 + (s.dribbles||0)*0.5;
  candidates.sort((a, b) => score(b) - score(a));
  const top = candidates[0];
  return { ...top, score: score(top) };
}

function renderMvp(match) {
  const mvp = pickMvp(match);
  if (!mvp) return "";
  const player = allPlayers().find((p) => p.id === mvp.id);
  if (!player) return "";
  const xp = state.progress.playerXp && state.progress.playerXp[mvp.id];
  const lines = [];
  if (mvp.goals > 0) lines.push(`ゴール ${mvp.goals}`);
  if (mvp.saves > 0) lines.push(`セーブ ${mvp.saves}`);
  if (mvp.tackles > 0) lines.push(`タックル ${mvp.tackles}`);
  if (mvp.intercepts > 0) lines.push(`インターセプト ${mvp.intercepts}`);
  if (mvp.ultimatesUsed > 0) lines.push(`究極 ${mvp.ultimatesUsed}`);
  return `
    <div class="mvp-card">
      <div class="mvp-badge">MAN OF THE MATCH</div>
      <div class="mvp-row">
        ${renderPortrait(player, "mvp")}
        <div class="mvp-info">
          <strong>${player.name}</strong>
          <span class="mvp-team">${player.teamName} / ${player.role}</span>
          ${xp ? `<span class="mvp-level">Lv ${xp.level} (${xp.xp} XP)</span>` : ""}
          <span class="mvp-stats">${lines.join(" / ") || "活躍 中"}</span>
        </div>
      </div>
    </div>
  `;
}

function renderMatchStats(match) {
  if (!match.stats) return "";
  const rows = [
    ["シュート", match.stats.home.shots, match.stats.away.shots],
    ["ゴール", match.stats.home.goals, match.stats.away.goals],
    ["パス", match.stats.home.passes, match.stats.away.passes],
    ["ドリブル", match.stats.home.dribbles, match.stats.away.dribbles],
    ["タックル", match.stats.home.tackles, match.stats.away.tackles],
    ["セーブ", match.stats.home.saves, match.stats.away.saves],
    ["インターセプト", match.stats.home.intercepts, match.stats.away.intercepts],
    ["スペル発動", match.stats.home.spellsUsed, match.stats.away.spellsUsed],
  ];
  return `
    <div class="match-stats">
      <div class="stats-head">
        <span class="stat-team home-side">${match.home.name}</span>
        <span class="stat-label">統計</span>
        <span class="stat-team away-side">${match.away.name}</span>
      </div>
      ${rows.map(([label, h, a]) => `
        <div class="stat-row ${h > a ? "home-lead" : a > h ? "away-lead" : ""}">
          <span class="stat-num">${h}</span>
          <span class="stat-bar">
            <span class="bar-h" style="width:${barPct(h, a, "h")}%"></span>
            <span class="bar-mid">${label}</span>
            <span class="bar-a" style="width:${barPct(h, a, "a")}%"></span>
          </span>
          <span class="stat-num">${a}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function barPct(h, a, side) {
  const total = h + a;
  if (total === 0) return 50;
  return Math.round((side === "h" ? h : a) / total * 100);
}

function renderGallery() {
  const players = allRosterPlayers();
  return `
    <section class="gallery-screen">
      <div class="gallery-header">
        <div>
          <h1>ギャラリー</h1>
          <p>チームCG ${TEAMS.length}枚 / ポートレート ${players.length}枚 / カットイン ${players.length}枚</p>
        </div>
        <button data-action="closeGallery">戻る</button>
      </div>
      <h2 class="section-title">チームCG</h2>
      <div class="gallery-grid team-gallery">
        ${TEAMS.map((team) => `
          <figure>
            <img src="${teamCg(team)}" alt="${team.name}" />
            <figcaption>${team.name}</figcaption>
          </figure>
        `).join("")}
      </div>
      <h2 class="section-title">キャラポートレート</h2>
      <div class="gallery-grid portrait-gallery">
        ${players.map((player) => `
          <figure>
            <img src="${portraitPath(player)}" alt="${player.name}" />
            <figcaption>${player.name}</figcaption>
          </figure>
        `).join("")}
      </div>
      <h2 class="section-title">スペルカットイン</h2>
      <div class="gallery-grid cutin-gallery">
        ${players.map((player) => `
          <figure>
            <img src="${cutinPath(player)}" alt="${player.spell}" />
            <figcaption>${player.name}</figcaption>
          </figure>
        `).join("")}
      </div>
    </section>
  `;
}

function renderHelp() {
  return `
    <section class="help-screen">
      <div class="gallery-header">
        <div>
          <h1>遊び方</h1>
          <p>キャプテン翼2/3 + 東方サッカー風の、サッカーを題材にしたコマンドRPGです。</p>
        </div>
        <button data-action="closeHelp">戻る</button>
      </div>
      <div class="help-grid">
        <article>
          <h2>試合の流れ</h2>
          <p>11vs11、前後半の時間制。タイムアップ時点で得点が多いチームの勝利。ロスタイムは長さ非表示(原作CT3の緊張感)。ボール保持者を中心に行動し、敵と接触するとコマンドバトル (VS 画面) に突入。</p>
        </article>
        <article>
          <h2>盤面ドリブル (WASD / 前進ボタン)</h2>
          <p>保持者を WASD で自由8方向に動かせます (▲移動パッド / Spaceで方向コマンドメニュー)。守備者が近いとドリブル勝負 (コマンドバトル) に。移動だけでは時間は進まず、接触・パス・シュートなどプレーの結果で時間が進みます。</p>
        </article>
        <article>
          <h2>コマンド (4方向)</h2>
          <p>↑ドリブル (その場で勝負)、←パス (味方候補から番号選択)、→シュート (GK戦)、↓連携スペル (次判定強化)。クリック or キーボード ↑↓←→ / 1-4 で操作。</p>
        </article>
        <article>
          <h2>メッセージ送り</h2>
          <p>1行動ごとに結果が表示され、▶次へ (クリック / Space / Enter) で進みます。相手の手も1つずつ送って読めます。サイドの「自動送り」ONで自動進行。</p>
        </article>
        <article>
          <h2>キーボード操作</h2>
          <p>WASD = 盤面移動 / ↑→↓← または 1-4 = コマンド / Space・Enter = 次へ・通常 / S = スペル / Esc = キャンセル / G = ギャラリー / H = 遊び方 / M = 音 ON OFF。</p>
        </article>
        <article>
          <h2>エンカウントの見方</h2>
          <p>carrier (金オーラ) と最寄り守備者 (赤破線リング) の間に赤い線。距離が近いほど赤が強くなり、ENGAGED!! バッジが出たら接触判定。</p>
        </article>
        <article>
          <h2>スペルと霊力</h2>
          <p>スペル発動は霊力を消費し、東方スペカ風カットイン (1.5 秒) で大幅な補正。霊力はターンごとに少し回復。</p>
        </article>
        <article>
          <h2>シュート vs GK</h2>
          <p>相手シュート時、自軍GKに「ジャンプキャッチ / パンチング / 飛び出し」3 択。パンチングはこぼれ球発生で攻防継続。</p>
        </article>
        <article>
          <h2>必殺 vs 必殺クラッシュ</h2>
          <p>スペル/究極シュートには GK 側も固有スペルで真っ向対抗できる「スペルセーブ」(霊力20、[4]) が出現。威力とセーブ値が拮抗すると火花を散らすクラッシュ、押し勝てば粉砕ゴール、受け切れず弾けばこぼれ球になります。</p>
        </article>
        <article>
          <h2>消耗ドラマ</h2>
          <p>霊力が減るほど技のキレが鈍り、攻撃値に負補正 (50%未満で-6、25%未満で-14)。終盤の体力管理が勝敗を分けます。ゴール時は状況実況 (📢) が流れます。</p>
        </article>
        <article>
          <h2>守備介入 (Interrupt)</h2>
          <p>敵のターン中に約 30% で「タックル / インターセプト / 待機」 prompt。霊力を消費して敵を止められる。</p>
        </article>
        <article>
          <h2>ストーリー</h2>
          <p>ストーリーは博麗神社視点専用の 7 連戦。勝利すると相手チームがフリー対戦で解放。途中の試合は自動保存され、再起動後も再開可能。他チームはフリー対戦で使えます。</p>
        </article>
        <article>
          <h2>スペルカード (固有技)</h2>
          <p>スペル / 究極を選ぶと、各キャラ固有のスペルカード名 (例: マスタースパークシュート、禁忌レーヴァテイン) とフレーバーがカットインに表示されます。究極は「・真」付き。</p>
        </article>
        <article>
          <h2>演出速度</h2>
          <p>標準 / 高速 / 瞬間 を Setup で切替。周回時はカットインや VS 画面を短縮。さらに表示中のカットイン・VS 画面はクリックで即スキップできます。</p>
        </article>
        <article>
          <h2>難易度</h2>
          <p>EASY (AI ランダム混合 + 弱)、NORMAL (AI 期待値スコアリング)、HARD (1 ターン先読み + 強)。制覇で初期霊力ボーナス。</p>
        </article>
        <article>
          <h2>フォーメーション</h2>
          <p>4-4-2 / 4-3-3 / 3-5-2 から選択可能。Setup 画面の Formation セクションで切替。</p>
        </article>
        <article>
          <h2>ギャラリー</h2>
          <p>ComfyUIで生成したチームCG 8 枚、88 人分のポートレート、88 人分のスペルカットインを閲覧。</p>
        </article>
        <article>
          <h2>判定演出</h2>
          <p>GOAL!! (画面爆発+フィールド振動)、SAVE!! (水色 セービング)、BREAK!! (突破)、CUT!! (パスカット)、SUPPORT!! (連携)。</p>
        </article>
      </div>
    </section>
  `;
}

function resultDialogue(match) {
  const side = match.winner === "away" ? "away" : "home";
  const team = match[side];
  const key = match.winner === "draw" ? "draw" : match.winner === side ? "win" : "lose";
  const data = RESULT_DIALOGUES[team.id] || RESULT_DIALOGUES.hakurei;
  const speaker = team.players.find((player) => player.id === data.speaker) || team.players[0];
  return { speaker, message: data[key], resultKey: key };
}

function renderResultDialogue(dialogue) {
  return `
    <div class="result-dialogue" data-result="${dialogue.resultKey}">
      ${renderPortrait(dialogue.speaker, "dialogue")}
      <div>
        <strong>${dialogue.speaker.name}</strong>
        <p>${dialogue.message}</p>
      </div>
    </div>
  `;
}

function renderEventDialogue(dialogue) {
  return `
    <div class="event-dialogue">
      ${renderPortrait(dialogue.speaker, "dialogue")}
      <div>
        <strong>${dialogue.speaker.name}</strong>
        <p>${dialogue.message}</p>
      </div>
    </div>
  `;
}

function renderFormationDiagram(formationKey) {
  const f = FORMATIONS[formationKey] || FORMATIONS["4-4-2"];
  const all = [
    ...f.GK.map((s) => ({ ...s, role: "GK" })),
    ...f.DF.map((s) => ({ ...s, role: "DF" })),
    ...f.MF.map((s) => ({ ...s, role: "MF" })),
    ...f.FW.map((s) => ({ ...s, role: "FW" })),
  ];
  const dots = all.map((p) => {
    const cx = (p.x / 60) * 100; // 60% scale for tiny diagram width
    const cy = p.y;
    const color = p.role === "GK" ? "#f8d679" : p.role === "DF" ? "#7ad8e6" : p.role === "MF" ? "#fff7df" : "#c91d3c";
    return `<circle cx="${cx}" cy="${cy}" r="6" fill="${color}" stroke="#000" stroke-width="1.5" />`;
  }).join("");
  return `
    <svg class="formation-diagram" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="100" height="100" fill="#2a5a3a" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
      ${dots}
    </svg>
  `;
}

function renderThreatOverlay(carrier, defender) {
  if (!carrier || !defender) return "";
  const d = distance(carrier, defender);
  let stateClass = "safe";
  if (d < 18) stateClass = "engaged";
  else if (d < 28) stateClass = "near";
  const showLine = d < 36;
  return `
    ${showLine ? `<svg class="threat-link" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="${carrier.x}" y1="${carrier.y}" x2="${defender.x}" y2="${defender.y}" class="threat-line ${stateClass}" /></svg>` : ""}
    <div class="encounter-badge" data-state="${stateClass}">ENGAGED!!</div>
  `;
}

function encounterFieldClass(carrier, defender) {
  if (!carrier || !defender) return "";
  const d = distance(carrier, defender);
  if (d < 18) return "engage-strong";
  if (d < 28) return "engage-near";
  return "";
}

function renderToken(player, carrier, defender) {
  const ratio = Math.min(1, player.maxGuts > 0 ? player.guts / player.maxGuts : 0);
  let staminaClass = "full";
  if (ratio < 0.3) staminaClass = "low";
  else if (ratio < 0.6) staminaClass = "mid";
  const classes = [
    "player-token",
    player.side,
    `stamina-${staminaClass}`,
    player.id === carrier.id ? "carrier" : "",
    defender && player.id === defender.id ? "target" : "",
  ].filter(Boolean).join(" ");
  const roleLetter = { GK: "G", DF: "D", MF: "M", FW: "F" }[player.role] || player.role;
  return `<div class="${classes}" data-player="${player.id}" data-role="${player.role}" data-name="${player.name}" data-stamina="${staminaClass}" style="left:${player.x}%;top:${player.y}%;" title="${player.name} / ${player.role} / 霊力 ${player.guts}/${player.maxGuts}"><span class="pt-initial">${player.name.slice(0, 1)}</span><span class="pt-role">${roleLetter}</span><span class="pt-meter"><span style="width:${Math.round(ratio * 100)}%"></span></span></div>`;
}

function renderStatusCard(player) {
  const lv = player.xpLevel || 1;
  const boost = player.statBoost || 0;
  return `
    <div class="status-grid">
      <div class="stat-card identity-card">
        ${renderPortrait(player, "mini")}
        <span>
          <strong>${player.name}</strong>${player.teamName} / ${player.role}${lv > 1 ? ` <span class="lv-badge">Lv${lv}${boost > 0 ? ` +${boost}` : ""}</span>` : ""}
          <div class="meter"><span style="width:${Math.round(Math.min(1, player.maxGuts > 0 ? player.guts / player.maxGuts : 0) * 100)}%"></span></div>
          <span class="guts-num">霊力 ${player.guts}/${player.maxGuts}</span>
        </span>
      </div>
      <div class="stat-card"><strong>代表スペル</strong>${player.spell}</div>
      <div class="stat-card"><strong>攻撃</strong>シュート${player.stats.shoot} / ドリブル${player.stats.dribble} / パス${player.stats.pass}</div>
      <div class="stat-card"><strong>守備</strong>タックル${player.stats.tackle} / ブロック${player.stats.block} / GK${player.stats.keep}</div>
      <div class="stat-card"><strong>機動</strong>速度${player.stats.speed} / 根性${player.stats.guts}</div>
    </div>
  `;
}

// キャプテン翼3 風 多段必殺技 system
// 各 command に 3 tier: normal (低コスト・無補正) / spell (中) / ultimate (高・大補正)
const TIER_COSTS = {
  dribble: { normal: 8, spell: 22, ultimate: 36 },
  pass:    { normal: 6, spell: 18, ultimate: 30 },
  oneTwo:  { normal: 10, spell: 24, ultimate: 38 }, // 原作ワンツーリターン相当
  shoot:   { normal: 12, spell: 30, ultimate: 48 },
  team:    { normal: 8, spell: 16, ultimate: 28 },
};

const TIER_ATK_BONUS = {
  dribble: { normal: 0, spell: 28, ultimate: 48 },
  pass:    { normal: 0, spell: 26, ultimate: 44 },
  oneTwo:  { normal: 4, spell: 26, ultimate: 44 },
  shoot:   { normal: 12, spell: 35, ultimate: 48 },
  team:    { normal: 0, spell: 0, ultimate: 0 },
};

const TIER_TEAM_BOOST = { normal: 16, spell: 24, ultimate: 36 };
const TIER_TEAM_RECOVER = { normal: 5, spell: 8, ultimate: 14 };

function tierCost(type, tier) {
  return (TIER_COSTS[type] || {})[tier] || 0;
}

function tierAtkBonus(type, tier) {
  return (TIER_ATK_BONUS[type] || {})[tier] || 0;
}

function ultimateSpellName(carrier, type) {
  const base = actionSpellName(carrier, type);
  // 既存スペル名末尾に「真」を付加して必殺技 (究極) を演出
  return base.endsWith("真") ? base : `${base}・真`;
}

function tierLabel(type, tier, carrier) {
  if (tier === "normal") return { dribble: "通常ドリブル", pass: "通常パス", shoot: "通常シュート", team: "連携合図" }[type];
  // 連携 (team) は個人技ではないのでチーム連携スペル名、 それ以外はキャラ固有スペル名。
  if (tier === "spell") return type === "team" ? actionSpellName(carrier, "team") : characterSpellName(carrier, type);
  if (tier === "ultimate") return type === "team" ? ultimateSpellName(carrier, "team") : characterUltimateName(carrier, type);
  return "コマンド";
}

function renderBattle() {
  const carrier = allPlayers().find((player) => player.id === state.battle.carrierId);
  const defender = allPlayers().find((player) => player.id === state.battle.defenderId);
  const title = {
    dribble: "ドリブル勝負",
    pass: "パス勝負",
    shoot: "シュート対GK",
    team: "連携スペル",
  }[state.battle.type];
  const t = state.battle.type;
  const normalCost = tierCost(t, "normal");
  const spellCostV = tierCost(t, "spell");
  const ultiCost = tierCost(t, "ultimate");
  const normalLabel = tierLabel(t, "normal", carrier);
  const spellLabel = tierLabel(t, "spell", carrier);
  const ultiLabel = tierLabel(t, "ultimate", carrier);
  const spellDisabled = carrier.guts < spellCostV;
  const ultiDisabled = carrier.guts < ultiCost;
  return `
    <div class="battle-modal">
      <div class="battle-card">
        <div class="battle-visual">
          <div class="duelist">
            ${renderPortrait(carrier)}
            <strong>${carrier.name}</strong>
            <span class="duelist-guts">霊力 ${carrier.guts}/${carrier.maxGuts}</span>
          </div>
          <div class="versus">${title}</div>
          <div class="duelist">
            ${renderPortrait(defender)}
            <strong>${defender.name}</strong>
            <span class="duelist-guts">霊力 ${defender.guts}/${defender.maxGuts}</span>
          </div>
        </div>
        <div class="battle-body">
          <p class="battle-message">${battleText(state.battle.type, carrier, defender)}</p>
          <div class="battle-actions tier-actions">
            <button data-action="resolve" data-option="normal" class="tier-btn tier-normal">
              <span class="tier-name">${normalLabel}</span>
              <span class="tier-cost">霊力 ${normalCost}</span>
              <span class="tier-hint">[1] 安定</span>
            </button>
            <button data-action="resolve" data-option="spell" class="tier-btn tier-spell" ${spellDisabled ? "disabled" : ""}>
              <span class="tier-name">${spellLabel}</span>
              <span class="tier-cost">霊力 ${spellCostV}</span>
              <span class="tier-hint">[2] スペル</span>
            </button>
            <button data-action="resolve" data-option="ultimate" class="tier-btn tier-ultimate primary" ${ultiDisabled ? "disabled" : ""}>
              <span class="tier-name">${ultiLabel}</span>
              <span class="tier-cost">霊力 ${ultiCost}</span>
              <span class="tier-hint">[3] 究極</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function battleText(type, carrier, defender) {
  if (type === "shoot") return `${carrier.name}がシュート体勢。${defender.name}とのGK戦です。距離補正あり。`;
  if (type === "pass") return `${carrier.name}が展開を狙う。${defender.name}のカットを越えれば前進します。`;
  if (type === "team") return `${carrier.teamName}の連携スペル。次の判定に補正を乗せます。`;
  return `${carrier.name}が仕掛ける! 立ちはだかる${defender.name}を抜けばチャンスだ!`;
}

function spellCost(type) {
  return tierCost(type, "spell");
}

function disableHomeTurn() {
  return state.match.finished || state.match.possession !== "home" || state.battle || state.advance ? "disabled" : "";
}

function bindEvents() {
  document.querySelectorAll("[data-select]").forEach((button) => {
    button.addEventListener("click", () => {
      audio.play("select");
      if (button.dataset.select === "home") state.homeTeamId = button.dataset.team;
      if (button.dataset.select === "away") state.awayTeamId = button.dataset.team;
      if (state.homeTeamId === state.awayTeamId) {
        state.awayTeamId = TEAMS.find((team) => team.id !== state.homeTeamId).id;
      }
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (!["resolve", "battle", "pass-target", "interrupt", "gk-choice"].includes(action)) audio.play("select");
      if (action === "start") startMatch();
      if (action === "startCampaign") startCampaign();
      if (action === "nextCampaign") nextCampaignMatch();
      if (action === "retry" && state.match) startMatch({ homeTeamId: state.match.home.id, awayTeamId: state.match.away.id });
      if (action === "resumeMatch") {
        const saved = loadMatch();
        if (saved) resumeMatch(saved);
      }
      if (action === "discardMatch") {
        clearMatchSave();
        render();
      }
      if (action === "mode") {
        state.mode = button.dataset.mode;
        // ストーリーは博麗神社視点専用 (VN は全編 博麗神社 POV)。
        // 他チームはフリー対戦でのみ自チームに選べる。
        if (state.mode === "campaign") state.homeTeamId = "hakurei";
        render();
      }
      if (action === "resetProgress") {
        resetProgress();
        clearMatchSave();
        render();
      }
      if (action === "toggleAudio") {
        audio.setMuted(!state.progress.audioMuted);
        render();
      }
      if (action === "openGallery") {
        state.previousScreen = state.screen;
        state.screen = "gallery";
        render();
      }
      if (action === "closeGallery") {
        state.screen = state.previousScreen && state.previousScreen !== "gallery" ? state.previousScreen : "setup";
        render();
      }
      if (action === "openHelp") {
        state.previousScreen = state.screen;
        state.screen = "help";
        render();
      }
      if (action === "closeHelp") {
        state.screen = state.previousScreen && state.previousScreen !== "help" ? state.previousScreen : "setup";
        render();
      }
      if (action === "difficulty") {
        setDifficulty(button.dataset.difficulty);
        render();
      }
      if (action === "formation") {
        state.progress.formation = button.dataset.formation;
        saveProgress();
        render();
      }
      if (action === "tactic") {
        state.progress.tactic = button.dataset.tactic;
        saveProgress();
        render();
      }
      if (action === "animSpeed") {
        if (["normal", "fast", "instant"].includes(button.dataset.speed)) {
          state.progress.animSpeed = button.dataset.speed;
          saveProgress();
          render();
        }
      }
      if (action === "step") stepCarrier(parseFloat(button.dataset.dx) || 0, parseFloat(button.dataset.dy) || 0);
      if (action === "openCommandMenu") openCommandMenu();
      if (action === "cmdSelect") selectCommand(button.dataset.dir);
      if (action === "cmdClose") closeCommandMenu();
      if (action === "teamCmd") teamCommand(button.dataset.cmd);
      if (action === "advancePlay") advancePlay();
      if (action === "toggleDrawer") {
        state.drawerOpen = !state.drawerOpen;
        render();
      }
      if (action === "toggleAuto") {
        state.progress.autoAdvance = !state.progress.autoAdvance;
        saveProgress();
        render();
        // 待機中に ON にしたら自動送りを開始する。
        if (state.progress.autoAdvance && state.advance) {
          scheduleAdvance(animMs(700));
        }
      }
      if (action === "reset") {
        cancelPendingTimers();
        state.screen = "setup";
        state.match = null;
        state.battle = null;
        state.passPicker = null;
        state.interrupt = null;
        state.gkChoice = null;
        state.vnScene = null;
        render();
      }
      if (action === "battle") {
        const type = button.dataset.type;
        if (type === "team") {
          const c = getCarrier();
          if (c) {
            state.battle = { type, carrierId: c.id, defenderId: nearestOpponent(c).id };
            showVsScreen(c, nearestOpponent(c), VS_LABELS.team);
            render();
          }
        } else {
          openBattle(type);
        }
      }
      if (action === "resolve") resolveBattle(button.dataset.option);
      if (action === "interrupt") resolveInterrupt(button.dataset.option);
      if (action === "gk-choice") resolveGkChoice(button.dataset.option);
      if (action === "cancelPicker") {
        state.passPicker = null;
        render();
      }
      if (action === "vn-advance") advanceVn();
      if (action === "vn-skip") skipVn();
      if (action === "viewEnding") {
        // 直前の勝利相手の win story → ending
        if (state.campaign) {
          const justWonId = state.campaign.opponents[state.campaign.index];
          const winStory = STORY_WIN[justWonId];
          const showEnding = () => startVn(STORY_ENDING, "幻想郷トーナメント 優勝", () => {
            state.screen = "setup";
            state.logs = ["幻想郷フットボール異変を制覇。優勝旗を獲得した。"];
            render();
          });
          if (winStory) startVn(winStory, `${findTeam(justWonId).name} 撃破`, showEnding);
          else showEnding();
        } else {
          startVn(STORY_ENDING, "幻想郷トーナメント 優勝", () => {
            state.screen = "setup";
            render();
          });
        }
      }
    });
  });

  document.querySelectorAll(".pass-target-badge").forEach((badge) => {
    badge.addEventListener("click", () => {
      selectPassTarget(parseInt(badge.dataset.index, 10));
    });
  });

  // メッセージ送り待ち中は、 実況メッセージ / フィールドのクリックでも次へ進める。
  if (state.advance) {
    document.querySelectorAll(".match-stage, .vn-box, .play-banner").forEach((el) => {
      el.addEventListener("click", (ev) => {
        if (ev.target.closest("[data-action], [data-select], [data-index]")) return;
        advancePlay();
      });
    });
  }

  // カットイン / VS 画面をクリックで即スキップ (テンポ改善)。
  document.querySelectorAll(".cutin, .vs-screen").forEach((el) => {
    el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      let changed = false;
      if (state.cutin) { window.clearTimeout(state.cutinTimer); state.cutin = null; changed = true; }
      if (state.vsScreen) { window.clearTimeout(state.vsScreenTimer); state.vsScreen = null; changed = true; }
      if (changed) render();
    });
  });
}

function bindKeyboardEvents() {
  if (window.__touhouSpellSoccerKeyboardBound) return;
  window.__touhouSpellSoccerKeyboardBound = true;
  window.addEventListener("keydown", (e) => {
    if (e.target.matches && e.target.matches("input, textarea, select")) return;
    const k = e.key;
    // VN scene は最最優先
    if (state.vnScene) {
      if (k === " " || k === "Enter" || k === "ArrowRight" || k === "z" || k === "Z") {
        advanceVn();
        e.preventDefault();
        return;
      }
      if (k === "Escape") {
        skipVn();
        e.preventDefault();
        return;
      }
      return;
    }
    // メッセージ送り待ち: Space / Enter / Z / → で次へ
    if (state.advance) {
      if (k === " " || k === "Enter" || k === "ArrowRight" || k === "z" || k === "Z") {
        advancePlay();
        e.preventDefault();
        return;
      }
      return; // 送り待ち中は他の入力を受けない
    }
    // pass picker は最優先
    if (state.passPicker) {
      if (/^[1-9]$/.test(k)) {
        const idx = parseInt(k, 10) - 1;
        if (idx < state.passPicker.candidates.length) {
          selectPassTarget(idx);
          e.preventDefault();
        }
        return;
      }
      if (k === "Escape") {
        state.passPicker = null;
        render();
        e.preventDefault();
        return;
      }
    }
    if (state.interrupt) {
      // 原作DF: 十字方向 ↑タックル/←パスカット/→ブロック/↓うごかない (数字キーも併存)。
      if (k === "ArrowUp" || k === "w" || k === "W" || k === "1") { resolveInterrupt("tackle"); e.preventDefault(); return; }
      if (k === "ArrowLeft" || k === "a" || k === "A" || k === "2") { resolveInterrupt("intercept"); e.preventDefault(); return; }
      if (k === "ArrowRight" || k === "d" || k === "D" || k === "3") { resolveInterrupt("block"); e.preventDefault(); return; }
      if (k === "ArrowDown" || k === "s" || k === "S" || k === "4" || k === "Escape") { resolveInterrupt("wait"); e.preventDefault(); return; }
    }
    if (state.gkChoice) {
      // 原作GK: 十字方向 ↑パンチング/←キャッチ/→飛び出し/↓スペルセーブ (数字キーも併存)。
      if (k === "ArrowLeft" || k === "a" || k === "A" || k === "1") { resolveGkChoice("catch"); e.preventDefault(); return; }
      if (k === "ArrowUp" || k === "w" || k === "W" || k === "2") { resolveGkChoice("punch"); e.preventDefault(); return; }
      if (k === "ArrowRight" || k === "d" || k === "D" || k === "3") { resolveGkChoice("rush"); e.preventDefault(); return; }
      if ((k === "ArrowDown" || k === "s" || k === "S" || k === "4") && state.gkChoice.useSpell) { resolveGkChoice("spellsave"); e.preventDefault(); return; }
    }
    if (state.battle) {
      if (k === "1" || k === " " || k === "Enter") { resolveBattle("normal"); e.preventDefault(); return; }
      if (k === "2" || k === "s" || k === "S") { resolveBattle("spell"); e.preventDefault(); return; }
      if (k === "3" || k === "u" || k === "U") { resolveBattle("ultimate"); e.preventDefault(); return; }
      if (k === "Escape") { state.battle = null; state.vsScreen = null; render(); e.preventDefault(); return; }
    }
    if (state.screen === "match" && state.match && !state.match.finished && state.match.possession === "home" && !state.battle && !state.passPicker && !state.gkChoice && !state.interrupt) {
      // 原作Bボタン式コマンドメニューが開いていれば、 方向キーで選択。
      if (state.commandMenu) {
        if (k === "ArrowUp" || k === "w" || k === "W") { selectCommand("up"); e.preventDefault(); return; }
        if (k === "ArrowLeft" || k === "a" || k === "A") { selectCommand("left"); e.preventDefault(); return; }
        if (k === "ArrowRight" || k === "d" || k === "D") { selectCommand("right"); e.preventDefault(); return; }
        if (k === "ArrowDown" || k === "s" || k === "S") { selectCommand("down"); e.preventDefault(); return; }
        if (k === "Escape" || k === " ") { closeCommandMenu(); e.preventDefault(); return; }
        return;
      }
      // Space/Enter = 原作Bボタン (停止してコマンドメニューを開く)。
      if (k === " " || k === "Enter") { openCommandMenu(); e.preventDefault(); return; }
      // WASD = 盤面ドリブル移動 (保持者を歩かせる)。 矢印/数字は従来コマンドのまま。
      // 原作CT3: 自由8方向移動。 W=前進/S=後退/A=左/D=右、 斜めは QEZC。 敵が近いとエンカウント。
      if (k === "w" || k === "W") { stepCarrier(1, 0); e.preventDefault(); return; }
      if (k === "s" || k === "S") { stepCarrier(-1, 0); e.preventDefault(); return; }
      if (k === "a" || k === "A") { stepCarrier(0, -1); e.preventDefault(); return; }
      if (k === "d" || k === "D") { stepCarrier(0, 1); e.preventDefault(); return; }
      if (k === "q" || k === "Q") { stepCarrier(1, -1); e.preventDefault(); return; }
      if (k === "e" || k === "E") { stepCarrier(1, 1); e.preventDefault(); return; }
      if (k === "z" || k === "Z") { stepCarrier(-1, -1); e.preventDefault(); return; }
      if (k === "c" || k === "C") { stepCarrier(-1, 1); e.preventDefault(); return; }
      // 原作OFコマンド: 1ドリブル(移動)/2パス/3シュート/4ワンツー。 5=連携スペル(アレンジ枠)。
      if (k === "ArrowUp" || k === "1") { stepCarrier(1, 0); e.preventDefault(); return; }
      if (k === "ArrowLeft" || k === "2") { openBattle("pass"); e.preventDefault(); return; }
      if (k === "ArrowRight" || k === "3") { openBattle("shoot"); e.preventDefault(); return; }
      if (k === "ArrowDown" || k === "4") { openBattle("oneTwo"); e.preventDefault(); return; }
      if (k === "5") {
        const c = getCarrier();
        if (c) {
          state.battle = { type: "team", carrierId: c.id, defenderId: nearestOpponent(c).id };
          showVsScreen(c, nearestOpponent(c), VS_LABELS.team);
          render();
        }
        e.preventDefault();
        return;
      }
    }
    if (k === "g" || k === "G") {
      state.previousScreen = state.screen;
      state.screen = "gallery";
      render();
    }
    if (k === "h" || k === "H") {
      state.previousScreen = state.screen;
      state.screen = "help";
      render();
    }
    if (k === "m" || k === "M") {
      audio.setMuted(!state.progress.audioMuted);
      render();
    }
  });
}

window.__touhouSpellFutsalDebug = {
  forceJudge(key = "goal") {
    showJudge(key);
    render();
  },
  openPassPicker() {
    if (!state.match) startMatch();
    openPassPicker();
  },
  // 自軍 GK へ迫る (必殺) シュートの GK 選択を強制表示 (必殺セーブ UI 確認用)。
  forceGkChoice(useSpell = true) {
    if (!state.match) return;
    const gk = state.match.home.players.find((p) => p.role === "GK");
    const shooter = state.match.away.players.find((p) => p.role === "FW") || state.match.away.players[0];
    state.battle = null;
    state.gkChoice = { carrierId: shooter.id, gkId: gk.id, baseAtk: 120, useSpell, tier: useSpell ? "ultimate" : "normal" };
    render();
  },
  // RNG シード制御 (決定的バランス検証/テスト用)。
  seedRng(seed = 12345) { seedRng(seed); },
  clearRng() { clearRng(); },
  // 同一シードで roll 列が再現するか確認 (決定性テスト用)。
  rngProbe(seed, n = 6) {
    seedRng(seed);
    const out = [];
    for (let i = 0; i < n; i += 1) out.push(roll(50));
    clearRng();
    return out;
  },
  // #11 回帰: 試合中にフォメ変更を模擬 → resetPositions が initialSlot 基準で一貫するか。
  resetPositionsAfterFormationChange(newFormation) {
    if (!state.match) return null;
    state.progress.formation = newFormation;
    resetPositions();
    render();
    return state.match.home.players.every(
      (p) => p.role === "GK" || (Math.abs(p.x - p.initialSlot.x) < 0.001 && Math.abs(p.y - p.initialSlot.y) < 0.001),
    );
  },
  // 指定 player の霊力比率を設定し消耗ドラマを確認 (ratio 0-1)。
  setGutsRatio(playerId, ratio) {
    if (!state.match) return null;
    const pl = [...state.match.home.players, ...state.match.away.players].find((p) => p.id === playerId);
    if (!pl) return null;
    pl.guts = Math.round(pl.maxGuts * ratio);
    render();
    return fatiguePenalty(pl);
  },
  saveCurrentMatch() {
    saveMatch();
  },
  // 原作モデルでは dribble バトルは接触エンカウント時のみ。 テスト用に直接エンカウントを起こす。
  startBattle(type = "dribble") {
    if (!state.match) startMatch();
    if (window.__touhouSpellFutsalSkipStory) state.vsScreen = null;
    openBattle(type);
    return !!state.battle;
  },
  // 高い球(クロス)状態をセットして空中シュートUI/分岐を確認。
  setHighBall(on = true) {
    if (!state.match) startMatch();
    state.match.ballAir = on;
    render();
    return state.match.ballAir;
  },
  // 距離別の空中シュート種別を確認 (決定的検証用にシード可)。
  aerialKindAt(dist) {
    const c = getCarrier();
    if (!c) return null;
    const goalX = c.side === "home" ? 100 : 0;
    const saved = c.x;
    c.x = c.side === "home" ? clamp(goalX - dist, 6, 94) : clamp(goalX + dist, 6, 94);
    const kind = pickAerialShot(c);
    c.x = saved;
    return kind;
  },
  // アクションCG/競り合い/ボール演出の視認確認用に action-scene を直接出す。
  showAction(type = "contest", outcome = "success", shotKind = null, actorId = null, defId = null, focus = null) {
    if (!state.match) startMatch();
    if (window.__touhouSpellFutsalSkipStory) state.vsScreen = null;
    const all = [...state.match.home.players, ...state.match.away.players];
    const carrier = (actorId && all.find((p) => p.id === actorId)) || getCarrier() || state.match.home.players[0];
    const def = (defId && all.find((p) => p.id === defId)) || nearestOpponent(carrier) || state.match.away.players.find((p) => p.role !== "GK") || state.match.away.players[0];
    state.battle = null; state.cutin = null; state.vsScreen = null; state.vnScene = null;
    setActionScene(type, carrier, def, `${carrier.name}の${type}テスト`, "検証用", outcome);
    if (shotKind) state.actionScene.shotKind = shotKind;
    if (focus) state.actionScene.focus = focus;
    render();
    return { carrier: carrier.id, defender: def.id, type, outcome };
  },
  // 試合を即時に勝利させる (storyShown 確認用)
  autoWinMatch() {
    if (!state.match) return;
    state.vsScreen = null;
    state.judge = null;
    state.passPicker = null;
    state.battle = null;
    state.gkChoice = null;
    state.interrupt = null;
    state.vnScene = null;
    state.match.score.home = state.match.score.away + 3;
    state.match.half = 2;
    state.match.clock = 99; // タイムアップ (ロスタイム超過)
    state.match.possession = "home";
    endTurn();
    render();
  },
  // VN を即終了
  skipVnAll() {
    while (state.vnScene) skipVn();
  },
  triggerEnding() {
    startVn(STORY_ENDING, "幻想郷トーナメント 優勝", () => {
      state.screen = "setup";
      render();
    });
  },
  forceResult(winner = "home") {
    if (!state.match) startMatch();
    state.match.finished = true;
    state.match.winner = winner;
    if (winner === "home") {
      state.match.score.home = Math.max(state.match.score.home, state.match.score.away + 1);
    } else if (winner === "away") {
      state.match.score.away = Math.max(state.match.score.away, state.match.score.home + 1);
    } else {
      state.match.winner = "draw";
      state.match.score.away = state.match.score.home;
    }
    render();
  },
  forceCampaignClear(difficulty = "normal") {
    if (!["easy", "normal", "hard"].includes(difficulty)) return;
    setDifficulty(difficulty);
    state.mode = "campaign";
    state.campaign = {
      homeTeamId: state.homeTeamId,
      opponents: TEAMS.map((team) => team.id).filter((id) => id !== state.homeTeamId),
      index: TEAMS.length - 2,
      wins: TEAMS.length - 2,
    };
    const awayTeamId = state.campaign.opponents[state.campaign.index];
    startMatch({ homeTeamId: state.homeTeamId, awayTeamId });
    state.match.half = 2;
    state.match.clock = 99;
    state.match.score.home = Math.max(state.match.score.home, state.match.score.away + 1);
    endTurn();
    render();
  },
};

render();
