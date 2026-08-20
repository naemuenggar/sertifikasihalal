/** Nomor WhatsApp resmi. Satu sumber untuk seluruh halaman — jangan tulis
 *  ulang nomornya di komponen mana pun, impor dari sini. */
export const WA_NUMBER = "6281586005256";
export const WA_DISPLAY = "0815 8600 5256";
export const WA_LINK = `https://wa.me/${WA_NUMBER}`;

/** Link WhatsApp dengan pesan awal terisi. Dipakai kalau CTA-nya perlu bawa
 *  konteks — misal paket mana yang diklik — supaya chat tidak mulai kosong. */
export const waLinkWith = (message: string) =>
  `${WA_LINK}?text=${encodeURIComponent(message)}`;

/** Label tombol WhatsApp di akhir artikel berita (versi Indonesia). Sengaja
 *  tidak ikut disimpan per berita: kolom `news.cta_text` diisi kalimat
 *  ajakannya, dan tombolnya cukup satu kalimat aksi yang sama di semua
 *  artikel. Dipakai form admin sebagai placeholder/petunjuk — versi publiknya
 *  mengikuti bahasa aktif lewat i18n (t.news.detail.ctaLabel). */
export const WA_CTA_LABEL = "Konsultasi gratis via WhatsApp";
