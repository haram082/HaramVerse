'use client';
import React from 'react'
import { TitleText, TypingText } from '../components';
import { motion } from 'framer-motion';
import styles from '../styles';
import { planetVariants, staggerContainer, fadeIn } from '../utils/motion';


const Skills = () => {
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
      <p className='text-center'>
      <span className=' font-bold text-lg'>Front-End Skills: </span> HTML, CSS, Tailwind, Bootstrap, Javascript, Typescript, React, Redux, <br />
      <span className=' font-bold text-lg'>Back-End Skills: </span> Node.js, Express, MongoDB, Firebase, Next.js, tRPC, Prisma, Python, Flask, SQL(NoSQL, MySQL), AWS Cloud, Unit Testing <br />
      <span className=' font-bold text-lg'>Other: </span> Pandas, Numpy, Data Analysis, R, OOP, Git/GitHub, Jupyter, Visual Studio <br/>
    <div className='flex flex-col pt-3'>
      <span className=' font-bold text-lg'>
        Favorite Tech Stacks: </span>
        <li> MERN(MongoDB, React, Nodejs, ExpressJs)</li>
        <li>T3(Tailwind, Typescript, tRPC) w/ Nextjs and Prisma</li>
        <li> Firebase w/ Nextjs </li>
        <li>Flask & AWS w/ React </li> 
    </div>

    </p>
    </motion.div>
    </motion.div>
    </div>
  )
}

export default Skills
