'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ExperienceItem as ExperienceItemType, Translations } from '@/types';
import ExperienceItem, { isVideo } from './ExperienceItem';

interface ProjectIndexProps {
  items: ExperienceItemType[];
  t: Translations;
  currentImageIndexes: Record<string, number>;
  onImageNavigation: (key: string, direction: 'next' | 'prev', count: number) => void;
  onImageClick: (list: string[], index: number, caption: string) => void;
}

/** Beyond this many projects the rest sit behind "Show all". */
const VISIBLE_LIMIT = 6;
const TECH_IN_ROW = 3;

/** "開発期間: 2025/04 -" → "2025–", "2024/4 - 2025/3" → "2024–25". */
function periodLabel(date?: string): string {
  if (!date) return '';
  const years = date.match(/\d{4}/g) ?? [];
  if (years.length === 0) return '';
  const ongoing = /-\s*$/.test(date.trim());
  if (years.length >= 2 && years[1] !== years[0]) return `${years[0]}–${years[1].slice(2)}`;
  return ongoing ? `${years[0]}–` : years[0];
}

/**
 * Projects as an index: one row each, equal weight. Hovering a row (fine
 * pointers) floats its first image beside the cursor; clicking opens the
 * details in place, one at a time.
 */
const ProjectIndex: React.FC<ProjectIndexProps> = ({
  items,
  t,
  currentImageIndexes,
  onImageNavigation,
  onImageClick,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Panels stay mounted after first opening so closing can animate,
  // but media is never loaded for a project nobody opened.
  const [everOpened, setEverOpened] = useState<Set<number>>(() => new Set());
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const visible = showAll ? items : items.slice(0, VISIBLE_LIMIT);
  const hiddenCount = items.length - visible.length;

  const toggle = (i: number) => {
    setOpenIndex((cur) => (cur === i ? null : i));
    setEverOpened((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  };

  const previewItem = hovered !== null && hovered !== openIndex ? items[hovered] : null;

  return (
    <div className="pindex">
      <ul className="pindex__list">
        {visible.map((item, i) => {
          const open = openIndex === i;
          const key = `xp-${i}`;
          const tech = item.technologies ?? [];
          return (
            <li key={key} className={`pindex__item${open ? ' pindex__item--open' : ''}`}>
              <h3 className="pindex__heading">
                <button
                  type="button"
                  className="pindex__row"
                  aria-expanded={open}
                  aria-controls={`${key}-panel`}
                  id={`${key}-row`}
                  onClick={() => toggle(i)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(null)}
                >
                  <span className="pindex__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pindex__title">{item.title}</span>
                  <span className="pindex__tech" aria-hidden="true">
                    {tech.slice(0, TECH_IN_ROW).join(' · ')}
                    {tech.length > TECH_IN_ROW ? ' …' : ''}
                  </span>
                  <span className="pindex__year">{periodLabel(item.date)}</span>
                  <span className="pindex__icon" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="pindex__panel"
                id={`${key}-panel`}
                role="region"
                aria-labelledby={`${key}-row`}
                inert={!open}
              >
                <div className="pindex__panel-inner">
                  {everOpened.has(i) && (
                    <div className="pindex__detail">
                      {item.date && <p className="mono-label pindex__date">{item.date}</p>}
                      <ExperienceItem
                        item={item}
                        showHead={false}
                        currentImageIndex={currentImageIndexes[key] || 0}
                        onImageNavigation={(direction, count) =>
                          onImageNavigation(key, direction, count)
                        }
                        onImageClick={onImageClick}
                        t={t}
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {hiddenCount > 0 && (
        <button type="button" className="pindex__more text-link" onClick={() => setShowAll(true)}>
          {t.projectsShowAll} (+{hiddenCount})
        </button>
      )}

      <HoverPreview item={previewItem} />
    </div>
  );
};

/** First image of the hovered project, trailing the cursor. Fine pointers only (CSS). */
const HoverPreview: React.FC<{ item: ExperienceItemType | null }> = ({ item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [last, setLast] = useState<ExperienceItemType | null>(null);

  // Keep the last item rendered while fading out.
  useEffect(() => {
    if (item) setLast(item);
  }, [item]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX + 28, y: e.clientY - 90 };
      if (reduced) pos.current = target.current;
    };
    const tick = () => {
      // Ease toward the cursor so the card trails it slightly.
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const shown = item ?? last;
  const first = shown?.images?.[0];

  return (
    <div
      ref={ref}
      className={`pindex-preview${item && first ? ' pindex-preview--on' : ''}`}
      aria-hidden="true"
    >
      {first &&
        (isVideo(first) ? (
          <video src={`/images/previews/${first}`} muted autoPlay loop playsInline />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/images/${first}`} alt="" />
        ))}
    </div>
  );
};

export default ProjectIndex;
