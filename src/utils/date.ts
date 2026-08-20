/** Locale per bahasa situs — tanggal mengikuti konvensi bahasa aktif. */
type DateLang = "id" | "en";

const localeOf = (lang: DateLang) => (lang === "en" ? "en-US" : "id-ID");

/** Format tanggal ISO menjadi bentuk ringkas sesuai bahasa aktif,
 *  mis. "12 Jun 2026" (ID) / "Jun 12, 2026" (EN). Aman untuk nilai null/kosong. */
export function formatDate(
  value: string | null | undefined,
  lang: DateLang = "id",
): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(localeOf(lang), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Format tanggal + jam untuk log pesan masuk, mis. "12 Jun 2026, 14:05".
 *  Dipakai area admin — selalu Indonesia. */
export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
