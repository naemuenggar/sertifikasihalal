-- FAQ chatbot publik dan log pertanyaan yang belum terjawab.
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  keywords text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_logs (
  id uuid primary key default gen_random_uuid(),
  user_question text not null,
  matched_faq_id uuid references public.faqs(id) on delete set null,
  similarity_score float8,
  is_answered boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists faqs_active_idx on public.faqs (is_active);
create unique index if not exists faqs_question_unique_idx on public.faqs (question);
create index if not exists chatbot_logs_unanswered_idx on public.chatbot_logs (is_answered, created_at desc);

-- Self-contained supaya migration tetap dapat dijalankan jika schema utama
-- belum pernah membuat function ini.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at before update on public.faqs
for each row execute function public.set_updated_at();

alter table public.faqs enable row level security;
alter table public.chatbot_logs enable row level security;

-- RLS policy menentukan baris yang boleh diakses, sedangkan GRANT menentukan
-- apakah role client boleh menjalankan operasi tabelnya sama sekali.
grant usage on schema public to anon, authenticated;
grant select on public.faqs to anon, authenticated;
grant insert on public.chatbot_logs to anon, authenticated;

drop policy if exists "Public can read active FAQs" on public.faqs;
create policy "Public can read active FAQs" on public.faqs
for select to anon, authenticated using (is_active = true);

drop policy if exists "Public can insert chatbot logs" on public.chatbot_logs;
create policy "Public can insert chatbot logs" on public.chatbot_logs
for insert to anon, authenticated with check (true);

insert into public.faqs (question, answer, category, keywords)
values
('Apa itu sertifikasi halal?', 'Sertifikasi halal adalah pengakuan kehalalan suatu produk melalui pemeriksaan bahan, proses produksi, dan dokumen oleh lembaga yang berwenang.', 'umum', 'sertifikat halal, pengertian halal'),
('Apa itu BPJPH?', 'BPJPH (Badan Penyelenggara Jaminan Produk Halal) adalah badan pemerintah yang menyelenggarakan jaminan produk halal di Indonesia.', 'umum', 'badan halal, pemerintah'),
('Apa syarat dokumen sertifikasi halal?', 'Umumnya diperlukan NIB, data usaha, daftar produk, daftar bahan dan pemasok, proses produksi, serta dokumen pendukung bahan bila tersedia. Tim kami membantu memeriksa kelengkapannya.', 'dokumen', 'persyaratan, berkas, syarat'),
('Berapa biaya sertifikasi halal?', 'Biaya bergantung pada skema, jumlah produk, kompleksitas bahan, dan kebutuhan pendampingan. Hubungi tim Urushalal untuk estimasi sesuai kondisi usaha Anda.', 'biaya', 'harga, tarif, ongkos'),
('Berapa lama proses sertifikasi halal?', 'Waktu proses bergantung pada kelengkapan dokumen dan skema yang dipilih. Setelah data lengkap, tim Urushalal akan memberikan estimasi yang lebih akurat.', 'proses', 'durasi, waktu, berapa lama'),
('Apa perbedaan self declare dan reguler?', 'Self declare ditujukan untuk usaha yang memenuhi kriteria tertentu dengan proses pernyataan mandiri dan pendampingan. Skema reguler melibatkan pemeriksaan/audit oleh LPH dan cocok untuk produk dengan risiko atau kompleksitas lebih tinggi.', 'proses', 'self-declare, reguler, audit'),
('Bagaimana cara daftar sertifikasi halal di Urushalal?', 'Kirim data usaha melalui formulir kontak atau WhatsApp Urushalal. Tim akan melakukan konsultasi awal, memeriksa dokumen, lalu mendampingi proses pengajuan.', 'proses', 'registrasi, pendaftaran, daftar'),
('Apakah UMKM wajib memiliki sertifikat halal?', 'Kewajiban halal berlaku bertahap sesuai jenis produk dan ketentuan pemerintah. UMKM sebaiknya menyiapkan sertifikasi sejak awal agar dapat memenuhi tenggat yang berlaku.', 'umum', 'usaha kecil, kewajiban'),
('Produk apa saja yang harus bersertifikat halal?', 'Makanan, minuman, obat, kosmetik, produk kimia, produk biologi, produk rekayasa genetik, serta barang gunaan tertentu termasuk dalam cakupan jaminan produk halal sesuai aturan yang berlaku.', 'umum', 'jenis produk, wajib halal'),
('Apakah bahan baku harus memiliki sertifikat halal?', 'Bahan yang digunakan perlu ditelusuri status kehalalannya. Sertifikat halal, spesifikasi, atau dokumen pendukung lain dapat diminta sesuai jenis bahan dan risikonya.', 'dokumen', 'bahan, bahan baku, pemasok'),
('Apakah sertifikat halal berlaku selamanya?', 'Sertifikat halal berlaku selama tidak ada perubahan komposisi atau proses produk dan kewajiban pelaku usaha tetap dipenuhi. Perubahan penting perlu dilaporkan sesuai prosedur.', 'umum', 'masa berlaku, kadaluarsa'),
('Apakah Urushalal membantu menyiapkan dokumen?', 'Ya. Urushalal mendampingi pemetaan bahan, penyusunan dokumen, pengajuan, dan koordinasi proses sesuai kebutuhan usaha.', 'proses', 'pendampingan, bantuan berkas'),
('Bagaimana jika ada bahan impor?', 'Bahan impor perlu dilengkapi informasi pemasok dan dokumen kehalalan yang dapat diverifikasi. Tim akan membantu mengecek kesesuaian dokumennya.', 'dokumen', 'import, luar negeri'),
('Apakah restoran dan katering bisa mengajukan sertifikasi halal?', 'Bisa. Pengajuan mencakup menu, bahan, fasilitas, penyimpanan, dan proses pengolahan yang digunakan oleh restoran atau usaha katering.', 'proses', 'restoran, katering, kuliner'),
('Bagaimana cara mengecek status pengajuan?', 'Status dapat ditelusuri melalui kanal resmi pengajuan atau dengan menghubungi tim Urushalal menggunakan data pendaftaran Anda.', 'proses', 'tracking, cek status'),
('Apakah bisa konsultasi sebelum mendaftar?', 'Bisa. Konsultasi awal membantu menentukan skema, memperkirakan dokumen, dan memilih langkah yang sesuai dengan kondisi usaha Anda.', 'umum', 'tanya, konsultasi'),
('Apa yang dimaksud SJPH?', 'SJPH adalah Sistem Jaminan Produk Halal, yaitu rangkaian kebijakan, prosedur, dan pengendalian yang menjaga konsistensi kehalalan produk.', 'dokumen', 'sistem jaminan produk halal'),
('Apakah sertifikasi halal juga diperlukan untuk kemasan?', 'Kemasan dan bahan yang bersentuhan dengan produk perlu diperhatikan status bahan serta prosesnya. Tim dapat membantu menilai kebutuhan dokumen pendukung.', 'dokumen', 'packaging, kemasan')
on conflict (question) do nothing;
