export default function ResultCard({
  label,
  icon,
  items = [],
  delay = 0,
  wide = false,
}) {
  return (
    <div
      className={`result-card${wide ? " result-card-wide" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="result-card-title">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {items.length === 0 ? (
        <div className="result-card-empty">None identified</div>
      ) : (
        <div className="result-card-list">
          {items.map((item, index) => (
            <div key={index} className="result-card-item">
              <span className="result-card-bullet" />
              <span className="result-card-text">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
