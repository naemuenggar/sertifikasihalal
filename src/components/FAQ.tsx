import { useState } from "react";
import { Plus } from "./icons";
import ScrollLink from "./ScrollLink";

const faqs = [
  {
    q: "Berapa lama sertifikasi halal selesai?",
    a: "Untuk UMKM rata-rata 14–45 hari sejak dokumen lengkap. Korporasi multi-produk bisa 2–4 bulan. Lama proses sangat bergantung kelengkapan bahan dan respons Anda; kami yang mendorong supaya tetap di estimasi.",
  },
  {
    q: "Apakah Urushalal bagian dari MUI atau BPJPH?",
    a: "Tidak. Kami konsultan pendamping independen yang terdaftar dan terhubung dengan LPH (Lembaga Pemeriksa Halal) resmi. Fatwa tetap hak MUI dan sertifikat diterbitkan BPJPH lewat portal SiHALAL.",
  },
  {
    q: "Kalau gagal audit, apakah ada biaya tambahan?",
    a: "Untuk paket Bisnis dan Enterprise, pendampingan revisi dan audit ulang sudah termasuk. Paket Pemula mencakup satu kali audit; bila perlu audit ulang dikenakan biaya operasional yang transparan.",
  },
  {
    q: "Produk saya impor. Bisa dibantu sertifikasi seberang?",
    a: "Bisa. Kami tangani skema sertifikasi halal seberang (produk luar negeri) termasuk verifikasi dokumen negara asal dan koordinasi dengan LPH yang ditunjuk.",
  },
  {
    q: "Dokumen apa yang harus saya siapkan dari awal?",
    a: "Minimal: daftar produk, daftar bahan beserta supplier, flowchart proses produksi, dan dokumen legalitas usaha. Kami beri checklist lengkap setelah konsultasi awal supaya tidak ada yang tertinggal.",
  },
  {
    q: "Sertifikat halal berlaku berapa lama?",
    a: "Sertifikat halal berlaku 4 tahun. Sebelum jatuh tempo kami ingatkan dan bantu perpanjangan agar status halal produk Anda tidak putus di tengah jalan.",
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
                    <Plus className="faq-item__icon" />
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
