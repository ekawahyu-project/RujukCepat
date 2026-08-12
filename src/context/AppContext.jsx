import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { initialHospitals } from '../data/hospitals'
import { initialTransactions } from '../data/pharmacy'

const AppCtx = createContext(null)

const LS_KEY = 'rujukcepat_state_v2'

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore corrupt storage */ }
  return {
    hospitals: initialHospitals,
    transactions: initialTransactions,
    referrals: [],
    updateLog: [],
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rujukcepat_user') || 'null') } catch { return null }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    localStorage.setItem('rujukcepat_user', JSON.stringify(user))
  }, [user])

  const login = useCallback((role, name) => setUser({ role, name }), [])
  const logout = useCallback(() => setUser(null), [])

  const updateHospital = useCallback((id, patch, actor = 'Admin') => {
    setState((s) => ({
      ...s,
      hospitals: s.hospitals.map((h) =>
        h.id === id ? { ...h, ...patch, lastUpdated: new Date().toISOString() } : h
      ),
      updateLog: [
        { id: crypto.randomUUID(), hospitalId: id, field: patch.__field || 'Data ketersediaan', actor, at: new Date().toISOString() },
        ...s.updateLog,
      ].slice(0, 50),
    }))
  }, [])

  // Nakes membuat rujukan — status awal: menunggu_konfirmasi
  const addReferral = useCallback((referral) => {
    const id = 'RJ-' + Math.floor(10000 + Math.random() * 89999)
    setState((s) => ({
      ...s,
      referrals: [
        {
          ...referral,
          id,
          status: 'menunggu_konfirmasi',
          createdAt: new Date().toISOString(),
          statusHistory: [{ status: 'menunggu_konfirmasi', at: new Date().toISOString() }],
        },
        ...s.referrals,
      ],
    }))
    return id
  }, [])

  // Admin RS merespons rujukan: 'diterima' atau 'ditolak'
  const respondReferral = useCallback((id, response, note = '') => {
    setState((s) => ({
      ...s,
      referrals: s.referrals.map((r) =>
        r.id === id
          ? {
              ...r,
              status: response,
              respondedAt: new Date().toISOString(),
              responseNote: note,
              statusHistory: [
                ...(r.statusHistory || []),
                { status: response, at: new Date().toISOString(), note },
              ],
            }
          : r
      ),
    }))
  }, [])

  // Nakes / Admin menyelesaikan rujukan
  const completeReferral = useCallback((id) => {
    setState((s) => ({
      ...s,
      referrals: s.referrals.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'selesai',
              statusHistory: [
                ...(r.statusHistory || []),
                { status: 'selesai', at: new Date().toISOString() },
              ],
            }
          : r
      ),
    }))
  }, [])

  const updateTransactionStatus = useCallback((code, status) => {
    setState((s) => ({
      ...s,
      transactions: s.transactions.map((t) =>
        t.code === code
          ? { ...t, status, history: [...t.history, { status, at: new Date().toISOString() }] }
          : t
      ),
    }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      user,
      login,
      logout,
      updateHospital,
      addReferral,
      respondReferral,
      completeReferral,
      updateTransactionStatus,
    }),
    [state, user, login, logout, updateHospital, addReferral, respondReferral, completeReferral, updateTransactionStatus]
  )

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
