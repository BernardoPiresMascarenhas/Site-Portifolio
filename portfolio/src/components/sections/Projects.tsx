import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { clientProjects, contact, projectImage, projects, projectStatuses, projectStatusOrder } from '../../data/site';
import type { Project, ProjectStatus } from '../../data/site';
import { prefersReducedMotion } from '../../hooks/usePageEffects';
import BrowserFrame from '../ui/BrowserFrame';

type FilterId = 'all' | ProjectStatus;

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  ...projectStatusOrder.map((id) => ({ id, label: projectStatuses[id].filter })),
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Projetos de um filtro, já separados entre destaques e "Outros trabalhos". */
function arrange(filter: FilterId) {
  const list =
    filter === 'all'
      ? projectStatusOrder.flatMap((s) => projects.filter((p) => p.status === s))
      : projects.filter((p) => p.status === filter);
  return { list, featured: list.filter((p) => p.featured), others: list.filter((p) => !p.featured) };
}

const countFor = (filter: FilterId) => arrange(filter).list.length;

/**
 * Chaves de animação (data-flip) de cada elemento visível num filtro.
 * Destaques incluem o lado do layout: se um card troca de lado, ele sai e entra em vez de "deslizar" torto.
 */
const featuredKey = (p: Project, i: number) => `${p.slug}:${i % 2}`;
function flipKeys(filter: FilterId) {
  const { list, featured, others } = arrange(filter);
  const keys = new Set(featured.map(featuredKey));
  if (others.length) keys.add('more-head');
  others.forEach((p) => keys.add(p.slug));
  if (!list.length) keys.add(`empty:${filter}`);
  return keys;
}

/* ------------------------------------------------------------------------- */
/*  Transição entre filtros (FLIP com Web Animations API, sem dependências)   */
/* ------------------------------------------------------------------------- */

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const EXIT_MS = 200;
const MOVE_MS = 620;
const ENTER_MS = 560;
const STAGGER_MS = 70;

function enter(el: HTMLElement, order: number) {
  el.animate(
    [
      { opacity: 0, transform: 'translateY(22px) scale(0.985)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: ENTER_MS, delay: Math.min(order, 4) * STAGGER_MS, easing: EASE_OUT, fill: 'backwards' },
  );
}

const settle = (a: Animation) => a.finished.then(
  () => undefined,
  () => undefined,
);

function useFilteredProjects(initial: FilterId) {
  const [selected, setSelected] = useState<FilterId>(initial);
  const [view, setView] = useState<FilterId>(initial);
  const [interacted, setInteracted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const target = useRef<FilterId>(initial);
  const committed = useRef<FilterId>(initial);
  const busy = useRef(false);

  const run = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      while (target.current !== committed.current) {
        const next = target.current;
        const stage = stageRef.current;
        const reduced = prefersReducedMotion() || !stage || typeof stage.animate !== 'function';

        if (reduced || !stage) {
          flushSync(() => {
            setView(next);
            setInteracted(true);
          });
          committed.current = next;
          continue;
        }

        const nextKeys = flipKeys(next);
        const current = [...stage.querySelectorAll<HTMLElement>('[data-flip]')];
        const leaving = current.filter((el) => !nextKeys.has(el.dataset.flip!));

        // 1. Saída: some rápido e discreto (só quem ainda está visível)
        const exits = leaving
          .filter((el) => !el.dataset.flipOut)
          .map((el) => {
            el.dataset.flipOut = '1';
            return settle(
              el.animate([{ opacity: 0, transform: 'translateY(10px) scale(0.985)' }], {
                duration: EXIT_MS,
                easing: EASE_IN,
                fill: 'forwards',
              }),
            );
          });
        if (exits.length) await Promise.all(exits);
        if (target.current !== next) continue; // mudou de ideia no meio: recalcula

        // 2. First: posição de quem permanece
        const first = new Map<string, DOMRect>();
        for (const el of current) {
          if (!el.dataset.flipOut) first.set(el.dataset.flip!, el.getBoundingClientRect());
        }
        const h0 = stage.offsetHeight;

        flushSync(() => {
          setView(next);
          setInteracted(true);
        });
        committed.current = next;

        // 3. Last + Invert + Play
        const h1 = stage.offsetHeight;
        let entering = 0;
        for (const el of stage.querySelectorAll<HTMLElement>('[data-flip]')) {
          const prev = first.get(el.dataset.flip!);
          if (el.dataset.flipOut) {
            // estava saindo, mas voltou a fazer parte do filtro
            el.getAnimations().forEach((a) => a.cancel());
            delete el.dataset.flipOut;
            enter(el, entering++);
          } else if (prev) {
            const now = el.getBoundingClientRect();
            const dx = prev.left - now.left;
            const dy = prev.top - now.top;
            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
              el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
                duration: MOVE_MS,
                easing: EASE_OUT,
              });
            }
          } else {
            enter(el, entering++);
          }
        }

        // Altura acompanha o conteúdo, sem saltos no restante da página
        if (Math.abs(h1 - h0) > 1) {
          stage.style.overflow = 'hidden';
          const grow = stage.animate([{ height: `${h0}px` }, { height: `${h1}px` }], { duration: MOVE_MS, easing: EASE_OUT });
          settle(grow).then(() => {
            if (!stage.getAnimations().length) stage.style.overflow = '';
          });
        }
      }

      // Voltou ao filtro já exibido durante a saída: traz de volta quem tinha começado a sumir
      let restored = 0;
      stageRef.current?.querySelectorAll<HTMLElement>('[data-flip-out]').forEach((el) => {
        el.getAnimations().forEach((a) => a.cancel());
        delete el.dataset.flipOut;
        enter(el, restored++);
      });
    } finally {
      busy.current = false;
    }
  }, []);

  const select = useCallback(
    (next: FilterId) => {
      setSelected(next);
      target.current = next;
      run();
    },
    [run],
  );

  return { selected, view, interacted, select, stageRef };
}

/* ------------------------------------------------------------------------- */
/*  Componentes                                                               */
/* ------------------------------------------------------------------------- */

function StatusTag({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status-tag status-tag--${status}`}>
      <i aria-hidden="true" />
      {projectStatuses[status].tag}
    </span>
  );
}

/** Segmented control com indicador deslizante. No celular vira trilho com rolagem horizontal. */
function ProjectFilters({ value, onChange }: { value: FilterId; onChange: (f: FilterId) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    const max = track.scrollWidth - track.clientWidth;
    wrap.classList.toggle('has-more-start', track.scrollLeft > 2);
    wrap.classList.toggle('has-more-end', track.scrollLeft < max - 2);
  }, []);

  const place = useCallback(
    (scroll: boolean) => {
      const track = trackRef.current;
      const indicator = indicatorRef.current;
      const btn = track?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (!track || !indicator || !btn) return;
      indicator.style.setProperty('--x', `${btn.offsetLeft}px`);
      indicator.style.setProperty('--w', `${btn.offsetWidth}px`);
      if (scroll && track.scrollWidth > track.clientWidth) {
        // centraliza o filtro ativo no trilho, sem mexer no scroll vertical da página
        const left = btn.offsetLeft - (track.clientWidth - btn.offsetWidth) / 2;
        track.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
      syncEdges();
    },
    [syncEdges],
  );

  useLayoutEffect(() => {
    place(true);
  }, [value, place]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    place(false);
    // libera a transição só depois da primeira medição (evita o indicador "voar" ao carregar)
    const raf = requestAnimationFrame(() => wrapRef.current?.classList.add('is-ready'));
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => place(false)) : undefined;
    ro?.observe(track);
    track.querySelectorAll('button').forEach((b) => ro?.observe(b));
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [place]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const buttons = [...(trackRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])];
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const n = buttons.length;
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    buttons[to].focus();
  };

  return (
    <div className="filters" ref={wrapRef}>
      <div
        className="filters__track"
        ref={trackRef}
        role="group"
        aria-label="Filtrar projetos por categoria"
        onScroll={syncEdges}
        onKeyDown={onKeyDown}
      >
        <span className="filters__indicator" ref={indicatorRef} aria-hidden="true" />
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="filters__btn"
            data-filter={f.id}
            aria-pressed={value === f.id}
            onClick={() => onChange(f.id)}
          >
            <span>{f.label}</span>
            <span className="filters__count" aria-hidden="true">
              {pad(countFor(f.id))}
            </span>
            <span className="sr-only">, {countFor(f.id)} {countFor(f.id) === 1 ? 'projeto' : 'projetos'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject({ project, index, flip, revealed }: { project: Project; index: number; flip: string; revealed: string }) {
  const reversed = index % 2 === 1;
  const mediaInner = (
    <>
      <div className="work__glow" aria-hidden="true" />
      <div className="work__parallax" data-parallax>
        <BrowserFrame project={project} sizes="(min-width: 1024px) 58vw, 100vw" />
      </div>
    </>
  );

  return (
    <article
      className={`work${reversed ? ' work--reverse' : ''}`}
      style={{ '--accent': project.accent } as React.CSSProperties}
      data-flip={flip}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className={`work__media${revealed}`}
          data-reveal="clip"
          aria-label={`Visitar o site ${project.title} (abre em nova aba)`}
        >
          {mediaInner}
          <span className="work__visit" aria-hidden="true">
            Visitar site <ArrowUpRight size={16} />
          </span>
        </a>
      ) : (
        <div className={`work__media${revealed}`} data-reveal="clip">
          {mediaInner}
        </div>
      )}

      <div className={`work__body${revealed}`} data-reveal>
        <div className="work__meta">
          <span className="work__index">{pad(index + 1)}</span>
          <span className="work__segment">{project.segment}</span>
          <StatusTag status={project.status} />
        </div>
        <h3 className="work__title">{project.title}</h3>
        <p className="work__summary">{project.summary}</p>

        {project.highlights.length > 0 && (
          <ul className="work__highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <div className="work__actions">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="link-arrow">
              Visitar site <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">{project.title} (abre em nova aba)</span>
            </a>
          )}
          {project.techs.length > 0 && (
            <details className="tech-details">
              <summary>
                <Plus size={14} aria-hidden="true" /> Detalhes técnicos
              </summary>
              <p>{project.techs.join(' · ')}</p>
            </details>
          )}
        </div>
      </div>
    </article>
  );
}

/** Lista de outros trabalhos com prévia flutuante que acompanha o cursor no desktop. */
function MoreWork({ items, revealed, hasFeatured }: { items: Project[]; revealed: string; hasFeatured: boolean }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <div className={`more${revealed}`} data-reveal>
      <div className="more__head" data-flip="more-head">
        <h3 className="more__title">{hasFeatured ? 'Outros trabalhos' : 'Trabalhos'}</h3>
        <a href={contact.github.url} target="_blank" rel="noreferrer" className="more__github">
          <FaGithub size={15} aria-hidden="true" /> Código e estudos no GitHub
        </a>
      </div>

      <ul className="more__list" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        {items.map((p) => {
          const content = (
            <>
              <img className="more__thumb" src={projectImage(p, 800)} alt="" width={800} height={450} loading="lazy" decoding="async" />
              <span className="more__name">{p.title}</span>
              <span className="more__seg">
                {p.segment}
                <StatusTag status={p.status} />
              </span>
              <span className="more__desc">{p.summary}</span>
            </>
          );
          return (
            <li key={p.slug} data-flip={p.slug}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="more__row"
                  style={{ '--accent': p.accent } as React.CSSProperties}
                  onMouseEnter={() => setHovered(p)}
                  onFocus={() => setHovered(null)}
                >
                  {content}
                  <span className="more__go" aria-hidden="true"><ArrowUpRight size={20} /></span>
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              ) : (
                <div
                  className="more__row more__row--static"
                  style={{ '--accent': p.accent } as React.CSSProperties}
                  onMouseEnter={() => setHovered(p)}
                >
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div ref={previewRef} className={`more__preview${hovered ? ' is-on' : ''}`} aria-hidden="true">
        {items.map((p) => (
          <img key={p.slug} src={projectImage(p, 800)} alt="" className={hovered?.slug === p.slug ? 'is-current' : undefined} loading="lazy" />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ status, onShowCompleted }: { status: ProjectStatus; onShowCompleted: () => void }) {
  const copy = projectStatuses[status].empty;
  return (
    <div className="projects__empty" data-flip={`empty:${status}`}>
      <StatusTag status={status} />
      <p className="projects__empty-title">{copy.title}</p>
      <p className="projects__empty-text">{copy.text}</p>
      {status !== 'completed' && clientProjects.length > 0 && (
        <button type="button" className="link-arrow" onClick={onShowCompleted}>
          Ver projetos entregues <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function Projects() {
  const { selected, view, interacted, select, stageRef } = useFilteredProjects('all');
  const toolbarRef = useRef<HTMLDivElement>(null);
  const { list, featured, others } = arrange(view);
  // Depois do primeiro filtro, elementos novos já nascem visíveis (a animação de entrada fica com o filtro)
  const revealed = interacted ? ' is-visible' : '';
  const viewLabel = filters.find((f) => f.id === view)!.label;

  const showCompleted = () => {
    select('completed');
    toolbarRef.current?.querySelector<HTMLButtonElement>('[data-filter="completed"]')?.focus();
  };

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
            quem vai visitá-lo. Nos filtros, veja também projetos conceituais e o que estou construindo agora.{' '}
            <strong>{pad(clientProjects.length)} projetos entregues.</strong>
          </p>
        </header>

        <div className="projects__toolbar" ref={toolbarRef} data-reveal>
          <ProjectFilters value={selected} onChange={select} />
          <p className="projects__count" aria-live="polite">
            <span>{pad(list.length)}</span> {list.length === 1 ? 'projeto' : 'projetos'}
            <span className="sr-only"> em {viewLabel}</span>
          </p>
        </div>

        <div className="projects__stage" ref={stageRef}>
          {featured.length > 0 && (
            <div className="works">
              {featured.map((p, i) => {
                const flip = featuredKey(p, i);
                return <FeaturedProject key={flip} flip={flip} project={p} index={i} revealed={revealed} />;
              })}
            </div>
          )}

          {others.length > 0 && <MoreWork items={others} revealed={revealed} hasFeatured={featured.length > 0} />}

          {list.length === 0 && view !== 'all' && <EmptyState key={view} status={view} onShowCompleted={showCompleted} />}
        </div>
      </div>
    </section>
  );
}
