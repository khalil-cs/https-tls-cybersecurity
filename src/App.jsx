import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import PresentationBar from './components/PresentationBar';
import HomePage from './pages/HomePage';
import IntroductionPage from './pages/IntroductionPage';
import HttpVsHttpsPage from './pages/HttpVsHttpsPage';
import WhatIsTlsPage from './pages/WhatIsTlsPage';
import HowHttpsWorksPage from './pages/HowHttpsWorksPage';
import TlsHandshakePage from './pages/TlsHandshakePage';
import CertificatesPage from './pages/CertificatesPage';
import EncryptionPage from './pages/EncryptionPage';
import TlsVersionsPage from './pages/TlsVersionsPage';
import ThreatsPage from './pages/ThreatsPage';
import DemoPage from './pages/DemoPage';
import SummaryPage from './pages/SummaryPage';
import ReferencesPage from './pages/ReferencesPage';
import './styles/sidebar.css';
import './styles/header.css';
import './components/PresentationBar.css';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'introduction', label: 'Introduction to HTTPS & TLS', icon: 'BookOpen', num: '1' },
  { id: 'http-vs-https', label: 'HTTP vs HTTPS', icon: 'ArrowLeftRight', num: '2' },
  { id: 'what-is-tls', label: 'What Is TLS?', icon: 'Shield', num: '3' },
  { id: 'how-https-works', label: 'How HTTPS Works', icon: 'Globe', num: '4' },
  { id: 'tls-handshake', label: 'TLS Handshake', icon: 'Network', num: '5' },
  { id: 'certificates', label: 'TLS Certificates & CAs', icon: 'BadgeCheck', num: '6' },
  { id: 'encryption', label: 'Encryption, Auth & Integrity', icon: 'Lock', num: '7' },
  { id: 'tls-versions', label: 'TLS Versions & Security', icon: 'Layers', num: '8' },
  { id: 'threats', label: 'Threats & Misconceptions', icon: 'AlertTriangle', num: '9' },
  { id: 'demo', label: 'Practical Demonstration', icon: 'FlaskConical', num: '10' },
  { id: 'summary', label: 'Summary', icon: 'CheckSquare', num: '11' },
  { id: 'references', label: 'References', icon: 'FileText', num: '12' },
];

const PAGE_MAP = {
  home: HomePage,
  introduction: IntroductionPage,
  'http-vs-https': HttpVsHttpsPage,
  'what-is-tls': WhatIsTlsPage,
  'how-https-works': HowHttpsWorksPage,
  'tls-handshake': TlsHandshakePage,
  certificates: CertificatesPage,
  encryption: EncryptionPage,
  'tls-versions': TlsVersionsPage,
  threats: ThreatsPage,
  demo: DemoPage,
  summary: SummaryPage,
  references: ReferencesPage,
};

function getInitialTheme() {
  const saved = localStorage.getItem('https-tls-theme');
  if (saved) return saved;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

function getInitialSidebarOpen() {
  const saved = localStorage.getItem('https-tls-sidebar');
  if (saved !== null) return saved === 'true';
  return window.innerWidth > 900;
}

function getIsDesktop() {
  return window.innerWidth > 900;
}

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarOpen);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('https-tls-theme', theme);
  }, [theme]);

  // Save sidebar state
  useEffect(() => {
    if (isDesktop) {
      localStorage.setItem('https-tls-sidebar', String(sidebarOpen));
    }
  }, [sidebarOpen, isDesktop]);

  // Presentation mode
  useEffect(() => {
    if (presentationMode) {
      document.body.classList.add('presentation-mode');
    } else {
      document.body.classList.remove('presentation-mode');
    }
  }, [presentationMode]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 900;
      setIsDesktop(desktop);
      if (desktop) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!presentationMode) return;
    const pages = NAV_ITEMS.map(n => n.id);
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setPresentationMode(false);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActivePage(prev => {
          const idx = pages.indexOf(prev);
          return idx < pages.length - 1 ? pages[idx + 1] : prev;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActivePage(prev => {
          const idx = pages.indexOf(prev);
          return idx > 0 ? pages[idx - 1] : prev;
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [presentationMode]);

  const navigate = useCallback((pageId) => {
    setActivePage(pageId);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleSidebar = () => setSidebarOpen(o => !o);
  const togglePresentation = () => setPresentationMode(p => !p);

  const ActivePage = PAGE_MAP[activePage] || HomePage;
  const activeNavItem = NAV_ITEMS.find(n => n.id === activePage);

  // Compute main content margin class
  let mainClass = 'main-content';
  if (isDesktop && !presentationMode) {
    mainClass += sidebarOpen ? ' sidebar-open' : ' sidebar-collapsed';
  }

  return (
    <div className="app-shell">
      <Sidebar
        items={NAV_ITEMS}
        activePage={activePage}
        onNavigate={navigate}
        collapsed={!sidebarOpen}
        mobileOpen={mobileNavOpen}
        onToggleCollapse={toggleSidebar}
        onMobileClose={() => setMobileNavOpen(false)}
        presentationMode={presentationMode}
      />
      {mobileNavOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
      <main
        className={mainClass}
        id="main-content"
        aria-label="Main content"
      >
        <TopHeader
          currentPage={activeNavItem?.label || 'Home'}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleMobileMenu={() => setMobileNavOpen(o => !o)}
          presentationMode={presentationMode}
          onTogglePresentation={togglePresentation}
          onPrint={() => window.print()}
          sidebarOpen={sidebarOpen}
        />
        <ActivePage onNavigate={navigate} theme={theme} />
      </main>

      {/* Fixed bottom navigation bar — only visible in presentation mode */}
      {presentationMode && (
        <PresentationBar
          items={NAV_ITEMS}
          activePage={activePage}
          onNavigate={navigate}
          onExit={() => setPresentationMode(false)}
        />
      )}
    </div>
  );
}
