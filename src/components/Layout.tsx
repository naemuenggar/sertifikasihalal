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
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <HalalDeadlineModal />
      <MoreInfoFab />
    </>
  );
}
