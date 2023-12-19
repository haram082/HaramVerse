'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { insights } from '../constants';
import { staggerContainer } from '../utils/motion';
import { InsightCard, TitleText, TypingText } from '../components';

const Experience = () => (
  <section className={`${styles.paddings} relative z-10 mt-[30px]`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth}  flex flex-col`}
    >
      <TitleText title="Experiences" textStyles="text-center" />
      <TypingText title="| Experience & Certificates" textStyles="text-center" />

      <div className=" flex flex-col gap-[30px] mt-[50px]">
        {insights.map((item, index) => (
          <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Experience;
