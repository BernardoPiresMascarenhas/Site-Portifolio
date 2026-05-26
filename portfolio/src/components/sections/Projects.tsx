import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    
    // Função para checar o tamanho da tela
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      if (!mobileView) setIsMenuOpen(false);
    };

    // Executa uma vez ao carregar para pegar o tamanho inicial
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { name: 'Sobre', id: 'sobre' },
    { name: 'Projetos', id: 'projetos' },
    { name: 'Habilidades', id: 'habilidades' },
    { name: 'Trajetória', id: 'experiencia' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled || isMenuOpen
          ? 'rgba(8, 11, 14, 0.95)'
          : 'transparent',
        backdropFilter: scrolled || isMenuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || isMenuOpen ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: '70px',
          padding: isMobile ? '0 1.25rem' : '0 2rem'
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.4rem',
            background: 'linear-gradient(135deg, #20F088 0%, #80ffcc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>B.Pires</span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(32,240,136,0.6)',
            background: 'rgba(32,240,136,0.08)',
            border: '1px solid rgba(32,240,136,0.2)',
            padding: '0.15rem 0.4rem',
            borderRadius: '0.25rem',
            letterSpacing: '0.1em',
          }}>dev</span>
        </a>

        {/* Renderiza a Navegação Desktop apenas se NÃO for mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = '#20F088';
                  (e.target as HTMLElement).style.background = 'rgba(32,240,136,0.07)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                  (e.target as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, 'contato')}
              style={{
                marginLeft: '0.75rem',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#080b0e',
                background: '#20F088',
                textDecoration: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '0.375rem',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
                boxShadow: '0 0 20px rgba(32,240,136,0.25)',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.boxShadow = '0 0 35px rgba(32,240,136,0.4)';
                (e.target as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(32,240,136,0.25)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Contato
            </a>
          </nav>
        )}

        {/* Renderiza o Toggle (Sanduíche) apenas se FOR mobile */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'rgba(32,240,136,0.08)',
              border: '1px solid rgba(32,240,136,0.2)',
              borderRadius: '0.375rem',
              padding: '0.5rem',
              color: '#20F088',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* Menu Mobile */}
      {isMobile && (
        <div 
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            width: '100%',
            background: 'rgba(8,11,14,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '1.5rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            transition: 'all 0.3s ease-in-out',
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? 'visible' : 'hidden',
            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '0.75rem 0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, 'contato')}
            style={{
              marginTop: '1rem',
              fontFamily: "'Syne', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: '#080b0e',
              background: '#20F088',
              textDecoration: 'none',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
              boxShadow: '0 0 20px rgba(32,240,136,0.25)',
            }}
          >
            Contato
          </a>
        </div>
      )}
    </header>
  );
}