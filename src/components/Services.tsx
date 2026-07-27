import { IconConsult, IconDoc, IconAudit, IconCert, IconScale, IconShield } from "./icons";
import ScrollLink from "./ScrollLink";

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
    icon: IconScale,
    title: "Renewal & Pemeliharaan",
    desc: "Sertifikat berlaku 4 tahun. Kami ingatkan jadwal perpanjangan dan bantu update dokumen sebelum jatuh tempo.",
    tag: "Berkelanjutan",
  },
  {
    icon: IconShield,
    title: "Kaji Bahan & Supplier",
    desc: "Cek status halal setiap bahan dan supplier agar rantai pasok Anda terdokumentasi dan tidak bermasalah saat audit.",
    tag: "Due diligence",
  },
];

export default function Services() {
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
          <ScrollLink to="kontak" className="section__link">
            Konsultasi
          </ScrollLink>
        </div>

        <div className="svc-grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article className="svc" key={s.title}>
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
