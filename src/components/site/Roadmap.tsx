import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
import { useRoadmap } from '../../hooks/usePortfolioData';
import Section from './Section';

const STATUS: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  completed: { label: 'Done', cls: 'text-teal-300 border-teal-300/40', icon: <CheckCircle2 size={16} /> },
  'in-progress': { label: 'In progress', cls: 'text-amber-300 border-amber-300/40', icon: <Loader2 size={16} className="animate-spin" /> },
  planned: { label: 'Planned', cls: 'text-gray-400 border-white/20', icon: <Circle size={16} /> },
};

const Roadmap: React.FC = () => {
  const { data } = useRoadmap();
  return (
    <Section id="roadmap" eyebrow="05 / Roadmap" title="Where this is heading." intro="What is done, what I am working on now, and what comes next.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((r: any, i: number) => {
          const s = STATUS[r.status] || STATUS.planned;
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${s.cls}`}>{s.icon}{s.label}</span>
                <span className="font-mono text-xs text-gray-500">{r.date}</span>
              </div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{r.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
export default Roadmap;
