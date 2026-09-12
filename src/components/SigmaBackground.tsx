import React from "react";
import { useTheme } from "../lib/theme";

interface SigmaBackgroundProps {
  density?: number;
  glyphs?: number;
  className?: string;
}

export const SigmaBackground: React.FC<SigmaBackgroundProps> = ({
  className = "",
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 transition-colors duration-500 ${
        isDark ? "bg-[#060813]" : "bg-[#f4f6fb]"
      } ${className}`}
      aria-hidden="true"
    >
      {isDark ? (
        <>
          {/* Deep cyber dark lighting */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-cyan-900/15 blur-[150px]" />
          <div className="absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-blue-950/25 blur-[160px]" />
          <div className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-950/25 blur-[160px]" />
        </>
      ) : (
        <>
          {/* Pristine bright academic lighting */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-sky-200/40 blur-[140px]" />
          <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-100/60 blur-[150px]" />
          <div className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-100/50 blur-[150px]" />
          {/* Very faint grid pattern in light mode for mathematical feel */}
          <div className="absolute inset-0 bg-[radial-gradient(#0284c7_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035]" />
        </>
      )}
    </div>
  );
};
