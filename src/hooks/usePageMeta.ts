import { useEffect } from "react";

/** Set judul dokumen per halaman (tab browser). */
export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

/**
 * Tandai halaman agar tidak diindeks mesin pencari (noindex, nofollow).
 * Dipakai di halaman admin & login rahasia — meta dihapus lagi saat pindah
 * halaman supaya halaman publik tetap bisa diindeks normal.
 */
export function useNoIndex() {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");
    return () => {
      if (created && meta) meta.remove();
      else meta?.setAttribute("content", "index, follow");
    };
  }, []);
}
