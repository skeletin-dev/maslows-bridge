import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import { easeSmooth } from "../lib/motion"

const touchQuery = "(hover: none) and (pointer: coarse)"

function useTouchPrimary() {
  const [touch, setTouch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(touchQuery).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(touchQuery)
    const sync = () => setTouch(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return touch
}

/**
 * Durations, stagger, and distances tuned for desktop vs touch primary devices.
 * Touch: slightly shorter transitions, smaller offsets, lighter stagger to keep motion smooth on mobile GPUs.
 */
export function useSiteMotion() {
  const reduced = useReducedMotion()
  const touch = useTouchPrimary()

  if (reduced === true) {
    return {
      isReduced: true,
      ease: easeSmooth,
      page: 0.15,
      section: 0.2,
      fast: 0.15,
      stagger: 0,
      delayChildren: 0,
      staggerHero: 0,
      delayHero: 0,
      staggerHeading: 0,
      delayHeading: 0,
      staggerContact: 0,
      delayContact: 0,
      staggerCards: 0,
      delayCards: 0,
      yPageIn: 6,
      yPageOut: 6,
      yHero: 0,
      yCard: 0,
      yHeading: 0,
      yContact: 0,
      yFadeIn: 0,
      yStaggerItem: 0,
      yMenu: 0,
      yNotFound: 0,
      scaleNotFound: 1,
    } as const
  }

  if (touch) {
    return {
      isReduced: false,
      ease: easeSmooth,
      page: 0.32,
      section: 0.38,
      fast: 0.2,
      stagger: 0.045,
      delayChildren: 0.04,
      staggerHero: 0.055,
      delayHero: 0.06,
      staggerHeading: 0.05,
      delayHeading: 0.04,
      staggerContact: 0.055,
      delayContact: 0.035,
      staggerCards: 0.055,
      delayCards: 0.045,
      yPageIn: 12,
      yPageOut: 10,
      yHero: 16,
      yCard: 14,
      yHeading: 12,
      yContact: 12,
      yFadeIn: 14,
      yStaggerItem: 12,
      yMenu: 8,
      yNotFound: 14,
      scaleNotFound: 0.99,
    } as const
  }

  return {
    isReduced: false,
    ease: easeSmooth,
    page: 0.38,
    section: 0.45,
    fast: 0.22,
    stagger: 0.08,
    delayChildren: 0.05,
    staggerHero: 0.09,
    delayHero: 0.08,
    staggerHeading: 0.07,
    delayHeading: 0.05,
    staggerContact: 0.08,
    delayContact: 0.04,
    staggerCards: 0.09,
    delayCards: 0.06,
    yPageIn: 18,
    yPageOut: 14,
    yHero: 22,
    yCard: 22,
    yHeading: 16,
    yContact: 16,
    yFadeIn: 20,
    yStaggerItem: 18,
    yMenu: 12,
    yNotFound: 20,
    scaleNotFound: 0.98,
  } as const
}
