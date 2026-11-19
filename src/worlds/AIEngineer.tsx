import React, { Suspense, lazy } from 'react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { useProjects, useTimeline, useSkills } from '../hooks/usePortfolioData';
import WorldBar from './WorldBar';

const NeuralField = lazy(() => import('./NeuralField'));
const EMAIL = 'anirudh23.dev@gmail.com';
const hasGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();

const STEPS = [
  ['01', 'Consent', 'A smart contract records whether the person has allowed screening.'],
  ['02', 'Two models', 'Two models score the posts, and a result is shown only if they agree.'],
  ['03', 'Explain', 'Word-level explanations show what drove the score.'],
  ['04', 'Revoke', 'The pipeline stops the moment consent is revoked.'],
];

const AIEngineer: React.FC = () => {
  const { data: projects } = useProjects();
  const { data: timeline } = useTimeline();
  const { data: skills } = useSkills();
  const ai = projects.filter((p: any) => /\bAI\b|BERT|PyTorch/.test(p.domain + ' ' + p.tech.join(' ')));
  const rest = projects.filter((p: any) => !ai.includes(p));
  const agent = timeline.find((t: any) => /AI-powered brief/i.test(t.desc));
  const stack = skills.filter((s: any) => ['ai', 'data'].includes(s.category) || s.id === 'python').sort((a: any, b: any) => b.level - a.level).slice(0, 9);

  return (
    <div className="min-h-screen bg-[#030705] font-mono text-green-100 selection:bg-green-400/30">
      <WorldBar current="ai" />
      <section className="relative overflow-hidden px-5 pt-32 pb-24">
        <div className="absolute inset-0 opacity-70" aria-hidden>{hasGL && <Suspense fallback={null}><NeuralField /></Suspense>}</div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030705]" aria-hidden />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-green-400 text-sm">$ whoami</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-bold text-white tracking-tight">Anirudh Kaplish<span className="animate-pulse text-green-400">_</span></h1>
          <p className="mt-4 max-w-2xl text-green-200/80 leading-relaxed font-sans text-lg">Full-stack developer applying AI to screening, personalisation and voice problems. I care about systems that explain themselves and respect consent.</p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <a href="#models" className="inline-flex items-center gap-2 rounded border border-green-400 px-5 py-2.5 text-green-300 hover:bg-green-400 hover:text-black transition-colors">cat ./models <ArrowRight size={14} /></a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center rounded border border-white/20 px-5 py-2.5 hover:border-white/50">{EMAIL}</a>
          </div>
        </div>
      </section>

      <section id="models" className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-green-400 text-sm mb-6">## model_cards</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {ai.map((p: any) => (
            <article key={p.id} className="rounded-lg border border-green-400/25 bg-green-400/[0.03] p-5">
              <p className="text-xs text-green-500">{p.domain}</p>
              <h3 className="mt-1 text-xl font-bold text-white font-sans">{p.title}</h3>
              <p className="mt-3 text-sm text-green-100/80 leading-relaxed font-sans">{p.desc}</p>
              <ul className="mt-3 space-y-1 text-xs text-green-200/70 font-sans list-disc pl-4">{p.details.slice(0, 3).map((d: string) => <li key={d}>{d}</li>)}</ul>
              <p className="mt-3 text-xs text-green-400">{p.tech.join(' · ')}</p>
              <div className="mt-4 flex gap-4 text-xs">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-green-300 hover:text-white"><ExternalLink size={12} />demo</a>}
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-green-300 hover:text-white"><Github size={12} />source</a>}
              </div>
            </article>
          ))}
          {agent && (
            <article className="rounded-lg border border-green-400/25 bg-green-400/[0.03] p-5">
              <p className="text-xs text-green-500">Internship · {agent.org}</p>
              <h3 className="mt-1 text-xl font-bold text-white font-sans">Brief-generation agent</h3>
              <ul className="mt-3 space-y-1 text-sm text-green-100/80 font-sans list-disc pl-4">{String(agent.desc).split('\n').map((l: string, i: number) => <li key={i}>{l.replace(/^•\s*/, '')}</li>)}</ul>
            </article>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-green-400 text-sm mb-2">## pipeline: SAFE-MIND</h2>
        <p className="text-sm text-green-200/60 mb-6 font-sans">How the screening flow is gated, step by step.</p>
        <ol className="grid gap-4 md:grid-cols-4">{STEPS.map(([n, t, d]) => (
          <li key={n} className="relative rounded-lg border border-white/10 p-4"><span className="text-green-400 text-xs">{n}</span><p className="mt-1 font-bold text-white font-sans">{t}</p><p className="mt-2 text-xs text-green-100/70 font-sans leading-relaxed">{d}</p></li>
        ))}</ol>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-green-400 text-sm mb-6">## stack</h2>
        <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">{stack.map((s: any) => (
          <div key={s.id}><div className="flex justify-between text-sm"><span>{s.name}</span><span className="text-green-500">{s.level}%</span></div>
            <div className="mt-1 h-1 rounded bg-white/10"><div className="h-full rounded bg-green-400" style={{ width: `${s.level}%` }} /></div></div>
        ))}</div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 pb-24">
        <h2 className="text-green-400 text-sm mb-4">## ls ./other-projects</h2>
        <ul className="divide-y divide-white/10 text-sm font-sans">{rest.map((p: any) => (
          <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2.5"><span className="text-white">{p.title.split(' – ')[0]}</span><span className="text-xs text-green-300/70 font-mono">{p.tech.slice(0, 3).join(' · ')}</span></li>
        ))}</ul>
      </section>
    </div>
  );
};
export default AIEngineer;
