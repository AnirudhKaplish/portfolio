import React, { Suspense, lazy, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WORLDS } from './worlds';

const LensScene = lazy(() => import('./LensScene'));

const canWebGL = () => {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
};

const Gateway: React.FC = () => {
  const gl = useMemo(canWebGL, []);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
      <div className="absolute inset-0" aria-hidden>
        {gl && <Suspense fallback={null}><LensScene /></Suspense>}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05060a_85%)]" aria-hidden />
      <div className="relative z-10 flex min-h-screen flex-col items-center px-5 pt-16 md:pt-20 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300">Anirudh Kaplish · Portfolio</p>
        <h1 className="mt-4 text-center text-5xl sm:text-7xl font-bold tracking-tight">Who&apos;s looking?</h1>
        <p className="mt-4 max-w-md text-center text-gray-400">Same person, four views. Pick the lens that fits you{gl ? ', or click a shape' : ''}.</p>
        <div className="flex-1" />
        <div className="grid w-full max-w-5xl grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {WORLDS.map((w) => (
            <Link key={w.id} to={`/w/${w.id}`} className="group rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md p-3 sm:p-5 hover:border-white/40 transition-colors">
              <span className="block h-1.5 w-8 rounded-full" style={{ background: w.color }} />
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold flex items-center justify-between">{w.label}<ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></p>
              <p className="mt-1 hidden sm:block text-sm text-gray-400">{w.blurb}</p>
            </Link>
          ))}
        </div>
        <Link to="/classic" className="mt-6 text-sm text-gray-400 hover:text-white underline underline-offset-4">Just show me everything on one page</Link>
      </div>
    </div>
  );
};
export default Gateway;
