import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BrainHemisphere = ({ position, rotation, meshRef, internalRef, scrollProgress }: { 
  position: [number, number, number], 
  rotation?: [number, number, number],
  meshRef: React.RefObject<THREE.Mesh>,
  internalRef: React.RefObject<THREE.Mesh>,
  scrollProgress: number
}) => {
  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#3399FF"
            speed={4}
            distort={0.45}
            radius={1}
            emissive="#3399FF"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.8}
            transparent
          />
        </Sphere>
      </Float>
      
      {/* Internal Core */}
      <mesh ref={internalRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#3399FF" transparent opacity={0.3} />
      </mesh>
      
      {/* Neural Wireframe overlay */}
      <Sphere args={[1.05, 16, 16]}>
        <meshBasicMaterial color="#3399FF" wireframe transparent opacity={0.1} />
      </Sphere>
    </group>
  );
};

const BrainEgg = () => {
  const leftRef = useRef<THREE.Mesh>(null);
  const leftInternalRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const rightInternalRef = useRef<THREE.Mesh>(null);
  const mainGroupRef = useRef<THREE.Group>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useFrame((state) => {
    const s = smoothScroll.get();
    
    // Scale: 1 -> 25 -> 1
    let scaleFactor;
    if (s < 0.2) scaleFactor = 1 + (s / 0.2) * 24;
    else if (s > 0.8) scaleFactor = 25 - ((s - 0.8) / 0.2) * 24;
    else scaleFactor = 25;
    
    // Vertical Movement: Move down with scroll
    const yPos = -s * 10;
    
    // Opacity: fades out in the middle, max 0.5 at ends
    let opacityFactor;
    if (s < 0.15) opacityFactor = 0.5 * (1 - (s / 0.15));
    else if (s > 0.85) opacityFactor = 0.5 * ((s - 0.85) / 0.15);
    else opacityFactor = 0;

    if (mainGroupRef.current) {
      mainGroupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      mainGroupRef.current.position.y = yPos;
      mainGroupRef.current.rotation.y += 0.005;
    }

    [leftRef, rightRef].forEach(ref => {
      if (ref.current && ref.current.material instanceof THREE.MeshStandardMaterial) {
        ref.current.material.opacity = opacityFactor;
      }
    });

    [leftInternalRef, rightInternalRef].forEach(ref => {
      if (ref.current && ref.current.material instanceof THREE.MeshBasicMaterial) {
        ref.current.material.opacity = opacityFactor * 0.3;
      }
    });
  });

  return (
    <group ref={mainGroupRef}>
      {/* Left Hemisphere */}
      <BrainHemisphere 
        position={[-0.4, 0, 0]} 
        meshRef={leftRef} 
        internalRef={leftInternalRef}
        scrollProgress={0}
      />
      {/* Right Hemisphere */}
      <BrainHemisphere 
        position={[0.4, 0, 0]} 
        meshRef={rightRef} 
        internalRef={rightInternalRef}
        scrollProgress={0}
      />
    </group>
  );
};

export const NeuralBrain3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3399FF" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#3399FF" />
        
        <React.Suspense fallback={null}>
          <BrainEgg />
          <Environment preset="city" />
          <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={2.5} far={4.5} />
        </React.Suspense>
      </Canvas>
      
      {/* Dynamic Scrim: Darken as the user scrolls to maintain high contrast for sections */}
      <div className="absolute inset-0 bg-background/40" />
      
      {/* Fixed Vignette for focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/10 to-background pointer-events-none" />
    </div>
  );
};
