import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomSheet from '../components/BottomSheet';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const formatPrice = (p) => 'Rp ' + p.toLocaleString('id-ID');

const shippingOptions = [
  { id: 1, name: 'JNE REG — Regular', estimate: 'Estimasi tiba 3-5 hari', price: 15000 },
  { id: 2, name: 'JNE YES — Express', estimate: 'Estimasi tiba 1-2 hari', price: 25000 },
  { id: 3, name: 'GoSend — Same Day', estimate: 'Estimasi tiba Hari ini', price: 35000 },
];

const paymentMethods = [
  { id: 1, name: 'Bayar di Tempat (COD)', desc: 'Bayar saat paket tiba', icon: '💴' },
  { id: 2, name: 'Transfer Bank', desc: 'BCA, Mandiri, BNI, BRI', icon: '🏦' },
  { id: 3, name: 'QRIS', desc: 'Scan QR untuk bayar', icon: '📱' },
  { id: 4, name: 'GoPay', desc: 'Saldo GoPay kamu', icon: '🟢' },
  { id: 5, name: 'OVO', desc: 'Saldo OVO kamu', icon: '🟣' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  const [shippingOpen, setShippingOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [note, setNote] = useState('');
  const [voucher, setVoucher] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const ongkir = selectedShipping.price;
  const total = subtotal + ongkir;

  const handleOrder = () => {
    if (!selectedPayment) {
      showToast('Pilih metode pembayaran dulu!', 'error');
      return;
    }
    setOrderSuccess(true);
    showToast('Pesanan berhasil dibuat! 🎉', 'success');
    clearCart();
  };

  if (orderSuccess) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '60px', background: '#fff' }}>
        <Navbar showBack title="Pesanan" showIcons={false} />
        <div className="success-page page-enter">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2>Pesanan Berhasil!</h2>
          <p>Pesananmu sedang diproses. Kami akan menghubungimu segera.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button className="btn-outline" onClick={() => navigate('/')}>Ke Beranda</button>
            <button className="btn-pink" onClick={() => navigate('/akun')}>Cek Pesanan</button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate('/keranjang');
    return null;
  }

  return (
    <div className="checkout-page page-enter">
      <Navbar showBack title="Checkout" showIcons={false} />

      <div className="checkout-desktop-layout">
        <div className="checkout-left-col">
      {/* Alamat Pengiriman */}
      <section className="checkout-section" style={{ marginTop: '0' }}>
        <div className="checkout-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Alamat Pengiriman
        </div>
        <div className="address-card">
          <div className="address-main">
            <div className="address-name-row">
              <span className="address-name">Siti Aisyah</span>
              <span className="address-badge">Utama</span>
            </div>
            <p className="address-phone">+62 812-3456-7890</p>
            <p className="address-detail">Jl. Mawar No. 12, RT 03/RW 05, Kel. Cipete, Kec. Cilandak, Jakarta Selatan, DKI Jakarta 12410</p>
          </div>
          <button className="address-change" id="change-address-btn">
            Ubah
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
        <div className="delivery-estimate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="2"/>
            <path d="M16 8h4l3 5v3h-7V8z"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          Estimasi tiba {selectedShipping.estimate.replace('Estimasi tiba ', '')}
        </div>
      </section>

      {/* Produk */}
      <section className="checkout-section">
        <div className="checkout-store-header">
          <div className="store-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
            </svg>
          </div>
          <span className="store-name">sfgiandra</span>
          <span className="store-badge">Official</span>
        </div>

        {cartItems.map((item, i) => (
          <div key={i} className="checkout-item">
            <img src={item.image} alt={item.name} className="checkout-item-img"
              onError={e => { e.target.src = '/img/pashmina1.png'; }} />
            <div className="checkout-item-info">
              <p className="checkout-item-name">{item.name}</p>
              <p className="checkout-item-variant">Warna: {item.color}</p>
              <p className="checkout-item-price">{formatPrice(item.price)}</p>
            </div>
            <span className="checkout-item-qty">x{item.qty}</span>
          </div>
        ))}

        {/* Note */}
        <div style={{ marginTop: '12px' }}>
          <div className="note-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Tambah catatan untuk toko...
            <svg className="note-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Pilih Pengiriman */}
      <section className="checkout-section">
        <div className="checkout-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="2"/>
            <path d="M16 8h4l3 5v3h-7V8z"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          Pilih Pengiriman
        </div>
        <button
          className="shipping-row"
          onClick={() => setShippingOpen(true)}
          id="shipping-selector-btn"
        >
          <div className="shipping-row-left">
            <div className="shipping-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" rx="2"/>
                <path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <p className="shipping-name">{selectedShipping.name}</p>
              <p className="shipping-estimate">{selectedShipping.estimate} • {formatPrice(selectedShipping.price)}</p>
            </div>
          </div>
          <svg className="shipping-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </section>

      {/* Voucher */}
      <section className="checkout-section">
        <div className="checkout-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          Voucher sfgiandra
        </div>
        <button className="voucher-row" id="voucher-btn">
          <div className="voucher-row-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            Pilih atau masukkan kode voucher
          </div>
          <svg className="voucher-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </section>
      </div> {/* End left col */}

      <div className="checkout-right-col">
      {/* Metode Pembayaran */}
      <section className="checkout-section">
        <div className="checkout-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          Metode Pembayaran
        </div>
        <button
          className="payment-method-row"
          onClick={() => setPaymentOpen(true)}
          id="payment-method-btn"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>{selectedPayment ? selectedPayment.icon : '💳'}</span>
            <span style={{ fontSize: '13px', color: selectedPayment ? '#262626' : '#8a8a8a' }}>
              {selectedPayment ? selectedPayment.name : 'Pilih metode pembayaran'}
            </span>
          </div>
          <svg style={{ width: '16px', height: '16px', color: '#8a8a8a', flexShrink: 0 }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </section>

      {/* Ringkasan Pembayaran */}
      <section className="checkout-section">
        <div className="checkout-section-title" style={{ marginBottom: '8px' }}>
          Ringkasan Pembayaran
        </div>
        <div className="payment-summary-row">
          <span className="payment-summary-label">Subtotal ({cartItems.length} produk)</span>
          <span className="payment-summary-value">{formatPrice(subtotal)}</span>
        </div>
        <div className="payment-summary-row">
          <span className="payment-summary-label">Ongkos Kirim</span>
          <span className="payment-summary-value">{formatPrice(ongkir)}</span>
        </div>
        {voucher && (
          <div className="payment-summary-row">
            <span className="payment-summary-label">Diskon Voucher</span>
            <span style={{ fontSize: '13px', color: '#4CAF50', fontWeight: 500 }}>- Rp 10.000</span>
          </div>
        )}
        <div className="payment-summary-divider" />
        <div className="payment-summary-row">
          <span className="payment-total-label">Total Pembayaran</span>
          <span className="payment-total-value">{formatPrice(total)}</span>
        </div>

        <div className="security-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p>Belanja aman & terpercaya. Pembayaran kamu dilindungi oleh sistem keamanan sfgiandra.</p>
        </div>
      </section>

      {/* Checkout Bottom Bar */}
      <div className="checkout-bottom">
        <div className="checkout-total-row">
          <span className="checkout-total-label">Total Pembayaran</span>
          <span className="checkout-total-amount">{formatPrice(total)}</span>
        </div>
        <button className="buat-pesanan-btn" onClick={handleOrder} id="buat-pesanan-btn">
          Buat Pesanan
        </button>
      </div>
      </div> {/* End right col */}
      </div> {/* End desktop layout */}

      {/* Bottom Sheet: Pilih Pengiriman */}
      <BottomSheet
        isOpen={shippingOpen}
        onClose={() => setShippingOpen(false)}
        title="Pilih Pengiriman"
      >
        {shippingOptions.map(opt => (
          <div
            key={opt.id}
            className={`shipping-option ${selectedShipping.id === opt.id ? 'selected' : ''}`}
            onClick={() => { setSelectedShipping(opt); setShippingOpen(false); }}
            id={`shipping-opt-${opt.id}`}
          >
            <div className="shipping-option-radio">
              <div className="shipping-option-radio-inner" />
            </div>
            <div className="shipping-option-info">
              <p className="shipping-option-name">{opt.name}</p>
              <p className="shipping-option-est">{opt.estimate}</p>
            </div>
            <span className="shipping-option-price">{formatPrice(opt.price)}</span>
          </div>
        ))}
      </BottomSheet>

      {/* Bottom Sheet: Metode Pembayaran */}
      <BottomSheet
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        title="Metode Pembayaran"
      >
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-option ${selectedPayment?.id === method.id ? 'selected' : ''}`}
            onClick={() => { setSelectedPayment(method); setPaymentOpen(false); }}
            id={`payment-opt-${method.id}`}
          >
            <div className="payment-option-radio">
              <div className="payment-option-radio-inner" />
            </div>
            <div className="payment-option-icon">{method.icon}</div>
            <div className="payment-option-info">
              <p className="payment-option-name">{method.name}</p>
              <p className="payment-option-desc">{method.desc}</p>
            </div>
          </div>
        ))}
      </BottomSheet>
    </div>
  );
}
