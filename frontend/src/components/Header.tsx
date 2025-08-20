import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-blue-400 shadow-md py-4 px-6 mb-8">
      <nav className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="text-2xl font-extrabold text-white tracking-tight drop-shadow">TodoList</div>
        <div className="flex gap-4">
          <Link to="/" className="text-white hover:text-yellow-200 font-semibold transition">Home</Link>
        </div>
      </nav>
    </header>
  )
}
