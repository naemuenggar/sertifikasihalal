/**
 * Data 5 layanan Urushalal — satu sumber untuk halaman /layanan (tabel),
 * halaman detail /layanan/[slug], preview di beranda, dan link footer.
 * Konten sesuai brief revisi (siap pakai).
 */

export type Service = {
  slug: string;
  name: string;
  /** Deskripsi singkat untuk tabel & kartu preview. */
  shortDesc: string;
  /** Isi artikel singkat untuk halaman detail. */
  article: string;
};

export const services: Service[] = [
  {
    slug: "sertifikasi-halal-reguler",
    name: "Sertifikasi Halal Reguler",
    shortDesc:
      "Proses sertifikasi halal penuh di Indonesia untuk pelaku usaha (UMKM maupun korporasi) yang produknya diproduksi di dalam negeri atau belum memiliki sertifikat halal dari lembaga yang diakui BPJPH. Meliputi pendaftaran SIHALAL, audit oleh Lembaga Pemeriksa Halal (LPH), penerbitan fatwa oleh MUI, hingga terbitnya sertifikat resmi BPJPH.",
    article:
      "Sertifikasi Halal Reguler adalah jalur sertifikasi penuh yang dijalankan langsung di Indonesia, cocok untuk pelaku usaha yang berproduksi di dalam negeri atau belum memiliki sertifikat halal dari lembaga manapun. Prosesnya dimulai dari pengajuan permohonan melalui sistem SIHALAL milik BPJPH, dilanjutkan dengan audit langsung ke fasilitas produksi oleh auditor dari Lembaga Pemeriksa Halal (LPH) yang terakreditasi. Hasil audit kemudian diserahkan ke Komisi Fatwa MUI untuk ditinjau dan disahkan sebagai fatwa halal. Setelah fatwa terbit, BPJPH akan menerbitkan Sertifikat Halal Indonesia yang berlaku permanen selama komposisi bahan dan proses produksi tidak berubah. Kami mendampingi seluruh tahapan ini, mulai dari penyiapan dokumen, koordinasi dengan LPH dan MUI, hingga sertifikat terbit di tangan Anda.",
  },
  {
    slug: "registrasi-sertifikat-halal-luar-negeri",
    name: "Registrasi Sertifikat Halal Luar Negeri",
    shortDesc:
      "Bagi perusahaan yang sudah memiliki sertifikat halal dari lembaga luar negeri yang punya perjanjian saling pengakuan (MRA) dengan BPJPH, kami bantu mendaftarkan sertifikat tersebut agar berlaku dan diakui di Indonesia. Prosesnya jauh lebih cepat karena tidak perlu audit ulang di fasilitas produksi.",
    article:
      "Layanan ini ditujukan bagi perusahaan yang produknya diproduksi di luar negeri dan sudah memiliki sertifikat halal dari lembaga sertifikasi setempat yang telah menjalin perjanjian saling pengakuan (Mutual Recognition Agreement/MRA) dengan BPJPH. Alih-alih menjalani proses sertifikasi dari awal, sertifikat halal yang sudah dimiliki cukup didaftarkan ke sistem BPJPH untuk mendapatkan pengakuan resmi di Indonesia. Syaratnya, sertifikat harus diterbitkan oleh lembaga di negara tempat produk tersebut diproduksi. Jalur ini jauh lebih cepat dan hemat biaya dibanding sertifikasi reguler karena tidak memerlukan audit ulang di fasilitas produksi. Kami membantu memverifikasi kelayakan sertifikat Anda dan mengurus seluruh proses pendaftarannya ke BPJPH.",
  },
  {
    slug: "registrasi-makanan-minuman-bpom",
    name: "Registrasi Makanan dan Minuman (BPOM)",
    shortDesc:
      "Layanan pengurusan izin edar BPOM untuk produk pangan olahan, minuman kemasan, hingga bahan baku pangan (kategori MD untuk produksi dalam negeri, ML untuk produk impor). Kami bantu mulai dari penyusunan dokumen teknis, pendaftaran lewat sistem e-Reg Pangan, sampai produk siap dipasarkan secara legal.",
    article:
      "Setiap produk pangan olahan dan minuman kemasan yang beredar di Indonesia wajib memiliki izin edar dari BPOM sebelum bisa dijual secara legal. Kami membantu proses registrasi ini dari awal hingga akhir — mulai dari penyusunan dokumen teknis produk (komposisi, proses produksi, hasil uji laboratorium), pendaftaran melalui sistem e-Reg Pangan BPOM, hingga terbitnya nomor izin edar (kategori MD untuk produk lokal, ML untuk produk impor). Layanan ini cocok untuk produsen makanan, minuman, maupun bahan baku pangan yang ingin memasarkan produknya secara resmi dan legal di seluruh Indonesia.",
  },
  {
    slug: "registrasi-kosmetik-bpom",
    name: "Registrasi Produk Kosmetik (BPOM)",
    shortDesc:
      "Layanan notifikasi kosmetik BPOM (Notifkos) untuk produk perawatan kulit, rambut, wajah, hingga wewangian agar mendapatkan nomor izin edar (NA) resmi. Kami pastikan formula, klaim, dan kemasan produk sesuai standar keamanan BPOM sebelum beredar di pasar Indonesia.",
    article:
      "Produk kosmetik — mulai dari skincare, makeup, perawatan rambut, hingga parfum — wajib memiliki nomor notifikasi (NA) dari BPOM sebelum dipasarkan di Indonesia. Kami membantu proses notifikasi kosmetik (Notifkos) mulai dari review formula dan bahan baku, penyesuaian klaim produk agar sesuai regulasi, penyusunan dokumen teknis, hingga pengajuan melalui sistem resmi BPOM. Kami juga memastikan kemasan dan label produk Anda memenuhi standar keamanan dan ketentuan pelabelan yang berlaku, sehingga produk siap dipasarkan tanpa hambatan regulasi.",
  },
  {
    slug: "registrasi-suplemen-kesehatan-bpom",
    name: "Registrasi Suplemen Kesehatan (BPOM)",
    shortDesc:
      "Layanan pendaftaran izin edar untuk produk suplemen kesehatan seperti vitamin, mineral, ekstrak herbal, hingga produk nutrisi lainnya. Kami bantu penyusunan dokumen keamanan dan klaim khasiat produk sesuai ketentuan BPOM agar suplemen bisa dipasarkan secara legal.",
    article:
      "Produk suplemen kesehatan seperti vitamin, mineral, ekstrak herbal, probiotik, dan produk nutrisi lainnya memerlukan izin edar khusus dari BPOM sebelum dapat dipasarkan. Kami membantu menyusun dokumen keamanan produk, bukti klaim khasiat, serta kelengkapan teknis lain sesuai ketentuan BPOM, kemudian mengajukan pendaftaran hingga izin edar terbit. Layanan ini cocok untuk produsen lokal maupun perusahaan luar negeri yang ingin memasarkan produk suplemen kesehatannya secara legal di pasar Indonesia.",
  },
];

export function getService(slug: string | undefined): Service | undefined {
  if (!slug) return undefined;
  return services.find((s) => s.slug === slug);
}

/** Tiga layanan BPOM yang di footer dikelompokkan di bawah "Izin Edar BPOM". */
export const bpomServiceSlugs = [
  "registrasi-makanan-minuman-bpom",
  "registrasi-kosmetik-bpom",
  "registrasi-suplemen-kesehatan-bpom",
];
