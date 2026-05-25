import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const formatPrice = (p) => 'Rp ' + p.toLocaleString('id-ID');

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);

  if (!product) {
    navigate('/kategori');
    return null;
  }

  const wishlisted = isWishlisted(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, qty);
    showToast(`${product.name} ditambahkan ke keranjang!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, qty);
    navigate('/checkout');
  };

  return (
    <div className="product-detail-page page-enter">
      {/* Product Navbar */}
      <nav className="product-detail-navbar">
        <div className="navbar-inner">
        <button
          onClick={() => navigate(-1)}
          style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer' }}
          aria-label="Kembali"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={{ flex: 1 }} />
        <button
          className={`heart-btn ${wishlisted ? 'active' : ''}`}
          onClick={() => {
            toggleWishlist(product);
            showToast(wishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist!', wishlisted ? 'info' : 'success');
          }}
          aria-label="Wishlist"
          id="detail-wishlist-btn"
          style={{ position: 'relative', width: '36px', height: '36px', background: wishlisted ? '#fff0f0' : '#f7f7f7', border: '1.5px solid', borderColor: wishlisted ? '#f0a0a2' : '#e8e8e8' }}
        >
          <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18"
            fill={wishlisted ? '#f0a0a2' : 'transparent'} color={wishlisted ? '#f0a0a2' : '#8a8a8a'}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button
          onClick={() => navigate('/keranjang')}
          style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#f7f7f7', marginLeft: '6px' }}
          aria-label="Keranjang"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
        </div>
      </nav>

      <div className="product-detail-desktop">
      {/* Product Image */}
      <div className="product-detail-image-col">
        <div className="product-detail-image-wrapper" style={{ padding: '16px', paddingBottom: 0 }}>
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
            style={{ borderRadius: '16px' }}
            onError={e => { e.target.src = '/img/pashmina1.png'; }}
          />
        </div>
      </div>

      {/* Product Body */}
      <div>
      <div className="product-detail-body">
        {product.badge && (
          <span style={{
            background: '#FFBEC0', color: '#fff', fontSize: '11px',
            fontWeight: 600, padding: '3px 10px', borderRadius: '99px', marginBottom: '10px',
            display: 'inline-block',
          }}>{product.badge}</span>
        )}
        <h1 className="product-detail-name">{product.name}</h1>

        <div className="product-detail-price-row">
          <span className="product-detail-price">{formatPrice(product.price)}</span>
          <span className="product-detail-original">{formatPrice(product.originalPrice)}</span>
          <span className="product-detail-discount">{discount}%</span>
        </div>

        <div className="product-detail-stats">
          <div className="product-detail-stat">
            ⭐ <span>{product.rating}</span>
          </div>
          <div className="product-detail-stat">
            Terjual <span>{product.sold.toLocaleString('id-ID')}</span>
          </div>
          <div className="product-detail-stat">
            Stok <span>{product.stock}</span>
          </div>
        </div>

        {/* Color Options */}
        <div className="color-options">
          <p className="color-options-label">Warna: <strong>{selectedColor}</strong></p>
          <div className="color-pills">
            {product.colors.map(c => (
              <button
                key={c}
                className={`color-pill ${selectedColor === c ? 'active' : ''}`}
                onClick={() => setSelectedColor(c)}
                id={`color-${c}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Qty Stepper */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#262626', marginBottom: '10px' }}>Jumlah</p>
          <div className="qty-stepper">
            <button className={`qty-btn ${qty <= 1 ? 'disabled' : ''}`}
              onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#262626', marginBottom: '6px' }}>Deskripsi Produk</p>
          <p style={{ fontSize: '13px', color: '#8a8a8a', lineHeight: 1.6 }}>{product.description}</p>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="product-detail-bottom">
        <button className="add-to-cart-btn" onClick={handleAddToCart} id="add-to-cart-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Keranjang
        </button>
        <button className="beli-sekarang-btn" onClick={handleBuyNow} id="beli-sekarang-btn">
          Beli Sekarang
        </button>
      </div>

      </div> {/* End unnamed right column wrapper */}
      </div> {/* End product-detail-desktop */}
    </div>
  );
}
