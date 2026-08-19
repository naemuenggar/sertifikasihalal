-- ============================================================
-- Pemeriksaan sebelum menjalankan add_input_limits.sql
-- ------------------------------------------------------------
-- Jalankan di Supabase Dashboard > SQL Editor. Hanya membaca, tidak mengubah
-- apa pun, aman diulang.
--
-- Kenapa perlu: `alter table ... add constraint ... check (...)` di Postgres
-- memvalidasi SELURUH baris yang sudah ada. Kalau satu baris saja melanggar,
-- seluruh perintahnya dibatalkan dengan pesan yang tidak menyebut baris mana
-- penyebabnya. Query di bawah menghitung barisnya lebih dulu.
--
-- Sengaja ditulis sebagai SATU query: SQL Editor Supabase hanya menampilkan
-- hasil perintah terakhir, jadi dua SELECT terpisah akan menyembunyikan hasil
-- yang pertama.
--
-- HASIL YANG DIHARAPKAN: dua baris, kolom baris_bermasalah keduanya 0.
-- Kalau ada yang bukan 0, jalankan query rinciannya di bagian bawah file ini
-- untuk melihat baris mana penyebabnya — jangan lanjut ke langkah berikutnya.
-- ============================================================

select 'news' as tabel, count(*) as baris_bermasalah
from public.news
where char_length(title) not between 1 and 160
   or char_length(slug) not between 1 and 160
   or char_length(coalesce(category, '')) > 40
   or char_length(coalesce(summary, '')) > 400
   or char_length(coalesce(content, '')) > 50000
   or char_length(coalesce(cta_text, '')) > 400
   or char_length(coalesce(thumbnail_url, '')) > 500
   or slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
   or (thumbnail_url is not null and thumbnail_url !~* '^https?://')

union all

select 'contact_messages', count(*)
from public.contact_messages
where char_length(name) not between 1 and 100
   or char_length(contact) not between 1 and 120
   or char_length(message) not between 1 and 2000
   or char_length(coalesce(catatan, '')) > 1000;


-- ============================================================
-- RINCIAN — jalankan salah satu HANYA kalau hitungan di atas bukan 0.
-- Caranya: blok (sorot) query yang diinginkan dengan mouse, lalu Run. SQL
-- Editor menjalankan bagian yang disorot saja.
-- ============================================================

-- ---------- rincian news ----------
-- select
--   id,
--   slug,
--   char_length(title)                       as len_judul,       -- maks 160
--   char_length(slug)                        as len_slug,        -- maks 160
--   char_length(coalesce(category, ''))      as len_kategori,    -- maks 40
--   char_length(coalesce(summary, ''))       as len_ringkasan,   -- maks 400
--   char_length(coalesce(content, ''))       as len_isi,         -- maks 50000
--   char_length(coalesce(cta_text, ''))      as len_ajakan,      -- maks 400
--   char_length(coalesce(thumbnail_url, '')) as len_url_gambar,  -- maks 500
--   (slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$')     as slug_bentuk_salah,
--   (thumbnail_url is not null and thumbnail_url !~* '^https?://') as url_gambar_salah
-- from public.news
-- where char_length(title) not between 1 and 160
--    or char_length(slug) not between 1 and 160
--    or char_length(coalesce(category, '')) > 40
--    or char_length(coalesce(summary, '')) > 400
--    or char_length(coalesce(content, '')) > 50000
--    or char_length(coalesce(cta_text, '')) > 400
--    or char_length(coalesce(thumbnail_url, '')) > 500
--    or slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
--    or (thumbnail_url is not null and thumbnail_url !~* '^https?://');

-- ---------- rincian contact_messages ----------
-- select
--   id,
--   created_at,
--   char_length(name)                  as len_nama,    -- 1..100
--   char_length(contact)               as len_kontak,  -- 1..120
--   char_length(message)               as len_pesan,   -- 1..2000
--   char_length(coalesce(catatan, '')) as len_catatan  -- maks 1000
-- from public.contact_messages
-- where char_length(name) not between 1 and 100
--    or char_length(contact) not between 1 and 120
--    or char_length(message) not between 1 and 2000
--    or char_length(coalesce(catatan, '')) > 1000;
