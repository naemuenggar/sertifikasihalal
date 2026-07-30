import { useState } from "react";
import { Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScrollLink from "./ScrollLink";

const faqs = [
  {
    q: "Apakah sertifikasi halal wajib untuk berjualan di Indonesia?",
    a: "Ya. UU No. 33/2014 tentang Jaminan Produk Halal, yang pelaksanaannya diatur lewat PP No. 42/2024, mewajibkan produk yang beredar di Indonesia memiliki sertifikat halal BPJPH yang sah. Kewajiban untuk makanan & minuman sudah berlaku sejak 17 Oktober 2024. Untuk kosmetik, farmasi, produk rumah tangga, dan barang konsumsi lain, wajib paling lambat 17 Oktober 2026. Produk yang tidak memenuhi ketentuan berisiko dilarang impor, ditarik dari peredaran, dan dikenai denda.",
  },
  {
    q: "Apa bedanya Sertifikasi Halal Reguler dengan Registrasi Sertifikat Halal Luar Negeri?",
    a: "Sertifikasi Halal Reguler dipakai jika perusahaan belum memiliki sertifikat halal atau lembaga halal yang diakui di negara produksinya — prosesnya penuh di Indonesia (SIHALAL → audit LPH → fatwa MUI → sertifikat BPJPH), memakan waktu sekitar 3–6 bulan. Registrasi Sertifikat Halal Luar Negeri dipakai jika perusahaan sudah punya sertifikat dari lembaga yang memiliki MRA dengan BPJPH — tinggal didaftarkan, prosesnya jauh lebih cepat, sekitar 20–43 hari kerja, dan lebih hemat biaya.",
  },
  {
    q: "Bisakah saya pakai sertifikat halal dari negara lain untuk berjualan di Indonesia?",
    a: "Bisa, tapi hanya jika lembaga penerbitnya memiliki perjanjian saling pengakuan (MRA) yang sah dengan BPJPH, dan sertifikat tersebut diterbitkan oleh lembaga di negara tempat produk diproduksi (bukan negara lain). Hubungi kami untuk verifikasi kelayakan sertifikat Anda.",
  },
  {
    q: "Berapa lama sertifikat halal BPJPH berlaku?",
    a: "Berdasarkan PP No. 42/2024, sertifikat halal BPJPH berlaku **permanen** — tidak ada tanggal kedaluwarsa selama komposisi bahan dan proses produksi tidak berubah. Namun, ada dua kewajiban yang tetap berlaku: (1) perubahan bahan, pemasok, atau proses produksi wajib dilaporkan dan bisa memerlukan pembaruan sertifikat; (2) Sistem Jaminan Produk Halal (SJPH) perusahaan dievaluasi setiap 4 tahun.",
  },
  {
    q: "Produk apa saja yang dikecualikan dari kewajiban sertifikasi halal?",
    a: 'Produk yang secara inheren haram — seperti produk berbahan babi, alkohol, dan lemak babi — dikecualikan dari sertifikasi, tapi wajib mencantumkan label "Non-Halal" yang jelas pada kemasan. Produk segar yang tidak diolah (misalnya sayur/buah segar, hewan hidup, hasil laut segar) juga bisa masuk pengecualian sesuai daftar positif halal.',
  },
  {
    q: "Apa risikonya jika menjual produk tanpa sertifikat halal di Indonesia?",
    a: "Risikonya meliputi sanksi administratif dari BPJPH, penangguhan atau larangan impor, penarikan produk wajib dari peredaran, dan pada kasus berat bisa berujung tanggung jawab pidana sesuai UU Jaminan Produk Halal. Marketplace besar seperti Tokopedia, Shopee, dan Lazada juga semakin sering mensyaratkan nomor sertifikat halal untuk kategori produk tertentu.",
  },
  {
    q: "Apakah logo halal MUI yang lama masih berlaku?",
    a: "Logo halal MUI yang lama sudah digantikan dengan logo resmi **Halal Indonesia** berwarna ungu yang diterbitkan BPJPH (sesuai SK BPJPH No. 145/2022). Logo lama masih boleh dipakai sampai **17 Oktober 2026**, setelah itu seluruh produk bersertifikat wajib mencantumkan logo baru.",
  },
  {
    q: "Apakah saya perlu sertifikasi ulang jika mengubah bahan, pemasok, atau proses produksi?",
    a: "Ya. Setiap perubahan bahan baku, pemasok, atau proses produksi wajib dilaporkan ke BPJPH dan bisa memerlukan audit/peninjauan ulang. Jika perubahan tidak dilaporkan namun sertifikat tetap dipakai, sertifikat berisiko dicabut dan dikenai sanksi.",
  },
  {
    q: "Negara mana saja yang punya perjanjian saling pengakuan (MRA) dengan BPJPH?",
    a: "Per 2024, BPJPH telah menandatangani puluhan perjanjian MRA dengan lembaga sertifikasi halal di lebih dari 20 negara, termasuk Amerika Serikat, Australia, Kanada, Malaysia, Jepang, Korea Selatan, dan sejumlah negara lain di Eropa serta Timur Tengah. Daftarnya terus bertambah — hubungi kami untuk mengecek apakah negara produksi Anda termasuk.",
  },
  {
    q: "Berapa biaya sertifikasi halal di Indonesia?",
    a: "Biaya bervariasi tergantung jalur yang dipilih, kategori produk, jumlah SKU, dan negara produksi. Jalur Registrasi Sertifikat Luar Negeri umumnya jauh lebih hemat karena tidak memerlukan biaya audit ke lokasi. Kami akan memberikan rincian biaya tertulis secara gratis saat sesi konsultasi awal, tanpa ada kewajiban lanjut.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="faq">
          <div className="faq__intro">
            <span className="eyebrow" style={{ display: "inline-flex" }}>
              Pertanyaan umum
            </span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Pertanyaan yang sering kami dengar.
            </h2>
            <p className="lead">
              Belum nemu jawabannya? Tanyakan langsung di sesi konsultasi
              gratis—biasanya cukup 20 menit.
            </p>
            <ScrollLink to="kontak" className="btn btn--ghost" style={{ marginTop: "1.5rem" }}>
              Ajukan pertanyaan
            </ScrollLink>
          </div>

          <div className="faq__list">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className="faq-item" key={f.q} data-open={isOpen}>
                  <button
                    className="faq-item__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <Plus className="faq-item__icon" size={18} strokeWidth={1.8} />
                  </button>
                  <div className="faq-item__a">
                    <div className="prose prose--inline">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{f.a}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
