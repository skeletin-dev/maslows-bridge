import { PageHeading } from "../components/PageHeading"

export function WinterWarmth() {
  return (
    <>
      <PageHeading
        title="Winter Warmth Drive"
        subtitle="Helping neighbors stay safe and warm when temperatures drop."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="space-y-4 text-base leading-relaxed text-mb-ink sm:text-lg">
          <p>
            The Winter Warmth Drive gathers coats, blankets, hand warmers, and other essentials for neighbors who
            need them most. Details, drop-off locations, and volunteer shifts can be added here before launch.
          </p>
        </div>
      </div>
    </>
  )
}
