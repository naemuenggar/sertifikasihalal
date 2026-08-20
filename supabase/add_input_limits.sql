-- ============================================================
-- Batas panjang input + pengetatan bucket gambar
-- ------------------------------------------------------------
-- Jalankan di Supabase Dashboard > SQL Editor. Aman diulang.
--
-- Kenapa perlu, padahal form sudah punya maxLength: `maxLength` hanya berlaku
-- di browser kita. Tabel `contact_messages` bisa di-insert oleh siapa saja
-- (policy `contact_public_insert`) langsung lewat REST API Supabase dengan
-- anon key yang memang publik di bundle frontend. Satu-satunya batas yang
-- benar-benar mengikat ada di sini.
--
-- Angkanya harus sama dengan src/lib/limits.ts.
--
-- Jalankan add_news_cta_button.sql dan add_news_en.sql lebih dulu: constraint
-- news di bawah menyebut kolom cta_button dan kolom *_en. Dan jalankan
-- check_before_input_limits.sql sebelum keduanya — constraint check
-- memvalidasi baris yang sudah ada, jadi satu baris lama yang melanggar
-- akan membatalkan seluruh perintah.
-- ============================================================

-- ---------- contact_messages ----------
alter table public.contact_messages
  drop constraint if exists contact_messages_len_check;
alter table public.contact_messages
  add constraint contact_messages_len_check check (
    char_length(name)     between 1 and 100
    and char_length(contact) between 1 and 120
    and char_length(message) between 1 and 2000
    and (catatan is null or char_length(catatan) <= 1000)
  );

-- ---------- news ----------
alter table public.news
  drop constraint if exists news_len_check;
alter table public.news
  add constraint news_len_check check (
    char_length(title) between 1 and 160
    and char_length(slug) between 1 and 160
    and (category is null or char_length(category) <= 40)
    and (summary is null or char_length(summary) <= 400)
    and (content is null or char_length(content) <= 50000)
    and (cta_text is null or char_length(cta_text) <= 400)
    and (cta_button is null or char_length(cta_button) <= 40)
    and (thumbnail_url is null or char_length(thumbnail_url) <= 500)
    -- Versi Inggris — batasnya sama dengan pasangan Indonesianya.
    and (title_en is null or char_length(title_en) <= 160)
    and (summary_en is null or char_length(summary_en) <= 400)
    and (content_en is null or char_length(content_en) <= 50000)
    and (cta_text_en is null or char_length(cta_text_en) <= 400)
    and (cta_button_en is null or char_length(cta_button_en) <= 40)
  );

-- Slug ikut dijaga bentuknya: hanya huruf kecil, angka, dan tanda hubung.
-- Slug masuk ke URL publik; membatasinya di sini menutup baris aneh yang
-- lolos kalau suatu saat ada jalur tulis selain form admin.
alter table public.news
  drop constraint if exists news_slug_format_check;
alter table public.news
  add constraint news_slug_format_check check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

-- URL thumbnail wajib http/https — menutup `javascript:` dan `data:`
-- yang bisa berakhir di atribut src halaman publik.
alter table public.news
  drop constraint if exists news_thumbnail_url_check;
alter table public.news
  add constraint news_thumbnail_url_check
  check (thumbnail_url is null or thumbnail_url ~* '^https?://');

-- ---------- storage bucket ----------
-- Batas ukuran & tipe file ditegakkan Supabase Storage sendiri, jadi tetap
-- berlaku walau seseorang memanggil API-nya langsung. SVG sengaja tidak
-- diizinkan: bucket ini publik dan file SVG bisa memuat <script> yang jalan
-- saat URL-nya dibuka langsung di tab browser.
update storage.buckets
set
  file_size_limit = 5242880, -- 5 MB
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
where id = 'news-thumbnails';
