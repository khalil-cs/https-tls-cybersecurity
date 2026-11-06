import { Shield, Key, Lock, RefreshCw } from 'lucide-react';

export default function WhatIsTlsPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><Shield size={13} /> Section 3</div>
        <h2 className="section-title">What Is TLS?</h2>
        <p className="section-subtitle">
          Transport Layer Security — the cryptographic protocol that makes HTTPS possible.
        </p>
      </div>

      {/* Purpose */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Purpose of TLS</h3>
        <p>
          <strong>TLS (Transport Layer Security)</strong> is a cryptographic protocol that provides
          a secure channel between two parties communicating over a network. It was standardized
          by the Internet Engineering Task Force (IETF) and is the successor to the now-obsolete
          SSL (Secure Sockets Layer) protocol.
        </p>
        <p>
          TLS does not change the content of the application data being exchanged. Instead, it
          wraps that data in a secure tunnel that provides three essential properties:
        </p>
      </div>

      {/* Three pillars */}
      <div className="card-grid-3 mb-lg">
        {[
          {
            icon: <Lock size={24} />,
            title: 'Confidentiality',
            color: 'var(--accent-primary)',
            desc: 'TLS uses symmetric encryption to protect data in transit. Once the handshake is complete, all application data is encrypted so that only the two communicating parties can read it. An eavesdropper observing the network traffic sees only encrypted ciphertext.',
          },
          {
            icon: <Shield size={24} />,
            title: 'Integrity',
            color: 'var(--color-success)',
            desc: 'TLS uses Message Authentication Codes (MACs) to verify that data has not been altered in transit. If any byte of a TLS record is modified by a third party, the receiver will detect the tampering and close the connection.',
          },
          {
            icon: <Key size={24} />,
            title: 'Authentication',
            color: 'var(--color-warning)',
            desc: 'TLS allows the client (browser) to verify the server\'s identity using digital certificates. The server presents a certificate signed by a trusted Certificate Authority. The client checks this certificate before trusting the connection. Mutual authentication (client also presenting a certificate) is also possible but less common in typical web browsing.',
          },
        ].map(pillar => (
          <div key={pillar.title} className="card" style={{
            borderColor: `color-mix(in srgb, ${pillar.color} 30%, var(--border-color))`,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)', marginBottom: '0.85rem',
              background: `color-mix(in srgb, ${pillar.color} 14%, transparent)`,
              border: `1px solid color-mix(in srgb, ${pillar.color} 30%, transparent)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: pillar.color,
            }}>
              {pillar.icon}
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: pillar.color }}>{pillar.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 0 }}>{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Cryptography explained */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Public-Key and Symmetric Cryptography</h3>
        <p>
          TLS uses two types of cryptography for different purposes, each suited to what it does best.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{
            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)',
            padding: '1rem', border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Public-Key Cryptography</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 0 }}>
              Also called <em>asymmetric cryptography</em>. Uses a mathematically linked pair of keys:
              a <strong>public key</strong> (shared openly) and a <strong>private key</strong> (kept secret).
              In TLS, public-key cryptography is used during the handshake for server authentication
              (verifying the certificate) and for establishing the shared secret used to derive
              session keys. Common algorithms include RSA and elliptic-curve methods such as ECDSA.
              Public-key operations are computationally expensive and are not used to encrypt
              bulk application data.
            </p>
          </div>
          <div style={{
            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)',
            padding: '1rem', border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}>Symmetric Encryption</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 0 }}>
              Uses a single shared secret key for both encryption and decryption. Symmetric encryption
              is fast and efficient, making it suitable for encrypting large amounts of application
              data. After the TLS handshake derives shared session keys, <strong>all application
              data</strong> (HTTP requests and responses) is encrypted using symmetric algorithms
              such as AES-GCM or ChaCha20-Poly1305.
            </p>
          </div>
        </div>
      </div>

      {/* How session keys are established */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={18} color="var(--accent-primary)" /> How TLS Establishes Session Keys
        </h3>
        <p>
          A key challenge in any secure communication system is: how do two parties agree on a
          shared secret over a public, potentially monitored network — without transmitting that
          secret in a form that an eavesdropper can capture?
        </p>
        <p>
          Modern TLS (TLS 1.3) solves this with <strong>ephemeral Diffie–Hellman key agreement</strong>,
          typically using elliptic-curve variants (ECDHE — Elliptic Curve Diffie–Hellman Ephemeral).
          The key idea is that both parties contribute random values, and through mathematical
          operations on elliptic curves, they arrive at the same shared secret without either
          party ever sending that secret over the network.
        </p>
        <p>
          The shared secret is then used to derive the actual symmetric encryption and authentication
          keys used for the session. Because the key agreement uses freshly generated ephemeral keys
          for each session, past sessions cannot be decrypted even if the server's long-term private
          key is later compromised. This property is called <strong>forward secrecy</strong>.
        </p>
        <div className="success-box" style={{ marginBottom: 0 }}>
          <strong>Why ephemeral keys matter:</strong> Older TLS configurations (and TLS 1.2 with
          RSA key transport) did not always provide forward secrecy. TLS 1.3 requires ephemeral
          Diffie–Hellman key agreement, making forward secrecy a mandatory baseline.
        </div>
      </div>

      {/* SSL vs TLS */}
      <div className="card">
        <h3 style={{ marginBottom: '0.75rem' }}>TLS vs SSL — The Naming Confusion</h3>
        <p>
          TLS evolved from SSL, which was developed by Netscape in the mid-1990s. SSL 2.0 and
          SSL 3.0 were the original versions; TLS 1.0 came next as a standardized successor.
          The design and goals are similar, but TLS introduced important improvements and
          fixes for known SSL vulnerabilities.
        </p>
        <p>
          You will still encounter the term "SSL" used loosely to mean "TLS" in everyday conversation,
          documentation, and software interfaces (for example, an option labeled "Enable SSL" often
          means "enable TLS"). However, they are not the same protocol. SSL versions are obsolete
          and should not be used. Saying "SSL certificate" when referring to a TLS certificate
          is a common informal usage, but the underlying mechanism is TLS.
        </p>
        <div className="warning-box" style={{ marginBottom: 0 }}>
          If you see SSL 2.0 or SSL 3.0 still enabled on a server, that is a security
          vulnerability that should be addressed. Modern best practice is to disable all SSL
          versions and also TLS 1.0 and 1.1, accepting only TLS 1.2 and TLS 1.3.
        </div>
      </div>
    </div>
  );
}
