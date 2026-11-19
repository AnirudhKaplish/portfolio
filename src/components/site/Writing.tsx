import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useBlogPosts } from '../../hooks/usePortfolioData';
import { POSTS } from '../../hooks/data/posts';
import Section from './Section';

const t = (d: string) => { const n = Date.parse(`1 ${d}`); return Number.isNaN(n) ? 0 : n; };

const Writing: React.FC = () => {
  const { data: ext } = useBlogPosts();
  const items = [
    ...POSTS.map((p) => ({ key: p.slug, to: `/blog/${p.slug}`, href: '', title: p.title, date: p.date, readTime: p.readTime, desc: p.summary, tags: p.tags, ts: Date.parse(p.sortKey) })),
    ...ext.map((p: any) => ({ key: p.id, to: '', href: p.link, title: p.title, date: p.date, readTime: p.readTime, desc: p.desc, tags: p.tags, ts: t(p.date) })),
  ].sort((a, b) => b.ts - a.ts);

  return (
    <Section id="writing" eyebrow="06 / Writing" title="Notes from building things." intro="Short write-ups on bugs, trade-offs and decisions. Newest first.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p, i) => {
          const inner = (
            <>
              <div className="flex items-center justify-between font-mono text-xs text-gray-500"><span>{p.date}</span><span>{p.readTime} read</span></div>
              <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-teal-300 transition-colors">{p.title}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">{p.tags.map((tg: string) => <span key={tg} className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-gray-300">{tg}</span>)}</div>
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-teal-300 transition-colors" />
              </div>
            </>
          );
          const cls = 'group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-300/50 transition-colors h-full';
          return (
            <motion.div key={p.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.05 }}>
              {p.to ? <Link to={p.to} className={cls}>{inner}</Link> : <a href={p.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
export default Writing;
