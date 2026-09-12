import React from "react";
import { Loader2 } from "lucide-react";

export interface LoaderProps {
  label?: string;
  size?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  label = "Memuat data...",
  size = 28,
  className = "",
}) => {
  return (
    <div className={`flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center p-6 ${className}`}>
      <div className="relative">
        <div className="absolute -inset-2 rounded-full bg-cyan-500/20 blur-md animate-pulse" />
        <Loader2 size={size} className="animate-spin text-cyan-400 relative z-10" />
      </div>
      {label && (
        <p className="font-mono text-xs font-semibold tracking-wider text-slate-400 animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "cyan" | "yellow" | "magenta" | "purple" | "emerald" | "slate";
  className?: string;
}> = ({ children, variant = "cyan", className = "" }) => {
  const styles = {
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]",
    yellow: "border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.2)]",
    magenta: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300 shadow-[0_0_12px_rgba(217,70,239,0.2)]",
    purple: "border-purple-400/30 bg-purple-400/10 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]",
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]",
    slate: "border-white/10 bg-white/5 text-slate-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const ProgressBar: React.FC<{
  progress: number;
  color?: string;
  className?: string;
}> = ({ progress, color = "#00F0FF", className = "" }) => {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${clamped}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
};
