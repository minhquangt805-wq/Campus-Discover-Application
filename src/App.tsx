import { Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppLayout } from './components/AppLayout'
import { ExplorePage } from './pages/ExplorePage'
import { SearchPage } from './pages/SearchPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { CalendarPage } from './pages/CalendarPage'
import { RemindersPage } from './pages/RemindersPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() { return <AppProvider><Routes><Route element={<AppLayout />}><Route path="/" element={<ExplorePage />} /><Route path="/search" element={<SearchPage />} /><Route path="/events/:id" element={<EventDetailPage />} /><Route path="/calendar" element={<CalendarPage />} /><Route path="/reminders" element={<RemindersPage />} /><Route path="/settings" element={<SettingsPage />} /></Route></Routes></AppProvider> }
