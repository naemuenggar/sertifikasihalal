-- ============================================================
-- Urushalal — Supabase schema
-- ------------------------------------------------------------
-- Cara pakai:
--   1. Buka Supabase Dashboard > SQL Editor > New query.
--   2. Tempel seluruh isi file ini, lalu Run.
--   3. Buat akun admin (lihat bagian PALING BAWAH file ini).
--   4. Salin `.env.example` menjadi `.env.local` dan isi
--      VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
--      (Dashboard > Project Settings > API).
-- ============================================================


-- ============================================================
-- Tabel: news  (konten Berita yang dikelola admin)
-- ============================================================
create table if not exists public.news (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  category      text,
  thumbnail_url text,
  summary       text,
  content       text,                 -- isi berita (Markdown)
  status        text not null default 'draft'
                check (status in ('draft', 'published')),
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists news_status_published_at_idx
  on public.news (status, published_at desc);

-- Kolom updated_at terisi otomatis setiap baris diubah.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();


-- ============================================================
-- Tabel: contact_messages  (pesan dari form "More Info")
-- ============================================================
create table if not exists public.contact_messages (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  contact        text not null,           -- No. HP atau Email pengirim
  message        text not null,
  status         text not null default 'belum_ditindaklanjuti'
                 check (status in ('belum_ditindaklanjuti', 'sudah_ditindaklanjuti')),
  catatan        text,
  followed_up_at timestamptz,
  created_at     timestamptz not null default now()
);

-- Aman saat schema dijalankan ke project yang tabelnya sudah ada.
alter table public.contact_messages
  add column if not exists status text not null default 'belum_ditindaklanjuti',
  add column if not exists catatan text,
  add column if not exists followed_up_at timestamptz;

alter table public.contact_messages
  drop constraint if exists contact_messages_status_check;
alter table public.contact_messages
  add constraint contact_messages_status_check
  check (status in ('belum_ditindaklanjuti', 'sudah_ditindaklanjuti'));

create or replace function public.set_contact_followed_up_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'sudah_ditindaklanjuti' and old.status is distinct from new.status then
    new.followed_up_at = now();
  elsif new.status = 'belum_ditindaklanjuti' then
    new.followed_up_at = null;
  end if;
  return new;
end $$;

drop trigger if exists contact_set_followed_up_at on public.contact_messages;
create trigger contact_set_followed_up_at
  before update of status on public.contact_messages
  for each row execute function public.set_contact_followed_up_at();


-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.news enable row level security;
alter table public.contact_messages enable row level security;

-- NEWS: pengunjung publik hanya boleh membaca yang sudah published.
drop policy if exists news_public_read_published on public.news;
create policy news_public_read_published
  on public.news for select
  using (status = 'published');

-- NEWS: user yang sudah login (admin) bebas CRUD.
drop policy if exists news_admin_all on public.news;
create policy news_admin_all
  on public.news for all
  to authenticated
  using (true)
  with check (true);

-- CONTACT: publik boleh mengirim pesan (insert), tapi tidak bisa membaca.
drop policy if exists contact_public_insert on public.contact_messages;
create policy contact_public_insert
  on public.contact_messages for insert
  with check (true);

-- CONTACT: hanya admin yang boleh melihat, mengubah status, dan menghapus pesan.
drop policy if exists contact_admin_read on public.contact_messages;
create policy contact_admin_read
  on public.contact_messages for select
  to authenticated
  using (true);

drop policy if exists contact_admin_delete on public.contact_messages;
create policy contact_admin_delete
  on public.contact_messages for delete
  to authenticated
  using (true);

drop policy if exists contact_admin_update on public.contact_messages;
create policy contact_admin_update
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);


-- ============================================================
-- Hak akses tabel (GRANT) untuk role anon & authenticated
-- ------------------------------------------------------------
-- WAJIB ada. Tanpa ini Supabase menolak dengan error
-- "permission denied for table ..." walaupun RLS sudah benar.
--   - GRANT  : boleh/tidaknya role menyentuh tabel sama sekali.
--   - RLS    : baris mana yang boleh dilihat/diubah.
-- Dua lapisan ini harus benar dua-duanya.
-- (Aman dijalankan berulang — GRANT bersifat idempoten.)
-- ============================================================
grant usage on schema public to anon, authenticated;

-- NEWS: pengunjung publik (anon) hanya membaca; admin (authenticated) CRUD penuh.
grant select on public.news to anon;
grant select, insert, update, delete on public.news to authenticated;

-- CONTACT: form tetap bisa dipakai saat ada sesi admin aktif di browser.
revoke insert on public.contact_messages from anon, authenticated;
grant insert (name, contact, message) on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;


-- ============================================================
-- Storage: bucket publik untuk thumbnail berita
-- ============================================================
insert into storage.buckets (id, name, public)
values ('news-thumbnails', 'news-thumbnails', true)
on conflict (id) do nothing;

-- Gambar bisa dilihat siapa saja.
drop policy if exists thumbnails_public_read on storage.objects;
create policy thumbnails_public_read
  on storage.objects for select
  using (bucket_id = 'news-thumbnails');

-- Hanya admin yang boleh upload / ganti / hapus gambar.
drop policy if exists thumbnails_admin_insert on storage.objects;
create policy thumbnails_admin_insert
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news-thumbnails');

drop policy if exists thumbnails_admin_update on storage.objects;
create policy thumbnails_admin_update
  on storage.objects for update
  to authenticated
  using (bucket_id = 'news-thumbnails');

drop policy if exists thumbnails_admin_delete on storage.objects;
create policy thumbnails_admin_delete
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'news-thumbnails');


-- ============================================================
-- MEMBUAT AKUN ADMIN
-- ------------------------------------------------------------
-- Supabase Auth menyimpan password dengan hash bcrypt di server
-- (tidak pernah plaintext), dan punya rate-limit bawaan untuk
-- percobaan login (mencegah brute force).
--
-- Cara termudah membuat admin:
--   Dashboard > Authentication > Users > "Add user" >
--   isi Email + Password, centang "Auto Confirm User".
--
-- Login admin dilakukan lewat URL rahasia aplikasi (default
-- `/portal-admin`). Hanya email yang Anda daftarkan di sini
-- yang bisa masuk ke /admin/*.
-- ============================================================
