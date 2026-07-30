import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createNews, updateNews, fetchNewsByIdAdmin, uploadThumbnail } from "../../lib/news";
import type { NewsInput, NewsStatus } from "../../lib/types";
import { slugify } from "../../utils/slug";

const CATEGORIES = ["Regulasi", "Kosmetik", "Pasar", "Tips & Panduan"];

/** Form Tambah (/admin/berita/new) & Edit (/admin/berita/:id/edit) berita. */
export default function AdminNewsFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState<NewsStatus>("draft");
  const [publishedDate, setPublishedDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Mode edit: muat data berita yang ada.
  useEffect(() => {
    if (!id) return;
    fetchNewsByIdAdmin(id).then((n) => {
      if (!n) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setTitle(n.title);
      setSlug(n.slug);
      setSlugTouched(true);
      setCategory(n.category ?? CATEGORIES[0]);
      setThumbnailUrl(n.thumbnail_url ?? "");
      setSummary(n.summary ?? "");
      setContent(n.content ?? "");
      setStatus(n.status);
      setPublishedDate(n.published_at ? n.published_at.slice(0, 10) : "");
      setLoading(false);
    });
  }, [id]);

  // Judul berubah → auto-isi slug (selama slug belum diedit manual).
  const handleTitle = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const url = await uploadThumbnail(file);
    setUploading(false);
    if (url) setThumbnailUrl(url);
    else setError("Gagal mengunggah gambar. Coba lagi.");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    const finalSlug = slugify(slug || title);
    if (!title.trim() || !finalSlug) {
      setError("Judul wajib diisi.");
      return;
    }
    setSaving(true);
    setError("");

    const input: NewsInput = {
      title: title.trim(),
      slug: finalSlug,
      category: category || null,
      thumbnail_url: thumbnailUrl || null,
      summary: summary.trim() || null,
      content: content || null,
      status,
      published_at: publishedDate
        ? new Date(`${publishedDate}T09:00:00`).toISOString()
        : status === "published"
          ? new Date().toISOString()
          : null,
    };

    const res = isEdit && id ? await updateNews(id, input) : await createNews(input);
    setSaving(false);
    if (res.ok) navigate("/admin/berita");
    else setError(res.error ?? "Gagal menyimpan berita.");
  };

  if (loading) {
    return (
      <div className="admin-page">
        <p className="admin-empty">Memuat…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="admin-page">
        <p className="admin-empty">Berita tidak ditemukan.</p>
        <Link className="btn btn--ghost" to="/admin/berita">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1>{isEdit ? "Edit Berita" : "Tambah Berita"}</h1>
          <p>
            {isEdit
              ? "Perbarui konten, lalu simpan."
              : "Isi detail berita. Slug dibuat otomatis dari judul."}
          </p>
        </div>
        <Link to="/admin/berita" className="btn btn--ghost">
          Kembali
        </Link>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form__grid">
          {/* Kolom utama */}
          <div className="admin-form__col">
            <label className="admin-field">
              <span>Judul *</span>
              <input
                className="field"
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
                placeholder="Judul berita"
                required
              />
            </label>

            <label className="admin-field">
              <span>Slug</span>
              <input
                className="field"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                placeholder="otomatis-dari-judul"
              />
              <small>Otomatis dari judul, bisa diubah manual.</small>
            </label>

            <label className="admin-field">
              <span>Ringkasan singkat</span>
              <textarea
                className="field"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Ditampilkan di kartu preview…"
              />
            </label>

            <div className="admin-field">
              <span>Isi berita (Markdown)</span>
              <div className="admin-form__tabs">
                <button
                  type="button"
                  className={!preview ? "is-active" : ""}
                  onClick={() => setPreview(false)}
                >
                  Tulis
                </button>
                <button
                  type="button"
                  className={preview ? "is-active" : ""}
                  onClick={() => setPreview(true)}
                >
                  Preview
                </button>
              </div>
              {preview ? (
                <div className="prose admin-form__preview">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || "*Belum ada isi.*"}
                  </ReactMarkdown>
                </div>
              ) : (
                <textarea
                  className="field admin-form__content"
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis isi berita di sini…"
                />
              )}
            </div>
          </div>

          {/* Kolom pengaturan terbit */}
          <div className="admin-form__col">
            <label className="admin-field">
              <span>Kategori</span>
              <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <div className="admin-field">
              <span>Gambar thumbnail</span>
              {thumbnailUrl && (
                <img className="admin-form__thumb" src={thumbnailUrl} alt="Pratinjau thumbnail" />
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} hidden />
              <div className="admin-form__thumb-actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Mengunggah…" : thumbnailUrl ? "Ganti gambar" : "Pilih gambar"}
                </button>
                {thumbnailUrl && (
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => setThumbnailUrl("")}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>

            <label className="admin-field">
              <span>Status</span>
              <select
                className="field"
                value={status}
                onChange={(e) => setStatus(e.target.value as NewsStatus)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label className="admin-field">
              <span>Tanggal terbit</span>
              <input
                className="field"
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
              <small>Kosongkan untuk memakai tanggal hari ini saat status Published.</small>
            </label>
          </div>
        </div>

        {error && <p className="admin-form__err">{error}</p>}

        <div className="admin-form__actions">
          <Link to="/admin/berita" className="btn btn--ghost">
            Batal
          </Link>
          <button type="submit" className="btn btn--solid" disabled={saving}>
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
