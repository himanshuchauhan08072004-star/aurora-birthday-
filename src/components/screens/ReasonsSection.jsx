import { motion } from "framer-motion";
import { config } from "../../utils/config";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// A distinct accent per card so the grid feels varied and colorful, not uniform
const ACCENTS = [
  { glow: "#F2A9C4", ring: "from-rose to-blush" },
  { glow: "#D8B26A", ring: "from-gold to-blush" },
  { glow: "#B89AF2", ring: "from-lavender to-rose" },
  { glow: "#F28FAE", ring: "from-rose to-gold" },
  { glow: "#7ED9C6", ring: "from-lavender to-gold" },
  { glow: "#F2C14E", ring: "from-gold to-lavender" },
];

export default function ReasonsSection() {
  return (
    <section className="relative w-full bg-cream px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-plum/50"
        >
          JUST A FEW REASONS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl italic text-gradient sm:text-5xl"
        >
          Why You're Amazing
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {config.reasons.map((reason, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <motion.div
              key={reason.title}
              variants={item}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative rounded-[1.75rem] p-[2px]"
              style={{ background: `linear-gradient(135deg, ${accent.glow}, transparent 60%)` }}
            >
              <div className="glass relative overflow-hidden rounded-[1.7rem] p-8 text-center shadow-lg shadow-plum/10">
                <div
                  className="pointer-events-none absolute -inset-1 rounded-[1.7rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 70%)` }}
                />
                <motion.span
                  className="relative block text-5xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {reason.emoji}
                </motion.span>
                <h3
                  className="relative mt-5 font-display text-2xl font-semibold italic"
                  style={{ color: accent.glow, filter: "brightness(0.75)" }}
                >
                  {reason.title}
                </h3>
                <p className="relative mt-2 font-body text-sm leading-relaxed text-plum/70">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
