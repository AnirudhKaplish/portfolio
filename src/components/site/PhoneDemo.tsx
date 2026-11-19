import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, FolderGit2, FileText, Terminal as TermIcon, Mail, PenLine, User, Github, Linkedin, Copy, Check, Download, ExternalLink, Wifi, BatteryFull } from 'lucide-react';
import { useProjects, useProfile } from '../../hooks/usePortfolioData';
import { POSTS } from '../../hooks/data/posts';
import { SKILLS } from '../../hooks/data/portfolio';

const EMAIL = 'anirudh23.dev@gmail.com';
const base = import.meta.env.BASE_URL;
type AppId = 'projects' | 'about' | 'resume' | 'writing' | 'terminal' | 'contact';

const APPS: { id: AppId; label: string; icon: React.ReactNode; cls: string }[] = [
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={24} />, cls: 'from-teal-400 to-emerald-600' },
  { id: 'about', label: 'About', icon: <User size={24} />, cls: 'from-sky-400 to-indigo-600' },
  { id: 'resume', label: 'Résumé', icon: <FileText size={24} />, cls: 'from-rose-400 to-pink-600' },
  { id: 'writing', label: 'Writing', icon: <PenLine size={24} />, cls: 'from-amber-400 to-orange-600' },
  { id: 'terminal', label: 'Terminal', icon: <TermIcon size={24} />, cls: 'from-zinc-600 to-zinc-900' },
  { id: 'contact', label: 'Contact', icon: <Mail size={24} />, cls: 'from-violet-400 to-purple-700' },
];

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  return now;
};

const AppShell: React.FC<{ title: string; onBack: () => void; children: React.ReactNode }> = ({ title, onBack, children }) => (
  <div className="absolute inset-0 pt-11 flex flex-col bg-[#0b0e14]">
    <div className="flex items-center px-3 pb-2 border-b border-white/10 shrink-0">
      <button onClick={onBack} aria-label="Back to home screen" className="flex items-center text-teal-300 text-sm -ml-1"><ChevronLeft size={20} />Home</button>
      <span className="absolute left-1/2 -translate-x-1/2 font-semibold text-sm">{title}</span>
    </div>
    <div className="flex-1 overflow-y-auto px-3 py-3 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
  </div>
);

const ProjectsApp: React.FC = () => {
  const { data } = useProjects();
  return (
    <div className="space-y-3">
      {data.map((p: any) => {
        const href = p.link || p.github;
        const body = (
          <div className="flex gap-3 rounded-xl bg-white/5 p-2 hover:bg-white/10 transition-colors">
            <div className="h-14 w-20 shrink-0 rounded-lg overflow-hidden bg-teal-300/10">{p.image && <img src={`${base}${p.image}`} alt="" loading="lazy" className="h-full w-full object-cover object-top" />}</div>
            <div className="min-w-0"><p className="text-[13px] font-semibold leading-tight line-clamp-2">{p.title.split(' – ')[0]}</p><p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{p.tech.slice(0, 3).join(' · ')}</p>{p.link && <p className="text-[10px] text-teal-300 mt-0.5">Live demo</p>}</div>
          </div>
        );
        return href ? <a key={p.id} href={href} target="_blank" rel="noreferrer">{body}</a> : <div key={p.id}>{body}</div>;
      })}
    </div>
  );
};

const AboutApp: React.FC = () => {
  const { profile } = useProfile();
  return (
    <div className="text-center">
      <img src={`${base}ani.webp`} alt="Anirudh Kaplish" className="mx-auto h-24 w-24 rounded-full object-cover object-top bg-[#f1eee7]" />
      <p className="mt-3 font-semibold">Anirudh Kaplish</p>
      <p className="text-xs text-teal-300">B.Tech CSE · VIT Chennai</p>
      <p className="mt-3 text-[12px] leading-relaxed text-gray-300 text-left">{profile.bio}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">{(profile.stats || []).slice(0, 4).map((s: any) => (
        <div key={s.label} className="rounded-lg bg-white/5 py-2"><p className="text-lg font-bold text-teal-300">{s.value}</p><p className="text-[9px] uppercase tracking-wider text-gray-500">{s.label}</p></div>
      ))}</div>
    </div>
  );
};

const ResumeApp: React.FC = () => (
  <div className="text-center pt-6">
    <div className="mx-auto h-36 w-28 rounded-lg bg-white/10 grid place-items-center"><FileText size={40} className="text-rose-300" /></div>
    <p className="mt-4 font-semibold">Anirudh Kaplish</p><p className="text-xs text-gray-400">Résumé · PDF</p>
    <a href={`${base}AnirudhResume.pdf`} download className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-300 text-black text-sm font-semibold px-5 py-2"><Download size={15} />Download</a>
    <div><Link to="/resume" className="mt-3 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white"><ExternalLink size={12} />Preview on the site</Link></div>
  </div>
);

const WritingApp: React.FC = () => (
  <div className="space-y-2">{POSTS.map((p) => (
    <Link key={p.slug} to={`/blog/${p.slug}`} className="block rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-colors">
      <p className="text-[10px] font-mono text-amber-300">{p.date} · {p.readTime}</p><p className="text-[13px] font-semibold leading-snug mt-0.5">{p.title}</p>
    </Link>))}</div>
);

const ContactApp: React.FC = () => {
  const { profile } = useProfile();
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* blocked */ } };
  const row = 'flex items-center gap-3 rounded-xl bg-white/5 p-3 text-sm hover:bg-white/10 transition-colors w-full text-left';
  return (
    <div className="space-y-2">
      <button onClick={copy} className={row}><Mail size={18} className="text-violet-300" /><span className="font-mono text-[11px] flex-1 break-all">{EMAIL}</span>{copied ? <Check size={15} className="text-teal-300" /> : <Copy size={15} className="text-gray-500" />}</button>
      <a href={`mailto:${EMAIL}`} className={row}><Mail size={18} className="text-violet-300" />Send an email</a>
      <a href={profile.social.github} target="_blank" rel="noreferrer" className={row}><Github size={18} />GitHub</a>
      <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className={row}><Linkedin size={18} className="text-sky-300" />LinkedIn</a>
    </div>
  );
};

const TerminalApp: React.FC = () => {
  const { data: projects } = useProjects();
  const [lines, setLines] = useState<string[]>(["type 'help' to begin"]);
  const [val, setVal] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [lines]);

  const run = (raw: string) => {
    const c = raw.trim().toLowerCase();
    let out: string[] = [];
    if (c === 'help') out = ['about · skills · projects', 'contact · clear'];
    else if (c === 'about') out = ['Anirudh Kaplish', 'B.Tech CSE, VIT Chennai', 'Full-stack + data + AI'];
    else if (c === 'skills') out = [SKILLS.filter((s) => s.level >= 85).map((s) => s.name).join(', ')];
    else if (c === 'projects') out = projects.map((p: any) => '• ' + p.title.split(' – ')[0]);
    else if (c === 'contact') out = [EMAIL];
    else if (c === 'clear') { setLines([]); return; }
    else if (c) out = [`command not found: ${c}`];
    setLines((l) => [...l, `$ ${raw}`, ...out]);
  };
  return (
    <div className="font-mono text-[11px] leading-relaxed text-green-300 h-full">
      {lines.map((l, i) => <p key={i} className={l.startsWith('$') ? 'text-white' : ''}>{l}</p>)}
      <form onSubmit={(e) => { e.preventDefault(); run(val); setVal(''); }} className="flex gap-1.5"><span className="text-teal-300">$</span>
        <input value={val} onChange={(e) => setVal(e.target.value)} aria-label="Terminal command" autoCapitalize="off" autoCorrect="off" spellCheck={false} className="flex-1 bg-transparent outline-none text-white min-w-0" /></form>
      <div ref={end} />
    </div>
  );
};

const PhoneDemo: React.FC = () => {
  const [app, setApp] = useState<AppId | null>(null);
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const date = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' });
  const current = APPS.find((a) => a.id === app);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="absolute -inset-8 rounded-full bg-teal-300/15 blur-3xl" aria-hidden />
      <div className="relative aspect-[9/19] rounded-[2.8rem] bg-[#2b2b30] p-[7px] shadow-2xl ring-1 ring-white/20">
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-[#1e1b4b] via-[#3b1d6e] to-[#0f766e] text-white">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black z-30" aria-hidden />
          <div className="absolute top-2.5 inset-x-6 z-20 flex justify-between text-[11px] font-semibold pointer-events-none" aria-hidden>
            <span>{time}</span><span className="flex items-center gap-1"><Wifi size={12} /><BatteryFull size={14} /></span>
          </div>

          <div className="absolute inset-0 pt-14 px-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/15 backdrop-blur p-3 aspect-square flex flex-col justify-between"><p className="text-[10px] uppercase tracking-wider text-white/70">{date}</p><p className="text-4xl font-bold tracking-tight">{time}</p></div>
              <div className="rounded-2xl bg-white/15 backdrop-blur p-3 aspect-square flex flex-col justify-between"><span className="inline-flex h-2 w-2 rounded-full bg-teal-300 animate-pulse" /><div><p className="text-[10px] uppercase tracking-wider text-white/70">Status</p><p className="text-sm font-semibold leading-tight">Open to roles</p><p className="text-[10px] text-white/70 mt-1">Chennai, IN</p></div></div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-y-4 gap-x-2">
              {APPS.map((a) => (
                <button key={a.id} onClick={() => setApp(a.id)} aria-label={`Open ${a.label}`} className="group flex flex-col items-center gap-1.5">
                  <span className={`grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br ${a.cls} shadow-lg group-hover:scale-105 group-active:scale-95 transition-transform`}>{a.icon}</span>
                  <span className="text-[10px] text-white/90">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {current && (
              <motion.div key={current.id} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }} className="absolute inset-0 z-20">
                <AppShell title={current.label} onBack={() => setApp(null)}>
                  {app === 'projects' && <ProjectsApp />}{app === 'about' && <AboutApp />}{app === 'resume' && <ResumeApp />}
                  {app === 'writing' && <WritingApp />}{app === 'terminal' && <TerminalApp />}{app === 'contact' && <ContactApp />}
                </AppShell>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={() => setApp(null)} aria-label="Go to home screen" className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 h-1.5 w-28 rounded-full bg-white/70 hover:bg-white" />
        </div>
      </div>
    </div>
  );
};
export default PhoneDemo;
