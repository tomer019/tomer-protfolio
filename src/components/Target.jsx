import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

const Star = (props) => {
  const starRef = useRef();
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf'
  );

  // 🟩 MATRIX Glow Style
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color = new THREE.Color(0x00ff66); // bright green base
      child.material.emissive = new THREE.Color(0x00ff33); // glowing green
      child.material.emissiveIntensity = 1.5;
      child.material.metalness = 0.3;
      child.material.roughness = 0.4;
      child.material.transparent = true;
      child.material.opacity = 0.9;
    }
  });

  useGSAP(() => {
    const obj = starRef.current;

    // 🌀 slow rotation (like data vortex)
    gsap.to(obj.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    // ☁️ floating up/down pulse
    gsap.to(obj.position, {
      y: "+=0.5",
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // ⚡️ glowing pulse
    scene.traverse((child) => {
      if (child.isMesh) {
        gsap.to(child.material, {
          emissiveIntensity: 3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    // 💫 digital “data flow” flicker
    const glitchColors = [0x00ff99, 0x00ff44, 0x00cc44, 0x00ff11];
    let i = 0;
    setInterval(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.emissive = new THREE.Color(glitchColors[i % glitchColors.length]);
        }
      });
      i++;
    }, 400); // rapid flicker, like digital stream
  });

  return (
    <group position={[0, 4, 0]}>
      <primitive ref={starRef} object={scene} scale={1.8} {...props} />
    </group>
  );
};

export default Star;
