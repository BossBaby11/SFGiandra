import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Kategori from './pages/Kategori';
import Wishlist from './pages/Wishlist';
import Akun from './pages/Akun';
import Keranjang from './pages/Keranjang';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kategori" element={<Kategori />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/akun" element={<Akun />} />
              <Route path="/keranjang" element={<Keranjang />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <BottomNav />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
