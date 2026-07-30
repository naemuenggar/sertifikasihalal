import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllNewsAdmin } from "../../lib/news";
import { fetchContactMessagesAdmin } from "../../lib/contact";
import type { News, ContactMessage } from "../../lib/types";

/** Dashboard admin — ringkasan cepat + pintasan. */
export default function AdminDashboardPage() {
  const [news, setNews] = useState<News[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    Promise.all([fetchAllNewsAdmin(), fetchContactMessagesAdmin()]).then(([n, m]) => {
      setNews(n);
      setMessages(m);
    });
  }, []);

  const published = news.filter((n) => n.status === "published").length;
  const draft = news.length - published;

  const stats = [
    { label: "Total Berita", value: news.length },
    { label: "Published", value: published },
    { label: "Draft", value: draft },
    { label: "Pesan Masuk", value: messages.length },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1>Dashboard</h1>
          <p>Ringkasan konten berita dan pesan yang masuk.</p>
        </div>
        <Link to="/admin/berita/new" className="btn btn--solid">
          + Tambah Berita
        </Link>
      </div>

      <div className="admin-stats">
        {stats.map((s) => (
          <div className="admin-stat" key={s.label}>
            <span className="admin-stat__num">{s.value}</span>
            <span className="admin-stat__lbl">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="admin-quick">
        <Link to="/admin/berita" className="btn btn--ghost">
          Kelola Berita
        </Link>
        <Link to="/admin/pesan" className="btn btn--ghost">
          Lihat Pesan Masuk
        </Link>
      </div>
    </div>
  );
}
