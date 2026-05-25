import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Sidebar from './Sidebar';

export default function Navbar({ title, showBack, showIcons = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isCheckout = showBack;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const searchPlaceholder = windowWidth <= 360 ? 'Cari...' : windowWidth <= 400 ? 'Cari produk...' : 'Cari produk...';

  if (isCheckout) {
    return (
      <nav className="checkout-navbar">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h1>{title}</h1>
        {showIcons && (
          <button className="navbar-icon-btn" onClick={() => navigate('/keranjang')} aria-label="Keranjang">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        )}
      </nav>
    );
  }

  return (
    <>
      <nav className="navbar">
        {/* Left: Hamburger + Logo side by side */}
        <div className="navbar-left">
          <button
            className="navbar-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
            id="hamburger-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <button
            className="navbar-logo-btn"
            onClick={() => navigate('/')}
            aria-label="sfgiandra - Beranda"
          >
            <img
              src="/img/logo.svg"
              alt="sfgiandra"
              className="navbar-logo-img"
            />
          </button>
        </div>

        {/* Center: Search Bar */}
        <form className="navbar-search" onSubmit={(e) => {
          e.preventDefault();
          const query = e.target.search.value.trim();
          navigate('/kategori', { state: { searchQuery: query } });
        }}>
          <input
            type="text"
            name="search"
            placeholder={searchPlaceholder}
            className="navbar-search-input"
            autoComplete="off"
          />
          <button type="submit" className="navbar-search-btn" aria-label="Cari">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </form>

        {/* Right: Action icons (Cart, Account) */}
        <div className="navbar-icons">
          <button
            className="navbar-icon-btn"
            style={{ position: 'relative' }}
            onClick={() => navigate('/keranjang')}
            aria-label="Keranjang"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </button>

          <button className="navbar-icon-btn" onClick={() => navigate('/akun')} aria-label="Akun">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
