import InfoBox from "../../components/toolTip/infoBox";
import ResultCard from "./ResultCard";

export default function MedicineSection({ items = [], delay = 100 }) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10 text-yellow-500">
        <InfoBox text="XYZ may not be the exact medicine, please consult a doctor for accurate prescription" />
      </div>

      <ResultCard
        label="Suggested Medicines"
        icon="💊"
        items={items}
        delay={delay}
      />
    </div>
  );
}
