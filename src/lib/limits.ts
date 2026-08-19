/**
 * Batas panjang setiap kolom teks — satu sumber untuk atribut `maxLength` di
 * form, validasi sebelum kirim, dan constraint CHECK di database
 * (`supabase/add_input_limits.sql`). Ketiganya harus menyebut angka yang sama.
 *
 * Kenapa dibatasi sama sekali: form kontak terbuka untuk anonim (lihat policy
 * `contact_public_insert` di schema.sql). Tanpa batas panjang, satu skrip bisa
 * menjejalkan megabyte teks per kirim sampai kuota database habis. Batas di
 * browser gampang dilewati — yang benar-benar menahan adalah CHECK di SQL —
 * tapi keduanya tetap dipasang supaya pengguna jujur dapat pesan yang jelas.
 */
export const LIMITS = {
  newsTitle: 160,
  newsSlug: 160,
  newsCategory: 40,
  newsSummary: 400,
  newsContent: 50_000,
  /* Ajakan penutup artikel — satu sampai tiga kalimat, bukan label tombol.
     Label tombolnya sendiri tidak disimpan di database: dipakai tetap dari
     WA_CTA_LABEL supaya admin cukup menulis ajakannya saja. */
  newsCta: 400,
  /* Label tombolnya. Opsional — kosong berarti memakai WA_CTA_LABEL. Batas
     ini yang menjaga tombol tetap berupa tombol. */
  newsCtaButton: 40,
  newsThumbnailUrl: 500,
  contactName: 100,
  contactContact: 120,
  contactMessage: 2_000,
  contactNote: 1_000,
} as const;

/**
 * Rapikan teks dari form: buang spasi di ujung, satukan spasi/baris kosong
 * berlebih, dan buang karakter kontrol yang tak terlihat (kecuali newline dan
 * tab). Karakter kontrol biasanya bukan hasil ketikan manusia — datangnya dari
 * paste atau skrip, dan bisa dipakai menyamarkan isi teks di tabel admin.
 */
export function cleanText(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

/** true kalau teks kosong setelah dirapikan atau melewati batas panjang. */
export function isOverLimit(input: string, max: number): boolean {
  return input.length > max;
}
