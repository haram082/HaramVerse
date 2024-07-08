'use client';
import styles from '../styles';
import {FaLinkedin, FaGithub} from 'react-icons/fa6';
import {BsCalendarWeek} from 'react-icons/bs';
import {IoIosPaper} from 'react-icons/io';
import Link from 'next/link';

const Navbar = () => (
  <nav
    className={`${styles.xPaddings} py-5 fixed bg-purple-800 flex justify-between items-center w-full z-20`}
  >
    <div className="absolute w-[50%]" />
    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
    >
      <h2 className="font-extrabold text-lg md:text-3xl leading-[30.24px] text-white">
        HARAM YOON | PORTFOLIO
      </h2>
      <ul className="flex gap-8 text-white cursor-pointer">
        {/* <li className='hover:text-slate-500'>About</li>
        <li className='hover:text-slate-500'>Skills</li>
        <li className='hover:text-slate-500'>Experience</li>
        <li className='hover:text-slate-500'>Projects</li> */}
        <ul className="flex gap-4">
              <Link href="/resume.pdf" target="_blank" ><IoIosPaper className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
              <Link href="https://www.linkedin.com/in/haram-yoon-b359511b0/" target="_blank"><FaLinkedin className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
              <Link href="https://www.github.com/haram082" target="_blank"><FaGithub className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
              <Link href="https://calendly.com/haram_yoon/30min" target="_blank"><BsCalendarWeek className="w-[24px] h-[24px]  cursor-pointer hover:text-slate-400"/></Link>
          </ul>
      </ul>
    </div>
  </nav>
);

export default Navbar;
