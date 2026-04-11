import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold text-mb-ink">Page not found</h1>
      <p className="mt-3 text-mb-ink/80">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-8 font-semibold text-mb-accent-solid underline underline-offset-4">
        Back to home
      </Link>
    </div>
  )
}
