import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    let lenis;
    let animId;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis?.raf(time);
        animId = requestAnimationFrame(raf);
      }

      animId = requestAnimationFrame(raf);
    } catch {
      // Graceful fallback if Lenis fails in iframe
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      lenis?.destroy();
    };
  }, []);
}
