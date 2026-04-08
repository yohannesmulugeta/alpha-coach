# 💪 Alpha Home Workout Coach

> **A fully offline-capable PWA for bodyweight muscle building, men's pelvic health, and sexual performance training.**

No gym. No equipment. No excuses.

---

## 🚀 Live Demo

Deploy in 30 seconds → [Netlify](https://netlify.com) | [Vercel](https://vercel.com) | [GitHub Pages](https://pages.github.com)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎯 Smart Onboarding | 9-step profile builder → personalized plan |
| 📅 5–6 Day Programs | Beginner / Intermediate / Advanced |
| 🏋️ 30+ Exercises | 100% bodyweight, zero equipment required |
| ▶️ In-App Video Tutorials | YouTube embeds — videos play inside the app, never a new tab |
| 🛡️ Kegel / Pelvic Floor | Science-backed pelvic floor training with embedded video guides |
| ⏱️ Rest Timer | Auto-starts after every logged set |
| 📈 Progressive Overload | Sets & reps auto-increase week by week |
| 📊 Progress Tracking | Calendar, muscle heat map, weight chart |
| 💾 Offline Support | Full PWA with Service Worker caching |
| 📲 Installable | Add to home screen on iOS & Android |
| 📤 Export | Copy, Email, PDF, Share |

---

## 📁 Project Structure

```
alpha-coach/
├── index.html          # Main app — all screens
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline + YouTube bypass)
├── css/
│   └── style.css       # Complete stylesheet
├── js/
│   ├── data.js         # Exercise DB, workout plans, Kegel programs, nutrition tips
│   └── app.js          # App logic, state, video players, timers
└── icons/
    ├── icon-192.png    # Add your own (see below)
    └── icon-512.png
```

---

## 🏃 Quick Deploy

### Netlify (easiest — free)
1. Go to [netlify.com](https://netlify.com) → sign up
2. Drag the `alpha-coach/` folder onto the dashboard
3. Live in 30 seconds ✅

### GitHub Pages (free)
1. Push this repo to GitHub
2. Settings → Pages → Source: `main` branch → `/` root
3. URL: `https://yourusername.github.io/alpha-coach`

### Vercel (free, fastest)
```bash
npx vercel
```

---

## 📱 Install as a Mobile App

**iPhone / iPad:**
1. Open Safari → go to your deployed URL
2. Tap Share → "Add to Home Screen"

**Android:**
1. Open Chrome → go to your deployed URL
2. Tap ⋮ menu → "Install app"

---

## 🏋️ Workout Programs

### Beginner (5 days active)
| Day | Focus |
|---|---|
| Mon | Push Day A — Chest · Shoulders · Triceps |
| Tue | Legs + Core — Quads · Glutes · Abs |
| Wed | Pull Day — Back · Biceps · Rear Delts |
| Thu | **Rest** |
| Fri | Push Day B — Chest · Shoulders · Core |
| Sat | Full Body — Cardio · All Muscle Groups |
| Sun | **Rest** |

### Intermediate / Advanced
6 active days with Push A, Pull, Legs, Core, Push B, Full Body HIIT.

---

## 🛡️ Kegel / Pelvic Floor Training

Each level includes 3 exercises with:
- Embedded tutorial video (plays in-app)
- Animated pelvic floor anatomy diagram
- Guided timer with squeeze / release phases
- Science-backed protocols

**Results** (peer-reviewed studies):
- 40% of men regained normal erectile function (BJU International)
- 88% improved ejaculatory control (Lavoisier et al.)
- Stronger erections, longer sexual endurance

---

## 🎥 Video System

All tutorial videos embed directly using YouTube's iframe API with:
- `playsinline=1` — stays in app on iOS
- `rel=0` — no related videos after playback
- `modestbranding=1` — minimal YouTube UI
- Auto-pause on modal close

---

## 🔬 Science References

- Mayo Clinic: Kegel exercises for men (2024)
- BJU International: Pelvic floor training & erectile function
- Pastore et al. (2014): Ejaculatory latency improvement
- Lavoisier et al. (2014): 88% PE improvement
- Journal of Strength & Conditioning: Squats & testosterone
- American Journal of Cardiology: Exercise & erectile dysfunction

---

## 🔧 Customization

**Add an exercise** → edit `EXERCISES` object in `js/data.js`

**Change a workout plan** → edit `WEEKLY_TEMPLATES` in `js/data.js`

**Add nutrition tips** → edit `NUTRITION_TIPS` array in `js/data.js`

**Change Kegel protocols** → edit `KEGEL_PROGRAMS` in `js/data.js`

---

## 🖼️ Icons

Create 192×192 and 512×512 PNG icons, place in `/icons/`.

Free tool: [realfavicongenerator.net](https://realfavicongenerator.net)

---

## 📄 License

MIT — free to use, modify, and deploy.
