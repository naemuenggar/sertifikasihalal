import { useSyncExternalStore } from "react";

/** Media query sebagai state React. Dipakai kalau dua breakpoint butuh struktur
 *  DOM yang benar-benar beda — bukan sekadar beda gaya. Kalau cuma beda tata
 *  letak, pakai CSS saja, jangan hook ini. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      // Sengaja dobel: sebagian lingkungan (emulasi viewport devtools, beberapa
      // webview) mengubah lebar tanpa pernah mengirim event `change`, dan
      // layoutnya jadi macet di breakpoint lama. `resize` selalu terkirim.
      // Callback berlebih tidak mahal — React hanya render ulang kalau nilai
      // snapshot-nya benar-benar berubah.
      window.addEventListener("resize", onChange);
      return () => {
        mql.removeEventListener("change", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
