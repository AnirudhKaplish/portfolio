// Load environment variables
import 'dotenv/config';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DATA FROM portfolio.ts
const PROFILE = {
  name: "Anirudh Kaplish",
  title: "Tech Enthusiast",
  titles: ["UI/UX DESIGNER", "DATA SCIENTIST", "SOLUTIONS ARCHITECT", "FULLSTACK DEVELOPER"],
  bio: "I’m a full-stack developer passionate about building scalable and user-centric applications. With experience in React, Node.js, and database systems, I develop end-to-end solutions that solve real-world problems. I enjoy designing clean interfaces, implementing secure backend systems, and continuously exploring new technologies to improve performance and impact.",
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
    { label: "DSA Problems", value: "15+" },
    { label: "Leadership Roles", value: "1" },
    { label: "Coffee/Day", value: "∞" }
  ]
};

const SKILLS = [
  { id: "react", name: "React.js", category: "dev", level: 85, version: "18+", desc: "Component-based UI, Hooks, State Management" },
  { id: "javascript", name: "JavaScript", category: "dev", level: 88, version: "ES6+", desc: "Async Programming, DOM, APIs" },
  { id: "nodejs", name: "Node.js", category: "dev", level: 85, version: "18+", desc: "REST APIs, Backend Logic" },
  { id: "express", name: "Express.js", category: "dev", level: 85, version: "4+", desc: "Middleware, Routing, Auth Systems" },
  { id: "html", name: "HTML5", category: "dev", level: 95, version: "5", desc: "Semantic Structure, Accessibility" },
  { id: "css", name: "CSS3", category: "dev", level: 90, version: "3", desc: "Responsive Design, Flexbox, Grid" },
  { id: "tailwind", name: "Tailwind CSS", category: "dev", level: 90, version: "3+", desc: "Utility-first styling, UI systems" },
  { id: "mongodb", name: "MongoDB", category: "core", level: 85, version: "6+", desc: "NoSQL Database, Schema Design" },
  { id: "sql", name: "SQL", category: "core", level: 80, version: "Standard", desc: "Relational DB, Queries, Joins" },
  { id: "cpp", name: "C++", category: "core", level: 75, version: "C++17", desc: "DSA, Problem Solving" },
  { id: "java", name: "Java", category: "core", level: 75, version: "17", desc: "OOP, Backend Fundamentals" },
  { id: "python", name: "Python", category: "core", level: 70, version: "3+", desc: "Scripting, Basics of ML" },
  { id: "git", name: "Git & GitHub", category: "tools", level: 85, version: "Latest", desc: "Version Control, Collaboration" },
  { id: "docker", name: "Docker", category: "tools", level: 70, version: "Latest", desc: "Basic Containerization" },
  { id: "figma", name: "Figma", category: "design", level: 85, version: "Latest", desc: "UI/UX Design, Prototyping" },
  { id: "jwt", name: "JWT Auth", category: "dev", level: 85, desc: "Authentication & Role-Based Access" },
  { id: "restapi", name: "REST APIs", category: "dev", level: 90, desc: "API Design & Integration" }
];

const PROJECTS = [
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

const TIMELINE = [
  {
    id: "t1",
    title: "Full Stack Developer Intern",
    org: "Upkarak Tech Solutions Pvt. Ltd.",
    date: "2025",
    desc: "Developed responsive React components and RESTful APIs using Node.js. Implemented JWT-based authentication and role-based access control, and optimized application performance. Worked with Docker and CI pipelines for deployment workflows.",
    type: "work",
    side: "right"
  },
  {
    id: "t2",
    title: "B.Tech in Computer Science (3rd Year)",
    org: "Vellore Institute of Technology, Chennai",
    date: "2023 - 2027",
    desc: "Currently pursuing Computer Science with focus on full-stack development, system design, and scalable applications. GPA: 8.06.",
    type: "education",
    side: "left"
  },
  {
    id: "t3",
    title: "GenAI Hackathon Participant",
    org: "Intel × KPR Institute of Engineering & Technology",
    date: "2024",
    desc: "Participated in a national-level hackathon exploring Generative AI concepts and real-world problem solving.",
    type: "achievement",
    side: "right"
  },
  {
    id: "t4",
    title: "General Secretary",
    org: "Wakhra Punjab, VIT Chennai",
    date: "2024 - Present",
    desc: "Leading planning and execution of club initiatives and cultural events. Managed teams, coordinated content/design workflows, and handled large-scale event operations.",
    type: "leadership",
    side: "left"
  },
  {
    id: "t5",
    title: "Full-Stack Projects Development",
    org: "Personal Projects",
    date: "2024 - Present",
    desc: "Built multiple full-stack applications including a Campus Hiring Portal, Healthcare Management System, and Food Waste Management platform with authentication, dashboards, and scalable backend systems.",
    type: "project",
    side: "right"
  },
  {
    id: "t6",
    title: "Data Structures & Algorithms",
    org: "LeetCode Practice",
    date: "2024 - Present",
    desc: "Solved 70+ DSA problems focusing on problem-solving, optimization, and coding interview preparation.",
    type: "learning",
    side: "left"
  }
];

const PHILOSOPHY = [
  { title: "First Principles Thinking", desc: "Break problems down to fundamentals and build efficient, scalable solutions from the ground up." },
  { title: "User-Centric Design", desc: "Great products are built by combining clean UI/UX with powerful backend systems." },
  { title: "Continuous Learning", desc: "Technology evolves fast, and I believe in constantly learning, experimenting, and improving." },
  { title: "Scalable Systems", desc: "Design applications that are not just functional, but reliable and scalable for real-world usage." }
];

const ROADMAP = [
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

const BLOG_POSTS = [
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

async function migrate() {
    console.log("🚀 Starting Migration...");
    
    try {
        // Sign in anonymously to avoid auth issues if rules are open, or use hardcoded creds if needed.
        // For now we assume test mode / open rules or anon access enabled.
        // await signInAnonymously(auth); 
        // OR just proceed if rules allow public write.
        
        const batch = writeBatch(db);

        // 1. PROFILE (Single Document)
        console.log("Processing Profile...");
        const profileRef = doc(db, "portfolio", "profile");
        batch.set(profileRef, PROFILE);

        // 2. SKILLS (Collection)
        console.log("Processing Skills...");
        SKILLS.forEach(skill => {
            const ref = doc(db, "skills", skill.id);
            batch.set(ref, skill);
        });

        // 3. PROJECTS (Collection)
        console.log("Processing Projects...");
        PROJECTS.forEach(proj => {
            const ref = doc(db, "projects", proj.id);
            batch.set(ref, proj);
        });

        // 4. TIMELINE (Collection - Experience, Achievements, Resume)
        console.log("Processing Timeline...");
        TIMELINE.forEach(item => {
            const ref = doc(db, "timeline", item.id);
            batch.set(ref, item);
        });
        
        // 5. ROADMAP (Collection)
        console.log("Processing Roadmap...");
        ROADMAP.forEach(item => {
            const ref = doc(db, "roadmap", item.id);
            batch.set(ref, item);
        });

        // 6. PHILOSOPHY (Collection - using index as ID since no explicit ID)
        console.log("Processing Philosophy...");
        PHILOSOPHY.forEach((item, i) => {
            const ref = doc(db, "philosophy", `val_${i}`);
            batch.set(ref, item);
        });

        // 7. WRITINGS/BLOG (Collection)
        console.log("Processing Writings...");
        BLOG_POSTS.forEach(post => {
            const ref = doc(db, "writings", post.id);
            batch.set(ref, post);
        });

        console.log("Committing Batch...");
        await batch.commit();
        console.log("✅ Migration Complete!");
        process.exit(0);

    } catch (e) {
        console.error("❌ Migration Failed:", e);
        process.exit(1);
    }
}

migrate();
