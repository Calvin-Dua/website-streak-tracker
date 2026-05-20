import { GoalWithStats } from '@/types/database'

type Props = { goals: GoalWithStats[] }

export default function StatsBar({ goals }: Props) {
  const totalGoals = goals.length
  const activeStreaks = goals.filter(g => g.currentStreak > 0).length
  const visitedToday = goals.filter(g => g.visitedToday).length
  const longestStreak = Math.max(...goals.map(g => g.currentStreak), 0)

  const stats = [
    { num: totalGoals, label: 'Total goals', color: '#2d1a3a' },
    { num: activeStreaks, label: 'Best streak', color: '#e8845a' },
    { num: visitedToday, label: 'Visited today', color: '#9b6ec4' },
    { num: longestStreak, label: 'Consistency', color: '#c17344' },
  ]

  return (
    <>
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} style={{
            background: 'linear-gradient(135deg, #ffffff28 0%, #ffffff14 100%)',
            border: '1px solid #ffffff44',
            borderRadius: 12, padding: '14px 16px',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 4px 16px #00000010',
          }}>
            <p style={{ fontSize: 30, fontWeight: 500, color: s.color }}>{s.num}</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: '#6a4a7a', marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </>
  )
}