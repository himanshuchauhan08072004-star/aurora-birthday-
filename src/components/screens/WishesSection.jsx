import { useMemo } from "react";
import { motion } from "framer-motion";
import { config } from "../../utils/config";
import MagicalBackground from "../ui/MagicalBackground";

function HeartParticle({ left, delay, duration, size }) {
  return (
    <motion.span
      className="absolute bottom-0 text-rose/70"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: "-110vh", opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      ❤
    </motion.span>
  );
}

export default function WishesSection() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 8,
        size: Math.random() * 12 + 10,
      })),
    []
  );

  return (
    <section className="relative w-full overflow-hidden bg-plum-gradient px-6 py-28 sm:px-10">
      <MagicalBackground variant="dark" starCount={60} />
      {hearts.map((h) => (
        <HeartParticle key={h.id} {...h} />
      ))}

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-gold/80"
        >
          WISHES FOR YOU
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl text-cream sm:text-5xl"
        >
          As You Begin This New Year
        </motion.h2>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-2xl flex-col gap-8">
        {config.wishes.map((wish, i) => (
          <motion.p
            key={wish}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className={`font-display text-xl leading-relaxed text-cream/90 sm:text-2xl ${
              i % 2 === 0 ? "text-left sm:pr-10" : "text-right sm:pl-10"
            }`}
          >
            {wish}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
