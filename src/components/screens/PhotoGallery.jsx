import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { config } from "../../utils/config";
import MagicalBackground from "../ui/MagicalBackground";

// Different reveal/hover personalities cycled per photo so the grid doesn't feel uniform
const POP_VARIANTS = [
  { // rise + zoom
    hidden: { opacity: 0, y: 30, scale: 0.92 },
    show: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.05, y: -6 },
  },
  { // rotate in
    hidden: { opacity: 0, rotate: -6, scale: 0.9 },
    show: { opacity: 1, rotate: 0, scale: 1 },
    hover: { rotate: -2, scale: 1.04 },
  },
  { // slide from side
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 },
    hover: { scale: 1.06, rotate: 1 },
  },
  { // flip
    hidden: { opacity: 0, rotateY: 40, scale: 0.94 },
    show: { opacity: 1, rotateY: 0, scale: 1 },
    hover: { scale: 1.05, rotateY: -3 },
  },
];

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const photos = config.gallery;

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setActiveIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  const cardMeta = useMemo(
    () => photos.map((_, i) => POP_VARIANTS[i % POP_VARIANTS.length]),
    [photos]
  );

  return (
    <section className="relative w-full overflow-hidden px-6 py-24 sm:px-10">
      {/* Magical shifting background */}
      <div className="absolute inset-0 -z-10">
        <MagicalBackground variant="light" starCount={35} />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(242,169,196,0.25), transparent 55%)",
              "radial-gradient(circle at 80% 40%, rgba(216,178,106,0.22), transparent 55%)",
              "radial-gradient(circle at 40% 80%, rgba(227,221,247,0.3), transparent 55%)",
              "radial-gradient(circle at 20% 30%, rgba(242,169,196,0.25), transparent 55%)",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-plum/50"
        >
          IN PICTURES
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl text-plum sm:text-5xl"
        >
          Little Pieces of Us
        </motion.h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl columns-2 gap-4 [perspective:1000px] sm:columns-3 sm:gap-5 lg:columns-4 [&>*]:mb-4 sm:[&>*]:mb-5">
        {photos.map((src, i) => {
          const v = cardMeta[i];
          return (
            <motion.button
              key={src + i}
              onClick={() => setActiveIndex(i)}
              variants={v}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-lg shadow-plum/10"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-plum/0 transition-colors duration-300 group-hover:bg-plum/20" />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-plum-dark/90 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-cream transition hover:bg-white/20"
            >
              <FiX size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream transition hover:bg-white/20 sm:left-6"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream transition hover:bg-white/20 sm:right-6"
            >
              <FiChevronRight size={22} />
            </button>

            <motion.img
              key={activeIndex}
              src={photos[activeIndex]}
              alt=""
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
