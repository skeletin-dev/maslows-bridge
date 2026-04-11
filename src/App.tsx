import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { History } from "./pages/History"
import { Home } from "./pages/Home"
import { LoveInAction } from "./pages/LoveInAction"
import { NotFound } from "./pages/NotFound"
import { Projects } from "./pages/Projects"
import { Services } from "./pages/Services"
import { WinterWarmth } from "./pages/WinterWarmth"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="history" element={<History />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/winter-warmth-drive" element={<WinterWarmth />} />
          <Route path="projects/love-in-action" element={<LoveInAction />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
