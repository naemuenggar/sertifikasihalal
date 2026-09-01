-- Perluasan knowledge base. Migration ini aman dijalankan setelah migration FAQ utama.
create table if not exists public.faq_question_variants (
  id uuid primary key default gen_random_uuid(),
  faq_id uuid not null references public.faqs(id) on delete cascade,
  variant_text text not null,
  created_at timestamptz not null default now()
);

create index if not exists faq_question_variants_faq_id_idx on public.faq_question_variants (faq_id);
create unique index if not exists faq_question_variants_unique_idx on public.faq_question_variants (faq_id, variant_text);
alter table public.faq_question_variants enable row level security;
grant select on public.faq_question_variants to anon, authenticated;

drop policy if exists "Public can read variants of active FAQs" on public.faq_question_variants;
create policy "Public can read variants of active FAQs" on public.faq_question_variants
for select to anon, authenticated using (
  exists (select 1 from public.faqs where faqs.id = faq_question_variants.faq_id and faqs.is_active = true)
);

insert into public.faqs (question, answer, category, keywords)
values
('Bagaimana alur pengajuan sertifikasi halal?', 'Alurnya meliputi konsultasi, pengumpulan data dan bahan, pemeriksaan dokumen, pengajuan, pemeriksaan sesuai skema, penetapan kehalalan, lalu penerbitan sertifikat.', 'proses', 'tahapan pengajuan langkah langkah'),
('Dokumen apa yang disiapkan saat pendaftaran?', 'Siapkan NIB, data pelaku usaha, daftar produk, daftar bahan, proses produksi, dan dokumen pendukung bahan.', 'dokumen', 'berkas awal persiapan registrasi'),
('Bagaimana cara upload dokumen di Urushalal?', 'Tim Urushalal akan memberikan kanal pengumpulan dokumen dan format berkas setelah konsultasi awal. Pastikan file terbaca dan nama file jelas.', 'proses', 'unggah upload kirim file'),
('Berapa lama pemeriksaan dokumen?', 'Pemeriksaan awal biasanya bergantung pada jumlah produk dan kelengkapan data. Tim akan menyampaikan catatan perbaikan jika ada dokumen yang kurang.', 'proses', 'review verifikasi cek berkas'),
('Apa syarat sertifikasi halal untuk makanan?', 'Data resep, bahan, pemasok, fasilitas produksi, proses pengolahan, dan dokumen pendukung bahan perlu disiapkan.', 'proses', 'kuliner pangan makanan'),
('Apa syarat sertifikasi halal untuk minuman?', 'Siapkan komposisi, bahan penolong, pemasok, proses produksi, fasilitas, dan dokumen kehalalan bahan minuman.', 'proses', 'minuman beverage komposisi'),
('Apa syarat halal untuk produk kosmetik?', 'Kosmetik perlu ditelusuri bahan, formula, pemasok, proses, fasilitas, dan dokumen pendukung sesuai ketentuan yang berlaku.', 'proses', 'makeup skincare kecantikan'),
('Bagaimana sertifikasi produk makanan kemasan?', 'Pengajuan mencakup komposisi produk, bahan baku, proses produksi, fasilitas, label, serta dokumen usaha dan pendukung lainnya.', 'proses', 'snack frozen food kemasan'),
('Apakah rumah makan perlu sertifikat halal?', 'Rumah makan dapat mengajukan sertifikasi dengan menyiapkan daftar menu, bahan, dapur, penyimpanan, dan alur pengolahan.', 'proses', 'resto warung restoran'),
('Apa syarat halal rumah potong hewan?', 'Rumah potong hewan perlu memenuhi persyaratan fasilitas, proses penyembelihan, juru sembelih, sanitasi, dan penelusuran hewan.', 'proses', 'RPH jagal sembelih'),
('Apakah jamu dan obat tradisional perlu sertifikasi halal?', 'Jamu dan obat tradisional dapat memerlukan sertifikasi halal. Data formula, bahan, pemasok, proses, dan izin terkait perlu diperiksa.', 'proses', 'herbal obat tradisional'),
('Siapa yang boleh menggunakan skema self declare?', 'Self declare hanya untuk pelaku usaha yang memenuhi kriteria dan persyaratan skema sesuai ketentuan pemerintah, termasuk aspek produk dan prosesnya.', 'proses', 'pernyataan mandiri UMK'),
('Apa kriteria UMK untuk self declare?', 'Kriteria UMK dan kelayakan self declare mengikuti ketentuan terbaru pemerintah, termasuk batas usaha, produk, bahan, dan proses yang sederhana.', 'proses', 'usaha mikro kecil kriteria'),
('Apa perbedaan UMK dan UMB?', 'UMK adalah usaha mikro dan kecil, sedangkan UMB adalah usaha menengah dan besar. Skala usaha dapat memengaruhi skema dan proses pengajuan.', 'umum', 'mikro kecil menengah besar'),
('Berapa kisaran biaya self declare?', 'Biaya resmi dan biaya pendampingan bergantung pada program serta kondisi usaha. Tim Urushalal akan memberikan rincian sebelum pengajuan.', 'biaya', 'murah gratis program'),
('Berapa kisaran biaya skema reguler?', 'Biaya skema reguler dipengaruhi jumlah produk, bahan, fasilitas, audit, dan pendampingan. Minta penawaran berdasarkan data usaha Anda.', 'biaya', 'audit tarif reguler'),
('Apa saja yang termasuk jasa pendampingan?', 'Pendampingan dapat mencakup konsultasi, pemetaan bahan, pemeriksaan dokumen, persiapan pengajuan, dan koordinasi proses.', 'biaya', 'paket layanan bantuan'),
('Bagaimana metode pembayaran Urushalal?', 'Metode pembayaran dan jadwalnya disampaikan dalam penawaran resmi. Pastikan pembayaran hanya dilakukan melalui rekening atau kanal resmi Urushalal.', 'biaya', 'transfer cicilan bayar'),
('Apa itu LPH?', 'LPH atau Lembaga Pemeriksa Halal adalah lembaga yang melakukan pemeriksaan dan/atau pengujian kehalalan sesuai kewenangannya.', 'umum', 'lembaga audit pemeriksa'),
('Apa itu MUI dalam proses halal?', 'MUI merupakan salah satu lembaga yang berperan dalam proses penetapan kehalalan sesuai mekanisme yang berlaku.', 'umum', 'majelis ulama'),
('Apa itu Komisi Fatwa?', 'Komisi Fatwa adalah perangkat yang membahas dan menetapkan fatwa sesuai kewenangan dan prosedur lembaga terkait.', 'umum', 'fatwa penetapan halal'),
('Apa beda sertifikat halal dan label halal?', 'Sertifikat halal adalah dokumen pengakuan kehalalan produk, sedangkan label halal adalah tanda yang dicantumkan pada produk sesuai aturan.', 'umum', 'logo tanda kemasan'),
('Bagaimana alur izin edar BPOM?', 'Alur umumnya meliputi penyiapan legalitas dan data produk, pendaftaran pada sistem BPOM, evaluasi, perbaikan bila diminta, lalu penerbitan izin.', 'bpom', 'registrasi nomor edar'),
('Dokumen apa untuk izin edar BPOM?', 'Dokumen dapat mencakup legalitas usaha, komposisi, spesifikasi, proses produksi, label, hasil uji, dan dokumen fasilitas sesuai kategori produk.', 'bpom', 'berkas registrasi pangan'),
('Kapan izin edar BPOM dibutuhkan?', 'Izin edar BPOM dibutuhkan untuk kategori produk yang wajib terdaftar sesuai ketentuan BPOM. Kebutuhannya berbeda berdasarkan jenis dan risiko produk.', 'bpom', 'wajib nomor BPOM'),
('Apakah sertifikat halal menggantikan izin BPOM?', 'Tidak. Sertifikat halal dan izin edar BPOM adalah perizinan berbeda dengan tujuan dan persyaratan masing-masing.', 'bpom', 'beda perizinan legalitas'),
('Berapa masa berlaku sertifikat halal?', 'Masa berlaku mengikuti ketentuan yang tercantum pada sertifikat dan aturan terbaru. Pelaku usaha wajib menjaga konsistensi bahan serta proses.', 'proses', 'expired kadaluarsa aktif'),
('Bagaimana cara memperpanjang sertifikat halal?', 'Ajukan perpanjangan sebelum masa berlaku berakhir, siapkan data terbaru, dan pastikan tidak ada perubahan bahan atau proses yang belum dilaporkan.', 'proses', 'renewal perbarui perpanjangan'),
('Apa akibat terlambat memperpanjang sertifikat?', 'Produk dapat kehilangan status aktif atau mengalami kendala pencantuman label. Segera konsultasikan perpanjangan sebelum masa berlaku habis.', 'proses', 'telat habis masa berlaku'),
('Bolehkah logo halal dipasang di kemasan?', 'Logo halal hanya boleh dicantumkan pada produk yang telah memiliki status halal sesuai ketentuan dan mengikuti aturan desain serta pencantumannya.', 'proses', 'simbol cetak packaging'),
('Di mana posisi label halal pada kemasan?', 'Posisi dan ukuran label harus mengikuti ketentuan pencantuman yang berlaku serta tidak menyesatkan atau tertutup informasi lain.', 'proses', 'letak stiker desain'),
('Apa sanksi penyalahgunaan logo halal?', 'Penyalahgunaan label atau klaim halal dapat menimbulkan sanksi administratif dan/atau konsekuensi hukum sesuai peraturan yang berlaku.', 'umum', 'pelanggaran hukuman denda'),
('Kenapa menggunakan jasa pendampingan Urushalal?', 'Pendampingan membantu mengurangi kesalahan dokumen, mempercepat persiapan, dan membuat proses lebih terarah sesuai kondisi usaha.', 'urushalal', 'manfaat konsultan bantuan'),
('Apa bedanya Urushalal dengan daftar mandiri?', 'Urushalal membantu memetakan kebutuhan dan mendampingi proses, sedangkan daftar mandiri mengharuskan pelaku usaha menyiapkan serta mengurus seluruh tahap sendiri.', 'urushalal', 'mandiri konsultan perbedaan'),
('Apakah Urushalal melayani perusahaan besar?', 'Ya. Urushalal dapat membantu UMKM maupun korporasi dengan pendekatan dan ruang lingkup pendampingan yang disesuaikan.', 'urushalal', 'korporasi perusahaan enterprise'),
('Bagaimana cara menghubungi tim Urushalal?', 'Gunakan formulir kontak atau tombol WhatsApp di situs Urushalal agar tim dapat merespons kebutuhan usaha Anda.', 'urushalal', 'kontak whatsapp customer service'),
('Kapan jam operasional Urushalal?', 'Jam respons tim dapat berbeda pada hari kerja dan hari libur. Kirim pesan melalui kanal resmi, lalu tim akan merespons pada jam layanan.', 'urushalal', 'buka layanan hari kerja'),
('Apakah konsultasi Urushalal berbayar?', 'Ketersediaan dan biaya konsultasi bergantung pada jenis kebutuhan. Tim akan menjelaskan ruang lingkup dan biaya sebelum layanan dimulai.', 'urushalal', 'konsultasi gratis harga'),
('Apakah Urushalal menjamin sertifikat pasti terbit?', 'Urushalal mendampingi persiapan dan proses, tetapi keputusan penerbitan tetap mengikuti pemeriksaan serta kewenangan lembaga terkait.', 'urushalal', 'jaminan hasil keputusan'),
('Apakah perubahan resep harus dilaporkan?', 'Ya. Perubahan bahan, formula, pemasok, fasilitas, atau proses perlu ditinjau agar status halal tetap konsisten.', 'proses', 'ganti komposisi update bahan'),
('Bagaimana menjaga kehalalan setelah sertifikasi?', 'Terapkan SJPH, gunakan bahan yang disetujui, simpan bukti pembelian, jaga fasilitas, dan catat setiap perubahan proses.', 'proses', 'pemeliharaan kontrol konsisten'),
('Apakah satu sertifikat berlaku untuk semua produk?', 'Cakupan sertifikat mengikuti produk dan data yang diajukan. Produk baru atau perubahan signifikan perlu dikonsultasikan terlebih dahulu.', 'umum', 'cakupan produk baru')
on conflict (question) do nothing;

-- Tiga variasi per FAQ: bentuk tanya santai membantu corpus memahami gaya pengguna.
insert into public.faq_question_variants (faq_id, variant_text)
select id, question || ' ya?'
from public.faqs
where is_active = true
on conflict do nothing;

insert into public.faq_question_variants (faq_id, variant_text)
select id, question || ' dong'
from public.faqs
where is_active = true
on conflict do nothing;

insert into public.faq_question_variants (faq_id, variant_text)
select id, case when question like 'Apa%' then replace(question, 'Apa', 'Gimana') else question || ' nih?' end
from public.faqs
where is_active = true
on conflict do nothing;
