import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../../shared/components/cart/cart.component';

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
        <img src="assets/images/logo.png" alt="Suelas Toty" class="header__logo" />
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
        <a routerLink="/contacto" class="header__cta">Solicitar cotización</a>
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
        padding: 1.15rem clamp(1.5rem, 3vw, 3rem);
        background: var(--color-surface);
        border: 1px solid rgba(12, 47, 98, 0.08);
        border-radius: 1.9rem;
        box-shadow: 0 18px 38px rgba(18, 40, 76, 0.12);
        position: sticky;
        top: 1.35rem;
        z-index: 50;
        width: min(1800px, calc(100% - 3rem));
        margin: 1.35rem auto 2.75rem;
        color: var(--color-text);
        backdrop-filter: blur(14px);
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
        border-radius: 1.45rem;
        padding: 0.45rem 0.95rem;
        background: linear-gradient(135deg, rgba(12, 47, 98, 0.08), rgba(27, 79, 145, 0.12));
        border: 1px solid rgba(12, 47, 98, 0.18);
        box-shadow: 0 12px 24px rgba(27, 39, 63, 0.12);
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
        color: var(--color-primary);
        letter-spacing: 0.02em;
      }
      .header__slogan {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        color: rgba(12, 47, 98, 0.65);
      }
      .header__nav {
        display: flex;
        justify-content: center;
        gap: clamp(0.75rem, 3vw, 1.5rem);
        flex-wrap: wrap;
        align-items: center;
      }
      .header__nav-link {
        position: relative;
        text-decoration: none;
        font-weight: 600;
        color: rgba(12, 47, 98, 0.75);
        padding: 0.55rem 1.2rem;
        border-radius: 999px;
        transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        background: rgba(12, 47, 98, 0.06);
      }
      .header__nav-link:hover,
      .header__nav-link--active {
        background: linear-gradient(135deg, rgba(244, 160, 36, 0.9), rgba(255, 199, 97, 0.95));
        color: var(--color-text);
        transform: translateY(-1px);
        box-shadow: 0 18px 30px rgba(18, 40, 76, 0.18);
      }
      .header__actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .header__cta {
        text-decoration: none;
        font-weight: 600;
        padding: 0.7rem 1.65rem;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--color-accent), #ffd89a);
        color: var(--color-primary);
        box-shadow: 0 18px 32px rgba(18, 40, 76, 0.18);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .header__cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 24px 44px rgba(18, 40, 76, 0.22);
      }
      .header__cart {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        border: 1px solid rgba(12, 47, 98, 0.15);
        background: rgba(12, 47, 98, 0.06);
        color: rgba(12, 47, 98, 0.75);
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      }
      .header__cart:hover {
        background: rgba(12, 47, 98, 0.12);
        transform: translateY(-2px);
        box-shadow: 0 18px 32px rgba(18, 40, 76, 0.2);
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
        background: linear-gradient(135deg, var(--color-accent), #ffd89a);
        color: var(--color-primary);
        font-size: 0.8rem;
        font-weight: 700;
        box-shadow: 0 12px 24px rgba(18, 40, 76, 0.22);
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
  public cartService = inject(CartService);
  public isCartOpen = signal(false);

  protected readonly links: NavigationLink[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Catálogo', route: '/productos' },
    { label: 'Servicio al cliente', route: '/servicio-al-cliente' },
    { label: 'Contacto', route: '/contacto' }
  ];

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }
}
