import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { config } from "../../utils/config";

const CANDLE_COUNT = 5;
const CANDLE_X = [-64, -32, 0, 32, 64];

function Flame({ lit }) {
  return (
    <AnimatePresence>
      {lit && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 4 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1], y: 0 }}
          exit={{ opacity: 0, scale: 0, y: -6, transition: { duration: 0.35 } }}
          transition={{ scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <div
            className="h-4 w-3 rounded-[50%_50%_50%_50%/_65%_65%_35%_35%] bg-gradient-to-t from-gold via-rose to-cream"
            style={{ filter: "drop-shadow(0 0 6px rgba(216,178,106,0.9))" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Petal({ left, delay, duration, emoji, size, drift }) {
  return (
    <motion.span
      className="pointer-events-none absolute top-0"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        x: [0, drift, -drift, 0],
        opacity: [0, 1, 1, 0.8],
        rotate: 360,
      }}
      transition={{ duration, delay, ease: "linear" }}
    >
      {emoji}
    </motion.span>
  );
}

function PetalRain() {
  const petals = useMemo(() => {
    const kinds = ["🌹", "🌸", "🌷", "🏵️"]; // red rose, pink rose, tulip, lily
    return Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: Math.random() * 3 + 4,
      emoji: kinds[i % kinds.length],
      size: Math.random() * 14 + 18,
      drift: Math.random() * 40 + 10,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  );
}

function Firework({ x, y, color, delay }) {
  const particles = 12;
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 1.6 }}
    >
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ background: color }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * 60,
              y: Math.sin(angle) * 60,
              opacity: 0,
            }}
            transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
          />
        );
      })}
    </motion.div>
  );
}

export default function CakeSection({ onCelebrated }) {
  const [lit, setLit] = useState(() => new Set());
  const [blown, setBlown] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const wasAllLit = useRef(false);
  const audioRef = useRef(null);

  const allLit = lit.size === CANDLE_COUNT;

  useEffect(() => {
    if (allLit && !wasAllLit.current && !blown) {
      setShowPetals(true);
      const t = setTimeout(() => setShowPetals(false), 4200);
      return () => clearTimeout(t);
    }
    wasAllLit.current = allLit;
  }, [allLit, blown]);

  const toggleCandle = (i) => {
    if (blown) return;
    setLit((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const fireConfetti = () => {
    const colors = ["#F2A9C4", "#D8B26A", "#E3DDF7", "#FFFFFF"];
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
    confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
  };

  const blowCandles = () => {
    if (!allLit || blown) return;
    setBlown(true);
    fireConfetti();
    audioRef.current?.play().catch(() => {});
    onCelebrated?.();
  };

  const fireworks = useMemo(
    () => [
      { x: 20, y: 20, color: "#F2A9C4", delay: 0 },
      { x: 75, y: 15, color: "#D8B26A", delay: 0.3 },
      { x: 50, y: 30, color: "#E3DDF7", delay: 0.6 },
      { x: 30, y: 45, color: "#FFFFFF", delay: 0.9 },
      { x: 80, y: 40, color: "#F2A9C4", delay: 0.45 },
    ],
    []
  );

  return (
    <section className="relative w-full overflow-hidden bg-plum-gradient px-6 py-24 sm:px-10">
      {showPetals && <PetalRain />}
      {blown &&
        fireworks.map((f, i) => <Firework key={i} {...f} />)}

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-gold/80"
        >
          MAKE A WISH
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl text-cream sm:text-5xl"
        >
          {blown ? "Happy Birthday!" : "Light Every Candle"}
        </motion.h2>
        <p className="mt-3 font-body text-sm text-cream/60">
          {blown
            ? "I hope your wish comes true."
            : allLit
            ? "All lit — now blow them out."
            : "Tap each candle to light it."}
        </p>
      </div>

      {/* Cake */}
      <div className="relative mx-auto mt-16 flex justify-center">
        <svg width="260" height="220" viewBox="0 0 260 220" className="overflow-visible">
          {/* Candles */}
          {CANDLE_X.map((cx, i) => (
            <g key={i} transform={`translate(${130 + cx}, 60)`}>
              <foreignObject x="-10" y="-24" width="20" height="24" style={{ overflow: "visible" }}>
                <div className="relative flex justify-center">
                  <Flame lit={lit.has(i) && !blown} />
                </div>
              </foreignObject>
              <rect
                x="-3.5"
                y="0"
                width="7"
                height="26"
                rx="2"
                fill={i % 2 === 0 ? "#F2A9C4" : "#E3DDF7"}
              />
            </g>
          ))}

          {/* Top tier */}
          <rect x="70" y="86" width="120" height="46" rx="10" fill="#FFF8F2" />
          <path d="M70 96 Q95 84 130 96 Q165 84 190 96 V132 H70 Z" fill="#FFD9E3" opacity="0.9" />

          {/* Bottom tier */}
          <rect x="35" y="132" width="190" height="66" rx="12" fill="#F2A9C4" />
          <path d="M35 144 Q75 128 130 144 Q185 128 225 144 V198 H35 Z" fill="#E3DDF7" opacity="0.85" />

          {/* Plate */}
          <ellipse cx="130" cy="202" rx="118" ry="10" fill="#D8B26A" opacity="0.5" />
        </svg>
      </div>

      {/* Candle tap targets (overlaid, larger hit area) */}
      <div className="relative mx-auto -mt-[150px] flex w-[260px] justify-between px-[38px]">
        {CANDLE_X.map((_, i) => (
          <button
            key={i}
            onClick={() => toggleCandle(i)}
            aria-label={`Light candle ${i + 1}`}
            disabled={blown}
            className="h-10 w-8 -translate-y-2 rounded-full"
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <motion.button
          onClick={blowCandles}
          disabled={!allLit || blown}
          whileHover={allLit && !blown ? { scale: 1.05 } : {}}
          whileTap={allLit && !blown ? { scale: 0.95 } : {}}
          animate={
            allLit && !blown
              ? { boxShadow: ["0 0 0px rgba(216,178,106,0.4)", "0 0 24px rgba(216,178,106,0.7)", "0 0 0px rgba(216,178,106,0.4)"] }
              : {}
          }
          transition={{ duration: 1.6, repeat: allLit && !blown ? Infinity : 0 }}
          className={`rounded-full px-9 py-4 font-body text-sm font-semibold tracking-wide transition-colors sm:text-base ${
            allLit && !blown
              ? "bg-gold text-plum-dark"
              : "cursor-not-allowed bg-cream/10 text-cream/40"
          }`}
        >
          {blown ? "Wish Made ✨" : "Blow the Candles"}
        </motion.button>
      </div>

      <audio ref={audioRef} src={config.music} loop />
    </section>
  );
}
