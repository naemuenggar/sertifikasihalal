import { getSupabase } from "../lib/supabase";
import type { Faq } from "../lib/types";
import { matchQuestion } from "./tfidf";
import { normalizeForSearch } from "./textPreprocessor";
import { waLinkWith } from "../utils/contact";

let faqCache: Faq[] | null = null;
let faqRequest: Promise<Faq[]> | null = null;
export const FALLBACK_ANSWER = `Hmm, saya belum menemukan jawaban untuk itu. Coba tanyakan dengan kata lain, misalnya seputar **biaya**, **syarat dokumen**, **proses sertifikasi halal**, atau **izin edar BPOM**. Kalau masih bingung, langsung [chat tim Urushalal via WhatsApp](${waLinkWith("Halo, saya punya pertanyaan seputar sertifikasi halal yang belum terjawab chatbot.")}).`;

function conversationalAnswer(question: string): string | null {
  const text = question.toLocaleLowerCase("id-ID").trim();
  if (/^(hi|hai|halo|hello|hallo|uy|hey)\b/.test(text)) {
    return "Halo! Saya siap membantu menjawab pertanyaan seputar sertifikasi halal dan izin edar BPOM. Mau menanyakan apa?";
  }
  // Input ping/iseng: terlalu pendek atau sekadar cek bot hidup.
  if (text.length < 3 || /^(tes|test|coba|ping)\b/.test(text)) {
    return "Saya aktif dan siap membantu. Silakan ketik pertanyaan seputar sertifikasi halal atau izin edar BPOM, misalnya: \"berapa biaya sertifikasi halal?\"";
  }
  if (/^(terima kasih|terimakasih|trimakasih|makasih|thanks|thank you)\b/.test(text)) {
    return "Sama-sama. Kalau masih ada yang ingin ditanyakan tentang sertifikasi halal atau BPOM, saya siap membantu.";
  }
  if (/^(oh|ohh|oke|ok|iya|ya|sip|baik)([\s!.]|$)/.test(text)) {
    return "Baik. Silakan lanjutkan pertanyaan Anda, misalnya tentang dokumen, biaya, durasi, atau proses pendaftaran.";
  }
  if (/^(gimana|bagaimana) (ini )?caranya\??$/.test(text)) {
    return "Maksudnya cara mengurus sertifikasi halal, izin edar BPOM, atau mendaftar lewat Urushalal? Sebutkan salah satunya agar saya bisa menjelaskan langkahnya.";
  }
  if (/\b(babi|anjing)\b/.test(text) && /\b(halal|haram|boleh|makan|konsumsi)\b/.test(text)) {
    return /\bbabi\b/.test(text)
      ? "Tidak. Daging babi dan seluruh turunannya termasuk haram untuk dikonsumsi menurut ketentuan halal."
      : "Tidak. Anjing dan turunannya termasuk najis berat dan tidak boleh dikonsumsi sebagai produk halal. Untuk penanganan bahan atau fasilitas, konsultasikan prosedurnya dengan tim Urushalal. ";
  }
  if (/\b(sembelih|sembelihin|penyembelihan|potong)\b/.test(text) && /\b(sapi|hewan|kambing|ayam)\b/.test(text)) {
    return "Bisa. Penyembelihan sapi dapat dilakukan melalui rumah potong hewan yang memenuhi ketentuan, dengan juru sembelih kompeten, proses sesuai syariat, serta fasilitas dan penelusuran yang terjaga. Tim Urushalal dapat membantu menjelaskan kebutuhan sertifikasinya.";
  }
  if (/^(tahan|bertahan|berlaku)\s+berapa lama\??$/.test(text)) {
    return "Yang ingin ditanyakan masa berlaku sertifikat halal, lama proses pengajuan, atau daya tahan produk? Sebutkan topiknya agar saya bisa menjawab dengan tepat.";
  }
  return null;
}

export async function fetchActiveFaqs(): Promise<Faq[]> {
  if (faqCache) return faqCache;
  if (faqRequest) return faqRequest;
  const sb = getSupabase();
  if (!sb) return [];
  faqRequest = (async () => {
    // Hanya baris FAQ kanonik yang di-cache. Variants (bisa sampai ~100rb baris)
    // tidak ikut di-fetch ke client — pencarian kandidat dilakukan di database
    // lewat RPC match_faq_candidates.
    const { data, error } = await sb.from("faqs").select("*").eq("is_active", true).order("created_at");
    if (error) {
      console.error("Chatbot FAQ tidak dapat dimuat. Pastikan migration FAQ sudah dijalankan di Supabase.", error);
      return [];
    }
    faqCache = (data ?? []) as Faq[];
    return faqCache;
  })();
  faqRequest.catch(() => undefined).finally(() => { faqRequest = null; });
  return faqRequest;
}

export function clearFaqCache() { faqCache = null; }

export async function askChatbot(userQuestion: string): Promise<{ answer: string; score: number; faq: Faq | null }> {
  const conversational = conversationalAnswer(userQuestion);
  if (conversational) return { answer: conversational, score: 1, faq: null };
  const sb = getSupabase();
  const allFaqs = await fetchActiveFaqs();
  let candidateFaqs = allFaqs;

  if (sb && allFaqs.length) {
    const { data, error } = await sb.rpc("match_faq_candidates", {
      query_text: normalizeForSearch(userQuestion), match_limit: 20,
    });
    if (error) {
      console.error("FAQ candidate RPC gagal; gunakan corpus FAQ lokal sebagai fallback.", error);
    } else if (data?.length) {
      const ids = new Set((data as { faq_id: string }[]).map((candidate) => candidate.faq_id));
      candidateFaqs = allFaqs.filter((faq) => ids.has(faq.id));
    }
    // RPC mengembalikan 0 kandidat (mis. query sangat pendek) → tetap rerank
    // di corpus lokal supaya perilaku tidak lebih buruk dari sebelum scaling.
  }

  const result = matchQuestion(userQuestion, candidateFaqs);

  // Debug top-3 kandidat — hanya di mode dev, biar bisa dianalisis kenapa
  // kandidat tertentu menang/kalah.
  if (import.meta.env.DEV && result.topCandidates.length) {
    console.table(result.topCandidates.map(({ faq, score }) => ({
      question: faq.question, category: faq.category, score: Number(score.toFixed(4)),
    })));
  }

  // Kegagalan log tidak boleh membuat jawaban FAQ gagal ditampilkan.
  if (sb) {
    const { error } = await sb.from("chatbot_logs").insert({
      user_question: userQuestion.trim(), matched_faq_id: result.faq?.id ?? null,
      similarity_score: result.score, is_answered: Boolean(result.faq),
      debug_candidates: result.topCandidates.map(({ faq, score }) => ({
        faq_id: faq.id, question: faq.question, score: Number(score.toFixed(4)),
      })),
    });
    if (error) console.error("Chatbot berhasil menjawab, tetapi log gagal disimpan.", error);
  }
  return { ...result, answer: result.faq?.answer ?? FALLBACK_ANSWER };
}
