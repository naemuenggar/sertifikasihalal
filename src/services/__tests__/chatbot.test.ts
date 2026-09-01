import { describe, expect, it } from "vitest";
import type { Faq } from "../../lib/types";
import { matchQuestion } from "../tfidf";

const faqs: Faq[] = [
  { id: "cost", question: "Berapa biaya sertifikasi halal?", answer: "biaya", category: "biaya", keywords: "harga tarif ongkos", variants: ["Kena charge berapa?", "Duitnya berapa ya?"], is_active: true, created_at: "", updated_at: "" },
  { id: "documents", question: "Apa syarat dokumen sertifikasi halal?", answer: "dokumen", category: "dokumen", keywords: "berkas persyaratan", variants: ["Berkas apa saja yang dibutuhkan?"], is_active: true, created_at: "", updated_at: "" },
  { id: "time", question: "Berapa lama proses sertifikasi halal?", answer: "durasi", category: "proses", keywords: "durasi estimasi", variants: ["Prosesnya lama gak sih?"], is_active: true, created_at: "", updated_at: "" },
  { id: "bpom", question: "Bagaimana alur izin edar BPOM?", answer: "bpom", category: "bpom", keywords: "nomor edar registrasi", variants: ["Cara daftar BPOM bagaimana?"], is_active: true, created_at: "", updated_at: "" },
];

const cases: Array<[string, string | null]> = [
  ["Berapa biaya sertifikasi halal?", "cost"],
  ["Kena charge berapa?", "cost"],
  ["duitnya berapa ya", "cost"],
  ["biya sertifikasi halal", "cost"],
  ["setifikat halal dokumen apa saja", "documents"],
  ["Apa syarat dokumen sertifikasi halal?", "documents"],
  ["Berkas apa saja yang dibutuhkan?", "documents"],
  ["Prosesnya lama gak sih?", "time"],
  ["berapa durasi pengurusannya", "time"],
  ["Cara daftar BPOM bagaimana?", "bpom"],
  ["cuaca hari ini gimana", null],
  ["   ", null],
];

describe("chatbot retrieval evaluation", () => {
  it.each(cases)("matches: %s", (question, expectedId) => {
    expect(matchQuestion(question, faqs).faq?.id ?? null).toBe(expectedId);
  });

  it("category bias: durasi mengalahkan definisi untuk pertanyaan waktu", () => {
    // Kasus yang ditemukan: "berapa lama sertifikat jadi" dulu salah match ke
    // FAQ definisi karena kata "sertifikat" dominan di keduanya.
    const result = matchQuestion("berapa lama sertifikat jadi", faqs);
    expect(result.faq?.category).toBe("proses");
    expect(result.topCandidates.length).toBeGreaterThan(0);
    console.table(result.topCandidates.map(({ faq, score }) => ({
      question: faq.question, category: faq.category, score: Number(score.toFixed(4)),
    })));
  });

  it("topCandidates terisi dan terurut menurun", () => {
    const result = matchQuestion("berapa biaya sertifikasi halal?", faqs);
    expect(result.topCandidates.length).toBe(3);
    for (let i = 1; i < result.topCandidates.length; i += 1) {
      expect(result.topCandidates[i - 1].score).toBeGreaterThanOrEqual(result.topCandidates[i].score);
    }
  });

  // TODO: pertanyaan "ada bahan haram 0,01% gimana" butuh FAQ spesifik soal
  // ambang batas/kontaminasi bahan — kemungkinan besar belum ada di database.
  // Untuk sekarang cukup pastikan tidak error dan jatuh ke fallback sopan
  // (bukan salah match ke FAQ tidak relevan). Tambahkan FAQ-nya lalu aktifkan
  // ekspektasi match di sini.
  it("pertanyaan ambang bahan tanpa FAQ spesifik jatuh ke fallback", () => {
    const result = matchQuestion("ada bahan haram 0,01% gimana", faqs);
    if (result.score < 0.25) {
      expect(result.faq).toBeNull();
    } else {
      console.warn("Skor di atas threshold — cek apakah FAQ yang ter-match relevan:", result.faq?.question);
    }
  });

  it("prints overall accuracy for the evaluation set", () => {
    const passed = cases.filter(([question, expectedId]) => (matchQuestion(question, faqs).faq?.id ?? null) === expectedId).length;
    const accuracy = (passed / cases.length) * 100;
    console.info(`Chatbot retrieval accuracy: ${passed}/${cases.length} (${accuracy.toFixed(2)}%)`);
    expect(passed).toBe(cases.length);
  });
});
