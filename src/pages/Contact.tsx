import { PageHeading } from "../components/PageHeading"

export function Contact() {
  return (
    <>
      <PageHeading title="Contact us" subtitle="We would love to hear from you—questions, partnerships, or ways to help." />
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="flex flex-col gap-5"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don&apos;t fill this out: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-mb-ink">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-xl border border-mb-mist bg-white px-4 py-3 text-mb-ink shadow-sm outline-none ring-mb-accent focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-mb-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-mb-mist bg-white px-4 py-3 text-mb-ink shadow-sm outline-none ring-mb-accent focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-mb-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full resize-y rounded-xl border border-mb-mist bg-white px-4 py-3 text-mb-ink shadow-sm outline-none ring-mb-accent focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="rounded-[28px] bg-mb-accent-solid px-8 py-3.5 font-semibold text-mb-surface transition-colors hover:bg-mb-accent-hover"
          >
            Send message
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-mb-ink/60">
          Submissions are handled by Netlify Forms after deploy (form name: <code className="text-mb-ink">contact</code>
          ).
        </p>
      </div>
    </>
  )
}
