import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, FileText } from 'lucide-react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

const Nav: React.FC<{ onTerminal: () => void }> = ({ onTerminal }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) { setActive(''); return; }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [onHome]);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-colors ${scrolled || open ? 'bg-[#06080d]/85 backdrop-blur-xl border-b border-white/10' : 'border-b border-transparent'}`}>
      <nav className="mx-auto max-w-6xl h-16 px-5 md:px-8 flex items-center justify-between" aria-label="Main">
        <Link to="/" className="font-mono font-bold text-lg tracking-tight" onClick={() => setOpen(false)}>
          <span className="text-teal-300">&lt;</span>AK<span className="text-teal-300"> /&gt;</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l.id}>
              <Link to={`/#${l.id}`} className={`px-3 py-2 rounded-md text-sm transition-colors ${active === l.id ? 'text-teal-300' : 'text-gray-400 hover:text-white'}`}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={onTerminal} aria-label="Open terminal" className="p-2 rounded-md text-gray-400 hover:text-teal-300 hover:bg-white/5 transition-colors"><Terminal size={18} /></button>
          <Link to="/resume" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-teal-300 text-black hover:bg-teal-200 transition-colors"><FileText size={16} /> Résumé</Link>
        </div>
        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link key={l.id} to={`/#${l.id}`} onClick={() => setOpen(false)} className="py-3 text-gray-300 border-b border-white/5">{l.label}</Link>
          ))}
          <div className="flex gap-2 pt-3">
            <Link to="/resume" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-3 rounded-md font-medium bg-teal-300 text-black">Résumé</Link>
            <button onClick={() => { setOpen(false); onTerminal(); }} className="px-4 py-3 rounded-md border border-white/15" aria-label="Open terminal"><Terminal size={18} /></button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Nav;
