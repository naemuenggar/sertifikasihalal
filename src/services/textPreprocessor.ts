import { ind, removeStopwords } from "stopword";
import { defaultDictionary, Stemmer } from "ts-sastrawi";

const stemmer = new Stemmer(defaultDictionary());

const synonymMap: Record<string, string> = {
  duit: "biaya", bayaran: "biaya", tarif: "biaya", charge: "biaya",
  berkas: "dokumen", file: "dokumen", syaratnya: "syarat", daftar: "pendaftaran",
  lama: "durasi", cepet: "cepat", cepatnya: "cepat", izin: "perizinan",
  // Catatan: "hari" sengaja TIDAK dipetakan ke "durasi" — terlalu ambigu
  // ("cuaca hari ini"). Pertanyaan "berapa hari" ditangani category pattern.
};

export function basicTokens(text: string): string[] {
  return text.toLocaleLowerCase("id-ID").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

export function levenshteinDistance(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j <= b.length; j += 1) previous[j] = current[j];
  }
  return previous[b.length];
}

export function correctTypo(token: string, vocabulary: Set<string>): string {
  if (vocabulary.has(token)) return token;
  let closest = token;
  let closestDistance = Infinity;
  for (const candidate of vocabulary) {
    const limit = candidate.length < 5 || token.length < 5 ? 1 : 2;
    if (Math.abs(candidate.length - token.length) > limit) continue;
    const distance = levenshteinDistance(token, candidate);
    if (distance < closestDistance && distance <= limit) { closest = candidate; closestDistance = distance; }
  }
  return closest;
}

export function preprocessText(text: string, vocabulary?: Set<string>): string[] {
  // PENTING: sinonim harus dipetakan SEBELUM stopword removal. Daftar stopword
  // Indonesia membuang kata seperti "lama" dan "berapa" — kalau removal jalan
  // duluan, "berapa lama" hilang sebelum sempat dipetakan ke "durasi", dan
  // pertanyaan durasi kehilangan kata pembeda utamanya.
  const tokens = basicTokens(text)
    .map((token) => synonymMap[token] ?? token)
    .map((token) => vocabulary ? correctTypo(token, vocabulary) : token);
  return removeStopwords(tokens, ind)
    .map((token) => stemmer.stem(token))
    .filter(Boolean);
}

export function normalizeForSearch(text: string): string {
  return preprocessText(text).join(" ");
}

export function getSearchVocabulary(texts: string[]): Set<string> {
  return new Set(texts.flatMap((text) => basicTokens(text)));
}
