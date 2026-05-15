export default function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '80px 20px',
      background: 'linear-gradient(135deg,#ffffff28 0%,#ffffff14 100%)',
      border: '1px solid #ffffff44',
      borderRadius: 20,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      <p style={{ fontSize: 56, marginBottom: 16 }}>🎯</p>
      <h3 style={{ fontSize: 20, fontWeight: 500, color: '#2d1a3a', marginBottom: 8 }}>
        No goals yet
      </h3>
      <p style={{ fontSize: 14, color: '#6a4a7a', maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
        Create your first goal to start tracking your daily website visits and building consistent habits.
      </p>
    </div>
  )
}