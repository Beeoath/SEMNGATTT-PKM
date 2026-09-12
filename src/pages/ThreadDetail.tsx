import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp, Send, User, ShieldCheck } from "lucide-react";
import { INITIAL_DISCUSSIONS } from "../lib/sigmaData";
import { useAuth } from "../lib/auth";
import { useTheme } from "../lib/theme";

export default function ThreadDetail() {
  const { id, threadId } = useParams();
  const currentId = threadId || id;
  const { profile } = useAuth();
  const { isDark } = useTheme();

  const threads = (() => {
    try {
      const saved = localStorage.getItem("sigma_discussion_threads");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_DISCUSSIONS;
  })();

  const thread = threads.find((t: any) => t.id === currentId);

  const [replies, setReplies] = useState([
    {
      id: "rep-1",
      author: "Ust. Ahmad Fauzi, S.Pd.",
      role: "teacher",
      content:
        "Untuk mencari adjoin 3x3 secara cepat, ingat pola tanda kofaktor (+ - + / - + - / + - +) dan fokus langsung pada minor yang dibutuhkan untuk determinan utama.",
      createdAt: "2 jam lalu",
    },
  ]);
  const [newReply, setNewReply] = useState("");
  const [likes, setLikes] = useState(thread?.upvotes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  if (!thread) {
    return (
      <div className="space-y-6 max-w-xl mx-auto py-12 text-center px-4">
        <div
          className={`grid h-16 w-16 place-items-center rounded-2xl mx-auto ${
            isDark ? "bg-white/5 border border-white/10 text-slate-400" : "bg-slate-100 border border-slate-200 text-slate-500"
          }`}
        >
          <MessageSquare size={32} />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Topik Diskusi Tidak Ditemukan
        </h2>
        <p className={`text-xs max-w-sm mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          Topik diskusi ini mungkin telah dihapus, masih kosong, atau tautan yang Anda buka tidak valid.
        </p>
        <div>
          <Link
            to="/app/diskusi"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 text-slate-950 px-5 py-2.5 text-xs font-bold hover:bg-cyan-300 transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft size={14} /> Kembali ke Forum Diskusi
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((l: number) => l + 1);
      setHasLiked(true);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setReplies([
      ...replies,
      {
        id: `rep-${Date.now()}`,
        author: profile?.full_name || "Siswa MA Darunnajah 9",
        role: profile?.role || "student",
        content: newReply.trim(),
        createdAt: "Baru saja",
      },
    ]);
    setNewReply("");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-4 sm:py-6 px-3 sm:px-0">
      <Link
        to="/app/diskusi"
        className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
          isDark ? "text-slate-300 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-600"
        }`}
      >
        <ArrowLeft size={16} /> Kembali ke Daftar Forum
      </Link>

      {/* Main Post Card */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-4 transition-all ${
          isDark
            ? "border-white/15 bg-[#0d1430]/90 text-slate-100"
            : "border-slate-200 bg-white text-slate-900 shadow-xl"
        }`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="rounded-md bg-cyan-500/15 border border-cyan-400/30 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-300">
            {thread.category}
          </span>
          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            • Ditulis oleh {thread.authorName} ({thread.authorClass})
          </span>
        </div>

        <h1
          className={`font-display text-xl sm:text-2xl font-black ${
            isDark ? "text-white" : "text-slate-950"
          }`}
        >
          {thread.title}
        </h1>

        <p
          className={`text-sm sm:text-base leading-relaxed pt-1 ${
            isDark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          {thread.content}
        </p>

        <div
          className={`pt-4 border-t flex items-center justify-between ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <button
            type="button"
            onClick={handleLike}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              hasLiked
                ? "border border-cyan-400 bg-cyan-400/20 text-cyan-600 dark:text-cyan-300"
                : isDark
                ? "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ThumbsUp size={14} className={hasLiked ? "fill-cyan-400" : ""} /> {likes} Suka
          </button>
          <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {thread.createdAt}
          </span>
        </div>
      </div>

      {/* Responses List */}
      <div className="space-y-3">
        <h3
          className={`font-display text-base font-bold flex items-center gap-2 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          <MessageSquare size={16} className="text-cyan-500" /> Tanggapan ({replies.length})
        </h3>

        {replies.map((rep) => (
          <div
            key={rep.id}
            className={`rounded-2xl border p-4 sm:p-5 space-y-2 transition-all ${
              rep.role === "teacher"
                ? isDark
                  ? "border-amber-400/30 bg-amber-400/[0.04]"
                  : "border-amber-300 bg-amber-50/60 shadow-sm"
                : isDark
                ? "border-white/10 bg-[#0a0f24]/70"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {rep.author}
                </span>
                {rep.role === "teacher" && (
                  <span className="flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-600 dark:text-amber-300">
                    <ShieldCheck size={10} /> Guru
                  </span>
                )}
              </div>
              <span className={`font-mono text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {rep.createdAt}
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {rep.content}
            </p>
          </div>
        ))}
      </div>

      {/* Reply input */}
      <form onSubmit={handleSendReply} className="space-y-3">
        <textarea
          required
          rows={3}
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Tuliskan jawaban atau tanggapan Anda..."
          className={`w-full rounded-2xl border p-4 text-xs sm:text-sm leading-relaxed resize-none outline-none transition-all ${
            isDark
              ? "border-white/15 bg-black/40 text-white placeholder-slate-500 focus:border-cyan-400/50"
              : "border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-cyan-600 shadow-sm"
          }`}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black shadow-lg transition-all cursor-pointer ${
              isDark
                ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-400/20"
                : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20"
            }`}
          >
            <Send size={15} /> Kirim Balasan
          </button>
        </div>
      </form>
    </div>
  );
}
