import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  BookOpen,
  ChevronRight,
  Play,
  Shield,
  Target,
  CheckCircle2,
  Clock,
  Flame,
  FileText,
  X,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { DISTRICTS, MODULES, SigmaModule } from "../lib/sigmaData";
import { MASCOTS } from "../lib/brand";
import { StudentSpatialLayout } from "../components/StudentSpatialLayout";
import { useTheme } from "../lib/theme";

// User provided math artwork & photography
import mathBrainImg from "../assets/images/chalkboard_math_brain_1789064453101.jpg";
import neonPhysicsImg from "../assets/images/neon_physics_architecture_1789064468041.jpg";
import darkPendantImg from "../assets/images/dark_pendant_papers_1789064485174.jpg";
import ipadCalculusImg from "../assets/images/ipad_calculus_notes_1789064500969.jpg";

export default function SigmaHub() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Semua Distrik");
  const [selectedModule, setSelectedModule] = useState<SigmaModule | null>(null);

  const categoryTabs = [
    { key: "Semua Distrik", label: "Semua Distrik" },
    { key: "Aljabar & Matriks", label: "Aljabar & Matriks" },
    { key: "Fungsi & Kalkulus", label: "Fungsi & Kalkulus" },
    { key: "Geometri & Vektor", label: "Geometri & Vektor" },
    { key: "Trigonometri", label: "Trigonometri" },
    { key: "Peluang & Data", label: "Peluang & Data" },
  ];

  // Filter modules based on search and district category
  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((dist) => {
      // Category filter
      if (activeCategory !== "Semua Distrik") {
        if (activeCategory === "Aljabar & Matriks" && dist.id !== 1) return false;
        if (activeCategory === "Fungsi & Kalkulus" && dist.id !== 2) return false;
        if (activeCategory === "Geometri & Vektor" && dist.id !== 3) return false;
        if (activeCategory === "Trigonometri" && dist.id !== 4) return false;
        if (activeCategory === "Peluang & Data" && dist.id !== 5) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const distMatch =
          dist.name.toLowerCase().includes(q) ||
          dist.guardian.toLowerCase().includes(q) ||
          dist.description.toLowerCase().includes(q);
        const modMatch = MODULES.some(
          (m) =>
            m.districtId === dist.id &&
            (m.title.toLowerCase().includes(q) ||
              m.subtitle.toLowerCase().includes(q) ||
              m.description.toLowerCase().includes(q))
        );
        return distMatch || modMatch;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const activeModule = MODULES[0];

  const userXp = profile?.xp ?? 0;
  const completedDistrictsCount = profile?.completed_modules?.length ?? 0;
  const progressPercent = Math.min(100, Math.round((completedDistrictsCount / 5) * 100));

  return (
    <StudentSpatialLayout
      activeDockItem="hub"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari modul, topik matematika, rumus TKA..."
      categoryTabs={categoryTabs}
      activeCategory={activeCategory}
      onSelectCategory={setActiveCategory}
    >
      <div className="space-y-6 sm:space-y-7">
        {/* ================================================================== */}
        {/* 1. HERO BANNER: SPATIAL LEARNING HUB WELCOME                       */}
        {/* ================================================================== */}
        <div
          className={`relative overflow-hidden rounded-[28px] sm:rounded-[34px] border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all ${
            isDark
              ? "border-white/[0.14] bg-gradient-to-r from-[#0d162d]/95 via-[#101b38]/85 to-[#0b1024]/90 text-white"
              : "border-slate-300 bg-gradient-to-r from-sky-100 via-white to-indigo-50 text-slate-900 shadow-md"
          }`}
        >
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-3 py-1 font-mono text-[11px] font-black text-cyan-600 dark:text-cyan-300 shadow-sm">
                  <Sparkles size={13} /> LEVEL {profile?.level || 1} GUARDIAN
                </span>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-300"
                      : "border-slate-300 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {profile?.class_name || "Kelas 11 A"} • MAS Darunnajah 9
                </span>
              </div>

              <h1
                className={`font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                SIGMA{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
                  Learning Hub
                </span>
              </h1>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Pusat kurikulum dan bank modul matematika berorientasi Tes Kemampuan Akademik (TKA).
                Pelajari materi teoritis, diskusikan rumus esensial, dan tuntaskan simulasi kuis dengan
                target nilai kelulusan 75+.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/app/materi/${activeModule.id}`}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black shadow-lg transition-all cursor-pointer ${
                    isDark
                      ? "bg-white text-slate-950 shadow-white/20 hover:bg-slate-200 hover:scale-105"
                      : "bg-slate-950 text-white shadow-slate-950/20 hover:bg-slate-800 hover:scale-105"
                  }`}
                >
                  <Play size={15} fill="currentColor" />
                  Lanjut Belajar: {activeModule.title.split(":")[0]}
                </Link>
                <Link
                  to="/app/journey"
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isDark
                      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                      : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  <Compass size={15} /> Buka Peta Distrik
                </Link>
              </div>
            </div>

            {/* User XP & Milestone Stat Card */}
            <div
              className={`w-full lg:w-80 rounded-2xl border p-5 backdrop-blur-xl shadow-xl space-y-4 shrink-0 ${
                isDark
                  ? "border-white/15 bg-black/40 text-slate-100"
                  : "border-slate-200 bg-white/95 text-slate-900 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Akumulasi Kemajuan
                </span>
                <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-black">
                  {userXp} XP
                </span>
              </div>

              {/* Progress bar */}
              <div
                className={`w-full rounded-full h-2 overflow-hidden ${
                  isDark ? "bg-white/10" : "bg-slate-200"
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 shadow-[0_0_12px_#00f0ff]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div
                className={`grid grid-cols-2 gap-2 pt-2 border-t text-center ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl border ${
                    isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div
                    className={`font-display text-lg font-black ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {completedDistrictsCount} / 5
                  </div>
                  <div
                    className={`text-[10px] font-mono ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Distrik Dikuasai
                  </div>
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div
                    className={`font-display text-lg font-black ${
                      isDark ? "text-slate-300" : "text-slate-800"
                    }`}
                  >
                    {completedDistrictsCount > 0
                      ? `${Math.min(100, Math.round((userXp / (completedDistrictsCount * 100)) * 10))}%`
                      : "0%"}
                  </div>
                  <div
                    className={`text-[10px] font-mono ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Rata-rata Skor TKA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. DISTRICT & MODULES CATALOG                                     */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className={`font-display text-lg sm:text-xl font-black flex items-center gap-2 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                <Target size={18} className="text-cyan-500" /> 5 Distrik Pembelajaran SIGMA
              </h2>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Pilih distrik untuk meninjau silabus materi pembelajaran, trik cepat rumus, dan paket
                kuis TKA.
              </p>
            </div>
            <Link
              to="/app/journey"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Lihat Roadmap Lengkap <ArrowRight size={14} />
            </Link>
          </div>

          {/* District Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? isDark
                        ? "bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/20"
                        : "bg-cyan-600 text-white font-black shadow-md shadow-cyan-600/20"
                      : isDark
                      ? "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                      : "text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredDistricts.map((dist) => {
              const districtModules = MODULES.filter((m) => m.districtId === dist.id);
              const isFirst = dist.id === 1;
              const isSecond = dist.id === 2;
              const isUnlocked = dist.id <= 3;

              return (
                <div
                  key={dist.id}
                  className={`group relative flex flex-col justify-between rounded-[28px] border p-5 sm:p-6 backdrop-blur-xl shadow-lg transition-all duration-300 ${
                    isDark
                      ? "border-white/10 bg-[#161928]/70 hover:border-white/25 hover:bg-[#1a1e30]/80 text-slate-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl text-slate-900"
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        DISTRIK 0{dist.id}
                      </span>
                      {isFirst && (
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-300">
                          SELESAI
                        </span>
                      )}
                      {isSecond && (
                        <span className="rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-[9px] font-mono font-bold text-amber-600 dark:text-amber-300">
                          AKTIF
                        </span>
                      )}
                      {!isUnlocked && (
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[9px] font-mono font-bold ${
                            isDark
                              ? "bg-white/5 border-white/10 text-slate-400"
                              : "bg-slate-100 border-slate-200 text-slate-500"
                          }`}
                        >
                          TERKUNCI
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-display text-base sm:text-lg font-bold transition-colors ${
                        isDark
                          ? "text-white group-hover:text-cyan-300"
                          : "text-slate-900 group-hover:text-cyan-600"
                      }`}
                    >
                      {dist.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed line-clamp-2 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {dist.description}
                    </p>

                    <div
                      className={`mt-3.5 flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-mono ${
                        isDark
                          ? "bg-white/[0.03] border-white/5 text-slate-300"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <Shield size={13} style={{ color: dist.accent }} />
                      <span>
                        Guardian:{" "}
                        <strong className={isDark ? "text-white" : "text-slate-900"}>
                          {dist.guardian}
                        </strong>
                      </span>
                    </div>

                    {/* Sub-module list preview */}
                    <div className="mt-4 space-y-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Modul &amp; Bahasan:
                      </span>
                      {districtModules.length > 0 ? (
                        districtModules.slice(0, 2).map((mod) => (
                          <div
                            key={mod.id}
                            className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs transition-all ${
                              isDark
                                ? "bg-white/[0.02] border-white/5 hover:border-white/15"
                                : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="truncate pr-2">
                              <span
                                className={`font-semibold block truncate ${
                                  isDark ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {mod.title.split(":")[0]}
                              </span>
                              <span
                                className={`text-[10px] block truncate ${
                                  isDark ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                {mod.subtitle}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold shrink-0">
                              {mod.xpReward} XP
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-500 italic py-1">
                          Modul sedang disiapkan dewan guru.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div
                    className={`mt-5 pt-4 border-t flex items-center justify-between gap-2 ${
                      isDark ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Target Skor:{" "}
                      <strong className={isDark ? "text-white" : "text-slate-900"}>75+</strong>
                    </span>

                    {districtModules.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedModule(districtModules[0])}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                            isDark
                              ? "border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                              : "border-slate-300 bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200"
                          }`}
                        >
                          Detail
                        </button>
                        <Link
                          to={`/app/materi/${districtModules[0].id}`}
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black text-slate-950 transition-all hover:scale-105 cursor-pointer shadow-md"
                          style={{
                            backgroundColor: dist.accent,
                          }}
                        >
                          Buka Materi <ChevronRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">Segera Hadir</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. MODAL DETAIL POPUP                                             */}
        {/* ================================================================== */}
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
            <div
              className={`relative w-full max-w-lg rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl ${
                isDark
                  ? "border-white/20 bg-[#141726]/95 text-slate-100"
                  : "border-slate-300 bg-white/95 text-slate-900"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className={`absolute top-5 right-5 cursor-pointer ${
                  isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-400/15 border border-cyan-400/30 px-3 py-0.5 text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-300">
                  MODUL TKA
                </span>
                <span
                  className={`font-mono text-xs ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  +{selectedModule.xpReward} XP
                </span>
              </div>

              <h3
                className={`font-display text-xl font-black mt-3 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {selectedModule.title}
              </h3>
              <p className="text-xs text-cyan-600 dark:text-cyan-300 font-mono mt-0.5">
                {selectedModule.subtitle}
              </p>

              <div
                className={`mt-4 p-4 rounded-2xl border text-xs leading-relaxed ${
                  isDark
                    ? "bg-white/5 border-white/10 text-slate-300"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                {selectedModule.description}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono block ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Estimasi Waktu
                  </span>
                  <span
                    className={`font-bold mt-0.5 flex items-center gap-1 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    <Clock size={12} className="text-cyan-500" /> {selectedModule.durationMinutes} Menit
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono block ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Target Kelulusan
                  </span>
                  <span
                    className={`font-bold mt-0.5 flex items-center gap-1 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    <CheckCircle2 size={12} className="text-emerald-500" /> Skor 75+
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModule(null)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer ${
                    isDark
                      ? "border-white/15 text-slate-300 hover:text-white"
                      : "border-slate-300 text-slate-700 hover:text-slate-950"
                  }`}
                >
                  Tutup
                </button>
                <Link
                  to={`/app/materi/${selectedModule.id}`}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black shadow-lg transition-all cursor-pointer ${
                    isDark
                      ? "bg-white text-slate-950 hover:bg-slate-200"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                  }`}
                >
                  <Play size={14} fill="currentColor" /> Masuk Belajar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentSpatialLayout>
  );
}
