"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const subsystemData: Record<string, { name: string; position: [number, number, number] }[]> = {
  Machine_Learning: [
    { name: "Logistic Regression", position: [2.1, 0.7, 0] },
    { name: "Classification", position: [-0.7, 2.0, 0.7] },
    { name: "Reinforcement Learning", position: [0, -0.7, 2.0] },
    { name: "Linear Regression", position: [1.6, -1.3, -0.7] },
    { name: "Clustering", position: [-1.4, 1.3, -0.5] },
  ],
  Artificial_Neural_Networks: [
    { name: "Deep Learning", position: [2.1, 0.7, 0] },
    { name: "Neural Networks", position: [-0.7, 2.0, 0.7] },
    { name: "TensorFlow", position: [0, -0.7, 2.0] },
    { name: "Numpy", position: [1.6, -1.3, -0.7] },
    { name: "Keras", position: [-1.4, 1.3, -0.5] },
  ],
  Specialized_AI: [
    { name: "Neuro Symbolic AI", position: [2.1, 0.7, 0] },
    { name: "Knowledge-based Systems", position: [-0.7, 2.0, 0.7] },
    { name: "Recommender Systems", position: [0, -0.7, 2.0] },
    { name: "Neuro-Symbolic Systems", position: [1.6, -1.3, -0.7] },
    { name: "Retrieval-Augmented Generation", position: [-1.4, 1.3, -0.5] },
  ],
  Logic_and_Search: [
    { name: "Symbolic AI", position: [2.1, 0.7, 0] },
    { name: "Breadth-First Search", position: [-0.7, 2.0, 0.7] },
    { name: "Prolog", position: [0, -0.7, 2.0] },
    { name: "Depth-First Search", position: [1.6, -1.3, -0.7] },
    { name: "Automated Reasoning", position: [-1.4, 1.3, -0.5] },
  ],
  LLMs_and_GenAI: [
    { name: "LLMOps", position: [2.1, 0.7, 0] },
    { name: "LangChain", position: [-0.7, 2.0, 0.7] },
    { name: "Vertex AI", position: [0, -0.7, 2.0] }, 
    { name: "Promp", position: [1.6, -1.3, -0.7] },
    { name: "Prompt Engineering", position: [-1.4, 1.3, -0.5] },
  ],
  Mobile_and_Web_Development: [
    { name: "React Native", position: [2.1, 0.7, 0] },
    { name: "Next.js", position: [-0.7, 2.0, 0.7] },
    { name: "React.js", position: [0, -0.7, 2.0] },
    { name: "Expo React", position: [1.6, -1.3, -0.7] },
    { name: "NX Framework", position: [-1.4, 1.3, -0.5] },
  ],
  Programming_Languages: [
    { name: "Python", position: [2.1, 0.7, 0] },
    { name: "TypeScript", position: [-0.7, 2.0, 0.7] },
    { name: "Java", position: [0, -0.7, 2.0] },
    { name: "HTML", position: [-1.4, 1.3, -0.5] },
    { name: "CSS", position: [0.5, 1.2, 1.0] },
  ],
  Databases_and_Cloud: [
    { name: "SQL", position: [2.1, 0.7, 0] },
    { name: "Neo4j", position: [-0.7, 2.0, 0.7] },
    { name: "Firestore", position: [0, -0.7, 2.0] },
    { name: "Firebase", position: [-1.4, 1.3, -0.5] },
    { name: "AuraDB", position: [0.5, 1.2, 1.0] },
  ],
  UI_UX_and_Design_Thinking: [
    { name: "Figma", position: [2.1, 0.7, 0] },
    { name: "UX Design", position: [-0.7, 2.0, 0.7] },
    { name: "UI Design", position: [0, -0.7, 2.0] },
    { name: "Canva", position: [1.6, -1.3, -0.7] },
    { name: "Design Thinking", position: [-1.4, 1.3, -0.5] },
  ],
  Customer_Excellence: [
    { name: "Customer Service", position: [2.1, 0.7, 0] },
    { name: "Customer Satisfaction", position: [-0.7, 2.0, 0.7] },
    { name: "Customer Call Quality", position: [0, -0.7, 2.0] },
    { name: "Phone Etiquette", position: [1.6, -1.3, -0.7] },
    { name: "Problem Solving", position: [-1.4, 1.3, -0.5] },
  ], 
  Administrative_and_Productivity: [
    { name: "Teamwork", position: [2.1, 0.7, 0] },
    { name: "Microsoft Office", position: [-0.7, 2.0, 0.7] },
    { name: "Interpersonal Skills", position: [0, -0.7, 2.0] },
    { name: "Communication", position: [1.6, -1.3, -0.7] },
    { name: "Time Management", position: [-1.4, 1.3, -0.5] },
  ],

};

const islandPositions: [number, number, number][] = [
  [2.1, 0.7, 0],
  [-0.7, 2.0, 0.7],
  [0, -0.7, 2.0],
  [1.6, -1.3, -0.7],
  [-1.4, 1.3, -0.5],
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