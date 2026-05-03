import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/admin/AdminLayout";
import { RequireAuth } from "./components/admin/RequireAuth";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminProjectEditPage } from "./pages/admin/AdminProjectEditPage";
import { AdminProjectNewPage } from "./pages/admin/AdminProjectNewPage";
import { AdminProjectShowPage } from "./pages/admin/AdminProjectShowPage";
import { AdminProjectsListPage } from "./pages/admin/AdminProjectsListPage";
import { Contact } from "./pages/Contact";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProjectShow } from "./pages/ProjectShow";
import { Projects } from "./pages/Projects";
import { Services } from "./pages/Services";
import { Team } from "./pages/Team";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminProjectsListPage />} />
          <Route path="projects/new" element={<AdminProjectNewPage />} />
          <Route path="projects/:slug" element={<AdminProjectShowPage />} />
          <Route
            path="projects/:slug/edit"
            element={<AdminProjectEditPage />}
          />
        </Route>
      </Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectShow />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
