/* Everything the site says lives here. Empty fields are hidden. */
export const profile = {
  name: "Ahmed Alkahlout",
  role: "React frontend developer",
  headline: "I build React interfaces for products people use under pressure.",
  intro:
    "Dashboards, ordering flows and right-to-left Arabic interfaces that stay clear when a whole team is using them at once. I work with startups and agencies that need a frontend partner who ships.",
  availability: "Open to remote frontend work with European teams.",
  location: "Gaza, Palestine",
  email: "ahmedkahlout258@gmail.com",
  whatsapp: "https://wa.me/970597401925",
  github: "https://github.com/ENGahmed-2005",
  linkedin: "", // e.g. "https://www.linkedin.com/in/…"
  cv: "", // e.g. "/ahmed-alkahlout-cv.pdf", file placed in /public
  photo: { src: "/ahmed.webp", alt: "Portrait of Ahmed Alkahlout" },
  about: [
    "I'm a third-year Software Engineering student and a frontend developer who ships complete, working applications rather than isolated exercises.",
    "I own a UI end to end: layout, state, routing and the API calls behind it. Most of what I build is in Arabic, right to left, and has to work on whatever phone the user has.",
  ],
};

export const training = [
  { title: "Frontend fundamentals", hours: 120, topics: "HTML, CSS and JavaScript" },
  { title: "Modern React", hours: 60, topics: "React, JavaScript and ECMAScript, Next.js" },
];

export const skills = ["JavaScript (ES6+)", "React", "Next.js", "Vite", "Tailwind CSS", "Bootstrap", "HTML and CSS", "REST APIs", "Right-to-left (Arabic) layouts", "Git and GitHub"];

export const caseStudy = {
  name: "menuPilot",
  summary: "QR ordering and restaurant management, from the guest's phone to the kitchen.",
  problem:
    "Small restaurants run on paper tickets and shouting. Orders get lost at the busiest hour, and most systems on the market are built for chains, priced for chains, and only in English.",
  built: [
    "Guest ordering from a table QR code, with live order tracking on the phone.",
    "A kitchen screen where tickets move from new to ready as the team works.",
    "Cashier and waiter screens, and an owner dashboard with reports and staff permissions.",
    "Online ordering for pickup and delivery, and a subscription page with plans and add-ons.",
    "The whole product in Arabic, right to left, on any screen size.",
  ],
  role: "Frontend: React components, state, routing and the API integration with a Laravel backend.",
  stack: ["React 19", "Vite", "Tailwind CSS", "React Router", "REST API (Laravel)"],
  repo: "https://github.com/ENGahmed-2005/menuPilot-",
  live: "https://menupilot-lilac.vercel.app",
  shots: [
    { src: "/work/kitchen.webp", w: 1600, h: 1000, alt: "menuPilot kitchen screen with order tickets grouped by status", caption: "Kitchen screen", wide: true },
    { src: "/work/menu_phone.webp", w: 560, h: 1212, alt: "Guest menu on a phone, opened from a table QR code", caption: "Guest menu from a table QR" },
    { src: "/work/tracking_phone.webp", w: 560, h: 1212, alt: "Live order tracking on a phone", caption: "Live order tracking" },
    { src: "/work/online_phone.webp", w: 560, h: 1212, alt: "Online ordering for pickup and delivery on a phone", caption: "Online ordering" },
    { src: "/work/dashboard.webp", w: 1600, h: 1000, alt: "Owner dashboard with today's orders and sales", caption: "Owner dashboard", wide: true },
    { src: "/work/cashier.webp", w: 1600, h: 1000, alt: "Cashier screen with tables and bills", caption: "Cashier and bills", wide: true },
  ],
};

// More work. `live` and `repo` are optional; empty ones are hidden.
export const projects = [
  {
    name: "Gaza OS",
    kind: "Event site, «غزة تُبرمَج»",
    text: "A make-believe operating system in the browser for the developers of Gaza who kept writing code through everything. A working terminal, a profile for each of the 15 developers, a notepad, and light and dark modes. Made for the PCIT × Al-Azhar University event.",
    stack: "HTML, CSS, JavaScript",
    live: "https://engahmed-2005.github.io/Gaza-OS/",
    repo: "https://github.com/ENGahmed-2005/Gaza-OS",
  },
  {
    name: "NABTA",
    kind: "Studio website",
    text: "The website of my development team, in Arabic. All content lives in data files, so it can move to a Laravel API later without touching the components.",
    stack: "React, Vite, Tailwind CSS",
    live: "",
    repo: "https://github.com/ENGahmed-2005/nabta",
  },
  {
    name: "AMK Store",
    kind: "E-commerce, built from zero",
    text: "A storefront with a slide-in cart that keeps its total, product detail pages, a full cart page, and story and contact pages. Plain JavaScript, no framework.",
    stack: "HTML, CSS, JavaScript, Bootstrap",
    live: "",
    repo: "",
  },
  {
    name: "EVAN Restaurant",
    kind: "Restaurant site",
    text: "The website of a restaurant and lounge, built around its smart table system.",
    stack: "HTML, CSS, JavaScript",
    live: "https://engahmed-2005.github.io/EVAN-res/",
    repo: "https://github.com/ENGahmed-2005/EVAN-res",
  },
  {
    name: "مغامرة الهاء الخارقة",
    kind: "Arabic quiz game",
    text: "A timed quiz game in Arabic with three levels, a 60-second clock, a running score and a best score.",
    stack: "HTML, CSS, JavaScript",
    live: "https://engahmed-2005.github.io/gamePlay/",
    repo: "https://github.com/ENGahmed-2005/gamePlay",
    rtl: true,
  },
];

export const principles = [
  {
    title: "The screen tells the truth",
    text: "Prices, permissions and order states come from the server. The interface mirrors them and never guesses, so what staff see is what the system will do.",
  },
  {
    title: "Built for the rush, not the demo",
    text: "Large touch targets, states you can read across a kitchen, and flows that survive a slow connection. Busy hands, not a perfect desk setup.",
  },
  {
    title: "Arabic first, right to left",
    text: "Layouts that work in both directions from the start, with real Arabic content, not translated afterwards.",
  },
];
