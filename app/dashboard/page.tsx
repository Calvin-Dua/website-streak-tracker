import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/login/actions'
import { GoalWithStats } from '@/types/database'
import { calculateStreak, hasVisitedToday, getLastVisitDate } from '@/utils/streak'
import GoalCard from '@/components/GoalCard'
import GoalForm from '@/components/GoalForm'
import StatsBar from '@/components/StatsBar'
import EmptyState from '@/components/EmptyState'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: goals } = await supabase
    .from('goals').select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const { data: visitLogs } = await supabase
    .from('visit_logs').select('*')
    .eq('user_id', user.id)

  const goalsWithStats: GoalWithStats[] = (goals || []).map((goal, index) => {
    const goalLogs = (visitLogs || []).filter(log => log.goal_id === goal.id)
    return {
      ...goal,
      currentStreak: calculateStreak(goalLogs),
      totalVisits: goalLogs.length,
      lastVisitDate: getLastVisitDate(goalLogs),
      visitedToday: hasVisitedToday(goalLogs),
      colorIndex: index % 4,
    }
  })

  const bestStreak = Math.max(...goalsWithStats.map(g => g.currentStreak), 0)

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* Sunset background — absolute avoids mobile fixed-position jitter on scroll */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', minHeight: '100%' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #9b8ec4 0%, #b8a0c8 20%, #c9a8b8 40%, #d4a090 60%, #e0a878 80%, #e8b86d 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 80%, #f0c070aa 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 10%, #9b8ec455 0%, transparent 50%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Navbar */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px',
          background: '#ffffff18',
          borderBottom: '1px solid #ffffff33',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30,
              background: 'linear-gradient(135deg,#c9a0dc,#9b6ec4)',
              borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 15, boxShadow: '0 4px 12px #9b6ec433',
            }}>🔥</div>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#2d1a3a' }}>Streakly</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {bestStreak > 0 && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 500,
                background: '#e8845a22', color: '#8a3a10',
                border: '1px solid #e8845a55',
                borderRadius: 99, padding: '3px 10px',
              }}>
                🔥 {bestStreak} day streak
              </div>
            )}
            {/* Hide email on mobile */}
            <span className="hide-mobile" style={{ fontSize: 12, color: '#4a2a5a' }}>
              {user.email}
            </span>
            <form action={signOut}>
              <button type="submit" className="btn-tap-glass" style={{
                fontSize: 12, padding: '6px 14px', borderRadius: 8,
                background: '#ffffff28', color: '#2d1a3a',
                border: '1px solid #ffffff44', cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}>
                Sign out
              </button>
            </form>
          </div>
        </nav>

        {/* Main content */}
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '20px 16px',
        }}>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', marginBottom: 20,
          }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 500, color: '#2d1a3a' }}>
                My Goals
              </h1>
              <p style={{ fontSize: 15, color: '#6a4a7a', marginTop: 4 }}>
                Track your daily website visits
              </p>
            </div>
            <GoalForm />
          </div>

          {/* Stats */}
          {goalsWithStats.length > 0 && <StatsBar goals={goalsWithStats} />}

          {/* Goals or Empty */}
          {goalsWithStats.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))',
              gap: 14,
            }}>
              {goalsWithStats.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}