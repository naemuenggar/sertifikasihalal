import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

/**
 * Satu-satunya pintu render Markdown di aplikasi ini. Semua tempat yang
 * menampilkan teks tulisan admin (detail berita, preview form, jawaban FAQ)
 * WAJIB lewat komponen ini — jangan panggil <ReactMarkdown> langsung.
 *
 * Alasannya keamanan. `rehype-raw` sengaja dipasang supaya tag HTML mentah
 * seperti <u> dan <mark> ikut dirender (Markdown murni tidak punya garis bawah
 * maupun stabilo). Begitu HTML mentah diizinkan, tanpa penyaring berarti admin
 * — atau siapa pun yang berhasil menembus akun admin — bisa menitipkan
 * <script> ke dalam artikel dan skrip itu jalan di browser setiap pengunjung.
 * `rehype-sanitize` yang menutup celah itu: hanya tag di daftar putih yang
 * lolos, sisanya dibuang.
 *
 * Urutan plugin tidak boleh dibalik: rehype-raw dulu (mengubah teks HTML jadi
 * simpul asli), baru rehype-sanitize (membuang simpul yang tidak diizinkan).
 * Kalau dibalik, penyaringnya bekerja sebelum ada yang bisa disaring.
 */

/** Daftar putih tag & atribut. Basisnya skema bawaan (setara GitHub) yang
 *  sudah membuang <script>, <style>, <iframe>, semua atribut on* seperti
 *  onerror/onclick, dan membatasi protokol href ke http/https/mailto —
 *  jadi `[klik](javascript:...)` mati di sini. Kita cuma menambah dua tag
 *  inline yang memang dipakai toolbar editor. */
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "u", "mark"],
};

type Props = {
  children: string;
  className?: string;
};

export default function Markdown({ children, className }: Props) {
  const body = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
      components={{
        // Link ke luar dibuka di tab baru. `rel` wajib ikut: tanpa noopener,
        // halaman tujuan bisa menyetir balik tab asal lewat window.opener
        // (reverse tabnabbing) — dipakai untuk melempar korban ke halaman
        // login palsu.
        // `node` dibuang dari rest: react-markdown menitipkan simpul AST-nya
        // lewat prop itu, dan kalau ikut disebar ke elemen DOM hasilnya jadi
        // atribut sampah node="[object Object]" di HTML halaman.
        a: ({ href, children: linkChildren, node: _node, ...rest }) => {
          const isExternal = /^https?:\/\//i.test(href ?? "");
          return (
            <a
              href={href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...rest}
            >
              {linkChildren}
            </a>
          );
        },
        // Gambar di dalam artikel tidak boleh menahan render awal halaman.
        img: ({ node: _node, ...rest }) => <img loading="lazy" decoding="async" {...rest} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );

  return className ? <div className={className}>{body}</div> : body;
}
