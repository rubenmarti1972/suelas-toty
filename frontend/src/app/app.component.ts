import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header.component';
import { FooterComponent } from './core/layout/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-shell">
      <app-header></app-header>
      <main class="app-shell__content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .app-shell {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        background: linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%);
        color: #1f2933;
        font-family: 'Montserrat', 'Segoe UI', sans-serif;
      }
      .app-shell__content {
        flex: 1;
        width: min(1800px, calc(100% - 3rem));
        margin: 0 auto;
        padding: 2.5rem 0 3.5rem;
      }
      @media (max-width: 768px) {
        .app-shell__content {
          width: calc(100% - 2rem);
          padding: 1.5rem 0 2.5rem;
        }
      }
    `
  ]
})
export class AppComponent {}
