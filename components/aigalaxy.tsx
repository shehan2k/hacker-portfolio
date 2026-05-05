"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Configuration for planets
const skillClusters = [
  { name: "Machine_Learning", position: [-1.5, 0.5, -4.0] },
  { name: "Artificial_Neural_Networks", position: [-4.2, -0.8, -1.5] },
  { name: "Specialized_AI", position: [0.5, 0.6, 1.0] },
  { name: "Logic_and_Search", position: [-3.8, 0.7, -2.5] },
  { name: "LLMs_and_GenAI", position: [2.5, -0.5, 0.9] },
  { name: "Mobile_and_Web_Development", position: [-2.5, -0.6, 1.8] },
  { name: "Programming_Languages", position: [3.0, -0.5, -2.0] },
  { name: "Databases_and_Cloud", position: [-3.0, 0.7, 3.5] },
  { name: "UI_UX_and_Design_Thinking", position: [1.5, 0.7, -4.0] },
  { name: "Customer_Excellence", position: [0, -0.5, 2.0] },
  { name: "Administrative_and_Productivity", position: [-1.2, -0.8, -1.5] },
];

function PlanetNode({ name, position, onClick, isSelected }: { name: string; position: [number, number, number]; onClick?: () => void; isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [hovered]);

  // Handle the blinking animation for selected nodes
  useFrame(({ clock }) => {
    if (isSelected && materialRef.current) {
      const t = clock.getElapsedTime();
      materialRef.current.emissiveIntensity = 0.75 + Math.sin(t * 8) * 0.75;
    }
  });

  // Explicitly reset intensity when the node is deselected
  useEffect(() => {
    if (!isSelected && materialRef.current) {
      materialRef.current.emissiveIntensity = 0.9;
    }
  }, [isSelected]);

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[hovered ? 0.4 : 0.3, 16, 16]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={hovered ? "#d0c7c7" : "#d08344"} 
          wireframe={false} 
          emissive="#cb9527" 
          transparent
          opacity={0.8}
          emissiveIntensity={0.9} 
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

function Meteor() {
  const ref = useRef<THREE.Mesh>(null!);
  const [dir] = useState(() => new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize());
  const [pos] = useState(() => dir.clone().multiplyScalar(-20 + Math.random() * 20));
  const speed = 0.1 + Math.random() * 0.1;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.addScaledVector(dir, speed);
      if (ref.current.position.length() > 25) ref.current.position.copy(dir).multiplyScalar(-25);
    }
  });

  return (
    <mesh ref={ref} position={pos} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)}>
      <boxGeometry args={[0.02, 0.02, 0.5]} />
      <meshStandardMaterial color="#d99606" emissive="#ff4000" emissiveIntensity={10} transparent opacity={0.4} />
    </mesh>
  );
}

function Spaceship() {
  const ref = useRef<THREE.Group>(null!);
  const [dir] = useState(() => new THREE.Vector3(Math.random() - 0.5, (Math.random() - 0.5) * 0.3, Math.random() - 0.5).normalize());
  const [pos] = useState(() => dir.clone().multiplyScalar(-15 + Math.random() * 30));
  const speed = 0.02 + Math.random() * 0.03;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.addScaledVector(dir, speed);
      if (ref.current.position.length() > 20) ref.current.position.copy(dir).multiplyScalar(-20);
      const signal = ref.current.children[1] as THREE.Mesh;
      if (signal) {
        (signal.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 12) * 2;
        (signal.material as THREE.MeshStandardMaterial).opacity = 1;
      }
    }
  });

  return (
    <group ref={ref} position={pos} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)}>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <coneGeometry args={[0.05, 0.2, 3]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={1} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshStandardMaterial color="#ffffff" emissive="#fc5800" transparent />
      </mesh>
    </group>
  );
}

function GalaxySystem({ onNodeClick, selectedNode }: { onNodeClick?: (name: string | null) => void; selectedNode: string | null }) {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Rotate everything together
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
  });

  // Particle generation
  const { positions, colors } = useMemo(() => {
    const count = 10000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const numArms = 3;
    const spin = 1.2;
    const colorWhite = new THREE.Color("#ffffff");
    const colorPurple = new THREE.Color("#783fad");
    const colorBlue = new THREE.Color("#1101e4");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let radius = 0;

      // Central bulge (25% of particles)
      if (i < count * 0.25) {
        radius = Math.random() * 1.2;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi) * 0.8;
        positions[i3 + 2] = radius * Math.cos(theta);
      } else {
        // Spiral arms
        radius = 0.8 + Math.random() * 4.5;
        const armAngle = (i % numArms) * (Math.PI * 2 / numArms);
        const spiralAngle = radius * spin;

        const offsetR = Math.pow(Math.random(), 2) * 1.0;
        const offsetAngle = Math.random() * Math.PI * 2;

        positions[i3] = Math.cos(armAngle + spiralAngle) * radius + Math.cos(offsetAngle) * offsetR;
        positions[i3 + 1] = (Math.random() - 0.5) * (2.0 / (radius * 0.8 + 1));
        positions[i3 + 2] = Math.sin(armAngle + spiralAngle) * radius + Math.sin(offsetAngle) * offsetR;
      }

      // Determine color based on distance from center
      let mixedColor = colorWhite.clone();
      if (radius < 1.0) {
        // Core to Inner: White to Purple
        mixedColor.lerp(colorPurple, radius / 1.0);
      } else {
        // Inner to Outer: Purple to Dark Blue
        const t = Math.min(1, (radius - 1.0) / 4.0);
        mixedColor = colorPurple.clone().lerp(colorBlue, t);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  return (
    <group ref={groupRef}>
      <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          vertexColors 
          size={0.05} 
          sizeAttenuation 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </Points>
      {skillClusters.map((node, index) => (
        <PlanetNode 
          key={index} 
          name={node.name} 
          position={node.position as [number, number, number]} 
          onClick={() => onNodeClick?.(node.name)}
          isSelected={selectedNode === node.name}
        />
      ))}

      {/* Ambient Space Traffic */}
      {Array.from({ length: 8 }).map((_, i) => <Meteor key={`m-${i}`} />)}
      {Array.from({ length: 5 }).map((_, i) => <Spaceship key={`s-${i}`} />)}
    </group>
  );
}

export default function AIGalaxyView({ onNodeClick, selectedNode: externalSelectedNode }: { onNodeClick?: (name: string | null) => void; selectedNode?: string | null }) {
  const [internalSelectedNode, setInternalSelectedNode] = useState<string | null>(null);
  const activeNode = externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;

  // Keep internal state in sync with external prop changes
  useEffect(() => {
    if (externalSelectedNode !== undefined) {
      setInternalSelectedNode(externalSelectedNode);
    }
  }, [externalSelectedNode]);

  const handleNodeClick = (name: string | null) => {
    setInternalSelectedNode(name);
    onNodeClick?.(name);
  };

  return (
    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#020617_60%,_#000000_100%)]">
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }} onPointerMissed={() => handleNodeClick(null)}>
        <ambientLight intensity={0.5} />
        <GalaxySystem onNodeClick={handleNodeClick} selectedNode={activeNode} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}