import { ShieldCheck, ArrowRight, Globe, Lock, Server, GraduationCap, User, Hash, BookOpen, Building2 } from 'lucide-react';
import './HomePage.css';

export default function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section" aria-label="Introduction">
        <div className="hero-content">
          <div className="hero-badge">
            <ShieldCheck size={14} />
            Cybersecurity Assignment
          </div>

          <h1 className="hero-title">
            HTTPS <span className="hero-amp">&</span> TLS
          </h1>
          <p className="hero-subtitle">
            Understanding Secure Communication on the Web
          </p>
          <p className="hero-description">
            Every time you log in, shop online, or send a private message, a security
            protocol called TLS quietly protects your data. This interactive guide explains
            how HTTPS and TLS work — from certificates and handshakes to encryption and
            the trust chain — in clear, beginner-friendly language.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('introduction')}>
              Start Learning
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('tls-handshake')}>
              TLS Handshake Explorer
            </button>
          </div>
        </div>

        {/* Decorative connection diagram */}
        <div className="hero-diagram" aria-hidden="true">
          <ConnectionDiagram />
        </div>
      </section>

      {/* Feature cards */}
      <section className="features-section">
        <div className="section-page" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
          <h2 className="features-title">What You Will Learn</h2>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                className="feature-card"
                onClick={() => onNavigate(f.id)}
                aria-label={`Go to ${f.title}`}
              >
                <div className="feature-icon" style={{ '--fi-color': f.color }}>
                  {f.icon}
                </div>
                <div className="feature-body">
                  <div className="feature-num">{f.num}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
                <ArrowRight size={14} className="feature-arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Academic info */}
      <section className="academic-section" aria-label="Academic information">
        <div className="section-page" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
          <div className="academic-panel">
            <div className="academic-panel-header">
              <GraduationCap size={20} />
              <span>Academic Information</span>
            </div>
            <div className="academic-grid">
              <AcademicItem icon={<User size={15} />} label="Student" value="Khalil Ullah" />
              <AcademicItem icon={<Hash size={15} />} label="Roll Number" value="2662" />
              <AcademicItem icon={<BookOpen size={15} />} label="Course" value="Cybersecurity" />
              <AcademicItem icon={<GraduationCap size={15} />} label="Semester" value="6th Semester" />
              <AcademicItem icon={<User size={15} />} label="Instructor" value="Prof: Shah Muhammad Sab" />
              <AcademicItem icon={<Building2 size={15} />} label="Institution" value="Govt. Postgraduate Science College (GPSC), Quetta" />
            </div>
            <div className="academic-footer">
              <div className="topic-badge">
                <Lock size={13} />
                Topic: HTTPS &amp; TLS — Transport Layer Security
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AcademicItem({ icon, label, value }) {
  return (
    <div className="academic-item">
      <div className="academic-item-icon">{icon}</div>
      <div>
        <div className="academic-item-label">{label}</div>
        <div className="academic-item-value">{value}</div>
      </div>
    </div>
  );
}

function ConnectionDiagram() {
  return (
    <svg viewBox="0 0 340 220" className="connection-svg" aria-label="Browser to server HTTPS connection diagram">
      {/* Background glow */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#45C4B0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#45C4B0" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="340" height="220" fill="url(#bgGrad)" rx="12" />

      {/* Browser box */}
      <rect x="12" y="70" width="100" height="80" rx="8" fill="#1D3036" stroke="#344C50" strokeWidth="1.5" />
      <rect x="12" y="70" width="100" height="20" rx="8" fill="#263C42" />
      <rect x="12" y="78" width="100" height="12" fill="#263C42" />
      <circle cx="23" cy="80" r="3" fill="#F18B8B" opacity="0.8" />
      <circle cx="33" cy="80" r="3" fill="#F1C66D" opacity="0.8" />
      <circle cx="43" cy="80" r="3" fill="#70D6A5" opacity="0.8" />
      {/* URL bar */}
      <rect x="50" y="75.5" width="54" height="9" rx="2.5" fill="#344C50" />
      <text x="53" y="82" fontSize="5" fill="#45C4B0" fontFamily="monospace">🔒 https://</text>
      {/* Page lines */}
      <rect x="20" y="100" width="60" height="4" rx="2" fill="#344C50" />
      <rect x="20" y="110" width="40" height="4" rx="2" fill="#344C50" />
      <rect x="20" y="120" width="52" height="4" rx="2" fill="#344C50" />
      <rect x="20" y="130" width="35" height="4" rx="2" fill="#344C50" />
      <text x="62" y="134" fontSize="7" fill="#70D6A5" fontFamily="sans-serif" fontWeight="600">Browser</text>

      {/* Server box */}
      <rect x="228" y="70" width="100" height="80" rx="8" fill="#1D3036" stroke="#344C50" strokeWidth="1.5" />
      <rect x="238" y="82" width="80" height="8" rx="3" fill="#263C42" />
      <rect x="238" y="96" width="80" height="8" rx="3" fill="#263C42" />
      <rect x="238" y="110" width="80" height="8" rx="3" fill="#263C42" />
      <circle cx="244" cy="86" r="3" fill="#45C4B0" opacity="0.7" />
      <circle cx="244" cy="100" r="3" fill="#45C4B0" opacity="0.5" />
      <circle cx="244" cy="114" r="3" fill="#70D6A5" opacity="0.6" />
      <text x="260" y="140" fontSize="7" fill="#70D6A5" fontFamily="sans-serif" fontWeight="600">Web Server</text>

      {/* TLS arrows */}
      {/* Arrow right (request) */}
      <line x1="114" y1="100" x2="226" y2="100" stroke="#45C4B0" strokeWidth="1.5" strokeDasharray="5,3" filter="url(#glow)" />
      <polygon points="222,96 230,100 222,104" fill="#45C4B0" />
      <text x="165" y="95" fontSize="6.5" fill="#45C4B0" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">HTTPS Request</text>

      {/* Arrow left (response) */}
      <line x1="226" y1="120" x2="114" y2="120" stroke="#A7E8D8" strokeWidth="1.5" strokeDasharray="5,3" />
      <polygon points="118,116 110,120 118,124" fill="#A7E8D8" />
      <text x="165" y="134" fontSize="6.5" fill="#A7E8D8" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">Encrypted Response</text>

      {/* TLS shield badge */}
      <g transform="translate(152,96)">
        <rect x="-18" y="-14" width="36" height="28" rx="6" fill="#101B20" stroke="#45C4B0" strokeWidth="1.2" />
        <text x="0" y="-2" fontSize="7.5" fill="#45C4B0" textAnchor="middle" fontFamily="sans-serif" fontWeight="800">TLS</text>
        <text x="0" y="8" fontSize="5.5" fill="#A7E8D8" textAnchor="middle" fontFamily="sans-serif">1.3</text>
      </g>

      {/* Certificate icon */}
      <g transform="translate(170,175)">
        <rect x="-38" y="-18" width="76" height="32" rx="6" fill="#1D3036" stroke="#344C50" strokeWidth="1" />
        <text x="0" y="-4" fontSize="6" fill="#B1C5C4" textAnchor="middle" fontFamily="sans-serif">🔐 Certificate Validated</text>
        <text x="0" y="8" fontSize="5.5" fill="#70D6A5" textAnchor="middle" fontFamily="sans-serif">Connection Encrypted</text>
      </g>
    </svg>
  );
}

const FEATURES = [
  {
    id: 'introduction',
    num: '01',
    title: 'Introduction',
    desc: 'What HTTPS and TLS are, why they matter, and how they relate to each other.',
    color: 'var(--accent-primary)',
    icon: <BookOpen size={20} />,
  },
  {
    id: 'http-vs-https',
    num: '02',
    title: 'HTTP vs HTTPS',
    desc: 'A clear side-by-side comparison of what changes when TLS is added.',
    color: '#F1C66D',
    icon: <Globe size={20} />,
  },
  {
    id: 'tls-handshake',
    num: '05',
    title: 'TLS Handshake Explorer',
    desc: 'Step through the TLS 1.3 handshake interactively with browser/server lanes.',
    color: 'var(--accent-secondary)',
    icon: <ShieldCheck size={20} />,
  },
  {
    id: 'certificates',
    num: '06',
    title: 'Certificates & CAs',
    desc: 'How digital certificates work, who issues them, and how your browser trusts them.',
    color: '#70D6A5',
    icon: <Lock size={20} />,
  },
  {
    id: 'demo',
    num: '10',
    title: 'Practical Demo',
    desc: 'An interactive simulation of certificate validation scenarios and HTTPS connections.',
    color: '#F18B8B',
    icon: <Server size={20} />,
  },
  {
    id: 'threats',
    num: '09',
    title: 'Threats & Misconceptions',
    desc: 'Common attacks, security myths, and what HTTPS cannot protect you from.',
    color: '#F1C66D',
    icon: <ShieldCheck size={20} />,
  },
];
