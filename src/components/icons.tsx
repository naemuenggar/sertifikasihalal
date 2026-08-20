/**
 * Logo Urushalal + bendera untuk language switcher — lambang yang tidak punya
 * padanan di lucide-react. Ikon UI lainnya wajib diambil dari lucide supaya
 * grid, stroke, dan berat optisnya seragam.
 *
 * Logo memakai file gambar di public/images/logo. Bendera digambar sebagai
 * SVG inline, bukan emoji — Windows tidak merender emoji bendera (yang muncul
 * cuma huruf "ID"/"GB"), jadi tampilannya tidak bisa diandalkan di sebagian
 * besar desktop pengunjung.
 */

type IconProps = {
  className?: string;
  size?: number;
};

/** Logo resmi Urushalal. File-nya JPG — tanpa transparansi, jadi kalau latar
 *  logo bukan terang, ganti file-nya dengan PNG transparan (path sama). */
export function LogoMark({ className, size = 30 }: IconProps) {
  return (
    <img
      className={className ? `logo-mark ${className}` : "logo-mark"}
      src="/images/logo/logo.jpg"
      alt=""
      width={size}
      height={size}
    />
  );
}

/** Bendera Indonesia — dua pita merah di atas putih. */
export function FlagId({ className, size = 22 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 24 16"
      aria-hidden
    >
      <rect width="24" height="8" fill="#E70011" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
    </svg>
  );
}

/** Bendera Inggris (Union Jack) versi sederhana — tetap dikenali di ukuran
 *  kecil tanpa harus menggambar diagonal offset versi resminya. */
export function FlagGb({ className, size = 22 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 24 16"
      aria-hidden
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="3.2" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.1" />
      <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="5.4" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3.2" />
    </svg>
  );
}

export function WhatsApp({ size = 28, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.24 8.22z" />
    </svg>
  );
}
