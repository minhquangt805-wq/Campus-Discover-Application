import { Link } from 'react-router-dom'
import type { Event } from '../types'

const colors = { workshop: 'bg-violet-100 text-violet-700', seminar: 'bg-sky-100 text-sky-700', competition: 'bg-orange-100 text-orange-700', club: 'bg-emerald-100 text-emerald-700', activity: 'bg-rose-100 text-rose-700' }
export const formatDateTime = (time: string) => new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(time))

export function EventCard({ event, compact = false }: { event: Event; compact?: boolean }) {
  return <Link to={`/events/${event.id}`} className={`card group block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg ${compact ? 'min-w-[276px] max-w-[276px]' : ''}`}>
    <img src={event.imageUrl} alt="" className={compact ? 'h-32 w-full object-cover' : 'h-44 w-full object-cover'} />
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${colors[event.category]}`}>{event.category}</span><span className="text-xs text-slate-500">{event.capacity - event.registeredCount} spots left</span></div>
      <h3 className="line-clamp-2 break-words text-base font-extrabold leading-snug text-ink group-hover:text-brand">{event.title}</h3>
      <p className="mt-1 line-clamp-2 break-words text-sm leading-relaxed text-slate-500">{event.description}</p>
      <p className="mt-2 text-sm font-medium text-slate-600">◷ {formatDateTime(event.startTime)}</p>
      <p className="mt-1 truncate text-sm text-slate-500">⌖ {event.location}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{event.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{tag}</span>)}</div>
    </div>
  </Link>
}
