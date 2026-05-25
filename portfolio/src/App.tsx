import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#080b0e' }}>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #20F088, #80ffcc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            B.Pires
          </span>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.05em',
          }}>
            © {new Date().getFullYear()} Bernardo Pires Mascarenhas · Todos os direitos reservados
          </p>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            color: '#20F088',
            letterSpacing: '0.05em',
            opacity: 0.6,
          }}>
            made with ♥ &amp; coffee
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
