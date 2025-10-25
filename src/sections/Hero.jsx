import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';
import EnergyCoreCosmic from '../components/EnergyCoreCosmic.jsx';
import EnergyCore from '../components/EnergyCore.jsx';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col sm:flex-row items-center justify-between c-space relative"
    >
      {/* ===== LEFT SIDE (TEXT) ===== */}
      <div className="flex-1 sm:pl-24 px-6 flex flex-col gap-5 z-10 text-left">
        <h1 className="sm:text-5xl text-3xl font-bold text-white font-generalsans leading-tight">
          Hi, I’m Tomer <span className="waving-hand">👋</span>
        </h1>
        <p className="text-gray_gradient sm:text-xl text-lg max-w-md">
          I’m a passionate computer science student and full-stack developer
          who turns abstract ideas into functional, scalable systems.  
          I love exploring deep tech — from AI and data systems to performance-driven C++ servers.
        </p>
        <a href="#about" className="mt-4">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-72"
          />
        </a>
      </div>

      {/* ===== RIGHT SIDE (3D MODEL) ===== */}
      <div className="flex-1 relative w-full h-[500px] sm:h-screen">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={isMobile ? 3.5 : 5} // made slightly larger
                position={[0, -2, 0]}
                rotation={[0, 0, 0]}
              />
            </HeroCamera>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.6} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
