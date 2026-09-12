import React, { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Play,
  BookOpen,
} from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { useTheme } from "../lib/theme";

export default function Material() {
  const { id, moduleId } = useParams();
  const currentId = moduleId || id;
  const [searchParams] = useSearchParams();
  const initialSlide = parseInt(searchParams.get("slide") || "0", 10);
  const { isDark } = useTheme();

  const moduleData = MODULES.find((m) => m.id === currentId) || MODULES[0];
  const [currentSlideIdx, setCurrentSlideIdx] = useState(
    initialSlide >= 0 && initialSlide < moduleData.slides.length ? initialSlide : 0
  );
  const [showSolution, setShowSolution] = useState(false);

  const slide = moduleData.slides[currentSlideIdx];
  const progress = ((currentSlideIdx + 1) / moduleData.slides.length) * 100;
  const isLast = currentSlideIdx === moduleData.slides.length - 1;

  const nextSlide = () => {
    if (!isLast) {
      setCurrentSlideIdx((prev) => prev + 1);
      setShowSolution(false);
    }
  };

  const prevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx((prev) => prev - 1);
      setShowSolution(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 py-4 sm:py-6 px-3 sm:px-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/dashboard"
          className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
            isDark ? "text-slate-300 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-600"
          }`}
        >
          <ArrowLeft size={16} /> Keluar Materi
        </Link>
        <span
          className={`font-mono text-xs font-bold ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Slide {currentSlideIdx + 1} dari {moduleData.slides.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className={`w-full h-2 rounded-full overflow-hidden shadow-inner ${
          isDark ? "bg-[#14192b]" : "bg-slate-200"
        }`}
      >
        <div
          className="h-full bg-cyan-400 rounded-full shadow-[0_0_12px_#00f0ff] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Card */}
      <div
        className={`rounded-3xl border p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 transition-all ${
          isDark
            ? "border-cyan-500/20 bg-[#0c1226]/90 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            : "border-slate-200 bg-white text-slate-900 shadow-xl"
        }`}
      >
        <div>
          <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">
            {moduleData.title.split(":")[0]}
          </span>
          <h2
            className={`mt-1.5 font-display text-2xl sm:text-3xl font-black ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {slide.title}
          </h2>
        </div>

        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isDark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          {slide.content}
        </p>

        {/* Formula Box if available */}
        {slide.formula && (
          <div
            className={`rounded-2xl border p-5 text-center shadow-inner ${
              isDark
                ? "border-cyan-500/30 bg-[#091326] text-white"
                : "border-cyan-200 bg-cyan-50/60 text-slate-900"
            }`}
          >
            <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider block mb-2">
              RUMUS KUNCI
            </span>
            <div className="font-mono text-base sm:text-lg font-bold tracking-wide">
              {slide.formula}
            </div>
          </div>
        )}

        {/* Example Problem if available */}
        {slide.exampleProblem && (
          <div
            className={`rounded-2xl border p-5 space-y-3 ${
              isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-300">
              <HelpCircle size={14} /> Contoh Soal Pemahaman:
            </div>
            <p
              className={`text-sm font-medium ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              {slide.exampleProblem}
            </p>

            {showSolution ? (
              <div
                className={`rounded-xl border p-3.5 text-xs space-y-1 animate-in fade-in ${
                  isDark
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                    : "border-emerald-300 bg-emerald-50 text-emerald-900"
                }`}
              >
                <span className="font-bold block text-emerald-600 dark:text-emerald-400">
                  Penyelesaian:
                </span>
                <p>{slide.solution}</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSolution(true)}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Lihat Pembahasan Lengkap
              </button>
            )}
          </div>
        )}

        {/* Key Takeaways */}
        {slide.keyTakeaways && (
          <div
            className={`space-y-2.5 pt-2 border-t ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <span
              className={`font-mono text-xs font-bold uppercase ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              POIN PENTING:
            </span>
            <ul className="space-y-2">
              {slide.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-2.5 text-xs ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  <CheckCircle size={15} className="text-cyan-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Slide Navigation */}
        <div
          className={`flex items-center justify-between pt-6 border-t ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlideIdx === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer ${
              isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <ChevronLeft size={16} /> Sebelumnya
          </button>

          {isLast ? (
            <Link
              to={`/app/kuis/${moduleData.id}`}
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all cursor-pointer"
            >
              Uji Pemahaman (Kuis) <Play size={15} fill="currentColor" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={nextSlide}
              className="inline-flex items-center gap-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all cursor-pointer"
            >
              Lanjut <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
