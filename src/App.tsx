import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./lib/auth";
import { ThemeProvider, useTheme } from "./lib/theme";
import { AppShell } from "./components/AppShell";
import { Loader } from "./components/Primitives";
import { ThreeLoadingScreen } from "./components/ThreeLoadingScreen";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SigmaHub from "./pages/SigmaHub";
import Journey from "./pages/Journey";
import StudentDashboard from "./pages/StudentDashboard";
import ModuleDetail from "./pages/ModuleDetail";
import Material from "./pages/Material";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import Discussions from "./pages/Discussions";
import ThreadDetail from "./pages/ThreadDetail";
import Profile from "./pages/Profile";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherModeration from "./pages/TeacherModeration";
import TeacherContent from "./pages/TeacherContent";

function AuthenticatedLayout() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <ThreeLoadingScreen
        fullscreen={true}
        autoSimulate={true}
        simulationDurationMs={1200}
        displayText="LOADING"
      />
    );
  }

  if (!profile) {
    return <Navigate to="/masuk" replace />;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function TeacherLayout() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <ThreeLoadingScreen
        fullscreen={true}
        autoSimulate={true}
        simulationDurationMs={1200}
        displayText="LOADING"
      />
    );
  }

  if (!profile) {
    return <Navigate to="/masuk" replace />;
  }

  if (profile.role !== "teacher") {
    return <Navigate to="/app" replace />;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function ThemedToaster() {
  const { isDark } = useTheme();
  return <Toaster richColors position="top-right" theme={isDark ? "dark" : "light"} />;
}

export default function App() {
  const [isEnteringWebsite, setIsEnteringWebsite] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        {isEnteringWebsite && (
          <div className="fixed inset-0 z-[9999] overflow-hidden">
            <ThreeLoadingScreen
              fullscreen={true}
              autoSimulate={true}
              simulationDurationMs={4600}
              displayText="SIGMA"
              onComplete={() => setIsEnteringWebsite(false)}
              onRedirect={() => setIsEnteringWebsite(false)}
            />
          </div>
        )}

        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/masuk" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Student & Shared Authenticated Routes */}
            <Route path="/app" element={<AuthenticatedLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="hub" element={<SigmaHub />} />
              <Route path="peta" element={<Journey />} />
              <Route path="journey" element={<Journey />} />
              <Route path="modul/:moduleId" element={<ModuleDetail />} />
              <Route path="modul/:moduleId/materi" element={<Material />} />
              <Route path="materi/:moduleId" element={<Material />} />
              <Route path="modul/:moduleId/kuis" element={<Quiz />} />
              <Route path="kuis/:moduleId" element={<Quiz />} />
              <Route path="hasil-kuis/:attemptId" element={<QuizResult />} />
              <Route path="modul/:moduleId/diskusi" element={<Discussions />} />
              <Route path="hasil/:attemptId" element={<QuizResult />} />
              <Route path="discussions" element={<Discussions />} />
              <Route path="diskusi" element={<Discussions />} />
              <Route path="discussions/:threadId" element={<ThreadDetail />} />
              <Route path="diskusi/:threadId" element={<ThreadDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profil" element={<Profile />} />
            </Route>

            {/* Teacher Dedicated Routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="moderation" element={<TeacherModeration />} />
              <Route path="content" element={<TeacherContent />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <ThemedToaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
