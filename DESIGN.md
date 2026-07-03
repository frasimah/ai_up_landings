# Design system rules

This project accumulated near-duplicate type sizes, weights, line-heights and
button shapes because new blocks kept inventing their own "close enough"
values instead of reusing what already existed (e.g. a 17px next to an 18px
that were meant to be the same thing; a 60px/700 bold title next to the
48px/500 title used everywhere else). Follow the rule below to stop that.

## The rule

**Before writing a `font-size`, `font-weight`, `line-height`, button
padding/radius, or grey-text opacity by hand, check `src/scss/_mixins.scss`
and grep for the value you're about to type.** If something close already
exists, use it — do not invent a new value that's "basically the same." If
a block of styles (e.g. a whole button) is copy-pasted into a second file,
stop and extract a shared `@mixin` in `_mixins.scss` instead of pasting a
third time.

If you genuinely need a new size/weight that doesn't fit any existing
mixin, that's fine — but add it as a named mixin (or a clearly-scoped
one-off with a comment saying why it's different), not a bare inline value
copied across files.

## Typography mixins (`src/scss/_mixins.scss`)

| Mixin | Desktop | Tablet | Weight | Use for |
|---|---|---|---|---|
| `h1` | 44px/46 (fluid to 52/56) | 34px/36 | 500 | Page-level hero H1 |
| `h2` | 32px/36 (fluid to 38/42) | 28px/30 | 500 | Secondary hero-level heading |
| `h3` | 20px/24 (fluid to 28/24) | 18px/24 | 500 | Card titles |
| `h4` | 16px/24 (fluid to 20/28) | 14px/20 | 300 | Small headings |
| `sectionTitle` | 48px/54 | 30px/36 | 500 | **Canonical section `<h2>`** — every "## Заголовок блока" on the call-center page. Fixed size (not fluid). |
| `largeText` | 20px/28 (fluid to 24/32) | 16px/22 | 500 | Emphasized body copy |
| `mediumText` | 16px/24 (fluid to 20/28) | 14px/20 | 500 | Buttons, nav, secondary UI text |
| `smallText` | 14px/20 (fluid to 16/22) | 12px/18 | 500 | Labels, captions |

`sectionTitle` is the one to reach for whenever you're building a new
section heading — 19 blocks already use it. Don't write a bespoke
`font-size: 60px; font-weight: 700` heading next to it; it will look like a
bug (this happened twice: `CallCenterCta` and `CallCenterCtaBanner`'s split
title both had to be migrated back onto `sectionTitle`).

## Muted / lead text color

Body copy under a heading ("lead" / "subtitle" role) uses
**`rgba(255, 255, 255, .6)`**. Don't introduce `.55`, `.62`, `.66`, `.72`
etc. for the same role — that was audited and unified across ~15 files.
The one deliberate exception is the homepage-style hero subtitle
(`CallCenterFirst` `.subtitle`, `.66`), which is a distinct, more prominent
tier by design, not an oversight.

## Buttons

Two canonical scalable shapes, both built on `fl()` (see below) so they
shrink correctly at every breakpoint instead of staying a fixed desktop
size on mobile:

- **Blue primary button** — `padding: fl(18,14) fl(22,18); border-radius:
  fl(20,14);` + `@include mediumText`, with `@include desktop { padding:
  14px 18px; border-radius: 14px; }` and `@include tablet { padding: 10px
  16px; border-radius: 10px; }`. See `CallCenterFirst.btnPrimary` or
  `CallCenterRoi.cta`.
- **White CTA pill button** (e.g. "Заказать звонок" on a dark banner) —
  use the `ctaPillBtn` mixin in `_mixins.scss`. Do not hand-roll this
  again; it was previously duplicated verbatim (and non-responsive) across
  `CallCenterCta`, `CallCenterCtaBanner`'s split variant, and its centered
  variant.

## Breakpoints & fluid sizing (`src/scss/_media.scss`)

- `desktop` mixin → `≤2560px`
- `tablet` mixin → `≤1199px`
- `mobile` mixin → `≤767px`
- `fl($max, $min)` → `clamp()` between `$min` and `$max` px, interpolated
  across a 1600–1920px viewport. Use it for anything that should scale
  smoothly on very wide screens instead of jumping at a single breakpoint.

## Before you add a new style, ask

1. Does `_mixins.scss` already have this (heading, body text, button)?
2. Does grepping the value (e.g. `grep -rn "font-size: 17px"`) turn up
   something that's supposed to be the same thing?
3. Am I about to paste a style block that already exists in another file?
   If yes, make it a mixin instead.
