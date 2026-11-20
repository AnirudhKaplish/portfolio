import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { FileText, FolderOpen, Cpu, TerminalSquare, Mail, User, Layers, X, Github, ExternalLink, Download } from 'lucide-react';
import { useProfile, useProjects, useSkills, useTimeline } from '../hooks/usePortfolioData';
import WorldBar from './WorldBar';

const NeuralField = lazy(() => import('./NeuralField'));
const EMAIL = 'anirudh23.dev@gmail.com';
const hasGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();

type AppId = 'about' | 'models' | 'files' | 'stack' | 'terminal' | 'contact';
interface Win { id: AppId; x: number; y: number; w: number; h: number; z: number; }
const APPS: { id: AppId; label: string; file: string; icon: React.ReactNode; w: number; h: number }[] = [
  { id: 'about', label: 'about.md', file: 'about', icon: <User size={26} />, w: 460, h: 380 },
  { id: 'models', label: 'models', file: 'models', icon: <Cpu size={26} />, w: 640, h: 440 },
  { id: 'files', label: 'projects', file: 'projects', icon: <FolderOpen size={26} />, w: 560, h: 420 },
  { id: 'stack', label: 'stack', file: 'stack', icon: <Layers size={26} />, w: 460, h: 420 },
  { id: 'terminal', label: 'terminal', file: 'terminal', icon: <TerminalSquare size={26} />, w: 560, h: 380 },
  { id: 'contact', label: 'contact.md', file: 'contact', icon: <Mail size={26} />, w: 420, h: 280 },
];

const Term: React.FC<{ open: (id: AppId) => void }> = ({ open }) => {
  const { profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const [lines, setLines] = useState<{ t: string; c?: boolean }[]>([{ t: "welcome. type 'help'." }]);
  const [val, setVal] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [lines]);

  const run = (raw: string) => {
    const [cmd, ...args] = raw.trim().split(/\s+/); const a = args.join(' ').toLowerCase(); let out: string[] = [];
    const top = [...skills].sort((x: any, y: any) => y.level - x.level);
    switch ((cmd || '').toLowerCase()) {
      case '': break;
      case 'help': out = ['help  ls  cat <file>  open <app>  whoami  neofetch  skills  projects  clear', 'files: about.md  contact.md  resume.pdf', 'apps: about models projects stack contact']; break;
      case 'ls': out = ['about.md  contact.md  resume.pdf  projects/  models/']; break;
      case 'whoami': out = ['anirudh']; break;
      case 'cat':
        if (a === 'about.md') out = [profile.about]; else if (a === 'contact.md') out = [EMAIL, profile.social.github, profile.social.linkedin];
        else if (a === 'resume.pdf') out = ['binary file. try: open resume'];
        else out = [`cat: ${a || '(missing file)'}: no such file`]; break;
      case 'open':
        if (a === 'resume') { window.open(`${import.meta.env.BASE_URL}AnirudhResume.pdf`, '_blank'); out = ['opening resume.pdf']; }
        else { const t = APPS.find((p) => p.id === a || p.file === a); if (t) { open(t.id); out = [`opened ${t.label}`]; } else out = [`open: unknown app '${a}'`]; } break;
      case 'skills': out = top.slice(0, 8).map((s: any) => `${s.name.padEnd(20)} ${'█'.repeat(Math.round(s.level / 10))}${'░'.repeat(10 - Math.round(s.level / 10))} ${s.level}%`); break;
      case 'projects': out = projects.map((p: any) => `• ${p.title.split(' – ')[0]}`); break;
      case 'neofetch': out = ['anirudh@lab', '----------', 'Role     ' + profile.title, 'School   VIT Chennai, B.Tech CSE (CGPA 8.09)', 'Projects ' + projects.length, 'Focus    full-stack, data, applied AI', 'Mail     ' + EMAIL]; break;
      case 'clear': setLines([]); return;
      default: out = [`${cmd}: command not found`];
    }
    setLines((l) => [...l, { t: `$ ${raw}`, c: true }, ...out.map((t) => ({ t }))]);
  };
  return (
    <div className="h-full overflow-y-auto bg-black/60 p-3 font-mono text-xs leading-relaxed text-green-300" onClick={() => (document.getElementById('term-input') as HTMLInputElement | null)?.focus()}>
      {lines.map((l, i) => <p key={i} className={`whitespace-pre-wrap break-words ${l.c ? 'text-white' : ''}`}>{l.t}</p>)}
      <form onSubmit={(e) => { e.preventDefault(); run(val); setVal(''); }} className="flex gap-2"><span className="text-green-400">$</span>
        <input id="term-input" value={val} onChange={(e) => setVal(e.target.value)} aria-label="Terminal command" autoCapitalize="off" autoCorrect="off" spellCheck={false} className="min-w-0 flex-1 bg-transparent text-white outline-none" /></form>
      <div ref={end} />
    </div>
  );
};

const Body: React.FC<{ id: AppId; open: (id: AppId) => void }> = ({ id, open }) => {
  const { profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: timeline } = useTimeline();
  const ai = projects.filter((p: any) => /\bAI\b|BERT|PyTorch/.test(p.domain + ' ' + p.tech.join(' ')));
  const agent = timeline.find((t: any) => /AI-powered brief/i.test(t.desc));
  const pad = 'h-full overflow-y-auto p-4 text-sm leading-relaxed';
  if (id === 'terminal') return <Term open={open} />;
  if (id === 'about') return <div className={pad}><h2 className="text-lg font-bold text-white">Anirudh Kaplish</h2><p className="text-green-400 text-xs">{profile.title} · VIT Chennai</p><p className="mt-3 text-green-100/80">{profile.about}</p></div>;
  if (id === 'contact') return <div className={`${pad} space-y-3`}><a className="flex items-center gap-2 text-white hover:text-green-300" href={`mailto:${EMAIL}`}><Mail size={16} />{EMAIL}</a><a className="flex items-center gap-2 hover:text-green-300" href={profile.social.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub</a><a className="flex items-center gap-2 hover:text-green-300" href={profile.social.linkedin} target="_blank" rel="noreferrer"><ExternalLink size={16} />LinkedIn</a><a className="flex items-center gap-2 hover:text-green-300" href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download><Download size={16} />resume.pdf</a></div>;
  if (id === 'stack') return <div className={`${pad} space-y-3`}>{[...skills].sort((a: any, b: any) => b.level - a.level).slice(0, 12).map((s: any) => <div key={s.id}><div className="flex justify-between text-xs"><span>{s.name}</span><span className="text-green-500">{s.level}%</span></div><div className="mt-1 h-1 rounded bg-white/10"><div className="h-full rounded bg-green-400" style={{ width: `${s.level}%` }} /></div></div>)}</div>;
  if (id === 'files') return <div className={`${pad} space-y-2`}>{projects.map((p: any) => <div key={p.id} className="flex items-center justify-between gap-3 rounded border border-white/10 px-3 py-2"><div className="min-w-0"><p className="truncate font-semibold text-white">{p.title.split(' – ')[0]}</p><p className="truncate text-[11px] text-green-400/80">{p.tech.slice(0, 3).join(' · ')}</p></div><div className="flex shrink-0 gap-3 text-xs">{p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-green-300 hover:text-white">demo</a>}{p.github && <a href={p.github} target="_blank" rel="noreferrer" className="text-green-300 hover:text-white">src</a>}</div></div>)}</div>;
  return <div className={`${pad} space-y-4`}>{ai.map((p: any) => <article key={p.id} className="rounded border border-green-400/25 bg-green-400/[0.04] p-3"><p className="text-[10px] text-green-500">{p.domain}</p><h3 className="font-bold text-white">{p.title}</h3><p className="mt-1 text-xs text-green-100/80">{p.desc}</p><ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-green-100/70">{p.details.slice(0, 3).map((d: string) => <li key={d}>{d}</li>)}</ul></article>)}
    {agent && <article className="rounded border border-green-400/25 bg-green-400/[0.04] p-3"><p className="text-[10px] text-green-500">Internship · {agent.org}</p><h3 className="font-bold text-white">Brief-generation agent</h3><ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-green-100/70">{String(agent.desc).split('\n').map((l: string, i: number) => <li key={i}>{l.replace(/^•\s*/, '')}</li>)}</ul></article>}</div>;
};

const AIEngineer: React.FC = () => {
  const [wins, setWins] = useState<Win[]>([]);
  const [booted, setBooted] = useState(false);
  const [time, setTime] = useState(new Date());
  const zTop = useRef(10);
  const drag = useRef<{ id: AppId; dx: number; dy: number } | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => { const t = setTimeout(() => setBooted(true), 1400); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 20000); return () => clearInterval(t); }, []);
  useEffect(() => { if (booted && !wins.length) open('about'); /* eslint-disable-next-line */ }, [booted]);

  const focus = (id: AppId) => setWins((w) => w.map((x) => (x.id === id ? { ...x, z: ++zTop.current } : x)));
  const open = (id: AppId) => setWins((w) => {
    if (w.some((x) => x.id === id)) return w.map((x) => (x.id === id ? { ...x, z: ++zTop.current } : x));
    const app = APPS.find((a) => a.id === id)!; const n = w.length;
    const aw = Math.min(app.w, (area.current?.clientWidth || 900) - 20), ah = Math.min(app.h, (area.current?.clientHeight || 600) - 20);
    return [...w, { id, w: aw, h: ah, x: Math.max(10, 90 + n * 34), y: 20 + n * 30, z: ++zTop.current }];
  });
  const close = (id: AppId) => setWins((w) => w.filter((x) => x.id !== id));

  const onDown = (e: React.PointerEvent, win: Win) => {
    if (mobile) return; focus(win.id);
    drag.current = { id: win.id, dx: e.clientX - win.x, dy: e.clientY - win.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; if (!d || !area.current) return;
    const r = area.current.getBoundingClientRect();
    setWins((w) => w.map((x) => (x.id === d.id ? { ...x, x: Math.min(Math.max(0, e.clientX - d.dx), r.width - 80), y: Math.min(Math.max(0, e.clientY - d.dy), r.height - 40) } : x)));
  };
  const onUp = () => { drag.current = null; };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#02130c] font-mono text-green-100 select-none">
      <WorldBar current="ai" />
      <div className="absolute inset-0 opacity-60" aria-hidden>{hasGL && <Suspense fallback={null}><NeuralField /></Suspense>}</div>
      {!booted && <div className="absolute inset-0 z-50 grid place-items-center bg-black"><div className="text-center"><p className="text-green-400">LAB OS 1.0</p><p className="mt-2 text-xs text-green-200/60 animate-pulse">loading kernel… mounting models…</p><button onClick={() => setBooted(true)} className="mt-6 text-xs underline text-green-300">skip</button></div></div>}

      <div ref={area} className="absolute inset-x-0 top-14 bottom-14" onPointerMove={onMove} onPointerUp={onUp}>
        <div className="absolute left-3 top-3 flex flex-col gap-4">
          {APPS.map((a) => (
            <button key={a.id} onDoubleClick={() => open(a.id)} onClick={() => mobile && open(a.id)} onKeyDown={(e) => e.key === 'Enter' && open(a.id)} aria-label={`Open ${a.label}`} className="group flex w-20 flex-col items-center gap-1 rounded-md p-1.5 text-center hover:bg-white/10 focus:bg-white/10 focus:outline-none">
              <span className="text-green-300 group-hover:text-white">{a.icon}</span><span className="text-[11px] leading-tight text-green-100/90">{a.label}</span>
            </button>
          ))}
          <a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="flex w-20 flex-col items-center gap-1 rounded-md p-1.5 text-center hover:bg-white/10"><FileText size={26} className="text-green-300" /><span className="text-[11px]">resume.pdf</span></a>
        </div>
        {!mobile && <p className="absolute bottom-2 right-3 text-[11px] text-green-200/50">double-click an icon · drag windows · try the terminal</p>}

        {wins.map((w) => {
          const app = APPS.find((a) => a.id === w.id)!;
          return (
            <div key={w.id} onPointerDown={() => focus(w.id)} style={mobile ? { zIndex: w.z } : { left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z }}
              className={`${mobile ? 'absolute inset-0' : 'absolute'} flex flex-col overflow-hidden rounded-lg border border-green-400/40 bg-[#041a10]/95 shadow-2xl backdrop-blur`} role="dialog" aria-label={app.label}>
              <div onPointerDown={(e) => onDown(e, w)} className="flex shrink-0 cursor-grab items-center justify-between border-b border-green-400/30 bg-green-400/10 px-3 py-1.5 active:cursor-grabbing touch-none">
                <span className="text-xs text-green-200">{app.label}</span>
                <span className="flex gap-1"><button onClick={() => close(w.id)} aria-label={`Close ${app.label}`} className="rounded p-1 hover:bg-white/10"><X size={13} /></button></span>
              </div>
              <div className="min-h-0 flex-1 select-text"><Body id={w.id} open={open} /></div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 flex h-14 items-center gap-2 border-t border-green-400/30 bg-black/70 px-3 backdrop-blur">
        <span className="mr-2 text-xs font-bold text-green-400">LAB OS</span>
        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">{wins.map((w) => { const app = APPS.find((a) => a.id === w.id)!; return <button key={w.id} onClick={() => focus(w.id)} className="flex shrink-0 items-center gap-1.5 rounded border border-green-400/30 px-2.5 py-1 text-[11px] hover:bg-white/10">{app.icon && React.cloneElement(app.icon as React.ReactElement<{ size: number }>, { size: 13 })}{app.label}</button>; })}</div>
        <span className="shrink-0 text-xs text-green-200/70">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
      </div>
    </div>
  );
};
export default AIEngineer;
