import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowDown } from 'lucide-react';
import { useProjects, usePhilosophy } from '../hooks/usePortfolioData';
import PhoneDemo from '../components/site/PhoneDemo';
import WorldBar from './WorldBar';

const Gallery3D = lazy(() => import('./Gallery3D'));
const hasGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();

const Designer: React.FC = () => {
  const { data: projects } = useProjects();
  const { data: phil } = usePhilosophy();
  const ux = phil.find((p: any) => /user/i.test(p.title));
  const show = projects.filter((p: any) => p.image).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#07060b] text-white overflow-x-hidden">
      <WorldBar current="designer" />
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-purple-600/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[36rem] w-[36rem] rounded-full bg-teal-500/20 blur-[140px]" />
      </div>

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-28 pb-16 md:grid-cols-[1.2fr_1fr] md:min-h-screen">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300">Anirudh Kaplish · Design &amp; front end</p>
          <h1 className="mt-5 text-5xl sm:text-7xl font-bold leading-[1.02] tracking-tight">Screens people<br />actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-teal-200">want to use.</span></h1>
          <p className="mt-6 max-w-lg text-lg text-gray-300 leading-relaxed">{ux?.desc || 'Clean UI and UX paired with solid engineering.'} I design in Figma and ship in React, Next.js and Tailwind.</p>
          <a href="#work" className="mt-8 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"><ArrowDown size={16} />Scroll for the work, or play with the phone</a>
        </div>
        <div><PhoneDemo /></div>
      </section>

      <section id="work" className="relative mx-auto max-w-6xl px-5 py-16">
        {hasGL && (
          <>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300 mb-3">Walk the gallery</p>
            <Suspense fallback={<div className="h-[78vh] grid place-items-center text-gray-500">Hanging the frames…</div>}><Gallery3D projects={show} /></Suspense>
            <details className="mt-6 text-sm text-gray-400"><summary className="cursor-pointer hover:text-white">Prefer a plain list?</summary>
              <ul className="mt-3 space-y-2">{show.map((p: any) => <li key={p.id}><span className="text-white">{p.title.split(' – ')[0]}</span> · {p.desc} {p.link && <a className="text-teal-300 underline" href={p.link} target="_blank" rel="noreferrer">Live</a>} {p.github && <a className="text-gray-300 underline" href={p.github} target="_blank" rel="noreferrer">Code</a>}</li>)}</ul></details>
          </>
        )}
      </section>
      {!hasGL && (
      <section className="relative mx-auto max-w-6xl px-5 py-20 space-y-24">
        {show.map((p: any, i: number) => (
          <motion.article key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl"><img src={`${import.meta.env.BASE_URL}${p.image}`} alt={`${p.title} screenshot`} loading="lazy" className="w-full aspect-[16/10] object-cover object-top hover:scale-[1.03] transition-transform duration-700" /></div>
            <div>
              <p className="font-mono text-xs text-purple-300">{String(i + 1).padStart(2, '0')} / {p.domain}</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{p.title.split(' – ')[0]}</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">{p.desc}</p>
              <p className="mt-4 font-mono text-xs text-gray-500">{p.tech.join(' · ')}</p>
              <div className="mt-5 flex gap-5 text-sm">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200"><ExternalLink size={15} />Live demo</a>}
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white"><Github size={15} />Code</a>}
              </div>
            </div>
          </motion.article>
        ))}
      </section>
      )}
      <footer className="relative border-t border-white/10 py-10 text-center text-sm text-gray-500">Want something built? <a className="text-teal-300 underline underline-offset-4" href="mailto:anirudh23.dev@gmail.com">anirudh23.dev@gmail.com</a></footer>
    </div>
  );
};
export default Designer;
