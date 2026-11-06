import { Globe } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: 'User Requests an HTTPS Website',
    desc: 'The user types an HTTPS URL (e.g., https://example.com) or clicks an HTTPS link. The browser resolves the domain name to an IP address via DNS and opens a TCP connection to port 443 on the server.',
    detail: 'At this point, no HTTP has been sent yet. The browser is preparing to establish a TLS connection first.',
  },
  {
    num: 2,
    title: 'TLS Connection Setup Begins',
    desc: 'The browser initiates the TLS handshake by sending a ClientHello message. This message announces the TLS version the browser supports (at minimum TLS 1.3) and the cryptographic algorithms it can use.',
    detail: 'The ClientHello also includes a random value and key share information needed for key agreement.',
  },
  {
    num: 3,
    title: 'Cryptographic Parameters Are Negotiated',
    desc: 'The server responds with a ServerHello, selecting the TLS version and cryptographic algorithms (cipher suite) to use. The server also provides its own key share for the Diffie–Hellman key agreement.',
    detail: 'By the end of ServerHello, both sides have what they need to compute the same shared secret. Encryption begins immediately after ServerHello in TLS 1.3.',
  },
  {
    num: 4,
    title: 'Server Provides Its Certificate',
    desc: 'The server sends its digital certificate, which contains the server\'s public key and identity information (domain name, organization details, validity period). The certificate is signed by a Certificate Authority (CA).',
    detail: 'The server also sends a CertificateVerify message — a cryptographic signature proving it holds the private key corresponding to the public key in the certificate.',
  },
  {
    num: 5,
    title: 'Browser Validates the Certificate',
    desc: 'The browser checks: (a) Is the certificate signed by a trusted CA in its trust store? (b) Does the certificate\'s domain match the website being visited? (c) Has the certificate expired? (d) Has it been revoked?',
    detail: 'If any check fails, the browser displays a security warning and typically prevents the user from proceeding without an explicit override. Users should not casually bypass these warnings.',
  },
  {
    num: 6,
    title: 'Handshake Completes — Session Keys Established',
    desc: 'Both sides send Finished messages to confirm that the handshake completed successfully. By this point, both the browser and server have independently derived the same set of symmetric session keys.',
    detail: 'No secret was ever sent across the network. The shared secret was computed using ephemeral Diffie–Hellman key agreement, providing forward secrecy.',
  },
  {
    num: 7,
    title: 'HTTP Requests and Responses Are Sent Over TLS',
    desc: 'Now that the TLS connection is established, the browser sends HTTP requests (GET, POST, etc.) and receives HTTP responses — all encrypted and integrity-protected by TLS.',
    detail: 'To the application layer, this looks like a normal HTTP exchange. TLS is transparent to HTTP; it operates below HTTP in the network stack.',
  },
];

export default function HowHttpsWorksPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><Globe size={13} /> Section 4</div>
        <h2 className="section-title">How HTTPS Works</h2>
        <p className="section-subtitle">
          A step-by-step walkthrough of what happens when your browser connects to an HTTPS website.
        </p>
      </div>

      <div className="info-box mb-lg">
        <strong>Overview:</strong> When you connect to an HTTPS site, two things happen in sequence:
        first, a TLS connection is established (the handshake); then, HTTP communication takes place
        inside that protected connection. The steps below walk through this process.
      </div>

      <div className="step-list">
        {STEPS.map((step) => (
          <div key={step.num} className="card" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div className="step-number" style={{ flexShrink: 0 }}>{step.num}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.4rem' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{step.desc}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
                  {step.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-lg accent-card">
        <h3 style={{ marginBottom: '0.75rem' }}>The Key Insight: TLS Is Transparent to HTTP</h3>
        <p>
          One elegant aspect of HTTPS is that HTTP itself is unchanged. HTTP does not know or care
          whether it is running over a plain TCP connection or a TLS connection. TLS sits between
          TCP and HTTP, providing a secure tunnel. The browser writes HTTP requests to the TLS layer,
          which encrypts them before sending, and the server receives encrypted data, which TLS
          decrypts before passing to the HTTP layer.
        </p>
        <p style={{ marginBottom: 0 }}>
          This separation of concerns means that any application protocol (not just HTTP) can be
          secured by running it over TLS, and that HTTP applications do not need to implement
          their own cryptography — they rely on TLS for that.
        </p>
      </div>
    </div>
  );
}
