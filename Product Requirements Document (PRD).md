# Product Requirements Document (PRD)

# RujukCepat — Platform Integrasi Layanan Kesehatan

**Versi:** 2.0  
**Tanggal:** 10 Agustus 2026  
**Status:** Draft  
**Subtema Humanity OS:** Nilai Kesehatan

---

# 1. Ringkasan Eksekutif

RujukCepat adalah platform web yang mengintegrasikan informasi layanan kesehatan antara rumah sakit, tenaga kesehatan, pasien, dan apotek dalam satu ekosistem.

Platform ini dirancang untuk mempercepat proses pencarian fasilitas kesehatan dan rujukan medis dengan menyediakan informasi ketersediaan layanan rumah sakit secara transparan, termasuk ketersediaan kamar rawat inap, IGD, ICU, serta jadwal dokter.

Selain membantu proses rujukan, RujukCepat menyediakan layanan pengecekan status obat melalui kode transaksi sehingga pasien dapat mengetahui kesiapan obat tanpa harus menunggu tanpa kepastian.

RujukCepat berfokus pada tiga fungsi utama:

1. **Informasi ketersediaan layanan rumah sakit**
2. **Pencarian dan rekomendasi rumah sakit untuk rujukan**
3. **Pelacakan status obat melalui apotek**

---

# 2. Latar Belakang & Rumusan Masalah

## 2.1 Masalah Utama

- Informasi ketersediaan kamar rawat inap, IGD, ICU, dan fasilitas medis tidak dapat diakses secara cepat dan akurat.
- Proses rujukan manual dengan menghubungi rumah sakit satu per satu memakan waktu.
- Tenaga kesehatan membutuhkan informasi mengenai kompetensi dan ketersediaan layanan rumah sakit sebelum menentukan tujuan rujukan.
- Pasien dan keluarga kesulitan memperoleh kepastian mengenai ketersediaan layanan rumah sakit.
- Pasien yang menebus obat di apotek tidak selalu mengetahui apakah obatnya sudah siap.
- Data ketersediaan rumah sakit dapat kehilangan relevansinya apabila tidak diperbarui secara konsisten.

## 2.2 Dampak Masalah

- Pasien dapat mengalami keterlambatan mendapatkan penanganan.
- Pasien berpotensi dipindahkan berkali-kali antar fasilitas kesehatan.
- Tenaga kesehatan menghabiskan waktu untuk mencari fasilitas yang sesuai.
- Pasien menunggu di apotek tanpa mengetahui status obat.
- Kepercayaan terhadap informasi digital menurun apabila data tidak transparan mengenai waktu pembaruan.

---

# 3. Tujuan Produk

RujukCepat bertujuan untuk:

1. Menyediakan informasi ketersediaan layanan rumah sakit secara cepat dan transparan.
2. Membantu tenaga kesehatan menemukan rumah sakit yang sesuai dengan kondisi pasien.
3. Menampilkan informasi kompetensi, layanan, dan ketersediaan rumah sakit.
4. Mempermudah masyarakat menemukan rumah sakit berdasarkan lokasi dan layanan.
5. Memungkinkan pasien mengecek status obat menggunakan kode transaksi.
6. Membantu rumah sakit dan apotek memperbarui informasi layanan melalui dashboard masing-masing.
7. Meningkatkan transparansi dan kecepatan akses informasi kesehatan.

---

# 4. Target Pengguna

| Role | Deskripsi | Kebutuhan |
|---|---|---|
| **Pengunjung / Masyarakat** | Pengguna umum yang mencari informasi layanan kesehatan | Mencari RS, melihat ketersediaan, dan informasi layanan |
| **Pasien / Keluarga** | Pengguna yang membutuhkan layanan RS atau mengecek obat | Kepastian layanan dan status obat |
| **Tenaga Kesehatan** | Petugas puskesmas/FKTP atau fasilitas kesehatan lain yang melakukan rujukan | Informasi RS yang cepat, akurat, dan relevan |
| **Admin Rumah Sakit** | Petugas yang mengelola informasi fasilitas RS | Memperbarui ketersediaan dan jadwal layanan |
| **Apoteker / Admin Apotek** | Petugas yang mengelola transaksi obat | Memperbarui status obat dan transaksi |

---

# 5. Product Structure

RujukCepat menggunakan struktur berbasis role sehingga setiap pengguna memperoleh pengalaman sesuai kebutuhannya.

```text
RUJUKCEPAT
│
├── PUBLIC
│
├
│
├── ADMIN RUMAH SAKIT
│
└── ADMIN APOTEK
```

---

# 6. Information Architecture

## 6.1 Public Pages

### 6.1.1 Landing Page

Landing page menjadi halaman utama RujukCepat.

**Komponen:**

- Navbar
- Logo RujukCepat
- Navigasi
- Login
- Hero section
- Search rumah sakit
- Quick actions
- Preview ketersediaan RS
- Cara kerja RujukCepat
- Informasi untuk tenaga kesehatan
- Footer

**Quick Actions:**

- Cari Rumah Sakit
- Cari IGD
- Cek Status Obat

---

## 6.2 Cari Rumah Sakit

Halaman pencarian memungkinkan pengguna menemukan rumah sakit berdasarkan lokasi, layanan, dan ketersediaan.

**Komponen:**

- Search bar
- Lokasi pengguna
- Filter lokasi/jarak
- Filter jenis layanan
- Filter status ketersediaan
- Daftar rumah sakit
- Status ketersediaan
- Jarak
- Waktu pembaruan terakhir

### Status Ketersediaan

- 🟢 Tersedia
- 🟡 Terbatas
- 🔴 Penuh

---

## 6.3 Detail Rumah Sakit

Halaman ini memberikan informasi lengkap mengenai sebuah rumah sakit.

**Informasi:**

### Identitas

- Nama rumah sakit
- Lokasi
- Jarak
- Informasi kontak

### Ketersediaan

- IGD
- ICU
- Rawat inap
- Kelas kamar
- Status terakhir diperbarui

### Layanan

- Spesialisasi
- Fasilitas
- Unit layanan

### Dokter

- Nama dokter
- Spesialisasi
- Jadwal praktik

### Action

- Lihat lokasi
- Petunjuk arah
- Hubungi rumah sakit

---

# 7. Fitur Rujukan Tenaga Kesehatan

Fitur rujukan merupakan fitur utama untuk tenaga kesehatan.

## 7.1 Dashboard Nakes

Dashboard menampilkan:

- Rujukan aktif
- Rujukan terbaru
- Rumah sakit yang tersedia
- Quick action "Buat Rujukan"
- Riwayat rujukan

---

## 7.2 Buat Rujukan

Proses pembuatan rujukan menggunakan beberapa tahap.

### Step 1 — Kondisi Pasien

Nakes memasukkan:

- Diagnosis/kategori kondisi
- Informasi kondisi pasien yang diperlukan sistem

**Action:**

`Lanjutkan`

---

### Step 2 — Rekomendasi Rumah Sakit

Sistem menampilkan daftar rumah sakit berdasarkan:

- Kesesuaian kondisi pasien
- Kompetensi rumah sakit
- Ketersediaan layanan
- Jarak

Setiap rekomendasi menampilkan alasan mengapa rumah sakit tersebut direkomendasikan.

Contoh:

```text
RSUD XXXXX

✓ ICU tersedia
✓ Spesialis terkait tersedia
✓ Jarak 4,2 km

Status: Tersedia

[ Pilih RS ]
```

---

### Step 3 — Detail Rumah Sakit

Nakes dapat melihat:

- Ketersediaan fasilitas
- Kompetensi layanan
- Spesialis
- Jarak
- Status terkini
- Waktu pembaruan data

---

### Step 4 — Konfirmasi Rujukan

Sistem menampilkan ringkasan:

- Kondisi pasien
- Rumah sakit tujuan
- Alasan rekomendasi
- Ketersediaan fasilitas

**Action:**

`Kirim Permintaan Rujukan`

---

## 7.3 Riwayat Rujukan

Menampilkan:

- Nomor rujukan
- Rumah sakit tujuan
- Tanggal
- Status
- Detail rujukan

---

# 8. Layanan Apotek Digital

## 8.1 Cek Status Obat

Fitur ini dapat diakses tanpa dashboard kompleks untuk pasien.

Pengguna memasukkan kode transaksi.

```text
Kode Transaksi

[ RX-20491 ]

[ Cek Status ]
```

Sistem kemudian menampilkan:

- Nomor transaksi
- Apotek
- Daftar obat
- Status
- Waktu pembaruan terakhir

### Status Transaksi

```text
Diproses
   ↓
Siap Diambil
   ↓
Selesai
```

---

# 9. Dashboard Admin Rumah Sakit

Dashboard digunakan untuk mengelola informasi yang ditampilkan kepada publik dan tenaga kesehatan.

## 9.1 Overview

Menampilkan:

- Total kapasitas rawat inap
- Ketersediaan IGD
- Ketersediaan ICU
- Waktu update terakhir
- Peringatan data yang belum diperbarui

---

## 9.2 Ketersediaan

Admin dapat memperbarui:

### Rawat Inap

- Kelas 1
- Kelas 2
- Kelas 3
- VIP
- Kategori lain yang tersedia

### IGD

- Kapasitas
- Ketersediaan

### ICU

- Kapasitas
- Ketersediaan

Setiap perubahan harus mencatat waktu pembaruan.

---

## 9.3 Jadwal Dokter

Admin dapat mengelola:

- Nama dokter
- Spesialisasi
- Hari praktik
- Jam praktik

---

## 9.4 Riwayat Update

Menampilkan:

- Data yang diperbarui
- Waktu update
- Admin yang melakukan perubahan

---

# 10. Dashboard Admin Apotek

## 10.1 Overview

Menampilkan:

- Total transaksi
- Transaksi diproses
- Transaksi siap diambil
- Transaksi selesai

---

## 10.2 Transaksi Obat

Admin dapat melihat:

- Kode transaksi
- Daftar obat
- Status
- Waktu transaksi

---

## 10.3 Detail Transaksi

Menampilkan:

- Kode transaksi
- Informasi obat
- Status transaksi
- Waktu pembaruan

---

## 10.4 Update Status

Admin dapat mengubah status transaksi:

```text
Diproses
    ↓
Siap Diambil
    ↓
Selesai
```

---

# 11. User Flow

## 11.1 User Flow Masyarakat

```text
Landing Page
      ↓
Cari Rumah Sakit
      ↓
Search / Filter
      ↓
Daftar Rumah Sakit
      ↓
Detail Rumah Sakit
      ↓
Lihat Ketersediaan
```

---

## 11.2 User Flow Cek Obat

```text
Landing Page
      ↓
Cek Status Obat
      ↓
Input Kode Transaksi
      ↓
Validasi Kode
      ↓
Status Obat
```

---

## 11.3 User Flow Nakes

```text
Login
  ↓
Dashboard
  ↓
Buat Rujukan
  ↓
Input Kondisi Pasien
  ↓
Rekomendasi RS
  ↓
Detail RS
  ↓
Pilih RS
  ↓
Konfirmasi
  ↓
Kirim Permintaan Rujukan
```

---

## 11.4 User Flow Admin RS

```text
Login
  ↓
Dashboard
  ↓
Ketersediaan
  ↓
Update Data
  ↓
Konfirmasi
  ↓
Data diperbarui
```

---

## 11.5 User Flow Admin Apotek

```text
Login
  ↓
Dashboard
  ↓
Transaksi
  ↓
Pilih Transaksi
  ↓
Update Status
  ↓
Status diperbarui
```

---

# 12. Core Features

## 12.1 Informasi Ketersediaan Rumah Sakit

Sistem menampilkan:

- Kamar rawat inap
- IGD
- ICU
- Jadwal dokter
- Status ketersediaan
- Timestamp pembaruan

**Acceptance Criteria:**

- Data memiliki waktu pembaruan terakhir.
- Pengguna dapat memfilter rumah sakit.
- Status tersedia/terbatas/penuh dapat dibedakan secara visual.
- Admin RS dapat memperbarui data.

---

## 12.2 Pencarian Rumah Sakit

Pengguna dapat mencari rumah sakit berdasarkan:

- Lokasi
- Jarak
- Layanan
- Ketersediaan

---

## 12.3 Rekomendasi Rujukan

Sistem membantu tenaga kesehatan menentukan rumah sakit yang relevan berdasarkan:

- Kondisi pasien
- Kompetensi RS
- Ketersediaan
- Jarak

Sistem harus memberikan alasan singkat atas rekomendasi yang diberikan.

---

## 12.4 Pelacakan Status Obat

Pengguna dapat:

- Memasukkan kode transaksi.
- Melihat status obat.
- Melihat detail transaksi.
- Melihat waktu pembaruan.

Admin apotek dapat:

- Melihat transaksi.
- Mengubah status transaksi.

---

# 13. Authentication & Role

Sistem menggunakan role-based access.

## Public

Tidak membutuhkan login untuk:

- Landing page
- Cari rumah sakit
- Detail rumah sakit
- Cek status obat

## Nakes

Membutuhkan login untuk:

- Dashboard
- Membuat rujukan
- Melihat rujukan
- Riwayat rujukan

## Admin Rumah Sakit

Membutuhkan login untuk:

- Dashboard
- Update ketersediaan
- Update jadwal dokter
- Melihat riwayat update

## Admin Apotek

Membutuhkan login untuk:

- Dashboard
- Mengelola transaksi
- Mengubah status obat

---

# 14. Data yang Ditampilkan

## Data Rumah Sakit

- Nama
- Lokasi
- Jarak
- Tipe/kategori
- Layanan
- Ketersediaan kamar
- Ketersediaan IGD
- Ketersediaan ICU
- Dokter
- Jadwal dokter
- Timestamp update

## Data Transaksi Apotek

- Kode transaksi
- Daftar obat
- Status
- Waktu pembaruan
- Apotek

---

# 15. Non-Functional Requirements

| Aspek | Requirement |
|---|---|
| **Performance** | Halaman utama ditargetkan memiliki waktu muat < 3 detik |
| **Real-time** | Informasi menampilkan timestamp pembaruan |
| **Scalability** | Sistem dapat dikembangkan untuk banyak fasilitas kesehatan |
| **Security** | Data dan akses pengguna dilindungi dengan autentikasi dan kontrol akses |
| **Accessibility** | UI sederhana dan mudah dipahami oleh pengguna umum |
| **Availability** | Sistem dirancang dengan mempertimbangkan kebutuhan layanan kesehatan |
| **Privacy** | Pengelolaan data mengikuti prinsip perlindungan data yang berlaku |

---

# 16. MVP Scope

## 16.1 Termasuk MVP

### Public

- Landing Page
- Cari Rumah Sakit
- Filter Rumah Sakit
- Detail Rumah Sakit
- Informasi ketersediaan
- Cek status obat

### Nakes

- Login
- Dashboard
- Input kondisi pasien
- Rekomendasi rumah sakit
- Detail rekomendasi
- Pembuatan rujukan
- Riwayat rujukan

### Admin Rumah Sakit

- Login
- Dashboard
- Update kamar
- Update IGD
- Update ICU
- Update jadwal dokter
- Riwayat update

### Admin Apotek

- Login
- Dashboard
- Daftar transaksi
- Detail transaksi
- Update status obat

---

# 17. Future Scope

Fitur berikut belum menjadi bagian dari MVP:

- Integrasi otomatis dengan BPJS.
- Integrasi SATUSEHAT.
- Integrasi API langsung dengan sistem rumah sakit.
- Algoritma/AI rekomendasi yang lebih kompleks.
- Push notification.
- Mobile application native.
- Pembayaran obat online.
- Integrasi otomatis dengan sistem inventori apotek.

---

# 18. Data Freshness & Transparency

Karena keakuratan informasi merupakan bagian penting dari RujukCepat, setiap data ketersediaan harus memiliki informasi mengenai waktu pembaruan.

Contoh:

```text
🟢 ICU tersedia
Terakhir diperbarui: 3 menit lalu
```

Jika data terlalu lama diperbarui, sistem dapat memberikan indikator:

```text
⚠ Data terakhir diperbarui 2 jam lalu
```

Tujuannya adalah mencegah pengguna menganggap data lama sebagai kondisi real-time.

---

# 19. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Data RS tidak diperbarui | Reminder dan indikator data lama |
| Ketergantungan pada input manual | Menyiapkan struktur API untuk integrasi berikutnya |
| Pengguna tidak percaya data | Timestamp dan status data |
| Informasi berubah setelah ditampilkan | Menampilkan waktu update secara jelas |
| Akses tidak sesuai role | Role-based access control |
| Data pasien tidak aman | Membatasi dan melindungi data sensitif |

---

# 20. Success Metrics

Keberhasilan produk dapat diukur melalui:

1. Waktu yang dibutuhkan tenaga kesehatan untuk menemukan RS yang sesuai.
2. Jumlah rumah sakit yang aktif memperbarui data.
3. Jumlah pencarian rumah sakit.
4. Jumlah rujukan yang dibuat melalui platform.
5. Jumlah transaksi apotek yang berhasil dilacak.
6. Tingkat keberhasilan pengguna menemukan informasi yang dibutuhkan.
7. Tingkat kepuasan pengguna.

---

# 21. Design Principles

Desain RujukCepat harus mengikuti prinsip:

### 1. Fast

Informasi penting harus dapat ditemukan dengan sedikit langkah.

### 2. Clear

Status kesehatan dan ketersediaan harus mudah dipahami tanpa interpretasi rumit.

### 3. Transparent

Sistem harus menunjukkan kapan informasi terakhir diperbarui.

### 4. Human-Centered

Antarmuka harus mempertimbangkan kondisi pengguna, terutama ketika sedang mencari layanan kesehatan dalam situasi mendesak.

### 5. Role-Based

Informasi dan tindakan disesuaikan dengan kebutuhan masing-masing pengguna.

### 6. Trustworthy

Informasi penting harus disajikan secara konsisten, jelas, dan tidak menyesatkan.

---

# 22. Kesimpulan

RujukCepat merupakan platform web yang berfokus pada integrasi informasi layanan kesehatan untuk mempercepat proses pencarian fasilitas dan rujukan pasien.

Produk dibangun dengan empat pengalaman utama:

1. **Public/Patient** — mencari rumah sakit dan mengecek status obat.
2. **Nakes** — mencari rekomendasi rumah sakit dan melakukan proses rujukan.
3. **Admin Rumah Sakit** — mengelola data ketersediaan dan jadwal layanan.
4. **Admin Apotek** — mengelola status transaksi obat.

Struktur ini menjadi dasar pengembangan produk mulai dari **sitemap, user flow, wireframe, UI design, prototype, hingga implementasi web**.

Fokus MVP adalah menyediakan informasi yang mudah ditemukan, status yang transparan, dan alur rujukan yang lebih sederhana tanpa terlebih dahulu bergantung pada integrasi eksternal yang kompleks.