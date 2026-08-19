import WaLink from "./WaLink";
import { WhatsApp } from "./icons";
import { WA_CTA_LABEL } from "../utils/contact";

/**
 * Ajakan penutup di akhir artikel berita: kalimat ajakan yang ditulis admin,
 * lalu satu tombol WhatsApp di bawahnya.
 *
 * Kenapa dipisah begini: sebelumnya isi `news.cta_text` langsung dipakai jadi
 * label tombol, jadi begitu admin menulis satu paragraf — dan itu yang wajar
 * ditulis orang di kolom bernama "CTA" — tombolnya membengkak jadi pil
 * sepanjang lima baris. Paragrafnya sekarang punya tempatnya sendiri, dan
 * label tombolnya tidak lagi bisa ikut berubah.
 *
 * Label tombolnya boleh diatur per berita lewat `news.cta_button`, tapi tidak
 * wajib: dikosongkan berarti memakai WA_CTA_LABEL, supaya admin cukup menulis
 * ajakannya saja dan CTA-nya tetap tampil utuh.
 *
 * Komponen yang sama dipakai halaman publik dan pratinjau di form admin,
 * supaya yang dilihat admin sebelum menyimpan memang yang akan terbit.
 */

type Props = {
  /** Kalimat ajakan dari `news.cta_text`. Kosong berarti CTA tidak tampil. */
  text: string | null;
  /** Label tombol dari `news.cta_button`. Kosong berarti pakai WA_CTA_LABEL. */
  buttonLabel?: string | null;
  /** Judul artikel, untuk pesan awal chat. Kosongkan di pratinjau. */
  articleTitle?: string;
};

export default function ArticleCta({ text, buttonLabel, articleTitle }: Props) {
  const message = articleTitle?.trim()
    ? `Halo, saya membaca artikel "${articleTitle}" dan ingin konsultasi.`
    : "Halo, saya ingin konsultasi soal sertifikasi halal.";

  if (!text?.trim()) return null;

  const label = buttonLabel?.trim() || WA_CTA_LABEL;

  return (
    <aside className="article-cta">
      <p className="article-cta__text">{text.trim()}</p>
      <WaLink className="btn article-cta__btn" message={message}>
        <WhatsApp size={20} />
        {label}
      </WaLink>
    </aside>
  );
}
