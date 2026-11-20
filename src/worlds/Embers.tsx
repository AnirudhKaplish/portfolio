import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Points } from 'three';

const Field: React.FC = () => {
  const ref = useRef<Points>(null);
  const pos = useMemo(() => { const a = new Float32Array(140 * 3); for (let i = 0; i < 140; i++) { a[i * 3] = (Math.random() - 0.5) * 14; a[i * 3 + 1] = (Math.random() - 0.5) * 8; a[i * 3 + 2] = (Math.random() - 0.5) * 4; } return a; }, []);
  useFrame((_, dt) => {
    const p = ref.current?.geometry.attributes.position; if (!p) return;
    for (let i = 0; i < p.count; i++) { let y = p.getY(i) + dt * (0.12 + (i % 5) * 0.04); if (y > 4) y = -4; p.setY(i, y); p.setX(i, p.getX(i) + Math.sin(y * 2 + i) * dt * 0.05); }
    p.needsUpdate = true;
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry><pointsMaterial color="#ffb938" size={0.05} sizeAttenuation transparent opacity={0.8} /></points>;
};
const Embers: React.FC = () => <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 55 }}><Field /></Canvas>;
export default Embers;
