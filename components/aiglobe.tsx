"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const subsystemData: Record<string, { name: string; position: [number, number, number] }[]> = {
  ML_CORE: [
    { name: "Supervised Learning", position: [2.1, 0.7, 0] },
    { name: "Optimization", position: [-0.7, 2.0, 0.7] },
    { name: "Gradient Descent", position: [0, -0.7, 2.0] },
  ],
  ANN_NET: [
    { name: "Transformers", position: [1.9, 0.6, 0.4] },
    { name: "Backpropagation", position: [-1.4, 1.3, -0.5] },
    { name: "Activation Functions", position: [0, -0.7, 2.0] },
    { name: "Loss Functions", position: [1.6, -1.3, -0.7] },
  ],
  REACT_EXP: [
    { name: "Hooks", position: [2.1, 0.7, 0] },
    { name: "Server Components", position: [-0.7, 2.0, 0.7] },
    { name: "Virtual DOM", position: [0, -0.7, 2.0] },
  ],
  DATA_OPS: [
    { name: "ETL Pipelines", position: [2.1, 0.7, 0] },
    { name: "Data Versioning", position: [-0.7, 2.0, 0.7] },
    { name: "Governance", position: [0, -0.7, 2.0] },
  ],
  DEFAULT: [
    { name: "Machine Learning", position: [2.1, 0.7, 0] },
    { name: "Neural Networks", position: [-0.7, 2.0, 0.7] },
    { name: "Neuro-Symbolic AI", position: [0, -0.7, 2.0] },
    { name: "LLMs", position: [1.6, -1.3, -0.7] },
  ]
};

const islandPositions: [number, number, number][] = [
  [1.9, 0.6, 0.4],
  [-1.4, 1.3, -0.5],
  [0.5, -1.8, 0.7],
  [-1.2, -1.0, -1.4],
  [1.3, 0.1, -1.5],
];

function GlobeNodes({ nodes }: { nodes: { name: string; position: [number, number, number] }[] }) {
  return (
    <>
      {nodes.map((node, index) => (
        <Html key={index} position={node.position as [number, number, number]} center distanceFactor={10}>
          <div className="bg-black/70 border border-matrix-green/50 px-2 py-0.5 rounded text-[8px] text-matrix-green whitespace-nowrap cursor-pointer hover:bg-matrix-green hover:text-black transition-colors font-mono tracking-tighter">
            {node.name}
          </div>
        </Html>
      ))}
    </>
  );
}

function Globe({ nodes }: { nodes: { name: string; position: [number, number, number] }[] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[1, 32, 32]} scale={2.0}>
        <meshStandardMaterial
          color="#0adde8"
          emissive="#09d4fd"
          emissiveIntensity={0.1}
          wireframe={true}
          
        />
      </Sphere>

      {/* Digital Island Sections */}
      {islandPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <icosahedronGeometry args={[0.10, 1]} />
          <meshStandardMaterial 
            color="#00ff41" 
            emissive="#00ff41" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      <GlobeNodes nodes={nodes} />
    </mesh>
  );
}

export default function AIGlobe({ subsystem }: { subsystem?: string | null }) {
  const nodes = subsystem && subsystemData[subsystem] ? subsystemData[subsystem] : subsystemData["DEFAULT"];

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.8} />
        <Globe nodes={nodes} />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}