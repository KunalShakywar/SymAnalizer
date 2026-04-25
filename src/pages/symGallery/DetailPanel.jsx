import InfoCard from "./InfoCard";
import InfoBox from "../../components/toolTip/infoBox";

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
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 text-yellow-500">
            <InfoBox text="XYZ may not be the exact medicine, please consult a doctor for accurate prescription" />
          </div>
          <InfoCard label="💊 Suggested Medicines" items={condition.medicines} />
        </div>
      </div>

      <InfoCard label="🩺 Medical Advice" items={condition.advice} wide />

      <div className="gallery-disclaimer text-center text-sm mt-6 text-gray-400">
        ⚠ For educational purposes only. Always consult a licensed medical
        professional for diagnosis and treatment.
      </div>
    </div>
  );
}
