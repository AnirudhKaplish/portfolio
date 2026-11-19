import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Copy, Check, MapPin } from 'lucide-react';
import { useProfile } from '../../hooks/usePortfolioData';
import PhoneDemo from './PhoneDemo';

const EMAIL = 'anirudh23.dev@gmail.com';
const TECH = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'SQL', 'PyTorch', 'Docker', 'Tailwind', 'Firebase', 'FastAPI', 'Tableau'];

const Hero: React.FC = () => {
  const { profile } = useProfile();
  const titles: string[] = profile.titles?.length ? profile.titles : [profile.title];
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % titles.length), 2600);
    return () => clearInterval(t);
  }, [titles.length]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/5 px-3.5 py-1.5 text-sm text-teal-200">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" /></span>
            Open to analytics, consulting &amp; software roles
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            Anirudh<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-400">Kaplish</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5 font-mono text-sm md:text-base text-gray-400 h-6" aria-live="polite">
            <span className="text-teal-300">$</span> <span key={i}>{titles[i].toLowerCase()}</span><span className="animate-pulse">_</span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">{profile.bio}</motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-teal-300 text-black font-semibold hover:bg-teal-200 transition-colors">See my work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></a>
            <a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 hover:border-white/50 transition-colors"><Download size={18} /> Download résumé</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            <button onClick={copy} className="inline-flex items-center gap-2 font-mono hover:text-white transition-colors" aria-label="Copy email address">
              <Mail size={16} className="text-teal-300" /> {EMAIL} {copied ? <Check size={14} className="text-teal-300" /> : <Copy size={14} />}
            </button>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Github size={16} /> GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Linkedin size={16} /> LinkedIn</a>
            <span className="inline-flex items-center gap-2"><MapPin size={16} /> Chennai, India</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
          <PhoneDemo />
          <p className="mt-6 text-center font-mono text-xs text-gray-500">Tap an app. It&apos;s a working phone.</p>
        </motion.div>
      </div>

      <div className="relative mt-20 border-y border-white/10 py-4 overflow-hidden" aria-hidden>
        <div className="marquee-track flex gap-10 font-mono text-sm text-gray-500">
          {[...TECH, ...TECH].map((t, n) => <span key={n} className="flex items-center gap-10">{t}<span className="text-teal-300/60">/</span></span>)}
        </div>
      </div>
    </section>
  );
};
export default Hero;
