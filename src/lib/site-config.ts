export const siteConfig = {
  name: "POLARISS",
  shortName: "POLARISS",
  description:
    "POLARISSは、GPS位置情報と相互監視で大切なバイクや車両を見守るサービスです。盗難対策に加え、気象リスク通知で愛車の危険にも備えます。",
  siteUrl: process.env.SITE_BASE_URL ?? "https://www.polariss.jp",
  buyNowUrl:
    process.env.NEXT_PUBLIC_BUY_NOW_URL ??
    "https://polariss-store.myshopify.com/",
  partnerUrl:
    process.env.NEXT_PUBLIC_PARTNER_URL ??
    "https://polariss-store.myshopify.com/products/%E6%AF%8E%E6%9C%88%E9%80%9A%E4%BF%A1%E8%B2%BB",
  originalSiteUrl:
    process.env.NEXT_PUBLIC_ORIGINAL_SITE_URL ??
    "https://thingsline.co.jp/index",
  ckEditorKey: process.env.NEXT_PUBLIC_CK_EDITOR_LICENCE_KEY ?? "GPL",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-W8PC23CG",
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
} as const;

export const defaultKeywords = {
  home: [
    "POLARISS",
    "vehicle security",
    "GPS tracking",
    "LINE notification",
    "IoT security",
    "Japan vehicle protection",
  ],
  articles: [
    "POLARISS articles",
    "GPS devices",
    "vehicle security knowledge",
    "IoT updates",
    "car security insights",
  ],
  faq: [
    "POLARISS FAQ",
    "GPS support",
    "vehicle security questions",
    "LINE control",
    "device setup",
  ],
  voices: [
    "利用者の声",
    "POLARISS 口コミ",
    "カーセキュリティ 感想",
    "GPS 盗難対策 体験談",
    "バイク 盗難防止 レビュー",
    "LINE 通知 評判",
    "車両 見守り サービス",
  ],
  compare: [
    "他社製品との比較",
    "POLARISS 比較",
    "カーセキュリティ 比較",
    "GPS 見守り サービス 比較",
    "車両セキュリティ 選び方",
    "LINE で簡単操作",
    "バッテリー 長持ち GPS",
  ],
  steps: [
    "利用開始までのステップ",
    "POLARISS 導入方法",
    "GPS セキュリティ 設置 手順",
    "カーセキュリティ 設定",
    "LINE 連携 初期設定",
    "バイク 盗難防止 導入",
  ],
} as const;

export const sessionCookieName = "polariss_admin_session";
