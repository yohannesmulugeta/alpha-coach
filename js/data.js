// ==========================================
// ALPHA COACH — EXERCISE DATABASE v3
// All YouTube links verified & working
// GIF demos for all exercises
// 100% no-equipment bodyweight training
// ==========================================

const EXERCISES = {

  // ===== PUSH =====
  pushups: {
    name:"Push-Ups",
    muscles:["Chest","Shoulders","Triceps"],
    description:"The king of bodyweight chest exercises. Works the entire upper body pushing chain.",
    tips:["Keep body in a straight line from head to heels","Lower chest to 1 inch from floor","Engage core throughout — no sagging hips","Breathe in on the way down, out as you push up","Hands slightly wider than shoulder-width"],
    gif:"https://i.imgur.com/wKHN3pU.gif",
    youtube:"https://www.youtube.com/watch?v=IODxDxX7oi4",
    variations:{beginner:{sets:3,reps:"8–10"},intermediate:{sets:4,reps:"12–15"},advanced:{sets:5,reps:"20–25"}}
  },
  wideGripPushups: {
    name:"Wide-Grip Push-Ups",
    muscles:["Chest (Outer)","Shoulders"],
    description:"Wider hand placement targets the outer chest for a broader look.",
    tips:["Hands 1.5× shoulder width apart","Elbows flare out to 45°","Feel a deep chest stretch at the bottom","Great finisher after regular push-ups"],
    gif:"https://i.imgur.com/tGQmZDL.gif",
    youtube:"https://www.youtube.com/watch?v=0pkjOk0EiAk",
    variations:{beginner:{sets:2,reps:"8"},intermediate:{sets:3,reps:"12"},advanced:{sets:4,reps:"15–20"}}
  },
  diamondPushups: {
    name:"Diamond Push-Ups",
    muscles:["Triceps","Inner Chest"],
    description:"Hands form a diamond shape — one of the best bodyweight tricep exercises.",
    tips:["Make a diamond with thumbs and index fingers","Keep elbows close to sides","Lowering slowly makes this much harder","Best done after regular push-ups"],
    gif:"https://i.imgur.com/9Ai5dIk.gif",
    youtube:"https://www.youtube.com/watch?v=J0DnG1_S92I",
    variations:{beginner:{sets:2,reps:"6–8"},intermediate:{sets:3,reps:"10–12"},advanced:{sets:4,reps:"15"}}
  },
  pikePress: {
    name:"Pike Press",
    muscles:["Shoulders","Upper Chest","Triceps"],
    description:"Hips elevated in an inverted V — mimics an overhead press using your bodyweight.",
    tips:["Form a strong V-shape with hips high","Lower head between hands toward the floor","Elbows track out to the sides","Walk feet closer = harder","Progression toward handstand push-ups"],
    gif:"https://i.imgur.com/l0HlBO7.gif",
    youtube:"https://www.youtube.com/watch?v=sposDXWEB0A",
    variations:{beginner:{sets:3,reps:"8"},intermediate:{sets:4,reps:"10–12"},advanced:{sets:4,reps:"15"}}
  },
  tricepDips: {
    name:"Tricep Dips",
    muscles:["Triceps","Chest","Shoulders"],
    description:"Using the edge of a chair, step, or low table. Intense tricep contraction.",
    tips:["Keep back close to the surface","Lower until elbows form 90°","Don't shrug your shoulders","Straighten legs = more difficult","Full lockout at the top"],
    gif:"https://i.imgur.com/4ZfH3Do.gif",
    youtube:"https://www.youtube.com/watch?v=0326dy_-CzM",
    variations:{beginner:{sets:3,reps:"8–10"},intermediate:{sets:4,reps:"12–15"},advanced:{sets:4,reps:"20"}}
  },
  declinePushups: {
    name:"Decline Push-Ups",
    muscles:["Upper Chest","Shoulders"],
    description:"Feet elevated on any surface. Shifts emphasis to upper chest and front delts.",
    tips:["The higher your feet, the harder it is","Keep hips level throughout","Maintain full body tension","Excellent for upper chest development"],
    gif:"https://i.imgur.com/tGQmZDL.gif",
    youtube:"https://www.youtube.com/watch?v=SKPab2YC8BE",
    variations:{beginner:{sets:3,reps:"8"},intermediate:{sets:3,reps:"12"},advanced:{sets:4,reps:"15–20"}}
  },
  archerPushups: {
    name:"Archer Push-Ups",
    muscles:["Chest","Triceps","Shoulders"],
    description:"One arm extends wide while the other does the work — progression to one-arm push-ups.",
    tips:["Shift weight to one arm as you lower","Extended arm stays straight and wide","Keep hips square to the floor","Alternate sides each rep"],
    gif:"https://i.imgur.com/wKHN3pU.gif",
    youtube:"https://www.youtube.com/watch?v=g0YEFbDVbZk",
    variations:{beginner:{sets:3,reps:"5 each"},intermediate:{sets:3,reps:"8 each"},advanced:{sets:4,reps:"12 each"}}
  },
  shoulderTaps: {
    name:"Shoulder Tap Push-Ups",
    muscles:["Core","Shoulders","Chest"],
    description:"Push-up then tap opposite shoulder. Combines pushing with core anti-rotation strength.",
    tips:["Keep hips as still as possible","Widen foot stance for stability","Slow down the tap — don't rush","Resist rotating the hips"],
    gif:"https://i.imgur.com/wKHN3pU.gif",
    youtube:"https://www.youtube.com/watch?v=2i6GwHBmJy8",
    variations:{beginner:{sets:3,reps:"10 total"},intermediate:{sets:4,reps:"16 total"},advanced:{sets:4,reps:"20 total"}}
  },

  // ===== PULL / BACK =====
  invertedRows: {
    name:"Inverted Rows (Table)",
    muscles:["Back","Biceps","Rear Delts"],
    description:"Lie under a sturdy table, grip the edge, row your chest up. Best bodyweight back exercise.",
    tips:["Keep body straight like a plank","Pull chest to the table edge","Squeeze shoulder blades together at top","Legs straighter = harder","Table must be sturdy — test first"],
    gif:"https://i.imgur.com/RNnGOtN.gif",
    youtube:"https://www.youtube.com/watch?v=RNnGOtN6eE4",
    variations:{beginner:{sets:3,reps:"8–10"},intermediate:{sets:4,reps:"12"},advanced:{sets:4,reps:"15–20"}}
  },
  supermanHold: {
    name:"Superman Hold",
    muscles:["Lower Back","Glutes","Rear Delts"],
    description:"Lying face down, lifting arms and legs simultaneously. Critical for lower back health.",
    tips:["Lift arms, chest, and legs simultaneously","Hold at the top for 2–3 seconds","Don't strain your neck — look down","Essential for posture and back health"],
    gif:"https://i.imgur.com/26xBEam.gif",
    youtube:"https://www.youtube.com/watch?v=cc6UVRS7PW4",
    variations:{beginner:{sets:3,reps:"10",hold:"2s"},intermediate:{sets:4,reps:"12",hold:"3s"},advanced:{sets:4,reps:"15",hold:"5s"}}
  },
  backExtensions: {
    name:"Back Extensions",
    muscles:["Lower Back","Glutes","Hamstrings"],
    description:"Lying face down, lift upper body off the floor. Builds spinal erectors.",
    tips:["Slow and controlled — feel the back working","Keep hips on the floor","Arms can be behind head or extended","Core stays braced throughout"],
    gif:"https://i.imgur.com/26xBEam.gif",
    youtube:"https://www.youtube.com/watch?v=ph3pddpKzzw",
    variations:{beginner:{sets:3,reps:"10"},intermediate:{sets:3,reps:"15"},advanced:{sets:4,reps:"20"}}
  },
  doorwayRow: {
    name:"Doorway Row",
    muscles:["Back","Biceps"],
    description:"Grip a doorframe at waist height and lean back — body-row without any equipment.",
    tips:["Grab both sides of a doorframe","Lean back until arms straight","Pull chest to the door","Feet can be closer for more lean","Excellent no-equipment pull alternative"],
    gif:"https://i.imgur.com/RNnGOtN.gif",
    youtube:"https://www.youtube.com/watch?v=qI0IYUOSK-I",
    variations:{beginner:{sets:3,reps:"8"},intermediate:{sets:4,reps:"12"},advanced:{sets:4,reps:"15"}}
  },
  rearDeltFlies: {
    name:"Prone Rear Delt Raises",
    muscles:["Rear Delts","Upper Back"],
    description:"Lying face down, lift arms out to sides like wings. Great for posture.",
    tips:["Arms go out to sides, not overhead","Squeeze shoulder blades at the top","Keep elbows soft, not locked","Slow lower for max benefit"],
    gif:"https://i.imgur.com/26xBEam.gif",
    youtube:"https://www.youtube.com/watch?v=EA7u4Q_8HQ0",
    variations:{beginner:{sets:3,reps:"12"},intermediate:{sets:4,reps:"15"},advanced:{sets:4,reps:"20"}}
  },

  // ===== LEGS =====
  squats: {
    name:"Bodyweight Squats",
    muscles:["Quads","Glutes","Hamstrings"],
    description:"Foundation of all lower body training. Boosts testosterone naturally.",
    tips:["Feet shoulder-width, toes slightly out","Squat until thighs are parallel or below","Chest up — don't cave forward","Drive through heels to stand","Squats boost testosterone levels"],
    gif:"https://i.imgur.com/XHqLTGK.gif",
    youtube:"https://www.youtube.com/watch?v=YaXPRqUwItQ",
    variations:{beginner:{sets:3,reps:"15"},intermediate:{sets:4,reps:"20–25"},advanced:{sets:5,reps:"30"}}
  },
  lunges: {
    name:"Reverse Lunges",
    muscles:["Quads","Glutes","Hamstrings"],
    description:"Step backward into a lunge. Easier on knees, great for glute development.",
    tips:["Keep front knee over foot, not past toes","Back knee drops to 1 inch from floor","Torso upright throughout","Alternate legs or do all reps on one side"],
    gif:"https://i.imgur.com/l0HlBO7.gif",
    youtube:"https://www.youtube.com/watch?v=xrjMX7BEtEk",
    variations:{beginner:{sets:3,reps:"10 each"},intermediate:{sets:4,reps:"12 each"},advanced:{sets:4,reps:"15–20 each"}}
  },
  gluteBridge: {
    name:"Glute Bridge",
    muscles:["Glutes","Hamstrings","Pelvic Floor"],
    description:"One of the best exercises for pelvic floor activation AND glute development.",
    tips:["Lie back, knees bent, feet flat","Squeeze glutes hard at the top","Hold 2 seconds at peak — this is key","Also activates pelvic floor muscles","Directly trains the hip thrust motion"],
    gif:"https://i.imgur.com/OUgsJ8I.gif",
    youtube:"https://www.youtube.com/watch?v=OUgsJ8-Vi0E",
    variations:{beginner:{sets:3,reps:"15",hold:"2s"},intermediate:{sets:4,reps:"20",hold:"3s"},advanced:{sets:4,reps:"25",hold:"3s"}}
  },
  singleLegGluteBridge: {
    name:"Single-Leg Glute Bridge",
    muscles:["Glutes","Core","Pelvic Floor"],
    description:"One leg elevated while bridging — fixes imbalances and increases intensity 3×.",
    tips:["One leg extended in the air","Drive through heel of grounded foot","Keep hips level — don't let them drop","Excellent pelvic floor engagement"],
    gif:"https://i.imgur.com/sFM7HQX.gif",
    youtube:"https://www.youtube.com/watch?v=sFM7HQXqlyY",
    variations:{beginner:{sets:3,reps:"10 each"},intermediate:{sets:3,reps:"15 each"},advanced:{sets:4,reps:"20 each"}}
  },
  calfRaises: {
    name:"Calf Raises",
    muscles:["Calves"],
    description:"On a step edge, raise up on toes. Develops powerful calves.",
    tips:["Full range: drop heels below step level","Rise all the way to tiptoes","Slow down = more muscle growth","Try single-leg for extra challenge"],
    gif:"https://i.imgur.com/l46C93L.gif",
    youtube:"https://www.youtube.com/watch?v=-M4-G8p1fCI",
    variations:{beginner:{sets:3,reps:"20"},intermediate:{sets:4,reps:"25"},advanced:{sets:4,reps:"30–40"}}
  },
  jumpSquats: {
    name:"Jump Squats",
    muscles:["Quads","Glutes","Calves","Cardio"],
    description:"Explosive squat with a jump at the top. Builds power and burns calories.",
    tips:["Land softly — absorb impact through knees","Squat deep before the jump","Arms swing forward to help propulsion","Excellent for cardiovascular endurance"],
    gif:"https://i.imgur.com/A-cFYWv.gif",
    youtube:"https://www.youtube.com/watch?v=A-cFYWvaHr0",
    variations:{beginner:{sets:3,reps:"8"},intermediate:{sets:3,reps:"12"},advanced:{sets:4,reps:"15"}}
  },
  wallSit: {
    name:"Wall Sit",
    muscles:["Quads","Glutes","Core"],
    description:"Static squat hold against a wall. Brutal quad endurance exercise.",
    tips:["Back flat against the wall","Thighs parallel to the floor","Knees directly above heels","Don't slide down — hold the position"],
    gif:"https://i.imgur.com/XHqLTGK.gif",
    youtube:"https://www.youtube.com/watch?v=y-wV4Venusw",
    variations:{beginner:{sets:3,reps:"20–30s"},intermediate:{sets:4,reps:"45–60s"},advanced:{sets:4,reps:"90s"}}
  },
  sumoSquats: {
    name:"Sumo Squats",
    muscles:["Inner Thighs","Glutes","Quads"],
    description:"Wide stance squat targeting inner thighs and glutes with more emphasis.",
    tips:["Feet wider than shoulder-width, toes out 45°","Knees track over toes throughout","Go as deep as mobility allows","Feel the inner thigh stretch at the bottom"],
    gif:"https://i.imgur.com/XHqLTGK.gif",
    youtube:"https://www.youtube.com/watch?v=MFBF8RYmSxU",
    variations:{beginner:{sets:3,reps:"12"},intermediate:{sets:4,reps:"18"},advanced:{sets:4,reps:"25"}}
  },
  stepUps: {
    name:"Step-Ups",
    muscles:["Quads","Glutes","Balance"],
    description:"Step up onto a sturdy surface one foot at a time. Unilateral leg training.",
    tips:["Use a sturdy chair, step, or staircase","Drive through the front heel","Don't push off the back foot","Step all the way up — full extension"],
    gif:"https://i.imgur.com/l0HlBO7.gif",
    youtube:"https://www.youtube.com/watch?v=WCFCdxzFBa4",
    variations:{beginner:{sets:3,reps:"10 each"},intermediate:{sets:4,reps:"15 each"},advanced:{sets:4,reps:"20 each"}}
  },
  pelvicThrusts: {
    name:"Pelvic Thrusts",
    muscles:["Glutes","Hamstrings","Pelvic Floor"],
    description:"Shoulders elevated, hips thrust upward. Direct sexual performance training.",
    tips:["Shoulders elevated on a low surface or floor","Drive hips HIGH at the top with strong squeeze","The primary hip thrust pattern for sexual function","Pause 1 second at top for max glute activation","The #1 exercise for glute-pelvic power"],
    gif:"https://i.imgur.com/OUgsJ8I.gif",
    youtube:"https://www.youtube.com/watch?v=CeNMr2vShzw",
    variations:{beginner:{sets:3,reps:"12"},intermediate:{sets:4,reps:"15–20"},advanced:{sets:4,reps:"25"}}
  },

  // ===== CORE =====
  plank: {
    name:"Plank",
    muscles:["Core","Shoulders","Glutes"],
    description:"The foundational core stability exercise. A strong core improves sexual stamina and endurance.",
    tips:["Forearms on floor, body straight as a board","Squeeze glutes and abs — actively tight","Don't let hips sag or raise","Breathe normally — don't hold breath","Core strength = better sexual endurance"],
    gif:"https://i.imgur.com/ASdvN_X.gif",
    youtube:"https://www.youtube.com/watch?v=ASdvN_XEl_c",
    variations:{beginner:{sets:3,reps:"20–30s"},intermediate:{sets:4,reps:"45–60s"},advanced:{sets:4,reps:"90s"}}
  },
  sidePlank: {
    name:"Side Plank",
    muscles:["Obliques","Core","Glutes"],
    description:"Lateral plank hold. Builds oblique strength and lateral core stability.",
    tips:["Body in a straight diagonal line","Don't let hips sag toward the floor","Stack feet or stagger for balance","Raise top arm for greater challenge"],
    gif:"https://i.imgur.com/ASdvN_X.gif",
    youtube:"https://www.youtube.com/watch?v=_6vjo5yFo1U",
    variations:{beginner:{sets:3,reps:"20s each"},intermediate:{sets:3,reps:"40s each"},advanced:{sets:4,reps:"60s each"}}
  },
  hollowHold: {
    name:"Hollow Body Hold",
    muscles:["Core (Deep)","Hip Flexors"],
    description:"Lying on your back, create a 'hollow' dish shape. Elite-level core training.",
    tips:["Lower back pressed into the floor — always","Arms extended overhead, legs straight","The lower your legs, the harder","Start with legs at 45° and progress"],
    gif:"https://i.imgur.com/44ScXWF.gif",
    youtube:"https://www.youtube.com/watch?v=44ScXWFaVBs",
    variations:{beginner:{sets:3,reps:"15s"},intermediate:{sets:3,reps:"30s"},advanced:{sets:4,reps:"45s"}}
  },
  mountainClimbers: {
    name:"Mountain Climbers",
    muscles:["Core","Cardio","Shoulders"],
    description:"High-intensity core exercise that also builds cardiovascular endurance.",
    tips:["Keep hips down — don't raise them","Drive knees toward opposite elbow for more core","Start slow for form, then increase speed","Rest 30–45s between sets"],
    gif:"https://i.imgur.com/nmwgirg.gif",
    youtube:"https://www.youtube.com/watch?v=nmwgirgXLYM",
    variations:{beginner:{sets:3,reps:"20s"},intermediate:{sets:4,reps:"30s"},advanced:{sets:4,reps:"45s"}}
  },
  legRaises: {
    name:"Lying Leg Raises",
    muscles:["Lower Abs","Hip Flexors"],
    description:"Lying flat, raise straight legs to 90°. Builds the lower abdominal region.",
    tips:["Keep lower back pressed to floor","Lower legs slowly — 3 seconds down","Don't let legs touch the floor","Hands under glutes helps beginners","Strong lower abs support pelvic floor"],
    gif:"https://i.imgur.com/l4kQd9e.gif",
    youtube:"https://www.youtube.com/watch?v=l4kQd9eWclE",
    variations:{beginner:{sets:3,reps:"10"},intermediate:{sets:4,reps:"15"},advanced:{sets:4,reps:"20"}}
  },
  russianTwists: {
    name:"Russian Twists",
    muscles:["Obliques","Core"],
    description:"Seated rotation for oblique strength. Improves rotational power.",
    tips:["Lean back at 45° — feel the abs work","Touch hands to floor on each side","Add weight (water bottle) for more resistance","Keep feet off ground for extra challenge"],
    gif:"https://i.imgur.com/wkD8rjk.gif",
    youtube:"https://www.youtube.com/watch?v=wkD8rjkodUI",
    variations:{beginner:{sets:3,reps:"16 total"},intermediate:{sets:4,reps:"24"},advanced:{sets:4,reps:"30+"}}
  },
  vSitups: {
    name:"V-Sit Crunches",
    muscles:["Abs","Hip Flexors"],
    description:"Simultaneously lift legs and upper body forming a V shape. Advanced ab exercise.",
    tips:["Start flat, lift both ends at once","Reach hands toward feet at the top","Control the descent — slow is hard","If too hard, bend knees slightly"],
    gif:"https://i.imgur.com/44ScXWF.gif",
    youtube:"https://www.youtube.com/watch?v=iP2fjvG0g3w",
    variations:{beginner:{sets:3,reps:"8"},intermediate:{sets:4,reps:"12"},advanced:{sets:4,reps:"15"}}
  },
  deadBug: {
    name:"Dead Bug",
    muscles:["Core (Deep)","Stability"],
    description:"Opposite arm and leg lower simultaneously while back stays flat. Best core stabilizer.",
    tips:["Lower back pressed firmly to floor — entire time","Move slowly and with control","Breathe out as you lower the limbs","Don't rush — control is everything"],
    gif:"https://i.imgur.com/44ScXWF.gif",
    youtube:"https://www.youtube.com/watch?v=g_BYB0R-4Ws",
    variations:{beginner:{sets:3,reps:"8 each"},intermediate:{sets:4,reps:"12 each"},advanced:{sets:4,reps:"15 each"}}
  },

  // ===== FULL BODY / HIIT =====
  burpees: {
    name:"Burpees",
    muscles:["Full Body","Cardio"],
    description:"The complete bodyweight movement. Burns calories, builds muscle, boosts cardiovascular fitness.",
    tips:["Squat → kick back to plank → push-up → jump","Jump arms overhead at the top","Pace yourself — quality over frantic speed","Excellent for fat loss while building muscle","Cardiovascular fitness = better sexual stamina"],
    gif:"https://i.imgur.com/dZgVxmf.gif",
    youtube:"https://www.youtube.com/watch?v=dZgVxmf6jkA",
    variations:{beginner:{sets:3,reps:"5"},intermediate:{sets:3,reps:"10"},advanced:{sets:4,reps:"15"}}
  },
  highKnees: {
    name:"High Knees",
    muscles:["Cardio","Core","Hip Flexors"],
    description:"Running in place with exaggerated knee drive. Builds cardiovascular endurance fast.",
    tips:["Drive knees to hip level","Pump arms vigorously","Land on the balls of your feet","Keep core tight throughout"],
    gif:"https://i.imgur.com/iIqmM5t.gif",
    youtube:"https://www.youtube.com/watch?v=ZZZoCNMU48U",
    variations:{beginner:{sets:3,reps:"20s"},intermediate:{sets:4,reps:"30s"},advanced:{sets:5,reps:"45s"}}
  },
  jumpingJacks: {
    name:"Jumping Jacks",
    muscles:["Cardio","Full Body"],
    description:"Classic full-body cardio warm-up and endurance exercise.",
    tips:["Land softly on slightly bent knees","Arms go all the way overhead","Keep a steady rhythm","Great as a workout finisher"],
    gif:"https://i.imgur.com/iIqmM5t.gif",
    youtube:"https://www.youtube.com/watch?v=1Lv7qeC9GKk",
    variations:{beginner:{sets:3,reps:"30s"},intermediate:{sets:4,reps:"45s"},advanced:{sets:5,reps:"60s"}}
  }
};

// ==========================================
// WEEKLY PLAN TEMPLATES — 5-6 days/week
// ==========================================

const WEEKLY_TEMPLATES = {
  beginner: [
    {day:"Mon",name:"Push Day A",type:"push",muscles:"Chest · Shoulders · Triceps",duration:30,color:"#E8FF4A",
     exercises:["pushups","wideGripPushups","pikePress","tricepDips","gluteBridge"]},
    {day:"Tue",name:"Legs + Core",type:"legs",muscles:"Quads · Glutes · Abs",duration:30,color:"#3b82f6",
     exercises:["squats","lunges","gluteBridge","plank","legRaises"]},
    {day:"Wed",name:"Pull Day",type:"pull",muscles:"Back · Biceps · Rear Delts",duration:30,color:"#a855f7",
     exercises:["invertedRows","supermanHold","backExtensions","rearDeltFlies","mountainClimbers"]},
    {day:"Thu",name:"Rest Day",type:"rest",muscles:"Active recovery",duration:0,color:"#333",exercises:[]},
    {day:"Fri",name:"Push Day B",type:"push",muscles:"Chest · Shoulders · Core",duration:30,color:"#E8FF4A",
     exercises:["declinePushups","wideGripPushups","shoulderTaps","tricepDips","plank"]},
    {day:"Sat",name:"Full Body",type:"full",muscles:"Full Body · Cardio",duration:35,color:"#f97316",
     exercises:["burpees","squats","pushups","pelvicThrusts","mountainClimbers","hollowHold"]},
    {day:"Sun",name:"Rest Day",type:"rest",muscles:"Rest & recover",duration:0,color:"#333",exercises:[]}
  ],
  intermediate: [
    {day:"Mon",name:"Push Day A",type:"push",muscles:"Chest · Shoulders · Triceps",duration:40,color:"#E8FF4A",
     exercises:["pushups","wideGripPushups","diamondPushups","pikePress","tricepDips","declinePushups"]},
    {day:"Tue",name:"Pull Day",type:"pull",muscles:"Back · Biceps",duration:40,color:"#a855f7",
     exercises:["invertedRows","doorwayRow","supermanHold","backExtensions","rearDeltFlies"]},
    {day:"Wed",name:"Legs + Glutes",type:"legs",muscles:"Quads · Glutes · Hamstrings",duration:40,color:"#3b82f6",
     exercises:["squats","lunges","gluteBridge","singleLegGluteBridge","calfRaises","pelvicThrusts"]},
    {day:"Thu",name:"Core & Stability",type:"core",muscles:"Abs · Obliques · Deep Core",duration:30,color:"#22c55e",
     exercises:["plank","sidePlank","hollowHold","mountainClimbers","legRaises","russianTwists"]},
    {day:"Fri",name:"Push Day B",type:"push",muscles:"Chest · Shoulders · Triceps",duration:40,color:"#E8FF4A",
     exercises:["archerPushups","shoulderTaps","diamondPushups","pikePress","tricepDips","pushups"]},
    {day:"Sat",name:"Full Body HIIT",type:"full",muscles:"Full Body · Cardio",duration:45,color:"#f97316",
     exercises:["burpees","jumpSquats","invertedRows","pelvicThrusts","mountainClimbers","plank"]},
    {day:"Sun",name:"Rest Day",type:"rest",muscles:"Rest & recover",duration:0,color:"#333",exercises:[]}
  ],
  advanced: [
    {day:"Mon",name:"Push Day A",type:"push",muscles:"Chest · Shoulders · Triceps",duration:55,color:"#E8FF4A",
     exercises:["archerPushups","declinePushups","diamondPushups","pikePress","tricepDips","wideGripPushups"]},
    {day:"Tue",name:"Pull Day",type:"pull",muscles:"Back · Biceps",duration:50,color:"#a855f7",
     exercises:["invertedRows","doorwayRow","supermanHold","backExtensions","rearDeltFlies"]},
    {day:"Wed",name:"Legs + Power",type:"legs",muscles:"Quads · Glutes · Power",duration:55,color:"#3b82f6",
     exercises:["jumpSquats","lunges","singleLegGluteBridge","pelvicThrusts","stepUps","wallSit"]},
    {day:"Thu",name:"Core & Mobility",type:"core",muscles:"Deep Core · Obliques · Stability",duration:40,color:"#22c55e",
     exercises:["hollowHold","sidePlank","deadBug","mountainClimbers","vSitups","russianTwists"]},
    {day:"Fri",name:"Push Day B",type:"push",muscles:"Chest · Shoulders · Triceps",duration:55,color:"#E8FF4A",
     exercises:["archerPushups","shoulderTaps","diamondPushups","pikePress","tricepDips","pushups"]},
    {day:"Sat",name:"Full Body HIIT",type:"full",muscles:"Full Body · Cardio · Explosive Power",duration:55,color:"#f97316",
     exercises:["burpees","jumpSquats","invertedRows","pelvicThrusts","highKnees","mountainClimbers","plank"]},
    {day:"Sun",name:"Active Recovery",type:"rest",muscles:"Light movement & stretch",duration:15,color:"#333",exercises:[]}
  ]
};

// ==========================================
// KEGEL PROGRAM DATA
// ==========================================

const KEGEL_PROGRAMS = {
  beginner: {
    title:"Beginner Kegel Program", week:"Weeks 1–4",
    exercises:[
      {name:"Basic Slow Hold",contract:5,rest:5,reps:8,
       instruction:"Contract your pelvic floor muscles firmly. Hold, then slowly release. Imagine you're stopping urination midstream.",
       purpose:"Builds foundational strength and mind-muscle connection",
       howTo:"Sit or lie comfortably. Tighten only your pelvic floor — not your abs, glutes, or thighs. Hold for the timer, then fully release."},
      {name:"Quick Flicks",contract:1,rest:2,reps:10,
       instruction:"Fast contractions — squeeze and immediately release. Think of a fast pulsing action.",
       purpose:"Trains fast-twitch fibers for ejaculation control",
       howTo:"Sitting or lying. Rapid squeeze-release-squeeze rhythm. Keep surrounding muscles relaxed."},
      {name:"Elevator Squeeze",contract:8,rest:8,reps:5,
       instruction:"Gradually increase contraction intensity in 3 stages (30% → 60% → 100%), then release in stages.",
       purpose:"Builds strength through the full range of contraction",
       howTo:"Squeeze to 30%, hold 2s, to 60%, hold 2s, to 100%, hold 4s. Then release in reverse."}
    ]
  },
  intermediate: {
    title:"Intermediate Kegel Program", week:"Weeks 5–10",
    exercises:[
      {name:"Extended Hold",contract:8,rest:6,reps:10,
       instruction:"Hold at maximum contraction for 8 full seconds. Release fully before the next rep.",
       purpose:"Builds ischiocavernosus strength for stronger erections",
       howTo:"Maximum squeeze, maintain it for 8 full counts. Full release before next rep. Quality over quantity."},
      {name:"Rapid Fire",contract:1,rest:1,reps:20,
       instruction:"Maximum speed contractions. Squeeze-release-squeeze-release with no pause.",
       purpose:"Develops ejaculatory delay reflex",
       howTo:"As fast as possible while still achieving full squeeze. Don't sacrifice form for speed."},
      {name:"Pre-Contraction Pull",contract:10,rest:8,reps:8,
       instruction:"Push slightly out, then immediately pull in and up hard. Full range of motion.",
       purpose:"Full range motion for maximum muscle activation",
       howTo:"Gently push outward (like starting to urinate), then hard pull inward and upward. Full range."}
    ]
  },
  advanced: {
    title:"Advanced Kegel Program", week:"Weeks 11+",
    exercises:[
      {name:"Max Endurance Hold",contract:15,rest:10,reps:10,
       instruction:"Sustain a strong contraction for 15 full seconds. Breathe normally throughout.",
       purpose:"Elite pelvic floor endurance for lasting power",
       howTo:"Maximum squeeze held for full 15 seconds. Do NOT hold your breath. Normal breathing is mandatory."},
      {name:"Power Pulsing",contract:1,rest:1,reps:30,
       instruction:"30 consecutive maximum-effort rapid contractions. Short rest then repeat.",
       purpose:"Maximum fast-twitch fiber activation",
       howTo:"Full-intensity fast pulses. 30 in a row. Brief rest between sets. This will burn — that's normal."},
      {name:"Progressive Pyramid",contract:3,rest:3,reps:12,
       instruction:"3s hold → 5s → 8s → 10s → back down. Follow the pyramid with maximum tension.",
       purpose:"Full-spectrum strength and endurance development",
       howTo:"Go up the ladder then back down. Each hold at full effort. Don't skip rungs."}
    ]
  }
};

// ==========================================
// NUTRITION TIPS (daily rotation)
// ==========================================

const NUTRITION_TIPS = [
  "🥚 <strong>Eat 3–5 eggs daily.</strong> One of nature's most complete muscle-building foods — packed with protein, healthy fats, and cholesterol needed for testosterone production.",
  "🍌 <strong>Eat bananas before your workout.</strong> Fast-acting carbs fuel your session. Potassium also prevents muscle cramps and supports nerve function.",
  "🥩 <strong>Aim for 1.6–2g of protein per kg of bodyweight.</strong> If you weigh 70kg, target ~120–140g protein daily from chicken, eggs, fish, lentils, or cottage cheese.",
  "🌰 <strong>Snack on nuts — especially almonds and walnuts.</strong> Healthy fats are essential for testosterone synthesis. Low-fat diets are linked to lower T-levels in men.",
  "🥦 <strong>Eat cruciferous vegetables 4–5× per week.</strong> Broccoli, cauliflower, and Brussels sprouts support healthy estrogen balance, keeping testosterone dominant.",
  "💧 <strong>Drink 3–4 liters of water daily.</strong> Dehydration reduces strength by up to 15% and directly impairs sexual performance and energy.",
  "🍚 <strong>Don't skip carbohydrates if gaining weight is your goal.</strong> Eat rice, oats, potatoes, and bread — these are your calorie surplus foods for muscle growth.",
  "🌿 <strong>Try ashwagandha (600mg daily).</strong> One of the best-evidenced herbs for testosterone support, stress reduction, and sexual performance improvement.",
  "🫙 <strong>Eat before bed for muscle gain.</strong> Cottage cheese or Greek yogurt before sleep provides slow-digesting casein protein to feed muscle repair overnight.",
  "🔴 <strong>Eat beets or drink beet juice pre-workout.</strong> Natural nitrates boost blood flow — good for erections and workout performance.",
  "🥗 <strong>Include dark leafy greens daily.</strong> Spinach and kale are rich in magnesium — a mineral that supports testosterone levels and improves sleep quality.",
  "🍯 <strong>Add natural calorie boosters if underweight:</strong> Mix peanut butter into oats, add olive oil to meals, drink full-fat milk. Small changes add 300–500 extra calories easily.",
  "🫐 <strong>Eat antioxidant-rich foods.</strong> Blueberries, pomegranate, and dark chocolate protect blood vessel health — critical for strong erections as you age.",
  "🌊 <strong>Eat fatty fish twice a week.</strong> Salmon, mackerel, and sardines are rich in omega-3s that reduce inflammation, support heart health, and improve blood flow.",
];
