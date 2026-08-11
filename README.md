# RujukCepat

Platform integrasi layanan kesehatan — mempertemukan informasi ketersediaan rumah sakit, alur rujukan tenaga kesehatan, dan pelacakan status obat apotek dalam satu produk.

Dibangun berdasarkan Product Requirements Document (PRD) v2.0, mencakup seluruh scope MVP: Public (landing, cari & detail RS, cek status obat), Nakes (dashboard, buat rujukan 4-langkah, riwayat), Admin Rumah Sakit (ketersediaan, jadwal dokter, riwayat update), dan Admin Apotek (transaksi, update status).

## Stack

- React 19 + Vite
- Tailwind CSS v4 (token-based, tanpa gradient)
- Framer Motion — transisi halaman & micro-interaction
- React Router v7
- React Leaflet + OpenStreetMap — peta lokasi RS
- Lucide React — ikon

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build produksi

```bash
npm run build
npm run preview
```

## Deploy ke Vercel

Import repository ini di Vercel — framework preset "Vite" akan terdeteksi otomatis. Tidak ada environment variable yang dibutuhkan (data memakai mock state + localStorage, belum tersambung ke backend/API sungguhan; struktur data pada `src/data/` & `src/context/AppContext.jsx` didesain agar mudah diganti dengan pemanggilan API sesungguhnya).

## Login demo

Halaman `/login` menerima kredensial apa pun. Pilih salah satu peran (Nakes, Admin Rumah Sakit, Admin Apotek) untuk masuk ke dashboard masing-masing.

## Struktur

```
src/
  components/     komponen UI yang dipakai ulang lintas halaman
  context/        state global (auth demo + data mock, tersimpan di localStorage)
  data/           mock data rumah sakit, transaksi apotek, kategori kondisi
  pages/
    public/       landing, cari & detail RS, cek obat, tentang
    nakes/        dashboard, buat rujukan, riwayat
    admin-rs/     dashboard, ketersediaan, jadwal dokter, riwayat update
    admin-apotek/ dashboard, transaksi, detail & update status
  utils/          helper (jarak, waktu relatif, status)
```

## Design system

- Tipografi: Inter
- Warna: `#9ccda5` (primary), `#ddefe3` (secondary), `#41956a` (deep/aksen) — tanpa gradient
- Prinsip: minimalism, transparansi data (setiap status ketersediaan menampilkan waktu pembaruan), role-based access
