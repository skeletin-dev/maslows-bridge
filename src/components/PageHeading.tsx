export function PageHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="border-b border-mb-mist bg-mb-cream px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-mb-ink sm:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-lg text-mb-ink/85">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}
