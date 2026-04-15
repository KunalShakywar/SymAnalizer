import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuSearchFill } from "react-icons/ri";
import "./Searchstyles.css";
import ResultCard from "./ResultCard";
import { buildSearchResult } from "./searchUtils";
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

  const handleAsk = () => {
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
    <div className="search-shell">
      <div className="search-bg-grid" />

      <div className="search-layout">
        <header className="search-header">
          <div className="search-kicker">
            <Link
              to="/symgallery"
              className="search-gallery-link"
              aria-label="Open symptom gallery"
            >
              <RiMenuSearchFill size={28} />
            </Link>
            <span className="">Click and Check condition</span>
            <span className="search-kicker-dot" />
          </div>

          <h1 className="search-title">
            Symptom
            <br />
            <span style={{ color: "#4CAF50" }}>Analyzer</span>
          </h1>

          <p className="search-subtitle">
            Describe what you&apos;re experiencing → get possible solution according
            to you describe
          </p>
        </header>

        <section className="search-input-section">
          <div className="search-textarea-wrap">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              placeholder="e.g. I have a headache, fever, and sore throat since yesterday..."
              rows={3}
              className="search-textarea"
            />

            <div className="search-submit-row">
              <button
                onClick={handleAsk}
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
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {loading && (
          <section className="search-loading-card">
            <div className="search-scanline" />

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

        {showResult && answer && !loading && (
          <section className="search-results">
            <div className="search-diagnosis-banner">
              <div className="search-panel-label">
                {answer.isFallback ? "Need more detail" : "Best match"}
              </div>
              <div className="search-diagnosis-title">{answer.primary.issue}</div>
              {!answer.isFallback && (
                <div className="search-match-meta">
                  Match confidence: {answer.primary.confidence}% for "{answer.query}"
                </div>
              )}
              {!answer.isFallback && answer.primary.matchedTerms?.length > 0 && (
                <div className="search-match-tags">
                  {answer.primary.matchedTerms.map((term) => (
                    <span key={term} className="search-match-tag">
                      {term}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="search-card-grid">
              <ResultCard
                label="Detected Symptoms"
                icon="⚡"
                items={answer.primary.symptoms}
                delay={0}
              />
              <ResultCard
                label="Suggested Medicines"
                icon="💊"
                items={answer.primary.medicines}
                delay={100}
              />
            </div>

            <ResultCard
              label="Medical Advice"
              icon="🩺"
              items={answer.primary.advice}
              delay={200}
              wide
            />

            {!answer.isFallback && answer.related.length > 0 && (
              <div className="search-related-card">
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

            <div className="search-disclaimer">
              ⚠ This is educational purposes only. Always consult a licensed medical
              professional for diagnosis and treatment Thank You :)
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
