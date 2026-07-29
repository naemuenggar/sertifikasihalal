import { useEffect, useState } from "react";
import { TriangleAlert, X } from "lucide-react";
import WaLink from "./WaLink";

const SESSION_KEY = "urushalal-deadline-modal-dismissed";

export default function HalalDeadlineModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), 9000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="deadline-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div
        className="deadline-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deadline-modal-title"
        aria-describedby="deadline-modal-description"
      >
        <button
          type="button"
          className="deadline-modal__close"
          onClick={dismiss}
          aria-label="Tutup peringatan"
        >
          <X size={20} strokeWidth={1.8} />
        </button>

        <span className="deadline-modal__icon" aria-hidden="true">
          <TriangleAlert size={38} strokeWidth={1.8} />
        </span>
        <h2 id="deadline-modal-title">Jangan lewatkan batas waktu 17 Oktober 2026!</h2>
        <p id="deadline-modal-description">
          Anda berisiko kehilangan akses ke lebih dari 200 juta konsumen Muslim
          di Indonesia, dan dapat dikenakan sanksi dari BPJPH/pemerintah — mulai
          dari larangan impor, penarikan produk dari pasar, hingga denda
          administratif.
        </p>
        <WaLink className="deadline-modal__cta" onClick={dismiss}>
          Konsultasi Gratis
        </WaLink>
      </div>
    </div>
  );
}
