/**
 * Seluruh teks antarmuka berbahasa Indonesia — sumber kebenaran struktur
 * terjemahan. en.ts wajib mengikuti bentuk objek ini (dicek lewat tipe
 * `Translations`), jadi teks baru cukup ditambah di sini lalu diisi di en.ts.
 */
import type { ServiceSlug, BpomServiceSlug, ServiceText } from "../data/services";
import type { HeroSlideText } from "../data/heroSlides";

/** Satu tahap alur. `duration` opsional — kosong berarti tidak ditampilkan. */
type FlowStage = {
  title: string;
  actor: string;
  duration?: string;
  desc: string;
};

type FlowPath = {
  label: string;
  hint: string;
  stages: FlowStage[];
};

type PackageTier = "micro" | "medium" | "large";
type PackageEntry = {
  tier: PackageTier;
  lbl: string;
  name: string;
  price: string;
  unit: string;
  feat: boolean;
};
type PackageCategory = {
  key: string;
  name: string;
  description: string;
  packages: PackageEntry[];
};

const regulerStages: FlowStage[] = [
  {
    title: "Konsultasi Gratis",
    actor: "Urushalal",
    duration: "Maks. 24 jam",
    desc: "Kami tinjau produk dan negara asal produksi Anda, lalu konfirmasikan jalur sertifikasi yang paling tepat berikut perkiraan waktu dan estimasi biayanya.",
  },
  {
    title: "Penyiapan Dokumentasi",
    actor: "Anda + Urushalal",
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
];

const luarNegeriStages: FlowStage[] = [
  {
    title: "Konsultasi & Cek Kelayakan MRA",
    actor: "Urushalal",
    duration: "Maks. 24 jam",
    desc: "Kami verifikasi apakah lembaga penerbit sertifikat Anda punya perjanjian saling pengakuan (MRA) dengan BPJPH.",
  },
  {
    title: "Penyiapan Berkas Sertifikat",
    actor: "Anda + Urushalal",
    desc: "Sertifikat halal yang sudah Anda miliki beserta dokumen pendukungnya kami rapikan sesuai ketentuan BPJPH. Syaratnya, sertifikat terbit dari lembaga di negara tempat produk diproduksi.",
  },
  {
    title: "Registrasi ke BPJPH",
    actor: "BPJPH",
    desc: "Sertifikat didaftarkan ke sistem BPJPH untuk mendapat pengakuan resmi di Indonesia. Tanpa audit ulang ke fasilitas produksi, jadi jauh lebih cepat dan hemat biaya.",
  },
];

const packageCategories: PackageCategory[] = [
  {
    key: "produk",
    name: "Produk",
    description:
      "Makanan, minuman, kosmetik, produk kimiawi, produk biologi, barang gunaan, rekayasa genetika",
    packages: [
      { tier: "micro", lbl: "Mikro/Kecil", name: "Mikro/Kecil", price: "Rp5.000.000", unit: "/ sekali bayar", feat: false },
      { tier: "medium", lbl: "Menengah", name: "Menengah", price: "Mulai dari Rp20.000.000", unit: "/ sekali bayar", feat: true },
      { tier: "large", lbl: "Besar", name: "Besar", price: "Mulai dari Rp30.000.000", unit: "/ sekali bayar", feat: false },
    ],
  },
  {
    key: "jasa",
    name: "Jasa",
    description:
      "Penyembelihan, pendistribusian, penyimpanan, pengolahan, pengemasan, penyajian, penjualan",
    packages: [
      { tier: "micro", lbl: "Mikro/Kecil", name: "Mikro/Kecil", price: "Mulai dari Rp8.000.000", unit: "/ sekali bayar", feat: false },
      { tier: "medium", lbl: "Menengah", name: "Menengah", price: "Mulai dari Rp25.000.000", unit: "/ sekali bayar", feat: true },
      { tier: "large", lbl: "Besar", name: "Besar", price: "Mulai dari Rp33.000.000", unit: "/ sekali bayar", feat: false },
    ],
  },
];

export const id = {
  meta: {
    homeTitle: "Urushalal — Urus Sertifikasi Halal Jadi Gampang",
    description:
      "Urushalal — pendamping resmi sertifikasi halal BPJPH untuk UMKM dan korporasi di Indonesia.",
    ogTitle: "Urushalal — Urus Sertifikasi Halal Jadi Gampang",
    ogDescription:
      "Pendamping resmi sertifikasi halal BPJPH dan izin edar BPOM untuk UMKM dan korporasi di Indonesia.",
    ogLocale: "id_ID",
  },

  common: {
    freeConsult: "Konsultasi gratis",
    startFreeConsult: "Mulai konsultasi gratis",
    backHome: "Kembali ke beranda",
    skipToContent: "Langsung ke konten utama",
  },

  header: {
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      services: "Layanan",
      flow: "Alur",
      news: "Berita",
    },
    aria: {
      brandHome: "Urushalal beranda",
      mainNav: "Utama",
      mobileNav: "Mobile",
      chooseService: "Pilih layanan",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      language: "Pilih bahasa",
    },
    serviceTaglines: {
      "sertifikasi-halal-reguler":
        "Sertifikasi halal penuh di Indonesia — SIHALAL, audit LPH, hingga sertifikat BPJPH.",
      "registrasi-sertifikat-halal-luar-negeri":
        "Daftarkan sertifikat halal luar negeri (MRA) agar diakui di Indonesia, lebih cepat.",
      "registrasi-makanan-minuman-bpom":
        "Izin edar BPOM untuk pangan olahan & minuman kemasan (MD/ML) hingga siap dijual.",
      "registrasi-kosmetik-bpom":
        "Notifikasi kosmetik (NA) untuk skincare, makeup, hingga parfum sesuai standar BPOM.",
      "registrasi-suplemen-kesehatan-bpom":
        "Izin edar suplemen — vitamin, mineral, herbal — sesuai ketentuan keamanan BPOM.",
    } satisfies Record<ServiceSlug, string>,
  },

  hero: {
    ariaLabel: "Layanan utama Urushalal",
    controlsLabel: "Navigasi slide",
    prevSlide: "Slide sebelumnya",
    nextSlide: "Slide berikutnya",
    showSlide: (name: string) => `Tampilkan slide ${name}`,
    slideStatus: (index: number, total: number, name: string) =>
      `Slide ${index} dari ${total}: ${name}`,
    slideAria: (position: number, total: number, name: string) =>
      `${position} dari ${total} — ${name}`,
    slides: {
      halal: {
        name: "Sertifikasi Halal",
        badge: "Sertifikasi Halal untuk Semua Jenis Usaha",
        titleHead: "Sertifikasi Halal,",
        titleAccent: ["Nilai Lebih", "untuk Bisnis Anda"],
        lead: "Kami membantu Anda mendapatkan sertifikasi halal secara cepat, mudah, dan sesuai syariat.",
        features: [
          { title: "Sesuai Syariat", desc: "Dipandu auditor berkompeten & tersertifikasi" },
          { title: "Proses Cepat & Transparan", desc: "Alur jelas, biaya pasti, tanpa hidden cost" },
          { title: "Diakui Nasional & Global", desc: "Sertifikat halal diakui BPJPH & MUI" },
          { title: "Pendampingan Profesional", desc: "Tim ahli siap mendampingi sampai sertifikat terbit" },
        ],
        waMessage: "Halo, saya mau konsultasi soal sertifikasi halal untuk produk saya.",
        ctaSecondary: "Lihat alurnya",
        stats: [
          { num: "200+", label: "Produk Tersertifikasi" },
          { num: "30 Hari", label: "Rata-rata Audit" },
          { num: "98%", label: "Pengajuan Lolos Verifikasi Pertama" },
        ],
      } satisfies HeroSlideText,
      bpom: {
        name: "Izin BPOM",
        badge: "Izin BPOM, Legalitas Terjamin",
        titleHead: "Urus Izin BPOM,",
        titleAccent: ["Mudah, Aman", "& Terarah"],
        lead: "Kami membantu Anda mengurus izin BPOM untuk produk makanan, minuman, obat, kosmetik, dan suplemen dengan proses yang aman dan efisien.",
        features: [
          { title: "Tim Berpengalaman", desc: "Konsultan ahli regulasi siap membantu Anda" },
          { title: "Proses Cepat & Efisien", desc: "Dokumen lengkap, proses lebih lancar" },
          { title: "Legal & Terpercaya", desc: "Sesuai ketentuan BPOM terbaru" },
          { title: "Layanan End-to-End", desc: "Dari persiapan hingga izin terbit" },
        ],
        waMessage: "Halo, saya mau konsultasi soal pengurusan izin BPOM untuk produk saya.",
        ctaSecondary: "Lihat alurnya",
        stats: [
          { num: "4–5 Bulan", label: "Estimasi Proses" },
          { num: "100%", label: "Pendampingan Sampai Terbit" },
          { num: "Konsultasi Gratis", label: "Tim siap membantu Anda kapan saja" },
        ],
      } satisfies HeroSlideText,
    },
  },

  news: {
    eyebrow: "Berita",
    homeTitle: "Kabar & panduan terbaru seputar halal dan BPOM.",
    allNews: "Semua berita",
    loadError: "Berita sedang tidak dapat dimuat.",
    retry: "Coba lagi",
    minRead: (minutes: number) => `${minutes} menit baca`,
    categoryFallback: "Berita",
    /** Terjemahan kategori berita (nilai di DB tetap Indonesia — daftarnya
     *  tetap, lihat CATEGORIES di AdminNewsFormPage). Tak dikenal = tampil apa adanya. */
    categoryNames: {
      Halal: "Halal",
      BPOM: "BPOM",
      Regulasi: "Regulasi",
      Informasi: "Informasi",
      "Tips & Panduan": "Tips & Panduan",
    } as Record<string, string>,
    prevLabel: "Berita sebelumnya",
    nextLabel: "Berita berikutnya",
    metaTitle: "Berita — Urushalal",
    page: {
      eyebrow: "Berita",
      titleHead: "Kabar &",
      titleAccent: "panduan terbaru.",
      lead: "Regulasi, panduan, dan perkembangan terkini seputar sertifikasi halal dan izin edar BPOM.",
      loading: "Memuat berita…",
      empty: "Belum ada berita yang dipublikasikan.",
      prev: "Sebelumnya",
      next: "Berikutnya",
      paginationLabel: "Paginasi berita",
    },
    detail: {
      loading: "Memuat berita…",
      allNews: "← Semua berita",
      /** Label default tombol WA di akhir artikel (bisa ditimpa per berita). */
      ctaLabel: "Konsultasi gratis via WhatsApp",
      waMessage: (title: string) =>
        `Halo, saya membaca artikel "${title}" dan ingin konsultasi.`,
      waMessageGeneric: "Halo, saya ingin konsultasi soal sertifikasi halal.",
    },
  },

  products: {
    prevLabel: (theme: string) => `Kategori ${theme} sebelumnya`,
    nextLabel: (theme: string) => `Kategori ${theme} berikutnya`,
    themeLabel: { halal: "halal", bpom: "BPOM" },
    halal: {
      eyebrow: "Cakupan sertifikasi",
      title: "Produk Halal yang Kami Sertifikasi",
      lead: "Sertifikasi Halal untuk berbagai kategori produk sesuai ketentuan BPJPH.",
      items: [
        {
          title: "Makanan dan Minuman",
          description: "Produk olahan, minuman, dan bahan pangan yang beredar di pasar Indonesia.",
        },
        {
          title: "Suplemen Makanan",
          description: "Vitamin, mineral, dan produk nutrisi yang wajib bersertifikat Halal dan terdaftar BPOM.",
        },
        {
          title: "Kosmetik dan Perawatan Diri",
          description: "Skincare, make-up, dan produk perawatan tubuh yang diaplikasikan langsung ke kulit.",
        },
        {
          title: "Jasa Distribusi & Penyimpanan",
          description: "Pendampingan sertifikasi halal untuk rantai distribusi dan penyimpanan produk, memastikan proses logistik tetap terjaga kehalalannya.",
        },
        {
          title: "Barang Gunaan",
          description: "Produk kebutuhan sehari-hari yang telah tersertifikasi halal, mulai dari plastic wrap, tisu, sabun, hingga perlengkapan rumah tangga lainnya.",
        },
        {
          title: "Produk Rumah Tangga",
          description: "Bahan pembersih dan produk konsumsi rumah tangga berbahan kimia.",
        },
        {
          title: "Kategori Lainnya",
          description: "Produk farmasi, kemasan pangan, dan kategori lain yang dievaluasi secara khusus.",
        },
      ],
    },
    bpom: {
      eyebrow: "Cakupan izin edar",
      title: "Produk BPOM yang Kami Sertifikasi",
      lead: "Pendampingan izin edar BPOM untuk produk sesuai ketentuan yang berlaku.",
      items: [
        {
          title: "Makanan dan Minuman",
          description: "Produk pangan olahan dan minuman yang memerlukan izin edar BPOM.",
        },
        {
          title: "Suplemen Kesehatan",
          description: "Vitamin, mineral, dan produk nutrisi sesuai ketentuan keamanan BPOM.",
        },
        {
          title: "Produk Kosmetik",
          description: "Skincare, make-up, dan produk perawatan tubuh yang wajib terdaftar di BPOM.",
        },
      ],
    },
  },

  serviceCards: {
    eyebrow: "Apa yang kami urus",
    title: "Dari niat sampai sertifikat terbit, satu pintu.",
    prevLabel: "Kartu sebelumnya",
    nextLabel: "Kartu berikutnya",
    items: [
      {
        title: "Konsultasi Awal Gratis",
        desc: "Kami petakan jenis produk, bahan, dan proses Anda untuk menentukan skema sertifikasi yang paling pas.",
        tag: "Fase persiapan",
      },
      {
        title: "Penyusunan Dokumen",
        desc: "Formulir Pendaftaran Halal, daftar bahan, flowchart produksi—kami susun rapi sampai siap verifikasi.",
        tag: "BPJPH",
      },
      {
        title: "Pendampingan Audit",
        desc: "Auditor LPH datang ke lokasi. Kami dampingi dari sisi teknis supaya audit jalan satu kali jalan.",
        tag: "Lapangan",
      },
      {
        title: "Penerbitan Sertifikat",
        desc: "Hasil audit kami pantau sampai Fatwa MUI keluar dan sertifikat halal resmi terbit di portal SiHALAL.",
        tag: "Penyelesaian",
      },
      {
        title: "Kaji Bahan & Supplier",
        desc: "Cek status halal setiap bahan dan supplier agar rantai pasok Anda terdokumentasi dan tidak bermasalah saat audit.",
        tag: "Due diligence",
      },
    ],
  },

  flow: {
    eyebrow: "Alur",
    title: "Alurnya beda, tergantung dari mana produk Anda.",
    lead: "Kami tidak menjanjikan “cepat instan”. Yang kami jaga: setiap tahap tuntas tanpa bolak-balik dokumen, dan Anda tahu posisi pengajuan setiap saat.",
    tablistLabel: "Pilih jalur sertifikasi",
    stageCount: (count: number) => `${count} tahap`,
    overseasNote: " — lebih ringkas karena audit lapangan dilewati",
    snakeHint:
      "Arahkan kursor ke tiap tahap untuk mengintip detailnya, klik untuk menguncinya.",
    detailLabel: "Detail tahap",
    stepLabel: (step: number) => `Tahap ${step}`,
    paths: {
      reguler: {
        label: "Produksi di Indonesia",
        hint: "Belum punya sertifikat halal, atau produksi di dalam negeri. Ada audit ke lokasi.",
        stages: regulerStages,
      },
      "produksi-luar": {
        label: "Produksi di luar negeri",
        hint: "Belum punya sertifikat halal, atau produksi di luar negeri. Ada audit ke lokasi.",
        // Sama dengan jalur reguler — tahapannya persis sama, yang membedakan
        // cuma di mana auditor datang. Ditulis sekali supaya tidak berbeda isi.
        stages: regulerStages,
      },
      mra: {
        label: "Sudah punya sertifikat luar negeri",
        hint: "Lembaga penerbitnya punya perjanjian MRA dengan BPJPH. Tanpa audit ulang.",
        stages: luarNegeriStages,
      },
    } satisfies Record<string, FlowPath>,
  },

  packages: {
    eyebrow: "Pilih yang pas",
    title: "Harga jujur, tidak ada biaya yang ngumpet.",
    choose: (name: string) => `Pilih ${name}`,
    waMessage: (category: string, name: string) =>
      `Halo, saya tertarik dengan paket ${category} ${name}. Boleh minta penjelasannya?`,
    features: {
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
    } satisfies Record<PackageTier, string[]>,
    categories: packageCategories,
  },

  clients: {
    eyebrow: "Dipercaya pelaku usaha",
    title: "Klien Kami",
    lead: "Pendampingan sertifikasi Halal dan BPOM untuk berbagai industri di Indonesia dan mancanegara.",
    prevLabel: "Klien sebelumnya",
    nextLabel: "Klien berikutnya",
    listLabel: "Daftar klien Urushalal",
    origin: (country: string) => `Asal perusahaan: ${country}`,
    flagAlt: (country: string) => `Bendera ${country}`,
  },

  faq: {
    eyebrow: "Pertanyaan umum",
    title: "Pertanyaan yang sering kami dengar.",
    lead: "Belum nemu jawabannya? Tanyakan langsung di sesi konsultasi gratis—biasanya cukup 20 menit.",
    ask: "Ajukan pertanyaan",
    tablistLabel: "Kategori FAQ",
    tabs: { halal: "Sertifikasi Halal", bpom: "Izin BPOM" },
    halalItems: [
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
    ],
    bpomItems: [
      {
        q: "Apa itu BPOM?",
        a: "BPOM adalah lembaga pemerintah yang mengawasi keamanan obat dan makanan yang beredar di Indonesia.",
      },
      {
        q: "Kenapa produk saya butuh izin BPOM?",
        a: "Produk seperti obat, suplemen, kosmetik, dan makanan olahan wajib punya izin edar sebelum dijual di Indonesia. Tanpa izin ini, produk bisa ditarik dari pasar dan dikenai sanksi, meski sudah berizin di negara asal.",
      },
      {
        q: "Berapa lama prosesnya dan berapa lama masa berlakunya?",
        a: "Prosesnya melalui pengajuan, audit, penilaian, evaluasi, hingga pengesahan secara online; durasinya tergantung jenis dan tingkat risiko produk. Izin berlaku 5 tahun dan dapat diperpanjang mulai 6 bulan sebelum masa berlaku habis.",
      },
      {
        q: "Dokumen apa saja yang dibutuhkan?",
        a: "Dokumen umumnya meliputi identitas direktur dan penanggung jawab, legalitas perusahaan, data pabrik dan bahan baku, detail produk, hasil uji lab, serta sertifikat GMP/HACCP/ISO. Persyaratan dapat berbeda untuk produk lokal dan impor.",
      },
      {
        q: "Kenapa pakai jasa pengurusan BPOM?",
        a: "Agar semua persyaratan terpenuhi sejak awal, proses lebih cepat, dan risiko penolakan lebih kecil. Tim kami mendampingi proses sampai izin terbit.",
      },
    ],
  },

  services: {
    items: {
      "sertifikasi-halal-reguler": {
        name: "Sertifikasi Halal Reguler",
        shortDesc:
          "Proses sertifikasi halal penuh di Indonesia untuk pelaku usaha (UMKM maupun korporasi) yang produknya diproduksi di dalam negeri atau belum memiliki sertifikat halal dari lembaga yang diakui BPJPH. Meliputi pendaftaran SIHALAL, audit oleh Lembaga Pemeriksa Halal (LPH), penerbitan fatwa oleh MUI, hingga terbitnya sertifikat resmi BPJPH.",
        article:
          "Sertifikasi Halal Reguler adalah jalur sertifikasi penuh yang dijalankan langsung di Indonesia, cocok untuk pelaku usaha yang berproduksi di dalam negeri atau belum memiliki sertifikat halal dari lembaga manapun. Prosesnya dimulai dari pengajuan permohonan melalui sistem SIHALAL milik BPJPH, dilanjutkan dengan audit langsung ke fasilitas produksi oleh auditor dari Lembaga Pemeriksa Halal (LPH) yang terakreditasi. Hasil audit kemudian diserahkan ke Komisi Fatwa MUI untuk ditinjau dan disahkan sebagai fatwa halal. Setelah fatwa terbit, BPJPH akan menerbitkan Sertifikat Halal Indonesia yang berlaku permanen selama komposisi bahan dan proses produksi tidak berubah. Kami mendampingi seluruh tahapan ini, mulai dari penyiapan dokumen, koordinasi dengan LPH dan MUI, hingga sertifikat terbit di tangan Anda.",
      },
      "registrasi-sertifikat-halal-luar-negeri": {
        name: "Registrasi Sertifikat Halal Luar Negeri",
        shortDesc:
          "Bagi perusahaan yang sudah memiliki sertifikat halal dari lembaga luar negeri yang punya perjanjian saling pengakuan (MRA) dengan BPJPH, kami bantu mendaftarkan sertifikat tersebut agar berlaku dan diakui di Indonesia. Prosesnya jauh lebih cepat karena tidak perlu audit ulang di fasilitas produksi.",
        article:
          "Layanan ini ditujukan bagi perusahaan yang produknya diproduksi di luar negeri dan sudah memiliki sertifikat halal dari lembaga sertifikasi setempat yang telah menjalin perjanjian saling pengakuan (Mutual Recognition Agreement/MRA) dengan BPJPH. Alih-alih menjalani proses sertifikasi dari awal, sertifikat halal yang sudah dimiliki cukup didaftarkan ke sistem BPJPH untuk mendapatkan pengakuan resmi di Indonesia. Syaratnya, sertifikat harus diterbitkan oleh lembaga di negara tempat produk tersebut diproduksi. Jalur ini jauh lebih cepat dan hemat biaya dibanding sertifikasi reguler karena tidak memerlukan audit ulang di fasilitas produksi. Kami membantu memverifikasi kelayakan sertifikat Anda dan mengurus seluruh proses pendaftarannya ke BPJPH.",
      },
      "registrasi-makanan-minuman-bpom": {
        name: "Registrasi Makanan dan Minuman (BPOM)",
        shortDesc:
          "Layanan pengurusan izin edar BPOM untuk produk pangan olahan, minuman kemasan, hingga bahan baku pangan (kategori MD untuk produksi dalam negeri, ML untuk produk impor). Kami bantu mulai dari penyusunan dokumen teknis, pendaftaran lewat sistem e-Reg Pangan, sampai produk siap dipasarkan secara legal.",
        article:
          "Setiap produk pangan olahan dan minuman kemasan yang beredar di Indonesia wajib memiliki izin edar dari BPOM sebelum bisa dijual secara legal. Kami membantu proses registrasi ini dari awal hingga akhir — mulai dari penyusunan dokumen teknis produk (komposisi, proses produksi, hasil uji laboratorium), pendaftaran melalui sistem e-Reg Pangan BPOM, hingga terbitnya nomor izin edar (kategori MD untuk produk lokal, ML untuk produk impor). Layanan ini cocok untuk produsen makanan, minuman, maupun bahan baku pangan yang ingin memasarkan produknya secara resmi dan legal di seluruh Indonesia.",
      },
      "registrasi-kosmetik-bpom": {
        name: "Registrasi Produk Kosmetik (BPOM)",
        shortDesc:
          "Layanan notifikasi kosmetik BPOM (Notifkos) untuk produk perawatan kulit, rambut, wajah, hingga wewangian agar mendapatkan nomor izin edar (NA) resmi. Kami pastikan formula, klaim, dan kemasan produk sesuai standar keamanan BPOM sebelum beredar di pasar Indonesia.",
        article:
          "Produk kosmetik — mulai dari skincare, makeup, perawatan rambut, hingga parfum — wajib memiliki nomor notifikasi (NA) dari BPOM sebelum dipasarkan di Indonesia. Kami membantu proses notifikasi kosmetik (Notifkos) mulai dari review formula dan bahan baku, penyesuaian klaim produk agar sesuai regulasi, penyusunan dokumen teknis, hingga pengajuan melalui sistem resmi BPOM. Kami juga memastikan kemasan dan label produk Anda memenuhi standar keamanan dan ketentuan pelabelan yang berlaku, sehingga produk siap dipasarkan tanpa hambatan regulasi.",
      },
      "registrasi-suplemen-kesehatan-bpom": {
        name: "Registrasi Suplemen Kesehatan (BPOM)",
        shortDesc:
          "Layanan pendaftaran izin edar untuk produk suplemen kesehatan seperti vitamin, mineral, ekstrak herbal, hingga produk nutrisi lainnya. Kami bantu penyusunan dokumen keamanan dan klaim khasiat produk sesuai ketentuan BPOM agar suplemen bisa dipasarkan secara legal.",
        article:
          "Produk suplemen kesehatan seperti vitamin, mineral, ekstrak herbal, probiotik, dan produk nutrisi lainnya memerlukan izin edar khusus dari BPOM sebelum dapat dipasarkan. Kami membantu menyusun dokumen keamanan produk, bukti klaim khasiat, serta kelengkapan teknis lain sesuai ketentuan BPOM, kemudian mengajukan pendaftaran hingga izin edar terbit. Layanan ini cocok untuk produsen lokal maupun perusahaan luar negeri yang ingin memasarkan produk suplemen kesehatannya secara legal di pasar Indonesia.",
      },
    } satisfies ServiceText,
    metaNotFound: "Tidak ditemukan — Urushalal",
    detail: {
      eyebrow: "Layanan",
      ctaTitle: "Tertarik dengan layanan ini?",
      ctaText: "Konsultasikan kebutuhan produk Anda — gratis, tanpa kewajiban.",
      others: "Layanan lainnya",
    },
  },

  about: {
    metaTitle: "Tentang Kami — Urushalal",
    eyebrow: "Tentang Kami",
    titleHead: "Partner perizinan yang",
    titleAccent: "mendampingi sampai tuntas.",
    profileTitle: "Profil Singkat",
    profileText:
      "Urushalal sebagai platform yang dibuat oleh PT Ruang Halal Indonesia hadir untuk membantu pelaku usaha — dari UMKM hingga korporasi, lokal maupun perusahaan luar negeri — mengurus sertifikasi halal BPJPH dan izin edar BPOM dengan proses yang cepat, transparan, dan sesuai regulasi terbaru. Kami memahami bahwa proses perizinan bisa terasa rumit, karena itu kami hadir sebagai partner yang mendampingi setiap tahapan, dari konsultasi awal hingga sertifikat/izin edar terbit di tangan Anda.",
    visionTitle: "Visi",
    visionText:
      "Menjadi mitra terpercaya nomor satu bagi pelaku usaha dalam memenuhi standar kehalalan dan keamanan produk di Indonesia.",
    missionTitle: "Misi",
    mission: [
      "Memberikan layanan pendampingan sertifikasi halal dan registrasi BPOM yang cepat, transparan, dan sesuai regulasi.",
      "Membantu pelaku usaha lokal maupun luar negeri memahami dan memenuhi persyaratan hukum yang berlaku di Indonesia.",
      "Menjadi satu pintu layanan (one-stop-service) untuk kebutuhan legalitas produk, mulai dari halal, BPOM, hingga dokumentasi pendukung lainnya.",
    ],
    whyTitle: "Kenapa Memilih Kami",
    why: [
      "Tim berpengalaman dan memahami regulasi BPJPH & BPOM terkini.",
      "Pendampingan penuh dari konsultasi, penyiapan dokumen, hingga sertifikat/izin edar terbit.",
      "Proses transparan — estimasi biaya dan waktu disampaikan di awal, tanpa biaya tersembunyi.",
      "Melayani konsultasi gratis untuk menentukan jalur sertifikasi/registrasi yang paling sesuai.",
    ],
  },

  footer: {
    ctaTitle: "Saatnya produk Anda",
    ctaTitleAccent: "resmi halal.",
    ctaButton: "Mulai konsultasi gratis",
    tagline:
      "Pendamping sertifikasi halal & izin edar BPOM untuk usaha Indonesia. Terdaftar dan terhubung dengan LPH resmi.",
    servicesTitle: "Layanan",
    bpomLabel: "Izin Edar BPOM",
    bpomShort: {
      "registrasi-makanan-minuman-bpom": "Pangan",
      "registrasi-kosmetik-bpom": "Kosmetik",
      "registrasi-suplemen-kesehatan-bpom": "Suplemen",
    } satisfies Record<BpomServiceSlug, string>,
    companyTitle: "Perusahaan",
    companyLinks: { about: "Tentang Kami", flow: "Alur", news: "Berita", faq: "FAQ" },
    contactTitle: "Kontak",
    city: "Jakarta Selatan",
    hours: "Senin–Jumat, 09–17 WIB",
    copyright: "© 2026 PT Ruang Halal Indonesia. Bekerja sesuai regulasi BPJPH & MUI.",
    privacy: "Kebijakan privasi",
    terms: "Syarat layanan",
  },

  deadlineModal: {
    title: "Jangan lewatkan batas waktu 17 Oktober 2026!",
    description:
      "Anda berisiko kehilangan akses ke lebih dari 200 juta konsumen Muslim di Indonesia, dan dapat dikenakan sanksi dari BPJPH/pemerintah — mulai dari larangan impor, penarikan produk dari pasar, hingga denda administratif.",
    cta: "Konsultasi Gratis",
    close: "Tutup peringatan",
  },

  moreInfo: {
    fabLabel: "More Info",
    panelLabel: "More Info",
    heading: "Ada yang bisa kami bantu?",
    sub: "Chat langsung atau kirim pesan singkat.",
    close: "Tutup panel",
    chatWa: "Chat via WhatsApp",
    waMessage: "Halo, saya ingin bertanya soal sertifikasi halal/BPOM",
    divider: "atau kirim pesan",
    success:
      "Terima kasih! Pesan Anda sudah kami terima. Tim kami akan segera menghubungi Anda.",
    sendAnother: "Kirim pesan lain",
    namePh: "Nama",
    contactPh: "No. HP / Email",
    messagePh: "Pesan",
    send: "Kirim",
    sending: "Mengirim…",
    /** Pesan error form, dipetakan dari ContactErrorCode di lib/contact. */
    errors: {
      required: "Nama, kontak, dan pesan wajib diisi.",
      too_long: "Isian terlalu panjang. Persingkat pesan Anda.",
      unconfigured: "Database belum dikonfigurasi.",
      failed: "Gagal mengirim pesan. Silakan coba lagi.",
    },
  },

  notFound: {
    metaTitle: "Halaman tidak ditemukan — Urushalal",
    title: "Halaman tidak ditemukan.",
    text: "Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.",
    cta: "Kembali ke beranda",
  },
};

export type Translations = typeof id;
