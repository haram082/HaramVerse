'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { TitleText, TypingText } from '../components';
import { planetVariants, staggerContainer, fadeIn } from '../utils/motion';
import Link from 'next/link';

const Intro = () => (
  <section className={`${styles.paddings} relative z-10 mt-5`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col"
      >
        <TypingText title="| Welcome to Haram's Portfolio" />
        <TitleText title={<>Who is Haram?</>} />
        <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[0.5]  flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
      >
        <div className="" />
        <p className="mt-[24px] font-normal sm:text-2xl text-lg sm:leading-[45.6px] leading-[39.6px] text-white">
          <span className=' font-semibold'>Haram is currently a sophomore looking to be a prospective B.A. Computer Science & Cognitive Science major at Pomona College, with math and data science minors.</span>
          <br />
          <span className='text-slate-500 text-base'>
          Pomona College |  GPA - 3.7/4.0  |  Expected Grad: May 2026	</span>
          <Link href="/resume.pdf" target="_blank" className='text-lg uppercase hover:underline cursor-pointer text-green-400 ' download>Download his resume</Link>
        </p>
      </motion.div>
      </motion.div>

      <motion.div
        variants={planetVariants('right')}  
        className={`flex-1 ${styles.flexCenter} rounded-2xl`}
      >
        <img
          src="/haram.jpg"
          alt="Haram Yoon"
          className="w-[90%] h-[90%] object-contain shadow-xl"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default Intro;
