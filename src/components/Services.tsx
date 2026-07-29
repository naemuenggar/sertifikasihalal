import {
  Award,
  ClipboardCheck,
  FileText,
  MessagesSquare,
  PackageSearch,
  type LucideIcon,
} from "lucide-react";
import Carousel from "./Carousel";
import { useCarousel } from "../hooks/useCarousel";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
};

const services: Service[] = [
  {
    icon: MessagesSquare,
    title: "Konsultasi Awal",
    desc: "Kami petakan jenis produk, bahan, dan proses Anda untuk menentukan skema sertifikasi yang paling pas.",
    tag: "Fase persiapan",
  },
  {
    icon: FileText,
    title: "Penyusunan Dokumen",
    desc: "Formulir Pendaftaran Halal (Reg-01), daftar bahan, flowchart produksi—kami susun rapi sampai siap verifikasi.",
    tag: "BPJPH",
  },
  {
    icon: ClipboardCheck,
    title: "Pendampingan Audit",
    desc: "Auditor LPH datang ke lokasi. Kami dampingi dari sisi teknis supaya audit jalan satu kali jalan.",
    tag: "Lapangan",
  },
  {
    icon: Award,
    title: "Penerbitan Sertifikat",
    desc: "Hasil audit kami pantau sampai Fatwa MUI keluar dan sertifikat halal resmi terbit di portal SiHALAL.",
    tag: "Penyelesaian",
  },
  {
    icon: PackageSearch,
    title: "Kaji Bahan & Supplier",
    desc: "Cek status halal setiap bahan dan supplier agar rantai pasok Anda terdokumentasi dan tidak bermasalah saat audit.",
    tag: "Due diligence",
  },
];

export default function Services() {
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(".svc-carousel__card");

  return (
    <section className="section" id="layanan">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Apa yang kami urus</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Dari niat sampai sertifikat terbit, satu pintu.
            </h2>
          </div>
        </div>

        <Carousel
          progress={progress}
          ratio={ratio}
          onPrev={() => slide(-1)}
          onNext={() => slide(1)}
          prevLabel="Kartu sebelumnya"
          nextLabel="Kartu berikutnya"
        >
          <div className="svc-carousel" ref={trackRef}>
            {services.map(({ icon: Icon, title, desc, tag }) => (
              <article className="svc svc-carousel__card" key={title}>
                <span className="svc__icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="svc__tag">{tag}</span>
              </article>
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
