import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
  Shield,
  Sparkles,
  Trophy,
  Play,
  Clock,
  Target,
  ChevronRight,
  Flame,
  Award,
  RotateCcw,
} from "lucide-react";
import { DISTRICTS, MODULES } from "../lib/sigmaData";
import { StudentSpatialLayout } from "../components/StudentSpatialLayout";
import { useAuth } from "../lib/auth";
import { useTheme } from "../lib/theme";

export default function Journey() {
  const { profile, updateProfile } = useAuth();
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("Semua Jalur");
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // Completed modules tracking from real student profile
  const completedModuleIds = useMemo(() => {
    return profile?.completed_modules || [];
  }, [profile?.completed_modules]);

  // Dynamic status of all districts starting from the beginning (Distrik 1 active, 2-5 locked)
  const districtsProgress = useMemo(() => {
    return DISTRICTS.map((dist, idx) => {
      const distModules = MODULES.filter((m) => m.districtId === dist.id);
      const isCompleted =
        distModules.length > 0 &&
        distModules.every((m) => completedModuleIds.includes(m.id));

      // District 1 is unlocked as the journey starting point.
      // Next districts unlock sequentially once previous district is completed.
      let isUnlocked = false;
      if (idx === 0) {
        isUnlocked = true;
      } else {
        const prevDist = DISTRICTS[idx - 1];
        const prevModules = MODULES.filter((m) => m.districtId === prevDist.id);
        isUnlocked =
          prevModules.length > 0 &&
          prevModules.every((m) => completedModuleIds.includes(m.id));
      }

      const isActive = isUnlocked && !isCompleted;
      const isLocked = !isUnlocked;

      return {
        ...dist,
        isCompleted,
        isActive,
        isLocked,
        isUnlocked,
        districtModules: distModules,
      };
    });
  }, [completedModuleIds]);

  const completedDistrictsCount = useMemo(() => {
    return districtsProgress.filter((d) => d.isCompleted).length;
  }, [districtsProgress]);

  const progressPercentage = Math.round(
    (completedDistrictsCount / DISTRICTS.length) * 100
  );

  const filterTabs = useMemo(() => {
    const activeCount = districtsProgress.filter((d) => d.isActive).length;
    const completedCount = completedDistrictsCount;
    const lockedCount = districtsProgress.filter((d) => d.isLocked).length;

    return [
      { key: "Semua Jalur", label: `Semua Jalur (${DISTRICTS.length})` },
      { key: "Sedang Berjalan", label: `Sedang Berjalan (${activeCount})` },
      { key: "Selesai", label: `Selesai (${completedCount})` },
      { key: "Terkunci", label: `Terkunci (${lockedCount})` },
    ];
  }, [districtsProgress, completedDistrictsCount]);

  const filteredDistricts = useMemo(() => {
    return districtsProgress.filter((dist) => {
      if (activeFilter === "Sedang Berjalan" && !dist.isActive) return false;
      if (activeFilter === "Selesai" && !dist.isCompleted) return false;
      if (activeFilter === "Terkunci" && !dist.isLocked) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dist.name.toLowerCase().includes(q) ||
          dist.guardian.toLowerCase().includes(q) ||
          dist.tagline.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [districtsProgress, activeFilter, searchQuery]);

  // Handler to clear/reset roadmap completely to the beginning
  const handleResetRoadmap = () => {
    // Clear session quiz records
    MODULES.forEach((mod) => {
      try {
        sessionStorage.removeItem(`quiz_result_${mod.id}`);
      } catch {
        // ignore
      }
    });

    try {
      localStorage.removeItem("sigma_journey_progress");
    } catch {
      // ignore
    }

    // Reset profile stats
    updateProfile({
      completed_modules: [],
      xp: 0,
    });

    setResetMessage("Roadmap berhasil dikosongkan & direset dari awal (0% Selesai)!");
    setTimeout(() => {
      setResetMessage(null);
    }, 3500);
  };

  return (
    <StudentSpatialLayout
      activeDockItem="journey"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari tahapan roadmap, distrik, materi..."
      categoryTabs={filterTabs}
      activeCategory={activeFilter}
      onSelectCategory={setActiveFilter}
    >
      <div className="space-y-6 sm:space-y-7">
        {/* Reset Feedback Notification */}
        {resetMessage && (
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-4 text-xs font-bold text-emerald-600 dark:text-emerald-300 flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> {resetMessage}
            </span>
            <button
              type="button"
              onClick={() => setResetMessage(null)}
              className="text-xs hover:underline cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* ================================================================== */}
        {/* 1. ROADMAP HEADER HERO                                             */}
        {/* ================================================================== */}
        <div
          className={`relative overflow-hidden rounded-[28px] sm:rounded-[34px] border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all ${
            isDark
              ? "border-white/[0.14] bg-gradient-to-r from-[#0d162d]/95 via-[#101b38]/85 to-[#0b1024]/90 text-white"
              : "border-slate-300 bg-gradient-to-r from-cyan-50 via-white to-blue-50 text-slate-900 shadow-md"
          }`}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-3 py-1 font-mono text-[11px] font-black text-cyan-600 dark:text-cyan-300 shadow-sm">
                  <Compass size={13} /> ROADMAP TKA KELAS 11
                </span>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-300"
                      : "border-slate-300 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  Target Skor Kelulusan: 75+
                </span>
              </div>

              <h1
                className={`font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                Peta Perjalanan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
                  Distrik Matematika
                </span>
              </h1>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Selesaikan tahapan 5 distrik matematika secara sistematis. Mulai dari Aljabar &amp;
                Matriks hingga Peluang &amp; Statistika untuk mengamankan nilai tinggi pada Tes Kemampuan
                Akademik (TKA) MA Darunnajah 9.
              </p>
            </div>

            {/* Quick Stats Pill (Roadmap Status) */}
            <div
              className={`w-full lg:w-80 rounded-2xl border p-5 backdrop-blur-xl shadow-xl space-y-3.5 shrink-0 transition-all ${
                isDark
                  ? "border-white/15 bg-black/40 text-slate-200"
                  : "border-slate-200 bg-white text-slate-900 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`font-mono text-[11px] font-bold uppercase tracking-wider block ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Status Roadmap
                  </span>
                  <span className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-400 mt-0.5 block">
                    {completedDistrictsCount} dari {DISTRICTS.length} Distrik Selesai
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-black rounded-full px-2.5 py-1 border ${
                    progressPercentage > 0
                      ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-600 dark:text-emerald-400"
                      : isDark
                      ? "bg-white/5 border-white/10 text-slate-400"
                      : "bg-slate-100 border-slate-200 text-slate-500"
                  }`}
                >
                  {progressPercentage}% Selesai
                </span>
              </div>

              {/* Multi-step progress line */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  {districtsProgress.map((step) => (
                    <div
                      key={step.id}
                      title={`${step.name}: ${
                        step.isCompleted
                          ? "Selesai"
                          : step.isActive
                          ? "Titik Awal / Berjalan"
                          : "Terkunci"
                      }`}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        step.isCompleted
                          ? "bg-emerald-400 shadow-[0_0_8px_#10b981]"
                          : step.isActive
                          ? "bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse"
                          : isDark
                          ? "bg-white/10"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Mulai: Distrik 1</span>
                  <span>Puncak: TKA</span>
                </div>
              </div>

              <div
                className={`pt-2 border-t flex items-center justify-between text-xs ${
                  isDark ? "border-white/10 text-slate-400" : "border-slate-100 text-slate-500"
                }`}
              >
                <span>Total XP Terkumpul:</span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-300">
                  {profile?.xp ?? 0} XP
                </span>
              </div>

              {/* Reset to Start action button */}
              <button
                type="button"
                onClick={handleResetRoadmap}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50"
                    : "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-300"
                }`}
              >
                <RotateCcw size={13} /> Reset Semua dari Awal
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. INTERACTIVE VISUAL ROADMAP NODES                                */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2
              className={`font-display text-lg sm:text-xl font-black flex items-center gap-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <Target size={18} className="text-cyan-500" /> Tahapan Pembelajaran Progresif
            </h2>
            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? isDark
                          ? "bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/20"
                          : "bg-cyan-600 text-white font-black shadow-sm"
                        : isDark
                        ? "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                        : "text-slate-600 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {filteredDistricts.map((dist) => {
              const districtModules = dist.districtModules;
              const isCompleted = dist.isCompleted;
              const isActive = dist.isActive;
              const isUnlocked = dist.isUnlocked;

              return (
                <div
                  key={dist.id}
                  className={`relative rounded-[28px] border transition-all duration-300 p-5 sm:p-6 backdrop-blur-xl shadow-xl ${
                    isCompleted
                      ? isDark
                        ? "border-emerald-500/30 bg-[#121c22]/75 hover:border-emerald-500/50"
                        : "border-emerald-300 bg-emerald-50/70 hover:border-emerald-400"
                      : isActive
                      ? isDark
                        ? "border-cyan-400/40 bg-[#141b30]/85 shadow-[0_15px_40px_rgba(0,240,255,0.08)] hover:border-cyan-400/60"
                        : "border-cyan-300 bg-cyan-50/70 shadow-md hover:border-cyan-400"
                      : isDark
                      ? "border-white/5 bg-[#0f111d]/50 opacity-60"
                      : "border-slate-200 bg-slate-100 opacity-60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    {/* Content details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-300">
                            <CheckCircle2 size={12} className="text-emerald-500" /> SELESAI
                          </span>
                        )}
                        {isActive && (
                          <span className="rounded-full bg-cyan-400/20 border border-cyan-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-300 animate-pulse">
                            ● TITIK AWAL / SEDANG BERJALAN
                          </span>
                        )}
                        {dist.isLocked && (
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold flex items-center gap-1 ${
                              isDark
                                ? "bg-slate-800/80 border-white/10 text-slate-400"
                                : "bg-slate-200 border-slate-300 text-slate-600"
                            }`}
                          >
                            <Lock size={10} /> TERKUNCI (SELESAIKAN DISTRIK {dist.id - 1})
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-display text-lg sm:text-xl font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {dist.name}
                      </h3>

                      <p
                        className={`text-xs max-w-2xl mt-1 leading-relaxed ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {dist.tagline} • Guardian:{" "}
                        <strong className="text-cyan-600 dark:text-cyan-300">{dist.guardian}</strong>
                      </p>

                      <div
                        className={`mt-2.5 flex flex-wrap items-center gap-2 text-[11px] font-mono ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`rounded-lg px-2.5 py-1 ${
                            isDark ? "bg-white/5" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {dist.modulesCount} Modul Materi
                        </span>
                        <span
                          className={`rounded-lg px-2.5 py-1 ${
                            isDark ? "bg-white/5" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          Target Kuis: 75+
                        </span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold px-1">
                          +350 XP
                        </span>
                      </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                      {isUnlocked && districtModules.length > 0 ? (
                        <>
                          <Link
                            to={`/app/materi/${districtModules[0].id}`}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                              isDark
                                ? "border-white/15 bg-white/5 text-slate-200 hover:text-white hover:bg-white/15"
                                : "border-slate-300 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 shadow-sm"
                            }`}
                          >
                            Pelajari Materi
                          </Link>
                          <Link
                            to={`/app/kuis/${districtModules[0].id}`}
                            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black text-slate-950 transition-all hover:scale-105 cursor-pointer shadow-md"
                            style={{ backgroundColor: dist.accent }}
                          >
                            <Play size={13} fill="currentColor" /> Ikuti Kuis
                          </Link>
                        </>
                      ) : (
                        <button
                          disabled
                          className={`rounded-full border px-4 py-2 text-xs font-semibold cursor-not-allowed ${
                            isDark
                              ? "border-white/10 bg-white/5 text-slate-500"
                              : "border-slate-200 bg-slate-100 text-slate-400"
                          }`}
                        >
                          Terkunci
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. CAPSTONE / FINAL MILESTONE TKA SIMULATION CARD                  */}
        {/* ================================================================== */}
        <div
          className={`rounded-[28px] border p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${
            isDark
              ? "border-amber-400/30 bg-gradient-to-r from-amber-950/30 via-[#181308]/60 to-[#100c05]/80"
              : "border-amber-300 bg-amber-50/70"
          }`}
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-300">
                CAPSTONE EVALUATION
              </span>
              <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                MAS Darunnajah 9
              </span>
            </div>
            <h3
              className={`font-display text-lg sm:text-xl font-black ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Simulasi Akbar Tes Kemampuan Akademik (TKA) Komprehensif
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Uji ketangkasan mengerjakan 50 soal prediksi TKA dengan batas waktu 90 menit setelah
              menuntaskan seluruh modul di 5 distrik.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2.5 text-xs font-bold text-amber-600 dark:text-amber-300 opacity-70 cursor-not-allowed shrink-0"
          >
            Terbuka Setelah Distrik 5
          </button>
        </div>
      </div>
    </StudentSpatialLayout>
  );
}
