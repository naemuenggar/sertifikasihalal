const steps = [
  {
    no: "1",
    title: "Konsultasi Gratis",
    desc: "Tim kami meninjau produk Anda, negara asal produksi, dan mengecek apakah tersedia jalur pengakuan (MRA) yang berlaku. Kami konfirmasikan jalur sertifikasi yang paling tepat, perkiraan waktu, dan estimasi biaya — direspons maksimal dalam 24 jam.",
  },
  {
    no: "2",
    title: "Penyiapan Dokumentasi",
    desc: "Kami mendampingi Anda menyiapkan seluruh dokumen yang diperlukan, seperti sertifikat GMP, deklarasi bahan baku, desain kemasan, dan dokumen pendukung lainnya sesuai jalur yang dipilih.",
  },
  {
    no: "3",
    title: "Pendaftaran SIHALAL dan Audit",
    desc: "Permohonan diajukan melalui sistem SIHALAL milik BPJPH. Untuk Sertifikasi Halal Reguler, auditor dari Lembaga Pemeriksa Halal (LPH) terakreditasi akan melakukan pemeriksaan langsung ke fasilitas produksi. Untuk Registrasi Sertifikat Luar Negeri, sertifikat yang sudah dimiliki langsung didaftarkan.",
  },
  {
    no: "4",
    title: "Fatwa MUI",
    desc: "Hasil audit diserahkan ke Komisi Fatwa Majelis Ulama Indonesia (MUI) untuk ditinjau. MUI menerbitkan fatwa halal sebagai syarat keagamaan yang diwajibkan oleh undang-undang.",
  },
  {
    no: "5",
    title: "Penerbitan Sertifikat BPJPH",
    desc: "BPJPH menerbitkan Sertifikat Halal Indonesia resmi yang berlaku permanen. Kepatuhan tetap dievaluasi berkala (setiap 4 tahun) — kami membantu memantau dan mengurus pembaruan jika diperlukan.",
  },
];

export default function Alur() {
  return (
    <section className="section alur" id="alur">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Alur</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Lima tahap, transparan, ada laporannya.
            </h2>
          </div>
        </div>
        <p className="lead" style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}>
          Kami tidak menjanjikan “cepat instan”. Yang kami jaga: setiap tahap
          tuntas tanpa bolak-balik dokumen, dan Anda tahu posisi pengajuan setiap saat.
        </p>

        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.no}>
              <span className="step__no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
