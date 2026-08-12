# RujukCepat — Role & Website Structure

## 1. Guest / Public

Role ini untuk pengguna yang belum login. Fokusnya informasi publik dan pencarian layanan.

```text
GUEST / PUBLIC
│
├── Landing Page
│   ├── Hero
│   ├── Quick Search
│   ├── Cari Rumah Sakit
│   ├── Cari IGD
│   ├── Cek Status Obat
│   ├── Cara Kerja RujukCepat
│   └── Tentang RujukCepat
│
├── Cari Rumah Sakit
│   ├── Search
│   ├── Filter
│   │   ├── Lokasi
│   │   ├── Jarak
│   │   ├── Jenis Layanan
│   │   └── Ketersediaan
│   └── Hasil Pencarian
│
├── Detail Rumah Sakit
│   ├── Informasi RS
│   ├── Lokasi
│   ├── Ketersediaan
│   │   ├── Rawat Inap
│   │   ├── IGD
│   │   └── ICU
│   ├── Layanan
│   ├── Dokter
│   └── Jadwal Dokter
│
├── Cek Status Obat
│   ├── Input Kode Transaksi
│   └── Status Obat
│
└── Tentang
    ├── Tentang RujukCepat
    ├── Cara Kerja
    └── Informasi Layanan
```

Guest tidak dapat melakukan rujukan atau mengakses informasi personal.

---

## 2. Pasien

Pasien adalah pengguna yang sudah login dan memiliki layanan pribadi.

**BPJS dan Umum tetap berada di bawah role Pasien.**

```text
PASIEN
│
├── Dashboard
│   ├── Ringkasan Layanan
│   ├── Rujukan Aktif
│   ├── Status Obat
│   ├── Estimasi Pengambilan
│   └── Quick Actions
│
├── Cari Layanan
│   ├── Cari Rumah Sakit
│   ├── Cari IGD
│   ├── Cari Spesialis
│   └── Detail Rumah Sakit
│
├── Rujukan Saya
│   ├── Rujukan Aktif
│   ├── Detail Rujukan
│   ├── Status Rujukan
│   └── Riwayat Rujukan
│
├── Layanan Obat
│   ├── Obat Aktif
│   ├── Status Obat
│   ├── Estimasi Pengambilan
│   ├── Detail Transaksi
│   └── Riwayat Obat
│
├── Riwayat Layanan
│   ├── Riwayat Rujukan
│   ├── Riwayat Kunjungan
│   └── Riwayat Obat
│
└── Profil
    ├── Informasi Pribadi
    ├── Jenis Pembiayaan
    │   ├── BPJS
    │   └── Umum
    └── Pengaturan Akun
```

### Perbedaan BPJS dan Umum

BPJS dan Umum bukan role yang berbeda, melainkan jenis pembiayaan.

```text
PASIEN
│
├── BPJS
│   └── Alur layanan mempertimbangkan
│       jalur rujukan dan coverage BPJS
│
└── UMUM
    └── Alur pencarian layanan lebih fleksibel
```

---

## 3. Tenaga Kesehatan / Fasilitas Pengirim

Role ini digunakan oleh pihak yang menginisiasi rujukan, misalnya tenaga kesehatan dari:

- Puskesmas
- Klinik
- FKTP
- Poli/fasilitas kesehatan lain

```text
TENAGA KESEHATAN / FASILITAS PENGIRIM
│
├── Dashboard
│   ├── Rujukan Aktif
│   ├── Rujukan Menunggu
│   ├── Rujukan Selesai
│   └── Quick Action
│       └── Buat Rujukan
│
├── Buat Rujukan
│   ├── Informasi Pasien
│   ├── Kondisi / Diagnosis
│   ├── Tujuan Layanan
│   ├── Prioritas
│   └── Submit Rujukan
│
├── Rekomendasi Fasilitas
│   ├── Fasilitas yang Relevan
│   ├── Ketersediaan
│   ├── Kompetensi / Layanan
│   ├── Jarak
│   └── Alasan Rekomendasi
│
├── Rujukan Aktif
│   ├── Menunggu Konfirmasi
│   ├── Diterima
│   ├── Tidak Dapat Menerima
│   └── Selesai
│
├── Detail Rujukan
│   ├── Informasi Pasien
│   ├── Fasilitas Tujuan
│   ├── Status
│   ├── Waktu
│   └── Riwayat Perubahan Status
│
└── Riwayat Rujukan
    ├── Semua Rujukan
    ├── Diterima
    ├── Tidak Dapat Menerima
    └── Selesai
```

### Alur Rujukan

```text
Buat Rujukan
      ↓
Input kondisi pasien
      ↓
Sistem mencari fasilitas relevan
      ↓
Lihat rekomendasi
      ↓
Pilih fasilitas
      ↓
Kirim rujukan
      ↓
Menunggu konfirmasi RS
      ↓
Diterima / Tidak dapat menerima
```

---

## 4. Admin Rumah Sakit / Fasilitas Penerima

Rumah sakit tidak hanya menyediakan data availability, tetapi juga menerima dan merespons rujukan dari fasilitas kesehatan lain.

```text
ADMIN RUMAH SAKIT / FASILITAS PENERIMA
│
├── Dashboard
│   ├── Rujukan Masuk
│   ├── Rujukan Menunggu
│   ├── Rujukan Diterima
│   ├── Ketersediaan
│   └── Quick Actions
│
├── Rujukan Masuk
│   ├── Daftar Rujukan
│   ├── Filter Status
│   ├── Filter Fasilitas Pengirim
│   └── Detail Rujukan
│
├── Detail Rujukan
│   ├── Informasi Pasien
│   ├── Fasilitas Pengirim
│   ├── Tenaga Kesehatan Pengirim
│   ├── Kondisi / Diagnosis
│   ├── Tujuan Layanan
│   ├── Prioritas
│   ├── Ketersediaan Layanan
│   └── Action
│       ├── Terima Rujukan
│       └── Tidak Dapat Menerima
│
├── Rujukan Diproses
│   ├── Rujukan Diterima
│   ├── Penjadwalan / Persiapan
│   └── Rujukan Selesai
│
├── Riwayat Rujukan
│   ├── Diterima
│   ├── Tidak Dapat Menerima
│   └── Selesai
│
├── Ketersediaan
│   ├── Rawat Inap
│   │   ├── Kelas 1
│   │   ├── Kelas 2
│   │   ├── Kelas 3
│   │   └── VIP
│   ├── IGD
│   └── ICU
│
├── Jadwal Dokter
│   ├── Daftar Dokter
│   ├── Spesialisasi
│   └── Jadwal Praktik
│
└── Riwayat Update
    ├── Update Ketersediaan
    ├── Update Dokter
    └── Aktivitas Admin
```

### Alur Rujukan Masuk

```text
Puskesmas / Klinik / FKTP
          │
          ▼
     Kirim Rujukan
          │
          ▼
       RujukCepat
          │
          ▼
    Rujukan Masuk RS
          │
          ▼
     Admin RS Review
          │
      ┌───┴────┐
      ▼        ▼
   Terima    Tolak
      │
      ▼
   Diproses
      │
      ▼
    Selesai
```

Status rujukan dapat terlihat oleh pihak pengirim dan pasien sesuai hak akses masing-masing.

---

## 5. Admin Apotek

Role ini menangani proses obat dan estimasi pengambilan.

```text
ADMIN APOTEK
│
├── Dashboard
│   ├── Total Transaksi
│   ├── Menunggu Diproses
│   ├── Sedang Diproses
│   ├── Siap Diambil
│   └── Selesai
│
├── Transaksi
│   ├── Semua Transaksi
│   ├── Menunggu
│   ├── Diproses
│   ├── Siap Diambil
│   └── Selesai
│
├── Detail Transaksi
│   ├── Kode Transaksi
│   ├── Informasi Pasien
│   ├── Daftar Obat
│   ├── Status
│   ├── Estimasi Selesai
│   └── Riwayat Status
│
├── Update Status
│   ├── Terima Resep
│   ├── Diproses
│   ├── Siap Diambil
│   └── Selesai
│
└── Riwayat Transaksi
```

### Alur Obat

```text
Resep masuk
    ↓
Diterima Apotek
    ↓
Diproses
    ↓
Estimasi selesai
    ↓
Siap Diambil
    ↓
Pasien mengambil
    ↓
Selesai
```

Pasien kemudian dapat melihat status dan estimasi pengambilan dari menu **Layanan Obat**.

---

# 6. Hubungan Antar-Role

RujukCepat memiliki tiga ekosistem utama.

## A. Healthcare Referral

```text
TENAGA KESEHATAN
       │
       │ rujukan
       ▼
  RUJUKCEPAT
       │
       ▼
ADMIN RUMAH SAKIT
       │
       │ response
       ▼
TENAGA KESEHATAN
       │
       ▼
     PASIEN
```

## B. Hospital Availability

```text
ADMIN RS
   │
   │ update
   ▼
RUJUKCEPAT
   │
   ├──────────► PASIEN
   │
   └──────────► TENAGA KESEHATAN
```

## C. Medication

```text
ADMIN APOTEK
      │
      │ update status
      ▼
 RUJUKCEPAT
      │
      ▼
    PASIEN
      │
      ▼
Status + Estimasi Pengambilan
```

---

# 7. Final Role Structure

```text
RUJUKCEPAT
│
├── GUEST / PUBLIC
│   ├── Landing Page
│   ├── Cari Rumah Sakit
│   ├── Detail Rumah Sakit
│   └── Tentang
│
├── PASIEN
│   ├── Dashboard
│   ├── Cari Layanan
│   │   ├── Cari Rumah Sakit
│   │   ├── Cari IGD
│   │   ├── Cari Spesialis
│   │   └── Detail Rumah Sakit
│   ├── Rujukan Saya
│   │   ├── Rujukan Aktif
│   │   ├── Detail Rujukan
│   │   ├── Status Rujukan
│   │   └── Riwayat Rujukan
│   ├── Layanan Obat
│   │   ├── Obat Aktif
│   │   ├── Cek Status Obat
│   │   ├── Estimasi Pengambilan
│   │   ├── Detail Transaksi
│   │   └── Riwayat Obat
│   ├── Riwayat Layanan
│   └── Profil
│       ├── Informasi Pribadi
│       ├── Jenis Pembiayaan
│       │   ├── BPJS
│       │   └── Umum
│       └── Pengaturan
│
├── ADMIN RUMAH SAKIT / FASILITAS PENERIMA
│   ├── Dashboard
│   ├── Buat Rujukan
│   ├── Rujukan Masuk
│   │   ├── Daftar Rujukan
│   │   └── Detail Rujukan
│   ├── Rujukan Aktif
│   ├── Rujukan Diproses
│   ├── Riwayat Rujukan
│   ├── Ketersediaan
│   │   ├── Rawat Inap
│   │   ├── IGD
│   │   └── ICU
│   ├── Rekomendasi Fasilitas
│   ├── Jadwal Dokter
│   └── Riwayat Update
│
└── ADMIN APOTEK
    ├── Dashboard
    ├── Transaksi
    │   ├── Semua
    │   ├── Menunggu
    │   ├── Diproses
    │   ├── Siap Diambil
    │   └── Selesai
    ├── Detail Transaksi
    ├── Update Status
    └── Riwayat Transaksi
```
