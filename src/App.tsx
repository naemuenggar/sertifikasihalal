import { Routes, Route, Navigate } from "react-router-dom";
import ScrollManager from "./components/ScrollManager";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import TentangKamiPage from "./pages/TentangKamiPage";
import LayananDetailPage from "./pages/LayananDetailPage";
import BeritaPage from "./pages/BeritaPage";
import BeritaDetailPage from "./pages/BeritaDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminNewsPage from "./pages/admin/AdminNewsPage";
import AdminNewsFormPage from "./pages/admin/AdminNewsFormPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* ---------- Halaman publik ---------- */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang-kami" element={<TentangKamiPage />} />
          <Route path="/layanan/:slug" element={<LayananDetailPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/berita/:slug" element={<BeritaDetailPage />} />
        </Route>

        {/* ---------- Admin (URL rahasia, tanpa layout publik) ---------- */}
        <Route path="/portal-admin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="berita" element={<AdminNewsPage />} />
          <Route path="berita/new" element={<AdminNewsFormPage />} />
          <Route path="berita/:id/edit" element={<AdminNewsFormPage />} />
          <Route path="pesan" element={<AdminMessagesPage />} />
        </Route>

        {/* ---------- 404 untuk rute tak dikenal ---------- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
