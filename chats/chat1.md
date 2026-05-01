# Voice Lab Leadership

_Started 2026-04-29 11:13 UTC_

---

## User

Create a clean, simple landing page with the following: SECTION 1 — HERO
The Voice Lab for Leaders
I help leaders close the gap between how they think and how they're heard — in the meetings, conversations, and moments where it matters most.
[Book a discovery call →]

SECTION 2 — THE PROBLEM
You know what you want to say. The room hears something else.
Maybe your voice goes flat when the stakes go up. Maybe you rush through the point that needed to land. Maybe colleagues read your delivery as uncertain when you're actually confident — or as disengaged when you're fully prepared.
These aren't knowledge gaps. They're patterns — and most leaders don't know they're running them.

SECTION 3 — THE SPRINT
Ten days. Not ten months.
Most communication coaching is open-ended: monthly sessions, vague timelines, slow progress you can't quite measure. This is a sprint — ten consecutive sessions, thirty minutes a day, with real-time feedback and daily reps. You'll hear the difference inside the first week. Your colleagues will hear it inside two.

SECTION 4 — ABOUT
[Photo]
Genevieve Kim spent fifteen years in tech boardrooms and management consulting before she started performing a one-woman show. The Voice Lab is what she learned in between.
She's been a co-founder, Head of Community at Invisible Technologies, and a trained vocal performer. She built The Voice Lab because the leaders she worked alongside were sharp, capable, and consistently underselling themselves the moment they opened their mouths.

SECTION 5 — CTA
Start with a conversation.
A 20-minute discovery call — not a pitch. We'll identify what's showing up in your communication, whether the sprint format fits what you're facing, and what the first session would look like.
[Book a discovery call →]

## Assistant

I'll build this landing page using the Voice Lab design system. Let me first explore what's available, then plan the design.

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

Let me read the key components to understand the patterns:

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

I have enough context. Let me set up the project.

_[tool: copy_files]_

_[tool: snip]_

Now let me build the landing page. I'll create a single self-contained HTML file with the five sections, plus a Tweaks panel for some variation exploration.

_[tool: copy_starter_component]_

Now let me write the page. I'll keep all components in a single JSX file for simplicity since the page is short.

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

_[tool: snip]_

Built the Voice Lab for Leaders landing page following the design system — five sections (hero, problem, sprint, about, closing CTA), sticky nav with backdrop blur, and a discovery-call dialog wired to every CTA.

A few notes:
- **About portrait** is an abstract silhouette placeholder — swap in a real portrait when you have one (the placeholder can flex warm/cool/ink via Tweaks).
- **Tweaks panel** exposes hero layout (asymmetric/stacked), waveform on/off, portrait tone, and CTA button color (ink vs ultramarine) so you can A/B the moments most likely to need a second opinion.
- Copy is verbatim from your brief; no filler added.

## User

Apply a direct edit. In app.jsx (near line 13, <div>): change the text from "THE VOICE LAB — A COMMUNICATION SPRINT FOR LEADERS" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    Hero › Label
dom:      body › div#root › section#top › div[1/3]
text:     "THE VOICE LAB — A COMMUNICATION SPRINT FOR LEADERS"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-2
</mentioned-element>

## Assistant

_[tool: str_replace_edit]_

_[tool: snip]_

Done — updated the hero label.

## User

I want to change the hero to be animated. I want "Speak so they" to be static, and have the word that follows to have a type-in animation toggling between the three words "understand" "say yes" "move"

## Assistant

_[tool: snip]_

_[tool: read_file]_

I'll add a typewriter component that cycles through the three words. Let me build it and replace the H1.

_[tool: str_replace_edit]_

Now I need to add the caret keyframe animation to the CSS.

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

The hero now reads "Speak so they" with the typewriter cycling through "understand.", "say yes.", "move." in voice ultramarine, with a blinking caret. The longest-word spacer keeps the layout from reflowing as it types.

## User

Apply 4 direct edits:
1. In tweaks-panel.jsx (near line 338, <button>): change the text from "Stacked" to "Asymmetric".
<mentioned-element>
react:    TweaksPanel › TweakRow
dom:      body › div#root › div.twk-panel › div.twk-body › div.twk-row › div.twk-seg › button[3/3]
text:     "Stacked"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>
2. In tweaks-panel.jsx (near line 338, <button>): change the text from "Cool" to "Asymmetric".
<mentioned-element>
react:    TweaksPanel › TweakRow
dom:      body › div#root › div.twk-panel › div.twk-body › div.twk-row › div.twk-seg › button[3/4]
text:     "Cool"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-7
</mentioned-element>
3. In tweaks-panel.jsx (near line 338, <button>): change the text from "Ink" to "Asymmetric".
<mentioned-element>
react:    TweaksPanel › TweakRow
dom:      body › div#root › div.twk-panel › div.twk-body › div.twk-row › div.twk-seg › button[4/4]
text:     "Ink"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-8
</mentioned-element>
4. In tweaks-panel.jsx (near line 338, <button>): change the text from "Warm" to "Asymmetric".
<mentioned-element>
react:    TweaksPanel › TweakRow
dom:      body › div#root › div.twk-panel › div.twk-body › div.twk-row › div.twk-seg › button[2/4]
text:     "Warm"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-9
</mentioned-element>

## Assistant

These edits don't make sense — they would replace all the option labels in the Tweaks panel with "Asymmetric", breaking the radio groups. The labels live in `app.jsx` (where the radio options are defined), not `tweaks-panel.jsx` (which is the generic shell).

Could you clarify what you're trying to do? A few possibilities:
- You want to **rename the "Stacked" option to something else** (and only that one)?
- You want to **remove some of these tweaks** (Portrait tone, etc.)?
- You meant to change a single specific button label?

If I make all four changes literally, the Hero layout radio becomes "Asymmetric / Asymmetric" and the Portrait tone radio becomes "Asymmetric / Asymmetric / Asymmetric" — none of which would do anything useful.

## User

The animation is great. Can you italicize the words that are animated?  Also, I've changed the copy underneath the animation.

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

The rotating words now render italic (matches the serif italic challenge-line treatment from the design system).

## User

Remove the CTA in the Hero section. And I want you to get a little more creative with the "You're building something worth leading. The question is does the room know? The Voice Lab is for founders who are brilliant at what they do and need to be just as effective at communicating it." text from a design perspective. Me it "pop" with font stylization. Remove the CTA. And add testimonials (WHAT CLIENTS SAY
The shift shows up where it counts.

"I've done executive coaching, presentation training, even improv. Nothing changed the way I actually show up in a room until this. Three days in I had a board meeting. I walked out knowing something was different — not because I'd prepared more, but because I wasn't fighting myself the whole time."

M. R. · Co-founder & CEO, Series B SaaS

"My team noticed before I did. I thought I was just having a good week. Then two different people mentioned in the same day that something had shifted in how I was running our standups. I wasn't doing anything differently — consciously. That's the point."

S. K. · VP Engineering, growth-stage fintech)

## Assistant

I'll read the current Hero to make focused edits, then add testimonials.

_[tool: snip]_

_[tool: read_file]_

Now I'll redesign the hero copy with editorial typographic flair (mixing serif italic, tracked labels, and an em-dash rhythm) and add the testimonials section. Let me also remove the hero CTA per your request.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: read_file]_

Let me read the file in larger chunks to find the exact whitespace.

_[tool: grep]_

Let me rewrite the whole hero block precisely:

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: grep]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

Now I need to render the Testimonials component in the App. Let me find where Sprint is and add it after.

_[tool: grep]_

<;>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Hero CTA removed, the premise copy now pops with mixed serif italic + green emphasis on *worth leading* and italic *knows it yet*, and the new Testimonials section sits between Sprint and About — bone background, two pull-quote cards with the brand's 3px ultramarine left border.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

<ـ>

_[tool: snip]_

_[tool: fork_verifier_agent]_

<;>

_[tool: snip]_

## Assistant

Fixed the overlap — the premise paragraph now flows on a wider, single measure with a smaller serif size so the descriptor below clears cleanly.

## User

Apply a direct edit. In app.jsx (near line 13, <div>): change the text from "THE PROBLEM" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    Problem › Label
dom:      body › div#root › section#problem › div › div[1/2]
text:     "THE PROBLEM"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>

## Assistant

<;>

_[tool: snip]_

_[tool: str_replace_edit]_

<;>

_[tool: snip]_

Done — Problem section label updated.

## User

Apply 2 direct edits:
1. In app.jsx (near line 13, <div>): change the text from "THE PROBLEM" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    Problem › Label
dom:      body › div#root › section#problem › div › div[1/2]
text:     "THE PROBLEM"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>
2. In app.jsx (near line 13, <div>): change the text from "THE GAP" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    Problem › Label
dom:      body › div#root › section#problem › div › div[1/2]
text:     "THE GAP"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>

## Assistant

<;>

_[tool: snip]_

_[tool: grep]_

<;>

_[tool: snip]_

_[tool: grep]_

The Problem label is already "Voice coaching for founders and executives" from your previous edit. The two requested edits are conflicting/duplicate — both target the same Label element, and "The Gap" doesn't exist in the file. Did you mean to change a different section's label, or were you looking to revert this one to "The Problem"?

## User

Apply 2 direct edits:
1. In app.jsx (near line 245, <div>): change the text from "The board meeting where you could feel them pull back. The difficult conversation with your co-founder where the message landed wrong. The all-hands" to "The board meeting where you could feel them pull back. The difficult conversation with your co-founder where the message landed wrong. The all-hands where you needed the team to move and instead they stayed in place. \n\n\nIt's not the content or the answers. When the stakes go up, something in your delivery doesn't land.".
<mentioned-element>
react:    Problem
dom:      body › div#root › section#problem › div › div › div › p › div[3/5]
text:     "The board meeting where you could feel them pull back. The …"
children: text
selector: #problem div div:nth-child(3)
id:       cc-5
</mentioned-element>
2. In app.jsx (near line 245, <div>): change the text from "It's not the content or the answers. When the stakes go up, something in your delivery doesn't land." to "When the stakes go up, something in your delivery doesn't land.".
<mentioned-element>
react:    Problem
dom:      body › div#root › section#problem › div › div › div › p › div › div[2/2]
text:     "It's not the content or the answers. When the stakes go up,…"
children: text
selector: #problem div >:is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,span,a,em,strong,small,t…
id:       cc-7
</mentioned-element>

## Assistant

<;>

_[tool: snip]_

_[tool: read_file]_

<;>

_[tool: snip]_

The two edits already partially happened (I see the new content), but the structure is malformed — both new texts ended up inside one `<p>` instead of being properly split. Let me fix the Problem section cleanly.

_[tool: read_file]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: done]_

<;>

_[tool: snip]_

<;>

_[tool: snip]_

The Problem section now reads as three properly structured paragraphs: "You're losing the room." → the three-meeting list → the delivery diagnosis → the closing pattern line.

## User

I want to add two sections-- The Sprin, with some graphics of the four reasons laid out like the screenshot: Ten days. Daily reps. Real change.
Communication doesn't improve from watching a course or reading a framework. It changes through practice, real-time feedback, and repetition.
Daily repetition replaces old patterns before they return — creating stable, automatic improvements in clarity, composure, and presence. Patterns are corrected in the moment, not reviewed a week later, so improvements compound instead of regressing. And because your state, workload, and stressors shift from day to day, you learn to use your voice across multiple conditions — building range, adaptability, and real capacity. Short, focused, weekday-only sessions fit real life.  The second edit is to add a section on WHO THIS IS FOR: WHO THIS IS FOR
You're a founder, executive, or technical leader who communicates constantly — in one-on-ones, in board meetings, in all-hands — and something isn't landing the way it should.

You've probably done executive coaching or presentation training before. The frameworks made sense. But under pressure, they disappeared. The problem was never the content. It was the delivery — and no one has ever trained you at that level.

This is for you if:

You're facing real stakes in the next 30–90 days — a board presentation, a fundraise, a difficult conversation, a team you need to move.

You can commit to ten consecutive weekdays. One reschedule is available; the format depends on momentum.

You want direct, specific, real-time feedback — not affirmation.

You're ready to do the reps. This work changes patterns. It requires practice, not content.

## Assistant

<;>

_[tool: snip]_

_[tool: grep]_

<;>

_[tool: snip]_

_[tool: read_file]_

<;>

_[tool: snip]_

<;>

_[tool: snip]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: grep]_

<;>

_[tool: snip]_

_[tool: str_replace_edit]_

<;>

_[tool: snip]_

_[tool: done]_

<;>

_[tool: snip]_

_[tool: fork_verifier_agent]_

<;>

_[tool: snip]_

Expanded the Sprint section into "Ten days. *Daily reps.* Real change." with a four-column grid (daily repetition, real-time correction, range/adaptability, fits real life) — each with a 1.5px stroke voice-green icon, 01–04 numerals, and short body copy — followed by the existing metrics row.

Added a new **Who this is for** section between Testimonials and About: italic-green emphasis on *founder, executive, technical leader* in the headline, a graphite paragraph on coaching that didn't stick, and a four-row hairline-divided checklist (real stakes, ten weekdays, direct feedback, ready for reps).

## User

Apply 5 direct edits:
1. In app.jsx (near line 13, <div>): change the text from "ABOUT" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    About › Label
dom:      body › div#root › section#about › div › div › div[1/2]
text:     "ABOUT"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>
2. In app.jsx (near line 13, <div>): change the text from "MEET" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    About › Label
dom:      body › div#root › section#about › div › div › div[1/2]
text:     "MEET"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>
3. In app.jsx (near line 13, <div>): change the text from "MEET GENEVIEVE KIM" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    About › Label
dom:      body › div#root › section#about › div › div › div[1/2]
text:     "MEET GENEVIEVE KIM"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-4
</mentioned-element>
4. In tweaks-panel.jsx (near line 338, <button>): change the text from "Stacked" to "Asymmetric".
<mentioned-element>
react:    TweaksPanel › TweakRow
dom:      body › div#root › div.twk-panel › div.twk-body › div.twk-row › div.twk-seg › button[3/3]
text:     "Stacked"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-8
</mentioned-element>
5. In app.jsx (near line 13, <div>): change the text from "THE SPRINT" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    Sprint › Label
dom:      body › div#root › section#sprint › div › div[1/4]
text:     "THE SPRINT"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-10
</mentioned-element>

## Assistant

## User

Apply a direct edit. In app.jsx (near line 13, <div>): change the text from "THE SPRINT" to "VOICE COACHING FOR FOUNDERS AND EXECUTIVES".
<mentioned-element>
react:    Sprint › Label
dom:      body › div#root › section#sprint › div › div[1/4]
text:     "THE SPRINT"
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-2
</mentioned-element>

## Assistant

## User

Apply 2 direct edits:
1. In app.jsx (near line 267, <em>): change the text from "Daily reps." to "The Voice Sprint. ".
<mentioned-element>
react:    Sprint
dom:      body › div#root › section#sprint › div › div › h2 › em
text:     "Daily reps."
children: text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-5
</mentioned-element>
2. In app.jsx (near line 266, <h2>): change the text from "The Voice Sprint. Ten days that set the foundation of your voice.  Ten days. The Voice Sprint.  Real change." to "The Voice Sprint. Ten days that set the foundation of your voice.  ".
<mentioned-element>
react:    Sprint
dom:      body › div#root › section#sprint › div › div › h2[1/2]
text:     "The Voice Sprint. Ten days that set the foundation of your …"
children: text, em, text
selector: [data-om-id="jsx:/https:/019dd8f1-c942-7718-99df-4b25fc827cbe.claudeusercontent.com/v1/design/proje…
id:       cc-3
</mentioned-element>

## Assistant

_[tool: read_file]_

The two edits together don't compose cleanly — taking them literally would leave the headline as "The Voice Sprint. Ten days that set the foundation of your voice." with no italic accent at all. I'll apply edit #2 and drop #1 (since its target text is removed by #2).

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

Headline now reads "The *Voice Sprint.* Ten days that set the foundation of your voice." — italic-green emphasis kept on *Voice Sprint*. (Edit #1 was incompatible with edit #2's rewrite, so I applied #2 and preserved the italic styling on the new phrase.)

## User

Make edits attached in PDF

## Assistant

<;>

_[tool: snip]_

_[tool: invoke_skill]_

<;>

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: list_files]_

<;>

_[tool: snip]_

_[tool: list_files]_

<;>

_[tool: snip]_

_[tool: view_image]_

_[tool: view_image]_

<;>

The two attached PDF photos appear identical and don't show a portrait — they're a marketing snippet about "Allison Shapira." I'll need a clarification. But first let me snip and inspect the current file to apply all the text/section edits I can.

_[tool: snip]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

<;>

_[tool: snip]_

_[tool: read_file]_

<;>

The user mentioned "insert attached photo" but the two PDF photos look like generic web snippets, not a personal portrait. I'll keep the placeholder portrait but note this clearly. Let me note the user said "insert attached photo" — and the file is a PDF only. The actual attached photo appears to not have been a real portrait. I'll keep the placeholder, ask user to provide a real headshot, and apply all other edits.

Let me check the colors CSS so I know what tokens are available:

_[tool: read_file]_

<;>

Now let me apply all the edits. I'll plan:

1. **WHY YOU'RE HERE** (the Problem section) → add type variation, scale, color emphasis on right column
2. **THE SPRINT** → update copy + replace 4-card grid with new 4 cards (icons + numbered) + add visual variety to right column text
3. **WHAT CLIENTS SAY** → remove italics on quote, more font variety
4. **WHO THIS IS FOR** → update copy entirely + new column header
5. **ABOUT** → smaller portrait, new bio (placeholder for photo since attached PDF didn't have a real portrait), updated bullets, more visual treatment

_[tool: str_replace_edit]_

Now the Sprint section:

_[tool: str_replace_edit]_

<;>

_[tool: snip]_

_[tool: grep]_

<;>

_[tool: read_file]_

<;>

_[tool: snip]_

_[tool: str_replace_edit]_

<;>

_[tool: read_file]_

<;>

_[tool: snip]_

_[tool: snip]_

_[tool: str_replace_edit]_

<;>

_[tool: snip]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: grep]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: run_script]_

<;>

_[tool: snip]_

_[tool: done]_

<;>

_[tool: snip]_

_[tool: fork_verifier_agent]_

All edits applied:

- **Why you're here** — switched right column to a layered hierarchy: large serif "losing the room" lead → mono-tagged scenario list (Board / 1:1 / All-hands) → sans paragraph with green pull-words → italic serif diagnosis line under a hairline.
- **The Sprint** — eyebrow → "Where it starts"; headline → "Ten days that set the foundation"; new supporting copy with a serif lead + How/So scaffold; replaced the four cards with the four new pillars (Authority, Warmth, Clarity, Presence) — each with a fresh icon, italic serif pull-line, and sans body. Removed the metrics strip (it was redundant with the new copy).
- **What clients say** — added a serif italic *pull* line per quote, set the body in non-italic sans (per request), oversize green quote glyph in the corner, mixed serif/sans/mono in the attribution row.
- **Who this is for** — full copy swap: new headline, new four items (Serious about what's next / Committed to the work / Open to feedback / Up for trying new things) with serif item titles.
- **About** — portrait shrunk to a 260px column with caption strip; new bio with green-emphasized roles; pull-quote thesis line ("boardroom pressure × classical vocal training"); two mono-eyebrowed belief blocks; chip row updated with **Co-founder + CEO**, **Classically trained opera singer**, and **Currently performing a one-woman show**.

One thing I couldn't do: the PDF said "insert attached photo" but the two attached images were a marketing snippet, not a portrait — so the abstract placeholder is still there. Drop a JPG/PNG headshot into `uploads/` and I'll wire it in.

## User

Verifier agent check completed

## Assistant

<;>

_[tool: grep]_

<;>

_[tool: str_replace_edit]_

Now also bump the column flex gap so the paragraph clears the heading's italic descenders:

_[tool: grep]_

<;>

_[tool: read_file]_

<;>

_[tool: str_replace_edit]_

_[tool: done]_

Fixed the WHO THIS IS FOR overlap — bumped the headline `line-height` from 1.1 → 1.15, widened `maxWidth` from 20ch → 24ch (fewer wraps + safer descender clearance), and increased the column flex gap from 28 → 36px so the supporting paragraph clears the italic.

