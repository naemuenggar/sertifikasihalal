import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MoreInfoFab from "./MoreInfoFab";
import HalalDeadlineModal from "./HalalDeadlineModal";

/** Kerangka halaman publik: header + konten rute + footer + FAB "More Info".
 *  Dipakai semua halaman depan; area admin punya layout sendiri. */
export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only" style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}>
        Langsung ke konten utama
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
