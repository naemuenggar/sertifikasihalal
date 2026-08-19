-- Jalankan sekali di Supabase SQL Editor untuk project yang sudah ada.
-- Menambah kolom CTA (teks tombol WhatsApp) pada tabel news.
alter table public.news
  add column if not exists cta_text text;
