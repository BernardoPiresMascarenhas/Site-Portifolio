import { ArrowUpRight, LayoutTemplate, MousePointerClick, RefreshCcw, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { services } from '../../data/site';
import type { ServiceIcon } from '../../data/site';

const icons: Record<ServiceIcon, LucideIcon> = {
  institucional: LayoutTemplate,
  landing: MousePointerClick,
  reformulacao: RefreshCcw,
  manutencao: ShieldCheck,
};

export default function Services() {
  return (
    <section id="servicos" className="section services">
      <div className="container services__layout">
        <header className="services__intro">
          <p className="eyebrow" data-reveal>Serviços</p>
          <h2 className="h2" data-reveal>
            Do primeiro site à <em>manutenção</em> do dia a dia.
          </h2>
          <p className="services__lead" data-reveal>
            Um parceiro para criar, renovar e cuidar da presença digital do seu negócio, com atendimento direto do início ao fim.
          </p>
          <a href="#contato" className="btn btn--primary" data-reveal>
            Conversar sobre meu projeto <ArrowUpRight size={17} aria-hidden="true" className="btn__icon" />
          </a>
          <p className="services__agency" data-reveal>
            <strong>É de uma agência de marketing?</strong> Também trabalho em parceria no desenvolvimento dos sites dos seus clientes.
          </p>
        </header>

        <ol className="service-list">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title} className="service" data-reveal style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
                <span className="service__num">0{i + 1}</span>
                <span className="service__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <div className="service__body">
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__desc">{s.description}</p>
                  <ul className="service__tags" aria-label="Indicado para">
                    {s.idealFor.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
