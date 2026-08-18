import rawEvents from './events.json'
import type { Event } from '../types'

// Swap this module for fetch/API calls later; UI components only use these helpers.
export const eventRepository = {
  getAll: (): Event[] => rawEvents as Event[],
  getById: (id: string): Event | undefined => (rawEvents as Event[]).find((event) => event.id === id),
}
