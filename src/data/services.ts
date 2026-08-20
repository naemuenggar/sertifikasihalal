/**
 * Data 5 layanan Urushalal — satu sumber untuk halaman /layanan (tabel),
 * halaman detail /layanan/[slug], preview di beranda, dan link footer.
 * Teks (name/shortDesc/article) disimpan di src/i18n per bahasa; file ini
 * hanya memegang slug (identitas bahasa-netral) + fungsi perakitnya.
 */

export const serviceSlugs = [
  "sertifikasi-halal-reguler",
  "registrasi-sertifikat-halal-luar-negeri",
  "registrasi-makanan-minuman-bpom",
  "registrasi-kosmetik-bpom",
  "registrasi-suplemen-kesehatan-bpom",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Tiga layanan BPOM yang di footer dikelompokkan di bawah "Izin Edar BPOM". */
export const bpomServiceSlugs = [
  "registrasi-makanan-minuman-bpom",
  "registrasi-kosmetik-bpom",
  "registrasi-suplemen-kesehatan-bpom",
] as const;

export type BpomServiceSlug = (typeof bpomServiceSlugs)[number];

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Deskripsi singkat untuk tabel & kartu preview. */
  shortDesc: string;
  /** Isi artikel singkat untuk halaman detail. */
  article: string;
};

/** Bentuk teks satu layanan per bahasa — diisi oleh src/i18n/{id,en}.ts. */
export type ServiceText = Record<
  ServiceSlug,
  { name: string; shortDesc: string; article: string }
>;

/** Semua layanan dengan teks bahasa aktif, urutan mengikuti serviceSlugs. */
export function getServices(items: ServiceText): Service[] {
  return serviceSlugs.map((slug) => ({ slug, ...items[slug] }));
}

export function getService(
  slug: string | undefined,
  items: ServiceText,
): Service | undefined {
  if (!slug || !(serviceSlugs as readonly string[]).includes(slug)) return undefined;
  const key = slug as ServiceSlug;
  return { slug: key, ...items[key] };
}
