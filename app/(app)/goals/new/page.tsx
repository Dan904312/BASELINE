'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Zap, BarChart2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ── types ─────────────────────────────────────────────────────────────────────
interface GoalData {
  sport: string;
  goal: string;
  customGoal: string;
  currentLevel: string;
  weaknesses: string[];
  timeline: string;
}

// ── preset goals per sport ────────────────────────────────────────────────────
const SPORTS: Record<string, string[]> = {
  Fitness:    ['Beep Test Level 10', 'Beep Test Level 12', '30 Push-ups in a Row', 'Plank 3 Minutes'],
  Running:    ['5km Under 22 Min', '5km Under 20 Min', '2.4km Under 10 Min', 'First 10km'],
  Basketball: ['Make School Team', 'Improve Vertical 5cm', 'Shoot 60% FT', 'Dribble with Weak Hand'],
  Swimming:   ['50m Under 35s', '100m Freestyle Under 80s', 'Learn Butterfly', 'Squad Selection'],
  AFL:        ['Make School Team', 'Kick 50m Consistently', 'Handball Accuracy 80%', 'Improve Game Fitness'],
  Soccer:     ['Make School Team', 'Juggle 50 Times', 'First Touch Control', 'Shoot Power Test'],
};

const WEAKNESSES: Record<string, string[]> = {
  Fitness:    ['Endurance', 'Speed', 'Upper Body Strength', 'Core', 'Recovery'],
  Running:    ['Pace Management', 'Breathing', 'Hill Running', 'Stride Efficiency', 'Endurance'],
  Basketball: ['Shooting', 'Ball Handling', 'Defense', 'Athleticism', 'Decision Making'],
  Swimming:   ['Technique', 'Turns', 'Breathing', 'Endurance', 'Kick Power'],
  AFL:        ['Kicking', 'Marking', 'Fitness', 'Handballing', 'Decision Making'],
  Soccer:     ['First Touch', 'Shooting', 'Heading', 'Passing', 'Fitness'],
};

const TIMELINES = ['4 weeks', '6 weeks', '8 weeks', '12 weeks'];

const STEPS = ['Goal', 'Current Level', 'Gap Analysis', 'Plan Preview'];

// ── step components ───────────────────────────────────────────────────────────

function Step1({ data, setData }: { data: GoalData; setData: (d: Partial<GoalData>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-body text-xs text-white/40 uppercase tracking-widest mb-3">Choose Your Sport</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(SPORTS).map(s => (
            <button
              key={s}
              onClick={() => setData({ sport: s, goal: '', weaknesses: [] })}
              className={`py-3 rounded-xl font-body text-sm font-semibold border transition-all ${
                data.sport === s
                  ? 'bg-lime-400 text-black border-lime-400'
                  : 'bg-surface-50 text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {data.sport && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className="block font-body text-xs text-white/40 uppercase tracking-widest mb-3">Select Your Goal</label>
          <div className="flex flex-col gap-2">
            {SPORTS[data.sport].map(g => (
              <button
                key={g}
                onClick={() => setData({ goal: g, customGoal: '' })}
                className={`text-left px-4 py-3 rounded-xl font-body text-sm border transition-all flex items-center justify-between ${
                  data.goal === g
                    ? 'bg-lime-400/10 border-lime-400 text-lime-400'
                    : 'bg-surface-50 border-white/10 text-white/70 hover:border-white/30'
                }`}
              >
                {g}
                {data.goal === g && <CheckCircle2 size={16} />}
              </button>
            ))}
            <input
              type="text"
              placeholder="Or type a custom goal…"
              value={data.customGoal}
              onChange={e => setData({ customGoal: e.target.value, goal: '' })}
              className="px-4 py-3 rounded-xl bg-surface-50 border border-white/10 text-white font-body text-sm placeholder-white/30 focus:outline-none focus:border-lime-400/50 transition-colors"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Step2({ data, setData }: { data: GoalData; setData: (d: Partial<GoalData>) => void }) {
  const questions: Record<string, { label: string; placeholder: string }> = {
    Fitness:    { label: 'What level did you reach on your last beep test?', placeholder: 'e.g. Level 6.5' },
    Running:    { label: 'What is your current 5km time?',                   placeholder: 'e.g. 26:30' },
    Basketball: { label: 'Describe your current skill level',                placeholder: 'e.g. Never made the team, been playing 2 years' },
    Swimming:   { label: 'What is your current 50m time?',                   placeholder: 'e.g. 42s' },
    AFL:        { label: 'Describe your current football ability',            placeholder: 'e.g. House comp, strong kick but slow' },
    Soccer:     { label: 'Describe your current skill level',                placeholder: 'e.g. School team reserve, decent passing' },
  };

  const q = questions[data.sport] ?? { label: 'Describe your current level', placeholder: 'e.g. Beginner, intermediate…' };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-body text-sm font-semibold text-white/80 mb-2">{q.label}</label>
        <textarea
          rows={4}
          placeholder={q.placeholder}
          value={data.currentLevel}
          onChange={e => setData({ currentLevel: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-surface-50 border border-white/10 text-white font-body text-sm placeholder-white/30 focus:outline-none focus:border-lime-400/50 resize-none transition-colors"
        />
      </div>

      <div>
        <label className="block font-body text-xs text-white/40 uppercase tracking-widest mb-3">Timeline to Goal</label>
        <div className="grid grid-cols-4 gap-2">
          {TIMELINES.map(t => (
            <button
              key={t}
              onClick={() => setData({ timeline: t })}
              className={`py-2.5 rounded-xl font-body text-sm font-semibold border transition-all ${
                data.timeline === t
                  ? 'bg-lime-400 text-black border-lime-400'
                  : 'bg-surface-50 text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({ data, setData }: { data: GoalData; setData: (d: Partial<GoalData>) => void }) {
  const options = WEAKNESSES[data.sport] ?? ['Strength', 'Speed', 'Technique', 'Endurance', 'Mental'];

  const toggle = (w: string) => {
    const cur = data.weaknesses;
    setData({ weaknesses: cur.includes(w) ? cur.filter(x => x !== w) : [...cur, w] });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="font-body text-sm text-white/60 mb-1">Based on your goal, identify where you need the most work.</p>
        <p className="font-body text-xs text-white/30 mb-4">Select all that apply — your plan will prioritise these areas.</p>
        <div className="grid grid-cols-2 gap-2">
          {options.map(w => (
            <button
              key={w}
              onClick={() => toggle(w)}
              className={`text-left px-4 py-3 rounded-xl font-body text-sm border transition-all flex items-center justify-between ${
                data.weaknesses.includes(w)
                  ? 'bg-lime-400/10 border-lime-400 text-lime-400'
                  : 'bg-surface-50 border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              {w}
              {data.weaknesses.includes(w) && <CheckCircle2 size={14} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data }: { data: GoalData }) {
  const goal = data.goal || data.customGoal;
  const weeks = parseInt(data.timeline) || 4;
  const sessions = ['Baseline test & mobility', 'Sport-specific drills + intervals', 'Strength & conditioning', 'Recovery & mental prep'];

  return (
    <div className="space-y-5">
      <div className="bg-lime-400/10 border border-lime-400/30 rounded-2xl p-5">
        <p className="font-body text-xs text-lime-400/70 uppercase tracking-widest mb-1">Your Goal</p>
        <p className="font-display text-2xl text-lime-400">{goal}</p>
        <p className="font-body text-sm text-white/50 mt-1">{data.sport} · {data.timeline}</p>
      </div>

      <div>
        <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-3">Gap Areas Targeted</p>
        <div className="flex flex-wrap gap-2">
          {data.weaknesses.map(w => (
            <span key={w} className="bg-surface-50 border border-white/10 text-white/70 font-body text-xs px-3 py-1.5 rounded-full">{w}</span>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-3">{weeks}-Week Plan Preview</p>
        <div className="flex flex-col gap-2">
          {Array.from({ length: Math.min(weeks, 4) }, (_, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface-50 border border-white/5 rounded-xl px-4 py-3">
              <div className="w-6 h-6 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xs text-lime-400">{i + 1}</span>
              </div>
              <div>
                <p className="font-body text-sm text-white font-semibold">Week {i + 1}</p>
                <p className="font-body text-xs text-white/40">{sessions[i] ?? 'Progressive overload & testing'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-body text-xs text-white/30 text-center">Your full AI-generated plan will appear on the Plan page after you confirm.</p>
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────
export default function NewGoalPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<GoalData>({
    sport: '', goal: '', customGoal: '', currentLevel: '', weaknesses: [], timeline: '4 weeks',
  });

  const update = (partial: Partial<GoalData>) => setData(d => ({ ...d, ...partial }));

  const canNext = [
    () => !!(data.sport && (data.goal || data.customGoal.trim())),
    () => !!(data.currentLevel.trim() && data.timeline),
    () => data.weaknesses.length > 0,
    () => true,
  ][step]?.() ?? false;

  const handleNext = () => {
    if (step < 3) { setStep(s => s + 1); return; }
    // Final step — save & go to plan
    router.push('/plan');
  };

  const STEP_ICONS = [Target, BarChart2, Zap, CheckCircle2];

  return (
    <div className="min-h-screen bg-surface-200 text-white">
      <div className="max-w-lg mx-auto px-4 pt-10 pb-32">

        {/* Header */}
        <div className="mb-8">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : router.back()} className="text-white/30 hover:text-white transition-colors mb-6 flex items-center gap-1 font-body text-sm">
            <ChevronLeft size={16} /> Back
          </button>
          <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-1">Step {step + 1} of {STEPS.length}</p>
          <h1 className="font-display text-4xl text-white">{STEPS[step].toUpperCase()}</h1>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-surface-50">
              <motion.div
                className="h-full bg-lime-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && <Step1 data={data} setData={update} />}
            {step === 1 && <Step2 data={data} setData={update} />}
            {step === 2 && <Step3 data={data} setData={update} />}
            {step === 3 && <Step4 data={data} />}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.button
          onClick={handleNext}
          disabled={!canNext}
          className={`w-full mt-8 py-4 rounded-2xl font-body font-bold text-base flex items-center justify-center gap-2 transition-all ${
            canNext
              ? 'bg-lime-400 text-black hover:bg-lime-500'
              : 'bg-surface-50 text-white/20 cursor-not-allowed border border-white/5'
          }`}
          whileTap={canNext ? { scale: 0.97 } : {}}
        >
          {step === 3 ? 'Create My Plan' : 'Continue'}
          <ChevronRight size={18} />
        </motion.button>

      </div>
    </div>
  );
}
