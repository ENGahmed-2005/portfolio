# Ahmed Alkahlout — portfolio

Personal site of a React frontend developer, laid out as a macOS desktop:
a menu bar, a dock, and every section in its own window.

- **Kitchen.app** — a working miniature of the kitchen screen from
  [menuPilot](https://github.com/ENGahmed-2005/menuPilot-): add a dish, send
  the order, watch the ticket move from new to ready.
- **Scan.app** (three.js) — a real QR code built from cubes. Hover to push
  them up, then "Flatten to scan" and open menuPilot from your phone.
- **Phone.app** (CSS 3D) — menuPilot screens on a phone that leans toward
  the pointer; tap it to change the screen.
- **Spotlight** — press ⌘K / Ctrl+K to jump to any section or project.
- Window lights work: red folds a window, green opens it full screen (Esc).
- English and Arabic (the whole page flips right to left), light and dark
  theme. Both are remembered; the first visit follows the visitor's device,
  and `?lang=ar` / `?lang=en` in a link picks the language.

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

## Edit the content

All text, links and project images are in `src/content.js`, once for
English (`en`) and once for Arabic (`ar`); interface words are in `ui`. Empty fields
(email, LinkedIn, CV, live demo link) are hidden until you fill them.
Images live in `public/work/`.

## Design notes

- macOS in light mode: a plain grey desktop, white windows with the system's
  grey chrome, and macOS orange `#F5821F` as the accent. The dark kitchen
  display is the one bold element. No blur, gradients or glow.
- Type: Instrument Sans for Latin, IBM Plex Sans Arabic for Arabic, both
  self-hosted (no request to Google Fonts).
- Dark theme: the macOS dark appearance (graphite), same orange accent.
- three.js is in its own chunk, loaded after the page is idle and the 3D
  window is near. It draws only while something moves and costs nothing
  idle. The canvas is absolutely positioned in a fixed-height box, so it
  can't grow its container. Without WebGL the flat QR still scans.
- AOS fades each window in once; it is off for `prefers-reduced-motion`.
- Keyboard focus is visible, the demo announces status changes to screen
  readers, and motion is turned off for `prefers-reduced-motion`.

## Deploy

Import the repository in Vercel (framework preset: Vite). No settings needed.
