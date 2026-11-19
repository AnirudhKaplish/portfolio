import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Net: React.FC = () => {
  const g = useRef<THREE.Group>(null);
  const { points, lines } = useMemo(() => {
    const N = 90, pts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) pts.push(new THREE.Vector3((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4));
    const arr: number[] = [];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (pts[i].distanceTo(pts[j]) < 1.5) arr.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
    return { points: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])), lines: new Float32Array(arr) };
  }, []);
  useFrame((_, dt) => { if (g.current) g.current.rotation.y += dt * 0.06; });
  return (
    <group ref={g}>
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial color="#4ade80" size={0.06} sizeAttenuation /></points>
      <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry><lineBasicMaterial color="#22c55e" transparent opacity={0.25} /></lineSegments>
    </group>
  );
};
const NeuralField: React.FC = () => <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 55 }}><Net /></Canvas>;
export default NeuralField;
