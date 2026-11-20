import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Stars, OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { X, Plane, Footprints, LogOut, ExternalLink, Github, Mail, Download, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useProfile, useProjects, useTimeline, useSkills } from '../hooks/usePortfolioData';

const EMAIL = 'anirudh23.dev@gmail.com';
type Mode = 'castle' | 'city';
type PoiId = 'about' | 'experience' | 'projects' | 'skills' | 'honours' | 'contact';

const POIS: { id: PoiId; label: string; pos: [number, number]; color: string }[] = [
  { id: 'about', label: 'The Hall · About', pos: [-7, 10], color: '#c084fc' },
  { id: 'experience', label: 'The Library · Experience', pos: [7, 10], color: '#fb923c' },
  { id: 'projects', label: 'The Gallery · Projects', pos: [-5, -17], color: '#5eead4' },
  { id: 'skills', label: 'Alchemy · Skills', pos: [5, -17], color: '#4ade80' },
  { id: 'honours', label: 'Trophy Room · Honours', pos: [-5, -25], color: '#fbbf24' },
  { id: 'contact', label: 'Post Room · Contact', pos: [5, -25], color: '#fb7185' },
];
// [minX, maxX, minZ, maxZ]
const WALLS: [number, number, number, number][] = [[-14, -3, -8.6, -7.4], [3, 14, -8.6, -7.4], [-14, -10, -32, -8], [10, 14, -32, -8], [-14, 14, -32, -28]];

const Label: React.FC<{ text: string; position: [number, number, number]; scale?: number; hot?: boolean; depth?: boolean }> = ({ text, position, scale = 1, hot, depth = false }) => {
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); const g = c.getContext('2d')!; const f = '600 34px sans-serif';
    g.font = f; const w = Math.ceil(g.measureText(text).width) + 40; c.width = w; c.height = 64;
    g.font = f; g.fillStyle = hot ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)'; g.beginPath(); g.roundRect(0, 0, w, 64, 32); g.fill();
    g.strokeStyle = hot ? '#fcd34d' : 'rgba(255,255,255,0.35)'; g.lineWidth = 3; g.stroke();
    g.fillStyle = hot ? '#fde68a' : '#fff'; g.textBaseline = 'middle'; g.fillText(text, 20, 33);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; (t as any).aspect = w / 64; return t;
  }, [text, hot]);
  useEffect(() => () => tex.dispose(), [tex]);
  const a = (tex as any).aspect as number;
  return <sprite position={position} scale={[a * 0.55 * scale, 0.55 * scale, 1]}><spriteMaterial map={tex} transparent depthTest={depth} fog={false} /></sprite>;
};

const Castle: React.FC = () => {
  const windows = useMemo(() => Array.from({ length: 36 }, (_, i) => [-12 + (i % 12) * 2.2, 3 + Math.floor(i / 12) * 2.2] as [number, number]), []);
  const stone = '#5f5882', roof = '#2f5d99';
  const Tower: React.FC<{ x: number; z: number; r: number; h: number }> = ({ x, z, r, h }) => (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[r, r * 1.1, h, 16]} /><meshStandardMaterial color={stone} roughness={0.9} /></mesh>
      <mesh position={[0, h + r * 1.1, 0]}><coneGeometry args={[r * 1.3, r * 2.6, 16]} /><meshStandardMaterial color={roof} roughness={0.7} /></mesh>
      {[0.3, 0.55, 0.8].map((k) => <mesh key={k} position={[0, h * k, r * 1.01]}><planeGeometry args={[0.5, 0.9]} /><meshBasicMaterial color="#ffc15a" /></mesh>)}
    </group>
  );
  return (
    <group>
      {WALLS.map((w, i) => <mesh key={i} position={[(w[0] + w[1]) / 2, i === 4 ? 6 : 3.5, (w[2] + w[3]) / 2]}><boxGeometry args={[w[1] - w[0], i === 4 ? 12 : 7, w[3] - w[2]]} /><meshStandardMaterial color={stone} roughness={0.95} /></mesh>)}
      {windows.map(([x, y], i) => <mesh key={i} position={[x, y + 1, -27.9]} rotation={[0, 0, 0]}><planeGeometry args={[0.7, 1.2]} /><meshBasicMaterial color={i % 5 === 0 ? '#7c6a3a' : '#ffc15a'} /></mesh>)}
      <Tower x={-14} z={-8} r={2.2} h={14} /><Tower x={14} z={-8} r={2.2} h={14} /><Tower x={-14} z={-32} r={2.4} h={16} /><Tower x={14} z={-32} r={2.4} h={16} /><Tower x={0} z={-30} r={3.2} h={22} />
      <mesh position={[0, 2.7, -8]}><boxGeometry args={[6, 5.4, 0.8]} /><meshBasicMaterial color="#2a1d0e" /></mesh>
      <mesh position={[0, 5.9, -8]}><cylinderGeometry args={[3, 3, 0.8, 24, 1, false, 0, Math.PI]} /><meshStandardMaterial color={stone} /></mesh>
      {[-4, 4].map((x) => <group key={x} position={[x, 3.2, -6.9]}><mesh position={[0, 0.5, 0]}><sphereGeometry args={[0.25, 8, 8]} /><meshBasicMaterial color="#ffb938" /></mesh><pointLight color="#ffb347" intensity={14} distance={14} /></group>)}
    </group>
  );
};

const Trees: React.FC = () => {
  const pts = useMemo(() => Array.from({ length: 70 }, () => { const a = Math.random() * Math.PI * 2, r = 30 + Math.random() * 40; return [Math.cos(a) * r, Math.sin(a) * r - 10, 1.5 + Math.random() * 2] as [number, number, number]; }), []);
  return <>{pts.map(([x, z, s], i) => <group key={i} position={[x, 0, z]} scale={s}><mesh position={[0, 1.2, 0]}><coneGeometry args={[1, 3, 7]} /><meshStandardMaterial color="#0f2a1a" /></mesh><mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.15, 0.2, 0.6]} /><meshStandardMaterial color="#2b1a0e" /></mesh></group>)}</>;
};

const Poi: React.FC<{ p: typeof POIS[number]; near: boolean }> = ({ p, near }) => {
  const m = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (m.current) { m.current.rotation.y += dt; m.current.position.y = 1.6 + Math.sin(performance.now() / 600) * 0.15; } });
  return (
    <group position={[p.pos[0], 0, p.pos[1]]}>
      <mesh position={[0, 3, 0]}><cylinderGeometry args={[0.05, 0.4, 6, 12, 1, true]} /><meshBasicMaterial color={p.color} transparent opacity={near ? 0.35 : 0.15} side={THREE.DoubleSide} /></mesh>
      <mesh ref={m} position={[0, 1.6, 0]}><icosahedronGeometry args={[0.45, 0]} /><meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={near ? 1.4 : 0.7} /></mesh>
      <Label text={p.label} position={[0, 3, 0]} scale={1.3} hot={near} />
    </group>
  );
};

type Keys = { f: boolean; b: boolean; l: boolean; r: boolean };

const Walker: React.FC<{ keys: React.MutableRefObject<Keys>; look: React.MutableRefObject<{ dx: number; dy: number; moved?: boolean }>; onNear: (id: PoiId | null) => void; coarse: boolean }> = ({ keys, look, onNear, coarse }) => {
  const { camera } = useThree();
  const last = useRef<PoiId | null>(null);
  const yaw = useRef(0); const pitch = useRef(0);
  useEffect(() => { camera.position.set(0, 1.7, 22); camera.rotation.set(0, 0, 0); camera.rotation.order = 'YXZ'; }, [camera]);
  useFrame((_, dt) => {
    { yaw.current -= look.current.dx * 0.004; pitch.current = Math.max(-1.2, Math.min(1.2, pitch.current - look.current.dy * 0.004)); look.current.dx = 0; look.current.dy = 0; if (coarse || look.current.moved) camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ'); }
    const k = keys.current; const f = (k.f ? 1 : 0) - (k.b ? 1 : 0), s = (k.r ? 1 : 0) - (k.l ? 1 : 0);
    if (f || s) {
      const dir = new THREE.Vector3(); camera.getWorldDirection(dir); dir.y = 0; dir.normalize();
      const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));
      const v = dir.multiplyScalar(f).add(right.multiplyScalar(s)).normalize().multiplyScalar(7 * dt);
      let nx = camera.position.x + v.x, nz = camera.position.z + v.z;
      for (const [x0, x1, z0, z1] of WALLS) { const pad = 0.6; if (nx > x0 - pad && nx < x1 + pad && nz > z0 - pad && nz < z1 + pad) { const dxl = nx - (x0 - pad), dxr = x1 + pad - nx, dzt = nz - (z0 - pad), dzb = z1 + pad - nz; const m = Math.min(dxl, dxr, dzt, dzb); if (m === dxl) nx = x0 - pad; else if (m === dxr) nx = x1 + pad; else if (m === dzt) nz = z0 - pad; else nz = z1 + pad; } }
      const r = Math.hypot(nx, nz + 10); if (r > 60) { nx *= 60 / r; nz = (nz + 10) * (60 / r) - 10; }
      camera.position.x = nx; camera.position.z = nz;
    }
    let best: PoiId | null = null; let bd = 3.8;
    for (const p of POIS) { const d = Math.hypot(camera.position.x - p.pos[0], camera.position.z - p.pos[1]); if (d < bd) { bd = d; best = p.id; } }
    if (best !== last.current) { last.current = best; onNear(best); }
  });
  return null;
};

const Scene: React.FC<{ keys: React.MutableRefObject<Keys>; look: React.MutableRefObject<{ dx: number; dy: number; moved?: boolean }>; near: PoiId | null; onNear: (id: PoiId | null) => void; coarse: boolean; onLock: (v: boolean) => void; lockRef: React.MutableRefObject<any> }> = ({ keys, look, near, onNear, coarse, onLock, lockRef }) => (
  <>
    <color attach="background" args={['#050816']} /><fog attach="fog" args={['#050816', 14, 80]} />
    <ambientLight intensity={1.0} color="#9fb0ff" /><directionalLight position={[-20, 30, 10]} intensity={1.1} color="#aab8ff" />
    <mesh position={[-30, 40, -60]}><sphereGeometry args={[3, 24, 24]} /><meshBasicMaterial color="#f5f1d8" /></mesh>
    <Stars radius={120} depth={40} count={1500} factor={4} fade />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}><circleGeometry args={[90, 48]} /><meshStandardMaterial color="#0d1f16" roughness={1} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 8]}><planeGeometry args={[4, 36]} /><meshStandardMaterial color="#2a2438" /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -18]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#26202f" /></mesh>
    <Castle /><Trees />
    {POIS.map((p) => <Poi key={p.id} p={p} near={near === p.id} />)}
    <Walker keys={keys} look={look} onNear={onNear} coarse={coarse} />
    {!coarse && <PointerLockControls ref={lockRef} onLock={() => onLock(true)} onUnlock={() => onLock(false)} />}
  </>
);

const City: React.FC<{ projects: any[]; onPick: (p: any) => void; chase: boolean }> = ({ projects, onPick, chase }) => {
  const plane = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const cols = 4; const gap = 7;
  const blds = useMemo(() => projects.map((p, i) => ({ p, x: (i % cols - (cols - 1) / 2) * gap, z: (Math.floor(i / cols) - 1.5) * gap, h: 2 + p.tech.length * 1.1, c: new THREE.Color().setHSL(((i * 47) % 360) / 360, 0.45, 0.42) })), [projects]);
  useFrame(({ clock }) => {
    const a = clock.elapsedTime * 0.28; const R = 26;
    const px = Math.cos(a) * R, pz = Math.sin(a) * R, py = 14 + Math.sin(a * 2) * 1.2;
    if (plane.current) { plane.current.position.set(px, py, pz); plane.current.rotation.y = -a; }
    if (chase) { const bx = Math.cos(a - 0.35) * (R + 4), bz = Math.sin(a - 0.35) * (R + 4); camera.position.lerp(new THREE.Vector3(bx, py + 4, bz), 0.1); camera.lookAt(0, 3, 0); }
  });
  return (
    <>
      <color attach="background" args={['#0b1226']} /><fog attach="fog" args={['#0b1226', 30, 110]} />
      <ambientLight intensity={0.7} /><directionalLight position={[20, 40, 10]} intensity={1.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[160, 160]} /><meshStandardMaterial color="#10182e" /></mesh>
      <gridHelper args={[160, 40, '#2a3a66', '#1a2547']} position={[0, 0.02, 0]} />
      {blds.map(({ p, x, z, h, c }) => (
        <group key={p.id} position={[x, 0, z]}>
          <mesh position={[0, h / 2, 0]} onClick={() => onPick(p)} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}><boxGeometry args={[4, h, 4]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.18} /></mesh>
          {Array.from({ length: Math.floor(h / 1.6) }, (_, k) => <mesh key={k} position={[0, 1 + k * 1.6, 2.01]}><planeGeometry args={[2.6, 0.5]} /><meshBasicMaterial color="#ffd98a" transparent opacity={0.65} /></mesh>)}
          <Label text={p.title.split(' – ')[0]} position={[0, h + 1.6, 0]} scale={1.5} depth />
        </group>
      ))}
      <group ref={plane}><mesh rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.7, 3.6, 12]} /><meshStandardMaterial color="#f1f5f9" /></mesh><mesh><boxGeometry args={[0.2, 0.1, 5]} /><meshStandardMaterial color="#e11d48" /></mesh><mesh position={[-1.4, 0.4, 0]}><boxGeometry args={[0.7, 0.9, 0.1]} /><meshStandardMaterial color="#e11d48" /></mesh></group>
      {!chase && <OrbitControls makeDefault enablePan={false} minDistance={12} maxDistance={70} maxPolarAngle={Math.PI / 2.1} autoRotate autoRotateSpeed={0.6} />}
    </>
  );
};

const Panel: React.FC<{ id: PoiId; onClose: () => void }> = ({ id, onClose }) => {
  const { profile } = useProfile(); const { data: projects } = useProjects(); const { data: timeline } = useTimeline(); const { data: skills } = useSkills();
  const jobs = timeline.filter((t: any) => t.type === 'work' || t.type === 'education'); const honours = timeline.filter((t: any) => !['work', 'education'].includes(t.type));
  const title = POIS.find((p) => p.id === id)!.label;
  return (
    <div className="absolute inset-0 z-30 grid place-items-center bg-black/70 p-3" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#e9d9b0] p-6 text-[#3a2a14] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full p-2 hover:bg-black/10"><X size={18} /></button>
        <h2 className="font-castle text-2xl font-bold pr-8">{title}</h2>
        <div className="mt-4 space-y-3 font-script text-lg leading-relaxed">
          {id === 'about' && <><p>{profile.about}</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{(profile.stats || []).map((s: any) => <div key={s.label} className="rounded border border-[#a8761d]/50 bg-[#d9c08a]/40 p-2 text-center"><p className="font-castle text-xl font-bold">{s.value}</p><p className="text-[10px] uppercase">{s.label}</p></div>)}</div></>}
          {id === 'experience' && jobs.map((t: any) => <div key={t.id}><p className="font-castle font-bold">{t.title} <span className="text-sm font-normal text-[#7a2e1b]">{t.date}</span></p><p className="italic">{t.org}</p><ul className="list-disc pl-5 text-base">{String(t.desc).split('\n').map((l: string, k: number) => <li key={k}>{l.replace(/^•\s*/, '')}</li>)}</ul></div>)}
          {id === 'projects' && projects.map((p: any) => <div key={p.id} className="flex items-center justify-between gap-3 border-b border-[#a8761d]/30 pb-2"><div><p className="font-castle font-bold">{p.title.split(' – ')[0]}</p><p className="text-sm">{p.tech.slice(0, 4).join(' · ')}</p></div><div className="flex shrink-0 gap-3 text-sm">{p.link && <a className="underline" href={p.link} target="_blank" rel="noreferrer">Live</a>}{p.github && <a className="underline" href={p.github} target="_blank" rel="noreferrer">Code</a>}</div></div>)}
          {id === 'skills' && <div className="grid gap-2 sm:grid-cols-2">{[...skills].sort((a: any, b: any) => b.level - a.level).slice(0, 14).map((s: any) => <div key={s.id}><div className="flex justify-between text-base"><span>{s.name}</span><span>{s.level}%</span></div><div className="h-2 rounded bg-[#3a2a14]/20"><div className="h-full rounded bg-[#7a2e1b]" style={{ width: `${s.level}%` }} /></div></div>)}</div>}
          {id === 'honours' && honours.map((t: any) => <div key={t.id}><p className="font-castle font-bold">{t.title} <span className="text-sm font-normal text-[#7a2e1b]">{t.date}</span></p><p className="italic">{t.org}</p></div>)}
          {id === 'contact' && <div className="space-y-3"><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 font-castle font-bold underline"><Mail size={18} />{EMAIL}</a><a href={`${import.meta.env.BASE_URL}AnirudhResume.pdf`} download className="flex items-center gap-2 underline"><Download size={16} />Résumé PDF</a><a href={profile.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 underline"><ExternalLink size={16} />GitHub</a><a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 underline"><ExternalLink size={16} />LinkedIn</a></div>}
        </div>
      </div>
    </div>
  );
};

const CastleWorld: React.FC = () => {
  const { data: projects } = useProjects();
  const [mode, setMode] = useState<Mode>('castle');
  const [locked, setLocked] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [near, setNear] = useState<PoiId | null>(null);
  const [panel, setPanel] = useState<PoiId | null>(null);
  const [pick, setPick] = useState<any | null>(null);
  const [chase, setChase] = useState(true);
  const keys = useRef<Keys>({ f: false, b: false, l: false, r: false });
  const look = useRef<{ dx: number; dy: number; moved?: boolean }>({ dx: 0, dy: 0 });
  const lockRef = useRef<any>(null);
  const coarse = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches, []);

  useEffect(() => {
    const map: Record<string, keyof Keys> = { KeyW: 'f', ArrowUp: 'f', KeyS: 'b', ArrowDown: 'b', KeyA: 'l', ArrowLeft: 'l', KeyD: 'r', ArrowRight: 'r' };
    const dn = (e: KeyboardEvent) => { const k = map[e.code]; if (k && mode === 'castle') { keys.current[k] = true; } if (e.code === 'KeyE' && near && !panel) { document.exitPointerLock?.(); setPanel(near); } };
    const up = (e: KeyboardEvent) => { const k = map[e.code]; if (k) keys.current[k] = false; };
    window.addEventListener('keydown', dn); window.addEventListener('keyup', up); return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, [near, panel, mode]);

  const openPanel = (id: PoiId) => { document.exitPointerLock?.(); setPanel(id); };
  const enter = () => { setStarted(true); setPaused(false); if (!coarse) lockRef.current?.lock?.(); };
  const hold = (k: keyof Keys, v: boolean) => () => { keys.current[k] = v; };
  const pad = 'grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/50 text-white active:bg-white/30 touch-none';
  const drag = useRef<{ x: number; y: number } | null>(null);
  const showPause = mode === 'castle' && !panel && (!started || paused);

  return (
    <div className="fixed inset-0 bg-black text-white font-sans select-none"
      onPointerDown={(e) => { if (mode === 'castle' && started && !locked && !(e.target as HTMLElement).closest('button')) drag.current = { x: e.clientX, y: e.clientY }; }}
      onPointerMove={(e) => { if (drag.current) { look.current.moved = true; look.current.dx += e.clientX - drag.current.x; look.current.dy += e.clientY - drag.current.y; drag.current = { x: e.clientX, y: e.clientY }; } }}
      onPointerUp={() => { drag.current = null; }}>
      <div key={mode} className="absolute inset-0"><Canvas camera={{ fov: mode === 'castle' ? 70 : 55, position: mode === 'castle' ? [0, 1.7, 22] : [30, 24, 30] }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          {mode === 'castle'
            ? <Scene keys={keys} look={look} near={near} onNear={setNear} coarse={coarse} onLock={(v: boolean) => { setLocked(v); setPaused(!v); }} lockRef={lockRef} />
            : <City projects={projects} onPick={setPick} chase={chase} />}
        </Suspense>
      </Canvas></div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-2 p-3">
        <div className="pointer-events-auto flex flex-wrap gap-2">
          <button onClick={() => { setMode('castle'); setPick(null); }} aria-pressed={mode === 'castle'} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm backdrop-blur ${mode === 'castle' ? 'bg-amber-300 text-black' : 'bg-black/60 border border-white/20'}`}><Footprints size={15} />Castle walk</button>
          <button onClick={() => { document.exitPointerLock?.(); setMode('city'); setPanel(null); setChase(true); }} aria-pressed={mode === 'city'} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm backdrop-blur ${mode === 'city' ? 'bg-amber-300 text-black' : 'bg-black/60 border border-white/20'}`}><Plane size={15} />Plane view: city of projects</button>
          {mode === 'city' && <button onClick={() => setChase((c) => !c)} className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm backdrop-blur">{chase ? 'Free look' : 'Follow the plane'}</button>}
        </div>
        <Link to="/w/recruiter" className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/70 px-4 py-2 text-sm backdrop-blur hover:bg-white hover:text-black"><LogOut size={15} />Exit</Link>
      </div>

      {mode === 'castle' && started && !coarse && locked && !panel && <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs text-gray-300">WASD to walk · mouse to look · E to read · Esc for menu</p>}
      {mode === 'castle' && near && !panel && started && (
        <button onClick={() => openPanel(near)} className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-black shadow-xl md:bottom-12">{coarse ? 'Read' : 'Press E to read'}: {POIS.find((p) => p.id === near)!.label}</button>
      )}
      {mode === 'castle' && coarse && started && (
        <div className="absolute bottom-6 left-5 grid grid-cols-3 gap-1" aria-label="Movement pad">
          <span /><button className={pad} aria-label="Forward" onPointerDown={hold('f', true)} onPointerUp={hold('f', false)} onPointerLeave={hold('f', false)}><ArrowUp size={20} /></button><span />
          <button className={pad} aria-label="Left" onPointerDown={hold('l', true)} onPointerUp={hold('l', false)} onPointerLeave={hold('l', false)}><ArrowLeft size={20} /></button>
          <button className={pad} aria-label="Back" onPointerDown={hold('b', true)} onPointerUp={hold('b', false)} onPointerLeave={hold('b', false)}><ArrowDown size={20} /></button>
          <button className={pad} aria-label="Right" onPointerDown={hold('r', true)} onPointerUp={hold('r', false)} onPointerLeave={hold('r', false)}><ArrowRight size={20} /></button>
        </div>
      )}

      {showPause && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-black/60 p-4 text-center backdrop-blur-sm">
          <div className="max-w-md rounded-xl border border-white/15 bg-[#0d0a16]/95 p-7">
            <h1 className="font-castle text-3xl font-bold text-amber-200">{started ? 'Paused' : 'The Castle Grounds'}</h1>
            <p className="mt-3 font-script text-lg text-gray-300">{coarse ? 'Drag to look, use the pad to walk, and tap the glowing prompts to read.' : 'WASD or arrows to walk, mouse to look, E to read at a glowing marker. Esc pauses.'}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={enter} className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black">{started ? 'Continue' : 'Enter'}</button>
              <button onClick={() => { setMode('city'); setStarted(true); }} className="rounded-full border border-white/30 px-6 py-3">Plane view</button>
              <Link to="/w/recruiter" className="rounded-full border border-white/30 px-6 py-3">Exit</Link>
            </div>
            <Link to="/w/recruiter-plain" className="mt-4 inline-block text-sm text-gray-400 underline">Plain résumé instead</Link>
          </div>
        </div>
      )}

      {panel && <Panel id={panel} onClose={() => setPanel(null)} />}
      {mode === 'city' && (
        <>
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-xs text-gray-300 backdrop-blur">Each building is a project. Taller means more technologies. Click one.</p>
          {pick && (
            <div className="absolute inset-x-3 bottom-14 z-20 mx-auto max-w-md rounded-xl border border-white/15 bg-[#0d1226]/95 p-5 backdrop-blur">
              <button onClick={() => setPick(null)} aria-label="Close project" className="absolute right-3 top-3 rounded-full p-1.5 hover:bg-white/10"><X size={16} /></button>
              <p className="font-mono text-xs text-teal-300">{pick.domain}</p><h3 className="text-xl font-bold pr-6">{pick.title}</h3><p className="mt-2 text-sm text-gray-300">{pick.desc}</p><p className="mt-2 font-mono text-[11px] text-gray-500">{pick.tech.join(' · ')}</p>
              <div className="mt-3 flex gap-5 text-sm">{pick.link && <a href={pick.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal-300"><ExternalLink size={14} />Live</a>}{pick.github && <a href={pick.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1"><Github size={14} />Code</a>}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default CastleWorld;
