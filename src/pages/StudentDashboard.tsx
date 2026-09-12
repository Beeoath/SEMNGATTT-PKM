import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Bookmark,
  BookOpen,
  MessageSquare,
  User,
  Settings,
  Search,
  Bell,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
  Map,
  LogOut,
  Sparkles,
  Award,
  GraduationCap,
  Flame,
  Clock,
  Compass,
  MapPin,
  LayoutDashboard,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FolderDown,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { DISTRICTS, MODULES } from "../lib/sigmaData";
import { useTheme, ThemeToggle } from "../lib/theme";

// User provided math artwork & photography
import mathBrainImg from "../assets/images/chalkboard_math_brain_1789064453101.jpg";
import neonPhysicsImg from "../assets/images/neon_physics_architecture_1789064468041.jpg";
import darkPendantImg from "../assets/images/dark_pendant_papers_1789064485174.jpg";
import ipadCalculusImg from "../assets/images/ipad_calculus_notes_1789064500969.jpg";

// Featured District Hero items with authentic SIGMA TKA Math Content
const SIGMA_HERO_FEATURED = [
  {
    id: "mod-aljabar-1",
    districtId: 1,
    tag: "Distrik Unggulan",
    districtName: "Distrik 1 • Aljabar & Matriks",
    categories: ["Aljabar & Matriks", "Level 1", "+350 XP"],
    title: "Operasi & Determinan Matriks",
    displayTitle: "Aljabar & Matriks",
    subTitle: "Determinan Sarrus, Aturan Cramer & Matriks Invers",
    description:
      "Kuasai perkalian baris kali kolom, perhitungan determinan matriks ordo 2x2 dan 3x3, serta invers adjoin untuk menuntaskan soal TKA berkecepatan tinggi.",
    fullDescription:
      "Modul ini membahas fondasi aljabar linier: operasi matriks nonsingular, determinan ordo 3x3 metode Sarrus & ekspansi kofaktor, aturan Cramer pada SPLTV, dan aplikasi invers matriks pada sistem persamaan simultan.",
    bgImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#081726]/95 via-[#0b1d30]/80 to-[#050d17]/90",
    accentColor: "#00F0FF",
    targetScore: 75,
  },
  {
    id: "mod-fungsi-1",
    districtId: 2,
    tag: "Distrik Unggulan",
    districtName: "Distrik 2 • Fungsi & Kalkulus",
    categories: ["Fungsi & Kalkulus", "Level 2", "+300 XP"],
    title: "Komposisi Fungsi & Invers",
    displayTitle: "Komposisi Fungsi",
    subTitle: "Rantai Pemetaan (f ∘ g)(x), Domain Alami & Invers",
    description:
      "Pelajari sifat komposisi fungsi bertingkat, syarat injektif-surjektif fungsi invers, asimtot pecahan aljabar, dan trik pemetaan nilai variabel TKA.",
    fullDescription:
      "Materi meliputi konsep rantai fungsi f(g(x)), domain dan kodomain fungsi rasional, penentuan invers fungsi kuadratik dan pecahan aljabar, serta pengantar limit asimtot tak hingga.",
    bgImage:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#241a06]/95 via-[#1a1304]/80 to-[#0e0a02]/90",
    accentColor: "#FFD600",
    targetScore: 75,
  },
  {
    id: "mod-vektor-1",
    districtId: 3,
    tag: "Distrik Unggulan",
    districtName: "Distrik 3 • Geometri & Vektor",
    categories: ["Geometri & Vektor", "Level 3", "+400 XP"],
    title: "Dimensi Tiga: Jarak Titik ke Bidang",
    displayTitle: "Dimensi Tiga & Vektor",
    subTitle: "Proyeksi Spasial Kubus, Bidang BDHF & Vektor 3D",
    description:
      "Taklukkan perhitungan jarak titik ke garis dan bidang pada bangun ruang kubus dengan bantuan teorema Pythagoras dan perkalian titik vektor ortogonal.",
    fullDescription:
      "Membahas cara menentukan garis proyeksi tegak lurus pada bidang diagonal kubus ABCD.EFGH, jarak titik sudut ke bidang frontal, besar sudut antara dua garis bersilangan, dan perkalian skalar vektor di R3.",
    bgImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#240615]/95 via-[#19040e]/80 to-[#0f0208]/90",
    accentColor: "#FF007A",
    targetScore: 75,
  },
  {
    id: "mod-trigo-1",
    districtId: 4,
    tag: "Distrik Unggulan",
    districtName: "Distrik 4 • Trigonometri Lanjut",
    categories: ["Trigonometri", "Level 4", "+450 XP"],
    title: "Sudut Rangkap & Persamaan Kuadrat Sinus",
    displayTitle: "Trigonometri Lanjut",
    subTitle: "Identitas sin 2A, cos 2A, & Penyelesaian Kuadran",
    description:
      "Urai rumus sudut rangkap trigonometri, pemfaktoran persamaan kuadratik bentuk trigonometri, serta himpunan penyelesaian pada interval sudut [0, 2π].",
    fullDescription:
      "Pendalaman formula sudut ganda sin 2x = 2 sin x cos x, rumus cos 2x dalam 3 variasi, manipulasi aljabar persamaan kuadrat trigonometri dan verifikasi sudut kuadran I hingga IV.",
    bgImage:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#0d1629]/95 via-[#091122]/80 to-[#040812]/90",
    accentColor: "#38BDF8",
    targetScore: 75,
  },
  {
    id: "mod-stat-1",
    districtId: 5,
    tag: "Distrik Unggulan",
    districtName: "Distrik 5 • Peluang & Analisis Data",
    categories: ["Peluang & Statistika", "Level 5", "+500 XP"],
    title: "Permutasi, Kombinasi & Kuartil Data Berkelompok",
    displayTitle: "Peluang & Statistika",
    subTitle: "Kaidah Pencacahan, Peluang Kejadian Majemuk & Ogive",
    description:
      "Kombinasikan nCr dan nPr pada soal cerita bersyarat, serta hitung median, kuartil bawah, dan ragam simpangan baku dari tabel distribusi frekuensi berkelompok.",
    fullDescription:
      "Materi pamungkas TKA Matematika: permutasi siklis, kombinasi pemilihan objek, hukum penjumlahan dan perkalian peluang majemuk, serta interpolasi kuartil dan desil data berkelompok.",
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#1a1205]/95 via-[#120c03]/80 to-[#080501]/90",
    accentColor: "#F59E0B",
    targetScore: 75,
  },
];

// Continuous modules left list
const NEW_LEARNING_MODULES = [
  {
    id: "mod-aljabar-1",
    title: "Matriks & SPLDV",
    topic: "Metode Invers & Cramer",
    tag: "Distrik 1",
    xp: "+350 XP",
    img: mathBrainImg,
  },
  {
    id: "mod-fungsi-1",
    title: "Fungsi Komposisi",
    topic: "Pemetaan f(g(x)) & Invers",
    tag: "Distrik 2",
    xp: "+300 XP",
    img: neonPhysicsImg,
  },
];

// Progress items
const CONTINUE_LEARNING = [
  {
    id: "mod-aljabar-1",
    title: "Determinan Matriks 3x3 Sarrus",
    topic: "Distrik 1 • Slide 4 dari 12",
    progress: 65,
    subtitle: "Tersisa 8 Menit",
  },
  {
    id: "mod-fungsi-1",
    title: "Fungsi Invers Pecahan Aljabar",
    topic: "Distrik 2 • Slide 2 dari 10",
    progress: 30,
    subtitle: "Tersisa 14 Menit",
  },
];

// Recommendations
const RECOMMENDATIONS = [
  {
    id: "mod-aljabar-1",
    tag: "Distrik 01",
    match: "98% Sesuai",
    title: "Matriks & SPLDV",
    displayTopic: "Aljabar Linier TKA",
    img: mathBrainImg,
  },
  {
    id: "mod-fungsi-1",
    tag: "Distrik 02",
    match: "95% Sesuai",
    title: "Komposisi Fungsi",
    displayTopic: "Pemetaan & Invers",
    img: neonPhysicsImg,
  },
  {
    id: "mod-vektor-1",
    tag: "Distrik 03",
    match: "91% Sesuai",
    title: "Dimensi Tiga",
    displayTopic: "Jarak Ruang & Vektor",
    img: darkPendantImg,
  },
  {
    id: "mod-trigo-1",
    tag: "Distrik 04",
    match: "89% Sesuai",
    title: "Trigonometri Lanjut",
    displayTopic: "Sudut Rangkap",
    img: ipadCalculusImg,
  },
];

export default function StudentDashboard() {
  const { profile, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [heroIdx, setHeroIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentHero = SIGMA_HERO_FEATURED[heroIdx];

  const handleNextHero = () => {
    setHeroIdx((prev) => (prev + 1) % SIGMA_HERO_FEATURED.length);
  };

  const handlePrevHero = () => {
    setHeroIdx((prev) => (prev - 1 + SIGMA_HERO_FEATURED.length) % SIGMA_HERO_FEATURED.length);
  };

  const handleLogout = () => {
    logout();
    navigate("/masuk");
  };

  const displayName = profile?.full_name || "Ahmad Rizky Pratama";
  const displayClass = profile?.class_name || "Kelas 11 A";
  const displayXp = profile?.xp ?? 0;

  // Dynamic continue learning list based on actual student progress
  const continueLearningList = useMemo(() => {
    const completed = profile?.completed_modules || [];
    if (completed.length === 0) {
      return [
        {
          id: "mod-aljabar-1",
          title: "Operasi & Determinan Matriks",
          topic: "Distrik 1 • Titik Awal Perjalanan",
          progress: 0,
          subtitle: "Mulai Belajar (0%)",
        },
      ];
    }
    return CONTINUE_LEARNING;
  }, [profile?.completed_modules]);

  // Filter recommendations based on search
  const filteredRecommendations = useMemo(() => {
    let list = RECOMMENDATIONS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.displayTopic.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery]);

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-x-hidden font-sans select-none transition-colors duration-300 ${
        isDark ? "bg-[#0d0e14] text-slate-100" : "bg-[#f1f5f9] text-slate-900"
      }`}
    >
      {/* ==================================================================== */}
      {/* 1. ROOM INTERIOR BACKGROUND                                          */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDark ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
              alt="Room Ambient Background"
              className="w-full h-full object-cover opacity-20 filter blur-[8px] scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06080e]/95 via-[#0c0d16]/85 to-[#12131f]/80" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 via-sky-50 to-indigo-50/60" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-300/25 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl" />
          </>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN SPATIAL CONTAINER                                            */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-[1580px] flex items-center gap-3 sm:gap-4 lg:gap-5 min-h-[820px]">
        {/* ================================================================== */}
        {/* A. DETACHED VERTICAL PILL DOCK                                     */}
        {/* ================================================================== */}
        <aside
          className={`w-13 sm:w-14 lg:w-[62px] rounded-full py-6 sm:py-7 px-2 flex flex-col items-center justify-center gap-6 sm:gap-7 shrink-0 transition-all sticky top-6 ${
            isDark
              ? "bg-[#181a24]/80 border border-white/[0.16] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-2xl"
              : "bg-white/90 border border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
          }`}
        >
          <Link
            to="/app/dashboard"
            className={`grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer ${
              isDark
                ? "text-white bg-white/15 shadow-inner hover:scale-110"
                : "text-slate-950 bg-slate-200 shadow-inner hover:scale-110"
            }`}
            title="Dashboard Utama SIGMA"
          >
            <Home size={19} className="stroke-[2.2]" />
          </Link>

          <Link
            to="/app/journey"
            className={`grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-cyan-400 hover:bg-white/10"
                : "text-slate-500 hover:text-cyan-600 hover:bg-slate-100"
            }`}
            title="Peta Distrik Pembelajaran"
          >
            <Map size={19} />
          </Link>

          <Link
            to="/app/hub"
            className={`grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-cyan-400 hover:bg-white/10"
                : "text-slate-500 hover:text-cyan-600 hover:bg-slate-100"
            }`}
            title="Sigma Hub (Koleksi Modul & Distrik)"
          >
            <BookOpen size={19} />
          </Link>

          <Link
            to="/app/discussions"
            className={`grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-cyan-400 hover:bg-white/10"
                : "text-slate-500 hover:text-cyan-600 hover:bg-slate-100"
            }`}
            title="Forum Diskusi & Tanya Guru"
          >
            <MessageSquare size={19} />
          </Link>

          <Link
            to="/app/profile"
            className={`grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-white/10"
                : "text-slate-500 hover:text-slate-950 hover:bg-slate-100"
            }`}
            title="Profil Siswa & Statistik XP"
          >
            <User size={19} />
          </Link>
        </aside>

        {/* ================================================================== */}
        {/* B. MAIN CURVED FROSTED GLASS WINDOW                                */}
        {/* ================================================================== */}
        <main
          className={`flex-1 rounded-[36px] sm:rounded-[42px] p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-x-hidden overflow-y-auto max-h-[92vh] transition-all backdrop-blur-3xl ${
            isDark
              ? "bg-[#11131e]/75 border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.22)] text-slate-100"
              : "bg-white/90 border border-slate-200/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] text-slate-900"
          }`}
        >
          <div className="space-y-6 sm:space-y-7">
            {/* -------------------------------------------------------------- */}
            {/* UNIFIED TOPBAR INSIDE MAIN GLASS WINDOW                        */}
            {/* -------------------------------------------------------------- */}
            <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-white/10 dark:border-white/10">
              {/* Left: Brand Logo + School Badge + Search */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/app/dashboard"
                  className="flex items-center gap-2 group cursor-pointer shrink-0"
                  title="Ke Dashboard SIGMA"
                >
                  <span
                    className={`font-display text-lg sm:text-xl font-black tracking-wider transition-colors ${
                      isDark
                        ? "text-white group-hover:text-cyan-300"
                        : "text-slate-950 group-hover:text-cyan-600"
                    }`}
                  >
                    SIGMA
                  </span>
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-colors ${
                      isDark
                        ? "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
                        : "text-cyan-700 border-cyan-500/30 bg-cyan-50"
                    }`}
                  >
                    MAS DARUNNAJAH 9
                  </span>
                </Link>

                <div
                  className={`hidden sm:block h-5 w-px ${
                    isDark ? "bg-white/15" : "bg-slate-300"
                  }`}
                />

                {/* Search Bar */}
                <div className="relative w-full sm:w-52 md:w-60">
                  <Search
                    size={14}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Cari materi, rumus, kuis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`h-9 w-full rounded-full pl-9 pr-3 text-xs outline-none transition-all shadow-inner ${
                      isDark
                        ? "bg-[#1c1f2e]/80 border border-white/10 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:bg-[#222638]"
                        : "bg-slate-100/90 border border-slate-300/80 text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* Center: Navigation Pills */}
              <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full justify-center">
                {[
                  { id: "dashboard", label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
                  { id: "hub", label: "Sigma Hub", path: "/app/hub", icon: Compass },
                  { id: "journey", label: "Peta Distrik", path: "/app/journey", icon: MapPin },
                  { id: "discussions", label: "Forum Diskusi", path: "/app/discussions", icon: MessageSquare },
                  { id: "profile", label: "Profil", path: "/app/profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === "dashboard";
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? isDark
                            ? "bg-white text-slate-950 font-black shadow-md shadow-white/20 scale-[1.02]"
                            : "bg-slate-950 text-white font-black shadow-md shadow-slate-900/20 scale-[1.02]"
                          : isDark
                          ? "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                      }`}
                      title={item.label}
                    >
                      <Icon
                        size={13}
                        className={
                          isActive
                            ? isDark
                              ? "text-slate-950 stroke-[2.2]"
                              : "text-white stroke-[2.2]"
                            : isDark
                            ? "text-slate-400"
                            : "text-slate-500"
                        }
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Right: Theme Toggle + Circular Bell + User Profile Pill + Quick Logout */}
              <div className="flex items-center gap-2 sm:gap-2.5 self-end xl:self-auto shrink-0">
                {/* Theme Toggle Button */}
                <ThemeToggle variant="icon" />

                {/* Circular Bell Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowNotification(!showNotification)}
                    className={`grid h-9 w-9 place-items-center rounded-full transition-all cursor-pointer relative shadow-sm ${
                      isDark
                        ? "bg-[#1c1f2e]/80 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                        : "bg-white border border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                    title="Pengumuman Guru Pengampu"
                  >
                    <Bell size={15} />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  </button>

                  {/* Notification Popover */}
                  {showNotification && (
                    <div
                      className={`absolute right-0 top-12 z-50 w-72 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 ${
                        isDark
                          ? "border border-white/20 bg-[#161826]/95 text-slate-100"
                          : "border border-slate-200 bg-white/95 text-slate-900"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between border-b pb-2 mb-2 ${
                          isDark ? "border-white/10" : "border-slate-200"
                        }`}
                      >
                        <span className="text-xs font-black text-cyan-600 dark:text-cyan-300 flex items-center gap-1.5">
                          <Bell size={13} /> Pengumuman TKA
                        </span>
                        <button
                          onClick={() => setShowNotification(false)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div
                        className={`p-2.5 rounded-2xl border text-xs ${
                          isDark
                            ? "bg-white/5 border-white/10"
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-amber-500" /> Ust. Ahmad Fauzi, S.Pd.
                        </div>
                        <p
                          className={`text-[11px] mt-1 leading-relaxed ${
                            isDark ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          Assalamu'alaikum siswa-siswi MAS Darunnajah 9. Sesi simulasi kuis Distrik 1 &amp; 2 siap dikerjakan. Target kelulusan skor 75+.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Pill: Student Name + Class / XP */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`rounded-full px-3 py-1.5 flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                      isDark
                        ? "bg-[#1c1f2e]/80 border border-white/10 hover:border-white/30"
                        : "bg-white border border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 grid place-items-center text-slate-950 font-black text-[11px] shadow">
                      {displayName.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-left pr-0.5 hidden sm:block">
                      <div
                        className={`text-xs font-bold leading-tight ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {displayName}
                      </div>
                      <div className="text-[9px] text-cyan-600 dark:text-cyan-300 font-mono leading-none mt-0.5">
                        {displayClass} • {displayXp} XP
                      </div>
                    </div>

                    <ChevronDown size={13} className="text-slate-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showUserDropdown && (
                    <div
                      className={`absolute right-0 top-12 z-50 w-52 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 ${
                        isDark
                          ? "border-white/15 bg-[#141624]/95 text-slate-100"
                          : "border-slate-200 bg-white/95 text-slate-900 shadow-xl"
                      }`}
                    >
                      <Link
                        to="/app/profile"
                        onClick={() => setShowUserDropdown(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                          isDark
                            ? "text-slate-200 hover:bg-white/10 hover:text-white"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                        }`}
                      >
                        <User size={14} className="text-cyan-500" /> Profil &amp; Statistik
                      </Link>
                      <Link
                        to="/app/journey"
                        onClick={() => setShowUserDropdown(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                          isDark
                            ? "text-slate-200 hover:bg-white/10 hover:text-white"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                        }`}
                      >
                        <Bookmark size={14} className="text-amber-500" /> Peta Capaian Distrik
                      </Link>
                      <Link
                        to="/app/discussions"
                        onClick={() => setShowUserDropdown(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                          isDark
                            ? "text-slate-200 hover:bg-white/10 hover:text-white"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                        }`}
                      >
                        <MessageSquare size={14} className="text-purple-500" /> Forum Diskusi
                      </Link>
                      <div
                        className={`my-1 border-t ${
                          isDark ? "border-white/10" : "border-slate-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      >
                        <LogOut size={14} /> Keluar Akun
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`grid h-9 w-9 place-items-center rounded-full border transition-all cursor-pointer ${
                    isDark
                      ? "border-white/10 bg-[#1c1f2e]/80 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 shadow-sm"
                  }`}
                  title="Keluar Akun"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>

            {/* 2. BODY CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* LEFT COLUMN: Materi Terkini & Lanjutkan Belajar */}
              <div className="lg:col-span-4 xl:col-span-4 space-y-5">
                {/* 1. Materi Terkini */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-xs sm:text-sm font-bold tracking-wide ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Materi Terkini
                    </h3>
                    <span
                      className={`text-[11px] flex items-center gap-1 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Urutkan:{" "}
                      <span className={isDark ? "text-slate-200 font-semibold" : "text-slate-800 font-semibold"}>
                        Terbaru
                      </span>
                      <ChevronDown size={12} />
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {NEW_LEARNING_MODULES.map((mod) => (
                      <div
                        key={mod.title}
                        onClick={() => navigate(`/app/materi/${mod.id}`)}
                        className={`group relative rounded-2xl overflow-hidden border p-3 flex items-center justify-between transition-all cursor-pointer shadow-md min-h-[95px] ${
                          isDark
                            ? "border-white/10 bg-[#161826] hover:border-cyan-400/40"
                            : "border-slate-200 bg-white hover:border-cyan-500"
                        }`}
                      >
                        <img
                          src={mod.img}
                          alt={mod.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${
                            isDark
                              ? "from-[#0d0f1a]/95 via-[#0d0f1a]/85 to-transparent"
                              : "from-white/95 via-white/85 to-transparent"
                          }`}
                        />

                        <div className="relative z-10 min-w-0 pr-2">
                          <h4
                            className={`text-xs sm:text-sm font-black transition-colors ${
                              isDark
                                ? "text-white group-hover:text-cyan-300"
                                : "text-slate-900 group-hover:text-cyan-600"
                            }`}
                          >
                            {mod.title}
                          </h4>
                          <p
                            className={`text-[11px] font-medium mt-0.5 line-clamp-1 ${
                              isDark ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            {mod.topic}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-400/25">
                              {mod.tag}
                            </span>
                            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-400/25">
                              {mod.xp}
                            </span>
                          </div>
                        </div>

                        {/* Circular Play Button */}
                        <div
                          className={`relative z-10 h-9 w-9 rounded-full grid place-items-center shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                            isDark ? "bg-white text-slate-950" : "bg-slate-900 text-white"
                          }`}
                        >
                          <Play size={14} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Lanjutkan Belajar */}
                <div className="space-y-3 pt-1">
                  <h3
                    className={`text-xs sm:text-sm font-bold tracking-wide ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Lanjutkan Belajar
                  </h3>

                  <div className="space-y-2">
                    {continueLearningList.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(`/app/materi/${item.id}`)}
                        className={`group rounded-2xl border p-3 flex items-center justify-between transition-all cursor-pointer shadow-sm ${
                          isDark
                            ? "bg-[#151724]/85 border-white/10 hover:border-cyan-400/30 hover:bg-[#1a1c2c]"
                            : "bg-white border-slate-200 hover:border-cyan-500 hover:bg-slate-50"
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <h4
                            className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                              isDark
                                ? "text-white group-hover:text-cyan-300"
                                : "text-slate-900 group-hover:text-cyan-600"
                            }`}
                          >
                            {item.title}
                          </h4>
                          <div
                            className={`text-[11px] font-medium truncate mt-0.5 ${
                              isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            {item.topic}
                          </div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div
                              className={`h-1.5 w-20 sm:w-28 rounded-full overflow-hidden ${
                                isDark ? "bg-white/10" : "bg-slate-200"
                              }`}
                            >
                              <div
                                className="h-full bg-cyan-400 rounded-full"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span
                              className={`text-[10px] font-mono ${
                                isDark ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Circular Play Button */}
                        <div
                          className={`h-8 w-8 rounded-full border grid place-items-center shrink-0 ml-2 transition-all ${
                            isDark
                              ? "bg-white/10 border-white/15 text-white group-hover:bg-white group-hover:text-black"
                              : "bg-slate-100 border-slate-300 text-slate-800 group-hover:bg-slate-900 group-hover:text-white"
                          }`}
                        >
                          <Play size={12} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Large Hero Banner + Rekomendasi Modul TKA */}
              <div className="lg:col-span-8 xl:col-span-8 space-y-6">
                {/* 1. CINEMATIC HERO BANNER */}
                <div
                  className={`relative rounded-3xl overflow-hidden border min-h-[310px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl ${
                    isDark ? "border-white/15 bg-[#171927]" : "border-slate-300 bg-slate-900"
                  }`}
                >
                  <img
                    src={currentHero.bgImage}
                    alt={currentHero.displayTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-45"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentHero.gradient}`} />

                  {/* Top Tags Strip */}
                  <div className="relative z-10 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[11px] font-bold text-white">
                      {currentHero.tag}
                    </span>
                    {currentHero.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Center Big Title & Description */}
                  <div className="relative z-10 max-w-xl my-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                      {currentHero.displayTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed font-normal">
                      {currentHero.description}
                    </p>
                    <p className="text-[11px] text-cyan-300 font-mono mt-1 font-semibold">
                      {currentHero.subTitle} • Target Lulus: Skor ≥ {currentHero.targetScore}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => navigate(`/app/materi/${currentHero.id}`)}
                        className="rounded-full bg-white text-slate-950 px-6 py-2.5 text-xs sm:text-sm font-black hover:bg-slate-200 transition-all flex items-center gap-2 shadow-xl shadow-white/20 hover:scale-105 cursor-pointer"
                      >
                        <Play size={14} className="fill-black" />
                        <span>Mulai Belajar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/app/kuis/${currentHero.id}`)}
                        className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Award size={14} />
                        <span>Uji Kuis (75+)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowModalDetail(currentHero)}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-slate-200 hover:text-white transition-all cursor-pointer"
                        title="Rincian Silabus"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>

                    {/* Carousel Navigation Arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevHero}
                        className="grid h-9 w-9 place-items-center rounded-full bg-black/40 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Distrik Sebelumnya"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextHero}
                        className="grid h-9 w-9 place-items-center rounded-full bg-black/40 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Distrik Selanjutnya"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. REKOMENDASI MODUL TKA */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-xs sm:text-sm font-bold tracking-wide ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Rekomendasi Modul TKA
                    </h3>
                    <Link
                      to="/app/journey"
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        isDark
                          ? "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                          : "bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-200"
                      }`}
                    >
                      <span>Lihat Semua Distrik</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>

                  {/* 4 Poster Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                    {filteredRecommendations.map((card) => (
                      <div
                        key={card.title}
                        onClick={() => setShowModalDetail(card)}
                        className={`group relative rounded-2xl overflow-hidden border aspect-[3/4] p-3 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg ${
                          isDark
                            ? "border-white/10 bg-[#161826] hover:border-cyan-400/40"
                            : "border-slate-200 bg-white hover:border-cyan-500"
                        }`}
                      >
                        <img
                          src={card.img}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e101a] via-[#0e101a]/50 to-transparent" />

                        {/* Top Category Tag */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-0.5 text-[10px] font-medium text-slate-300">
                            {card.tag}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300">
                            {card.match}
                          </span>
                        </div>

                        {/* Bottom Title & Play Icon */}
                        <div className="relative z-10 flex items-end justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-black text-white leading-tight group-hover:text-cyan-300 transition-colors truncate">
                              {card.title}
                            </h4>
                            <p className="text-[10px] text-slate-300 truncate mt-0.5">
                              {card.displayTopic}
                            </p>
                          </div>

                          <div className="h-7 w-7 rounded-full bg-white text-slate-950 grid place-items-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <Play size={11} className="fill-black ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ==================================================================== */}
      {/* 3. MODAL DETAIL POPUP                                                */}
      {/* ==================================================================== */}
      {showModalDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in">
          <div
            className={`relative w-full max-w-lg rounded-3xl border p-6 shadow-2xl overflow-hidden ${
              isDark
                ? "border-white/20 bg-[#161826] text-slate-100"
                : "border-slate-300 bg-white text-slate-900"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowModalDetail(null)}
              className={`absolute top-4 right-4 h-8 w-8 rounded-full grid place-items-center cursor-pointer transition-colors ${
                isDark
                  ? "bg-white/10 text-slate-300 hover:text-white hover:bg-white/20"
                  : "bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200"
              }`}
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase">
                {showModalDetail.tag || "Modul TKA"}
              </span>
              <span
                className={`text-xs font-mono ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                MAS Darunnajah 9
              </span>
            </div>

            <h3
              className={`text-xl sm:text-2xl font-black leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {showModalDetail.title || showModalDetail.displayTitle}
            </h3>
            <p
              className={`text-xs sm:text-sm mt-2.5 leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {showModalDetail.fullDescription ||
                showModalDetail.description ||
                `Pelajari materi pembelajaran dan selesaikan tantangan kuis untuk topik ${showModalDetail.displayTopic || showModalDetail.title}.`}
            </p>

            <div
              className={`mt-6 flex items-center gap-3 pt-3 border-t ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  navigate(`/app/materi/${showModalDetail.id || "mod-aljabar-1"}`);
                }}
                className={`flex-1 rounded-full font-black py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  isDark
                    ? "bg-white text-slate-950 hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <Play size={14} className="fill-current" />
                <span>Mulai Belajar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate(`/app/kuis/${showModalDetail.id || "mod-aljabar-1"}`);
                }}
                className={`rounded-full border font-bold py-2.5 px-5 text-xs sm:text-sm transition-all cursor-pointer ${
                  isDark
                    ? "bg-white/15 hover:bg-white/25 border-white/20 text-white"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
                }`}
              >
                Uji Kuis (75+)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
