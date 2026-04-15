import InfoCard from "./InfoCard";

export default function DetailPanel({ condition, onClose }) {
  return (
    <div className="gallery-detail-panel">
      <div className="gallery-scanline" />

      <button onClick={onClose} className="gallery-detail-close" type="button">
        ✕
      </button>

      <div className="gallery-detail-head">
        <span className="gallery-detail-emoji">{condition.emoji}</span>
        <div>
          <div className="gallery-meta-label">Likely Condition</div>
          <div className="gallery-detail-title">{condition.issue}</div>
        </div>
      </div>

      <div className="gallery-info-grid">
        <InfoCard label="⚡ Detected Symptoms" items={condition.symptoms} />
        <InfoCard label="💊 Suggested Medicines" items={condition.medicines} />
      </div>

      <InfoCard label="🩺 Medical Advice" items={condition.advice} wide />

      <div className="gallery-disclaimer">
        ⚠ For educational purposes only. Always consult a licensed medical
        professional.
      </div>
    </div>
  );
}
