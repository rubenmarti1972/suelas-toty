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
        <div>
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
        padding: 1.5rem 0;
        gap: 1.5rem;
      }
      .header__brand {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .header__logo {
        width: 60px;
        height: 60px;
      }
      .header__tagline {
        font-weight: 700;
        font-size: 1.5rem;
        margin: 0;
        color: #183153;
      }
      .header__mission {
        display: inline-block;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #33658a;
      }
      .header__nav {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .header__nav-link {
        text-decoration: none;
        font-weight: 600;
        color: #1f2933;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .header__nav-link:hover,
      .header__nav-link--active {
        background: #183153;
        color: #fefefe;
      }
      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
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
