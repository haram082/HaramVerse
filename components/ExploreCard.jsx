'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import Link from 'next/link';

const ExploreCard = ({ id, imgUrl, title, description, skills, github, link, index, active, handleClick }) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative ${
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[170px] h-[800px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer hover:shadow-2xl`}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white bg-black p-3 rounded-2xl absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-3 md:p-8 flex justify-start w-full  h-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
        <div
          className={`rounded-[24px] glassmorphism mb-[16px] flex items-start gap-12 text-slate-300`}
        > 
          {github && <Link href={github} target='_blank' className=' text-green-500 hover:underline font-extrabold text-2xl' >Github</Link>}
          {link && <Link href={link} target='_blank' className=' text-green-500 hover:underline font-extrabold text-2xl'>Link</Link>}
        </div>
        <p className="font-bold text-lg md:text-2xl leading-[20.16px] text-blue-400">
          SKILLS: <span className='text-yellow-300 font-normal text-sm md:text-lg'>{skills.map((skill) => `${skill}, `)}</span>
        </p>
        <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
          {title}
        </h2>
        <p className='text-white text-xs md:text-base'>
          Description: {description}
        </p>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
