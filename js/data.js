/* ═══════════════════════════════════════════════════════════
   GEM Workout Data — from GEM Flexible Workout Plan (Excel)
   47 yo · 74 kg · 174 cm
   ═══════════════════════════════════════════════════════════ */

const DEFAULT_WORKOUTS = [
  {
    key: 'warmup',
    name: 'Warm-Up',
    icon: '🔥',
    exercises: [
      { id: 1, name: 'Stair Machine / Bike',  sets: 1, reps: '5-7 min',    weight: 0, rest: 0,  notes: 'Light cardio — mild sweat only. Stair machine ideal. Bike if knees sore.' },
      { id: 2, name: 'Band Pull-Aparts',       sets: 2, reps: '15',         weight: 0, rest: 30, notes: 'Arms straight, pull band to a T at shoulder height. Non-negotiable at 47.' },
      { id: 3, name: 'Dead Hang',              sets: 2, reps: '20-30 sec',  weight: 0, rest: 30, notes: 'Hang from pull-up bar. Decompresses spine, activates grip and lats.' },
      { id: 4, name: 'Dynamic Stretches',      sets: 1, reps: '3 min',      weight: 0, rest: 0,  notes: 'Leg swings (front/side), hip circles, torso twists. Move slowly, no bouncing.' },
    ]
  },
  {
    key: 'A',
    name: 'Push (A)',
    icon: '💪',
    exercises: [
      { id: 1, name: 'DB Bench Press',            sets: 4, reps: '8-10',   weight: 20,   rest: 90, notes: 'Flat bench. Retract shoulder blades before every set. 3-sec descent. Primary chest builder.' },
      { id: 2, name: 'Incline DB Press',           sets: 3, reps: '10-12', weight: 14,   rest: 75, notes: '30–45° incline. Upper chest = fuller look. Feel the upper pec, not the shoulder.' },
      { id: 3, name: 'DB Shoulder Press',          sets: 3, reps: '8-10',  weight: 12,   rest: 75, notes: 'Seated 90°. Elbows at ear level at bottom — not behind head. Core tight.' },
      { id: 4, name: 'DB Lateral Raise',           sets: 4, reps: '12-15', weight: 6,    rest: 60, notes: 'Slight hip hinge (15°). Lead with elbows. 2-sec hold at top, 3-sec lower.' },
      { id: 5, name: 'Cable Tricep Pushdown',      sets: 3, reps: '12-15', weight: 12.5, rest: 45, notes: 'Upper arms fixed at sides. Fully extend, squeeze. Rope preferred — easier on wrists.' },
      { id: 6, name: 'Overhead DB Tricep Ext.',    sets: 2, reps: '12-15', weight: 10,   rest: 45, notes: 'Seated. Both hands grip one DB overhead. Hits tricep long head. Keep elbows close.' },
    ]
  },
  {
    key: 'B',
    name: 'Pull (B)',
    icon: '🔙',
    exercises: [
      { id: 1, name: 'Single-Arm DB Row',   sets: 4, reps: '8-10',   weight: 20, rest: 90, notes: 'Brace core, pull elbow to hip (not up). 1-sec pause at top. Go heavy with control.' },
      { id: 2, name: 'Seated Cable Row',    sets: 3, reps: '10-12',  weight: 40, rest: 75, notes: 'Both hands, neutral grip. Pull to lower chest, squeeze blades 2 sec.' },
      { id: 3, name: 'Face Pulls (Cable)',  sets: 3, reps: '15',     weight: 15, rest: 45, notes: 'Pull to forehead, elbows flared high. Crucial for rotator cuff. Never skip.' },
      { id: 4, name: 'DB Rear Delt Fly',   sets: 3, reps: '12-15',  weight: 6,  rest: 45, notes: 'Hinge 45° forward. Lead with elbows, squeeze blades at top. Form over load.' },
      { id: 5, name: 'DB Pullover',         sets: 3, reps: '12-15',  weight: 14, rest: 60, notes: 'Arc DB behind head, feel lat stretch. Slight elbow bend.' },
      { id: 6, name: 'DB Bicep Curl',       sets: 3, reps: '10-12',  weight: 12, rest: 60, notes: 'Supinate wrist at top for peak contraction. Full extension at bottom, no swinging.' },
      { id: 7, name: 'Hanging Knee Raise',  sets: 3, reps: '10-15',  weight: 0,  rest: 45, notes: 'Slow and controlled. Draw knees to chest, pause, lower 3 sec.' },
    ]
  },
  {
    key: 'LEGS',
    name: 'Legs',
    icon: '🦵',
    exercises: [
      { id: 1, name: 'Leg Press (Machine)',       sets: 4, reps: '10-12',  weight: 100, rest: 90, notes: 'Feet shoulder-width, mid-plate. Full ROM. Safe and effective.' },
      { id: 2, name: 'Bulgarian Split Squat',     sets: 3, reps: '10/leg', weight: 16,  rest: 75, notes: 'Rear foot on bench. Upright = quad, lean = glute. 3-sec descent.' },
      { id: 3, name: 'Goblet Squat',              sets: 3, reps: '10-12',  weight: 14,  rest: 60, notes: 'Hold DB at chest. Heels flat, chest up. Knees track over toes.' },
      { id: 4, name: 'Lying Leg Curl (Machine)',  sets: 3, reps: '12',     weight: 40,  rest: 60, notes: 'Full ROM, slow lowering. Hamstring isolation.' },
      { id: 5, name: 'Standing Calf Raise',       sets: 3, reps: '15-20',  weight: 0,   rest: 45, notes: '2-sec up, 2-sec pause, 3-sec down. Often skipped — aesthetically important.' },
    ]
  },
  {
    key: 'CORE',
    name: 'Core Finisher',
    icon: '🔥',
    exercises: [
      { id: 1, name: 'Plank',               sets: 3, reps: '30-45 sec', weight: 0, rest: 45, notes: 'Elbows under shoulders, hips level. Squeeze glutes AND abs simultaneously.' },
      { id: 2, name: 'Weighted Sit-Up',     sets: 3, reps: '12-15',    weight: 5, rest: 45, notes: 'DB or plate on chest. 2-sec up, 3-sec down. Don\'t yank neck.' },
      { id: 3, name: 'Cable/DB Woodchop',   sets: 3, reps: '12/side',  weight: 8, rest: 45, notes: 'Diagonal pull high-to-low. Oblique focus — targets belly sides.' },
      { id: 4, name: 'Reverse Crunch',      sets: 3, reps: '12-15',    weight: 0, rest: 45, notes: 'Draw knees to chest lifting hips. Lower abs emphasis.' },
    ]
  },
  {
    key: 'HOME',
    name: 'Home Evening',
    icon: '🏠',
    exercises: [
      { id: 1, name: 'Glute Bridge',          sets: 2, reps: '15',      weight: 0,  rest: 45, notes: 'Feet flat, push hips up, squeeze 2 sec at top. Progress with DB on hips.' },
      { id: 2, name: 'Bulgarian Split Squat', sets: 3, reps: '10/leg',  weight: 16, rest: 60, notes: 'Rear foot on sofa. 3-sec descent.' },
      { id: 3, name: 'DB Sumo Squat',         sets: 3, reps: '12',      weight: 16, rest: 60, notes: 'Wide stance, toes 45°. Hold one heavy DB vertically (cup top plate).' },
      { id: 4, name: 'DB Goblet Squat',       sets: 3, reps: '12',      weight: 14, rest: 60, notes: 'Hold DB at chest. Heels flat. Mix with Sumo.' },
      { id: 5, name: 'Standing Calf Raise',   sets: 2, reps: '20',      weight: 16, rest: 45, notes: 'DBs at sides. 2-sec hold at top, 3-sec lower.' },
    ]
  },
];
