/**
 * Akses data berita (tabel `news`) — satu sumber untuk halaman publik maupun
 * admin. Semua fungsi menangani kasus Supabase belum dikonfigurasi ATAU terjadi
 * kesalahan jaringan secara anggun (mengembalikan data kosong / ok:false),
 * sesuai pola di lib/supabase.ts.
 */
import { getSupabase } from "./supabase";
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

export async function createNews(input: NewsInput): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Database belum dikonfigurasi." };
  try {
    const { error } = await sb.from("news").insert(input);
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
  try {
    const { error } = await sb.from("news").update(input).eq("id", id);
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

/** Unggah thumbnail ke bucket publik `news-thumbnails`, kembalikan URL publik. */
export async function uploadThumbnail(file: File): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from("news-thumbnails").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    if (error) return null;
    const { data } = sb.storage.from("news-thumbnails").getPublicUrl(path);
    return data.publicUrl;
  } catch {
    return null;
  }
}
