'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { projects } from '../constants';
import { staggerContainer } from '../utils/motion';
import { ExploreCard, TitleText, TypingText } from '../components';

const Projects = () => {
  const [active, setActive] = useState('world-2');

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Projects" textStyles="text-center" />
        <TitleText
          title={<>Choose the project you <br className="md:block hidden" /> want to explore</>}
          textStyles="text-center"
        />
        <p className='text-center text-white w-96 m-auto'>Click each box for a different project. For a more detailed explanation on the project's technologies and insight in the development/production process, check the github description for each project. </p>
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {projects.map((project, index) => (
            <ExploreCard
              key={project.id}
              {...project}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
