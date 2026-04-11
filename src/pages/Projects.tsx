import { Link } from "react-router-dom"
import { PageHeading } from "../components/PageHeading"

const projects = [
  {
    to: "/projects/winter-warmth-drive",
    title: "Winter Warmth Drive",
    description: "Seasonal outreach to provide warmth, supplies, and care during cold months.",
  },
  {
    to: "/projects/love-in-action",
    title: "Love In Action",
    description: "Hands-on events and initiatives that put compassion into practice.",
  },
] as const

export function Projects() {
  return (
    <>
      <PageHeading
        title="Projects"
        subtitle="Focused initiatives that extend our mission into the community."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.to}>
              <Link
                to={p.to}
                className="group flex h-full flex-col rounded-2xl border border-mb-mist bg-white p-6 shadow-sm transition hover:border-mb-accent/40 hover:shadow-md"
              >
                <h2 className="font-display text-xl font-bold text-mb-ink group-hover:text-mb-accent-solid">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-mb-ink/85">{p.description}</p>
                <span className="mt-4 text-sm font-semibold text-mb-accent-solid">Learn more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
