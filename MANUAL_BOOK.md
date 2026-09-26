# Buku Panduan Pengelolaan Website Urushalal (Manual Book)

> Dokumen panduan serah terima pengelolaan website **Urushalal** (PT Ruang Halal Indonesia) bagi pengelola konten, admin, dan pimpinan non-teknis. Panduan ini dirancang agar Anda dapat melakukan pembaruan konten, kontak, gambar, paket harga, hingga publikasi berita secara mandiri tanpa harus memahami pemrograman rumit.

---

## Daftar Isi

1. [Pengantar & Mengenal Struktur Website](#1-pengantar--mengenal-struktur-website)
2. [Tabel Ringkasan Cepat: Mau Ubah Apa?](#2-tabel-ringkasan-cepat-mau-ubah-apa)
3. [Panduan Detail Per Topik](#3-panduan-detail-per-topik)
   - [3.1 Mengubah Judul & Deskripsi Website (SEO & Meta Tags)](#31-mengubah-judul--deskripsi-website-seo--meta-tags)
   - [3.2 Mengedit Halaman "Tentang Kami"](#32-mengedit-halaman-tentang-kami)
   - [3.3 Mengganti Logo & Favicon](#33-mengganti-logo--favicon)
   - [3.4 Mengubah Menu Navigasi Header & Footer](#34-mengubah-menu-navigasi-header--footer)
   - [3.5 Mengubah Info Kontak, Alamat, dan Media Sosial](#35-mengubah-info-kontak-alamat-dan-media-sosial)
   - [3.6 Mengganti Banner/Foto Hero di Halaman Utama](#36-mengganti-bannerfoto-hero-di-halaman-utama)
   - [3.7 Mengubah Kategori Produk Halal & BPOM](#37-mengubah-kategori-produk-halal--bpom)
   - [3.8 Mengubah Paket Harga & Rincian Fitur](#38-mengubah-paket-harga--rincian-fitur)
   - [3.9 Menambah / Mengubah Data & Logo Klien](#39-menambah--mengubah-data--logo-klien)
   - [3.10 Mengubah Pertanyaan Umum (FAQ Tampilan Web)](#310-mengubah-pertanyaan-umum-faq-tampilan-web)
   - [3.11 Mengelola Berita & Artikel Lewat Portal Admin](#311-mengelola-berita--artikel-lewat-portal-admin)
   - [3.12 Melihat Pesan Masuk dari Pengunjung (Form "More Info")](#312-melihat-pesan-masuk-dari-pengunjung-form-more-info)
   - [3.13 Mengubah Pop-up Peringatan Batas Waktu (17 Oktober 2026)](#313-mengubah-pop-up-peringatan-batas-waktu-17-oktober-2026)
   - [3.14 Mengenal Chatbot Asisten Urushalal](#314-mengenal-chatbot-asisten-urushalal)
4. [Cara Melihat Perubahan & Mempublikasikan Website](#4-cara-melihat-perubahan--mempublikasikan-website)
5. [Pengaturan Lingkungan & Akses Database (.env)](#5-pengaturan-lingkungan--akses-database-env)
6. [Kendala Umum (Troubleshooting) & File Terlarang](#6-kendala-umum-troubleshooting--file-terlarang)
7. [Checklist Sebelum Publish ke Publik](#7-checklist-sebelum-publish-ke-publik)

---

## 1. Pengantar & Mengenal Struktur Website

### 1.1 Website ini dibuat menggunakan apa?
Website Urushalal dibangun menggunakan teknologi web modern:
- **React 18 & TypeScript**: Kerangka kerja utama yang membuat website bekerja cepat, interaktif, dan rapi.
- **Vite**: Alat pembuat website (bundler) yang sangat ringan dan cepat saat dijalankan di komputer kerja.
- **Vanilla CSS (`src/styles.css`)**: Sistem desain warna dan tata letak kustom yang ringan tanpa bergantung pada template berat.
- **Supabase**: Sistem database dan akun login admin yang aman di cloud (digunakan untuk menyimpan data Berita, Pesan formulir, dan basis pengetahuan Chatbot).
- **Vercel**: Layanan hosting cloud tempat website Urushalal online dan tayang untuk publik secara otomatis.

Website ini juga mendukung **Dua Bahasa (Bilingual)**: Bahasa Indonesia (`id`) dan Bahasa Inggris (`en`). Setiap kali Anda mengubah teks di halaman, pastikan versi bahasa Inggrisnya juga disesuaikan jika diperlukan.

---

### 1.2 Gambaran Struktur Folder dalam Bahasa Sederhana

Ibaratkan project website ini seperti sebuah kantor penerbitan:

```text
urushalal/
├── public/                📁 Lemari Aset Publik (Foto, logo, ikon yang bisa dibuka langsung)
│   ├── images/            📁 Sub-folder foto kartu produk dan logo perusahaan
│   ├── logo-klien/        📁 Tempat file gambar logo perusahaan klien
│   ├── favicon.png        🖼️ Ikon kecil yang muncul di tab browser
│   ├── hero-1.jpeg        🖼️ Foto banner utama (Slide Sertifikasi Halal)
│   └── hero-2.jpeg        🖼️ Foto banner kedua (Slide Izin BPOM)
│
├── src/                   📁 Dapur Kerja Utama (Tempat semua kode dan teks diracik)
│   ├── components/        📁 Komponen Tampilan (Header, Footer, FAQ, Alur, Popup, Tombol WA)
│   ├── data/              📁 Data Terstruktur (Data klien, konfigurasi slide hero, daftar layanan)
│   ├── i18n/              📁 Kamus Teks (Pusat semua tulisan teks website: id.ts dan en.ts)
│   ├── pages/             📁 Halaman Penuh (Beranda, Tentang Kami, Detail Layanan, Berita)
│   │   └── admin/         📁 Halaman Portal Admin (Login admin, kelola berita, baca pesan masuk)
│   ├── utils/             📁 Pengaturan praktis (Nomor WhatsApp resmi di contact.ts)
│   └── styles.css         🎨 Buku Panduan Warna & Tampilan CSS
│
├── index.html             📄 Halaman Utama Gerbang Web (Pengaturan judul tab & SEO Google/WA)
├── package.json           📦 Daftar spesifikasi program (JANGAN DIUBAH SEMBARANGAN)
└── vercel.json            🌐 Pengaturan server hosting Vercel
```

---

## 2. Tabel Ringkasan Cepat: Mau Ubah Apa?

Gunakan tabel ini untuk mencari file yang harus dibuka saat ingin mengubah bagian tertentu pada website:

| Mau Ubah Apa | Di Mana Tempatnya | Path File Lengkap | Keterangan Singkat |
|---|---|---|---|
| **Judul tab & Deskripsi SEO Google/WhatsApp** | File HTML & Kamus Bahasa | `index.html`<br>`src/i18n/id.ts` & `en.ts` | Mengatur judul di browser dan ringkasan saat link dikirim ke WA/sosmed. |
| **Nomor WhatsApp Resmi** | Konfigurasi Kontak | `src/utils/contact.ts` | Mengubah nomor tujuan semua tombol chat WhatsApp di web. |
| **Email & Jam Operasional** | Footer & Kamus Bahasa | `src/components/Footer.tsx`<br>`src/i18n/id.ts` | Mengubah email `halo@urushalal.id` dan jam kerja operasional kantor. |
| **Media Sosial (Instagram/LinkedIn)** | *Belum ditemukan / Perlu dikonfirmasi* | `src/components/Footer.tsx` | Belum ada link medsos terpasang di kode saat ini (panduan pasang ada di bab 3.5). |
| **Logo Website (Header & Footer)** | Gambar Logo & Ikon | `public/images/logo/logo3.jpeg`<br>`src/components/icons.tsx` | Mengganti gambar logo Urushalal di bagian atas dan bawah web. |
| **Favicon (Ikon tab browser)** | File Ikon Web | `public/favicon.png` | Ikon kecil di samping judul tab browser. |
| **Halaman "Tentang Kami"** | Kamus Teks & Halaman | `src/i18n/id.ts` & `en.ts`<br>`src/pages/TentangKamiPage.tsx` | Teks profil perusahaan, visi, misi, dan alasan memilih kami. |
| **Foto Banner / Hero Slider** | Folder Gambar & Konfigurasi | `public/hero-1.jpeg`<br>`public/hero-2.jpeg`<br>`src/data/heroSlides.ts` | Mengganti 2 foto geser di bagian paling atas halaman beranda. |
| **Menu Navigasi Atas (Header)** | Komponen Header & Kamus | `src/components/Header.tsx`<br>`src/i18n/id.ts` | Mengubah teks menu atau menambah tautan navigasi baru. |
| **Footer (Bagian Bawah Web)** | Komponen Footer & Kamus | `src/components/Footer.tsx`<br>`src/i18n/id.ts` | Mengubah tautan legal, hak cipta, dan deskripsi footer. |
| **Kategori Produk yang Disertifikasi** | Gambar Kartu & Kamus Teks | `public/images/card/`<br>`src/i18n/id.ts` | Mengubah foto & tulisan kartu produk Halal dan BPOM. |
| **Paket Harga & Rincian Fitur** | Kamus Bahasa | `src/i18n/id.ts` | Mengubah nominal harga Rp dan checklist fitur tiap paket. |
| **Daftar Klien & Logo Perusahaan** | File Data JSON & Folder Logo | `src/data/data-klien.json`<br>`public/logo-klien/` | Menambah klien baru yang pernah didampingi Urushalal. |
| **FAQ (Tanya Jawab di Beranda)** | Kamus Bahasa | `src/i18n/id.ts` | Mengubah pertanyaan dan jawaban umum seputar Halal & BPOM. |
| **Tulis / Edit / Hapus Berita** | Halaman Admin Web | URL: `/portal-admin` | Mengelola artikel berita tanpa perlu menyentuh file kode sama sekali. |
| **Membaca Pesan Formulir Masuk** | Halaman Admin Web | URL: `/portal-admin` | Membaca pesan dari pengunjung lewat tombol "More Info". |
| **Peringatan Batas Waktu 17 Okt 2026** | Kamus Bahasa & Komponen | `src/i18n/id.ts`<br>`src/components/HalalDeadlineModal.tsx` | Pop-up peringatan wajib halal yang muncul setelah 9 detik. |
| **Warna / Tema Tampilan Web** | File CSS Styling | `src/styles.css` | Mengatur palet warna hijau, biru, krem, atau font huruf. |

---

## 3. Panduan Detail Per Topik

### 3.1 Mengubah Judul & Deskripsi Website (SEO & Meta Tags)

Ketika link website `https://sertifikasihalal-chi.vercel.app/` dibagikan di WhatsApp, Telegram, atau muncul di hasil pencarian Google, teks judul dan deskripsi inilah yang akan terbaca.

![Tampilan Preview Link WhatsApp dan Judul Tab Browser](screenshots/seo-preview.png)

#### Path File:
1. `index.html` (untuk Google, WhatsApp, Facebook, dan Twitter)
2. `src/i18n/id.ts` dan `src/i18n/en.ts` (untuk judul tab saat website dibuka)

#### Langkah-langkah:
1. Buka file `index.html` menggunakan text editor (misal VS Code atau Notepad).
2. Cari baris nomor 6, 14–15, 23–24, dan baris 55.
3. Ubah teks di dalam tanda kutip sesuai kebutuhan.
4. Buka file `src/i18n/id.ts`, cari bagian `meta:` pada baris 114–122, lalu sesuaikan isinya.
5. Simpan file.

#### Cuplikan Kode:

**File: `index.html`**
*Sebelum:*
```html
<meta name="description" content="Urushalal — pendamping resmi sertifikasi halal BPJPH untuk UMKM dan korporasi di Indonesia." />
...
<meta property="og:title" content="Urushalal — Urus Sertifikasi Halal Jadi Gampang" />
<meta property="og:description" content="Pendamping resmi sertifikasi halal BPJPH dan izin edar BPOM untuk UMKM dan korporasi di Indonesia." />
...
<title>Urushalal — Urus Sertifikasi Halal Jadi Gampang</title>
```

*Sesudah (Contoh):*
```html
<meta name="description" content="Urushalal — Layanan Cepat & Terpercaya Sertifikasi Halal BPJPH & Izin Edar BPOM di Seluruh Indonesia." />
...
<meta property="og:title" content="Urushalal — Solusi Lengkap Izin Halal & BPOM Cepat" />
<meta property="og:description" content="Konsultasi gratis sertifikasi halal resmi BPJPH dan notifikasi BPOM untuk pengusaha Indonesia." />
...
<title>Urushalal — Solusi Lengkap Izin Halal & BPOM Cepat</title>
```

> ⚠️ **Peringatan:**
> - Jangan menghapus tanda petik ganda (`"..."`) atau tanda kurung sudut (`<` dan `>`).
> - Jangan mengubah baris `<div id="root"></div>` dan `<script type="module" src="/src/main.tsx"></script>`. Jika baris tersebut terhapus, seluruh website akan blank putih!

---

### 3.2 Mengedit Halaman "Tentang Kami"

Halaman "Tentang Kami" dapat diakses di `/tentang-kami`. Halaman ini berisi Profil Singkat, Visi, Misi, dan 4 Keunggulan Urushalal.

![Halaman Tentang Kami](screenshots/tentang-kami-page.png)

#### Path File:
1. Teks konten: `src/i18n/id.ts` (Bahasa Indonesia) dan `src/i18n/en.ts` (Bahasa Inggris)
2. Struktur tata letak / tampilan: `src/pages/TentangKamiPage.tsx`

#### Langkah-langkah:
1. Buka file `src/i18n/id.ts`.
2. Cari kata kunci `about:` (berada sekitar baris 546).
3. Anda akan menemukan bagian:
   - `profileTitle` dan `profileText`: Teks profil pengantar.
   - `visionTitle` dan `visionText`: Teks visi.
   - `missionTitle` dan `mission`: Daftar butir misi (dalam kurung siku `[...]`).
   - `whyTitle` dan `why`: Daftar butir "Kenapa Memilih Kami".
4. Edit teks yang berada di dalam tanda petik ganda (`"..."`).
5. Jika Anda menambahkan poin baru pada misi atau keunggulan, pastikan dipisahkan dengan tanda koma (`,`).
6. Buka `src/i18n/en.ts` dan ubah teks yang bersesuaian agar pengunjung versi bahasa Inggris mendapatkan info yang sinkron.
7. Simpan file.

#### Cuplikan Kode:

**File: `src/i18n/id.ts`**
*Sebelum:*
```typescript
about: {
  metaTitle: "Tentang Kami — Urushalal",
  eyebrow: "Tentang Kami",
  titleHead: "Partner perizinan yang",
  titleAccent: "mendampingi sampai tuntas.",
  profileTitle: "Profil Singkat",
  profileText:
    "Urushalal sebagai platform yang dibuat oleh PT Ruang Halal Indonesia hadir untuk membantu pelaku usaha...",
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
```

*Sesudah (Contoh Menambah Poin Misi Baru):*
```typescript
  mission: [
    "Memberikan layanan pendampingan sertifikasi halal dan registrasi BPOM yang cepat, transparan, dan sesuai regulasi.",
    "Membantu pelaku usaha lokal maupun luar negeri memahami dan memenuhi persyaratan hukum yang berlaku di Indonesia.",
    "Menjadi satu pintu layanan (one-stop-service) untuk kebutuhan legalitas produk, mulai dari halal, BPOM, hingga dokumentasi pendukung lainnya.",
    "Menyediakan bimbingan teknis audit lapangan agar lolos verifikasi dalam satu kali pengajuan.",
  ],
```

> ⚠️ **Peringatan:**
> - Setiap baris dalam tanda kurung siku `[...]` wajib diakhiri dengan tanda koma `,`. Jangan sampai tanda koma terhapus karena akan menyebabkan pesan error program.

---

### 3.3 Mengganti Logo & Favicon

Website Urushalal memiliki dua jenis logo:
1. **Logo Perusahaan**: Tampil di Header navigasi atas dan Footer bawah.
2. **Favicon**: Ikon kecil yang tampak di tab browser.

![Logo Header dan Favicon Tab](screenshots/logo-favicon.png)

#### Path File:
- Logo Gambar: `public/images/logo/logo3.jpeg`
- Pendaftaran Logo di Kode: `src/components/icons.tsx` (fungsi `LogoMark`)
- Favicon Browser: `public/favicon.png`
- Pendaftaran Favicon di Kode: `index.html` (baris 10)

#### Format & Ukuran yang Disarankan:
- **Logo Perusahaan**:
  - Format: Disarankan **PNG dengan latar belakang transparan** atau JPG dengan warna latar putih murni (`#ffffff`).
  - Resolusi: Minimal **200 x 200 pixel** atau **512 x 512 pixel** (di web otomatis disesuaikan ukurannya menjadi tinggi 34px untuk header dan 26px untuk admin, resolusi tinggi membuat logo terlihat tajam di layar handphone dan laptop retina).
- **Favicon**:
  - Format: **PNG**.
  - Ukuran: Persegi presisi, misalnya **64 x 64 pixel** atau **256 x 256 pixel**.

#### Langkah-langkah Mengganti Logo:
1. Siapkan file logo baru Anda dengan format PNG atau JPG.
2. **Cara Termudah (Tanpa Ubah Kode):**
   - Beri nama file gambar baru Anda: `logo3.jpeg`.
   - Masukkan dan timpa file lama di folder `public/images/logo/logo3.jpeg`.
3. **Cara Menggunakan Nama File Baru:**
   - Masukkan file baru ke folder `public/images/logo/` (misalnya: `logo-utama.png`).
   - Buka file `src/components/icons.tsx`.
   - Ubah baris 23 dari `src="/images/logo/logo3.jpeg"` menjadi nama file baru Anda `src="/images/logo/logo-utama.png"`.

#### Cuplikan Kode:

**File: `src/components/icons.tsx`**
*Sebelum:*
```typescript
export function LogoMark({ className, size = 34 }: IconProps) {
  return (
    <img
      className={className ? `logo-mark ${className}` : "logo-mark"}
      src="/images/logo/logo3.jpeg"
      alt=""
      width={size}
      height={size}
    />
  );
}
```

*Sesudah:*
```typescript
export function LogoMark({ className, size = 34 }: IconProps) {
  return (
    <img
      className={className ? `logo-mark ${className}` : "logo-mark"}
      src="/images/logo/logo-utama.png"
      alt="Logo Urushalal"
      width={size}
      height={size}
    />
  );
}
```

#### Langkah-langkah Mengganti Favicon:
1. Siapkan gambar favicon berukuran persegi (contoh: 256x256 px).
2. Beri nama file: `favicon.png`.
3. Timpa file lama di folder `public/favicon.png`.
4. Bersihkan cache browser Anda (Ctrl + F5) untuk melihat ikon baru di tab browser.

---

### 3.4 Mengubah Menu Navigasi Header & Footer

Header dan Footer menghubungkan pengunjung ke berbagai bagian website.

![Navigasi Header dan Footer](screenshots/header-footer-nav.png)

#### Path File:
1. Teks Nama Menu: `src/i18n/id.ts` (bagian `header.nav` dan `footer`)
2. Struktur Link Header: `src/components/Header.tsx`
3. Struktur Link Footer: `src/components/Footer.tsx`

#### Langkah-langkah Mengubah Teks Menu:
1. Buka `src/i18n/id.ts`.
2. Cari bagian `header:` pada baris 131–138.
3. Ubah nama menu sesuai keinginan.
4. Lakukan hal yang sama pada `src/i18n/en.ts`.

#### Cuplikan Kode:

**File: `src/i18n/id.ts`**
*Sebelum:*
```typescript
header: {
  nav: {
    home: "Beranda",
    about: "Tentang Kami",
    services: "Layanan",
    flow: "Alur",
    news: "Berita",
  },
```

*Sesudah (Contoh):*
```typescript
header: {
  nav: {
    home: "Home",
    about: "Tentang Kami",
    services: "Layanan Halal & BPOM",
    flow: "Tahapan Alur",
    news: "Kabar & Berita",
  },
```

#### Langkah-langkah Mengubah / Menambah Link di Header:
1. Buka file `src/components/Header.tsx`.
2. Cari baris 46–53:
   - `linksBefore`: Menu yang berada di sebelah kiri tombol dropdown "Layanan".
   - `linksAfter`: Menu yang berada di sebelah kanan tombol dropdown "Layanan".
3. Tambahkan baris baru dengan format `{ to: "/alamat-halaman", label: "Nama Label" }`.

*Sebelum:*
```typescript
const linksBefore = [
  { to: "/", label: t.header.nav.home },
  { to: "/tentang-kami", label: t.header.nav.about },
];
const linksAfter = [
  { to: "/#alur", label: t.header.nav.flow },
  { to: "/berita", label: t.header.nav.news },
];
```

*Sesudah (Contoh menambah menu FAQ langsung di navigasi atas):*
```typescript
const linksAfter = [
  { to: "/#alur", label: t.header.nav.flow },
  { to: "/#faq", label: "FAQ" },
  { to: "/berita", label: t.header.nav.news },
];
```

---

### 3.5 Mengubah Info Kontak, Alamat, dan Media Sosial

Informasi kontak sangat krusial karena seluruh tombol "Konsultasi Gratis" di website terhubung langsung ke WhatsApp dan email admin.

![Bagian Kontak dan Footer](screenshots/kontak-info.png)

#### Path File:
1. Nomor WhatsApp Utama: `src/utils/contact.ts`
2. Email, Alamat, Jam Kerja di Footer: `src/components/Footer.tsx` & `src/i18n/id.ts`
3. Media Sosial: `src/components/Footer.tsx` *(Status: Belum ditemukan / Perlu dikonfirmasi)*

#### Langkah-langkah Mengubah Nomor WhatsApp:
Semua tombol WA di seluruh website (Header, Hero slider, Kartu Paket, Tombol Mengambang / FAB, dan Footer) mengambil nomor dari satu tempat yang sama: `src/utils/contact.ts`.

1. Buka `src/utils/contact.ts`.
2. Ubah `WA_NUMBER`: Nomor tanpa spasi dan diawali kode negara `62` (jangan pakai `+` atau `0`). Contoh: `6281234567890`.
3. Ubah `WA_DISPLAY`: Nomor yang enak dibaca pengunjung di footer. Contoh: `0812 3456 7890`.
4. Simpan file. Otomatis seluruh tombol WhatsApp di web berganti ke nomor baru.

#### Cuplikan Kode:

**File: `src/utils/contact.ts`**
*Sebelum:*
```typescript
export const WA_NUMBER = "6281586005256";
export const WA_DISPLAY = "0815 8600 5256";
export const WA_LINK = `https://wa.me/${WA_NUMBER}`;
```

*Sesudah:*
```typescript
export const WA_NUMBER = "6281299998888";
export const WA_DISPLAY = "0812 9999 8888";
export const WA_LINK = `https://wa.me/${WA_NUMBER}`;
```

#### Langkah-langkah Mengubah Email & Alamat Kantor di Footer:
1. Buka `src/components/Footer.tsx`.
2. Cari baris 68–79 (blok `<h4>{t.footer.contactTitle}</h4>`).
3. Ubah email pada baris 70 (`mailto:halo@urushalal.id`).
4. Untuk kota dan jam operasional, buka `src/i18n/id.ts` pada baris 588–589:
   - `city: "Jakarta Selatan"`
   - `hours: "Senin–Jumat, 09–17 WIB"`

#### Media Sosial (Instagram, LinkedIn, dll):
> ⚠️ **Status di Codebase:** **Belum ditemukan / perlu dikonfirmasi**.
> Saat ini, di codebase project belum ada ikon atau link media sosial (Instagram, TikTok, LinkedIn, YouTube) yang terpasang di Footer maupun Header.

**Cara Menambahkan Media Sosial ke Footer (Jika Diperlukan):**
1. Buka file `src/components/Footer.tsx`.
2. Cari bagian kolom kontak (baris 78).
3. Tambahkan baris link media sosial Anda, contoh:
```tsx
<li>
  <a href="https://instagram.com/urushalal.id" target="_blank" rel="noopener noreferrer">
    Instagram: @urushalal.id
  </a>
</li>
<li>
  <a href="https://linkedin.com/company/urushalal" target="_blank" rel="noopener noreferrer">
    LinkedIn: Urushalal
  </a>
</li>
```

---

### 3.6 Mengganti Banner/Foto Hero di Halaman Utama

Di bagian paling atas halaman Beranda, terdapat slider 2 slide:
- **Slide 1**: Bertema Sertifikasi Halal (Nuansa Hijau)
- **Slide 2**: Bertema Izin Edar BPOM (Nuansa Biru)

![Slider Hero Utama](screenshots/hero-slider.png)

#### Path File:
- Foto Slide 1 Komputer: `public/hero-1.jpeg`
- Foto Slide 1 HP (Potret): `public/hero-1-portrait.jpeg`
- Foto Slide 2 Komputer: `public/hero-2.jpeg`
- Foto Slide 2 HP (Potret): `public/hero-2-portrait.jpeg`
- Konfigurasi Path: `src/data/heroSlides.ts`
- Teks Judul & Poin: `src/i18n/id.ts` (di bawah `hero.slides:`)
- Panduan Foto: `public/README.txt`

#### Ukuran & Ketentuan Foto:
- **Layar Komputer (Landscape)**: Format JPG/JPEG, perbandingan rasio **3:2**, resolusi minimal **1536 x 1024 pixel**.
- **Layar Handphone (Portrait)**: Format JPG/JPEG, perbandingan rasio **3:4** atau **4:5**, resolusi minimal **800 x 1000 pixel**.
- Warna panel dan gradien hijau/biru dibuat otomatis oleh sistem website (CSS overlay). Mengganti foto tidak akan merusak warna tulisan atau warna tombol.

#### Langkah-langkah Mengganti Foto Hero:
1. Siapkan foto baru sesuai ukuran di atas.
2. Beri nama file persis seperti file aslinya:
   - `hero-1.jpeg` dan `hero-1-portrait.jpeg` untuk slide halal.
   - `hero-2.jpeg` dan `hero-2-portrait.jpeg` untuk slide BPOM.
3. Masukkan dan timpa file-file tersebut ke dalam folder `public/`.
4. Jika ingin mengubah teks judul, subjudul, atau angka statistik (misal: "200+ Produk Tersertifikasi"), buka file `src/i18n/id.ts` pada bagian `hero.slides` (baris 173–213).

---

### 3.7 Mengubah Kategori Produk Halal & BPOM

Di halaman beranda terdapat carousel kartu geser yang menampilkan jenis-jenis produk yang dilayani, lengkap dengan foto latar belakang dan ikon.

![Kategori Produk yang Disertifikasi](screenshots/product-categories.png)

#### Path File:
- Foto Kartu Produk: `public/images/card/`
  - `halal-makanan_dan_minuman.jpg`
  - `halal-suplemen_makanan.jpg`
  - `halal-kosmetik.jpg`
  - `halal-logistik.jpg`
  - `halal-barang_gunaan.jpg`
  - `halal-produk_rumah_tangga.jpg`
- Judul & Penjelasan Produk: `src/i18n/id.ts` (bagian `products:`, baris 262–315)
- Pengaturan Ikon & File Foto: `src/components/ProductCategories.tsx`

#### Langkah-langkah Mengubah Teks Kategori:
1. Buka file `src/i18n/id.ts`.
2. Cari bagian `products:` (baris 262 untuk Halal dan 298 untuk BPOM).
3. Ubah `title` (Nama produk) dan `description` (Penjelasan singkat).
4. Simpan file.

#### Langkah-langkah Mengganti Foto Kartu:
1. Siapkan foto persegi panjang (misalnya rasio 4:3 atau 16:9, ukuran 600x450 px).
2. Masukkan ke folder `public/images/card/`.
3. Anda bisa menimpa file lama dengan nama yang sama, atau jika menggunakan nama file baru, daftarkan nama file tersebut di `src/components/ProductCategories.tsx` pada baris 16–30.

---

### 3.8 Mengubah Paket Harga & Rincian Fitur

Bagian paket harga menampilkan pilihan paket sertifikasi (Mikro/Kecil, Menengah, Besar) untuk kategori Produk dan Jasa, lengkap dengan daftar fasilitas yang diperoleh.

![Tabel Paket Harga](screenshots/pricing-packages.png)

#### Path File:
- `src/i18n/id.ts` (bagian `packageCategories` baris 88–111 dan `packages.features` baris 390–412)
- `src/i18n/en.ts` (versi bahasa Inggris)

#### Langkah-langkah Mengubah Nominal Harga:
1. Buka `src/i18n/id.ts`.
2. Cari baris 88–111. Di sana terdapat kategori `"Produk"` dan `"Jasa"`.
3. Temukan baris `price: "Rp5.000.000"` atau `"Mulai dari Rp20.000.000"`.
4. Ubah angka harganya sesuai ketentuan manajemen.
5. Simpan file.

#### Langkah-langkah Mengubah Poin Checklist Fitur Paket:
1. Masih di `src/i18n/id.ts`, scroll ke baris 390–412 (`packages.features`).
2. Terdapat 3 tingkatan paket:
   - `micro`: Paket Mikro/Kecil
   - `medium`: Paket Menengah
   - `large`: Paket Besar
3. Tambah, edit, atau hapus kalimat fitur di dalam tanda kurung siku `[...]`.

#### Cuplikan Kode:

**File: `src/i18n/id.ts`**
*Sebelum:*
```typescript
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
```

*Sesudah (Contoh menambah garansi pendampingan):*
```typescript
features: {
  micro: [
    "Konsultasi gratis untuk skema & pemetaan produk",
    "Kaji bahan & supplier lengkap",
    "Flowchart produksi disusun",
    "1x audit + 1x audit pendampingan",
    "Tracking status via dashboard",
    "Pembuatan akun Sihalal",
    "Free Konsultasi",
    "Pendampingan perbaikan dokumen audit",
  ],
```

---

### 3.9 Menambah / Mengubah Data & Logo Klien

Bagian "Klien Kami" menampilkan logo perusahaan yang telah mempercayakan pengurusan legalitas produknya ke Urushalal, lengkap dengan bendera negara asal dan deskripsi singkat.

![Daftar Klien Urushalal](screenshots/clients-section.png)

#### Path File:
- Data Klien (Nama, Negara, Layanan): `src/data/data-klien.json`
- File Logo Klien: `public/logo-klien/`

#### Langkah-langkah Menambah Klien Baru:
1. Siapkan file logo perusahaan klien (format PNG atau JPG, latar transparan atau putih, ukuran rekomendasi lebar 300px).
2. Beri nama file yang rapi tanpa spasi, contoh: `16-nama-klien-baru.png`.
3. Masukkan file tersebut ke folder `public/logo-klien/`.
4. Buka file `src/data/data-klien.json`.
5. Tambahkan 1 baris objek klien baru di dalam array `"clients"`.

#### Cuplikan Kode:

**File: `src/data/data-klien.json`**
*Contoh Menambahkan Klien di Baris Paling Bawah:*
```json
    {
      "id": 16,
      "name": "PT Sumber Rasa Sejahtera",
      "country": "Indonesia",
      "countryEn": "Indonesia",
      "flag": "🇮🇩",
      "flagCode": "id",
      "description": "Produsen makanan ringan dan bumbu tabur kemasan dengan distribusi nasional.",
      "descriptionEn": "A snack and seasoning manufacturer with national distribution across Indonesia.",
      "layananRuangHalal": "Sertifikasi Halal (BPJPH/SIHALAL)",
      "layananRuangHalalEn": "Halal Certification (BPJPH/SIHALAL)",
      "logo": "16-nama-klien-baru.png"
    }
```

> ⚠️ **Peringatan:**
> - Pastikan nama file di baris `"logo"` sama persis (termasuk huruf besar/kecilnya) dengan nama file di folder `public/logo-klien/`.
> - Jangan lupa memberi tanda koma (`,`) di akhir baris klien sebelumnya.

---

### 3.10 Mengubah Pertanyaan Umum (FAQ Tampilan Web)

Bagian FAQ di halaman Beranda menjawab pertanyaan-pertanyaan yang paling sering diajukan klien, dibagi dalam 2 tab: **Sertifikasi Halal** dan **Izin BPOM**.

![Pertanyaan Umum FAQ di Beranda](screenshots/faq-section.png)

#### Path File:
- `src/i18n/id.ts` (bagian `faq:` baris 426–497)
- `src/i18n/en.ts` (versi bahasa Inggris)

#### Langkah-langkah:
1. Buka file `src/i18n/id.ts`.
2. Cari bagian `faq:`.
3. Anda akan melihat dua kelompok pertanyaan:
   - `halalItems`: Daftar pertanyaan seputar Halal (baris 433–474).
   - `bpomItems`: Daftar pertanyaan seputar BPOM (baris 475–496).
4. Setiap item memiliki:
   - `q`: Pertanyaan (Question).
   - `a`: Jawaban (Answer).
5. Edit teks pertanyaan atau jawaban yang diinginkan. Anda juga bisa menambah pertanyaan baru dengan format:
   ```typescript
   {
     q: "Pertanyaan baru Anda di sini?",
     a: "Jawaban lengkap penjelasan Anda di sini.",
   },
   ```

---

### 3.11 Mengelola Berita & Artikel Lewat Portal Admin

Kabar, tips, dan panduan regulasi tidak perlu diedit lewat file kode. Website Urushalal sudah dilengkapi dengan **Portal Admin Resmi**.

![Portal Login Admin](screenshots/admin-login.png)

#### Alamat Akses & Login:
- URL Portal Admin: `https://[domain-website-anda]/portal-admin` (atau `http://localhost:5173/portal-admin` saat uji coba lokal).
- Masukkan **Email** dan **Password** admin yang telah terdaftar di Supabase Auth.
- Setelah berhasil masuk, Anda akan diarahkan ke Dashboard Admin di `/admin/dashboard`.

![Dashboard Kelola Berita](screenshots/admin-news.png)

#### Fitur di Menu "Kelola Berita" (`/admin/berita`):
1. **Melihat Daftar Berita**: Melihat semua artikel yang tersimpan, kategori, tanggal tayang, dan status (Published atau Draft).
2. **Menambah Berita Baru**: Klik tombol `+ Tambah Berita`.
   - **Judul Berita**: Masukkan judul artikel. URL slug akan terisi otomatis.
   - **Kategori**: Pilih salah satu (`Halal`, `BPOM`, `Regulasi`, `Informasi`, `Tips & Panduan`).
   - **Foto Sampul (Thumbnail)**: Klik tombol upload untuk memilih gambar dari komputer. Gambar akan otomatis tersimpan di cloud storage Supabase.
   - **Ringkasan Singkat (Excerpt)**: 1–2 kalimat pengantar yang tampil di kartu preview.
   - **Isi Artikel**: Tulis artikel menggunakan format teks rapi (Markdown). Anda bisa membuat tulisan tebal, miring, poin nomor, dan sub-judul.
   - **Tombol WhatsApp Khusus**: Anda bisa mengatur kalimat ajakan konsultasi khusus untuk artikel tersebut.
   - **Versi Bahasa Inggris (Opsional)**: Anda bisa mengisi judul dan isi versi Inggris agar otomatis muncul saat pengunjung memilih bendera bahasa Inggris.
   - **Status Publikasi**: Pilih `Draft` (belum tayang untuk umum) atau `Published` (langsung tayang di website).
3. **Mengedit Berita**: Klik tombol `Edit` di samping artikel yang ingin diperbarui, lakukan perubahan, lalu klik `Simpan Perubahan`.
4. **Menghapus Berita**: Klik tombol `Hapus` warna merah. Sistem akan meminta konfirmasi sebelum artikel dihapus permanen.

---

### 3.12 Melihat Pesan Masuk dari Pengunjung (Form "More Info")

Di pojok kanan bawah seluruh halaman publik terdapat tombol mengambang "More Info". Pengunjung yang membuka tombol ini bisa mengklik chat WhatsApp atau mengirim formulir pesan singkat.

![Tombol Mengambang More Info dan Halaman Pesan Masuk](screenshots/more-info-messages.png)

#### Cara Melihat Pesan:
1. Masuk ke Portal Admin di `/portal-admin`.
2. Klik menu **Pesan Masuk** di sidebar sebelah kiri (`/admin/pesan`).
3. Anda akan melihat tabel berisi:
   - **Nama Pengunjung**
   - **No. HP / Email Kontak**
   - **Isi Pesan**
   - **Tanggal & Waktu Masuk**
   - **Status Follow Up** (`Belum Ditindaklanjuti` warna oranye atau `Sudah Ditindaklanjuti` warna hijau).
4. **Update Status & Beri Catatan:**
   - Klik tombol status pada pesan yang ingin direspons.
   - Ubah status menjadi *Sudah Ditindaklanjuti*.
   - Tambahkan catatan internal tim (contoh: *"Sudah ditelepon via WA oleh Bu Tina, tertarik sertifikasi kosmetik 5 produk"*).
   - Klik **Simpan**.

---

### 3.13 Mengubah Pop-up Peringatan Batas Waktu (17 Oktober 2026)

Saat pengunjung membuka website selama kurang lebih 9 detik, akan muncul pop-up peringatan penting mengenai batas waktu wajib sertifikasi halal sesuai regulasi BPJPH.

![Pop-up Peringatan Batas Waktu Halal](screenshots/deadline-modal.png)

#### Path File:
- Teks Judul, Penjelasan, & Tombol: `src/i18n/id.ts` (bagian `deadlineModal:` baris 595–601)
- Pengaturan Waktu Tayang (Timer): `src/components/HalalDeadlineModal.tsx` (baris 15)

#### Langkah-langkah Mengubah Teks Peringatan:
1. Buka `src/i18n/id.ts`.
2. Cari bagian `deadlineModal:`:
   - `title`: Judul besar peringatan.
   - `description`: Isi penjelasan risiko jika melewati batas waktu.
   - `cta`: Tulisan di tombol ajakan (default: *"Konsultasi Gratis"* yang langsung membuka WhatsApp).
3. Ubah teks di dalam tanda kutip.

#### Catatan Teknis Waktu Tayang:
Pop-up ini menggunakan sistem `sessionStorage`. Artinya, jika pengunjung sudah mengklik tombol tutup (tanda silang `X`), pop-up tidak akan muncul mengganggu lagi selama pengunjung tersebut masih berada di tab browser yang sama.

---

### 3.14 Mengenal Chatbot Asisten Urushalal

Di sebelah kanan tombol More Info, terdapat ikon balon obrolan yang membuka **Asisten Urushalal (Chatbot AI)**.

![Chatbot Asisten Urushalal](screenshots/chatbot-widget.png)

#### Cara Kerja Chatbot:
1. Pengunjung mengetik pertanyaan seputar halal/BPOM (misal: *"Berapa biaya sertifikasi halal?"* atau *"Apakah babi bisa disertifikasi?"*).
2. Sistem mencari jawaban yang paling sesuai dari database FAQ di Supabase menggunakan algoritma pemrosesan bahasa alami (TF-IDF & Text Normalization).
3. Jika pengunjung bertanya di luar materi, bot akan memberikan jawaban ramah dan mengarahkan pengunjung untuk berkonsultasi langsung ke WhatsApp tim Urushalal.
4. **Basis Data Jawaban**: Pertanyaan & jawaban chatbot dikelola di database Supabase pada tabel `faqs`.

---

## 4. Cara Melihat Perubahan & Mempublikasikan Website

Setelah Anda mengedit file di komputer kerja, ikuti langkah-langkah berikut untuk melihat hasilnya di komputer sendiri dan meluncurkannya ke internet agar bisa dilihat semua orang.

---

### 4.1 Menjalankan Website di Komputer Lokal (Development Mode)

Sebelum perubahan diluncurkan ke website resmi, Anda bisa melihat hasilnya secara langsung di laptop/komputer kerja Anda terlebih dahulu:

1. Buka aplikasi **Terminal** (atau Command Prompt / PowerShell / Terminal di VS Code).
2. Pastikan posisi terminal berada di folder project `urushalal`.
3. Jalankan perintah instalasi (hanya jika baru pertama kali atau ada update paket):
   ```bash
   pnpm install
   ```
4. Jalankan server lokal:
   ```bash
   pnpm dev
   ```
5. Terminal akan menampilkan tautan seperti:
   ```text
   VITE v5.4.11  ready in 320 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```
6. Buka browser (Chrome / Edge / Firefox) dan kunjungi alamat **`http://localhost:5173`**.
7. Website akan tampil persis seperti aslinya. Setiap kali Anda menekan `Ctrl + S` untuk menyimpan file yang Anda edit, browser akan **otomatis memuat ulang sendiri** menampilkan perubahan terbaru.
8. Untuk mematikan server lokal, tekan `Ctrl + C` di terminal.

---

### 4.2 Memeriksa Hasil Sebelum Dipublikasikan (Test Build)

Sebelum mengirimkan perubahan ke internet, sangat disarankan untuk menjalankan perintah pengujian build untuk memastikan tidak ada kesalahan ketik (seperti lupa tanda koma atau petik):

```bash
pnpm build
```

- Jika proses selesai dengan tulisan hijau `✓ built in ...ms`, artinya seluruh file aman dan siap dipublikasikan!
- Jika Anda ingin melihat tampilan versi rilisnya di komputer lokal:
  ```bash
  pnpm preview
  ```

---

### 4.3 Mempublikasikan Perubahan ke Website Live (Deploy)

Project Urushalal sudah terhubung secara otomatis dengan **Vercel** melalui repository **GitHub**.

#### Cara 1: Deploy Otomatis Lewat Git (Sangat Direkomendasikan)
Cukup kirimkan perubahan file Anda ke branch `main` di GitHub. Vercel akan otomatis mendeteksi perubahan tersebut dan memperbarui website live dalam waktu 1–2 menit:

```bash
git add .
git commit -m "Update konten: kontak dan harga paket terbaru"
git push origin main
```

#### Cara 2: Deploy Manual Menggunakan Vercel CLI
Jika komputer Anda sudah terpasang alat Vercel:
```bash
npm install -g vercel
vercel login
vercel --prod
```

> ⚠️ **Peringatan Penting Soal Lockfile (`pnpm-lock.yaml`):**
> Jika Anda pernah menjalankan perintah instalasi paket baru atau update versi dependensi di `package.json`, pastikan file `pnpm-lock.yaml` ikut di-commit ke Git. Jika tidak, proses build di Vercel akan gagal dengan pesan error `ERR_PNPM_OUTDATED_LOCKFILE`.

---

## 5. Pengaturan Lingkungan & Akses Database (.env)

Website Urushalal memerlukan kunci koneksi agar bisa berkomunikasi dengan database Supabase (untuk keperluan berita, login admin, dan pesan masuk). Kunci ini disimpan di dalam file bernama **`.env.local`**.

> 🔒 **Penting Mengenai Keamanan:**
> File `.env.local` berisi kunci konfigurasi dan tidak boleh diunggah sembarangan ke media sosial atau forum terbuka. Nilai aslinya sengaja tidak ditulis di buku panduan ini demi alasan keamanan.

### Daftar Variabel Lingkungan:

| Nama Variabel | Di Mana Dipakai | Fungsi & Kegunaan |
|---|---|---|
| `VITE_SUPABASE_URL` | Komputer lokal & Server Vercel | Alamat URL project Supabase Urushalal di internet (berawalan `https://...supabase.co`). |
| `VITE_SUPABASE_ANON_KEY` | Komputer lokal & Server Vercel | Kunci akses publik aman (*Anonymous Key*) yang digunakan browser untuk membaca artikel berita, mengirim pesan kontak, dan proses login admin. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Hanya di Komputer Lokal** | Kunci hak akses penuh (*Super Admin*) yang **HANYA** digunakan jika programmer menjalankan script pembuatan variasi FAQ (`scripts/generateFaqVariants.ts`). **JANGAN PERNAH** memasukkan kunci ini ke Vercel atau ke kode tampilan depan website! |

### Cara Mengatur Variabel di Server Vercel (Production):
Jika suatu saat Anda mengganti project database Supabase:
1. Buka dashboard akun Vercel Anda di [vercel.com](https://vercel.com).
2. Pilih project `sertifikasihalal` / `urushalal`.
3. Buka tab **Settings** > pilih menu **Environment Variables**.
4. Masukkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
5. Klik **Save**, lalu lakukan Redeploy.

---

## 6. Kendala Umum (Troubleshooting) & File Terlarang

### 6.1 Error yang Sering Terjadi Setelah Mengedit Konten

| Gejala Masalah | Penyebab Utama | Solusi Perbaikan |
|---|---|---|
| **Layar browser putih polos (Blank Screen)** atau terminal error warna merah bertuliskan `SyntaxError`. | Ada tanda petik (`"`), kurung (`}` atau `]`), atau tanda koma (`,`) yang tidak sengaja terhapus di file `src/i18n/id.ts` atau `.json`. | Buka kembali file yang baru saja Anda edit. Periksa baris yang Anda ubah, pastikan setiap baris teks berada di dalam tanda kutip dan diakhiri tanda koma `,`. Anda bisa menekan `Ctrl + Z` untuk membatalkan perubahan terakhir. |
| **Gambar atau Logo tidak muncul (Ikon silang / pecah).** | 1. Nama file salah ketik.<br>2. Format file berbeda (misal tertulis `.png` padahal aslinya `.jpeg`).<br>3. Huruf besar-kecil tidak cocok (sistem Linux di Vercel membedakan `Logo.png` dengan `logo.png`). | Periksa nama file gambar di folder `public/`. Pastikan nama file di kode sama persis hingga huruf kecil dan ekstensinya. |
| **Perubahan teks sudah disimpan, tapi di website masih belum berubah.** | Browser menyimpan memori tampilan lama (Cache). | Lakukan *Hard Reload* di browser dengan menekan tombol kombinasi **`Ctrl + Shift + R`** (Windows) atau **`Cmd + Shift + R`** (Mac). |
| **Pesan error "Database belum dikonfigurasi" saat login admin atau kirim pesan.** | File `.env.local` belum ada di komputer atau variabel lingkungan di Vercel belum diisi. | Pastikan file `.env.local` sudah ada di folder utama project dan berisi `VITE_SUPABASE_URL` serta `VITE_SUPABASE_ANON_KEY`. |
| **Build Vercel Gagal: `ERR_PNPM_OUTDATED_LOCKFILE`.** | File `package.json` diubah tanpa menyertakan `pnpm-lock.yaml`. | Jalankan `pnpm install` di komputer lokal, lalu lakukan commit dan push bersamaan file `pnpm-lock.yaml`. |

---

### 6.2 File-file yang Berbahaya Jika Diubah Sembarangan

Demi kestabilan website, mohon untuk **TIDAK MENGUBAH** file-file berikut kecuali Anda memahami pemrograman web:

1. ⛔ **`package.json` & `pnpm-lock.yaml`**: Mengatur versi sistem dan dependensi program. Jika rusak, website tidak bisa di-build.
2. ⛔ **`vite.config.ts` & `tsconfig.json`**: Pengaturan mesin kompilasi dan compiler TypeScript.
3. ⛔ **`vercel.json`**: Mengatur jalur lalu lintas rute website di server Vercel. Jika baris rewrite terhapus, halaman selain beranda akan menghasilkan error 404 (Not Found).
4. ⛔ **`src/main.tsx` & `src/App.tsx`**: Mesin penggerak utama aplikasi React dan penentu rute URL website.
5. ⛔ **`src/lib/supabase.ts`**: Skrip inisialisasi koneksi aman database.
6. ⛔ **Folder `supabase/`**: Berisi file skema SQL database. Jangan dijalankan ulang sembarangan karena berisiko menimpa tabel data yang sudah berjalan.

---

## 7. Checklist Sebelum Publish ke Publik

Gunakan daftar centang ini sebagai panduan standar kerja setiap kali Anda selesai melakukan perubahan konten sebelum mempublikasikannya ke publik:

- [ ] **1. Teks Tidak Ada Typo**: Periksa ejaan nama perusahaan, alamat, nomor izin, dan istilah sertifikasi halal.
- [ ] **2. Tanda Baca Kode Utuh**: Pastikan tidak ada tanda petik (`"`) atau koma (`,`) yang hilang pada file kamus bahasa `src/i18n/id.ts`.
- [ ] **3. Versi Bahasa Inggris Terisi (Opsional)**: Jika mengubah hal penting, pastikan `src/i18n/en.ts` juga disesuaikan.
- [ ] **4. Uji Coba Tombol WhatsApp**: Klik tombol WhatsApp dan pastikan membuka nomor chat yang benar dengan kalimat pembuka yang sesuai.
- [ ] **5. Gambar Tampil Tajam & Proporsional**: Cek tampilan foto di layar laptop maupun layar ponsel agar tidak terpotong aneh atau gepeng.
- [ ] **6. Cek Build Berhasil**: Buka terminal dan jalankan `pnpm build` untuk memastikan tidak ada error tersembunyi.
- [ ] **7. Cek Tampilan Live**: Setelah deploy selesai di Vercel, buka website resmi di browser handphone dan laptop untuk pengecekan akhir.

---

*Manual Book ini disusun sebagai dokumentasi resmi pemeliharaan platform Urushalal. Simpan dokumen ini di root project untuk referensi tim pengelola konten.*
