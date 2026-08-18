import type { Event, UserProfile } from '../types'

/**
 * Presentation scoring reference:
 * - matching event tag: +3
 * - past attendance in the same category: +2
 * - event fits weekly schedule: +2
 * - event conflicts with weekly schedule: -3
 */
const normalize = (value: string) => value.toLowerCase().trim()
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const toMinutes = (value: string) => { const [hours, minutes] = value.split(':').map(Number); return hours * 60 + minutes }

/**
 * Scores events with a few explainable signals. Scores are intentionally simple
 * so the recommendation can be presented and adjusted without a black box.
 */
export function getRecommendedEvents(user: UserProfile, events: Event[]): Event[] {
  const preferences = new Set([user.major, ...user.interests, ...user.clubs, ...user.careerGoals].map(normalize).filter(Boolean))
  const pastCategories = new Set(user.pastActivityIds.map((id) => events.find((event) => event.id === id)?.category).filter(Boolean))
  const hasPersonalSignals = preferences.size > 0 || pastCategories.size > 0 || user.weeklySchedule.length > 0

  // A new user has no signals yet, so give them a predictable, useful feed:
  // upcoming events first instead of an arbitrary original-data order.
  if (!hasPersonalSignals) return [...events].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime() || a.id.localeCompare(b.id))

  return [...events].map((event) => {
    let score = 0
    const tags = event.tags.map(normalize)
    // +3 per matched interest, major, club, or career goal tag.
    score += tags.filter((tag) => preferences.has(tag)).length * 3
    // +2 if they have attended this category before.
    if (pastCategories.has(event.category)) score += 2
    const start = new Date(event.startTime)
    const eventDay = dayNames[start.getDay()]
    const eventStart = start.getHours() * 60 + start.getMinutes()
    const eventEnd = new Date(event.endTime).getHours() * 60 + new Date(event.endTime).getMinutes()
    const conflicts = user.weeklySchedule.some((block) => block.day === eventDay && eventStart < toMinutes(block.end) && eventEnd > toMinutes(block.start))
    // +2 when it fits their stated weekly availability; -3 when it overlaps.
    score += conflicts ? -3 : 2
    return { event, score }
  }).sort((a, b) => b.score - a.score || new Date(a.event.startTime).getTime() - new Date(b.event.startTime).getTime() || a.event.id.localeCompare(b.event.id)).map(({ event }) => event)
}
