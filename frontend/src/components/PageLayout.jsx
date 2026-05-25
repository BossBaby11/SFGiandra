import DesktopSidebar from './DesktopSidebar';

/**
 * PageLayout wraps pages that should show the desktop sidebar.
 * On mobile: renders children normally (sidebar is hidden via CSS).
 * On desktop: shows a sticky left sidebar alongside the main content.
 */
export default function PageLayout({ children, activeCategory }) {
  return (
    <div className="desktop-layout">
      {/* Desktop-only permanent sidebar */}
      <DesktopSidebar activeCategory={activeCategory} />

      {/* Main content */}
      <main className="desktop-main">
        {children}
      </main>
    </div>
  );
}
