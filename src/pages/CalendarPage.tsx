import { Link } from 'react-router-dom'
import { allEvents, useApp } from '../context/AppContext'
import { formatDateTime } from '../components/EventCard'

export function CalendarPage() {
  const { registeredIds } = useApp(); const events = allEvents.filter((event) => registeredIds.includes(event.id))
  return <div className="page"><p className="eyebrow">Your plans</p><h1 className="mt-1 text-3xl font-black">My calendar</h1><p className="mt-2 text-slate-600">Every event you register for appears here.</p>{events.length ? <div className="mt-7 space-y-3">{events.map((event) => <Link key={event.id} to={`/events/${event.id}`} className="card flex gap-4 p-4 transition hover:shadow-lg"><div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-aqua text-center text-xs font-extrabold text-emerald-800">{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(event.startTime))}</div><div><h2 className="font-extrabold">{event.title}</h2><p className="mt-1 text-sm text-slate-600">◷ {formatDateTime(event.startTime)} · {event.location}</p></div></Link>)}</div> : <EmptyCalendar />}</div>
}
function EmptyCalendar() { return <div className="card mt-7 p-10 text-center"><div className="text-4xl">▦</div><h2 className="mt-3 text-xl font-extrabold">Your calendar is clear</h2><p className="mt-2 text-slate-500">Register for something exciting and it will land here.</p><Link to="/search" className="button-primary mt-5 inline-block">Find an event</Link></div> }
