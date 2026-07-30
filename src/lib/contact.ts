/**
 * Akses data pesan kontak (tabel `contact_messages`) — pesan dari form
 * "More Info". Publik hanya boleh insert (RLS), admin boleh baca & hapus.
 * Semua fungsi aman terhadap Supabase yang belum dikonfigurasi / error jaringan.
 */
import { getSupabase } from "./supabase";
import type { ContactMessage, ContactMessageStatus } from "./types";

/** Kirim pesan dari form publik. Mengembalikan ok:true jika tersimpan. */
export async function submitContact(input: {
  name: string;
  contact: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Database belum dikonfigurasi." };
  try {
    const { error } = await sb.from("contact_messages").insert(input);
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

/** Daftar pesan masuk (admin). */
export async function fetchContactMessagesAdmin(): Promise<ContactMessage[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data ?? []) as ContactMessage[];
  } catch {
    return [];
  }
}

/** Ubah status dan catatan follow-up. Hanya role authenticated yang diizinkan RLS. */
export async function updateContactMessageAdmin(
  id: string,
  input: { status: ContactMessageStatus; catatan: string | null }
): Promise<{ item?: ContactMessage; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { error: "Database belum dikonfigurasi." };
  try {
    const { data, error } = await sb
      .from("contact_messages")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    return error ? { error: error.message } : { item: data as ContactMessage };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

/** Hapus pesan (admin). */
export async function deleteContactMessageAdmin(id: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb.from("contact_messages").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
