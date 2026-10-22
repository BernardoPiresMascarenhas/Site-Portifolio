import { Fragment } from 'react';
import type { ReactNode } from 'react';
import type { Word } from '../../utils/words';

/**
 * Quebra um título em palavras mascaradas para a animação de entrada.
 * O texto completo continua acessível no aria-label do elemento pai.
 */
export default function SplitWords({ words, baseDelay = 0, step = 45 }: { words: Word[]; baseDelay?: number; step?: number }): ReactNode {
  return words.map((w, i) => {
    const { text, accent } = typeof w === 'string' ? { text: w, accent: false } : w;
    return (
      <Fragment key={i}>
        <span className="split-word" aria-hidden="true">
          <span
            className={accent ? 'split-word__inner is-accent' : 'split-word__inner'}
            style={{ '--d': `${baseDelay + i * step}ms` } as React.CSSProperties}
          >
            {text}
          </span>
        </span>{' '}
      </Fragment>
    );
  });
}
