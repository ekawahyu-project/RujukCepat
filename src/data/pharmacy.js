const now = Date.now()
const minsAgo = (m) => new Date(now - m * 60000).toISOString()

export const initialTransactions = [
  {
    code: 'RX-20491',
    pharmacy: 'Apotek Sehati Farma',
    patientInitial: 'S. Handoko',
    medicines: [
      { name: 'Amoxicillin 500mg', qty: '10 tablet' },
      { name: 'Paracetamol 500mg', qty: '10 tablet' },
    ],
    status: 'siap',
    history: [
      { status: 'diproses', at: minsAgo(52) },
      { status: 'siap', at: minsAgo(6) },
    ],
  },
  {
    code: 'RX-20488',
    pharmacy: 'Apotek Kimia Waras',
    patientInitial: 'R. Anjani',
    medicines: [{ name: 'Amlodipine 10mg', qty: '30 tablet' }],
    status: 'diproses',
    history: [{ status: 'diproses', at: minsAgo(18) }],
  },
  {
    code: 'RX-20455',
    pharmacy: 'Apotek Sehati Farma',
    patientInitial: 'T. Firmansyah',
    medicines: [
      { name: 'Salbutamol Inhaler', qty: '1 unit' },
      { name: 'Vitamin C 500mg', qty: '20 tablet' },
    ],
    status: 'selesai',
    history: [
      { status: 'diproses', at: minsAgo(600) },
      { status: 'siap', at: minsAgo(480) },
      { status: 'selesai', at: minsAgo(430) },
    ],
  },
  {
    code: 'RX-20502',
    pharmacy: 'Apotek Medika Jaya',
    patientInitial: 'N. Kartika',
    medicines: [{ name: 'Metformin 500mg', qty: '30 tablet' }],
    status: 'diproses',
    history: [{ status: 'diproses', at: minsAgo(4) }],
  },
]
