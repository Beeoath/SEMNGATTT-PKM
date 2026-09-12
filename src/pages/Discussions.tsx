import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Plus,
  ThumbsUp,
  MessageCircle,
  Pin,
  Search,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Send,
  X,
  User,
} from "lucide-react";
import { INITIAL_DISCUSSIONS, DiscussionThread } from "../lib/sigmaData";
import { useAuth } from "../lib/auth";
import { StudentSpatialLayout } from "../components/StudentSpatialLayout";
import { useTheme } from "../lib/theme";

const DISCUSSIONS_STORAGE_KEY = "sigma_discussion_threads";

export default function Discussions() {
  const { profile } = useAuth();
  const { isDark } = useTheme();
  const [threads, setThreads] = useState<DiscussionThread[]>(() => {
    try {
      const saved = localStorage.getItem(DISCUSSIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_DISCUSSIONS;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua Kategori");
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Aljabar");
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const saveThreads = (newThreads: DiscussionThread[]) => {
    setThreads(newThreads);
    try {
      localStorage.setItem(DISCUSSIONS_STORAGE_KEY, JSON.stringify(newThreads));
    } catch {
      // ignore
    }
  };

  const categoryTabs = [
    { key: "Semua Kategori", label: "Semua Kategori" },
    { key: "Aljabar", label: "Aljabar & Matriks" },
    { key: "Fungsi", label: "Fungsi & Kalkulus" },
    { key: "Geometri", label: "Geometri & Vektor" },
    { key: "Trigonometri", label: "Trigonometri" },
    { key: "Statistika", label: "Statistika & Peluang" },
  ];

  const filtered = useMemo(() => {
    return threads.filter((t) => {
      if (activeCategory !== "Semua Kategori" && t.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          t.authorName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [threads, activeCategory, searchQuery]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const thread: DiscussionThread = {
      id: `thr-${Date.now()}`,
      authorName: profile?.full_name || "Siswa MA Darunnajah 9",
      authorRole: profile?.role || "student",
      authorClass: profile?.class_name || "Kelas 11 A",
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      repliesCount: 0,
      upvotes: 1,
      createdAt: "Baru saja",
    };

    const newThreads = [thread, ...threads];
    saveThreads(newThreads);
    setNewTitle("");
    setNewContent("");
    setIsCreating(false);
  };

  const handleToggleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setUpvotedIds((prev) => {
      const currentlyUpvoted = !!prev[id];
      const nextState = !currentlyUpvoted;

      const updated = threads.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            upvotes: nextState ? t.upvotes + 1 : Math.max(0, t.upvotes - 1),
          };
        }
        return t;
      });
      saveThreads(updated);

      return { ...prev, [id]: nextState };
    });
  };

  const pinnedThreads = threads.filter((t) => t.isPinned);

  return (
    <StudentSpatialLayout
      activeDockItem="discussions"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari topik diskusi, rumus KaTeX, pertanyaan TKA..."
      categoryTabs={categoryTabs}
      activeCategory={activeCategory}
      onSelectCategory={setActiveCategory}
    >
      <div className="space-y-6 sm:space-y-7">
        {/* ================================================================== */}
        {/* 1. FORUM HEADER HERO ROW                                           */}
        {/* ================================================================== */}
        <div
          className={`relative overflow-hidden rounded-[28px] sm:rounded-[34px] border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all ${
            isDark
              ? "border-white/[0.14] bg-gradient-to-r from-[#0d162d]/95 via-[#101b38]/85 to-[#0b1024]/90 text-white"
              : "border-slate-300 bg-gradient-to-r from-purple-50 via-white to-pink-50 text-slate-900 shadow-md"
          }`}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-purple-400/15 px-3 py-1 font-mono text-[11px] font-black text-purple-600 dark:text-purple-300 shadow-sm">
                  <MessageSquare size={13} /> FORUM MATEMATIKA TKA
                </span>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-300"
                      : "border-slate-300 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  Moderasi Guru Aktif
                </span>
              </div>

              <h1
                className={`font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                Ruang Tanya Guru &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
                  Diskusi Kelas
                </span>
              </h1>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Ajukan pertanyaan seputar soal TKA yang sulit, bagikan metode cepat, atau diskusikan
                pembuktian teorema matematika bersama guru dan teman sekelas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-black shadow-lg transition-all cursor-pointer shrink-0 ${
                isDark
                  ? "bg-white text-slate-950 shadow-white/20 hover:bg-slate-200 hover:scale-105"
                  : "bg-slate-950 text-white shadow-slate-950/20 hover:bg-slate-800 hover:scale-105"
              }`}
            >
              <Plus size={16} /> Buat Pertanyaan Baru
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. PINNED ANNOUNCEMENTS                                            */}
        {/* ================================================================== */}
        {pinnedThreads.length > 0 && (
          <div className="space-y-3">
            {pinnedThreads.map((pinned) => (
              <Link
                key={pinned.id}
                to={`/app/diskusi/${pinned.id}`}
                className={`block rounded-[24px] border p-5 backdrop-blur-xl shadow-md transition-all ${
                  isDark
                    ? "border-amber-400/30 bg-gradient-to-r from-amber-950/20 via-[#181308]/40 to-[#100c05]/50 hover:border-amber-400/60"
                    : "border-amber-300 bg-amber-50/70 hover:border-amber-400 text-slate-900"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-500 dark:text-amber-300 shadow-md">
                    <GraduationCap size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider">
                        <Pin size={11} /> Pengumuman Disematkan
                      </span>
                      <span
                        className={`text-xs ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        • {pinned.authorName}
                      </span>
                    </div>
                    <h4
                      className={`text-sm font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {pinned.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {pinned.content}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ================================================================== */}
        {/* 3. NEW THREAD CREATOR MODAL                                        */}
        {/* ================================================================== */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div
              className={`relative w-full max-w-xl rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl ${
                isDark
                  ? "border-white/20 bg-[#151829]/95 text-slate-100"
                  : "border-slate-300 bg-white text-slate-900"
              }`}
            >
              <div
                className={`flex items-center justify-between border-b pb-4 mb-4 ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-400/20 text-cyan-600 dark:text-cyan-300">
                    <MessageSquare size={16} />
                  </span>
                  <h3
                    className={`font-display text-lg font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Ajukan Pertanyaan Baru
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className={`cursor-pointer ${
                    isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label
                    className={`text-[11px] font-mono uppercase tracking-wider mb-1.5 block ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Kategori Materi
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className={`h-10 w-full rounded-xl border px-3 text-xs outline-none cursor-pointer ${
                      isDark
                        ? "border-white/15 bg-black/40 text-white focus:border-cyan-400/50"
                        : "border-slate-300 bg-slate-50 text-slate-900 focus:border-cyan-600"
                    }`}
                  >
                    <option value="Aljabar">Aljabar &amp; Matriks</option>
                    <option value="Fungsi">Fungsi &amp; Kalkulus</option>
                    <option value="Geometri">Geometri &amp; Vektor</option>
                    <option value="Trigonometri">Trigonometri</option>
                    <option value="Statistika">Statistika &amp; Peluang</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`text-[11px] font-mono uppercase tracking-wider mb-1.5 block ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Judul Pertanyaan / Soal
                  </label>
                  <input
                    required
                    placeholder="Contoh: Cara mencari determinan 3x3 dengan metode Sarrus..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className={`h-10 w-full rounded-xl border px-3.5 text-xs outline-none ${
                      isDark
                        ? "border-white/15 bg-black/40 text-white placeholder-slate-500 focus:border-cyan-400/50"
                        : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-cyan-600"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`text-[11px] font-mono uppercase tracking-wider mb-1.5 block ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Uraian Detail &amp; Bagian Rumus yang Ditanyakan
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Jelaskan kendalamu, tuliskan persamaannya, atau nomor soal yang sedang dicoba..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className={`w-full rounded-xl border p-3.5 text-xs leading-relaxed resize-none outline-none ${
                      isDark
                        ? "border-white/15 bg-black/40 text-white placeholder-slate-500 focus:border-cyan-400/50"
                        : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-cyan-600"
                    }`}
                  />
                </div>

                <div
                  className={`flex items-center justify-end gap-2.5 pt-2 border-t ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer ${
                      isDark
                        ? "border-white/15 text-slate-300 hover:text-white"
                        : "border-slate-300 text-slate-700 hover:text-slate-950"
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-black shadow-lg transition-all cursor-pointer ${
                      isDark
                        ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                        : "bg-cyan-600 text-white hover:bg-cyan-700"
                    }`}
                  >
                    <Send size={13} /> Publikasikan Pertanyaan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* 4. THREADS LIST                                                    */}
        {/* ================================================================== */}
        <div className="space-y-3.5">
          <div
            className={`flex items-center justify-between text-xs font-mono ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <span>Daftar Diskusi ({filtered.length} Topik)</span>
            <span>Urutkan: Terpopuler &amp; Terbaru</span>
          </div>

          {filtered.length === 0 ? (
            <div
              className={`rounded-[28px] border p-12 text-center space-y-3 ${
                isDark
                  ? "border-white/10 bg-[#161928]/40 text-slate-400"
                  : "border-slate-200 bg-white text-slate-600 shadow-sm"
              }`}
            >
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl border mx-auto ${
                  isDark
                    ? "bg-white/5 border-white/10 text-slate-400"
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}
              >
                <MessageSquare size={28} className="opacity-60" />
              </div>
              <p
                className={`text-base font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Forum Diskusi Masih Kosong
              </p>
              <p
                className={`text-xs max-w-md mx-auto leading-relaxed ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Belum ada topik diskusi yang diajukan. Siswa atau guru dapat membuat pertanyaan atau
                topik baru seputar persiapan TKA matematika.
              </p>
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className={`mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black shadow-lg transition-all cursor-pointer ${
                  isDark
                    ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                    : "bg-cyan-600 text-white hover:bg-cyan-700"
                }`}
              >
                <Plus size={15} /> Buat Pertanyaan Pertama
              </button>
            </div>
          ) : (
            filtered.map((thr) => {
              const isUpvoted = !!upvotedIds[thr.id];

              return (
                <Link
                  key={thr.id}
                  to={`/app/diskusi/${thr.id}`}
                  className={`group block rounded-[24px] border p-5 sm:p-6 backdrop-blur-xl shadow-lg transition-all duration-300 ${
                    isDark
                      ? "border-white/10 bg-[#161928]/70 hover:border-cyan-400/40 hover:bg-[#1a1f33]/85 text-slate-100"
                      : "border-slate-200 bg-white hover:border-cyan-500 hover:shadow-xl text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {thr.isPinned && (
                        <span className="flex items-center gap-1 rounded-md bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-300">
                          <Pin size={10} /> PINNED
                        </span>
                      )}
                      <span className="rounded-md bg-cyan-500/15 border border-cyan-400/25 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-600 dark:text-cyan-300">
                        {thr.category}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span
                        className={`text-xs font-semibold flex items-center gap-1.5 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        <span
                          className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold ${
                            isDark ? "bg-white/10 text-white" : "bg-slate-200 text-slate-900"
                          }`}
                        >
                          {thr.authorName.charAt(0)}
                        </span>
                        {thr.authorName} ({thr.authorClass})
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-mono shrink-0 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {thr.createdAt}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-base sm:text-lg font-bold transition-colors ${
                      isDark
                        ? "text-white group-hover:text-cyan-300"
                        : "text-slate-900 group-hover:text-cyan-600"
                    }`}
                  >
                    {thr.title}
                  </h3>

                  <p
                    className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {thr.content}
                  </p>

                  <div
                    className={`mt-4 pt-3.5 border-t flex items-center justify-between text-xs font-mono ${
                      isDark ? "border-white/5 text-slate-400" : "border-slate-100 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => handleToggleUpvote(thr.id, e)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-all cursor-pointer ${
                          isUpvoted
                            ? "bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40 font-bold"
                            : isDark
                            ? "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                        }`}
                      >
                        <ThumbsUp size={12} className={isUpvoted ? "fill-cyan-400 text-cyan-500" : ""} />
                        <span>{thr.upvotes} Dukungan</span>
                      </button>

                      <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                        <MessageCircle size={12} />
                        <span>{thr.repliesCount} Jawaban</span>
                      </span>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 group-hover:underline">
                      Lihat Diskusi &amp; Balasan →
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </StudentSpatialLayout>
  );
}
