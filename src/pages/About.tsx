import { PageHeading } from "../components/PageHeading"

export function About() {
  return (
    <>
      <PageHeading
        title="About"
        subtitle="Building bridges—not barriers—for neighbors who deserve dignity and a path forward."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="space-y-4 text-base leading-relaxed text-mb-ink sm:text-lg">
          <p>
            Maslow&apos;s Bridge Indy exists because everyone deserves a fair shot at stability. We walk alongside
            people experiencing homelessness with practical support, respectful relationships, and advocacy rooted in
            the communities we serve.
          </p>
          <p>
            Our name reflects Maslow&apos;s hierarchy of needs: we help meet foundational needs while opening doors
            to belonging, purpose, and self-fulfillment—one step at a time.
          </p>
        </div>
      </div>
    </>
  )
}
