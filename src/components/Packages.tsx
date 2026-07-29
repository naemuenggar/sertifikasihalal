import ScrollLink from "./ScrollLink";

const packages = [
  {
    lbl: "Paling dipilih",
    name: "Bisnis",
    price: "4,5jt",
    unit: "/ lokasi · sekali bayar",
    feat: true,
    feats: [
      "Konsultasi gratis untuk skema & pemetaan produk",
      "Penyusunan dokumen Reg-01 sampai siap verifikasi",
      "Kaji bahan & supplier lengkap",
      "Flowchart produksi disusun",
      "2x audit lapangan didampingi + revisi",
      "Tracking status via dashboard",
      "Garansi lolos verifikasi pertama",
      "Pemeliharaan 1 tahun pasca-terbit",
      "Prioritas respons 1×24 jam",
    ],
  },
  {
    lbl: "Korporasi",
    name: "Enterprise",
    price: "Custom",
    unit: "/ multi-lokasi",
    feat: false,
    feats: [
      "Semua di paket Bisnis",
      "Multi-produk & multi-lokasi",
      "Dedicated halal officer",
      "Pelatihan tim internal",
      "Audit kesiapan pra-audit resmi",
      "SLA & kontrak tahunan",
    ],
  },
];

export default function Packages() {
  return (
    <section className="section" id="paket">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Pilih yang pas</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Harga jujur, tidak ada biaya yang ngumpet.
            </h2>
          </div>
          <ScrollLink to="kontak" className="section__link">
            Bandingkan detail
          </ScrollLink>
        </div>

        <div className="pkg-grid">
          {packages.map((p) => (
            <article className={`pkg${p.feat ? " pkg--feat" : ""}`} key={p.name}>
              <span className="pkg__lbl">{p.lbl}</span>
              <h3>{p.name}</h3>
              <div className="pkg__price">
                {p.price === "Custom" ? "Custom" : `Rp${p.price}`}
                {p.price !== "Custom" && <br />}
                <small>{p.unit}</small>
              </div>
              <ul>
                {p.feats.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <ScrollLink
                to="kontak"
                className={`btn ${p.feat ? "btn--solid" : "btn--ghost"}`}
              >
                Pilih {p.name}
              </ScrollLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
