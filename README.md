# Aurora — Interactive Birthday Experience

A cinematic, single-page, animated birthday surprise site. Built with
React + Vite, Tailwind CSS, Framer Motion, and canvas-confetti.

## LIVE : https://aurora-birthday.vercel.app/

**This is the public demo/template version** — all names, stories, and media
are placeholders. Fork it and personalize it for someone, or use it as a
reference for the animation/interaction techniques inside.

## Run it

```
npm install
npm run dev
```

Build for production:

```
npm run build
```

## Make it yours

All personal content — recipient name, story copy, memory timeline entries,
reasons, wishes, and the letter — lives in **`src/utils/config.js`**.

Media lives in **`public/assets/`**:
- `photos/` — hero, memory timeline images, masonry gallery, video thumbnails
- `videos/` — drop your `.mp4` files here
- `music/` — drop a birthday-song `.mp3` here (plays when the candles are blown out)

## Journey / features

Loading → Welcome → Memory Timeline → Photo Gallery → Video Gallery →
Letter (envelope + typewriter) → Reasons → Interactive Cake (tap candles,
blow them out — confetti + fireworks + petal rain) → Wishes → Final
Surprise (confetti, floating hearts, balloons, replay button)

## Tech

React, Vite, Tailwind CSS, Framer Motion, canvas-confetti, react-icons.
