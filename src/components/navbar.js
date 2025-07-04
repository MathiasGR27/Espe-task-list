import { LitElement, html, css } from 'lit-element';

export class EspeNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    header {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #214a3c;
      padding: 0.75rem 1rem;
      background-color: #10231c;
      color: white;
    }
    @media (min-width: 768px) {
      header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    .logo-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .logo-group svg {
      width: 32px;
      height: 32px;
      color: white;
    }
    h2 {
      margin: 0;
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: -0.015em;
    }

    button.menu-toggle {
      background: none;
      border: none;
      color: white;
      margin-left: auto;
      margin-top: 0.75rem;
      cursor: pointer;
    }

    @media (min-width: 768px) {
      button.menu-toggle {
        display: none;
      }
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      margin-top: 1rem;
      gap: 1rem;
    }
    .mobile-menu.show {
      display: flex;
    }
    @media (min-width: 768px) {
      .mobile-menu {
        display: flex !important;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
        margin-top: 0;
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    @media (min-width: 768px) {
      .links {
        flex-direction: row;
        gap: 2rem;
      }
    }
    .links a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      padding: 0.5rem 0;
      transition: color 0.2s ease-in-out;
    }
    .links a:hover {
      color: #90ee90;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
    }
    button.bell-button {
      background-color: #214a3c;
      border-radius: 0.5rem;
      padding: 0.375rem 0.625rem;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      gap: 0.5rem;
    }
    button.bell-button svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 9999px; /* círculo perfecto */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        border: 2px solid #214a3c; /* borde verde oscuro */
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.5); /* sombra sutil */
      }
  `;

  constructor() {
    super();
    this.menuVisible = false;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  render() {
    return html`
      <header>
        <div class="logo-group">
          <div class="icon" aria-hidden="true">
            <!-- SVG icon aquí -->
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_543)">
                  <path
                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543"><rect width="48" height="48" fill="white"></rect></clipPath>
                </defs>
              </svg>
          </div>
          <h2>ESPE Tasks</h2>
        </div>

        <button
          class="menu-toggle"
          @click=${this.toggleMenu}
          aria-label="Toggle menu"
          aria-expanded="${this.menuVisible ? 'true' : 'false'}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
            ></path>
          </svg>
        </button>

        <div class="mobile-menu ${this.menuVisible ? 'show' : ''}">
          <div class="links">
            <a href="#">Inicio</a>
            <a href="#">Tareas</a>
            <a href="#">Calendario</a>
            <a href="#">Notas</a>
          </div>
          <div class="actions">
            <button class="bell-button" title="Notificaciones" aria-label="Notificaciones">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z"
                ></path>
              </svg>
            </button>
            <div
            class="avatar"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUzbhRDPH52Ss-Ql1Kstpq8__VDTbphGYY-9UgUHdZixDcApAa_zH_jyNFx7KCFj1Mv0ih-eBAFEYS3IaraBO68eNTolMNgXldxmtwWAEixg7Uh8kPOAQd1pcZmBoZc6Yysk5ETk53EOEDeIwZHq8l2aOzNo_-Gt-WyVP-aQsyNtZhvNLtnP3Kl6aQ3L_0MWEjO-68MeSlaXLXjXVHNzafLx2pC3EX_lVQHhKPO4LE7vh81PRwNfTlCMB6_4YytLwlW9EjimB-7EU");'
            role="img"
            aria-label="Avatar"
          ></div>
          
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('espe-navbar', EspeNavbar);
