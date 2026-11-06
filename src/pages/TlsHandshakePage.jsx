import { useState } from 'react';
import { Network, ChevronLeft, ChevronRight, RotateCcw, Monitor, Server } from 'lucide-react';
import './TlsHandshakePage.css';

const STEPS = [
  {
    id: 'client-hello',
    title: 'ClientHello',
    from: 'client',
    description: 'The browser initiates the TLS handshake. It sends a ClientHello message to the server containing:',
    points: [
      'The highest TLS version it supports (e.g., TLS 1.3)',
      'A list of supported cipher suites (algorithm combinations)',
      'A client random nonce (a fresh random value)',
      'Key share entries for supported Diffie–Hellman groups (e.g., X25519, P-256)',
    ],
    note: 'The key shares allow TLS 1.3 to begin computing the shared secret in the same round-trip as the hello, enabling the 1-RTT handshake.',
    arrowDir: 'right',
  },
  {
    id: 'server-hello',
    title: 'ServerHello',
    from: 'server',
    description: 'The server responds with a ServerHello message containing:',
    points: [
      'The selected TLS version (TLS 1.3)',
      'The selected cipher suite (e.g., TLS_AES_128_GCM_SHA256)',
      'A server random nonce',
      'The server\'s key share for the agreed Diffie–Hellman group',
    ],
    note: 'After exchanging key shares, both sides independently compute the same shared secret using ECDHE. All subsequent messages are encrypted. The server immediately begins sending encrypted handshake data.',
    arrowDir: 'left',
  },
  {
    id: 'encrypted-extensions',
    title: 'EncryptedExtensions',
    from: 'server',
    description: 'The server sends EncryptedExtensions, now encrypted with the handshake key. This message carries any TLS extensions that do not need to be visible during the unencrypted part of the handshake.',
    points: [
      'Additional negotiated parameters',
      'Server Name Indication (SNI) response if applicable',
      'Any other extensions that apply to the connection',
    ],
    note: 'Moving these extensions here (instead of in ServerHello) protects them from eavesdroppers.',
    arrowDir: 'left',
  },
  {
    id: 'certificate',
    title: 'Certificate',
    from: 'server',
    description: 'The server sends its digital certificate (also encrypted), which contains:',
    points: [
      'The server\'s public key',
      'The domain name(s) the certificate covers',
      'The Certificate Authority (CA) that issued and signed it',
      'Validity period (not-before and not-after dates)',
      'The CA\'s digital signature over the certificate data',
    ],
    note: 'The certificate is used for authentication, not for key agreement. TLS 1.3 keeps these roles separate: key agreement uses ephemeral Diffie–Hellman; authentication uses the certificate.',
    arrowDir: 'left',
  },
  {
    id: 'certificate-verify',
    title: 'CertificateVerify',
    from: 'server',
    description: 'The server sends a CertificateVerify message — a digital signature over a transcript of the handshake so far, created using the server\'s private key.',
    points: [
      'Proves the server possesses the private key matching the public key in its certificate',
      'Ties the certificate to this specific handshake transcript',
      'The browser verifies this signature using the server\'s public key from the certificate',
    ],
    note: 'This step ensures that the entity presenting the certificate actually controls the corresponding private key — a critical authentication check.',
    arrowDir: 'left',
  },
  {
    id: 'finished',
    title: 'Finished (Server → Client)',
    from: 'server',
    description: 'The server sends a Finished message — a MAC (Message Authentication Code) over the entire handshake transcript.',
    points: [
      'Confirms that the server has completed its side of the handshake correctly',
      'The browser verifies this MAC to confirm the handshake was not tampered with',
    ],
    note: 'After verifying the server\'s Finished, the browser sends its own Finished message to confirm its side. The handshake is now complete.',
    arrowDir: 'left',
  },
  {
    id: 'client-finished',
    title: 'Finished (Client → Server)',
    from: 'client',
    description: 'The browser sends its own Finished message.',
    points: [
      'A MAC over the full handshake transcript from the client\'s perspective',
      'The server verifies this to confirm the handshake integrity',
    ],
    note: 'Both Finished messages together confirm that both sides derived the same keys and that no tampering occurred during the handshake.',
    arrowDir: 'right',
  },
  {
    id: 'application-data',
    title: 'Application Data',
    from: 'both',
    description: 'The TLS handshake is complete. Browser and server can now exchange HTTP requests and responses, all encrypted and integrity-protected with the session keys derived during the handshake.',
    points: [
      'All data is encrypted using a symmetric cipher (e.g., AES-128-GCM)',
      'Each record is integrity-protected with an authentication tag',
      'HTTP requests (GET, POST, etc.) and responses flow through this protected channel',
    ],
    note: 'TLS 1.3 also supports an optional "0-RTT early data" feature, where a returning client can send data in the first flight before the handshake completes. This has replay-related risks and is not a standard part of the normal handshake flow.',
    arrowDir: 'both',
  },
];

export default function TlsHandshakePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><Network size={13} /> Section 5</div>
        <h2 className="section-title">TLS Handshake Explorer</h2>
        <p className="section-subtitle">
          Step through the TLS 1.3 handshake interactively. Use the controls to move forward,
          back, or reset to the beginning.
        </p>
      </div>

      <div className="info-box mb-lg">
        <strong>Note:</strong> This is a simplified illustration of the TLS 1.3 handshake (RFC 8446).
        Some optional messages and edge cases are omitted for clarity. The diagram explicitly shows
        TLS 1.3 behavior, which differs from the older TLS 1.2 handshake in important ways —
        most notably, TLS 1.3 requires ephemeral key agreement and encrypts more of the handshake.
      </div>

      {/* Progress indicator */}
      <div className="hs-progress">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`hs-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
            onClick={() => setCurrentStep(i)}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
            title={s.title}
          >
            <span className="hs-dot-num">{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="hs-diagram">
        {/* Lanes header */}
        <div className="hs-lanes-header">
          <div className="hs-lane-label">
            <Monitor size={16} />
            <span>Browser (Client)</span>
          </div>
          <div className="hs-lane-center-label">
            <span className="badge badge-accent">Step {currentStep + 1} / {STEPS.length}</span>
          </div>
          <div className="hs-lane-label hs-lane-label-right">
            <Server size={16} />
            <span>Web Server</span>
          </div>
        </div>

        {/* Message animation area */}
        <div className="hs-lanes">
          <div className={`hs-lane ${step.from === 'client' || step.from === 'both' ? 'active-lane' : ''}`}>
            <div className="hs-actor hs-actor-client">
              <Monitor size={20} />
            </div>
          </div>

          <div className="hs-center">
            <div className={`hs-message hs-message-${step.arrowDir}`} key={currentStep}>
              <div className="hs-msg-label">{step.title}</div>
              {step.arrowDir === 'right' && (
                <svg viewBox="0 0 200 40" className="hs-arrow">
                  <defs>
                    <marker id="arrowR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent-primary)" />
                    </marker>
                  </defs>
                  <line x1="10" y1="20" x2="185" y2="20" stroke="var(--accent-primary)" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#arrowR)" />
                </svg>
              )}
              {step.arrowDir === 'left' && (
                <svg viewBox="0 0 200 40" className="hs-arrow">
                  <defs>
                    <marker id="arrowL" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
                      <path d="M8,0 L0,4 L8,8 Z" fill="var(--accent-secondary)" />
                    </marker>
                  </defs>
                  <line x1="190" y1="20" x2="15" y2="20" stroke="var(--accent-secondary)" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#arrowL)" />
                </svg>
              )}
              {step.arrowDir === 'both' && (
                <svg viewBox="0 0 200 60" className="hs-arrow" style={{ height: 60 }}>
                  <defs>
                    <marker id="arrowBR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-success)" />
                    </marker>
                    <marker id="arrowBL" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
                      <path d="M8,0 L0,4 L8,8 Z" fill="var(--color-success)" />
                    </marker>
                  </defs>
                  <line x1="10" y1="18" x2="185" y2="18" stroke="var(--color-success)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowBR)" />
                  <line x1="190" y1="42" x2="15" y2="42" stroke="var(--color-success)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowBL)" />
                </svg>
              )}
            </div>
          </div>

          <div className={`hs-lane hs-lane-right ${step.from === 'server' || step.from === 'both' ? 'active-lane' : ''}`}>
            <div className="hs-actor hs-actor-server">
              <Server size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Step explanation */}
      <div className="hs-explanation card mt-lg">
        <div className="hs-step-title">
          <span className="step-number">{currentStep + 1}</span>
          <h3>{step.title}</h3>
          {step.from !== 'both' && (
            <span className={`badge ${step.from === 'client' ? 'badge-accent' : 'badge-success'}`}>
              {step.from === 'client' ? '→ Client to Server' : '← Server to Client'}
            </span>
          )}
          {step.from === 'both' && (
            <span className="badge badge-warning">↔ Bidirectional</span>
          )}
        </div>
        <p style={{ marginBottom: '0.75rem' }}>{step.description}</p>
        <ul style={{ marginBottom: '0.85rem' }}>
          {step.points.map((pt, i) => (
            <li key={i} style={{ color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '0.92rem' }}>{pt}</li>
          ))}
        </ul>
        <div className="info-box" style={{ marginBottom: 0 }}>
          <strong>Technical note:</strong> {step.note}
        </div>
      </div>

      {/* Controls */}
      <div className="handshake-controls">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentStep(0)}
          aria-label="Reset to first step"
        >
          <RotateCcw size={15} /> Reset
        </button>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={isFirst}
            aria-label="Previous step"
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentStep(s => s + 1)}
            disabled={isLast}
            aria-label="Next step"
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Summary table */}
      <div className="card mt-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>All Handshake Steps at a Glance</h3>
        <div className="table-wrapper" style={{ margin: 0 }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Direction</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {STEPS.map((s, i) => (
                <tr
                  key={s.id}
                  style={{ cursor: 'pointer', background: i === currentStep ? 'color-mix(in srgb, var(--accent-primary) 8%, transparent)' : undefined }}
                  onClick={() => setCurrentStep(i)}
                >
                  <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{s.title}</td>
                  <td>
                    {s.arrowDir === 'right' ? '→ Client→Server' :
                     s.arrowDir === 'left' ? '← Server→Client' : '↔ Both'}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {s.description.split('.')[0]}.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
