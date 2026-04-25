import { useEffect, useRef, useState } from "react";
import "./Searchstyles.css";
import ResultCard from "./ResultCard";
import MedicineSection from "./MedicineSection";
import { buildSearchResult } from "./searchUtils";
import { MdHistory } from "react-icons/md";
import InfoBox from "../../components/toolTip/infoBox";
import ReloadBtn from "../../components/basicTools/ReloadBtn";
import {
  MAX_HISTORY_ITEMS,
  SEARCH_HISTORY_KEY,
  loadingPhrases,
  progressSteps,
} from "./searchConfig";

export default function AISearchUI() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setQuery("");
    setLoading(false);
    setAnswer(null);
    setShowResult(false);
    setPhraseIndex(0);
  };

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);

      if (!storedHistory) return;

      const parsedHistory = JSON.parse(storedHistory);
      if (Array.isArray(parsedHistory)) {
        setHistory(parsedHistory);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAnalyze = () => {
    if (loading || !query.trim()) return;

    const trimmedQuery = query.trim();

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setLoading(true);
    setShowResult(false);
    setAnswer(null);
    setPhraseIndex(0);

    let nextIndex = 0;
    intervalRef.current = setInterval(() => {
      nextIndex = (nextIndex + 1) % loadingPhrases.length;
      setPhraseIndex(nextIndex);
    }, 1100);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const updatedHistory = [
        trimmedQuery,
        ...history.filter(
          (item) => item.toLowerCase() !== trimmedQuery.toLowerCase()
        ),
      ].slice(0, MAX_HISTORY_ITEMS);

      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
      } catch {
        // Ignore storage errors and keep the in-memory history.
      }

      setHistory(updatedHistory);
      setAnswer(buildSearchResult(trimmedQuery));
      setLoading(false);
      setShowResult(true);
    }, 900);
  };

  return (
    <div className="search-shell py-10">
      <div className="search-bg-grid" />
      <div className="search-layout">
       
        <header className="search-header">
          <div className="search-kicker">
            <span className="">Click and Check condition</span>
          </div>

          <h1 className="search-title">
            Symptom
            <br />
            <span style={{ color: "#4CAF50" }}>Analyzer</span>
          </h1>

        </header>
{/* MAIN SECTION OF THIS PAGE */}
        <section className="search-input-section">
               <ReloadBtn onClick={handleReset} />
          
          <div className="search-textarea-wrap">
            <div className="absolute top-2 right-2 z-10 text-gray-50">
              <InfoBox
                text="Describe what you're experiencing → get possible solution"
                autoHideMs={3000}
              />
            </div>

          {/* MAIN TEXTAREA */}
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAnalyze();
                }
              }}
              placeholder="e.g. I have a headache, fever, and sore throat since yesterday..."
              rows={3}
              className="search-textarea"
            />

            <div className="search-submit-row">
              <button
                onClick={handleAnalyze}
                disabled={loading || !query.trim()}
                className="search-submit-btn"
                type="button"
              >
                {loading ? (
                  <svg
                    className="search-spinner"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                )}
                <span>{loading ? "Analyzing" : "Analyze"}</span>
              </button>
            </div>
          </div>
{/* HISTORY SECTION ONLY 6 KEYWORDS STORES */}
          {history.length > 0 && (
            <div className="search-history">
              <div className="search-history-label">Previous searches</div>
              <div className="search-history-list">
                {history.map((item) => (
                  <button
                    key={item}
                    className="search-history-chip"
                    onClick={() => {
                      setQuery(item);
                    }}
                    type="button"
                  >
                    <span className="flex items-center gap-1">

                      <MdHistory size={15} />
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {loading && (
          <section className="search-loading-card">
            <div className="search-panel-label">Processing query</div>
            <div className="search-loading-title">
              {loadingPhrases[phraseIndex]}
            </div>

            <div className="search-loading-dots" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((index) => (
                <span
                  key={index}
                  className="search-loading-dot"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </div>

            <div className="search-progress-list">
              {progressSteps.map((label, index) => (
                <div key={label} className="search-progress-item">
                  <div className="search-progress-head">
                    <span>{label}</span>
                    <span className="search-progress-status">running</span>
                  </div>
                  <div className="search-progress-track">
                    <div
                      className="search-progress-bar"
                      style={{ animationDuration: `${1.4 + index * 0.3}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
{/* SEARCH RESULT  */}
        {showResult && answer && !loading && (
          <section className="search-results">
            <div className="search-diagnosis-banner">
              <div className="search-panel-label">
                {answer.isFallback ? "Need more detail" : "Best match"}
              </div>
              <div className="search-diagnosis-title">{answer.primary.issue}</div>
              {answer.primary.temperature && (
                <div className="search-match-meta">
                  Detected temperature: {answer.primary.temperature}
                </div>
              )}
              {!answer.isFallback && (
                <div className="search-match-meta">
                  Match confidence: {answer.primary.confidence}% 
                </div>
              )}
              {!answer.isFallback && answer.primary.matchedTerms?.length > 0 && (
                <div className="search-match-tags">
                </div>
              )}
            </div>
        {/* DETECT SYMTOMS */}
            <div className="search-card-grid">
              <ResultCard
                label="Detected Symptoms"
                icon="⚡"
                items={answer.primary.symptoms}
                delay={0}
              />
{/* MEDICINE SECTION ISKA ALAG SE FILE BANAYA KYUNKI HUMHE ISME CLICK KAR KE SHOP PAR LE JANA HAI :) */}
              <MedicineSection items={answer.primary.medicines} delay={100} />
            </div>
         
{/* MEDICCAL ADVICE */}
            <ResultCard
              label="Medical Advice"
              icon="🩺"
              items={answer.primary.advice}
              delay={200}
              wide
            />

            {!answer.isFallback && answer.related.length > 0 && (
              <div className="search-related-card">
                <br />
                {/* CLOSE MATCHE  */}
                <div className="search-panel-label">Close matches</div>
                <div className="search-related-list">
                  {answer.related.map((match) => (
                    <button
                      key={match.issue}
                      className="search-related-item"
                      onClick={() =>
                        setAnswer((current) => ({
                          ...current,
                          primary: match,
                          related: [
                            current.primary,
                            ...current.related.filter(
                              (item) => item.issue !== match.issue
                            ),
                          ].slice(0, 2),
                        }))
                      }
                      type="button"
                    >
                      <span>{match.issue}</span>
                      <span>{match.confidence}%</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="search-disclaimer text-center text-sm mt-6 text-gray-400">
              ⚠ This is educational purposes only. Always consult a licensed medical
              professional for diagnosis and treatment Thank You!
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
