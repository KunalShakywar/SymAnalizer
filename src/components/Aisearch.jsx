import { useState } from "react";
import symptomsData from "../data/sym.json";
import {Link,NavLink} from "react-router-dom"
import { RiMenuSearchFill } from "react-icons/ri";

const pulseKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes ping {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.08); }
}
@keyframes scanline {
  0% { top: -4px; }
  100% { top: 100%; }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 0px 0px rgba(251,191,36,0.0); }
  50% { box-shadow: 0 0 18px 4px rgba(251,191,36,0.18); }
}
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-8px); opacity: 1; }
}
@keyframes borderGlow {
  0%, 100% { border-color: rgba(251,191,36,0.2); }
  50% { border-color: rgba(251,191,36,0.6); }
}
@keyframes slideInCard {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}
`;

const loadingPhrases = [
  "Analyzing symptoms...",
  "Cross-referencing database...",
  "Identifying patterns...",
  "Generating diagnosis...",
  "Compiling recommendations...",
];

export default function AISearchUI() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);


  const handleAsk = () => {
    if (loading || !query.trim()) return;

    setLoading(true);
    setShowResult(false);
    setAnswer(null);

    console.log("🔍 User input:", query);

    // Cycle loading phrases
    let i = 0;
    setPhraseIndex(0);
    const iv = setInterval(() => {
      i = (i + 1) % loadingPhrases.length;
      setPhraseIndex(i);
    }, 1100);

    // Small delay to show loading animation
    setTimeout(() => {
      const input = query.toLowerCase();

      const matched = symptomsData.find(condition =>
        condition.keywords.some(keyword => {
          const found = input.includes(keyword.toLowerCase());
          if (found) console.log("Matched:", keyword, "→", condition.issue);
          return found;
        })
      );

      console.log("📦 Result:", matched || "No match");

      if (matched) {
        setAnswer(matched);
      } else {
        console.warn("⚠ No match for:", query);
        setAnswer({
          symptoms: ["Koi matching condition nahi mili"],
          issue: "Condition Not Found",
          medicines: [],
          advice: ["Symptoms aur detail me likhein", "Doctor se mil kar sahi diagnosis lein"],
        });
      }

      clearInterval(iv);
      setLoading(false);
      setShowResult(true);
    }, 2200);
  };

  return (
    <div className="md:w-screen">

   
      <style>{pulseKeyframes}</style>
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'Syne', sans-serif",
        color: "#f5f0e8",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grid background */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />

        {/* Corner accent */}
        <div style={{
          position: "fixed", top: 0, right: 0, width: 240, height: 240,
          background: "radial-gradient(circle at top right, rgba(251,191,36,0.10) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", bottom: 0, left: 0, width: 200, height: 200,
          background: "radial-gradient(circle at bottom left, rgba(251,191,36,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 720, margin: "0 auto",
          padding: "48px 24px 80px",
        }}>
          {/* Header */}
         
          <div style={{ marginBottom: 52 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: 3,
              color: "rgba(251,191,36,0.7)",
              textTransform: "uppercase",
            }}>
               <span >

             <Link  to="/symgallery"><RiMenuSearchFill size={30} className="text-white  bg-[#fbbf24]/50 rounded outline" /></Link>
          </span>
              <span style={{
                display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                background: "#fbbf24",
                animation: "ping 2s ease-in-out infinite",
              }} />
              Medical data stored in json file v1.0
            </div>
            <h1 style={{
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-1.5px",
              color: "#f5f0e8",
            }}>
              Symptom<br />
              <span style={{ color: "#fbbf24" }}>Analyzer</span>
            </h1>
            <p style={{
              marginTop: 14,
              color: "rgba(245,240,232,0.45)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 300,
              letterSpacing: 0.3,
            }}>
              Describe what you're experiencing → get possible solution according to you describe</p>
          </div>

          {/* Search box */}
          <div style={{
            position: "relative",
            marginBottom: 32,
            animation: "glowPulse 3s ease-in-out infinite",
            borderRadius: 4,
          }}>
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk(); } }}
              placeholder="e.g. I have a headache, fever, and sore throat since yesterday..."
              rows={3}
              style={{
                width: "100%",
                background: "rgba(245,240,232,0.04)",
                border: "1px solid rgba(251,191,36,0.25)",
                borderRadius: 4,
                padding: "18px 20px",
                color: "#f5f0e8",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.6,
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                animation: "borderGlow 3s ease-in-out infinite",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.6)"}
              onBlur={e => e.target.style.borderColor = "rgba(251,191,36,0.25)"}
            />
            <div style={{
              position: "absolute", bottom: 14, right: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, color: "rgba(245,240,232,0.2)",
            }}>
              SHIFT+ENTER for newline
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            style={{
              width: "100%",
              padding: "16px 24px",
              background: loading ? "rgba(251,191,36,0.08)" : "#fbbf24",
              color: loading ? "#fbbf24" : "#0a0a0a",
              border: loading ? "1px solid rgba(251,191,36,0.3)" : "1px solid #fbbf24",
              borderRadius: 4,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
              cursor: loading || !query.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              opacity: !query.trim() && !loading ? 0.4 : 1,
            }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ animation: "spin 1s linear infinite", flexShrink: 0 }}>
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Analyze Symptoms
              </>
            )}
          </button>

          {/* Loading state */}
          {loading && (
            <div style={{
              marginTop: 40,
              border: "1px solid rgba(251,191,36,0.15)",
              borderRadius: 4,
              padding: "32px 28px",
              background: "rgba(251,191,36,0.03)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* scanline effect */}
              <div style={{
                position: "absolute", left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)",
                animation: "scanline 2s linear infinite",
                pointerEvents: "none",
              }} />

              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: 3,
                color: "rgba(251,191,36,0.5)",
                textTransform: "uppercase",
                marginBottom: 20,
              }}>Processing query</div>

              <div style={{
                fontSize: 18, fontWeight: 600,
                color: "#fbbf24",
                minHeight: 28,
                transition: "all 0.3s",
              }}>
                {loadingPhrases[phraseIndex]}
              </div>

              <div style={{ marginTop: 24, display: "flex", gap: 6 }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#fbbf24",
                    animation: `dotBounce 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }} />
                ))}
              </div>

              {/* fake progress bars */}
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Neural pattern match", "Medical db query", "Risk assessment"].map((label, i) => (
                  <div key={label}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: "rgba(245,240,232,0.3)",
                      marginBottom: 4, display: "flex", justifyContent: "space-between",
                    }}>
                      <span>{label}</span>
                      <span style={{ color: "rgba(251,191,36,0.5)" }}>running</span>
                    </div>
                    <div style={{
                      height: 2, background: "rgba(245,240,232,0.06)", borderRadius: 2, overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, #fbbf24, transparent)",
                        width: "40%",
                        animation: `scanline ${1.4 + i * 0.3}s linear infinite`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && answer && !loading && (
            <div style={{ marginTop: 40, animation: "fadeSlideUp 0.5s ease both" }}>
              {/* Diagnosis banner */}
              <div style={{
                padding: "22px 24px",
                background: "rgba(251,191,36,0.07)",
                border: "1px solid rgba(251,191,36,0.3)",
                borderLeft: "3px solid #fbbf24",
                borderRadius: 4,
                marginBottom: 20,
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: 3,
                  color: "rgba(251,191,36,0.6)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}>Likely Condition</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fbbf24", letterSpacing: "-0.5px" }}>
                  {answer.issue}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <ResultCard
                  label="Detected Symptoms"
                  icon="⚡"
                  items={answer.symptoms}
                  delay={0}
                />
                <ResultCard
                  label="Suggested Medicines"
                  icon="💊"
                  items={answer.medicines}
                  delay={100}
                />
              </div>

              <ResultCard
                label="Medical Advice"
                icon="🩺"
                items={answer.advice}
                delay={200}
                wide
              />

              <div style={{
                marginTop: 20,
                padding: "14px 18px",
                background: "rgba(245,240,232,0.03)",
                border: "1px solid rgba(245,240,232,0.07)",
                borderRadius: 4,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "rgba(245,240,232,0.3)",
                lineHeight: 1.6,
              }}>
                ⚠ This is educational purposes only. Always consult a licensed medical professional for diagnosis and treatment Thank You :)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, icon, items = [], delay = 0, wide = false }) {
  return (
    <div style={{
      padding: "20px",
      background: "rgba(245,240,232,0.025)",
      border: "1px solid rgba(245,240,232,0.08)",
      borderRadius: 4,
      gridColumn: wide ? "1 / -1" : undefined,
      animation: `slideInCard 0.4s ease both`,
      animationDelay: `${delay}ms`,
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, letterSpacing: 2.5,
        color: "rgba(245,240,232,0.35)",
        textTransform: "uppercase",
        marginBottom: 14,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>{icon}</span> {label}
      </div>
      {items.length === 0 ? (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, color: "rgba(245,240,232,0.2)",
          fontStyle: "italic",
        }}>None identified</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
            }}>
              <span style={{
                marginTop: 5,
                width: 5, height: 5, borderRadius: "50%",
                background: "#fbbf24",
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 14, fontWeight: 400,
                color: "rgba(245,240,232,0.85)",
                lineHeight: 1.55,
              }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}