import { motion } from "framer-motion";
import MagicalBackground from "../ui/MagicalBackground";
import { config } from "../../utils/config";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function WelcomeScreen({ onOpen }) {
  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.8 }}
    >
      <MagicalBackground variant="light" starCount={45} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="mb-4 font-body text-xs tracking-[0.35em] text-plum/50"
        >
          FOR {config.recipientName.toUpperCase()}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.95] text-plum sm:text-6xl md:text-7xl"
        >
          {config.welcome.heading}
          <motion.span
            className="ml-3 inline-block"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-md font-body text-base text-plum/70 sm:text-lg"
        >
          {config.welcome.subheading}
        </motion.p>

        {/* Hero image */}
        <motion.div
          variants={item}
          className="relative mt-10 h-80 w-64 sm:h-[30rem] sm:w-80"
        >
          <motion.div
            className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-rose/50 to-lavender/60 blur-2xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="glass h-full w-full overflow-hidden rounded-[2rem] p-2 shadow-2xl shadow-plum/20"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={config.welcome.heroImage}
              alt="A beautiful memory"
              className="h-full w-full rounded-[1.5rem] object-cover"
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.button
          variants={item}
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative mt-12 overflow-hidden rounded-full bg-plum px-9 py-4 font-body text-sm font-semibold tracking-wide text-cream shadow-lg shadow-plum/30 sm:text-base"
        >
          <span className="relative z-10 flex items-center gap-2">
            {config.welcome.ctaLabel}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </span>
          {/* ripple sheen */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
