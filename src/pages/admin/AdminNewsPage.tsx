import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllNewsAdmin, deleteNews } from "../../lib/news";
import type { News } from "../../lib/types";
import { formatDate } from "../../utils/date";

/** Kelola Berita — tabel daftar berita + aksi Edit/Hapus. */
export default function AdminNewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchAllNewsAdmin().then((n) => {
      setItems(n);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleDelete = async (item: News) => {
    if (!window.confirm(`Hapus berita "${item.title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setBusyId(item.id);
    const res = await deleteNews(item.id);
    setBusyId(null);
    if (res.ok) load();
    else window.alert(`Gagal menghapus: ${res.error}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1>Kelola Berita</h1>
          <p>{items.length} berita tersimpan.</p>
        </div>
        <Link to="/admin/berita/new" className="btn btn--solid">
          + Tambah Berita
        </Link>
      </div>

      {loading ? (
        <p className="admin-empty">Memuat…</p>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <p>Belum ada berita. Mulai dengan menambahkan berita pertama Anda.</p>
          <Link to="/admin/berita/new" className="btn btn--solid">
            + Tambah Berita
          </Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th className="admin-table__act">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.id}>
                  <td className="admin-table__title">{n.title}</td>
                  <td>{n.category ?? "—"}</td>
                  <td className="admin-table__date">{formatDate(n.published_at)}</td>
                  <td>
                    <span className={`badge badge--${n.status}`}>
                      {n.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="admin-table__act">
                    <Link className="btn btn--ghost btn--sm" to={`/admin/berita/${n.id}/edit`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn--danger btn--sm"
                      disabled={busyId === n.id}
                      onClick={() => handleDelete(n)}
                    >
                      {busyId === n.id ? "…" : "Hapus"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
