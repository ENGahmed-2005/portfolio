# Ahmed Alkahlout — portfolio

Personal site of a React frontend developer, laid out as a macOS desktop:
a menu bar, a dock, and every section in its own window.

- **Kitchen.app** — a working miniature of the kitchen screen from
  [menuPilot](https://github.com/ENGahmed-2005/menuPilot-): add a dish, send
  the order, watch the ticket move from new to ready.
- **Scan.app** (three.js) — a real QR code built from cubes. Hover to push
  them up, then "Flatten to scan" and open menuPilot from your phone.
- **Phone.app** (three.js) — menuPilot screens on a 3D phone: drag to turn
  it, tap to change the screen.
- **Spotlight** — press ⌘K / Ctrl+K to jump to any section or project.
- Window lights work: red folds a window, green opens it full screen (Esc).

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

## Edit the content

All text, links and project images are in `src/content.js`. Empty fields
(email, LinkedIn, CV, live demo link) are hidden until you fill them.
Images live in `public/work/`.

## Design notes

- Dark navy desktop, glass windows, accent `#F2A93B` (menuPilot orange);
  the system font (SF Pro on a Mac, Segoe UI on Windows).
- three.js loads in its own chunk, only when the 3D windows render, and
  stops drawing when they scroll out of view. Without WebGL both fall back
  to flat versions (the flat QR still scans).
- AOS reveals each window once; it is off for `prefers-reduced-motion`.
- Keyboard focus is visible, the demo announces status changes to screen
  readers, and motion is turned off for `prefers-reduced-motion`.

## Deploy

Import the repository in Vercel (framework preset: Vite). No settings needed.
