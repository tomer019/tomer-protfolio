import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Button from '../components/Button.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

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
      <div className="flex-1 sm:pl-24 px-6 flex flex-col gap-6 z-10 text-left">
        <h1
          className="text-5xl md:text-7xl font-extrabold 
                     bg-gradient-to-r from-[#00C6FF] via-[#8A2BE2] to-[#00C6FF] 
                     bg-clip-text text-transparent 
                     drop-shadow-[0_0_25px_rgba(0,198,255,0.3)]
                     font-generalsans tracking-tight leading-[1.15]"
        >
          Hi, I’m Tomer <span className="waving-hand">👋</span>
        </h1>

        <p
          className="text-gray-300 sm:text-2xl text-lg 
                     max-w-xl leading-relaxed font-light tracking-wide"
        >
          I’m a computer science student and full-stack developer passionate about 
          building systems that merge <span className="text-white font-semibold">technology and creativity</span>.  
          From backend C++ servers to 3D web experiences, I turn complex ideas into clean, 
          interactive realities.
        </p>

        {/* --- BUTTON (moved slightly left) --- */}
        <a
          href="#about"
          className="mt-6 translate-x-[-14px] sm:translate-x-[-24px]"
        >
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-72"
          />
        </a>
      </div> {/* ✅ properly closed left-side div */}

      {/* ===== RIGHT SIDE (3D MODEL) ===== */}
      <div className="flex-1 relative w-full h-[500px] sm:h-screen">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={isMobile ? 3.5 : 5}
                position={[-2, -2, 0]}  // 👈 moved a bit more left
                rotation={[0, 0, 0]}
              />
            </HeroCamera>

            <ambientLight intensity={1.1} />
            <directionalLight position={[10, 10, 10]} intensity={0.6} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
