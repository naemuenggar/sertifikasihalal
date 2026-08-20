import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircleQuestion, Send, X } from "lucide-react";
import { LIMITS } from "../lib/limits";
import { WhatsApp } from "./icons";
import { WA_NUMBER } from "../utils/contact";
import { submitContact } from "../lib/contact";
import { useLanguage } from "../i18n/LanguageContext";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Tombol "More Info" mengambang di pojok kanan bawah semua halaman publik.
 * Klik → panel berisi (1) tombol Chat via WhatsApp dan (2) form kontak singkat
 * yang tersimpan ke tabel `contact_messages`.
 */
export default function MoreInfoFab() {
  const { t } = useLanguage();
  /** Link WA dengan pesan pembuka otomatis (nomor satu sumber dari utils/contact). */
  const waMoreInfo = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.moreInfo.waMessage)}`;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // Tutup panel saat klik di luar atau tekan Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const reset = () => {
    setName("");
    setContact("");
    setMessage("");
    setStatus("idle");
    setErrMsg("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrMsg("");
    const res = await submitContact({
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
    });
    if (res.ok) {
      setStatus("ok");
      setName("");
      setContact("");
      setMessage("");
    } else {
      setStatus("error");
      setErrMsg(res.code ? t.moreInfo.errors[res.code] : t.moreInfo.errors.failed);
    }
  };

  return (
    <div className="moreinfo" ref={rootRef}>
      {open && (
        <div className="moreinfo__panel" role="dialog" aria-label={t.moreInfo.panelLabel}>
          <div className="moreinfo__head">
            <div>
              <strong>{t.moreInfo.heading}</strong>
              <span>{t.moreInfo.sub}</span>
            </div>
            <button
              type="button"
              className="moreinfo__close"
              onClick={() => setOpen(false)}
              aria-label={t.moreInfo.close}
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>

          <a
            className="moreinfo__wa"
            href={waMoreInfo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp size={20} />
            {t.moreInfo.chatWa}
          </a>

          <div className="moreinfo__divider">
            <span>{t.moreInfo.divider}</span>
          </div>

          {status === "ok" ? (
            <div className="moreinfo__success">
              <p>{t.moreInfo.success}</p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
                {t.moreInfo.sendAnother}
              </button>
            </div>
          ) : (
            <form className="moreinfo__form" onSubmit={handleSubmit}>
              <input
                className="field"
                placeholder={t.moreInfo.namePh}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={LIMITS.contactName}
                autoComplete="name"
                required
              />
              <input
                className="field"
                placeholder={t.moreInfo.contactPh}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={LIMITS.contactContact}
                required
              />
              <textarea
                className="field"
                placeholder={t.moreInfo.messagePh}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={LIMITS.contactMessage}
                required
              />
              {status === "error" && <p className="moreinfo__err">{errMsg}</p>}
              <button
                type="submit"
                className="btn btn--solid btn--sm"
                disabled={status === "sending"}
              >
                <Send size={15} strokeWidth={1.8} />
                {status === "sending" ? t.moreInfo.sending : t.moreInfo.send}
              </button>
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        className="moreinfo__fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.moreInfo.fabLabel}
      >
        <MessageCircleQuestion size={26} strokeWidth={1.8} />
      </button>
    </div>
  );
}
