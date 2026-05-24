import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { products as allProducts } from '../data/products';

export default function Kategori() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    location.state?.category || 'Semua Produk'
  );
  const [activeSub, setActiveSub] = useState(location.state?.sub || null);
  const [activeSort, setActiveSort] = useState('Terbaru');
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
      setActiveSub(location.state?.sub || null);
      setSearchQuery('');
    }
    if (location.state?.searchQuery !== undefined) {
      setSearchQuery(location.state.searchQuery);
      if (location.state.searchQuery) {
        setActiveCategory('Semua Produk');
        setActiveSub(null);
      }
    }
  }, [location.state]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (activeCategory !== 'Semua Produk') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerQuery));
    }

    switch (activeSort) {
      case 'Terlaris':
        result.sort((a, b) => b.sold - a.sold); break;
      case 'Termurah':
        result.sort((a, b) => a.price - b.price); break;
      case 'Termahal':
        result.sort((a, b) => b.price - a.price); break;
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [activeCategory, activeSort]);

  return (
    <div style={{ background: '#F7F7F7', minHeight: '100vh', paddingTop: '60px', paddingBottom: '80px' }}>
      <Navbar />

      <div style={{ position: 'sticky', top: '60px', zIndex: 50, background: '#fff' }}>
        {/* Search breadcrumb */}
        {searchQuery && (
          <div style={{
            padding: '6px 16px', background: '#fff0f0',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', color: '#8a8a8a', borderBottom: '1px solid #e8e8e8'
          }}>
            <span>Hasil pencarian untuk:</span>
            <span style={{ color: '#262626', fontWeight: 600 }}>"{searchQuery}"</span>
            <button onClick={() => setSearchQuery('')} style={{ marginLeft: 'auto', fontSize: '11px', color: '#f0a0a2', fontWeight: 500 }}>Hapus pencarian</button>
          </div>
        )}

        {/* Sub-menu breadcrumb */}
        {activeSub && !searchQuery && (
          <div style={{
            padding: '6px 16px', background: '#fff0f0',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', color: '#8a8a8a', borderBottom: '1px solid #e8e8e8'
          }}>
            <span style={{ color: '#f0a0a2', fontWeight: 500 }}>{activeCategory}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
            <span style={{ color: '#262626', fontWeight: 600 }}>{activeSub}</span>
            <button onClick={() => setActiveSub(null)} style={{ marginLeft: 'auto', fontSize: '11px', color: '#f0a0a2', fontWeight: 500 }}>Hapus filter</button>
          </div>
        )}
        <FilterBar
          activeCategory={activeCategory}
          setActiveCategory={(cat) => { setActiveCategory(cat); setActiveSub(null); setSearchQuery(''); }}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          total={filteredProducts.length}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '60px 24px', textAlign: 'center', gap: '12px'
        }}>
          <span style={{ fontSize: '48px' }}>🔍</span>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#262626' }}>Produk tidak ditemukan</h3>
          <p style={{ fontSize: '13px', color: '#8a8a8a' }}>Coba pilih kategori lainnya</p>
        </div>
      ) : (
        <div className="product-grid page-enter">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
