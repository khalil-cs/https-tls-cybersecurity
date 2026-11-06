import { ArrowLeftRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Check = () => <CheckCircle size={15} color="var(--color-success)" style={{ flexShrink: 0 }} />;
const Cross = () => <XCircle size={15} color="var(--color-error)" style={{ flexShrink: 0 }} />;
const Warn = () => <AlertCircle size={15} color="var(--color-warning)" style={{ flexShrink: 0 }} />;

const COMPARISON = [
  {
    aspect: 'Protocol name',
    http: 'HTTP (HyperText Transfer Protocol)',
    https: 'HTTPS (HTTP Secure — HTTP over TLS)',
    httpOk: false, httpsOk: true,
  },
  {
    aspect: 'Default port',
    http: '80',
    https: '443',
    httpOk: null, httpsOk: null,
  },
  {
    aspect: 'URL scheme',
    http: 'http://',
    https: 'https://',
    httpOk: null, httpsOk: null,
  },
  {
    aspect: 'Data encryption in transit',
    http: 'None — data sent as plain text',
    https: 'Yes — TLS encrypts all data in transit',
    httpOk: false, httpsOk: true,
  },
  {
    aspect: 'Server authentication',
    http: 'None — no way to verify server identity',
    https: 'Yes — server presents a TLS certificate for validation',
    httpOk: false, httpsOk: true,
  },
  {
    aspect: 'Data integrity',
    http: 'None — data can be silently modified in transit',
    https: 'Yes — TLS detects unauthorized modification',
    httpOk: false, httpsOk: true,
  },
  {
    aspect: 'Requires certificate',
    http: 'No',
    https: 'Yes — a valid TLS certificate from a trusted CA',
    httpOk: null, httpsOk: null,
  },
  {
    aspect: 'Browser address bar',
    http: 'No padlock (often "Not Secure" warning)',
    https: 'Padlock icon when TLS is correctly configured',
    httpOk: false, httpsOk: true,
  },
  {
    aspect: 'Suitable for sensitive data',
    http: 'No — passwords, payments, private data are exposed',
    https: 'Yes — data is protected in transit by TLS',
    httpOk: false, httpsOk: true,
  },
  {
    aspect: 'Guarantees website is trustworthy',
    http: 'No',
    https: 'No — HTTPS confirms the connection is encrypted and the server certificate matched, not that the site is honest or safe',
    httpOk: false, httpsOk: false,
  },
  {
    aspect: 'Common use case',
    http: 'Legacy systems, purely internal non-sensitive local testing',
    https: 'All modern web applications, especially those handling any user data',
    httpOk: null, httpsOk: null,
  },
];

export default function HttpVsHttpsPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><ArrowLeftRight size={13} /> Section 2</div>
        <h2 className="section-title">HTTP vs HTTPS</h2>
        <p className="section-subtitle">
          A clear side-by-side comparison of what changes — and what does not — when TLS is added.
        </p>
      </div>

      {/* Visual comparison */}
      <div className="card-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderColor: 'var(--color-error)', borderWidth: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <XCircle size={20} color="var(--color-error)" />
            <h3 style={{ color: 'var(--color-error)', fontSize: '1.3rem' }}>HTTP</h3>
            <span className="badge badge-error">Unprotected</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Plain-text protocol. Data travels unencrypted between browser and server. 
            No server identity verification. Any party on the network path can 
            read or silently alter the data in transit.
          </p>
          <div className="protocol-box" style={{ marginTop: '0.75rem' }}>
            <span className="msg-label">Example URL</span>
            <span style={{ color: 'var(--color-error)' }}>http://</span>example.com:80
          </div>
        </div>

        <div className="card" style={{ borderColor: 'var(--color-success)', borderWidth: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <CheckCircle size={20} color="var(--color-success)" />
            <h3 style={{ color: 'var(--color-success)', fontSize: '1.3rem' }}>HTTPS</h3>
            <span className="badge badge-success">TLS Protected</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            HTTP running inside a TLS connection. Data is encrypted in transit.
            The server's certificate is validated by the browser. Modifications
            to data in transit can be detected by TLS.
          </p>
          <div className="protocol-box" style={{ marginTop: '0.75rem' }}>
            <span className="msg-label">Example URL</span>
            <span style={{ color: 'var(--color-success)' }}>https://</span>example.com:443
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <h3 style={{ marginBottom: '0.75rem' }}>Detailed Comparison</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Aspect</th>
              <th style={{ width: '36%' }}>
                <span style={{ color: 'var(--color-error)' }}>HTTP</span>
              </th>
              <th style={{ width: '36%' }}>
                <span style={{ color: 'var(--color-success)' }}>HTTPS</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.aspect}>
                <td className="td-label">{row.aspect}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    {row.httpOk === false ? <Cross /> : row.httpOk === true ? <Check /> : null}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{row.http}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    {row.httpsOk === true ? <Check /> : row.httpsOk === false ? <Warn /> : null}
                    <span style={{ fontSize: '0.88rem' }}>{row.https}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Important note */}
      <div className="warning-box mt-lg">
        <strong>Common misconception — HTTPS does not mean a website is safe:</strong>
        <p style={{ marginTop: '0.4rem', marginBottom: 0 }}>
          HTTPS only means that the connection between your browser and the server is encrypted and 
          that the server's certificate matched the hostname. Phishing websites, sites distributing 
          malware, and fraudulent online shops can all obtain valid TLS certificates and use HTTPS. 
          Always evaluate the <em>identity</em> of the website, not just whether it uses HTTPS.
        </p>
      </div>

      {/* HTTP still used? */}
      <div className="card mt-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Is HTTP Still Used?</h3>
        <p>
          Modern browsers increasingly warn users about plain HTTP pages and some block form
          submissions over HTTP entirely. Most public websites and web applications have migrated
          to HTTPS, driven by browser warnings, search-engine ranking preferences, and the
          availability of free certificates through services like Let's Encrypt.
        </p>
        <p style={{ marginBottom: 0 }}>
          HTTP remains in use in some controlled internal environments (such as local development
          servers or purely private networks where TLS certificates would be inconvenient and
          the threat model does not require encryption). For any site handling user data or
          accessible over the public internet, HTTPS is the standard requirement.
        </p>
      </div>
    </div>
  );
}
