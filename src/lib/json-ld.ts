import { siteConfig } from "./site-config";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "POLARISS",
    "url": siteConfig.siteUrl,
    "logo": `${siteConfig.siteUrl}/favicon.png`,
    "description":
      "POLARISSは、GPS位置情報と相互監視で大切なバイクや車両を見守るサービスです。盗難対策に加え、気象リスク通知で愛車の危険にも備えます。",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${siteConfig.siteUrl}/contact`,
    },
  };
}

export function getProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "POLARISS GPSユニット",
    "image": `${siteConfig.siteUrl}/favicon.png`,
    "description":
      "POLARISS GPSユニット端末。GPS位置情報と相互監視で大切なバイクや車両を見守る。初回19,800円（税込・GPSユニット、初月通信費、送料無料）、2回目以降は月額2,178円（税込）。",
    "brand": {
      "@type": "Brand",
      "name": "POLARISS",
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteConfig.siteUrl}/order`,
      "priceCurrency": "JPY",
      "price": "19800",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "POLARISS",
      },
    },
  };
}

export function getFaqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
