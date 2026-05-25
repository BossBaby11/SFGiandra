import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const formatPrice = (p) => 'Rp ' + p.toLocaleString('id-ID');

export default function Keranjang() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(() => new Set(cartItems.map((_, i) => i)));

  const toggleSelect = (idx) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const selectedItems = cartItems.filter((_, i) => selected.has(i));
  const selectedTotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleDelete = (id, color, idx) => {
    removeFromCart(id, color);
    setSelected(prev => {
      const next = new Set();
      prev.forEach(v => { if (v !== idx) next.add(v > idx ? v - 1 : v); });
      return next;
    });
    showToast('Produk dihapus dari keranjang', 'info');
  };

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  return (
    <div style={{ background: '#F7F7F7', minHeight: '100vh', paddingTop: '60px', paddingBottom: isDesktop ? '24px' : '140px' }} className="cart-page">
      <Navbar showBack title="Keranjang" showIcons={false} />

      {cartItems.length === 0 ? (
        <div style={{ padding: '16px' }}>
          <div className="cart-empty">
            <span style={{ fontSize: '56px' }}>🛒</span>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#262626' }}>Keranjang kosong</h3>
            <p style={{ fontSize: '13px', color: '#8a8a8a' }}>Yuk tambahkan produk favoritmu!</p>
            <button className="btn-pink" onClick={() => navigate('/kategori')}>
              Mulai Belanja
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-desktop-layout">
          <div>
          {/* Select All */}
          <div style={{
            background: '#fff', padding: '12px 16px', marginBottom: '8px',
            display: 'flex', alignItems: 'center', gap: '10px',
            borderBottom: '1px solid #e8e8e8',
          }}>
            <input
              type="checkbox"
              id="select-all"
              style={{ width: '18px', height: '18px', accentColor: '#f0a0a2' }}
              checked={selected.size === cartItems.length}
              onChange={() => {
                if (selected.size === cartItems.length)
                  setSelected(new Set());
                else
                  setSelected(new Set(cartItems.map((_, i) => i)));
              }}
            />
            <label htmlFor="select-all" style={{ fontSize: '13.5px', fontWeight: 500, color: '#262626', cursor: 'pointer' }}>
              Pilih Semua ({cartItems.length})
            </label>
          </div>

          {/* Cart Items */}
          <div className="cart-section">
            <div className="cart-section-title">
              🏪 sfgiandra
              <span style={{
                background: '#FFBEC0', color: '#fff',
                fontSize: '10px', fontWeight: 600, padding: '2px 8px',
                borderRadius: '99px',
              }}>Official</span>
            </div>
            {cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.color}`} className="cart-item">
                <div className="cart-item-check">
                  <input
                    type="checkbox"
                    checked={selected.has(idx)}
                    onChange={() => toggleSelect(idx)}
                    aria-label={`Pilih ${item.name}`}
                  />
                </div>
                <img src={item.image} alt={item.name} className="cart-item-img"
                  onError={e => { e.target.src = '/img/pashmina1.png'; }} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-variant">Warna: {item.color}</p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                    <div className="qty-stepper">
                      <button
                        className={`qty-btn ${item.qty <= 1 ? 'disabled' : ''}`}
                        onClick={() => updateQty(item.id, item.color, item.qty - 1)}
                        disabled={item.qty <= 1}
                        aria-label="Kurangi"
                      >−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.color, item.qty + 1)}
                        aria-label="Tambah"
                      >+</button>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id, item.color, idx)}
                      aria-label="Hapus"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Right panel: Summary + Checkout (desktop) / Bottom bar (mobile) */}
          {cartItems.length > 0 && (
            <div className="cart-bottom" style={{ padding: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>Ringkasan Belanja</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray)', marginBottom: '6px' }}>
                  <span>Subtotal ({selected.size} item)</span>
                  <span style={{ color: 'var(--dark)', fontWeight: 500 }}>{formatPrice(selectedTotal)}</span>
                </div>
                <div style={{ height: '1px', background: 'var(--gray-light)', margin: '10px 0' }} />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <p className="cart-total-text">Total Pembayaran</p>
                <p className="cart-total-amount">{formatPrice(selectedTotal)}</p>
              </div>
              <button
                className="checkout-btn"
                style={{ width: '100%' }}
                disabled={selected.size === 0}
                onClick={() => navigate('/checkout')}
                id="checkout-btn"
              >
                Beli Sekarang ({selected.size} item)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
