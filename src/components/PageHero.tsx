import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
};

/** Kepala halaman untuk halaman internal (Layanan, Berita, Tentang Kami, dll).
 *  Gaya mengikuti hero/section yang sudah ada supaya tetap seragam. */
export default function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h-display page-hero__title">{title}</h1>
        {lead && <p className="lead page-hero__lead">{lead}</p>}
      </div>
    </section>
  );
}
