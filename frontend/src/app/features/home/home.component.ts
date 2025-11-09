import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ValuePillComponent } from '../../shared/components/value-pill/value-pill.component';

interface ProcessStep {
  order: string;
  title: string;
  detail: string;
}

interface Differentiator {
  icon: string;
  title: string;
  detail: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, ValuePillComponent],
  template: `
    <section class="hero">
      <div class="hero__content">
        <p class="hero__badge">Excelencia colombiana en suelas</p>
        <h1>Suelas Toty: ingeniería, estilo y sostenibilidad para tu marca</h1>
        <p class="hero__copy">
          Combinamos materiales certificados, maquinaria de última tecnología y procesos circulares para
          producir suelas de alto impacto visual y funcional. Cada colección recibe acompañamiento experto,
          tiempos controlados y trazabilidad total.
        </p>
        <div class="hero__actions">
          <a routerLink="/productos" class="hero__cta hero__cta--primary">Explorar catálogo</a>
          <a routerLink="/contacto" class="hero__cta hero__cta--ghost">Hablar con un especialista</a>
        </div>
        <div class="hero__stats">
          <article *ngFor="let highlight of heroHighlights" class="hero__stat-card">
            <span class="hero__stat-value">{{ highlight.value }}</span>
            <span class="hero__stat-label">{{ highlight.label }}</span>
          </article>
        </div>
      </div>
      <div class="hero__visual">
        <div class="hero__visual-card">
          <img
            src="assets/images/products/suela-aurora.svg"
            alt="Suela performance Suelas Toty"
            loading="lazy"
          />
          <div class="hero__visual-caption">
            <span>Serie Performance</span>
            <p>Compuestos reciclados, agarre superior y confort duradero en cada paso.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="objective" id="objetivo">
      <header class="section-heading">
        <p class="section-heading__eyebrow">Objetivo específico</p>
        <h2>Producir suelas con la más alta calidad en diseños, pesos y colores</h2>
        <p class="section-heading__description">
          Nuestros pilares estratégicos garantizan operaciones sólidas, sostenibles y listos para el mercado.
        </p>
      </header>
      <ul class="objective__list">
        <li *ngFor="let item of objectiveBullets">
          <span class="objective__marker" aria-hidden="true"></span>
          <p>{{ item }}</p>
        </li>
      </ul>
    </section>

    <section class="purpose" aria-label="Misión y visión">
      <article class="purpose__card">
        <h3>Misión</h3>
        <p>{{ mission }}</p>
      </article>
      <article class="purpose__card">
        <h3>Visión</h3>
        <p>{{ vision }}</p>
      </article>
    </section>

    <section class="values" aria-label="Valores corporativos">
      <header class="section-heading section-heading--center">
        <p class="section-heading__eyebrow">Cultura Toty</p>
        <h2>Valores que acompañan cada proyecto</h2>
        <p class="section-heading__description">
          Creamos alianzas duraderas con marcas que buscan un socio confiable y humano en cada producción.
        </p>
      </header>
      <div class="values__grid">
        <article *ngFor="let value of valuesDetailed" class="values__card">
          <app-value-pill [label]="value.title"></app-value-pill>
          <p>{{ value.description }}</p>
        </article>
      </div>
    </section>

    <section class="process" aria-label="Proceso industrial Toty">
      <header class="section-heading section-heading--center">
        <p class="section-heading__eyebrow">Metodología</p>
        <h2>Control total desde el brief hasta la entrega</h2>
        <p class="section-heading__description">
          Equipos especializados coordinan el desarrollo técnico, la automatización y la logística para
          garantizar colecciones memorables.
        </p>
      </header>
      <ol class="process__steps">
        <li *ngFor="let step of process" class="process__step">
          <span class="process__number">{{ step.order }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.detail }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="differentials" aria-label="Razones para elegir Suelas Toty">
      <header class="section-heading">
        <p class="section-heading__eyebrow">Valor estratégico</p>
        <h2>Mucho más que una fábrica de suelas</h2>
      </header>
      <div class="differentials__content">
        <ul class="differentials__list">
          <li *ngFor="let differentiator of differentiators">
            <span class="differentials__icon">{{ differentiator.icon }}</span>
            <div>
              <h3>{{ differentiator.title }}</h3>
              <p>{{ differentiator.detail }}</p>
            </div>
          </li>
        </ul>
        <aside class="differentials__cta">
          <h3>Agenda una visita técnica</h3>
          <p>
            Recorre nuestra planta, conoce los laboratorios y descubre cómo optimizar tus próximas
            colecciones.
          </p>
          <a routerLink="/contacto" class="cta-button cta-button--primary">Hablar con ventas</a>
          <a routerLink="/servicio-al-cliente" class="cta-button cta-button--ghost">Soporte dedicado</a>
        </aside>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      section {
        margin-bottom: 4.5rem;
      }
      .hero {
        display: grid;
        gap: 2.5rem;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        align-items: center;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(241, 244, 249, 0.9));
        border-radius: 2.75rem;
        padding: clamp(2.4rem, 4.5vw, 3.4rem);
        box-shadow: 0 30px 80px rgba(18, 40, 76, 0.15);
        border: 1px solid rgba(12, 47, 98, 0.08);
      }
      .hero__content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .hero__badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1.25rem;
        border-radius: 999px;
        background: rgba(244, 160, 36, 0.12);
        color: var(--color-primary);
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .hero h1 {
        margin: 0;
        font-size: clamp(2.65rem, 5vw, 3.8rem);
        color: var(--color-primary);
        line-height: 1.08;
      }
      .hero__copy {
        margin: 0;
        max-width: 38rem;
        line-height: 1.75;
        font-size: 1.08rem;
        color: rgba(28, 39, 56, 0.78);
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
        padding: 0.85rem 1.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .hero__cta--primary {
        background: linear-gradient(135deg, var(--color-accent), #ffd89a);
        color: var(--color-primary);
        box-shadow: 0 18px 38px rgba(18, 40, 76, 0.18);
      }
      .hero__cta--primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 24px 46px rgba(18, 40, 76, 0.2);
      }
      .hero__cta--ghost {
        background: var(--color-surface);
        border: 1px solid rgba(12, 47, 98, 0.15);
        color: rgba(12, 47, 98, 0.75);
        box-shadow: 0 10px 24px rgba(18, 40, 76, 0.08);
      }
      .hero__cta--ghost:hover {
        background: rgba(241, 244, 249, 0.8);
      }
      .hero__stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
      }
      .hero__stat-card {
        background: var(--color-surface);
        border-radius: 1.5rem;
        padding: 1rem 1.2rem;
        box-shadow: 0 18px 36px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .hero__stat-value {
        font-size: 1.45rem;
        font-weight: 700;
        color: var(--color-primary);
      }
      .hero__stat-label {
        font-size: 0.9rem;
        color: rgba(28, 39, 56, 0.65);
      }
      .hero__visual {
        display: flex;
        justify-content: center;
      }
      .hero__visual-card {
        background: linear-gradient(140deg, rgba(255, 255, 255, 0.95), rgba(241, 244, 249, 0.85));
        border-radius: 2.5rem;
        padding: 2.5rem 2.25rem 2rem;
        display: grid;
        gap: 1.5rem;
        justify-items: center;
        color: rgba(28, 39, 56, 0.85);
        box-shadow: 0 26px 60px rgba(18, 40, 76, 0.15);
        border: 1px solid rgba(12, 47, 98, 0.08);
      }
      .hero__visual-card img {
        width: clamp(220px, 30vw, 320px);
        height: auto;
      }
      .hero__visual-caption {
        text-align: center;
        display: grid;
        gap: 0.5rem;
      }
      .hero__visual-caption span {
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--color-primary);
      }
      .hero__visual-caption p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
        color: rgba(28, 39, 56, 0.72);
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
        color: rgba(244, 160, 36, 0.75);
      }
      .section-heading h2 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 2.9rem);
        color: var(--color-primary);
      }
      .section-heading__description {
        margin: 0;
        max-width: 48rem;
        color: rgba(28, 39, 56, 0.68);
        line-height: 1.7;
      }
      .objective {
        background: var(--color-surface);
        border-radius: 2.5rem;
        padding: clamp(2.25rem, 4vw, 3rem);
        box-shadow: 0 24px 60px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
      }
      .objective__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1.25rem;
      }
      .objective__list li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: flex-start;
      }
      .objective__marker {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 0.35rem;
        background: linear-gradient(135deg, var(--color-accent), #ffc861);
        margin-top: 0.35rem;
      }
      .objective__list p {
        margin: 0;
        line-height: 1.7;
        color: rgba(28, 39, 56, 0.78);
      }
      .purpose {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
      .purpose__card {
        background: var(--color-surface);
        border-radius: 1.75rem;
        padding: 2rem;
        box-shadow: 0 20px 48px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
        display: grid;
        gap: 1rem;
      }
      .purpose__card h3 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--color-primary);
      }
      .purpose__card p {
        margin: 0;
        line-height: 1.7;
        color: rgba(28, 39, 56, 0.75);
      }
      .values__grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .values__card {
        background: var(--color-surface);
        border-radius: 1.75rem;
        padding: 1.75rem;
        display: grid;
        gap: 1rem;
        border: 1px solid rgba(12, 47, 98, 0.08);
        box-shadow: 0 22px 52px rgba(18, 40, 76, 0.12);
      }
      .values__card p {
        margin: 0;
        line-height: 1.6;
        color: rgba(28, 39, 56, 0.75);
      }
      
      .process {
        background: var(--color-surface);
        border-radius: 2.5rem;
        padding: clamp(2.25rem, 4vw, 3rem);
        box-shadow: 0 26px 68px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
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
        background: var(--color-surface-alt);
        border-radius: 1.75rem;
        padding: 1.85rem;
        box-shadow: 0 18px 42px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
        display: grid;
        gap: 0.75rem;
      }
      .process__number {
        display: inline-flex;
        width: 2.35rem;
        height: 2.35rem;
        border-radius: 999px;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--color-accent), #ffd89a);
        color: var(--color-primary);
        font-weight: 700;
      }
      .process__step h3 {
        margin: 0;
        color: var(--color-primary);
      }
      .process__step p {
        margin: 0;
        color: rgba(28, 39, 56, 0.75);
        line-height: 1.6;
      }
      .differentials {
        background: var(--color-surface);
        border-radius: 2.5rem;
        padding: clamp(2.25rem, 4vw, 3rem);
        box-shadow: 0 30px 72px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
      }
      .differentials__content {
        display: grid;
        gap: 2.5rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        align-items: start;
      }
      .differentials__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1.75rem;
      }
      .differentials__list li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1.25rem;
        align-items: start;
      }
      .differentials__icon {
        display: inline-flex;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 0.9rem;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--color-accent), #ffd89a);
        font-size: 1.5rem;
        color: var(--color-primary);
      }
      .differentials__list h3 {
        margin: 0 0 0.5rem;
        color: var(--color-primary);
      }
      .differentials__list p {
        margin: 0;
        line-height: 1.6;
        color: rgba(28, 39, 56, 0.72);
      }
      .differentials__cta {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(241, 244, 249, 0.88));
        border-radius: 2rem;
        padding: clamp(2rem, 3vw, 2.5rem);
        color: var(--color-primary);
        display: grid;
        gap: 1.5rem;
        box-shadow: 0 24px 56px rgba(18, 40, 76, 0.12);
        border: 1px solid rgba(12, 47, 98, 0.08);
      }
      .differentials__cta h3 {
        margin: 0;
        font-size: 1.6rem;
      }
      .differentials__cta p {
        margin: 0;
        color: rgba(28, 39, 56, 0.72);
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
        background: linear-gradient(135deg, var(--color-accent), #ffd89a);
        color: var(--color-primary);
        box-shadow: 0 18px 36px rgba(18, 40, 76, 0.18);
      }
      .cta-button--primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 24px 44px rgba(18, 40, 76, 0.22);
      }
      .cta-button--ghost {
        background: var(--color-surface);
        color: rgba(12, 47, 98, 0.78);
        border: 1px solid rgba(12, 47, 98, 0.18);
        box-shadow: 0 12px 28px rgba(18, 40, 76, 0.1);
      }
      .cta-button--ghost:hover {
        background: rgba(241, 244, 249, 0.8);
      }
      @media (max-width: 768px) {
        .hero {
          padding: 2.25rem;
        }
        .hero__actions {
          flex-direction: column;
          align-items: stretch;
        }
        .hero__cta {
          width: 100%;
        }
      }
    `
  ]
})
export class HomeComponent {
  protected readonly heroHighlights = [
    { value: '+30 años', label: 'de experiencia en diseño y manufactura' },
    { value: '16 líneas activas', label: 'con entregas rápidas y flexibles' },
    { value: 'ISO 9001', label: 'Procesos certificados y trazables' }
  ];
  protected readonly objectiveBullets = [
    'Construir un negocio sólido y sostenible que genere estabilidad y perdure en el mercado.',
    'Implementar maquinaria de última tecnología para maximizar tiempos y costos.',
    'Ser fuente de empleo y preservar el medio ambiente con procesos de reciclaje.'
  ];
  protected readonly mission =
    'Proveer suelas de alta calidad e innovación para fabricantes de calzado, buscando seguridad, estabilidad y rentabilidad, contribuyendo al desarrollo socioeconómico y la generación de empleo en la región.';
  protected readonly vision =
    'Para 2029, seremos líderes regionales y nacionales en comercialización y producción de suelas, con líneas de presentación fabricadas con maquinaria de alta tecnología.';
  protected readonly valuesDetailed = [
    { title: 'Calidad', description: 'Atención a requisitos y amabilidad en el servicio.' },
    { title: 'Honestidad', description: 'Actuamos con verdad y justicia en cada decisión.' },
    { title: 'Respeto', description: 'Reconocemos la individualidad y el cuidado interpersonal.' },
    { title: 'Servicio', description: 'La satisfacción de nuestros clientes es la razón de ser.' },
    { title: 'Compromiso', description: 'Pertenencia y constancia para servir mejor cada día.' },
    { title: 'Trabajo en equipo', description: 'Colaboramos para alcanzar resultados de calidad.' }
  ];
  protected readonly process: ProcessStep[] = [
    {
      order: '01',
      title: 'Descubrimiento estratégico',
      detail: 'Analizamos el perfil de usuario, segmentación del mercado y objetivos de colección junto a tu equipo.'
    },
    {
      order: '02',
      title: 'Diseño y prototipado ágil',
      detail: 'Laboratorio interno para ensayos, renders 3D y pruebas de calce en ciclos iterativos rápidos.'
    },
    {
      order: '03',
      title: 'Industrialización inteligente',
      detail: 'Maquinaria de última generación optimiza moldes, tiempos de inyección y control de calidad.'
    },
    {
      order: '04',
      title: 'Logística sostenible',
      detail: 'Coordinamos entregas, reciclaje de excedentes y seguimiento postventa con indicadores en vivo.'
    }
  ];
  protected readonly differentiators: Differentiator[] = [
    {
      icon: '🧪',
      title: 'Laboratorio certificado',
      detail: 'Ensayos de abrasión, tracción y fatiga avalados por normas internacionales.'
    },
    {
      icon: '🌱',
      title: 'Economía circular',
      detail: 'Programas de reciclaje y trazabilidad para reducir la huella ambiental de cada colección.'
    },
    {
      icon: '⚙️',
      title: 'Automatización integral',
      detail: 'Monitoreo en tiempo real de maquinaria y mantenimiento predictivo para cero paradas.'
    },
    {
      icon: '🤝',
      title: 'Acompañamiento experto',
      detail: 'Equipo multidisciplinario de diseño, ingeniería y servicio al cliente a tu lado.'
    }
  ];
}
