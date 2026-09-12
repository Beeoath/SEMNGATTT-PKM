import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Shield,
  GraduationCap,
  Hexagon,
  Compass,
  Zap,
  Activity,
  Award,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { MASCOTS, DISTRICT_ACCENT, CITY_IMG } from "../lib/brand";
import { JusticeLeagueTitle } from "../components/JusticeLeagueTitle";
import { IronManTitle } from "../components/IronManTitle";
import { SigmaBackground } from "../components/SigmaBackground";
import { useTheme, ThemeToggle } from "../lib/theme";
import { useLenis } from "../lib/useLenis";

export default function Landing() {
  useLenis();
  const { isDark } = useTheme();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerTitle, setTrailerTitle] = useState("Official Mission Teaser");
  const [activeMascotKey, setActiveMascotKey] = useState("alpha");

  const currentMascot = MASCOTS[activeMascotKey] || MASCOTS.alpha;

  // Mascot theme colors
  const getThemeColor = () => {
    if (activeMascotKey === "alpha") return { hex: "#00F0FF", rgb: "0, 240, 255" };
    if (activeMascotKey === "beta") return { hex: "#FF007A", rgb: "255, 0, 122" };
    return { hex: "#FFD600", rgb: "255, 214, 0" };
  };
  const theme = getThemeColor();

  const handleOpenTrailer = (title = "Official Mission Teaser") => {
    setTrailerTitle(title);
    setTrailerOpen(true);
  };

  return (
    <div
      className={`relative min-h-screen font-sans selection:bg-[#00f0ff] selection:text-black overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-[#050814] text-slate-100" : "bg-[#f4f6fb] text-slate-900"
      }`}
    >
      {/* Dynamic Background Matrix */}
      <SigmaBackground density={24} glyphs={10} />

      {/* Atmospheric Clean Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[500px] blur-[130px] rounded-full ${
            isDark ? "bg-cyan-500/10" : "bg-sky-400/20"
          }`}
        />
      </div>

      {/* Main Content Layout Container */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10 space-y-12 sm:space-y-16">
        {/* ========================================================================= */}
        {/* 1. TOP HERO CARD CONTAINER                                                */}
        {/* ========================================================================= */}
        <section
          id="hero-card"
          className={`relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border transition-all duration-300 ${
            isDark
              ? "border-white/10 bg-gradient-to-b from-[#0d1630] via-[#090f23] to-[#0d1733] shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-white"
              : "border-slate-300/80 bg-gradient-to-b from-white via-slate-50 to-sky-50 shadow-[0_20px_50px_rgba(15,23,42,0.08)] text-slate-900"
          }`}
        >
          {/* Clean Soft Sheen in Card Background */}
          <div
            className={`pointer-events-none absolute inset-0 ${
              isDark
                ? "bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.08)_0%,transparent_65%)]"
                : "bg-[radial-gradient(ellipse_at_top,rgba(2,132,199,0.08)_0%,transparent_65%)]"
            }`}
          />

          {/* --- A. CARD NAVIGATION BAR --- */}
          <nav className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7">
            {/* Logo / Brand Name */}
            <Link to="/" className="flex items-center gap-2 group">
              <span
                className={`font-display text-lg sm:text-xl font-black uppercase tracking-tight transition-colors ${
                  isDark
                    ? "text-white group-hover:text-cyan-400"
                    : "text-slate-950 group-hover:text-cyan-600"
                }`}
              >
                SIGMA
              </span>
            </Link>

            {/* Middle Nav Links */}
            <div
              className={`hidden md:flex items-center gap-8 text-xs font-semibold ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <a
                href="#hero-card"
                className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-950"}`}
              >
                Home
              </a>
              <a
                href="#posters"
                className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-950"}`}
              >
                Distrik &amp; Misi
              </a>
              <Link
                to="/app/hub"
                className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-950"}`}
              >
                Peta Belajar
              </Link>
              <Link
                to="/teacher"
                className={`transition-colors flex items-center gap-1 ${
                  isDark ? "text-amber-300 hover:text-amber-200" : "text-amber-700 hover:text-amber-900"
                }`}
              >
                <GraduationCap size={14} /> Portal Guru
              </Link>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <ThemeToggle variant="icon" />

              <Link
                to="/masuk"
                className={`inline-flex items-center gap-2.5 rounded-full font-bold text-xs px-4 py-2 sm:px-5 sm:py-2.5 shadow-md transition-all group ${
                  isDark
                    ? "bg-white hover:bg-slate-100 text-slate-950 shadow-white/10"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/15"
                }`}
              >
                <span>Mulai Belajar</span>
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full transition-colors ${
                    isDark
                      ? "bg-slate-900 text-white group-hover:bg-[#00f0ff] group-hover:text-black"
                      : "bg-white text-slate-950 group-hover:bg-[#00f0ff] group-hover:text-black"
                  }`}
                >
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </nav>

          {/* --- B. HERO STAGE --- */}
          <div className="relative z-10 px-6 pt-4 pb-10 sm:px-10 sm:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Welcome + Big Title */}
              <div className="lg:col-span-5 flex flex-col items-start z-20 order-2 lg:order-1 pr-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-300">
                  <span>KURIKULUM TKA MATEMATIKA KELAS 11</span>
                </div>

                {/* 3D Metallic SIGMA Title */}
                <div className="relative my-2.5 w-full max-w-[320px] sm:max-w-[390px] lg:max-w-[450px] group">
                  <div
                    className="pointer-events-none absolute -inset-x-8 -inset-y-3 rounded-full blur-3xl opacity-30"
                    style={{
                      background: isDark
                        ? "linear-gradient(90deg, rgba(0, 240, 255, 0.28) 0%, rgba(56, 189, 248, 0.16) 100%)"
                        : "linear-gradient(90deg, rgba(2, 132, 199, 0.18) 0%, rgba(147, 197, 253, 0.12) 100%)",
                    }}
                  />
                  <JusticeLeagueTitle size="lg" className="origin-left" />
                </div>

                {/* Main Hero Display Title */}
                <h1
                  className={`mt-1 font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black uppercase tracking-tight leading-[1.15] drop-shadow-md ${
                    isDark ? "text-white" : "text-slate-950"
                  }`}
                >
                  MAS{" "}
                  <span
                    className={`text-transparent bg-clip-text ${
                      isDark
                        ? "bg-gradient-to-r from-white via-slate-100 to-cyan-300"
                        : "bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-700"
                    }`}
                  >
                    DARUNNAJAH 9
                  </span>
                </h1>

                <p
                  className={`mt-3 text-xs sm:text-sm leading-relaxed max-w-sm ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Taklukkan aljabar, matriks, limit fungsi, hingga geometri dimensi tiga bersama tiga
                  superhero penjaga gerbang SIGMA.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/app/dashboard"
                    className="inline-flex items-center gap-2 rounded-full bg-[#00f0ff] hover:bg-cyan-300 text-slate-950 font-black text-xs px-5 py-2.5 uppercase tracking-wider shadow-lg shadow-cyan-400/25 transition-all"
                  >
                    JELAJAHI DISTRIK <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/masuk?mode=daftar"
                    className={`inline-flex items-center gap-2 rounded-full border text-xs px-4 py-2.5 font-bold transition-all ${
                      isDark
                        ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                        : "border-slate-300 bg-white hover:bg-slate-100 text-slate-800"
                    }`}
                  >
                    DAFTAR AKUN BARU
                  </Link>
                </div>
              </div>

              {/* Center Column: Mascot Card Container & 3D Guardian Switcher */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center z-10 order-1 lg:order-2">
                <motion.div
                  key={activeMascotKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[290px] aspect-[4/5] group"
                >
                  <div
                    className="absolute -inset-2 rounded-[2rem] opacity-60 blur-xl transition-all duration-700"
                    style={{
                      background: `radial-gradient(circle, ${theme.hex} 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className={`relative h-full w-full rounded-[1.8rem] border p-2 backdrop-blur-xl transition-all duration-500 ${
                      isDark
                        ? "border-white/20 bg-gradient-to-b from-[#111936] to-[#070b18]"
                        : "border-slate-300 bg-gradient-to-b from-white to-slate-100 shadow-xl"
                    }`}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#070c1d]">
                      {/* District badge */}
                      <div className="absolute top-2.5 left-2.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[9px] font-mono font-bold text-cyan-300 backdrop-blur-md flex items-center gap-1 z-10">
                        <Shield size={10} />
                        <span>HERO GUARDIAN</span>
                      </div>

                      <img
                        src={currentMascot.img}
                        alt={currentMascot.name}
                        className="h-full w-full object-cover object-center filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a18] via-transparent to-transparent opacity-85" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#060a18] via-[#060a18]/90 to-transparent">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ backgroundColor: theme.hex }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2 w-2"
                              style={{ backgroundColor: theme.hex }}
                            />
                          </span>
                          <span className="font-display text-xs font-black text-white">
                            {currentMascot.name}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-slate-300 mt-0.5">
                          {currentMascot.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Hero Switcher Chips (Alpha / Beta / Gamma + 3D) */}
                <div className="mt-3.5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 p-1 backdrop-blur-md shadow-xl z-20">
                  {["alpha", "beta", "gamma"].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setActiveMascotKey(k)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                        activeMascotKey === k
                          ? "bg-[#00f0ff] text-slate-950 font-black shadow-md shadow-cyan-400/40 scale-105"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {MASCOTS[k].name.split("-")[0]}
                    </button>
                  ))}
                  <span className="font-mono text-[9px] text-cyan-400/90 pr-1.5 pl-0.5 flex items-center gap-0.5 font-semibold">
                    <Sparkles size={10} /> 3D
                  </span>
                </div>
              </div>

              {/* Right Column: Quote */}
              <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right z-10 order-3">
                <div className="max-w-xs">
                  <p
                    className={`font-display text-sm sm:text-base font-bold leading-snug ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    &ldquo;Dengan kekuatan logika matematika hadir ketajaman nalar tanpa batas.&rdquo;
                  </p>
                  <p
                    className={`mt-2 text-xs leading-relaxed font-sans ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Pahlawan terpilih yang ditakdirkan menuntaskan 5 distrik matematika kelas 11 MA
                    Darunnajah 9 dan membuka gerbang kelulusan TKA.
                  </p>

                  <div className="mt-6 flex flex-col lg:items-end gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold">
                      PROFIL KESIAPAN TKA
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-36 rounded-full overflow-hidden border ${
                          isDark ? "bg-slate-800 border-white/10" : "bg-slate-200 border-slate-300"
                        }`}
                      >
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-[#00f0ff] w-[88%]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-cyan-500">88%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- C. DOCKED LOWER FEATURE BAR --- */}
          <div
            className={`relative z-20 border-t px-6 py-4 sm:px-10 sm:py-5 backdrop-blur-md transition-colors ${
              isDark
                ? "border-white/10 bg-[#091124]/90 text-slate-300"
                : "border-slate-200 bg-slate-100/95 text-slate-700"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#00f0ff]" />
                <span
                  className={`font-display text-xs font-bold tracking-wide uppercase ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Featuring Pahlawan Matematika Sigma
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px]">
                <button
                  type="button"
                  className={`flex items-center gap-1.5 transition-all cursor-pointer px-2.5 py-1 rounded-full ${
                    activeMascotKey === "alpha"
                      ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveMascotKey("alpha")}
                >
                  <Zap size={13} className="text-[#00f0ff]" />
                  <span>Lingkaran Aljabar</span>
                </button>

                <button
                  type="button"
                  className={`flex items-center gap-1.5 transition-all cursor-pointer px-2.5 py-1 rounded-full ${
                    activeMascotKey === "beta"
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveMascotKey("beta")}
                >
                  <Hexagon size={13} className="text-[#ffd600]" />
                  <span>Hexagon Fungsi</span>
                </button>

                <button
                  type="button"
                  className={`flex items-center gap-1.5 transition-all cursor-pointer px-2.5 py-1 rounded-full ${
                    activeMascotKey === "gamma"
                      ? "bg-pink-400/20 text-pink-300 border border-pink-400/40 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveMascotKey("gamma")}
                >
                  <Compass size={13} className="text-[#ff007a]" />
                  <span>Topeng Geometri</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SECOND SECTION: 3 VERTICAL POSTERS                                     */}
        {/* ========================================================================= */}
        <section
          id="posters"
          className={`relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border p-6 sm:p-10 lg:p-12 shadow-2xl transition-all ${
            isDark
              ? "border-white/10 bg-gradient-to-b from-[#0a1226] via-[#070d1d] to-[#0b1428]"
              : "border-slate-300 bg-gradient-to-b from-white via-slate-50 to-indigo-50/40 text-slate-900"
          }`}
        >
          {/* Header Row */}
          <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-b pb-8 mb-8 ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <div className="md:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00f0ff] block">
                SIGMA
              </span>
              <h2
                className={`mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[1.15] ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Setiap Rumus <br />
                Membuka Gerbang Baru
              </h2>
            </div>

            <div className="md:col-span-6 flex flex-col md:items-end justify-between gap-4">
              <p
                className={`text-xs sm:text-sm leading-relaxed md:text-right max-w-md ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Petualangan superhero matematika spektakuler yang dipenuhi aksi logika, ketelitian,
                dan pertempuran konsep kurikulum di seluruh penjuru kota.
              </p>

              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-[11px] hidden sm:inline ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Tersedia 5 Distrik Pembelajaran
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Trailer Petualangan Distrik Sigma")}
                  className={`inline-flex items-center gap-2 rounded-full font-bold text-xs px-4 py-2 shadow transition-all group ${
                    isDark
                      ? "bg-white hover:bg-slate-200 text-slate-950"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>Watch Trailer</span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full transition-colors ${
                      isDark
                        ? "bg-slate-900 text-white group-hover:bg-[#00f0ff] group-hover:text-black"
                        : "bg-white text-slate-950 group-hover:bg-[#00f0ff] group-hover:text-black"
                    }`}
                  >
                    <Play size={9} fill="currentColor" className="ml-0.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 Vertical Movie-Poster Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Poster 1 */}
            <div
              className={`group relative overflow-hidden rounded-[1.8rem] border shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#00f0ff]/50 ${
                isDark ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"
              }`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&auto=format&fit=crop&q=80"
                  alt="Distrik Aljabar"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Distrik 01: Rahasia Matriks & SPLDV")}
                  className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/60 border border-white/30 text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-transparent transition-all shadow-xl"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                <span className="absolute top-4 left-4 rounded-full bg-cyan-400/90 px-2.5 py-0.5 font-mono text-[9px] font-black text-black uppercase tracking-wider backdrop-blur-sm">
                  DISTRIK 01 &bull; MATRIX REALM
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold">
                    ALJABAR &amp; MATRIKS
                  </span>
                  <h3 className="font-display text-base font-black uppercase text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    Determinan &amp; Invers Matriks
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Kuasai operasi baris dasar, determinan metode Sarrus, dan aturan Cramer untuk SPLTV.
                  </p>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2">
                    <span>15 SOAL &bull; 20 MENIT</span>
                    <Link to="/masuk" className="text-white hover:text-cyan-300 font-bold">
                      BUKA &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster 2 */}
            <div
              className={`group relative overflow-hidden rounded-[1.8rem] border shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#ffd600]/50 ${
                isDark ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"
              }`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700&auto=format&fit=crop&q=80"
                  alt="Distrik Fungsi"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Distrik 02: Ekspedisi Komposisi Fungsi")}
                  className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/60 border border-white/30 text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-[#ffd600] group-hover:text-black group-hover:border-transparent transition-all shadow-xl"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                <span className="absolute top-4 left-4 rounded-full bg-amber-400/90 px-2.5 py-0.5 font-mono text-[9px] font-black text-black uppercase tracking-wider backdrop-blur-sm">
                  DISTRIK 02 &bull; FUNCTION TOWER
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffd600] font-bold">
                    DOMAIN &amp; INVERS
                  </span>
                  <h3 className="font-display text-base font-black uppercase text-white mt-1 group-hover:text-amber-300 transition-colors">
                    Operasi Komposisi Fungsi
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Petakan domain, range, relasi, dan rumus fungsi invers dalam tantangan bertingkat.
                  </p>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2">
                    <span>SYARAT: DISTRIK 01 LULUS</span>
                    <Link to="/masuk" className="text-white hover:text-amber-300 font-bold">
                      BUKA &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster 3 */}
            <div
              className={`group relative overflow-hidden rounded-[1.8rem] border shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#ff007a]/50 ${
                isDark ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"
              }`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80"
                  alt="Peluang & Statistika"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Distrik 04 & 05: Takdir Kombinasi & Statistika")}
                  className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/60 border border-white/30 text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-[#ff007a] group-hover:text-white group-hover:border-transparent transition-all shadow-xl"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                <span className="absolute top-4 left-4 rounded-full bg-pink-500/90 px-2.5 py-0.5 font-mono text-[9px] font-black text-white uppercase tracking-wider backdrop-blur-sm">
                  DISTRIK 04 &bull; MULTIVERSE DATA
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff007a] font-bold">
                    PELUANG &amp; STATISTIK
                  </span>
                  <h3 className="font-display text-base font-black uppercase text-white mt-1 group-hover:text-pink-300 transition-colors">
                    Pertarungan Puncak TKA
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Permutasi, kombinasi, kaidah pencacahan, serta ukuran pemusatan dan penyebaran data.
                  </p>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2">
                    <span>KUNCI SERTIFIKAT AKHIR</span>
                    <Link to="/masuk" className="text-white hover:text-pink-300 font-bold">
                      BUKA &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CALL TO ACTION SECTION: "SIAP MASUK?"                                  */}
        {/* ========================================================================= */}
        <section
          className={`relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border p-8 sm:p-14 text-center shadow-2xl transition-all ${
            isDark
              ? "border-white/10 bg-gradient-to-b from-[#0b1530] via-[#080e22] to-[#060a18] text-white"
              : "border-slate-300 bg-gradient-to-b from-white via-slate-50 to-sky-100/60 text-slate-900"
          }`}
        >
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-300 mb-4">
              <span>GERBANG PETUALANGAN SIGMA</span>
            </div>

            {/* Preserved 3D Iron Man Render */}
            <div className="w-full flex justify-center mb-6">
              <IronManTitle text="SIAP MASUK?" />
            </div>

            <p
              className={`max-w-xl text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Bergabunglah bersama ribuan siswa MA Darunnajah 9. Taklukkan 5 distrik kurikulum
              matematika SIGMA, raih lencana kejuaraan, dan mantapkan persiapan ujian TKA kelas 11.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/masuk?mode=daftar"
                className="inline-flex items-center gap-2 rounded-full bg-[#00f0ff] hover:bg-cyan-300 text-slate-950 font-black text-xs px-6 py-3 uppercase tracking-wider shadow-lg shadow-cyan-400/30 transition-all"
              >
                DAFTAR SEBAGAI SISWA <ArrowRight size={14} />
              </Link>
              <Link
                to="/masuk?mode=daftar&role=guru"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-400/10 hover:bg-amber-400/20 text-amber-500 dark:text-amber-300 font-bold text-xs px-5 py-3 uppercase tracking-wider transition-all"
              >
                <GraduationCap size={15} /> DAFTAR AKUN GURU
              </Link>
              <Link
                to="/masuk"
                className={`inline-flex items-center gap-2 rounded-full border font-bold text-xs px-5 py-3 uppercase tracking-wider transition-all ${
                  isDark
                    ? "border-white/20 bg-black/40 hover:bg-black text-white"
                    : "border-slate-300 bg-white hover:bg-slate-100 text-slate-900 shadow-sm"
                }`}
              >
                MASUK KE AKUN
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 4. CONSOLE & STUDIO FOOTER                                               */}
      {/* ========================================================================= */}
      <footer
        className={`relative z-10 border-t px-4 py-10 sm:px-6 font-mono text-xs transition-colors ${
          isDark
            ? "border-white/10 bg-[#04060f] text-slate-400"
            : "border-slate-200 bg-white text-slate-600 shadow-sm"
        }`}
      >
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span
              className={`font-display font-black text-sm tracking-tight ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              SIGMA LEAGUE &trade;
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              PkM Universitas Pamulang &times; MA Darunnajah 9
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/app/hub" className="hover:text-cyan-500 transition-colors">
              Peta Belajar
            </Link>
            <Link to="/app/discussions" className="hover:text-cyan-400 transition-colors">
              Forum
            </Link>
            <Link
              to="/teacher"
              className="hover:text-amber-500 text-amber-500 font-bold transition-colors"
            >
              Portal Guru
            </Link>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE MISSION TRAILER MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setTrailerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-3xl overflow-hidden rounded-3xl border shadow-2xl ${
                isDark
                  ? "border-white/20 bg-[#090e21]"
                  : "border-slate-300 bg-white text-slate-900"
              }`}
            >
              {/* Modal header */}
              <div
                className={`flex items-center justify-between border-b px-5 py-3.5 ${
                  isDark ? "border-white/10 bg-[#060a18]" : "border-slate-200 bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span
                    className={`font-display text-xs font-black uppercase tracking-wider ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {trailerTitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTrailerOpen(false)}
                  className={`rounded-full p-1 transition-colors ${
                    isDark
                      ? "text-slate-400 hover:bg-white/10 hover:text-white"
                      : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Mockup */}
              <div className="relative aspect-video w-full bg-black flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 opacity-40">
                  <img
                    src={CITY_IMG}
                    alt="City Teaser"
                    className="h-full w-full object-cover filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-md">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[#00f0ff] text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.7)] animate-pulse">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-black uppercase text-white tracking-wide">
                    {trailerTitle}
                  </h4>
                  <p className="mt-2 text-xs text-slate-300">
                    Jelajahi alur modul 5 distrik, selesaikan 15 soal kuis adaptif dalam 20 menit, dan
                    raih nilai di atas 75 untuk membuka gerbang selanjutnya!
                  </p>
                  <Link
                    to="/masuk"
                    onClick={() => setTrailerOpen(false)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-slate-950 font-bold text-xs px-6 py-2.5 shadow hover:bg-slate-200 transition-all"
                  >
                    Mulai Belajar Sekarang &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
