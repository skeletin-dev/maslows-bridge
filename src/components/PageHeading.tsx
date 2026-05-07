import type { PageHeroProps } from "./PageHero"
import { PageHero } from "./PageHero"

/** @deprecated Prefer PageHero for new pages; kept for minimal call sites. */
export function PageHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  const props: PageHeroProps = { title, subtitle, variant: "atmosphere" }
  return <PageHero {...props} />
}
