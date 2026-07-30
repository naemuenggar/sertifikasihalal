import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Atur posisi scroll saat pindah rute:
 *  - ada hash (mis. `/#alur`, `/#faq`) → scroll
 *    ke elemen ber-id tersebut;
 *  - tanpa hash → kembali ke atas halaman.
 * Memakai requestAnimationFrame agar elemen tujuan sudah ter-render.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}
