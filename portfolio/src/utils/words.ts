export type Word = string | { text: string; accent?: boolean };

/** Converte "Texto com *destaque*" em palavras, marcando o trecho entre asteriscos. */
export function toWords(sentence: string): Word[] {
  const out: Word[] = [];
  let accent = false;
  for (const raw of sentence.split(' ')) {
    let token = raw;
    if (token.startsWith('*')) {
      accent = true;
      token = token.slice(1);
    }
    const closes = token.includes('*');
    token = token.replace('*', '');
    out.push({ text: token, accent });
    if (closes) accent = false;
  }
  return out;
}

export const plain = (sentence: string) => sentence.replace(/\*/g, '');
