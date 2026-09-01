import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { normalizeForSearch } from "../src/services/textPreprocessor";

type Faq = { id: string; question: string; keywords: string | null };
const stems = ["berapa", "apa", "gimana", "bagaimana", "kapan", "dimana", "apakah", "mau tanya", ""];
const fillers = ["kak", "min", "ya", "dong", "sih", "nih", "gan", ""];
const target = Number(process.env.TARGET_COUNT ?? "100000");
const dryRun = process.argv.includes("--dry-run");
const batchSize = 500;

function random<T>(items: T[]): T { return items[Math.floor(Math.random() * items.length)]; }
function typo(text: string): string {
  const words = text.split(" ");
  const index = words.findIndex((word) => word.length > 4);
  if (index < 0) return text;
  const word = words[index];
  const at = Math.floor(Math.random() * (word.length - 1));
  const mode = Math.floor(Math.random() * 3);
  const changed = mode === 0 ? word.slice(0, at) + word[at + 1] + word[at] + word.slice(at + 2)
    : mode === 1 ? word.slice(0, at) + word.slice(at + 1) : word.slice(0, at) + word[at] + word.slice(at);
  words[index] = changed;
  return words.join(" ");
}
function casing(text: string): string {
  const mode = Math.floor(Math.random() * 4);
  return mode === 0 ? text.toUpperCase() : mode === 1 ? text.toLowerCase() : mode === 2
    ? text.split("").map((char) => Math.random() > .7 ? char.toUpperCase() : char).join("") : text;
}
function makeVariant(faq: Faq): string {
  const phrase = random([faq.question, ...(faq.keywords ?? "").split(",").filter(Boolean)]);
  const prefix = random(stems);
  const value = [prefix, phrase, random(fillers)].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  return Math.random() < .25 ? casing(typo(value)) : casing(value);
}

async function main() {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Isi VITE_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local");
  const sb = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await sb.from("faqs").select("id, question, keywords").eq("is_active", true);
  if (error) throw error;
  const faqs = data as Faq[];
  if (!faqs.length) throw new Error("Tidak ada FAQ aktif.");
  const seen = new Set<string>();
  const rows: { faq_id: string; variant_text: string; normalized_text: string }[] = [];
  while (rows.length < target) {
    const faq = random(faqs);
    const variantText = makeVariant(faq);
    const key = `${faq.id}\u0000${variantText.toLocaleLowerCase("id-ID")}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ faq_id: faq.id, variant_text: variantText, normalized_text: normalizeForSearch(variantText) });
  }
  console.log(`${dryRun ? "Dry run" : "Siap insert"}: ${rows.length} variants untuk ${faqs.length} FAQ aktif.`);
  if (dryRun) { console.log(rows.slice(0, 20)); return; }
  for (let i = 0; i < rows.length; i += batchSize) {
    const { error: insertError } = await sb.from("faq_question_variants").upsert(rows.slice(i, i + batchSize), { onConflict: "faq_id,variant_text", ignoreDuplicates: true });
    if (insertError) throw insertError;
    console.log(`Inserted ${Math.min(i + batchSize, rows.length)}/${rows.length}`);
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
