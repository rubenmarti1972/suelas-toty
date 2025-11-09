import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ValuePillComponent } from '../../shared/components/value-pill/value-pill.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, ValuePillComponent],
  template: `
    <section class="hero">
      <div class="hero__content">
        <p class="hero__eyebrow">Fabricamos confianza para la industria del calzado</p>
        <h1 class="hero__title">Suelas que elevan tu marca a otro nivel</h1>
        <p class="hero__copy">
          Diseñamos, producimos y distribuimos suelas de alto desempeño para marcas que exigen precisión,
          resiliencia y una estética impecable en cada colección.
        </p>
        <div class="hero__actions">
          <a routerLink="/contacto" class="hero__cta hero__cta--primary">Agenda una consultoría</a>
          <a routerLink="/productos" class="hero__cta hero__cta--ghost">Explora el catálogo</a>
        </div>
        <div class="hero__values" aria-label="Valores corporativos">
          <app-value-pill *ngFor="let value of values" [label]="value"></app-value-pill>
        </div>
      </div>
      <aside class="hero__insight">
        <h2>Nuestra promesa</h2>
        <p>
          Integrar diseño, tecnología y logística para garantizar colecciones memorables y entregas a tiempo
          en todo el continente.
        </p>
        <ul>
          <li *ngFor="let promise of promises">
            <span class="hero__bullet"></span>
            <div>
              <h3>{{ promise.title }}</h3>
              <p>{{ promise.detail }}</p>
            </div>
          </li>
        </ul>
      </aside>
    </section>

    <section class="metrics" aria-label="Indicadores clave">
      <article *ngFor="let metric of metrics" class="metrics__card">
        <h3>{{ metric.value }}</h3>
        <p>{{ metric.label }}</p>
      </article>
    </section>

    <section class="solutions" id="soluciones">
      <header class="section-heading">
        <p class="section-heading__eyebrow">Soluciones integrales</p>
        <h2>Todo lo que necesitas para lanzar colecciones memorables</h2>
        <p class="section-heading__description">
          Unimos diseño, ingeniería y abastecimiento responsable para acompañar a tu equipo desde el concepto
          hasta la entrega final.
        </p>
      </header>
      <div class="solutions__grid">
        <article *ngFor="let solution of solutions" class="solutions__card">
          <h3>{{ solution.title }}</h3>
          <p>{{ solution.description }}</p>
          <ul>
            <li *ngFor="let bullet of solution.bullets">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="process" aria-label="Metodología de acompañamiento">
      <header class="section-heading section-heading--center">
        <p class="section-heading__eyebrow">Metodología</p>
        <h2>Acompañamiento experto en cada etapa</h2>
        <p class="section-heading__description">
          Nuestra metodología ágil permite adaptar volúmenes, materiales y acabados a las necesidades de tus
          mercados objetivo.
        </p>
      </header>
      <ol class="process__steps">
        <li *ngFor="let step of process" class="process__step">
          <span class="process__number">{{ step.order }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.detail }}</p>
        </li>
      </ol>
    </section>

    <section class="differentials">
      <div class="differentials__content">
        <header class="section-heading">
          <p class="section-heading__eyebrow">Valor para tu negocio</p>
          <h2>¿Por qué líderes confían en Suelas Toty?</h2>
        </header>
        <p class="differentials__intro">
          Nos comprometemos con la innovación continua, la trazabilidad total y una relación transparente
          con tu equipo de desarrollo.
        </p>
        <ul class="differentials__list">
          <li *ngFor="let differentiator of differentiators">
            <span class="differentials__icon">{{ differentiator.icon }}</span>
            <div>
              <h3>{{ differentiator.title }}</h3>
              <p>{{ differentiator.detail }}</p>
            </div>
          </li>
        </ul>
      </div>
      <aside class="differentials__cta" aria-label="Contacto comercial">
        <h3>Hablemos de tu próxima colección</h3>
        <p>
          Cuéntanos tus objetivos y construyamos un plan de producción a la medida de tu marca.
        </p>
        <a routerLink="/contacto" class="cta-button cta-button--primary">Contactar equipo comercial</a>
        <a routerLink="/servicio-al-cliente" class="cta-button cta-button--ghost">Servicio al cliente</a>
      </aside>
    </section>
  `,
  styles: [
    `
      .hero {
        display: grid;
        gap: 2.5rem;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        align-items: stretch;
        margin-bottom: 4.5rem;
        background: linear-gradient(140deg, rgba(15, 76, 117, 0.08), rgba(45, 212, 191, 0.12));
        border-radius: 2rem;
        padding: clamp(2rem, 4vw, 3rem);
        box-shadow: 0 24px 50px rgba(11, 29, 58, 0.12);
      }
      .hero__content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .hero__eyebrow {
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--color-secondary);
      }
      .hero__title {
        margin: 0;
        font-size: clamp(2.5rem, 5vw, 3.6rem);
        color: var(--color-primary);
        line-height: 1.1;
      }
      .hero__copy {
        max-width: 36rem;
        line-height: 1.7;
        font-size: 1.08rem;
        color: rgba(15, 31, 47, 0.85);
      }
      .hero__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .hero__cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0.8rem 1.8rem;
        font-weight: 600;
        text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .hero__cta--primary {
        background: var(--color-primary);
        color: #ffffff;
        box-shadow: 0 18px 38px rgba(11, 29, 58, 0.25);
      }
      .hero__cta--primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 22px 42px rgba(11, 29, 58, 0.3);
      }
      .hero__cta--ghost {
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid rgba(15, 76, 117, 0.18);
        color: var(--color-secondary);
      }
      .hero__cta--ghost:hover {
        background: rgba(45, 212, 191, 0.15);
      }
      .hero__values {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .hero__insight {
        background: #ffffff;
        padding: clamp(1.75rem, 4vw, 2.5rem);
        border-radius: 1.5rem;
        box-shadow: 0 20px 60px rgba(11, 29, 58, 0.08);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .hero__insight h2 {
        margin: 0;
        color: var(--color-primary);
      }
      .hero__insight p {
        margin: 0;
        color: rgba(15, 31, 47, 0.78);
        line-height: 1.6;
      }
      .hero__insight ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1.15rem;
      }
      .hero__insight li {
        display: flex;
        gap: 0.9rem;
        align-items: flex-start;
      }
      .hero__insight h3 {
        margin: 0 0 0.25rem;
        font-size: 1.05rem;
        color: var(--color-secondary);
      }
      .hero__insight li p {
        margin: 0;
      }
      .hero__bullet {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-top: 0.4rem;
        background: linear-gradient(135deg, var(--color-accent), #5eead4);
      }
      .metrics {
        display: grid;
        gap: 1.25rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        margin-bottom: 4rem;
      }
      .metrics__card {
        background: #ffffff;
        border-radius: 1.25rem;
        padding: 1.5rem;
        box-shadow: 0 14px 35px rgba(11, 29, 58, 0.09);
        border: 1px solid rgba(11, 29, 58, 0.06);
      }
      .metrics__card h3 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 2.6rem);
        color: var(--color-secondary);
      }
      .metrics__card p {
        margin: 0.35rem 0 0;
        color: rgba(15, 31, 47, 0.7);
      }
      .section-heading {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 2.5rem;
      }
      .section-heading--center {
        text-align: center;
        align-items: center;
      }
      .section-heading__eyebrow {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.85rem;
        color: var(--color-secondary);
      }
      .section-heading h2 {
        margin: 0;
        font-size: clamp(1.9rem, 4vw, 2.8rem);
        color: var(--color-primary);
      }
      .section-heading__description {
        margin: 0;
        max-width: 46rem;
        color: rgba(15, 31, 47, 0.75);
        line-height: 1.7;
      }
      .solutions {
        margin-bottom: 4.5rem;
      }
      .solutions__grid {
        display: grid;
        gap: 1.75rem;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
      .solutions__card {
        background: #ffffff;
        border-radius: 1.5rem;
        padding: clamp(1.5rem, 3vw, 2.25rem);
        border: 1px solid rgba(11, 29, 58, 0.08);
        box-shadow: 0 14px 40px rgba(11, 29, 58, 0.08);
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
      }
      .solutions__card h3 {
        margin: 0;
        color: var(--color-secondary);
      }
      .solutions__card p {
        margin: 0;
        color: rgba(15, 31, 47, 0.78);
      }
      .solutions__card ul {
        margin: 0;
        padding-left: 1.2rem;
        color: rgba(15, 31, 47, 0.7);
        display: grid;
        gap: 0.35rem;
      }
      .process {
        margin-bottom: 4.5rem;
        background: linear-gradient(180deg, rgba(238, 246, 255, 0.6) 0%, rgba(221, 244, 255, 0.25) 100%);
        border-radius: 2rem;
        padding: clamp(2rem, 4vw, 3rem);
        box-shadow: inset 0 0 0 1px rgba(11, 29, 58, 0.04);
      }
      .process__steps {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 1.75rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .process__step {
        background: #ffffff;
        border-radius: 1.5rem;
        padding: 1.75rem;
        box-shadow: 0 18px 45px rgba(11, 29, 58, 0.08);
        border: 1px solid rgba(11, 29, 58, 0.05);
      }
      .process__number {
        display: inline-flex;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 999px;
        align-items: center;
        justify-content: center;
        background: var(--color-accent);
        color: var(--color-primary);
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .process__step h3 {
        margin: 0 0 0.5rem;
        color: var(--color-secondary);
      }
      .process__step p {
        margin: 0;
        color: rgba(15, 31, 47, 0.75);
        line-height: 1.6;
      }
      .differentials {
        display: grid;
        gap: 2.5rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        align-items: start;
        margin-top: 4.5rem;
        background: #ffffff;
        border-radius: 2rem;
        padding: clamp(2rem, 4vw, 3rem);
        box-shadow: 0 26px 60px rgba(11, 29, 58, 0.12);
      }
      .differentials__intro {
        margin: 0 0 1.75rem;
        color: rgba(15, 31, 47, 0.78);
        line-height: 1.7;
      }
      .differentials__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1.5rem;
      }
      .differentials__list li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: start;
      }
      .differentials__icon {
        display: inline-flex;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.75rem;
        align-items: center;
        justify-content: center;
        background: var(--color-muted);
        color: var(--color-primary);
        font-size: 1.35rem;
      }
      .differentials__cta {
        background: linear-gradient(160deg, rgba(11, 29, 58, 0.92), rgba(15, 76, 117, 0.85));
        border-radius: 1.75rem;
        padding: clamp(2rem, 3vw, 2.5rem);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
      }
      .differentials__cta h3 {
        margin: 0;
        font-size: 1.6rem;
      }
      .differentials__cta p {
        margin: 0;
        color: rgba(236, 250, 255, 0.85);
        line-height: 1.6;
      }
      .cta-button {
        text-decoration: none;
        border-radius: 999px;
        padding: 0.85rem 1.8rem;
        font-weight: 600;
        text-align: center;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .cta-button--primary {
        background: var(--color-accent);
        color: var(--color-primary);
        box-shadow: 0 18px 40px rgba(45, 212, 191, 0.3);
      }
      .cta-button--primary:hover {
        transform: translateY(-2px);
      }
      .cta-button--ghost {
        background: rgba(255, 255, 255, 0.12);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.24);
      }
      .cta-button--ghost:hover {
        background: rgba(255, 255, 255, 0.22);
      }
      @media (max-width: 768px) {
        .hero {
          padding: 2rem;
        }
        .hero__cta {
          width: 100%;
        }
      }
    `
  ]
})
export class HomeComponent {
  protected readonly values = ['Calidad', 'Honestidad', 'Respeto', 'Servicio', 'Compromiso', 'Trabajo en equipo'];
  protected readonly promises = [
    {
      title: 'Logística sin fricciones',
      detail: 'Planeación de inventario y entregas coordinadas con tus fechas de lanzamiento.'
    },
    {
      title: 'Co-creación de producto',
      detail: 'Equipo de I+D dedicado para prototipos, pruebas de laboratorio y ajustes de diseño.'
    },
    {
      title: 'Relación transparente',
      detail: 'Reportes de avance y trazabilidad en tiempo real para cada orden de producción.'
    }
  ];
  protected readonly metrics = [
    { value: '+30 años', label: 'de experiencia en suelas de alto rendimiento' },
    { value: '15 países', label: 'con distribución activa y soporte local' },
    { value: '98% satisfacción', label: 'de clientes en auditorías de servicio' },
    { value: '72 hrs', label: 'para prototipos listos para pruebas de calce' }
  ];
  protected readonly solutions = [
    {
      title: 'Ingeniería de materiales',
      description: 'Seleccionamos compuestos de alto desempeño con enfoque en sostenibilidad y durabilidad.',
      bullets: ['Formulación personalizada por tipo de calzado', 'Análisis biomecánico y pruebas de flexión', 'Certificaciones internacionales vigentes']
    },
    {
      title: 'Producción versátil',
      description: 'Capacidad para tirajes cortos y altos volúmenes con control de calidad multinivel.',
      bullets: ['Celdas flexibles para series cápsula', 'Automatización y monitoreo en planta', 'Escalabilidad garantizada en temporadas pico']
    },
    {
      title: 'Abastecimiento inteligente',
      description: 'Planificamos inventarios, forecast y entregas con visibilidad en línea para tu equipo.',
      bullets: ['Integración con tu ERP y sistema de compras', 'Alertas preventivas de stock crítico', 'Red logística con cobertura continental']
    }
  ];
  protected readonly process = [
    {
      order: '01',
      title: 'Exploración y brief',
      detail: 'Definimos perfiles de usuario, objetivos de colección y requerimientos técnicos.'
    },
    {
      order: '02',
      title: 'Diseño y prototipado',
      detail: 'Desarrollamos propuestas materiales, renders y prototipos listos para validación.'
    },
    {
      order: '03',
      title: 'Industrialización',
      detail: 'Ajustamos moldes, programamos producción y establecemos controles de calidad.'
    },
    {
      order: '04',
      title: 'Entrega y soporte',
      detail: 'Coordinamos envíos, seguimiento postventa y mejora continua basada en datos.'
    }
  ];
  protected readonly differentiators = [
    {
      icon: '🧪',
      title: 'Laboratorio certificado',
      detail: 'Ensayos de resistencia, abrasión y tracción avalados por normas internacionales.'
    },
    {
      icon: '🌱',
      title: 'Sostenibilidad medible',
      detail: 'Uso de compuestos reciclados y reportes de huella de carbono en cada orden.'
    },
    {
      icon: '🤝',
      title: 'Alianzas estratégicas',
      detail: 'Red de proveedores y talleres satélite para responder a mercados emergentes.'
    },
    {
      icon: '📊',
      title: 'Visibilidad de datos',
      detail: 'Dashboard con indicadores clave de producción, inventario y calidad en tiempo real.'
    }
  ];
}
