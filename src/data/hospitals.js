// Data contoh (mock) — nama & data bersifat fiktif untuk keperluan demo produk.
const now = Date.now()
const minsAgo = (m) => new Date(now - m * 60000).toISOString()

export const SPECIALTIES = [
  'Umum', 'Bedah', 'Anak', 'Kandungan', 'Jantung', 'Paru', 'Saraf', 'Penyakit Dalam', 'Mata', 'THT',
]

export const SERVICE_TYPES = ['IGD 24 Jam', 'ICU', 'Rawat Inap', 'Bedah Sentral', 'Radiologi', 'Laboratorium', 'Hemodialisa']

export const initialHospitals = [
  {
    id: 'rs-01',
    name: 'RSUD Kartika Husada',
    type: 'RS Pemerintah Kelas B',
    address: 'Jl. Ijen No. 45, Klojen, Malang',
    lat: -7.9797, lng: 112.6304,
    phone: '0341-551234',
    services: ['IGD 24 Jam', 'ICU', 'Rawat Inap', 'Bedah Sentral', 'Radiologi', 'Laboratorium'],
    specialists: ['Umum', 'Bedah', 'Jantung', 'Penyakit Dalam', 'Saraf'],
    beds: { kelas1: { total: 20, avail: 6 }, kelas2: { total: 30, avail: 9 }, kelas3: { total: 40, avail: 2 }, vip: { total: 8, avail: 1 } },
    igd: { total: 12, avail: 4 },
    icu: { total: 10, avail: 2 },
    doctors: [
      { name: 'dr. Amelia Putri, Sp.JP', specialty: 'Jantung', days: 'Senin, Rabu, Jumat', hours: '08.00–12.00' },
      { name: 'dr. Bagus Nugraha, Sp.B', specialty: 'Bedah', days: 'Selasa, Kamis', hours: '13.00–16.00' },
      { name: 'dr. Citra Wulandari, Sp.PD', specialty: 'Penyakit Dalam', days: 'Senin–Jumat', hours: '09.00–14.00' },
    ],
    lastUpdated: minsAgo(3),
  },
  {
    id: 'rs-02',
    name: 'RS Siaga Sehati',
    type: 'RS Swasta Kelas C',
    address: 'Jl. Soekarno Hatta No. 12, Lowokwaru, Malang',
    lat: -7.9457, lng: 112.6135,
    phone: '0341-552211',
    services: ['IGD 24 Jam', 'Rawat Inap', 'Laboratorium', 'Radiologi'],
    specialists: ['Umum', 'Anak', 'Kandungan', 'Mata'],
    beds: { kelas1: { total: 10, avail: 3 }, kelas2: { total: 18, avail: 0 }, kelas3: { total: 22, avail: 8 }, vip: { total: 4, avail: 2 } },
    igd: { total: 6, avail: 2 },
    icu: { total: 4, avail: 0 },
    doctors: [
      { name: 'dr. Dewi Anggraini, Sp.A', specialty: 'Anak', days: 'Senin, Selasa, Kamis', hours: '10.00–13.00' },
      { name: 'dr. Eko Prasetyo, Sp.M', specialty: 'Mata', days: 'Rabu, Jumat', hours: '08.00–11.00' },
    ],
    lastUpdated: minsAgo(140),
  },
  {
    id: 'rs-03',
    name: 'RS Bhakti Waluyo',
    type: 'RS Swasta Kelas B',
    address: 'Jl. A. Yani No. 88, Blimbing, Malang',
    lat: -7.9498, lng: 112.6428,
    phone: '0341-553390',
    services: ['IGD 24 Jam', 'ICU', 'Rawat Inap', 'Bedah Sentral', 'Hemodialisa', 'Laboratorium'],
    specialists: ['Umum', 'Bedah', 'Saraf', 'Paru', 'Penyakit Dalam', 'THT'],
    beds: { kelas1: { total: 16, avail: 5 }, kelas2: { total: 24, avail: 11 }, kelas3: { total: 30, avail: 14 }, vip: { total: 6, avail: 3 } },
    igd: { total: 10, avail: 7 },
    icu: { total: 8, avail: 3 },
    doctors: [
      { name: 'dr. Farhan Maulana, Sp.S', specialty: 'Saraf', days: 'Senin–Jumat', hours: '14.00–17.00' },
      { name: 'dr. Gita Ramadhani, Sp.P', specialty: 'Paru', days: 'Selasa, Kamis, Sabtu', hours: '09.00–12.00' },
    ],
    lastUpdated: minsAgo(8),
  },
  {
    id: 'rs-04',
    name: 'RSI Nur Hidayah',
    type: 'RS Swasta Kelas C',
    address: 'Jl. Raya Tlogomas No. 55, Malang',
    lat: -7.9203, lng: 112.5987,
    phone: '0341-554521',
    services: ['IGD 24 Jam', 'Rawat Inap', 'Laboratorium'],
    specialists: ['Umum', 'Kandungan', 'Anak'],
    beds: { kelas1: { total: 8, avail: 0 }, kelas2: { total: 12, avail: 0 }, kelas3: { total: 16, avail: 0 }, vip: { total: 2, avail: 0 } },
    igd: { total: 4, avail: 0 },
    icu: { total: 2, avail: 0 },
    doctors: [
      { name: 'dr. Hana Salsabila, Sp.OG', specialty: 'Kandungan', days: 'Senin, Rabu, Sabtu', hours: '08.00–12.00' },
    ],
    lastUpdated: minsAgo(320),
  },
  {
    id: 'rs-05',
    name: 'RSUD Ken Arok',
    type: 'RS Pemerintah Kelas A',
    address: 'Jl. Terusan Dieng No. 3, Sukun, Malang',
    lat: -7.9932, lng: 112.6089,
    phone: '0341-555678',
    services: ['IGD 24 Jam', 'ICU', 'Rawat Inap', 'Bedah Sentral', 'Radiologi', 'Laboratorium', 'Hemodialisa'],
    specialists: ['Umum', 'Bedah', 'Anak', 'Kandungan', 'Jantung', 'Paru', 'Saraf', 'Penyakit Dalam', 'Mata', 'THT'],
    beds: { kelas1: { total: 30, avail: 12 }, kelas2: { total: 40, avail: 20 }, kelas3: { total: 60, avail: 25 }, vip: { total: 12, avail: 4 } },
    igd: { total: 16, avail: 9 },
    icu: { total: 14, avail: 5 },
    doctors: [
      { name: 'dr. Indra Kusuma, Sp.JP', specialty: 'Jantung', days: 'Senin–Sabtu', hours: '08.00–15.00' },
      { name: 'dr. Jasmine Aulia, Sp.THT', specialty: 'THT', days: 'Selasa, Kamis', hours: '09.00–12.00' },
      { name: 'dr. Kevin Wibisono, Sp.B', specialty: 'Bedah', days: 'Senin, Rabu, Jumat', hours: '13.00–17.00' },
    ],
    lastUpdated: minsAgo(1),
  },
  {
    id: 'rs-06',
    name: 'RS Citra Medika',
    type: 'RS Swasta Kelas B',
    address: 'Jl. Danau Toba No. 20, Sawojajar, Malang',
    lat: -7.9639, lng: 112.6683,
    phone: '0341-556712',
    services: ['IGD 24 Jam', 'ICU', 'Rawat Inap', 'Radiologi', 'Laboratorium'],
    specialists: ['Umum', 'Bedah', 'Anak', 'Penyakit Dalam'],
    beds: { kelas1: { total: 14, avail: 1 }, kelas2: { total: 20, avail: 4 }, kelas3: { total: 26, avail: 3 }, vip: { total: 5, avail: 0 } },
    igd: { total: 8, avail: 1 },
    icu: { total: 6, avail: 1 },
    doctors: [
      { name: 'dr. Laras Ayu, Sp.A', specialty: 'Anak', days: 'Senin–Jumat', hours: '15.00–18.00' },
    ],
    lastUpdated: minsAgo(45),
  },
]

export function bedTotals(h) {
  const beds = h.beds.kelas1.avail + h.beds.kelas2.avail + h.beds.kelas3.avail + h.beds.vip.avail
  const bedTotal = h.beds.kelas1.total + h.beds.kelas2.total + h.beds.kelas3.total + h.beds.vip.total
  return { avail: beds, total: bedTotal }
}

// Status keseluruhan RS berdasarkan rasio ketersediaan kamar, IGD & ICU.
export function hospitalStatus(h) {
  const beds = bedTotals(h)
  const ratios = [beds.avail / beds.total, h.igd.avail / h.igd.total, h.icu.avail / h.icu.total]
  const min = Math.min(...ratios)
  if (min <= 0.05) return 'penuh'
  if (min < 0.3) return 'terbatas'
  return 'tersedia'
}
