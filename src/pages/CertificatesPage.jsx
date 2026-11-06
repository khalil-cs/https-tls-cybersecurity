import { BadgeCheck, ArrowRight } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><BadgeCheck size={13} /> Section 6</div>
        <h2 className="section-title">TLS Certificates &amp; Certificate Authorities</h2>
        <p className="section-subtitle">
          How digital certificates establish trust between browsers and servers.
        </p>
      </div>

      {/* What is a digital certificate */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>What Is a Digital Certificate?</h3>
        <p>
          A <strong>digital certificate</strong> (formally an X.509 certificate in the TLS context)
          is a structured digital document that binds a public key to an identity. In web TLS,
          the identity is typically a domain name (or a set of domain names), and the public key
          belongs to the web server.
        </p>
        <p>
          The certificate answers a crucial question: "I received a public key from a server claiming
          to be example.com — but how do I know that key actually belongs to example.com and not
          to an attacker?" A certificate signed by a trusted Certificate Authority provides evidence
          that a vetted third party verified this claim.
        </p>
        <div className="kv-list" style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-color)' }}>
          <span className="kv-key">Subject</span>
          <span className="kv-value">The domain name(s) covered (e.g., example.com, *.example.com)</span>
          <span className="kv-key">Public Key</span>
          <span className="kv-value">The server's public key (used to verify CertificateVerify)</span>
          <span className="kv-key">Issuer</span>
          <span className="kv-value">The Certificate Authority that signed and issued this certificate</span>
          <span className="kv-key">Valid From</span>
          <span className="kv-value">The start of the certificate's validity period</span>
          <span className="kv-key">Valid Until</span>
          <span className="kv-value">The end of the validity period (after this date the cert is expired)</span>
          <span className="kv-key">Signature</span>
          <span className="kv-value">CA's digital signature — cryptographic proof the CA issued this certificate</span>
          <span className="kv-key">Serial Number</span>
          <span className="kv-value">A unique identifier assigned by the CA, used for revocation tracking</span>
        </div>
      </div>

      {/* Certificate Authorities */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Certificate Authorities (CAs)</h3>
        <p>
          A <strong>Certificate Authority</strong> is an organization trusted to verify the identity
          of certificate applicants and issue digitally signed certificates. Before issuing a
          certificate, a CA performs validation to confirm that the applicant controls the
          domain name the certificate will cover.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
          {[
            { title: 'Domain Validation (DV)', desc: 'CA verifies that the applicant controls the domain (e.g., via DNS record or file on the web server). Fastest and cheapest. Does not verify organization identity.', color: 'var(--accent-primary)' },
            { title: 'Organization Validation (OV)', desc: 'CA verifies domain control plus some organization details. Certificate includes organization name. Takes longer.', color: 'var(--color-warning)' },
            { title: 'Extended Validation (EV)', desc: 'Most rigorous vetting of organizational identity. Historically shown differently in browsers. EV no longer guarantees a visible green bar in modern browsers.', color: 'var(--color-success)' },
          ].map(type => (
            <div key={type.title} style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '0.9rem', border: `1px solid color-mix(in srgb, ${type.color} 25%, var(--border-color))` }}>
              <h4 style={{ color: type.color, marginBottom: '0.35rem', fontSize: '0.9rem' }}>{type.title}</h4>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: 0 }}>{type.desc}</p>
            </div>
          ))}
        </div>
        <div className="warning-box" style={{ marginTop: '1rem', marginBottom: 0 }}>
          <strong>DV ≠ Trustworthy website:</strong> Domain validation only confirms that someone
          controls the domain — not that the organization behind it is legitimate. Phishing sites
          routinely obtain DV certificates. A padlock confirms the connection is encrypted; it does
          not certify the site's honesty or purpose.
        </div>
      </div>

      {/* Certificate chain */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '1rem' }}>Certificate Chains</h3>
        <p>
          Browsers maintain a list of trusted <strong>Root CAs</strong> — a small set of highly
          vetted, well-secured Certificate Authorities whose root certificates are pre-installed
          in the operating system or browser. Directly using a root CA to sign every website
          certificate would be risky; if a root's private key were compromised, the entire
          trust system would be at risk.
        </p>
        <p>
          Instead, Root CAs sign <strong>Intermediate CA</strong> certificates, and Intermediate
          CAs sign the end-entity (website) certificates. This creates a certificate chain.
          Browsers verify the chain from the website certificate up to a trusted root.
        </p>

        {/* Chain diagram */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0.5rem', margin: '1.25rem 0', padding: '1.5rem',
          background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          {[
            { label: 'Website Certificate', sub: 'example.com', color: 'var(--accent-primary)' },
            { label: 'Intermediate CA', sub: 'Intermediate Authority', color: 'var(--color-warning)' },
            { label: 'Trusted Root CA', sub: 'Root Authority (pre-trusted)', color: 'var(--color-success)' },
          ].map((node, i, arr) => (
            <div key={node.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                textAlign: 'center', background: 'var(--bg-card)',
                border: `2px solid ${node.color}`, borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.1rem', minWidth: '150px',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{node.label}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{node.sub}</div>
              </div>
              {i < arr.length - 1 && <ArrowRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 0 }}>
          The browser receives the website certificate and any intermediate certificates from
          the server. It then builds the chain up to a root it already trusts. The exact number
          of intermediate CAs can vary. Some deployments have two or more intermediates.
        </p>
      </div>

      {/* Validation and expiry */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem' }}>Hostname Validation and Expiry</h3>
        <p>
          When validating a certificate, the browser checks:
        </p>
        <ul style={{ marginBottom: '0.85rem' }}>
          <li><strong>Hostname match:</strong> The certificate's Subject Alternative Names (SANs) must include the domain the browser is connecting to. A certificate for example.com does not cover bank.example.org.</li>
          <li><strong>Validity period:</strong> The current date must be within the not-before and not-after dates in the certificate.</li>
          <li><strong>Chain integrity:</strong> Each certificate in the chain must be properly signed by its issuer.</li>
          <li><strong>Revocation:</strong> The certificate should not have been revoked by its CA (checked via OCSP or CRL, depending on configuration).</li>
        </ul>
        <div className="warning-box" style={{ marginBottom: 0 }}>
          <strong>Certificate expiry in practice:</strong> Certificates typically expire after 90 days
          to a few years depending on the CA and certificate type. If a certificate expires and the
          server operator does not renew it, browsers display a warning and may block access. Services
          like Let's Encrypt automate renewal to prevent this.
        </div>
      </div>

      {/* Browser warnings */}
      <div className="card">
        <h3 style={{ marginBottom: '0.75rem' }}>Browser Certificate Warnings</h3>
        <p>
          When a browser cannot validate a certificate, it displays a warning — typically a red
          screen with text like "Your connection is not private" or "Certificate error." Common causes:
        </p>
        <ul style={{ marginBottom: '0.85rem' }}>
          <li><strong>Expired certificate:</strong> The current date is past the certificate's not-after date.</li>
          <li><strong>Hostname mismatch:</strong> The certificate is valid for a different domain than the one being visited.</li>
          <li><strong>Untrusted issuer:</strong> The certificate was signed by a CA not in the browser's trust store (e.g., a self-signed certificate).</li>
          <li><strong>Revoked certificate:</strong> The CA has revoked the certificate before its expiry date.</li>
        </ul>
        <div className="error-box" style={{ marginBottom: 0 }}>
          <strong>Do not casually bypass certificate warnings.</strong> These warnings exist to protect
          you. A certificate warning can indicate a misconfigured server (often not malicious) but
          can also indicate a man-in-the-middle attack or a compromised connection. If you do not
          have a specific technical reason to trust the connection anyway, do not proceed.
        </div>
      </div>
    </div>
  );
}
