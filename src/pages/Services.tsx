import { Link } from "react-router-dom"
import { PageHeading } from "../components/PageHeading"

export function Services() {
  return (
    <>
      <PageHeading
        title="Services"
        subtitle="Essential support for neighbors working toward independence—grounded in respect and practical help."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="space-y-4 text-base leading-relaxed text-mb-ink sm:text-lg">
          <p>
            Maslow&apos;s Bridge Indy provides essential services to help neighbors regain stability through job
            training, resource connection, and ongoing support. Our programs are built to meet real needs in real
            time—whether someone is taking their first step off the street or rebuilding after a setback.
          </p>
          <p>
            We partner with individuals where they are, offering skills development, referrals, and the kind of
            steady encouragement that makes long-term change possible.
          </p>
          <p className="font-semibold text-mb-accent-solid">
            Interested in services or referrals?{" "}
            <Link to="/contact-us" className="text-mb-surface-elevated underline underline-offset-4">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
