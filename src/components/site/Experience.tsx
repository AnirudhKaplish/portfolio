import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Trophy, FlaskConical } from 'lucide-react';
import { useTimeline } from '../../hooks/usePortfolioData';
import Section from './Section';

const ICON: Record<string, React.ReactNode> = {
  work: <Briefcase size={16} />, education: <GraduationCap size={16} />, certification: <Award size={16} />,
  leadership: <Users size={16} />, achievement: <Trophy size={16} />, research: <FlaskConical size={16} />,
};

const Experience: React.FC = () => {
  const { data } = useTimeline();
  const main = data.filter((t: any) => t.type === 'work' || t.type === 'education');
  const other = data.filter((t: any) => !['work', 'education'].includes(t.type));
  return (
    <Section id="experience" eyebrow="02 / Experience" title="Where I have worked and studied." intro="Newest first.">
      <ol className="relative border-l border-white/10 ml-3 space-y-10">
        {main.map((t: any, i: number) => (
          <motion.li key={t.id} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.04 }} className="pl-8 relative">
            <span className="absolute -left-[13px] top-1 grid place-items-center h-6 w-6 rounded-full bg-[#06080d] border border-teal-300/50 text-teal-300">{ICON[t.type]}</span>
            <p className="font-mono text-xs text-teal-300">{t.date}</p>
            <h3 className="mt-1 text-xl font-semibold">{t.title}</h3>
            <p className="text-gray-400">{t.org}</p>
            <ul className="mt-3 space-y-2 text-gray-300 leading-relaxed max-w-3xl">
              {String(t.desc).split('\n').map((line: string, k: number) => <li key={k}>{line.replace(/^•\s*/, '')}</li>)}
            </ul>
          </motion.li>
        ))}
      </ol>

      <h3 className="mt-20 mb-6 text-2xl font-semibold">Leadership, awards &amp; certifications</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {other.map((t: any) => (
          <div key={t.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-300/40 transition-colors">
            <div className="flex items-center justify-between text-teal-300 mb-3">{ICON[t.type]}<span className="font-mono text-xs text-gray-500">{t.date}</span></div>
            <h4 className="font-semibold">{t.title}</h4>
            <p className="text-sm text-gray-400">{t.org}</p>
            {t.desc && <p className="mt-2 text-sm text-gray-500 leading-relaxed whitespace-pre-line">{t.desc}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
};
export default Experience;
