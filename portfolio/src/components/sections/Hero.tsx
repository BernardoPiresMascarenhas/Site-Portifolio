import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { clientProjects, whatsappLink } from '../../data/site';
import BrowserFrame from '../ui/BrowserFrame';
import SplitWords from '../ui/SplitWords';
import { plain, toWords } from '../../utils/words';
import { prefersReducedMotion } from '../../hooks/usePageEffects';

const TITLE = 'Sites que destacam sua marca e transformam visitas em *oportunidades.*';
const showcase = clientProjects.filter((p) => p.featured);
const INTERVAL = 4800;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Alterna o projeto em destaque na pilha de telas
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % showcase.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  // Leve profundidade acompanhando o mouse (apenas com mouse real)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        stage.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const current = showcase[active];

  return (
    <section id="inicio" className="hero">
      <div className="hero__light" aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="eyebrow hero__in" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="status-dot" aria-hidden="true" />
            Desenvolvimento web <span className="eyebrow__sep">•</span> Belo Horizonte
          </p>

          <h1 className="hero__title" aria-label={plain(TITLE)}>
            <SplitWords words={toWords(TITLE)} baseDelay={120} />
          </h1>

          <p className="hero__lead hero__in" style={{ '--d': '520ms' } as React.CSSProperties}>
            Desenvolvo sites modernos, rápidos e personalizados para empresas e profissionais que querem se destacar no digital.
          </p>

          <div className="hero__ctas hero__in" style={{ '--d': '640ms' } as React.CSSProperties}>
            <a href="#contato" className="btn btn--primary btn--lg">
              Solicitar orçamento <ArrowUpRight size={18} aria-hidden="true" className="btn__icon" />
            </a>
            <a href="#projetos" className="btn btn--ghost btn--lg">
              Conhecer projetos <ArrowDownRight size={18} aria-hidden="true" className="btn__icon" />
            </a>
          </div>

          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hero__whats hero__in" style={{ '--d': '760ms' } as React.CSSProperties}>
            <FaWhatsapp size={16} aria-hidden="true" />
            Prefere conversar agora? <span>Chame no WhatsApp</span>
          </a>
        </div>

        <div
          className="hero__stage hero__in"
          style={{ '--d': '300ms' } as React.CSSProperties}
          ref={stageRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="stack" aria-hidden="true">
            {showcase.map((p, i) => {
              const slot = (i - active + showcase.length) % showcase.length;
              return (
                <div key={p.slug} className={`stack__item slot-${slot}`} style={{ '--accent': p.accent } as React.CSSProperties}>
                  <BrowserFrame project={p} priority={i === 0} sizes="(min-width: 1024px) 40vw, 90vw" />
                </div>
              );
            })}
          </div>

          <div className="stack__caption">
            <a href={current.url} target="_blank" rel="noreferrer" className="stack__link" key={current.slug}>
              <span className="stack__seg">{current.segment}</span>
              <span className="stack__name">
                {current.title} <ArrowUpRight size={15} aria-hidden="true" />
              </span>
              <span className="sr-only">(abre o site em nova aba)</span>
            </a>
            <div className="stack__dots" role="group" aria-label="Escolher projeto em destaque">
              {showcase.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  className={i === active ? 'is-active' : undefined}
                  aria-label={`Mostrar ${p.title}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="marquee" aria-label="Segmentos com sites publicados">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {clientProjects.map((p) => (
                <li key={p.slug}>
                  <span>{p.segment}</span>
                  <i aria-hidden="true">✦</i>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
