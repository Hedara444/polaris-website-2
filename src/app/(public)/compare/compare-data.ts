export type TableRow = {
  axis: string;
  vals: [string, string, string, string];
  dims: [boolean, boolean, boolean, boolean];
  isLast?: boolean;
};

export const TABLE_ROWS: TableRow[] = [
  {
    axis: "主な目的",
    vals: ["クルマ・バイクの異変検知と位置確認", "子ども・シニアの見守り", "持ち物さがし", "位置情報＋通報・かけつけ"],
    dims: [false, false, false, false],
  },
  {
    axis: "想定している持ち方",
    vals: ["車両に取り付ける／車両に積んでおく", "本人がカバンなどに入れて携帯", "持ち物に付ける", "人・車両・荷物など、用途別のメニュー"],
    dims: [false, false, false, false],
  },
  {
    axis: "クルマ・バイク向けのメニュー",
    vals: ["サービス全体がクルマ・バイク向け", "用途としては想定していない", "用途としては想定していない", "あり（車・バイクを見守るメニュー）"],
    dims: [false, true, true, false],
  },
  {
    axis: "位置取得の仕組み",
    vals: ["GPS / GNSS（GLONASS・みちびき）", "GPS（2周波 L1/L5 対応の製品あり）", "近くのスマートフォンを経由した位置", "GPS"],
    dims: [false, false, false, false],
  },
  {
    axis: "モバイル通信",
    vals: ["LTE Cat.M1（本体に内蔵）", "携帯回線（本体に内蔵）", "持たない製品が多い", "携帯回線（本体に内蔵）"],
    dims: [false, false, true, false],
  },
  {
    axis: "車両が動いたことの検知",
    vals: ["対応（加速度センサーで移動を検知）", "乗り物での移動は検知（盗難検知は想定外）", "想定していない", "対応（くるまうごいた通知など）"],
    dims: [false, false, true, false],
  },
  {
    axis: "異常時の通報・かけつけ",
    vals: ["なし（オーナーご自身で対応）", "なし", "なし", "あり（要請により駆けつけ／オプションで異常監視）"],
    dims: [true, true, true, false],
  },
  {
    axis: "通知の届き方",
    vals: ["LINEへ通知（専用アプリ不要）", "専用アプリへ通知", "専用アプリへ通知", "専用アプリへ通知"],
    dims: [false, false, false, false],
  },
  {
    axis: "位置確認の方法",
    vals: ["LINEから地図を開く", "専用アプリ（移動履歴あり）", "専用アプリ", "専用アプリ・Web"],
    dims: [false, false, false, false],
  },
  {
    axis: "ユーザー同士での情報共有",
    vals: ["あり（相互監視・任意）", "なし", "端末どうしのネットワークを利用する製品あり", "なし"],
    dims: [false, true, false, true],
  },
  {
    axis: "車両からの給電",
    vals: ["対応", "想定していない", "想定していない", "公開情報では明記なし"],
    dims: [false, true, true, false],
  },
  {
    axis: "本体バッテリー",
    vals: ["内蔵（1,500mAh・要充電）", "内蔵（大容量・長期間の連続利用に対応）", "小型電池のものが多い", "内蔵（充電式の携帯型端末）"],
    dims: [false, false, false, false],
  },
  {
    axis: "費用のかたち",
    vals: ["端末購入＋月額（通信費を含む）", "本体購入＋月額", "本体購入型が多い", "サービス契約（月額）＋対応は要請ベース"],
    dims: [false, false, false, false],
    isLast: true,
  },
];

export const MCMP_NAMES = ["見守りGPS", "紛失防止タグ", "警備会社のGPS"] as const;

export type Scenario = {
  a: string;
  k: string;
  title: string;
  recommend: string;
  desc: string;
  pill: string;
};

export const SCENARIOS: Scenario[] = [
  {
    a: "1",
    k: "CASE 01",
    title: "子どもの居場所を見守りたい",
    recommend: "見守りGPS",
    desc: "本人が持ち歩くことを前提に作られています。登下校や、離れて暮らすご家族の見守りに向いています。",
    pill: "POLARISSはこの用途向けではありません",
  },
  {
    a: "2",
    k: "CASE 02",
    title: "財布やバッグを探したい",
    recommend: "紛失防止タグ",
    desc: "近くでさがすための道具です。小さく電池も長持ちで、鍵や財布に付けておく使い方に。",
    pill: "POLARISSはこの用途向けではありません",
  },
  {
    a: "3",
    k: "CASE 03",
    title: "警備会社のサービスを利用したい",
    recommend: "警備会社のGPS",
    desc: "通報やかけつけの体制まで含めて備えたい場合に。車・バイク向けのメニューもあります。",
    pill: "POLARISSに、通報やかけつけのサービスはありません",
  },
  {
    a: "4",
    k: "CASE 04",
    title: "クルマ・バイクの異変に気づき、その後の位置も確認したい",
    recommend: "POLARISS",
    desc: "クルマ・バイクを前提に設計され、通知は専用アプリではなくLINEに届きます。かけつけは含みません。",
    pill: "盗難の防止・発見・回収を保証するものではありません",
  },
];
