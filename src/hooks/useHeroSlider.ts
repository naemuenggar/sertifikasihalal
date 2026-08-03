import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

/** Jeda auto-slide. Cukup lama untuk membaca badge + judul + lead sekali baca. */
export const HERO_AUTOPLAY_MS = 7000;

/** Geser minimum sebelum swipe dihitung sebagai ganti slide — di bawah ini
 *  biasanya cuma tap yang meleset atau awal scroll vertikal. */
const SWIPE_THRESHOLD_PX = 48;

interface HeroSlider {
  index: number;
  goTo: (target: number) => void;
  step: (dir: 1 | -1) => void;
  /** Auto-slide sedang berjalan — dipakai untuk animasi progres di dot. */
  isAutoplaying: boolean;
  pause: () => void;
  resume: () => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

/**
 * State + kendali slider hero: auto-slide, panah, dot, swipe, dan panah keyboard.
 * Auto-slide mati sendiri kalau pengunjung menyetel `prefers-reduced-motion`,
 * dan berhenti selama kursor/fokus masih di dalam hero.
 */
export function useHeroSlider(total: number): HeroSlider {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (target: number) => setIndex(((target % total) + total) % total),
    [total],
  );

  const step = useCallback(
    (dir: 1 | -1) => setIndex((current) => (current + dir + total) % total),
    [total],
  );

  const isAutoplaying = total > 1 && !isPaused && !prefersReducedMotion;

  // Timer diikat ke `index`: begitu pengunjung ganti slide manual, hitungannya
  // mulai dari nol lagi — bukan meneruskan sisa jeda slide sebelumnya.
  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = window.setTimeout(() => step(1), HERO_AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [isAutoplaying, index, step]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start === null) return;

      const delta = (event.changedTouches[0]?.clientX ?? start) - start;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      step(delta < 0 ? 1 : -1);
    },
    [step],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "ArrowRight") step(1);
      else return;
      // Hero tidak bisa di-scroll horizontal, jadi panahnya aman diambil alih.
      event.preventDefault();
    },
    [step],
  );

  return { index, goTo, step, isAutoplaying, pause, resume, onTouchStart, onTouchEnd, onKeyDown };
}
