import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ValuePillComponent } from '../../shared/components/value-pill/value-pill.component';

interface ProductCard {
  name: string;
  description: string;
  price: string;
  material: string;
  finish: string;
  image: string;
  tags: string[];
}

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

    <section class="catalog" id="catalogo" aria-label="Productos destacados">
      <header class="section-heading">
        <p class="section-heading__eyebrow">Catálogo profesional</p>
        <h2>16 diseños listos para impulsar tu colección</h2>
        <p class="section-heading__description">
          Suelas ergonómicas, ligeras y resistentes que optimizan costos y tiempos sin sacrificar estética.
        </p>
      </header>
      <div class="catalog__grid">
        <article *ngFor="let product of featuredProducts" class="catalog__card">
          <div class="catalog__image">
            <img [src]="product.image" [alt]="product.name" loading="lazy" />
            <div class="catalog__tags">
              <span *ngFor="let tag of product.tags">{{ tag }}</span>
            </div>
          </div>
          <h3>{{ product.name }}</h3>
          <p class="catalog__description">{{ product.description }}</p>
          <div class="catalog__specs">
            <span>{{ product.material }}</span>
            <span>{{ product.finish }}</span>
          </div>
          <div class="catalog__footer">
            <span class="catalog__price">{{ product.price }}</span>
            <button type="button" class="catalog__button">Agregar al carrito</button>
          </div>
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
        background: linear-gradient(140deg, rgba(15, 76, 117, 0.08), rgba(45, 212, 191, 0.12)),
          radial-gradient(circle at top right, rgba(56, 189, 248, 0.24), transparent 55%);
        border-radius: 2.75rem;
        padding: clamp(2.2rem, 4vw, 3rem);
        box-shadow: 0 30px 80px rgba(5, 18, 36, 0.15);
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
        background: rgba(45, 212, 191, 0.15);
        color: var(--color-secondary);
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
        padding: 0.85rem 1.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .hero__cta--primary {
        background: linear-gradient(135deg, #2dd4bf, #38bdf8);
        color: #041023;
        box-shadow: 0 20px 40px rgba(45, 212, 191, 0.28);
      }
      .hero__cta--primary:hover {
        transform: translateY(-2px);
      }
      .hero__cta--ghost {
        background: rgba(255, 255, 255, 0.85);
        border: 2px solid rgba(15, 76, 117, 0.15);
        color: var(--color-secondary);
      }
      .hero__cta--ghost:hover {
        background: rgba(45, 212, 191, 0.15);
      }
      .hero__stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
      }
      .hero__stat-card {
        background: #ffffff;
        border-radius: 1.5rem;
        padding: 1rem 1.2rem;
        box-shadow: 0 18px 45px rgba(5, 18, 36, 0.1);
        border: 1px solid rgba(11, 29, 58, 0.05);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .hero__stat-value {
        font-size: 1.45rem;
        font-weight: 700;
        color: var(--color-secondary);
      }
      .hero__stat-label {
        font-size: 0.9rem;
        color: rgba(15, 31, 47, 0.65);
      }
      .hero__visual {
        display: flex;
        justify-content: center;
      }
      .hero__visual-card {
        background: radial-gradient(circle at top, rgba(45, 212, 191, 0.32), transparent 60%),
          linear-gradient(160deg, #0b1d3a 0%, #0f4c75 100%);
        border-radius: 2.5rem;
        padding: 2.5rem 2.25rem 2rem;
        display: grid;
        gap: 1.5rem;
        justify-items: center;
        color: rgba(236, 250, 255, 0.9);
        box-shadow: 0 28px 60px rgba(5, 18, 36, 0.28);
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
      }
      .hero__visual-caption p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
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
        font-size: clamp(2rem, 4vw, 2.9rem);
        color: var(--color-primary);
      }
      .section-heading__description {
        margin: 0;
        max-width: 48rem;
        color: rgba(15, 31, 47, 0.75);
        line-height: 1.7;
      }
      .objective {
        background: #ffffff;
        border-radius: 2.5rem;
        padding: clamp(2.25rem, 4vw, 3rem);
        box-shadow: 0 24px 65px rgba(5, 18, 36, 0.12);
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
        background: linear-gradient(135deg, #2dd4bf, #38bdf8);
        margin-top: 0.35rem;
      }
      .objective__list p {
        margin: 0;
        line-height: 1.7;
        color: rgba(15, 31, 47, 0.8);
      }
      .purpose {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
      .purpose__card {
        background: linear-gradient(160deg, rgba(15, 76, 117, 0.08), rgba(45, 212, 191, 0.16));
        border-radius: 1.75rem;
        padding: 2rem;
        box-shadow: inset 0 0 0 1px rgba(11, 29, 58, 0.04);
        display: grid;
        gap: 1rem;
      }
      .purpose__card h3 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--color-secondary);
      }
      .purpose__card p {
        margin: 0;
        line-height: 1.7;
        color: rgba(15, 31, 47, 0.78);
      }
      .values__grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .values__card {
        background: #ffffff;
        border-radius: 1.75rem;
        padding: 1.75rem;
        display: grid;
        gap: 1rem;
        border: 1px solid rgba(11, 29, 58, 0.06);
        box-shadow: 0 20px 50px rgba(5, 18, 36, 0.08);
      }
      .values__card p {
        margin: 0;
        line-height: 1.6;
        color: rgba(15, 31, 47, 0.75);
      }
      .catalog__grid {
        display: grid;
        gap: 1.75rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      .catalog__card {
        background: #ffffff;
        border-radius: 2rem;
        padding: 1.75rem 1.5rem;
        display: grid;
        gap: 1.1rem;
        border: 1px solid rgba(11, 29, 58, 0.06);
        box-shadow: 0 22px 55px rgba(5, 18, 36, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .catalog__card:hover {
        transform: translateY(-6px);
        box-shadow: 0 32px 70px rgba(5, 18, 36, 0.18);
      }
      .catalog__image {
        position: relative;
        background: linear-gradient(160deg, rgba(236, 250, 255, 0.9), rgba(221, 244, 255, 0.5));
        border-radius: 1.5rem;
        padding: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .catalog__image img {
        width: clamp(160px, 12vw, 220px);
        height: auto;
      }
      .catalog__tags {
        position: absolute;
        inset: auto 1rem -0.75rem 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
      }
      .catalog__tags span {
        background: #0f4c75;
        color: #ffffff;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        letter-spacing: 0.06em;
      }
      .catalog__description {
        margin: 0;
        line-height: 1.6;
        color: rgba(15, 31, 47, 0.72);
      }
      .catalog__specs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
        color: rgba(15, 31, 47, 0.65);
        font-size: 0.9rem;
      }
      .catalog__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .catalog__price {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--color-secondary);
      }
      .catalog__button {
        border: none;
        border-radius: 999px;
        padding: 0.65rem 1.35rem;
        font-weight: 600;
        cursor: pointer;
        background: linear-gradient(135deg, #2dd4bf, #38bdf8);
        color: #041023;
        box-shadow: 0 18px 38px rgba(45, 212, 191, 0.28);
        transition: transform 0.2s ease;
      }
      .catalog__button:hover {
        transform: translateY(-2px);
      }
      .process {
        background: linear-gradient(180deg, rgba(238, 246, 255, 0.7) 0%, rgba(221, 244, 255, 0.35) 100%);
        border-radius: 2.5rem;
        padding: clamp(2.25rem, 4vw, 3rem);
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
        border-radius: 1.75rem;
        padding: 1.85rem;
        box-shadow: 0 24px 55px rgba(5, 18, 36, 0.1);
        border: 1px solid rgba(11, 29, 58, 0.05);
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
        background: linear-gradient(135deg, #2dd4bf, #38bdf8);
        color: #041023;
        font-weight: 700;
      }
      .process__step h3 {
        margin: 0;
        color: var(--color-secondary);
      }
      .process__step p {
        margin: 0;
        color: rgba(15, 31, 47, 0.75);
        line-height: 1.6;
      }
      .differentials {
        background: #ffffff;
        border-radius: 2.5rem;
        padding: clamp(2.25rem, 4vw, 3rem);
        box-shadow: 0 30px 70px rgba(5, 18, 36, 0.16);
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
        background: linear-gradient(135deg, rgba(45, 212, 191, 0.28), rgba(56, 189, 248, 0.28));
        font-size: 1.5rem;
        color: var(--color-primary);
      }
      .differentials__list h3 {
        margin: 0 0 0.5rem;
        color: var(--color-secondary);
      }
      .differentials__list p {
        margin: 0;
        line-height: 1.6;
        color: rgba(15, 31, 47, 0.72);
      }
      .differentials__cta {
        background: linear-gradient(160deg, rgba(11, 29, 58, 0.95), rgba(15, 76, 117, 0.9));
        border-radius: 2rem;
        padding: clamp(2rem, 3vw, 2.5rem);
        color: #ffffff;
        display: grid;
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
        background: linear-gradient(135deg, #2dd4bf, #38bdf8);
        color: #041023;
        box-shadow: 0 20px 45px rgba(45, 212, 191, 0.32);
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
          padding: 2.25rem;
        }
        .hero__actions,
        .catalog__footer {
          flex-direction: column;
          align-items: stretch;
        }
        .hero__cta,
        .catalog__button {
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
  protected readonly featuredProducts: ProductCard[] = [
    {
      name: 'Suela Aurora EVA',
      description: 'Ligereza extrema y retorno de energía para calzado urbano premium.',
      price: '$48.900',
      material: 'EVA de alta densidad',
      finish: 'Texturizado antideslizante',
      image: 'assets/images/products/suela-aurora.svg',
      tags: ['Urbano', 'EVA', 'Ligera']
    },
    {
      name: 'Suela Impacto Gel',
      description: 'Tecnología de cápsulas de gel para absorción de impacto en calzado deportivo.',
      price: '$54.500',
      material: 'Compuesto EVA + Gel',
      finish: 'Canales de ventilación',
      image: 'assets/images/products/suela-impacto.svg',
      tags: ['Deportivo', 'Amortiguación']
    },
    {
      name: 'Suela Sierra Trail',
      description: 'Agarre multidireccional para terrenos exigentes y climas húmedos.',
      price: '$62.800',
      material: 'Caucho vulcanizado',
      finish: 'Tacos pronunciados',
      image: 'assets/images/products/suela-sierra.svg',
      tags: ['Outdoor', 'Tracción']
    },
    {
      name: 'Suela Urbana Flex',
      description: 'Diseño flexible y silencioso ideal para jornadas laborales extensas.',
      price: '$49.300',
      material: 'TPU + Insertos EVA',
      finish: 'Flexión segmentada',
      image: 'assets/images/products/suela-urbana.svg',
      tags: ['Corporativo', 'Confort']
    },
    {
      name: 'Suela Atlántica Pro',
      description: 'Compuesto resistente a la salinidad para calzado náutico y de playa.',
      price: '$58.200',
      material: 'TPR marino',
      finish: 'Ranuras de drenaje',
      image: 'assets/images/products/suela-atlantica.svg',
      tags: ['Náutico', 'Resistente']
    },
    {
      name: 'Suela EcoVerde',
      description: 'Hasta 45% de material reciclado con certificación de ciclo cerrado.',
      price: '$46.700',
      material: 'Compuesto reciclado',
      finish: 'Grabado eco-friendly',
      image: 'assets/images/products/suela-ecoverde.svg',
      tags: ['Sostenible', 'Reciclado']
    },
    {
      name: 'Suela Titan Grip',
      description: 'Estabilidad reforzada para botas industriales y seguridad ocupacional.',
      price: '$64.900',
      material: 'PU bidensidad',
      finish: 'Resistencia dieléctrica',
      image: 'assets/images/products/suela-titan.svg',
      tags: ['Industrial', 'Seguridad']
    },
    {
      name: 'Suela Boreal Kids',
      description: 'Peso ultraligero y colores brillantes para colecciones infantiles.',
      price: '$38.400',
      material: 'EVA expandido',
      finish: 'Talón amortiguado',
      image: 'assets/images/products/suela-boreal.svg',
      tags: ['Infantil', 'Colores']
    },
    {
      name: 'Suela Horizonte Trek',
      description: 'Sistema de amortiguación gradual para caminatas de larga distancia.',
      price: '$59.900',
      material: 'PU + EVA',
      finish: 'Plataforma híbrida',
      image: 'assets/images/products/suela-horizonte.svg',
      tags: ['Trekking', 'Resistente']
    },
    {
      name: 'Suela Marina Soft',
      description: 'Plantilla anatómica integrada para sandalias premium.',
      price: '$43.200',
      material: 'PU suave',
      finish: 'Agarre marino',
      image: 'assets/images/products/suela-marina.svg',
      tags: ['Sandalia', 'Ergonómica']
    },
    {
      name: 'Suela Quantum Air',
      description: 'Celdas de aire visibles con soporte lateral para sneakers modernos.',
      price: '$67.500',
      material: 'TPU inyectado',
      finish: 'Cámara de aire',
      image: 'assets/images/products/suela-quantum.svg',
      tags: ['Sneaker', 'Innovación']
    },
    {
      name: 'Suela Galaxia Sport',
      description: 'Diseño aerodinámico para disciplinas de alto rendimiento.',
      price: '$61.400',
      material: 'EVA comprimido',
      finish: 'Patrón direccional',
      image: 'assets/images/products/suela-galaxia.svg',
      tags: ['Running', 'Performance']
    },
    {
      name: 'Suela Prisma Comfort',
      description: 'Plantilla termoformada para máximo confort diario.',
      price: '$44.600',
      material: 'Memory foam',
      finish: 'Micro perforaciones',
      image: 'assets/images/products/suela-prisma.svg',
      tags: ['Casual', 'Confort']
    },
    {
      name: 'Suela Andes Shield',
      description: 'Protección contra temperaturas extremas para calzado outdoor.',
      price: '$65.300',
      material: 'Caucho + PU',
      finish: 'Barreras térmicas',
      image: 'assets/images/products/suela-andes.svg',
      tags: ['Montaña', 'Protección']
    },
    {
      name: 'Suela Pacífica Ultra',
      description: 'Flexibilidad y agarre suave para calzado wellness.',
      price: '$47.900',
      material: 'TPR flexible',
      finish: 'Ondas antideslizantes',
      image: 'assets/images/products/suela-pacifica.svg',
      tags: ['Wellness', 'Suavidad']
    },
    {
      name: 'Suela Zenith Elite',
      description: 'Diseño premium para colecciones exclusivas de edición limitada.',
      price: '$72.000',
      material: 'TPU cristal',
      finish: 'Efecto translúcido',
      image: 'assets/images/products/suela-zenith.svg',
      tags: ['Edición limitada', 'Lujo']
    }
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
