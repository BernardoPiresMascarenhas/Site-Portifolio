import { useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { contact, projectImage, projects } from '../../data/site';
import type { Project } from '../../data/site';
import BrowserFrame from '../ui/BrowserFrame';

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <article className={`work${reversed ? ' work--reverse' : ''}`} style={{ '--accent': project.accent } as React.CSSProperties}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="work__media"
        data-reveal="clip"
        aria-label={`Visitar o site ${project.title} (abre em nova aba)`}
      >
        <div className="work__glow" aria-hidden="true" />
        <div className="work__parallax" data-parallax>
          <BrowserFrame project={project} sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
        <span className="work__visit" aria-hidden="true">
          Visitar site <ArrowUpRight size={16} />
        </span>
      </a>

      <div className="work__body" data-reveal>
        <div className="work__meta">
          <span className="work__index">{String(index + 1).padStart(2, '0')}</span>
          <span className="work__segment">{project.segment}</span>
        </div>
        <h3 className="work__title">{project.title}</h3>
        <p className="work__summary">{project.summary}</p>

        <ul className="work__highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="work__actions">
          <a href={project.url} target="_blank" rel="noreferrer" className="link-arrow">
            Visitar site <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">{project.title} (abre em nova aba)</span>
          </a>
          <details className="tech-details">
            <summary>
              <Plus size={14} aria-hidden="true" /> Detalhes técnicos
            </summary>
            <p>{project.techs.join(' · ')}</p>
          </details>
        </div>
      </div>
    </article>
  );
}

/** Lista de outros trabalhos com prévia flutuante que acompanha o cursor no desktop. */
function MoreWork() {
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <div className="more" data-reveal>
      <div className="more__head">
        <h3 className="more__title">Outros trabalhos</h3>
        <a href={contact.github.url} target="_blank" rel="noreferrer" className="more__github">
          <FaGithub size={15} aria-hidden="true" /> Código e estudos no GitHub
        </a>
      </div>

      <ul className="more__list" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        {others.map((p) => (
          <li key={p.slug}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="more__row"
              style={{ '--accent': p.accent } as React.CSSProperties}
              onMouseEnter={() => setHovered(p)}
              onFocus={() => setHovered(null)}
            >
              <img className="more__thumb" src={projectImage(p, 800)} alt="" width={800} height={450} loading="lazy" decoding="async" />
              <span className="more__name">{p.title}</span>
              <span className="more__seg">{p.segment}</span>
              <span className="more__desc">{p.summary}</span>
              <span className="more__go" aria-hidden="true"><ArrowUpRight size={20} /></span>
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </li>
        ))}
      </ul>

      <div ref={previewRef} className={`more__preview${hovered ? ' is-on' : ''}`} aria-hidden="true">
        {others.map((p) => (
          <img key={p.slug} src={projectImage(p, 800)} alt="" className={hovered?.slug === p.slug ? 'is-current' : undefined} loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="section projects">
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>Portfólio</p>
            <h2 className="h2" data-reveal>
              Trabalhos que já estão <em>no ar</em>.
            </h2>
          </div>
          <p className="section-head__aside" data-reveal>
            Sites criados para negócios reais de segmentos diferentes, cada um com identidade própria e pensado para
            quem vai visitá-lo. <strong>{String(projects.length).padStart(2, '0')} projetos publicados.</strong>
          </p>
        </header>

        <div className="works">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} index={i} />
          ))}
        </div>

        <MoreWork />
      </div>
    </section>
  );
}
