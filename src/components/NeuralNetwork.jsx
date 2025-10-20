import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Elegant Neural Network background
const NeuralNetwork = () => {
    const groupRef = useRef();

    // Create elegant clustered points
    const nodes = useMemo(() => {
        const n = 80;
        const arr = [];
        for (let i = 0; i < n; i++) {
            const radius = 10 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            arr.push([x, y, z]);
        }
        return arr;
    }, []);

    // Animate breathing glow
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) {
            // rotation (breathing motion)
            groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
            groupRef.current.rotation.x = Math.cos(t * 0.07) * 0.1;

            // glow pulsation
            groupRef.current.children.forEach((child) => {
                if (child.material) {
                    const pulse = 0.5 + 0.3 * Math.sin(t * 1.5); // breathing rhythm
                    child.material.opacity = 0.15 + pulse * 0.2;
                    child.material.emissiveIntensity = 0.3 + pulse * 0.6;
                }
            });
        }
    });

    // create shared material for all points
    const glowMaterial = useMemo(() =>
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x00c6ff),
            transparent: true,
            opacity: 0.25,
        }), []
    );

    return (
        <group ref={groupRef} position={[0, 0, -15]}>
            {/* faint soft particles */}
            {nodes.map((pos, i) => (
                <mesh key={i} position={pos} material={glowMaterial}>
                    <sphereGeometry args={[0.35, 12, 12]} />
                </mesh>
            ))}

            {/* optional faint connecting web */}
            <lineSegments>
                <bufferGeometry
                    attach="geometry"
                    {...(() => {
                        const vertices = [];
                        nodes.forEach((a, i) => {
                            for (let j = i + 1; j < nodes.length; j++) {
                                if (Math.random() > 0.97) { // keep sparse
                                    vertices.push(...a, ...nodes[j]);
                                }
                            }
                        });
                        return { attributes: { position: new THREE.Float32BufferAttribute(vertices, 3) } };
                    })()}
                />
                <lineBasicMaterial color="#00C6FF" transparent opacity={0.08} />
            </lineSegments>
        </group>
    );
};

export default NeuralNetwork;
