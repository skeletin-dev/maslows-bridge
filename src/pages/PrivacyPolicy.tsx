import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { FadeIn } from "../components/FadeIn";
import { PageHero } from "../components/PageHero";
import { pillSecondary, sectionLightGlow } from "../components/pageLayout";
import { SITE } from "../site";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-xl font-bold tracking-tight text-mb-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-[1.65] text-mb-ink/88 sm:text-[1.0625rem]">
        {children}
      </div>
    </section>
  );
}

export function PrivacyPolicy() {
  const effectiveYear = 2026;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we handle information you share when you contact us through our website."
        variant="atmosphere"
        size="large"
      />

      <section className={sectionLightGlow}>
        <FadeIn className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-mb-ink/60">
            Effective {effectiveYear}. This policy describes {SITE.name}&apos;s practices for the
            contact form on this site. For other questions, email{" "}
            <a
              href="mailto:info@maslowsbridge.org"
              className="font-semibold text-mb-accent-solid underline-offset-2 hover:underline"
            >
              info@maslowsbridge.org
            </a>
            .
          </p>

          <div className="mt-12 space-y-12">
            <Section id="collect" title="Information we collect">
              <p>
                When you use the &quot;Contact us&quot; form, we ask for information so we can
                respond to you:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-mb-ink/88">
                <li>
                  <strong className="text-mb-ink">Name</strong> — so we can address you respectfully
                  in our reply.
                </li>
                <li>
                  <strong className="text-mb-ink">Email address</strong> — so we can write back to
                  you (required).
                </li>
                <li>
                  <strong className="text-mb-ink">Phone number</strong> — optional; only if you
                  choose to provide it for follow-up by phone.
                </li>
                <li>
                  <strong className="text-mb-ink">Message</strong> — whatever you choose to tell us
                  about your question, partnership idea, or need for support.
                </li>
              </ul>
              <p>
                We do not use the contact form to collect sensitive categories of data (such as
                health information) unless you voluntarily include that in your message. Please
                share only what you are comfortable with.
              </p>
              <p>
                Like most websites, our hosting provider may process standard technical data when
                you visit pages (for example, IP address, browser type, and request time) in server
                or security logs. We use that only to operate and protect the site, not for
                marketing profiling.
              </p>
            </Section>

            <Section id="use" title="How we use your information">
              <p>We use what you submit solely for nonprofit operational purposes, including to:</p>
              <ul className="list-disc space-y-2 pl-6 text-mb-ink/88">
                <li>Read and reply to your inquiry;</li>
                <li>Coordinate follow-up with you by email or, if you provided it, by phone;</li>
                <li>
                  Improve how we respond to common questions—without using your data for unrelated
                  advertising.
                </li>
              </ul>
              <p>
                We do <strong className="text-mb-ink">not</strong> sell your personal information.
                We do <strong className="text-mb-ink">not</strong> use the contact form to build
                advertising profiles on other platforms.
              </p>
            </Section>

            <Section id="share" title="Sharing and service providers">
              <p>
                We may share your submission with trusted service providers who help us run the
                website or email—such as web hosting, form delivery, or email—only as needed to
                transmit or store your message. They are expected to use your information only to
                perform those services for us and to protect it appropriately.
              </p>
              <p>
                We may also disclose information if required by law or to protect the safety,
                rights, or integrity of our organization, staff, or community.
              </p>
            </Section>

            <Section id="retention" title="How long we keep it">
              <p>
                We retain contact form submissions long enough to respond and handle any related
                follow-up, and for a reasonable period afterward for record-keeping tied to
                community support and operations. When retention is no longer needed, we delete or
                de-identify the information, consistent with our internal practices and any legal
                obligations.
              </p>
            </Section>

            <Section id="security" title="Security">
              <p>
                We take reasonable steps to protect information submitted through our site against
                unauthorized access or disclosure. No method of transmission over the internet is
                completely secure; if you have concerns about sensitive topics, consider calling or
                visiting us through channels we publish separately.
              </p>
            </Section>

            <Section id="rights" title="Your choices">
              <p>
                Depending on where you live, you may have rights to access, correct, or request
                deletion of personal information we hold from your contact submission. To exercise
                those rights or ask what we have, email{" "}
                <a
                  href="mailto:info@maslowsbridge.org"
                  className="font-semibold text-mb-accent-solid underline-offset-2 hover:underline"
                >
                  info@maslowsbridge.org
                </a>
                . We will respond within a reasonable time.
              </p>
            </Section>

            <Section id="children" title="Children">
              <p>
                Our website is not directed at children under 13. We do not knowingly collect
                personal information from children through the contact form. If you believe a child
                has submitted information, please contact us and we will take appropriate steps.
              </p>
            </Section>

            <Section id="changes" title="Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                &quot;Effective&quot; date at the top of this page. Continued use of the contact form
                after changes means you accept the updated policy.
              </p>
            </Section>
          </div>

          <div className="mt-14 flex flex-wrap gap-4 border-t border-mb-mist/80 pt-10">
            <Link to="/contact-us" className={pillSecondary}>
              Back to Contact
            </Link>
            <Link to="/" className={pillSecondary}>
              Home
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
