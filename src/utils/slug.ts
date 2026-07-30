/** Ubah judul menjadi slug URL yang aman (huruf kecil, tanda hubung). */
export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
