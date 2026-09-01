import { describe, expect, it } from "vitest";
import type { Faq } from "../../lib/types";
import { matchQuestion } from "../tfidf";

/**
 * Benchmark lokal: mensimulasikan beban rerank TF-IDF di atas himpunan
 * kandidat besar. Di production, database menyaring kandidat via trigram
 * index, sehingga TF-IDF hanya bekerja pada ~20 kandidat — test ini justru
 * menguji skenario terburuk (corpus besar langsung di client) untuk membuktikan
 * metode tetap responsif.
 */
function makeFaqs(count: number): Faq[] {
  const topics = ["biaya", "dokumen", "proses", "bpom", "halal", "sertifikat", "pendaftaran", "bahan", "audit", "label"];
  return Array.from({ length: count }, (_, i) => ({
    id: `faq-${i}`,
    question: `Bagaimana ${topics[i % topics.length]} pengajuan nomor ${i}?`,
    answer: "jawaban",
    category: "umum",
    keywords: `${topics[(i + 1) % topics.length]} ${topics[(i + 2) % topics.length]}`,
    variants: [],
    is_active: true,
    created_at: "",
    updated_at: "",
  }));
}

const samples = [
  "berapa biaya sertifikasi halal",
  "biya pengajuan nomor 5",
  "dokumen apa saja yang dibutuhkan",
  "proses audit berapa lama",
  "cara daftar bpom",
  "label halal kemasan",
  "bahan baku impor",
  "pendaftaran reguler",
  "sertifikat halal resto",
  "audit lph kapan",
];

describe("matching benchmark", () => {
  it("reports average matching time over a large corpus", () => {
    const faqs = makeFaqs(2000);
    const timings: number[] = [];
    for (const sample of samples) {
      const start = performance.now();
      matchQuestion(sample, faqs);
      timings.push(performance.now() - start);
    }
    const average = timings.reduce((sum, value) => sum + value, 0) / timings.length;
    console.info(
      `Benchmark matchQuestion: corpus ${faqs.length} FAQ, ${samples.length} sampel, ` +
      `rata-rata ${average.toFixed(2)} ms/query (min ${Math.min(...timings).toFixed(2)}, max ${Math.max(...timings).toFixed(2)})`,
    );
    expect(average).toBeLessThan(1000);
  });
});
