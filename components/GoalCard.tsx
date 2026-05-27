'use client'

import { GoalWithStats } from '@/types/database'
import LogVisitButton from './LogVisitButton'
import { deleteGoal } from '@/app/dashboard/actions'

type Props = { goal: GoalWithStats }

const CARD_GRADIENTS = [
  {
    // Blue — deep blue top-left, fades to near white bottom-right
    bg: 'linear-gradient(135deg, #90C4F9 0%, #C8E0FC 40%, #EEF6FF 100%)',
    iconBg: '#ffffffbb',
    iconColor: '#1a7fd4',
    accent: '#1a7fd4',
  },
  {
    // Purple — deep purple top-left, fades to near white bottom-right
    bg: 'linear-gradient(135deg, #A78BFA 0%, #C9B8FD 40%, #EDE9FF 100%)',
    iconBg: '#ffffffbb',
    iconColor: '#6d28d9',
    accent: '#6d28d9',
  },
  {
    // Pink — deep pink top-left, fades to near white bottom-right
    bg: 'linear-gradient(135deg, #F472B6 0%, #F9A8D4 40%, #FDE8F4 100%)',
    iconBg: '#ffffffbb',
    iconColor: '#be185d',
    accent: '#be185d',
  },
  {
    // Green — deep green top-left, fades to near white bottom-right
    bg: 'linear-gradient(135deg, #34D399 0%, #86EFBC 40%, #E0FDF1 100%)',
    iconBg: '#ffffffbb',
    iconColor: '#065f46',
    accent: '#065f46',
  },
]

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase()
}

export default function GoalCard({ goal }: Props) {
  const theme = CARD_GRADIENTS[goal.colorIndex ?? 0]

  const progressPercent = Math.min(
    Math.round((goal.totalVisits / goal.target_days) * 100), 100
  )

  function formatDate(dateStr: string | null) {
    if (!dateStr) return 'Never'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }

  async function handleDelete() {
    if (confirm(`Delete goal for ${goal.website_name}?`)) {
      await deleteGoal(goal.id)
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff38 0%, #ffffff22 100%)',
      border: '1px solid #ffffff66',
      borderRadius: 16,
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: '0 8px 32px #00000018, 0 1px 0 #ffffff55 inset',
    }}>

      {/* Delete button */}
      <button onClick={handleDelete} className="btn-tap-base active:bg-black/10" style={{
        position: 'absolute', top: 14, right: 16,
        background: 'none', border: 'none',
        color: '#00000030', cursor: 'pointer',
        fontSize: 18, lineHeight: 1, padding: '0 4px',
      }}>×</button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        
        <div>
          <h3 style={{
            fontSize: 20, fontWeight: 700,
            color: '#1a1a2e', marginBottom: 3,
          }}>
            {goal.website_name}
          </h3>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#555566' }}>
            Daily Goal • {goal.target_days} Days
          </p>
        </div>
      </div>

      {/* Streak row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>
              {goal.currentStreak}
            </p>
            <p style={{ fontSize: 13, fontWeight: 200, color: '#666677', marginTop: 2 }}>Current Streak</p>
          </div>
        </div>

        {/* Log visit button */}
        <LogVisitButton goalId={goal.id} visitedToday={goal.visitedToday} />
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: '#666677' }}>
            {goal.totalVisits}/{goal.target_days} days
          </span>
          <span style={{ fontSize: 13, color: theme.accent, fontWeight: 600 }}>
            {progressPercent}%
          </span>
        </div>
        <div style={{
          background: '#ffffff55',
          borderRadius: 99, height: 6, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${progressPercent}%`,
            background: theme.accent,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTop: '0.5px solid #ffffff55',
      }}>
        <span style={{ fontSize: 11, color: '#666677' }}>
          Last visit: {formatDate(goal.lastVisitDate)}
        </span>
        <span style={{ fontSize: 11, color: '#666677' }}>
          {goal.target_days - goal.totalVisits > 0
            ? `${goal.target_days - goal.totalVisits} days left`
            : '🎉 Complete!'}
        </span>
      </div>
    </div>
  )
}