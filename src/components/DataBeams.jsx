import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Subtle light beams expanding behind the computer
const DataBeams = () => {
    const groupRef = useRef();

    // create long thin beams (like digital rays)
    const beams = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 50; i++) {
            arr.push({
                x: (Math.random() - 0.5) * 15,
                y: (Math.random() - 0.5) * 5,
                z: -5 - Math.random() * 10,
                scale: 0.3 + Math.random() * 0.7,
            });
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {beams.map((b, i) => (
                <mesh key={i} position={[b.x, b.y, b.z]} scale={[0.05, b.scale, 0.05]}>
                    <cylinderGeometry args={[0.03, 0.03, 4, 8]} />
                    <meshBasicMaterial
                        color={new THREE.Color(0x00c6ff)}
                        transparent
                        opacity={0.15 + Math.random() * 0.1}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default DataBeams;
