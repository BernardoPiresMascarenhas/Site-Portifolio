import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { faq, whatsappLink, whatsappMessages } from '../../data/site';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section faq">
      <div className="container faq__layout">
        <header className="faq__intro">
          <p className="eyebrow" data-reveal>Dúvidas frequentes</p>
          <h2 className="h2" data-reveal>
            Antes de <em>começar</em>.
          </h2>
          <p className="faq__lead" data-reveal>Não encontrou o que procurava? Pergunte direto, sem compromisso.</p>
          <a href={whatsappLink(whatsappMessages.duvida)} target="_blank" rel="noreferrer" className="btn btn--ghost" data-reveal>
            <FaWhatsapp size={17} aria-hidden="true" /> Tirar dúvida no WhatsApp
          </a>
        </header>

        <div className="accordion" data-reveal>
          {faq.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <div key={item.q} className={`qa${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="qa__q"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    id={`${id}-q`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="qa__icon" aria-hidden="true"><Plus size={18} /></span>
                  </button>
                </h3>
                <div className="qa__a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!isOpen}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
