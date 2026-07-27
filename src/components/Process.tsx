const steps = [
  {
    no: "i",
    title: "Daftar & Konsultasi",
    desc: "Anda daftar, kami kuesioner singkat. Sesi konsultasi 30 menit untuk pilih skema: reguler, seberang, atau UMKM.",
    dur: "Hari 1–3",
  },
  {
    no: "ii",
    title: "Penyusunan Berkas",
    desc: "Tim kami susun Reg-01, daftar bahan, dan flowchart produksi. Semua diunggah ke portal SiHALAL atas nama Anda.",
    dur: "Hari 4–10",
  },
  {
    no: "iii",
    title: "Audit Lapangan",
    desc: "LPH menjadwalkan audit tempat produksi. Kami dampingi verifikasi bahan, alat, dan SOP hingga selesai.",
    dur: "Hari 11–18",
  },
  {
    no: "iv",
    title: "Fatwa & Terbit",
    desc: "Hasil audit masuk ke MUI untuk fatwa. Setetap, sertifikat halal terbit dan bisa diunduh di SiHALAL.",
    dur: "Hari 19–45",
  },
];

export default function Process() {
  return (
    <section className="section process" id="proses">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Alur kerja kami</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Empat fase, transparan, ada laporannya.
            </h2>
          </div>
        </div>
        <p className="lead" style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}>
          Kami tidak menjanjikan “cepat instan”. Yang kami jaga: setiap fase
          tuntas tanpa bolak-balik dokumen, dan Anda tahu posisi pengajuan setiap saat.
        </p>

        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.no}>
              <span className="step__no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="step__dur">{s.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
