import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Klien Supabase — satu sumber untuk seluruh aplikasi.
 *
 * Dibuat lazy supaya aplikasi tetap bisa di-build & dirender walau env belum
 * diisi (mis. saat preview tanpa backend). Kalau belum dikonfigurasi,
 * `getSupabase()` mengembalikan null dan setiap fitur yang butuh database
 * harus menangani kasus null tersebut secara anggun (fallback/kosong).
 *
 * Isi env di `.env.local` (lihat `.env.example`):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
