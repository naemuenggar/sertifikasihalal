import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  FileStack,
  Globe,
  Landmark,
  MessagesSquare,
  MousePointerClick,
  ScrollText,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLanguage } from "../i18n/LanguageContext";
import type { Translations } from "../i18n/id";

/** Jeda sebelum hover mengganti panel. Tanpa ini, kursor yang cuma melintas
 *  menuju node lain ikut memicu panel dan isinya terbaca berkedip. */
const HOVER_DELAY_MS = 120;

type Stage = Translations["flow"]["paths"]["reguler"]["stages"][number];

/** id jalur — dipakai untuk DOM id/tab, bukan untuk tampilan. */
const pathIds = ["reguler", "produksi-luar", "mra"] as const;
type PathId = (typeof pathIds)[number];

/** Ikon penanda tiap tahap (bahasa-netral). Dipilih dari isi tahapnya — bukan
 *  hiasan, jadi jangan diganti ke ikon yang cuma "kelihatan bagus" tapi tidak
 *  menggambarkan apa yang terjadi di tahap itu. Jalur audit dipakai dua kali:
 *  produksi di Indonesia dan di luar negeri melewati tahap yang persis sama. */
const auditIcons: LucideIcon[] = [MessagesSquare, FileStack, SearchCheck, ScrollText, BadgeCheck];
const mraIcons: LucideIcon[] = [Globe, FileCheck, Landmark];
const pathIcons: Record<PathId, LucideIcon[]> = {
  reguler: auditIcons,
  "produksi-luar": auditIcons,
  mra: mraIcons,
};

/** Indeks tahap yang butuh kerja dari pihak klien (bukan cuma kami) —
 *  di semua jalur tahap "Anda + Urushalal" sama-sama tahap ke-2. */
const NEEDS_YOU_INDEX = 1;

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

function Badges({ stage, needsYou }: { stage: Stage; needsYou: boolean }) {
  return (
    <div className="flow__meta">
      <span className={`flow__actor${needsYou ? " flow__actor--you" : ""}`}>
        {stage.actor}
      </span>
      {stage.duration && <span className="flow__dur">{stage.duration}</span>}
    </div>
  );
}

export default function Alur() {
  const { t } = useLanguage();
  const paths = pathIds.map((pid) => ({ id: pid, ...t.flow.paths[pid] }));

  const [activeId, setActiveId] = useState<PathId>(paths[0].id);
  // Dua state terpisah, bukan satu: klik mengunci tahap, hover cuma mengintip.
  // Kalau digabung, panel ikut berpindah setiap kursor lewat dan pilihan yang
  // sudah sengaja diklik ikut hilang.
  const [pinnedIdx, setPinnedIdx] = useState(0);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const hoverTimer = useRef<number | null>(null);
  // Ular butuh tiga kolom untuk terbaca; di bawah ini strukturnya memang beda,
  // bukan cuma gayanya — makanya pakai matchMedia, bukan media query CSS.
  const isWide = useMediaQuery("(min-width: 900px)");

  useEffect(
    () => () => {
      if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    },
    [],
  );

  const active = paths.find((p) => p.id === activeId) ?? paths[0];
  const detailIdx = previewIdx ?? pinnedIdx;
  const detail = active.stages[detailIdx] ?? active.stages[0];

  const cancelPreview = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const previewStage = (i: number) => {
    cancelPreview();
    hoverTimer.current = window.setTimeout(
      () => setPreviewIdx(i),
      HOVER_DELAY_MS,
    );
  };

  const endPreview = () => {
    cancelPreview();
    setPreviewIdx(null);
  };

  /** Klik dan keyboard mengunci langsung — tanpa jeda, dan tidak hilang waktu
   *  kursor pergi. Keduanya aksi yang disengaja, beda dari sekadar melintas. */
  const pinStage = (i: number) => {
    cancelPreview();
    setPreviewIdx(null);
    setPinnedIdx(i);
  };

  const selectPath = (id: PathId) => {
    setActiveId(id);
    cancelPreview();
    setPreviewIdx(null);
    setPinnedIdx(0);
  };

  return (
    <section className="section alur" id="alur" data-service="halal">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">{t.flow.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              {t.flow.title}
            </h2>
          </div>
        </div>
        <p className="lead" style={{ marginBottom: "clamp(1.6rem,3vw,2.2rem)" }}>
          {t.flow.lead}
        </p>

        <div className="paths" role="tablist" aria-label={t.flow.tablistLabel}>
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
            {t.flow.stageCount(active.stages.length)}
            {active.id === "mra" && t.flow.overseasNote}
          </p>

          {isWide ? (
            <>
              {/* Afordans hover tidak pernah cukup ditebak, jadi dinyatakan.
                  Node-nya sendiri sudah berbentuk kartu, ini penegasnya. */}
              <p className="snake__hint">
                <MousePointerClick size={16} strokeWidth={1.8} aria-hidden />
                {t.flow.snakeHint}
              </p>

              {/* key memaksa remount saat jalur berganti supaya animasi masuknya
                  jalan lagi dan pembaca sadar isinya berubah. */}
              <ol className="snake" key={active.id} onMouseLeave={endPreview}>
                {active.stages.map((s, i) => {
                  const { row, col, dir } = snakeCell(i, active.stages.length);
                  const DirectionIcon =
                    dir === "left" ? ChevronLeft : dir === "elbow" ? ChevronDown : ChevronRight;
                  const StageIcon = pathIcons[active.id][i];
                  return (
                    <li
                      className="snake__cell"
                      key={s.title}
                      data-dir={dir}
                      style={{ gridRow: row, gridColumn: col, ["--i" as string]: i }}
                    >
                      {dir !== "none" && (
                        <span className={`snake__arrow snake__arrow--${dir}`} aria-hidden="true">
                          <DirectionIcon size={14} strokeWidth={2.2} />
                        </span>
                      )}
                      <button
                        type="button"
                        className={`snake__node${i === detailIdx ? " snake__node--on" : ""}`}
                        aria-expanded={i === detailIdx}
                        aria-controls="flow-detail"
                        onMouseEnter={() => previewStage(i)}
                        onFocus={() => pinStage(i)}
                        onClick={() => pinStage(i)}
                      >
                        <span className="snake__marker" aria-hidden="true">
                          <StageIcon strokeWidth={1.7} />
                        </span>
                        {/* Nomornya hilang dari layar begitu diganti ikon —
                            dikembalikan ke pembaca layar supaya urutan tahapnya
                            tetap terdengar, bukan cuma terlihat. */}
                        <span className="sr-only">{t.flow.stepLabel(i + 1)}:</span>
                        <span className="snake__title">{s.title}</span>
                        <Badges stage={s} needsYou={i === NEEDS_YOU_INDEX} />
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* Panel tetap di bawah ular, bukan popover melayang: isinya
                  berganti tanpa menggeser layout dan tanpa menutupi node lain.
                  --col dipakai takik di tepi atas panel untuk menunjuk balik ke
                  node yang sedang dibaca — tanpa itu sebab dan akibatnya
                  terpisah jauh dan orang tidak menghubungkan keduanya. */}
              <div
                className="detail"
                id="flow-detail"
                role="region"
                aria-label={t.flow.detailLabel}
                style={{
                  ["--col" as string]: snakeCell(
                    detailIdx,
                    active.stages.length,
                  ).col,
                }}
              >
                <div className="detail__rail" aria-hidden />
                {/* key memaksa remount tiap tahap berganti supaya animasi
                    masuknya terputar ulang — itu yang memberitahu pembaca bahwa
                    kliknya menghasilkan sesuatu, bukan sekadar menyorot node. */}
                <div className="detail__body" key={`${active.id}-${detailIdx}`}>
                  <span className="detail__num" aria-hidden>
                    {String(detailIdx + 1).padStart(2, "0")}
                  </span>
                  <div className="detail__text">
                    <span className="detail__step">{t.flow.stepLabel(detailIdx + 1)}</span>
                    <h3>{detail.title}</h3>
                    <p>{detail.desc}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ol className="flow" key={active.id}>
              {active.stages.map((s, i) => {
                const StageIcon = pathIcons[active.id][i];
                return (
                  <li className="flow__step" key={s.title}>
                    <span className="flow__marker" aria-hidden="true">
                      <StageIcon strokeWidth={1.7} />
                    </span>
                    <div className="flow__body">
                      <h3>
                        <span className="sr-only">{t.flow.stepLabel(i + 1)}: </span>
                        {s.title}
                      </h3>
                      <Badges stage={s} needsYou={i === NEEDS_YOU_INDEX} />
                      <p>{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
