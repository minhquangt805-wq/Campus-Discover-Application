export type EventCategory = 'workshop' | 'seminar' | 'competition' | 'club' | 'activity'

export interface Event {
  id: string
  title: string
  description: string
  category: EventCategory
  organizer: string
  location: string
  startTime: string
  endTime: string
  tags: string[]
  capacity: number
  registeredCount: number
  imageUrl: string
}

export interface BusyTimeBlock {
  day: string
  start: string
  end: string
}

export interface UserProfile {
  interests: string[]
  major: string
  clubs: string[]
  pastActivityIds: string[]
  weeklySchedule: BusyTimeBlock[]
  careerGoals: string[]
}

export interface Reminder { eventId: string; enabled: boolean; snoozedUntil?: string }
