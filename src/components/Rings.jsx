import { useGSAP } from '@gsap/react';
import { Center, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useCallback, useRef } from 'react';

const Rings = ({ position }) => {
  const refList = useRef([]);

  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  const texture = useTexture('textures/rings.png');

  useGSAP(() => {
    if (refList.current.length === 0) return;

    // Set initial positions
    refList.current.forEach((r) => {
      r.position.set(position[0], position[1], position[2]);
    });

    // Continuous spin — no resets, no jerks
    refList.current.forEach((r, i) => {
      gsap.to(r.rotation, {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 6 + i * 1.2, // different speed for each ring
        ease: 'none',
        repeat: -1,
      });
    });

    // Optional subtle breathing/pulse effect
    gsap.to(refList.current.map((r) => r.scale), {
      x: 1.05,
      y: 1.05,
      z: 1.05,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
      stagger: 0.2,
    });
  }, [position]);

  return (
    <Center>
      <group scale={0.5}>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh key={index} ref={getRef}>
            {/* Slightly increasing ring size */}
            <torusGeometry args={[(index + 1) * 0.5, 0.1, 32, 64]} />
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Center>
  );
};

export default Rings;
