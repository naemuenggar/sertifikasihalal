/**
 * Deteksi kategori dari pola kata di pertanyaan user.
 * Dipakai sebagai SOFT BOOST di tfidf.ts — bukan hard filter.
 * Kategori mengikuti nilai distinct kolom `faqs.category` di database:
 * umum, dokumen, biaya, proses, bpom, urushalal.
 */
export const categoryPatterns: { pattern: RegExp; categories: string[] }[] = [
  { pattern: /berapa\s*(lama|hari|minggu|bulan)|kapan\s*(jadi|keluar|terbit)|estimasi|durasi|lama\s*(proses|pengurusan)|prosesnya/i, categories: ["proses"] },
  { pattern: /apa\s*itu|pengertian|definisi|maksud|artinya/i, categories: ["umum"] },
  { pattern: /berapa\s*(biaya|harga)|biaya|harga|ongkos|tarif|bayar|charge|duit/i, categories: ["biaya"] },
  { pattern: /syarat|dokumen|persyaratan|berkas|file/i, categories: ["dokumen"] },
  { pattern: /bpom|izin\s*edar|nomor\s*edar|registrasi\s*bpom/i, categories: ["bpom"] },
  { pattern: /urushalal|pendampingan|konsultasi|kontak|jam\s*(operasional|kerja)/i, categories: ["urushalal"] },
  { pattern: /daftar|pendaftaran|registrasi|cara\s*(meng)?ajukan|alur|langkah|tahapan/i, categories: ["proses"] },
  { pattern: /berlaku|perpanjang|perpanjangan|kadaluarsa|expired|masa\s*aktif/i, categories: ["proses"] },
  { pattern: /logo|label|kemasan|packaging|stiker/i, categories: ["dokumen", "proses"] },
];

/** Kembalikan kategori yang cocok dengan pola pertanyaan (bisa >1, bisa kosong). */
export function detectCategoryHint(question: string): string[] {
  const found = new Set<string>();
  for (const { pattern, categories } of categoryPatterns) {
    if (pattern.test(question)) categories.forEach((c) => found.add(c));
  }
  return [...found];
}
