export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'code'; lang?: string; text: string }
  | { type: 'list'; items: string[] };

export interface Post {
  slug: string;
  title: string;
  date: string;
  sortKey: string;
  readTime: string;
  summary: string;
  tags: string[];
  blocks: PostBlock[];
}

export const POSTS: Post[] = [
  {
    slug: 'portfolio-went-blank',
    title: 'My portfolio went blank when Firebase failed. Here is how I fixed it.',
    date: 'Nov 2026',
    sortKey: '2026-11-19',
    readTime: '4 min',
    summary: 'A bug hunt on my own site: a skip-intro loop, a null auth crash, a blank page on unknown URLs and a script loaded from a CDN.',
    tags: ['React', 'Firebase', 'Debugging'],
    blocks: [
      { type: 'p', text: 'I asked for a bug audit of my own portfolio and expected a few CSS nits. What I found was a chain of small assumptions that each looked harmless and together could turn the whole site into a blank page.' },
      { type: 'h', text: 'The skip-intro loop' },
      { type: 'p', text: 'Clicking "Skip intro" worked, until you reloaded or opened a deep link. The intro came back every time. The cause was simple: whether the intro had been seen lived only in React state, so any reload reset it.' },
      { type: 'code', lang: 'tsx', text: "const [introSeen, setIntroSeen] = useState<boolean>(() => {\n  try { return sessionStorage.getItem('intro-seen') === '1'; }\n  catch { return false; }\n});" },
      { type: 'p', text: 'The try/catch matters. Storage can throw in private modes and embedded browsers, and a visual nicety should never be able to crash the page.' },
      { type: 'h', text: 'Assuming the backend is always there' },
      { type: 'p', text: 'The site initialised Firebase at import time and then called signOut on the auth object during the terminal boot. If Firebase was missing a key or failed to start, auth was null, the call threw, and React unmounted everything. Nothing about the portfolio content actually needs Firebase, so a failed backend should have cost me nothing.' },
      { type: 'list', items: [
        'Wrap initialisation in try/catch and export a firebaseReady flag.',
        'Make every hook return its local fallback data when the flag is false.',
        'Guard every direct call to auth with a check before using it.',
      ] },
      { type: 'h', text: 'Two smaller ones' },
      { type: 'p', text: 'An unknown URL rendered nothing at all, because no route matched. A catch-all route that redirects home fixed that. The resume viewer loaded its PDF worker from a public CDN over plain http, which is a needless external dependency; bundling the worker with new URL(..., import.meta.url) removed it.' },
      { type: 'h', text: 'What I took from it' },
      { type: 'p', text: 'Treat every optional dependency as optional in code, not just in your head. I now test the build with deliberately broken environment values before shipping, because that is the failure my visitors would actually meet.' },
    ],
  },
  {
    slug: 'nextjs-static-export-github-pages',
    title: 'Putting Next.js apps on GitHub Pages: base paths, images and CI',
    date: 'Nov 2026',
    sortKey: '2026-11-12',
    readTime: '5 min',
    summary: 'What I learned moving QRify, VoiceCart and Re-Dish off Vercel and onto free GitHub Pages hosting.',
    tags: ['Next.js', 'GitHub Pages', 'CI'],
    blocks: [
      { type: 'p', text: 'I moved several of my projects from Vercel to GitHub Pages so every demo lives next to its code at a predictable github.io address. Pages serves plain static files, which changes a few things you normally never think about.' },
      { type: 'h', text: 'A project site lives under a path' },
      { type: 'p', text: 'A repo named qrify is served at /qrify, not at the domain root. So the app needs a base path, and anything that hard-codes a leading slash breaks. Regular framework links and the framework image component pick up the base path for you. A raw img tag does not.' },
      { type: 'code', lang: 'tsx', text: "const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';\n<img src={`${base}/logo.png`} alt=\"Logo\" />" },
      { type: 'p', text: 'I set that environment variable in the build step so local development keeps working with an empty value.' },
      { type: 'h', text: 'Deploy with Actions, not a branch' },
      { type: 'p', text: 'Setting the Pages source to GitHub Actions gives you one workflow that builds and publishes. I made the same workflow build on pull requests but skip the deploy step, so a broken change fails in review instead of on the live site.' },
      { type: 'h', text: 'Single-page apps and the 404 trick' },
      { type: 'p', text: 'Pages has no rewrite rules, so opening a deep link of a React router app returns a 404. Copying index.html to 404.html in the build step makes Pages serve the app for unknown paths, and the router takes over from there.' },
      { type: 'h', text: 'Which projects cannot move' },
      { type: 'p', text: 'Anything that needs a server, such as a database or an API, cannot run on static hosting. Those projects keep a GitHub link only, and I say so on their cards rather than showing a dead demo.' },
    ],
  },
  {
    slug: 'rebranding-an-mit-project-honestly',
    title: 'Rebranding an open-source project without erasing its author',
    date: 'Nov 2026',
    sortKey: '2026-11-05',
    readTime: '4 min',
    summary: 'How I turned the MIT-licensed PhoneBox into DeskDeck while keeping the licence, the credit and my own work clearly separate.',
    tags: ['Open Source', 'Licensing', 'Android'],
    blocks: [
      { type: 'p', text: 'DeskDeck started as PhoneBox, an MIT-licensed app that turns an old Android phone into a desk dashboard for your PC. I wanted to make it mine: a new look, new features and a name that fits. Doing that properly is mostly about being clear on what you may change and what you must keep.' },
      { type: 'h', text: 'What the MIT licence asks for' },
      { type: 'p', text: 'You may use, modify and redistribute the code, including under a new name. The one firm condition is that the original copyright notice and licence text stay with the copies. So the LICENSE file keeps the original copyright line, and my own line is added alongside it, never in place of it.' },
      { type: 'h', text: 'What I actually changed' },
      { type: 'list', items: [
        'A new Aurora glass design for the panel, the settings editor, the icon and the demo website.',
        'Laptop and phone brightness sliders and a default Shortcuts page.',
        'A one-command installer with a progress bar.',
        'A signed release pipeline on GitHub Actions, with signing material kept out of the repository.',
      ] },
      { type: 'h', text: 'Credit in plain sight' },
      { type: 'p', text: 'The README says what DeskDeck is based on and links to the original project. It costs nothing, it is the honest thing to do, and it makes the real contribution easier to see: the parts I built are exactly the parts that differ.' },
      { type: 'p', text: 'If you are forking something for your portfolio, write the "what I changed" list first. If it is short, keep building before you put your name on it.' },
    ],
  },
];
