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
