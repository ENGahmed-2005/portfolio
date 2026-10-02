/* Everything the site says, in English and Arabic. Empty fields are hidden.
   Links, images and numbers are shared; only the words change. */

const links = {
  email: "ahmedkahlout258@gmail.com",
  whatsapp: "https://wa.me/970597401925",
  github: "https://github.com/ENGahmed-2005",
  linkedin: "https://www.linkedin.com/in/ahmed-alkahlout/",
  cv: "", // e.g. "/ahmed-alkahlout-cv.pdf", file placed in /public
  photo: "/ahmed.webp",
};

const menuPilotLinks = {
  repo: "https://github.com/ENGahmed-2005/menuPilot-",
  live: "https://menupilot-lilac.vercel.app",
  instagram: "https://www.instagram.com/menupilot_/",
};

const shots = [
  { src: "/work/kitchen.webp", w: 1600, h: 1000, wide: true },
  { src: "/work/menu_phone.webp", w: 560, h: 1212 },
  { src: "/work/tracking_phone.webp", w: 560, h: 1212 },
  { src: "/work/online_phone.webp", w: 560, h: 1212 },
  { src: "/work/dashboard.webp", w: 1600, h: 1000, wide: true },
  { src: "/work/cashier.webp", w: 1600, h: 1000, wide: true },
];

const projectLinks = [
  { live: "https://engahmed-2005.github.io/Gaza-OS/", repo: "https://github.com/ENGahmed-2005/Gaza-OS" },
  { live: "", repo: "https://github.com/ENGahmed-2005/nabta" },
  { live: "", repo: "" },
  { live: "https://engahmed-2005.github.io/EVAN-res/", repo: "https://github.com/ENGahmed-2005/EVAN-res" },
  { live: "https://engahmed-2005.github.io/gamePlay/", repo: "https://github.com/ENGahmed-2005/gamePlay", rtl: true },
];

const trainingData = [
  { hours: 120, certificate: "/certificates/pcit-frontend-120h.webp" },
  { hours: 60, certificate: "" },
];

const skillsShared = ["JavaScript (ES6+)", "React", "Next.js", "Vite", "Tailwind CSS", "Bootstrap", "REST APIs", "Git, GitHub"];

const en = {
  profile: {
    ...links,
    name: "Ahmed Alkahlout",
    role: "React frontend developer",
    headline: "I build React interfaces for products people use under pressure.",
    intro:
      "Dashboards, ordering flows and right-to-left Arabic interfaces that stay clear when a whole team is using them at once. I work with startups and agencies that need a frontend partner who ships.",
    availability: "Open to remote frontend work with European teams.",
    location: "Gaza, Palestine",
    photoAlt: "Portrait of Ahmed Alkahlout",
    about: [
      "I'm a fourth-year Software Engineering student and a React developer who ships complete, working applications rather than isolated exercises.",
      "I work on the whole of a screen: layout, state, routing and the API calls behind it. Most of what I build is in Arabic, right to left, and has to work on whatever phone the user has.",
    ],
  },
  trainingProvider: { name: "PCIT", fullName: "Palestinian Center for Information & Technology", trainer: "Mohammed Naji Abu Al-Qumboz" },
  training: [
    { ...trainingData[0], title: "Frontend fundamentals", topics: "HTML, CSS and JavaScript", dates: "March to June 2026" },
    { ...trainingData[1], title: "Modern React", topics: "React, JavaScript and ECMAScript, Next.js", dates: "" },
  ],
  skills: [...skillsShared, "HTML and CSS", "Right-to-left (Arabic) layouts"],
  caseStudy: {
    ...menuPilotLinks,
    name: "menuPilot",
    summary: "QR ordering and restaurant management, from the guest's phone to the kitchen.",
    team: "A team project: I worked on the React frontend together with other React developers, on top of the project's Laravel API.",
    problem:
      "Small restaurants run on paper tickets and shouting. Orders get lost at the busiest hour, and most systems on the market are built for chains, priced for chains, and only in English.",
    built: [
      "Guest ordering from a table QR code, with live order tracking on the phone.",
      "A kitchen screen where tickets move from new to ready as the team works.",
      "Cashier and waiter screens, and an owner dashboard with reports and staff permissions.",
      "Online ordering for pickup and delivery, and a subscription page with plans and add-ons.",
      "The whole product in Arabic, right to left, on any screen size.",
    ],
    role: "One of the team's React developers: components, state, routing, and connecting screens to the API.",
    stack: ["React 19", "Vite", "Tailwind CSS", "React Router", "REST API (Laravel)"],
    shots: [
      { ...shots[0], alt: "menuPilot kitchen screen with order tickets grouped by status", caption: "Kitchen screen" },
      { ...shots[1], alt: "Guest menu on a phone, opened from a table QR code", caption: "Guest menu from a table QR", short: "Menu" },
      { ...shots[2], alt: "Live order tracking on a phone", caption: "Live order tracking", short: "Tracking" },
      { ...shots[3], alt: "Online ordering for pickup and delivery on a phone", caption: "Online ordering", short: "Online" },
      { ...shots[4], alt: "Owner dashboard with today's orders and sales", caption: "Owner dashboard" },
      { ...shots[5], alt: "Cashier screen with tables and bills", caption: "Cashier and bills" },
    ],
  },
  projects: [
    { ...projectLinks[0], name: "Gaza OS", kind: "Event site, «غزة تُبرمَج»", stack: "HTML, CSS, JavaScript",
      text: "A make-believe operating system in the browser for the developers of Gaza who kept writing code through everything. A working terminal, a profile for each of the 15 developers, a notepad, and light and dark modes. Made for the PCIT × Al-Azhar University event." },
    { ...projectLinks[1], name: "NABTA", kind: "Studio website", stack: "React, Vite, Tailwind CSS",
      text: "The website of my development team, in Arabic. All content lives in data files, so it can move to a Laravel API later without touching the components." },
    { ...projectLinks[2], name: "AMK Store", kind: "E-commerce, built from zero", stack: "HTML, CSS, JavaScript, Bootstrap",
      text: "A storefront with a slide-in cart that keeps its total, product detail pages, a full cart page, and story and contact pages. Plain JavaScript, no framework." },
    { ...projectLinks[3], name: "EVAN Restaurant", kind: "Restaurant site", stack: "HTML, CSS, JavaScript",
      text: "The website of a restaurant and lounge, built around its smart table system." },
    { ...projectLinks[4], name: "مغامرة الهاء الخارقة", kind: "Arabic quiz game", stack: "HTML, CSS, JavaScript",
      text: "A timed quiz game in Arabic with three levels, a 60-second clock, a running score and a best score." },
  ],
  principles: [
    { title: "The screen tells the truth", text: "Prices, permissions and order states come from the server. The interface mirrors them and never guesses, so what staff see is what the system will do." },
    { title: "Built for the rush, not the demo", text: "Large touch targets, states you can read across a kitchen, and flows that survive a slow connection. Busy hands, not a perfect desk setup." },
    { title: "Arabic first, right to left", text: "Layouts that work in both directions from the start, with real Arabic content, not translated afterwards." },
  ],
};

const ar = {
  profile: {
    ...links,
    name: "أحمد الكحلوت",
    role: "مطوّر واجهات React",
    headline: "أبني واجهات React لمنتجات يستخدمها الناس تحت الضغط.",
    intro:
      "لوحات تحكم، ومسارات طلب، وواجهات عربية من اليمين لليسار تبقى واضحة حتى حين يستخدمها فريق كامل في الوقت نفسه. أعمل مع الشركات الناشئة والوكالات التي تحتاج شريكاً في الواجهات يسلّم العمل.",
    availability: "متاح للعمل عن بُعد في الواجهات مع فرق أوروبية.",
    location: "غزة، فلسطين",
    photoAlt: "صورة أحمد الكحلوت",
    about: [
      "أنا طالب هندسة برمجيات في السنة الرابعة، ومطوّر React يسلّم تطبيقات كاملة تعمل، لا تمارين منفصلة.",
      "أعمل على الشاشة كاملة: التخطيط، والحالة، والتنقل، واستدعاءات الـ API خلفها. معظم ما أبنيه بالعربية ومن اليمين لليسار، ويجب أن يعمل على أي جوال يملكه المستخدم.",
    ],
  },
  trainingProvider: { name: "PCIT", fullName: "المركز الفلسطيني للبرمجة والتطوير", trainer: "محمد ناجي أبو القمبز" },
  training: [
    { ...trainingData[0], title: "أساسيات الواجهات الأمامية", topics: "HTML، CSS، JavaScript", dates: "من مارس إلى يونيو 2026" },
    { ...trainingData[1], title: "React الحديثة", topics: "React، JavaScript، ECMAScript، Next.js", dates: "" },
  ],
  skills: [...skillsShared, "HTML، CSS", "واجهات عربية من اليمين لليسار"],
  caseStudy: {
    ...menuPilotLinks,
    name: "menuPilot",
    summary: "طلب عبر QR وإدارة للمطعم، من جوال الزبون إلى المطبخ.",
    team: "مشروع فريق: عملت على واجهات React مع مطوّري React آخرين، فوق واجهة Laravel البرمجية للمشروع.",
    problem:
      "المطاعم الصغيرة تعمل بأوراق الطلبات والصراخ. تضيع الطلبات في ساعة الذروة، ومعظم الأنظمة في السوق مصممة للسلاسل الكبيرة، وبأسعار السلاسل، وبالإنجليزية فقط.",
    built: [
      "طلب الزبون من رمز QR على الطاولة، مع تتبع حي للطلب على جواله.",
      "شاشة مطبخ تنتقل فيها الطلبات من «جديد» إلى «جاهز» مع عمل الفريق.",
      "شاشتا الكاشير والنادل، ولوحة للمالك فيها التقارير وصلاحيات الموظفين.",
      "طلب أونلاين للاستلام والتوصيل، وصفحة اشتراك بخطط وإضافات.",
      "المنتج كله بالعربية، من اليمين لليسار، على أي حجم شاشة.",
    ],
    role: "أحد مطوّري React في الفريق: المكونات، وإدارة الحالة، والتنقل، وربط الشاشات بالـ API.",
    stack: ["React 19", "Vite", "Tailwind CSS", "React Router", "REST API (Laravel)"],
    shots: [
      { ...shots[0], alt: "شاشة المطبخ في menuPilot والطلبات مرتبة حسب حالتها", caption: "شاشة المطبخ" },
      { ...shots[1], alt: "منيو الزبون على الجوال بعد مسح رمز الطاولة", caption: "منيو الزبون من رمز الطاولة", short: "المنيو" },
      { ...shots[2], alt: "تتبع حي للطلب على الجوال", caption: "تتبع الطلب مباشرة", short: "التتبع" },
      { ...shots[3], alt: "طلب أونلاين للاستلام والتوصيل على الجوال", caption: "الطلب أونلاين", short: "أونلاين" },
      { ...shots[4], alt: "لوحة المالك بطلبات اليوم ومبيعاته", caption: "لوحة المالك" },
      { ...shots[5], alt: "شاشة الكاشير بالطاولات والفواتير", caption: "الكاشير والفواتير" },
    ],
  },
  projects: [
    { ...projectLinks[0], name: "Gaza OS", kind: "موقع فعالية «غزة تُبرمَج»", stack: "HTML، CSS، JavaScript",
      text: "نظام تشغيل تخيّلي داخل المتصفح لمبرمجي غزة الذين واصلوا كتابة الكود رغم كل شيء: Terminal يعمل، وملف لكل واحد من المبرمجين الخمسة عشر، ومفكرة، ووضعان فاتح وداكن. صُنع لفعالية PCIT × جامعة الأزهر." },
    { ...projectLinks[1], name: "NABTA", kind: "موقع استوديو", stack: "React، Vite، Tailwind CSS",
      text: "موقع فريق التطوير الذي أعمل معه، بالعربية. كل المحتوى في ملفات بيانات، لينتقل لاحقاً إلى واجهة Laravel البرمجية دون لمس المكونات." },
    { ...projectLinks[2], name: "AMK Store", kind: "متجر إلكتروني من الصفر", stack: "HTML، CSS، JavaScript، Bootstrap",
      text: "واجهة متجر بسلة جانبية تحفظ مجموعها، وصفحات لتفاصيل المنتج، وصفحة سلة كاملة، وصفحتا القصة والتواصل. JavaScript خالص بلا إطار عمل." },
    { ...projectLinks[3], name: "EVAN Restaurant", kind: "موقع مطعم", stack: "HTML، CSS، JavaScript",
      text: "موقع مطعم وصالة، مبني حول نظام الطاولات الذكي الخاص به." },
    { ...projectLinks[4], name: "مغامرة الهاء الخارقة", kind: "لعبة أسئلة عربية", stack: "HTML، CSS، JavaScript",
      text: "لعبة أسئلة بالعربية بمؤقت: ثلاثة مستويات، و60 ثانية، ونقاط تتجمع، وأفضل نتيجة." },
  ],
  principles: [
    { title: "الشاشة تقول الحقيقة", text: "الأسعار والصلاحيات وحالات الطلب تأتي من الخادم. الواجهة تعكسها ولا تخمّن، فما يراه الفريق هو ما سيفعله النظام." },
    { title: "مصممة لساعة الذروة، لا للعرض", text: "أزرار كبيرة سهلة اللمس، وحالات تُقرأ من آخر المطبخ، ومسارات تصمد أمام اتصال بطيء. أيدٍ مشغولة، لا مكتب مثالي." },
    { title: "العربية أولاً، من اليمين لليسار", text: "تخطيطات تعمل في الاتجاهين منذ البداية، بمحتوى عربي حقيقي، لا ترجمة لاحقة." },
  ],
};

export const content = { en, ar };

/* Interface words: buttons, titles, labels. */
export const ui = {
  en: {
    pageTitle: "Ahmed Alkahlout — React frontend developer",
    skip: "Skip to content",
    sections: { top: "Home", try: "Try it", work: "menuPilot", projects: "Projects", about: "About", contact: "Contact" },
    dock: "Dock",
    menubar: { available: "Available for work", city: "Gaza", cityTitle: "Local time in Gaza", search: "Search", searchLabel: "Search the portfolio", toDark: "Switch to the dark theme", toLight: "Switch to the light theme", otherLang: "العربية", toOtherLang: "Switch to Arabic" },
    window: { fold: (t) => `Fold ${t}`, open: (t) => `Open ${t}`, full: (t) => `Open ${t} full screen`, leave: "Leave full screen" },
    info: { title: "Get Info", role: "Role", education: "Education", educationValue: "Software Engineering, fourth year", training: "Training", trainingValue: (h, at) => `${h} hours at ${at}`, location: "Location", status: "Status", email: "Email me", work: "See my work" },
    kitchen: {
      title: "Kitchen.app — live demo", note: "A working miniature of the kitchen screen in menuPilot, the product I build with my team. Add a dish and send it.",
      aria: "Interactive demo: a kitchen order screen", table: (n) => `Table ${n}`, hint: "Add a dish, then send it",
      dishes: { falafel: "Falafel wrap", shakshuka: "Shakshuka", lemonade: "Mint lemonade" },
      columns: { new: "New", preparing: "Preparing", ready: "Ready" }, emptyNew: "Sent orders land here.", empty: "Nothing here yet.",
      send: (total) => `Send to kitchen · €${total}`, full: "Kitchen is full, serve a ticket", addFirst: "Add a dish first", serve: "Serve",
      add: (d) => `Add one ${d}`, remove: (d) => `Remove one ${d}`, qty: (d) => `${d} quantity`,
      sent: (n) => `Order ${n} sent to the kitchen.`, ready: (n) => `Order ${n} is ready.`,
    },
    tryIt: {
      scan: "Scan.app — open menuPilot on your phone", phone: "Phone.app — what the guest sees", loading: "Loading the 3D code…",
      flatten: "Flatten to scan", back: "Back to 3D", hint3d: "Move over the code, then flatten it to scan.", hintFlat: "Point your phone camera at the code to open menuPilot.",
      qrAria: "A 3D QR code made of cubes that opens menuPilot", qrFlatAria: "QR code that opens menuPilot",
      phoneHint: "Tap the phone to change the screen.", phoneGroup: "Phone screen", phoneAria: (c) => `Showing ${c}. Show the next screen`,
    },
    work: { title: "menuPilot — case study", tabs: { overview: "Overview", built: "What we built", screens: "Screens" }, tabsLabel: "menuPilot sections", problem: "The problem", part: "My part", builtWith: "Built with", builtTitle: "What we built", try: "Try menuPilot", code: "Read the code", instagram: "Instagram" },
    projects: { title: (n) => `Projects — ${n} items`, heading: "More work", favourites: "Favourites", filterLabel: "Filter projects", all: "All projects", live: "Live demos", open: "Open source", name: "Name", about: "About", stack: "Built with", links: "Links", openLink: "Open", codeLink: "Code", soon: "Soon" },
    about: { comma: ",", title: "About me", tools: "Tools I use", training: "Training", provider: (p) => `At ${p.name}, the ${p.fullName}, with trainer ${p.trainer}.`, hours: "h", certificate: "View certificate", notes: "Notes — How I work", place: (l) => `Based in ${l}, working remotely.` },
    mail: { title: "New Message", to: "To", subject: "Subject", subjectValue: "Project inquiry", heading: "Have a product that needs a careful frontend?", lead: "Tell me what you are building and where it hurts.", send: "Send email", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub" },
    spotlight: { label: "Search the portfolio", placeholder: "Search sections, projects, contact", results: "Results", noMatch: 'No match. Try "menuPilot", "Gaza" or "email".', section: "Section", liveProduct: "Live product", code: "Code", profile: "Profile", emailMe: "Email Ahmed", certificate: "View certificate", theme: "Switch theme", language: "التبديل إلى العربية", languageHint: "Language" },
    footer: "Built with React and Vite. Source on GitHub",
  },
  ar: {
    pageTitle: "أحمد الكحلوت — مطوّر واجهات React",
    skip: "تخطَّ إلى المحتوى",
    sections: { top: "الرئيسية", try: "جرّبه", work: "menuPilot", projects: "المشاريع", about: "عنّي", contact: "تواصل" },
    dock: "شريط التطبيقات",
    menubar: { available: "متاح للعمل", city: "غزة", cityTitle: "التوقيت المحلي في غزة", search: "بحث", searchLabel: "ابحث في الموقع", toDark: "التبديل إلى الوضع الداكن", toLight: "التبديل إلى الوضع الفاتح", otherLang: "English", toOtherLang: "التبديل إلى الإنجليزية" },
    window: { fold: (t) => `طيّ ${t}`, open: (t) => `فتح ${t}`, full: (t) => `فتح ${t} ملء الشاشة`, leave: "الخروج من ملء الشاشة" },
    info: { title: "معلومات", role: "الدور", education: "الدراسة", educationValue: "هندسة البرمجيات، السنة الرابعة", training: "التدريب", trainingValue: (h, at) => `${h} ساعة في ${at}`, location: "المكان", status: "الحالة", email: "راسلني", work: "شاهد أعمالي" },
    kitchen: {
      title: "Kitchen.app — عرض حي", note: "نسخة مصغّرة تعمل من شاشة المطبخ في menuPilot، المنتج الذي أبنيه مع فريقي. أضف طبقاً وأرسله.",
      aria: "عرض تفاعلي: شاشة طلبات المطبخ", table: (n) => `طاولة ${n}`, hint: "أضف طبقاً، ثم أرسله",
      dishes: { falafel: "ساندويش فلافل", shakshuka: "شكشوكة", lemonade: "ليمون بالنعناع" },
      columns: { new: "جديد", preparing: "قيد التحضير", ready: "جاهز" }, emptyNew: "تصل الطلبات المرسلة هنا.", empty: "لا شيء بعد.",
      send: (total) => `أرسل للمطبخ · €${total}`, full: "المطبخ ممتلئ، قدّم طلباً", addFirst: "أضف طبقاً أولاً", serve: "قدّم",
      add: (d) => `أضف ${d}`, remove: (d) => `أزل ${d}`, qty: (d) => `كمية ${d}`,
      sent: (n) => `أُرسل الطلب ${n} إلى المطبخ.`, ready: (n) => `الطلب ${n} جاهز.`,
    },
    tryIt: {
      scan: "Scan.app — افتح menuPilot بجوالك", phone: "Phone.app — ما يراه الزبون", loading: "جارٍ تحميل الرمز ثلاثي الأبعاد…",
      flatten: "سطّحه للمسح", back: "عودة إلى 3D", hint3d: "مرّر المؤشر فوق الرمز، ثم سطّحه لتمسحه.", hintFlat: "وجّه كاميرا جوالك نحو الرمز لتفتح menuPilot.",
      qrAria: "رمز QR ثلاثي الأبعاد من مكعبات يفتح menuPilot", qrFlatAria: "رمز QR يفتح menuPilot",
      phoneHint: "اضغط على الجوال لتغيير الشاشة.", phoneGroup: "شاشة الجوال", phoneAria: (c) => `المعروض: ${c}. اعرض الشاشة التالية`,
    },
    work: { title: "menuPilot — دراسة حالة", tabs: { overview: "نظرة عامة", built: "ما بنيناه", screens: "الشاشات" }, tabsLabel: "أقسام menuPilot", problem: "المشكلة", part: "دوري", builtWith: "التقنيات", builtTitle: "ما بنيناه", try: "جرّب menuPilot", code: "اقرأ الكود", instagram: "إنستغرام" },
    projects: { title: (n) => `المشاريع — ${n} مشاريع`, heading: "أعمال أخرى", favourites: "المفضلة", filterLabel: "تصفية المشاريع", all: "كل المشاريع", live: "عروض حية", open: "مفتوحة المصدر", name: "الاسم", about: "الوصف", stack: "التقنيات", links: "الروابط", openLink: "افتح", codeLink: "الكود", soon: "قريباً" },
    about: { comma: "،", title: "عنّي", tools: "أدواتي", training: "التدريب", provider: (p) => `في ${p.name}، ${p.fullName}، مع المدرّب ${p.trainer}.`, hours: "ساعة", certificate: "عرض الشهادة", notes: "ملاحظات — طريقتي في العمل", place: (l) => `أقيم في ${l}، وأعمل عن بُعد.` },
    mail: { title: "رسالة جديدة", to: "إلى", subject: "الموضوع", subjectValue: "استفسار عن مشروع", heading: "عندك منتج يحتاج واجهة مدروسة؟", lead: "أخبرني ماذا تبني، وأين تواجه الصعوبة.", send: "أرسل بريداً", whatsapp: "واتساب", linkedin: "LinkedIn", github: "GitHub" },
    spotlight: { label: "ابحث في الموقع", placeholder: "ابحث في الأقسام والمشاريع والتواصل", results: "النتائج", noMatch: "لا نتائج. جرّب «menuPilot» أو «غزة» أو «راسل».", section: "قسم", liveProduct: "منتج حي", code: "كود", profile: "ملف", emailMe: "راسل أحمد", certificate: "عرض الشهادة", theme: "تبديل الوضع الفاتح والداكن", language: "Switch to English", languageHint: "اللغة" },
    footer: "مبني بـ React وVite. الكود على GitHub",
  },
};
