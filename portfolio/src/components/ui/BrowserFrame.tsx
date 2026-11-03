import type { Project } from '../../data/site';
import { projectImage } from '../../data/site';

type Props = {
  project: Project;
  /** Imagem acima da dobra: carrega cedo e com prioridade */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Moldura de navegador com a captura real do site publicado. */
export default function BrowserFrame({ project, priority = false, sizes = '(min-width: 1024px) 60vw, 100vw', className = '' }: Props) {
  const host = project.url ? project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : project.slug;

  return (
    <div className={`browser ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots"><i /><i /><i /></span>
        <span className="browser__url">{host}</span>
      </div>
      <div className="browser__view">
        <img
          src={projectImage(project, 800)}
          srcSet={`${projectImage(project, 800)} 800w, ${projectImage(project, 1600)} 1600w`}
          sizes={sizes}
          width={1600}
          height={900}
          alt={`Página inicial do site ${project.title}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
    </div>
  );
}
