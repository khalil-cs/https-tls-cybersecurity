import { Lock, Eye, Shield } from 'lucide-react';

const PILLARS = [
  {
    icon: <Eye size={28} />,
    title: 'Confidentiality',
    subtitle: 'Data Encryption in Transit',
    color: 'var(--accent-primary)',
    colorMix: '#45C4B0',
    summary: 'Helps prevent unauthorized parties from reading protected data while it travels between the browser and the server.',
    details: [
      'TLS uses symmetric encryption (e.g., AES-128-GCM or ChaCha20-Poly1305) to encrypt all application data exchanged after the handshake.',
      'An attacker observing network traffic sees only encrypted ciphertext — not the content of HTTP requests or responses.',
      'Encryption keys are derived fresh for each TLS session using ephemeral Diffie–Hellman key agreement, providing forward secrecy.',
      'Confidentiality protects data in transit. It does not protect data stored on the server or at the client after the TLS connection is closed.',
    ],
    limitation: 'Encryption of the TLS channel does not protect against vulnerabilities on the server itself, application-layer attacks, or data exposure after it reaches the server.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Authentication',
    subtitle: 'Server Identity Verification',
    color: 'var(--color-warning)',
    colorMix: '#F1C66D',
    summary: 'Allows a browser to verify the server\'s identity through certificate validation and the TLS handshake.',
    details: [
      'The server presents a digital certificate containing its public key and domain name(s), signed by a trusted Certificate Authority.',
      'The browser checks that the certificate is signed by a CA in its trust store, that it covers the hostname being connected to, and that it has not expired or been revoked.',
      'The server proves ownership of the certificate\'s private key by signing a handshake transcript (CertificateVerify message).',
      'This process helps protect against impersonation attacks — it gives confidence that the server you are talking to is actually the intended server.',
    ],
    limitation: 'Authentication confirms that the server controls a certificate for that domain — not that the website\'s operator is trustworthy, honest, or acting in your interest. Phishing sites can obtain valid certificates.',
  },
  {
    icon: <Lock size={28} />,
    title: 'Integrity',
    subtitle: 'Tamper Detection in Transit',
    color: 'var(--color-success)',
    colorMix: '#70D6A5',
    summary: 'Helps detect unauthorized modification or corruption of protected data while it travels across the network.',
    details: [
      'TLS uses authenticated encryption (e.g., AES-GCM or ChaCha20-Poly1305 in AEAD mode) that combines encryption with a Message Authentication Code (MAC).',
      'If any byte of a TLS record is altered by a third party during transit, the authentication tag verification fails and the connection is terminated.',
      'This prevents injection of malicious content into a web page or API response, and prevents silent data corruption.',
      'Integrity protection applies to the TLS record layer — the channel between browser and server. It does not protect data once it has been delivered.',
    ],
    limitation: 'Integrity protection applies to the TLS transport channel. It cannot prevent a server from intentionally sending incorrect or malicious data, and it does not protect against every class of application vulnerability.',
  },
];

export default function EncryptionPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><Lock size={13} /> Section 7</div>
        <h2 className="section-title">Encryption, Authentication &amp; Integrity</h2>
        <p className="section-subtitle">
          The three security properties that TLS provides — what each one means, how it works,
          and what it does not cover.
        </p>
      </div>

      <div className="info-box mb-lg">
        TLS is designed to address three distinct security goals simultaneously. Understanding
        what each property does — and crucially, what it does <em>not</em> guarantee — is
        important for realistic security thinking.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {PILLARS.map(p => (
          <div key={p.title} className="card" style={{ borderColor: `color-mix(in srgb, ${p.color} 30%, var(--border-color))`, borderWidth: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{
                flexShrink: 0,
                width: 60, height: 60, borderRadius: 'var(--radius-lg)',
                background: `color-mix(in srgb, ${p.color} 15%, var(--bg-elevated))`,
                border: `2px solid ${p.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color,
              }}>
                {p.icon}
              </div>
              <div>
                <h3 style={{ color: p.color, marginBottom: '0.15rem' }}>{p.title}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.subtitle}</div>
              </div>
            </div>

            <div style={{
              background: `color-mix(in srgb, ${p.color} 8%, var(--bg-elevated))`,
              border: `1px solid color-mix(in srgb, ${p.color} 20%, var(--border-color))`,
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              marginBottom: '1rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              fontSize: '0.95rem',
            }}>
              {p.summary}
            </div>

            <ul style={{ marginBottom: '1rem' }}>
              {p.details.map((d, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.92rem', color: 'var(--text-main)' }}>{d}</li>
              ))}
            </ul>

            <div style={{
              borderLeft: `3px solid color-mix(in srgb, ${p.color} 60%, var(--color-warning))`,
              background: `color-mix(in srgb, var(--color-warning) 6%, var(--bg-card))`,
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              padding: '0.7rem 1rem',
            }}>
              <strong style={{ fontSize: '0.82rem', color: 'var(--color-warning)' }}>LIMITATION: </strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{p.limitation}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TLS scope */}
      <div className="card mt-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>What TLS Protects vs. What It Does Not</h3>
        <div className="table-wrapper" style={{ margin: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Scenario</th>
                <th>TLS Helps?</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: 'Eavesdropper reading HTTP data on the network', helps: '✅ Yes', note: 'TLS encrypts data in transit' },
                { scenario: 'Attacker modifying data between browser and server', helps: '✅ Yes', note: 'TLS integrity detection closes the connection' },
                { scenario: 'Browser verifying server is who it claims to be', helps: '✅ Yes', note: 'Certificate validation + CertificateVerify' },
                { scenario: 'SQL injection attack on the server', helps: '❌ No', note: 'Application-layer vulnerability, not a transit issue' },
                { scenario: 'Phishing — fake website with valid certificate', helps: '❌ No', note: 'DV certs confirm domain control, not legitimacy' },
                { scenario: 'Server data breach (database leak)', helps: '❌ No', note: 'Data at rest is not protected by TLS' },
                { scenario: 'Malware on the user\'s device', helps: '❌ No', note: 'TLS cannot protect a compromised endpoint' },
                { scenario: 'XSS — injected scripts in the web application', helps: '❌ No', note: 'Application-layer vulnerability' },
              ].map(row => (
                <tr key={row.scenario}>
                  <td style={{ fontSize: '0.88rem' }}>{row.scenario}</td>
                  <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{row.helps}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
