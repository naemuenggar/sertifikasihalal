import type { ReactNode } from "react";

type Props = {
  progress: number;
  ratio: number;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  /** Track yang bisa di-scroll horizontal. Panah dipasang di tepi kiri-kanannya. */
  children: ReactNode;
};

export default function Carousel({
  progress,
  ratio,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  children,
}: Props) {
  const thumb = Math.min(100, Math.max(14, ratio * 100));
  const left = progress * (100 - thumb);

  return (
    <>
      <div className="carousel-frame">
        {children}

        <button
          type="button"
          className="carousel-arrow carousel-arrow--prev"
          onClick={onPrev}
          aria-label={prevLabel}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          className="carousel-arrow carousel-arrow--next"
          onClick={onNext}
          aria-label={nextLabel}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="carousel-ctrl">
        <div className="carousel-ctrl__rail" aria-hidden="true">
          <span
            className="carousel-ctrl__thumb"
            style={{ width: `${thumb}%`, left: `${left}%` }}
          />
        </div>
      </div>
    </>
  );
}
