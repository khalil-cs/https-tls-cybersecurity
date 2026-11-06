# HTTPS & TLS — Cybersecurity

An interactive educational web application built for the university Cybersecurity assignment and classroom presentation.

## Student Information
- **Student Name:** Khalil Ullah
- **Roll Number:** 2662
- **Semester:** 6th
- **Instructor:** Prof: Shah Muhammad Sab
- **Course:** Cybersecurity
- **Assignment Topic:** HTTPS & TLS

## Institution
Government Postgraduate Science College (GPSC), Quetta

---

## Key Features

### Navigation & Layout
- **Collapsible sidebar** — expand/collapse on desktop with saved preference
- **Mobile-friendly** — navigation drawer for phones and tablets
- **Active section highlighting** in sidebar
- **Responsive design** — desktop, tablet, and mobile optimized

### Theme & Accessibility
- **Dark mode (default):** Midnight Teal & Cyber Mint palette (`#101B20`, `#45C4B0`)
- **Light mode:** Cloud White & Deep Teal palette
- **Theme toggle** with `localStorage` persistence and system preference detection
- **Keyboard accessible** controls and navigation
- **Reduced motion** support

### Interactive Features
- **TLS Handshake Explorer** — Step through the TLS 1.3 handshake manually (Previous/Next/Reset, no autoplay)
- **Certificate Validation Simulation** — Select scenarios (valid, expired, hostname mismatch, untrusted) and see simulated browser responses
- **HTTP vs HTTPS connection visual** — Toggle between connection types
- **Presentation Mode** — Keyboard navigable (←/→/Esc), distraction-free layout for classroom use
- **Print / PDF** — `@media print` stylesheet removes navigation, preserves content

### Educational Sections
1. Introduction to HTTPS & TLS
2. HTTP vs HTTPS (comparison table)
3. What Is TLS? (cryptography explained accessibly)
4. How HTTPS Works (step-by-step)
5. TLS Handshake (interactive TLS 1.3 explorer)
6. TLS Certificates & Certificate Authorities
7. Encryption, Authentication & Integrity
8. TLS Versions & Security (SSL through TLS 1.3)
9. Common Threats & Misconceptions
10. Practical Demonstration (simulated, browser-only)
11. Summary (5 key takeaways + concept map)
12. References (RFC 8446, RFC 9110, OWASP, MDN, etc.)

---

## Tech Stack
- **React 18** (functional components, hooks)
- **JavaScript ES6+**
- **Vite** (bundler and dev server)
- **Lucide React** (icons)
- **Custom CSS** with CSS variables for theming, responsive layouts, and print styles

---

## How to Run Locally

```bash
cd https-tls-cybersecurity
npm install
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) in your browser.

## Production Build

```bash
npm run build
```

Output is placed in the `dist/` directory. Serve with any static web server.

---

## Technical Accuracy Notes

- TLS 1.3 handshake is explicitly labeled and follows RFC 8446 (not the older TLS 1.2 RSA key-transport flow)
- Certificate validation is described as verifying the connection, not guaranteeing website trustworthiness
- HTTPS protection is described as in-transit protection, not complete security
- SSL and TLS are not conflated; versions are accurately described with their deprecation status
- All references link to real IETF RFCs, OWASP, and MDN documents
