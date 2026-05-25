import { useEffect, useRef, useState } from 'react';
import { ArrowRight,  } from 'lucide-react';

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Freelancer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  // Parallax mouse effect
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 20;
      const glow = containerRef.current.querySelector('.hero-glow') as HTMLElement;
      if (glow) {
        glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '70px',
      }}
      className="grid-bg"
    >
      {/* Ambient glow */}
      <div
        className="hero-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(32,240,136,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'transform 0.3s ease',
          zIndex: 0,
        }}
      />

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: '100px', right: '8%', opacity: 0.12, fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#20F088', lineHeight: 1.8, textAlign: 'right', userSelect: 'none' }}>
        {`const dev = {`}<br/>
        {`  name: "Bernardo",`}<br/>
        {`  stack: "Full Stack",`}<br/>
        {`  available: true`}<br/>
        {`}`}
      </div>

      <div style={{ position: 'absolute', bottom: '120px', left: '6%', opacity: 0.1, fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#20F088', lineHeight: 2, userSelect: 'none' }}>
        {`// crafting digital`}<br/>
        {`// experiences`}<br/>
        {`// since 2024`}
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '800px' }}>
          {/* Label */}
          <div
            className="animate-fadeInUp opacity-0-init"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#20F088',
              boxShadow: '0 0 10px rgba(32,240,136,0.8)',
              animation: 'pulse-green 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.75rem',
              color: '#20F088',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>Disponível para projetos</span>
          </div>

          {/* Main heading */}
          <h1
            className="animate-fadeInUp delay-100 opacity-0-init"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              color: '#ffffff',
            }}
          >
            Bernardo<br />
            <span style={{
              background: 'linear-gradient(135deg, #20F088 0%, #80ffcc 60%, #20F088 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Pires.
            </span>
          </h1>

          {/* Typewriter */}
          <div
            className="animate-fadeInUp delay-200 opacity-0-init"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '2rem',
            }}
          >
            <span style={{ color: '#20F088' }}>{'>'}</span>
            <span>{displayed}</span>
            <span className="animate-blink" style={{ color: '#20F088', fontWeight: 300 }}>_</span>
          </div>

          {/* Description */}
          <p
            className="animate-fadeInUp delay-300 opacity-0-init"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
              marginBottom: '3rem',
              maxWidth: '520px',
              fontWeight: 300,
            }}
          >
            Transformo problemas complexos em soluções digitais elegantes.
            Estudante de Ciência da Computação e desenvolvedor freelancer
            focado em resultados que fazem a diferença.
          </p>

          {/* CTAs */}
          <div
            className="animate-fadeInUp delay-400 opacity-0-init"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <a
              href="#projetos"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Projetos <ArrowRight size={18} />
            </a>
            
          </div>

          {/* Stats row */}
          <div
            className="animate-fadeInUp delay-600 opacity-0-init"
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { number: '6+', label: 'Projetos entregues' },
              { number: '2024', label: 'Ano de início' },
              { number: '100%', label: 'Dedicação' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: '#20F088',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>{stat.number}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '0.3rem',
                  letterSpacing: '0.05em',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: 0.4,
      }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>scroll</div>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(32,240,136,0.6), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
