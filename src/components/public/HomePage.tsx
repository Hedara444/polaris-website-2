import type { ReactNode } from "react";

import Link from "next/link";

import { ArticleCard } from "@/components/public/ArticleCard";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { HeroSection } from "@/components/public/HeroSection";
import { features, quickLinks, specs } from "@/lib/content";
import type { ArticleListItem, FaqItem } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="arrow-link" href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function HomePage({
  latestArticles,
  latestFaqs,
}: {
  latestArticles: ArticleListItem[];
  latestFaqs: FaqItem[];
}) {
  return (
    <>
      <HeroSection />

      <section className="metric-band" aria-label="POLARISS highlights">
        <div className="metric">
          <strong>24 / 365</strong>
          <span>Always watching over your vehicle</span>
        </div>
        <div className="metric">
          <strong>Real-Time</strong>
          <span>Fast alert and tracking feedback</span>
        </div>
        <div className="metric">
          <strong>LINE</strong>
          <span>No extra app workflow required</span>
        </div>
        <div className="metric">
          <strong>SQLite CMS</strong>
          <span>Articles and FAQ managed in-house</span>
        </div>
      </section>

      <section className="quick-links shell">
        {quickLinks.map((item) => (
          <div className="quick-card" key={item.number}>
            <span className="quick-number">{item.number}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
            <span className="quick-arrow" aria-hidden="true">
              ↘
            </span>
          </div>
        ))}
      </section>

      <section className="problem-section">
        <div className="shell problem-grid">
          <div className="problem-copy">
            <p className="eyebrow light">THE THREAT IS REAL</p>
            <h2>
              Security and clarity,
              <br />
              in one system.
            </h2>
            <p>
              The current landing page set the tone with high contrast, strong structure,
              and premium product storytelling. This new site keeps that visual DNA while
              opening room for articles, FAQ discovery, and admin-managed content.
            </p>
            <div className="price-callout">
              <span>Built for</span>
              <strong>focus</strong>
              <span>and quick reaction</span>
            </div>
            <ArrowLink  href={siteConfig.buyNowUrl}>Buy Now</ArrowLink>
          </div>
          <div className="problem-image">
            <img src="/images/security-system.webp" alt="POLARISS security system" />
            <div className="image-note">
              <span>POLARISS</span>
              <strong>IoT SECURITY</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section section shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">ABOUT POLARISS</p>
            <h2>Same visual baseline, broader website flow.</h2>
          </div>
          <p>
            We preserve the hero treatment, metric bands, feature storytelling, and strong
            editorial layout from the original React page. The key change is navigation:
            visitors now move between real pages instead of scrolling through one long page.
          </p>
        </div>

        <div className="about-panel">
          <div className="about-visual">
            <img src="/images/hero-device.webp" alt="POLARISS device interface" />
          </div>
          <div className="about-details">
            <p className="overline">ONE DEVICE, MULTIPLE DESTINATIONS</p>
            <h3>Landing, Articles, FAQ, and a lightweight admin console.</h3>
            <p>
              Public visitors get a polished marketing experience and readable content. The
              admin side manages article metadata, FAQ order, and search-ready keywords
              without leaving the same deployment.
            </p>
            <div className="about-tags">
              <span>APP ROUTER</span>
              <span>SQLITE</span>
              <span>SEO READY</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">CORE FEATURES</p>
            <h2>
              Sharp interaction,
              <br />
              clean content operations.
            </h2>
          </div>

          <div className="feature-list">
            {features.map((feature, index) => (
              <article
                className={`feature-row ${index % 2 ? "reverse" : ""}`}
                key={feature.index}
              >
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                  <span>{feature.index}</span>
                </div>
                <div className="feature-copy">
                  <p className="eyebrow">{feature.eyebrow}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <Link className="arrow-link" href="/articles">
                    <span>Explore content</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">LATEST ARTICLES</p>
            <h2>Recent articles from the admin feed.</h2>
          </div>
          <p>
            This new section extends the original landing page so the Home route can surface
            fresh, indexable content without breaking the established design language.
          </p>
        </div>
        <div className="card-grid">
          {latestArticles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
        <div className="section-cta">
          <Link className="button button-dark" href="/articles">
            Browse all articles <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="faq-section section shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">QUESTIONS &amp; ANSWERS</p>
            <h2>Top FAQ items, ready for search and support.</h2>
          </div>
          <p>
            The Home page shows only the most relevant items so we keep the page focused
            while still giving search engines and users a strong support entry point.
          </p>
        </div>
        <FaqAccordion items={latestFaqs} compact />
        <div className="faq-footer">
          <Link className="arrow-link" href="/faq">
            <span>Open the full FAQ page</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="product-section section">
        <div className="shell">
          <div className="product-hero">
            <div className="product-heading">
              <p className="eyebrow light">PRODUCT &amp; PLAN</p>
              <h2>
                LINE + GPS for a
                <br />
                cleaner protection flow.
              </h2>
              <p>
                The product story stays visible on the Home page, while the content system
                adds room for deep-dive articles and structured FAQ answers.
              </p>
            </div>
            <div className="product-price">
              <span>Storefront</span>
              <strong>
                POLARISS<small>Shopify CTA</small>
              </strong>
              <div className="price-separator" />
              <span>Knowledge base</span>
              <strong>
                Articles + FAQ<small>managed in admin</small>
              </strong>
              <p>One codebase for public pages and content management</p>
              <a target="_blank" className="button button-primary button-wide" href={siteConfig.buyNowUrl}>
                Buy Now <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="specs-panel">
            <div className="specs-intro">
              <p className="eyebrow">PRODUCT DETAILS</p>
              <h3>Baseline technical profile</h3>
              <p>
                The original product spec panel is kept as part of the visual language for the
                new site and can later be connected to managed content if needed.
              </p>
              <div className="line-chip">LINE COMPATIBLE</div>
            </div>
            <dl className="specs-grid">
              {specs.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
