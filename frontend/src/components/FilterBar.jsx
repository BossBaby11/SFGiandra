import { useState } from 'react';

const categories = ['Semua Produk', 'Pashmina', 'Hijab Instan', 'Hijab Segi Empat'];
const sortOptions = ['Terbaru', 'Terlaris', 'Termurah', 'Termahal'];

export default function FilterBar({ activeCategory, setActiveCategory, activeSort, setActiveSort, total }) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="filter-bar-wrapper">
      <div className="filter-top">
        <button className="filter-btn" aria-label="Filter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filter
        </button>
        <div className="sort-wrapper" onClick={() => setSortOpen(!sortOpen)} style={{ position: 'relative' }}>
          <span style={{ fontSize: '13px', fontWeight: 500 }}>{activeSort}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          {sortOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, background: '#fff',
              borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              zIndex: 50, minWidth: '140px', marginTop: '6px', overflow: 'hidden'
            }}>
              {sortOptions.map(opt => (
                <div
                  key={opt}
                  onClick={(e) => { e.stopPropagation(); setActiveSort(opt); setSortOpen(false); }}
                  style={{
                    padding: '11px 16px',
                    fontSize: '13px',
                    fontWeight: opt === activeSort ? 600 : 400,
                    color: opt === activeSort ? '#f0a0a2' : '#262626',
                    background: opt === activeSort ? '#fff0f0' : 'transparent',
                    cursor: 'pointer',
                    borderBottom: '1px solid #e8e8e8',
                    transition: 'background 0.15s',
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filter-pills">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="product-count">{total} Produk</p>
    </div>
  );
}
