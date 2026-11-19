export const PROFILE = {
  name: "Anirudh Kaplish",
  title: "Full-Stack Developer",
  titles: ["FULL-STACK DEVELOPER", "DATA & ANALYTICS", "AI-DRIVEN SYSTEMS"],
  bio: "Computer Science undergraduate building full-stack and data-driven products with React, Node.js and SQL, with a growing focus on AI.",
  social: {
    github: "https://github.com/AnirudhKaplish",
    linkedin: "https://www.linkedin.com/in/anirudhkaplish/",
    instagram: "https://www.instagram.com/_akneerude/",
    email: "mailto:anirudh23.dev@gmail.com"
  },
  about: "I am a Computer Science undergraduate at VIT Chennai (CGPA 8.09) who builds full-stack applications and data pipelines. I design relational schemas, automate data ingestion, and ship React and Node.js products, and I have applied AI to personalization and screening problems. I am looking for analytics, consulting and software roles where careful data work and clean engineering both matter.",
  stats: [
    { label: "Projects Built", value: "12+" },
    { label: "Internships", value: "3" },
    { label: "DSA Problems", value: "170+" },
    { label: "CGPA", value: "8.09" },
    { label: "Leadership Roles", value: "1" }
  ]
};

export const SKILLS = [

  // 🎨 Frontend - The Interface (UI/UX, visuals, user interaction)
  { id: "react", name: "React + Vite", category: "frontend", level: 90, version: "18+", desc: "Component-based UI, Hooks, State Management" },
  { id: "javascript", name: "JavaScript", category: "frontend", level: 88, version: "ES6+", desc: "Async Programming, DOM, APIs" },
  { id: "typescript", name: "TypeScript", category: "frontend", level: 88, version: "5+", desc: "Type-safe architecture" },
  { id: "nextjs", name: "Next.js", category: "frontend", level: 85, version: "15+", desc: "SSR, Edge Functions" },
  { id: "html", name: "HTML5", category: "frontend", level: 95, version: "5", desc: "Semantic structure, accessibility" },
  { id: "css", name: "CSS3", category: "frontend", level: 90, version: "3", desc: "Responsive design, Flexbox, Grid" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", level: 95, version: "3+", desc: "Utility-first styling, design systems" },
  { id: "threejs", name: "Three.js / R3F", category: "frontend", level: 65, version: "r170", desc: "3D visuals, WebGL" },

  // ⚙️ Backend - The Logic (APIs, authentication, server-side systems)
  { id: "nodejs", name: "Node.js", category: "backend", level: 75, version: "18+", desc: "REST APIs, backend logic" },
  { id: "express", name: "Express.js", category: "backend", level: 75, version: "4+", desc: "Middleware, routing, auth systems" },
  { id: "fastapi", name: "FastAPI", category: "backend", level: 72, version: "latest", desc: "High-performance async APIs" },
  { id: "restapi", name: "REST APIs", category: "backend", level: 70, desc: "API design & integration" },
  { id: "jwt", name: "JWT Auth", category: "backend", level: 75, desc: "Authentication & role-based access" },

  // 🤖 AI/ML - The Intelligence (models, deep learning, LLMs)
  { id: "pytorch", name: "PyTorch", category: "ai", level: 85, version: "2+", desc: "Deep learning, custom architectures" },
  { id: "transformers", name: "Transformers (HF)", category: "ai", level: 82, version: "4+", desc: "LLMs, BERT, GPT, LoRA" },

  // 📊 Data Science - The Insight Layer (analysis, visualization, dashboards)
  { id: "pandas", name: "Pandas", category: "data", level: 85, version: "2+", desc: "Data manipulation, analysis" },
  { id: "matplotlib", name: "Matplotlib / Seaborn", category: "data", level: 90, version: "3+", desc: "Scientific visualization" },
  { id: "tableau", name: "Tableau", category: "data", level: 80, version: "latest", desc: "Visual analytics dashboards" },

  // 🧰 DevOps & Tools - The Infrastructure (deployment, scaling, workflows)
  { id: "docker", name: "Docker", category: "devops", level: 75, version: "latest", desc: "Containerization, microservices" },
  { id: "kubernetes", name: "Kubernetes", category: "devops", level: 55, version: "latest", desc: "Orchestration, scaling" },
  { id: "aws", name: "AWS", category: "devops", level: 75, version: "latest", desc: "EC2, Lambda, SageMaker" },
  { id: "git", name: "Git & GitHub", category: "devops", level: 90, desc: "Version control, collaboration" },
  { id: "figma", name: "Figma", category: "design", level: 98, version: "latest", desc: "UI/UX design, prototyping" },

  // 🧩 Core - The Foundation (languages, databases, fundamentals)
  { id: "python", name: "Python", category: "core", level: 88, version: "3+", desc: "Algorithms, scripting, ML" },
  { id: "cpp", name: "C++", category: "core", level: 90, version: "C++20", desc: "DSA, performance optimization" },
  { id: "java", name: "Java", category: "core", level: 95, version: "17", desc: "OOP, backend fundamentals" },
  { id: "sql", name: "SQL / NoSQL", category: "core", level: 85, desc: "Postgres, MongoDB, queries" },
  { id: "mongodb", name: "MongoDB", category: "core", level: 85, version: "6+", desc: "NoSQL database, schema design" }

];

export const PROJECTS = [
  {
    "id": "p1",
    "title": "SwiftMile – Last-Mile Delivery Management Platform",
    "desc": "A Next.js logistics platform for Indian delivery networks: dynamic rate calculation, zone-level routing, courier dispatch and role-based workspaces for customers, agents and admins.",
    "details": [
      "Built a dynamic-pricing and zone-routing engine that uses delivery-zone and demand data to drive fleet-assignment decisions.",
      "Modelled the order lifecycle and consignment tracking with Prisma, using metric units and INR billing.",
      "Separate customer, agent and admin workspaces enforced with role-based access control.",
      "Documented the architecture in a written system-design file."
    ],
    "tech": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "RBAC"
    ],
    "domain": "Logistics / Full Stack",
    "featured": true,
    "type": "product",
    "image": "projects/swiftmile.webp",
    "github": "https://github.com/AnirudhKaplish/swiftmile-last-mile-delivery-platform"
  },
  {
    "id": "p2",
    "title": "VoiceCart – Voice Command Shopping Assistant",
    "desc": "A voice-first grocery list app: say what you need and it parses items, quantities and categories, then suggests replenishments from your history.",
    "details": [
      "Natural-language command parsing for adding, removing and changing items, with multi-item commands.",
      "Smart suggestions based on weekly routine and seasonal items, plus history and reorder.",
      "Falls back to typed commands where the Web Speech API is unavailable.",
      "Covered by an automated test suite (28 passing tests)."
    ],
    "tech": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Web Speech API",
      "Vitest"
    ],
    "domain": "Consumer / AI",
    "featured": true,
    "type": "product",
    "image": "projects/voicecart.webp",
    "github": "https://github.com/AnirudhKaplish/VoiceCart"
  },
  {
    "id": "p3",
    "title": "SAFE-MIND – Consent-Gated Depression Risk Screening",
    "desc": "A research framework that screens a person's own posts for depression risk only with their permission, using a smart contract for consent and two models that must agree before a result is shown.",
    "details": [
      "A smart contract records consent and blocks all processing the moment it is revoked.",
      "A TF-IDF + Logistic Regression baseline and a fine-tuned BERT model are combined; disagreements are flagged for human review.",
      "Explanations show which words pushed the result either way, using LIME and exact baseline contributions.",
      "Flask clinician dashboard with a robot digital-twin integration."
    ],
    "tech": [
      "Python",
      "BERT",
      "scikit-learn",
      "LIME",
      "Solidity",
      "Flask"
    ],
    "domain": "AI / Privacy",
    "featured": true,
    "type": "research",
    "image": "projects/safemind.webp",
    "github": "https://github.com/AnirudhKaplish/safe-mind"
  },
  {
    "id": "p4",
    "title": "GymPass Prime – One Pass, Every Gym",
    "desc": "A gym-membership platform where members use QR access keys, buy hourly or time-based passes and find nearby gyms, while owners approve cash or UPI payments.",
    "details": [
      "QR sign-in and sign-out that counts only the hours actually spent inside.",
      "Prepaid hourly, monthly and yearly passes with expiry reminders.",
      "Go backend with GORM, a Next.js 16 / React 19 frontend and a mobile client.",
      "Docker Compose setup and a deployment guide."
    ],
    "tech": [
      "Go",
      "Next.js",
      "React",
      "GORM",
      "SQLite",
      "Docker"
    ],
    "domain": "Fitness / Full Stack",
    "featured": true,
    "type": "product",
    "image": "projects/gympass.webp",
    "github": "https://github.com/AnirudhKaplish/GymPass"
  },
  {
    "id": "p5",
    "title": "Postboard – Community Board",
    "desc": "A small full-stack community board where people sign up, publish posts, like them and comment. Runs on SQLite locally and switches to Postgres with one environment variable.",
    "details": [
      "React 19 frontend with Express 5 and Sequelize on the backend, using JWT authentication.",
      "One Express app that runs locally, in Docker and as a single Vercel serverless function.",
      "Continuous integration, a written PRD and a case study documenting the trade-offs.",
      "Seed script with demo users and posts for a one-command start."
    ],
    "tech": [
      "React",
      "Express",
      "Sequelize",
      "JWT",
      "PostgreSQL",
      "Docker"
    ],
    "domain": "Social / Full Stack",
    "featured": true,
    "type": "product",
    "image": "projects/postboard.webp",
    "github": "https://github.com/AnirudhKaplish/postboard"
  },
  {
    "id": "p6",
    "title": "QRify – Custom QR Code Generator",
    "desc": "A fast, no-signup QR code generator with custom colours, size, caption text and logo upload, plus a night mode. Live on GitHub Pages.",
    "details": [
      "Built with Next.js and React, exported as a static site and deployed with GitHub Actions.",
      "Live preview updates as you type, with adjustable size and separate QR, background and text colours.",
      "Supports logo upload and a caption under the code, and downloads the finished image."
    ],
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    "domain": "Utility / Frontend",
    "featured": false,
    "type": "product",
    "image": "projects/qrify.webp",
    "github": "https://github.com/AnirudhKaplish/qrify",
    "link": "https://anirudhkaplish.github.io/qrify/"
  },
  {
    "id": "p7",
    "title": "Campus Hiring Portal (CPMS)",
    "desc": "A full-stack placement management system for students, placement officers and management to run job postings, applications and recruiter approvals.",
    "details": [
      "Role-based authentication for students, recruiters and admins.",
      "Dashboards for job listings and real-time application-status tracking, reducing manual coordination.",
      "REST APIs and MongoDB schemas for postings, applications and approval workflows."
    ],
    "tech": [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS"
    ],
    "domain": "EdTech / Full Stack",
    "featured": false,
    "type": "product",
    "image": "projects/campushire.webp",
    "github": "https://github.com/AnirudhKaplish/CampusHire-Portal"
  },
  {
    "id": "p8",
    "title": "Re-Dish – Food Waste Management",
    "desc": "A platform connecting food donors with NGOs to cut food waste, with listing and claim flows and a token reward for donors.",
    "details": [
      "Donor and NGO flows for listing surplus food and claiming it.",
      "Role-based sign-in to keep the two workflows separate.",
      "Responsive Next.js interface built for use on any device."
    ],
    "tech": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js"
    ],
    "domain": "Social Impact / Full Stack",
    "featured": false,
    "type": "product",
    "image": "projects/redish.webp",
    "github": "https://github.com/AnirudhKaplish/Re-Dish"
  },
  {
    "id": "p9",
    "title": "Annapoorna – Surplus Food Redistribution",
    "desc": "An early food-waste project that moves surplus food from hotels to NGOs, with donor, NGO and admin pages and a chatbot.",
    "details": [
      "Separate donor, NGO, admin and profile pages.",
      "Chatbot and speech helper for guided donations.",
      "Built with plain HTML, CSS and JavaScript."
    ],
    "tech": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "domain": "Social Impact / Frontend",
    "featured": false,
    "type": "product",
    "image": "projects/annapoorna.webp",
    "github": "https://github.com/AnirudhKaplish/Annapoorna"
  },
  {
    "id": "p10",
    "title": "QR Code Generator (Flutter)",
    "desc": "A Material 3 mobile app that creates, styles and saves high-resolution QR codes from any text or URL.",
    "details": [
      "Custom dot, eye and background colours.",
      "Saves the finished QR code as an image.",
      "Clean Material 3 interface."
    ],
    "tech": [
      "Flutter",
      "Dart",
      "Material 3"
    ],
    "domain": "Mobile / Utility",
    "featured": false,
    "type": "module",
    "image": "projects/qrflutter.webp",
    "github": "https://github.com/AnirudhKaplish/qr_generator"
  },
  {
    "id": "p11",
    "title": "PrivGuard – Encrypted VPN Demo",
    "desc": "A small client and server that send messages over a socket, encrypted with a shared key, to show how a VPN tunnel protects data in transit.",
    "details": [
      "Flask web client that encrypts input before sending it.",
      "Python socket server that decrypts and responds with an encrypted reply.",
      "Built to learn symmetric encryption with Fernet."
    ],
    "tech": [
      "Python",
      "Flask",
      "Sockets",
      "Cryptography"
    ],
    "domain": "Security / Networking",
    "featured": false,
    "type": "module",
    "image": "projects/privguard.webp",
    "github": "https://github.com/AnirudhKaplish/PrivGuard"
  },
  {
    "id": "p12",
    "title": "Go To-Do App",
    "desc": "A task manager with a Go REST API and a plain JavaScript front end: add, edit, delete and complete tasks, drag to reorder, and toggle dark mode.",
    "details": [
      "RESTful Go API with persistent task storage.",
      "Drag-and-drop ordering and a dark mode toggle.",
      "Plain HTML, CSS and JavaScript front end."
    ],
    "tech": [
      "Go",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "domain": "Productivity / Backend",
    "featured": false,
    "type": "module",
    "image": "projects/todo.webp",
    "github": "https://github.com/AnirudhKaplish/to-do-list"
  },
  {
    "id": "p13",
    "title": "Dhanvantri – Healthcare Management System",
    "desc": "A digital healthcare platform for managing patient records, appointments and service coordination.",
    "details": [
      "Structured data storage for medical records.",
      "Backend APIs for patient and appointment data.",
      "Interface workflows designed around healthcare staff."
    ],
    "tech": [
      "HTML",
      "CSS",
      "JavaScript",
      "Backend APIs",
      "Database"
    ],
    "domain": "HealthTech",
    "featured": false,
    "type": "product",
    "image": "",
    "github": null
  },
  {
    "id": "p14",
    "title": "Authentication & Dashboard System",
    "desc": "A reusable module with JWT authentication, protected routes and role-based access control.",
    "details": [
      "JWT authentication with protected routes and middleware.",
      "Role-based access control for different user types.",
      "Frontend and backend integrated for secure session handling."
    ],
    "tech": [
      "Node.js",
      "Express.js",
      "JWT",
      "React"
    ],
    "domain": "Backend / Security",
    "featured": false,
    "type": "module",
    "image": "",
    "github": null
  }
];

export const TIMELINE = [
  {
    "id": "t1",
    "title": "Digital Marketing Intern",
    "org": "Tez Minds Software Pvt. Ltd.",
    "date": "Jul 2026 - Present",
    "desc": "• Conducting market and competitor research for digitalbusinesscard.pro, turning customer and market data into positioning and messaging insights.\n• Tracking campaign and engagement metrics to evaluate performance and guide data-driven decisions on channels and content.",
    "type": "work",
    "side": "right"
  },
  {
    "id": "t2",
    "title": "SDE Intern",
    "org": "Tez Minds Software Pvt. Ltd.",
    "date": "Jun 2026",
    "desc": "• Designed a relational database schema across 5 entities (users, sources, articles, briefs, feedback) with personalization fields, validated through sample-data query testing.\n• Built an automated, scheduled data-ingestion pipeline with content normalization, near-duplicate detection and rule-based topic categorization across multiple external sources, reducing manual effort through automation.\n• Integrated an AI-powered brief generation agent with a relevance-scoring engine and automated email delivery.",
    "type": "work",
    "side": "right"
  },
  {
    "id": "t3",
    "title": "Data Analytics Job Simulation",
    "org": "Deloitte (Forage)",
    "date": "Mar 2026",
    "desc": "Completed Deloitte's Data Analytics job simulation covering data analysis and forensic technology.",
    "type": "certification",
    "side": "left"
  },
  {
    "id": "t4",
    "title": "Full Stack Developer Intern",
    "org": "Upkarak Tech Solutions Pvt. Ltd.",
    "date": "Aug 2025 - Oct 2025",
    "desc": "• Designed and built RESTful API endpoints for a customer dashboard, writing unit and integration tests to ensure data accuracy and reliability.\n• Implemented JWT authentication and role-based access control (RBAC), enforcing access controls across multiple user roles.\n• Configured an automated CI pipeline and containerized the application with Docker for staging deployments.",
    "type": "work",
    "side": "right"
  },
  {
    "id": "t5",
    "title": "React Frontend Project",
    "org": "GreatStack",
    "date": "May 2025",
    "desc": "Completed a hands-on React frontend project course.",
    "type": "certification",
    "side": "left"
  },
  {
    "id": "t6",
    "title": "General Secretary",
    "org": "Wakhra Punjab, VIT Chennai",
    "date": "2024 - Present",
    "desc": "Leading planning and execution of club initiatives and cultural events, coordinating design and content teams, and managing multiple events during Vibrance and TechnoVIT, VIT Chennai's flagship cultural and technical fests.",
    "type": "leadership",
    "side": "left"
  },
  {
    "id": "t7",
    "title": "GenAI Hackathon Participant",
    "org": "Intel × KPR Institute of Engineering & Technology",
    "date": "Oct 2024",
    "desc": "Took part in a national-level Generative AI hackathon, building AI-driven solutions as part of a team.",
    "type": "achievement",
    "side": "right"
  },
  {
    "id": "t8",
    "title": "Data Structures & Algorithms",
    "org": "LeetCode",
    "date": "2024 - Present",
    "desc": "Solved 170+ problems across arrays, trees, graphs, dynamic programming and greedy algorithms.",
    "type": "achievement",
    "side": "left"
  },
  {
    "id": "t9",
    "title": "B.Tech in Computer Science & Engineering",
    "org": "Vellore Institute of Technology, Chennai",
    "date": "2023 - 2027",
    "desc": "Pursuing a B.Tech in Computer Science with a focus on full-stack development, data and software engineering. CGPA: 8.09 / 10.",
    "type": "education",
    "side": "left"
  }
];

export const PHILOSOPHY = [
  { title: "First Principles Thinking", desc: "Break problems down to fundamentals and build efficient, scalable solutions from the ground up." },
  { title: "User-Centric Design", desc: "Great products are built by combining clean UI/UX with powerful backend systems." },
  { title: "Continuous Learning", desc: "Technology evolves fast, and I believe in constantly learning, experimenting, and improving." },
  { title: "Scalable Systems", desc: "Design applications that are not just functional, but reliable and scalable for real-world usage." }
];

export const ROADMAP = [
  {
    "id": "r1",
    "title": "Land First Internships",
    "date": "Aug 2025 - Jun 2026",
    "desc": "Completed internships at Upkarak Tech Solutions (full stack) and Tez Minds (SDE), then moved into a digital marketing and research role at Tez Minds.",
    "status": "completed"
  },
  {
    "id": "r2",
    "title": "Ship Full-Stack Projects",
    "date": "2026",
    "desc": "Built and published SwiftMile, VoiceCart, GymPass and Postboard, and put QRify and this portfolio live on GitHub Pages.",
    "status": "completed"
  },
  {
    "id": "r3",
    "title": "Build AI-Integrated Projects",
    "date": "2026",
    "desc": "Delivered SAFE-MIND (BERT, LIME and blockchain consent), VoiceCart (voice commands) and an AI brief-generation agent at Tez Minds.",
    "status": "completed"
  },
  {
    "id": "r4",
    "title": "Break Into Data and Analytics Roles",
    "date": "2026 - 2027",
    "desc": "Build SQL, Python and dashboard depth, and apply for analytics, consulting and finance-reporting roles ahead of graduation.",
    "status": "in-progress"
  },
  {
    "id": "r5",
    "title": "Contribute to Open Source",
    "date": "2027",
    "desc": "Make first contributions to open-source projects and build a stronger public GitHub presence.",
    "status": "planned"
  }
];

export const BLOG_POSTS = [
  {
    "id": "b1",
    "title": "SAFE-MIND: Consent-Gated, Explainable Depression Screening",
    "date": "Oct 2026",
    "readTime": "5 min",
    "desc": "How a smart contract, two models that must agree and word-level explanations combine into a screening pipeline that stops the moment consent is revoked.",
    "tags": [
      "AI",
      "Privacy",
      "BERT"
    ],
    "link": "https://github.com/AnirudhKaplish/safe-mind#readme"
  },
  {
    "id": "b2",
    "title": "Postboard Case Study: One Express App for Local, Docker and Vercel",
    "date": "Oct 2026",
    "readTime": "4 min",
    "desc": "The trade-offs behind running SQLite locally and Postgres in production, and wrapping an Express app as a single serverless function.",
    "tags": [
      "Full Stack",
      "Express",
      "Vercel"
    ],
    "link": "https://github.com/AnirudhKaplish/postboard/blob/main/docs/CASE_STUDY.md"
  },
  {
    "id": "b3",
    "title": "SwiftMile System Design: Pricing, Zones and Dispatch",
    "date": "Aug 2026",
    "readTime": "4 min",
    "desc": "How rate calculation, zone detection, courier assignment and the order lifecycle fit together in a last-mile delivery platform.",
    "tags": [
      "System Design",
      "Next.js",
      "Prisma"
    ],
    "link": "https://github.com/AnirudhKaplish/swiftmile-last-mile-delivery-platform/blob/main/SYSTEM_DESIGN.md"
  }
];

export const SKILLS_CATEGORIES = [
  { id: "frontend", label: "Frontend Development", color: "green", order: 0 },
  { id: "backend", label: "Backend Development", color: "emerald", order: 1 },
  { id: "ai", label: "AI / Machine Learning", color: "cyan", order: 2 },
  { id: "data", label: "Data Science", color: "purple", order: 3 },
  { id: "devops", label: "DevOps / Cloud", color: "amber", order: 4 },
  { id: "core", label: "Core / Languages", color: "pink", order: 5 },
  { id: "design", label: "UI / UX Design", color: "rose", order: 6 }
];
