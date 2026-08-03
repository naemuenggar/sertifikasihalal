Foto hero (slider 2 slide di halaman depan):

    hero-1.jpeg   slide 1 — sertifikasi halal (tema hijau)
    hero-2.jpeg   slide 2 — izin BPOM (tema biru)

Format: JPG landscape 3:2, min 1536x1024.

Kalau fotonya diganti, cukup timpa file dengan nama yang sama — pathnya
terdaftar di src/data/heroSlides.ts. Warna panelnya datang dari overlay CSS
(src/styles.css, blok `.hero-slide[data-theme="..."]`), bukan dari fotonya,
jadi ganti foto tidak akan menggeser palet.
