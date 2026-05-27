'use client'

export default function ScrollButton() {
  return (
    <button
      className="btn-tap-glass"
      onClick={() => {
        document.getElementById('how-it-works')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }}
      style={{
        fontSize: 14, padding: '12px 28px', borderRadius: 10,
        background: '#ffffff44', color: '#3d1f0a',
        border: '1px solid #ffffff66', cursor: 'pointer',
        backdropFilter: 'blur(8px)',
      }}
    >
      See how it works
    </button>
  )
}