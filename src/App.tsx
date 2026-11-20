import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import './index.css'
import Nav from './components/site/Nav'
import Footer from './components/site/Footer'
import Home from './pages/Home'
import Gateway from './worlds/Gateway'
import Recruiter from './worlds/Recruiter'
import RecruiterPlain from './worlds/RecruiterPlain'
const CastleWorld = lazy(() => import('./worlds/CastleWorld'))
import Designer from './worlds/Designer'
import AIEngineer from './worlds/AIEngineer'
import Analyst from './worlds/Analyst'
import Post from './pages/Post'
import TerminalIntro from './components/sections/TerminalIntro'
import AdminModal from './components/admin/AdminModal'
const Resume = lazy(() => import('./components/sections/Resume'))

// Old multi-page URLs now point at sections of the single page.
const LEGACY: Record<string, string> = {
  '/about': '/classic#about', '/philosophy': '/classic#about', '/skills': '/classic#skills', '/roadmap': '/classic#roadmap',
  '/projects': '/classic#projects', '/achievements': '/classic#experience', '/experience': '/classic#experience',
  '/blog': '/classic#writing', '/contact': '/classic#contact',
};

const AppContent = () => {
  const { pathname, hash } = useLocation();
  const chrome = pathname === '/classic' || pathname === '/resume' || pathname.startsWith('/blog/');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [adminSection, setAdminSection] = useState<string | null>(null);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => { setTerminalOpen(false); }, [pathname, hash]);

  useEffect(() => {
    if (!terminalOpen) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setTerminalOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [terminalOpen]);

  return (
    <div className="min-h-screen bg-aurora text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-teal-300 focus:text-black focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
      {chrome && <Nav onTerminal={() => setTerminalOpen(true)} />}
      <main id="main">
        <Routes>
          <Route path="/" element={<Gateway />} />
          <Route path="/classic" element={<Home />} />
          <Route path="/w/recruiter" element={<Recruiter />} />
          <Route path="/w/castle" element={<Suspense fallback={null}><CastleWorld /></Suspense>} />
          <Route path="/w/recruiter-plain" element={<RecruiterPlain />} />
          <Route path="/w/designer" element={<Designer />} />
          <Route path="/w/ai" element={<AIEngineer />} />
          <Route path="/w/analyst" element={<Analyst />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/resume" element={<div className="pt-16"><Suspense fallback={null}><Resume /></Suspense></div>} />
          {Object.entries(LEGACY).map(([from, to]) => <Route key={from} path={from} element={<Navigate to={to} replace />} />)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {chrome && <Footer />}

      <AnimatePresence>
        {terminalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setTerminalOpen(false)} role="dialog" aria-modal="true" aria-label="Terminal">
            <div className="relative w-full max-w-3xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setTerminalOpen(false)} aria-label="Close terminal" className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-[#0d1117] border border-white/20 hover:bg-black"><X size={16} /></button>
              <TerminalIntro onComplete={() => {}} onAdminMode={(s) => { setTerminalOpen(false); setAdminSection(s); }} instant isResizing={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adminSection && <AdminModal section={adminSection} onClose={() => setAdminSection(null)} />}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
}

export default App
