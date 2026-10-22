import { ArrowUpRight } from 'lucide-react';
import { steps } from '../../data/site';

export default function Process() {
  return (
    <section id="processo" className="section process">
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>Como funciona</p>
            <h2 className="h2" data-reveal>
              Contratar um site <em>pode ser simples</em>.
            </h2>
          </div>
          <p className="section-head__aside" data-reveal>
            Quatro etapas claras, com você acompanhando cada uma delas e aprovando o resultado antes de o site ir ao ar.
          </p>
        </header>

        <div className="steps-wrap" data-progress>
          <span className="steps__rail" aria-hidden="true"><i /></span>
          <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step" style={{ '--i': i } as React.CSSProperties}>
              <span className="step__dot" aria-hidden="true" />
              <span className="step__num" aria-hidden="true">0{i + 1}</span>
              <h3 className="step__title">
                <span className="sr-only">Etapa {i + 1}: </span>
                {s.title}
              </h3>
              <p className="step__text">{s.description}</p>
            </li>
          ))}
          </ol>
        </div>

        <div className="process__cta" data-reveal>
          <p>O primeiro passo é uma conversa, sem compromisso.</p>
          <a href="#contato" className="link-arrow">
            Começar agora <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
