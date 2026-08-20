import WaLink from "./WaLink";
import { WhatsApp } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

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
 * wajib: dikosongkan berarti memakai label default bahasa aktif (i18n), supaya
 * admin cukup menulis ajakannya saja dan CTA-nya tetap tampil utuh.
 *
 * Komponen yang sama dipakai halaman publik dan pratinjau di form admin,
 * supaya yang dilihat admin sebelum menyimpan memang yang akan terbit.
 */

type Props = {
  /** Kalimat ajakan dari `news.cta_text`. Kosong berarti CTA tidak tampil. */
  text: string | null;
  /** Label tombol dari `news.cta_button`. Kosong berarti pakai label default. */
  buttonLabel?: string | null;
  /** Judul artikel, untuk pesan awal chat. Kosongkan di pratinjau. */
  articleTitle?: string;
};

export default function ArticleCta({ text, buttonLabel, articleTitle }: Props) {
  const { t } = useLanguage();
  const message = articleTitle?.trim()
    ? t.news.detail.waMessage(articleTitle)
    : t.news.detail.waMessageGeneric;

  if (!text?.trim()) return null;

  const label = buttonLabel?.trim() || t.news.detail.ctaLabel;

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
