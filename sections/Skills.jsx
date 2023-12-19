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
            <div className='flex flex-row justify-evenly gap-2'>
            <div className='flex flex-col border p-4 rounded-lg w-[200px] justify-center hover:bg-green-700'>
                <span className='font-bold text-lg underline'>Languages</span>
                <span className='text-sm'>Python, Java, SQL, HTML, CSS, Tailwind, Javascript, Typescript, R, Dart</span>
              </div>
              <div className='flex flex-col border p-4 rounded-lg w-[240px] gap-2 justify-center hover:bg-green-700'>
                <span className='font-bold text-lg underline'>Front-End Frameworks</span>
                <span className='text-sm'>Tailwind, Bootstrap, React, Nextjs, Redux, Flutter</span>
                <span className='font-bold text-lg underline'>Back-end Frameworks</span>
                <span className='text-sm'>Express, Flask, Next.js</span>
              </div>
              <div className='flex flex-col border p-4 rounded-lg w-[220px] gap-2 justify-center hover:bg-green-700'>
                <span className="font-bold text-lg underline">Databases/ORMs</span>
                <span className='text-sm'>MongoDB, Firestore, PostgresSQL, mySQL, SQLAlchemy, Prisma</span>
                <span className='font-bold text-lg underline'>Cloud Services</span>
                <span className='text-sm'>Firebase, AWS</span>
                <span className='font-bold text-lg underline '>API Development</span>
                <span className='text-sm'>REST, GraphQL, tRPC</span>
              </div>
              <div className='flex flex-col border p-4 rounded-lg w-[200px] justify-center hover:bg-green-700'>
                <span className='font-bold text-lg underline'>Data Science</span>
                <span className='text-sm'>Pandas, Numpy, Scikit-learn, PyTorch, Data Visualization</span>
                <span className='font-bold text-lg underline'>Developer Tools</span>
                <span className='text-sm'>Git/GitHub, Jupyter, Visual Studio 
</span>
              </div>
              <div className='flex flex-col border p-4 rounded-lg w-[260px] hover:bg-green-700 justify-center'>
                <span className='font-bold text-lg'>Favorite Tech Stacks:</span>
                <ul>
                  <li> - MERN(MongoDB, React, Nodejs, ExpressJs)</li>
                  <li> - T3(Tailwind, Typescript, tRPC) w/ Nextjs and Prisma</li>
                  <li> - Firebase w/ Nextjs</li>
                  <li> - Flask & AWS w/ React</li>
                </ul>
              </div>
            </div>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Skills
