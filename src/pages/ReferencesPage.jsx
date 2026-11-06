import { FileText, ExternalLink } from 'lucide-react';

const REFERENCES = [
  {
    category: 'IETF Standards (RFCs)',
    items: [
      {
        title: 'RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3',
        authors: 'E. Rescorla',
        year: '2018',
        url: 'https://www.rfc-editor.org/rfc/rfc8446',
        desc: 'The primary specification for TLS 1.3. Defines the handshake protocol, record layer, cryptographic algorithms, and all normative requirements.',
        type: 'Standard',
      },
      {
        title: 'RFC 9110 — HTTP Semantics',
        authors: 'R. Fielding, M. Nottingham, J. Reschke',
        year: '2022',
        url: 'https://www.rfc-editor.org/rfc/rfc9110',
        desc: 'Defines the semantics of HTTP — methods, status codes, headers, and the request-response model shared by all HTTP versions.',
        type: 'Standard',
      },
      {
        title: 'RFC 9112 — HTTP/1.1',
        authors: 'R. Fielding, J. Reschke',
        year: '2022',
        url: 'https://www.rfc-editor.org/rfc/rfc9112',
        desc: 'Defines the HTTP/1.1 message syntax and connection management, providing the basis for how most legacy HTTP/HTTPS communication is structured.',
        type: 'Standard',
      },
      {
        title: 'RFC 5246 — The TLS Protocol Version 1.2',
        authors: 'T. Dierks, E. Rescorla',
        year: '2008',
        url: 'https://www.rfc-editor.org/rfc/rfc5246',
        desc: 'The specification for TLS 1.2, still widely deployed. Reference for understanding TLS 1.2 behavior and differences from TLS 1.3.',
        type: 'Standard',
      },
      {
        title: 'RFC 8996 — Deprecating TLS 1.0 and TLS 1.1',
        authors: 'K. Moriarty, S. Farrell',
        year: '2021',
        url: 'https://www.rfc-editor.org/rfc/rfc8996',
        desc: 'Formally deprecates TLS 1.0 and TLS 1.1, with rationale for why these versions are no longer acceptable for modern deployments.',
        type: 'Standard',
      },
      {
        title: 'RFC 7568 — Deprecating Secure Sockets Layer Version 3.0',
        authors: 'R. Barnes et al.',
        year: '2015',
        url: 'https://www.rfc-editor.org/rfc/rfc7568',
        desc: 'Formally deprecates SSL 3.0 following the POODLE vulnerability disclosure.',
        type: 'Standard',
      },
    ],
  },
  {
    category: 'Security Guidelines',
    items: [
      {
        title: 'OWASP Transport Layer Security Cheat Sheet',
        authors: 'OWASP Foundation',
        year: 'Ongoing',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html',
        desc: 'Practical guidance on configuring TLS correctly for web applications — cipher suites, certificates, HSTS, and common pitfalls.',
        type: 'Guide',
      },
    ],
  },
  {
    category: 'Developer Documentation',
    items: [
      {
        title: 'MDN Web Docs — HTTPS',
        authors: 'Mozilla',
        year: 'Ongoing',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS',
        desc: 'Accessible explanation of HTTPS for web developers, with links to related concepts including TLS, certificates, and HTTP.',
        type: 'Reference',
      },
      {
        title: 'MDN Web Docs — Transport Layer Security (TLS)',
        authors: 'Mozilla',
        year: 'Ongoing',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security',
        desc: 'Overview of TLS in the web context, including version history, cipher suite guidance, and forward secrecy.',
        type: 'Reference',
      },
      {
        title: 'Cloudflare Learning — What is TLS?',
        authors: 'Cloudflare',
        year: 'Ongoing',
        url: 'https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/',
        desc: 'Beginner-friendly explanation of TLS and how it differs from SSL, suitable for readers new to cryptographic protocols.',
        type: 'Article',
      },
    ],
  },
];

const TYPE_COLORS = {
  Standard: 'var(--accent-primary)',
  Guide: 'var(--color-success)',
  Reference: 'var(--color-warning)',
  Article: 'var(--text-muted)',
};

export default function ReferencesPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><FileText size={13} /> Section 12</div>
        <h2 className="section-title">References</h2>
        <p className="section-subtitle">
          Authoritative sources used in preparing this educational website.
        </p>
      </div>

      <div className="info-box mb-lg">
        All references below are to real documents with working links. RFC documents are canonical
        IETF standards. MDN and OWASP references are authoritative technical resources for web
        developers and security practitioners. No sources have been invented or fabricated.
      </div>

      {REFERENCES.map(category => (
        <div key={category.category} style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>{category.category}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {category.items.map(ref => (
              <div key={ref.url} className="card" style={{ padding: '1.1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontWeight: 700, fontSize: '0.95rem',
                      color: 'var(--text-main)',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      flex: 1,
                    }}
                  >
                    {ref.title}
                    <ExternalLink size={13} style={{ flexShrink: 0, color: 'var(--accent-primary)' }} />
                  </a>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
                    color: TYPE_COLORS[ref.type] || 'var(--text-muted)',
                    background: `color-mix(in srgb, ${TYPE_COLORS[ref.type] || 'var(--text-muted)'} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${TYPE_COLORS[ref.type] || 'var(--text-muted)'} 30%, transparent)`,
                    padding: '0.18rem 0.55rem', borderRadius: '999px', whiteSpace: 'nowrap',
                    alignSelf: 'flex-start',
                  }}>{ref.type}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  {ref.authors} · {ref.year}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 0, lineHeight: 1.6 }}>
                  {ref.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Attribution */}
      <div className="card accent-card" style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '0.6rem' }}>About This Website</h3>
        <div className="kv-list">
          <span className="kv-key">Student</span>
          <span className="kv-value">Khalil Ullah (Roll No. 2662)</span>
          <span className="kv-key">Course</span>
          <span className="kv-value">Cybersecurity — 6th Semester</span>
          <span className="kv-key">Instructor</span>
          <span className="kv-value">Prof: Shah Muhammad Sab</span>
          <span className="kv-key">Institution</span>
          <span className="kv-value">Government Postgraduate Science College (GPSC), Quetta</span>
          <span className="kv-key">Topic</span>
          <span className="kv-value">HTTPS &amp; TLS — Transport Layer Security</span>
          <span className="kv-key">Technology</span>
          <span className="kv-value">React 18, Vite, Lucide React, Custom CSS</span>
        </div>
      </div>
    </div>
  );
}
