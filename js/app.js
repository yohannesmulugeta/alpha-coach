// ALPHA HOME WORKOUT COACH — v3
// Updates: GIF demos, how-to images in kegel, fixed YouTube links,
// 5-6 day plans, no-equipment exercises, improved exercise modal

// ── STATE ──
let currentStep = 1;
const TOTAL_STEPS = 9;
let userProfile = {};
let weekPlan = [];
let currentDayIndex = 0;
let kegelLevel = 'beginner';
let kegelTimerInterval = null;
let kegelSessionState = {};
let restTimerInterval = null;
let restDuration = 60;
let restRemaining = 60;
let pendingSetLog = null;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

  const saved = localStorage.getItem('alphaCoachProfile');
  if (saved) {
    try {
      userProfile = JSON.parse(saved);
      weekPlan = userProfile.weekPlan || [];
      if (weekPlan.length > 0) {
        hideSplash(() => {
          document.getElementById('onboarding').classList.add('hidden');
          initApp();
        });
        return;
      }
    } catch(e) { localStorage.removeItem('alphaCoachProfile'); }
  }
  hideSplash(() => document.getElementById('onboarding').classList.remove('hidden'));
});

function hideSplash(cb) {
  setTimeout(() => {
    const s = document.getElementById('splash');
    s.classList.add('fade-out');
    setTimeout(() => { s.classList.add('hidden'); cb && cb(); }, 600);
  }, 2600);
}

function haptic(ms = 8) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

// ── ONBOARDING ──
function updateProgress() {
  const pct = ((currentStep - 1) / TOTAL_STEPS) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('step-label').textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
}

function showStep(n) {
  document.querySelectorAll('.step').forEach(s => { s.classList.remove('active'); s.classList.add('hidden'); });
  const t = document.querySelector(`.step[data-step="${n}"]`);
  if (t) { t.classList.remove('hidden'); t.classList.add('active'); }
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.textContent = '');
  document.querySelectorAll('.form-group input').forEach(i => i.classList.remove('error'));
}
function fieldError(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);
  if (inp) inp.classList.add('error');
  if (err) err.textContent = msg;
}

function nextStep() {
  clearErrors();
  let valid = true;

  if (currentStep === 2) {
    const name = document.getElementById('q-name').value.trim();
    const age = document.getElementById('q-age').value;
    const weight = document.getElementById('q-weight').value;
    const height = document.getElementById('q-height').value;
    if (!name) { fieldError('q-name','err-name','Please enter your name'); valid = false; }
    if (!age || age < 16 || age > 80) { fieldError('q-age','err-age','Enter a valid age (16–80)'); valid = false; }
    if (!weight || weight < 40 || weight > 300) { fieldError('q-weight','err-weight','Enter valid weight'); valid = false; }
    if (!height || height < 140 || height > 220) { fieldError('q-height','err-height','Enter valid height'); valid = false; }
    if (!valid) return;
    userProfile.name = name;
    userProfile.age = parseInt(age);
    userProfile.weight = parseFloat(weight);
    userProfile.height = parseInt(height);
  }
  if (currentStep === 3 && !document.getElementById('q-goal').value) { showToast('Please select a goal'); return; }
  if (currentStep === 4 && !document.getElementById('q-level').value) { showToast('Please select your level'); return; }
  if (currentStep === 5 && !document.getElementById('q-time').value) { showToast('Please select your time'); return; }
  if (currentStep === 8 && !document.getElementById('q-reminder').value) { showToast('Please choose a reminder option'); return; }

  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    updateProgress();
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    clearErrors();
    currentStep--;
    updateProgress();
    showStep(currentStep);
    restoreSelections();
  }
}

function restoreSelections() {
  const map = {
    'q-goal': '.step[data-step="3"] .option-card',
    'q-level': '.step[data-step="4"] .option-card',
    'q-time': '.step[data-step="5"] .option-card',
    'q-reminder': '.step[data-step="8"] .option-card',
    'q-kegel': '.step[data-step="9"] .option-card',
  };
  Object.entries(map).forEach(([fieldId, selector]) => {
    const val = document.getElementById(fieldId)?.value;
    if (!val) return;
    document.querySelectorAll(selector).forEach(c => {
      c.classList.toggle('selected', c.dataset.value === val);
    });
  });
}

function selectOption(el, fieldId) {
  el.closest('.option-cards, .step').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById(fieldId).value = el.dataset.value;
  haptic(6);
}

function generatePlan() {
  if (!document.getElementById('q-kegel').value) { showToast('Please select an option'); return; }

  userProfile.goal = document.getElementById('q-goal').value;
  userProfile.level = document.getElementById('q-level').value;
  userProfile.time = parseInt(document.getElementById('q-time').value);
  userProfile.kegel = document.getElementById('q-kegel').value;
  userProfile.reminder = document.getElementById('q-reminder').value;

  const equip = [];
  document.querySelectorAll('#equip-grid input:checked').forEach(c => equip.push(c.value));
  userProfile.equipment = equip.length ? equip : ['none'];

  const focus = [];
  document.querySelectorAll('.focus-check:checked').forEach(c => focus.push(c.value));
  userProfile.focus = focus.length ? focus : ['full'];

  showStep('generating');
  document.getElementById('step-label').textContent = 'Building plan...';

  const msgs = document.querySelectorAll('.gen-msg');
  let i = 0;
  const mi = setInterval(() => {
    msgs.forEach(m => m.classList.remove('active'));
    if (i < msgs.length) msgs[i].classList.add('active');
    i++;
    if (i >= msgs.length) clearInterval(mi);
  }, 480);

  setTimeout(() => {
    weekPlan = JSON.parse(JSON.stringify(WEEKLY_TEMPLATES[userProfile.level] || WEEKLY_TEMPLATES.beginner));
    userProfile.weekPlan = weekPlan;
    userProfile.createdAt = new Date().toISOString();
    userProfile.workoutsDone = [];
    userProfile.kegelDone = [];
    userProfile.weightLog = [];
    userProfile.workoutLog = {};
    userProfile.setLog = {};
    userProfile.weeksCompleted = 0;

    if (userProfile.reminder !== 'none') scheduleReminder(userProfile.reminder);

    saveProfile();
    document.getElementById('onboarding').classList.add('hidden');
    initApp();
  }, 3000);
}

async function scheduleReminder(time) {
  if (!('Notification' in window)) return;
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') return;
  showToast(`Reminder set for ${time} ✓`, 'success');
}

// ── MAIN APP ──
function initApp() {
  document.getElementById('app').classList.remove('hidden');
  const jsDay = new Date().getDay();
  currentDayIndex = jsDay === 0 ? 6 : jsDay - 1;

  applyProgressiveOverload();
  renderDashboard();
  renderWorkoutPage();
  renderKegelPage();

  if (userProfile.kegel === 'no') {
    const kn = document.getElementById('nav-kegel');
    if (kn) kn.style.display = 'none';
  }
  showPage('dashboard');
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const page = document.getElementById(`page-${name}`);
  if (page) {
    page.classList.remove('hidden');
    requestAnimationFrame(() => page.classList.add('active'));
  }
  const btn = document.querySelector(`[data-page="${name}"]`);
  if (btn) btn.classList.add('active');

  if (name === 'progress') renderProgressPage();
  if (name === 'export') renderExportPage();
  haptic(4);
}

// ── PROGRESSIVE OVERLOAD ──
function applyProgressiveOverload() {
  const created = new Date(userProfile.createdAt || new Date().toISOString());
  const now = new Date();
  const daysDiff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  const weeksElapsed = Math.floor(daysDiff / 7);

  if (weeksElapsed === userProfile.weeksCompleted) return;

  userProfile.weeksCompleted = weeksElapsed;
  const level = userProfile.level || 'beginner';

  weekPlan.forEach(day => {
    day.exercises.forEach(exKey => {
      const ex = EXERCISES[exKey];
      if (!ex) return;
      const vars = ex.variations[level];
      if (!vars) return;
      const storeKey = `overload-${exKey}-${level}`;
      let stored = JSON.parse(localStorage.getItem(storeKey) || 'null');
      if (!stored) stored = { sets: vars.sets, reps: vars.reps, weeks: 0 };
      const extraSets = Math.floor(weeksElapsed / 4);
      const extraReps = (weeksElapsed % 4) * 1;
      stored.sets = Math.min(vars.sets + extraSets, vars.sets + 2);
      stored.reps = typeof vars.reps === 'string' ? vars.reps : Math.min(vars.reps + extraReps, vars.reps + 6);
      stored.weeks = weeksElapsed;
      localStorage.setItem(storeKey, JSON.stringify(stored));
    });
  });

  if (weeksElapsed > 0) {
    const banner = document.getElementById('overload-banner');
    const msg = document.getElementById('overload-msg');
    if (banner) {
      banner.style.display = 'flex';
      if (msg) msg.textContent = `Week ${weeksElapsed + 1} — your reps and sets have been automatically increased.`;
      setTimeout(() => { if (banner) banner.style.display = 'none'; }, 8000);
    }
  }
  saveProfile();
}

function getOverloadedVars(exKey, level) {
  const ex = EXERCISES[exKey];
  if (!ex) return null;
  const base = ex.variations[level] || ex.variations.beginner;
  const storeKey = `overload-${exKey}-${level}`;
  const stored = JSON.parse(localStorage.getItem(storeKey) || 'null');
  if (stored && stored.weeks > 0) return { ...base, sets: stored.sets, reps: stored.reps };
  return base;
}

// ── BMI & CALORIES ──
function calcMetrics() {
  const w = userProfile.weight;
  const h = userProfile.height;
  const age = userProfile.age;
  if (!w || !h || !age) return null;

  const bmi = w / ((h / 100) ** 2);
  const bmr = 10 * w + 6.25 * h - 5 * age + 5;
  let tdee = bmr * 1.55;
  if (userProfile.goal === 'gain-weight') tdee += 400;
  const protein = Math.round(w * 1.8);

  return { bmi: bmi.toFixed(1), cals: Math.round(tdee), protein };
}

function calcStreak() {
  const done = userProfile.workoutsDone || [];
  if (!done.length) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (done.includes(key)) {
      streak++;
    } else if (i === 0) {
      continue;
    } else {
      break;
    }
  }
  return streak;
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDateKey(dayOffset) {
  const today = new Date();
  const jsDay = today.getDay();
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay;
  const t = new Date(today);
  t.setDate(today.getDate() + mondayOffset + dayOffset);
  return t.toISOString().slice(0, 10);
}

function getThisWeekCount() {
  const done = userProfile.workoutsDone || [];
  const now = new Date();
  const jsDay = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (jsDay === 0 ? 6 : jsDay - 1));
  monday.setHours(0, 0, 0, 0);
  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    if (done.includes(d.toISOString().slice(0, 10))) count++;
  }
  return count;
}

// ── DASHBOARD ──
function renderDashboard() {
  const h = new Date().getHours();
  const name = userProfile.name || '';
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').textContent = greet + (name ? ',' : '');
  document.getElementById('dash-name').textContent = name ? `${name}! 💪` : 'Ready to train?';

  const today = weekPlan[currentDayIndex];
  if (today) {
    document.getElementById('today-day-name').textContent = today.name;
    document.getElementById('today-desc').textContent = today.muscles;
    document.getElementById('today-exercises').textContent =
      today.exercises.length ? `${today.exercises.length} exercises` : 'Rest day';
    document.getElementById('today-duration').textContent =
      today.duration ? `~${today.duration} min` : '';
  }

  const m = calcMetrics();
  if (m) {
    document.getElementById('m-bmi').textContent = m.bmi;
    document.getElementById('m-cals').textContent = m.cals.toLocaleString();
    document.getElementById('m-protein').textContent = m.protein + 'g';
  }

  const strip = document.getElementById('week-strip');
  strip.innerHTML = '';
  const dayNames = ['M','T','W','T','F','S','S'];
  const done = userProfile.workoutsDone || [];
  weekPlan.forEach((day, i) => {
    const div = document.createElement('div');
    div.className = 'week-day'
      + (i === currentDayIndex ? ' today' : '')
      + (done.includes(getDateKey(i)) ? ' done' : '')
      + (day.type === 'rest' ? ' rest' : '');
    div.innerHTML = `<span>${dayNames[i]}</span><div class="day-dot"></div><span style="font-size:.55rem;color:var(--text3)">${day.type==='rest'?'💤':day.type.slice(0,1).toUpperCase()}</span>`;
    div.onclick = () => { currentDayIndex = i; showPage('workout'); renderWorkoutPage(); };
    strip.appendChild(div);
  });

  const streak = calcStreak();
  document.getElementById('streak-count').textContent = streak;
  document.getElementById('stat-workouts').textContent = done.length;
  document.getElementById('stat-streak').textContent = streak;
  document.getElementById('stat-week').textContent = getThisWeekCount();

  if (userProfile.kegel === 'no') {
    const kc = document.getElementById('kegel-reminder-card');
    if (kc) kc.style.display = 'none';
  }

  const tipIdx = new Date().getDate() % NUTRITION_TIPS.length;
  document.getElementById('nutrition-tip').innerHTML = NUTRITION_TIPS[tipIdx];
}

// ── WORKOUT PAGE ──
function renderWorkoutPage() {
  const day = weekPlan[currentDayIndex];
  if (!day) return;
  document.getElementById('workout-day-title').textContent = day.name;
  document.getElementById('workout-day-desc').textContent = day.muscles;

  const tabs = document.getElementById('day-tabs');
  tabs.innerHTML = '';
  const dayShort = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  dayShort.forEach((n, i) => {
    const btn = document.createElement('button');
    btn.className = 'day-tab' + (i === currentDayIndex ? ' active' : '');
    btn.textContent = `${n}: ${weekPlan[i].name}`;
    btn.onclick = () => { currentDayIndex = i; renderWorkoutPage(); renderDashboard(); };
    tabs.appendChild(btn);
  });

  const list = document.getElementById('exercise-list');
  list.innerHTML = '';

  if (day.type === 'rest' || day.exercises.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;color:var(--text2)">
        <div style="font-size:3rem;margin-bottom:1rem">💤</div>
        <h3 style="margin-bottom:.5rem;font-family:'Syne',sans-serif">Rest Day</h3>
        <p style="font-size:.9rem">Muscles grow during recovery. Light walking or stretching is ideal today.</p>
        <div style="margin-top:1.5rem;padding:1rem;background:var(--bg3);border-radius:var(--radius);text-align:left;font-size:.85rem;color:var(--text2);line-height:1.7">
          <strong style="color:var(--accent)">Active recovery suggestions:</strong><br><br>
          • 10–15 min walk outside<br>
          • Hip flexor + hamstring stretches<br>
          • 8–9 hours of sleep tonight<br>
          ${userProfile.kegel !== 'no' ? '• <strong style="color:var(--accent)">Don\'t skip your Kegel session →</strong>' : ''}
        </div>
      </div>`;
    return;
  }

  const level = userProfile.level || 'beginner';
  const doneKey = `${getDateKey(currentDayIndex)}-done`;
  const checked = JSON.parse(localStorage.getItem(doneKey) || '{}');

  day.exercises.forEach(exKey => {
    const ex = EXERCISES[exKey];
    if (!ex) return;
    const vars = getOverloadedVars(exKey, level);
    if (!vars) return;
    const isDone = checked[exKey];
    const repsLabel = typeof vars.reps === 'string' ? vars.reps :
      (vars.hold ? `${vars.reps} × ${vars.hold}` : vars.reps);

    const setLogKey = `${getTodayKey()}-${exKey}`;
    const setLogs = JSON.parse(localStorage.getItem(setLogKey) || '[]');
    const setLogHtml = setLogs.length
      ? `<div class="set-log-history">${setLogs.map((s,i) => `<span class="set-log-pill">Set ${i+1}: ${s.reps} reps</span>`).join('')}</div>`
      : '';

    const card = document.createElement('div');
    card.className = 'ex-card' + (isDone ? ' done' : '');
    card.innerHTML = `
      <div class="ex-image" onclick="openExModal('${exKey}')">
        ${renderMuscleSvg(ex.muscles)}
        <div class="ex-gif-hint" title="Tap for demo">▶</div>
      </div>
      <div class="ex-info" onclick="openExModal('${exKey}')">
        <div class="ex-name">${ex.name}</div>
        <div class="ex-sets">${vars.sets} sets × ${repsLabel}</div>
        <div class="ex-desc">${ex.description}</div>
        <div class="ex-tags">${ex.muscles.map(m=>`<span class="ex-tag">${m}</span>`).join('')}</div>
        ${isDone ? '<div class="ex-done-check">✓ Complete</div>' : ''}
        ${setLogHtml}
      </div>
      <div class="ex-actions">
        <button class="ex-check-btn${isDone?' checked':''}" onclick="toggleExDone('${exKey}',event)" title="Mark done">${isDone?'✓':'○'}</button>
        <button class="ex-log-btn" onclick="openSetLog('${exKey}','${ex.name}',event)" title="Log reps">+</button>
        <button class="ex-yt-btn" onclick="openExModal('${exKey}');event.stopPropagation();" title="Watch how-to">📹</button>
      </div>`;
    list.appendChild(card);
  });
}

function renderMuscleSvg(muscles) {
  const primary = (muscles[0] || '').toLowerCase();
  let color = '#E8FF4A';
  let icon = '';

  if (primary.includes('chest')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><ellipse cx="16" cy="22" rx="10" ry="13" fill="${color}" opacity=".85"/><ellipse cx="32" cy="22" rx="10" ry="13" fill="${color}" opacity=".85"/><rect x="21" y="12" width="6" height="20" rx="3" fill="var(--bg3)"/></svg>`;
  } else if (primary.includes('back') || primary.includes('lat')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><path d="M10 8 C10 8 6 28 8 40 L14 40 C14 28 16 18 24 14 C32 18 34 28 34 40 L40 40 C42 28 38 8 38 8 L24 4 Z" fill="${color}" opacity=".85"/></svg>`;
  } else if (primary.includes('shoulder') || primary.includes('delt')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><ellipse cx="12" cy="20" rx="9" ry="11" fill="${color}" opacity=".85"/><ellipse cx="36" cy="20" rx="9" ry="11" fill="${color}" opacity=".85"/><rect x="14" y="20" width="20" height="18" rx="4" fill="var(--bg3)"/></svg>`;
  } else if (primary.includes('tricep')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><path d="M8 10 L8 38 Q8 42 12 42 L14 42 Q18 42 18 38 L18 10 Z" fill="${color}" opacity=".85"/><path d="M30 10 L30 38 Q30 42 34 42 L36 42 Q40 42 40 38 L40 10 Z" fill="${color}" opacity=".85"/></svg>`;
  } else if (primary.includes('bicep') || primary.includes('arm')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><ellipse cx="16" cy="22" rx="7" ry="14" fill="${color}" opacity=".85"/><ellipse cx="32" cy="22" rx="7" ry="14" fill="${color}" opacity=".85"/></svg>`;
  } else if (primary.includes('quad') || primary.includes('leg') || primary.includes('ham')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><rect x="10" y="8" width="12" height="32" rx="6" fill="${color}" opacity=".85"/><rect x="26" y="8" width="12" height="32" rx="6" fill="${color}" opacity=".85"/></svg>`;
  } else if (primary.includes('glute')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><ellipse cx="16" cy="26" rx="12" ry="14" fill="${color}" opacity=".85"/><ellipse cx="32" cy="26" rx="12" ry="14" fill="${color}" opacity=".85"/></svg>`;
  } else if (primary.includes('core') || primary.includes('ab') || primary.includes('oblique')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><rect x="17" y="6" width="14" height="8" rx="3" fill="${color}" opacity=".85"/><rect x="17" y="18" width="14" height="8" rx="3" fill="${color}" opacity=".85"/><rect x="17" y="30" width="14" height="8" rx="3" fill="${color}" opacity=".85"/><rect x="7" y="12" width="8" height="22" rx="3" fill="${color}" opacity=".5"/><rect x="33" y="12" width="8" height="22" rx="3" fill="${color}" opacity=".5"/></svg>`;
  } else if (primary.includes('calf')) {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><ellipse cx="16" cy="28" rx="8" ry="14" fill="${color}" opacity=".85"/><ellipse cx="32" cy="28" rx="8" ry="14" fill="${color}" opacity=".85"/></svg>`;
  } else {
    icon = `<svg viewBox="0 0 48 48" class="ex-muscle-svg"><circle cx="24" cy="10" r="7" fill="${color}" opacity=".85"/><rect x="16" y="18" width="16" height="18" rx="5" fill="${color}" opacity=".85"/><rect x="8" y="20" width="8" height="14" rx="4" fill="${color}" opacity=".6"/><rect x="32" y="20" width="8" height="14" rx="4" fill="${color}" opacity=".6"/><rect x="14" y="36" width="8" height="10" rx="4" fill="${color}" opacity=".7"/><rect x="26" y="36" width="8" height="10" rx="4" fill="${color}" opacity=".7"/></svg>`;
  }
  return icon;
}

function toggleExDone(key, e) {
  e.stopPropagation();
  haptic(10);
  const doneKey = `${getDateKey(currentDayIndex)}-done`;
  const checked = JSON.parse(localStorage.getItem(doneKey) || '{}');
  checked[key] = !checked[key];
  localStorage.setItem(doneKey, JSON.stringify(checked));
  renderWorkoutPage();
}

function completeWorkout() {
  const day = weekPlan[currentDayIndex];
  if (day.type === 'rest') { showToast('This is a rest day 💤'); return; }
  haptic([20, 10, 20]);

  const dateKey = getTodayKey();
  if (!userProfile.workoutsDone.includes(dateKey)) {
    userProfile.workoutsDone.push(dateKey);
  }

  if (!userProfile.workoutLog) userProfile.workoutLog = {};
  userProfile.workoutLog[dateKey] = {
    dayName: day.name,
    muscles: day.muscles,
    exercises: day.exercises.map(k => {
      const ex = EXERCISES[k];
      const vars = getOverloadedVars(k, userProfile.level || 'beginner');
      return { name: ex ? ex.name : k, sets: vars ? vars.sets : '—', reps: vars ? vars.reps : '—' };
    })
  };

  const doneKey = `${getDateKey(currentDayIndex)}-done`;
  const allDone = {};
  day.exercises.forEach(k => allDone[k] = true);
  localStorage.setItem(doneKey, JSON.stringify(allDone));

  saveProfile();
  stopRestTimer();
  showToast('Workout complete! 💪🔥', 'success');
  renderDashboard();
  renderWorkoutPage();
}

// ── EXERCISE MODAL — with GIF demo ──
function openExModal(key) {
  const ex = EXERCISES[key];
  if (!ex) return;
  const level = userProfile.level || 'beginner';
  const vars = getOverloadedVars(key, level) || ex.variations.beginner;

  // Build GIF section
  const gifSection = ex.gif ? `
    <div class="ex-modal-gif-wrap">
      <div class="ex-modal-gif-label">HOW TO DO IT</div>
      <div class="ex-modal-gif-container">
        <img src="${ex.gif}" 
             alt="${ex.name} demonstration"
             class="ex-modal-gif"
             onerror="this.parentElement.innerHTML='<div class=\\'gif-fallback\\'>🏋️<br><small>Animation unavailable</small></div>'"
             loading="lazy">
      </div>
    </div>` : '';

  // YouTube link section
  const ytSection = ex.youtube ? `
    <a href="${ex.youtube}" target="_blank" rel="noopener noreferrer" class="ex-modal-yt" onclick="event.stopPropagation()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff0000"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.75 12.31 12.31 0 01-8.26 2.19A12.31 12.31 0 014.41 3.94a4.83 4.83 0 01-3.77 2.75A12.28 12.28 0 002 12a12 12 0 0020 0 12.28 12.28 0 00-2.41-5.31zM12 16a4 4 0 110-8 4 4 0 010 8z"/></svg>
      <span>Watch Full Tutorial on YouTube →</span>
    </a>` : '';

  document.getElementById('ex-modal-content').innerHTML = `
    <div class="ex-modal-header">
      <div class="ex-modal-name">${ex.name}</div>
      <div class="ex-modal-meta">${vars.sets} sets × ${vars.reps}${vars.hold ? ' · Hold ' + vars.hold : ''}</div>
    </div>
    ${gifSection}
    <div class="ex-modal-section"><h4>Description</h4><p>${ex.description}</p></div>
    <div class="ex-modal-section"><h4>Form Tips</h4><ul>${ex.tips.map(t=>`<li>${t}</li>`).join('')}</ul></div>
    <div class="ex-modal-section"><h4>Target Muscles</h4><p>${ex.muscles.join(' · ')}</p></div>
    ${ytSection}`;

  document.getElementById('ex-modal').classList.remove('hidden');
}

function closeExModal() { document.getElementById('ex-modal').classList.add('hidden'); }

// ── SET LOGGING ──
function openSetLog(exKey, exName, e) {
  e.stopPropagation();
  pendingSetLog = { exKey };
  const setLogKey = `${getTodayKey()}-${exKey}`;
  const existing = JSON.parse(localStorage.getItem(setLogKey) || '[]');
  const setNum = existing.length + 1;
  const vars = getOverloadedVars(exKey, userProfile.level || 'beginner');

  document.getElementById('setlog-title').textContent = `${exName} — Set ${setNum}`;
  document.getElementById('setlog-subtitle').textContent = `Target: ${vars ? vars.reps : '?'} reps`;
  document.getElementById('setlog-reps').value = '';
  document.getElementById('setlog-modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('setlog-reps').focus(), 100);
}

function closeSetLog() { document.getElementById('setlog-modal').classList.add('hidden'); pendingSetLog = null; }

function saveSetLog() {
  const reps = parseInt(document.getElementById('setlog-reps').value);
  if (!reps || reps < 1) { showToast('Enter reps completed'); return; }
  if (!pendingSetLog) return;

  const { exKey } = pendingSetLog;
  const setLogKey = `${getTodayKey()}-${exKey}`;
  const existing = JSON.parse(localStorage.getItem(setLogKey) || '[]');
  existing.push({ set: existing.length + 1, reps });
  localStorage.setItem(setLogKey, JSON.stringify(existing));

  closeSetLog();
  haptic(12);
  renderWorkoutPage();
  startRestTimer(60);
  showToast(`Set logged: ${reps} reps ✓`, 'success');
}

// ── REST TIMER ──
function startRestTimer(seconds) {
  stopRestTimer();
  restDuration = seconds;
  restRemaining = seconds;

  const bar = document.getElementById('rest-timer-bar');
  bar.classList.remove('hidden');
  updateRestDisplay();

  restTimerInterval = setInterval(() => {
    restRemaining--;
    updateRestDisplay();
    if (restRemaining <= 3 && restRemaining > 0) haptic(30);
    if (restRemaining <= 0) {
      haptic([40, 20, 40]);
      stopRestTimer();
      showToast('Rest complete — next set! 💥', 'success');
    }
  }, 1000);
}

function updateRestDisplay() {
  document.getElementById('rest-count').textContent = restRemaining;
  const pct = (restRemaining / restDuration) * 100;
  document.getElementById('rest-fill').style.width = pct + '%';
}

function stopRestTimer() {
  if (restTimerInterval) { clearInterval(restTimerInterval); restTimerInterval = null; }
  const bar = document.getElementById('rest-timer-bar');
  if (bar) bar.classList.add('hidden');
}

function skipRestTimer() { haptic(8); stopRestTimer(); }

// ── KEGEL PAGE — with how-to images ──
function renderKegelPage() { setKegelLevel(kegelLevel); }

function setKegelLevel(level) {
  kegelLevel = level;
  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.level-btn').forEach(b => {
    if (b.textContent.toLowerCase() === level) b.classList.add('active');
  });
  const prog = KEGEL_PROGRAMS[level];
  const c = document.getElementById('kegel-exercises');
  c.innerHTML = `<div class="section"><h3 class="section-title">${prog.title} · ${prog.week}</h3></div>`;
  
  prog.exercises.forEach(ex => {
    const d = document.createElement('div');
    d.className = 'kegel-ex-item';
    d.innerHTML = `
      <div class="kegel-ex-header">
        <h4>${ex.name}</h4>
        <div class="kegel-timing">
          <span>⏱ Hold: ${ex.contract}s</span>
          <span>😮 Rest: ${ex.rest}s</span>
          <span>🔁 ${ex.reps} reps</span>
        </div>
      </div>
      <div class="kegel-how-to">
        <div class="kegel-how-label">HOW TO DO IT</div>
        <div class="kegel-anatomy-visual">
          <div class="anatomy-diagram">
            <svg viewBox="0 0 120 80" width="120" height="80">
              <!-- Body outline -->
              <ellipse cx="60" cy="20" rx="14" ry="16" fill="none" stroke="rgba(232,255,74,0.3)" stroke-width="1.5"/>
              <!-- Pelvis shape -->
              <path d="M35 45 Q60 35 85 45 Q88 60 80 68 Q60 72 40 68 Q32 60 35 45Z" fill="rgba(232,255,74,0.08)" stroke="rgba(232,255,74,0.4)" stroke-width="1.5"/>
              <!-- Pelvic floor muscles - highlighted -->
              <ellipse cx="60" cy="62" rx="16" ry="6" fill="rgba(232,255,74,0.35)" class="pf-muscle"/>
              <text x="60" y="66" text-anchor="middle" font-size="5" fill="#E8FF4A" font-family="sans-serif">PELVIC FLOOR</text>
              <!-- Spine indicator -->
              <line x1="60" y1="36" x2="60" y2="44" stroke="rgba(232,255,74,0.2)" stroke-width="2"/>
              <!-- Labels -->
              <text x="60" y="14" text-anchor="middle" font-size="6" fill="rgba(232,255,74,0.5)" font-family="sans-serif">CORE</text>
            </svg>
          </div>
          <div class="kegel-how-text">
            <p>${ex.howTo || ex.instruction}</p>
          </div>
        </div>
      </div>
      <p style="font-size:.75rem;color:var(--text3);margin-top:.5rem">💡 ${ex.purpose}</p>`;
    c.appendChild(d);
  });
}

function startKegelSession() {
  const prog = KEGEL_PROGRAMS[kegelLevel];
  kegelSessionState = {
    exercises: prog.exercises,
    exIdx: 0,
    round: 1,
    phase: 'contract',
    timeLeft: prog.exercises[0].contract,
    totalRounds: prog.exercises[0].reps,
    paused: false
  };
  document.getElementById('kegel-modal').classList.remove('hidden');
  updateKegelDisplay();
  startKegelTimer();
}

function updateKegelDisplay() {
  const s = kegelSessionState;
  if (!s.exercises || s.exIdx >= s.exercises.length) return;
  const ex = s.exercises[s.exIdx];

  document.getElementById('kegel-ex-name').textContent = ex.name;
  document.getElementById('kegel-ex-instruction').textContent = ex.instruction;
  document.getElementById('kegel-round').textContent = s.round;
  document.getElementById('kegel-total-rounds').textContent = s.totalRounds;
  document.getElementById('timer-count').textContent = s.timeLeft;
  document.getElementById('timer-phase').textContent = s.phase === 'contract' ? 'SQUEEZE' : 'RELEASE';
  document.getElementById('kegel-phase-label').textContent = s.phase === 'contract' ? 'Contracting' : 'Relaxing';

  const total = s.phase === 'contract' ? ex.contract : ex.rest;
  const pct = Math.max(0, s.timeLeft / total);
  document.getElementById('timer-ring').style.strokeDashoffset = 314 * (1 - pct);
  document.getElementById('timer-ring').style.stroke = s.phase === 'contract' ? '#E8FF4A' : '#3b82f6';
}

function startKegelTimer() {
  if (kegelTimerInterval) clearInterval(kegelTimerInterval);
  kegelTimerInterval = setInterval(() => {
    if (kegelSessionState.paused) return;
    const s = kegelSessionState;

    if (!s.exercises || s.exIdx >= s.exercises.length) {
      clearInterval(kegelTimerInterval);
      return;
    }

    s.timeLeft--;
    if (s.timeLeft <= 0) {
      const ex = s.exercises[s.exIdx];
      haptic(15);

      if (s.phase === 'contract') {
        s.phase = 'rest';
        s.timeLeft = ex.rest;
      } else {
        s.phase = 'contract';
        s.round++;
        if (s.round > s.totalRounds) {
          s.exIdx++;
          if (s.exIdx >= s.exercises.length) {
            clearInterval(kegelTimerInterval);
            kegelTimerInterval = null;
            closeKegelSession();
            kegelComplete();
            return;
          }
          const nextEx = s.exercises[s.exIdx];
          s.round = 1;
          s.totalRounds = nextEx.reps;
          s.timeLeft = nextEx.contract;
          s.phase = 'contract';
        } else {
          s.timeLeft = ex.contract;
        }
      }
    }
    updateKegelDisplay();
  }, 1000);
}

function toggleKegelPause() {
  kegelSessionState.paused = !kegelSessionState.paused;
  document.getElementById('kegel-pause-btn').textContent = kegelSessionState.paused ? '▶ Resume' : '⏸ Pause';
}

function closeKegelSession() {
  if (kegelTimerInterval) { clearInterval(kegelTimerInterval); kegelTimerInterval = null; }
  document.getElementById('kegel-modal').classList.add('hidden');
}

function kegelComplete() {
  haptic([30, 15, 30, 15, 60]);
  const dateKey = getTodayKey();
  if (!userProfile.kegelDone.includes(dateKey)) userProfile.kegelDone.push(dateKey);
  saveProfile();
  renderDashboard();
  document.getElementById('kegel-complete').classList.remove('hidden');
}

function closeKegelComplete() { document.getElementById('kegel-complete').classList.add('hidden'); }

// ── PROGRESS ──
function renderProgressPage() {
  const done = userProfile.workoutsDone || [];
  const kDone = userProfile.kegelDone || [];

  document.getElementById('prog-total').textContent = done.length;
  document.getElementById('prog-week').textContent = getThisWeekCount();
  document.getElementById('prog-kegel-total').textContent = kDone.length;

  const cal = document.getElementById('cal-grid');
  cal.innerHTML = '';
  ['M','T','W','T','F','S','S'].forEach(d => {
    const h = document.createElement('div');
    h.style.cssText = 'font-size:.6rem;color:var(--text3);text-align:center;padding:.25rem 0;font-family:Syne,sans-serif';
    h.textContent = d; cal.appendChild(h);
  });
  const now = new Date();
  const jsDay = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (jsDay === 0 ? 6 : jsDay - 1));
  monday.setHours(0, 0, 0, 0);
  const calStart = new Date(monday);
  calStart.setDate(monday.getDate() - 14);
  const todayStr = getTodayKey();
  for (let i = 0; i < 28; i++) {
    const d = new Date(calStart); d.setDate(calStart.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    const div = document.createElement('div');
    div.className = 'cal-day'
      + (done.includes(key) ? ' done' : '')
      + (kDone.includes(key) && !done.includes(key) ? ' kegel' : '')
      + (key === todayStr ? ' today' : '');
    div.textContent = d.getDate();
    cal.appendChild(div);
  }

  const muscleCounts = { Chest:0, Back:0, Legs:0, Core:0, Shoulders:0, Arms:0 };
  weekPlan.forEach((day, i) => {
    if (done.includes(getDateKey(i))) {
      day.exercises.forEach(exKey => {
        const ex = EXERCISES[exKey]; if (!ex) return;
        ex.muscles.forEach(m => {
          const k = m.split('(')[0].trim();
          if (k.includes('Chest')) muscleCounts.Chest++;
          else if (k.includes('Back') || k.includes('Lat')) muscleCounts.Back++;
          else if (k.includes('Quad') || k.includes('Glute') || k.includes('Ham') || k.includes('Leg')) muscleCounts.Legs++;
          else if (k.includes('Core') || k.includes('Ab') || k.includes('Oblique')) muscleCounts.Core++;
          else if (k.includes('Shoulder') || k.includes('Delt')) muscleCounts.Shoulders++;
          else if (k.includes('Bicep') || k.includes('Tricep') || k.includes('Arm')) muscleCounts.Arms++;
        });
      });
    }
  });
  const maxVal = Math.max(...Object.values(muscleCounts), 1);
  const bars = document.getElementById('muscle-bars');
  bars.innerHTML = '';
  Object.entries(muscleCounts).forEach(([muscle, count]) => {
    const pct = Math.round((count / maxVal) * 100);
    bars.innerHTML += `<div class="muscle-bar-row">
      <span class="muscle-bar-label">${muscle}</span>
      <div class="muscle-bar-track"><div class="muscle-bar-fill" style="width:${pct}%"></div></div>
      <span style="font-size:.75rem;color:var(--text3);width:20px;text-align:right">${count}</span>
    </div>`;
  });

  renderWeightChart(userProfile.weightLog || []);

  const wLog = userProfile.weightLog || [];
  const wHistory = document.getElementById('weight-history');
  if (!wLog.length) {
    wHistory.innerHTML = '<p style="font-size:.85rem;color:var(--text3)">No entries yet — log your first weight above.</p>';
  } else {
    wHistory.innerHTML = wLog.slice(-8).reverse().map(e =>
      `<div class="weight-entry"><span class="w-val">${e.weight} kg</span><span class="w-date">${e.date}</span></div>`
    ).join('');
  }

  renderWorkoutHistory();
}

function renderWeightChart(wLog) {
  const canvas = document.getElementById('weight-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 300;
  canvas.width = W;
  canvas.height = 160;
  ctx.clearRect(0, 0, W, 160);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, W, 160);

  if (wLog.length < 2) {
    ctx.fillStyle = '#5a5a55';
    ctx.font = '13px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Log 2+ weights to see your chart', W / 2, 85);
    return;
  }

  const vals = wLog.map(e => e.weight);
  const minV = Math.min(...vals) - 1;
  const maxV = Math.max(...vals) + 1;
  const pad = { l: 40, r: 16, t: 16, b: 30 };
  const chartW = W - pad.l - pad.r;
  const chartH = 160 - pad.t - pad.b;

  const xScale = i => pad.l + (i / (vals.length - 1)) * chartW;
  const yScale = v => pad.t + chartH - ((v - minV) / (maxV - minV)) * chartH;

  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let j = 0; j <= 4; j++) {
    const y = pad.t + (j / 4) * chartH;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + chartW, y); ctx.stroke();
  }

  ctx.fillStyle = '#5a5a55';
  ctx.font = '10px DM Sans, sans-serif';
  ctx.textAlign = 'right';
  for (let j = 0; j <= 4; j++) {
    const v = minV + ((maxV - minV) * (4 - j) / 4);
    ctx.fillText(v.toFixed(1), pad.l - 4, pad.t + (j / 4) * chartH + 4);
  }

  ctx.beginPath();
  ctx.strokeStyle = '#E8FF4A';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  vals.forEach((v, i) => {
    i === 0 ? ctx.moveTo(xScale(i), yScale(v)) : ctx.lineTo(xScale(i), yScale(v));
  });
  ctx.stroke();

  vals.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(xScale(i), yScale(v), 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E8FF4A';
    ctx.fill();
  });
}

function renderWorkoutHistory() {
  const container = document.getElementById('workout-history-list');
  if (!container) return;
  const log = userProfile.workoutLog || {};
  const keys = Object.keys(log).sort().reverse().slice(0, 20);
  if (!keys.length) {
    container.innerHTML = '<p style="font-size:.85rem;color:var(--text3)">No completed workouts yet.</p>';
    return;
  }
  container.innerHTML = keys.map(dateKey => {
    const entry = log[dateKey];
    const d = new Date(dateKey);
    const label = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const exList = (entry.exercises || []).slice(0, 3).map(e => e.name).join(', ');
    const more = entry.exercises && entry.exercises.length > 3 ? ` +${entry.exercises.length - 3} more` : '';
    return `<div class="workout-history-item">
      <div class="wh-header"><span class="wh-name">${entry.dayName}</span><span class="wh-date">${label}</span></div>
      <div class="wh-exercises">${entry.muscles}</div>
      <div class="wh-exercises" style="margin-top:.3rem;color:var(--text3)">${exList}${more}</div>
    </div>`;
  }).join('');
}

function logWeight() {
  const val = parseFloat(document.getElementById('weight-log-val').value);
  if (!val || val < 20 || val > 300) { showToast('Enter a valid weight (kg)'); return; }
  if (!userProfile.weightLog) userProfile.weightLog = [];
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  userProfile.weightLog.push({ weight: val, date: today });
  saveProfile();
  document.getElementById('weight-log-val').value = '';
  haptic(12);
  showToast('Weight logged ✓', 'success');
  renderProgressPage();
}

// ── EXPORT ──
function renderExportPage() {
  document.getElementById('export-preview-text').textContent = generateWorkoutText();
}

function generateWorkoutText() {
  const level = userProfile.level || 'beginner';
  const name = userProfile.name || 'User';
  const m = calcMetrics();
  let t = `ALPHA HOME WORKOUT PLAN\n${'='.repeat(30)}\n`;
  t += `Name: ${name}\nLevel: ${level}\nGoal: ${(userProfile.goal || '').replace('-',' ')}\n`;
  if (m) t += `Daily Calorie Target: ~${m.cals} kcal\nDaily Protein Target: ~${m.protein}g\n`;
  t += `Generated: ${new Date().toLocaleDateString()}\n\n`;

  weekPlan.forEach(day => {
    t += `${day.day.toUpperCase()} — ${day.name}\n${day.muscles}\n`;
    if (!day.exercises.length) { t += 'Rest Day\n\n'; return; }
    day.exercises.forEach(exKey => {
      const ex = EXERCISES[exKey]; if (!ex) return;
      const vars = getOverloadedVars(exKey, level) || ex.variations.beginner;
      t += `  • ${ex.name}: ${vars.sets} sets × ${vars.reps}\n    Tip: ${ex.tips[0]}\n`;
    });
    t += '\n';
  });

  if (userProfile.kegel !== 'no') {
    t += `DAILY KEGEL TRAINING (5–10 min)\n${'='.repeat(30)}\n`;
    KEGEL_PROGRAMS[kegelLevel].exercises.forEach(ex => {
      t += `  • ${ex.name}: Hold ${ex.contract}s · Rest ${ex.rest}s · ${ex.reps} reps\n`;
    });
  }
  return t;
}

function copyWorkout() {
  const text = generateWorkoutText();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied ✓', 'success')).catch(() => fallbackCopy(text));
  } else fallbackCopy(text);
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); showToast('Copied ✓', 'success'); } catch(e) { showToast('Could not copy'); }
  document.body.removeChild(ta);
}

function emailWorkout() {
  const text = generateWorkoutText();
  window.location.href = `mailto:?subject=${encodeURIComponent('My Alpha Workout Plan')}&body=${encodeURIComponent(text)}`;
}

function shareWorkout() {
  if (navigator.share) {
    navigator.share({ title: 'My Alpha Home Workout Plan', text: generateWorkoutText() });
  } else copyWorkout();
}

function downloadPDF() {
  const text = generateWorkoutText();
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Alpha Workout Plan</title>
<style>body{font-family:Arial,sans-serif;max-width:680px;margin:2rem auto;color:#111;padding:1rem}
pre{white-space:pre-wrap;font-size:13px;line-height:1.7}h1{margin-bottom:.5rem}
.btn{margin-top:1rem;padding:.7rem 1.5rem;background:#111;color:#E8FF4A;border:none;border-radius:8px;font-size:14px;cursor:pointer}
@media print{.btn{display:none}}</style></head><body>
<h1>Alpha Home Workout Plan</h1><pre>${text.replace(/</g,'&lt;')}</pre>
<button class="btn" onclick="window.print()">🖨 Print / Save as PDF</button>
</body></html>`;

  try {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'alpha-workout-plan.html';
    a.style.display = 'none'; document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    showToast('Plan downloaded ✓', 'success');
  } catch(e) {
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
    else showToast('Please allow popups or use Copy instead');
  }
}

// ── UTILITIES ──
function saveProfile() {
  localStorage.setItem('alphaCoachProfile', JSON.stringify(userProfile));
}

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2800);
}

document.addEventListener('click', e => {
  if (e.target.id === 'ex-modal') closeExModal();
  if (e.target.id === 'kegel-modal') closeKegelSession();
  if (e.target.id === 'setlog-modal') closeSetLog();
  if (e.target.id === 'kegel-complete') closeKegelComplete();
});
