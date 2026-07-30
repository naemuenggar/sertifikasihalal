import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getSupabase } from "../../lib/supabase";
import { useNoIndex } from "../../hooks/usePageMeta";
import NotFoundPage from "../NotFoundPage";
import { LogoMark } from "../../components/icons";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `admin__link${isActive ? " is-active" : ""}`;

/**
 * Kerangka area admin + guard autentikasi.
 *  - Belum login & mencoba akses /admin/* → tampilkan 404 (bukan redirect ke
 *    login), supaya orang luar tidak tahu route admin itu ada.
 *  - Sudah login → sidebar (Dashboard, Kelola Berita, Pesan Masuk) + konten.
 *  - noindex,nofollow dipasang agar halaman admin tidak diindeks.
 */
export default function AdminLayout() {
  useNoIndex();
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const sb = getSupabase();
    await sb?.auth.signOut();
    navigate("/portal-admin", { replace: true });
  };

  if (loading) {
    return <div className="admin-loading">Memuat…</div>;
  }

  if (!session) return <NotFoundPage />;

  return (
    <div className="admin">
      <aside className="admin__side">
        <div className="admin__brand">
          <LogoMark size={26} />
          <span>
            Urushalal <em>Admin</em>
          </span>
        </div>

        <nav className="admin__nav" aria-label="Admin">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/berita" className={navLinkClass}>
            Kelola Berita
          </NavLink>
          <NavLink to="/admin/pesan" className={navLinkClass}>
            Pesan Masuk
          </NavLink>
        </nav>

        <div className="admin__foot">
          <Link to="/" className="admin__foot-link">
            Lihat situs
          </Link>
          <button type="button" className="admin__foot-link" onClick={logout}>
            Keluar
          </button>
        </div>
      </aside>

      <div className="admin__main">
        <Outlet />
      </div>
    </div>
  );
}
