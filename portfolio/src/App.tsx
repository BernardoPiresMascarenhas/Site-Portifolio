import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Differentials from './components/sections/Differentials';
import Process from './components/sections/Process';
import About from './components/sections/About';
import Faq from './components/sections/Faq';
import Contact from './components/sections/Contact';
import { usePageEffects } from './hooks/usePageEffects';

function App() {
  usePageEffects();

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Projects />
        <Services />
        <Differentials />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
