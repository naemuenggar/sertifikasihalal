import { useEffect, useState, type FormEvent } from "react";
import { FileText, Trash2, X } from "lucide-react";
import {
  deleteContactMessageAdmin,
  fetchContactMessagesAdmin,
  updateContactMessageAdmin,
} from "../../lib/contact";
import type { ContactMessage, ContactMessageStatus } from "../../lib/types";
import { formatDateTime } from "../../utils/date";
import { LIMITS } from "../../lib/limits";

type Filter = "semua" | ContactMessageStatus;

/** Pesan Masuk: tracking follow-up pesan dari form publik. */
export default function AdminMessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("semua");
  const [editing, setEditing] = useState<ContactMessage | null>(null);
  const [status, setStatus] = useState<ContactMessageStatus>("belum_ditindaklanjuti");
  const [catatan, setCatatan] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchContactMessagesAdmin().then((messages) => {
      setItems(messages);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const openEditor = (item: ContactMessage) => {
    setEditing(item);
    setStatus(item.status);
    setCatatan(item.catatan ?? "");
    setError("");
  };

  const closeEditor = () => {
    if (saving) return;
    setEditing(null);
    setError("");
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing || saving) return;
    setSaving(true);
    setError("");
    const result = await updateContactMessageAdmin(editing.id, {
      status,
      catatan: catatan.trim() || null,
    });
    setSaving(false);
    if (!result.item) {
      setError(result.error ?? "Gagal menyimpan perubahan.");
      return;
    }
    setItems((current) => current.map((item) => (item.id === result.item?.id ? result.item : item)));
    setEditing(null);
  };

  const handleDelete = async (item: ContactMessage) => {
    if (!window.confirm(`Hapus pesan dari "${item.name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setBusyId(item.id);
    const ok = await deleteContactMessageAdmin(item.id);
    setBusyId(null);
    if (ok) setItems((current) => current.filter(({ id }) => id !== item.id));
    else window.alert("Gagal menghapus pesan.");
  };

  const visibleItems = filter === "semua" ? items : items.filter((item) => item.status === filter);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1>Pesan Masuk</h1>
          <p>{items.length} pesan dari form “More Info”.</p>
        </div>
        <label className="msg-filter">
          <span>Filter status</span>
          <select className="field" value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
            <option value="semua">Semua</option>
            <option value="belum_ditindaklanjuti">Belum Follow Up</option>
            <option value="sudah_ditindaklanjuti">Sudah Follow Up</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p className="admin-empty">Memuat…</p>
      ) : items.length === 0 ? (
        <p className="admin-empty">Belum ada pesan yang masuk.</p>
      ) : visibleItems.length === 0 ? (
        <p className="admin-empty">Tidak ada pesan dengan status ini.</p>
      ) : (
        <div className="table-wrap msg-table-wrap">
          <table className="admin-table msg-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>No. Telp/Email</th>
                <th>Pesan</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => (
                <tr key={item.id}>
                  <td className="msg-table__name">{item.name}</td>
                  <td className="msg-table__contact">{item.contact}</td>
                  <td className="msg-table__message">{item.message}</td>
                  <td className="admin-table__date">{formatDateTime(item.created_at)}</td>
                  <td className="msg-table__status">
                    <button
                      type="button"
                      className={`msg-status msg-status--${item.status}`}
                      onClick={() => openEditor(item)}
                    >
                      {item.status === "sudah_ditindaklanjuti" ? "Sudah Follow Up" : "Belum Follow Up"}
                    </button>
                    {item.catatan && (
                      <FileText className="msg-status__note" size={16} aria-label="Memiliki catatan" />
                    )}
                    <button
                      type="button"
                      className="msg-table__delete"
                      disabled={busyId === item.id}
                      onClick={() => handleDelete(item)}
                      aria-label={`Hapus pesan dari ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="msg-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeEditor();
        }}>
          <form className="msg-modal__card" role="dialog" aria-modal="true" aria-labelledby="msg-modal-title" onSubmit={handleSave}>
            <div className="msg-modal__head">
              <div>
                <h2 id="msg-modal-title">Update Status Pesan</h2>
                <p>{editing.name}</p>
              </div>
              <button type="button" className="msg-modal__close" onClick={closeEditor} aria-label="Tutup">
                <X size={19} />
              </button>
            </div>

            <fieldset className="msg-status-toggle">
              <legend>Status follow-up</legend>
              <button
                type="button"
                className={status === "belum_ditindaklanjuti" ? "is-active" : ""}
                onClick={() => setStatus("belum_ditindaklanjuti")}
              >
                Belum Ditindaklanjuti
              </button>
              <button
                type="button"
                className={status === "sudah_ditindaklanjuti" ? "is-active" : ""}
                onClick={() => setStatus("sudah_ditindaklanjuti")}
              >
                Sudah Ditindaklanjuti
              </button>
            </fieldset>

            <label className="admin-field">
              <span>Catatan (opsional)</span>
              <textarea
                className="field"
                rows={4}
                value={catatan}
                onChange={(event) => setCatatan(event.target.value)}
                maxLength={LIMITS.contactNote}
                placeholder="Contoh: sudah dihubungi via WA, minat sertifikasi kosmetik"
              />
            </label>

            {error && <p className="msg-modal__error">{error}</p>}
            <div className="msg-modal__actions">
              <button type="button" className="btn btn--ghost" onClick={closeEditor} disabled={saving}>Batal</button>
              <button type="submit" className="btn btn--solid" disabled={saving}>
                {saving ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
