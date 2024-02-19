'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| More About Haram" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] text-start text-secondary-white"
      >
       Meet Haram Yoon, a spirited undergrad at Pomona College 🏫 and a first-generation, low-income student, fearlessly navigating the world of technology 💻. With an unyielding passion for breaking barriers in the tech industry, Haram is on a mission to create meaningful impact through software ⚙️. <br /><br />

In the fast-paced realm of technology ⚡️, Haram is not just a spectator; he's an active participant, constantly pushing his boundaries and acquiring new skills 🧑‍🎓. A relentless learner 🧠, he immerses himself in cutting-edge technologies 🤖 daily, seamlessly integrating them into his personal full-stack projects 📁 and leveraging them in his various technical roles and jobs 👨‍💻.<br /><br />

Fuelled by a desire to contribute to innovative 💡 and creative solutions 🎨, Haram dreams of joining a team of like-minded engineers 👷‍♂️ who share his vision for making a positive mark on the world 🌎. His interests span diverse domains, from product development and sports analysis 🏈 to financial services 💸 and human-computer interaction (HCI) 👨‍💻. For Haram, every technical challenge is an opportunity to learn 👨‍🏫, grow 🌱, and make a tangible difference💪.<br />
<br />
Currently on the lookout for internships in software engineering 👨‍💻, full-stack development ⚛️, or data science 📊, Haram is eager to apply his skills and knowledge in real-world settings 🏭. His goal is not just to secure a position but to immerse himself in an environment that fosters continuous learning 🎓, collaboration 🤝, and innovation 💡.
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px] animate-bounce"
      />
    </motion.div>
  </section>
);

export default About;
