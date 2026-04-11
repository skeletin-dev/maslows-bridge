import { motion } from "motion/react"
import { FadeIn } from "../components/FadeIn"
import { useSiteMotion } from "../hooks/useSiteMotion"

function FieldIcon({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center text-mb-accent ${className}`}
      aria-hidden
    >
      {children}
    </span>
  )
}

export function Contact() {
  const m = useSiteMotion()

  const headerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: m.isReduced ? 0 : m.staggerContact,
        delayChildren: m.isReduced ? 0 : m.delayContact,
      },
    },
  }

  const headerItem = {
    hidden: m.isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: m.yContact },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: m.section * 0.85, ease: m.ease },
    },
  }

  const inputClass =
    "min-w-0 flex-1 border-0 bg-transparent py-3 text-mb-ink outline-none placeholder:text-mb-ink/35 focus:ring-0"

  const shellClass =
    "flex items-center gap-3 rounded-2xl border-2 border-mb-mist/60 bg-white px-3 shadow-sm transition focus-within:border-mb-accent-solid focus-within:shadow-md sm:px-4"

  return (
    <div className="bg-mb-cream">
      <header className="border-b border-white/10 bg-mb-surface px-4 pb-14 pt-14 sm:pb-16 sm:pt-20">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={headerContainer}
        >
          <motion.p variants={headerItem} className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent">
            Get in touch
          </motion.p>
          <motion.h1
            variants={headerItem}
            className="mt-3 font-display text-4xl font-bold tracking-tight text-mb-text-on-dark sm:text-5xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            variants={headerItem}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-mb-text-muted sm:text-xl"
          >
            Questions, partnerships, or need support? Reach out—we read every message.
          </motion.p>
        </motion.div>
      </header>

      <section className="px-4 pb-20 pt-12 sm:pb-28 sm:pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-14 lg:items-stretch">
          <FadeIn className="lg:col-span-5" delay={0}>
          <aside className="flex flex-col gap-12 rounded-3xl bg-mb-surface p-10 shadow-xl ring-1 ring-black/20 sm:p-12 lg:p-14">
            <div>
              <div className="h-1 w-12 rounded-full bg-mb-accent" aria-hidden />
              <p className="mt-8 text-base leading-relaxed text-mb-text-muted sm:text-lg">
                Feel free to contact us with any questions or concerns. You can use the form on our website or email us
                directly. We appreciate your interest and look forward to hearing from you.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-mb-surface-elevated/40 p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mb-accent/15 text-mb-accent">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <div className="min-w-0 text-left">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-mb-accent">Email</h2>
                  <a
                    href="mailto:info@maslowsbridge.org"
                    className="mt-1 block break-all text-lg font-semibold text-mb-text-on-dark transition hover:text-mb-accent"
                  >
                    info@maslowsbridge.org
                  </a>
                  <p className="mt-3 text-sm text-mb-text-muted">We&apos;ll get back to you as soon as we can.</p>
                </div>
              </div>
            </div>
          </aside>
          </FadeIn>

          {/* Form — white card, navy cap, icon rows */}
          <FadeIn className="lg:col-span-7" delay={0.1}>
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-mb-mist/50">
            <div className="border-b border-white/10 bg-mb-surface px-8 py-7 sm:px-10 sm:py-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-mb-accent">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">Send a message</h2>
                  <p className="mt-1 text-sm text-mb-text-muted">All fields are required.</p>
                </div>
              </div>
            </div>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="flex flex-col gap-7 bg-mb-cream/50 px-8 py-10 sm:gap-8 sm:px-10 sm:py-12"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mb-ink/55">
                    Name
                  </label>
                  <div className={shellClass}>
                    <FieldIcon>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </FieldIcon>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email-field" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mb-ink/55">
                    Email
                  </label>
                  <div className={shellClass}>
                    <FieldIcon>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </FieldIcon>
                    <input
                      id="email-field"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mb-ink/55">
                  Phone
                </label>
                <div className={shellClass}>
                  <FieldIcon>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </FieldIcon>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(555) 555-5555"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mb-ink/55">
                  Message
                </label>
                <div className="flex items-start gap-3 rounded-2xl border-2 border-mb-mist/60 bg-white p-4 shadow-sm transition focus-within:border-mb-accent-solid focus-within:shadow-md sm:p-5">
                  <FieldIcon className="mt-[0.35rem] sm:mt-[0.4rem]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 4.5h6m-6 4.5h3M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v11.25A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                  </FieldIcon>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="How can we help?"
                    className="min-h-[8rem] w-full resize-y border-0 bg-transparent py-0.5 text-mb-ink outline-none placeholder:text-mb-ink/35 focus:ring-0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-mb-accent-solid py-4 text-base font-semibold text-mb-surface shadow-lg transition hover:bg-mb-accent-hover sm:py-4"
              >
                Send message
                <svg
                  className="h-5 w-5 transition group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>

            <p className="border-t border-mb-mist/60 bg-mb-mist/15 px-6 py-4 text-center text-xs text-mb-ink/50 sm:text-left">
              Submissions use Netlify Forms after deploy (form name:{" "}
              <code className="font-mono text-mb-ink/65">contact</code>).
            </p>
          </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
