import type { ReactNode } from "react"
import { motion } from "motion/react"
import { useSiteMotion } from "../hooks/useSiteMotion"

type FadeInProps = {
  children: ReactNode
  className?: string
  /** Extra delay in seconds (staggered sections). */
  delay?: number
  /** Vertical offset in px before reveal. */
  y?: number
}

export function FadeIn({ children, className, delay = 0, y }: FadeInProps) {
  const m = useSiteMotion()
  const yOffset = y ?? m.yFadeIn

  return (
    <motion.div
      className={className}
      initial={m.isReduced ? false : { opacity: 0, y: yOffset }}
      whileInView={m.isReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -48px 0px" }}
      transition={{ duration: m.section, delay, ease: m.ease }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
}

/** Parent: use with StaggerItem children for grid/list reveals. */
export function StaggerList({ children, className, stagger }: StaggerProps) {
  const m = useSiteMotion()
  const staggerValue = stagger ?? m.stagger

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: m.isReduced ? 0 : staggerValue,
            delayChildren: m.isReduced ? 0 : m.delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const m = useSiteMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: m.isReduced ? 1 : 0, y: m.isReduced ? 0 : m.yStaggerItem },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: m.section, ease: m.ease },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
