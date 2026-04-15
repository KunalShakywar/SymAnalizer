export default function InfoCard({ label, items = [], wide = false }) {
  return (
    <div className={`gallery-info-card${wide ? " gallery-info-card-wide" : ""}`}>
      <div className="gallery-info-title">{label}</div>
      {items.length === 0 ? (
        <div className="gallery-info-empty">Please consult a doctor</div>
      ) : (
        <div className="gallery-info-list">
          {items.map((item, index) => (
            <div key={index} className="gallery-info-item">
              <span className="gallery-info-bullet" />
              <span className="gallery-info-text">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
