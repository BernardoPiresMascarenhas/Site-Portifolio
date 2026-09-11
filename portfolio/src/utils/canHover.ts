/**
 * True apenas em dispositivos com ponteiro real (mouse/trackpad).
 * No celular o toque dispara `mouseenter` e o efeito de hover fica "grudado",
 * deslocando o card lateralmente durante o scroll.
 */
export function canHover(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
