/**
 * Operasi teks untuk toolbar editor berita — murni, tanpa menyentuh DOM.
 *
 * Semua fungsi menerima isi textarea + posisi kursor, lalu mengembalikan isi
 * baru beserta posisi kursor barunya. Komponen toolbar tinggal memasang hasil
 * itu ke state dan mengembalikan fokus. Dipisah ke sini supaya logika "di mana
 * tanda bintangnya disisipkan" bisa dibaca dan diuji tanpa merender apa pun.
 *
 * Semua aksi bersifat toggle: menekan tombol pada teks yang sudah berformat
 * akan melepas formatnya, bukan menumpuk tanda baru.
 */

export type EditResult = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

/** Teks contoh yang disisipkan saat tombol ditekan tanpa menyeleksi apa pun.
 *  Dibuat terseleksi supaya admin bisa langsung mengetik menimpanya. */
const PLACEHOLDER = "teks";

/**
 * Bungkus/lepas penanda di kiri-kanan seleksi — dipakai tebal (`**`),
 * miring (`*`), garis bawah (`<u>`), dan stabilo (`<mark>`).
 */
export function toggleWrap(
  value: string,
  start: number,
  end: number,
  open: string,
  close: string = open
): EditResult {
  const selected = value.slice(start, end);

  // Sudah terbungkus di dalam seleksi → buang penandanya.
  if (selected.startsWith(open) && selected.endsWith(close) && selected.length >= open.length + close.length) {
    const inner = selected.slice(open.length, selected.length - close.length);
    return {
      value: value.slice(0, start) + inner + value.slice(end),
      selectionStart: start,
      selectionEnd: start + inner.length,
    };
  }

  // Penandanya ada tepat di luar seleksi (admin menyeleksi kata saja, bukan
  // bintangnya) → buang juga, supaya tombolnya tetap terasa sebagai toggle.
  const before = value.slice(Math.max(0, start - open.length), start);
  const after = value.slice(end, end + close.length);
  if (before === open && after === close) {
    return {
      value: value.slice(0, start - open.length) + selected + value.slice(end + close.length),
      selectionStart: start - open.length,
      selectionEnd: end - open.length,
    };
  }

  const body = selected || PLACEHOLDER;
  return {
    value: value.slice(0, start) + open + body + close + value.slice(end),
    selectionStart: start + open.length,
    selectionEnd: start + open.length + body.length,
  };
}

/** Pola penanda awal baris yang dikenali sebagai "sudah berformat". */
const LINE_PATTERNS: Record<string, RegExp> = {
  "## ": /^#{1,6} /,
  "### ": /^#{1,6} /,
  "- ": /^([-*+] |\d+\. )/,
  "1. ": /^([-*+] |\d+\. )/,
  "> ": /^> /,
};

/**
 * Pasang/lepas penanda di awal setiap baris yang tersentuh seleksi — dipakai
 * subjudul, daftar, dan kutipan. Untuk daftar bernomor, nomornya diurutkan
 * ulang otomatis.
 */
export function toggleLinePrefix(value: string, start: number, end: number, prefix: string): EditResult {
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const lineEndIdx = value.indexOf("\n", end);
  const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;

  const block = value.slice(lineStart, lineEnd);
  const lines = block.split("\n");
  const pattern = LINE_PATTERNS[prefix] ?? new RegExp(`^${escapeRegExp(prefix)}`);

  // Kalau semua baris berisi sudah memakai penanda yang sama persis → lepas.
  const isSame = (line: string) => (prefix === "1. " ? /^\d+\. /.test(line) : line.startsWith(prefix));
  const filled = lines.filter((l) => l.trim() !== "");
  const shouldRemove = filled.length > 0 && filled.every(isSame);

  let counter = 0;
  const nextLines = lines.map((line) => {
    if (line.trim() === "") return line;
    const bare = line.replace(pattern, "");
    if (shouldRemove) return bare;
    counter += 1;
    return (prefix === "1. " ? `${counter}. ` : prefix) + bare;
  });

  const nextBlock = nextLines.join("\n");
  return {
    value: value.slice(0, lineStart) + nextBlock + value.slice(lineEnd),
    selectionStart: lineStart,
    selectionEnd: lineStart + nextBlock.length,
  };
}

/**
 * Sisipkan tautan. Teks yang sedang diseleksi jadi label; bagian URL-nya yang
 * dibuat terseleksi supaya admin tinggal menempel alamatnya.
 */
export function insertLink(value: string, start: number, end: number, url = "https://"): EditResult {
  const label = value.slice(start, end) || PLACEHOLDER;
  const snippet = `[${label}](${url})`;
  const urlStart = start + label.length + 3;
  return {
    value: value.slice(0, start) + snippet + value.slice(end),
    selectionStart: urlStart,
    selectionEnd: urlStart + url.length,
  };
}

/**
 * Sisipkan gambar sebagai blok tersendiri. Markdown butuh baris kosong di
 * sekelilingnya, kalau tidak gambarnya menempel jadi bagian paragraf sebelah.
 * Teks alt-nya dibuat terseleksi karena wajib diisi — pembaca layar dan mesin
 * pencari membacanya, dan itu yang tampil kalau gambarnya gagal dimuat.
 */
export function insertImage(value: string, start: number, end: number, url: string, alt = "Keterangan gambar"): EditResult {
  const before = value.slice(0, start);
  const after = value.slice(end);
  const lead = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
  const tail = after.startsWith("\n") ? "" : "\n";
  const snippet = `${lead}![${alt}](${url})\n${tail}`;
  const altStart = start + lead.length + 2;
  return {
    value: before + snippet + after,
    selectionStart: altStart,
    selectionEnd: altStart + alt.length,
  };
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ====================== Merapikan paragraf ======================
 * Berita yang ditulis sebelum satu Enter berfungsi tersimpan sebagai satu
 * blok panjang: seluruh isinya jadi satu paragraf, jarak antar-paragrafnya
 * tidak ada, dan subjudulnya cuma baris teks biasa. Fungsi di bawah memberi
 * baris kosong di antara paragraf supaya tiap paragraf berdiri sendiri.
 *
 * Yang TIDAK boleh disisipi baris kosong, karena baris kosong di situ justru
 * merusak strukturnya:
 *   - butir daftar berurutan — baris kosong mengubahnya jadi daftar renggang
 *     yang tiap butirnya dibungkus paragraf sendiri
 *   - baris kutipan berurutan — kutipannya pecah jadi beberapa kotak
 *   - baris tabel — tabelnya batal dikenali sama sekali
 *   - isi blok kode — di dalamnya baris kosong adalah bagian dari kodenya
 * ================================================================ */

type LineKind = "kosong" | "daftar" | "kutipan" | "tabel" | "judul" | "biasa";

function classifyLine(line: string): LineKind {
  if (line.trim() === "") return "kosong";
  if (/^\s*([-*+]|\d+[.)])\s/.test(line)) return "daftar";
  if (/^\s*>/.test(line)) return "kutipan";
  if (/^\s*\|/.test(line)) return "tabel";
  if (/^#{1,6}\s/.test(line)) return "judul";
  return "biasa";
}

const isFence = (line: string) => /^\s*(```|~~~)/.test(line);

/**
 * Ubah satu baris baru jadi pemisah paragraf. Baris kosong yang sudah ada
 * dipertahankan (dan deretan baris kosong berlebih dirapatkan jadi satu),
 * jadi fungsi ini aman dijalankan berulang kali pada teks yang sama.
 */
export function tidyParagraphs(value: string): string {
  const lines = value.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (isFence(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const kind = classifyLine(line);
    if (kind === "kosong") {
      // Baris kosong beruntun dirapatkan jadi satu.
      if (out.length > 0 && out[out.length - 1].trim() !== "") out.push("");
      continue;
    }

    const prev = [...out].reverse().find((l) => l.trim() !== "");
    const prevKind = prev === undefined ? undefined : classifyLine(prev);
    const alreadySeparated = out.length === 0 || out[out.length - 1].trim() === "";
    // Dua baris dari blok terstruktur yang sama tetap dempet.
    const mustStayTogether =
      prevKind !== undefined &&
      prevKind === kind &&
      (kind === "daftar" || kind === "kutipan" || kind === "tabel");

    if (!alreadySeparated && !mustStayTogether) out.push("");
    out.push(line);
  }

  return out.join("\n").trim();
}

/* ====================== Rata teks (align) ======================
 * Markdown tidak punya sintaks perataan teks sama sekali. Satu-satunya jalan
 * adalah membungkus bloknya dengan HTML — dan yang dipakai di sini
 * `<div align="...">`, bukan `style="text-align:..."`, karena penyaring di
 * komponen Markdown membuang atribut `style` (celah paling gampang untuk
 * menyelipkan CSS berbahaya). Atribut `align` bisa dibatasi nilainya ke empat
 * pilihan saja, jadi tidak ada yang bisa dititipkan lewat situ.
 *
 * Baris kosong di dalam pembungkusnya WAJIB ada. Tanpa itu remark
 * memperlakukan seluruh blok sebagai HTML mentah, dan format Markdown di
 * dalamnya (tebal, tautan, daftar) berhenti dikenali — tanda bintangnya
 * tampil apa adanya di halaman.
 * ================================================================ */

export type Align = "left" | "center" | "right" | "justify";

const ALIGN_OPEN = /^<div align="(left|center|right|justify)">\s*$/;
const ALIGN_CLOSE = /^<\/div>\s*$/;

const isMarker = (line: string) => ALIGN_OPEN.test(line) || ALIGN_CLOSE.test(line);

type Line = { start: number; end: number; text: string };

function splitLines(value: string): Line[] {
  const out: Line[] = [];
  let start = 0;
  for (;;) {
    const nl = value.indexOf("\n", start);
    const end = nl === -1 ? value.length : nl;
    out.push({ start, end, text: value.slice(start, end) });
    if (nl === -1) return out;
    start = nl + 1;
  }
}

/** Baris ke berapa sebuah posisi kursor berada. */
function lineIndexAt(lines: Line[], offset: number): number {
  const idx = lines.findIndex((l) => offset >= l.start && offset <= l.end);
  return idx === -1 ? lines.length - 1 : idx;
}

type Wrapper = { open: number; close: number; align: Align };

/** Pembungkus rata teks yang sedang melingkupi baris ke-`from`..`to`, kalau ada. */
function findWrapper(lines: Line[], from: number, to: number): Wrapper | null {
  let open = -1;
  let align: Align | null = null;
  for (let i = from - 1; i >= 0; i -= 1) {
    const text = lines[i].text;
    // Ketemu penutup lebih dulu → blok ini ada DI LUAR pembungkus mana pun.
    if (ALIGN_CLOSE.test(text)) return null;
    const m = text.match(ALIGN_OPEN);
    if (m) {
      open = i;
      align = m[1] as Align;
      break;
    }
  }
  if (open === -1 || !align) return null;

  for (let i = to + 1; i < lines.length; i += 1) {
    const text = lines[i].text;
    if (ALIGN_OPEN.test(text)) return null;
    if (ALIGN_CLOSE.test(text)) return { open, close: i, align };
  }
  // Pembukanya ada tapi penutupnya belum (naskah setengah jadi) → anggap
  // tidak terbungkus, supaya tombolnya tidak mengubah teks di luar niat admin.
  return null;
}

/** Susun ulang naskah dari daftar baris, dengan seleksi dinyatakan sebagai
 *  rentang baris pada susunan yang BARU. */
function fromLines(lines: string[], selStartLine: number, selEndLine: number): EditResult {
  const value = lines.join("\n");
  const startLine = Math.max(0, Math.min(selStartLine, lines.length - 1));
  const endLine = Math.max(startLine, Math.min(selEndLine, lines.length - 1));
  const head = lines.slice(0, startLine).join("\n");
  return {
    value,
    selectionStart: startLine === 0 ? 0 : head.length + 1,
    selectionEnd: lines.slice(0, endLine + 1).join("\n").length,
  };
}

/** Perataan yang sedang berlaku di posisi kursor — dipakai toolbar untuk
 *  menyalakan tombol yang aktif. */
export function getAlign(value: string, start: number, end: number): Align {
  const lines = splitLines(value);
  const wrapper = findWrapper(lines, lineIndexAt(lines, start), lineIndexAt(lines, end));
  return wrapper ? wrapper.align : "left";
}

/**
 * Pasang/ganti/lepas perataan teks pada blok yang tersentuh seleksi.
 *
 * "Rata kiri" tidak menulis pembungkus apa pun — itu memang tampilan bawaan
 * paragraf, jadi menandainya cuma menambah sampah di naskah. Tombolnya
 * berfungsi sebagai "kembalikan ke normal": pembungkus yang ada dilepas.
 * Menekan tombol yang sedang aktif juga melepas, supaya semuanya terasa
 * sebagai toggle seperti tombol format lainnya.
 */
export function toggleAlign(value: string, start: number, end: number, align: Align): EditResult {
  const lines = splitLines(value);
  const texts = lines.map((l) => l.text);
  let from = lineIndexAt(lines, start);
  let to = lineIndexAt(lines, end);
  // Seleksi yang berhenti tepat di awal baris berikutnya tidak ikut menarik
  // baris itu — kalau tidak, menyorot satu paragraf utuh dengan mouse selalu
  // menyeret baris kosong sesudahnya.
  if (to > from && end === lines[to].start) to -= 1;

  const wrapper = findWrapper(lines, from, to);

  if (wrapper) {
    const { open, close } = wrapper;
    if (wrapper.align === align || align === "left") {
      // Lepas pembungkusnya, berikut baris kosong yang tadi ditambahkan
      // bersamanya — kalau ditinggal, tiap kali dipasang-lepas naskahnya
      // menumpuk baris kosong.
      const dropped = new Set<number>([open, close]);
      if (texts[open + 1]?.trim() === "" && open + 1 < close) dropped.add(open + 1);
      if (texts[close - 1]?.trim() === "" && close - 1 > open) dropped.add(close - 1);
      const kept = texts.map((_, i) => i).filter((i) => !dropped.has(i));
      const isBody = (i: number) => i > open && i < close && texts[i].trim() !== "";
      const first = kept.findIndex(isBody);
      const last = kept.length - 1 - [...kept].reverse().findIndex(isBody);
      const nextLines = kept.map((i) => texts[i]);
      if (first === -1) return fromLines(nextLines, Math.max(0, open - 1), Math.max(0, open - 1));
      return fromLines(nextLines, first, last);
    }

    const nextLines = [...texts];
    nextLines[open] = `<div align="${align}">`;
    // Baris kosong pengapit tidak ikut diseleksi: yang mau dilihat admin
    // sesudah menekan tombol adalah teksnya, bukan jarak di sekelilingnya.
    let bodyStart = open + 1;
    let bodyEnd = close - 1;
    while (bodyStart < bodyEnd && texts[bodyStart].trim() === "") bodyStart += 1;
    while (bodyEnd > bodyStart && texts[bodyEnd].trim() === "") bodyEnd -= 1;
    return fromLines(nextLines, bodyStart, bodyEnd);
  }

  if (align === "left") return { value, selectionStart: start, selectionEnd: end };

  // Tanpa seleksi, yang diratakan adalah paragraf tempat kursor berada.
  // Dengan seleksi, persis baris-baris yang disorot — admin yang menyorot tiga
  // baris dari lima tidak berharap kelimanya ikut bergeser.
  if (end === start) {
    while (from > 0 && texts[from - 1].trim() !== "" && !isMarker(texts[from - 1])) from -= 1;
    while (to < texts.length - 1 && texts[to + 1].trim() !== "" && !isMarker(texts[to + 1])) to += 1;
  }

  const padBefore = from > 0 && texts[from - 1].trim() !== "";
  const padAfter = to < texts.length - 1 && texts[to + 1].trim() !== "";
  const body = texts.slice(from, to + 1);
  const nextLines = [
    ...texts.slice(0, from),
    ...(padBefore ? [""] : []),
    `<div align="${align}">`,
    "",
    ...body,
    "",
    "</div>",
    ...(padAfter ? [""] : []),
    ...texts.slice(to + 1),
  ];
  const bodyStart = from + (padBefore ? 1 : 0) + 2;
  return fromLines(nextLines, bodyStart, bodyStart + body.length - 1);
}
