import { useState } from 'react';
import { FlaskConical, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import './DemoPage.css';

// ---- HTTP vs HTTPS visual comparison ----
function ConnectionVisual({ type }) {
  const isHttps = type === 'https';
  return (
    <div className={`conn-visual ${isHttps ? 'conn-https' : 'conn-http'}`}>
      <div className="conn-endpoint">
        <div className="conn-icon">🖥️</div>
        <div className="conn-label">Browser</div>
      </div>

      <div className="conn-channel">
        <div className="conn-channel-line">
          {isHttps ? (
            <>
              <div className="conn-packet encrypted">🔒 Encrypted</div>
              <div className="conn-packet encrypted">🔒 Encrypted</div>
            </>
          ) : (
            <>
              <div className="conn-packet plain">📄 Plain Text</div>
              <div className="conn-packet plain">📄 Plain Text</div>
            </>
          )}
        </div>
        <div className="conn-protocol-label">
          {isHttps ? (
            <span className="badge badge-success">HTTPS · TLS 1.3 · Port 443</span>
          ) : (
            <span className="badge badge-error">HTTP · No Encryption · Port 80</span>
          )}
        </div>
        {!isHttps && (
          <div className="conn-attacker">
            <span>👁️ Attacker can read traffic</span>
          </div>
        )}
      </div>

      <div className="conn-endpoint">
        <div className="conn-icon">🗄️</div>
        <div className="conn-label">Server</div>
      </div>
    </div>
  );
}

// ---- Certificate simulation ----
const CERT_SCENARIOS = [
  {
    id: 'valid',
    label: '✅ Valid Certificate',
    status: 'valid',
    certDetails: {
      subject: 'example.com',
      issuer: 'Let\'s Encrypt Authority X3',
      validFrom: '2026-09-15',
      validUntil: '2026-12-14',
      visitingDomain: 'example.com',
    },
    checks: [
      { label: 'Hostname match', ok: true, note: 'Certificate covers example.com ✓' },
      { label: 'Not expired', ok: true, note: 'Valid until 2026-12-14 ✓' },
      { label: 'Trusted CA', ok: true, note: 'Issued by Let\'s Encrypt (trusted root) ✓' },
      { label: 'Chain integrity', ok: true, note: 'Certificate chain verified ✓' },
    ],
    browserResponse: {
      type: 'success',
      icon: '🔒',
      title: 'Connection is secure',
      body: 'The browser displays a padlock in the address bar. All conditions passed: the hostname matches, the certificate is valid and not expired, and the issuer is a trusted CA. The connection proceeds normally.',
    },
  },
  {
    id: 'expired',
    label: '⏰ Expired Certificate',
    status: 'error',
    certDetails: {
      subject: 'example.com',
      issuer: 'Let\'s Encrypt Authority X3',
      validFrom: '2025-06-01',
      validUntil: '2025-09-01',
      visitingDomain: 'example.com',
    },
    checks: [
      { label: 'Hostname match', ok: true, note: 'Certificate covers example.com ✓' },
      { label: 'Not expired', ok: false, note: 'Certificate expired on 2025-09-01 ✗' },
      { label: 'Trusted CA', ok: true, note: 'Issuer would be trusted if cert were valid ✓' },
      { label: 'Chain integrity', ok: false, note: 'Validation fails due to expiry ✗' },
    ],
    browserResponse: {
      type: 'error',
      icon: '⚠️',
      title: 'Your connection is not private',
      body: 'The browser blocks the connection and shows a warning. The certificate has expired, which means the server\'s identity can no longer be verified. This may be a server misconfiguration (forgot to renew the cert) or, less commonly, a sign of a compromised connection. Users should not proceed without understanding the risk.',
    },
  },
  {
    id: 'mismatch',
    label: '🔀 Hostname Mismatch',
    status: 'error',
    certDetails: {
      subject: 'other-site.com',
      issuer: 'DigiCert Inc.',
      validFrom: '2026-01-01',
      validUntil: '2027-01-01',
      visitingDomain: 'example.com',
    },
    checks: [
      { label: 'Hostname match', ok: false, note: 'Certificate is for other-site.com, not example.com ✗' },
      { label: 'Not expired', ok: true, note: 'Certificate is within its validity period ✓' },
      { label: 'Trusted CA', ok: true, note: 'Issued by DigiCert (trusted CA) ✓' },
      { label: 'Chain integrity', ok: false, note: 'Validation fails due to hostname mismatch ✗' },
    ],
    browserResponse: {
      type: 'error',
      icon: '⚠️',
      title: 'Certificate hostname mismatch',
      body: 'The browser shows a warning because the certificate does not cover the domain being visited. This could indicate a server misconfiguration (wrong certificate installed) or a potential MITM attack where an attacker is presenting a certificate for a domain they control. Do not proceed without a specific, informed reason.',
    },
  },
  {
    id: 'untrusted',
    label: '🔓 Untrusted Issuer',
    status: 'warning',
    certDetails: {
      subject: 'example.com',
      issuer: 'Self-Signed Certificate',
      validFrom: '2026-10-01',
      validUntil: '2027-10-01',
      visitingDomain: 'example.com',
    },
    checks: [
      { label: 'Hostname match', ok: true, note: 'Certificate covers example.com ✓' },
      { label: 'Not expired', ok: true, note: 'Certificate is within validity period ✓' },
      { label: 'Trusted CA', ok: false, note: 'Self-signed — not in browser trust store ✗' },
      { label: 'Chain integrity', ok: false, note: 'No trusted root found in chain ✗' },
    ],
    browserResponse: {
      type: 'warning',
      icon: '🔓',
      title: 'Certificate not trusted',
      body: 'The browser warns that the certificate was not issued by a trusted CA. This is common for self-signed certificates used in development environments or internal tools. For public-facing websites, this indicates either a misconfiguration or that someone is intercepting the connection with their own certificate. Only proceed if you explicitly trust this certificate for a known reason.',
    },
  },
];

export default function DemoPage() {
  const [connType, setConnType] = useState('https');
  const [selectedCert, setSelectedCert] = useState('valid');

  const scenario = CERT_SCENARIOS.find(s => s.id === selectedCert);

  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><FlaskConical size={13} /> Section 10</div>
        <h2 className="section-title">Practical Demonstration</h2>
        <p className="section-subtitle">
          Interactive simulations for learning — no real data, no backend required.
        </p>
      </div>

      <div className="warning-box mb-lg">
        <strong>Simulation Notice:</strong> Everything on this page is a browser-based educational
        simulation. No real certificate validation, network scanning, or external connections are
        performed. Example data is illustrative only.
      </div>

      {/* ---- Demo 1: HTTP vs HTTPS ---- */}
      <section aria-labelledby="conn-demo-title">
        <h3 id="conn-demo-title" style={{ marginBottom: '0.5rem' }}>Demo 1: HTTP vs HTTPS Connection</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.92rem' }}>
          Toggle between HTTP and HTTPS to see the difference in how data travels.
        </p>

        <div className="demo-toggle-row">
          <button
            className={`btn ${connType === 'http' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setConnType('http')}
            aria-pressed={connType === 'http'}
          >HTTP</button>
          <button
            className={`btn ${connType === 'https' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setConnType('https')}
            aria-pressed={connType === 'https'}
          >HTTPS</button>
        </div>

        <ConnectionVisual type={connType} />

        {connType === 'http' ? (
          <div className="error-box">
            <strong>HTTP — Data Unprotected:</strong> The communication between browser and server
            is in plain text. Anyone on the network path (router, ISP, shared Wi-Fi) can read
            the content of requests and responses, including any credentials or personal data sent.
          </div>
        ) : (
          <div className="success-box">
            <strong>HTTPS — Data Protected in Transit:</strong> TLS encrypts all communication.
            An observer on the network can see that a connection to the server was made, but
            cannot read the content of the HTTP requests or responses.
          </div>
        )}
      </section>

      <hr className="divider" />

      {/* ---- Demo 2: Certificate Validation Simulation ---- */}
      <section aria-labelledby="cert-demo-title">
        <h3 id="cert-demo-title" style={{ marginBottom: '0.5rem' }}>Demo 2: Certificate Validation Simulation</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.92rem' }}>
          Select a certificate scenario to see how a browser validates a TLS certificate and what
          it does when validation fails.
        </p>

        <div className="cert-controls">
          {CERT_SCENARIOS.map(s => (
            <button
              key={s.id}
              className={`btn ${selectedCert === s.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setSelectedCert(s.id)}
              aria-pressed={selectedCert === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>

        {scenario && (
          <div className="cert-simulation">
            {/* Certificate panel */}
            <div className="cert-panel">
              <div className="cert-panel-header">
                <span>🔐 Certificate Details (Simulated)</span>
              </div>
              <div className="cert-panel-body">
                <div className="kv-list">
                  <span className="kv-key">Visiting</span>
                  <span className="kv-value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>https://{scenario.certDetails.visitingDomain}</span>
                  <span className="kv-key">Subject (CN)</span>
                  <span className="kv-value" style={{ fontFamily: 'var(--font-mono)' }}>{scenario.certDetails.subject}</span>
                  <span className="kv-key">Issuer</span>
                  <span className="kv-value">{scenario.certDetails.issuer}</span>
                  <span className="kv-key">Valid From</span>
                  <span className="kv-value">{scenario.certDetails.validFrom}</span>
                  <span className="kv-key">Valid Until</span>
                  <span className="kv-value">{scenario.certDetails.validUntil}</span>
                </div>
              </div>
            </div>

            {/* Validation checks */}
            <div className="cert-checks">
              <h4 style={{ marginBottom: '0.75rem' }}>Browser Validation Checks</h4>
              {scenario.checks.map((check) => (
                <div key={check.label} className="cert-check-row">
                  {check.ok
                    ? <CheckCircle size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
                    : <XCircle size={16} color="var(--color-error)" style={{ flexShrink: 0 }} />
                  }
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{check.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{check.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Browser response */}
            <div className={`browser-response browser-response-${scenario.browserResponse.type}`}>
              <div className="browser-chrome">
                <div className="browser-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="browser-url-bar">
                  <span className={`lock-icon ${scenario.browserResponse.type}`}>
                    {scenario.browserResponse.icon}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    https://{scenario.certDetails.visitingDomain}
                  </span>
                </div>
              </div>
              <div className="browser-body">
                <div className="browser-warning-title">{scenario.browserResponse.title}</div>
                <div className="browser-warning-body">{scenario.browserResponse.body}</div>
              </div>
            </div>
          </div>
        )}
      </section>

      <hr className="divider" />

      {/* ---- Tip: Viewing real certificates ---- */}
      <section>
        <div className="card">
          <h3 style={{ marginBottom: '0.75rem' }}>How to View a Real Certificate in Your Browser</h3>
          <p>
            You can inspect the TLS certificate of any HTTPS website using your browser's built-in
            tools — no special software required.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
            {[
              { browser: 'Chrome / Edge', steps: ['Click the padlock icon in the address bar', 'Select "Connection is secure"', 'Click "Certificate is valid"'] },
              { browser: 'Firefox', steps: ['Click the padlock icon', 'Click "Connection secure"', 'Click "More information"', 'Then "View Certificate"'] },
              { browser: 'Safari (macOS)', steps: ['Click the padlock icon', 'Click "Show Certificate"', 'Review certificate details'] },
            ].map(b => (
              <div key={b.browser} style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '0.85rem', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>{b.browser}</h4>
                <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  {b.steps.map((s, i) => <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '0.85rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 0 }}>
            Browser UI menus change across versions. If these steps do not exactly match your browser,
            search for "view certificate [browser name]" using your browser's current version number.
          </p>
        </div>
      </section>
    </div>
  );
}
