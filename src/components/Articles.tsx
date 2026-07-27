import ScrollLink from "./ScrollLink";

function FeatureArt() {
  return (
    <div className="art-feat__media" aria-hidden>
      <svg viewBox="0 0 600 375" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="375" fill="#e9e2d0" />
        <g stroke="#0d3a2c" strokeOpacity="0.18" strokeWidth="1.2" fill="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 66} y1="0" x2={i * 66} y2="375" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 66} x2="600" y2={i * 66} />
          ))}
        </g>
        <circle cx="300" cy="188" r="90" fill="#0d3a2c" fillOpacity="0.06" />
        <path
          d="M300 110c14 22 28 32 46 32 1 19-3 40-13 56-8 14-21 24-33 31-12-7-25-17-33-31-10-16-14-37-13-56 18 0 32-10 46-32z"
          fill="#0d3a2c"
          fillOpacity="0.8"
        />
        <path
          d="M285 188l10 10 20-22"
          stroke="#f3eddf"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text
          x="32"
          y="345"
          fontFamily="Fraunces, serif"
          fontStyle="italic"
          fontSize="26"
          fill="#0d3a2c"
          fillOpacity="0.7"
        >
          BPJPH 2026
        </text>
      </svg>
    </div>
  );
}

const list = [
  {
    cat: "Regulasi",
    title: "Bedah PP 39/2021: apa yang baru buat UMKM?",
    date: "12 Jun 2026",
  },
  {
    cat: "Panduan",
    title: "Cara isi form Reg-01 tanpa ditolak verifikator",
    date: "28 Mei 2026",
  },
  {
    cat: "Studi kasus",
    title: "Brand kuliner Bandung lolos audit dalam 19 hari",
    date: "03 Mei 2026",
  },
  {
    cat: "Bahan",
    title: "Daftar bahan rawan: alkohol, gelatin, dan enzim",
    date: "21 Apr 2026",
  },
];

export default function Articles() {
  return (
    <section className="section" id="artikel">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Jurnal & catatan</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Yang sebaiknya dibaca sebelum daftar.
            </h2>
          </div>
          <ScrollLink to="artikel" className="section__link">
            Semua artikel
          </ScrollLink>
        </div>

        <div className="art-grid">
          <article className="art-feat">
            <FeatureArt />
            <span className="art-feat__cat">Regulasi · 8 menit baca</span>
            <h3>
              Sertifikasi halal wajib 2026: deadline, sanksi, dan siapa yang kena
            </h3>
            <p>
              Mulai 2026 sertifikasi halal berlaku untuk seluruh produk yang
              beredar. Kami urai apa artinya bagi pelaku usaha, dan bagaimana
              menghindari denda hingga ratusan juta.
            </p>
            <ScrollLink to="artikel" className="section__link">
              Baca lengkap
            </ScrollLink>
          </article>

          <div className="art-list">
            {list.map((a) => (
              <ScrollLink className="art-item" to="artikel" key={a.title}>
                <div>
                  <span className="art-item__cat">{a.cat}</span>
                  <h4>{a.title}</h4>
                </div>
                <span className="art-item__date">{a.date}</span>
              </ScrollLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
