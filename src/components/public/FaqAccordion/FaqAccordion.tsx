import type { FaqItem } from "@/lib/types";

export function FaqAccordion({
  items,
  compact = false,
}: {
  items: FaqItem[];
  compact?: boolean;
}) {
  return (
    <div className={`faq-list ${compact ? "is-compact" : ""}`}>
      {items.map((faq, index) => (
        <details className="faq-item" key={faq.id}>
          <summary>
            <span className="faq-number">Q{String(index + 1).padStart(2, "0")}</span>
            <strong>{faq.question}</strong>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <span>A</span>
            <div>
              <p>{faq.answer}</p>
              {faq.keywords.length > 0 ? (
                <div className="keyword-row">
                  {faq.keywords.map((keyword) => (
                    <span className="keyword-chip" key={keyword}>
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
