import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="section page-shell">
      <div className="shell page-intro">
        <p className="eyebrow">404</p>
        <h1>That page could not be found.</h1>
        <p>The route may have moved, or the requested article is no longer available.</p>
        <div className="form-actions">
          <Link className="button button-dark" href="/">
            Back home
          </Link>
          <Link className="button button-primary" href="/articles">
            Browse articles
          </Link>
        </div>
      </div>
    </section>
  );
}
