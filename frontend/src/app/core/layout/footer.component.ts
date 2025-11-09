import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  template: `
    <footer class="footer">
      <div class="footer__content">
        <section class="footer__brand">
          <img src="assets/images/logo.png" alt="Suelas Toty" class="footer__logo" />
          <div>
            <h2>Suelas Toty</h2>
            <p>
              Suelas de alto desempeño, procesos sostenibles y un equipo comprometido con la excelencia
              colombiana.
            </p>
          </div>
        </section>
        <section class="footer__mission">
          <h3>Impulsamos pasos seguros</h3>
          <p>
            Nuestra promesa es entregar soluciones en suelas con precisión, transparencia y un servicio que
            acompaña cada lanzamiento.
          </p>
        </section>
        <section class="footer__contact">
          <h3>Contacto directo</h3>
          <ul>
            <li><span class="footer__icon">📞</span> +57 300 000 0000</li>
            <li><span class="footer__icon">✉️</span> ventas@suelastoty.com</li>
            <li><span class="footer__icon">📍</span> Medellín, Colombia</li>
          </ul>
        </section>
        <section class="footer__social">
          <h3>Síguenos</h3>
          <div class="footer__social-grid">
            <a
              *ngFor="let social of socials"
              [href]="social.url"
              target="_blank"
              rel="noopener"
              class="footer__social-link"
            >
              <img [src]="social.icon" [alt]="social.label" loading="lazy" />
              <span>{{ social.label }}</span>
            </a>
          </div>
        </section>
      </div>
      <div class="footer__bottom">
        <p>© {{ currentYear }} Suelas Toty. Todos los derechos reservados.</p>
        <div class="footer__policies">
          <a href="#terminos">Términos</a>
          <span aria-hidden="true">•</span>
          <a href="#privacidad">Privacidad</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        margin-top: 5rem;
        padding: 3.75rem 0 2.75rem;
        border-radius: 2.5rem 2.5rem 0 0;
        background: linear-gradient(200deg, #0f3158 0%, #102844 45%, #0b1d34 100%);
        color: #f5f8ff;
        box-shadow: 0 -22px 48px rgba(8, 19, 36, 0.45);
        border-top: 1px solid rgba(255, 255, 255, 0.16);
      }
      .footer__content {
        display: grid;
        gap: 2.5rem;
        width: min(1800px, calc(100% - 3rem));
        margin: 0 auto;
      }
      .footer__brand {
        display: flex;
        gap: 1.25rem;
        align-items: center;
        padding: 1.5rem;
        border-radius: 1.75rem;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        backdrop-filter: blur(10px);
      }
      .footer__logo {
        width: clamp(96px, 18vw, 150px);
        height: auto;
        border-radius: 2.25rem;
        padding: 0.55rem 1.15rem;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 16px 28px rgba(5, 14, 28, 0.45);
      }
      .footer__brand h2 {
        margin: 0 0 0.5rem;
        font-size: 1.8rem;
        color: #ffffff;
      }
      .footer__brand p {
        margin: 0;
        max-width: 32rem;
        line-height: 1.7;
        color: rgba(245, 248, 255, 0.76);
      }
      .footer__mission h3,
      .footer__contact h3,
      .footer__social h3 {
        margin: 0 0 0.75rem;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(255, 255, 255, 0.82);
      }
      .footer__mission p {
        margin: 0;
        max-width: 28rem;
        line-height: 1.7;
        color: rgba(245, 248, 255, 0.72);
      }
      .footer__contact ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;
        color: rgba(245, 248, 255, 0.82);
      }
      .footer__icon {
        font-size: 1.2rem;
        margin-right: 0.5rem;
      }
      .footer__social-grid {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      }
      .footer__social-link {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem 1rem;
        border-radius: 1rem;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.12);
        color: #ffffff;
        transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      }
      .footer__social-link img {
        width: 28px;
        height: 28px;
      }
      .footer__social-link:hover {
        background: linear-gradient(135deg, #f6ca7f, #ffd89a);
        color: #153250;
        transform: translateY(-2px);
        box-shadow: 0 18px 32px rgba(5, 14, 28, 0.45);
      }
      .footer__bottom {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.16);
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        color: rgba(245, 248, 255, 0.7);
        width: min(1800px, calc(100% - 3rem));
        margin-left: auto;
        margin-right: auto;
      }
      .footer__bottom p {
        margin: 0;
      }
      .footer__policies {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .footer__policies a {
        color: inherit;
        text-decoration: none;
      }
      .footer__policies a:hover {
        text-decoration: underline;
      }
      @media (min-width: 1000px) {
        .footer__content {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: start;
        }
      }
      @media (max-width: 640px) {
        .footer__brand {
          flex-direction: column;
          align-items: flex-start;
        }
        .footer__bottom {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
  ]
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly socials: SocialLink[] = [
    { label: 'Instagram', url: 'https://instagram.com/suelastoty', icon: 'assets/icons/instagram.svg' },
    { label: 'Facebook', url: 'https://facebook.com/suelastoty', icon: 'assets/icons/facebook.svg' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/suelastoty', icon: 'assets/icons/linkedin.svg' },
    { label: 'WhatsApp', url: 'https://wa.me/573000000000', icon: 'assets/icons/whatsapp.svg' }
  ];
}
