import { motion } from "framer-motion";
import { personalInfo } from "../data/index";
import VengeanceButton from "./VengeanceButton";

export default function About() {
  return (
    <section id="about" className="relative z-10 overflow-hidden section">
      <div className="px-4 mx-auto max-w-7xl sm:px-4 lg:px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">Who I am</span>
          <h2 className="text-4xl font-black text-white sm:text-5xl">About <span className="gradient-text">Me</span></h2>
          <div className="w-20 h-1 mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side: About & Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col text-white"
          >
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">I'm {personalInfo.name}</h2>
            <p className="mb-6 text-sm font-medium sm:text-base">
              A Lead <span className="text-[#0A84FF]">AI Engineer & Developer</span> based in <span className="text-[#0A84FF]">{personalInfo.location}</span>
            </p>
            <p className="text-[#8B949E] leading-relaxed mb-8 text-sm sm:text-base">
              {personalInfo.bio}
            </p>
            
            <hr className="border-[#30363D] mb-8" />
            
            <h3 className="mb-6 text-lg font-bold tracking-wide uppercase">Personal Info</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 sm:gap-2">
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Name :</span> <span className="font-medium text-white">{personalInfo.name}</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Address :</span> <span className="font-medium text-white">{personalInfo.location}</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Age :</span> <span className="font-medium text-white">22 Years</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Phone :</span> <span className="font-medium text-white">+923469901771</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Nationality :</span> <span className="font-medium text-white">Pakistani</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Email :</span> <span className="font-medium text-white">{personalInfo.email}</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Freelance :</span> <span className="font-medium text-white">Available</span></div>
              <div className="flex text-sm sm:text-base"><span className="text-[#8B949E] w-24 flex-shrink-0">Languages :</span> <span className="font-medium text-white">English, Urdu, Pashto</span></div>
            </div>
            
            <div>
              <VengeanceButton href="/Humais-Resume.pdf" download variant="outline">
                Download CV
              </VengeanceButton>
            </div>
          </motion.div>

          {/* Right Side: Education */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="mb-6 text-lg font-bold tracking-wide uppercase text-white lg:pl-10 mt-10 lg:mt-0">Education</h3>
            <div className="flex flex-col gap-10 lg:pl-10">
              {[
                {
                  year: "2023 - Present",
                  degree: "BSc | Computer Software Engineering",
                  school: "University of Engineering and Technology, Mardan"
                },
                {
                  year: "2021 - 2023",
                  degree: "FSc | Pre Engineering",
                  school: "Islamia College Peshawar"
                },
                {
                  year: "2019 - 2021",
                  degree: "Matriculation in Science",
                  school: "IQRA Hoti School & College, Mardan"
                }
              ].map((edu, index) => (
                <div key={index} className="relative pl-6 sm:pl-10 border-l-2 border-[#30363D] hover:border-[#0A84FF] transition-colors duration-300">
                  {/* Timeline dot */}
                  <div className="absolute top-0 left-0 w-5 h-5 rounded-full bg-[#101010] border-4 border-[#0A84FF] -translate-x-[11px] mt-1 shadow-[0_0_15px_rgba(10,132,255,0.3)]" />
                  
                  <div className="inline-block mb-3 text-xs sm:text-sm font-semibold tracking-widest text-[#0A84FF]">
                    {edu.year}
                  </div>
                  <h4 className="mb-2 text-xl font-bold leading-tight text-white sm:text-2xl">{edu.degree}</h4>
                  <p className="text-[#8B949E] text-sm sm:text-base font-medium">{edu.school}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
