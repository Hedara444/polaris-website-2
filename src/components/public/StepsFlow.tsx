import type { StepsFlowItem } from "@/lib/types";

export function StepsFlow({ items }: { items: StepsFlowItem[] }) {
  return (
    <ol className="steps-flow">
      {items.map((step, index) => (
        <li className="steps-flow-item" key={step.title}>
          <div className="steps-flow-node" aria-hidden="true">
            <span>{index + 1}</span>
          </div>
          <div className="steps-flow-body">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}