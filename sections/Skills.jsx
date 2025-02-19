'use client';
import React from 'react'
import { TitleText, TypingText } from '../components';
import { motion } from 'framer-motion';
import styles from '../styles';
import {  staggerContainer, fadeIn } from '../utils/motion';
import { ChevronRight, Code, Database, Cloud, Wrench, Brain, Globe, Terminal } from 'lucide-react';
import { useState } from 'react';


const SkillNode = ({ title, icon, skills, isDefaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);
  
  return (
    <div className="mb-4">
      <div 
        className="flex items-center p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="mr-2 text-white">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        <ChevronRight
          className={`text-white transform transition-transform duration-200 ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
      </div>
      
      {isExpanded && (
        <div className="ml-4 mt-2 space-y-2">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200">
              <span className="text-white">{skill.name}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < skill.level ? 'text-yellow-300' : 'text-gray-500'} fill-current`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const Skills = () => {
  const skills = {
    languages: {
      title: "Programming Languages",
      icon: <Code size={24} />,
      skills: [
        { name: "Python", level: 5 },
        { name: "JavaScript", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "HTML/CSS", level: 5 },
        { name: "Java", level: 4 },
        { name: "SQL", level: 4 },
        { name: "R", level: 3 },
        { name: "Haskell", level: 2 }
      ]
    },
    frontend: {
      title: "Front-End Frameworks",
      icon: <Globe size={24} />,
      skills: [
        { name: "Tailwind", level: 5 },
        { name: "React", level: 5 },
        { name: "Nextjs", level: 5 }
      ]
    },
    backend: {
      title: "Back-End Frameworks",
      icon: <Terminal size={24} />,
      skills: [
        { name: "Express", level: 5 },
        { name: "Nodejs", level: 5 },
        { name: "Flask", level: 5 },
        { name: "Nextjs", level: 5 },
        { name: "Ruby on Rails", level: 2}
      ]
    },
    databases: {
      title: "Databases/ORMs",
      icon: <Database size={24} />,
      skills: [
        { name: "MongoDB", level: 4 },
        { name: "Firestore", level: 4 },
        { name: "PostgreSQL", level: 5 },
        { name: "MySQL", level: 5 },
        { name: "SQLAlchemy", level: 3},
        { name: "Prisma", level: 3}
      ]
    },
    cloud: {
      title: "Cloud Services",
      icon: <Cloud size={24} />,
      skills: [
        { name: "Firebase", level: 4 },
        { name: "AWS (EC2, LightSail, S3, RDS)", level: 4 }
      ]
    },
    api: {
      title: "API Development",
      icon: <Wrench size={24} />,
      skills: [
        { name: "REST", level: 5 },
        { name: "GraphQL", level: 3 },
        { name: "tRPC", level: 3 }
      ]
    },
    datascience: {
      title: "Data Science",
      icon: <Brain size={24} />,
      skills: [
        { name: "Pandas", level: 4 },
        { name: "Numpy", level: 4 },
        { name: "Scikit-learn", level: 3 },
        { name: "PyTorch", level: 2 },
        { name: "Data Visualization", level: 3 }
      ]
    },
    tools: {
      title: "Developer Tools",
      icon: <Terminal size={24} />,
      skills: [
        { name: "Git/GitHub", level: 5 },
        { name: "Jupyter", level: 5 },
        { name: "Visual Studio", level: 5 },
        { name: "Docker", level: 3 }
      ]
    }
  };

  return (
    <div className='px-10 text-white'>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}
      >
        <TypingText title="| Technical Skills" textStyles="text-center" />
        <TitleText title={<>Skills</>} textStyles="text-center" />
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className="flex-[0.5]  flex justify-end flex-col gradient-05 sm:p-8 p-4 relative">
          <div className="grid grid-cols-1 gap-4">
        {Object.entries(skills).map(([key, category]) => (
          <SkillNode
            key={key}
            title={category.title}
            icon={category.icon}
            skills={category.skills}
            isDefaultExpanded={key === 'languages'}
          />
        ))}
      </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Skills
