import { useState } from "react";
import SymData from "../data/sym.json";

const pulseKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ping2 { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.1); } }
@keyframes scanline { 0% { top: -4px; } 100% { top: 100%; } }
`;

const DEFAULT_DATA = SymData;

function DetailPanel({ condition, onClose }) {
  return (
    <div style={{
      border: "1px solid rgba(251,191,36,.3)",
      borderLeft: "3px solid #fbbf24",
      borderRadius: 6,
      background: "rgba(251,191,36,.04)",
      padding: "28px 24px",
      marginTop: 4,
      position: "relative",
      overflow: "hidden",
      animation: "fadeUp .35s ease both",
    }}>
      {/* scanline effect */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg,transparent,rgba(251,191,36,.4),transparent)",
        animation: "scanline 2.5s linear infinite", pointerEvents: "none",
      }} />

      <button onClick={onClose} style={{
        position: "absolute", top: 14, right: 14,
        background: "rgba(245,240,232,.06)", border: "1px solid rgba(245,240,232,.1)",
        borderRadius: 3, color: "rgba(245,240,232,.5)", fontSize: 16,
        width: 28, height: 28, display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer",
      }}>✕</button>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 22 }}>
        <span style={{ fontSize: 42, flexShrink: 0, marginTop: 2 }}>{condition.emoji}</span>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
            letterSpacing: 3, textTransform: "uppercase",
            color: "rgba(251,191,36,.6)", marginBottom: 5,
          }}>Likely Condition</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fbbf24", letterSpacing: "-.5px" }}>
            {condition.issue}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <InfoCard label="⚡ Detected Symptoms" items={condition.symptoms} />
        <InfoCard label="💊 Suggested Medicines" items={condition.medicines} />
      </div>

      <InfoCard label="🩺 Medical Advice" items={condition.advice} wide />

      <div style={{
        marginTop: 14, padding: "12px 16px",
        background: "rgba(245,240,232,.03)", border: "1px solid rgba(245,240,232,.06)",
        borderRadius: 4, fontFamily: "'JetBrains Mono',monospace",
        fontSize: 10, color: "rgba(245,240,232,.3)", lineHeight: 1.6,
      }}>
        ⚠ For educational purposes only. Always consult a licensed medical professional.
      </div>
    </div>
  );
}

function InfoCard({ label, items = [], wide = false }) {
  return (
    <div style={{
      background: "rgba(245,240,232,.03)",
      border: "1px solid rgba(245,240,232,.07)",
      borderRadius: 4, padding: 16,
      gridColumn: wide ? "1 / -1" : undefined,
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
        letterSpacing: 2.5, textTransform: "uppercase",
        color: "rgba(245,240,232,.35)", marginBottom: 10,
      }}>{label}</div>
      {items.length === 0 ? (
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(245,240,232,.2)", fontStyle: "italic" }}>
          Please consult a doctor
        </div>
      ) : (
        items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fbbf24", flexShrink: 0, marginTop: 5 }} />
            <span style={{ fontSize: 13, color: "rgba(245,240,232,.85)", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))
      )}
    </div>
  );
}

function SymCard({ condition, isActive, onClick, delay }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? "rgba(251,191,36,.09)" : "rgba(245,240,232,.04)",
        border: isActive ? "1px solid #fbbf24" : "1px solid rgba(245,240,232,.08)",
        borderRadius: 6, cursor: "pointer", overflow: "hidden",
        transition: "all .22s",
        animation: "fadeUp .4s ease both",
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "rgba(251,191,36,.5)";
          e.currentTarget.style.background = "rgba(251,191,36,.06)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "rgba(245,240,232,.08)";
          e.currentTarget.style.background = "rgba(245,240,232,.04)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      <div style={{
        width: "100%", height: 110,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: condition.color + "18",
        borderBottom: "1px solid rgba(245,240,232,.06)",
        fontSize: 44,
      }}>
        {condition.emoji}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f0e8", marginBottom: 6, lineHeight: 1.3 }}>
          {condition.issue}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {condition.keywords.slice(0, 3).map((k, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
              letterSpacing: .5, background: "rgba(251,191,36,.1)",
              color: "rgba(251,191,36,.8)", padding: "2px 7px",
              borderRadius: 2, textTransform: "uppercase",
            }}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SymptomGallery({ data = DEFAULT_DATA }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const [filter, setFilter] = useState("");

  const filtered = filter.trim()
    ? data.filter(c => {
        const q = filter.toLowerCase();
        return (
          c.issue.toLowerCase().includes(q) ||
          c.keywords.some(k => k.toLowerCase().includes(q)) ||
          c.symptoms.some(s => s.toLowerCase().includes(q))
        );
      })
    : data;

  const handleCardClick = (origIdx) => {
    // same card click = close, different card = open new
    setActiveIdx(origIdx === activeIdx ? null : origIdx);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      fontFamily: "'Syne', sans-serif", color: "#f5f0e8",
      position: "relative", overflow: "hidden",
      padding: "40px 20px 60px",
   
    }}    className="w-screen">
      <style>{pulseKeyframes}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(251,191,36,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,0.04) 1px,transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>

        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
          letterSpacing: 3, color: "rgba(251,191,36,.7)", textTransform: "uppercase",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#fbbf24",
            animation: "ping2 2s ease-in-out infinite", flexShrink: 0,
          }} />
          Visual Symptom Explorer
        </div>

        <h1 style={{
          fontSize: "clamp(28px,5vw,48px)", fontWeight: 800,
          lineHeight: 1.05, letterSpacing: "-1.5px", color: "#f5f0e8", marginBottom: 6,
        }}>
          Symptom<br /><span style={{ color: "#fbbf24" }}>Gallery</span>
        </h1>

        <p style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 300,
          color: "rgba(245,240,232,.4)", marginBottom: 32, letterSpacing: .3, lineHeight: 1.6,
        }}>
          Click on any condition → symptoms, medicines and advice, instantly
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          <input
            value={filter}
            onChange={e => { setFilter(e.target.value); setActiveIdx(null); }}
            placeholder="Search condition or symptom... (e.g. fever, cold, sugar)"
            style={{
              flex: 1, background: "rgba(245,240,232,.04)",
              border: "1px solid rgba(251,191,36,.2)", borderRadius: 4,
              padding: "13px 16px", color: "#f5f0e8",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
              fontWeight: 300, outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(251,191,36,.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(251,191,36,.2)"}
          />
          <button
            onClick={() => { setFilter(""); setActiveIdx(null); }}
            style={{
              background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.3)",
              borderRadius: 4, padding: "0 16px", color: "#fbbf24",
              fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700,
              letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
            }}>Clear</button>
        </div>

        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
          letterSpacing: 3, textTransform: "uppercase",
          color: "rgba(251,191,36,.5)", marginBottom: 14,
        }}>
          {filtered.length} conditions available — click to see details
        </div>

        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: 40,
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 13, color: "rgba(245,240,232,.4)",
          }}>
            No condition found
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 14, marginBottom: 32,
          }}>
            {filtered.map((c, i) => {
              const origIdx = data.indexOf(c);
              return (
                <> 
                  <SymCard
                    key={origIdx}
                    condition={c}
                    isActive={origIdx === activeIdx}
                    onClick={() => handleCardClick(origIdx)}
                    delay={i * 0.05}
                  />
                  {origIdx === activeIdx && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <DetailPanel
                        condition={data[activeIdx]}
                        onClose={() => setActiveIdx(null)}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}