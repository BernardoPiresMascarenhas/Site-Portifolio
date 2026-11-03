import { Plus } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { contact, techStack, timeline } from '../../data/site';

const RING = 'Desenvolvedor freelancer • Belo Horizonte • Sites sob medida • ';
/**
 * Cada letra recebe um ângulo fixo ao redor do círculo. Não depende de textPath/textLength,
 * que o Safari do iPhone não respeita (o fim da frase sobrepunha o começo).
 */
const RING_CHARS = [...RING.toUpperCase()];

export default function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container about__layout">
        <div className="about__visual" data-reveal aria-hidden="true">
          <div className="seal">
            <div className="seal__ring">
              <svg viewBox="0 0 200 200" width="200" height="200">
                {RING_CHARS.map((c, i) => (
                  <text key={i} x="100" y="18" textAnchor="middle" transform={`rotate(${((i * 360) / RING_CHARS.length).toFixed(3)} 100 100)`}>
                    {c}
                  </text>
                ))}
              </svg>
            </div>
            <span className="seal__mark">B.</span>
          </div>
        </div>

        <div className="about__content">
          <p className="eyebrow" data-reveal>Sobre</p>
          <h2 className="h2 about__title" data-reveal>
            Prazer, sou <em>Bernardo</em>.
          </h2>
          <div className="about__text" data-reveal>
            <p>
              Sou desenvolvedor freelancer de Belo Horizonte e ajudo empresas e profissionais a transformarem suas ideias em
              experiências digitais bem construídas.
            </p>
            <p>
              Uno desenvolvimento, design e atenção aos detalhes para criar sites que representam a identidade de cada negócio.
              Você conversa diretamente comigo em todas as etapas, do planejamento à publicação.
            </p>
          </div>

          <dl className="facts" data-reveal>
            <div>
              <dt>Base</dt>
              <dd>Belo Horizonte, MG</dd>
            </div>
            <div>
              <dt>Atuação</dt>
              <dd>Freelancer desde 2024</dd>
            </div>
            <div>
              <dt>Formação</dt>
              <dd>Ciência da Computação · PUC Minas</dd>
            </div>
          </dl>

          <div className="about__footer" data-reveal>
            <ul className="socials" aria-label="Perfis profissionais">
              <li>
                <a href={contact.linkedin.url} target="_blank" rel="noreferrer"><FaLinkedin size={16} aria-hidden="true" /> LinkedIn</a>
              </li>
              <li>
                <a href={contact.github.url} target="_blank" rel="noreferrer"><FaGithub size={16} aria-hidden="true" /> GitHub</a>
              </li>
              <li>
                <a href={contact.instagram.url} target="_blank" rel="noreferrer"><FaInstagram size={16} aria-hidden="true" /> Instagram</a>
              </li>
            </ul>

            <details className="trajectory">
              <summary>
                <Plus size={14} aria-hidden="true" /> Ver trajetória
              </summary>
              <ol className="trajectory__list">
                {timeline.map((t) => (
                  <li key={t.title}>
                    <span className="trajectory__period">{t.period}</span>
                    <span className="trajectory__title">{t.title}</span>
                    <span className="trajectory__place">{t.place}</span>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </div>
      </div>

      <div className="tech-strip" aria-label="Ferramentas que utilizo">
        <span className="tech-strip__label">Ferramentas</span>
        <ul>
          {techStack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
