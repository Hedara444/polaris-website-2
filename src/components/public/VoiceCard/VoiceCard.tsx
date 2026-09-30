import type { TestimonialItem } from "@/lib/types";

export function VoiceCard({ item, index }: { item: TestimonialItem; index: number }) {
  return (
    <article className="voice-card">
      <div className="voice-card-head">
        <img className="voice-avatar" src={item.avatar} alt={item.name} />
        <div className="voice-meta">
          <p className="voice-category">{item.category}</p>
          <p className="voice-name">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.name}
          </p>
        </div>
      </div>
      <h3>{item.title}</h3>
      <p
        className="voice-text"
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
    </article>
  );
}