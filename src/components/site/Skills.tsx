import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSkills, useSkillCategories } from '../../hooks/usePortfolioData';
import Section from './Section';

const Skills: React.FC = () => {
  const { data: skills } = useSkills();
  const { data: cats } = useSkillCategories();
  const ordered = [...cats].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
  const [active, setActive] = useState<string>('all');
  const shown = skills.filter((s: any) => active === 'all' || s.category === active);

  return (
    <Section id="skills" eyebrow="04 / Skills" title="What I work with." intro="Bars are my own honest estimate of comfort, not a test score.">
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter skills by category">
        {[{ id: 'all', label: 'All' }, ...ordered].map((c: any) => (
          <button key={c.id} onClick={() => setActive(c.id)} aria-pressed={active === c.id} className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${active === c.id ? 'bg-teal-300 text-black border-teal-300' : 'border-white/15 text-gray-400 hover:text-white hover:border-white/40'}`}>{c.label}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
        {shown.map((s: any) => (
          <div key={s.id} title={s.desc}>
            <div className="flex items-baseline justify-between mb-1.5"><span className="font-medium">{s.name}</span><span className="font-mono text-xs text-gray-500">{s.level}%</span></div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"
              role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.name}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-200" />
            </div>
            <p className="mt-1.5 text-xs text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};
export default Skills;
