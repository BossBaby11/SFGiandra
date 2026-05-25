import Navbar from '../components/Navbar';

const user = {
  name: 'Siti Aisyah',
  phone: '+62 812-3456-7890',
  email: 'sitiaisyah@email.com',
  initial: 'SA',
};

const menuItems = [
  {
    group: 'Pesanan Saya',
    items: [
      { icon: '📦', label: 'Menunggu Pembayaran', desc: 'Selesaikan pembayaranmu', count: 1 },
      { icon: '🚚', label: 'Pesanan Dikirim', desc: 'Pantau pengirimanmu', count: 2 },
      { icon: '✅', label: 'Selesai', desc: 'Beri ulasan produk', count: 0 },
    ]
  },
  {
    group: 'Akun Saya',
    items: [
      { icon: '👤', label: 'Edit Profil', desc: 'Ubah data dirimu' },
      { icon: '📍', label: 'Alamat Pengiriman', desc: 'Kelola alamatmu' },
      { icon: '🎟️', label: 'Voucher sfgiandra', desc: 'Lihat vouchermu' },
      { icon: '🔔', label: 'Notifikasi', desc: 'Atur preferensi notifikasi' },
    ]
  },
  {
    group: 'Lainnya',
    items: [
      { icon: '❓', label: 'Bantuan', desc: 'Pusat bantuan sfgiandra' },
      { icon: '⭐', label: 'Nilai Aplikasi', desc: 'Beri rating aplikasi kami' },
      { icon: 'ℹ️', label: 'Tentang sfgiandra', desc: 'Versi 1.0.0' },
    ]
  }
];

export default function Akun() {
  return (
    <div className="page page-enter" style={{ paddingBottom: '90px' }}>
      <Navbar />
      <div className="akun-desktop-layout">

      {/* Profile Header */}
      <div className="akun-header">
        <div className="akun-avatar">
          {user.initial}
        </div>
        <div className="akun-info">
          <h2>{user.name}</h2>
          <p>{user.phone}</p>
          <p style={{ fontSize: '11px', marginTop: '2px', opacity: 0.8 }}>{user.email}</p>
        </div>
        <button style={{
          background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none',
          borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 500,
          cursor: 'pointer', flexShrink: 0,
        }}>
          Edit
        </button>
      </div>

      {/* Order Status Row */}
      <div className="order-status-row">
        {[
          { label: 'Belum Bayar', icon: '💳', count: 1 },
          { label: 'Dikemas', icon: '📦', count: 0 },
          { label: 'Dikirim', icon: '🚚', count: 2 },
          { label: 'Selesai', icon: '✅', count: 0 },
        ].map((s, i) => (
          <button key={i} className="order-status-item" id={`order-status-${i}`}>
            <div className="order-status-icon">
              <span style={{ fontSize: '24px' }}>{s.icon}</span>
              {s.count > 0 && (
                <span className="order-status-count">{s.count}</span>
              )}
            </div>
            <span className="order-status-label">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Menu Sections */}
      {menuItems.map((section, si) => (
        <div key={si} className="akun-menu-section">
          <div className="akun-menu-title">{section.group}</div>
          {section.items.map((item, ii) => (
            <div key={ii} className="akun-menu-item" id={`akun-menu-${si}-${ii}`} role="button" tabIndex={0}>
              <div className="akun-menu-icon">
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
              </div>
              <div className="akun-menu-content">
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span style={{
                  background: '#f0a0a2', color: '#fff', fontSize: '11px',
                  fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.count}
                </span>
              )}
              <svg className="akun-menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}
        </div>
      ))}

      {/* Logout */}
      <button className="logout-btn" id="logout-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Keluar dari Akun
      </button>
      </div> {/* akun-desktop-layout */}
    </div>
  );
}
