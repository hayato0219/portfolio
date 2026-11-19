import { useCallback } from 'react';
import { flushSync } from 'react-dom';

const CLASS = 'lm';
const STAGGER_MS = 14;
const MAX_STAGGER_MS = 220;
const NEW_TEXT_DELAY_MS = 90;

// Unique per switch, so a cleanup from an interrupted switch never strips the next one's names.
let generation = 0;

/** Nearest ancestor-or-self that renders as one box (inline boxes may fragment across lines). */
function blockOf(el: Element): HTMLElement | null {
  for (let cur: Element | null = el; cur && cur !== document.body; cur = cur.parentElement) {
    const display = getComputedStyle(cur).display;
    if (display !== 'inline' && display !== 'contents') return cur as HTMLElement;
  }
  return null;
}

/** On-screen elements that directly hold text, normalized to block boxes, in reading order. */
function textBlocksOnScreen(): HTMLElement[] {
  const found = new Set<HTMLElement>();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const parent = n.parentElement;
    if (!parent || !n.nodeValue?.trim()) continue;
    if (parent.closest('script, style, noscript, .chat-window, .modal')) continue;
    const block = blockOf(parent);
    if (!block) continue;
    const r = block.getBoundingClientRect();
    if (r.width === 0 || r.bottom <= 0 || r.top >= window.innerHeight) continue;
    found.add(block);
  }
  // Drop blocks nested inside another chosen block: the outer snapshot already covers them.
  return [...found].filter(
    (el) => ![...found].some((other) => other !== el && other.contains(el))
  );
}

/**
 * Switches language inside a View Transition: each visible text block slides up
 * and out while the new text slides in from below (staggered), and any change
 * in position or size between languages animates smoothly.
 * Falls back to an instant switch without support or under reduced motion.
 */
export function useLanguageTransition() {
  return useCallback((apply: () => void) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (
      !doc.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      apply();
      return;
    }

    const prefix = `lm${++generation}`;
    const blocks = textBlocksOnScreen();
    const style = document.createElement('style');
    style.textContent = blocks
      .map((_, i) => {
        const delay = Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
        // The new text starts once the old has mostly left, so the two rarely overlap.
        return `::view-transition-new(${prefix}-${i}){animation-delay:${delay + NEW_TEXT_DELAY_MS}ms}::view-transition-old(${prefix}-${i}){animation-delay:${Math.round(delay / 2)}ms}`;
      })
      .join('');
    document.head.appendChild(style);
    blocks.forEach((el, i) => {
      el.style.setProperty('view-transition-name', `${prefix}-${i}`);
      el.style.setProperty('view-transition-class', CLASS);
    });

    const cleanup = () => {
      blocks.forEach((el, i) => {
        if (el.style.getPropertyValue('view-transition-name') !== `${prefix}-${i}`) return;
        el.style.removeProperty('view-transition-name');
        el.style.removeProperty('view-transition-class');
      });
      style.remove();
    };

    try {
      const transition = doc.startViewTransition(() => flushSync(apply));
      transition.finished.finally(cleanup);
    } catch {
      cleanup();
      apply();
    }
  }, []);
}
