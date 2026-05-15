export type Goal = {
  id: string
  user_id: string
  website_url: string
  website_name: string
  target_days: number
  created_at: string
}

export type VisitLog = {
  id: string
  goal_id: string
  user_id: string
  visited_at: string
  created_at: string
}

export type GoalWithStats = Goal & {
  currentStreak: number
  totalVisits: number
  lastVisitDate: string | null
  visitedToday: boolean
  colorIndex: number
}