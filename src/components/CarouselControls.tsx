type Props = {
  progress: number;
  ratio: number;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
};

export default function CarouselControls({
  progress,
  ratio,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: Props) {
  const thumb = Math.min(100, Math.max(14, ratio * 100));
  const left = progress * (100 - thumb);

  return (
    <div className="carousel-ctrl">
      <div className="carousel-ctrl__rail" aria-hidden="true">
        <span
          className="carousel-ctrl__thumb"
          style={{ width: `${thumb}%`, left: `${left}%` }}
        />
      </div>

      <div className="carousel-ctrl__btns">
        <button type="button" onClick={onPrev} aria-label={prevLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" onClick={onNext} aria-label={nextLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
