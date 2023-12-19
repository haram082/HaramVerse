'use client';

import { motion } from 'framer-motion';

import { fadeIn } from '../utils/motion';
import Link from 'next/link';

const InsightCard = ({ imgUrl, title, date, subtitle, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    className="flex md:flex-row flex-col "
  >
    <img
      src={imgUrl}
      alt="planet-01"
      className="w-[200px] h-[200px] rounded-[32px] object-cover"
    />
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <h4 className="font-normal lg:text-xl text-lg text-white">
          {title}
        </h4>
        <p className="font-normal lg:text-[16px] text-[12px] text-stone-500 italic">
          {date}
        </p>
        <p className="mt-[10px] font-normal lg:text-[14px] text-[10px] text-secondary-white">
          {subtitle}
        </p>
      </div>

    </div>
  </motion.div>
);

export default InsightCard;
