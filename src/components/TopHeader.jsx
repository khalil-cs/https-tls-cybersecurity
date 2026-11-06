import { Sun, Moon, Menu, Monitor, Printer, ChevronRight } from 'lucide-react';

export default function TopHeader({
  currentPage, theme, onToggleTheme, onToggleMobileMenu,
  presentationMode, onTogglePresentation, onPrint,
}) {
  return (
    <header className="top-header" role="banner">
      <button
        className="header-menu-btn"
        onClick={onToggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <Menu size={18} />
      </button>

      {/* Breadcrumb */}
      <div className="header-breadcrumb" aria-label="Breadcrumb">
        <span className="breadcrumb-home">HTTPS &amp; TLS</span>
        <ChevronRight size={13} className="breadcrumb-sep" aria-hidden="true" />
        <span className="breadcrumb-current">{currentPage}</span>
      </div>

      {/* Actions */}
      <div className="header-actions">
        <button
          className={`header-btn ${presentationMode ? 'active' : ''}`}
          onClick={onTogglePresentation}
          aria-label={presentationMode ? 'Exit presentation mode' : 'Enter presentation mode'}
          title={presentationMode ? 'Exit presentation mode (Esc)' : 'Presentation mode'}
        >
          <Monitor size={15} />
          <span className="header-btn-label">
            {presentationMode ? 'Exit' : 'Present'}
          </span>
        </button>

        <button
          className="header-btn"
          onClick={onPrint}
          aria-label="Print or save as PDF"
          title="Print / Save as PDF"
        >
          <Printer size={15} />
          <span className="header-btn-label">Print</span>
        </button>

        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
