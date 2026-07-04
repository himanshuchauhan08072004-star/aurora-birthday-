import { useMemo } from "react";

/**
 * MagicalBackground — the signature atmosphere used across every screen.
 * variant "light": cream/blush/lavender dreamy gradient (day scenes)
 * variant "dark":  plum gradient with gold stars (night / cake / wishes scenes)
 */
export default function MagicalBackground({ variant = "light", starCount = 40 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      })),
    [starCount]
  );

  const isDark = variant === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-plum-gradient" : "bg-dreamy-gradient"
        }`}
      />

      {/* Glowing blobs */}
      <div
        className={`absolute -top-24 -left-20 h-72 w-72 rounded-full animate-glow ${
          isDark ? "bg-gold/20" : "bg-rose/40"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-24 h-96 w-96 rounded-full animate-glow ${
          isDark ? "bg-rose/10" : "bg-lavender/50"
        }`}
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className={`absolute bottom-0 left-1/4 h-80 w-80 rounded-full animate-glow ${
          isDark ? "bg-lavender/10" : "bg-gold/20"
        }`}
        style={{ animationDelay: "2.4s" }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className={`absolute rounded-full animate-twinkle ${
            isDark ? "bg-gold" : "bg-white"
          }`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: isDark
              ? "0 0 6px rgba(216,178,106,0.8)"
              : "0 0 6px rgba(255,255,255,0.9)",
          }}
        />
      ))}
    </div>
  );
}
