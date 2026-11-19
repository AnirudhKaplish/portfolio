import React from 'react';
import { motion } from 'framer-motion';

interface Props { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode; }

const Section: React.FC<Props> = ({ id, eyebrow, title, intro, children }) => (
  <section id={id} className="relative py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }} className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-300 mb-3">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
        {intro && <p className="mt-4 text-gray-400 text-lg leading-relaxed">{intro}</p>}
      </motion.div>
      {children}
    </div>
  </section>
);
export default Section;
