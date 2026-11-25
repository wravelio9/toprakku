# Toprakku

Aplikasi pemesanan ketoprak berbasis Next.js 16 (App Router), TypeScript, dan Tailwind CSS 4. Seluruh tampilan dan alur pemesanan dibangun dengan pendekatan mobile-first.

## Fitur

- Beranda dengan hero, menu favorit, dan alur pemesanan
- Halaman menu dengan pencarian, filter kategori, dan kustomisasi (porsi, pedas, tambahan, catatan)
- Keranjang persisten di `localStorage` dengan drawer, pengatur jumlah, dan indikator gratis ongkir
- Checkout dengan pilihan diantar/ambil, metode pembayaran, dan validasi form
- Halaman status pesanan dengan timeline progres dan detail pesanan terakhir
- Mode gelap dengan toggle di header, mengikuti preferensi sistem, dan tersimpan di `localStorage`

> Catatan: pembayaran dan status pesanan saat ini berupa simulasi sisi klien. Untuk produksi, hubungkan ke backend, payment gateway, dan database.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Script lain

```bash
npm run build   # build produksi
npm run start   # jalankan hasil build
npm run lint    # cek ESLint
```

## Struktur ringkas

```
src/app/                 Halaman dan layout (App Router)
src/components/          Komponen UI dan state keranjang
src/lib/menu.ts          Data produk, kategori, dan opsi kustomisasi
src/lib/orders.ts        Penyimpanan pesanan terakhir di localStorage
src/lib/format.ts        Format mata uang dan tanggal
```
