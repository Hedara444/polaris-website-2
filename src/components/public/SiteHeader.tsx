"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import newLogo from "../../../public/ref-2.png";

import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/compare", label: "Compare" },
  { href: "/steps", label: "Steps" },
  { href: "/voices", label: "Voices" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <Link className="brand brand-left" href="/" aria-label="POLARISS home">
          <img src={newLogo.src} alt="POLARISS" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                className={isActive ? "is-active" : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions header-actions-right">
          <a target="_blank" className="button button-small button-primary" href={siteConfig.buyNowUrl}>
            Buy Now <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link href={item.href} key={item.href} onClick={closeMenu}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a  target="_blank" className="button button-primary" href={siteConfig.buyNowUrl}>
            Buy Now
          </a>
          <a className="button button-ghost" href={siteConfig.partnerUrl}>
            Partner
          </a>
        </div>
      </div>
    </>
  );
}
