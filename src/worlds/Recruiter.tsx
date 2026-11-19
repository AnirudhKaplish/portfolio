import React from 'react';
import { Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useProfile, useProjects, useTimeline, useSkills } from '../hooks/usePortfolioData';
import WorldBar from './WorldBar';

const EMAIL = 'anirudh23.dev@gmail.com';

const Recruiter: React.FC = () => {
  const { profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: timeline } = useTimeline();
  const { data: skills } = useSkills();
  const jobs = timeline.filter((t: any) => t.type === 'work' || t.type === 'education');
  const extras = timeline.filter((t: any) => ['leadership', 'achievement', 'certification'].includes(t.type));
  const top = projects.filter((p: any) => p.featured).slice(0, 4);
  const strong = skills.filter((s: any) => s.level >= 85).map((s: any) => s.name);
  const h = 'font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-300 pb-2 mb-4';

  return (
    <div className="min-h-screen bg-[#f6f3ec] text-[#1b1b1b] selection:bg-yellow-200">
      <WorldBar current="recruiter" light />
      <main className="mx-auto max-w-3xl px-5 pt-24 pb-28 font-serif [&_h1]:font-sans [&_h3]:font-sans">
        <header>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Anirudh Kaplish</h1>
          <p className="mt-2 text-lg text-neutral-600">{profile.title} · B.Tech CSE, VIT Chennai · Chennai, India</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 underline underline-offset-4"><Mail size={14} />{EMAIL}</a>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-4"><Github size={14} />GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-4"><Linkedin size={14} />LinkedIn</a>
          </div>
        </header>

        <section className="mt-10"><h2 className={h}>Summary</h2><p className="text-lg leading-relaxed">{profile.about}</p></section>

        <section className="mt-10"><h2 className={h}>Experience &amp; education</h2>
          <div className="space-y-6">{jobs.map((t: any) => (
            <div key={t.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4"><h3 className="font-semibold">{t.title} <span className="font-normal text-neutral-600">· {t.org}</span></h3><span className="font-mono text-xs text-neutral-500">{t.date}</span></div>
              <ul className="mt-1.5 list-disc pl-5 space-y-1 text-[15px] leading-relaxed text-neutral-800">{String(t.desc).split('\n').map((l: string, i: number) => <li key={i}>{l.replace(/^•\s*/, '')}</li>)}</ul>
            </div>))}</div>
        </section>

        <section className="mt-10"><h2 className={h}>Selected projects</h2>
          <div className="space-y-5">{top.map((p: any) => (
            <div key={p.id}>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-neutral-800">{p.desc}</p>
              <p className="mt-1 font-mono text-xs text-neutral-500">{p.tech.join(' · ')}</p>
              <p className="mt-1 font-sans text-sm space-x-4">
                {p.link && <a className="underline underline-offset-4 inline-flex items-center gap-1" href={p.link} target="_blank" rel="noreferrer"><ExternalLink size={12} />Live</a>}
                {p.github && <a className="underline underline-offset-4" href={p.github} target="_blank" rel="noreferrer">Code</a>}
              </p>
            </div>))}</div>
        </section>

        <section className="mt-10"><h2 className={h}>Skills</h2><p className="leading-relaxed">{strong.join(' · ')}</p></section>

        <section className="mt-10"><h2 className={h}>Leadership &amp; certifications</h2>
          <ul className="space-y-1.5 text-[15px]">{extras.map((t: any) => <li key={t.id}><span className="font-semibold font-sans">{t.title}</span>, {t.org} <span className="font-mono text-xs text-neutral-500">{t.date}</span></li>)}</ul>
        </section>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-30 border-t border-black/10 bg-[#f6f3ec]/95 backdrop-blur px-4 py-3 flex justify-center gap-3 font-sans text-sm">
        <a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-2.5 font-semibold text-white"><Download size={15} />Download PDF résumé</a>
        <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-md border border-black/30 px-5 py-2.5 font-semibold"><Mail size={15} />Email me</a>
      </div>
    </div>
  );
};
export default Recruiter;
