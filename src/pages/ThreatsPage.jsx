import { AlertTriangle } from 'lucide-react';

const THREATS = [
  {
    title: 'Man-in-the-Middle (MITM) Attacks',
    icon: '🔀',
    type: 'threat',
    content: [
      'In a MITM attack, an adversary positions themselves between the client and server, intercepting and potentially altering communication.',
      'TLS defends against MITM attacks through certificate validation. If an attacker intercepts the connection and substitutes their own certificate, the browser will either reject it (unknown CA) or detect a hostname mismatch.',
      'However, MITM attacks remain possible when: (a) the victim has been tricked into installing a rogue CA certificate, (b) a CA issues a fraudulent certificate for a domain it should not control, or (c) the user ignores a browser certificate warning.',
      'Certificate transparency logs (a public, append-only record of issued certificates) help detect fraudulently issued certificates by making them visible to domain owners and auditors.',
    ],
  },
  {
    title: 'Certificate Expiration and Hostname Mismatch',
    icon: '⏰',
    type: 'warning',
    content: [
      'An expired certificate means the TLS connection fails validation — the browser warns the user and typically blocks access.',
      'A hostname mismatch occurs when the certificate does not cover the domain being connected to. For example, a certificate issued for app.example.com does not cover api.example.com unless the certificate explicitly lists both.',
      'These errors are often due to server misconfiguration or forgotten certificate renewal, not always an active attack — but the browser cannot tell the difference automatically.',
      'Do not routinely bypass these warnings. If you bypass a valid security warning that is actually caused by a MITM attack, you are exposing your communication to the attacker.',
    ],
  },
  {
    title: 'Phishing Websites Using HTTPS',
    icon: '🎣',
    type: 'misconception',
    content: [
      'A common and dangerous misconception: "HTTPS means the website is safe." This is false.',
      'Phishing websites routinely obtain valid TLS certificates — especially domain-validated (DV) certificates, which only require proof of domain control, not any vetting of the organization\'s legitimacy.',
      'A phishing site for "paypa1.com" or "secure-bank-login.example.com" can have a valid certificate and a padlock icon. The padlock confirms the connection is encrypted — nothing more.',
      'Always verify the full domain name in the address bar. Legitimate institutions publish their official domain names through trusted channels. A slight variation in the domain name is a major red flag.',
    ],
  },
  {
    title: 'Weak or Outdated TLS Configuration',
    icon: '⚙️',
    type: 'threat',
    content: [
      'A server that supports modern TLS versions but also allows weak cipher suites, export-grade cryptography, or deprecated features can be vulnerable even though it "supports TLS".',
      'Downgrade attacks may be possible if the server accepts older protocol versions. An attacker could interfere with the connection to force both parties to negotiate a weaker version.',
      'TLS 1.3 addressed this by removing many negotiation options and making certain weak features impossible to select. TLS 1.2, while acceptable, requires careful cipher suite configuration.',
      'Regular security audits of TLS configuration (using tools like SSL Labs\' server test or similar) help identify and remediate weak configurations.',
    ],
  },
  {
    title: 'Why HTTPS Does Not Prevent All Threats',
    icon: '🚫',
    type: 'misconception',
    content: [
      'HTTPS protects data in transit between browser and server. It does not protect data at rest on the server, data after it has been delivered, or the application itself.',
      'Server-side vulnerabilities: SQL injection, cross-site scripting (XSS), insecure direct object references, and other application vulnerabilities are unaffected by TLS.',
      'Malware on the user\'s device can read data before it is encrypted or after it is decrypted — TLS cannot help if the endpoint is compromised.',
      'Social engineering attacks (phishing, pretexting) exploit human psychology, not cryptographic weaknesses. TLS provides no protection against these.',
      'Data leaks from the server\'s database, insider threats, and misconfigured cloud storage are not addressed by TLS.',
    ],
  },
];

export default function ThreatsPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><AlertTriangle size={13} /> Section 9</div>
        <h2 className="section-title">Common Threats &amp; Misconceptions</h2>
        <p className="section-subtitle">
          Understanding what HTTPS and TLS protect against — and what they do not.
        </p>
      </div>

      <div className="info-box mb-lg">
        This section is educational and defensive in focus. Understanding these threat models
        helps you make better security decisions, recognize warning signs, and avoid dangerous
        misconceptions about what HTTPS guarantees.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {THREATS.map(threat => {
          const boxStyle = threat.type === 'threat'
            ? { borderColor: 'color-mix(in srgb, var(--color-error) 30%, var(--border-color))', borderLeftColor: 'var(--color-error)', borderLeftWidth: '4px' }
            : threat.type === 'warning'
            ? { borderColor: 'color-mix(in srgb, var(--color-warning) 30%, var(--border-color))', borderLeftColor: 'var(--color-warning)', borderLeftWidth: '4px' }
            : { borderColor: 'color-mix(in srgb, var(--accent-primary) 30%, var(--border-color))', borderLeftColor: 'var(--accent-primary)', borderLeftWidth: '4px' };

          return (
            <div key={threat.title} className="card" style={boxStyle}>
              <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span aria-hidden="true">{threat.icon}</span>
                {threat.title}
                <span className={`badge ${threat.type === 'threat' ? 'badge-error' : threat.type === 'warning' ? 'badge-warning' : 'badge-accent'}`} style={{ fontSize: '0.7rem' }}>
                  {threat.type === 'misconception' ? 'Misconception' : 'Threat'}
                </span>
              </h3>
              <ul style={{ margin: 0 }}>
                {threat.content.map((point, i) => (
                  <li key={i} style={{ marginBottom: '0.55rem', fontSize: '0.91rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Defensive recommendations */}
      <div className="card mt-lg accent-card">
        <h3 style={{ marginBottom: '0.75rem' }}>Practical Defensive Guidelines</h3>
        <ul style={{ marginBottom: 0 }}>
          {[
            'Always check the full domain name in the address bar — not just the padlock.',
            'Do not bypass browser certificate warnings unless you have a specific, informed reason to trust the connection.',
            'Keep browsers and operating systems updated to ensure your TLS trust store is current.',
            'Be skeptical of unsolicited links. Use bookmarks or type addresses manually for important sites.',
            'Recognize that HTTPS is a necessary but not sufficient condition for a trustworthy web interaction.',
            'Server administrators: keep TLS implementations patched, audit cipher suite configurations regularly, and automate certificate renewal.',
          ].map((g, i) => (
            <li key={i} style={{ marginBottom: '0.55rem', fontSize: '0.92rem' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>—</strong> {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
