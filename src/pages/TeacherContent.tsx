import React, { useState } from "react";
import { Layers, Plus, Edit, Trash2, BookOpen, Clock, Zap, Check } from "lucide-react";
import { toast } from "sonner";
import { MODULES, DISTRICTS, SigmaModule } from "../lib/sigmaData";
import { Badge } from "../components/Primitives";
import { useTheme } from "../lib/theme";

export default function TeacherContent() {
  const { isDark } = useTheme();
  const [modulesList, setModulesList] = useState<SigmaModule[]>(MODULES);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  const filtered =
    selectedDistrict === 0
      ? modulesList
      : modulesList.filter((m) => m.districtId === selectedDistrict);

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 sm:py-6 px-3 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="yellow">
            <Layers size={12} /> BANK MATERI &amp; KURIKULUM
          </Badge>
          <h1
            className={`mt-2 font-display text-2xl sm:text-3xl font-black ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Kelola Modul Pembelajaran SIGMA
          </h1>
          <p
            className={`mt-0.5 text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Atur materi slide teori, bank soal kuis, dan bobot XP untuk siswa Kelas 11 MA Darunnajah 9.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.info("Fitur penambahan modul dibuka pada semester ganjil mendatang.")
          }
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black shadow-lg bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-400/20 hover:scale-105 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} /> Buat Modul Baru
        </button>
      </div>

      {/* District Filter Tabs */}
      <div
        className={`flex flex-wrap items-center gap-2 border-b pb-3 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <button
          type="button"
          onClick={() => setSelectedDistrict(0)}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            selectedDistrict === 0
              ? isDark
                ? "bg-white/15 text-white"
                : "bg-slate-900 text-white"
              : isDark
              ? "text-slate-400 hover:text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Semua Distrik ({modulesList.length})
        </button>
        {DISTRICTS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelectedDistrict(d.id)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              selectedDistrict === d.id
                ? "bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {d.name.split("&")[0]}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filtered.map((mod) => (
          <div
            key={mod.id}
            className={`rounded-2xl border p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              isDark
                ? "border-white/10 bg-[#0d1430]/80 text-slate-100"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">
                {mod.districtName}
              </span>
              <h3
                className={`font-display text-base sm:text-lg font-bold ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                {mod.title}
              </h3>
              <p
                className={`text-xs max-w-xl ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {mod.description}
              </p>
              <div
                className={`flex items-center gap-3 pt-2 text-[11px] font-mono ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {mod.durationMinutes} Menit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Zap size={12} /> +{mod.xpReward} XP
                </span>
                <span>•</span>
                <span>{mod.slides.length} Slide</span>
                <span>•</span>
                <span>{mod.quiz.length} Soal Kuis</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => toast.success("Materi siap dipublikasikan ke siswa.")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  isDark
                    ? "border-white/10 text-slate-200 hover:text-white hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <Edit size={14} /> Edit Materi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
