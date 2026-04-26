import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { api } from "./api";

import AdminLayout  from "./components/AdminLayout";
import Login        from "./pages/Login";
import Overview     from "./pages/Overview";
import Personal     from "./pages/Personal";
import Skills       from "./pages/Skills";
import Experience   from "./pages/Experience";
import Projects     from "./pages/Projects";
import Messages     from "./pages/Messages";

function ProtectedLayout({ unread }) {
  const { admin, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-[#050709] flex items-center justify-center">
      <span className="w-8 h-8 rounded-full border-2 border-[#30363D] border-t-[#0A84FF] animate-spin" />
    </div>
  );

  if (!admin) return <Navigate to="/admin/login" replace />;

  return <AdminLayout unread={unread} />;
}

export default function AdminRouter() {
  const [unread, setUnread] = useState(0);
  const { admin } = useAuth();

  useEffect(() => {
    if (!admin) return;
    api.getMessageStats()
      .then(d => setUnread(d.unread))
      .catch(() => {});
  }, [admin]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedLayout unread={unread} />}>
        <Route index             element={<Overview />} />
        <Route path="personal"   element={<Personal />} />
        <Route path="skills"     element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects"   element={<Projects />} />
        <Route path="messages"   element={<Messages />} />
        <Route path="*"          element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
