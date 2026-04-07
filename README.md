# 🏋️ Alpha Home Workout Coach — PWA

A complete, mobile-first Progressive Web App for home muscle building, weight gain, and men's pelvic health training.

---

## 📁 Project Structure

```
alpha-coach/
├── index.html          # Main app (all screens)
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline support)
├── css/
│   └── style.css       # Complete stylesheet
├── js/
│   ├── data.js         # Exercise database + workout plans
│   └── app.js          # App logic, state, interactions
└── icons/              # App icons (add your own)
    ├── icon-192.png
    └── icon-512.png
```

---

## 🚀 Quick Deploy (No coding needed)

### Option 1: Netlify (Easiest — Free)

1. Go to https://netlify.com → Sign up free
2. Drag your entire `alpha-coach` folder onto the Netlify dashboard
3. Your app is live in 30 seconds with a URL like `https://alpha-coach-xyz.netlify.app`
4. To use a custom domain: Site settings → Domain management

### Option 2: GitHub Pages (Free)

1. Go to https://github.com → Create account → New repository
2. Name it `alpha-coach` (make it public)
3. Upload all files
4. Go to Settings → Pages → Source: main branch → `/` root
5. Your URL: `https://yourusername.github.io/alpha-coach`

### Option 3: Vercel (Free, fastest)

1. Go to https://vercel.com → Sign up
2. Click "Add New Project" → drag your folder
3. Done — instant URL with HTTPS

---

## 📱 Adding Icons

Create PNG icons in these sizes and place in `/icons/`:
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)

Free icon creation: https://realfavicongenerator.net

---

## 📲 Installing the App on Your Phone

After deploying:

**iPhone/iPad:**
1. Open Safari → go to your URL
2. Tap the Share button (box with arrow)
3. Scroll down → "Add to Home Screen"
4. Tap Add → the app appears on your home screen

**Android:**
1. Open Chrome → go to your URL
2. Tap the menu (3 dots) → "Install app" or "Add to Home screen"

---

## 🧠 Features

- ✅ Smart 8-step onboarding
- ✅ Personalized 7-day workout plans (Beginner/Intermediate/Advanced)
- ✅ 20+ exercises with descriptions, tips & YouTube links
- ✅ Kegel / pelvic floor training with guided timer
- ✅ Science-backed sexual performance info
- ✅ Progress tracking (streak, calendar, muscle groups)
- ✅ Weight log
- ✅ Nutrition tips (daily rotation)
- ✅ Export via PDF, email, copy, share
- ✅ Offline support (Service Worker)
- ✅ Installable as a home screen app

---

## 🔬 Science References

- Mayo Clinic: Kegel exercises for men (2024)
- BJU International: 40% of men regained erectile function with pelvic floor training
- Pastore et al. (2014): Pelvic floor exercises extend ejaculatory latency
- 88% improvement in premature ejaculation after pelvic floor training (Lavoisier et al., 2014)
- Strength training increases testosterone (Journal of Strength & Conditioning Research)
- Aerobic exercise reduces erectile dysfunction risk by 30% (American Journal of Cardiology)

---

## 🔧 Customization

To add exercises: Edit `js/data.js` and add entries to the `EXERCISES` object.

To change plans: Edit `WEEKLY_TEMPLATES` in `js/data.js`.

To add nutrition tips: Edit the `NUTRITION_TIPS` array in `js/data.js`.
