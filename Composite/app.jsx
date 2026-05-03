// app.jsx — The Voice Lab for Leaders landing page
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "asymmetric",
  "showWaveform": true,
  "aboutPortraitTone": "warm",
  "ctaStyle": "ink"
} /*EDITMODE-END*/;

// ---------- shared atoms ----------
const Label = ({ children, color = 'green', style }) =>
<div style={{
  fontFamily: 'var(--vl-font-sans)', fontSize: 12, fontWeight: 500,
  letterSpacing: '0.16em', textTransform: 'uppercase',
  color: color === 'green' ? 'var(--vl-voice-green)' : color === 'mute' ? 'var(--vl-graphite)' : 'var(--vl-ink)',
  ...style
}}>{children}</div>;


const PrimaryCTA = ({ children, onClick, large = false, style, variant = 'ink' }) => {
  const [hover, setHover] = useState(false);
  const isInk = variant === 'ink';
  const bg = isInk ? hover ? '#1a2320' : 'var(--vl-ink)' : hover ? 'var(--vl-voice-green-deep)' : 'var(--vl-voice-green)';
  const fg = 'var(--vl-paper)';
  return (
    <button onClick={onClick}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      fontFamily: 'var(--vl-font-sans)',
      fontSize: large ? 16 : 15, fontWeight: 500,
      background: bg, color: fg,
      border: 0, borderRadius: 999,
      padding: large ? '18px 32px' : '14px 24px',
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 10,
      transition: 'background 180ms var(--vl-ease), transform 180ms var(--vl-ease)',
      ...style
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      {children} <span aria-hidden style={{ display: 'inline-block', transition: 'transform 220ms var(--vl-ease)', transform: hover ? 'translateX(3px)' : 'translateX(0)' }}>→</span>
    </button>);

};

const Wordmark = ({ size = 13 }) =>
<span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span style={{ position: 'relative', width: 24, height: 24, display: 'inline-block' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '1px solid rgba(31,37,32,0.16)' }} />
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 7, height: 7, borderRadius: 999, background: 'var(--vl-voice-green)' }} />
    </span>
    <span style={{
    fontFamily: 'var(--vl-font-sans)', fontWeight: 600, fontSize: size,
    letterSpacing: '0.22em', color: 'var(--vl-ink)', display: 'inline-flex', alignItems: 'center', gap: 8
  }}>
      <span>THE</span>
      <span style={{ color: 'var(--vl-voice-green)', fontWeight: 400 }}>·</span>
      <span>VOICE</span>
      <span style={{ color: 'var(--vl-voice-green)', fontWeight: 400 }}>·</span>
      <span>LAB</span>
    </span>
  </span>;


// ---------- NAV ----------
const Nav = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(246,242,234,0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--vl-hairline)' : '1px solid transparent',
      transition: 'all 280ms var(--vl-ease)'
    }}>
      <div style={{
        maxWidth: 'var(--vl-content-max)', margin: '0 auto',
        padding: '20px var(--vl-margin-x-desktop)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32
      }}>
        <a href="#top" style={{ textDecoration: 'none' }}><Wordmark /></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[['The problem', '#problem'], ['The sprint', '#sprint'], ['About', '#about']].map(([label, href]) =>
          <a key={href} href={href} style={{
            fontFamily: 'var(--vl-font-sans)', fontSize: 14, color: 'var(--vl-ink)',
            textDecoration: 'none', fontWeight: 400
          }}>{label}</a>
          )}
          <PrimaryCTA onClick={onBookClick} style={{ padding: '10px 18px', fontSize: 13 }}>
            Book a discovery call
          </PrimaryCTA>
        </div>
      </div>
    </nav>);

};

// ---------- TYPEWRITER ----------
const Typewriter = ({ words, color = 'var(--vl-voice-green)' }) => {
  const [wIdx, setWIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | holding | deleting

  useEffect(() => {
    const word = words[wIdx];
    let t;
    if (phase === 'typing') {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 75);
      } else {
        t = setTimeout(() => setPhase('holding'), 1500);
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('deleting'), 1200);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), 38);
      } else {
        setWIdx((wIdx + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, wIdx, words]);

  // longest word reserves layout space so the line below doesn't reflow
  const longest = words.reduce((a, b) => b.length > a.length ? b : a, '');

  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {/* invisible spacer holds width of the longest word */}
      <span aria-hidden style={{ visibility: 'hidden', display: 'inline-block', fontStyle: 'italic' }}>{longest}.</span>
      <span style={{ position: 'absolute', left: 0, top: 0, color, fontStyle: 'italic' }}>
        {text}
        <span aria-hidden style={{
          display: 'inline-block', width: '0.06em', height: '0.92em',
          background: color, marginLeft: '0.04em',
          transform: 'translateY(0.12em)',
          animation: 'vl-caret 1s steps(1,end) infinite'
        }} />
      </span>
    </span>);

};

// ---------- LIVE VOICEPRINT ----------
// Animated bar-style spectrogram. Each bar has a randomized base height and
// independent CSS animation so the field reads as a live, breathing voice signal.
// One bar in the middle stays "stuck" (flat) — that's the moment of disconnection.
const LiveVoiceprint = ({ bars = 64, flatStart = 36, flatEnd = 44 }) => {
  // pre-computed per-bar config keeps render deterministic + cheap
  const cfg = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < bars; i++) {
      // gentle envelope: louder in middle of phrase
      const t = i / (bars - 1);
      const env = 0.45 + 0.55 * Math.sin(t * Math.PI);
      const base = 0.22 + 0.55 * env * (0.6 + 0.4 * Math.sin(i * 1.7));
      const dur = (0.9 + (i * 0.137 % 1) * 1.3).toFixed(2); // 0.9s–2.2s
      const delay = -((i * 0.071 % 1) * 2).toFixed(2);     // negative = phase offset
      arr.push({ base: Math.min(0.95, Math.max(0.18, base)), dur, delay });
    }
    return arr;
  }, [bars]);

  const W = 600;
  const H = 280;
  const PAD_X = 4;
  const barGap = 3;
  const barW = (W - PAD_X * 2 - barGap * (bars - 1)) / bars;

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: `${W} / ${H}` }}>
      <style>{`
        @keyframes vl-bar-pulse {
          0%   { transform: scaleY(0.35); }
          50%  { transform: scaleY(1); }
          100% { transform: scaleY(0.35); }
        }
        @keyframes vl-bar-flat {
          0%, 100% { transform: scaleY(0.18); }
          50%      { transform: scaleY(0.22); }
        }
        @keyframes vl-rec-blink {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0.25; }
        }
        @keyframes vl-scan {
          0%   { transform: translateX(-8%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(108%); opacity: 0; }
        }
      `}</style>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height="100%" style={{ display: 'block' }} aria-hidden>
        {/* center axis */}
        <line x1={0} x2={W} y1={H / 2} y2={H / 2} stroke="rgba(31,37,32,0.10)" strokeWidth={1} />

        {/* bars */}
        {cfg.map((c, i) => {
          const x = PAD_X + i * (barW + barGap);
          const isFlat = i >= flatStart && i <= flatEnd;
          const fullH = c.base * (H - 24);
          const y = (H - fullH) / 2;
          const fill = isFlat ? 'var(--vl-voice-green)' : 'var(--vl-ink)';
          const opacity = isFlat ? 1 : 0.86;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barW}
              height={fullH}
              rx={Math.min(barW / 2, 1.5)}
              fill={fill}
              opacity={opacity}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: isFlat
                  ? `vl-bar-flat 2.4s ease-in-out ${c.delay}s infinite`
                  : `vl-bar-pulse ${c.dur}s ease-in-out ${c.delay}s infinite`
              }} />
          );
        })}

        {/* moment marker — vertical dotted */}
        <line
          x1={PAD_X + ((flatStart + flatEnd) / 2) * (barW + barGap)}
          x2={PAD_X + ((flatStart + flatEnd) / 2) * (barW + barGap)}
          y1={6} y2={H - 6}
          stroke="var(--vl-voice-green)" strokeWidth={1} strokeDasharray="2 4" opacity={0.7} />
      </svg>

      {/* scan line */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, bottom: 0,
        width: 1, background: 'rgba(0,51,255,0.35)',
        animation: 'vl-scan 7s linear infinite',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

// ---------- HERO ----------
const Hero = ({ onBookClick, layout, showWaveform }) => {
  const asymmetric = layout === 'asymmetric';
  const rotatingWords = ['understand.', 'say yes.', 'move.'];

  // ----- the new visual hero (asymmetric) -----
  if (asymmetric) {
    return (
      <section id="top" style={{
        padding: '72px var(--vl-margin-x-desktop) 96px',
        maxWidth: 'var(--vl-content-max)', margin: '0 auto',
        position: 'relative'
      }}>
        <Label style={{ marginBottom: 32 }}>Voice coaching for founders and executives</Label>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 64,
          alignItems: 'stretch'
        }}>
          {/* LEFT: headline + supporting */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 48 }}>
            <h1 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
              fontSize: 'clamp(52px, 7.2vw, 104px)', lineHeight: 0.98, letterSpacing: '-0.018em',
              margin: 0, maxWidth: '14ch', textWrap: 'balance', color: 'var(--vl-ink)'
            }}>
              Speak so they<br /><Typewriter words={rotatingWords} />
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: '40ch' }}>
              <p style={{
                fontFamily: 'var(--vl-font-serif)', fontSize: 'clamp(22px, 2.1vw, 28px)',
                lineHeight: 1.25, letterSpacing: '-0.005em',
                color: 'var(--vl-ink)', margin: 0
              }}>
                You're building something <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>worth leading</em>. The question is whether the room <em style={{ fontStyle: 'italic' }}>knows it yet</em>.
              </p>
              <p style={{
                fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.6,
                color: 'var(--vl-graphite)', margin: 0
              }}>
                The Voice Lab is for founders who are brilliant at what they do — and need to be just as effective at communicating it.
              </p>
            </div>
          </div>

          {/* RIGHT: console */}
          <div style={{
            position: 'relative',
            background: 'var(--vl-bone)',
            border: '1px solid var(--vl-hairline)',
            borderRadius: 6,
            padding: '20px 24px 24px',
            display: 'flex', flexDirection: 'column', gap: 20,
            minHeight: 380
          }}>
            {/* Console top bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 16,
              fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--vl-voice-green)',
                  animation: 'vl-rec-blink 1.6s steps(1, end) infinite'
                }} />
                <span style={{ color: 'var(--vl-ink)', letterSpacing: '0.18em' }}>● Live</span>
                <span style={{ color: 'var(--vl-mute)' }}>· Session 04 · Take 02</span>
              </div>
              <div>Voiceprint · 48 kHz</div>
            </div>

            {/* Voiceprint */}
            <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>
              <LiveVoiceprint />
            </div>

            {/* Annotation under voiceprint */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'baseline', gap: 12,
              fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)'
            }}>
              <span>00:00 — opens</span>
              <span style={{ color: 'var(--vl-voice-green)', whiteSpace: 'nowrap' }}>↑ room left here</span>
              <span style={{ textAlign: 'right' }}>03:42 — close</span>
            </div>

            {/* Console bottom bar — meant / sounded mini */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
              borderTop: '1px solid var(--vl-hairline)', paddingTop: 16, marginTop: 4
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingRight: 16 }}>
                <span style={{
                  fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'var(--vl-graphite)'
                }}>You meant</span>
                <span style={{
                  fontFamily: 'var(--vl-font-sans)', fontSize: 15, fontWeight: 500,
                  color: 'var(--vl-ink)'
                }}>Confident.</span>
              </div>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 4,
                paddingLeft: 16, borderLeft: '1px solid var(--vl-hairline)'
              }}>
                <span style={{
                  fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'var(--vl-graphite)'
                }}>You sounded</span>
                <span style={{
                  fontFamily: 'var(--vl-font-sans)', fontSize: 15, fontWeight: 500,
                  fontStyle: 'italic', color: 'var(--vl-voice-green)'
                }}>Hedging.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip removed */}
      </section>
    );
  }

  // ----- stacked fallback -----
  return (
    <section id="top" style={{
      padding: '96px var(--vl-margin-x-desktop) 88px',
      maxWidth: 'var(--vl-content-max)', margin: '0 auto',
      position: 'relative'
    }}>
      <Label style={{ marginBottom: 40 }}>Voice coaching for founders and executives</Label>
      <div style={{ maxWidth: 980 }}>
        <h1 style={{
          fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
          fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 1.02, letterSpacing: '-0.012em',
          margin: 0, maxWidth: '14ch', textWrap: 'balance', color: 'var(--vl-ink)'
        }}>
          Speak so they<br /><Typewriter words={rotatingWords} />
        </h1>
        <div style={{ marginTop: 40, maxWidth: 720 }}>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontSize: 'clamp(28px, 3vw, 40px)',
            lineHeight: 1.18, letterSpacing: '-0.005em',
            color: 'var(--vl-ink)', margin: 0, maxWidth: '24ch'
          }}>
            You've built something <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>worth leading</em>. The question is whether the room <em style={{ fontStyle: 'italic' }}>knows it yet</em>.
          </p>
          <p style={{
            fontFamily: 'var(--vl-font-sans)', fontSize: 18, lineHeight: 1.6,
            color: 'var(--vl-graphite)', margin: '24px 0 0', maxWidth: '48ch'
          }}>
            The Voice Lab is for founders who are brilliant at what they do — and need to be just as effective at communicating it.
          </p>
        </div>
      </div>
      {showWaveform && (
        <div style={{ marginTop: 96 }}>
          <LiveVoiceprint bars={120} flatStart={200} flatEnd={200} />
        </div>
      )}
    </section>
  );
};

// ---------- PROBLEM ----------
// Said-vs-Heard divergence chart: speaker's intended emphasis vs room's received signal.
const SaidHeardChart = () => {
  const W = 1200, H = 220;
  const N = 80;
  const TOP = 30, BOT = H - 30;
  const MID = (TOP + BOT) / 2;

  // "Said" — what you intend: confident, steady arc
  const said = (i) => {
    const t = i / (N - 1);
    return MID - 50 - 10 * Math.sin(t * Math.PI * 1.4) - 6 * Math.sin(t * Math.PI * 4.2);
  };
  // "Heard" — what the room registers: starts aligned, then drifts down (attention dropping)
  const heard = (i) => {
    const t = i / (N - 1);
    const drift = Math.pow(t, 1.6) * 70;
    return MID - 50 + drift + 5 * Math.sin(t * Math.PI * 6.1) + 3 * Math.sin(t * Math.PI * 13.4);
  };

  const barW = W / N;
  const saidPts = Array.from({ length: N }, (_, i) => [i * barW + barW / 2, said(i)]);
  const heardPts = Array.from({ length: N }, (_, i) => [i * barW + barW / 2, heard(i)]);

  // Shaded gap polygon
  const gapPath =
    saidPts.map(([x, y]) => `${x},${y}`).join(' ') + ' ' +
    heardPts.slice().reverse().map(([x, y]) => `${x},${y}`).join(' ');

  const INK = 'rgb(31,37,32)';
  const GREEN = 'var(--vl-voice-green)';
  const HAIR = 'rgba(31,37,32,0.10)';

  // Mark the moment of divergence
  const divIdx = 38;
  const divX = divIdx * barW + barW / 2;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height="auto" style={{ display: 'block' }} aria-hidden>
        {/* grid */}
        {[0.25, 0.5, 0.75].map((p, i) => (
          <line key={i} x1={0} x2={W} y1={H * p} y2={H * p} stroke={HAIR} strokeWidth={1} />
        ))}

        {/* divergence shading */}
        <polygon points={gapPath} fill={INK} opacity={0.06} />

        {/* divergence vertical mark */}
        <line x1={divX} x2={divX} y1={TOP - 10} y2={BOT + 10} stroke={GREEN} strokeWidth={1} strokeDasharray="2 3" opacity={0.7} />

        {/* "Said" line — solid ink */}
        <polyline
          fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          points={saidPts.map(([x, y]) => `${x},${y}`).join(' ')}
        />
        {/* "Heard" line — dashed green */}
        <polyline
          fill="none" stroke={GREEN} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="6 5"
          points={heardPts.map(([x, y]) => `${x},${y}`).join(' ')}
        />

        {/* end dots */}
        <circle cx={saidPts[N - 1][0]} cy={saidPts[N - 1][1]} r={4} fill={INK} />
        <circle cx={heardPts[N - 1][0]} cy={heardPts[N - 1][1]} r={4} fill={GREEN} />
      </svg>

      {/* labels */}
      <div style={{
        position: 'absolute', left: 0, top: 4,
        fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--vl-graphite)'
      }}>
        Minute 00:00 · You start speaking
      </div>
      <div style={{
        position: 'absolute', right: 0, top: 4,
        fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--vl-graphite)'
      }}>
        Minute 04:00 · Room has decided
      </div>
      <div style={{
        position: 'absolute', left: `${(divX / W) * 100}%`, bottom: -2,
        transform: 'translateX(-50%)',
        fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--vl-voice-green)', whiteSpace: 'nowrap'
      }}>
        ↓ Room drifts
      </div>
    </div>
  );
};

const Problem = () => {
  const scenarios = [
    {
      tag: 'Board',
      setup: 'A board member interrupts with a hard question.',
      meant: 'Accountable.',
      sounded: 'Defensive.',
      cost: 'They stopped hearing the plan and started managing the company through you.'
    },
    {
      tag: '1:1',
      setup: 'Difficult feedback for your co-founder.',
      meant: 'Direct.',
      sounded: 'Cold.',
      cost: 'They received the words and lost the relationship.'
    },
    {
      tag: 'Clients',
      setup: 'The buyer pushes back on price.',
      meant: 'Confident.',
      sounded: 'Salesy.',
      cost: 'They nodded through the meeting and ghosted the follow-up.'
    },
    {
      tag: 'All-hands',
      setup: 'You announce the layoffs.',
      meant: 'Resolved.',
      sounded: 'Flat.',
      cost: "The team kept moving at the old pace. The pivot didn't take."
    }
  ];

  return (
    <section id="problem" style={{ padding: '128px var(--vl-margin-x-desktop)' }}>
      <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
        <Label style={{ marginBottom: 32 }}>Why you're here</Label>

        {/* Headline + subhead */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 96, alignItems: 'end', marginBottom: 56 }}>
          <h2 style={{
            fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
            fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.012em',
            margin: 0, maxWidth: '18ch', textWrap: 'balance', color: 'var(--vl-ink)'
          }}>
            You know what you want to say, but the room hears <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>something else</em>.
          </h2>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
            fontSize: 'clamp(20px, 1.8vw, 24px)', lineHeight: 1.3, letterSpacing: '-0.005em',
            color: 'var(--vl-graphite)', margin: 0, maxWidth: '34ch', paddingBottom: 6
          }}>
            You're <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>losing the room</em> — and you can feel it in real time.
          </p>
        </div>

        {/* THE GRAPHIC — Said vs Heard */}
        <div style={{
          padding: '32px 32px 24px',
          border: '1px solid var(--vl-hairline)',
          borderRadius: 6,
          background: 'var(--vl-bone)'
        }}>
          {/* Legend strip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 28, marginBottom: 24, flexWrap: 'wrap',
            fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--vl-graphite)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 22, height: 2, background: 'var(--vl-ink)' }} />
              What you said
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="22" height="2" style={{ display: 'block' }}><line x1="0" y1="1" x2="22" y2="1" stroke="var(--vl-voice-green)" strokeWidth="2" strokeDasharray="4 3" /></svg>
              What the room heard
            </span>
            <span style={{ marginLeft: 'auto', color: 'var(--vl-voice-green)' }}>The gap is the problem</span>
          </div>

          <SaidHeardChart />
        </div>

        {/* SCENARIO CARDS — intended → received */}
        <div style={{ marginTop: 56 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 20, gap: 24, flexWrap: 'wrap'
          }}>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)'
            }}>The four rooms</div>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-voice-green)'
            }}>You meant → You sounded → Cost</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {scenarios.map((s, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', gap: 18,
                padding: '22px 20px 22px',
                background: 'var(--vl-paper)',
                border: '1px solid var(--vl-hairline)', borderRadius: 6
              }}>
                {/* tag row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--vl-voice-green)'
                  }}>{String(i + 1).padStart(2, '0')} / {s.tag.toUpperCase()}</span>
                </div>

                {/* setup */}
                <p style={{
                  fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
                  fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.005em',
                  color: 'var(--vl-ink)', margin: 0
                }}>{s.setup}</p>

                {/* meant / sounded */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{
                      fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: 'var(--vl-graphite)',
                      flex: '0 0 auto', width: 84
                    }}>You meant</span>
                    <span style={{
                      fontFamily: 'var(--vl-font-sans)', fontSize: 14, fontWeight: 500,
                      color: 'var(--vl-ink)'
                    }}>{s.meant}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{
                      fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: 'var(--vl-graphite)',
                      flex: '0 0 auto', width: 84
                    }}>You sounded</span>
                    <span style={{
                      fontFamily: 'var(--vl-font-sans)', fontSize: 14, fontWeight: 500,
                      color: 'var(--vl-voice-green)', fontStyle: 'italic'
                    }}>{s.sounded}</span>
                  </div>
                </div>

                {/* cost */}
                <div style={{
                  paddingTop: 14, borderTop: '1px solid var(--vl-hairline)',
                  display: 'flex', flexDirection: 'column', gap: 6
                }}>
                  <div style={{
                    fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--vl-graphite)'
                  }}>Cost</div>
                  <p style={{
                    fontFamily: 'var(--vl-font-sans)', fontSize: 13, lineHeight: 1.5,
                    color: 'var(--vl-ink)', margin: 0
                  }}>{s.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIAGNOSIS panel — replaces the old text-only closing */}
        <div style={{
          marginTop: 56, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
          gap: 96, alignItems: 'start'
        }}>
          <p style={{
            fontFamily: 'var(--vl-font-sans)', fontSize: 17, lineHeight: 1.6,
            color: 'var(--vl-ink)', margin: 0, maxWidth: '52ch'
          }}>
            When the stakes go up, something in your delivery doesn't land. Maybe your voice <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>goes flat</span>. Maybe you <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>rush the point</span> that needed to land. Maybe colleagues read your delivery as uncertain when you're actually confident — or as disengaged when you're fully prepared.
          </p>

          <div style={{
            paddingTop: 24, borderTop: '1px solid var(--vl-hairline)',
            display: 'flex', flexDirection: 'column', gap: 10
          }}>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)'
            }}>The diagnosis</div>
            <p style={{
              fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(20px, 1.8vw, 24px)', lineHeight: 1.35,
              color: 'var(--vl-ink)', margin: 0, maxWidth: '40ch'
            }}>
              These aren't knowledge gaps. They're <span style={{ fontStyle: 'normal', fontFamily: 'var(--vl-font-sans)', fontWeight: 600, color: 'var(--vl-voice-green)' }}>patterns</span> — and most leaders don't know they're running them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- STAKES ----------

// Voice-on-tape: a vocal waveform with a price line tracking it, plus stress markers.
// Deterministic data so it renders the same every time.
const StakesChart = () => {
  const W = 1200, H = 360;
  const N = 96;
  const PAD_X = 0;
  const BASE_Y = H * 0.58;

  // Vocal stress envelope — peaks where the voice "spikes"
  const stress = (i) => {
    const t = i / (N - 1);
    return (
      0.55 * Math.sin(t * Math.PI * 1.8) +
      0.30 * Math.sin(t * Math.PI * 5.1 + 0.7) +
      0.18 * Math.sin(t * Math.PI * 11.3 + 1.4) +
      0.10 * Math.sin(t * Math.PI * 23 + 2.2)
    );
  };

  // Build per-bar amplitude (vocal waveform, mirrored)
  const bars = Array.from({ length: N }, (_, i) => {
    const s = stress(i);
    const amp = 8 + Math.abs(s) * 86 + (Math.sin(i * 1.7) + 1) * 4;
    return amp;
  });

  const barW = (W - PAD_X * 2) / N;

  // Price line — stable before stress event, sharp drop after flagIdx
  const pricePts = Array.from({ length: N }, (_, i) => {
    const lag = Math.max(0, i - 3);
    const s = stress(lag);
    const preDrift = (i / N) * -8;
    // After the stress flag, price craters then partially recovers
    const postDrop = i > flagIdx
      ? Math.min((i - flagIdx) * 2.6, 58) * (1 - 0.35 * Math.max(0, (i - flagIdx - 10) / (N - flagIdx - 10)))
      : 0;
    const y = BASE_Y - 68 + preDrift + s * -18 + Math.sin(i * 0.6) * 3 + postDrop;
    const x = PAD_X + i * barW + barW / 2;
    return [x, y];
  });

  // Stress flag — peak just past 60%
  const flagIdx = 62;
  const flagX = PAD_X + flagIdx * barW + barW / 2;

  const PAPER = 'rgb(246,242,234)';
  const PERI = 'rgb(189,200,241)';
  const ALARM = 'rgb(255,90,80)';
  const DIM = 'rgba(246,242,234,0.32)';
  const HAIR = 'rgba(246,242,234,0.10)';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height="auto" style={{ display: 'block' }} aria-hidden>
        {/* horizontal grid */}
        {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
          <line key={i} x1={0} x2={W} y1={H * p} y2={H * p} stroke={HAIR} strokeWidth={1} />
        ))}

        {/* baseline */}
        <line x1={0} x2={W} y1={BASE_Y} y2={BASE_Y} stroke="rgba(246,242,234,0.22)" strokeWidth={1} strokeDasharray="2 4" />

        {/* vocal waveform — mirrored bars */}
        {bars.map((amp, i) => {
          const x = PAD_X + i * barW + barW / 2;
          const isStress = Math.abs(stress(i)) > 0.78;
          const isNearFlag = Math.abs(i - flagIdx) <= 2;
          const color = isNearFlag ? ALARM : isStress ? PERI : PAPER;
          const opacity = isNearFlag ? 1 : isStress ? 0.95 : 0.72;
          return (
            <g key={i} stroke={color} strokeWidth={isNearFlag ? 2 : 1.4} strokeLinecap="round" opacity={opacity}>
              <line x1={x} x2={x} y1={BASE_Y - amp} y2={BASE_Y + amp} />
            </g>
          );
        })}

        {/* price line — periwinkle, follows-but-lags vocal stress */}
        <polyline
          fill="none"
          stroke={PERI}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pricePts.map(([x, y]) => `${x},${y}`).join(' ')}
        />
        {/* end dot on price line */}
        <circle cx={pricePts[pricePts.length - 1][0]} cy={pricePts[pricePts.length - 1][1]} r={5} fill={PERI} />

        {/* stress flag */}
        <line x1={flagX} x2={flagX} y1={28} y2={H - 28} stroke={ALARM} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.9} />
        <circle cx={flagX} cy={H - 28} r={5} fill={ALARM} opacity={0.95} />
      </svg>

      {/* SVG-side annotations as HTML (crisper text). Stress label sits BELOW the chart,
          anchored under the flag, so it never collides with the top-row meta labels. */}
      <div style={{
        position: 'absolute',
        left: `${(flagX / W) * 100}%`,
        bottom: -2,
        transform: 'translateX(-50%)',
        fontFamily: 'var(--vl-font-mono)', fontSize: 12, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: ALARM, whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        Stress · 04:32
      </div>
      <div style={{
        position: 'absolute', left: 0, top: 4,
        fontFamily: 'var(--vl-font-mono)', fontSize: 12, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(246,242,234,0.82)'
      }}>
        Vocal pitch · Earnings call (live)
      </div>
      <div style={{
        position: 'absolute', right: 0, top: 4,
        fontFamily: 'var(--vl-font-mono)', fontSize: 12, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: ALARM
      }}>
        $TICKR · −2.4%
      </div>
    </div>
  );
};

const Stakes = () =>
<section id="stakes" style={{
  padding: '128px var(--vl-margin-x-desktop)',
  background: 'var(--vl-ink)',
  color: 'var(--vl-paper)', backgroundColor: "rgb(19, 21, 20)"
}}>
    <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
      <Label color="green" style={{ marginBottom: 32, color: 'rgb(189, 200, 241)' }}>What's at stake</Label>

      {/* Headline + tight subhead */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 96, alignItems: 'end', marginBottom: 56 }}>
        <h2 style={{
        fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
        fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.012em',
        margin: 0, maxWidth: '18ch', textWrap: 'balance', color: 'var(--vl-paper)'
      }}>
          Hedge funds now trade on the way a CEO <em style={{ fontStyle: 'italic', color: 'rgb(189, 200, 241)' }}>sounds</em>.
        </h2>
        <p style={{
          fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
          fontSize: 'clamp(20px, 1.8vw, 24px)', lineHeight: 1.3, letterSpacing: '-0.005em',
          color: 'rgba(246,242,234,0.78)', margin: 0, maxWidth: '34ch', paddingBottom: 6
        }}>
          Analysts time the algorithm to vocal stress on earnings calls — not <em style={{ fontStyle: 'italic', color: 'rgb(189, 200, 241)' }}>what's said</em>, <em style={{ fontStyle: 'italic', color: 'rgb(189, 200, 241)' }}>how it's said</em>.
        </p>
      </div>

      {/* THE GRAPHIC — vocal waveform + price line */}
      <div style={{
        position: 'relative',
        padding: '36px 32px 28px',
        border: '1px solid rgba(246,242,234,0.12)',
        borderRadius: 6,
        background: 'linear-gradient(180deg, rgba(246,242,234,0.025), rgba(246,242,234,0))'
      }}>
        {/* corner ticks */}
        {[
          { top: -1, left: -1, brT: 1, brL: 1 },
          { top: -1, right: -1, brT: 1, brR: 1 },
          { bottom: -1, left: -1, brB: 1, brL: 1 },
          { bottom: -1, right: -1, brB: 1, brR: 1 }
        ].map((p, i) => (
          <span key={i} aria-hidden style={{
            position: 'absolute', width: 10, height: 10,
            borderTop: p.brT ? '1px solid rgb(189,200,241)' : 'none',
            borderBottom: p.brB ? '1px solid rgb(189,200,241)' : 'none',
            borderLeft: p.brL ? '1px solid rgb(189,200,241)' : 'none',
            borderRight: p.brR ? '1px solid rgb(189,200,241)' : 'none',
            top: p.top, bottom: p.bottom, left: p.left, right: p.right
          }} />
        ))}

        <StakesChart />

        {/* legend */}
        <div style={{
          marginTop: 18, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap',
          fontFamily: 'var(--vl-font-mono)', fontSize: 12, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(246,242,234,0.8)'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 18, height: 1, background: 'rgb(246,242,234)', opacity: 0.7 }} />
            Voice
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 18, height: 2, background: 'rgb(189,200,241)' }} />
            Share price
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgb(255,90,80)' }} />
            Stress event
          </span>
          <span style={{ marginLeft: 'auto', color: 'rgba(246,242,234,0.55)' }}>Illustrative</span>
        </div>
      </div>

      {/* Closing two-line statement, centered under graphic */}
      <div style={{
        marginTop: 72, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 96, alignItems: 'start'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
            fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.012em',
            color: 'var(--vl-paper)', margin: 0, maxWidth: '20ch'
          }}>
            The market has decided delivery is information.
          </p>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1,
            color: 'rgb(189,200,241)', margin: 0, maxWidth: '20ch'
          }}>
            Most leaders haven't.
          </p>
        </div>

        {/* Stat strip — three quick data points */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          paddingTop: 6
        }}>
          {[
            { n: '93%', l: 'of meaning carried by delivery, not words' },
            { n: '<200ms', l: 'for a listener to read confidence in your voice' },
            { n: '$1.4T', l: 'traded on earnings-call sentiment per quarter' }
          ].map((s, i) => (
            <div key={i} style={{
              borderTop: '1px solid rgba(246,242,234,0.18)',
              paddingTop: 18,
              display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <div style={{
                fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
                fontSize: 'clamp(28px, 2.6vw, 36px)', lineHeight: 1,
                color: 'rgb(189,200,241)', letterSpacing: '-0.01em'
              }}>{s.n}</div>
              <div style={{
                fontFamily: 'var(--vl-font-sans)', fontSize: 12, lineHeight: 1.45,
                color: 'rgba(246,242,234,0.72)'
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>;


// ---------- SPRINT ----------
const Sprint = () => {
  const cards = [
  { icon: 'authority', title: 'Authority and command',
    pull: "Stop sounding tentative when you're actually certain.",
    body: "You'll develop the weight and steadiness that makes people stop talking over you — so your point lands the first time, not the third." },
  { icon: 'warmth', title: 'Warmth and trust',
    pull: 'Move past flat delivery that reads as cold or checked-out.',
    body: "You'll find the register that makes colleagues feel addressed, not lectured — so people want to be in the room with you." },
  { icon: 'clarity', title: 'Clarity and impact',
    pull: 'Get out of your own way when it matters most.',
    body: "You'll learn to land your point cleanly under pressure — so what you say is what people hear." },
  { icon: 'presence', title: 'Presence and connection',
    pull: 'Hold the room without raising your voice.',
    body: "You'll practice the small shifts that make people feel addressed — so you're heard as engaged, not detached." }];


  return (
    <section id="sprint" style={{ padding: '128px var(--vl-margin-x-desktop)', background: 'var(--vl-bone)', borderTop: '1px solid var(--vl-hairline)', borderBottom: '1px solid var(--vl-hairline)' }}>
    <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
      <Label style={{ marginBottom: 32 }}>Where it starts</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 96, alignItems: 'start' }}>
        <h2 style={{ fontFamily: 'var(--vl-font-serif)', fontWeight: 400, fontSize: 'clamp(40px, 5.2vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.014em', margin: 0, maxWidth: '14ch', textWrap: 'balance', color: 'var(--vl-ink)' }}>
          The <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>Voice Sprint.</em> Ten days that set the foundation.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 12 }}>
          <p style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
              fontSize: 'clamp(24px, 2.2vw, 30px)', lineHeight: 1.2, letterSpacing: '-0.005em',
              color: 'var(--vl-ink)', margin: 0, maxWidth: '24ch'
            }}>
            A <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>two-week intensive</em> — thirty-minute weekday sessions, one after another.
          </p>
          <div style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18,
              paddingTop: 10, borderTop: '1px solid var(--vl-hairline)'
            }}>
            <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-graphite)', paddingTop: 14 }}>How</div>
            <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.55, color: 'var(--vl-ink)', margin: 0, padding: '12px 0 14px', borderBottom: '1px solid var(--vl-hairline)', maxWidth: '46ch' }}>
              Communication doesn't change from <span style={{ color: 'var(--vl-graphite)' }}>watching a course</span> or <span style={{ color: 'var(--vl-graphite)' }}>reading a framework</span>.
            </p>
            <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-voice-green)', paddingTop: 14 }}>So</div>
            <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.55, color: 'var(--vl-ink)', margin: 0, padding: '12px 0 0', maxWidth: '46ch' }}>
              It changes through <span style={{ fontWeight: 500, color: 'var(--vl-voice-green)' }}>practice</span>, <span style={{ fontWeight: 500, color: 'var(--vl-voice-green)' }}>real-time feedback</span>, and <span style={{ fontWeight: 500, color: 'var(--vl-voice-green)' }}>repetition</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Four pillar cards */}
      <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {cards.map((r, i) =>
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: 14,
            padding: '28px 24px',
            background: 'var(--vl-paper)',
            border: '1px solid var(--vl-hairline)', borderRadius: 6
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <SprintIcon kind={r.icon} />
              <div style={{
                fontFamily: 'var(--vl-font-mono)', fontFeatureSettings: "'tnum' 1",
                fontSize: 11, color: 'var(--vl-voice-green)', letterSpacing: '0.04em'
              }}>{String(i + 1).padStart(2, '0')}</div>
            </div>
            <h4 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 500, fontSize: 22,
              lineHeight: 1.15, letterSpacing: '-0.005em', color: 'var(--vl-ink)', margin: '4px 0 0'
            }}>{r.title}</h4>
            <p style={{
              fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
              fontSize: 17, lineHeight: 1.3, color: 'var(--vl-voice-green)', margin: 0
            }}>{r.pull}</p>
            <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--vl-graphite)', margin: 0 }}>
              {r.body}
            </p>
          </div>
          )}
      </div>

      {/* ---- HEAR THE DIFFERENCE — integrated split-frame ---- */}
      <HearTheDifference />

    </div>
  </section>);
};


// ---------- HEAR THE DIFFERENCE — unified split-frame ----------
// Reads as the 5th element of the Sprint section, not a separate band.
// One device, one shared timeline, two channels (Day 01 ⟷ Day 10) sharing
// a horizontal axis. Bars on the left half flow right→left; bars on the
// right flow left→right; they meet at a vertical seam that is the diff.
const HearTheDifference = () => {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef(0);
  const startRef = React.useRef(0);
  const durMs = 18000;

  React.useEffect(() => {
    if (!playing) return;
    startRef.current = performance.now() - progress * durMs;
    const tick = (t) => {
      const p = Math.min(1, (t - startRef.current) / durMs);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const reset = () => { setPlaying(false); setProgress(0); };

  // Two synchronized bar arrays. Same length so they share an x-axis.
  const N = 56;
  const beforeBars = React.useMemo(() => {
    const r = (i) => { const x = Math.sin(i * 31 * 0.37) * 10000; return x - Math.floor(x); };
    return Array.from({ length: N }, (_, i) => {
      // tense — narrow dynamic range, jittery, clipped tops
      const base = 0.40 + r(i) * 0.28;
      const pulse = Math.abs(Math.sin(i * 0.55)) * 0.18;
      return Math.min(0.92, base + pulse);
    });
  }, []);
  const afterBars = React.useMemo(() => {
    const r = (i) => { const x = Math.sin(i * 7 * 0.37) * 10000; return x - Math.floor(x); };
    return Array.from({ length: N }, (_, i) => {
      // open — breathing rhythm, wider arcs, softer
      const wave = (Math.sin(i * 0.16) + 1) / 2;
      const drift = (Math.sin(i * 0.06) + 1) / 2;
      return 0.18 + wave * 0.55 + drift * 0.20 + r(i) * 0.05;
    });
  }, []);

  // Tick numerals along the bottom — like a film strip / count-up
  const ticks = [1, 3, 5, 7, 10];

  return (
    <div style={{
      marginTop: 24,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }}>
      {/* Single graphic that spans the full row, matching the pillar grid above */}
      <figure style={{
        gridColumn: '1 / -1',
        margin: 0,
        background: 'var(--vl-paper)',
        border: '1px solid var(--vl-hairline)',
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative'
      }}>

        {/* TOP META BAR — picks up the same 01 / 02 / 03 / 04 numeral system */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '20px 28px 18px',
          borderBottom: '1px solid var(--vl-hairline)'
        }}>
          {/* left meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'flex-start' }}>
            <span style={{
              fontFamily: 'var(--vl-font-mono)', fontFeatureSettings: "'tnum' 1",
              fontSize: 11, color: 'var(--vl-graphite)', letterSpacing: '0.04em'
            }}>05</span>
            <span style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)'
            }}>
              Hear the difference — <span style={{ color: 'var(--vl-ink)' }}>same speaker, same words</span>
            </span>
          </div>

          {/* center play */}
          <button
            aria-label={playing ? 'Pause' : 'Play comparison'}
            onClick={() => setPlaying((p) => !p)}
            style={{
              width: 56, height: 56, borderRadius: 999,
              border: '1px solid var(--vl-voice-green)',
              background: playing ? 'var(--vl-voice-green)' : 'transparent',
              color: playing ? 'var(--vl-paper)' : 'var(--vl-voice-green)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 180ms var(--vl-ease), color 180ms var(--vl-ease)'
            }}>
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.4" height="12" /><rect x="8.6" y="1" width="3.4" height="12" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor"><path d="M2 1 L13 7 L2 13 Z" /></svg>
            )}
          </button>

          {/* right meta — restart + time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'flex-end' }}>
            <span style={{
              fontFamily: 'var(--vl-font-mono)', fontFeatureSettings: "'tnum' 1",
              fontSize: 11, color: 'var(--vl-graphite)', letterSpacing: '0.04em'
            }}>
              {formatTime(progress * (durMs / 1000))}<span style={{ opacity: 0.5 }}> / {formatTime(durMs / 1000)}</span>
            </span>
            <button
              onClick={reset}
              style={{
                fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--vl-graphite)',
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 0
              }}>
              Restart
            </button>
          </div>
        </div>

        {/* HEADLINE BAND inside the frame — no outer divider, the frame holds it */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          padding: '36px 28px 24px',
          gap: 0,
          position: 'relative'
        }}>
          <div style={{ paddingRight: 36 }}>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)', marginBottom: 14
            }}>
              Day 01 — Before
            </div>
            <h3 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
              fontSize: 'clamp(28px, 3.0vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.012em',
              color: 'var(--vl-ink)', margin: 0, maxWidth: '18ch', textWrap: 'balance'
            }}>
              Same speaker. Same words.
            </h3>
            <p style={{
              fontFamily: 'var(--vl-font-sans)', fontSize: 14, lineHeight: 1.55,
              color: 'var(--vl-graphite)', margin: '14px 0 0', maxWidth: '36ch'
            }}>
              Opening line of an investor pitch. Read aloud, day one — clenched, ahead of breath.
            </p>
          </div>
          <div style={{ paddingLeft: 36, textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-voice-green)', marginBottom: 14
            }}>
              Day 10 — After
            </div>
            <h3 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400, fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.0vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.012em',
              color: 'var(--vl-voice-green)', margin: 0, maxWidth: '18ch', textWrap: 'balance', marginLeft: 'auto'
            }}>
              Different delivery.
            </h3>
            <p style={{
              fontFamily: 'var(--vl-font-sans)', fontSize: 14, lineHeight: 1.55,
              color: 'var(--vl-graphite)', margin: '14px 0 0', maxWidth: '36ch', marginLeft: 'auto'
            }}>
              The person is the same. <span style={{ color: 'var(--vl-ink)' }}>How it lands isn't.</span>
            </p>
          </div>

          {/* vertical seam between halves */}
          <div aria-hidden style={{
            position: 'absolute', top: 24, bottom: 0, left: '50%',
            width: 1, background: 'var(--vl-hairline)'
          }} />
        </div>

        {/* THE WAVE — the graphic centerpiece. Two halves mirrored across an axis. */}
        <div
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setProgress(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
          }}
          style={{
            position: 'relative',
            height: 220,
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            cursor: 'pointer',
            borderTop: '1px solid var(--vl-hairline)',
            borderBottom: '1px solid var(--vl-hairline)',
            background: `linear-gradient(to right, var(--vl-bone) 0%, var(--vl-bone) 50%, var(--vl-paper) 50%, var(--vl-paper) 100%)`
          }}>
          {/* horizontal axis line through the middle, full width */}
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
            background: 'var(--vl-hairline)'
          }} />

          {/* LEFT — Day 01: bars from the seam outward, graphite */}
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center',
            padding: '24px 0 24px 28px',
            flexDirection: 'row-reverse',
            gap: 0
          }}>
            {beforeBars.map((h, i) => {
              // i=0 nearest to the seam (right edge of this half)
              const playedFrac = progress * 2; // left half plays 0..0.5
              const barFrac = i / N;
              const played = barFrac <= playedFrac && progress < 0.5 + 0.001;
              return (
                <span key={`b-${i}`} style={{
                  flex: '1 1 0', minWidth: 0,
                  marginLeft: i === N - 1 ? 0 : 2,
                  height: `${Math.max(6, h * 70)}%`,
                  background: played ? 'var(--vl-ink)' : 'rgba(0,0,0,0.12)',
                  borderRadius: 1,
                  transition: 'background 120ms linear'
                }} />);
            })}
          </div>

          {/* RIGHT — Day 10: bars from the seam outward, voice-green, taller */}
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center',
            padding: '24px 28px 24px 0',
            gap: 0
          }}>
            {afterBars.map((h, i) => {
              const playedFrac = (progress - 0.5) * 2; // right half plays 0.5..1
              const barFrac = i / N;
              const played = progress >= 0.5 && barFrac <= playedFrac;
              return (
                <span key={`a-${i}`} style={{
                  flex: '1 1 0', minWidth: 0,
                  marginRight: i === N - 1 ? 0 : 2,
                  height: `${Math.max(8, h * 90)}%`,
                  background: played ? 'var(--vl-voice-green)' : 'rgba(8,79,55,0.22)',
                  borderRadius: 1,
                  transition: 'background 120ms linear'
                }} />);
            })}
          </div>

          {/* center seam — bold, with the diff label */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, bottom: 0, left: '50%',
            width: 1, background: 'var(--vl-ink)', opacity: 0.6
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'var(--vl-paper)', border: '1px solid var(--vl-ink)',
            padding: '6px 10px', borderRadius: 999,
            fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--vl-ink)',
            whiteSpace: 'nowrap'
          }}>
            10 days
          </div>

          {/* playhead */}
          <div aria-hidden style={{
            position: 'absolute', top: 8, bottom: 8,
            left: `${progress * 100}%`,
            width: 2, background: 'var(--vl-voice-green)',
            transform: 'translateX(-1px)',
            boxShadow: '0 0 0 4px rgba(11,109,79,0.10)',
            pointerEvents: 'none',
            opacity: progress > 0 ? 1 : 0,
            transition: 'opacity 200ms var(--vl-ease)'
          }} />
        </div>

        {/* TICKS — day count along the timeline */}
        <div style={{
          position: 'relative',
          padding: '14px 28px 18px',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--vl-font-mono)', fontFeatureSettings: "'tnum' 1",
          fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--vl-graphite)'
        }}>
          {ticks.map((d) =>
            <span key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 1, height: 6, background: 'var(--vl-hairline)' }} />
              Day {String(d).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* BOTTOM CAPTION — pulls the whole thing back to the page voice */}
        <div style={{
          padding: '18px 28px 24px',
          borderTop: '1px solid var(--vl-hairline)',
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24
        }}>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: 1.25, letterSpacing: '-0.005em',
            color: 'var(--vl-ink)', margin: 0, maxWidth: '52ch'
          }}>
            Reading the words <span style={{ color: 'var(--vl-graphite)' }}>→</span> <span style={{ color: 'var(--vl-voice-green)' }}>landing the words.</span>
          </p>
          <span style={{
            fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--vl-graphite)'
          }}>
            ↳ click anywhere to scrub
          </span>
        </div>
      </figure>
    </div>);
};

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
};


// Sprint icons — voice-green strokes
const SprintIcon = ({ kind }) => {
  const stroke = 'var(--vl-voice-green)';
  const common = { width: 36, height: 36, fill: 'none', stroke, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'authority') return (
    <svg viewBox="0 0 40 40" {...common}>
      <path d="M20 5 v22" /><path d="M14 27 h12" /><path d="M16 27 l4 8 l4 -8" />
      <circle cx="20" cy="5" r="1.5" fill={stroke} />
    </svg>);
  if (kind === 'warmth') return (
    <svg viewBox="0 0 40 40" {...common}>
      <path d="M8 26 a10 10 0 0 1 10 -10" /><path d="M32 14 a10 10 0 0 0 -10 10" />
      <circle cx="18" cy="16" r="1.5" fill={stroke} /><circle cx="22" cy="24" r="1.5" fill={stroke} />
    </svg>);
  if (kind === 'clarity') return (
    <svg viewBox="0 0 40 40" {...common}>
      <path d="M5 20 q3 -8 6 0 t6 0 t6 0 t6 0" />
      <circle cx="35" cy="20" r="2" fill={stroke} />
    </svg>);
  if (kind === 'presence') return (
    <svg viewBox="0 0 40 40" {...common}>
      <circle cx="20" cy="20" r="3" fill={stroke} />
      <circle cx="20" cy="20" r="8" />
      <circle cx="20" cy="20" r="14" opacity="0.5" />
    </svg>);
  return null;
};

// ---------- TESTIMONIALS ----------
const Testimonials = () => {
  const quotes = [
  {
    pull: 'Nothing changed the way I actually show up in a room until this.',
    body: "I've done executive coaching, presentation training, even improv. Three days in I had a board meeting. I walked out knowing something was different — not because I'd prepared more, but because I wasn't fighting myself the whole time.",
    attr: 'M. R.',
    role: 'Co-founder & CEO',
    tag: 'Series B SaaS'
  },
  {
    pull: 'My team noticed before I did.',
    body: "I thought I was just having a good week. Then two different people mentioned in the same day that something had shifted in how I was running our standups. I wasn't doing anything differently — consciously. That's the point.",
    attr: 'S. K.',
    role: 'VP Engineering',
    tag: 'Growth-stage fintech'
  }];


  return (
    <section id="testimonials" style={{ padding: '128px var(--vl-margin-x-desktop)', background: 'var(--vl-bone)', borderTop: '1px solid var(--vl-hairline)', borderBottom: '1px solid var(--vl-hairline)' }}>
      <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
        <div style={{ marginBottom: 72 }}>
          <Label style={{ marginBottom: 32 }}>What clients say</Label>
          <h2 style={{
            fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
            fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.04, letterSpacing: '-0.012em',
            margin: 0, maxWidth: '18ch', textWrap: 'balance', color: 'var(--vl-ink)'
          }}>
            The shift shows up <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>where it counts</em>.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {quotes.map((q, i) =>
          <figure key={i} style={{
            margin: 0, padding: '36px 36px 28px',
            background: 'var(--vl-paper)',
            border: '1px solid var(--vl-hairline)',
            borderRadius: 6,
            display: 'flex', flexDirection: 'column', gap: 22,
            position: 'relative'
          }}>
              {/* oversize green quote glyph */}
              <span aria-hidden style={{
              position: 'absolute', top: 18, right: 28,
              fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic',
              fontSize: 96, lineHeight: 0.9, color: 'var(--vl-voice-green)',
              opacity: 0.18, pointerEvents: 'none'
            }}>“</span>

              {/* PULL — large serif (italic) */}
              <p style={{
              fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(24px, 2.2vw, 30px)', lineHeight: 1.18, letterSpacing: '-0.005em',
              color: 'var(--vl-ink)', margin: 0, maxWidth: '20ch'
            }}>
                {q.pull}
              </p>

              {/* BODY — sans, NOT italic */}
              <blockquote style={{
              margin: 0,
              fontFamily: 'var(--vl-font-sans)', fontStyle: 'normal', fontWeight: 400,
              fontSize: 16, lineHeight: 1.55, color: 'var(--vl-ink)'
            }}>
                {q.body}
              </blockquote>

              <figcaption style={{
              display: 'flex', alignItems: 'baseline', gap: 14, paddingTop: 18,
              borderTop: '1px solid var(--vl-hairline)', flexWrap: 'wrap'
            }}>
                <span style={{
                fontFamily: 'var(--vl-font-serif)', fontWeight: 500,
                fontSize: 22, color: 'var(--vl-ink)'
              }}>{q.attr}</span>
                <span style={{
                fontFamily: 'var(--vl-font-sans)', fontSize: 13, fontWeight: 500,
                color: 'var(--vl-ink)'
              }}>{q.role}</span>
                <span style={{ color: 'var(--vl-voice-green)' }}>•</span>
                <span style={{
                fontFamily: 'var(--vl-font-mono)', fontSize: 11,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--vl-graphite)'
              }}>{q.tag}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>);

};

// ---------- WHO THIS IS FOR ----------
const WhoFor = () => {
  const items = [
  { k: 'Serious about what\'s next',
    v: "You have something real on the horizon — a board presentation, a fundraise, a hard conversation, a team you need to move — and you're not willing to walk into it sounding the way you do now." },
  { k: 'Committed to the work',
    v: "You know the kind of change you want doesn't happen in thirty-minute sessions alone. You're ready to give it a full hour a day for ten days — sessions, exercises, recordings, reps — because you understand that's what it takes." },
  { k: 'Open to feedback',
    v: "You want to know what's actually happening when you speak — the habits, the patterns, the moments people check out. You'd rather hear something hard once than be politely managed for years." },
  { k: 'Up for trying new things',
    v: "You're open to approaches that feel unfamiliar at first — exercises, drills, ways of using your voice you haven't used before. You lean into the experiment instead of pre-judging it." }];


  return (
    <section id="who" style={{ padding: '128px var(--vl-margin-x-desktop) 72px' }}>
      <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
        <Label style={{ marginBottom: 32 }}>Who the voice sprint is for</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <h2 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
              fontSize: 'clamp(32px, 3.6vw, 48px)', lineHeight: 1.15, letterSpacing: '-0.012em',
              margin: 0, maxWidth: '24ch', color: 'var(--vl-ink)'
            }}>
              You're a <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>founder, executive,</em> or <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>technical leader</em> who communicates constantly — and something isn't landing.
            </h2>
            <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--vl-graphite)', margin: 0, maxWidth: '52ch' }}>
              You've probably done executive coaching or presentation training before. The frameworks made sense. Under pressure, they disappeared. The problem was never the content — it was the delivery, and no one has ever trained you at that level.
            </p>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--vl-font-sans)', fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-graphite)',
              marginBottom: 24
            }}>This is for you if</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {items.map((it, i) =>
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20,
                padding: '22px 0', borderTop: i === 0 ? '1px solid var(--vl-hairline)' : 'none',
                borderBottom: '1px solid var(--vl-hairline)'
              }}>
                  <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 13, color: 'var(--vl-voice-green)', paddingTop: 6 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{
                    fontFamily: 'var(--vl-font-serif)', fontWeight: 500,
                    fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.005em',
                    color: 'var(--vl-ink)'
                  }}>{it.k}</div>
                    <div style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 15, lineHeight: 1.55, color: 'var(--vl-graphite)' }}>{it.v}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

};

// ---------- ABOUT ----------
const About = ({ portraitTone }) => {
  const tones = {
    warm: { bg1: '#E8DDC9', bg2: '#D8C9AE' },
    cool: { bg1: '#E0E6F2', bg2: '#C7D1E5' },
    ink: { bg1: '#1F2520', bg2: '#0E1411' }
  };
  const t = tones[portraitTone] || tones.warm;
  const dark = portraitTone === 'ink';

  const credentials = [
  'Co-founder + CEO',
  'Head of Community',
  'Classically trained opera singer',
  'Currently performing a one-woman show'];


  return (
    <section id="about" style={{ padding: '72px var(--vl-margin-x-desktop) 128px', background: 'var(--vl-bone)', borderTop: '1px solid var(--vl-hairline)' }}>
      <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
        <Label style={{ marginBottom: 32 }}>About</Label>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 64, alignItems: 'start'
        }}>
          {/* Smaller portrait */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: '100%', aspectRatio: '4 / 5',
              border: '1px solid var(--vl-hairline)', borderRadius: 6,
              position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--vl-shadow-card)'
            }}>
              <img src="assets/genevieve-portrait.jpg" alt="Genevieve Kim" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', right: 12, top: 12, width: 5, height: 5, borderRadius: 999,
                background: 'var(--vl-voice-green)'
              }} />
            </div>

            {/* Caption strip under portrait */}
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)',
              display: 'flex', justifyContent: 'space-between'
            }}>
              <span>Founder</span>
              <span style={{ color: 'var(--vl-voice-green)' }}>The Voice Lab</span>
            </div>
          </div>

          {/* Bio block — visualized with eyebrows + pull quote */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 4 }}>
            <h2 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
              fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.04, letterSpacing: '-0.014em',
              margin: 0, color: 'var(--vl-ink)'
            }}>
              Genevieve Kim
            </h2>

            {/* Bio paragraph with green inline emphasis */}
            <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 18, lineHeight: 1.6, color: 'var(--vl-ink)', margin: 0, maxWidth: '58ch' }}>
              Genevieve Kim spent her career in tech boardrooms — as a <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>co-founder</span>, <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>consultant</span>, and <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>Head of Community at a $2B unicorn</span> — before performing on stages in her one-woman show. She holds a degree in vocal performance and trained as an opera singer.
            </p>

            {/* The thesis line, visually weighted */}
            <div style={{
              borderLeft: '3px solid var(--vl-voice-green)',
              paddingLeft: 24, paddingTop: 4, paddingBottom: 4,
              maxWidth: '52ch'
            }}>
              <p style={{
                fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(22px, 2.1vw, 28px)', lineHeight: 1.25, letterSpacing: '-0.005em',
                color: 'var(--vl-ink)', margin: 0
              }}>
                The Voice Lab is what happens when you combine <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>boardroom pressure</em> with <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>classical vocal training</em>.
              </p>
            </div>

            {/* The voice isn't something you "have" — belief block */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20, paddingTop: 20, borderTop: '1px solid var(--vl-hairline)' }}>
              <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-voice-green)', paddingTop: 4 }}>What I believe</div>
              <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--vl-ink)', margin: 0, maxWidth: '56ch' }}>
                The voice isn't something you <em style={{ fontStyle: 'italic' }}>"have."</em> It's something you <span style={{ fontWeight: 500, color: 'var(--vl-voice-green)' }}>use</span>. And like anything you use under pressure — judgment, strategy, composure — it can be trained. The leaders who sound certain aren't more confident than you. They just have access to a wider range. <span style={{ fontWeight: 500 }}>And range isn't talent. It's training.</span>
              </p>
            </div>

            {/* Who I work with */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20 }}>
              <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-graphite)', paddingTop: 4 }}>Who I work with</div>
              <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--vl-ink)', margin: 0, maxWidth: '56ch' }}>
                Founders, executives, and technical leaders. People for whom communication isn't a soft skill — it's the thing that determines whether the room follows.
              </p>
            </div>

            {/* Credentials chip row */}
            <div style={{ marginTop: 8, paddingTop: 24, borderTop: '1px solid var(--vl-hairline)', display: 'flex', flexWrap: 'wrap', gap: '10px 12px' }}>
              {credentials.map((c, i) =>
              <div key={i} style={{
                fontFamily: 'var(--vl-font-sans)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vl-ink)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 14px',
                background: 'var(--vl-bone)',
                border: '1px solid var(--vl-hairline)', borderRadius: 999
              }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--vl-voice-green)' }} />
                  {c}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

// ---------- CTA / FOOTER ----------
const ClosingCTA = ({ onBookClick, ctaStyle }) =>
<section style={{ padding: '128px var(--vl-margin-x-desktop) 0', background: 'var(--vl-paper)' }}>
    <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
      <div style={{
      display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 96, alignItems: 'start',
      paddingBottom: 96
    }}>
        <div>
          <Label style={{ marginBottom: 32 }}>Start here</Label>
          <h2 style={{
          fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
          fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 1.04, letterSpacing: '-0.014em',
          margin: 0, maxWidth: '16ch', textWrap: 'balance', color: 'var(--vl-ink)'
        }}>
            Start with a conversation.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 12 }}>
          <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 19, lineHeight: 1.55, color: 'var(--vl-ink)', margin: 0, maxWidth: '54ch' }}>A 30-minute discovery call — not a pitch. We'll identify what's showing up in your communication, whether the sprint format fits what you're facing, and what the first session would look like.

        </p>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <PrimaryCTA onClick={onBookClick} large variant={ctaStyle}>Book a discovery call</PrimaryCTA>
            <span style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 13, color: 'var(--vl-graphite)' }}>30 minutes · Remote via Google Meet

          </span>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 32, opacity: 0.5 }}>
        <img src="assets/waveform-breath.svg" alt="" style={{ width: '100%', display: 'block' }} />
      </div>
    </div>

    <footer style={{
    borderTop: '1px solid var(--vl-hairline)', marginTop: 64,
    padding: '32px var(--vl-margin-x-desktop)'
  }}>
      <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Wordmark size={12} />
        <div style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--vl-graphite)' }}>
          A communication sprint for leaders
        </div>
      </div>
    </footer>
  </section>;


// ---------- DISCOVERY DIALOG ----------
const DiscoveryDialog = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(14,20,17,0.42)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      animation: 'vl-fade-in 240ms var(--vl-ease) both'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--vl-paper)', maxWidth: 520, width: '100%',
        borderRadius: 6, border: '1px solid var(--vl-hairline)',
        boxShadow: 'var(--vl-shadow-floating)',
        padding: '40px 40px 32px', position: 'relative',
        animation: 'vl-rise 320ms var(--vl-ease) both'
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 16,
          background: 'transparent', border: 0, cursor: 'pointer',
          fontFamily: 'var(--vl-font-sans)', fontSize: 18, color: 'var(--vl-graphite)',
          width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>×</button>
        <Label style={{ marginBottom: 20 }}>Discovery call</Label>
        <h3 style={{
          fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
          fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.012em',
          margin: '0 0 16px', maxWidth: '18ch'
        }}>
          A diagnostic, not a pitch.
        </h3>
        <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 15, lineHeight: 1.55, color: 'var(--vl-graphite)', margin: '0 0 28px' }}>
          Tell me a little about what's showing up. I'll respond within 24 hours with two times.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input placeholder="Name" style={inputStyle} />
          <input placeholder="Work email" style={inputStyle} />
          <textarea placeholder="What's the moment your communication has been getting in the way? (Optional)" rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--vl-font-sans)' }} />
        </div>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 12, color: 'var(--vl-graphite)' }}>
            20 minutes · Remote via Google Meet
          </span>
          <PrimaryCTA onClick={onClose}>Request a time</PrimaryCTA>
        </div>
      </div>
    </div>);

};

const inputStyle = {
  fontFamily: 'var(--vl-font-sans)', fontSize: 15,
  background: 'var(--vl-bone)',
  border: '1px solid var(--vl-hairline)',
  borderRadius: 2, padding: '12px 14px',
  color: 'var(--vl-ink)',
  outline: 'none',
  transition: 'border-color 180ms var(--vl-ease)'
};

// ---------- TWEAKS ----------
const Tweaks = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [open, setOpen] = useState(false);

  // Apply globally via context-less prop drilling: store on window for App to read.
  useEffect(() => {window.__VL_TWEAKS = tweaks;window.dispatchEvent(new Event('vl-tweaks-changed'));}, [tweaks]);

  return (
    <TweaksPanel open={open} onOpenChange={setOpen} title="Tweaks">
      <TweakSection title="Hero">
        <TweakRadio label="Layout"
        value={tweaks.heroLayout}
        onChange={(v) => setTweak('heroLayout', v)}
        options={[{ value: 'asymmetric', label: 'Asymmetric' }, { value: 'stacked', label: 'Stacked' }]} />
        <TweakToggle label="Show waveform"
        value={tweaks.showWaveform}
        onChange={(v) => setTweak('showWaveform', v)} />
      </TweakSection>
      <TweakSection title="About">
        <TweakRadio label="Portrait tone"
        value={tweaks.aboutPortraitTone}
        onChange={(v) => setTweak('aboutPortraitTone', v)}
        options={[
        { value: 'warm', label: 'Warm' },
        { value: 'cool', label: 'Cool' },
        { value: 'ink', label: 'Ink' }]
        } />
      </TweakSection>
      <TweakSection title="Closing CTA">
        <TweakRadio label="Button"
        value={tweaks.ctaStyle}
        onChange={(v) => setTweak('ctaStyle', v)}
        options={[
        { value: 'ink', label: 'Ink' },
        { value: 'voice', label: 'Ultramarine' }]
        } />
      </TweakSection>
    </TweaksPanel>);

};

// ---------- APP ----------
const App = () => {
  const [open, setOpen] = useState(false);
  const [tweaks, setTweaks] = useState(window.__VL_TWEAKS || TWEAK_DEFAULTS);

  useEffect(() => {
    const handler = () => setTweaks({ ...window.__VL_TWEAKS });
    window.addEventListener('vl-tweaks-changed', handler);
    return () => window.removeEventListener('vl-tweaks-changed', handler);
  }, []);

  // Esc to close dialog
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  return (
    <React.Fragment>
      <Nav onBookClick={() => setOpen(true)} />
      <Hero onBookClick={() => setOpen(true)}
      layout={tweaks.heroLayout} showWaveform={tweaks.showWaveform} />
      <Problem />
      <Stakes />
      <Sprint />
      <Testimonials />
      <WhoFor />
      <About portraitTone={tweaks.aboutPortraitTone} />
      <ClosingCTA onBookClick={() => setOpen(true)} ctaStyle={tweaks.ctaStyle} />
      <DiscoveryDialog open={open} onClose={() => setOpen(false)} />
      <Tweaks />
    </React.Fragment>);

};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);