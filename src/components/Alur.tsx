import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type Stage = {
  title: string;
  /** Siapa yang mengerjakan tahap ini. Pertanyaan pertama calon klien. */
  actor: string;
  /** Tandai kalau tahap ini butuh kerja dari pihak klien, bukan cuma kami. */
  needsYou?: boolean;
  /** Hanya diisi kalau angkanya sudah pasti — jangan dikarang. Kosong = tidak
   *  ditampilkan sama sekali, lebih baik daripada estimasi yang meleset. */
  duration?: string;
  desc: string;
};

type Path = {
  id: string;
  label: string;
  /** Kalimat pembeda supaya orang tahu jalur ini buat siapa, sebelum mengklik. */
  hint: string;
  stages: Stage[];
};

const paths: Path[] = [
  {
    id: "reguler",
    label: "Produksi di Indonesia",
    hint: "Belum punya sertifikat halal, atau produksi di dalam negeri. Ada audit ke lokasi.",
    stages: [
      {
        title: "Konsultasi Gratis",
        actor: "Urushalal",
        duration: "Maks. 24 jam",
        desc: "Kami tinjau produk dan negara asal produksi Anda, lalu konfirmasikan jalur sertifikasi yang paling tepat berikut perkiraan waktu dan estimasi biayanya.",
      },
      {
        title: "Penyiapan Dokumentasi",
        actor: "Anda + Urushalal",
        needsYou: true,
        desc: "Sertifikat GMP, deklarasi bahan baku, desain kemasan, dan dokumen pendukung lainnya kami siapkan bersama Anda sampai lengkap.",
      },
      {
        title: "Pendaftaran SIHALAL & Audit",
        actor: "LPH",
        desc: "Permohonan diajukan lewat sistem SIHALAL milik BPJPH. Auditor dari Lembaga Pemeriksa Halal terakreditasi memeriksa langsung ke fasilitas produksi Anda.",
      },
      {
        title: "Fatwa MUI",
        actor: "MUI",
        desc: "Hasil audit ditinjau Komisi Fatwa Majelis Ulama Indonesia. Fatwa halal ini syarat keagamaan yang diwajibkan undang-undang.",
      },
      {
        title: "Penerbitan Sertifikat",
        actor: "BPJPH",
        duration: "Berlaku permanen",
        desc: "BPJPH menerbitkan Sertifikat Halal Indonesia resmi. Kepatuhan tetap dievaluasi berkala setiap 4 tahun — kami bantu pantau dan urus pembaruannya.",
      },
    ],
  },
  {
    id: "luar-negeri",
    label: "Sudah punya sertifikat luar negeri",
    hint: "Lembaga penerbitnya punya perjanjian MRA dengan BPJPH. Tanpa audit ulang.",
    stages: [
      {
        title: "Konsultasi & Cek Kelayakan MRA",
        actor: "Urushalal",
        duration: "Maks. 24 jam",
        desc: "Kami verifikasi apakah lembaga penerbit sertifikat Anda punya perjanjian saling pengakuan (MRA) dengan BPJPH.",
      },
      {
        title: "Penyiapan Berkas Sertifikat",
        actor: "Anda + Urushalal",
        needsYou: true,
        desc: "Sertifikat halal yang sudah Anda miliki beserta dokumen pendukungnya kami rapikan sesuai ketentuan BPJPH. Syaratnya, sertifikat terbit dari lembaga di negara tempat produk diproduksi.",
      },
      {
        title: "Registrasi ke BPJPH",
        actor: "BPJPH",
        desc: "Sertifikat didaftarkan ke sistem BPJPH untuk mendapat pengakuan resmi di Indonesia. Tanpa audit ulang ke fasilitas produksi, jadi jauh lebih cepat dan hemat biaya.",
      },
    ],
  },
];

/** Node di baris pertama. Sisanya turun ke baris kedua. */
const ROW1 = 3;

/**
 * Posisi node di grid ular 5 kolom. Baris 1 menempati kolom ganjil (1,3,5),
 * baris 2 kolom genap (4,2) — jadi node baris bawah jatuh di sela node baris
 * atas dan jalurnya berkelok, bukan sekadar dua baris sejajar.
 *
 *   kol:  1     2     3     4     5
 *   bar1: ①          ②          ③
 *   bar2:       ⑤          ④
 *
 * Bentuk ini mengasumsikan maksimal 5 tahap (3 + 2). Kalau nanti tahapnya
 * bertambah, penempatannya harus dihitung ulang — bukan sekadar menambah data.
 */
function snakeCell(i: number, total: number) {
  const isRow1 = i < ROW1;
  const row = isRow1 ? 1 : 2;
  const col = isRow1 ? i * 2 + 1 : 4 - (i - ROW1) * 2;

  const isLast = i === total - 1;
  const dir = isLast
    ? "none"
    : i === ROW1 - 1
      ? "elbow" // pindah baris: turun dulu, baru belok kiri
      : isRow1
        ? "right"
        : "left";

  return { row, col, dir };
}

function Badges({ stage }: { stage: Stage }) {
  return (
    <div className="flow__meta">
      <span className={`flow__actor${stage.needsYou ? " flow__actor--you" : ""}`}>
        {stage.actor}
      </span>
      {stage.duration && <span className="flow__dur">{stage.duration}</span>}
    </div>
  );
}

export default function Alur() {
  const [activeId, setActiveId] = useState(paths[0].id);
  const [detailIdx, setDetailIdx] = useState(0);
  // Ular butuh tiga kolom untuk terbaca; di bawah ini strukturnya memang beda,
  // bukan cuma gayanya — makanya pakai matchMedia, bukan media query CSS.
  const isWide = useMediaQuery("(min-width: 900px)");

  const active = paths.find((p) => p.id === activeId) ?? paths[0];
  const detail = active.stages[detailIdx] ?? active.stages[0];

  const selectPath = (id: string) => {
    setActiveId(id);
    setDetailIdx(0);
  };

  return (
    <section className="section alur" id="alur">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Alur</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Alurnya beda, tergantung dari mana produk Anda.
            </h2>
          </div>
        </div>
        <p className="lead" style={{ marginBottom: "clamp(1.6rem,3vw,2.2rem)" }}>
          Kami tidak menjanjikan “cepat instan”. Yang kami jaga: setiap tahap
          tuntas tanpa bolak-balik dokumen, dan Anda tahu posisi pengajuan setiap saat.
        </p>

        <div className="paths" role="tablist" aria-label="Pilih jalur sertifikasi">
          {paths.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`path-tab-${p.id}`}
              aria-selected={p.id === activeId}
              aria-controls={`path-panel-${p.id}`}
              className={`paths__btn${p.id === activeId ? " paths__btn--on" : ""}`}
              onClick={() => selectPath(p.id)}
            >
              <span className="paths__label">{p.label}</span>
              <span className="paths__hint">{p.hint}</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`path-panel-${active.id}`}
          aria-labelledby={`path-tab-${active.id}`}
        >
          <p className="flow__count">
            {active.stages.length} tahap
            {active.id === "luar-negeri" && " — lebih ringkas karena audit lapangan dilewati"}
          </p>

          {isWide ? (
            <>
              {/* key memaksa remount saat jalur berganti supaya animasi masuknya
                  jalan lagi dan pembaca sadar isinya berubah. */}
              <ol className="snake" key={active.id}>
                {active.stages.map((s, i) => {
                  const { row, col, dir } = snakeCell(i, active.stages.length);
                  return (
                    <li
                      className="snake__cell"
                      key={s.title}
                      data-dir={dir}
                      style={{ gridRow: row, gridColumn: col, ["--i" as string]: i }}
                    >
                      <button
                        type="button"
                        className={`snake__node${i === detailIdx ? " snake__node--on" : ""}`}
                        aria-expanded={i === detailIdx}
                        aria-controls="flow-detail"
                        onMouseEnter={() => setDetailIdx(i)}
                        onFocus={() => setDetailIdx(i)}
                        onClick={() => setDetailIdx(i)}
                      >
                        <span className="snake__marker">{i + 1}</span>
                        <span className="snake__title">{s.title}</span>
                        <Badges stage={s} />
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* Panel tetap di bawah ular, bukan popover melayang: isinya
                  berganti tanpa menggeser layout dan tanpa menutupi node lain. */}
              <div className="detail" id="flow-detail" role="region" aria-label="Detail tahap">
                <span className="detail__step">Tahap {detailIdx + 1}</span>
                <h3>{detail.title}</h3>
                <p>{detail.desc}</p>
              </div>
            </>
          ) : (
            <ol className="flow" key={active.id}>
              {active.stages.map((s, i) => (
                <li className="flow__step" key={s.title}>
                  <span className="flow__marker" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="flow__body">
                    <h3>{s.title}</h3>
                    <Badges stage={s} />
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
