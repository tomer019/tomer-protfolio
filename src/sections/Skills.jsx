import React from "react";
import { motion } from "framer-motion";

const skills = [
    { name: "C++", icon: "/assets/cpp.png" },
    { name: "Python", icon: "/assets/python.png" },
    { name: "Node.js", icon: "/assets/node.png" },
    { name: "React", icon: "/assets/react.svg" },
    { name: "Docker", icon: "/assets/docker.png" },
    { name: "MongoDB", icon: "/assets/mongodb.png" },
    { name: "Git", icon: "/assets/git.png" },
    { name: "Java", icon: "/assets/java.png" },
    { name: "JavaScript", icon: "/assets/javascript.png" },
    { name: "HTML5", icon: "/assets/html5.png" },
    { name: "CSS3", icon: "/assets/css3.png" },
    { name: "XML", icon: "/assets/xml.png" },
];

const Skills = () => {
    return (
        <section
            id="skills"
            className="text-gray-100 px-8 sm:px-16 md:px-28 lg:px-10 py-20"
        >

            <h2
                className="text-2xl md:text-4xl font-semibold mb-10 bg-gradient-to-r from-[#00C6FF] via-[#8A2BE2] to-[#00C6FF] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(0,198,255,0.35)] tracking-tight"
            >
                Skills & Technologies
            </h2>


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
