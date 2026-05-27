'use client'

export default function ScrollButton() {
  function handleClick() {
    const section = document.getElementById('how-it-works')
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else {
      // fallback — scroll by window height
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <button
      className="btn-tap-glass"
      onClick={handleClick}
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