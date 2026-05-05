"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const subsystemData: Record<string, { name: string; position: [number, number, number] }[]> = {
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
    { name: "Keras", position: [-1.36, 1.36, -0.52] },
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
    { name: "Promp", position: [1.39, -1.30, -0.61] },
    { name: "Prompt Engineering", position: [-1.36, 1.36, -0.52] },
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
            <div className="bg-black/70 border border-matrix-green/50 px-2 py-0.5 rounded text-[8px] text-matrix-green whitespace-nowrap cursor-pointer hover:bg-matrix-green hover:text-black transition-colors font-mono tracking-tighter">
              {node.name}
            </div>
          </Html>
        );
      })}
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
  if (!subsystem) return null;

  const nodes = (subsystem && subsystemData[subsystem]) || [];

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