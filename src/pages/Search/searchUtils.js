import symptomsData, { basicConditionIssues } from "../../data/symptoms";
import { STOP_WORDS, fallbackAnswer } from "./searchConfig";

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  if (!text) return [];

  return normalizeText(text)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function buildDocumentText(condition) {
  return [
    condition.issue,
    ...(condition.keywords || []),
    ...(condition.symptoms || []),
    ...(condition.advice || []),
    ...(condition.medicines || []),
  ].join(" ");
}

function buildCorpus() {
  const documents = symptomsData.map((condition) => {
    const tokens = tokenize(buildDocumentText(condition));
    const termCounts = new Map();

    tokens.forEach((token) => {
      termCounts.set(token, (termCounts.get(token) || 0) + 1);
    });

    return {
      condition,
      tokens,
      termCounts,
      tokenSet: new Set(tokens),
    };
  });

  const docFrequency = new Map();

  documents.forEach((doc) => {
    doc.tokenSet.forEach((token) => {
      docFrequency.set(token, (docFrequency.get(token) || 0) + 1);
    });
  });

  const totalDocs = documents.length;
  const idf = new Map();

  docFrequency.forEach((df, token) => {
    idf.set(token, Math.log((totalDocs + 1) / (df + 1)) + 1);
  });

  const docVectors = documents.map((doc) => {
    const vector = new Map();
    const totalTokens = doc.tokens.length || 1;

    doc.termCounts.forEach((count, token) => {
      const tf = count / totalTokens;
      const weight = tf * (idf.get(token) || 0);
      if (weight > 0) {
        vector.set(token, weight);
      }
    });

    const magnitude = Math.sqrt(
      Array.from(vector.values()).reduce((sum, value) => sum + value * value, 0)
    );

    return {
      ...doc,
      vector,
      magnitude,
    };
  });

  return { idf, docVectors };
}

const { idf, docVectors } = buildCorpus();

function buildQueryVector(query) {
  const tokens = tokenize(query);
  const termCounts = new Map();

  tokens.forEach((token) => {
    termCounts.set(token, (termCounts.get(token) || 0) + 1);
  });

  const totalTokens = tokens.length || 1;
  const vector = new Map();

  termCounts.forEach((count, token) => {
    const idfValue = idf.get(token);
    if (!idfValue) return;

    const tf = count / totalTokens;
    const weight = tf * idfValue;
    if (weight > 0) {
      vector.set(token, weight);
    }
  });

  const magnitude = Math.sqrt(
    Array.from(vector.values()).reduce((sum, value) => sum + value * value, 0)
  );

  return { tokens, vector, magnitude };
}

function addFieldMatches({
  fieldValue,
  fieldType,
  normalizedQuery,
  queryTokens,
  matchedTerms,
}) {
  const normalizedField = normalizeText(fieldValue);
  let score = 0;

  if (normalizedQuery.length > 2 && normalizedField.includes(normalizedQuery)) {
    score += fieldType === "symptom" ? 2.8 : fieldType === "issue" ? 2.2 : 1.1;
    matchedTerms.add(fieldValue);
  }

  queryTokens.forEach((token) => {
    if (normalizedField.includes(token)) {
      const weight =
        fieldType === "symptom"
          ? 1.9
          : fieldType === "issue"
            ? 1.4
            : fieldType === "keyword"
              ? 1.1
              : 0.35;
      score += weight;
      matchedTerms.add(fieldValue);
    }
  });

  return score;
}

function isBasicFeverQuery(queryTokens) {
  return queryTokens.includes("fever") && queryTokens.length <= 2;
}

function hasAllTokens(queryTokens, requiredTokens) {
  return requiredTokens.every((token) => queryTokens.includes(token));
}

function hasAnyToken(queryTokens, tokens) {
  return tokens.some((token) => queryTokens.includes(token));
}

function getScenarioBoost(condition, queryTokens, normalizedQuery) {
  const issue = normalizeText(condition.issue);
  const matchedTerms = [];
  let boost = 0;

  const applyBoost = (points, terms = []) => {
    boost += points;
    matchedTerms.push(...terms);
  };

  if (
    isBasicFeverQuery(queryTokens) &&
    condition.issue === "Viral Fever"
  ) {
    applyBoost(4.5, ["fever"]);
  }

  if (
    hasAllTokens(queryTokens, ["fever"]) &&
    hasAnyToken(queryTokens, ["chills", "shivering", "sweating"]) &&
    condition.issue === "Malaria"
  ) {
    applyBoost(6, ["fever", "chills", "sweating"]);
  }

  if (
    hasAllTokens(queryTokens, ["fever"]) &&
    hasAnyToken(queryTokens, ["body", "ache", "headache"]) &&
    condition.issue === "Dengue Fever"
  ) {
    applyBoost(4.5, ["fever", "body ache", "headache"]);
  }

  if (
    hasAnyToken(queryTokens, ["runny", "sneezing", "blocked", "stuffy", "cold"]) &&
    condition.issue === "Common Cold"
  ) {
    applyBoost(4.2, ["runny nose", "sneezing", "cold"]);
  }

  if (
    hasAnyToken(queryTokens, ["cough", "khansi", "khasi"]) &&
    hasAnyToken(queryTokens, ["throat", "sore", "gala"]) &&
    condition.issue === "Cough / Throat Infection"
  ) {
    applyBoost(5, ["cough", "throat"]);
  }

  if (
    hasAnyToken(queryTokens, ["stomach", "pet", "gas", "bloating"]) &&
    hasAnyToken(queryTokens, ["pain", "ache", "cramps", "nausea", "vomiting"]) &&
    condition.issue === "Stomach Pain / Gastritis"
  ) {
    applyBoost(4.5, ["stomach pain", "nausea"]);
  }

  if (
    hasAnyToken(queryTokens, ["loose", "motion", "diarrhea", "stool", "potty"]) &&
    condition.issue === "Diarrhea / Loose Motion"
  ) {
    applyBoost(5, ["loose motion"]);
  }

  if (
    hasAnyToken(queryTokens, ["rash", "itching", "khujli", "allergy"]) &&
    condition.issue === "Skin Allergy / Rash"
  ) {
    applyBoost(4.5, ["rash", "itching"]);
  }

  if (
    hasAnyToken(queryTokens, ["vomiting", "ulti", "nausea"]) &&
    condition.issue === "Nausea / Vomiting"
  ) {
    applyBoost(4.5, ["vomiting", "nausea"]);
  }

  if (
    hasAnyToken(queryTokens, ["headache", "sir", "dard"]) &&
    condition.issue === "Tension Headache"
  ) {
    applyBoost(3.8, ["headache"]);
  }

  if (
    issue.includes("viral fever") &&
    hasAnyToken(queryTokens, ["fever", "weakness", "body", "ache"])
  ) {
    applyBoost(1.8, ["fever"]);
  }

  return { boost, matchedTerms };
}

function scoreDocument(doc, queryVector, queryTokens, normalizedQuery) {
  if (
    queryVector.vector.size === 0 ||
    queryVector.magnitude === 0 ||
    doc.magnitude === 0
  ) {
    return null;
  }

  let dotProduct = 0;
  const matchedTerms = [];
  const matchedWeights = [];

  queryVector.vector.forEach((queryWeight, token) => {
    const docWeight = doc.vector.get(token);
    if (!docWeight) return;

    dotProduct += queryWeight * docWeight;
    matchedTerms.push(token);
    matchedWeights.push(queryWeight * docWeight);
  });

  if (dotProduct <= 0 && matchedTerms.length === 0) {
    return null;
  }

  const similarity = dotProduct / (queryVector.magnitude * doc.magnitude);

  const fieldMatchedTerms = new Set();
  let fieldScore = 0;

  fieldScore += addFieldMatches({
    fieldValue: doc.condition.issue,
    fieldType: "issue",
    normalizedQuery,
    queryTokens,
    matchedTerms: fieldMatchedTerms,
  });

  (doc.condition.keywords || []).forEach((keyword) => {
    fieldScore += addFieldMatches({
      fieldValue: keyword,
      fieldType: "keyword",
      normalizedQuery,
      queryTokens,
      matchedTerms: fieldMatchedTerms,
    });
  });

  (doc.condition.symptoms || []).forEach((symptom) => {
    fieldScore += addFieldMatches({
      fieldValue: symptom,
      fieldType: "symptom",
      normalizedQuery,
      queryTokens,
      matchedTerms: fieldMatchedTerms,
    });
  });

  (doc.condition.advice || []).forEach((advice) => {
    fieldScore += addFieldMatches({
      fieldValue: advice,
      fieldType: "advice",
      normalizedQuery,
      queryTokens,
      matchedTerms: fieldMatchedTerms,
    });
  });

  (doc.condition.medicines || []).forEach((medicine) => {
    fieldScore += addFieldMatches({
      fieldValue: medicine,
      fieldType: "medicine",
      normalizedQuery,
      queryTokens,
      matchedTerms: fieldMatchedTerms,
    });
  });

  const scenario = getScenarioBoost(doc.condition, queryTokens, normalizedQuery);

  const rankedMatches = matchedTerms
    .map((term, index) => ({
      term,
      weight: matchedWeights[index],
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4)
    .map((item) => item.term);

  const allMatchedTerms = Array.from(
    new Set([...rankedMatches, ...Array.from(fieldMatchedTerms), ...scenario.matchedTerms])
  ).slice(0, 4);

  const basicBoost = basicConditionIssues.has(doc.condition.issue)
    ? queryTokens.length <= 2
      ? 1.5
      : 0.5
    : 0;

  const score = similarity * 2.5 + fieldScore + scenario.boost + basicBoost;

  return {
    ...doc.condition,
    confidence: Math.min(98, Math.round(18 + score * 9)),
    matchedTerms: allMatchedTerms,
    score,
  };
}

export function buildSearchResult(input) {
  const queryVector = buildQueryVector(input);
  const queryTokens = queryVector.tokens;
  const normalizedQuery = normalizeText(input);

  const rankedMatches = docVectors
    .map((doc) => scoreDocument(doc, queryVector, queryTokens, normalizedQuery))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || b.confidence - a.confidence)
    .slice(0, 3);

  if (rankedMatches.length === 0) {
    return {
      primary: fallbackAnswer,
      related: [],
      query: input,
      isFallback: true,
    };
  }

  return {
    primary: rankedMatches[0],
    related: rankedMatches.slice(1),
    query: input,
    isFallback: false,
  };
}
