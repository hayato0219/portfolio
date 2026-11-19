import { useCallback, useLayoutEffect, useRef } from 'react';

const DURATION_MS = 650;
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const KANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
const CJK = /[぀-ヿ㐀-鿿ｦ-ﾟ]/;
const KEEP = /[\s.,:;!?'"()（）「」、。・\-–—/&+#@%|]/;

type Target = { node: Text; final: string; reveal: number[] };

let cancelRunning: (() => void) | null = null;

function eachTextNode(root: Node, fn: (node: Text) => void) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      if (parent.closest('script, style, noscript, [data-no-morph]'))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) fn(n as Text);
}

function isOnScreen(node: Text) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const r = range.getBoundingClientRect();
  return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
}

function randomGlyph(like: string) {
  const set = CJK.test(like) ? KANA : LATIN;
  return set[(Math.random() * set.length) | 0];
}

function run(targets: Target[]) {
  cancelRunning?.();
  let frame = 0;
  let last = 0;
  const start = performance.now();

  const finish = () => {
    cancelAnimationFrame(frame);
    targets.forEach((t) => {
      if (t.node.isConnected) t.node.nodeValue = t.final;
    });
    cancelRunning = null;
  };

  const step = (now: number) => {
    const p = (now - start) / DURATION_MS;
    if (p >= 1) return finish();
    // Re-roll glyphs ~30 times a second so the scramble reads as flicker, not noise.
    if (now - last > 33) {
      last = now;
      targets.forEach((t) => {
        if (!t.node.isConnected) return;
        let out = '';
        for (let i = 0; i < t.final.length; i++) {
          const ch = t.final[i];
          out += p >= t.reveal[i] || KEEP.test(ch) ? ch : randomGlyph(ch);
        }
        t.node.nodeValue = out;
      });
    }
    frame = requestAnimationFrame(step);
  };

  cancelRunning = finish;
  frame = requestAnimationFrame(step);
}

/**
 * Language-switch flourish: text that changed and is on screen scrambles
 * through random glyphs before settling, left to right.
 * Call the returned `capture` right before changing the language.
 */
export function useLanguageMorph(language: string) {
  const snapshot = useRef<WeakMap<Text, string> | null>(null);

  const capture = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const map = new WeakMap<Text, string>();
    eachTextNode(document.body, (n) => map.set(n, n.nodeValue ?? ''));
    snapshot.current = map;
  }, []);

  useLayoutEffect(() => {
    const before = snapshot.current;
    snapshot.current = null;
    if (!before) return;

    const targets: Target[] = [];
    eachTextNode(document.body, (node) => {
      const final = node.nodeValue ?? '';
      if (before.get(node) === final || !isOnScreen(node)) return;
      const reveal = Array.from(
        final,
        (_, i) => 0.12 + 0.6 * (i / Math.max(final.length, 1)) + Math.random() * 0.25
      );
      targets.push({ node, final, reveal });
    });
    if (targets.length) run(targets);
  }, [language]);

  return capture;
}
