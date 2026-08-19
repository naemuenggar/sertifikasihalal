-- ============================================================
-- Label tombol CTA per berita
-- ------------------------------------------------------------
-- Jalankan di Supabase Dashboard > SQL Editor. Aman diulang.
-- Jalankan SEBELUM add_input_limits.sql — constraint di file itu menyebut
-- kolom ini, jadi kolomnya harus sudah ada lebih dulu.
--
-- Kenapa dipisah dari cta_text: kolom `cta_text` dipakai untuk kalimat ajakan
-- penutup artikel (satu sampai tiga kalimat), sementara kolom ini hanya untuk
-- teks tombolnya. Sebelum ada pemisahan ini, satu kolom dipakai untuk dua hal
-- sekaligus — dan begitu admin menulis satu paragraf di sana, tombolnya
-- membengkak jadi pil sepanjang beberapa baris di halaman publik.
--
-- Kolom ini boleh null. Kosong berarti tombolnya memakai label bawaan
-- (WA_CTA_LABEL di src/utils/contact.ts), supaya admin cukup menulis
-- ajakannya saja dan tidak wajib mengisi dua kolom untuk satu CTA.
-- ============================================================

alter table public.news
  add column if not exists cta_button text;

comment on column public.news.cta_button is
  'Label tombol WhatsApp di akhir artikel. Null = pakai label bawaan frontend.';
