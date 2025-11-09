import { Component } from '@angular/core';
import { CurrencyPipe, DecimalPipe, NgFor } from '@angular/common';
import productsData from '../../../assets/data/products.json';

interface Product {
  reference: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  colors: string[];
  status: string;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DecimalPipe],
  template: `
    <section class="products">
      <header class="products__header">
        <div>
          <h1>Catálogo de productos</h1>
          <p>
            Consulta referencias, precios, variaciones y disponibilidad en tiempo real.
            Actualizado automáticamente con la información del inventario y los pedidos.
          </p>
        </div>
        <button type="button" class="products__cta">Descargar ficha técnica</button>
      </header>

      <div class="products__grid">
        <article class="product-card" *ngFor="let product of products">
          <div class="product-card__media" [attr.data-status]="statusBadge(product.status)">
            <span class="product-card__badge">{{ product.status }}</span>
            <img [src]="product.image" [alt]="product.name" loading="lazy" />
            <span class="product-card__reference">Ref. {{ product.reference }}</span>
          </div>
          <div class="product-card__body">
            <header class="product-card__header">
              <h2>{{ product.name }}</h2>
              <p class="product-card__price">
                {{ product.price | currency: product.currency:'symbol':'1.2-2' }} / par
              </p>
            </header>
            <div class="product-card__colors" aria-label="Variaciones de color disponibles">
              <span class="product-card__label">Colores</span>
              <div class="product-card__chips">
                <span class="product-card__chip" *ngFor="let color of product.colors">{{ color }}</span>
              </div>
            </div>
            <div class="product-card__stats">
              <div>
                <span class="product-card__stats-label">Inventario disponible</span>
                <span class="product-card__stats-value">{{ product.stock | number }} unidades</span>
              </div>
              <div>
                <span class="product-card__stats-label">Entrega estimada</span>
                <span class="product-card__stats-value">{{ leadTime(product.status) }}</span>
              </div>
            </div>
            <div class="product-card__actions">
              <button type="button" class="product-card__action">Solicitar muestra</button>
              <button type="button" class="product-card__ghost">Agregar a cotización</button>
            </div>
          </div>
        </article>
      </div>

      <section class="products__summary">
        <h2>Capacidades operativas</h2>
        <ul>
          <li>Planificación de producción conectada al módulo de inventario.</li>
          <li>Integración con órdenes de compra y portal de clientes.</li>
          <li>Alertas de stock mínimo configurables por referencia y color.</li>
        </ul>
      </section>
    </section>
  `,
  styles: [
    `
      .products {
        display: grid;
        gap: 3rem;
        color: var(--color-text);
      }
      .products__header {
        display: flex;
        flex-wrap: wrap;
        gap: 1.75rem;
        justify-content: space-between;
        align-items: center;
      }
      .products__header h1 {
        margin: 0;
        font-size: clamp(2rem, 2.7vw, 2.6rem);
        color: var(--color-text);
      }
      .products__header p {
        margin: 0.75rem 0 0;
        max-width: 42rem;
        line-height: 1.7;
        color: rgba(244, 247, 250, 0.72);
      }
      .products__cta {
        background: linear-gradient(135deg, var(--color-accent), #ffc861);
        color: #0b1d3a;
        border: none;
        border-radius: 999px;
        padding: 0.95rem 2.4rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 26px 52px rgba(3, 8, 18, 0.5);
      }
      .products__cta:hover {
        transform: translateY(-3px);
        box-shadow: 0 32px 60px rgba(3, 8, 18, 0.55);
      }
      .products__grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      .product-card {
        position: relative;
        overflow: hidden;
        border-radius: 2rem;
        border: 1px solid rgba(244, 247, 250, 0.08);
        background: rgba(20, 37, 63, 0.88);
        box-shadow: 0 32px 72px rgba(3, 8, 18, 0.5);
        display: grid;
        grid-template-rows: auto 1fr;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .product-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 38px 82px rgba(3, 8, 18, 0.58);
      }
      .product-card__media {
        position: relative;
        display: grid;
        place-items: center;
        padding: 2rem 1.5rem 1.5rem;
        background: linear-gradient(135deg, rgba(20, 37, 63, 0.9), rgba(11, 29, 58, 0.95));
        min-height: 240px;
      }
      .product-card__media img {
        width: min(88%, 320px);
        height: 200px;
        object-fit: contain;
        object-position: center;
        filter: drop-shadow(0 20px 40px rgba(3, 8, 18, 0.55));
        mix-blend-mode: normal;
      }
      .product-card__media[data-status='low'] {
        background: linear-gradient(135deg, rgba(245, 165, 36, 0.24), rgba(20, 37, 63, 0.92));
      }
      .product-card__media[data-status='scheduled'] {
        background: linear-gradient(135deg, rgba(31, 59, 99, 0.85), rgba(20, 37, 63, 0.96));
      }
      .product-card__badge {
        position: absolute;
        top: 1.1rem;
        left: 1.1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 1rem;
        border-radius: 999px;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        background: rgba(255, 216, 140, 0.9);
        color: #0b1d3a;
      }
      .product-card__media[data-status='low'] .product-card__badge {
        background: rgba(245, 165, 36, 0.95);
      }
      .product-card__media[data-status='scheduled'] .product-card__badge {
        background: rgba(168, 189, 255, 0.85);
      }
      .product-card__reference {
        position: absolute;
        bottom: 1.1rem;
        right: 1.1rem;
        font-size: 0.82rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        background: rgba(244, 247, 250, 0.18);
        color: rgba(244, 247, 250, 0.85);
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        border: 1px solid rgba(244, 247, 250, 0.25);
        backdrop-filter: blur(6px);
      }
      .product-card__body {
        padding: 1.75rem 1.75rem 2rem;
        display: grid;
        gap: 1.5rem;
      }
      .product-card__header {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
      }
      .product-card__header h2 {
        margin: 0;
        font-size: 1.45rem;
        color: var(--color-text);
      }
      .product-card__price {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
        color: rgba(255, 216, 140, 0.92);
      }
      .product-card__colors {
        display: grid;
        gap: 0.75rem;
      }
      .product-card__label {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(244, 247, 250, 0.55);
      }
      .product-card__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }
      .product-card__chip {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 0.85rem;
        border-radius: 999px;
        font-size: 0.82rem;
        background: rgba(244, 247, 250, 0.12);
        color: rgba(244, 247, 250, 0.85);
        border: 1px solid rgba(244, 247, 250, 0.15);
      }
      .product-card__stats {
        display: grid;
        gap: 1.25rem;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      .product-card__stats-label {
        display: block;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: rgba(244, 247, 250, 0.5);
        margin-bottom: 0.35rem;
      }
      .product-card__stats-value {
        font-weight: 600;
        color: var(--color-text);
      }
      .product-card__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .product-card__action,
      .product-card__ghost {
        flex: 1 1 180px;
        padding: 0.85rem 1.4rem;
        border-radius: 999px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .product-card__action {
        border: none;
        background: linear-gradient(135deg, var(--color-accent), #ffc861);
        color: #0b1d3a;
        box-shadow: 0 24px 48px rgba(3, 8, 18, 0.5);
      }
      .product-card__action:hover {
        transform: translateY(-2px);
        box-shadow: 0 28px 58px rgba(3, 8, 18, 0.55);
      }
      .product-card__ghost {
        border: 1px solid rgba(244, 247, 250, 0.25);
        background: rgba(244, 247, 250, 0.08);
        color: rgba(244, 247, 250, 0.85);
      }
      .product-card__ghost:hover {
        background: rgba(244, 247, 250, 0.16);
        transform: translateY(-2px);
        box-shadow: 0 18px 36px rgba(3, 8, 18, 0.5);
      }
      .products__summary {
        background: rgba(20, 37, 63, 0.85);
        border-radius: 1.75rem;
        padding: 2.2rem;
        border: 1px solid rgba(244, 247, 250, 0.08);
        box-shadow: 0 26px 60px rgba(3, 8, 18, 0.5);
      }
      .products__summary h2 {
        margin-top: 0;
        color: var(--color-text);
      }
      .products__summary ul {
        margin: 0;
        padding-left: 1.2rem;
        line-height: 1.8;
        color: rgba(244, 247, 250, 0.72);
      }
      @media (max-width: 640px) {
        .product-card__actions {
          flex-direction: column;
        }
      }
    `
  ]
})
export class ProductsComponent {
  protected readonly products: Product[] = productsData;

  protected statusBadge(status: string): 'ok' | 'low' | 'scheduled' {
    if (status.toLowerCase().includes('bajo')) {
      return 'low';
    }
    if (status.toLowerCase().includes('programada')) {
      return 'scheduled';
    }
    return 'ok';
  }

  protected leadTime(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized.includes('bajo')) {
      return '2-3 semanas';
    }
    if (normalized.includes('programada')) {
      return '3-4 semanas';
    }
    return 'Despacho inmediato';
  }
}
