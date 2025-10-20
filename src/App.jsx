import SubtleParticles from "./components/SubtleParticles.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Skills from "./sections/Skills.jsx";

function App() {
  return (
    <main className="relative text-white min-h-screen overflow-hidden">
      <SubtleParticles /> {/* רקע חי, רגוע, נצחי */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}

export default App;
