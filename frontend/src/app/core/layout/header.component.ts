import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

interface NavigationLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
    <header class="header">
      <div class="header__brand" routerLink="/" tabindex="0" role="link">
        <img src="assets/images/logo.svg" alt="Suelas Toty" class="header__logo" />
        <div class="header__identity">
          <p class="header__name">Suelas Toty</p>
          <span class="header__slogan">Innovación en cada pisada</span>
        </div>
      </div>
      <nav class="header__nav" aria-label="Navegación principal">
        <a
          *ngFor="let link of links"
          [routerLink]="link.route"
          routerLinkActive="header__nav-link--active"
          class="header__nav-link"
        >
          {{ link.label }}
        </a>
      </nav>
      <div class="header__actions">
        <a routerLink="/productos" class="header__cta">Catálogo</a>
        <button type="button" class="header__cart" aria-label="Ver carrito de compras">
          <span class="header__cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path
                d="M3.5 4h1.9l1.42 8.54a2 2 0 0 0 1.98 1.68h8.48a2 2 0 0 0 1.97-1.58l1.2-5.6H7.1"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <circle cx="10" cy="19" r="1.6"></circle>
              <circle cx="18" cy="19" r="1.6"></circle>
            </svg>
          </span>
          <span class="header__cart-label">Carrito</span>
          <span class="header__cart-count" aria-live="polite">{{ cartItems }}</span>
        </button>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1.5rem;
        padding: 1rem clamp(1.25rem, 4vw, 2.5rem);
        background: radial-gradient(circle at top left, rgba(45, 212, 191, 0.22), transparent 55%),
          linear-gradient(120deg, rgba(7, 24, 46, 0.92), rgba(11, 29, 58, 0.88) 35%, rgba(15, 76, 117, 0.92));
        backdrop-filter: blur(18px);
        border-radius: 1.75rem;
        box-shadow: 0 24px 40px rgba(5, 18, 36, 0.35);
        position: sticky;
        top: 1.25rem;
        z-index: 50;
        width: min(1180px, calc(100% - 3rem));
        margin: 1.25rem auto 2.5rem;
        color: rgba(235, 247, 255, 0.96);
      }
      .header__brand {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        text-decoration: none;
      }
      .header__logo {
        width: clamp(90px, 12vw, 132px);
        height: auto;
        border-radius: 1.75rem;
        padding: 0.35rem 0.75rem;
        background: linear-gradient(135deg, rgba(45, 212, 191, 0.28), rgba(56, 189, 248, 0.24));
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
      }
      .header__identity {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .header__name {
        margin: 0;
        font-weight: 700;
        font-size: 1.55rem;
        color: #ffffff;
        letter-spacing: 0.02em;
      }
      .header__slogan {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        color: rgba(215, 235, 255, 0.78);
      }
      .header__nav {
        display: flex;
        justify-content: center;
        gap: clamp(0.75rem, 3vw, 1.5rem);
        flex-wrap: wrap;
      }
      .header__nav-link {
        position: relative;
        text-decoration: none;
        font-weight: 600;
        color: rgba(226, 242, 255, 0.85);
        padding: 0.55rem 1.2rem;
        border-radius: 999px;
        transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        background: rgba(255, 255, 255, 0.08);
      }
      .header__nav-link:hover,
      .header__nav-link--active {
        background: linear-gradient(135deg, rgba(45, 212, 191, 0.85), rgba(56, 189, 248, 0.85));
        color: #041023;
        transform: translateY(-1px);
      }
      .header__actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .header__cta {
        text-decoration: none;
        font-weight: 600;
        padding: 0.65rem 1.4rem;
        border-radius: 999px;
        background: linear-gradient(135deg, #2dd4bf, #38bdf8);
        color: #041023;
        box-shadow: 0 18px 32px rgba(45, 212, 191, 0.32);
        transition: transform 0.2s ease;
      }
      .header__cta:hover {
        transform: translateY(-2px);
      }
      .header__cart {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background: rgba(4, 16, 35, 0.35);
        color: inherit;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .header__cart:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-2px);
      }
      .header__cart-icon svg {
        width: 22px;
        height: 22px;
        stroke: currentColor;
        fill: none;
      }
      .header__cart-label {
        font-size: 0.85rem;
        letter-spacing: 0.04em;
      }
      .header__cart-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.5rem;
        height: 1.5rem;
        padding: 0 0.35rem;
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(45, 212, 191, 0.85), rgba(56, 189, 248, 0.85));
        color: #041023;
        font-size: 0.8rem;
        font-weight: 700;
      }
      @media (max-width: 1024px) {
        .header {
          grid-template-columns: 1fr;
          justify-items: stretch;
          text-align: left;
          gap: 1.25rem;
          position: static;
          width: calc(100% - 2rem);
          margin: 1rem auto 2rem;
        }
        .header__nav {
          justify-content: flex-start;
        }
        .header__actions {
          justify-content: flex-start;
        }
      }
      @media (max-width: 640px) {
        .header__nav {
          flex-direction: column;
          align-items: stretch;
        }
        .header__nav-link {
          width: 100%;
          text-align: center;
        }
        .header__actions {
          flex-direction: column;
          align-items: stretch;
        }
        .header__cta,
        .header__cart {
          width: 100%;
          justify-content: center;
        }
      }
    `
  ]
})
export class HeaderComponent {
  protected readonly links: NavigationLink[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Catálogo', route: '/productos' },
    { label: 'Servicio al cliente', route: '/servicio-al-cliente' },
    { label: 'Contacto', route: '/contacto' },
    { label: 'Inventario', route: '/inventario' },
    { label: 'Administración', route: '/admin' }
  ];
  protected readonly cartItems = 0;
}
