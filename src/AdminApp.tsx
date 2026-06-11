import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { AdminLayout } from "./components/admin/AdminLayout";
import { RequireAuth } from "./components/admin/RequireAuth";
import { AdminLoginPage } from "./react-pages/admin/AdminLoginPage";
import { AdminProjectEditPage } from "./react-pages/admin/AdminProjectEditPage";
import { AdminProjectNewPage } from "./react-pages/admin/AdminProjectNewPage";
import { AdminProjectShowPage } from "./react-pages/admin/AdminProjectShowPage";
import { AdminProjectsListPage } from "./react-pages/admin/AdminProjectsListPage";

const queryClient = new QueryClient();

export default function AdminApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<RequireAuth />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminProjectsListPage />} />
                <Route path="projects/new" element={<AdminProjectNewPage />} />
                <Route path="projects/:slug" element={<AdminProjectShowPage />} />
                <Route path="projects/:slug/edit" element={<AdminProjectEditPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
