import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageHeading } from "../components/PageHeading";

type ServiceDetail = {
  title: string;
  summary: string;
  body: string;
  highlights: string[];
  icon: ReactNode;
};

function IconWorkshop() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L4 7v5c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V7l-8-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHousing() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCaseManagement() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="3" cy="6" r="1.25" fill="currentColor" />
      <circle cx="3" cy="12" r="1.25" fill="currentColor" />
      <circle cx="3" cy="18" r="1.25" fill="currentColor" />
    </svg>
  );
}

function IconJobs() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M4 9h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 13v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const services: ServiceDetail[] = [
  {
    title: "Workshop to enrich individuals' lives",
    summary: "Skills, confidence, and community in a supportive setting.",
    body: "Our enrichment workshops create space to learn, reflect, and grow—with practical tools for daily life and room to build relationships with staff and peers. Sessions are designed to meet people where they are, with respect and encouragement at the center.",
    highlights: [
      "Life skills and personal development topics tailored to participants' needs",
      "Facilitated group settings that foster connection and peer support",
      "A stepping stone toward stability, employment, and long-term goals",
    ],
    icon: <IconWorkshop />,
  },
  {
    title: "Emergency housing referral services",
    summary: "Help navigating options when shelter can't wait.",
    body: "Housing crises rarely fit business hours. We help people understand emergency shelter, warming programs, and transitional opportunities when they are available—and support with next steps so no one has to figure out the system alone.",
    highlights: [
      "Referrals aligned with current availability and eligibility in our network",
      "Guidance on intake processes, documentation, and what to expect",
      "Coordination with other services so housing plans connect to ongoing support",
    ],
    icon: <IconHousing />,
  },
  {
    title: "Case management",
    summary: "Consistent support so progress sticks.",
    body: "Case management means having someone in your corner: setting goals together, removing barriers where we can, and checking in over time. We help prioritize needs, follow up on referrals, and celebrate wins—big and small.",
    highlights: [
      "Individualized plans based on your goals and circumstances",
      "Warm handoffs to partner agencies when specialized care is needed",
      "Ongoing follow-up to reduce gaps between appointments and crises",
    ],
    icon: <IconCaseManagement />,
  },
  {
    title: "Job referrals",
    summary: "Connections toward employment and income.",
    body: "Stable work is often part of rebuilding independence. We connect participants with employer and training partners when possible, and help with the steps that make referrals meaningful—so opportunities match readiness and need.",
    highlights: [
      "Referrals to employers and programs that fit participants' skills and situation",
      "Support with applications, interviews, and workplace expectations where helpful",
      "Alignment with broader goals—housing, transportation, and case management",
    ],
    icon: <IconJobs />,
  },
];

export function Services() {
  return (
    <>
      <PageHeading
        title="Maslow's Bridge Provides"
        subtitle="Essential resources for everyday living needs."
      />

      <section className="border-b border-mb-mist bg-linear-to-b from-mb-cream to-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <p className="text-center text-base leading-relaxed text-mb-ink/85 sm:text-lg">
            Whether you need a safe place to stay tonight, someone to help you
            plan ahead, or a path toward work, Maslow&apos;s Bridge Indy is here
            to listen, refer, and walk with you. Explore each service below to
            see what we offer—and{" "}
            <Link
              to="/contact-us"
              className="font-semibold text-mb-accent-solid underline-offset-4 hover:underline"
            >
              contact us
            </Link>{" "}
            when you&apos;re ready to connect.
          </p>
        </div>
      </section>

      <section
        className="px-4 py-12 sm:py-16"
        aria-labelledby="services-detail-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="services-detail-heading"
            className="font-display text-2xl font-bold text-mb-ink sm:text-3xl"
          >
            What we offer
          </h2>
          <p className="mt-2 max-w-2xl text-mb-ink/75">
            Four pillars of support—each one built to address real barriers
            neighbors face every day.
          </p>

          <div className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-mb-mist/80 bg-white shadow-sm ring-1 ring-black/3 transition hover:border-mb-accent/25 hover:shadow-md"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-mb-hope via-mb-accent to-mb-hope/80 opacity-90"
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mb-hope/12 text-mb-hope transition group-hover:bg-mb-hope/18"
                      aria-hidden
                    >
                      {service.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold leading-snug text-mb-ink sm:text-[1.35rem]">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-mb-surface-elevated">
                        {service.summary}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-mb-ink/88">
                    {service.body}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-mb-mist/80 pt-6">
                    {service.highlights.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-sm leading-relaxed text-mb-ink/90 sm:text-[0.9375rem]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mb-accent"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mb-mist bg-mb-surface px-4 py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border border-white/10 bg-mb-surface-elevated/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">
              Ready to get started?
            </h2>
            <p className="mt-2 max-w-xl text-mb-text-muted">
              Tell us a little about your situation—we&apos;ll respond with next
              steps and the right referrals for you.
            </p>
          </div>
          <Link
            to="/contact-us"
            className="inline-flex shrink-0 items-center justify-center rounded-[28px] bg-mb-accent px-8 py-3.5 text-sm font-semibold text-mb-surface transition hover:bg-mb-accent-hover sm:text-base"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
