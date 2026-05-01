'use client'
import { useState, useEffect } from 'react'

const CALENDAR_URL = 'https://calendar.app.google/5smbPsResWJiQHGw8'

// ---------- shared atoms ----------

const Label = ({ children, color = 'green', style }) => (
  <div style={{
    fontFamily: 'var(--vl-font-sans)', fontSize: 12, fontWeight: 500,
    letterSpacing: '0.16em', textTransform: 'uppercase',
    color: color === 'green' ? 'var(--vl-voice-green)' : color === 'mute' ? 'var(--vl-graphite)' : 'var(--vl-ink)',
    ...style
  }}>{children}</div>
)

const PrimaryCTA = ({ children, href = CALENDAR_URL, large = false, style, variant = 'ink' }) => {
  const [hover, setHover] = useState(false)
  const isInk = variant === 'ink'
  const bg = isInk
    ? (hover ? '#1a2320' : 'var(--vl-ink)')
    : (hover ? 'var(--vl-voice-green-deep)' : 'var(--vl-voice-green)')
  const sharedStyle = {
    fontFamily: 'var(--vl-font-sans)',
    fontSize: large ? 16 : 15, fontWeight: 500,
    background: bg, color: 'var(--vl-paper)',
    border: 0, borderRadius: 999,
    padding: large ? '18px 32px' : '14px 24px',
    cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 10,
    textDecoration: 'none',
    transition: 'background 180ms var(--vl-ease)',
    ...style
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={sharedStyle}>
      {children}
      <span aria-hidden style={{
        display: 'inline-block',
        transition: 'transform 220ms var(--vl-ease)',
        transform: hover ? 'translateX(3px)' : 'translateX(0)'
      }}>→</span>
    </a>
  )
}

const Wordmark = ({ size = 13 }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span style={{ position: 'relative', width: 24, height: 24, display: 'inline-block' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '1px solid rgba(31,37,32,0.16)' }} />
      <span style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 7, height: 7, borderRadius: 999,
        background: 'var(--vl-voice-green)'
      }} />
    </span>
    <span style={{
      fontFamily: 'var(--vl-font-sans)', fontWeight: 600, fontSize: size,
      letterSpacing: '0.22em', color: 'var(--vl-ink)',
      display: 'inline-flex', alignItems: 'center', gap: 8
    }}>
      <span>THE</span>
      <span style={{ color: 'var(--vl-voice-green)', fontWeight: 400 }}>·</span>
      <span>VOICE</span>
      <span style={{ color: 'var(--vl-voice-green)', fontWeight: 400 }}>·</span>
      <span>LAB</span>
    </span>
  </span>
)

// ---------- NAV ----------

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
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
          {[['The problem', '#problem'], ['The sprint', '#sprint'], ['About', '#about']].map(([label, href]) => (
            <a key={href} href={href} style={{
              fontFamily: 'var(--vl-font-sans)', fontSize: 14, color: 'var(--vl-ink)',
              textDecoration: 'none', fontWeight: 400
            }}>{label}</a>
          ))}
          <PrimaryCTA style={{ padding: '10px 18px', fontSize: 13 }}>
            Book a discovery call
          </PrimaryCTA>
        </div>
      </div>
    </nav>
  )
}

// ---------- TYPEWRITER ----------

const Typewriter = ({ words, color = 'var(--vl-voice-green)' }) => {
  const [wIdx, setWIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[wIdx]
    let t
    if (phase === 'typing') {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 75)
      } else {
        t = setTimeout(() => setPhase('holding'), 1500)
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('deleting'), 1200)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), 38)
      } else {
        setWIdx((wIdx + 1) % words.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, wIdx, words])

  const longest = words.reduce((a, b) => b.length > a.length ? b : a, '')

  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
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
    </span>
  )
}

// ---------- HERO ----------

const Hero = () => {
  const rotatingWords = ['understand.', 'say yes.', 'move.']
  return (
    <section id="top" style={{
      padding: '96px var(--vl-margin-x-desktop) 88px',
      maxWidth: 'var(--vl-content-max)', margin: '0 auto',
      position: 'relative'
    }}>
      <Label style={{ marginBottom: 40 }}>Voice coaching for founders and executives</Label>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 80, alignItems: 'end' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
            fontSize: 'clamp(48px, 6.6vw, 96px)', lineHeight: 1.02, letterSpacing: '-0.012em',
            margin: 0, maxWidth: '14ch', textWrap: 'balance', color: 'var(--vl-ink)'
          }}>
            Speak so they<br /><Typewriter words={rotatingWords} />
          </h1>
        </div>
        <div style={{ paddingBottom: 8, borderLeft: '1px solid var(--vl-hairline)', paddingLeft: 32 }}>
          <div style={{
            fontFamily: 'var(--vl-font-sans)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-graphite)',
            marginBottom: 20
          }}>WHAT WE KNOW</div>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontSize: 'clamp(22px, 2.1vw, 28px)',
            lineHeight: 1.25, letterSpacing: '-0.005em',
            color: 'var(--vl-ink)', margin: 0, maxWidth: '34ch'
          }}>
            You're building something <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>worth leading</em>. The question is whether the room <em style={{ fontStyle: 'italic' }}>knows it yet</em>.
          </p>
          <p style={{
            fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.6,
            color: 'var(--vl-graphite)', margin: '24px 0 0', maxWidth: '40ch'
          }}>
            The Voice Lab is for founders who are brilliant at what they do — and need to be just as effective at communicating it.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 96 }}>
        <img src="/assets/waveform-breath.svg" alt="" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ---------- PROBLEM ----------

const Problem = () => (
  <section id="problem" style={{ padding: '128px var(--vl-margin-x-desktop)' }}>
    <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
      <Label style={{ marginBottom: 32 }}>Why you're here</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 96, alignItems: 'start' }}>
        <h2 style={{
          fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
          fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.012em',
          margin: 0, maxWidth: '18ch', textWrap: 'balance', color: 'var(--vl-ink)'
        }}>
          You know what you want to say, but the room hears something else.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 6 }}>
          <p style={{
            fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
            fontSize: 'clamp(32px, 3vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.01em',
            color: 'var(--vl-ink)', margin: 0, maxWidth: '14ch'
          }}>
            You're <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>losing the room</em>.
          </p>

          <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Board', 'The board meeting where you could feel them pull back.'],
              ['1:1', 'The difficult conversation with your co-founder where the message landed wrong.'],
              ['Clients', 'The pitch or client conversation where the room nodded politely and never came back.'],
              ['All-hands', 'The all-hands where you needed the team to move and instead they stayed in place.'],
            ].map(([tag, body], i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 18, alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--vl-voice-green)'
                }}>{tag}</span>
                <span style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 17, lineHeight: 1.5, color: 'var(--vl-ink)' }}>
                  {body}
                </span>
              </li>
            ))}
          </ul>

          <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--vl-ink)', margin: '8px 0 0', maxWidth: '52ch' }}>
            When the stakes go up, something in your delivery doesn't land. Maybe your voice <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>goes flat</span>. Maybe you <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>rush the point</span> that needed to land. Maybe colleagues read your delivery as uncertain when you're actually confident — or as disengaged when you're fully prepared.
          </p>

          <div style={{ marginTop: 4, paddingTop: 24, borderTop: '1px solid var(--vl-hairline)' }}>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--vl-graphite)', marginBottom: 10
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
    </div>
  </section>
)

// ---------- SPRINT ICONS ----------

const SprintIcon = ({ kind }) => {
  const stroke = 'var(--vl-voice-green)'
  const common = { width: 36, height: 36, fill: 'none', stroke, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (kind === 'authority') return (
    <svg viewBox="0 0 40 40" {...common}>
      <path d="M20 5 v22" /><path d="M14 27 h12" /><path d="M16 27 l4 8 l4 -8" />
      <circle cx="20" cy="5" r="1.5" fill={stroke} />
    </svg>
  )
  if (kind === 'warmth') return (
    <svg viewBox="0 0 40 40" {...common}>
      <path d="M8 26 a10 10 0 0 1 10 -10" /><path d="M32 14 a10 10 0 0 0 -10 10" />
      <circle cx="18" cy="16" r="1.5" fill={stroke} /><circle cx="22" cy="24" r="1.5" fill={stroke} />
    </svg>
  )
  if (kind === 'clarity') return (
    <svg viewBox="0 0 40 40" {...common}>
      <path d="M5 20 q3 -8 6 0 t6 0 t6 0 t6 0" />
      <circle cx="35" cy="20" r="2" fill={stroke} />
    </svg>
  )
  if (kind === 'presence') return (
    <svg viewBox="0 0 40 40" {...common}>
      <circle cx="20" cy="20" r="3" fill={stroke} />
      <circle cx="20" cy="20" r="8" />
      <circle cx="20" cy="20" r="14" opacity="0.5" />
    </svg>
  )
  return null
}

// ---------- SPRINT ----------

const Sprint = () => {
  const cards = [
    {
      icon: 'authority', title: 'Authority and command',
      pull: "Stop sounding tentative when you're actually certain.",
      body: "You'll develop the weight and steadiness that makes people stop talking over you — so your point lands the first time, not the third."
    },
    {
      icon: 'warmth', title: 'Warmth and trust',
      pull: 'Move past flat delivery that reads as cold or checked-out.',
      body: "You'll find the register that makes colleagues feel addressed, not lectured — so people want to be in the room with you."
    },
    {
      icon: 'clarity', title: 'Clarity and impact',
      pull: 'Get out of your own way when it matters most.',
      body: "You'll learn to land your point cleanly under pressure — so what you say is what people hear."
    },
    {
      icon: 'presence', title: 'Presence and connection',
      pull: 'Hold the room without raising your voice.',
      body: "You'll practice the small shifts that make people feel addressed — so you're heard as engaged, not detached."
    },
  ]

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

        <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {cards.map((r, i) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}

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
    },
  ]

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
          {quotes.map((q, i) => (
            <figure key={i} style={{
              margin: 0, padding: '36px 36px 28px',
              background: 'var(--vl-paper)',
              border: '1px solid var(--vl-hairline)',
              borderRadius: 6,
              display: 'flex', flexDirection: 'column', gap: 22,
              position: 'relative'
            }}>
              <span aria-hidden style={{
                position: 'absolute', top: 18, right: 28,
                fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic',
                fontSize: 96, lineHeight: 0.9, color: 'var(--vl-voice-green)',
                opacity: 0.18, pointerEvents: 'none'
              }}>"</span>

              <p style={{
                fontFamily: 'var(--vl-font-serif)', fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(24px, 2.2vw, 30px)', lineHeight: 1.18, letterSpacing: '-0.005em',
                color: 'var(--vl-ink)', margin: 0, maxWidth: '20ch'
              }}>
                {q.pull}
              </p>

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
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- WHO THIS IS FOR ----------

const WhoFor = () => {
  const items = [
    {
      k: "Serious about what's next",
      v: "You have something real on the horizon — a board presentation, a fundraise, a hard conversation, a team you need to move — and you're not willing to walk into it sounding the way you do now."
    },
    {
      k: 'Committed to the work',
      v: "You know the kind of change you want doesn't happen in thirty-minute sessions alone. You're ready to give it a full hour a day for ten days — sessions, exercises, recordings, reps — because you understand that's what it takes."
    },
    {
      k: 'Open to feedback',
      v: "You want to know what's actually happening when you speak — the habits, the patterns, the moments people check out. You'd rather hear something hard once than be politely managed for years."
    },
    {
      k: 'Up for trying new things',
      v: "You're open to approaches that feel unfamiliar at first — exercises, drills, ways of using your voice you haven't used before. You lean into the experiment instead of pre-judging it."
    },
  ]

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
              {items.map((it, i) => (
                <li key={i} style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20,
                  padding: '22px 0',
                  borderTop: i === 0 ? '1px solid var(--vl-hairline)' : 'none',
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- ABOUT ----------

const About = () => {
  const credentials = [
    'Co-founder + CEO',
    'Head of Community',
    'Classically trained opera singer',
    'Currently performing a one-woman show',
  ]

  return (
    <section id="about" style={{ padding: '72px var(--vl-margin-x-desktop) 128px', background: 'var(--vl-bone)', borderTop: '1px solid var(--vl-hairline)' }}>
      <div style={{ maxWidth: 'var(--vl-content-max)', margin: '0 auto' }}>
        <Label style={{ marginBottom: 32 }}>About</Label>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 64, alignItems: 'start'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              width: '100%', aspectRatio: '4 / 5',
              border: '1px solid var(--vl-hairline)', borderRadius: 6,
              position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--vl-shadow-card)'
            }}>
              <img
                src="/assets/genevieve-portrait.jpg"
                alt="Genevieve Kim"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', right: 12, top: 12, width: 5, height: 5, borderRadius: 999,
                background: 'var(--vl-voice-green)'
              }} />
            </div>
            <div style={{
              fontFamily: 'var(--vl-font-mono)', fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--vl-graphite)',
              display: 'flex', justifyContent: 'space-between'
            }}>
              <span>Founder</span>
              <span style={{ color: 'var(--vl-voice-green)' }}>The Voice Lab</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 4 }}>
            <h2 style={{
              fontFamily: 'var(--vl-font-serif)', fontWeight: 400,
              fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.04, letterSpacing: '-0.014em',
              margin: 0, color: 'var(--vl-ink)'
            }}>
              Genevieve Kim
            </h2>

            <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 18, lineHeight: 1.6, color: 'var(--vl-ink)', margin: 0, maxWidth: '58ch' }}>
              Genevieve Kim spent her career in tech boardrooms — as a{' '}
              <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>co-founder</span>,{' '}
              <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>consultant</span>, and{' '}
              <span style={{ color: 'var(--vl-voice-green)', fontWeight: 500 }}>Head of Community at a $2B unicorn</span>{' '}
              — before performing on stages in her one-woman show. She holds a degree in vocal performance and trained as an opera singer.
            </p>

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
                The Voice Lab is what happens when you combine{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>boardroom pressure</em>{' '}
                with{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--vl-voice-green)' }}>classical vocal training</em>.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20, paddingTop: 20, borderTop: '1px solid var(--vl-hairline)' }}>
              <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-voice-green)', paddingTop: 4 }}>What I believe</div>
              <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--vl-ink)', margin: 0, maxWidth: '56ch' }}>
                The voice isn't something you <em style={{ fontStyle: 'italic' }}>"have."</em> It's something you <span style={{ fontWeight: 500, color: 'var(--vl-voice-green)' }}>use</span>. And like anything you use under pressure — judgment, strategy, composure — it can be trained. The leaders who sound certain aren't more confident than you. They just have access to a wider range. <span style={{ fontWeight: 500 }}>And range isn't talent. It's training.</span>
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20 }}>
              <div style={{ fontFamily: 'var(--vl-font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vl-graphite)', paddingTop: 4 }}>Who I work with</div>
              <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--vl-ink)', margin: 0, maxWidth: '56ch' }}>
                Founders, executives, and technical leaders. People for whom communication isn't a soft skill — it's the thing that determines whether the room follows.
              </p>
            </div>

            <div style={{ marginTop: 8, paddingTop: 24, borderTop: '1px solid var(--vl-hairline)', display: 'flex', flexWrap: 'wrap', gap: '10px 12px' }}>
              {credentials.map((c, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--vl-font-sans)', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vl-ink)',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px',
                  background: 'var(--vl-bone)',
                  border: '1px solid var(--vl-hairline)', borderRadius: 999
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--vl-voice-green)', flexShrink: 0 }} />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- CLOSING CTA / FOOTER ----------

const ClosingCTA = () => (
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
          <p style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 19, lineHeight: 1.55, color: 'var(--vl-ink)', margin: 0, maxWidth: '54ch' }}>
            A 30-minute discovery call — not a pitch. We'll identify what's showing up in your communication, whether the sprint format fits what you're facing, and what the first session would look like.
          </p>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <PrimaryCTA large>Book a discovery call</PrimaryCTA>
            <span style={{ fontFamily: 'var(--vl-font-sans)', fontSize: 13, color: 'var(--vl-graphite)' }}>
              30 minutes · Remote via Google Meet
            </span>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 32, opacity: 0.5 }}>
        <img src="/assets/waveform-breath.svg" alt="" style={{ width: '100%', display: 'block' }} />
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
  </section>
)

// ---------- PAGE ----------

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Sprint />
      <Testimonials />
      <WhoFor />
      <About />
      <ClosingCTA />
    </>
  )
}
