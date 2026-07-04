import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { config } from "../../utils/config";

function LetterHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        top: Math.random() * 90 + 5,
        left: Math.random() * 90 + 5,
        size: Math.random() * 10 + 10,
        delay: Math.random() * 2,
        color: i % 2 === 0 ? "#F2A9C4" : "#E0455C",
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{ top: `${h.top}%`, left: `${h.left}%`, fontSize: h.size, color: h.color }}
          animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: h.delay, ease: "easeInOut" }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

function TypedLetter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState("");
  const fullText = config.letter.body;

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [inView, fullText]);

  const isDone = typed.length >= fullText.length;

  return (
    <div ref={ref} className="relative rounded-lg bg-[#FFFDF8] px-7 py-10 shadow-[0_20px_60px_-15px_rgba(59,28,50,0.35)] sm:px-14 sm:py-14">
      <LetterHearts />
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 34px, rgba(59,28,50,0.06) 35px)",
        }}
      />
      <p className="relative whitespace-pre-line font-script text-2xl leading-relaxed text-plum sm:text-3xl">
        {typed}
        {!isDone && (
          <motion.span
            className="ml-0.5 inline-block h-6 w-[2px] bg-plum align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </p>
      {isDone && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-8 text-right font-script text-2xl text-plum sm:text-3xl"
        >
          {config.letter.signature}
        </motion.p>
      )}
    </div>
  );
}

export default function BirthdayLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-24 sm:px-10"
      style={{ background: "linear-gradient(160deg, #FBE4EC 0%, #F6C9D8 55%, #F0AFC4 100%)" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/30 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-plum/60"
        >
          A LETTER FOR YOU
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl text-plum sm:text-5xl"
        >
          {opened ? "Before You Go On" : "A Letter Has Arrived"}
        </motion.h2>
        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-2 font-body text-sm text-plum/60"
          >
            Tap the heart to open it.
          </motion.p>
        )}
      </div>

      <div className="relative mx-auto mt-14 flex max-w-2xl justify-center" style={{ perspective: 1400 }}>
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative w-full max-w-sm"
              aria-label="Open the letter"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFF3F6] to-[#FBD9E4] shadow-2xl shadow-plum/30">
                <div
                  className="absolute inset-x-0 top-0 h-1/2 bg-[#F6C4D4]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 85%)" }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-3/5 bg-[#FDE8EF]"
                  style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 20%, 50% 70%, 0 20%)" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C4283E] text-2xl text-cream shadow-lg shadow-[#C4283E]/50 transition-transform duration-300 group-hover:scale-110"
                >
                  ❤
                </motion.div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <TypedLetter />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
