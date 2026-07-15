export const PROFILE = {
  name: "Anirudh Kaplish",
  title: "Tech Enthusiast",
  titles: ["UI/UX DESIGNER", "DATA SCIENTIST", "SOLUTIONS ARCHITECT", "FULLSTACK DEVELOPER"],
  bio: "Specializing in Frontend Development, Creative work and Codes.",
  social: {
    github: "https://github.com/AnirudhKaplish",
    linkedin: "https://www.linkedin.com/in/anirudhkaplish/",
    instagram: "https://www.instagram.com/_akneerude/",
    email: "mailto:anirudh23.dev@gmail.com"
  },
  about: "I am a passionate Full-Stack Developer with a growing interest in AI and intelligent systems. I specialize in building scalable web applications using modern technologies like React, Node.js, and MongoDB. I enjoy bridging clean UI/UX with efficient backend systems to create impactful, real-world solutions. Continuously learning and experimenting, I aim to evolve into an engineer who can design, build, and scale end-to-end systems.",
  stats: [
    { label: "Projects Built", value: "4+" },
    { label: "Full-Stack Apps", value: "3+" },
    { label: "DSA Problems", value: "150+" },
    { label: "Leadership Roles", value: "1" },
    { label: "Coffee/Day", value: "∞" }
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
    id: "p1",
    title: "Re-Dish – Food Waste Management System",
    desc: "A full-stack platform connecting food donors with NGOs to reduce food wastage through real-time listings and claim workflows.",
    details: [
      "Designed donor and NGO dashboards with real-time food listing and claim functionality.",
      "Implemented role-based authentication for secure access and workflow separation.",
      "Built responsive UI ensuring seamless usage across devices.",
      "Optimized backend APIs for efficient data handling and user interactions."
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Go"],
    domain: "Social Impact / Full Stack",
    github: "https://github.com/AnirudhKaplish",
    featured: true,
    type: "product"
  },
  {
    id: "p2",
    title: "Campus Hiring Portal",
    desc: "A full-stack recruitment platform streamlining job postings, applications, and recruiter approvals within a campus ecosystem.",
    details: [
      "Developed role-based authentication system for students, recruiters, and admins.",
      "Built dynamic dashboards for job listings and application tracking.",
      "Reduced manual coordination by digitizing the hiring workflow.",
      "Designed scalable backend using Node.js and MongoDB."
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    domain: "EdTech / Full Stack",
    github: "https://github.com/AnirudhKaplish",
    featured: true,
    type: "product"
  },
  {
    id: "p3",
    title: "Dhanvantri – Healthcare Management System",
    desc: "A digital healthcare platform for managing patient records, appointments, and service coordination.",
    details: [
      "Implemented structured data storage for efficient medical record management.",
      "Designed intuitive UI workflows to improve usability for healthcare staff.",
      "Developed backend APIs for handling patient and appointment data.",
      "Focused on clean architecture for maintainability and scalability."
    ],
    tech: ["HTML", "CSS", "JavaScript", "Backend APIs", "Database"],
    domain: "HealthTech",
    featured: false,
    type: "product"
  },
  {
    id: "p4",
    title: "Authentication & Dashboard System",
    desc: "A secure web application module implementing JWT-based authentication and role-based access control.",
    details: [
      "Built JWT authentication system with protected routes and middleware.",
      "Implemented role-based access control for different user types.",
      "Integrated frontend and backend for secure session handling.",
      "Applied best practices for API security and user data protection."
    ],
    tech: ["Node.js", "Express.js", "JWT", "React"],
    domain: "Backend / Security",
    featured: false,
    type: "module"
  }
];

export const TIMELINE = [
  {
    id: "t1",
    title: "Software Development Engineer Intern",
    org: "Tez Minds Software Pvt. Ltd.",
    date: "Jun 2026",
    desc: `• Designed a relational database schema across five core entities (users, sources, articles, briefs, and feedback) with personalization fields including interests, knowledge level, and topic preferences.
• Built an automated scheduled source-ingestion pipeline with content normalization, near-duplicate detection, and rule-based topic categorization across multiple external sources.
• Integrated an AI-powered brief generation agent with a relevance-scoring and personalization engine, connected the pipeline to automated email delivery, and performed end-to-end testing and bug fixes.`,
    type: "work",
    side: "right"
  },
  {
    id: "t2",
    title: "Full Stack Developer Intern",
    org: "Upkarak Tech Solutions Pvt. Ltd.",
    date: "Aug 2025 - Oct 2025",
    desc: `• Built reusable, responsive React.js components using Hooks and state management while designing RESTful Express.js/Node.js APIs for customer dashboards, improving overall application performance.
• Implemented JWT-based authentication and Role-Based Access Control (RBAC) using custom Express middleware to secure protected API routes across multiple user roles.
• Developed unit and integration test suites for backend APIs, configured an automated CI pipeline, and containerized the application using Docker for reliable staging deployments.`,
    type: "work",
    side: "right"
  },
  {
    id: "t3",
    title: "B.Tech in Computer Science",
    org: "Vellore Institute of Technology, Chennai",
    date: "2023 - 2027",
    desc: "Currently pursuing B.Tech in Computer Science with specialization in full-stack development, software engineering, and scalable system design. Current CGPA: 8.09.",
    type: "education",
    side: "left"
  },
  {
    id: "t4",
    title: "General Secretary",
    org: "Wakhra Punjab, VIT Chennai",
    date: "2024 - Present",
    desc: "Leading planning and execution of club initiatives, managing cross-functional teams, coordinating design and content activities, organizing large-scale cultural events, and overseeing social media branding.",
    type: "leadership",
    side: "left"
  },
  {
    id: "t5",
    title: "GenAI Hackathon Participant",
    org: "Intel × KPR Institute of Engineering & Technology",
    date: "2024",
    desc: "Participated in a national-level Generative AI hackathon, collaborating on innovative AI-driven solutions while gaining hands-on experience with emerging technologies.",
    type: "achievement",
    side: "right"
  },
  {
    id: "t6",
    title: "Full-Stack Projects Development",
    org: "Personal Projects",
    date: "2024 - Present",
    desc: "Developed multiple full-stack applications including Re-Dish, Campus Hiring Portal, and Healthcare Management System using React, Node.js, Express, MongoDB, and modern authentication techniques.",
    type: "work",
    side: "right"
  },
  {
    id: "t7",
    title: "Data Structures & Algorithms",
    org: "LeetCode",
    date: "2024 - Present",
    desc: "Solved 150+ coding problems covering arrays, trees, graphs, dynamic programming, greedy algorithms, and advanced data structures to strengthen problem-solving and interview preparation.",
    type: "achievement",
    side: "left"
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
    id: "r1",
    title: "Deploy Full-Stack Projects",
    date: "2026",
    desc: "Deploy projects like Re-Dish and Hiring Portal with production-ready architecture and live users.",
    status: "in-progress"
  },
  {
    id: "r2",
    title: "Crack SDE Internship",
    date: "2026",
    desc: "Strengthen DSA and system design to secure internship at a top product-based company.",
    status: "planned"
  },
  {
    id: "r3",
    title: "Build AI-Integrated Project",
    date: "2026",
    desc: "Develop a project integrating AI features like recommendation systems or chat-based assistants.",
    status: "planned"
  },
  {
    id: "r4",
    title: "Open Source Contribution",
    date: "2026",
    desc: "Contribute to open-source projects and build a strong GitHub presence.",
    status: "planned"
  }
];

export const BLOG_POSTS = [
  { 
    id: "b1", 
    title: "Building a Full-Stack Food Waste Management System (Re-Dish)", 
    date: "Jan 2026", 
    readTime: "5 min", 
    desc: "A deep dive into designing a full-stack platform connecting donors and NGOs with role-based authentication and real-time workflows.", 
    tags: ["Full Stack", "Node.js", "MongoDB"],
    link: "#" 
  },
  { 
    id: "b2", 
    title: "Implementing JWT Authentication in Node.js", 
    date: "Dec 2025", 
    readTime: "4 min", 
    desc: "Step-by-step guide to building secure authentication and role-based access control using JWT and Express middleware.", 
    tags: ["Backend", "Security", "JWT"],
    link: "#" 
  },
  { 
    id: "b3", 
    title: "Designing Scalable Dashboards with React", 
    date: "Nov 2025", 
    readTime: "6 min", 
    desc: "Best practices for building responsive and maintainable dashboards using React and modern UI patterns.", 
    tags: ["React", "Frontend", "UI/UX"],
    link: "#" 
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
