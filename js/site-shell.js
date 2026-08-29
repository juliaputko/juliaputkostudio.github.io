const siteRoot = new URL("../", import.meta.url);
const siteUrl = (path = "") => new URL(path, siteRoot).href;

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.id ||= "header";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --header-height: clamp(88px, 12vh, 140px);
          display: block;
          height: var(--header-height);
        }

        * { box-sizing: border-box; }

        header {
          position: fixed;
          z-index: 1000;
          top: 0;
          left: 0;
          display: flex;
          width: 100%;
          height: var(--header-height);
          align-items: center;
          padding: 0 clamp(20px, 5vw, 70px);
          background: #000;
          color: #fff;
          transition: height 0.3s ease, background-color 0.3s ease;
        }

        header.scrolled {
          background: rgba(0, 0, 0, 0.72);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
        }

        .inner {
          display: grid;
          width: 100%;
          max-width: 2000px;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          margin: 0 auto;
        }

        .name {
          justify-self: start;
          color: #fff;
          font: 20 1.2em Arial, Helvetica, sans-serif;
          text-decoration: none;
          white-space: nowrap;
          transform: scale(2, 1.5);
          transform-origin: left center;
        }

        .logo-link {
          justify-self: center;
          line-height: 0;
          transition: opacity 0.2s ease;
        }

        .logo {
          width: 50px;
          height: 50px;
          animation: spin 5s linear infinite;
          opacity: 0.4;
        }

        nav { justify-self: end; }

        ul {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 20px);
          margin: 0;
          padding: 0;
          list-style: none;
        }

        nav a {
          color: #fff;
          font: 500 clamp(0.78rem, 1.2vw, 1rem) Arial, Helvetica, sans-serif;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        a:hover { opacity: 0.75; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          :host { --header-height: 9vh; min-height: 64px; }

          header {
            min-height: 64px;
            padding: 0 20px;
          }

          .name {
            font-size: 0.9em;
            transform: scale(1.25, 1.15);
          }

          .logo {
            width: 36px;
            height: 36px;
          }

          nav a { font-size: 0.72rem; }
        }
      </style>

      <header id="header">
        <div class="inner">
          <a class="name" href="${siteUrl("index.html")}" aria-label="Return to home">JULIA PUTKO</a>
          <a class="logo-link" href="#footer" aria-label="Skip to footer">
            <img class="logo" src="${siteUrl("assets/spiral2.png")}" alt="">
          </a>
          <nav aria-label="Main navigation">
            <ul>
              <li><a href="${siteUrl("index.html")}">PORTFOLIO</a></li>
              <li><a href="${siteUrl("about.html")}">ABOUT</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    this.updateHeader = () => {
      this.shadowRoot.querySelector("header").classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", this.updateHeader, { passive: true });
    this.updateHeader();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.updateHeader);
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.id ||= "footer";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: transparent;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
        }

        * { box-sizing: border-box; }

        footer {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          padding: 30px clamp(20px, 4vw, 50px);
        }

        .inner {
          position: relative;
          display: grid;
          width: min(100%, 900px);
          min-height: 50px;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .links {
          display: flex;
          gap: clamp(12px, 2.5vw, 32px);
        }

        .links:last-child { justify-self: end; }

        a {
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          text-shadow: 1px 1px 1px #000;
          transition: opacity 0.2s ease;
        }

        a:hover { opacity: 0.65; }

        .logo-link {
          justify-self: center;
          line-height: 0;
        }

        .logo {
          width: 50px;
          height: 50px;
          animation: spin 5s linear infinite;
          opacity: 0.4;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          footer { padding-inline: 14px; }
          .inner { gap: 12px; }
          .links { gap: 9px; }
          a { font-size: 0.62rem; }
          .logo { width: 36px; height: 36px; }
        }
      </style>

      <footer id="footer">
        <div class="inner">
          <div class="links">
            <a href="https://github.com/juliaputko" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href="https://www.linkedin.com/in/julia-putko/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
          <a class="logo-link" href="#header" aria-label="Return to top">
            <img class="logo" src="${siteUrl("assets/spiral2.png")}" alt="">
          </a>
          <div class="links">
            <a href="mailto:juliaputko@gmail.com?subject=Portfolio%20Inquiry">EMAIL</a>
            <a href="https://www.google.com/maps/place/Vancouver/" target="_blank" rel="noopener noreferrer">LOCATION</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
