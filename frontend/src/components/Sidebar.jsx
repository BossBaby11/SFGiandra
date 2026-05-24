import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuData = [
  {
    label: 'New Arrival',
    category: 'New Arrival',
    subs: [],
  },
  {
    label: 'Best Seller',
    category: 'Best Seller',
    subs: [],
  },
  {
    label: 'Pashmina',
    category: 'Pashmina',
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
    subs: [
      'Hijab Bergo Luna',
      'Hijab Bergo Mikasa',
      'Hijab Bergo Nami',
      'Hijab Bergo Instan Tali',
      'Hijab Bergo Instan Tanpa Tali',
    ],
  },
  {
    label: 'Ciput',
    category: 'Ciput',
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
    subs: [
      'Cardigan',
      'Inner Manset',
      'Setelan',
      'Outer',
      'Rok',
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNav = (category, sub = null) => {
    onClose();
    navigate('/kategori', { state: { category, sub } });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
        aria-label="Menu navigasi"
        role="navigation"
      >
        {/* Header */}
        <div className="sidebar-header">
          <img src="/img/logo.svg" alt="sfgiandra" className="sidebar-logo" />
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Tutup menu"
            id="sidebar-close-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu List */}
        <nav className="sidebar-nav">
          {menuData.map((menu) => (
            <div key={menu.label} className="sidebar-menu-group">
              {/* Main menu row */}
              <div className="sidebar-menu-row">
                <button
                  className="sidebar-menu-label"
                  onClick={() =>
                    menu.subs.length > 0
                      ? toggleMenu(menu.label)
                      : handleNav(menu.category)
                  }
                  id={`sidebar-menu-${menu.label.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {menu.label}
                </button>
                {menu.subs.length > 0 && (
                  <button
                    className="sidebar-menu-toggle"
                    onClick={() => toggleMenu(menu.label)}
                    aria-label={openMenus[menu.label] ? 'Tutup submenu' : 'Buka submenu'}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                      style={{
                        transform: openMenus[menu.label] ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.22s ease',
                      }}
                    >
                      {openMenus[menu.label]
                        ? <line x1="5" y1="12" x2="19" y2="12" />
                        : (
                          <>
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </>
                        )
                      }
                    </svg>
                  </button>
                )}
              </div>

              {/* Submenu */}
              {menu.subs.length > 0 && openMenus[menu.label] && (
                <div className="sidebar-submenu">
                  {menu.subs.map((sub) => (
                    <button
                      key={sub}
                      className="sidebar-sub-item"
                      onClick={() => handleNav(menu.category, sub)}
                      id={`sidebar-sub-${sub.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              <div className="sidebar-divider" />
            </div>
          ))}
        </nav>

        {/* Footer in sidebar */}
        <div className="sidebar-footer">
          <p>sfgiandra © 2024</p>
          <p>Hijab Premium Pilihan Muslimah</p>
        </div>
      </aside>
    </>
  );
}
