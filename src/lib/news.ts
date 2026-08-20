/**
 * Akses data berita (tabel `news`) — satu sumber untuk halaman publik maupun
 * admin. Semua fungsi menangani kasus Supabase belum dikonfigurasi ATAU terjadi
 * kesalahan jaringan secara anggun (mengembalikan data kosong / ok:false),
 * sesuai pola di lib/supabase.ts.
 */
import { getSupabase } from "./supabase";
import { LIMITS, cleanText, isOverLimit } from "./limits";
import type { News, NewsInput } from "./types";

/** Ambil berita yang sudah published, terbaru dulu. Dipakai publik. */
export async function fetchPublishedNews(opts: { limit?: number; offset?: number } = {}): Promise<{
  items: News[];
  count: number;
  error?: string;
}> {
  const sb = getSupabase();
  if (!sb) return { items: [], count: 0, error: "Supabase belum dikonfigurasi." };
  const { limit = 50, offset = 0 } = opts;
  try {
    const { data, error, count } = await sb
      .from("news")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) return { items: [], count: 0, error: error.message };
    return { items: (data ?? []) as News[], count: count ?? data?.length ?? 0 };
  } catch (error) {
    return {
      items: [],
      count: 0,
      error: error instanceof Error ? error.message : "Berita gagal dimuat.",
    };
  }
}

/** Ambil satu berita published berdasarkan slug (halaman detail publik). */
export async function fetchNewsBySlug(slug: string): Promise<News | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return null;
    return data as News;
  } catch {
    return null;
  }
}

/** Teks satu berita yang sudah disesuaikan bahasa pengunjung. */
export type LocalizedNewsText = {
  title: string;
  summary: string | null;
  content: string | null;
  ctaText: string | null;
  ctaButton: string | null;
};

/**
 * Pilih teks berita sesuai bahasa aktif. Kolom *_en boleh kosong — dalam
 * bahasa Inggris pun berita yang belum diterjemahkan tetap tampil memakai
 * versi Indonesianya, supaya halaman EN tidak pernah kehilangan konten.
 * Kategori tidak ikut di sini: nilainya dari daftar tetap dan diterjemahkan
 * lewat t.news.categoryNames.
 */
export function localizedNews(n: News, lang: "id" | "en"): LocalizedNewsText {
  if (lang !== "en") {
    return {
      title: n.title,
      summary: n.summary,
      content: n.content,
      ctaText: n.cta_text,
      ctaButton: n.cta_button,
    };
  }
  return {
    title: n.title_en || n.title,
    summary: n.summary_en || n.summary,
    content: n.content_en || n.content,
    ctaText: n.cta_text_en || n.cta_text,
    ctaButton: n.cta_button_en || n.cta_button,
  };
}

/* ============================ Khusus admin ============================
 * Memerlukan sesi login (role `authenticated`). RLS menolak akses anonim.
 * ==================================================================== */

/** Semua berita (draft + published) untuk tabel admin. */
export async function fetchAllNewsAdmin(): Promise<News[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data ?? []) as News[];
  } catch {
    return [];
  }
}

export async function fetchNewsByIdAdmin(id: string): Promise<News | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from("news").select("*").eq("id", id).maybeSingle();
    if (error || !data) return null;
    return data as News;
  } catch {
    return null;
  }
}

/**
 * Rapikan & periksa satu payload berita sebelum menyentuh database.
 *
 * Ditaruh di lapis ini, bukan di komponen form, supaya pemeriksaannya tetap
 * jalan dari pemanggil mana pun. Yang diperiksa: panjang tiap kolom (harus
 * sama dengan CHECK di SQL, lihat lib/limits.ts) dan protokol URL gambar —
 * hanya http/https, supaya `javascript:` atau `data:` tidak pernah ikut
 * tersimpan lalu dipasang ke atribut src di halaman publik.
 */
function prepareNewsInput(input: NewsInput): { value?: NewsInput; error?: string } {
  const title = cleanText(input.title);
  const slug = cleanText(input.slug);
  const category = input.category ? cleanText(input.category) : null;
  const summary = input.summary ? cleanText(input.summary) : null;
  const ctaText = input.cta_text ? cleanText(input.cta_text) : null;
  const ctaButton = input.cta_button ? cleanText(input.cta_button) : null;
  const content = input.content ?? null;
  const thumbnailUrl = input.thumbnail_url ? input.thumbnail_url.trim() : null;
  /* Versi Inggris — semuanya opsional; kosong disimpan sebagai null supaya
   * fallback ke versi Indonesia berjalan (lihat localizedNews). */
  const titleEn = input.title_en ? cleanText(input.title_en) : null;
  const summaryEn = input.summary_en ? cleanText(input.summary_en) : null;
  const ctaTextEn = input.cta_text_en ? cleanText(input.cta_text_en) : null;
  const ctaButtonEn = input.cta_button_en ? cleanText(input.cta_button_en) : null;
  const contentEn = input.content_en ?? null;

  if (!title) return { error: "Judul wajib diisi." };
  if (!slug) return { error: "Slug wajib diisi." };
  if (isOverLimit(title, LIMITS.newsTitle)) return { error: `Judul maksimal ${LIMITS.newsTitle} karakter.` };
  if (isOverLimit(slug, LIMITS.newsSlug)) return { error: `Slug maksimal ${LIMITS.newsSlug} karakter.` };
  if (category && isOverLimit(category, LIMITS.newsCategory)) return { error: "Kategori terlalu panjang." };
  if (summary && isOverLimit(summary, LIMITS.newsSummary))
    return { error: `Ringkasan maksimal ${LIMITS.newsSummary} karakter.` };
  if (ctaText && isOverLimit(ctaText, LIMITS.newsCta)) return { error: `Ajakan penutup maksimal ${LIMITS.newsCta} karakter.` };
  if (ctaButton && isOverLimit(ctaButton, LIMITS.newsCtaButton))
    return { error: `Teks tombol maksimal ${LIMITS.newsCtaButton} karakter.` };
  if (content && isOverLimit(content, LIMITS.newsContent))
    return { error: `Isi berita maksimal ${LIMITS.newsContent.toLocaleString("id-ID")} karakter.` };
  if (thumbnailUrl && !/^https?:\/\//i.test(thumbnailUrl))
    return { error: "URL gambar harus diawali http:// atau https://." };
  if (thumbnailUrl && isOverLimit(thumbnailUrl, LIMITS.newsThumbnailUrl))
    return { error: "URL gambar terlalu panjang." };
  if (titleEn && isOverLimit(titleEn, LIMITS.newsTitle))
    return { error: `Judul (EN) maksimal ${LIMITS.newsTitle} karakter.` };
  if (summaryEn && isOverLimit(summaryEn, LIMITS.newsSummary))
    return { error: `Ringkasan (EN) maksimal ${LIMITS.newsSummary} karakter.` };
  if (ctaTextEn && isOverLimit(ctaTextEn, LIMITS.newsCta))
    return { error: `Ajakan penutup (EN) maksimal ${LIMITS.newsCta} karakter.` };
  if (ctaButtonEn && isOverLimit(ctaButtonEn, LIMITS.newsCtaButton))
    return { error: `Teks tombol (EN) maksimal ${LIMITS.newsCtaButton} karakter.` };
  if (contentEn && isOverLimit(contentEn, LIMITS.newsContent))
    return { error: `Isi berita (EN) maksimal ${LIMITS.newsContent.toLocaleString("id-ID")} karakter.` };

  return {
    value: {
      ...input,
      title,
      slug,
      category: category || null,
      summary: summary || null,
      cta_text: ctaText || null,
      cta_button: ctaButton || null,
      content: content || null,
      thumbnail_url: thumbnailUrl || null,
      title_en: titleEn || null,
      summary_en: summaryEn || null,
      cta_text_en: ctaTextEn || null,
      cta_button_en: ctaButtonEn || null,
      content_en: contentEn || null,
    },
  };
}

export async function createNews(input: NewsInput): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Database belum dikonfigurasi." };
  const { value, error: invalid } = prepareNewsInput(input);
  if (!value) return { ok: false, error: invalid };
  try {
    const { error } = await sb.from("news").insert(value);
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

export async function updateNews(
  id: string,
  input: NewsInput
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Database belum dikonfigurasi." };
  const { value, error: invalid } = prepareNewsInput(input);
  if (!value) return { ok: false, error: invalid };
  try {
    const { error } = await sb.from("news").update(value).eq("id", id);
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

export async function deleteNews(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Database belum dikonfigurasi." };
  try {
    const { error } = await sb.from("news").delete().eq("id", id);
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

/** Jenis gambar yang boleh diunggah. Daftar putih, bukan daftar hitam:
 *  yang tidak disebut di sini otomatis ditolak. SVG sengaja tidak masuk —
 *  file SVG bisa memuat <script>, dan bucket ini publik, jadi tautannya bisa
 *  dibuka langsung di tab browser dan skripnya ikut jalan. */
const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

/** Batas ukuran unggahan (5 MB). Ditegakkan lagi di sisi server lewat
 *  `file_size_limit` bucket — pemeriksaan di browser gampang dilewati. */
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * Unggah gambar berita ke bucket publik `news-thumbnails`, kembalikan URL
 * publiknya. Dipakai untuk thumbnail maupun gambar di tengah artikel.
 */
export async function uploadNewsImage(file: File): Promise<{ url?: string; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { error: "Database belum dikonfigurasi." };

  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) return { error: "Format gambar harus JPG, PNG, WebP, atau AVIF." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "Ukuran gambar maksimal 5 MB." };

  try {
    // Nama file dibuat sendiri, tidak memakai file.name — nama asli bisa
    // membawa karakter path (`../`) atau ekstensi ganda yang menyesatkan.
    // Ekstensinya diambil dari tipe MIME yang sudah lolos daftar putih.
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from("news-thumbnails").upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });
    if (error) return { error: error.message };
    const { data } = sb.storage.from("news-thumbnails").getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gambar gagal diunggah." };
  }
}
