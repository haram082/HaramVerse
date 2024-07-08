'use client';

import { motion } from 'framer-motion';
import {FaLinkedin, FaGithub} from 'react-icons/fa6';
import {BsCalendarWeek} from 'react-icons/bs';
import {IoIosPaper} from 'react-icons/io';
import Link from 'next/link';

import styles from '../styles';
import { footerVariants } from '../utils/motion';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    

      <div className="flex flex-col">
        <div className="mb-8 h-[2px] bg-white opacity-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 flex-wrap ">
          <h1></h1>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 Haram Yoon. All rights reserved.
          </p>

          <div className="flex gap-4 justify-end text-slate-200">
              <Link href="/resume.pdf" target="_blank"><IoIosPaper className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
              <Link href="https://www.linkedin.com/in/haram-yoon-b359511b0/" target="_blank"><FaLinkedin className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
              <Link href="https://www.github.com/haram082" target="_blank"><FaGithub className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
              <Link href="https://calendly.com/haram_yoon/30min" target="_blank"><BsCalendarWeek className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
          </div>
        </div>
      </div>
  </motion.footer>
);

export default Footer;
