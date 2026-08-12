import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import Landing from './pages/public/Landing'
import CariRumahSakit from './pages/public/CariRumahSakit'
import DetailRumahSakit from './pages/public/DetailRumahSakit'
import CekObat from './pages/public/CekObat'
import Tentang from './pages/public/Tentang'
import Login from './pages/Login'

// Pasien
import PasienDashboard from './pages/pasien/PasienDashboard'
import CariLayanan from './pages/pasien/CariLayanan'
import RujukanSaya from './pages/pasien/RujukanSaya'
import LayananObat from './pages/pasien/LayananObat'
import RiwayatLayanan from './pages/pasien/RiwayatLayanan'
import Profil from './pages/pasien/Profil'

// Admin Rumah Sakit
import AdminRsDashboard from './pages/admin-rs/AdminRsDashboard'
import BuatRujukan from './pages/admin-rs/BuatRujukan'
import RujukanMasuk from './pages/admin-rs/RujukanMasuk'
import RujukanAktif from './pages/admin-rs/RujukanAktif'
import RujukanDiproses from './pages/admin-rs/RujukanDiproses'
import RiwayatRujukan from './pages/admin-rs/RiwayatRujukan'
import DetailRujukan from './pages/admin-rs/DetailRujukan'
import Ketersediaan from './pages/admin-rs/Ketersediaan'
import RekomendasiFasilitas from './pages/admin-rs/RekomendasiFasilitas'
import JadwalDokter from './pages/admin-rs/JadwalDokter'
import RiwayatUpdate from './pages/admin-rs/RiwayatUpdate'

// Admin Apotek
import AdminApotekDashboard from './pages/admin-apotek/AdminApotekDashboard'
import TransaksiObat from './pages/admin-apotek/TransaksiObat'
import DetailTransaksi from './pages/admin-apotek/DetailTransaksi'

import { ProtectedRoute } from './components/Misc'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/cari-rumah-sakit" element={<CariRumahSakit />} />
        <Route path="/rumah-sakit/:id" element={<DetailRumahSakit />} />
        <Route path="/cek-obat" element={<CekObat />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/login" element={<Login />} />

        {/* Pasien */}
        <Route path="/pasien/dashboard" element={<ProtectedRoute role="pasien"><PasienDashboard /></ProtectedRoute>} />
        <Route path="/pasien/cari-layanan" element={<ProtectedRoute role="pasien"><CariLayanan /></ProtectedRoute>} />
        <Route path="/pasien/rujukan" element={<ProtectedRoute role="pasien"><RujukanSaya /></ProtectedRoute>} />
        <Route path="/pasien/obat" element={<ProtectedRoute role="pasien"><LayananObat /></ProtectedRoute>} />
        <Route path="/pasien/riwayat" element={<ProtectedRoute role="pasien"><RiwayatLayanan /></ProtectedRoute>} />
        <Route path="/pasien/profil" element={<ProtectedRoute role="pasien"><Profil /></ProtectedRoute>} />

        {/* Admin Rumah Sakit / Fasilitas Penerima */}
        <Route path="/admin-rs/dashboard" element={<ProtectedRoute role="admin-rs"><AdminRsDashboard /></ProtectedRoute>} />
        <Route path="/admin-rs/buat-rujukan" element={<ProtectedRoute role="admin-rs"><BuatRujukan /></ProtectedRoute>} />
        <Route path="/admin-rs/rujukan-masuk" element={<ProtectedRoute role="admin-rs"><RujukanMasuk /></ProtectedRoute>} />
        <Route path="/admin-rs/rujukan-aktif" element={<ProtectedRoute role="admin-rs"><RujukanAktif /></ProtectedRoute>} />
        <Route path="/admin-rs/rujukan-diproses" element={<ProtectedRoute role="admin-rs"><RujukanDiproses /></ProtectedRoute>} />
        <Route path="/admin-rs/riwayat-rujukan" element={<ProtectedRoute role="admin-rs"><RiwayatRujukan /></ProtectedRoute>} />
        <Route path="/admin-rs/riwayat/:id" element={<ProtectedRoute role="admin-rs"><DetailRujukan /></ProtectedRoute>} />
        <Route path="/admin-rs/ketersediaan" element={<ProtectedRoute role="admin-rs"><Ketersediaan /></ProtectedRoute>} />
        <Route path="/admin-rs/rekomendasi" element={<ProtectedRoute role="admin-rs"><RekomendasiFasilitas /></ProtectedRoute>} />
        <Route path="/admin-rs/jadwal-dokter" element={<ProtectedRoute role="admin-rs"><JadwalDokter /></ProtectedRoute>} />
        <Route path="/admin-rs/riwayat-update" element={<ProtectedRoute role="admin-rs"><RiwayatUpdate /></ProtectedRoute>} />

        {/* Admin Apotek */}
        <Route path="/admin-apotek/dashboard" element={<ProtectedRoute role="admin-apotek"><AdminApotekDashboard /></ProtectedRoute>} />
        <Route path="/admin-apotek/transaksi" element={<ProtectedRoute role="admin-apotek"><TransaksiObat /></ProtectedRoute>} />
        <Route path="/admin-apotek/transaksi/:code" element={<ProtectedRoute role="admin-apotek"><DetailTransaksi /></ProtectedRoute>} />

        <Route path="*" element={<Landing />} />
      </Routes>
    </AnimatePresence>
  )
}
