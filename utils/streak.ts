import { VisitLog } from '@/types/database'

export function calculateStreak(visitLogs: VisitLog[]): number {
  if (visitLogs.length === 0) return 0

  // Sort logs by date, most recent first
  const sortedDates = visitLogs
    .map(log => log.visited_at)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  // Remove duplicates
  const uniqueDates = [...new Set(sortedDates)]

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const mostRecentVisit = new Date(uniqueDates[0])
  mostRecentVisit.setHours(0, 0, 0, 0)

  // If most recent visit is not today or yesterday, streak is broken
  if (
    mostRecentVisit.getTime() !== today.getTime() &&
    mostRecentVisit.getTime() !== yesterday.getTime()
  ) {
    return 0
  }

  // Count consecutive days going back from most recent visit
  let streak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const current = new Date(uniqueDates[i - 1])
    const previous = new Date(uniqueDates[i])
    current.setHours(0, 0, 0, 0)
    previous.setHours(0, 0, 0, 0)

    const diffInDays =
      (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24)

    if (diffInDays === 1) {
      streak++
    } else {
      // Gap found — streak is broken
      break
    }
  }

  return streak
}

export function hasVisitedToday(visitLogs: VisitLog[]): boolean {
  const today = new Date().toISOString().split('T')[0]
  return visitLogs.some(log => log.visited_at === today)
}

export function getLastVisitDate(visitLogs: VisitLog[]): string | null {
  if (visitLogs.length === 0) return null

  const sorted = visitLogs
    .map(log => log.visited_at)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return sorted[0]
}