# Handoff: The Voice Lab — Marketing Landing Page

## Overview
A long-scroll marketing landing page for **The Voice Lab**, a voice-coaching service for founders, executives, and technical leaders. The page positions a 10-day "Voice Sprint" intensive, builds credibility through narrative + testimonials + founder bio, and converts to a discovery call via a sticky CTA and modal dialog.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working React prototype showing intended look, copy, and behavior. They are **not** production code to copy directly. The task is to **recreate this design in your target codebase's existing environment** (Next.js, Astro, Remix, plain Vite, marketing-site CMS, etc.) using its established patterns, component primitives, and asset pipeline. If no environment exists yet, choose the most appropriate framework for a content-heavy marketing site (Next.js or Astro recommended) and implement the design there.

The prototype uses inline styles + a single tokens stylesheet so it can run standalone in a browser. In a real codebase you'll likely want to:
- Move the design tokens into your existing theme system (CSS variables, Tailwind config, design-tokens package, etc.)
- Split the monolithic `app.jsx` into per-section components
- Replace inline styles with whatever your codebase uses (CSS Modules, Tailwind, styled-components, vanilla-extract…)
- Hook the discovery-call form to your real backend / scheduling tool (Calendly, Cal.com, custom)

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, layout, hover states, and animations are final. Recreate pixel-perfectly. Section copy is also final unless the marketing team revises it.

---

## Page Structure (top → bottom)

| # | Section id | Component | Purpose |
|---|---|---|---|
| 1 | — | `Nav` | Sticky top nav: wordmark + section anchors + CTA |
| 2 | `#top` | `Hero` | Headline with rotating typewriter word + animated voiceprint console |
| 3 | `#problem` | `Problem` | "Why you're here" — Said-vs-Heard divergence chart + scenario cards + diagnosis |
| 4 | `#stakes` | `Stakes` | Dark inverted section: cost of miscommunication |
| 5 | `#sprint` | `Sprint` | "The Voice Sprint" — 4 pillar cards + audio comparison player |
| 6 | `#testimonials` | `Testimonials` | 2-up pull-quote grid |
| 7 | `#who` | `WhoFor` | "Who the voice sprint is for" — qualifier list |
| 8 | `#about` | `About` | Founder bio with portrait |
| 9 | — | `ClosingCTA` + footer | Final CTA with discovery-call modal |

---

## Design Tokens

All tokens live in `styles/colors_and_type.css` as CSS custom properties. Port these into your theme system.

### Colors
| Token | Hex | Use |
|---|---|---|
| `--vl-paper` | `#F6F2EA` | Default page surface (warm cream) |
| `--vl-bone` | `#FAFAF7` | Card / inset surface (cooler off-white) |
| `--vl-ink` | `#0E1411` | Primary text, dark sections |
| `--vl-voice-green` | `#0033FF` | **Brand accent** — electric ultramarine. CTAs, links, pull-quote borders, voiceprint flat bar. (Despite the name, it is blue.) |
| `--vl-voice-green-deep` | `#001A99` | Pressed / active accent |
| `--vl-voice-green-wash` | `#DCE4FF` | Quiet accent panel tint, ::selection |
| `--vl-graphite` | `#5A5F5A` | Secondary body text, italic challenge lines |
| `--vl-mute` | `#A8A89F` | Tertiary, dividers, placeholders |
| `--vl-hairline` | `rgba(31,37,32,0.08)` | The one allowed border tone |
| `--vl-hairline-strong` | `rgba(31,37,32,0.16)` | Hover/active border |

### Typography
- **Display / serif** — `Instrument Serif` (Google Fonts), italic available. Used for H1/H2/H3, pull quotes, italic emphasis.
- **Sans / UI** — `Geist` weights 300/400/500/600/700.
- **Mono / numerals** — `JetBrains Mono` weights 400/500. Tabular figures via `font-feature-settings: 'tnum' 1, 'lnum' 1`.

Type scale (rem; 1rem = 16px):
| Token | Size | Use |
|---|---|---|
| `--vl-fs-display-xl` | 5.5rem (88px) | Hero H1 |
| `--vl-fs-display-l` | 3.75rem (60px) | Section openers |
| `--vl-fs-display-m` | 2.5rem (40px) | Pull quotes, sub-openers |
| `--vl-fs-display-s` | 1.75rem (28px) | Card titles |
| `--vl-fs-body-l` | 1.25rem (20px) | Lead paragraphs |
| `--vl-fs-body` | 1.0625rem (17px) | Default body |
| `--vl-fs-body-s` | 0.9375rem (15px) | UI, captions |
| `--vl-fs-label` | 0.75rem (12px) | Tracked uppercase labels |
| `--vl-fs-mono` | 0.875rem (14px) | Numerals, codes |

Line heights: `--vl-lh-display: 1.05`, `--vl-lh-display-tight: 1.02`, `--vl-lh-heading: 1.15`, `--vl-lh-body: 1.6`, `--vl-lh-body-tight: 1.4`. Letter spacing: display `-0.012em`, label `0.16em` uppercase tracking.

### Spacing (4px base)
`--vl-s-1` 4 → `--vl-s-2` 8 → `--vl-s-3` 12 → `--vl-s-4` 16 → `--vl-s-5` 24 → `--vl-s-6` 32 → `--vl-s-7` 48 → `--vl-s-8` 64 → `--vl-s-9` 96 → `--vl-s-10` 128 (section rhythm) → `--vl-s-11` 192.

### Radii / borders / shadows
- `--vl-r-input: 2px`, `--vl-r-card: 6px`, `--vl-r-pill: 999px`
- `--vl-bw-hairline: 1px`, `--vl-bw-active: 1.5px`, `--vl-bw-quote: 3px`
- `--vl-shadow-card: 0 1px 2px rgba(14,20,17,.04), 0 8px 24px rgba(14,20,17,.06)`
- `--vl-shadow-floating: 0 12px 40px rgba(14,20,17,.08)`

### Motion
- `--vl-ease: cubic-bezier(0.2, 0.6, 0.2, 1)`
- Durations: `--vl-dur-fast: 180ms`, `--vl-dur: 400ms`, `--vl-dur-slow: 700ms`, `--vl-dur-breath: 6s` (signature waveform cycle)
- Honor `prefers-reduced-motion: reduce` — collapse all entry animations.

### Layout
- `--vl-content-max: 1280px` — page content cap
- `--vl-prose-max: 65ch` — body paragraph cap
- `--vl-margin-x-desktop: 5rem` (80px) — section gutter on desktop. Tightens to 32px ≤900px and 20px ≤640px.

---

## Sections in Detail

### 1. Nav
- Sticky top, transparent until scrolled (>8px), then `rgba(246,242,234,0.78)` + `backdrop-filter: blur(12px) saturate(140%)` + 1px hairline bottom border.
- Left: `Wordmark` — 24×24 ringed dot (1px hairline ring, 7px voice-green center dot) + tracked uppercase "THE · VOICE · LAB" with green middle dots.
- Right: anchor links to `#problem`, `#sprint`, `#about` (14px, ink) + primary CTA button "Book a discovery call" (10px 18px padding, 13px font).
- On phone (≤640px): anchor links hide, only wordmark + compact CTA remain.

### 2. Hero (`#top`)
Asymmetric two-column layout, `1.05fr 0.95fr`, gap 64px.

**Left column** — vertical flex, justify-between:
- Tracked uppercase label: `Voice coaching for founders and executives` (green).
- H1: serif `clamp(52px, 7.2vw, 104px)`, line-height 0.98, max 14ch. Text: "Speak so they" + line break + `Typewriter` component.
- `Typewriter` — italic green, cycles through `['understand.', 'say yes.', 'move.']`. Type 75ms/char, hold 1500ms, delete 38ms/char, hold 1200ms between. Reserves layout space using the longest word as an invisible spacer. Blinking caret bar (1s steps).
- Sub-block (max 40ch): serif clamp(22px, 2.1vw, 28px) — "You're building something *worth leading*. The question is whether the room *knows it yet*." + 16px graphite paragraph below.

**Right column** — the "Console" card: bone background, 1px hairline, 6px radius, 380px min-height, 20px 24px 24px padding.
- Top bar: blinking record dot (vl-rec-blink animation 1.6s steps) + "● Live · Session 04 · Take 02" + right-aligned "Voiceprint · 48 kHz". Mono 10px tracked uppercase.
- Center: `LiveVoiceprint` — 64-bar SVG spectrogram. Each bar pre-computed with deterministic base height (sin envelope, louder middle), animation duration 0.9–2.2s, negative animation-delay for phase offset. Bars 36–44 are "stuck flat" (green, `vl-bar-flat` animation) — that is the moment of disconnection. Vertical green dashed line marks the flat region center. A 1px ultramarine scan line sweeps left-to-right on a 7s loop.
- Annotation row below voiceprint: 3-col grid `1fr auto 1fr`, mono 10px — "00:00 — opens" / green "↑ room left here" / right "03:42 — close".
- Bottom bar: 2-col grid divided by hairline. Left: "You meant" (mono caption) + "Confident." (15px medium). Right: "You sounded" (mono caption) + italic green "Hedging."

### 3. Problem (`#problem`) — "Why you're here"
- Section padding 128px vertical.
- Eyebrow label: "Why you're here" (green tracked uppercase).
- Headline + subhead in 2-col `1.1fr 0.9fr` grid, gap 96px, align-end. H2 serif `clamp(36px, 4.4vw, 60px)`, max 18ch.
- `SaidHeardChart` — 1200×220 SVG. Two polylines: solid ink "Said" (intended emphasis, gentle sine arc) vs dashed green "Heard" (drifts down as the room loses interest, polynomial drift × 70 + small jitter). Grey gridlines at 25/50/75%. Polygon fill between lines at 6% opacity. Vertical green dashed marker at index 38 ("Room drifts"). Mono labels: "Minute 00:00 · You start speaking" left, "Minute 04:00 · Room has decided" right.
- 4-up scenario card grid (`repeat(4, 1fr)`, gap 16). Each card has tag (Board / 1:1 / **Clients** / All-hands), setup, "You meant" / "You sounded" mini-pair, and "Cost" line. Stacks to 2-up at ≤900px and 1-up at ≤640px.
- Diagnosis panel below — 2-col `1.1fr 0.9fr`. Left: small caps eyebrow "The diagnosis" + italic serif clamp(20px, 1.8vw, 24px) line. Right: supporting body.

### 4. Stakes (`#stakes`)
Inverted section: background `rgb(19,21,20)` (near-black with green undertone), `--vl-paper` foreground. Same content rhythm; uses voice-green for accents instead of ink. Includes a 3-up stat strip (`repeat(3, 1fr)`).

### 5. Sprint (`#sprint`) — "Where it starts"
- Bone background, hairline borders top + bottom.
- Headline + intro in `1.1fr 0.9fr` grid. H2 serif `clamp(40px, 5.2vw, 72px)`, max 14ch. Right side: serif lead + a "How / So" 2-row grid with mono eyebrows ("HOW" graphite, "SO" green).
- 4-up pillar cards (`repeat(4, 1fr)`, gap 24): Authority / Warmth / Clarity / Presence. Each card has icon, title (28px serif), green pull line, body. Stacks 2-up at ≤900px, 1-up at ≤640px.
- Audio-comparison player (full-row figure): 56×56 round button with 1.5px voice-green border, plays/pauses a synthetic "before/after" comparison. Top meta bar: "05 · Hear the difference — same speaker, same words" left, time mono right, "Restart" link.

### 6. Testimonials (`#testimonials`)
- Bone background, hairline borders top + bottom.
- 2-up grid `1fr 1fr`, gap 32. Each `<figure>`: italic serif pull + body + attribution (initials + role). Stacks at ≤640px.

### 7. WhoFor (`#who`) — "Who the voice sprint is for"
- 2-col `1fr 1fr`, gap 96.
- Left: H2 serif `clamp(32px, 3.6vw, 48px)`, max 24ch. "You're a *founder, executive,* or *technical leader* who communicates constantly — and something isn't landing."
- Right: list of qualifier rows. Each row is a 48px+1fr grid with a step-numeral and a body block ("Serious about what's next" / "Committed to the work" etc.). Hairline top on first, hairline bottom on all.

### 8. About (`#about`)
- **Bone background** (`var(--vl-bone)` — lighter than paper for contrast). Hairline top border. Padding `72px var(--vl-margin-x-desktop) 128px`.
- 2-col `260px 1fr`, gap 64.
- Left: 4:5 portrait of Genevieve Kim (`assets/genevieve-portrait.jpg`, object-fit: cover), 1px hairline border, 6px radius, card shadow, 5×5 voice-green dot top-right. Caption strip below: mono 10px tracked uppercase, "Founder" / "The Voice Lab" (green).
- Right: H2 "Genevieve Kim" serif `clamp(36px, 4.2vw, 56px)`. Bio paragraph (18px sans) with green inline emphasis. Pull-quote block with 3px voice-green left border. Two `auto 1fr` rows: "What I believe" (green eyebrow), "Who I work with" (graphite eyebrow). Credentials chip row at bottom — pill chips, bone bg, hairline border, 5px green dot inside each.

### 9. Closing CTA + Footer
- Paper background. 2-col `0.9fr 1.1fr` grid, gap 96.
- Left: "Start here" label + H2 serif clamp(40px, 5vw, 68px) "Start with a conversation."
- Right: 19px sans paragraph + Primary CTA (large variant, ink or green by tweak) + secondary text link. Opens `DiscoveryDialog` modal.
- `DiscoveryDialog`: fixed overlay `rgba(14,20,17,0.42)`, centered card max 520px, paper bg, 6px radius, hairline border, floating shadow. Animates in with `vl-rise` 320ms. ESC / overlay click / × button closes.
- Footer: hairline top, 32px vertical padding. Wordmark left, "A communication sprint for leaders" right. Stacks vertically at ≤640px.

---

## Components & Atoms

| Name | Description |
|---|---|
| `Label` | Tracked uppercase 12px label. Variants: `green` (default), `mute`, `ink`. |
| `PrimaryCTA` | Pill button, ink or green variant. Hover darkens, arrow shifts 3px right on hover, 0.98 scale on mousedown. Large variant: 18px 32px padding, 16px font. |
| `Wordmark` | Ringed dot mark + "THE · VOICE · LAB" tracked uppercase with green middle dots. |
| `Nav` | Sticky, blurs on scroll. |
| `Typewriter` | Cycling typewriter with reserved-width spacer + blinking caret. |
| `LiveVoiceprint` | SVG spectrogram with deterministic per-bar animation, flat green region, scan line. |
| `SaidHeardChart` | Two-line divergence chart with shaded gap and divergence marker. |
| `DiscoveryDialog` | Overlay modal for discovery-call form. |

---

## Interactions & Behavior

- **Nav** — Sticky; toggles `scrolled` state on `window.scrollY > 8`. Anchor links scroll to sections (use native `scroll-behavior: smooth` on `:root` or a router-aware scroller).
- **Typewriter** — `useEffect` chain through `typing → holding → deleting → next-word`. Pause briefly on full word (1500ms) and on empty (next word).
- **Voiceprint** — Pure CSS animations driven by per-bar `animationDuration` and `animationDelay`. Scan line is a single absolutely-positioned 1px div with a 7s linear `vl-scan` animation.
- **Audio-comparison player** — `playing` boolean toggles button visual + scrubs a `progress` ref forward over `durMs` (synthetic playback — no real audio file in the prototype; wire to your audio asset later).
- **Discovery dialog** — `open` state in root component; opened by every "Book a discovery call" CTA, closed by overlay click / × / ESC. Form is currently visual only — wire to your scheduler / form backend.
- **Reduced motion** — All `--vl-dur-*` collapse to 0.01ms, `*` `animation-iteration-count: 1`. Honor `prefers-reduced-motion: reduce`.

## State Management

Single root `App` component holds:
- `open: boolean` — discovery dialog visibility
- `tweaks: object` — design knobs (heroLayout, showWaveform, aboutPortraitTone, ctaStyle). The Tweaks panel is a **prototype-only** authoring UI; **do not ship it**. Pick the chosen final values and bake them in.

Each animated subcomponent has its own local state (`Typewriter` text/phase, `Nav` scrolled, `Hero` console, audio player progress).

## Responsive Behavior

Defined in `styles/responsive.css` via attribute-selector overrides on inline styles. In your real codebase, replace this with proper responsive component code — the patterns are:

- **≥901px (desktop)**: full layout as designed, 80px gutters, 1280px max content width.
- **≤900px (tablet)**: gutters → 32px. All 2-col grids stack to 1-col with 40px gap. 4-up card grids → 2-up. 3-up stat strips → 1-up.
- **≤640px (phone)**: gutters → 20px. Base font 15px. Section padding 128px → 64px. Hero H1 caps at `clamp(40px, 11vw, 56px)`. Section H2s cap at `clamp(30px, 8vw, 44px)`. Nav anchor links hide, only wordmark + compact CTA remain. About portrait centers and caps at 280px. All `ch`-based maxWidths release to 100%.
- **≤380px**: nav CTA also hides; hero H1 fixed 36px.

## Assets

| Path | Use |
|---|---|
| `assets/genevieve-portrait.jpg` | Founder portrait, About section. User-supplied photo. |
| `assets/favicon.svg` | Browser tab icon. |
| `assets/logo-wordmark.svg` | Standalone wordmark (currently rendered inline as `Wordmark` component; SVG is a backup). |
| `assets/mark-dot.svg` | Standalone dot mark. |
| `assets/waveform-breath.svg` | Static decorative waveform (used in stacked hero fallback). |
| `assets/waveform-static.svg` | Alt static waveform. |

Fonts loaded from Google Fonts in `styles/colors_and_type.css`: Instrument Serif (with italic), Geist (300–700), JetBrains Mono (400, 500). In a production build, self-host these for performance and offline reliability.

## Files in this bundle

- `index.html` — page shell, font/style imports, React + Babel script tags, `<div id="root">`.
- `app.jsx` — single-file React app (~1900 lines). All sections + components. **Read this top-to-bottom for the source of truth on component structure, copy, and inline styling.**
- `tweaks-panel.jsx` — design-knob authoring UI. Prototype-only; do not ship.
- `styles/colors_and_type.css` — design tokens (CSS custom properties) + base element styles.
- `styles/responsive.css` — mobile/tablet overrides via inline-style attribute selectors. Replace with native responsive code in the real implementation.
- `assets/` — images and SVGs referenced above.

## Implementation Checklist

- [ ] Port design tokens into your theme system (Tailwind config, CSS vars, design-tokens package).
- [ ] Self-host the three Google Fonts (Instrument Serif, Geist, JetBrains Mono).
- [ ] Set up the page shell with `--vl-paper` body background.
- [ ] Build atoms first: `Label`, `PrimaryCTA`, `Wordmark`.
- [ ] Build sections in order. The voiceprint and Said-vs-Heard chart can ship as React components rendering inline SVG — copy the math directly from `app.jsx`.
- [ ] Wire the discovery-call modal to your real scheduling backend (Calendly embed, Cal.com, custom form).
- [ ] Wire the audio comparison player to a real audio file (or skip the player if no audio is ready).
- [ ] Implement the responsive breakpoints natively (don't ship the attribute-selector override file).
- [ ] Strip the Tweaks panel and its `tweaks` state.
- [ ] Test `prefers-reduced-motion: reduce` — voiceprint, typewriter, scan line, and entry animations should freeze/skip.
- [ ] Test keyboard nav: focus rings (`outline: 2px solid var(--vl-voice-green); outline-offset: 3px;`), ESC closes dialog, anchor links work.
- [ ] Lighthouse / a11y pass: alt text on the portrait image (already set), aria labels on icon buttons, semantic landmarks (`<nav>`, `<main>`, `<footer>`).

