import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  )
}