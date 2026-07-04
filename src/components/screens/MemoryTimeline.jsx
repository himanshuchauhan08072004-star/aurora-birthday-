import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { config } from "../../utils/config";

const cardVariants = {
  hidden: (fromLeft) => ({
    opacity: 0,
    x: fromLeft ? -60 : 60,
    y: 30,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

function TypewriterText({ text, active }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <p className="mt-2 font-body text-sm leading-relaxed text-plum/70">
      {typed}
      {active && typed.length < text.length && (
        <motion.span
          className="ml-0.5 inline-block h-4 w-[2px] bg-plum/70 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </p>
  );
}

function MemoryCard({ memory, index }) {
  const fromLeft = index % 2 === 0;
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });

  return (
    <div className="relative flex w-full items-center justify-center">
      {/* Node on the spine */}
      <div className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(216,178,106,0.8)] md:block" />

      <motion.div
        ref={cardRef}
        custom={fromLeft}
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className={`glass flex w-full flex-col items-center gap-6 rounded-3xl p-6 shadow-xl shadow-plum/10 sm:p-7 md:w-[80%] lg:w-[70%] ${
          fromLeft ? "sm:flex-row" : "sm:flex-row-reverse"
        }`}
      >
        {/* Photo with dark circular backdrop */}
        <div className="relative flex h-52 w-52 shrink-0 items-center justify-center sm:h-60 sm:w-60">
          <div className="absolute inset-0 rounded-full bg-plum-dark" />
          <div className="absolute inset-3 rounded-full bg-plum/70 blur-[1px]" />
          <motion.img
            src={memory.image}
            alt={memory.title}
            loading="lazy"
            className="relative h-[88%] w-[88%] rounded-full object-cover shadow-lg"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Text beside the image */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-display text-2xl text-plum">{memory.title}</h3>
          <TypewriterText text={memory.description} active={inView} />
        </div>
      </motion.div>
    </div>
  );
}

export default function MemoryTimeline({ onNext }) {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-24 sm:px-10"
      style={{ background: "linear-gradient(160deg, #FFF3F6 0%, #FCDCE6 55%, #F6C4D4 100%)" }}
    >
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-rose/30 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[110px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-plum/50"
        >
          OUR STORY
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl text-plum sm:text-5xl"
        >
          A Few Moments We Kept
        </motion.h2>
      </div>

      {/* Spine */}
      <div className="relative mx-auto mt-20 flex max-w-5xl flex-col gap-14 md:gap-20">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent md:block" />
        {config.memories.map((memory, i) => (
          <MemoryCard key={memory.title} memory={memory} index={i} />
        ))}
      </div>

      {onNext && (
        <div className="relative mt-20 flex justify-center">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-plum px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-cream shadow-lg shadow-plum/20"
          >
            Continue →
          </motion.button>
        </div>
      )}
    </section>
  );
}
