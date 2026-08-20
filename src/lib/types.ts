/** Tipe data bersama yang dipetakan langsung dari tabel Supabase. */

export type NewsStatus = "draft" | "published";

export type News = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  thumbnail_url: string | null;
  summary: string | null;
  content: string | null;
  cta_text: string | null;
  cta_button: string | null;
  /* Versi Inggris. Null/kosong = pengunjung EN melihat versi Indonesia
   * (fallback) — lihat localizedNews() di lib/news.ts. */
  title_en: string | null;
  summary_en: string | null;
  content_en: string | null;
  cta_text_en: string | null;
  cta_button_en: string | null;
  status: NewsStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Kolom yang bisa diisi saat membuat/mengubah berita. */
export type NewsInput = {
  title: string;
  slug: string;
  category: string | null;
  thumbnail_url: string | null;
  summary: string | null;
  content: string | null;
  cta_text: string | null;
  cta_button: string | null;
  title_en: string | null;
  summary_en: string | null;
  content_en: string | null;
  cta_text_en: string | null;
  cta_button_en: string | null;
  status: NewsStatus;
  published_at: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  contact: string;
  message: string;
  status: ContactMessageStatus;
  catatan: string | null;
  followed_up_at: string | null;
  created_at: string;
};

export type ContactMessageStatus = "belum_ditindaklanjuti" | "sudah_ditindaklanjuti";
