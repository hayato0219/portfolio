import React from 'react';

interface TagListProps {
  title: string;
  items: string[];
}

/** Shared badge list used for both skills and tools. */
const TagList: React.FC<TagListProps> = ({ title, items }) => (
  <section>
    <h2 className="section-title">{title}</h2>
    <div className="tag-list">
      {items.map((item) => (
        <span key={item} className="tag">
          <span className="tag__dot" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  </section>
);

export default TagList;
