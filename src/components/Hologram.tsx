import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DistortedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.5}>
        <TorusKnotGeometry args={[1, 0.3, 100, 16]} />
        <MeshDistortMaterial
          color="#00f0ff"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function TorusKnotGeometry(props: any) {
    return <torusKnotGeometry {...props} />
}


export function Hologram() {
  return (
    <div className="w-full h-[400px] md:h-[600px] absolute top-0 right-0 z-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <DistortedShape />
      </Canvas>
    </div>
  );
}
