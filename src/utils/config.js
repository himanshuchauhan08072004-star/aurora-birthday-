// ─────────────────────────────────────────────────────────
// This is a DEMO configuration for the portfolio version.
// Swap this out with real names, photos, and a personal
// story to turn it into an actual birthday surprise for
// someone. See README.md for setup instructions.
// ─────────────────────────────────────────────────────────

export const config = {
  recipientName: "Alex",

  welcome: {
    heading: "Happy Birthday",
    subheading: "A little something to make today feel special.",
    heroImage: "/assets/photos/hero.jpg",
    ctaLabel: "Open Your Surprise",
  },

  // MEMORY TIMELINE — add/remove entries freely
  memories: [
    {
      date: "Spring",
      title: "The Trip We Almost Didn't Take",
      description: "Plans fell apart twice, but somehow we still ended up watching the sunset from that rooftop.",
      image: "/assets/photos/memory-1.jpg",
    },
    {
      date: "Summer",
      title: "That Random Tuesday",
      description: "No occasion, no plans — just good food, bad jokes, and a night that turned out unforgettable.",
      image: "/assets/photos/memory-2.jpg",
    },
    {
      date: "Autumn",
      title: "The Long Drive Home",
      description: "Three hours of terrible music and the best conversation we'd had in months.",
      image: "/assets/photos/memory-3.jpg",
    },
    {
      date: "Winter",
      title: "A Quiet Evening",
      description: "Nothing planned, nowhere to be — and it turned out to be exactly what we needed.",
      image: "/assets/photos/memory-4.jpg",
    },
  ],

  // PHOTO GALLERY — masonry grid, add as many as you like
  gallery: [
    "/assets/photos/gallery-1.jpg",
    "/assets/photos/gallery-2.jpg",
    "/assets/photos/gallery-3.jpg",
    "/assets/photos/gallery-4.jpg",
    "/assets/photos/gallery-5.jpg",
    "/assets/photos/gallery-6.jpg",
    "/assets/photos/gallery-7.jpg",
    "/assets/photos/gallery-8.jpg",
    "/assets/photos/gallery-9.jpg",
    "/assets/photos/gallery-10.jpg",
    "/assets/photos/gallery-11.jpg",
    "/assets/photos/gallery-12.jpg",
    "/assets/photos/gallery-13.jpg",
    "/assets/photos/gallery-14.jpg",
    "/assets/photos/gallery-15.jpg",
    "/assets/photos/gallery-16.jpg",
  ],

  // VIDEO GALLERY — add as many as you like
  videos: [
    {
      title: "Little Adventures",
      thumbnail: "/assets/photos/video-thumb-1.jpg",
      src: "/assets/videos/video-1.mp4",
    },
    {
      title: "Good Times",
      thumbnail: "/assets/photos/video-thumb-2.jpg",
      src: "/assets/videos/video-2.mp4",
    },
    {
      title: "Just Us",
      thumbnail: "/assets/photos/video-thumb-3.jpg",
      src: "/assets/videos/video-3.mp4",
    },
    {
      title: "Late Night Talks",
      thumbnail: "/assets/photos/video-thumb-4.jpg",
      src: "/assets/videos/video-4.mp4",
    },
  ],

  letter: {
    signature: "With love, always.",
    body: `Hey you,

I don't think a message like this can ever really capture everything, but I wanted to try anyway.

Every year I get to know you, I'm reminded of how lucky the people around you are — the way you show up for people, the way you find something to laugh about even on hard days, the way you make ordinary moments feel a little more special just by being there.

Today is about celebrating you — all of it. Who you are right now, and everything you're still becoming.

I hope this year brings you everything you're hoping for, and then some.

Happy birthday. Here's to another year of you.`,
  },

  reasons: [
    { emoji: "❤️", title: "Your Smile", description: "It's the kind that's impossible not to return." },
    { emoji: "🌸", title: "Your Kindness", description: "You make everyone around you feel a little safer." },
    { emoji: "✨", title: "Your Personality", description: "There's genuinely no one else quite like you." },
    { emoji: "😊", title: "Your Laugh", description: "Loud, unfiltered, and impossible to fake." },
    { emoji: "🌍", title: "Your Presence", description: "Rooms are just better when you're in them." },
    { emoji: "💫", title: "Your Heart", description: "The way you care for people is rare and beautiful." },
  ],

  wishes: [
    "May this year bring you closer to every dream you're chasing.",
    "May you laugh more than you worry, and rest more than you push.",
    "May you always know how deeply you are appreciated.",
    "May every birthday remind you how far you've come.",
    "May you be as kind to yourself as you are to everyone else.",
  ],

  finalMessage: {
    heading: "Thank You",
    body: "Thank you for being such an amazing person. I hope this birthday becomes one of your happiest memories.",
    replayLabel: "Replay the Journey",
  },

  music: "/assets/music/birthday-song.mp3",
};
