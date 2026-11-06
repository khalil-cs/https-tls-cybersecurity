import {
  Home, BookOpen, ArrowLeftRight, Shield, Globe, Network,
  BadgeCheck, Lock, Layers, AlertTriangle, FlaskConical,
  CheckSquare, FileText, ChevronLeft, ChevronRight, ShieldCheck
} from 'lucide-react';

const ICON_MAP = {
  Home, BookOpen, ArrowLeftRight, Shield, Globe, Network,
  BadgeCheck, Lock, Layers, AlertTriangle, FlaskConical,
  CheckSquare, FileText,
};

export default function Sidebar({
  items, activePage, onNavigate, collapsed, mobileOpen,
  onToggleCollapse, onMobileClose, presentationMode
}) {
  if (presentationMode) return null;

  const sidebarClass = [
    'sidebar',
    collapsed ? 'collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <aside className={sidebarClass} aria-label="Site navigation">
      {/* Logo/Brand */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <ShieldCheck size={20} />
        </div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-title">HTTPS &amp; TLS</div>
          <div className="sidebar-logo-subtitle">Cybersecurity</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Section navigation">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={activePage === item.id ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-item-icon" aria-hidden="true">
                {Icon && <Icon size={16} />}
              </span>
              <span className="nav-item-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar toggle */}
      <div className="sidebar-footer">
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <span className="sidebar-toggle-label">Collapse</span>
        </button>
      </div>
    </aside>
  );
}
