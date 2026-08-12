# Deex — Brand Guidelines

*Presentation style mirrors deezerbrand.com/document/88 — same section map, same sub-section map, same page rhythm. Verbal content sourced from [deex_brand_direction.md](./deex_brand_direction.md). Visual content sourced directly from the rebrand landing page in Figma (`New-DeeX`, node `1:127`) — hex values, font names, and layout facts below are pulled from the file's own tokens, layer styles, and screenshots, not invented. Every sub-section from the reference guide's nav is represented — where the file has no asset for one yet, it says so explicitly ("Not yet built") rather than skipping it or making one up.*

---

## Overview

There's nothing else worth banking on: not the queue, not the hold period, not the permission you never asked for. At Deex, we don't just believe your money should move at your speed; we built the account that proves it, fully and unapologetically.

**The only Crypto Bank you need.**

---

## Logo

### Logo layout

The Deex mark has two parts, used together as the default lockup: the **glyph** and the **wordmark**.

The glyph is two interlocking angular forms — a short one and a long one — rendered in opposing gradients: warm amber-to-coral on the short form (`#FFAF26 → #F85D31`), cool cyan-to-blue on the long form (`#0EB4E7 → #0B75C2`). Read together they suggest a "D," a forward arrow, and two currencies meeting in the middle — trade, exchange, motion.

The wordmark is a custom-drawn geometric capital set spelling **DEEX**, with a small horizontal accent mark breaking the word after "DEE" — not a licensed typeface, a bespoke set.

Use glyph + wordmark together as the default. The glyph alone can stand in for app icons, favicons, and anywhere the full wordmark won't fit legibly.

### Clearspace

Give the glyph clearspace equal to its own height on every side before any other element — text, edge, or image — enters the frame. The wordmark needs half that on its cap-height. Never let a button, card edge, or headline crowd the mark tighter than that.

### Colour

Two logo colourways exist in the current file:

1. **Ink on light** — wordmark in `Grey/900` (`#13181B`) on white or light backgrounds. This is the confirmed, in-use version (footer, header-on-light contexts).
2. **White on dark** — for the navy hero and any dark-navy or photographic background. *Not yet built as a separate asset in the file* — recommend producing a white/light variant of both wordmark and glyph before the navy hero ships, rather than placing the ink version on navy.

The glyph's gradient stays constant across both — it doesn't invert, it's already high-contrast enough to hold on navy or white.

### Logo position

In the current landing page, the lockup sits top-left, margin-aligned, glyph leading the wordmark — consistent with a left-aligned reading pattern for a product that opens with a bold, declarative headline to its right. Keep that pattern: glyph-left, margin-aligned, never centered in a navigation bar.

### Logo on images

Follow a contrast rule, not a fixed colourway: white lockup on photography or the navy hero, ink lockup on white or the light sky-blue section backgrounds (`#D0EBFF`). Never place the ink lockup over the navy hero or over the warm portrait photography — it disappears.

### Do's and don'ts

| Do | Don't |
|---|---|
| Use glyph + wordmark together as the default lockup | Stretch, skew, or recolor the glyph's gradient |
| Give the glyph clearspace equal to its own height | Crowd the mark with buttons or headline text |
| Match lockup colour to background contrast | Place the ink wordmark on the navy hero |
| Use the glyph alone only for icons/favicons | Use the wordmark alone without the glyph in a primary lockup |

### Sub-brand lockups

One sub-brand context already exists in the product, even without a dedicated mark: **Merchant / Business**, surfaced through the "I am a Merchant" hero CTA and the dedicated merchant section in the copy bank ("Not just your money. Your business too."). No distinct sub-brand lockup has been built yet. When one is needed, follow the common convention this file already implies elsewhere (suffixing, not replacing): primary wordmark + a plain-set "Merchant" suffix, vertical lockup by default, no second glyph.

### Partnerships

No partner co-branding exists anywhere in the current file or copy bank — Deex doesn't yet feature a third-party logo alongside its own. If a partnership placement is needed (a payment-provider integration, a merchant program logo), default to the simplest option: Deex wordmark + partner logo, separated by a thin vertical rule, sized to equal visual weight. Don't invent a merged mark.

### Offers

Deex already has a recurring "offers" surface in the product — rewards, referrals, milestones, streaks (see the Rewards section of the copy bank, and the footer's "Refer and Earn" / "Deex Tasks" / "Football Fantasy" links) — but no distinct visual lockup exists for any of it yet. When one is built, keep it a plain wordmark plus a short live label ("Rewards," "Refer & Earn") rather than a decorated badge or starburst. The tone-of-voice pillars call for confidence, not exclamation points — a promo badge that shouts undercuts a brand built on understatement.

### Logo in motion

Not yet built — the file is static. The glyph's own construction already suggests a direction: its two forms (short amber, long blue) could enter from opposite directions and interlock into place, echoing the "two currencies meeting in the middle" read from Logo layout above. See Motion → Logo below for the fuller direction once this gets built.

---

## Colours

### Primary colours

We use Deex Navy, Deex Amber, Ink, and White for the majority of brand communications — this is the palette that should carry anywhere brand familiarity is low (app-store listings, paid ads, out-of-home). Navy should be the dominant colour in these placements, the way it dominates the hero.

| Name | Hex | Usage |
|---|---|---|
| Deex Navy | `#004D85` | Hero backgrounds, high-impact brand moments |
| Deex Amber | `#FFAF26` | Primary CTA fill ("I am a Merchant") |
| Ink | `#13181B` | All body copy, button labels on light/amber fills |
| White | `#FFFFFF` | Primary CTA fill ("Create a Free Account"), reverse text |

*Deex Navy and Deex Amber are currently hardcoded fills in the Figma file, not bound to variables — recommend formalizing them as tokens (e.g. `Primary/800`, `Secondary/500`) so they don't drift between the marketing site and the product.*

### Secondary colours

For audiences who already know Deex — in-app, email, retargeting — bring in the secondary set alongside primary. No secondary colour should dominate a layout the way Navy or Amber can in a primary placement.

| Name | Hex | Usage |
|---|---|---|
| Amber Highlight | `#F28A0F` | Headline highlight blocks behind key words |
| System Blue 500 | `#0B75C2` | Links, section eyebrow labels, secondary UI accents |
| System Blue 400 | `#279DF3` | Lighter UI accents, hover/active states |
| Amber-Brown 600 | `#BE6B0A` | Secondary system token, warm UI accent |

### Tertiary colours

Reserved for in-product and editorial surfaces — where Deex gets to be quiet and functional rather than loud and brand-forward.

| Token | Hex |
|---|---|
| Primary/900 (near-black navy) | `#010D16` |
| Primary/100 (sky blue) | `#D4EBFD` |
| Success/500 | `#0D851D` |
| Grey/900 | `#13181B` |
| Grey/600 | `#4E606E` |
| Grey/500 | `#617889` |
| Grey/400 | `#869AA9` |
| Grey/300 | `#AEBCC6` |
| Grey/100 | `#E7EBEE` |
| Grey/50 | `#F7F8F9` |

Use `Primary/100` for light section backgrounds — this is the sky blue behind the bills/utilities section on the landing page. Use `Success/500` only for confirmed-transaction states; it's semantic, not decorative, and shouldn't be treated as a brand accent.

### Do's and don'ts

| Do | Don't |
|---|---|
| Lead low-familiarity placements with Primary colours only, Navy dominant | Use Success/500 as a decorative accent color |
| Add Secondary colours once the audience already knows Deex | Let a secondary colour dominate a layout the way Navy or Amber can |
| Reserve Tertiary for in-product/editorial detail work | Introduce a new accent hue without adding it as a token first |

---

## Typography

### Deex Sans — Gasoek One

The rebrand's headline face. Bold, condensed, all-caps by convention, used at large scale (81px in the current hero) with tight leading. This is what carries "Everything a bank should be." and every highlight-block headline across the landing page. Reserve it for headlines only — it's not legible at body sizes.

**Decided: Gasoek One + Roboto is the Deex typeface pairing**, system-wide — not marketing-only.

### Alignments

Two alignments are in active, confirmed use, and they follow the same logic Deezer uses: alignment follows what's leading the layout.

- **Left-aligned** — used whenever a photo or product screenshot leads on the right of the section (the hero, the Swap section). Headline, body copy, and CTA all sit left, image right.
- **Centered** — used when the message itself is the lead and supporting art (a phone mockup) sits below it, not beside it (the Bills section).

Sections with a text/visual 50/50 split also **alternate sides in a zigzag down the page** — hero and Swap lead text-left/visual-right, Store and Receive flip to visual-left/text-right. Keep that alternation; don't let two consecutive sections lead the same side.

### Colour

Text colour follows background contrast, not decoration:

| Background | Text colour |
|---|---|
| Deex Navy (hero) | White |
| White or Primary/100 sky blue (section backgrounds) | Ink (`#13181B`) |

Never set Ink on Navy, and never set White on a white or sky-blue background — both fail contrast outright, not just aesthetically.

### Do's and don'ts

| Do | Don't |
|---|---|
| Use Gasoek One only for large headline moments | Set body copy or long-form text in Gasoek One |
| Match text alignment to whatever's leading the section (image vs. message) | Mix left-aligned and centered type within the same section |
| Alternate text/visual sides section to section | Let two consecutive sections lead with the same side |

### Deex Body — Roboto

Paired with Gasoek One for hero subheads, section body copy, and CTA labels: Roboto Regular for paragraph copy, Roboto Bold for button text. Variable font, width axis held at 100.

### Product typefaces — Manrope & Sora (legacy)

The existing app design system runs on **Manrope** (paragraph, small text, and caption tokens — `Paragraph 01/Medium`, `Paragraph 02/Regular`, `Small Text/Medium`, `Caption/Regular`) and **Sora** (`Heading 06/Bold`, 24px). Treat these as legacy: new screens and components should be built on Gasoek One (headlines) + Roboto (body/UI text) per the decision above, and existing Sora/Manrope UI should migrate to Roboto as screens get touched — not be joined by a fourth typeface. Roboto's smaller/lighter weights should absorb the small-text/caption role Manrope currently plays.

---

## Photography

### Our people

The confirmed direction, visible in the hero: warm, candid portraiture — a real person, mid-laugh, looking up and away from camera rather than posing into it. Soft colour-tinted backdrop (dusty pink in the current hero), not a studio white cyc. The feeling is the "loud win" from the brand direction doc made visual — someone caught in a genuine moment of being pleased with themselves, not a stock-photo salesperson smile.

### In use

Photography sits large and un-cropped-to-death — the hero image runs close to full-bleed within a softly rounded container, paired with a QR code as a direct, functional call-to-action rather than pure decoration.

### Do's and don'ts

| Do | Don't |
|---|---|
| Cast real, specific-feeling moments, not generic stock smiles | Use posed, direct-to-camera stock photography |
| Let the subject's expression carry the "big win" feeling | Crop tightly enough to lose the candid, caught-in-the-moment quality |
| Use warm, tinted backdrops (not clinical studio white) | Mix cold, flat studio lighting into the same layout as warm portraiture |

### Product imagery

Where Deezer splits fan photography from curated artist photography, Deex splits real-person photography from **product imagery** — real transaction data (balances, payout history, live rates) shown as the "subject" instead of a person. Two treatments are already in use, not one:

- **Full device mockup** — a phone frame containing real UI, showing a scrollable list (the Bills section's payout history). Used when the breadth of the product is the point.
- **Floating action card** — an isolated panel with no phone chrome, showing a single focused task (the Swap section's rate-and-currency card, ending in a "Fetch Rates" button). Used when one specific action is the point.

Both sit inside a soft rounded blob container (see Shapes → Masks) rather than floating on an empty background — never introduce a third device-presentation style without a reason.

---

## Illustrations

### Construction

Soft, organic blob shapes in the brand blue family sit behind phone-mockup screens and hero elements across the landing page — freeform, not geometric, and always receding behind the product screenshot or photograph they're supporting rather than competing with it for attention.

### In use

These shapes are the connective tissue between sections that are otherwise mostly typography, product screenshots, and photography — they keep pages that are UI-screenshot-heavy from feeling like a spec sheet.

*No icon or spot-illustration system exists in the file yet — if Deex needs a custom icon set (beyond the third-party payment-provider marks used functionally in the bills section), that's a separate, not-yet-started piece of work.*

---

## Motion

*Not yet built in the file — the current landing page is static.* Given the brand's emotional core (the "quiet win" of watching a balance grow, the "loud win" right after a transaction), the four areas below should follow two matching modes when they're built: **quiet** (slow, settled easing for passive/balance states) and **loud** (a quick, confident snap for confirmations and payouts — fast in, brief emphasis, settle). Avoid anything that reads as playful bounce or cartoonish overshoot; that undercuts the "boss/king, in control" tone the rest of the brand is built on.

### Logo

Not yet built. The glyph's two-part construction (short amber form, long blue form) suggests a natural entrance: the two forms animate in from opposite directions and interlock — echoing the "two currencies meeting" read from Logo → Logo layout.

### Type behaviours

Not yet built. Given Gasoek One's blocky, condensed weight, headline animation should favor a settle-into-place snap — a short slide in whichever direction matches the section's own alignment (see Typography → Alignments) — rather than a soft fade. Roboto body copy can fade/rise gently underneath; the contrast between a snappy headline and a calmer body line reinforces the "confident, not overexplained" voice pillar.

### Dividers and transitions

Not yet built, but the static file already implies the rule: backgrounds cut hard between flat colours at section boundaries (navy hero → white Swap section → sky-blue Bills section) with no gradient blend anywhere in the file. Keep that same hard cut when it's animated — a quick cut or snap-scroll between sections, not a slow cross-fade.

### Pattern behaviours

Not applicable. No repeating, tileable pattern system exists in the file — the organic blob shapes (see Illustrations) are one-off placements, not a pattern. Skip this until a pattern system is actually designed, rather than forcing one to exist.

---

## Shapes

### Patterns

Not applicable — see Motion → Pattern behaviours. No repeating pattern exists in the file yet.

### Sound expression

Not applicable. Deezer's "sound expression" concept — beat shapes reacting to music and mood — is specific to a sound-native brand. Deex isn't one; skip this concept rather than force an analog onto it.

### Containers

Two consistent container conventions across the landing page:

- **Fully rounded (pill) buttons** — every CTA, both primary (white, amber) and secondary (outlined app-store badges), uses a 100px-radius pill.
- **Large-radius rounded rectangles** — photography and product-screenshot containers use a generous corner radius, never a hard square edge and never a full circle crop.

### Dividers

Deex's divider isn't a decorative shape — it's structural. Sections use a hard-cut 50/50 split between message and product visual, and that split **alternates sides section to section** (see Typography → Alignments for the confirmed zigzag: hero/Swap text-left, Store/Receive visual-left). That alternation is doing the job a decorative divider shape would do elsewhere — keep it instead of adding one.

### Crops

The large-radius rounded rectangle (see Containers) is Deex's only crop treatment across the file — no circular crops, no sharp square crops, no angled or torn crops. One crop language, used consistently for photography, screenshots, and floating action cards alike.

### Do's and don'ts

| Do | Don't |
|---|---|
| Use pill shape for every button, no exceptions | Mix sharp-cornered and pill buttons in the same layout |
| Use one consistent large corner radius for every image/screenshot/card container | Crop photography or screenshots into hard squares or circles |
| Pair phone-mockup or floating-card visuals with a background blob shape | Float a screenshot or card on an empty flat background |

### Masks

Two device-presentation masks are in confirmed use (see Photography → Product imagery): the **full device mockup** (phone frame, used in the Bills section) and the **floating action card** (chrome-free panel, used in the Swap section). *Square containers for imagery — Deezer's record-cover-inspired mask for social content — don't yet exist for Deex; recommend adopting the same large-radius rounded-rectangle language (see Crops) rather than a new square treatment if one's needed.*

### UI modules

Two core modules are already in repeated use:

- **List-row module** — icon, label, timestamp, amount, seen in the Bills section's payout history. Reuse this for any list of discrete money events: trades, payouts, bill payments.
- **Action-card module** — a rounded white card with labeled input/dropdown fields and a full-width primary button, seen in the Swap section. Reuse this for any single-task flow.

*No "expressive" module variant exists yet — unlike Deezer's core/expressive split, Deex's UI modules are functional only so far.*

---

## Tone of voice

Our brand voice is how Deex sounds when it talks about money. It's where the positioning, the audience, and the confidence meet — and it should be unmistakably Deex, every time. Our voice stays consistent; our tone adjusts to the moment, from a push notification to a full campaign.

### Tone of voice pillars

What does it mean to write like someone who's already made it? The meaning blurs fast from person to person, so here's the guiding star for anyone writing for Deex.

**Certain, not curious**
### CONFIDENT

We say what's true because we know who we're talking to. Deex states things — it never pitches them, never explains itself twice, never hedges. The fewest words that carry the most weight, every time.

**Sharp, not soft**
### DIRECT

We talk to one person, not a segment. Second person, present tense, active voice — *"you move money, we keep up."* Deex knows its audience without performing localness. Sharp, never folksy.

**Unbothered, not humble**
### UNAPOLOGETIC

Money is good. Wanting more of it is good. Moving it fast is good. Deex doesn't apologize for any of that, and it doesn't defend itself either — confidence doesn't need a disclaimer.

### Do's and don'ts

Please reflect on our do's and don'ts to maintain a strong tone of voice that is consistent with our brand identity.

| Do | Don't |
|---|---|
| Open with the win, not the setup | Bury the point under a warm-up paragraph |
| Talk to one person, never "our users" | Address a crowd instead of a person |
| Say the dollar amount, not "your funds" | Lead with naira, or dodge the number entirely |
| Praise the move — every trade is a flex | Treat a transaction like an errand |
| Cut the sentence until only the certainty is left | Let a sentence explain itself twice |
| Write like the reader already made it | Write like you're convincing a first-timer |
| Read it back and lose anything that hedges | Leave in "we believe," "we strive," or "we're excited" |

---

*Last modified: 2026-08-12*
