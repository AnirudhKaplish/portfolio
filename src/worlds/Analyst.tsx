import React from 'react';
import { Mail, Download } from 'lucide-react';
import { useProfile, useProjects, useTimeline, useSkills } from '../hooks/usePortfolioData';
import WorldBar from './WorldBar';

const EMAIL = 'anirudh23.dev@gmail.com';

const Analyst: React.FC = () => {
  const { profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: timeline } = useTimeline();
  const { data: skills } = useSkills();
  const cases = ['SwiftMile', 'SAFE-MIND'].map((n) => projects.find((p: any) => p.title.startsWith(n))).filter(Boolean) as any[];
  const pipeline = timeline.find((t: any) => /relational database schema/i.test(t.desc));
  const dash = timeline.find((t: any) => /Deloitte/i.test(t.org));
  const tools = skills.filter((s: any) => ['data', 'core'].includes(s.category) && /SQL|Pandas|Tableau|Matplotlib|Python/i.test(s.name));

  const card = 'rounded-xl border border-slate-700/60 bg-slate-900/60 p-5';
  return (
    <div className="min-h-screen bg-[#0a1020] text-slate-100">
      <WorldBar current="analyst" />
      <main className="mx-auto max-w-6xl px-5 pt-28 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300">Anirudh Kaplish · Data &amp; consulting</p>
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-6xl font-bold tracking-tight">Turning messy data into decisions.</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300 leading-relaxed">{profile.about}</p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{(profile.stats || []).map((s: any) => (
          <div key={s.label} className={card}><p className="text-3xl font-bold text-amber-300">{s.value}</p><p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-400">{s.label}</p></div>
        ))}</div>

        <h2 className="mt-16 mb-5 text-2xl font-semibold">Case studies</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {pipeline && (
            <article className={card}>
              <p className="font-mono text-xs text-amber-300">{pipeline.org} · {pipeline.date}</p>
              <h3 className="mt-1 text-lg font-semibold">Data ingestion pipeline</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed list-disc pl-4">{String(pipeline.desc).split('\n').map((l: string, i: number) => <li key={i}>{l.replace(/^•\s*/, '')}</li>)}</ul>
            </article>
          )}
          {cases.map((p) => (
            <article key={p.id} className={card}>
              <p className="font-mono text-xs text-amber-300">{p.domain}</p>
              <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed list-disc pl-4">{p.details.slice(0, 3).map((d: string) => <li key={d}>{d}</li>)}</ul>
              <p className="mt-3 font-mono text-xs text-slate-500">{p.tech.join(' · ')}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <section className={card}>
            <h2 className="text-xl font-semibold">Toolkit</h2>
            <div className="mt-4 space-y-4">{tools.map((s: any) => (
              <div key={s.id}><div className="flex justify-between text-sm"><span>{s.name}</span><span className="font-mono text-slate-400">{s.level}%</span></div>
                <div className="mt-1 h-2 rounded bg-slate-800"><div className="h-full rounded bg-amber-300" style={{ width: `${s.level}%` }} /></div></div>
            ))}</div>
          </section>
          <section className={card}>
            <h2 className="text-xl font-semibold">Also on record</h2>
            {dash && <div className="mt-4"><p className="font-semibold">{dash.title}</p><p className="text-sm text-slate-400">{dash.org} · {dash.date}</p><p className="mt-2 text-sm text-slate-300">{dash.desc}</p></div>}
            <div className="mt-5"><p className="font-semibold">Where I am heading</p><p className="mt-1 text-sm text-slate-300">Build SQL, Python and dashboard depth, and apply for analytics, consulting and finance-reporting roles ahead of graduation.</p></div>
          </section>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-md bg-amber-300 px-6 py-3 font-semibold text-black"><Mail size={16} />{EMAIL}</a>
          <a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-6 py-3"><Download size={16} />Résumé</a>
        </div>
      </main>
    </div>
  );
};
export default Analyst;
