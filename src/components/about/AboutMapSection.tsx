import "@/components/landing/styles/mutual.css";
import { MutualMapStage } from "@/components/landing/MutualMapStage";

export function AboutMapSection() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <MutualMapStage stageId="mstageAbout" className="rv in" />
    </div>
  );
}
