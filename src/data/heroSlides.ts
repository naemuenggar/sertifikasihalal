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
 *  (`.hero-slide[data-theme="..."]`), bukan di sini — file ini murni struktur. */
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
  /** Versi potret untuk layar ponsel (art direction via <source>). */
  photoPortrait: string;
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

/** Bentuk teks satu slide per bahasa — diisi oleh src/i18n/{id,en}.ts.
 *  Urutan features/stats harus sama dengan urutan ikon di slideMeta. */
export type HeroSlideText = {
  name: string;
  badge: string;
  titleHead: string;
  titleAccent: string[];
  lead: string;
  features: { title: string; desc: string }[];
  waMessage: string;
  ctaSecondary: string;
  stats: { num: string; label: string }[];
};

/** Bagian slide yang tidak berubah antar bahasa: tema, foto, dan ikon. */
const slideMeta: Record<
  "halal" | "bpom",
  {
    theme: HeroTheme;
    photo: string;
    photoPortrait: string;
    featureIcons: LucideIcon[];
    statIcons: LucideIcon[];
  }
> = {
  halal: {
    theme: "halal",
    photo: "/hero-1.jpeg",
    photoPortrait: "/hero-1-portrait.jpeg",
    featureIcons: [ShieldCheck, Timer, Globe, Users],
    statIcons: [Award, CalendarCheck, TrendingUp],
  },
  bpom: {
    theme: "bpom",
    photo: "/hero-2.jpeg",
    photoPortrait: "/hero-2-portrait.jpeg",
    featureIcons: [ShieldCheck, Rocket, Scale, FileCheck2],
    statIcons: [ClipboardCheck, CircleCheck, Headset],
  },
};

/** Rakit data slide lengkap: ikon & foto dari slideMeta + teks bahasa aktif. */
export function getHeroSlides(
  slides: Record<"halal" | "bpom", HeroSlideText>,
): HeroSlideData[] {
  return (["halal", "bpom"] as const).map((slideId) => {
    const meta = slideMeta[slideId];
    const text = slides[slideId];
    return {
      id: slideId,
      theme: meta.theme,
      photo: meta.photo,
      photoPortrait: meta.photoPortrait,
      name: text.name,
      badge: text.badge,
      titleHead: text.titleHead,
      titleAccent: text.titleAccent,
      lead: text.lead,
      features: text.features.map((f, i) => ({ icon: meta.featureIcons[i], ...f })),
      waMessage: text.waMessage,
      ctaSecondary: { label: text.ctaSecondary, to: "alur" },
      stats: text.stats.map((s, i) => ({ icon: meta.statIcons[i], ...s })),
    };
  });
}
