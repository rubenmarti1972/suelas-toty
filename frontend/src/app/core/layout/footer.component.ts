import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  template: `
    <footer class="footer">
      <div class="footer__grid">
        <section class="footer__mission">
          <h2>Impulsando pasos seguros</h2>
          <p>
            Somos el aliado estratégico de las marcas de calzado que confían en la calidad,
            honestidad, respeto, servicio, compromiso y trabajo en equipo que nos definen.
          </p>
        </section>
        <section class="footer__contact">
          <h3>Contacto rápido</h3>
          <ul>
            <li><span class="footer__icon">📞</span> +57 300 000 0000</li>
            <li><span class="footer__icon">✉️</span> ventas@suelastoty.com</li>
            <li><span class="footer__icon">📍</span> Medellín, Colombia</li>
          </ul>
        </section>
        <section class="footer__social">
          <h3>Síguenos</h3>
          <ul>
            <li *ngFor="let social of socials">
              <a [href]="social.url" target="_blank" rel="noopener" class="footer__social-link">
                <span class="footer__social-icon">{{ social.icon }}</span>
                {{ social.label }}
              </a>
            </li>
          </ul>
        </section>
      </div>
      <p class="footer__legal">© {{ currentYear }} Suelas Toty. Todos los derechos reservados.</p>
    </footer>
  `,
  styles: [
    `
      .footer {
        margin-top: 4rem;
        padding: 3.5rem clamp(1.5rem, 4vw, 2.5rem) 2rem;
        background: linear-gradient(160deg, var(--color-primary) 0%, #0f2a50 55%, var(--color-secondary) 100%);
        border-radius: 2rem 2rem 0 0;
        color: rgba(245, 252, 255, 0.9);
      }
      .footer__grid {
        display: grid;
        gap: 2.5rem;
      }
      .footer__mission h2 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
        color: #ffffff;
      }
      .footer__mission p {
        margin: 0;
        max-width: 32rem;
        line-height: 1.6;
      }
      .footer__contact ul,
      .footer__social ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.5rem;
      }
      .footer__social-link {
        text-decoration: none;
        color: inherit;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.75rem;
        transition: background 0.2s ease;
      }
      .footer__social-link:hover {
        background: rgba(45, 212, 191, 0.16);
        color: #ffffff;
      }
      .footer__legal {
        margin: 0;
        text-align: center;
        font-size: 0.85rem;
        color: rgba(235, 246, 255, 0.7);
        padding-top: 2.5rem;
      }
      @media (min-width: 900px) {
        .footer__grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: start;
        }
      }
    `
  ]
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly socials = [
    { label: 'Instagram', url: 'https://instagram.com/suelastoty', icon: '📸' },
    { label: 'Facebook', url: 'https://facebook.com/suelastoty', icon: '📘' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/suelastoty', icon: '💼' },
    { label: 'Email', url: 'mailto:ventas@suelastoty.com', icon: '✉️' }
  ];
}
