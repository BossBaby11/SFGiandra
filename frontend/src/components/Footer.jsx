import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Top Section */}
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/img/logo.svg" alt="sfgiandra" className="footer-logo" />
          </div>
          <p className="footer-tagline">
            Hijab premium pilihan muslimah Indonesia. Tampil cantik, elegan, dan syar'i bersama sfgiandra.
          </p>
          <div className="footer-socials">
            {/* Instagram */}
            <a href="#" className="footer-social-btn" aria-label="Instagram sfgiandra">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="footer-social-btn" aria-label="TikTok sfgiandra">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.2 8.2 0 0 0 4.78 1.52V7.12a4.85 4.85 0 0 1-1.01-.43z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" className="footer-social-btn" aria-label="WhatsApp sfgiandra">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
            {/* Shopee */}
            <a href="#" className="footer-social-btn" aria-label="Shopee sfgiandra">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Kategori */}
        <div className="footer-col">
          <h3 className="footer-col-title">Kategori</h3>
          <ul className="footer-links">
            {['New Arrival', 'Best Seller', 'Pashmina', 'Hijab Instan', 'Ciput', 'Outwear'].map(cat => (
              <li key={cat}>
                <button
                  className="footer-link"
                  onClick={() => navigate('/kategori', { state: { category: cat } })}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Informasi */}
        <div className="footer-col">
          <h3 className="footer-col-title">Informasi</h3>
          <ul className="footer-links">
            <li><button className="footer-link">Tentang Kami</button></li>
            <li><button className="footer-link">Cara Berbelanja</button></li>
            <li><button className="footer-link">Syarat & Ketentuan</button></li>
            <li><button className="footer-link">Kebijakan Privasi</button></li>
            <li><button className="footer-link">Kebijakan Pengembalian</button></li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="footer-col">
          <h3 className="footer-col-title">Kontak Kami</h3>
          <ul className="footer-links footer-contacts">
            <li className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Jakarta, Indonesia
            </li>
            <li className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +62 812-3456-7890
            </li>
            <li className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              cs@sfgiandra.com
            </li>
            <li className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              08.00 – 16.00 WIB
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="footer-payment">
        <p className="footer-payment-title">Metode Pembayaran</p>
        <div className="footer-payment-icons">
          {['BCA', 'Mandiri', 'BNI', 'BRI', 'GoPay', 'OVO', 'QRIS', 'COD'].map(m => (
            <span key={m} className="footer-payment-badge">{m}</span>
          ))}
        </div>
      </div>

      {/* Shipping Partners */}
      <div className="footer-shipping">
        <p className="footer-shipping-title">Mitra Pengiriman</p>
        <div className="footer-payment-icons">
          {['JNE', 'J&T', 'SiCepat', 'GoSend', 'AnterAja'].map(m => (
            <span key={m} className="footer-payment-badge">{m}</span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {year} sfgiandra. All rights reserved.</p>
        <p>Made with ❤️ for Muslimah Indonesia</p>
      </div>
    </footer>
  );
}
