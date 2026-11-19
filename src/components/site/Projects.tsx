import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, ExternalLink, X, Star } from 'lucide-react';
import { useProjects } from '../../hooks/usePortfolioData';
import Section from './Section';

const img = (p: string) => (p ? `${import.meta.env.BASE_URL}${p}` : '');

const Cover: React.FC<{ p: any; className?: string }> = ({ p, className = '' }) =>
  p.image ? (
    <img src={img(p.image)} alt={`${p.title} screenshot`} loading="lazy" className={`w-full h-full object-cover object-top ${className}`} />
  ) : (
    <div className={`w-full h-full grid place-items-center bg-gradient-to-br from-teal-300/10 to-transparent font-mono text-3xl text-teal-300/60 ${className}`}>{p.title.slice(0, 2).toUpperCase()}</div>
  );

const Links: React.FC<{ p: any }> = ({ p }) => (
  <div className="flex flex-wrap gap-3 text-sm">
    {p.link && <a href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200"><ExternalLink size={15} /> Live demo</a>}
    {p.github && <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white"><Github size={15} /> Code</a>}
  </div>
);

const Projects: React.FC = () => {
  const { data } = useProjects();
  const [filter, setFilter] = useState('All');
  const [sel, setSel] = useState<any | null>(null);

  const tags = useMemo(() => {
    const c: Record<string, number> = {};
    data.forEach((p: any) => p.tech.forEach((t: string) => { c[t] = (c[t] || 0) + 1; }));
    return ['All', ...Object.entries(c).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).map(([t]) => t).slice(0, 10)];
  }, [data]);

  const list = filter === 'All' ? data : data.filter((p: any) => p.tech.includes(filter));
  const featured = list.filter((p: any) => p.featured);
  const rest = list.filter((p: any) => !p.featured);

  useEffect(() => {
    if (!sel) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null);
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [sel]);

  return (
    <Section id="projects" eyebrow="03 / Projects" title="Things I have built." intro="Featured work first. Filter by technology, or open a card for the details.">
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by technology">
        {tags.map((t) => (
          <button key={t} onClick={() => setFilter(t)} aria-pressed={filter === t} className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${filter === t ? 'bg-teal-300 text-black border-teal-300' : 'border-white/15 text-gray-400 hover:text-white hover:border-white/40'}`}>{t}</button>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {featured.map((p: any, i: number) => (
            <motion.article key={p.id} layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} onClick={() => setSel(p)} className={`group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-teal-300/50 transition-colors ${i === 0 && featured.length % 2 === 1 ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''}`}>
              <div className="relative aspect-[16/10] overflow-hidden"><Cover p={p} className="group-hover:scale-[1.03] transition-transform duration-500" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur px-2.5 py-1 text-xs text-amber-300"><Star size={12} /> Featured</span></div>
              <div className="p-6 flex flex-col">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">{p.domain}</p>
                <h3 className="mt-1 text-xl md:text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed line-clamp-4">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t: string) => <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-gray-300">{t}</span>)}</div>
                <div className="mt-auto pt-5"><Links p={p} /></div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((p: any, i: number) => (
          <motion.article key={p.id} layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.05 }} onClick={() => setSel(p)} className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-teal-300/50 transition-colors">
            <div className="aspect-[16/10] overflow-hidden"><Cover p={p} className="group-hover:scale-[1.03] transition-transform duration-500" /></div>
            <div className="p-5 flex flex-col flex-1">
              <p className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">{p.domain}</p>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-3">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{p.tech.slice(0, 4).map((t: string) => <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-gray-300">{t}</span>)}</div>
              <div className="mt-auto pt-4"><Links p={p} /></div>
            </div>
          </motion.article>
        ))}
      </div>
      {list.length === 0 && <p className="text-gray-500">No projects use that technology yet.</p>}

      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSel(null)} role="dialog" aria-modal="true" aria-label={sel.title}>
            <motion.div initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl border border-white/10 bg-[#0d1117]">
              <button onClick={() => setSel(null)} aria-label="Close" className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black"><X size={18} /></button>
              <div className="aspect-[16/9]"><Cover p={sel} /></div>
              <div className="p-6 md:p-8">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">{sel.domain}</p>
                <h3 className="mt-1 text-2xl font-bold">{sel.title}</h3>
                <p className="mt-3 text-gray-300 leading-relaxed">{sel.desc}</p>
                <ul className="mt-5 space-y-2 text-gray-400 list-disc pl-5">{sel.details.map((d: string) => <li key={d}>{d}</li>)}</ul>
                <div className="mt-5 flex flex-wrap gap-1.5">{sel.tech.map((t: string) => <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-gray-300">{t}</span>)}</div>
                <div className="mt-6"><Links p={sel} /></div>
                {!sel.link && <p className="mt-4 text-xs text-gray-600">No hosted demo: this project needs a backend that static hosting cannot run.</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
export default Projects;
