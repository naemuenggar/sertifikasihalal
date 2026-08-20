-- ============================================================
-- Kolom versi Inggris untuk berita
-- ------------------------------------------------------------
-- Jalankan di Supabase Dashboard > SQL Editor. Aman diulang.
-- Jalankan SEBELUM add_input_limits.sql — constraint news_len_check di file
-- itu menyebut kolom-kolom ini, jadi kolomnya harus sudah ada lebih dulu.
--
-- Situs punya dua bahasa (ID/EN). Kolom utama (title, summary, content,
-- cta_text, cta_button) tetap berbahasa Indonesia; kolom *_en di sini
-- menampung terjemahannya. Semuanya boleh null — kosong berarti pengunjung
-- berbahasa Inggris melihat versi Indonesianya (fallback), jadi admin tidak
-- wajib menerjemahkan setiap berita.
--
-- Slug, kategori, thumbnail, status, dan tanggal terbit sengaja tidak
-- digandakan: satu berita tetap satu URL, dan kategorinya diterjemahkan di
-- frontend lewat peta tetap (t.news.categoryNames di src/i18n).
-- ============================================================

alter table public.news
  add column if not exists title_en text;
alter table public.news
  add column if not exists summary_en text;
alter table public.news
  add column if not exists content_en text;
alter table public.news
  add column if not exists cta_text_en text;
alter table public.news
  add column if not exists cta_button_en text;

comment on column public.news.title_en is
  'Judul versi Inggris. Null/kosong = pengunjung EN melihat judul Indonesia.';
comment on column public.news.summary_en is
  'Ringkasan versi Inggris untuk kartu preview. Null = fallback ke versi Indonesia.';
comment on column public.news.content_en is
  'Isi berita versi Inggris (Markdown). Null = fallback ke versi Indonesia.';
comment on column public.news.cta_text_en is
  'Kalimat ajakan penutup versi Inggris. Null = fallback ke versi Indonesia.';
comment on column public.news.cta_button_en is
  'Label tombol WhatsApp versi Inggris. Null = label bawaan bahasa aktif.';
