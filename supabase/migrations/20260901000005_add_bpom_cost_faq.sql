-- Menutup gap data yang ditemukan saat evaluasi chatbot:
-- 1. Belum ada FAQ biaya BPOM ("berapa harga bpom" salah match ke FAQ lain).
-- 2. Belum ada FAQ ambang batas/kontaminasi bahan ("ada bahan haram 0,01% gimana").
insert into public.faqs (question, answer, category, keywords)
values
('Berapa biaya pengurusan izin edar BPOM?', 'Biaya pengurusan izin edar BPOM bergantung pada kategori produk, jumlah produk, dan kebutuhan pengujian. Hubungi tim Urushalal untuk estimasi sesuai produk Anda.', 'bpom', 'harga tarif biaya bpom ongkos'),
('Bagaimana jika ada kandungan bahan haram dalam jumlah sangat kecil?', 'Keberadaan bahan haram atau najis, termasuk dalam jumlah sangat kecil, perlu ditinjau statusnya sesuai ketentuan kehalalan dan hasil fatwa yang berlaku. Konsultasikan komposisi produk Anda dengan tim Urushalal untuk penilaian lebih lanjut.', 'dokumen', 'ambang batas kontaminasi persen kandungan najis')
on conflict (question) do nothing;
