import { Footer, Navbar } from '../components';
import { About, Projects, Experience, Intro, Skills } from '../sections';

export default function Home() {
  return(
  <div className="bg-emerald-900 overflow-hidden">
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
