import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicalBackground from "../ui/MagicalBackground";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2600;

    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <MagicalBackground variant="light" starCount={55} />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Emblem */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-5xl"
        >
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-2xl sm:text-3xl text-plum tracking-wide text-center"
        >
          preparing something special
        </motion.h1>

        {/* Progress bar */}
        <div className="mt-10 w-64 sm:w-80">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-plum/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose via-gold to-lavender"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="mt-3 flex justify-between font-body text-xs tracking-widest text-plum/50">
            <span>LOADING</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={progress}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                {progress}%
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
