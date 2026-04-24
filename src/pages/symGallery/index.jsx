import { Fragment, useState } from "react";
import SymData from "../../data/symptoms";
import "./symGallery.css";
import DetailPanel from "./DetailPanel";
import SymCard from "./SymCard";

const DEFAULT_DATA = SymData;

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
    <div className="gallery-shell gallery-fade-in py-10">
      <div className="gallery-bg-grid" />
      <div className="gallery-layout">
        <div className="gallery-kicker">
          Visual Symptom Explorer
        </div>

        <h1 className="gallery-title">
          Symptom
          <br />
          <span style={{ color: "#4CAF50" }}>Gallery</span>
        </h1>
        <br />
        <div className="gallery-toolbar">
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
                  <SymCard
                    condition={condition}
                    isActive={origIdx === activeIdx}
                    onClick={() => handleCardClick(origIdx)}
                    delay={index * 0.05}
                  />
                  {origIdx === activeIdx && data[activeIdx] ? (
                    <div className="gallery-detail-row">
                      <DetailPanel
                        condition={data[activeIdx]}
                        onClose={() => setActiveIdx(null)}
                        />
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
