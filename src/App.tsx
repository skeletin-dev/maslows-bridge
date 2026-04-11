import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Services } from "./pages/Services";
import { Team } from "./pages/Team";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="history" element={<History />} />
          <Route path="team" element={<Team />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
