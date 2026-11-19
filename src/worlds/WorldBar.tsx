import React from 'react';
import { Link } from 'react-router-dom';
import { WORLDS, type WorldId } from './worlds';

const WorldBar: React.FC<{ current: WorldId; light?: boolean }> = ({ current, light }) => (
  <nav aria-label="Switch view" className={`fixed top-3 left-1/2 -translate-x-1/2 z-40 flex max-w-[calc(100vw-1rem)] items-center gap-1 overflow-x-auto rounded-full border px-1.5 py-1.5 text-xs backdrop-blur-xl [scrollbar-width:none] ${light ? 'bg-white/85 border-black/10 text-black' : 'bg-black/60 border-white/15 text-white'}`}>
    <Link to="/" className="whitespace-nowrap rounded-full px-3 py-1.5 opacity-70 hover:opacity-100">Who&apos;s looking?</Link>
    {WORLDS.map((w) => (
      <Link key={w.id} to={`/w/${w.id}`} aria-current={w.id === current ? 'page' : undefined}
        className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition-colors ${w.id === current ? (light ? 'bg-black text-white' : 'bg-white text-black') : 'opacity-70 hover:opacity-100'}`}>{w.label}</Link>
    ))}
    <Link to="/classic" className="whitespace-nowrap rounded-full px-3 py-1.5 opacity-70 hover:opacity-100">Classic</Link>
  </nav>
);
export default WorldBar;
