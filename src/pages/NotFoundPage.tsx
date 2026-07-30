import { Link } from "react-router-dom";
import { LogoMark } from "../components/icons";
import { usePageTitle, useNoIndex } from "../hooks/usePageMeta";

/** Halaman 404. Juga dipakai oleh guard admin: route /admin/* yang diakses
 *  tanpa login menampilkan ini, supaya orang luar tidak tahu route admin ada. */
export default function NotFoundPage() {
  usePageTitle("Halaman tidak ditemukan — Urushalal");
  useNoIndex();

  return (
    <section className="notfound">
      <div className="wrap notfound__inner">
        <LogoMark className="notfound__mark" size={44} />
        <span className="notfound__code">404</span>
        <h1 className="h-display">Halaman tidak ditemukan.</h1>
        <p className="lead">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <Link to="/" className="btn btn--solid">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
