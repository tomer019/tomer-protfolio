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
  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Tomer <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">From Vision to Execution</p>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Canvas
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
          className="w-full h-full"
        >

          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={4}
                position={[0, -2, 0]}
                rotation={[0, 0, 0]}
              />

            </HeroCamera>

            <group>

              {/*{ <ReactLogo position={sizes.reactLogoPosition} /> }
<Target position={sizes.targetPosition} />
              <ambientLight intensity={0.15} />
              <pointLight position={[2, 2, 2]} intensity={1.2} />
              <EnergyCoreCosmic position={sizes.reactLogoPosition} />
              <EnergyCore position={sizes.reactLogoPosition} />
              
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
              <Rings position={sizes.cubePosition} />
              */
            }

            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
