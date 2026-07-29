import { useState } from "react";
import { LogoMark } from "./icons";

const navItems = [
  { id: "artikel", label: "Artikel" },
  { id: "layanan", label: "Layanan" },
  { id: "proses", label: "Proses" },
  { id: "paket", label: "Paket" },
  { id: "faq", label: "FAQ" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="site-header" data-open={open}>
      <div className="wrap site-header__inner">
        <button
          type="button"
          className="brand"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Urushalal beranda"
        >
          <LogoMark className="brand__mark" />
          Urushalal
        </button>

        <nav className="nav" aria-label="Utama">
          {navItems.map((n) => (
            <button key={n.id} type="button" onClick={() => go(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="header-cta">
          <button type="button" className="btn btn--ghost" onClick={() => go("kontak")}>
            Masuk
          </button>
          <button type="button" className="btn btn--solid" onClick={() => go("kontak")}>
            Konsultasi gratis
          </button>
          <button
            className="menu-btn"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="mobile-menu" data-open={open}>
        <div className="wrap mobile-menu__inner">
          <nav className="mobile-nav" aria-label="Mobile">
            {navItems.map((n) => (
              <button
                key={n.id}
                type="button"
                className="mobile-nav__item"
                onClick={() => go(n.id)}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="mobile-menu__cta">
            <button type="button" className="btn btn--solid" onClick={() => go("kontak")}>
              Konsultasi gratis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
