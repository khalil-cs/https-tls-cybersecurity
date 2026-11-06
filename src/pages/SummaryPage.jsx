import { CheckSquare } from 'lucide-react';

const TAKEAWAYS = [
  {
    num: '01',
    title: 'HTTPS is HTTP over TLS',
    body: 'HTTPS is not a separate protocol — it is ordinary HTTP running inside a TLS-encrypted channel. TLS is the security layer; HTTP is the application protocol. The two are distinct but work together.',
  },
  {
    num: '02',
    title: 'TLS provides confidentiality, integrity, and authentication',
    body: 'Confidentiality (encryption of data in transit), integrity (detection of tampering), and server authentication (certificate validation) are the three properties TLS is designed to provide. Each has specific mechanisms and limitations.',
  },
  {
    num: '03',
    title: 'TLS 1.3 is the modern standard — older versions are obsolete',
    body: 'SSL 2.0, SSL 3.0, TLS 1.0, and TLS 1.1 are all deprecated and insecure. TLS 1.2 is acceptable with careful configuration. TLS 1.3 mandates forward secrecy via ephemeral Diffie–Hellman and removes most historical weaknesses.',
  },
  {
    num: '04',
    title: 'HTTPS does not guarantee a website is trustworthy',
    body: 'A padlock only confirms that the connection is encrypted and the server\'s certificate was validated. It does not verify that the operator is honest, legitimate, or not engaged in phishing. Always verify the full domain name.',
  },
  {
    num: '05',
    title: 'Do not ignore certificate warnings',
    body: 'Browser warnings about certificate errors (expiry, hostname mismatch, untrusted issuer) exist to protect users. Do not bypass them unless you have a specific, informed technical reason. They can indicate real attacks.',
  },
];

const SUMMARY_ITEMS = [
  { label: 'HTTPS', detail: 'HTTP + TLS — the secure web protocol' },
  { label: 'TLS', detail: 'Transport Layer Security — the cryptographic protocol' },
  { label: 'Certificate', detail: 'Binds a public key to a domain name; signed by a CA' },
  { label: 'CA', detail: 'Certificate Authority — trusted issuer of certificates' },
  { label: 'Handshake', detail: 'TLS 1.3 uses 1-RTT with ECDHE for forward secrecy' },
  { label: 'Confidentiality', detail: 'Symmetric encryption (AES-GCM, ChaCha20-Poly1305)' },
  { label: 'Integrity', detail: 'AEAD — authenticated encryption detects tampering' },
  { label: 'Authentication', detail: 'Certificate + CertificateVerify proves server identity' },
  { label: 'Forward Secrecy', detail: 'Ephemeral keys; past sessions safe if key is later leaked' },
  { label: 'Certificate Chain', detail: 'Website cert → Intermediate CA → Trusted Root CA' },
];

export default function SummaryPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><CheckSquare size={13} /> Section 11</div>
        <h2 className="section-title">Summary</h2>
        <p className="section-subtitle">
          Key concepts at a glance — suitable for quick revision before an exam.
        </p>
      </div>

      {/* Visual concept map */}
      <div className="card mb-lg accent-card">
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>HTTPS &amp; TLS at a Glance</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.65rem' }}>
          {SUMMARY_ITEMS.map(item => (
            <div key={item.label} style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 0.9rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '0.88rem',
                color: 'var(--accent-primary)',
                marginBottom: '0.2rem',
              }}>{item.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Five key takeaways */}
      <h3 style={{ marginBottom: '1rem' }}>Five Key Takeaways</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
        {TAKEAWAYS.map(t => (
          <div key={t.num} className="card" style={{
            display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.1rem 1.25rem'
          }}>
            <div style={{
              flexShrink: 0, fontFamily: 'var(--font-mono)', fontWeight: 900,
              fontSize: '1.4rem', color: 'var(--accent-primary)', lineHeight: 1,
              minWidth: '2.5rem',
            }}>{t.num}</div>
            <div>
              <h4 style={{ marginBottom: '0.3rem' }}>{t.title}</h4>
              <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Protocol stack recap */}
      <div className="card">
        <h3 style={{ marginBottom: '0.85rem' }}>The HTTPS Protocol Stack</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            { label: 'Application Layer', sublabel: 'HTTP', color: 'var(--color-warning)', desc: 'GET /page HTTP/1.1, Host: example.com, Headers, Body...' },
            { label: 'Security Layer', sublabel: 'TLS 1.3', color: 'var(--accent-primary)', desc: 'Encryption (AES-GCM), Integrity (AEAD), Authentication (X.509)' },
            { label: 'Transport Layer', sublabel: 'TCP', color: 'var(--color-success)', desc: 'Reliable delivery — Port 443 for HTTPS, Port 80 for HTTP' },
            { label: 'Network Layer', sublabel: 'IP', color: 'var(--text-muted)', desc: 'Routing packets across the internet' },
          ].map(layer => (
            <div key={layer.label} style={{
              display: 'flex', gap: '1rem', alignItems: 'center',
              background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)',
              padding: '0.65rem 1rem',
              border: `1px solid color-mix(in srgb, ${layer.color} 20%, var(--border-color))`,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontWeight: 800,
                color: layer.color, minWidth: '70px', fontSize: '0.88rem'
              }}>{layer.sublabel}</div>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>{layer.label}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{layer.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
