import { Link } from 'react-router-dom'
import { EventCard } from '../components/EventCard'
import { allEvents, useApp } from '../context/AppContext'
import { getRecommendedEvents } from '../utils/recommendations'

export function ExplorePage() {
  const { profile } = useApp(); const recommended = getRecommendedEvents(profile, allEvents)
  return <div className="page"><section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Good afternoon, Alex</p><h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Make campus feel like <span className="text-brand">yours.</span></h1><p className="mt-2 max-w-xl text-slate-600">Events picked around your interests, goals, and schedule.</p></div><Link to="/search" className="button-secondary w-fit">Browse all events →</Link></section><section className="mb-10"><div className="mb-4 flex items-end justify-between"><div><p className="eyebrow">For you</p><h2 className="text-xl font-extrabold">Recommended for you</h2></div><Link to="/settings" className="text-sm font-bold text-brand">Tune profile</Link></div><div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 sm:-mx-8 sm:px-8">{recommended.slice(0, 4).map((event) => <EventCard key={event.id} event={event} compact />)}</div></section><section><div className="mb-4"><p className="eyebrow">Coming up</p><h2 className="text-xl font-extrabold">Explore campus events</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{allEvents.map((event) => <EventCard key={event.id} event={event} />)}</div></section></div>
}
