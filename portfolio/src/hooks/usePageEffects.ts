import { useEffect } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Efeitos de página inteira, montados uma única vez no App:
 *  - [data-reveal]   ganha .is-visible ao entrar na tela (CSS cuida da animação)
 *  - [data-parallax] recebe --p (-1 a 1) conforme a posição na viewport (só desktop)
 *  - [data-progress] recebe --progress (0 a 1) conforme é percorrido no scroll
 */
export function usePageEffects() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const revealed = document.querySelectorAll<HTMLElement>('[data-reveal]');
    let io: IntersectionObserver | undefined;
    if (reduced || !('IntersectionObserver' in window)) {
      revealed.forEach((el) => el.classList.add('is-visible'));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            io?.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
      );
      revealed.forEach((el) => io!.observe(el));
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    const parallax = !reduced && finePointer ? [...document.querySelectorAll<HTMLElement>('[data-parallax]')] : [];
    const progress = [...document.querySelectorAll<HTMLElement>('[data-progress]')];

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3));
      }
      for (const el of progress) {
        const r = el.getBoundingClientRect();
        // começa quando o topo cruza 75% da tela, termina quando o fim cruza 55%
        const start = vh * 0.75;
        const end = vh * 0.55;
        const p = (start - r.top) / (r.height - end + start);
        el.style.setProperty('--progress', Math.max(0, Math.min(1, p)).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
