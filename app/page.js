import { Footer, Navbar } from '../components';
import { About, Projects, Experience, Intro, Skills } from '../sections';
import Head from 'next/head';

export default function Home() {
  return(
  <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 overflow-hidden">
    <Head>
        <link rel="icon" href="/public/favicon.ico" /> 
      </Head>
    <Navbar/>
    <Intro />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Footer />
  </div>
  )
}
