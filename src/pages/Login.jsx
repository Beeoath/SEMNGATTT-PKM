import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, GraduationCap, KeyRound, Loader2, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../lib/auth";
import { useTheme, ThemeToggle } from "../lib/theme";
import { SigmaBackground } from "../components/SigmaBackground";
import { Animated3DMascot } from "../components/Animated3DMascot";
import { JusticeLeagueTitle } from "../components/JusticeLeagueTitle";

export default function Login() {
  const [params] = useSearchParams();
  const [mode, setMode] = useState(params.get("mode") === "daftar" ? "daftar" : "masuk");
  const [role, setRole] = useState(
    params.get("role") === "guru" || params.get("role") === "teacher" ? "teacher" : "student"
  );
  const [form, setForm] = useState({ full_name: "", email: "", password: "", class_name: "", teacher_code: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showTeacherCode, setShowTeacherCode] = useState(false);
  const [busy, setBusy] = useState(false);
  const { profile, login, register } = useAuth();
  const { isDark } = useTheme();
  const nav = useNavigate();

  useEffect(() => {
    if (params.get("mode") === "daftar") setMode("daftar");
    if (params.get("role") === "guru" || params.get("role") === "teacher") setRole("teacher");
    else if (params.get("role") === "siswa" || params.get("role") === "student") setRole("student");
  }, [params]);

  useEffect(() => {
    if (profile) nav(profile.role === "teacher" ? "/teacher" : "/app", { replace: true });
  }, [profile, nav]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "daftar" && role === "teacher" && !form.teacher_code?.trim()) {
        throw new Error("Masukkan kode otorisasi guru untuk verifikasi keamanan.");
      }

      const me =
        mode === "masuk"
          ? await login(form.email.trim(), form.password)
          : await register(form.full_name.trim(), form.email.trim(), form.password, role, {
              class_name: role === "student" ? (form.class_name?.trim() || "Kelas 11") : "Pengampu Matematika",
              teacher_code: form.teacher_code?.trim(),
            });
      toast.success(`Selamat datang, ${me.full_name}!`);
      nav(me.role === "teacher" ? "/teacher" : "/app", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        isDark ? "text-slate-100" : "text-slate-900"
      }`}
    >
      <SigmaBackground density={30} glyphs={12} />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-8 sm:py-12 sm:px-8 lg:grid-cols-2">
        {/* =================================================================== */}
        {/* DESKTOP SHOWCASE COLUMN (Visible on lg screens)                    */}
        {/* =================================================================== */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="btn-ghost" data-testid="back-home-link">
              <ArrowLeft size={16} /> Beranda
            </Link>
            <ThemeToggle variant="pill" showLabel />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-300">
            <span>MATEMATIKA TKA KELAS 11</span>
          </div>

          <div className="relative my-2.5 w-full max-w-[300px] sm:max-w-[360px] -ml-1 group">
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-2 rounded-full blur-3xl opacity-25"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, rgba(0, 240, 255, 0.28) 0%, rgba(56, 189, 248, 0.16) 100%)"
                  : "linear-gradient(90deg, rgba(2, 132, 199, 0.18) 0%, rgba(147, 197, 253, 0.12) 100%)",
              }}
            />
            <JusticeLeagueTitle size="md" className="origin-left" />
          </div>

          <p
            className={`mt-2 font-display text-lg sm:text-xl font-black tracking-widest uppercase drop-shadow-sm ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            MAS DARUNNAJAH 9
          </p>
          <p
            className={`mt-1 font-mono text-xs font-semibold tracking-wider ${
              isDark ? "text-cyan-400" : "text-cyan-700"
            }`}
          >
            SISTEM PEMBELAJARAN INTERAKTIF 5 DISTRIK
          </p>
          <p
            className={`mt-6 max-w-md text-sm leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Masuk untuk melanjutkan perjalananmu menembus lima distrik SIGMA City, menaklukkan tantangan
            aljabar, fungsi, dan geometri, serta bersiap menghadapi TKA.
          </p>
          <Animated3DMascot className="mt-8" />
        </div>

        {/* =================================================================== */}
        {/* LOGIN FORM CONTAINER (Responsive Mobile + Tablet + Desktop)        */}
        {/* =================================================================== */}
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          {/* MOBILE/TABLET PROMINENT SIGMA HERO BANNER (Shown when lg is hidden) */}
          <div className="lg:hidden flex flex-col items-center text-center mb-6 space-y-2">
            <div className="w-full flex items-center justify-between mb-2">
              <Link
                to="/"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:text-slate-950 shadow-sm"
                }`}
              >
                <ArrowLeft size={14} /> Beranda
              </Link>
              <ThemeToggle variant="icon" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-0.5 text-[10px] font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-300">
              MATEMATIKA TKA • KELAS 11
            </div>

            {/* Mobile Big SIGMA 3D Title */}
            <div className="relative my-1 w-full flex justify-center py-1">
              <div
                className="pointer-events-none absolute -inset-x-4 -inset-y-1 rounded-full blur-2xl opacity-20"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(0, 240, 255, 0.3) 0%, rgba(56, 189, 248, 0.15) 100%)"
                    : "linear-gradient(90deg, rgba(2, 132, 199, 0.2) 0%, rgba(147, 197, 253, 0.1) 100%)",
                }}
              />
              <JusticeLeagueTitle size="sm" />
            </div>

            <p
              className={`font-display text-xs font-bold tracking-wider uppercase ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              MAS DARUNNAJAH 9
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-[2rem] glass p-6 sm:p-9 relative shadow-2xl border border-white/15">
            {/* Card Header Brand Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl font-display text-2xl font-black text-slate-950 shadow-lg transition-all ${
                    mode === "daftar" && role === "teacher"
                      ? "bg-gradient-to-br from-[#ffd600] to-amber-500 shadow-amber-400/30"
                      : "bg-gradient-to-br from-[#00f0ff] to-cyan-500 shadow-cyan-400/40"
                  }`}
                >
                  Σ
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-display text-lg sm:text-xl font-black tracking-wider uppercase ${
                        isDark ? "text-white" : "text-slate-950"
                      }`}
                    >
                      SIGMA
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${
                        mode === "daftar" && role === "teacher"
                          ? "bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/30"
                          : "bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30"
                      }`}
                    >
                      {mode === "masuk" ? "LOGIN" : "REGISTER"}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">
                    MAS DARUNNAJAH 9
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden lg:block">
                  <ThemeToggle variant="icon" />
                </div>
              </div>
            </div>

            <h2
              className={`mt-5 font-display text-2xl font-black ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {mode === "masuk"
                ? "Masuk ke SIGMA"
                : role === "teacher"
                ? "Daftar Akun Guru SIGMA"
                : "Daftar Akun Siswa SIGMA"}
            </h2>
            <p
              className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {mode === "masuk"
                ? "Gunakan akun terdaftar untuk melanjutkan pembelajaran matematika di SIGMA City."
                : role === "teacher"
                ? "Daftarkan diri Anda sebagai dewan guru pengampu untuk mengelola materi dan kuis kelas."
                : "Akun baru siswa Kelas 11 MA Darunnajah 9 untuk membuka gerbang distrik matematika SIGMA."}
            </p>

            {/* Menu Tab Peran jika mode Daftar */}
            {mode === "daftar" && (
            <div
              className={`mt-6 grid grid-cols-2 gap-2 rounded-2xl border p-1.5 ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-slate-200 bg-slate-100"
              }`}
              data-testid="register-role-tabs"
            >
              <button
                type="button"
                onClick={() => setRole("student")}
                data-testid="tab-register-student"
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
                  role === "student"
                    ? "bg-[#00f0ff] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <User size={15} /> Siswa Kelas 11
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                data-testid="tab-register-teacher"
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
                  role === "teacher"
                    ? "bg-[#ffd600] text-slate-950 shadow-[0_0_20px_rgba(255,214,0,0.4)]"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <GraduationCap size={15} /> Guru / Pengajar
              </button>
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4" data-testid="auth-form">
            {mode === "daftar" && (
              <div>
                <label htmlFor="full_name" className="overline-label mb-2 block">
                  {role === "teacher" ? "Nama Lengkap & Gelar Guru" : "Nama Lengkap Siswa"}
                </label>
                <input
                  id="full_name"
                  className="field"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder={
                    role === "teacher"
                      ? "Contoh: Ust. Ahmad Fauzi, S.Pd."
                      : "Nama lengkap sesuai absen kelas"
                  }
                  value={form.full_name}
                  onChange={set("full_name")}
                  data-testid="register-fullname-input"
                />
              </div>
            )}
            {mode === "daftar" && role === "student" && (
              <div>
                <label htmlFor="class_name" className="overline-label mb-2 block">
                  Pilih Rombel / Kelas
                </label>
                <select
                  id="class_name"
                  className="field cursor-pointer bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                  required
                  value={form.class_name || "Kelas 11 A"}
                  onChange={set("class_name")}
                  data-testid="register-class-input"
                >
                  <option value="Kelas 11 A" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">Kelas 11 A</option>
                  <option value="Kelas 11 B" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">Kelas 11 B</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Pilih salah satu dari 2 rombel kelas 11 yang terdaftar.
                </p>
              </div>
            )}
            <div>
              <label htmlFor="email" className="overline-label mb-2 block">
                Email {role === "teacher" && mode === "daftar" ? "Guru / Sekolah" : ""}
              </label>
              <input
                id="email"
                type="email"
                className="field"
                required
                autoComplete="email"
                placeholder={
                  role === "teacher" && mode === "daftar"
                    ? "guru@darunnajah9.sch.id"
                    : "nama@sekolah.id"
                }
                value={form.email}
                onChange={set("email")}
                data-testid="auth-email-input"
              />
            </div>
            <div>
              <label htmlFor="password" className="overline-label mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="field !pr-12"
                  required
                  minLength={6}
                  autoComplete={mode === "masuk" ? "current-password" : "new-password"}
                  placeholder="Minimal 6 karakter"
                  value={form.password}
                  onChange={set("password")}
                  data-testid="auth-password-input"
                />
                <button
                  type="button"
                  id="toggle-password-visibility-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    isDark
                      ? "text-slate-400 hover:bg-white/10 hover:text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  data-testid="toggle-password-visibility-button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {mode === "daftar" && role === "teacher" && (
              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="teacher_code" className="overline-label !text-amber-500 dark:!text-amber-400 flex items-center gap-1.5 font-bold">
                    <ShieldCheck size={14} className="text-amber-500 dark:text-amber-400" /> Kode Otorisasi Guru
                  </label>
                  <span className="mono text-[0.62rem] text-amber-500 dark:text-amber-400 font-bold uppercase tracking-wider">
                    Wajib Valid
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="teacher_code"
                    type={showTeacherCode ? "text" : "password"}
                    className="field !border-amber-400/40 focus:!border-amber-400 focus:!shadow-[0_0_18px_rgba(255,214,0,0.3)] !pr-12 uppercase placeholder:normal-case font-mono tracking-wider font-semibold text-amber-500 dark:text-amber-400"
                    required
                    autoComplete="off"
                    placeholder="Contoh: SIGMAGURU2026"
                    value={form.teacher_code || ""}
                    onChange={set("teacher_code")}
                    data-testid="teacher-code-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTeacherCode((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label={showTeacherCode ? "Sembunyikan kode" : "Tampilkan kode"}
                  >
                    {showTeacherCode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex items-start gap-2 pt-1 text-[0.72rem] text-slate-600 dark:text-slate-300">
                  <KeyRound size={13} className="shrink-0 text-amber-500 mt-0.5" />
                  <p>
                    Hanya untuk dewan guru MA Darunnajah 9. Siswa tidak dapat mendaftar tanpa kode otorisasi resmi sekolah.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className={`w-full ${
                mode === "daftar" && role === "teacher"
                  ? "btn-sigma !bg-[#ffd600] !text-slate-950 hover:!bg-[#ffd600]/90 !shadow-[0_0_25px_rgba(255,214,0,0.5)]"
                  : "btn-sigma"
              }`}
              data-testid="auth-submit-button"
            >
              {busy ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <ArrowRight size={17} />
              )}
              {mode === "masuk"
                ? "Masuk ke SIGMA"
                : role === "teacher"
                ? "Daftar Akun Guru"
                : "Daftar Akun Siswa"}
            </button>
          </form>

          {mode === "masuk" ? (
            <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-slate-500 dark:text-slate-400">
              <p>Belum memiliki akun?</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMode("daftar");
                    setRole("student");
                  }}
                  className="font-semibold text-cyan-600 dark:text-cyan-400 transition-colors hover:underline"
                  data-testid="link-register-student"
                >
                  Daftar Siswa
                </button>
                <span className="text-slate-400">·</span>
                <button
                  type="button"
                  onClick={() => {
                    setMode("daftar");
                    setRole("teacher");
                  }}
                  className="font-semibold text-amber-600 dark:text-amber-400 transition-colors hover:underline"
                  data-testid="link-register-teacher"
                >
                  Daftar Akun Guru
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setMode("masuk")}
              className={`mt-6 w-full text-center text-sm transition-colors ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-950"
              }`}
              data-testid="auth-toggle-mode"
            >
              Sudah punya akun?{" "}
              <span className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                Masuk di sini
              </span>
            </button>
          )}

          <div
            className={`mt-8 flex items-start gap-3 rounded-2xl border p-4 ${
              mode === "daftar" && role === "teacher"
                ? "border-amber-400/30 bg-amber-400/[0.06]"
                : isDark
                ? "border-white/10 bg-slate-900/50"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <GraduationCap
              size={18}
              className={`mt-0.5 shrink-0 ${
                mode === "daftar" && role === "teacher"
                  ? "text-amber-500"
                  : isDark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            />
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {mode === "daftar" && role === "teacher"
                ? "Akun guru memiliki akses penuh ke Dashboard Guru, pengelolaan materi slide, bank soal kuis, serta moderasi forum diskusi kelas."
                : "Guru dan siswa masuk melalui halaman ini. Sistem akan otomatis mengarahkan ke dashboard yang sesuai dengan peran akun Anda."}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
