import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MoreInfoFab from "./MoreInfoFab";
import HalalDeadlineModal from "./HalalDeadlineModal";
import { useLanguage } from "../i18n/LanguageContext";

/** Kerangka halaman publik: header + konten rute + footer + FAB "More Info".
 *  Dipakai semua halaman depan; area admin punya layout sendiri. */
export default function Layout() {
  const { t } = useLanguage();
  return (
    <>
      <a href="#main" className="sr-only" style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}>
        {t.common.skipToContent}
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <HalalDeadlineModal />
      <MoreInfoFab />
    </>
  );
}
