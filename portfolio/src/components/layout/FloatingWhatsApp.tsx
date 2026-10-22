import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink } from '../../data/site';

/** Atalho para o WhatsApp: aparece depois do hero e some na seção de contato. */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    const contato = document.getElementById('contato');
    if (!hero || !contato) return;
    const state = { heroVisible: true, contactVisible: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) state.heroVisible = e.isIntersecting;
        if (e.target === contato) state.contactVisible = e.isIntersecting;
      }
      setVisible(!state.heroVisible && !state.contactVisible);
    }, { threshold: 0.05 });
    io.observe(hero);
    io.observe(contato);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      className={`fab-whats${visible ? ' is-visible' : ''}`}
      aria-label="Conversar no WhatsApp (abre em nova aba)"
      tabIndex={visible ? 0 : -1}
    >
      <FaWhatsapp size={26} aria-hidden="true" />
    </a>
  );
}
