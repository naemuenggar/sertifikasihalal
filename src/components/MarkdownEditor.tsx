import { useRef, useState, type KeyboardEvent } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Underline,
  Undo2,
} from "lucide-react";
import Markdown from "./Markdown";
import {
  getAlign,
  insertImage,
  insertLink,
  tidyParagraphs,
  toggleAlign,
  toggleLinePrefix,
  toggleWrap,
  type Align,
  type EditResult,
} from "../utils/markdown";

/**
 * Editor isi berita: textarea Markdown + toolbar + tab pratinjau.
 *
 * Kenapa toolbar di atas textarea, bukan editor WYSIWYG penuh: yang disimpan
 * di kolom `news.content` tetap teks Markdown apa adanya. Formatnya bisa
 * dibaca manusia, aman dari XSS (HTML yang ikut tersimpan hanya
 * segelintir tag yang dilewatkan daftar putih di komponen Markdown), dan
 * berita lama tidak perlu dimigrasi sama sekali. Toolbar ini semata menutup
 * masalah sebenarnya: admin tidak perlu hafal sintaksnya.
 */

type UploadResult = { url?: string; error?: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  /** Kalau diisi, tombol gambar muncul dan memakai fungsi ini untuk unggah. */
  onUploadImage?: (file: File) => Promise<UploadResult>;
  maxLength?: number;
  rows?: number;
};

export default function MarkdownEditor({
  value,
  onChange,
  onUploadImage,
  maxLength,
  rows = 14,
}: Props) {
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  /** Isi sebelum "Rapikan paragraf" dijalankan. Aksinya menyentuh seluruh
   *  naskah sekaligus, dan Ctrl+Z bawaan textarea tidak bisa membatalkannya —
   *  riwayat undo browser putus begitu nilainya diganti dari React. Jadi satu
   *  langkah mundur disediakan sendiri di sini. */
  const [beforeTidy, setBeforeTidy] = useState<string | null>(null);
  /** Perataan teks di posisi kursor sekarang, supaya tombol yang sedang
   *  berlaku bisa terlihat menyala. Ikut posisi kursor, bukan sekali hitung:
   *  satu naskah bisa berisi beberapa blok dengan perataan berbeda-beda. */
  const [align, setAlign] = useState<Align>("left");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /** Jalankan satu operasi teks, lalu kembalikan fokus + seleksi ke textarea.
   *  Tanpa pengembalian seleksi, tiap klik tombol memaksa admin mencari lagi
   *  posisi ketiknya — dan itu yang bikin toolbar terasa rusak. */
  const syncAlign = () => {
    const ta = taRef.current;
    if (ta) setAlign(getAlign(ta.value, ta.selectionStart, ta.selectionEnd));
  };

  const apply = (edit: (value: string, start: number, end: number) => EditResult) => {
    const ta = taRef.current;
    if (!ta) return;
    const result = edit(ta.value, ta.selectionStart, ta.selectionEnd);
    if (maxLength && result.value.length > maxLength) return;
    setBeforeTidy(null);
    onChange(result.value);
    // Menunggu React memasang nilai barunya dulu: mengubah `value` textarea
    // terkendali membuat browser melempar caret ke ujung teks, jadi seleksinya
    // harus dipasang ulang SETELAH render. setTimeout, bukan
    // requestAnimationFrame — rAF tidak jalan saat tab tidak terlihat, dan
    // caret-nya akan tertinggal di ujung begitu tab dibuka lagi.
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(result.selectionStart, result.selectionEnd);
      syncAlign();
    }, 0);
  };

  const actions = [
    { icon: Bold, label: "Tebal", hint: "Ctrl+B", run: () => apply((v, s, e) => toggleWrap(v, s, e, "**")) },
    { icon: Italic, label: "Miring", hint: "Ctrl+I", run: () => apply((v, s, e) => toggleWrap(v, s, e, "*")) },
    {
      icon: Underline,
      label: "Garis bawah",
      hint: "Ctrl+U",
      run: () => apply((v, s, e) => toggleWrap(v, s, e, "<u>", "</u>")),
    },
    {
      icon: Highlighter,
      label: "Stabilo",
      run: () => apply((v, s, e) => toggleWrap(v, s, e, "<mark>", "</mark>")),
    },
    { icon: Heading2, label: "Subjudul", run: () => apply((v, s, e) => toggleLinePrefix(v, s, e, "## ")) },
    { icon: Heading3, label: "Sub-subjudul", run: () => apply((v, s, e) => toggleLinePrefix(v, s, e, "### ")) },
    { icon: List, label: "Daftar titik", run: () => apply((v, s, e) => toggleLinePrefix(v, s, e, "- ")) },
    { icon: ListOrdered, label: "Daftar bernomor", run: () => apply((v, s, e) => toggleLinePrefix(v, s, e, "1. ")) },
    { icon: Quote, label: "Kutipan", run: () => apply((v, s, e) => toggleLinePrefix(v, s, e, "> ")) },
    { icon: Link2, label: "Tautan", hint: "Ctrl+K", run: () => apply((v, s, e) => insertLink(v, s, e)) },
  ];

  const alignActions: { icon: typeof AlignLeft; label: string; value: Align }[] = [
    { icon: AlignLeft, label: "Rata kiri", value: "left" },
    { icon: AlignCenter, label: "Rata tengah", value: "center" },
    { icon: AlignRight, label: "Rata kanan", value: "right" },
    { icon: AlignJustify, label: "Rata kiri-kanan", value: "justify" },
  ];

  const handleShortcut = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
    const map: Record<string, () => void> = {
      b: () => apply((v, s, en) => toggleWrap(v, s, en, "**")),
      i: () => apply((v, s, en) => toggleWrap(v, s, en, "*")),
      u: () => apply((v, s, en) => toggleWrap(v, s, en, "<u>", "</u>")),
      k: () => apply((v, s, en) => insertLink(v, s, en)),
    };
    const run = map[e.key.toLowerCase()];
    if (!run) return;
    e.preventDefault();
    run();
  };

  const tidied = tidyParagraphs(value);
  const canTidy = tidied !== value;

  const runTidy = () => {
    setBeforeTidy(value);
    onChange(tidied);
  };

  const undoTidy = () => {
    if (beforeTidy === null) return;
    onChange(beforeTidy);
    setBeforeTidy(null);
  };

  const handleFile = async (file: File | undefined) => {
    if (!file || !onUploadImage) return;
    setUploading(true);
    setUploadError("");
    const { url, error } = await onUploadImage(file);
    setUploading(false);
    if (!url) {
      setUploadError(error ?? "Gambar gagal diunggah.");
      return;
    }
    apply((v, s, e) => insertImage(v, s, e, url));
  };

  return (
    <div className="md-editor">
      <div className="admin-form__tabs">
        <button type="button" className={!preview ? "is-active" : ""} onClick={() => setPreview(false)}>
          Tulis
        </button>
        <button type="button" className={preview ? "is-active" : ""} onClick={() => setPreview(true)}>
          Preview
        </button>
      </div>

      {preview ? (
        <div className="prose admin-form__preview">
          <Markdown>{value || "*Belum ada isi.*"}</Markdown>
        </div>
      ) : (
        <>
          <div className="md-toolbar" role="toolbar" aria-label="Format tulisan">
            {actions.map(({ icon: Icon, label, hint, run }) => (
              <button
                key={label}
                type="button"
                className="md-toolbar__btn"
                onClick={run}
                title={hint ? `${label} (${hint})` : label}
                aria-label={label}
              >
                <Icon size={16} aria-hidden />
              </button>
            ))}

            <span className="md-toolbar__sep" aria-hidden />
            {alignActions.map(({ icon: Icon, label, value: alignValue }) => {
              const isActive = align === alignValue;
              return (
                <button
                  key={label}
                  type="button"
                  className={`md-toolbar__btn${isActive ? " is-active" : ""}`}
                  onClick={() => apply((v, s, e) => toggleAlign(v, s, e, alignValue))}
                  title={label}
                  aria-label={label}
                  aria-pressed={isActive}
                >
                  <Icon size={16} aria-hidden />
                </button>
              );
            })}

            <span className="md-toolbar__sep" aria-hidden />
            <button
              type="button"
              className="md-toolbar__btn"
              onClick={runTidy}
              disabled={!canTidy}
              title={
                canTidy
                  ? "Beri jarak antar-paragraf pada naskah yang tertulis rapat"
                  : "Paragrafnya sudah rapi"
              }
              aria-label="Rapikan paragraf"
            >
              <Pilcrow size={16} aria-hidden />
              <span className="md-toolbar__text">Rapikan paragraf</span>
            </button>

            {onUploadImage && (
              <>
                <span className="md-toolbar__sep" aria-hidden />
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  hidden
                  onChange={(e) => {
                    void handleFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  className="md-toolbar__btn"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  title="Sisipkan gambar ke dalam artikel"
                  aria-label="Sisipkan gambar"
                >
                  <ImagePlus size={16} aria-hidden />
                  <span className="md-toolbar__text">{uploading ? "Mengunggah…" : "Gambar"}</span>
                </button>
              </>
            )}
          </div>

          {beforeTidy !== null && (
            <p className="md-editor__notice">
              <span>Paragraf dirapikan. Periksa hasilnya di tab Preview.</span>
              <button type="button" className="md-editor__undo" onClick={undoTidy}>
                <Undo2 size={14} aria-hidden />
                Batalkan
              </button>
            </p>
          )}

          <textarea
            ref={taRef}
            className="field admin-form__content"
            rows={rows}
            value={value}
            maxLength={maxLength}
            onChange={(e) => {
              // Begitu admin mengetik sendiri, tawaran "Batalkan" ditarik:
              // mengembalikan naskah sebelum dirapikan pada titik ini akan
              // ikut membuang ketikan barunya.
              setBeforeTidy(null);
              onChange(e.target.value);
            }}
            onKeyDown={handleShortcut}
            onSelect={syncAlign}
            onFocus={syncAlign}
            placeholder="Tulis isi berita di sini…"
          />

          <div className="md-editor__foot">
            <small>
              Seleksi teksnya dulu, lalu tekan tombol format. Cek hasilnya di tab Preview.
            </small>
            {maxLength && (
              <small className={value.length > maxLength * 0.9 ? "is-warn" : ""}>
                {value.length.toLocaleString("id-ID")} / {maxLength.toLocaleString("id-ID")}
              </small>
            )}
          </div>
        </>
      )}

      {uploadError && <p className="admin-form__err">{uploadError}</p>}
    </div>
  );
}
