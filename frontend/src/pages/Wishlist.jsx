import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  return (
    <div className="page page-enter">
      <Navbar />
      <div style={{ background: '#fff', padding: '14px 16px', borderBottom: '1px solid #e8e8e8' }}>
        <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#262626' }}>
          Wishlist ({wishlist.length})
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h3>Wishlist masih kosong</h3>
          <p>Simpan produk favorit kamu dengan tap ikon ❤️ pada produk.</p>
          <button className="btn-pink" onClick={() => navigate('/kategori')}>
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div className="product-grid page-enter">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
