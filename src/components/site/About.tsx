import React from 'react';
import { motion } from 'framer-motion';
import { useProfile, usePhilosophy } from '../../hooks/usePortfolioData';
import Section from './Section';

const About: React.FC = () => {
  const { profile } = useProfile();
  const { data: philosophy } = usePhilosophy();
  return (
    <Section id="about" eyebrow="01 / About" title="Careful data work, clean engineering.">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <p className="text-lg text-gray-300 leading-relaxed">{profile.about}</p>
        <dl className="grid grid-cols-2 gap-3">
          {(profile.stats || []).map((s: any) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <dd className="text-3xl font-bold text-teal-300">{s.value}</dd>
              <dt className="mt-1 text-xs font-mono uppercase tracking-wider text-gray-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {philosophy.map((p: any, i: number) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-xl border border-white/10 p-5 hover:border-teal-300/40 transition-colors">
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
export default About;
