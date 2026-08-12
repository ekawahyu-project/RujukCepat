const now = Date.now()
const minsAgo = (m) => new Date(now - m * 60000).toISOString()

export const initialTransactions = [
  {
    code: 'RX-20510',
    pharmacy: 'Apotek Sehati Farma',
    patientInitial: 'B. Pratama',
    medicines: [
      { name: 'Cetirizine 10mg', qty: '10 tablet' },
      { name: 'Dexamethasone 0.5mg', qty: '6 tablet' },
    ],
    status: 'menunggu',
    history: [
      { status: 'menunggu', at: minsAgo(5) },
    ],
  },
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
      { status: 'menunggu', at: minsAgo(70) },
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
    history: [
      { status: 'menunggu', at: minsAgo(30) },
      { status: 'diproses', at: minsAgo(18) },
    ],
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
      { status: 'menunggu', at: minsAgo(650) },
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
    history: [
      { status: 'menunggu', at: minsAgo(20) },
      { status: 'diproses', at: minsAgo(4) },
    ],
  },
  {
    code: 'RX-20515',
    pharmacy: 'Apotek Medika Jaya',
    patientInitial: 'H. Wijaya',
    medicines: [{ name: 'Lansoprazole 30mg', qty: '14 kapsul' }],
    status: 'menunggu',
    history: [
      { status: 'menunggu', at: minsAgo(2) },
    ],
  },
]
