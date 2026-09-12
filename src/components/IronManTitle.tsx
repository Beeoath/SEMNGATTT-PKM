import React, { useState } from "react";
import { motion } from "framer-motion";

interface IronManTitleProps {
  text?: string;
  className?: string;
}

export const IronManTitle: React.FC<IronManTitleProps> = ({
  text = "SIAP MASUK?",
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none w-full max-w-md mx-auto ${className}`}
      aria-label={text}
    >
      {/* 3D Model Render of Title - Marvel Agent Carter Style */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative flex items-center justify-center group"
      >
        {/* 3D Agent Carter Render Image */}
        {!imgError ? (
          <img
            src="/assets/siap_masuk_carter_clean.png"
            alt={text}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[400px] max-h-[85px] sm:max-h-[110px] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] filter contrast-125 brightness-105 hover:brightness-120 transition-all duration-300"
          />
        ) : (
          /* High-Fidelity CSS/SVG 3D Brushed Steel Agent Carter Fallback */
          <div className="relative flex items-center justify-center py-2">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.95)]"
              style={{
                fontFamily: "'Bebas Neue', 'Antonio', sans-serif",
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, #e2e8f0 25%, #94a3b8 50%, #cbd5e1 65%, #475569 85%, #1e293b 100%)",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
                letterSpacing: "0.06em",
                transform: "scaleY(1.3)",
              }}
            >
              {text}
            </h2>
          </div>
        )}
      </motion.div>
    </div>
  );
};
