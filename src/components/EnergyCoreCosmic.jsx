// EnergyCoreCosmic.jsx
// comments in English only
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CoreFresnelMaterial = () => {
    // GLSL Fresnel effect without textures
    const material = useMemo(() => {
        const uniforms = {
            uColorInner: { value: new THREE.Color('#8ab4ff') }, // bluish
            uColorOuter: { value: new THREE.Color('#b388ff') }, // purple
            uIntensity: { value: 1.5 },
            uTime: { value: 0 },
        };

        const vertex = `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `;

        const fragment = `
      uniform vec3 uColorInner;
      uniform vec3 uColorOuter;
      uniform float uIntensity;
      uniform float uTime;

      varying vec3 vNormal;
      varying vec3 vWorldPos;

      void main() {
        // Camera direction
        vec3 V = normalize(cameraPosition - vWorldPos);
        // Fresnel term
        float fres = pow(1.0 - max(dot(normalize(vNormal), V), 0.0), 2.5);
        // Subtle time shimmer
        float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
        vec3 color = mix(uColorInner, uColorOuter, fres) * (0.9 + 0.2 * pulse);
        // Additive-style glow without postprocessing
        gl_FragColor = vec4(color * (1.0 + fres * uIntensity), 1.0);
      }
    `;

        const mat = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: false,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        return mat;
    }, []);

    // expose time uniform update via a tiny object
    return material;
};

const EnergyCoreCosmic = ({ position = [0, 0, 0], particleCount = 800 }) => {
    const coreRef = useRef();
    const shellRef = useRef();
    const pointsRef = useRef();

    const fresnelMat = CoreFresnelMaterial();

    // Build particle field once
    const pointsGeo = useMemo(() => {
        // points in a spherical shell
        const g = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // random normalized direction
            const u = Math.random();
            const v = Math.random();
            const theta = 2.0 * Math.PI * u;
            const phi = Math.acos(2.0 * v - 1.0);
            const dir = new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi)
            );
            const r = 0.2 + Math.random() * 0.3; // radius range around the core
            const p = dir.multiplyScalar(r + 0.8); // push away from core
            positions[i * 3 + 0] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;
            sizes[i] = 0.75 + Math.random() * 1.25;
        }

        g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        return g;
    }, [particleCount]);

    // Simple points material (no texture), additive blending
    const pointsMat = useMemo(() => {
        const m = new THREE.PointsMaterial({
            size: 0.03,
            color: new THREE.Color('#a98cff'),
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        return m;
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // animate shader time
        if (fresnelMat?.uniforms?.uTime) {
            fresnelMat.uniforms.uTime.value = t;
        }

        // slow rotation for the whole group
        if (coreRef.current) coreRef.current.rotation.y = t * 0.25;
        if (shellRef.current) {
            const s = 1.0 + Math.sin(t * 1.8) * 0.05; // subtle breathing
            shellRef.current.scale.set(s, s, s);
        }

        // particle orbit + shimmer
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.07;
            pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
        }
    });

    return (
        <group position={position}>
            {/* Inner core with Fresnel glow */}
            <mesh ref={coreRef} material={fresnelMat}>
                <sphereGeometry args={[0.45, 128, 128]} /> {/* perfect smooth sphere */}
            </mesh>


            {/* Outer transparent shell for depth */}
            <mesh ref={shellRef}>
                <sphereGeometry args={[0.7, 64, 64]} />
                <meshPhysicalMaterial
                    transparent
                    opacity={0.12}
                    color={'#b388ff'}
                    roughness={0.5}
                    metalness={0.0}
                    transmission={0.6} // fake glass feel without textures
                    thickness={0.2}
                />
            </mesh>

            {/* Particle field */}
            <points ref={pointsRef} geometry={pointsGeo} material={pointsMat} />
        </group>
    );
};

export default EnergyCoreCosmic;
