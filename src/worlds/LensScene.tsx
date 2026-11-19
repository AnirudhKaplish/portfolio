import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import type { Mesh, Group } from 'three';
import { WORLDS } from './worlds';

const Shape: React.FC<{ i: number; x: number; id: string; color: string }> = ({ i, x, id, color }) => {
  const ref = useRef<Mesh>(null);
  const [hot, setHot] = useState(false);
  const nav = useNavigate();
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * (hot ? 1.6 : 0.5);
    ref.current.rotation.x += dt * 0.2;
    const s = ref.current.scale.x + ((hot ? 1.25 : 1) - ref.current.scale.x) * Math.min(1, dt * 8);
    ref.current.scale.setScalar(s);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[x, 0.2, 0]}
        onPointerOver={() => { setHot(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHot(false); document.body.style.cursor = ''; }}
        onClick={() => nav(`/w/${id}`)}>
        {i === 0 && <boxGeometry args={[1.1, 1.5, 0.12]} />}
        {i === 1 && <torusKnotGeometry args={[0.55, 0.18, 120, 16]} />}
        {i === 2 && <icosahedronGeometry args={[0.85, 1]} />}
        {i === 3 && <cylinderGeometry args={[0.75, 0.75, 0.45, 6]} />}
        <meshStandardMaterial color={color} wireframe={i === 2} metalness={0.5} roughness={0.25} emissive={color} emissiveIntensity={hot ? 0.55 : 0.18} />
      </mesh>
    </Float>
  );
};

const Rig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const g = useRef<Group>(null);
  const { viewport } = useThree();
  const k = Math.min(1, viewport.width / 8);
  useFrame(({ pointer }, dt) => {
    if (!g.current) return;
    g.current.scale.setScalar(k);
    g.current.rotation.y += (pointer.x * 0.25 - g.current.rotation.y) * Math.min(1, dt * 3);
    g.current.rotation.x += (-pointer.y * 0.12 - g.current.rotation.x) * Math.min(1, dt * 3);
  });
  return <group ref={g}>{children}</group>;
};

const LensScene: React.FC = () => (
  <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.6, 7], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[4, 5, 5]} intensity={2} />
    <pointLight position={[-5, -2, 3]} intensity={30} color="#5eead4" />
    <Rig>
      {WORLDS.map((w, i) => <Shape key={w.id} i={i} id={w.id} color={w.color} x={(i - 1.5) * 2.2} />)}
    </Rig>
  </Canvas>
);
export default LensScene;
