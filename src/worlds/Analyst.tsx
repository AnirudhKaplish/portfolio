import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Download, Maximize2 } from 'lucide-react';
import { useProfile, useProjects, useTimeline, useSkills } from '../hooks/usePortfolioData';
import WorldBar from './WorldBar';

const EMAIL = 'anirudh23.dev@gmail.com';
const Bullets: React.FC<{ items: string[] }> = ({ items }) => <ul className="mt-4 space-y-3 text-[clamp(.8rem,1.6vw,1.2rem)] leading-snug text-slate-200">{items.map((t, i) => <li key={i} className="flex gap-3"><span className="mt-[0.5em] h-2 w-2 shrink-0 rounded-full bg-amber-300" /><span>{t}</span></li>)}</ul>;
const Head: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => <><p className="font-mono text-[clamp(.6rem,1vw,.8rem)] uppercase tracking-[0.3em] text-amber-300">{kicker}</p><h2 className="mt-2 text-[clamp(1.3rem,3.4vw,2.6rem)] font-bold leading-tight text-white">{title}</h2></>;
const lines = (d: string) => String(d).split('\n').map((l) => l.replace(/^•\s*/, ''));

const Analyst: React.FC = () => {
  const { profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: timeline } = useTimeline();
  const { data: skills } = useSkills();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const slides = useMemo(() => {
    const pipeline = timeline.find((t: any) => /relational database schema/i.test(t.desc));
    const dash = timeline.find((t: any) => /Deloitte/i.test(t.org));
    const swift = projects.find((p: any) => p.title.startsWith('SwiftMile'));
    const safe = projects.find((p: any) => p.title.startsWith('SAFE-MIND'));
    const tools = skills.filter((s: any) => /SQL|Pandas|Tableau|Matplotlib|^Python/i.test(s.name)).sort((a: any, b: any) => b.level - a.level);
    const out: { id: string; node: React.ReactNode }[] = [];
    out.push({ id: 'title', node: <div className="flex h-full flex-col justify-center"><p className="font-mono text-[clamp(.6rem,1vw,.8rem)] uppercase tracking-[0.3em] text-amber-300">Candidate briefing · Data &amp; consulting</p><h1 className="mt-4 text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.02] text-white">Anirudh Kaplish</h1><p className="mt-4 max-w-2xl text-[clamp(.9rem,1.8vw,1.4rem)] text-slate-300">Turning messy data into decisions. B.Tech CSE, VIT Chennai.</p><p className="mt-8 font-mono text-xs text-slate-500">Use ← → keys or the buttons below</p></div> });
    out.push({ id: 'summary', node: <><Head kicker="01 · Executive summary" title="What you need to know" /><p className="mt-5 max-w-3xl text-[clamp(.85rem,1.7vw,1.3rem)] leading-relaxed text-slate-200">{profile.about}</p></> });
    out.push({ id: 'numbers', node: <><Head kicker="02 · By the numbers" title="Snapshot" /><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">{(profile.stats || []).map((s: any) => <div key={s.label} className="rounded-xl border border-slate-600/60 bg-slate-900/60 p-4"><p className="text-[clamp(1.4rem,3.4vw,2.6rem)] font-bold text-amber-300">{s.value}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">{s.label}</p></div>)}</div></> });
    if (pipeline) out.push({ id: 'case1', node: <><Head kicker={`03 · Case study · ${pipeline.org}`} title="Building a data ingestion pipeline" /><Bullets items={lines(pipeline.desc)} /></> });
    if (swift) out.push({ id: 'case2', node: <><Head kicker="04 · Case study · Logistics" title={swift.title} /><Bullets items={swift.details.slice(0, 3)} /><p className="mt-5 font-mono text-xs text-slate-500">{swift.tech.join(' · ')}</p></> });
    if (safe) out.push({ id: 'case3', node: <><Head kicker="05 · Case study · AI &amp; privacy" title={safe.title} /><Bullets items={safe.details.slice(0, 3)} /><p className="mt-5 font-mono text-xs text-slate-500">{safe.tech.join(' · ')}</p></> });
    out.push({ id: 'tools', node: <><Head kicker="06 · Toolkit" title="Where I am strongest" /><div className="mt-6 space-y-4 max-w-2xl">{tools.map((s: any) => <div key={s.id}><div className="flex justify-between text-[clamp(.75rem,1.4vw,1.05rem)] text-slate-200"><span>{s.name}</span><span className="font-mono text-slate-400">{s.level}%</span></div><div className="mt-1 h-2.5 rounded bg-slate-800"><motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.8 }} className="h-full rounded bg-amber-300" /></div></div>)}</div></> });
    if (dash) out.push({ id: 'record', node: <><Head kicker="07 · On record" title={dash.title} /><p className="mt-2 text-slate-400">{dash.org} · {dash.date}</p><p className="mt-5 max-w-2xl text-[clamp(.85rem,1.6vw,1.2rem)] text-slate-200">{dash.desc}</p></> });
    out.push({ id: 'ask', node: <div className="flex h-full flex-col justify-center"><Head kicker="08 · Next step" title="Let's talk" /><p className="mt-4 max-w-xl text-[clamp(.85rem,1.6vw,1.2rem)] text-slate-300">I am looking for analytics, consulting and software roles.</p><div className="mt-8 flex flex-wrap gap-3"><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-md bg-amber-300 px-5 py-3 font-semibold text-black"><Mail size={16} />{EMAIL}</a><a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="inline-flex items-center gap-2 rounded-md border border-slate-500 px-5 py-3"><Download size={16} />Résumé</a></div></div> });
    return out;
  }, [profile, projects, timeline, skills]);

  const go = (d: number) => { setDir(d); setI((n) => Math.min(slides.length - 1, Math.max(0, n + d))); };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); } if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  const full = () => { try { document.documentElement.requestFullscreen?.(); } catch { /* ignore */ } };

  return (
    <div className="flex min-h-screen flex-col bg-[#060b17] text-white">
      <WorldBar current="analyst" />
      <div className="flex flex-1 items-center justify-center px-3 pt-20 pb-4 md:px-8">
        <div className="relative aspect-[16/9] w-full max-w-[1100px] overflow-hidden rounded-xl border border-slate-700/70 bg-gradient-to-br from-[#0d1730] to-[#0a1020] shadow-2xl max-md:aspect-auto max-md:min-h-[60vh]">
          <div className="absolute right-0 top-0 h-full w-1.5 bg-amber-300/70" aria-hidden />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={slides[i].id} custom={dir} initial={{ opacity: 0, x: 40 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * dir }} transition={{ duration: 0.25 }} className="h-full overflow-y-auto p-6 md:p-12">
              {slides[i].node}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 h-1 bg-amber-300 transition-all" style={{ width: `${((i + 1) / slides.length) * 100}%` }} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 pb-6 text-sm">
        <button onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide" className="rounded-md border border-slate-600 p-2.5 hover:border-slate-400 disabled:opacity-30"><ChevronLeft size={18} /></button>
        <span className="w-20 text-center font-mono text-slate-400">{i + 1} / {slides.length}</span>
        <button onClick={() => go(1)} disabled={i === slides.length - 1} aria-label="Next slide" className="rounded-md bg-amber-300 p-2.5 text-black hover:bg-amber-200 disabled:opacity-30"><ChevronRight size={18} /></button>
        <button onClick={full} aria-label="Fullscreen" className="ml-3 hidden rounded-md border border-slate-600 p-2.5 hover:border-slate-400 md:block"><Maximize2 size={16} /></button>
      </div>
    </div>
  );
};
export default Analyst;
