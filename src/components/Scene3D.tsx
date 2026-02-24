import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch, ChromaticAberration, Scanline, Noise } from '@react-three/postprocessing';
import { GlitchMode, BlendFunction } from 'postprocessing';
import * as THREE from 'three';

function TechCore({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current || !coreRef.current) return;
    
    // Continuous rotation
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.1;

    // Pulse effect
    const time = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(time * 2) * 0.1;
    coreRef.current.scale.set(scale, scale, scale);

    // Mouse interaction (lerp towards mouse position)
    const targetRotationX = mouse.current[1] * 0.5;
    const targetRotationY = mouse.current[0] * 0.5;
    
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * delta * 2;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * delta * 2;
  });

  return (
    <group ref={meshRef}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <icosahedronGeometry args={[2.8, 2]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Inner Tech Core - Distorted Sphere */}
      <Sphere args={[1.2, 64, 64]} ref={coreRef}>
        <MeshDistortMaterial
          color="#000000"
          emissive="#00f0ff"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          wireframe={false}
        />
      </Sphere>
      
      {/* Wireframe overlay on core */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Floating Particles/Data points */}
      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[2.5, 1, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-2.5, -1.5, 1]}>
          <tetrahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 2.5, -1.5]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
        </mesh>
         <mesh position={[1.5, -2, 1.5]}>
          <dodecahedronGeometry args={[0.1]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
    </instancedMesh>
  );
}

export function Scene3D() {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (event: React.MouseEvent) => {
    mouse.current = [
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    ];
  };

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas gl={{ antialias: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        <TechCore mouse={mouse} />
        <ParticleField count={100} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
          <Glitch 
            delay={new THREE.Vector2(1.5, 3.5)} 
            duration={new THREE.Vector2(0.1, 0.3)} 
            strength={new THREE.Vector2(0.1, 0.2)} 
            mode={GlitchMode.SPORADIC} 
            active 
            ratio={0.85} 
          />
          <ChromaticAberration offset={[0.002, 0.002]} blendFunction={BlendFunction.NORMAL} />
          <Scanline density={1.5} opacity={0.05} />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
