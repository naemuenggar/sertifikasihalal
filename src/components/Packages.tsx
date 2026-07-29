import SpecularButton from "./SpecularButton/SpecularButton";
import { WA_LINK } from "../utils/contact";

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

const openWa = () => window.open(WA_LINK, "_blank", "noopener,noreferrer");

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

              <SpecularButton
                size="lg"
                radius={12}
                tint="#F2F2F2"
                tintOpacity={1}
                blur={0}
                textColor="#1a1a1a"
                lineColor="#00ffc3"
                baseColor="#d4d4d4"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={1.05}
                followMouse={true}
                proximity={250}
                autoAnimate
                onClick={openWa}
              >
                Pilih {p.name}
              </SpecularButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
