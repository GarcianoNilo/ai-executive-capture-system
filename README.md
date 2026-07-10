# AI Executive Capture & Follow-up System

A single-page landing site for an AI-powered capture pipeline: send a message or a voice note, and AI classifies, prioritizes, and stores it in one operational memory.

Built as a static site — no build step, no framework, ready to deploy to GitHub Pages as-is.

---

## Live demo

Open `index.html` in a browser, or deploy via GitHub Pages (see below).

## Tech stack

- HTML5
- Vanilla JavaScript (ES6+)
- Tailwind CSS via CDN
- [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

No npm, no bundler, no framework. Everything runs directly in the browser.

## File structure

```
.
├── index.html   → Page structure and content (nav, hero, sections, form)
├── style.css    → Scroll offsets, focus states, and the hero's live-feed animation
├── app.js       → Mobile nav, live capture feed demo, and the webhook submission
└── README.md    → This file
```

Tailwind handles almost all styling via utility classes directly in `index.html`. `style.css` only covers what Tailwind can't: anchor scroll offsets under the sticky header, visible keyboard focus rings, and the fade/pulse animation in the hero panel.

## Configuration

The **Try It** form submits to a Make.com webhook. To point it at your own scenario, open `app.js` and update:

```js
const webhookUrl = "https://hook.us2.make.com/your-webhook-id-here";
```

The form sends a `multipart/form-data` POST with these fields:

| Field       | Type   | Notes                                   |
|-------------|--------|------------------------------------------|
| `message`   | text   | Required                                 |
| `audio`     | file   | Optional, `accept="audio/*"`             |
| `timestamp` | text   | ISO 8601, generated client-side          |
| `source`    | text   | Always `"Web Landing Page"`              |

If your Make.com webhook module expects JSON rather than form data, the request will still send successfully from the browser but the scenario won't parse the fields correctly — worth testing with a real submission before relying on it.

## Deploying to GitHub Pages

1. Push these files to the root of a repository (or to a `/docs` folder, or a `gh-pages` branch — whichever you configure).
2. In the repo, go to **Settings → Pages**.
3. Set the source branch/folder and save.
4. GitHub will publish the site at `https://<username>.github.io/<repo-name>/`.

No build step runs on GitHub's side — it serves the static files directly.

## Customizing the content

- **Copy**: all section text lives directly in `index.html`, organized under clearly commented sections (`HERO`, `PROBLEM`, `SOLUTION`, `ARCHITECTURE`, `TRY IT`, `FOOTER`).
- **Live capture feed examples**: the rotating input/output pairs in the hero panel are defined as an array in `app.js` under `initCaptureFeed()` — edit the `examples` array to change them.
- **Colors and fonts**: defined once in the `tailwind.config` script block at the top of `index.html`, so every utility class (`bg-accent`, `text-subink`, etc.) stays in sync.
- **GitHub links**: currently point to a placeholder — update the `href` values in the nav and footer once the real repository exists.

## Accessibility

- Semantic HTML throughout (`header`, `nav`, `main`, `section`, `footer`, proper `label`/`input` pairing).
- Keyboard-visible focus states on all links and buttons.
- `aria-live="polite"` on the live capture feed so screen readers aren't interrupted mid-cycle.
- Animations (feed rotation, pulse dot, smooth scroll) are disabled under `prefers-reduced-motion: reduce`.

## Performance

- No JavaScript framework, no bundler, no build artifacts.
- Tailwind and fonts load from CDN; everything else is three small static files.
- Designed to load fast on GitHub Pages with no additional optimization needed.

## Built with

HTML · Tailwind CSS · Make.com · OpenAI · Google Sheets
