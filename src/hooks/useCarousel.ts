import { useCallback, useEffect, useRef, useState } from "react";

const EDGE = 4;

/**
 * Track horizontal-scroll untuk carousel kartu.
 * `ratio` = porsi track yang sedang terlihat, dipakai untuk lebar thumb progress.
 */
export function useCarousel<T extends HTMLElement>(cardSelector: string) {
  const trackRef = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const [ratio, setRatio] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setRatio(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
    setProgress(max > EDGE ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Amati track sekaligus satu kartu: lebar track tidak pernah berubah, jadi
    // observer yang hanya memantau track cuma menembak sekali — kadang sebelum
    // CSS kartu sempat diterapkan — dan tidak pernah dikoreksi lagi.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const card = el.querySelector(cardSelector);
    if (card) ro.observe(card);

    // Ukur langsung, lalu ulangi di frame berikutnya untuk cold load yang
    // style-nya baru mendarat setelah paint pertama.
    update();
    const raf = requestAnimationFrame(update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [update, cardSelector]);

  const slide = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;

      if (dir === -1 && el.scrollLeft <= EDGE) {
        el.scrollTo({ left: max, behavior: "smooth" });
        return;
      }
      if (dir === 1 && el.scrollLeft >= max - EDGE) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const card = el.querySelector<HTMLElement>(cardSelector);
      if (!card) return;
      const gap = parseFloat(getComputedStyle(el).gap) || 16;
      el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
    },
    [cardSelector]
  );

  return { trackRef, slide, progress, ratio };
}
