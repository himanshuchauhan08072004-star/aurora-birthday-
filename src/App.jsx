import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/screens/LoadingScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import MemoryTimeline from "./components/screens/MemoryTimeline";
import PhotoGallery from "./components/screens/PhotoGallery";
import VideoGallery from "./components/screens/VideoGallery";
import BirthdayLetter from "./components/screens/BirthdayLetter";
import ReasonsSection from "./components/screens/ReasonsSection";
import CakeSection from "./components/screens/CakeSection";
import WishesSection from "./components/screens/WishesSection";
import FinalSurprise from "./components/screens/FinalSurprise";

export default function App() {
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef(null);
  const topRef = useRef(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const replay = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-cream font-body">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <main>
          <div ref={topRef} />
          <WelcomeScreen onOpen={scrollToTimeline} />
          <div ref={timelineRef}>
            <MemoryTimeline />
          </div>
          <PhotoGallery />
          <VideoGallery />
          <BirthdayLetter />
          <ReasonsSection />
          <CakeSection />
          <WishesSection />
          <FinalSurprise onReplay={replay} />

          <footer className="w-full bg-plum-dark px-6 py-8 text-center">
            <p className="mx-auto max-w-xl font-body text-xs leading-relaxed text-cream/50">
              This is a demo project — a cinematic, interactive birthday
              experience built with React, Tailwind CSS, Framer Motion, and
              Canvas Confetti. Fully customizable: swap the photos, videos,
              music, and story in{" "}
              <code className="text-cream/70">src/utils/config.js</code> to
              make it your own.
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}
