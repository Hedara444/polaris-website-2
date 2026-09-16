/**
 * Static FAQ variation — exact content copy of `polariss-site_all-pages/faq.html`.
 *
 * - `staticFaqCategories`: the 7 FAQ categories (g1..g7), each with
 *   SEO-optimized keywords derived from the category theme.
 * - `staticFaqs`: all 28 questions, each linked to its category via
 *   `categorySlug` and carrying its own per-question SEO keywords.
 * - `staticFaqHeaderKeywords`: deduped combination used for the page
 *   `<meta name="keywords">` header injection.
 */

export interface StaticFaqCategory {
  /** Group anchor id from the reference (`g1`..`g7`). */
  slug: string;
  /** Display number (`01`..`07`). */
  index: string;
  /** Full category name shown in the rail + group heading. */
  name: string;
  /** Short label used for the mobile chips. */
  shortLabel: string;
  /** SEO keywords analyzed from the category theme. */
  keywords: string[];
}

export interface StaticFaqLink {
  label: string;
  href: string;
}

export interface StaticFaq {
  id: number;
  categorySlug: string;
  question: string;
  /** Main answer paragraph (`.lead`). */
  lead: string;
  /** Supplementary paragraph (`.more`). */
  more?: string;
  /** Optional in-answer link. */
  link?: StaticFaqLink;
  /** SEO keywords analyzed from the question + answer. */
  keywords: string[];
}

export const staticFaqCategories: StaticFaqCategory[] = [
  {
    slug: "g1",
    index: "01",
    name: "購入前について",
    shortLabel: "購入前",
    keywords: [
      "POLARISSとは",
      "GPS盗難対策",
      "車 バイク 対応",
      "専用アプリ不要",
      "LINE連携",
      "見守りGPSとの違い",
      "紛失防止タグとの違い",
      "盗難防止サービス",
    ],
  },
  {
    slug: "g2",
    index: "02",
    name: "料金・契約について",
    shortLabel: "料金・契約",
    keywords: [
      "POLARISS 料金",
      "初期費用 19800円",
      "月額 2178円",
      "通信費 SIM",
      "送料無料",
      "契約期間なし",
      "解約方法",
      "GPS 月額費用",
    ],
  },
  {
    slug: "g3",
    index: "03",
    name: "取り付け・電源について",
    shortLabel: "取り付け・電源",
    keywords: [
      "GPS 取り付け方法",
      "自分で設置",
      "シート下 設置",
      "内蔵バッテリー 1500mAh",
      "電池持ち 4週間",
      "車両 給電 配線",
      "本体サイズ 63g",
      "京セラ LU1CMO13",
      "LTE Cat.M1",
    ],
  },
  {
    slug: "g4",
    index: "04",
    name: "LINE・通知について",
    shortLabel: "LINE・通知",
    keywords: [
      "LINE通知",
      "盗難 移動検知 通知",
      "地図 位置確認",
      "監視エリア",
      "LINEアカウント 必要",
      "バイク 盗難 通知",
    ],
  },
  {
    slug: "g5",
    index: "05",
    name: "位置情報・通信について",
    shortLabel: "位置情報・通信",
    keywords: [
      "GPS GLONASS みちびき",
      "衛星測位 QZSS",
      "LTE Cat.M1 通信",
      "位置誤差 屋内 地下",
      "移動経路 地図確認",
      "車両 位置情報 取得",
    ],
  },
  {
    slug: "g6",
    index: "06",
    name: "相互監視について",
    shortLabel: "相互監視",
    keywords: [
      "相互監視とは",
      "POLARISSユーザー 通知",
      "相互監視 ON OFF",
      "盗難車両 情報共有",
      "安全確保 警察 情報提供",
    ],
  },
  {
    slug: "g7",
    index: "07",
    name: "ご利用中の方へ",
    shortLabel: "ご利用中の方",
    keywords: [
      "通知が届かない",
      "位置ずれ 対処",
      "監視エリア 見直し",
      "駐車場変更",
      "GPS トラブルシューティング",
      "充電残量 確認",
    ],
  },
];

export const staticFaqs: StaticFaq[] = [
  // ---------- g1 購入前について ----------
  {
    id: 1,
    categorySlug: "g1",
    question: "POLARISSはどんなサービスですか？",
    lead: "クルマ・バイクの移動を検知して、いつものLINEへ通知し、地図で位置を確認できるGPS盗難対策サービスです。",
    more: "端末を愛車にセットしておくと、停めているあいだの移動を検知します。位置情報の確認まで、専用アプリを使わずに行えます。",
    link: { label: "POLARISSとは →", href: "/about" },
    keywords: ["POLARISSとは", "GPS盗難対策サービス", "LINE通知", "地図 位置確認", "車 バイク 盗難対策"],
  },
  {
    id: 2,
    categorySlug: "g1",
    question: "クルマとバイクのどちらでも使えますか？",
    lead: "どちらでもお使いいただけます。",
    more: "クルマ・バイクを前提に設計されたサービスです。取り付け位置や電源のとり方は、車種や停める場所によって変わります。",
    link: { label: "使い方を見る →", href: "/howto" },
    keywords: ["車 バイク 対応", "車種 取り付け位置", "クルマ バイク GPS"],
  },
  {
    id: 3,
    categorySlug: "g1",
    question: "専用アプリのインストールは必要ですか？",
    lead: "いいえ。POLARISSはLINEを使って通知の受け取りと位置の確認を行います。",
    more: "ご利用にはLINEアカウントが必要です。ユーザー登録と車両の登録は、Webサイトから行います。",
    keywords: ["専用アプリ不要", "LINE連携", "ユーザー登録", "車両登録"],
  },
  {
    id: 4,
    categorySlug: "g1",
    question: "子どもの見守りや持ち物さがしにも使えますか？",
    lead: "その用途には向いていません。POLARISSはクルマ・バイクのために設計されています。",
    more: "人の見守りには見守りGPS、持ち物さがしには紛失防止タグなど、目的に合わせて設計された製品があります。",
    link: { label: "他のGPSとの違いを見る →", href: "/compare" },
    keywords: ["見守りGPSとの違い", "紛失防止タグとの違い", "子ども見守り 非対応", "車両専用"],
  },
  {
    id: 5,
    categorySlug: "g1",
    question: "盗まれた車両が必ず見つかりますか？",
    lead: "いいえ。POLARISSは、盗難の防止や車両の発見・回収を保証するサービスではありません。",
    more: "動かされたことに気づき、位置を確認するための備えです。ほかの盗難対策とあわせてお使いください。緊急時の警察等へのご連絡は、お客さまご自身で行っていただきます。",
    keywords: ["盗難防止 保証なし", "車両発見 回収", "盗難対策 併用", "警察 連絡"],
  },
  // ---------- g2 料金・契約について ----------
  {
    id: 6,
    categorySlug: "g2",
    question: "最初にいくら必要ですか？",
    lead: "19,800円（税込・送料無料）です。",
    more: "GPSユニット本体18,000円と消費税1,800円の合計です。最初にお支払いいただくのは、この金額だけです。",
    link: { label: "料金を見る →", href: "/price" },
    keywords: ["初期費用 19800円", "GPSユニット 本体価格", "送料無料", "税込"],
  },
  {
    id: 7,
    categorySlug: "g2",
    question: "毎月いくらかかりますか？",
    lead: "2回目以降は、月額2,178円（税込）です。",
    more: "通信費1,980円と消費税198円の合計です。位置の確認や通知の受け取りに、追加の費用はかかりません。",
    keywords: ["月額 2178円", "通信費 1980円", "追加費用なし", "月額料金"],
  },
  {
    id: 8,
    categorySlug: "g2",
    question: "月額の通信費は、何の費用ですか？",
    lead: "位置情報や通知を届けるための、通信サービスの利用料です。",
    more: "端末に通信用のSIMが入っているため、お客さまが別途回線を契約する必要はありません。",
    keywords: ["通信サービス 利用料", "SIM内蔵", "回線契約不要", "位置情報 通知"],
  },
  {
    id: 9,
    categorySlug: "g2",
    question: "送料はかかりますか？",
    lead: "かかりません。配送料は無料で、初回の19,800円（税込）に含まれています。",
    keywords: ["送料無料", "配送料込み", "初回費用"],
  },
  {
    id: 10,
    categorySlug: "g2",
    question: "契約期間や解約について教えてください",
    lead: "最低利用期間の定めはありません。",
    more: "解約をご希望の場合は、所定の手続きに沿ってお申し込みください。月途中の取り扱いなどの詳細は、お申し込み時の案内をご確認ください。",
    keywords: ["最低利用期間なし", "解約手続き", "契約期間 縛りなし"],
  },
  // ---------- g3 取り付け・電源について ----------
  {
    id: 11,
    categorySlug: "g3",
    question: "取り付けは自分でできますか？",
    lead: "基本的にはご自身でセットしていただけます。",
    more: "車体に取り付ける方法と、取り付けずにシート下やバッグなどに入れておく方法があります。",
    link: { label: "使い方を見る →", href: "/howto" },
    keywords: ["自分で取り付け", "DIY設置", "シート下 バッグ 設置"],
  },
  {
    id: 12,
    categorySlug: "g3",
    question: "取り付けずに、入れておくだけでも使えますか？",
    lead: "はい。シート下やトップケース、バッグなどに入れて使うこともできます。",
    more: "スタンドアローンで使う場合、電源は4週間程度もちます。使用できる時間は、通信状況・気温・設置環境などによって変わります。",
    keywords: ["置くだけ 設置", "トップケース", "スタンドアローン", "電池持ち 4週間"],
  },
  {
    id: 13,
    categorySlug: "g3",
    question: "電源はどうなっていますか？",
    lead: "本体に内蔵バッテリー（1,500mAh）を搭載し、スタンドアローンでも使えます。車両からの給電にも対応しています。",
    more: "スタンドアローンでの電源持ちは4週間程度が目安です。車両から給電する場合は、取り付けと配線が必要になります。",
    keywords: ["内蔵バッテリー 1500mAh", "車両 給電 配線", "電源持ち"],
  },
  {
    id: 14,
    categorySlug: "g3",
    question: "バッテリーはどのくらいもちますか？",
    lead: "スタンドアローンで使う場合、電源は4週間程度もちます。",
    more: "使用できる時間は、通信状況・気温・設置環境などによって変わります。車両から給電して使う場合は、ふだんの充電を意識する必要はありません。",
    keywords: ["バッテリー持ち 4週間", "充電不要 給電", "通信状況 気温 影響"],
  },
  {
    id: 15,
    categorySlug: "g3",
    question: "本体の大きさを教えてください",
    lead: "約 83 × 49 × 13.8 mm、重量は約 63 g です。",
    more: "手のひらに収まる大きさです。型番はKyocera LU1CMO13、通信方式はLTE Cat.M1です。",
    keywords: ["本体サイズ 83mm", "重量 63g", "京セラ LU1CMO13", "LTE Cat.M1", "小型GPS"],
  },
  // ---------- g4 LINE・通知について ----------
  {
    id: 16,
    categorySlug: "g4",
    question: "通知はどこに届きますか？",
    lead: "ふだんお使いのLINEのトークに届きます。",
    more: "家族や友人からのメッセージと同じ場所に届くため、専用の画面を開きに行く必要はありません。",
    keywords: ["LINEトーク 通知", "通知 受信場所", "専用画面不要"],
  },
  {
    id: 17,
    categorySlug: "g4",
    question: "どんなときに通知が届きますか？",
    lead: "停めている愛車の移動を検知したときに届きます。",
    more: "ふだん、こちらから操作をしておく必要はありません。",
    keywords: ["移動検知 通知", "駐車中 監視", "自動通知"],
  },
  {
    id: 18,
    categorySlug: "g4",
    question: "LINEから何ができますか？",
    lead: "通知の受け取り、状態の確認、地図での位置確認、監視エリアの確認ができます。",
    more: "操作はLINEから行い、マップや状態などの確認はWeb上で行います。ユーザー登録と車両の登録もWebサイトから行います。",
    link: { label: "使い方を見る →", href: "/howto" },
    keywords: ["LINE 操作", "地図 位置確認", "監視エリア確認", "状態確認"],
  },
  {
    id: 19,
    categorySlug: "g4",
    question: "LINEアカウントを持っていなくても使えますか？",
    lead: "ご利用にはLINEアカウントが必要です。",
    keywords: ["LINEアカウント 必須", "LINEなし 利用不可"],
  },
  // ---------- g5 位置情報・通信について ----------
  {
    id: 20,
    categorySlug: "g5",
    question: "位置情報は必ず取得できますか？",
    lead: "原則として取得できます。ただし、通信状況や周囲の環境に左右されることがあります。",
    more: "建物のあいだや屋内、地下では衛星の電波が届きにくく、誤差が大きくなったり、取得に時間がかかったりする場合があります。",
    keywords: ["位置情報 取得", "衛星電波 届きにくい", "屋内 地下 誤差", "通信状況"],
  },
  {
    id: 21,
    categorySlug: "g5",
    question: "どのような仕組みで位置を調べていますか？",
    lead: "GPS、GLONASS、みちびき（QZSS）の衛星測位を使っています。",
    more: "調べた情報は、LTE Cat.M1の携帯回線で送られます。",
    keywords: ["GPS GLONASS みちびき", "QZSS 衛星測位", "LTE Cat.M1 回線"],
  },
  {
    id: 22,
    categorySlug: "g5",
    question: "移動した経路は確認できますか？",
    lead: "地図で現在地と移動をたどることができます。",
    keywords: ["移動経路 確認", "地図 現在地 追跡"],
  },
  // ---------- g6 相互監視について ----------
  {
    id: 23,
    categorySlug: "g6",
    question: "相互監視とは何ですか？",
    lead: "万が一のときに、POLARISSユーザー同士で発見につながる情報を共有できる仕組みです。",
    more: "盗難車両が別のPOLARISSユーザーの周辺へ近づくと、そのユーザーへ通知が届きます。",
    link: { label: "相互監視について詳しく →", href: "/about" },
    keywords: ["相互監視とは", "ユーザー同士 情報共有", "盗難車両 通知"],
  },
  {
    id: 24,
    categorySlug: "g6",
    question: "相互監視は必ず参加しないといけませんか？",
    lead: "いいえ。受付と開始は、それぞれON / OFFを選べます。",
    more: "初期設定では受付がONですが、いつでもOFFに変更できます。",
    keywords: ["相互監視 任意参加", "ON OFF 設定", "受付 開始 選択"],
  },
  {
    id: 25,
    categorySlug: "g6",
    question: "通知を受け取ったら、どうすればいいですか？",
    lead: "盗難車両や不審者へ、ご自身で近づくことはお控えください。",
    more: "安全を最優先とし、必要に応じて警察等への情報提供にご活用ください。相互監視は、犯人を追跡するための仕組みではありません。",
    keywords: ["不審者 接近禁止", "安全最優先", "警察 情報提供"],
  },
  // ---------- g7 ご利用中の方へ ----------
  {
    id: 26,
    categorySlug: "g7",
    question: "通知が届かないときは？",
    lead: "まず、LINEの通知設定と、端末の電源（充電残量または車両からの給電）をご確認ください。",
    more: "携帯回線の届かない場所では、送信や更新に時間がかかることがあります。",
    keywords: ["通知が届かない 対処", "LINE通知設定", "充電残量 給電確認", "電波の届かない場所"],
  },
  {
    id: 27,
    categorySlug: "g7",
    question: "位置が実際の場所とずれています",
    lead: "建物のあいだや屋内、地下では衛星の電波が届きにくく、表示される位置が実際の場所と離れることがあります。",
    keywords: ["位置ずれ 原因", "衛星電波 ビル陰", "GPS誤差"],
  },
  {
    id: 28,
    categorySlug: "g7",
    question: "停める場所が変わりました",
    lead: "LINEから監視エリアを確認し、見守る範囲を見直してください。",
    keywords: ["駐車場変更", "監視エリア 見直し", "見守り範囲 設定"],
  },
];

/** FAQs grouped per category, in reference order. */
export const staticFaqGroups = staticFaqCategories.map((cat) => ({
  ...cat,
  items: staticFaqs.filter((f) => f.categorySlug === cat.slug),
}));

/**
 * Header keywords: brand core + every category keyword + the first
 * keyword of every question, deduped in order.
 */
function buildHeaderKeywords(): string[] {
  const core = ["POLARISS", "よくあるご質問", "FAQ", "GPS盗難対策", "車 バイク 盗難防止"];
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (k: string) => {
    const key = k.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      out.push(key);
    }
  };
  core.forEach(push);
  staticFaqCategories.forEach((c) => c.keywords.forEach(push));
  staticFaqs.forEach((f) => {
    if (f.keywords[0]) push(f.keywords[0]);
  });
  return out;
}

export const staticFaqHeaderKeywords: string[] = buildHeaderKeywords();
