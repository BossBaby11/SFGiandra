import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { products } from '../data/products';

const carouselSlides = [
  {
    id: 1,
    image: '/img/carousel1.png',
    alt: 'Back to School Special Sale - sfgiandra',
    link: '/kategori',
  },
  {
    id: 2,
    image: '/img/carousel2.png',
    alt: 'Syarat & Ketentuan sfgiandra',
    link: '/kategori',
  },
  {
    id: 3,
    image: '/img/carousel3.png',
    alt: 'School Hijab Collection - sfgiandra',
    link: '/kategori',
  },
];

const categories = [
  { label: 'Pashmina', emoji: '🧣', category: 'Pashmina' },
  { label: 'Hijab Instan', emoji: '👒', category: 'Hijab Instan' },
  { label: 'Hijab Segi Empat', emoji: '🧤', category: 'Hijab Segi Empat' },
  { label: 'Ciput', emoji: '🎀', category: 'Ciput' },
  { label: 'Outwear', emoji: '✨', category: 'Outwear' },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const featuredProducts = products.slice(0, 4);

  const nextSlide = useCallback(() => {
    setActiveBanner(prev => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveBanner(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Touch / swipe support
  const handleTouchStart = (e) => setStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextSlide() : prevSlide();
  };

  return (
    <div className="home-page page-enter">
      <Navbar />

      {/* ── HERO CAROUSEL ── */}
      <section
        className="hero-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Banner promosi"
      >
        <div
          className="hero-carousel-track"
          style={{ transform: `translateX(-${activeBanner * 100}%)` }}
        >
          {carouselSlides.map((slide) => (
            <div key={slide.id} className="hero-carousel-slide">
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-carousel-img"
                onClick={() => navigate(slide.link)}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
          aria-label="Slide berikutnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="hero-dots" style={{ bottom: '10px' }}>
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === activeBanner ? 'active' : ''}`}
              onClick={() => setActiveBanner(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── KATEGORI ── */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Kategori</h2>
          <button className="section-link" onClick={() => navigate('/kategori')}>Lihat semua</button>
        </div>
        <div className="category-scroll">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="category-item"
              onClick={() => navigate('/kategori', { state: { category: cat.category } })}
              aria-label={cat.label}
              id={`home-cat-${i}`}
            >
              <div className="category-icon">{cat.emoji}</div>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── FLASH SALE ── */}
      <section className="section">
        <div style={{
          background: 'linear-gradient(90deg, #FFBEC0, #ffd4d5)',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>⚡ Flash Sale</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginLeft: '8px' }}>Berakhir dalam</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['02', '34', '56'].map((t, i) => (
              <span key={i} style={{
                background: '#262626', color: '#fff', padding: '4px 6px',
                borderRadius: '4px', fontSize: '12px', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center',
              }}>
                {t}{i < 2 ? <span style={{ marginLeft: '4px' }}>:</span> : ''}
              </span>
            ))}
          </div>
        </div>
        <div className="product-grid" style={{ padding: 0 }}>
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── PRODUK TERBARU ── */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Produk Terbaru</h2>
          <button className="section-link" onClick={() => navigate('/kategori')}>Lihat semua</button>
        </div>
        <div className="product-grid" style={{ padding: 0 }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section style={{ background: '#fff', padding: '16px', marginBottom: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Estimasi 1-5 hari' },
            { icon: '✅', title: 'Produk Original', desc: '100% terjamin' },
            { icon: '🔒', title: 'Transaksi Aman', desc: 'Data terenkripsi' },
            { icon: '↩️', title: 'Easy Return', desc: '7 hari retur' },
          ].map((b, i) => (
            <div key={i} style={{
              background: '#fff0f0', borderRadius: '10px', padding: '12px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '22px' }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#262626' }}>{b.title}</div>
                <div style={{ fontSize: '11px', color: '#8a8a8a' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
