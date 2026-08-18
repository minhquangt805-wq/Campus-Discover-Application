import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Reminder, UserProfile } from '../types'
import { eventRepository } from '../data/repository'

const defaultProfile: UserProfile = { interests: ['ai', 'design', 'entrepreneurship'], major: 'computer science', clubs: ['Data Science Club'], pastActivityIds: ['e4', 'e1'], weeklySchedule: [{ day: 'Thu', start: '14:00', end: '16:00' }, { day: 'Mon', start: '18:00', end: '20:00' }], careerGoals: ['product', 'technology'] }
type AppState = { profile: UserProfile; setProfile: (value: UserProfile) => void; registeredIds: string[]; register: (id: string) => void; unregister: (id: string) => void; reminders: Reminder[]; toggleReminder: (id: string) => boolean; snoozeReminder: (id: string) => void }
const AppContext = createContext<AppState | null>(null)
export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(defaultProfile); const [registeredIds, setRegisteredIds] = useState<string[]>([]); const [reminders, setReminders] = useState<Reminder[]>([])
  const value = useMemo(() => ({
    profile, setProfile, registeredIds, reminders,
    register: (id: string) => setRegisteredIds((ids) => ids.includes(id) ? ids : [...ids, id]),
    // Removing a registration also removes its reminder, keeping the badge and list accurate.
    unregister: (id: string) => { setRegisteredIds((ids) => ids.filter((registeredId) => registeredId !== id)); setReminders((items) => items.filter((item) => item.eventId !== id)) },
    toggleReminder: (id: string) => {
      const existing = reminders.some((item) => item.eventId === id)
      const event = eventRepository.getById(id)
      // Do not create a new reminder after an event has started or ended.
      if (!existing && (!event || new Date(event.startTime).getTime() <= Date.now())) return false
      setReminders((items) => existing ? items.map((item) => item.eventId === id ? { ...item, enabled: !item.enabled } : item) : [...items, { eventId: id, enabled: true }])
      return true
    },
    snoozeReminder: (id: string) => setReminders((items) => items.map((item) => item.eventId === id ? { ...item, snoozedUntil: new Date(Date.now() + 86400000).toISOString(), enabled: true } : item)),
  }), [profile, registeredIds, reminders])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => { const state = useContext(AppContext); if (!state) throw new Error('useApp must be inside AppProvider'); return state }
export const allEvents = eventRepository.getAll()
