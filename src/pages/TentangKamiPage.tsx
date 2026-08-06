import PageHero from "../components/PageHero";
import { usePageTitle } from "../hooks/usePageMeta";

const misi = [
  "Memberikan layanan pendampingan sertifikasi halal dan registrasi BPOM yang cepat, transparan, dan sesuai regulasi.",
  "Membantu pelaku usaha lokal maupun luar negeri memahami dan memenuhi persyaratan hukum yang berlaku di Indonesia.",
  "Menjadi satu pintu layanan (one-stop-service) untuk kebutuhan legalitas produk, mulai dari halal, BPOM, hingga dokumentasi pendukung lainnya.",
];

const keunggulan = [
  "Tim berpengalaman dan memahami regulasi BPJPH & BPOM terkini.",
  "Pendampingan penuh dari konsultasi, penyiapan dokumen, hingga sertifikat/izin edar terbit.",
  "Proses transparan — estimasi biaya dan waktu disampaikan di awal, tanpa biaya tersembunyi.",
  "Melayani konsultasi gratis untuk menentukan jalur sertifikasi/registrasi yang paling sesuai.",
];

/** Halaman /tentang-kami. Konten masih draft placeholder — tinggal disesuaikan
 *  dengan profil perusahaan asli. */
export default function TentangKamiPage() {
  usePageTitle("Tentang Kami — Urushalal");

  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title={
          <>
            Partner perizinan yang <em>mendampingi sampai tuntas.</em>
          </>
        }
      />

      <section className="section" data-service="neutral">
        <div className="wrap about-stack">

          {/* Card 1 — Profil Singkat */}
          <div className="about-card prose">
            <h2>Profil Singkat</h2>
            <p>
              Urushalal hadir untuk membantu pelaku usaha — dari UMKM hingga
              korporasi, lokal maupun perusahaan luar negeri — mengurus
              sertifikasi halal BPJPH dan izin edar BPOM dengan proses yang
              cepat, transparan, dan sesuai regulasi terbaru. Kami memahami
              bahwa proses perizinan bisa terasa rumit, karena itu kami hadir
              sebagai partner yang mendampingi setiap tahapan, dari konsultasi
              awal hingga sertifikat/izin edar terbit di tangan Anda.
            </p>
          </div>

          {/* Card 2 — Visi & Misi */}
          <div className="about-card about-card--vm">
            <div className="about-vm-inner">
              <div>
                <h3 className="about-card-heading">Visi</h3>
                <p className="about-card-text">
                  Menjadi mitra terpercaya nomor satu bagi pelaku usaha dalam
                  memenuhi standar kehalalan dan keamanan produk di Indonesia.
                </p>
              </div>
              <div>
                <h3 className="about-card-heading">Misi</h3>
                <ul className="about-card-list">
                  {misi.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 — Kenapa Memilih Kami */}
          <div className="about-card">
            <h2>Kenapa Memilih Kami</h2>
            <ul className="about-list-grid">
              {keunggulan.map((k) => (
                <li key={k}>
                  <span className="about-list-check">✓</span>
                  {k}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}
