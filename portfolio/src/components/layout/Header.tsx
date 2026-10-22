import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { navLinks, whatsappLink } from '../../data/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca no menu a seção que ocupa o centro da tela
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
      <div className="container site-header__inner">
        <a href="#inicio" className="logo" onClick={close} aria-label="Bernardo Pires — voltar ao início">
          <span className="logo__mark">B.</span>
          <span className="logo__name">Pires</span>
          <span className="logo__tag">dev</span>
        </a>

        <nav className="nav-desktop" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : undefined} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href="#contato" className="btn btn--primary btn--sm header-cta">
            Solicitar orçamento
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="menu-mobile" className={`menu-mobile${open ? ' is-open' : ''}`} inert={!open}>
        <nav className="container menu-mobile__nav" aria-label="Navegação mobile">
          {navLinks.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={close} style={{ '--i': i } as React.CSSProperties}>
              <span className="menu-mobile__num">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <div className="menu-mobile__ctas" style={{ '--i': navLinks.length } as React.CSSProperties}>
            <a href="#contato" className="btn btn--primary btn--lg" onClick={close}>
              Solicitar orçamento <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg" onClick={close}>
              <FaWhatsapp size={18} aria-hidden="true" /> Conversar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
