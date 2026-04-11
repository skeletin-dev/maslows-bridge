import { motion } from "motion/react"
import { useSiteMotion } from "../hooks/useSiteMotion"

export function PageHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  const m = useSiteMotion()

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: m.isReduced ? 0 : m.staggerHeading,
        delayChildren: m.isReduced ? 0 : m.delayHeading,
      },
    },
  }

  const item = {
    hidden: m.isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: m.yHeading },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: m.section * 0.85, ease: m.ease },
    },
  }

  return (
    <div className="border-b border-white/10 bg-mb-surface px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.h1
            variants={item}
            className="font-display text-3xl font-bold tracking-tight text-mb-text-on-dark sm:text-4xl"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p variants={item} className="mt-3 max-w-2xl text-lg leading-relaxed text-mb-text-muted">
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </div>
  )
}
