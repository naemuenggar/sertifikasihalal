import {
  ArrowRight,
  Award,
  CalendarCheck,
  Globe,
  MessageCircle,
  ShieldCheck,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import ScrollLink from "./ScrollLink";
import WaLink from "./WaLink";

/** Empat alasan utama, ditaruh di hero supaya keberatan pertama pengunjung
 *  ("aman nggak? lama nggak? diakui nggak?") sudah terjawab sebelum scroll. */
const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Sesuai Syariat",
    desc: "Dipandu auditor berkompeten & tersertifikasi",
  },
  {
    icon: Timer,
    title: "Proses Cepat & Transparan",
    desc: "Alur jelas, biaya pasti, tanpa hidden cost",
  },
  {
    icon: Globe,
    title: "Diakui Nasional & Global",
    desc: "Sertifikat halal diakui BPJPH & MUI",
  },
  {
    icon: Users,
    title: "Pendampingan Profesional",
    desc: "Tim ahli siap mendampingi sampai sertifikat terbit",
  },
] as const;

const STATS = [
  { icon: Award, num: "200+", label: "Produk Tersertifikasi" },
  { icon: CalendarCheck, num: "30 Hari", label: "Rata-rata Audit" },
  { icon: TrendingUp, num: "98%", label: "Pengajuan Lolos Verifikasi Pertama" },
] as const;

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden />
      <div className="hero__overlay" aria-hidden />
      <div className="hero__glow" aria-hidden />

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="hero__badge">
            <span className="hero__badge-mark" aria-hidden />
            Sertifikasi Halal untuk Semua Jenis Usaha
          </p>

          <h1 className="hero__title">
            {/* Spasi eksplisit: <em> di-block lewat CSS, jadi tidak terlihat —
                tapi tanpa ini screen reader & snippet SEO membaca "Halal,Nilai". */}
            Sertifikasi Halal,{" "}
            <em>
              Nilai Lebih
              <br />
              untuk Bisnis Anda
            </em>
          </h1>

          <div className="hero__rule" aria-hidden />

          <p className="hero__lead">
            Kami membantu Anda mendapatkan sertifikasi halal secara cepat,
            mudah, dan sesuai syariat.
          </p>

          <ul className="hero__features">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <li className="hero-feature" key={title}>
                <span className="hero-feature__icon" aria-hidden>
                  <Icon size={28} strokeWidth={1.6} />
                </span>
                <span className="hero-feature__title">{title}</span>
                <span className="hero-feature__desc">{desc}</span>
              </li>
            ))}
          </ul>

          <div className="hero__cta">
            <WaLink className="btn btn--solid">
              <MessageCircle size={18} strokeWidth={1.8} aria-hidden />
              Mulai konsultasi gratis
            </WaLink>
            <ScrollLink to="alur" className="btn btn--ghost">
              Lihat alurnya
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
            </ScrollLink>
          </div>
        </div>
      </div>

      <div className="wrap hero__stats-wrap">
        <ul className="hero__stats">
          {STATS.map(({ icon: Icon, num, label }) => (
            <li className="hero-stat" key={num}>
              <span className="hero-stat__icon" aria-hidden>
                <Icon size={26} strokeWidth={1.5} />
              </span>
              <span className="hero-stat__num">{num}</span>
              <span className="hero-stat__lbl">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
