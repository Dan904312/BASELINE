'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Zap, Lock, TrendingUp } from 'lucide-react';

// ── types ─────────────────────────────────────────────────────────────────────
interface Session {
  id: string;
  day: string;
  title: string;
  description: string;
  logPrompt: string;
  logUnit: string;
  logged?: number;
  completed: boolean;
  tokens: number;
}

interface Week {
  week: number;
  theme: string;
  sessions: Session[];
}

// ── mock plan data ─────────────────────────────────────────────────────────────
const PLAN: Week[] = [
  {
    week: 1,
    theme: 'Baseline & Foundation',
    sessions: [
      { id: 'w1d1', day: 'Mon', title: 'Baseline Test', description: 'Run your beep test to establish your current level. Record exactly where you stop.', logPrompt: 'What level did you reach?', logUnit: 'level', completed: true, logged: 6.5, tokens: 50 },
      { id: 'w1d2', day: 'Wed', title: 'Aerobic Build', description: '20-minute steady jog at 60% effort. Focus on breathing rhythm. No stopping.', logPrompt: 'How many minutes did you run?', logUnit: 'min', completed: true, logged: 20, tokens: 40 },
      { id: 'w1d3', day: 'Fri', title: 'Interval Introduction', description: '6 × 30s sprints with 90s rest. Run at 80% effort on each sprint.', logPrompt: 'How many intervals completed?', logUnit: 'reps', completed: false, tokens: 60 },
    ],
  },
  {
    week: 2,
    theme: 'Progressive Load',
    sessions: [
      { id: 'w2d1', day: 'Mon', title: 'Extended Aerobic', description: '25-minute jog. Increase effort to 65%. Track heart rate if possible.', logPrompt: 'Total time completed (min)?', logUnit: 'min', completed: false, tokens: 40 },
      { id: 'w2d2', day: 'Wed', title: 'Shuttle Runs', description: '5 × 20m shuttle runs with 60s rest. Sprint at 85–90% effort.', logPrompt: 'Fastest shuttle time (sec)?', logUnit: 'sec', completed: false, tokens: 60 },
      { id: 'w2d3', day: 'Fri', title: 'Beep Test Practice', description: 'Run the beep test but stop at level 7. Practice the turns and recovery.', logPrompt: 'What level did you reach?', logUnit: 'level', completed: false, tokens: 70 },
    ],
  },
  {
    week: 3,
    theme: 'Intensity Spike',
    sessions: [
      { id: 'w3d1', day: 'Mon', title: 'Tempo Run', description: '15 min warm-up, 10 min at 75% effort, 5 min cool-down.', logPrompt: 'Rate your effort (1–10)?', logUnit: '/10', completed: false, tokens: 50 },
      { id: 'w3d2', day: 'Wed', title: 'Strength Circuit', description: '3 rounds: 15 squats, 10 push-ups, 20s plank, 10 burpees. Rest 60s between.', logPrompt: 'Rounds completed?', logUnit: 'rounds', completed: false, tokens: 60 },
      { id: 'w3d3', day: 'Fri', title: 'Max Beep Test', description: 'Full beep test — push to your absolute max. This is your progress check.', logPrompt: 'What level did you reach?', logUnit: 'level', completed: false, tokens: 100 },
    ],
  },
  {
    week: 4,
    theme: 'Peak & Test',
    sessions: [
      { id: 'w4d1', day: 'Mon', title: 'Active Recovery', description: '20-min walk + stretching. Let your body prepare for the final test.', logPrompt: 'Minutes of recovery activity?', logUnit: 'min', completed: false, tokens: 30 },
      { id: 'w4d2', day: 'Wed', title: 'Sharpness Drills', description: '4 × 100m at 90% effort, full recovery. Keep movements sharp and explosive.', logPrompt: 'How many reps felt strong?', logUnit: '/4', completed: false, tokens: 50 },
      { id: 'w4d3', day: 'Fri', title: '🏁 Final Test', description: 'This is it. Run your official beep test and log your level. This is your result.', logPrompt: 'Final beep test level?', logUnit: 'level', completed: false, tokens: 150 },
    ],
  },
];

// ── log modal ─────────────────────────────────────────────────────────────────
function LogModal({ session, onClose, onLog }: {
  session: Session;
  onClose: () => void;
  onLog: (sessionId: string, value: number) => void;
}) {
  const [value, setValue] = useState('');
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-surface-100 border border-white/10 rounded-2xl p-6 w-full max-w-md"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-display text-2xl text-white mb-1">{session.title.toUpperCase()}</h3>
        <p className="font-body text-sm text-white/50 mb-5">{session.logPrompt}</p>
        <div className="flex items-center gap-3 mb-5">
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="0"
            className="flex-1 text-center text-3xl font-display text-lime-400 bg-surface-50 border border-lime-400/30 rounded-xl py-4 focus:outline-none focus:border-lime-400"
            autoFocus
          />
          <span className="font-body text-white/40 text-sm">{session.logUnit}</span>
        </div>
        <button
          onClick={() => {
            if (value) { onLog(session.id, parseFloat(value)); onClose(); }
          }}
          disabled={!value}
          className="w-full py-3.5 rounded-xl bg-lime-400 text-black font-body font-bold text-sm disabled:opacity-30 hover:bg-lime-500 transition-colors"
        >
          Log + Earn {session.tokens} tokens
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── session row ───────────────────────────────────────────────────────────────
function SessionRow({ session, isUnlocked, onLog }: {
  session: Session;
  isUnlocked: boolean;
  onLog: (s: Session) => void;
}) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
      session.completed
        ? 'bg-lime-400/5 border-lime-400/20'
        : isUnlocked
        ? 'bg-surface-50 border-white/10 hover:border-white/20'
        : 'bg-surface-50/50 border-white/5 opacity-50'
    }`}>
      <div className="flex-shrink-0">
        {session.completed
          ? <CheckCircle2 size={22} className="text-lime-400" />
          : isUnlocked
          ? <Circle size={22} className="text-white/30" />
          : <Lock size={18} className="text-white/20" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-body text-xs text-white/40 uppercase">{session.day}</span>
          {session.completed && session.logged != null && (
            <span className="text-xs font-body text-lime-400/70">{session.logged} {session.logUnit}</span>
          )}
        </div>
        <p className={`font-body text-sm font-semibold ${session.completed ? 'text-white/60 line-through' : 'text-white'}`}>
          {session.title}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="flex items-center gap-1 text-xs font-body text-lime-400/60">
          <Zap size={11} /> {session.tokens}
        </span>
        {!session.completed && isUnlocked && (
          <button
            onClick={() => onLog(session)}
            className="bg-lime-400 text-black font-body font-bold text-xs px-3 py-1.5 rounded-full hover:bg-lime-500 transition-colors"
          >
            Log
          </button>
        )}
      </div>
    </div>
  );
}

// ── week block ─────────────────────────────────────────────────────────────────
function WeekBlock({ week, isUnlocked, sessions, onLog }: {
  week: Week;
  isUnlocked: boolean;
  sessions: Session[];
  onLog: (s: Session) => void;
}) {
  const [open, setOpen] = useState(isUnlocked);
  const done = sessions.filter(s => s.completed).length;

  return (
    <div className={`border rounded-2xl overflow-hidden ${isUnlocked ? 'border-white/10' : 'border-white/5'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 bg-surface-50"
      >
        <div className="flex items-center gap-3">
          {!isUnlocked && <Lock size={14} className="text-white/20" />}
          <div className="text-left">
            <p className={`font-display text-lg ${isUnlocked ? 'text-white' : 'text-white/30'}`}>
              WEEK {week.week}
            </p>
            <p className={`font-body text-xs ${isUnlocked ? 'text-white/50' : 'text-white/20'}`}>{week.theme}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isUnlocked && (
            <span className="font-body text-xs text-white/40">{done}/{sessions.length} done</span>
          )}
          {open ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 flex flex-col gap-2">
              {sessions.map(s => (
                <SessionRow key={s.id} session={s} isUnlocked={isUnlocked} onLog={onLog} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function PlanPage() {
  const [plan, setPlan] = useState<Week[]>(PLAN);
  const [logTarget, setLogTarget] = useState<Session | null>(null);

  const handleLog = (sessionId: string, value: number) => {
    setPlan(prev =>
      prev.map(w => ({
        ...w,
        sessions: w.sessions.map(s =>
          s.id === sessionId ? { ...s, completed: true, logged: value } : s
        ),
      }))
    );
  };

  // A week is unlocked if all sessions of the previous week are complete (or it's week 1)
  const isWeekUnlocked = (weekIdx: number) => {
    if (weekIdx === 0) return true;
    return plan[weekIdx - 1].sessions.every(s => s.completed);
  };

  const totalCompleted = plan.flatMap(w => w.sessions).filter(s => s.completed).length;
  const totalSessions = plan.flatMap(w => w.sessions).length;
  const overallPct = Math.round((totalCompleted / totalSessions) * 100);

  return (
    <div className="min-h-screen bg-surface-200 text-white">
      <div className="max-w-lg mx-auto px-4 pt-10 pb-32">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-1">Your 4-Week Plan</p>
          <h1 className="font-display text-5xl text-white">BEEP TEST <span className="text-lime-400">LVL 10</span></h1>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-50 border border-white/5 rounded-2xl p-4 mb-6 flex items-center gap-4"
        >
          <TrendingUp size={20} className="text-lime-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between font-body text-xs text-white/40 mb-1.5">
              <span>Overall Progress</span>
              <span>{totalCompleted}/{totalSessions} sessions</span>
            </div>
            <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-lime-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
          <span className="font-display text-xl text-lime-400">{overallPct}%</span>
        </motion.div>

        {/* Weeks */}
        <div className="flex flex-col gap-3">
          {plan.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <WeekBlock
                week={w}
                isUnlocked={isWeekUnlocked(i)}
                sessions={w.sessions}
                onLog={setLogTarget}
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Log modal */}
      <AnimatePresence>
        {logTarget && (
          <LogModal session={logTarget} onClose={() => setLogTarget(null)} onLog={handleLog} />
        )}
      </AnimatePresence>
    </div>
  );
}
