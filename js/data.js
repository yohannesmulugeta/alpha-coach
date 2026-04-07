// ==========================================
// ALPHA COACH — EXERCISE DATABASE
// ==========================================

const EXERCISES = {
  // ===== PUSH (Chest, Shoulders, Triceps) =====
  pushups: {
    name: "Push-Ups",
    emoji: "💪",
    muscles: ["Chest", "Shoulders", "Triceps"],
    description: "The king of bodyweight chest exercises. Works the entire upper body pushing chain.",
    tips: [
      "Keep body in a straight line from head to heels",
      "Lower chest to 1 inch from floor — don't half-rep",
      "Engage core throughout — no sagging hips",
      "Breathe in on the way down, out as you push up",
      "Hands slightly wider than shoulder-width"
    ],
    youtube: "https://www.youtube.com/watch?v=IODxDxX7oi4",
    variations: { beginner: {sets:3,reps:"8–10"}, intermediate: {sets:4,reps:"12–15"}, advanced: {sets:5,reps:"20–25"} }
  },
  wideGripPushups: {
    name: "Wide-Grip Push-Ups",
    emoji: "🦾",
    muscles: ["Chest (outer)", "Shoulders"],
    description: "Wider hand placement targets the chest more, especially the outer pecs.",
    tips: [
      "Hands 1.5x shoulder width",
      "Elbows flare out to 45°",
      "Feel a deep chest stretch at the bottom",
      "Great finisher after regular push-ups"
    ],
    youtube: "https://www.youtube.com/watch?v=0pkjOk0EiAk",
    variations: { beginner: {sets:2,reps:"8"}, intermediate: {sets:3,reps:"12"}, advanced: {sets:4,reps:"15–20"} }
  },
  diamondPushups: {
    name: "Diamond Push-Ups",
    emoji: "💎",
    muscles: ["Triceps", "Inner Chest"],
    description: "Hands form a diamond shape. One of the best bodyweight tricep exercises.",
    tips: [
      "Make a diamond with thumbs and index fingers",
      "Keep elbows close to sides",
      "Lowering slowly makes this much harder",
      "Best done after regular push-ups"
    ],
    youtube: "https://www.youtube.com/watch?v=J0DnG1_S92I",
    variations: { beginner: {sets:2,reps:"6–8"}, intermediate: {sets:3,reps:"10–12"}, advanced: {sets:4,reps:"15"} }
  },
  pikePress: {
    name: "Pike Press",
    emoji: "🔺",
    muscles: ["Shoulders", "Upper Chest", "Triceps"],
    description: "Hips elevated in an inverted V position — mimics an overhead press using your bodyweight.",
    tips: [
      "Form a strong V-shape with hips high",
      "Lower head between hands to the floor",
      "Elbows track out to the sides",
      "Walk feet closer to hands = harder",
      "Progression toward handstand push-ups"
    ],
    youtube: "https://www.youtube.com/watch?v=sposDXWEB0A",
    variations: { beginner: {sets:3,reps:"8"}, intermediate: {sets:4,reps:"10–12"}, advanced: {sets:4,reps:"15"} }
  },
  tricepDips: {
    name: "Tricep Dips (Chair)",
    emoji: "🪑",
    muscles: ["Triceps", "Chest", "Shoulders"],
    description: "Using a sturdy chair or bench. Targets the triceps with intense contraction.",
    tips: [
      "Keep back close to the chair",
      "Lower until elbows form 90°",
      "Don't shrug your shoulders",
      "Straighten legs = more difficult",
      "Full lockout at the top"
    ],
    youtube: "https://www.youtube.com/watch?v=0326dy_-CzM",
    variations: { beginner: {sets:3,reps:"8–10"}, intermediate: {sets:4,reps:"12–15"}, advanced: {sets:4,reps:"20"} }
  },
  declinePushups: {
    name: "Decline Push-Ups",
    emoji: "⬇️",
    muscles: ["Upper Chest", "Shoulders"],
    description: "Feet elevated on a chair or sofa. Shifts emphasis to upper chest and front delts.",
    tips: [
      "The higher your feet, the harder it is",
      "Keep hips level — don't let them rise",
      "Maintain full body tension throughout",
      "Excellent for upper chest development"
    ],
    youtube: "https://www.youtube.com/watch?v=SKPab2YC8BE",
    variations: { beginner: {sets:3,reps:"8"}, intermediate: {sets:3,reps:"12"}, advanced: {sets:4,reps:"15–20"} }
  },

  // ===== PULL (Back, Biceps) =====
  invertedRows: {
    name: "Inverted Rows (Table)",
    emoji: "🪵",
    muscles: ["Back", "Biceps", "Rear Delts"],
    description: "Lie under a sturdy table, grip the edge, and row your chest up. Best bodyweight back exercise.",
    tips: [
      "Keep body straight like a plank",
      "Pull chest to the table edge",
      "Squeeze shoulder blades together at top",
      "Legs straighter = harder",
      "Table must be sturdy — test first"
    ],
    youtube: "https://www.youtube.com/watch?v=RNnGOtN6eE4",
    variations: { beginner: {sets:3,reps:"8–10"}, intermediate: {sets:4,reps:"12"}, advanced: {sets:4,reps:"15–20"} }
  },
  pullups: {
    name: "Pull-Ups",
    emoji: "⬆️",
    muscles: ["Back (Lats)", "Biceps", "Core"],
    description: "The ultimate upper body pulling exercise. Builds a wide, powerful back.",
    tips: [
      "Start from a dead hang — full extension",
      "Pull elbows to hips, not just chin to bar",
      "No kipping or swinging for strength gains",
      "Shoulder blades down and back before pulling",
      "Slow negatives (5 sec down) build strength fast"
    ],
    youtube: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    variations: { beginner: {sets:3,reps:"3–5"}, intermediate: {sets:4,reps:"8–10"}, advanced: {sets:5,reps:"12–15"} }
  },
  chinups: {
    name: "Chin-Ups",
    emoji: "🔝",
    muscles: ["Biceps", "Back", "Core"],
    description: "Underhand grip pull-up. More bicep emphasis while still building a strong back.",
    tips: [
      "Supinate (rotate) palms facing you",
      "Squeeze biceps at the top",
      "Lean back slightly for more lat activation",
      "Great for bicep development without weights"
    ],
    youtube: "https://www.youtube.com/watch?v=sIiogEvBKSs",
    variations: { beginner: {sets:3,reps:"3–5"}, intermediate: {sets:4,reps:"8"}, advanced: {sets:5,reps:"12"} }
  },
  supermanHold: {
    name: "Superman Hold",
    emoji: "🦸",
    muscles: ["Lower Back", "Glutes", "Rear Delts"],
    description: "Lying face down, lifting arms and legs simultaneously. Critical for lower back health.",
    tips: [
      "Lift arms, chest, and legs simultaneously",
      "Hold at the top for 2–3 seconds",
      "Don't strain your neck — look down",
      "Essential for posture and back health",
      "Especially good for sexual performance positions"
    ],
    youtube: "https://www.youtube.com/watch?v=cc6UVRS7PW4",
    variations: { beginner: {sets:3,reps:"10",hold:"2s"}, intermediate: {sets:4,reps:"12",hold:"3s"}, advanced: {sets:4,reps:"15",hold:"5s"} }
  },
  renegadeRowAlt: {
    name: "Back Extensions",
    emoji: "🔙",
    muscles: ["Lower Back", "Glutes"],
    description: "Lying face down, alternately lifting arm + opposite leg. Builds spinal erectors.",
    tips: [
      "Slow and controlled — feel the back working",
      "Keep hips on the floor",
      "Alternate sides smoothly",
      "Core stays braced throughout",
      "Excellent for sexual stamina and hip power"
    ],
    youtube: "https://www.youtube.com/watch?v=ph3pddpKzzw",
    variations: { beginner: {sets:3,reps:"10 each side"}, intermediate: {sets:3,reps:"15"}, advanced: {sets:4,reps:"20"} }
  },

  // ===== LEGS =====
  squats: {
    name: "Bodyweight Squats",
    emoji: "🦵",
    muscles: ["Quads", "Glutes", "Hamstrings"],
    description: "Foundation of all lower body training. Boosts testosterone naturally and improves hip power for sexual performance.",
    tips: [
      "Feet shoulder-width, toes slightly out",
      "Squat until thighs are parallel or below",
      "Chest up — don't cave forward",
      "Drive through heels to stand",
      "Research shows squats boost testosterone levels"
    ],
    youtube: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
    variations: { beginner: {sets:3,reps:"15"}, intermediate: {sets:4,reps:"20–25"}, advanced: {sets:5,reps:"30"} }
  },
  lunges: {
    name: "Reverse Lunges",
    emoji: "🚶",
    muscles: ["Quads", "Glutes", "Hamstrings"],
    description: "Step backward into a lunge. Easier on the knees than forward lunges, great for glute development.",
    tips: [
      "Keep front knee over foot, not past toes",
      "Back knee drops to 1 inch from floor",
      "Torso upright throughout",
      "Alternate legs or do all reps on one side",
      "Strong glutes directly improve sexual stamina"
    ],
    youtube: "https://www.youtube.com/watch?v=xrjMX7BEtEk",
    variations: { beginner: {sets:3,reps:"10 each"}, intermediate: {sets:4,reps:"12 each"}, advanced: {sets:4,reps:"15–20 each"} }
  },
  gluteBridge: {
    name: "Glute Bridge",
    emoji: "🌉",
    muscles: ["Glutes", "Hamstrings", "Pelvic Floor"],
    description: "One of the best exercises for pelvic floor activation AND glute development. Direct sexual performance benefit.",
    tips: [
      "Lie back, knees bent, feet flat",
      "Squeeze glutes hard at the top",
      "Hold 2 seconds at peak — this is key",
      "Also activates pelvic floor muscles",
      "The hip thrust motion is functionally identical to sexual thrusting — this exercise directly trains that"
    ],
    youtube: "https://www.youtube.com/watch?v=OUgsJ8-Vi0E",
    variations: { beginner: {sets:3,reps:"15",hold:"2s"}, intermediate: {sets:4,reps:"20",hold:"3s"}, advanced: {sets:4,reps:"25",hold:"3s"} }
  },
  singleLegGluteBridge: {
    name: "Single-Leg Glute Bridge",
    emoji: "🦶",
    muscles: ["Glutes", "Core", "Pelvic Floor"],
    description: "One leg elevated while bridging. Fixes imbalances and massively increases intensity.",
    tips: [
      "One leg extended in the air",
      "Drive through heel of grounded foot",
      "Keep hips level — don't let them drop",
      "Excellent pelvic floor engagement",
      "3x harder than the standard version"
    ],
    youtube: "https://www.youtube.com/watch?v=sFM7HQXqlyY",
    variations: { beginner: {sets:3,reps:"10 each"}, intermediate: {sets:3,reps:"15 each"}, advanced: {sets:4,reps:"20 each"} }
  },
  calfRaises: {
    name: "Calf Raises",
    emoji: "👟",
    muscles: ["Calves"],
    description: "Standing on the edge of a step, raise up on toes. Develops powerful calves.",
    tips: [
      "Full range: drop heels below step level",
      "Rise all the way to tiptoes",
      "Slow down = more muscle growth",
      "Try single-leg for extra challenge"
    ],
    youtube: "https://www.youtube.com/watch?v=-M4-G8p1fCI",
    variations: { beginner: {sets:3,reps:"20"}, intermediate: {sets:4,reps:"25"}, advanced: {sets:4,reps:"30–40"} }
  },
  jumpSquats: {
    name: "Jump Squats",
    emoji: "⚡",
    muscles: ["Quads", "Glutes", "Calves", "Cardio"],
    description: "Explosive squat with a jump at the top. Builds power and burns calories for muscle gain.",
    tips: [
      "Land softly — absorb impact through knees",
      "Squat deep before the jump",
      "Arms swing forward to help propulsion",
      "Excellent for cardiovascular endurance"
    ],
    youtube: "https://www.youtube.com/watch?v=A-cFYWvaHr0",
    variations: { beginner: {sets:3,reps:"8"}, intermediate: {sets:3,reps:"12"}, advanced: {sets:4,reps:"15"} }
  },

  // ===== CORE =====
  plank: {
    name: "Plank",
    emoji: "⬛",
    muscles: ["Core", "Shoulders", "Glutes"],
    description: "The foundational core stability exercise. A strong core directly improves sexual stamina and endurance.",
    tips: [
      "Forearms on floor, body straight as a board",
      "Squeeze glutes and abs — actively tight",
      "Don't let hips sag or raise",
      "Breathe normally — don't hold breath",
      "Core strength = better sexual endurance"
    ],
    youtube: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
    variations: { beginner: {sets:3,reps:"20–30s"}, intermediate: {sets:4,reps:"45–60s"}, advanced: {sets:4,reps:"90s"} }
  },
  hollowHold: {
    name: "Hollow Body Hold",
    emoji: "🌙",
    muscles: ["Core (deep)", "Hip Flexors"],
    description: "Lying on your back, create a 'hollow' dish shape. Elite-level core training.",
    tips: [
      "Lower back pressed into the floor — always",
      "Arms extended overhead, legs straight",
      "The lower your legs, the harder",
      "Start with legs at 45° and progress",
      "This trains the same muscles as during sex positions"
    ],
    youtube: "https://www.youtube.com/watch?v=44ScXWFaVBs",
    variations: { beginner: {sets:3,reps:"15s"}, intermediate: {sets:3,reps:"30s"}, advanced: {sets:4,reps:"45s"} }
  },
  mountainClimbers: {
    name: "Mountain Climbers",
    emoji: "🏔️",
    muscles: ["Core", "Cardio", "Shoulders"],
    description: "High-intensity core exercise that also builds cardiovascular endurance.",
    tips: [
      "Keep hips down — don't raise them",
      "Drive knees toward opposite elbow for more core",
      "Start slow for form, then increase speed",
      "Rest 30–45s between sets"
    ],
    youtube: "https://www.youtube.com/watch?v=nmwgirgXLYM",
    variations: { beginner: {sets:3,reps:"20s"}, intermediate: {sets:4,reps:"30s"}, advanced: {sets:4,reps:"45s"} }
  },
  legRaises: {
    name: "Lying Leg Raises",
    emoji: "🦵",
    muscles: ["Lower Abs", "Hip Flexors"],
    description: "Lying flat, raise straight legs to 90°. Builds the lower abdominal region.",
    tips: [
      "Keep lower back pressed to floor",
      "Lower legs slowly — 3 seconds down",
      "Don't let legs touch the floor",
      "Hands under glutes helps beginners",
      "Strong lower abs support pelvic floor"
    ],
    youtube: "https://www.youtube.com/watch?v=l4kQd9eWclE",
    variations: { beginner: {sets:3,reps:"10"}, intermediate: {sets:4,reps:"15"}, advanced: {sets:4,reps:"20"} }
  },
  russianTwists: {
    name: "Russian Twists",
    emoji: "🌀",
    muscles: ["Obliques", "Core"],
    description: "Seated rotation for oblique strength. Improves rotational power.",
    tips: [
      "Lean back at 45° — feel the abs work",
      "Touch hands to floor on each side",
      "Add weight (water bottle) for more resistance",
      "Keep feet off ground for extra challenge"
    ],
    youtube: "https://www.youtube.com/watch?v=wkD8rjkodUI",
    variations: { beginner: {sets:3,reps:"16 total"}, intermediate: {sets:4,reps:"24"}, advanced: {sets:4,reps:"30+"} }
  },

  // ===== FULL BODY / HIIT =====
  burpees: {
    name: "Burpees",
    emoji: "🔥",
    muscles: ["Full Body", "Cardio"],
    description: "The complete bodyweight movement. Burns calories, builds muscle, and boosts cardiovascular fitness for endurance.",
    tips: [
      "Squat → kick back to plank → push-up → jump",
      "Jump arms overhead at the top",
      "Pace yourself — quality over frantic speed",
      "Excellent for fat loss while building muscle",
      "Cardiovascular fitness = better sexual stamina"
    ],
    youtube: "https://www.youtube.com/watch?v=dZgVxmf6jkA",
    variations: { beginner: {sets:3,reps:"5"}, intermediate: {sets:3,reps:"10"}, advanced: {sets:4,reps:"15"} }
  },
  pelvicThrusts: {
    name: "Pelvic Thrusts",
    emoji: "🎯",
    muscles: ["Glutes", "Hamstrings", "Pelvic Floor"],
    description: "Shoulders on a surface, hips thrust upward. Direct sexual performance training — builds the exact muscles and motion used during sex.",
    tips: [
      "Shoulders elevated on a chair/sofa",
      "Drive hips HIGH at the top with strong squeeze",
      "This is the primary hip thrust pattern for sexual function",
      "Add weight on hips for progression",
      "The #1 exercise for glute-pelvic power"
    ],
    youtube: "https://www.youtube.com/watch?v=CeNMr2vShzw",
    variations: { beginner: {sets:3,reps:"12"}, intermediate: {sets:4,reps:"15–20"}, advanced: {sets:4,reps:"25"} }
  }
};

// ==========================================
// WEEKLY PLAN TEMPLATES
// ==========================================

const WEEKLY_TEMPLATES = {
  beginner: [
    {
      day: "Mon", name: "Push Day", type: "push",
      muscles: "Chest · Shoulders · Triceps",
      duration: 25, color: "#E8FF4A",
      exercises: ["pushups","wideGripPushups","pikePress","tricepDips","gluteBridge"]
    },
    {
      day: "Tue", name: "Rest Day", type: "rest",
      muscles: "Active recovery", duration: 0, color: "#333",
      exercises: []
    },
    {
      day: "Wed", name: "Legs + Core", type: "legs",
      muscles: "Quads · Glutes · Abs",
      duration: 25, color: "#3b82f6",
      exercises: ["squats","lunges","gluteBridge","plank","legRaises"]
    },
    {
      day: "Thu", name: "Rest Day", type: "rest",
      muscles: "Active recovery", duration: 0, color: "#333",
      exercises: []
    },
    {
      day: "Fri", name: "Pull Day", type: "pull",
      muscles: "Back · Biceps",
      duration: 25, color: "#a855f7",
      exercises: ["invertedRows","supermanHold","renegadeRowAlt","mountainClimbers","hollowHold"]
    },
    {
      day: "Sat", name: "Full Body", type: "full",
      muscles: "Full Body · Cardio",
      duration: 30, color: "#f97316",
      exercises: ["burpees","squats","pushups","pelvicThrusts","plank"]
    },
    {
      day: "Sun", name: "Rest Day", type: "rest",
      muscles: "Rest & recover", duration: 0, color: "#333",
      exercises: []
    }
  ],
  intermediate: [
    {
      day: "Mon", name: "Push Day", type: "push",
      muscles: "Chest · Shoulders · Triceps",
      duration: 35, color: "#E8FF4A",
      exercises: ["pushups","wideGripPushups","diamondPushups","pikePress","tricepDips","declinePushups"]
    },
    {
      day: "Tue", name: "Pull Day", type: "pull",
      muscles: "Back · Biceps",
      duration: 35, color: "#a855f7",
      exercises: ["pullups","chinups","invertedRows","supermanHold","renegadeRowAlt"]
    },
    {
      day: "Wed", name: "Legs + Glutes", type: "legs",
      muscles: "Quads · Glutes · Hamstrings",
      duration: 35, color: "#3b82f6",
      exercises: ["squats","lunges","gluteBridge","singleLegGluteBridge","calfRaises","pelvicThrusts"]
    },
    {
      day: "Thu", name: "Core Day", type: "core",
      muscles: "Abs · Obliques · Stability",
      duration: 25, color: "#22c55e",
      exercises: ["plank","hollowHold","mountainClimbers","legRaises","russianTwists"]
    },
    {
      day: "Fri", name: "Push Day", type: "push",
      muscles: "Chest · Shoulders · Triceps",
      duration: 35, color: "#E8FF4A",
      exercises: ["declinePushups","pikePress","diamondPushups","tricepDips","pushups"]
    },
    {
      day: "Sat", name: "Full Body", type: "full",
      muscles: "Full Body · Cardio",
      duration: 40, color: "#f97316",
      exercises: ["burpees","jumpSquats","pullups","pelvicThrusts","mountainClimbers","plank"]
    },
    {
      day: "Sun", name: "Rest Day", type: "rest",
      muscles: "Rest & recover", duration: 0, color: "#333",
      exercises: []
    }
  ],
  advanced: [
    {
      day: "Mon", name: "Push Day", type: "push",
      muscles: "Chest · Shoulders · Triceps",
      duration: 50, color: "#E8FF4A",
      exercises: ["declinePushups","wideGripPushups","diamondPushups","pikePress","tricepDips","pushups"]
    },
    {
      day: "Tue", name: "Pull Day", type: "pull",
      muscles: "Back · Biceps",
      duration: 50, color: "#a855f7",
      exercises: ["pullups","chinups","invertedRows","supermanHold","renegadeRowAlt"]
    },
    {
      day: "Wed", name: "Legs + Power", type: "legs",
      muscles: "Quads · Glutes · Power",
      duration: 50, color: "#3b82f6",
      exercises: ["jumpSquats","lunges","singleLegGluteBridge","pelvicThrusts","calfRaises","squats"]
    },
    {
      day: "Thu", name: "Core & Stability", type: "core",
      muscles: "Deep Core · Obliques",
      duration: 35, color: "#22c55e",
      exercises: ["hollowHold","plank","mountainClimbers","russianTwists","legRaises"]
    },
    {
      day: "Fri", name: "Push Day", type: "push",
      muscles: "Chest · Shoulders · Triceps",
      duration: 50, color: "#E8FF4A",
      exercises: ["pikePress","declinePushups","diamondPushups","wideGripPushups","tricepDips","pushups"]
    },
    {
      day: "Sat", name: "Pull Day", type: "pull",
      muscles: "Back · Biceps",
      duration: 45, color: "#a855f7",
      exercises: ["pullups","chinups","invertedRows","renegadeRowAlt","supermanHold"]
    },
    {
      day: "Sun", name: "Active Recovery", type: "rest",
      muscles: "Light movement & stretch", duration: 15, color: "#333",
      exercises: []
    }
  ]
};

// ==========================================
// KEGEL PROGRAM DATA
// ==========================================

const KEGEL_PROGRAMS = {
  beginner: {
    title: "Beginner Kegel Program",
    week: "Weeks 1–4",
    exercises: [
      {
        name: "Basic Slow Hold",
        contract: 5, rest: 5, reps: 8,
        instruction: "Contract your pelvic floor muscles firmly. Hold, then slowly release. This builds the foundational strength.",
        purpose: "Builds muscle endurance and mind-muscle connection"
      },
      {
        name: "Quick Flicks",
        contract: 1, rest: 2, reps: 10,
        instruction: "Fast contractions — squeeze and immediately release. Think of a fast pulsing action.",
        purpose: "Trains fast-twitch fibers for ejaculation control"
      },
      {
        name: "Elevator Squeeze",
        contract: 8, rest: 8, reps: 5,
        instruction: "Gradually increase contraction intensity in 3 stages (30% → 60% → 100%), then release in stages.",
        purpose: "Builds strength through the full range of contraction"
      }
    ]
  },
  intermediate: {
    title: "Intermediate Kegel Program",
    week: "Weeks 5–10",
    exercises: [
      {
        name: "Extended Hold",
        contract: 8, rest: 6, reps: 10,
        instruction: "Hold at maximum contraction for 8 full seconds. Release fully before the next rep. Focus on total isolation.",
        purpose: "Builds ischiocavernosus strength for stronger erections"
      },
      {
        name: "Rapid Fire",
        contract: 1, rest: 1, reps: 20,
        instruction: "Maximum speed contractions. Squeeze-release-squeeze-release with no pause.",
        purpose: "Develops ejaculatory delay reflex"
      },
      {
        name: "Pre-Contraction Pull",
        contract: 10, rest: 8, reps: 8,
        instruction: "Before contracting, push slightly out (like starting to urinate), then immediately pull in and up hard.",
        purpose: "Full range motion for maximum muscle activation"
      }
    ]
  },
  advanced: {
    title: "Advanced Kegel Program",
    week: "Weeks 11+",
    exercises: [
      {
        name: "Max Endurance Hold",
        contract: 15, rest: 10, reps: 10,
        instruction: "Sustain a strong contraction for 15 full seconds. Breathe normally. Never hold your breath.",
        purpose: "Elite pelvic floor endurance for lasting power"
      },
      {
        name: "Power Pulsing",
        contract: 1, rest: 1, reps: 30,
        instruction: "30 consecutive maximum-effort rapid contractions. Short rest then repeat.",
        purpose: "Maximum fast-twitch fiber activation"
      },
      {
        name: "Progressive Pyramid",
        contract: 3, rest: 3, reps: 12,
        instruction: "Start 3s hold → 5s → 8s → 10s → back down. Follow the pyramid. Maximum tension throughout.",
        purpose: "Full-spectrum strength and endurance development"
      }
    ]
  }
};

// ==========================================
// NUTRITION TIPS (daily rotation)
// ==========================================

const NUTRITION_TIPS = [
  "🥚 <strong>Eat 3–5 eggs daily.</strong> One of nature's most complete muscle-building foods — packed with protein, healthy fats, and cholesterol needed for testosterone production.",
  "🍌 <strong>Eat bananas before your workout.</strong> Fast-acting carbs fuel your session. Potassium also prevents muscle cramps and supports nerve function.",
  "🥩 <strong>Aim for 0.8g–1g of protein per pound of bodyweight.</strong> If you weigh 70kg (154 lbs), target ~140g protein daily from chicken, eggs, fish, lentils, or cottage cheese.",
  "🌰 <strong>Snack on nuts — especially almonds and walnuts.</strong> Healthy fats are essential for testosterone synthesis. Low-fat diets are linked to lower T-levels in men.",
  "🥦 <strong>Eat cruciferous vegetables 4–5x per week.</strong> Broccoli, cauliflower, and Brussels sprouts support healthy estrogen balance, keeping testosterone dominant.",
  "💧 <strong>Drink 3–4 liters of water daily.</strong> Dehydration reduces strength by up to 15% and directly impairs sexual performance and energy.",
  "🍚 <strong>Don't skip carbohydrates if gaining weight is your goal.</strong> Eat rice, oats, potatoes, and bread — these are your calorie surplus foods for muscle growth.",
  "🌿 <strong>Try ashwagandha (600mg daily).</strong> One of the best-evidenced herbs for testosterone support, stress reduction, and sexual performance improvement.",
  "🫙 <strong>Eat before bed for muscle gain.</strong> Cottage cheese or Greek yogurt before sleep provides slow-digesting casein protein to feed muscle repair overnight.",
  "🔴 <strong>Eat beets or drink beet juice pre-workout.</strong> Natural nitrates boost blood flow — including to the pelvic region. Good for erections and workout performance.",
  "🥗 <strong>Include dark leafy greens daily.</strong> Spinach and kale are rich in magnesium — a mineral that supports testosterone levels and improves sleep quality.",
  "🍯 <strong>Add natural calorie boosters if underweight:</strong> Mix peanut butter into oats, add olive oil to meals, drink full-fat milk. Small changes add 300–500 extra calories easily.",
  "🫐 <strong>Eat antioxidant-rich foods.</strong> Blueberries, pomegranate, and dark chocolate protect blood vessel health — critical for strong erections as you age.",
  "🌊 <strong>Eat fatty fish twice a week.</strong> Salmon, mackerel, and sardines are rich in omega-3s that reduce inflammation, support heart health, and improve blood flow.",
];
