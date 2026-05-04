"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Configuration for planets
const skillClusters = [
  { name: "ML_CORE", position: [1.5, 0.5, 2.0] },
  { name: "ANN_NET", position: [-1.2, -0.8, -1.5] },
  { name: "REACT_EXP", position: [0.5, 1.2, 1.0] },
  { name: "DATA_OPS", position: [-1.8, 1.0, -2.5] },
];

function PlanetNode({ name, position, onClick }: { name: string; position: [number, number, number]; onClick?: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        className="cursor-pointer"
      >
        <sphereGeometry args={[hovered ? 0.4 : 0.3, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#d0c7c7" : "#d08344"} 
          wireframe={false} 
          emissive="#cb9527" 
          transparent
          opacity={0.8}
          
          emissiveIntensity={hovered ? 0.9 : 0.9} 
        />
      </mesh>
      <Html distanceFactor={15}>
        <div className={`px-2 py-1 font-mono text-[10px] uppercase border ${hovered ? "bg-yellow-400 text-black border-yellow-400" : "bg-black/80 text-yellow-400 border-yellow-400/30"}`}>
          {name}
        </div>
      </Html>
    </group>
  );
}

function GalaxySystem({ onNodeClick }: { onNodeClick?: (name: string) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Rotate everything together
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
  });

  // Particle generation
  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const numArms = 3;
    const spin = 1.2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Central bulge (25% of particles)
      if (i < count * 0.25) {
        const r = Math.random() * 1.2;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.acos(2 * Math.random() - 1);

        positions[i3] = r * Math.sin(theta) * Math.cos(phi);
        positions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi) * 0.8;
        positions[i3 + 2] = r * Math.cos(theta);
      } else {
        // Spiral arms
        const radius = 0.8 + Math.random() * 4.5;
        const armAngle = (i % numArms) * (Math.PI * 2 / numArms);
        const spiralAngle = radius * spin;

        const offsetR = Math.pow(Math.random(), 2) * 1.0;
        const offsetAngle = Math.random() * Math.PI * 2;

        positions[i3] = Math.cos(armAngle + spiralAngle) * radius + Math.cos(offsetAngle) * offsetR;
        positions[i3 + 1] = (Math.random() - 0.5) * (2.0 / (radius * 0.8 + 1));
        positions[i3 + 2] = Math.sin(armAngle + spiralAngle) * radius + Math.sin(offsetAngle) * offsetR;
      }
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#dcbd23" size={0.03} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
      {skillClusters.map((node, index) => (
        <PlanetNode key={index} name={node.name} position={node.position as [number, number, number]} onClick={() => onNodeClick?.(node.name)} />
      ))}
    </group>
  );
}

export default function AIGalaxyView({ onNodeClick }: { onNodeClick?: (name: string) => void }) {
  return (
    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#020617_60%,_#000000_100%)]">
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GalaxySystem onNodeClick={onNodeClick} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}