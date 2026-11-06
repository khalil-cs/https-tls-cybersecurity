import { BookOpen, Wifi, Lock, Globe } from 'lucide-react';

export default function IntroductionPage() {
  return (
    <div className="section-page">
      <div className="section-header">
        <div className="section-tag"><BookOpen size={13} /> Section 1</div>
        <h2 className="section-title">Introduction to HTTPS &amp; TLS</h2>
        <p className="section-subtitle">
          The building blocks of secure communication on the modern web.
        </p>
      </div>

      {/* What is HTTP */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={18} color="var(--color-warning)" /> What Is HTTP?
        </h3>
        <p>
          <strong>HTTP</strong> stands for <em>HyperText Transfer Protocol</em>. It is the foundational
          protocol that web browsers and servers use to exchange data — web pages, images, forms,
          and everything else you see online. When you type a web address into your browser, your
          browser sends HTTP requests to a server and receives HTTP responses containing the page content.
        </p>
        <p>
          HTTP was designed in the early 1990s for sharing documents, in an era when the web was
          mostly public, read-only information. At that time, protecting data in transit was not a
          primary concern. HTTP sends all data as plain text, which means anyone with access to
          the network path between the browser and server can potentially read or alter those messages.
        </p>
        <div className="warning-box">
          <strong>Why plain text is a problem:</strong> When you submit a login form over plain HTTP,
          your username and password travel across the network in a form that any intermediate device
          (router, ISP, eavesdropper) could read. Modern web applications routinely handle sensitive
          information — passwords, payment details, private messages — which plain HTTP cannot protect.
        </div>
      </div>

      {/* What is HTTPS */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={18} color="var(--color-success)" /> What Is HTTPS?
        </h3>
        <p>
          <strong>HTTPS</strong> stands for <em>HyperText Transfer Protocol Secure</em>. It is HTTP
          running inside a TLS connection. The "S" signals that a security layer — TLS — has been
          added between the HTTP application layer and the underlying network transport.
        </p>
        <p>
          When a browser connects to an HTTPS website, it first establishes a TLS connection with
          the server. Only after that connection is established does the browser begin sending
          HTTP requests. All HTTP traffic — headers, request bodies, responses — travels inside
          the encrypted TLS connection. Someone observing the network can see that a connection
          was made to a particular server, but cannot read the content of the HTTP messages.
        </p>
        <div className="info-box">
          <strong>HTTPS in the browser:</strong> Most browsers display a padlock icon in the
          address bar for HTTPS sites. The URL begins with <code>https://</code> and the default
          port is 443, compared to port 80 for plain HTTP.
        </div>
      </div>

      {/* What is TLS */}
      <div className="card mb-lg">
        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wifi size={18} color="var(--accent-primary)" /> What Is TLS?
        </h3>
        <p>
          <strong>TLS</strong> stands for <em>Transport Layer Security</em>. It is a cryptographic
          protocol designed to provide three fundamental security properties for network communication:
          confidentiality, integrity, and authentication.
        </p>
        <ul>
          <li><strong>Confidentiality:</strong> Data is encrypted so unauthorized parties cannot read it in transit.</li>
          <li><strong>Integrity:</strong> Any modification or corruption of data in transit can be detected.</li>
          <li><strong>Authentication:</strong> The client can verify the server's identity through a digital certificate.</li>
        </ul>
        <p>
          TLS evolved from an earlier protocol called SSL (Secure Sockets Layer), developed by
          Netscape in the 1990s. Although people sometimes still say "SSL" colloquially, modern
          deployments use TLS — specifically TLS 1.2 or the more modern TLS 1.3. SSL and earlier
          TLS versions are now considered obsolete and insecure.
        </p>
        <div className="warning-box">
          <strong>TLS ≠ HTTPS:</strong> TLS is a general-purpose security protocol that can protect
          many types of network connections — email, messaging, database connections, and more.
          HTTPS is specifically HTTP traffic protected by TLS. The two terms are not synonymous.
        </div>
      </div>

      {/* Relationship */}
      <div className="card mb-lg accent-card">
        <h3 style={{ marginBottom: '1rem' }}>The Relationship: HTTPS = HTTP + TLS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { layer: 'Application Layer', label: 'HTTP', color: 'var(--color-warning)', desc: 'Web requests & responses (GET, POST, headers, body)' },
            { layer: 'Security Layer', label: 'TLS', color: 'var(--accent-primary)', desc: 'Encryption, authentication, and integrity protection' },
            { layer: 'Transport Layer', label: 'TCP', color: 'var(--text-muted)', desc: 'Reliable packet delivery (port 443 for HTTPS)' },
          ].map(row => (
            <div key={row.layer} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem', border: `1px solid color-mix(in srgb, ${row.color} 25%, var(--border-color))`
            }}>
              <div style={{
                flexShrink: 0, minWidth: '80px', fontWeight: 800, fontSize: '1rem',
                color: row.color, fontFamily: 'var(--font-mono)'
              }}>{row.label}</div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.layer}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{row.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analogy */}
      <div className="card">
        <h3 style={{ marginBottom: '0.75rem' }}>A Real-World Analogy</h3>
        <p>
          Think of HTTP as sending a <strong>postcard</strong> — anyone who handles it along the way
          (postal workers, sorting facilities) can read the message on the back. HTTPS is like
          putting that postcard inside a <strong>sealed, tamper-evident envelope</strong> that only
          the intended recipient can open, and that also bears a verified return address so the
          recipient knows exactly who sent it.
        </p>
        <p>
          TLS is the envelope itself — a security wrapper around the communication channel. The
          postcard (HTTP) is unchanged inside; it is the channel that becomes protected.
        </p>
        <div className="info-box" style={{ marginBottom: 0 }}>
          <strong>Important limitation:</strong> The envelope protects data <em>in transit</em> between
          the browser and server. It does not protect data once it arrives at the server, does not
          guarantee the website itself is honest or malware-free, and does not prevent server-side
          security vulnerabilities. HTTPS is a necessary but not sufficient condition for a secure
          web interaction.
        </div>
      </div>
    </div>
  );
}
