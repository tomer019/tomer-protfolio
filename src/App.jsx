import { useState, useEffect } from "react";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Footer from "./sections/Footer.jsx";
import Navbar from "./sections/Navbar.jsx";
import Contact from "./sections/Contact.jsx";
import Projects from "./sections/Projects.jsx";
import MatrixRain from "./components/MatrixRain.jsx";

function App() {
  const [showMatrix, setShowMatrix] = useState(true);

  // hide Matrix after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowMatrix(false), 5000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* fade-out transition */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${showMatrix ? "opacity-100" : "opacity-0"
          }`}
      >
        <MatrixRain opacity={0.12} />
      </div>

      {/* actual site */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;
