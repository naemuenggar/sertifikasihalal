import {
  Award,
  CalendarCheck,
  CircleCheck,
  ClipboardCheck,
  FileCheck2,
  Globe,
  Headset,
  Rocket,
  Scale,
  ShieldCheck,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Dipakai sebagai `data-theme` di slide. Paletnya didefinisikan di styles.css
 *  (`.hero-slide[data-theme="..."]`), bukan di sini — file ini murni konten. */
export type HeroTheme = "halal" | "bpom";

export interface HeroFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface HeroStat {
  icon: LucideIcon;
  num: string;
  label: string;
}

export interface HeroSlideData {
  id: string;
  theme: HeroTheme;
  /** Path di /public. Dipasang lewat custom property, bukan <img>. */
  photo: string;
  /** Label slide untuk pembaca layar dan dot indicator. */
  name: string;
  badge: string;
  /** Baris pertama judul (tegak). */
  titleHead: string;
  /** Sisa judul, dicetak miring + warna aksen. Satu item = satu baris. */
  titleAccent: readonly string[];
  lead: string;
  features: readonly HeroFeature[];
  /** Pesan awal yang terisi di WhatsApp — biar chat tidak mulai kosong. */
  waMessage: string;
  ctaSecondary: { label: string; to: string };
  stats: readonly HeroStat[];
}

export const HERO_SLIDES: readonly HeroSlideData[] = [
  {
    id: "halal",
    theme: "halal",
    photo: "/hero-1.jpeg",
    name: "Sertifikasi Halal",
    badge: "Sertifikasi Halal untuk Semua Jenis Usaha",
    titleHead: "Sertifikasi Halal,",
    titleAccent: ["Nilai Lebih", "untuk Bisnis Anda"],
    lead: "Kami membantu Anda mendapatkan sertifikasi halal secara cepat, mudah, dan sesuai syariat.",
    // Empat alasan utama, ditaruh di hero supaya keberatan pertama pengunjung
    // ("aman nggak? lama nggak? diakui nggak?") sudah terjawab sebelum scroll.
    features: [
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
    ],
    waMessage: "Halo, saya mau konsultasi soal sertifikasi halal untuk produk saya.",
    ctaSecondary: { label: "Lihat alurnya", to: "alur" },
    stats: [
      { icon: Award, num: "200+", label: "Produk Tersertifikasi" },
      { icon: CalendarCheck, num: "30 Hari", label: "Rata-rata Audit" },
      { icon: TrendingUp, num: "98%", label: "Pengajuan Lolos Verifikasi Pertama" },
    ],
  },
  {
    id: "bpom",
    theme: "bpom",
    photo: "/hero-2.jpeg",
    name: "Izin BPOM",
    badge: "Izin BPOM, Legalitas Terjamin",
    titleHead: "Urus Izin BPOM,",
    titleAccent: ["Mudah, Aman", "& Terarah"],
    lead: "Kami membantu Anda mengurus izin BPOM untuk produk makanan, minuman, obat, kosmetik, dan suplemen dengan proses yang aman dan efisien.",
    features: [
      {
        icon: ShieldCheck,
        title: "Tim Berpengalaman",
        desc: "Konsultan ahli regulasi siap membantu Anda",
      },
      {
        icon: Rocket,
        title: "Proses Cepat & Efisien",
        desc: "Dokumen lengkap, proses lebih lancar",
      },
      {
        icon: Scale,
        title: "Legal & Terpercaya",
        desc: "Sesuai ketentuan BPOM terbaru",
      },
      {
        icon: FileCheck2,
        title: "Layanan End-to-End",
        desc: "Dari persiapan hingga izin terbit",
      },
    ],
    waMessage: "Halo, saya mau konsultasi soal pengurusan izin BPOM untuk produk saya.",
    ctaSecondary: { label: "Lihat alurnya", to: "alur" },
    stats: [
      { icon: ClipboardCheck, num: "4–5 Bulan", label: "Estimasi Proses" },
      { icon: CircleCheck, num: "100%", label: "Pendampingan Sampai Terbit" },
      { icon: Headset, num: "Konsultasi Gratis", label: "Tim siap membantu Anda kapan saja" },
    ],
  },
];
