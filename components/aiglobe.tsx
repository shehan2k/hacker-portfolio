"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export const subsystemData: Record<string, { name: string; position: [number, number, number] }[]> = {
  Machine_Learning: [
    { name: "Logistic Regression", position: [1.90, 0.63, 0.00] },
    { name: "Classification", position: [-0.63, 1.79, 0.63] },
    { name: "Reinforcement Learning", position: [0.00, -0.66, 1.89] },
    { name: "Linear Regression", position: [1.39, -1.30, -0.61] },
    { name: "Clustering", position: [-1.36, 1.36, -0.52] },
  ],
  Artificial_Neural_Networks: [
    { name: "Deep Learning", position: [1.90, 0.63, 0.00] },
    { name: "Neural Networks", position: [-0.63, 1.79, 0.63] },
    { name: "TensorFlow", position: [0.00, -0.66, 1.89] },
    { name: "Numpy", position: [1.39, -1.30, -0.61] },
    { name: "PyTorch", position: [-1.36, 1.36, -0.52] },
  ],
  Specialized_AI: [
    { name: "Neuro Symbolic AI", position: [1.90, 0.63, 0.00] },
    { name: "Knowledge-based Systems", position: [-0.63, 1.79, 0.63] },
    { name: "Recommender Systems", position: [0.00, -0.66, 1.89] },
    { name: "Neuro-Symbolic Systems", position: [1.39, -1.30, -0.61] },
    { name: "Retrieval-Augmented Generation", position: [-1.36, 1.36, -0.52] },
  ],
  Logic_and_Search: [
    { name: "Symbolic AI", position: [1.90, 0.63, 0.00] },
    { name: "Breadth-First Search", position: [-0.63, 1.79, 0.63] },
    { name: "Prolog", position: [0.00, -0.66, 1.89] },
    { name: "Depth-First Search", position: [1.39, -1.30, -0.61] },
    { name: "Automated Reasoning", position: [-1.36, 1.36, -0.52] },
  ],
  LLMs_and_GenAI: [
    { name: "LLMOps", position: [1.90, 0.63, 0.00] },
    { name: "LangChain", position: [-0.63, 1.79, 0.63] },
    { name: "Vertex AI", position: [0.00, -0.66, 1.89] }, 
    { name: "Custom GPTs", position: [1.39, -1.30, -0.61] },
    { name: "Transformers", position: [-1.36, 1.36, -0.52] },
  ],
  Mobile_and_Web_Development: [
    { name: "React Native", position: [1.90, 0.63, 0.00] },
    { name: "Next.js", position: [-0.63, 1.79, 0.63] },
    { name: "React.js", position: [0.00, -0.66, 1.89] },
    { name: "Expo React", position: [1.39, -1.30, -0.61] },
    { name: "NX Framework", position: [-1.36, 1.36, -0.52] },
  ],
  Programming_Languages: [
    { name: "Python", position: [1.90, 0.63, 0.00] },
    { name: "TypeScript", position: [-0.63, 1.79, 0.63] },
    { name: "Java", position: [0.00, -0.66, 1.89] },
    { name: "HTML", position: [1.39, -1.30, -0.61] },
    { name: "CSS", position: [-1.36, 1.36, -0.52] },
  ],
  Databases_and_Cloud: [
    { name: "SQL", position: [1.90, 0.63, 0.00] },
    { name: "Neo4j", position: [-0.63, 1.79, 0.63] },
    { name: "Firestore", position: [0.00, -0.66, 1.89] },
    { name: "Firebase", position: [1.39, -1.30, -0.61] },
    { name: "AuraDB", position: [-1.36, 1.36, -0.52] },
  ],
  UI_UX_and_Design_Thinking: [
    { name: "Figma", position: [1.90, 0.63, 0.00] },
    { name: "UX Design", position: [-0.63, 1.79, 0.63] },
    { name: "UI Design", position: [0.00, -0.66, 1.89] },
    { name: "Canva", position: [1.39, -1.30, -0.61] },
    { name: "Design Thinking", position: [-1.36, 1.36, -0.52] },
  ],
  Customer_Excellence: [
    { name: "Customer Service", position: [1.90, 0.63, 0.00] },
    { name: "Customer Satisfaction", position: [-0.63, 1.79, 0.63] },
    { name: "Customer Call Quality", position: [0.00, -0.66, 1.89] },
    { name: "Phone Etiquette", position: [1.39, -1.30, -0.61] },
    { name: "Problem Solving", position: [-1.36, 1.36, -0.52] },
  ], 
  Administrative_and_Productivity: [
    { name: "Teamwork", position: [1.90, 0.63, 0.00] },
    { name: "Microsoft Office", position: [-0.63, 1.79, 0.63] },
    { name: "Interpersonal Skills", position: [0.00, -0.66, 1.89] },
    { name: "Communication", position: [1.39, -1.30, -0.61] },
    { name: "Time Management", position: [-1.36, 1.36, -0.52] },
  ],

};

const islandPositions: [number, number, number][] = [
  [1.90, 0.63, 0.00],
  [-0.63, 1.79, 0.63],
  [0.00, -0.66, 1.89],
  [1.39, -1.30, -0.61],
  [-1.36, 1.36, -0.52],
];

function GlobeNodes({ nodes }: { nodes: { name: string; position: [number, number, number] }[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        const pos = node.position;
        // Multiply the position vector by a factor to move the label radially outward
        const offsetPosition: [number, number, number] = [pos[0] * 1.15, pos[1] * 1.15, pos[2] * 1.15];
        return (
          <Html key={index} position={offsetPosition} center distanceFactor={10}>
            <div className="bg-black/80 border border-matrix-green/60 px-2 py-0.5 rounded text-[8px] text-matrix-green whitespace-nowrap cursor-pointer hover:bg-matrix-green hover:text-black transition-all duration-300 font-mono tracking-tighter shadow-[0_0_10px_rgba(0,255,65,0.3)] drop-shadow-[0_0_2px_rgba(0,255,65,0.5)]">
              {node.name}
            </div>
          </Html>
        );
      })}
    </>
  );
}

function Globe({ nodes }: { nodes: { name: string; position: [number, number, number] }[] }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate vibrant particles for the globe
  const { positions, colors } = useMemo(() => {
    const count = 100000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const oceanBase = new THREE.Color("#030c19"); // Deep Ocean Blue
    const oceanDeep = new THREE.Color("#0a0725"); // Vibrant Earth Blue
    const islandColor = new THREE.Color("#335e0f"); // Island Green

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles: 85% on the surface shell, 5% inside for volume glow
      const isShell = Math.random() > 0.05;
      const radius = isShell ? (1.98 + Math.random() * 0.04) : (Math.random() * 1.98);
      
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;

      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);

      // Determine land vs ocean using trig-based pseudo-noise
      const noise = Math.sin(phi * 2.5) * Math.cos(theta * 2.5) + 
                    Math.sin(phi * 5 + theta * 3) * 0.4;
      
      let mixedColor;
      if (isShell && noise > 0.5) {
        // Island particle
        mixedColor = islandColor.clone().lerp(new THREE.Color("#154e31"), Math.random());
      } else {
        // Ocean particle
        mixedColor = oceanBase.clone().lerp(oceanDeep, Math.random());
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      // Subtle floating wobble
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>

      {/* Digital Island Sections */}
      {islandPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <icosahedronGeometry args={[0.08, 1]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      <GlobeNodes nodes={nodes} />
    </group>
  );
}

export default function AIGlobe({ subsystem }: { subsystem?: string | null }) {
  if (!subsystem) return null;

  const nodes = (subsystem && subsystemData[subsystem]) || [];

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.8} />
        <Globe nodes={nodes} />
        <OrbitControls enableZoom={true} minDistance={2.5} maxDistance={8} autoRotate={false} />
      </Canvas>
    </div>
  );
}