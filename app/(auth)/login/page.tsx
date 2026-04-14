@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --lime: #C8FF00;
  --lime-dim: #A8D800;
  --bg: #080808;
  --surface: #111111;
  --surface-2: #1A1A1A;
  --surface-3: #222222;
  --border: #2A2A2A;
  --text: #F2F2F2;
  --text-muted: #777777;
  --text-dim: #444444;
  --red: #FF3B3B;
  --orange: #FF7A00;
  --blue: #3B82F6;
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--surface-3); border-radius: 2px; }

/* Selection */
::selection { background: var(--lime); color: #000; }

/* Typography utilities */
.font-display { font-family: var(--font-display); letter-spacing: 0.02em; }

/* Lime glow effect */
.glow-lime {
  box-shadow: 0 0 20px rgba(200, 255, 0, 0.3), 0 0 60px rgba(200, 255, 0, 0.1);
}

/* Noise texture overlay */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  border-radius: inherit;
}

/* Card base */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #C8FF00 0%, #FFFFFF 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shimmer loading */
.shimmer {
  background: linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Progress bar */
.progress-bar {
  height: 4px;
  background: var(--surface-3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--lime);
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Lime button */
.btn-lime {
  background: var(--lime);
  color: #000;
  font-weight: 700;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-lime:hover {
  background: var(--lime-dim);
  transform: translateY(-1px);
}

.btn-lime:active { transform: translateY(0); }

/* Ghost button */
.btn-ghost {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ghost:hover {
  border-color: var(--text-muted);
  background: var(--surface);
}

/* Streak badge */
.streak-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FF7A00, #FF4444);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
}

/* Severity colors */
.severity-critical { color: var(--red); }
.severity-moderate { color: var(--orange); }
.severity-minor { color: var(--lime); }

/* Animate in */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.delay-100 { animation-delay: 0.1s; opacity: 0; }
.delay-200 { animation-delay: 0.2s; opacity: 0; }
.delay-300 { animation-delay: 0.3s; opacity: 0; }
.delay-400 { animation-delay: 0.4s; opacity: 0; }
.delay-500 { animation-delay: 0.5s; opacity: 0; }
