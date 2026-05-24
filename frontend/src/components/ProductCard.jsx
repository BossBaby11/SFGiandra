import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const formatPrice = (price) =>
  'Rp ' + price.toLocaleString('id-ID');

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      wishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist',
      wishlisted ? 'info' : 'success'
    );
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      aria-label={product.name}
    >
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          onError={e => { e.target.src = '/img/pashmina1.png'; }}
        />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <button
          className={`heart-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          id={`wishlist-btn-${product.id}`}
        >
          <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="product-card-body">
        <p className="product-card-name">{product.name}</p>
        <div className="product-card-prices">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-card-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
