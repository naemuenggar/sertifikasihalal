import { basicTokens, preprocessText } from "./textPreprocessor";
import { detectCategoryHint } from "../data/categoryPatterns";
import type { Faq } from "../lib/types";

export const FAQ_MATCH_THRESHOLD = 0.25;
/** Soft boost untuk FAQ yang kategorinya cocok dengan pola pertanyaan.
 *  Bukan hard filter — kandidat kategori lain tetap bisa menang kalau
 *  similarity aslinya jauh lebih tinggi. */
export const CATEGORY_BOOST = 1.3;

export interface MatchResult {
  faq: Faq | null;
  score: number;
  /** 3 kandidat teratas SETELAH category boost, urut skor tertinggi. */
  topCandidates: { faq: Faq; score: number }[];
}

function vectorize(documents: string[][]): number[][] {
  const vocabulary = [...new Set(documents.flat())];
  const documentFrequency = vocabulary.map((term) =>
    documents.reduce((count, document) => count + (document.includes(term) ? 1 : 0), 0),
  );
  return documents.map((document) => {
    const counts = new Map<string, number>();
    document.forEach((term) => counts.set(term, (counts.get(term) ?? 0) + 1));
    return vocabulary.map((term, index) => {
      const tf = (counts.get(term) ?? 0) / Math.max(document.length, 1);
      const idf = Math.log((documents.length + 1) / (documentFrequency[index] + 1)) + 1;
      return tf * idf;
    });
  });
}

export function buildTfIdfVectors(documents: string[][]): number[][] {
  return vectorize(documents);
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, value, index) => sum + value * (vecB[index] ?? 0), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, value) => sum + value ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, value) => sum + value ** 2, 0));
  return magnitudeA && magnitudeB ? dot / (magnitudeA * magnitudeB) : 0;
}

export function matchQuestion(userQuestion: string, faqs: Faq[]): MatchResult {
  if (!userQuestion.trim() || !faqs.length) return { faq: null, score: 0, topCandidates: [] };
  const categoryHints = detectCategoryHint(userQuestion);
  const faqTexts = faqs.flatMap((faq) => [
    `${faq.question} ${faq.keywords ?? ""}`,
    ...(faq.variants ?? []).map((variant) => `${variant} ${faq.keywords ?? ""}`),
  ]);
  const vocabulary = new Set(faqTexts.flatMap((text) => basicTokens(text)));
  const userTokens = preprocessText(userQuestion, vocabulary);
  const faqTokens = faqTexts.map((text) => preprocessText(text));
  const documentFaqIndexes = faqs.flatMap((_, faqIndex) => [faqIndex, ...(faqs[faqIndex].variants ?? []).map(() => faqIndex)]);
  const documents = [userTokens, ...faqTokens];
  const [userVector, ...faqVectors] = vectorize(documents);
  const scores = new Map<number, number>();
  faqVectors.forEach((vector, index) => {
    const cosineScore = cosineSimilarity(userVector, vector);
    // TF-IDF normalizes against the full FAQ document, so a one- or two-word
    // query can score too low even when it exactly matches a keyword.
    const overlap = userTokens.length
      ? userTokens.filter((token) => faqTokens[index].includes(token)).length / userTokens.length
      : 0;
    const score = Math.max(cosineScore, overlap * 0.75);
    const faqIndex = documentFaqIndexes[index];
    if (score > (scores.get(faqIndex) ?? 0)) scores.set(faqIndex, score);
  });

  // Soft boost kategori: naikkan bobot FAQ yang kategorinya cocok pola
  // pertanyaan, tanpa membuang kandidat kategori lain.
  if (categoryHints.length) {
    scores.forEach((score, faqIndex) => {
      const category = faqs[faqIndex].category;
      if (category && categoryHints.includes(category)) scores.set(faqIndex, score * CATEGORY_BOOST);
    });
  }

  const topCandidates = [...scores.entries()]
    .map(([faqIndex, score]) => ({ faq: faqs[faqIndex], score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const best = topCandidates[0];
  return {
    faq: best && best.score >= FAQ_MATCH_THRESHOLD ? best.faq : null,
    score: best?.score ?? 0,
    topCandidates,
  };
}
