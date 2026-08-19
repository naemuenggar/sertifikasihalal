import { useRef, useState, type KeyboardEvent } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";
import Markdown from "./Markdown";
import {
  insertImage,
  insertLink,
  toggleLinePrefix,
  toggleWrap,
  type EditResult,
} from "../utils/markdown";

/**
 * Editor isi berita: textarea Markdown + toolbar + tab pratinjau.
 *
 * Kenapa toolbar di atas textarea, bukan editor WYSIWYG penuh: yang disimpan
 * di kolom `news.content` tetap teks Markdown apa adanya. Formatnya bisa
 * dibaca manusia, aman dari XSS (tidak ada HTML yang ikut tersimpan kecuali
 * dua tag inline yang dilewatkan daftar putih di komponen Markdown), dan
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
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /** Jalankan satu operasi teks, lalu kembalikan fokus + seleksi ke textarea.
   *  Tanpa pengembalian seleksi, tiap klik tombol memaksa admin mencari lagi
   *  posisi ketiknya — dan itu yang bikin toolbar terasa rusak. */
  const apply = (edit: (value: string, start: number, end: number) => EditResult) => {
    const ta = taRef.current;
    if (!ta) return;
    const result = edit(ta.value, ta.selectionStart, ta.selectionEnd);
    if (maxLength && result.value.length > maxLength) return;
    onChange(result.value);
    // Menunggu React memasang nilai barunya dulu: mengubah `value` textarea
    // terkendali membuat browser melempar caret ke ujung teks, jadi seleksinya
    // harus dipasang ulang SETELAH render. setTimeout, bukan
    // requestAnimationFrame — rAF tidak jalan saat tab tidak terlihat, dan
    // caret-nya akan tertinggal di ujung begitu tab dibuka lagi.
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(result.selectionStart, result.selectionEnd);
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

          <textarea
            ref={taRef}
            className="field admin-form__content"
            rows={rows}
            value={value}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleShortcut}
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
