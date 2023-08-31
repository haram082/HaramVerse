import React from 'react'
import { TitleText, TypingText } from '../components';


const Skills = () => {
  return (
    <div className='px-10 text-white'>
      <TypingText title="| Technical Skills" textStyles="text-center" />
      <TitleText title={<>Skills</>} textStyles="text-center" />
      <p className='text-center'>
      Front-End Skills: HTML, CSS, Tailwind, Bootstrap, Javascript, Typescript, React, Redux, <br />
    Back-End Skills: Node.js, Express, MongoDB, Firebase, Next.js, tRPC, Prisma, Python, Flask, SQL(NoSQL, MySQL), AWS Cloud, Unit Testing <br />
    Other: Pandas, Numpy, Data Analysis, R, OOP, Git/GitHub, Jupyter, Visual Studio, 
    </p>
    </div>
  )
}

export default Skills
