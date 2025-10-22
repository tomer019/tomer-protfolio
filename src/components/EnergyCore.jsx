import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const EnergyCore = ({ position = [0, 0, 0] }) => {
  const coreRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // subtle rotation
    coreRef.current.rotation.y = t * 0.3;
    // gentle pulsation
    const scale = 1 + Math.sin(t * 2) * 0.05;
    glowRef.current.scale.set(scale, scale, scale);
  });

  // subtle breathing effect
  gsap.to(coreRef.current?.scale || { x: 1 }, {
    x: 1.05,
    y: 1.05,
    z: 1.05,
    yoyo: true,
    repeat: -1,
    duration: 3,
    ease: 'sine.inOut',
  });

  return (
    <group position={position}>
      {/* Inner glowing sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 64, 64]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      {/* Outer transparent glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          emissive="#00ffff"
          emissiveIntensity={0.5}
          roughness={0.5}
          metalness={0}
        />
      </mesh>

      {/* Optional light source for subtle illumination */}
      <pointLight color="#00ffff" intensity={2} distance={3} decay={2} />
    </group>
  );
};

export default EnergyCore;
