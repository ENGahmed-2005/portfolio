# Ahmed Alkahlout — portfolio

Personal site of a React frontend developer. The first screen is a working
miniature of the kitchen screen from [menuPilot](https://github.com/ENGahmed-2005/menuPilot-):
add a dish, send the order, and watch the ticket move from new to ready.

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

- Palette: kitchen-counter steel `#E9ECEE`, ink `#172430`, receipt paper `#FFF6CF`,
  amber `#C98A00` for "preparing", green `#2F7A4D` for "ready".
- One typeface: Schibsted Grotesk, tabular numbers on tickets and prices.
- The kitchen display is the only loud element; the rest stays quiet.
- Keyboard focus is visible, the demo announces status changes to screen
  readers, and motion is turned off for `prefers-reduced-motion`.

## Deploy

Import the repository in Vercel (framework preset: Vite). No settings needed.
