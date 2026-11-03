/**
 * Shared "have we scrolled past the hero?" signal between BuybarSection
 * (writer, via IntersectionObserver) and FaqSection (reader, when an accordion
 * closes). Kept as module state so neither component has to read
 * getBoundingClientRect() to answer this — reading geometry is exactly what
 * forces a synchronous layout on every scroll frame (Lighthouse "Forced
 * reflow"/"Style & Layout" warnings on mobile).
 */
let pastHero = false;

export function setPastHero(value: boolean) {
  pastHero = value;
}

export function getPastHero() {
  return pastHero;
}