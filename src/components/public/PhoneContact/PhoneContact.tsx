import { Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import "./phone-contact.css";

export function PhoneContact() {
  return (
    <a
      className="polariss-phone-contact"
      href={siteConfig.phoneHref}
      aria-label={`電話で相談する ${siteConfig.phone} 受付時間 ${siteConfig.phoneHours}`}
    >
      <span className="polariss-phone-label">お電話でのご相談</span>
      <span className="polariss-phone-number"><Phone size={22} aria-hidden="true" />{siteConfig.phone}</span>
      <span className="polariss-phone-hours">※{siteConfig.phoneHours}</span>
    </a>
  );
}
