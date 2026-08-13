import WaLink from "./WaLink";

const packageFeatures = {
  micro: [
    "Konsultasi gratis untuk skema & pemetaan produk",
    "Kaji bahan & supplier lengkap",
    "Flowchart produksi disusun",
    "1x audit + 1x audit pendampingan",
    "Tracking status via dashboard",
    "Pembuatan akun Sihalal",
    "Free Konsultasi",
  ],
  medium: [
    "1 Lokasi + 1 Outlet",
    "Dedicated halal officer",
    "Pelatihan tim internal",
    "Audit kesiapan pra-audit resmi",
  ],
  large: [
    "Semua di paket Menengah",
    "Semua di paket Mikro",
    "Pre Audit ke seluruh lokasi/outlet",
  ],
} as const;

const categories = [
  {
    name: "Produk",
    description:
      "Makanan, minuman, kosmetik, produk kimiawi, produk biologi, barang gunaan, rekayasa genetika",
    packages: [
      { lbl: "Mikro/Kecil", name: "Mikro/Kecil", price: "Rp5.000.000", unit: "/ sekali bayar", feat: false, feats: packageFeatures.micro },
      { lbl: "Menengah", name: "Menengah", price: "Mulai dari Rp20.000.000", unit: "/ sekali bayar", feat: true, feats: packageFeatures.medium },
      { lbl: "Besar", name: "Besar", price: "Mulai dari Rp30.000.000", unit: "/ sekali bayar", feat: false, feats: packageFeatures.large },
    ],
  },
  {
    name: "Jasa",
    description:
      "Penyembelihan, pendistribusian, penyimpanan, pengolahan, pengemasan, penyajian, penjualan",
    packages: [
      { lbl: "Mikro/Kecil", name: "Mikro/Kecil", price: "Mulai dari Rp8.000.000", unit: "/ sekali bayar", feat: false, feats: packageFeatures.micro },
      { lbl: "Menengah", name: "Menengah", price: "Mulai dari Rp25.000.000", unit: "/ sekali bayar", feat: true, feats: packageFeatures.medium },
      { lbl: "Besar", name: "Besar", price: "Mulai dari Rp33.000.000", unit: "/ sekali bayar", feat: false, feats: packageFeatures.large },
    ],
  },
];

export default function Packages() {
  return (
    <section className="section" id="paket" data-service="neutral">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Pilih yang pas</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Harga jujur, tidak ada biaya yang ngumpet.
            </h2>
          </div>
        </div>

        {categories.map((category) => (
          <div className="pkg-category" key={category.name}>
            <div className="pkg-category__head">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div className="pkg-grid">
              {category.packages.map((p) => (
                <article className={`pkg${p.feat ? " pkg--feat" : ""}`} key={`${category.name}-${p.name}`}>
                  <span className="pkg__lbl">{p.lbl}</span>
                  <h3>{p.name}</h3>
                  <div className="pkg__price">
                    {p.price}
                    <br />
                    <small>{p.unit}</small>
                  </div>
                  <ul>
                    {p.feats.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <WaLink
                    className={`btn ${p.feat ? "btn--solid" : "btn--ghost"}`}
                    message={`Halo, saya tertarik dengan paket ${category.name} ${p.name}. Boleh minta penjelasannya?`}
                  >
                    Pilih {p.name}
                  </WaLink>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
