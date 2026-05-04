"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function PlanetNode({ name, position }: { name: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  // Bobbing animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
      >
        {/* The Planet: Wireframe Sphere */}
        <sphereGeometry args={[hovered ? 0.4 : 0.3, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#FFFF00" : "#888800"} 
          wireframe={true} 
          emissive="#FFFF00"
          emissiveIntensity={hovered ? 0.8 : 0.2}
        />
      </mesh>

      {/* The Label */}
      <Html distanceFactor={15}>
        <div className={`
          px-3 py-1 font-mono text-xs uppercase tracking-widest border transition-all duration-300
          ${hovered 
            ? "bg-yellow-400 text-black border-yellow-400 scale-110" 
            : "bg-black/80 text-yellow-400 border-yellow-400/30"}
        `}>
          {name}
        </div>
      </Html>
    </group>
  );
}