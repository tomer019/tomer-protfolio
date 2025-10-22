const About = () => {
  // 📄 Function to open the resume PDF in a new tab
  const openResume = () => {
    window.open('/assets/Tomer_Grady_CV.pdf', '_blank');
  };

  // 📩 Function to scroll smoothly to the Contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-[#050507]/1 text-gray-100 px-10 md:px-24 py-20"
    >
      {/* 🖼️ Profile Image — 10% width */}
      <div className="flex-[0.1] flex justify-center items-center mb-10 md:mb-0">
        <div className="relative">
          <img
            src="assets/profile.jpg"
            alt="Tomer Grady"
            className="rounded-full w-32 h-32 md:w-36 md:h-36 object-cover border-2 border-[#10121A] shadow-[0_0_25px_rgba(0,198,255,0.25)] transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-[#0A0C12]/40"></div>
        </div>
      </div>

      {/* 🧠 Text Section — 90% width */}
      <div className="flex-[0.9] flex flex-col justify-center md:pl-24 text-center md:text-left max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#00C6FF] tracking-tight drop-shadow-[0_0_15px_rgba(0,198,255,0.2)]">
          About Me
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
          I’m <span className="text-white font-medium">Tomer Grady</span> — a computer science student
          exploring the intersection between <span className="text-[#00C6FF]">software</span>,
          <span className="text-[#00C6FF]"> data</span>, and <span className="text-[#00C6FF]">human impact</span>.
          I focus on clarity and efficiency — writing code that’s simple, robust, and meaningful.
        </p>

        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-10">
          I’m fascinated by systems — from low-level architecture to high-level machine learning.
          My approach combines logic, curiosity, and calm precision. I’m passionate about
          leveraging technology to solve real-world problems and create positive change.
        </p>

        {/* ⚙️ Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={openResume}
            className="px-6 py-3 bg-[#00C6FF] text-black font-semibold rounded-xl shadow-[0_0_15px_rgba(0,198,255,0.4)] hover:shadow-[0_0_25px_rgba(0,198,255,0.6)] transition-all duration-300"
          >
            View Resume
          </button>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-transparent border-2 border-[#00C6FF] text-[#00C6FF] font-semibold rounded-xl hover:bg-[#00C6FF]/10 transition-all duration-300"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
