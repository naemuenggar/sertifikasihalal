/**
 * Akses data pesan kontak (tabel `contact_messages`) — pesan dari form
 * "More Info". Publik hanya boleh insert (RLS), admin boleh baca & hapus.
 * Semua fungsi aman terhadap Supabase yang belum dikonfigurasi / error jaringan.
 */
import { getSupabase } from "./supabase";
import { LIMITS, cleanText, isOverLimit } from "./limits";
import type { ContactMessage, ContactMessageStatus } from "./types";

/** Kode error submitContact — diterjemahkan ke pesan tampil oleh pemanggil
 *  (form publik dwibahasa), bukan di sini. */
export type ContactErrorCode = "unconfigured" | "required" | "too_long" | "failed";

/**
 * Kirim pesan dari form publik. Mengembalikan ok:true jika tersimpan.
 *
 * Isinya dirapikan dan diperiksa panjangnya di sini, bukan hanya di komponen
 * form — endpoint ini terbuka untuk anonim, jadi setiap pemanggil harus
 * dianggap bisa saja bukan form kita.
 */
export async function submitContact(input: {
  name: string;
  contact: string;
  message: string;
}): Promise<{ ok: boolean; code?: ContactErrorCode; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, code: "unconfigured" };

  const payload = {
    name: cleanText(input.name),
    contact: cleanText(input.contact),
    message: cleanText(input.message),
  };

  if (!payload.name || !payload.contact || !payload.message) {
    return { ok: false, code: "required" };
  }
  if (
    isOverLimit(payload.name, LIMITS.contactName) ||
    isOverLimit(payload.contact, LIMITS.contactContact) ||
    isOverLimit(payload.message, LIMITS.contactMessage)
  ) {
    return { ok: false, code: "too_long" };
  }

  try {
    const { error } = await sb.from("contact_messages").insert(payload);
    return error ? { ok: false, code: "failed", error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, code: "failed", error: e instanceof Error ? e.message : "Unknown error." };
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
    const note = input.catatan ? cleanText(input.catatan) : null;
    if (note && isOverLimit(note, LIMITS.contactNote)) {
      return { error: "Catatan terlalu panjang." };
    }
    const { data, error } = await sb
      .from("contact_messages")
      .update({ status: input.status, catatan: note || null })
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
