import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin, ExternalLink, Shield, ScrollText } from 'lucide-react';
import { useProfile, useProjects, useTimeline, useSkills } from '../hooks/usePortfolioData';
import WorldBar from './WorldBar';

const Embers = lazy(() => import('./Embers'));
const EMAIL = 'anirudh23.dev@gmail.com';
const hasGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();
const ROOMS = [
  { id: 'gate', label: 'The Gate' }, { id: 'hall', label: 'The Hall' }, { id: 'library', label: 'The Library' },
  { id: 'gallery', label: 'The Gallery' }, { id: 'alchemy', label: 'Alchemy Room' }, { id: 'trophies', label: 'Trophy Room' }, { id: 'post', label: 'The Post Room' },
];
const POTION = ['#5eead4', '#c084fc', '#fb7185', '#fbbf24', '#60a5fa', '#4ade80'];

const Candle: React.FC<{ d: number; h: number }> = ({ d, h }) => (
  <div className="candle-bob flex flex-col items-center" style={{ animationDelay: `${d}s` }}>
    <div className="flame" style={{ animationDelay: `${d / 2}s` }} />
    <div className="w-2.5 rounded-sm bg-gradient-to-b from-[#fff3d6] to-[#d9c08a]" style={{ height: h }} />
  </div>
);

const Room: React.FC<{ id: string; bg: string; glow?: string; children: React.ReactNode; className?: string }> = ({ id, bg, glow = 'rgba(255,185,56,.18)', children, className = '' }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  return (
    <section ref={ref} id={id} className={`relative min-h-screen overflow-hidden flex items-center ${className}`} style={{ background: bg }}>
      <motion.div style={{ y, background: `radial-gradient(40rem 26rem at 78% 30%, ${glow}, transparent 70%)` }} className="absolute inset-0 pointer-events-none" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,.18)_0_2px,transparent_2px_120px)] opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8 py-24">{children}</div>
    </section>
  );
};

const Title: React.FC<{ n: string; name: string; sub: string }> = ({ n, name, sub }) => (
  <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
    <p className="font-castle text-xs tracking-[0.4em] text-amber-300/80">ROOM {n}</p>
    <h2 className="font-castle mt-2 text-3xl md:text-5xl font-bold text-amber-100 drop-shadow-[0_2px_12px_rgba(255,185,56,.35)]">{name}</h2>
    <p className="font-script mt-3 text-lg text-amber-100/70 italic">{sub}</p>
  </motion.header>
);

const Bottle: React.FC<{ name: string; level: number; color: string; i: number }> = ({ name, level, color, i }) => {
  const h = (54 * level) / 100; const id = `liq-${i}`;
  return (
    <div className="group flex flex-col items-center" title={`${name}: ${level}%`}>
      <svg viewBox="0 0 60 90" className="w-16 md:w-20 drop-shadow-[0_6px_10px_rgba(0,0,0,.6)]" role="img" aria-label={`${name} ${level}%`}>
        <defs><clipPath id={id}><path d="M24 6h12v18l14 22c6 10 2 38-20 38S4 56 10 46l14-22z" /></clipPath></defs>
        <g clipPath={`url(#${id})`}>
          <rect x="0" y="0" width="60" height="90" fill="rgba(255,255,255,.07)" />
          <motion.rect x="0" width="60" height="60" fill={color} initial={{ y: 84 }} whileInView={{ y: 84 - h }} viewport={{ once: true }} transition={{ duration: 1.1, delay: i * 0.05 }} opacity=".9" />
          <motion.path d="M0 0q8 -4 15 0t15 0 15 0 15 0v6H0z" fill={color} initial={{ y: 84 }} whileInView={{ y: 80 - h }} viewport={{ once: true }} transition={{ duration: 1.1, delay: i * 0.05 }} opacity=".55" />
        </g>
        <path d="M24 6h12v18l14 22c6 10 2 38-20 38S4 56 10 46l14-22z" fill="none" stroke="#f3e6c4" strokeWidth="2" opacity=".85" />
        <rect x="22" y="2" width="16" height="6" rx="2" fill="#7a520f" />
      </svg>
      <p className="mt-1 text-center font-castle text-[11px] md:text-xs text-amber-100/90 leading-tight max-w-[5.5rem]">{name}</p>
      <p className="font-mono text-[10px] text-amber-300/70">{level}%</p>
    </div>
  );
};

const Recruiter: React.FC = () => {
  const { profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: timeline } = useTimeline();
  const { data: skills } = useSkills();
  const [active, setActive] = useState('gate');
  const jobs = timeline.filter((t: any) => t.type === 'work' || t.type === 'education');
  const honours = timeline.filter((t: any) => !['work', 'education'].includes(t.type));
  const framed = projects.filter((p: any) => p.image).slice(0, 8);
  const bottles = [...skills].sort((a: any, b: any) => b.level - a.level).slice(0, 14);

  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -45% 0px' });
    ROOMS.forEach((r) => { const el = document.getElementById(r.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-[#0b0a10] text-amber-50 font-script">
      <WorldBar current="recruiter" />
      {hasGL && <div className="pointer-events-none fixed inset-0 z-[5] opacity-70" aria-hidden><Suspense fallback={null}><Embers /></Suspense></div>}

      <nav aria-label="Rooms" className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {ROOMS.map((r) => (
          <button key={r.id} onClick={() => go(r.id)} aria-label={`Go to ${r.label}`} aria-current={active === r.id} className="group flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full border border-amber-300 transition-all ${active === r.id ? 'bg-amber-300 scale-125 shadow-[0_0_10px_#ffb938]' : 'bg-transparent'}`} />
            <span className={`font-castle text-[11px] tracking-wider transition-opacity ${active === r.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`}>{r.label}</span>
          </button>
        ))}
      </nav>
      <div className="fixed bottom-4 left-4 z-40 rounded-full bg-black/70 px-3 py-1.5 font-castle text-[11px] tracking-wider text-amber-200 backdrop-blur lg:hidden">{ROOMS.find((r) => r.id === active)?.label}</div>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 text-sm">
        <a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2.5 font-castle font-semibold text-black shadow-lg hover:bg-amber-200"><Download size={15} />Résumé PDF</a>
        <Link to="/w/recruiter-plain" className="rounded-full bg-black/70 px-3 py-1.5 text-xs text-amber-100/80 backdrop-blur hover:text-white">Skip the tour: plain résumé</Link>
      </div>

      {/* THE GATE */}
      <Room id="gate" bg="radial-gradient(ellipse at 50% 100%, #2a1a3a 0%, #0b0a10 70%)" glow="rgba(255,185,56,.22)" className="text-center">
        <div className="absolute left-[8%] top-1/3 hidden md:block"><Candle d={0} h={46} /></div>
        <div className="absolute right-[8%] top-1/3 hidden md:block"><Candle d={1.2} h={46} /></div>
        <svg viewBox="0 0 300 340" className="mx-auto w-52 md:w-72 drop-shadow-[0_0_40px_rgba(255,185,56,.35)]" aria-hidden>
          <defs><linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd98a" /><stop offset="1" stopColor="#7a3b10" /></linearGradient></defs>
          <path d="M30 330V130C30 60 90 10 150 10s120 50 120 120v200z" fill="#14101c" stroke="#a8761d" strokeWidth="6" />
          <path d="M70 330V135C70 85 108 50 150 50s80 35 80 85v195z" fill="url(#gl)" opacity=".9" />
          <path d="M150 50v280M70 190h160M82 110h136" stroke="#14101c" strokeWidth="5" />
        </svg>
        <h1 className="font-castle mt-8 text-4xl sm:text-6xl font-bold text-amber-100 drop-shadow-[0_2px_20px_rgba(255,185,56,.45)]">Anirudh Kaplish</h1>
        <p className="mt-3 text-xl italic text-amber-100/80">{profile.title}. Step inside and I&apos;ll show you around.</p>
        <button onClick={() => go('hall')} className="font-castle mt-8 inline-flex items-center gap-2 rounded-full border border-amber-300 px-7 py-3 text-amber-200 hover:bg-amber-300 hover:text-black transition-colors">Begin the tour <ArrowDown size={16} /></button>
      </Room>

      {/* THE HALL */}
      <Room id="hall" bg="linear-gradient(180deg,#0b0a10,#1b1230 60%,#0b0a10)" glow="rgba(192,132,252,.2)">
        <div className="absolute inset-x-0 top-4 flex justify-around px-6" aria-hidden>{[0, .8, 1.6, .4, 1.2, 2, .6, 1.4].map((d, i) => <Candle key={i} d={d} h={14 + (i % 3) * 8} />)}</div>
        <Title n="I" name="The Hall" sub="Who is hosting this tour" />
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="gold-frame mx-auto w-48 md:w-56 bg-[#f1eee7]"><img src={`${import.meta.env.BASE_URL}ani.webp`} alt="Portrait of Anirudh Kaplish" className="aspect-[4/5] w-full object-cover object-top" /></div>
          <div className="parchment rounded-md p-6 md:p-8">
            <p className="text-xl leading-relaxed">{profile.about}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">{(profile.stats || []).map((s: any) => (
              <div key={s.label} className="rounded border border-[#a8761d]/50 bg-[#d9c08a]/40 px-2 py-3 text-center"><p className="font-castle text-2xl font-bold">{s.value}</p><p className="text-[11px] uppercase tracking-wider">{s.label}</p></div>
            ))}</div>
          </div>
        </div>
      </Room>

      {/* THE LIBRARY */}
      <Room id="library" bg="linear-gradient(180deg,#0b0a10,#241508 55%,#0b0a10)" glow="rgba(217,119,6,.2)">
        <Title n="II" name="The Library" sub="Roles and studies, newest on the top shelf" />
        <div className="mx-auto max-w-3xl space-y-5">{jobs.map((t: any, i: number) => (
          <motion.article key={t.id} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} className="parchment rounded-md border-l-[14px] border-[#7a2e1b] p-5 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-castle text-lg font-bold">{t.title}</h3><span className="font-castle text-xs tracking-wider text-[#7a2e1b]">{t.date}</span></div>
            <p className="italic text-[#5b4326]">{t.org}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">{String(t.desc).split('\n').map((l: string, k: number) => <li key={k}>{l.replace(/^•\s*/, '')}</li>)}</ul>
          </motion.article>
        ))}</div>
      </Room>

      {/* THE GALLERY */}
      <Room id="gallery" bg="linear-gradient(180deg,#0b0a10,#102020 55%,#0b0a10)" glow="rgba(94,234,212,.16)">
        <Title n="III" name="The Gallery" sub="Framed work. Hover a frame, open the tome" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{framed.map((p: any, i: number) => (
          <motion.figure key={p.id} initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.2 : -1.2 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ rotate: 0, scale: 1.02 }} className="group">
            <div className="gold-frame bg-black"><img src={`${import.meta.env.BASE_URL}${p.image}`} alt={`${p.title} screenshot`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top sepia-[.25] group-hover:sepia-0 transition" /></div>
            <figcaption className="mt-3 text-center">
              <p className="font-castle font-bold text-amber-100">{p.title.split(' – ')[0]}</p>
              <p className="text-sm italic text-amber-100/70 line-clamp-2">{p.desc}</p>
              <p className="mt-1 font-mono text-[10px] text-amber-300/70">{p.tech.slice(0, 4).join(' · ')}</p>
              <p className="mt-2 flex justify-center gap-4 text-sm">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100"><ExternalLink size={13} />Visit</a>}
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-amber-100/80 hover:text-white"><ScrollText size={13} />Source</a>}
              </p>
            </figcaption>
          </motion.figure>
        ))}</div>
      </Room>

      {/* ALCHEMY */}
      <Room id="alchemy" bg="linear-gradient(180deg,#0b0a10,#0d2a22 55%,#0b0a10)" glow="rgba(74,222,128,.18)">
        <Title n="IV" name="The Alchemy Room" sub="The fuller the flask, the more comfortable I am" />
        <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-8 md:gap-x-8">{bottles.map((s: any, i: number) => <Bottle key={s.id} i={i} name={s.name} level={s.level} color={POTION[i % POTION.length]} />)}</div>
      </Room>

      {/* TROPHIES */}
      <Room id="trophies" bg="linear-gradient(180deg,#0b0a10,#2a1c06 55%,#0b0a10)" glow="rgba(251,191,36,.2)">
        <Title n="V" name="The Trophy Room" sub="Leadership, honours and certificates" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{honours.map((t: any) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="parchment relative rounded-md p-5 pt-8">
            <Shield size={30} className="absolute -top-4 left-5 fill-amber-300 text-[#7a520f]" />
            <p className="font-castle text-xs tracking-wider text-[#7a2e1b]">{t.date}</p>
            <h3 className="font-castle mt-1 font-bold">{t.title}</h3>
            <p className="italic text-[#5b4326]">{t.org}</p>
            {t.desc && <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">{t.desc}</p>}
          </motion.div>
        ))}</div>
      </Room>

      {/* POST ROOM */}
      <Room id="post" bg="radial-gradient(ellipse at 50% 0%, #2a1a3a 0%, #0b0a10 70%)" glow="rgba(251,113,133,.15)">
        <Title n="VI" name="The Post Room" sub="Send word. I reply quickly" />
        <div className="parchment mx-auto max-w-xl rounded-md p-8 text-center">
          <div className="mx-auto -mt-14 mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#8a1f1f] font-castle text-lg font-bold text-amber-100 shadow-lg">AK</div>
          <p className="text-xl leading-relaxed">I am looking for analytics, consulting and software roles. Write to me, or take the résumé with you.</p>
          <a href={`mailto:${EMAIL}`} className="font-castle mt-5 inline-flex items-center gap-2 text-lg font-bold underline underline-offset-4"><Mail size={18} />{EMAIL}</a>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="font-castle inline-flex items-center gap-2 rounded-full bg-[#3a2a14] px-5 py-2.5 text-amber-100"><Download size={15} />Résumé PDF</a>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#3a2a14]/50 px-5 py-2.5"><Github size={15} />GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#3a2a14]/50 px-5 py-2.5"><Linkedin size={15} />LinkedIn</a>
          </div>
        </div>
      </Room>
    </div>
  );
};
export default Recruiter;
