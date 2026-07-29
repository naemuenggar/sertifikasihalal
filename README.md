# Urushalal — Landing Page

Landing page resmi **Urushalal**, layanan pendampingan sertifikasi halal BPJPH untuk UMKM dan korporasi di Indonesia.

🔗 Live: [sertifikasihalal-chi.vercel.app](https://sertifikasihalal-chi.vercel.app)

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) — build tool & dev server
- [lucide-react](https://lucide.dev/) — icon set
- [ogl](https://github.com/oframe/ogl) — lightweight WebGL library (dipakai untuk efek specular pada tombol)
- Package manager: **pnpm**

## Requirements

Pastikan sudah terinstall di komputer kamu:

- [Node.js](https://nodejs.org/) versi 18 ke atas
- [pnpm](https://pnpm.io/installation) versi 11.x

  ```bash
  npm install -g pnpm
  ```

## Cara Menjalankan (Setup Lokal)

1. **Clone repo ini**

   ```bash
   git clone https://github.com/naemuenggar/sertifikasihalal.git
   cd sertifikasihalal
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Jalankan development server**

   ```bash
   pnpm dev
   ```

   Buka [http://localhost:5173](http://localhost:5173) di browser. Server otomatis reload saat ada perubahan kode.

## Scripts yang Tersedia

| Command | Fungsi |
|---|---|
| `pnpm dev` | Menjalankan dev server (Vite, dengan `--host`) |
| `pnpm build` | Build production (`tsc` + `vite build`) |
| `pnpm preview` | Preview hasil build secara lokal |
| `pnpm lint` | Cek tipe TypeScript (`tsc --noEmit`) |

## Struktur Project

```
sertifikasihalal/
├── public/          # Asset statis
├── src/             # Source code (komponen, halaman, styling)
├── index.html        # Entry HTML
├── vite.config.ts    # Konfigurasi Vite
├── tsconfig.json      # Konfigurasi TypeScript
└── vercel.json        # Konfigurasi deployment Vercel
```

## Build untuk Production

```bash
pnpm build
```

Hasil build akan ada di folder `dist/`. Untuk preview hasil build secara lokal sebelum deploy:

```bash
pnpm preview
```

## Deployment

Project ini di-deploy otomatis ke [Vercel](https://vercel.com/) setiap ada push ke branch `main`.

Kalau mau deploy manual lewat CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

> ⚠️ **Penting:** setiap kali menambah atau mengubah dependency di `package.json`, jalankan `pnpm install` secara lokal dan commit file `pnpm-lock.yaml` yang ter-update di commit yang sama. Kalau lockfile tidak sinkron, build di Vercel akan gagal dengan error `ERR_PNPM_OUTDATED_LOCKFILE`.

## Kontribusi

1. Buat branch baru dari `main`
2. Lakukan perubahan
3. Pastikan `pnpm build` dan `pnpm lint` sukses tanpa error sebelum push
4. Buat pull request
