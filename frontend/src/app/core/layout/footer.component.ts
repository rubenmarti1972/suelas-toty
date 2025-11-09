import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  template: `
    <footer class="footer">
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
      <p class="footer__legal">© {{ currentYear }} Suelas Toty. Todos los derechos reservados.</p>
    </footer>
  `,
  styles: [
    `
      .footer {
        display: grid;
        gap: 2rem;
        padding: 3rem 0 2rem;
        border-top: 1px solid rgba(24, 49, 83, 0.1);
      }
      .footer__mission h2 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
        color: #183153;
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
      }
      .footer__social-link:hover {
        color: #33658a;
      }
      .footer__legal {
        margin: 0;
        text-align: center;
        font-size: 0.8rem;
        color: #5b7084;
      }
      @media (min-width: 900px) {
        .footer {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: start;
        }
        .footer__legal {
          grid-column: 1 / -1;
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
