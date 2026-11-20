import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { ChevronLeft, ChevronRight, Compass, X, ExternalLink, Github } from 'lucide-react';
import * as THREE from 'three';

const GAP = 4.6;
const base = import.meta.env.BASE_URL;

const Frame: React.FC<{ p: any; i: number; tex: THREE.Texture; onOpen: (p: any) => void; active: boolean }> = ({ p, i, tex, onOpen, active }) => {
  const side = i % 2 ? 1 : -1;
  const [hot, setHot] = useState(false);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <group position={[side * 2.55, 1.7, -i * GAP]} rotation={[0, -side * Math.PI / 2, 0]}>
      <mesh position={[0, 0, -0.04]}><boxGeometry args={[3.7, 2.5, 0.08]} /><meshStandardMaterial color="#b8892a" metalness={0.8} roughness={0.35} /></mesh>
      <mesh onClick={() => onOpen(p)} onPointerOver={() => { setHot(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHot(false); document.body.style.cursor = ''; }}>
        <planeGeometry args={[3.3, 2.06]} />
        <meshStandardMaterial map={tex} emissive="#ffffff" emissiveMap={tex} emissiveIntensity={hot || active ? 0.55 : 0.28} />
      </mesh>
      <pointLight position={[0, 1.9, 1.2]} intensity={active ? 9 : 3} distance={6} color="#ffd9a0" />
    </group>
  );
};

const Rig: React.FC<{ idx: number; free: boolean }> = ({ idx, free }) => {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    if (free) return;
    const z = -idx * GAP + 3.4;
    camera.position.x += (0 - camera.position.x) * Math.min(1, dt * 3);
    camera.position.y += (1.6 - camera.position.y) * Math.min(1, dt * 3);
    camera.position.z += (z - camera.position.z) * Math.min(1, dt * 2.6);
    const side = idx % 2 ? 1 : -1;
    target.current.set(side * 1.1, 1.6, -idx * GAP - 1);
    camera.lookAt(target.current);
  });
  return null;
};

const Corridor: React.FC<{ projects: any[]; idx: number; free: boolean; onOpen: (p: any) => void }> = ({ projects, idx, free, onOpen }) => {
  const texes = useTexture(projects.map((p) => `${base}${p.image}`)) as THREE.Texture[];
  const L = projects.length * GAP + 8;
  return (
    <>
      <color attach="background" args={['#07060b']} />
      <fog attach="fog" args={['#07060b', 6, 22]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 3, 2]} intensity={10} color="#c4b5fd" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -L / 2 + 6]}><planeGeometry args={[6, L]} /><meshStandardMaterial color="#14101c" metalness={0.6} roughness={0.25} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[s * 3, 2, -L / 2 + 6]} rotation={[0, -s * Math.PI / 2, 0]}><planeGeometry args={[L, 4]} /><meshStandardMaterial color="#1c1530" roughness={0.9} /></mesh>)}
      <mesh position={[0, 4, -L / 2 + 6]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[6, L]} /><meshStandardMaterial color="#0d0a16" /></mesh>
      {projects.map((p, i) => <Frame key={p.id} p={p} i={i} tex={texes[i]} onOpen={onOpen} active={i === idx} />)}
      <Rig idx={idx} free={free} />
      {free && <OrbitControls makeDefault enablePan={false} minDistance={1} maxDistance={14} target={[0, 1.6, -idx * GAP]} />}
    </>
  );
};

const Gallery3D: React.FC<{ projects: any[] }> = ({ projects }) => {
  const [idx, setIdx] = useState(0);
  const [free, setFree] = useState(false);
  const [open, setOpen] = useState<any | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const N = projects.length;
  const go = (d: number) => setIdx((i) => Math.min(N - 1, Math.max(0, i + d)));

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const r = stage.current?.getBoundingClientRect(); if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === 'Escape') setOpen(null);
      if (open) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open, N]);

  const cur = projects[idx];
  const btn = 'inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/60 px-3.5 py-2 text-sm backdrop-blur hover:border-white/50 disabled:opacity-30';
  return (
    <div ref={stage} className="relative h-[78vh] min-h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-black" aria-label="3D project gallery">
      <Canvas camera={{ position: [0, 1.6, 3.4], fov: 60 }} dpr={[1, 1.6]}>
        <Suspense fallback={null}><Corridor projects={projects} idx={idx} free={free} onOpen={setOpen} /></Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <div><p className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-300">Gallery of work</p><p className="mt-1 text-sm text-gray-300 max-w-[14rem]">Use the arrows, or click a frame.</p></div>
        <div className="pointer-events-auto flex flex-col items-end gap-1.5" role="tablist" aria-label="Choose exhibit">
          {projects.map((p, i) => <button key={p.id} onClick={() => { setFree(false); setIdx(i); }} aria-label={`Go to ${p.title}`} aria-current={i === idx} className={`h-2.5 rounded-full transition-all ${i === idx ? 'w-6 bg-purple-300' : 'w-2.5 bg-white/30 hover:bg-white/60'}`} />)}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-black/90 to-transparent p-4 pt-14">
        <div className="min-w-0"><p className="font-mono text-xs text-purple-300">{idx + 1} of {N}</p><p className="truncate text-xl font-bold">{cur.title.split(' – ')[0]}</p><p className="max-w-md text-sm text-gray-400 line-clamp-1">{cur.desc}</p></div>
        <div className="flex gap-2">
          <button className={btn} onClick={() => setFree((f) => !f)} aria-pressed={free}><Compass size={15} />{free ? 'Back on rails' : 'Free roam'}</button>
          <button className={btn} onClick={() => go(-1)} disabled={idx === 0} aria-label="Previous exhibit"><ChevronLeft size={16} /></button>
          <button className={`${btn} bg-purple-300 text-black border-purple-300 hover:bg-purple-200`} onClick={() => go(1)} disabled={idx === N - 1}>Next <ChevronRight size={16} /></button>
          <button className={btn} onClick={() => setOpen(cur)}>Details</button>
        </div>
      </div>
      {open && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black/75 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-xl border border-white/15 bg-[#0d0a16] p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Close details" className="absolute right-3 top-3 rounded-full p-2 hover:bg-white/10"><X size={18} /></button>
            <p className="font-mono text-xs text-purple-300">{open.domain}</p>
            <h3 className="mt-1 text-2xl font-bold">{open.title}</h3>
            <p className="mt-3 text-gray-300">{open.desc}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-400">{open.details.map((d: string) => <li key={d}>{d}</li>)}</ul>
            <p className="mt-3 font-mono text-xs text-gray-500">{open.tech.join(' · ')}</p>
            <div className="mt-5 flex gap-5 text-sm">
              {open.link && <a href={open.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-teal-300"><ExternalLink size={15} />Live demo</a>}
              {open.github && <a href={open.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-gray-300"><Github size={15} />Code</a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gallery3D;
