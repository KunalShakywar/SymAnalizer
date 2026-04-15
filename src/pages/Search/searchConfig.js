export const SEARCH_HISTORY_KEY = "ai-search-history";
export const MAX_HISTORY_ITEMS = 6;

export const loadingPhrases = [
  "Analyzing symptoms...",
  "Cross-referencing database...",
  "Identifying patterns...",
  "Generating diagnosis...",
  "Compiling recommendations...",
];

export const progressSteps = [
  "Neural pattern match",
  "Medical db query",
  "Risk assessment",
];

export const fallbackAnswer = {
  symptoms: ["Koi matching condition nahi mili"],
  issue: "Condition Not Found",
  medicines: [],
  advice: [
    "Symptoms aur detail me likhein",
    "Doctor se mil kar sahi diagnosis lein",
  ],
};

export const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "feeling",
  "from",
  "hai",
  "ho",
  "have",
  "i",
  "im",
  "is",
  "ka",
  "ke",
  "ki",
  "me",
  "mera",
  "meri",
  "mujhe",
  "my",
  "or",
  "since",
  "the",
  "to",
  "with",
]);
