import type { ReactNode } from "react";

import Link from "next/link";

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin">
          POLARISS Admin
        </Link>
        <nav className="admin-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/articles">Articles</Link>
          <Link href="/admin/faq">FAQ</Link>
          <Link href="/">Public site</Link>
        </nav>
        <form action="/api/admin/logout" method="post">
          <button className="button button-ghost-dark admin-logout" type="submit">
            Sign out
          </button>
        </form>
      </aside>

      <div className="admin-main">
        <div className="admin-page-intro">
          <p className="eyebrow">ADMIN</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
