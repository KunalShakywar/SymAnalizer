import { Fragment, useState } from "react";
import SymData from "../data/sym.json";
import "./symGallery.css";

const DEFAULT_DATA = SymData;

function DetailPanel({ condition, onClose }) {
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

function InfoCard({ label, items = [], wide = false }) {
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

function SymCard({ condition, isActive, onClick, delay }) {
  return (
    <button
      onClick={onClick}
      className={`gallery-card${isActive ? " gallery-card-active" : ""}`}
      style={{ animationDelay: `${delay}s`, "--card-accent": `${condition.color}18` }}
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

export default function SymptomGallery({ data = DEFAULT_DATA }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const [filter, setFilter] = useState("");

  const filtered = filter.trim()
    ? data.filter((condition) => {
        const query = filter.toLowerCase();
        return (
          condition.issue.toLowerCase().includes(query) ||
          condition.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query)
          ) ||
          condition.symptoms.some((symptom) =>
            symptom.toLowerCase().includes(query)
          )
        );
      })
    : data;

  const handleCardClick = (origIdx) => {
    setActiveIdx(origIdx === activeIdx ? null : origIdx);
  };

  return (
    <div className="gallery-shell">
      <div className="gallery-bg-grid" />
      <div className="gallery-bg-accent gallery-bg-accent-right" />
      <div className="gallery-bg-accent gallery-bg-accent-left" />

      <div className="gallery-layout">
        <div className="gallery-kicker">
          <span className="gallery-kicker-dot" />
          Visual Symptom Explorer
        </div>

        <h1 className="gallery-title">
          Symptom
          <br />
          <span style={{color:'#4CAF50',}}>Gallery</span>
        </h1>

        <p className="gallery-subtitle">
          Click on any condition → symptoms, medicines and advice, instantly
        </p>

        <div className="gallery-toolbar ">
          <input
            
            type="search"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setActiveIdx(null);
            }}
            placeholder="Search condition or symptom... (e.g. fever, cold, sugar)"
            className="gallery-search-input"
          />
          <button
            onClick={() => {
              setFilter("");
              setActiveIdx(null);
            }}
            className="gallery-clear-btn"
            disabled={!filter.trim()}
            type="button"
          >
            Clear
          </button>
        </div>

        <div className="gallery-results-label">
          {filtered.length} conditions available — click to see details
        </div>

        {filtered.length === 0 ? (
          <div className="gallery-empty-state">No condition found</div>
        ) : (
          <div className="gallery-grid">
            {filtered.map((condition, index) => {
              const origIdx = data.indexOf(condition);
              return (
                <Fragment key={origIdx}>
                  {/* cards */}
                  <SymCard
                    condition={condition}
                    isActive={origIdx === activeIdx}
                    onClick={() => handleCardClick(origIdx)}
                    delay={index * 0.05}
                  />
                  {origIdx === activeIdx && (
                    <div className="gallery-detail-row">
                      <DetailPanel
                        condition={data[activeIdx]}
                        onClose={() => setActiveIdx(null)}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
