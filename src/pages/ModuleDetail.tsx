import React from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, Play, CheckCircle, ArrowLeft, Clock, Zap, Shield } from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { Badge } from "../components/Primitives";
import { useTheme } from "../lib/theme";

export default function ModuleDetail() {
  const { id, moduleId } = useParams();
  const currentId = moduleId || id;
  const { isDark } = useTheme();
  const moduleData = MODULES.find((m) => m.id === currentId) || MODULES[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 sm:py-6 px-3 sm:px-0">
      <Link
        to="/app/dashboard"
        className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
          isDark ? "text-slate-300 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-600"
        }`}
      >
        <ArrowLeft size={16} /> Kembali ke Dashboard
      </Link>

      <div
        className={`rounded-3xl border p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all ${
          isDark
            ? "border-white/15 bg-[#0d1430]/90 text-slate-100"
            : "border-slate-200 bg-white text-slate-900 shadow-xl"
        }`}
      >
        <Badge variant="cyan">{moduleData.districtName}</Badge>

        <h1
          className={`mt-3 font-display text-2xl sm:text-4xl font-black leading-tight ${
            isDark ? "text-white" : "text-slate-950"
          }`}
        >
          {moduleData.title}
        </h1>
        <p
          className={`mt-2 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {moduleData.description}
        </p>

        <div
          className={`mt-6 flex flex-wrap items-center gap-4 text-xs font-mono border-y py-3 ${
            isDark ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-500"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-cyan-500" /> {moduleData.durationMinutes} Menit
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500" /> +{moduleData.xpReward} XP Reward
          </span>
          <span>•</span>
          <span>{moduleData.slides.length} Slide Teori</span>
          <span>•</span>
          <span>{moduleData.quiz.length} Soal Uji Pemahaman</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={`/app/materi/${moduleData.id}`}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black shadow-lg transition-all cursor-pointer ${
              isDark
                ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-400/20"
                : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20"
            }`}
          >
            <Play size={15} fill="currentColor" />
            Mulai Belajar Materi
          </Link>
          <Link
            to={`/app/kuis/${moduleData.id}`}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isDark
                ? "border-white/15 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10"
                : "border-slate-300 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 shadow-sm"
            }`}
          >
            Langsung Uji Kuis
          </Link>
        </div>
      </div>

      {/* Curriculum breakdown */}
      <div className="space-y-3">
        <h3
          className={`font-display text-lg font-bold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Sub-Topik Pembelajaran
        </h3>
        <div className="space-y-2.5">
          {moduleData.slides.map((s, idx) => (
            <div
              key={s.id}
              className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                isDark
                  ? "border-white/10 bg-[#0a0f24]/60"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg font-mono text-xs font-bold ${
                    isDark ? "bg-cyan-400/10 text-cyan-300" : "bg-cyan-50 text-cyan-700"
                  }`}
                >
                  {idx + 1}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </span>
              </div>
              <Link
                to={`/app/materi/${moduleData.id}?slide=${idx}`}
                className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Baca Slide
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
