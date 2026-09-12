import React, { useState } from "react";
import { motion } from "framer-motion";

interface JusticeLeagueTitleProps {
  initialMode?: string;
  size?: "sm" | "md" | "lg";
  showControls?: boolean;
  className?: string;
}

export const JusticeLeagueTitle: React.FC<JusticeLeagueTitleProps> = ({
  initialMode = "SIGMA",
  size = "md",
  showControls = false,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);
  const [currentText] = useState(initialMode);

  // Refined size styling maps - balanced proportion, impactful yet clean
  const sizeStyles = {
    sm: "max-h-[50px] sm:max-h-[62px] max-w-[210px] sm:max-w-[260px]",
    md: "max-h-[70px] sm:max-h-[88px] max-w-[290px] sm:max-w-[360px]",
    lg: "max-h-[105px] sm:max-h-[135px] max-w-[390px] sm:max-w-[480px]",
  };

  return (
    <div
      className={`relative inline-flex flex-col items-start justify-center select-none ${className}`}
      aria-label="SIGMA Title"
    >
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex items-center group"
      >
        {!imgError ? (
          <img
            src="/assets/sigma_justice_league.png"
            alt={currentText}
            onError={() => setImgError(true)}
            className={`w-auto h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-all duration-300 ${sizeStyles[size]}`}
          />
        ) : (
          /* High-Fidelity 3D Metallic Fallback */
          <div className="relative flex items-center py-1">
            <span
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-transparent bg-clip-text drop-shadow-[0_10px_25px_rgba(0,240,255,0.4)]"
              style={{
                fontFamily: "'Bebas Neue', 'Antonio', sans-serif",
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, #d4e7f5 30%, #7dbcdb 55%, #185a9d 78%, #0f2b48 100%)",
                WebkitTextStroke: "1px rgba(0, 240, 255, 0.4)",
                letterSpacing: "0.1em",
              }}
            >
              {currentText}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};


