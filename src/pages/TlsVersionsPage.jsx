import { Layers } from 'lucide-react';

const VERSIONS = [
  {
    name: 'SSL 2.0',
    year: '1995',
    status: 'Obsolete — Do Not Use',
    statusColor: 'var(--color-error)',
    desc: 'The first publicly released version of SSL, developed by Netscape. It had numerous serious cryptographic weaknesses and was deprecated in RFC 6176 (2011). No modern software should support SSL 2.0.',
    details: ['Weak MAC construction', 'No protection against handshake tampering', 'Vulnerable to DROWN attack via weak export cipher suites'],
  },
  {
    name: 'SSL 3.0',
    year: '1996',
    status: 'Obsolete — Do Not Use',
    statusColor: 'var(--color-error)',
    desc: 'A significant redesign of SSL 2.0. Deprecated in RFC 7568 (2015) after the discovery of the POODLE attack, which exploits the CBC padding behavior of SSL 3.0 to decrypt protected data.',
    details: ['Vulnerable to POODLE attack', 'Weak cipher suite support', 'No forward secrecy by design'],
  },
  {
    name: 'TLS 1.0',
    year: '1999',
    status: 'Deprecated — Disable',
    statusColor: 'var(--color-warning)',
    desc: 'Standardized in RFC 2246. Essentially SSL 3.1 with minor changes. Deprecated in RFC 8996 (2021). Vulnerable to BEAST attack under certain configurations. Major browsers dropped support.',
    details: ['Vulnerable to BEAST attack (CBC mode)', 'Weak PRF using MD5 and SHA-1', 'RFC 8996 officially deprecated it'],
  },
  {
    name: 'TLS 1.1',
    year: '2006',
    status: 'Deprecated — Disable',
    statusColor: 'var(--color-warning)',
    desc: 'Standardized in RFC 4346. Added protection against BEAST attack by using explicit IVs. Also deprecated in RFC 8996 (2021) alongside TLS 1.0. No widely deployed systems should use TLS 1.1.',
    details: ['Addresses BEAST via explicit IVs', 'Still uses outdated hash constructions', 'RFC 8996 deprecated it together with TLS 1.0'],
  },
  {
    name: 'TLS 1.2',
    year: '2008',
    status: 'Modern — Acceptable',
    statusColor: 'var(--color-success)',
    desc: 'Standardized in RFC 5246. A substantial improvement: introduced support for SHA-256, AEAD cipher suites, and more flexible cryptographic negotiation. Still widely deployed and acceptable when properly configured.',
    details: [
      'Supports AEAD cipher suites (AES-GCM)',
      'SHA-256 and SHA-384 in PRF',
      'Forward secrecy possible with ECDHE cipher suites',
      'Secure when configured to disable weak cipher suites and old features',
      'Does not mandate forward secrecy — depends on cipher suite selection',
    ],
  },
  {
    name: 'TLS 1.3',
    year: '2018',
    status: 'Recommended — Modern',
    statusColor: 'var(--accent-primary)',
    desc: 'Standardized in RFC 8446. A major redesign that simplified the handshake, removed obsolete and risky features, and made forward secrecy mandatory. The recommended version for all new deployments.',
    details: [
      'Mandatory ephemeral Diffie–Hellman (ECDHE) — forward secrecy by default',
      '1-RTT handshake (faster than TLS 1.2\'s 2-RTT)',
      'Removed RSA key transport, static DH, and weak cipher suites entirely',
      'Encrypts more of the handshake (including certificates)',
      'Supports optional 0-RTT early data (with documented replay risk)',
      'Reduced attack surface through removal of legacy features',
    ],
  },
];

export default function TlsVersionsPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><Layers size={13} /> Section 8</div>
        <h2 className="section-title">TLS Versions &amp; Security</h2>
        <p className="section-subtitle">
          How the TLS protocol evolved from SSL to TLS 1.3, and which versions are still safe to use.
        </p>
      </div>

      <div className="warning-box mb-lg">
        <strong>Important distinction:</strong> SSL and TLS are different protocol versions, not
        interchangeable names. SSL 2.0, SSL 3.0, TLS 1.0, and TLS 1.1 are all deprecated and
        should not be supported by modern servers. Additionally, even TLS 1.2 and TLS 1.3 can
        be misconfigured — version alone does not guarantee security; cipher suite selection and
        server configuration also matter.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {VERSIONS.map(v => (
          <div key={v.name} className="card" style={{
            borderLeft: `4px solid ${v.statusColor}`,
            borderRadius: 'var(--radius-md)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>{v.name}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>({v.year})</span>
              <span style={{
                fontSize: '0.73rem', fontWeight: 800, letterSpacing: '0.04em',
                color: v.statusColor,
                background: `color-mix(in srgb, ${v.statusColor} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${v.statusColor} 35%, transparent)`,
                padding: '0.2rem 0.65rem', borderRadius: '999px',
              }}>{v.status}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.65rem' }}>{v.desc}</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {v.details.map((d, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Why configuration matters */}
      <div className="card mt-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Why Configuration Matters Beyond Protocol Version</h3>
        <p>
          Selecting TLS 1.2 or 1.3 is necessary but not sufficient for a secure server. The
          specific cipher suites, key sizes, certificate types, and feature configurations also
          determine the effective security of the connection. For example:
        </p>
        <ul style={{ marginBottom: '0' }}>
          <li>A TLS 1.2 server that allows export-grade cipher suites or NULL encryption is insecure despite using a modern version.</li>
          <li>A server that supports TLS 1.3 but also still enables SSL 3.0 for "compatibility" undermines the security of the whole setup.</li>
          <li>Certificates using weak key sizes (e.g., RSA-512) are insecure regardless of TLS version.</li>
          <li>Software updates are essential — vulnerabilities are regularly discovered and patched in TLS implementations.</li>
        </ul>
      </div>

      {/* Version summary table */}
      <div className="card mt-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Quick Reference</h3>
        <div className="table-wrapper" style={{ margin: 0 }}>
          <table>
            <thead>
              <tr><th>Version</th><th>Year</th><th>Recommendation</th><th>Key Issue</th></tr>
            </thead>
            <tbody>
              {[
                { v: 'SSL 2.0', y: '1995', r: '❌ Obsolete', i: 'Critical vulnerabilities, DROWN' },
                { v: 'SSL 3.0', y: '1996', r: '❌ Obsolete', i: 'POODLE attack, weak design' },
                { v: 'TLS 1.0', y: '1999', r: '❌ Deprecated (RFC 8996)', i: 'BEAST attack, weak PRF' },
                { v: 'TLS 1.1', y: '2006', r: '❌ Deprecated (RFC 8996)', i: 'Outdated constructions' },
                { v: 'TLS 1.2', y: '2008', r: '✅ Acceptable (with care)', i: 'Needs proper cipher suite config' },
                { v: 'TLS 1.3', y: '2018', r: '✅ Recommended', i: 'Forward secrecy mandatory' },
              ].map(row => (
                <tr key={row.v}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{row.v}</td>
                  <td>{row.y}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.88rem' }}>{row.r}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{row.i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
