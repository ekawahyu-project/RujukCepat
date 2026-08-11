import { HeartPulse, Bone, Baby, PersonStanding, Wind, Brain, Stethoscope } from 'lucide-react'

export const CONDITION_CATEGORIES = [
  { key: 'jantung', label: 'Nyeri Dada / Kondisi Jantung', specialty: 'Jantung', icon: HeartPulse },
  { key: 'trauma', label: 'Cedera / Kecelakaan', specialty: 'Bedah', icon: Bone },
  { key: 'anak', label: 'Kondisi Anak', specialty: 'Anak', icon: Baby },
  { key: 'kandungan', label: 'Ibu Hamil / Bersalin', specialty: 'Kandungan', icon: PersonStanding },
  { key: 'paru', label: 'Gangguan Pernapasan', specialty: 'Paru', icon: Wind },
  { key: 'saraf', label: 'Stroke / Gangguan Saraf', specialty: 'Saraf', icon: Brain },
  { key: 'umum', label: 'Kondisi Umum Lainnya', specialty: 'Umum', icon: Stethoscope },
]
