import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Bernardo Pires Mascarenhas. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default App;