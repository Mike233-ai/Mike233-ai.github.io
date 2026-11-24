# hush.

A bilingual, fictional sleep-brand website that stops behaving like a website.

It opens as a quiet, editorial product page for a bedside sleep device called Hush — and slowly edits itself as you scroll. Copy changes, the sleep chart flatlines, the product opens its eye, the palette goes dark, and the footer turns out not to be the end. Beyond it is a scroll-driven horror short about a room, a door, and something patient.

## Two editions

- **English** — [index.html](index.html) · [live](https://mike233isme.github.io/)
- **中文** — [zh.html](zh.html) · [live](https://mike233isme.github.io/zh.html)

Both pages share the same artwork, CSS and scroll engine. Use the small **中文 / EN** pill in the header to switch. Everything is local; no network connection is needed.

## Open it

Double-click **`index.html`** for English, or **`zh.html`** for Chinese.

If your browser is strict about media opened from `file://`, run the included local server:

```bat
serve.cmd
```

or manually:

```bat
python -m http.server 8787 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8787/` and choose a language.

## Controls

- **Scroll** — the story. Scrolling back does not undo what has already happened.
- **Sound off / on** in the header — optional ambience, heartbeats, knocks and one sting. Headphones recommended.
- **Escape**, or **Leave room / 离开房间** in the bottom-right HUD during the finale — exit early and jump to the ending.
- **Turn the lights on / 把灯打开** — at the end, reload the page back to the normal site.

## A note on content

This is a work of horror fiction. It contains a dark scene, a sudden light flash, and sudden sound (only if you turn sound on). No camera or microphone access is requested or used. The email fields are fictional; nothing is sent, stored, or transmitted anywhere. Everything (including the "local time" readout) stays in your browser.

## Files

```text
hush/
├─ index.html          — English edition: page copy and artwork
├─ zh.html             — Chinese edition: the same page, translated and re-set
├─ styles.css          — design system, layout, stages, descent choreography
├─ script.js           — scroll timeline, English + Chinese copy, sound, interactions
├─ serve.cmd           — optional local server
├─ preview/
│  ├─ hero.jpg         — the English site before it starts behaving badly
│  └─ hero-zh.jpg      — the Chinese edition, same quiet beginning
└─ assets/
   ├─ audio/           — locally synthesized ambience and effects (OGG + MP3)
   ├─ fonts/           — local display and text faces, including the Chinese display face
   └─ img/             — generated film grain and paper texture
```

## Editing

- English normal copy and its corrupted versions live in the `copy` object near the top of `script.js`.
- Chinese corrupted copy lives in the `copyZh` object immediately after it. It is sparse by stage: a key only needs the stages at which the line changes; earlier stages keep the normal Chinese copy from `zh.html`.
- Normal Chinese copy lives directly in `zh.html`.
- The descent is one sticky section in both HTML pages; each cue is an element with `data-cue` / `data-cue-out` values between `0` and `1`.
- Scene timing and opacity live in `updateDescent()` in `script.js`.
- The palette, type scale, layouts and cinematic HUD are in `styles.css`. Chinese-specific typography is the final section, beginning with `Chinese edition`.
- `prefers-reduced-motion` removes the shake and flash and shortens animation durations; sound is always opt-in.

The room, the eye, the face and every sound were built from scratch for this piece. Hush is not a real product. The Chinese display face is **Source Han Serif SC Heavy**, an open-source typeface by Adobe (SIL Open Font License 1.1).
