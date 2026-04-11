import { AnimatePresence, motion } from "motion/react"
import { useLocation, useOutlet } from "react-router-dom"
import { useSiteMotion } from "../hooks/useSiteMotion"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const m = useSiteMotion()

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            data-motion-page
            className="min-h-full will-change-transform"
            initial={m.isReduced ? { opacity: 0 } : { opacity: 0, y: m.yPageIn }}
            animate={{ opacity: 1, y: 0 }}
            exit={m.isReduced ? { opacity: 0 } : { opacity: 0, y: -m.yPageOut }}
            transition={{
              duration: m.isReduced ? 0.18 : m.page,
              ease: m.ease,
            }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
