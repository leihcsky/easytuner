# EasyTuner

Free online instrument tuner platform. Tune your guitar, bass, ukulele, and violin instantly using your microphone.

**Live site:** [https://easytuner.org/](https://easytuner.org/)

## Tech Stack

- **Next.js 15** (App Router, SSG)
- **TypeScript**
- **Tailwind CSS**
- **Pitchy** (pitch detection)
- **Web Audio API** (microphone input & reference tones)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Static export is configured for **Cloudflare Pages** deployment.

## Project Structure

```
├── data/
│   ├── tunings/          # JSON tuning configurations
│   └── guides.json       # Guide metadata
├── src/
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # UI components
│   ├── lib/              # Utilities (notes, audio, tunings)
│   └── types/            # TypeScript types
```

## Pages

| URL | Description |
|-----|-------------|
| `/` | Online Guitar Tuner (Standard) |
| `/guitar-tunings/[slug]` | Alternative guitar tunings |
| `/bass-tuner` | Bass Tuner |
| `/ukulele-tuner` | Ukulele Tuner |
| `/violin-tuner` | Violin Tuner |
| `/guides` | Tuning guides |
| `/guides/[slug]` | Individual guide articles |
