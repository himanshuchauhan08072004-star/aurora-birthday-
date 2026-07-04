import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import MagicalBackground from "../ui/MagicalBackground";
import { config } from "../../utils/config";

const BALLOON_COLORS = ["#F2A9C4", "#D8B26A", "#E3DDF7", "#FFD9E3"];

function Balloon({ left, delay, duration, color, size }) {
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${left}%` }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: "-130vh", opacity: [0, 1, 1, 0.9] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ x: [0, 12, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="rounded-[50%_50%_50%_50%/_60%_60%_40%_40%] shadow-lg"
          style={{ width: size, height: size * 1.2, background: color }}
        />
        <div className="mx-auto h-14 w-px bg-plum/30" />
      </motion.div>
    </motion.div>
  );
}

function HeartFloat({ left, delay, duration, size }) {
  return (
    <motion.span
      className="pointer-events-none absolute bottom-0 text-rose/80"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      ❤
    </motion.span>
  );
}

export default function FinalSurprise({ onReplay }) {
  const hasFired = useRef(false);

  const balloons = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 90 + 2,
        delay: Math.random() * 4,
        duration: Math.random() * 5 + 9,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        size: Math.random() * 20 + 44,
      })),
    []
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 8,
        size: Math.random() * 14 + 14,
      })),
    []
  );

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    const colors = ["#F2A9C4", "#D8B26A", "#E3DDF7", "#FFFFFF"];

    // Emoji-shaped burst: hand-heart + bow, in place of generic confetti squares
    const handHeart = confetti.shapeFromText({ text: "🫶", scalar: 3 });
    const bow = confetti.shapeFromText({ text: "🎀", scalar: 3 });

    confetti({
      particleCount: 40,
      spread: 100,
      origin: { y: 0.5 },
      shapes: [handHeart, bow],
      scalar: 2.4,
      gravity: 0.6,
      ticks: 260,
    });

    const duration = 2500;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors, shapes: [handHeart, bow], scalar: 2 });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors, shapes: [handHeart, bow], scalar: 2 });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({ particleCount: 140, spread: 120, origin: { y: 0.5 }, colors, startVelocity: 50 });
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <MagicalBackground variant="light" starCount={50} />

      {balloons.map((b) => (
        <Balloon key={b.id} {...b} />
      ))}
      {hearts.map((h) => (
        <HeartFloat key={h.id} {...h} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 flex max-w-2xl flex-col items-center"
      >
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          🫶
        </motion.span>

        <h2 className="mt-6 font-display text-4xl text-plum sm:text-6xl">
          {config.finalMessage.heading}
        </h2>

        <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-plum/75 sm:text-xl">
          {config.finalMessage.body}
        </p>

        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative mt-10 overflow-hidden rounded-full bg-plum px-9 py-4 font-body text-sm font-semibold tracking-wide text-cream shadow-lg shadow-plum/30 sm:text-base"
        >
          <span className="relative z-10">{config.finalMessage.replayLabel}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>
      </motion.div>
    </section>
  );
}
