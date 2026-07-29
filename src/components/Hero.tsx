import ScrollLink from "./ScrollLink";
import WaLink from "./WaLink";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden />
      <div className="hero__overlay" aria-hidden />
      <div className="wrap hero__inner">
        <div>
          <div className="hero__meta">
            <span>
              <span className="dot" /> Sejak 2022 · Jakarta
            </span>
          </div>

          <h1 className="h-display hero__copy">
            Urus Sertifikasi Halal <em>Jadi Lebih Mudah</em>
          </h1>

          <div className="hero__sub">
            <WaLink className="btn btn--solid">
              Mulai konsultasi gratis
            </WaLink>
            <ScrollLink to="proses" className="btn btn--ghost">
              Lihat alurnya
            </ScrollLink>
          </div>
          <p className="hero__tag">
            Pendamping sertifikasi halal untuk UMKM sampai korporasi.
          </p>
        </div>

        <aside className="hero__side">
          <div className="stat">
            <span className="stat__num">200+</span>
            <span className="stat__lbl">produk sudah kami sertifikasi halal</span>
          </div>
          <div className="stat">
            <span className="stat__num">30 hari</span>
            <span className="stat__lbl">rata-rata audit sampai terbit, untuk UMKM</span>
          </div>
          <div className="stat">
            <span className="stat__num">98%</span>
            <span className="stat__lbl">pengajuan lolos pada verifikasi pertama</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
