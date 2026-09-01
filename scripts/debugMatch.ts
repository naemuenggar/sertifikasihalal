import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Faq } from "../src/lib/types";
import { matchQuestion } from "../src/services/tfidf";
import { normalizeForSearch } from "../src/services/textPreprocessor";

const queries = [
  "estimasi sertifikat halal berapa lama",
  "berapa hari jadi sertifikatnya",
  "berapa harga bpom",
];

async function main() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi");
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data, error } = await sb.from("faqs").select("*").eq("is_active", true).order("created_at");
  if (error) throw error;
  const faqs = data as Faq[];
  console.log(`FAQ aktif: ${faqs.length}\n`);

  for (const query of queries) {
    console.log("=".repeat(70));
    console.log(`QUERY: ${query}`);
    console.log(`NORMALIZED (yang dikirim ke RPC): "${normalizeForSearch(query)}"`);

    const { data: candidates, error: rpcError } = await sb.rpc("match_faq_candidates", {
      query_text: normalizeForSearch(query), match_limit: 20,
    });
    if (rpcError) {
      console.log("RPC ERROR:", rpcError.message);
    } else {
      console.log(`RPC kandidat: ${candidates.length} baris, faq unik: ${new Set(candidates.map((c: { faq_id: string }) => c.faq_id)).size}`);
      const candidateFaqs = faqs.filter((f) => new Set(candidates.map((c: { faq_id: string }) => c.faq_id)).has(f.id));
      console.log("FAQ yang masuk kandidat RPC:", candidateFaqs.map((f) => f.question).slice(0, 8));
    }

    const result = matchQuestion(query, faqs);
    console.log("\nTop-3 (full corpus lokal):");
    result.topCandidates.forEach(({ faq, score }, i) =>
      console.log(`  ${i + 1}. [${faq.category}] ${faq.question} → ${score.toFixed(4)}`),
    );
    console.log(`JAWABAN FINAL: ${result.faq?.question ?? "(fallback)"} (score ${result.score.toFixed(4)})\n`);
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
