import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuData = [
  {
    label: 'Semua Produk',
    category: 'Semua Produk',
    emoji: '🏷️',
    subs: [],
  },
  {
    label: 'New Arrival',
    category: 'New Arrival',
    emoji: '✨',
    subs: [],
  },
  {
    label: 'Best Seller',
    category: 'Best Seller',
    emoji: '🔥',
    subs: [],
  },
  {
    label: 'Pashmina',
    category: 'Pashmina',
    emoji: '🧣',
    subs: [
      'Rayon Series',
      'Viscose Series',
      'Pashmina Voal',
      'Pashmina Shawl',
    ],
  },
  {
    label: 'Hijab Instant',
    category: 'Hijab Instan',
    emoji: '👒',
    subs: [
      'Hijab Bergo Luna',
      'Hijab Bergo Mikasa',
      'Hijab Bergo Nami',
      'Hijab Bergo Instan Tali',
      'Hijab Bergo Instan Tanpa Tali',
    ],
  },
  {
    label: 'Hijab Segi Empat',
    category: 'Hijab Segi Empat',
    emoji: '🧤',
    subs: [],
  },
  {
    label: 'Ciput',
    category: 'Ciput',
    emoji: '🎀',
    subs: [
      'Ciput Rayon',
      'Ciput Jersey',
      'Bros',
      'Masker',
      'Sunglasses',
    ],
  },
  {
    label: 'Outwear',
    category: 'Outwear',
    emoji: '👗',
    subs: [
      'Cardigan',
      'Inner Manset',
      'Setelan',
      'Outer',
      'Rok',
    ],
  },
];

export default function DesktopSidebar({ activeCategory, onSelectCategory }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const isKategoriPage = location.pathname.startsWith('/kategori');

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNav = (category, sub = null) => {
    navigate('/kategori', { state: { category, sub } });
    if (onSelectCategory) onSelectCategory(category);
  };

  return (
    <aside className="desktop-sidebar" aria-label="Kategori produk">
      <div className="desktop-sidebar-title">Kategori</div>

      {menuData.map((menu) => {
        const isActive = isKategoriPage && (activeCategory === menu.category || (!activeCategory && menu.category === 'Semua Produk'));
        const isOpen = openMenus[menu.label];

        return (
          <div key={menu.label} className="desktop-sidebar-group">
            <div className="desktop-sidebar-row">
              <button
                className={`desktop-sidebar-btn${isActive ? ' active' : ''}`}
                onClick={() =>
                  menu.subs.length > 0
                    ? toggleMenu(menu.label)
                    : handleNav(menu.category)
                }
                id={`dsk-sidebar-${menu.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <span style={{ fontSize: '15px' }}>{menu.emoji}</span>
                <span style={{ flex: 1 }}>{menu.label}</span>
                {menu.subs.length > 0 && (
                  <svg
                    className={`desktop-sidebar-chevron${isOpen ? ' open' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
              </button>
            </div>

            {menu.subs.length > 0 && isOpen && (
              <div className="desktop-sidebar-sub">
                {menu.subs.map((sub) => (
                  <button
                    key={sub}
                    className="desktop-sidebar-sub-item"
                    onClick={() => handleNav(menu.category, sub)}
                    id={`dsk-sub-${sub.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
