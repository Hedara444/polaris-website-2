import Link from "next/link";

import companyNameImg from "../../../public/images/company-name.jpg";

import { footerSections } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-brand">
          <img src={companyNameImg.src} alt="POLARISS" />
          <p>LINE + GPS SMART VEHICLE SECURITY</p>
        </div>

        <div className="footer-links">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              {section.links.map((link) =>
                link.external ? (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
          <div>
            <h3>Origin</h3>
            <a href={siteConfig.originalSiteUrl}>Original Site</a>
         
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© POLARISS.NET All Rights Reserved.</p>
        <div>
          <Link href="/">Home</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
