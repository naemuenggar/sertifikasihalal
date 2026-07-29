import { useState } from "react";
import { Plus } from "lucide-react";
import ScrollLink from "./ScrollLink";

const faqs = [
  {
    q: "Berapa lama sertifikasi halal selesai?",
    a: "Rata-Rata 30-45 Hari.",
  },
  {
    q: "Apakah Urushalal bagian dari MUI atau BPJPH?",
    a: "Tidak. Kami konsultan pendamping independen yang terdaftar dan terhubung dengan LPH (Lembaga Pemeriksa Halal) resmi. Fatwa tetap hak MUI dan sertifikat diterbitkan BPJPH lewat portal SiHALAL.",
  },
  {
    q: "Kalau gagal audit, apakah ada biaya tambahan?",
    a: "Tidak ada biaya tersembunyi. Pendampingan revisi dan audit ulang sudah termasuk di paket Bisnis maupun Enterprise, jadi Anda tidak perlu bayar lagi kalau audit pertama belum lolos.",
  },
  {
    q: "Produk saya impor dan sudah bersertifikat halal luar negeri apakah bisa dibantu sertifikasi halal di indonesia?",
    a: "Bisa, kami bantu untuk registrasi halal luar negeri ke dalam sertifikasi BPJPH Indonesia.",
  },
  {
    q: "Dokumen apa yang harus saya siapkan dari awal?",
    a: "Minimal: daftar produk, daftar bahan beserta supplier, flowchart proses produksi, dan dokumen legalitas usaha. Kami beri checklist lengkap setelah konsultasi awal supaya tidak ada yang tertinggal.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="faq">
          <div className="faq__intro">
            <span className="eyebrow" style={{ display: "inline-flex" }}>
              Pertanyaan umum
            </span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Pertanyaan yang sering kami dengar.
            </h2>
            <p className="lead">
              Belum nemu jawabannya? Tanyakan langsung di sesi konsultasi
              gratis—biasanya cukup 20 menit.
            </p>
            <ScrollLink to="kontak" className="btn btn--ghost" style={{ marginTop: "1.5rem" }}>
              Ajukan pertanyaan
            </ScrollLink>
          </div>

          <div className="faq__list">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className="faq-item" key={f.q} data-open={isOpen}>
                  <button
                    className="faq-item__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <Plus className="faq-item__icon" size={18} strokeWidth={1.8} />
                  </button>
                  <div className="faq-item__a">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
