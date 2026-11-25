# Dark Mode Toprakku — Design (short)

## Intent

Menambahkan dark mode untuk seluruh halaman: beranda, menu, keranjang, checkout, dan status pesanan. Pengguna bisa memilih tema manual; jika belum memilih, tema mengikuti preferensi sistem.

## Goals

- Toggle tema di header yang terlihat di desktop dan seluler.
- Pilihan tersimpan di `localStorage` dan bertahan setelah reload.
- Tanpa flash terang saat membuka halaman dalam mode gelap.
- Palet gelap tetap hangat (coklat tua, cabai, butter), bukan hitam pekat.

## Non-goals

- Tidak mengubah struktur data, alur checkout, atau pesanan.
- Tidak menambah pengaturan tema per halaman.
- Tidak mengganti font atau ilustrasi.

## Constraints

- Next.js 16 App Router dengan Cache Components aktif; tidak boleh memanggil `new Date()` atau membaca `localStorage` saat prerender.
- ESLint melarang `setState` synchronous di dalam effect; inisialisasi klien harus ditunda (mis. lewat `setTimeout`).
- Sebagian besar kelas memakai token (`bg-cream`, `text-ink`, `border-ink/8`), tetapi ada sekitar 40 pemakaian `bg-white` untuk kartu/input dan beberapa panel yang sengaja gelap (footer, testimoni, toast).

## Approaches

1. **CSS media query saja** — paling kecil, tanpa JS, tetapi tidak ada pilihan manual. Ditolak.
2. **Toggle manual + default sistem + penyimpanan (dipilih)** — provider kecil menulis `data-theme` di `<html>`, inline script menetapkan tema sebelum paint, token warna ditukar lewat atribut tersebut.
3. **Toggle tanpa penyimpanan** — lebih kecil tetapi tema reset tiap reload. Ditolak.

## Design

- `src/app/globals.css`
  - Ubah `@theme inline` agar token merujuk ke variabel CSS (`var(--cream)`, dst).
  - Definisikan nilai terang di `:root`, nilai gelap di `[data-theme="dark"]`.
  - Tambah token `surface` (kartu/input), `night` (panel gelap permanen), dan `night-text`.
  - Tambah `color-scheme: light/dark`.
- `src/components/theme-provider.tsx` (baru, client)
  - State: `system | light | dark`; resolved theme dari `matchMedia` bila `system`.
  - Baca `localStorage` sekali setelah mount; tulis `data-theme` ke `<html>`.
  - `toggle()` membalik tema ter-resolve dan menyimpan pilihannya.
- `src/app/layout.tsx`
  - Inline script di `<head>` untuk menetapkan `data-theme` sebelum paint.
  - Bungkus konten dengan `ThemeProvider` di dalam/samping `CartProvider`.
- `src/components/site-header.tsx`
  - Tombol `Sun`/`Moon` sebelum tombol keranjang, dengan `aria-label` sesuai tema berikutnya.
- Penggantian kelas:
  - `bg-white` → `bg-surface` untuk kartu dan input.
  - `hover:bg-white` → `hover:bg-cream` pada tombol stepper.
  - Panel yang harus tetap gelap memakai `bg-night text-night-text`: footer, bagian testimoni, toast keranjang, overlay drawer/customizer, bar keranjang seluler, badge langkah checkout, dan tombol “Pesan lagi”.
  - Tombol beraksen (`bg-chili`, `bg-leaf`) tetap memakai `text-white`.

## Left to builder

- Pilih nilai hex gelap final yang kontras dan tetap selaras dengan identitas merek.
- Pastikan `npm run lint` dan `npm run build` lulus, lalu smoke test semua rute.
