import { useRef, useState, useEffect, useCallback } from "react";
import { IconConsult, IconDoc, IconAudit, IconCert, IconShield } from "./icons";

const services = [
  {
    icon: IconConsult,
    title: "Konsultasi Awal",
    desc: "Kami petakan jenis produk, bahan, dan proses Anda untuk menentukan skema sertifikasi yang paling pas.",
    tag: "Fase persiapan",
  },
  {
    icon: IconDoc,
    title: "Penyusunan Dokumen",
    desc: "Formulir Pendaftaran Halal (Reg-01), daftar bahan, flowchart produksi—kami susun rapi sampai siap verifikasi.",
    tag: "BPJPH",
  },
  {
    icon: IconAudit,
    title: "Pendampingan Audit",
    desc: "Auditor LPH datang ke lokasi. Kami dampingi dari sisi teknis supaya audit jalan satu kali jalan.",
    tag: "Lapangan",
  },
  {
    icon: IconCert,
    title: "Penerbitan Sertifikat",
    desc: "Hasil audit kami pantau sampai Fatwa MUI keluar dan sertifikat halal resmi terbit di portal SiHALAL.",
    tag: "Penyelesaian",
  },
  {
    icon: IconShield,
    title: "Kaji Bahan & Supplier",
    desc: "Cek status halal setiap bahan dan supplier agar rantai pasok Anda terdokumentasi dan tidak bermasalah saat audit.",
    tag: "Due diligence",
  },
];

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    if (dir === -1 && atStart) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }

    if (dir === 1 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const card = el.querySelector<HTMLElement>(".svc-carousel__card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 16;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="section" id="layanan">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Apa yang kami urus</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Dari niat sampai sertifikat terbit, satu pintu.
            </h2>
          </div>
          <div className="svc-nav">
            <button
              type="button"
              className="svc-nav__btn"
              onClick={() => slide(-1)}
              aria-label="Kartu sebelumnya"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="svc-nav__btn"
              onClick={() => slide(1)}
              aria-label="Kartu berikutnya"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="svc-carousel" ref={trackRef}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article className="svc svc-carousel__card" key={s.title}>
                <Icon className="svc__icon" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="svc__tag">{s.tag}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
