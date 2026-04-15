export default function SymCard({ condition, isActive, onClick, delay }) {
  return (
    <button
      onClick={onClick}
      className={`gallery-card${isActive ? " gallery-card-active" : ""}`}
      style={{
        animationDelay: `${delay}s`,
        "--card-accent": `${condition.color}18`,
      }}
      type="button"
    >
      <div className="gallery-card-visual">{condition.emoji}</div>
      <div className="gallery-card-body">
        <div className="gallery-card-title">{condition.issue}</div>
        <div className="gallery-card-tags">
          {condition.keywords.slice(0, 3).map((keyword, index) => (
            <span key={index} className="gallery-card-tag">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
