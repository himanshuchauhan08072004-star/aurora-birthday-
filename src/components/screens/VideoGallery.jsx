import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import { config } from "../../utils/config";

function VideoCard({ video, onOpen }) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {});
  };
  const handleLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.button
      onClick={() => onOpen(video)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -6 }}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl shadow-plum/15"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum-dark/70 via-plum-dark/10 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-plum shadow-lg transition-transform duration-300 group-hover:scale-110">
          <FiPlay size={20} className="translate-x-0.5" />
        </span>
      </div>

      <span className="absolute bottom-4 left-4 font-display text-lg text-cream drop-shadow">
        {video.title}
      </span>
    </motion.button>
  );
}

export default function VideoGallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative w-full bg-plum-gradient px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] text-gold/80"
        >
          IN MOTION
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-display text-4xl text-cream sm:text-5xl"
        >
          Moments That Moved
        </motion.h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {config.videos.map((video) => (
          <VideoCard key={video.title} video={video} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-plum-dark/95 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-cream transition hover:bg-white/20"
            >
              <FiX size={22} />
            </button>
            <motion.video
              key={active.src}
              src={active.src}
              controls
              autoPlay
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
