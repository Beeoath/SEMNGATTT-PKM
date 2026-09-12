import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, Send } from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { ProgressBar } from "../components/Primitives";
import { useTheme } from "../lib/theme";

export default function Quiz() {
  const { id, moduleId } = useParams();
  const currentId = moduleId || id;
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const moduleData = MODULES.find((m) => m.id === currentId) || MODULES[0];
  const questions = moduleData.quiz;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const q = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = (optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question, idx) => {
      if (selectedAnswers[idx] === question.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    sessionStorage.setItem(
      `quiz_result_${moduleData.id}`,
      JSON.stringify({
        score,
        correctCount,
        total: questions.length,
        selectedAnswers,
        completedAt: new Date().toISOString(),
      })
    );

    navigate(`/app/hasil-kuis/${moduleData.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-0">
      <div className="flex items-center justify-between">
        <Link
          to={`/app/modul/${moduleData.id}`}
          className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
            isDark ? "text-slate-300 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-600"
          }`}
        >
          <ArrowLeft size={16} /> Batal Kuis
        </Link>
        <span
          className={`font-mono text-xs font-bold ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Soal {currentIdx + 1} dari {questions.length}
        </span>
      </div>

      <ProgressBar progress={progress} color="#00F0FF" />

      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 transition-all ${
          isDark
            ? "border-white/15 bg-[#0d1430]/90 text-slate-100"
            : "border-slate-200 bg-white text-slate-900 shadow-xl"
        }`}
      >
        <div>
          <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            {moduleData.title}
          </span>
          <h2
            className={`mt-2 text-base sm:text-lg font-bold leading-relaxed ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {q.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const letters = ["A", "B", "C", "D", "E"];

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelect(optIdx)}
                className={`w-full text-left flex items-center gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? "border-cyan-400 bg-cyan-400/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "border-cyan-600 bg-cyan-50 text-cyan-950 font-medium shadow-sm"
                    : isDark
                    ? "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${
                    isSelected
                      ? "bg-cyan-400 text-slate-950 font-black"
                      : isDark
                      ? "bg-white/10 text-slate-300"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {letters[optIdx]}
                </span>
                <span className="text-sm font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div
          className={`flex items-center justify-between pt-6 border-t ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <button
            type="button"
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark
                ? "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                : "border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            Sebelumnya
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedAnswers[currentIdx] === undefined}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-black shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-400/20"
                  : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20"
              }`}
            >
              <Send size={15} /> Selesaikan Kuis
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentIdx((prev) => prev + 1)}
              disabled={selectedAnswers[currentIdx] === undefined}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-black shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-400/20"
                  : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20"
              }`}
            >
              Soal Selanjutnya
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
