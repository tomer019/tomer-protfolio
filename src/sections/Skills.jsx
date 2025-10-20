import React from "react";
import { motion } from "framer-motion";

const skills = [
    { name: "C++", icon: "/assets/cpp.svg" },
    { name: "Python", icon: "/assets/python.svg" },
    { name: "Node.js", icon: "/assets/node.svg" },
    { name: "React", icon: "/assets/react.svg" },
    { name: "Docker", icon: "/assets/docker.svg" },
    { name: "MongoDB", icon: "/assets/mongodb.svg" },
    { name: "Git", icon: "/assets/git.svg" },
    { name: "Java", icon: "/assets/java.svg" },
    { name: "JavaScript", icon: "/assets/javascript.svg" },
    { name: "HTML5", icon: "/assets/html5.svg" },
    { name: "CSS3", icon: "/assets/css3.svg" },
    { name: "XML", icon: "/assets/xml.svg" },
];

const Skills = () => {
    return (
        <section
            id="skills"
            className="relative z-10 text-gray-100 px-8 sm:px-16 md:px-28 lg:px-10 py-16 mb-16 "
        >

            <div className="flex justify-center">
                <h1
                    className="
      text-3xl md:text-5xl font-semibold 
      mb-6
      tracking-tight relative inline-block
      text-center
      -translate-y-4
    "
                >
                    {/* רקע מטושטש מאחור */}
                    <span
                        className="
        absolute inset-0 
        blur-md 
        bg-gradient-to-r from-[#00C6FF]/30 via-[#8A2BE2]/20 to-[#00C6FF]/30 
        rounded-md 
        -z-10
      "
                    ></span>

                    {/* טקסט עם gradient ומעל הרקע */}
                    <span
                        className="
        relative z-10 
        bg-gradient-to-r from-[#00C6FF] via-[#8A2BE2] to-[#00C6FF] 
        bg-clip-text 
        text-transparent 
        drop-shadow-[0_0_18px_rgba(0,198,255,0.45)]
      "
                    >
                        Skills & Technologies
                    </span>
                </h1>
            </div>



            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3"
                        />
                        <p className="text-gray-300 text-lg font-medium">{skill.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
