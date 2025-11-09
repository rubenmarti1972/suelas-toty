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
      <div class="header__brand">
        <img src="assets/images/logo.svg" alt="Suelas Toty" class="header__logo" />
        <div class="header__identity">
          <p class="header__tagline">Suelas Toty</p>
          <span class="header__mission">Calidad y compromiso en cada paso</span>
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
    </header>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.75rem 0;
        gap: 1.5rem;
        position: sticky;
        top: 1.5rem;
        background: linear-gradient(135deg, rgba(11, 29, 58, 0.96), rgba(15, 76, 117, 0.9));
        backdrop-filter: blur(12px);
        border-radius: 1.25rem;
        padding-inline: clamp(1.5rem, 4vw, 2.5rem);
        width: min(1200px, calc(100% - 3rem));
        margin: 0 auto 2rem;
        box-shadow: 0 18px 35px rgba(11, 29, 58, 0.18);
        color: #f2fbff;
      }
      .header__brand {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .header__logo {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.12);
        padding: 0.5rem;
      }
      .header__identity {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .header__tagline {
        font-weight: 700;
        font-size: 1.5rem;
        margin: 0;
        color: #ffffff;
      }
      .header__mission {
        display: inline-block;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(221, 238, 255, 0.78);
      }
      .header__nav {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .header__nav-link {
        text-decoration: none;
        font-weight: 600;
        color: rgba(238, 246, 255, 0.8);
        padding: 0.55rem 1.25rem;
        border-radius: 9999px;
        transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        background: rgba(255, 255, 255, 0.06);
      }
      .header__nav-link:hover,
      .header__nav-link--active {
        background: var(--color-accent);
        color: var(--color-primary);
        transform: translateY(-2px);
      }
      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
          position: static;
          border-radius: 1rem;
          width: calc(100% - 2rem);
          margin: 1rem auto 1.5rem;
        }
        .header__nav {
          width: 100%;
          justify-content: space-between;
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
}
