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
          <div class="product-card__visual" [attr.data-status]="statusBadge(product.status)">
            <span class="product-card__badge">{{ product.status }}</span>
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
        color: #0b1f3a;
      }
      .products__header p {
        margin: 0.75rem 0 0;
        max-width: 42rem;
        line-height: 1.7;
        color: rgba(24, 49, 83, 0.72);
      }
      .products__cta {
        background: linear-gradient(135deg, #2563eb, #38bdf8);
        color: #ffffff;
        border: none;
        border-radius: 999px;
        padding: 0.95rem 2.4rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 22px 38px rgba(37, 99, 235, 0.28);
      }
      .products__cta:hover {
        transform: translateY(-3px);
        box-shadow: 0 28px 48px rgba(37, 99, 235, 0.32);
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
        border: 1px solid rgba(24, 49, 83, 0.08);
        background: linear-gradient(160deg, #ffffff 0%, #f5f8ff 70%, #e9f2ff 100%);
        box-shadow: 0 28px 55px rgba(15, 40, 70, 0.12);
        display: grid;
        grid-template-rows: auto 1fr;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .product-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 36px 70px rgba(15, 40, 70, 0.18);
      }
      .product-card__visual {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1.75rem 1.75rem 1.5rem;
        color: #ffffff;
        background: linear-gradient(135deg, #2563eb, #38bdf8);
      }
      .product-card__visual[data-status='low'] {
        background: linear-gradient(135deg, #f59e0b, #f97316);
      }
      .product-card__visual[data-status='scheduled'] {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
      }
      .product-card__badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 1rem;
        border-radius: 999px;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        background: rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(4px);
      }
      .product-card__reference {
        font-size: 0.85rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        background: rgba(255, 255, 255, 0.16);
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
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
        color: #0b1f3a;
      }
      .product-card__price {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
        color: #2563eb;
      }
      .product-card__colors {
        display: grid;
        gap: 0.75rem;
      }
      .product-card__label {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(24, 49, 83, 0.6);
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
        background: rgba(37, 99, 235, 0.12);
        color: #1d3c6a;
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
        color: rgba(24, 49, 83, 0.55);
        margin-bottom: 0.35rem;
      }
      .product-card__stats-value {
        font-weight: 600;
        color: #0b1f3a;
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
        background: linear-gradient(135deg, #10b981, #38bdf8);
        color: #ffffff;
        box-shadow: 0 18px 32px rgba(16, 185, 129, 0.25);
      }
      .product-card__action:hover {
        transform: translateY(-2px);
        box-shadow: 0 22px 38px rgba(16, 185, 129, 0.3);
      }
      .product-card__ghost {
        border: 1px solid rgba(37, 99, 235, 0.35);
        background: rgba(37, 99, 235, 0.08);
        color: #1d3c6a;
      }
      .product-card__ghost:hover {
        background: rgba(37, 99, 235, 0.16);
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
      }
      .products__summary {
        background: linear-gradient(135deg, #f1f6ff, #ffffff 60%);
        border-radius: 1.75rem;
        padding: 2.2rem;
        border: 1px solid rgba(24, 49, 83, 0.08);
        box-shadow: 0 22px 45px rgba(15, 40, 70, 0.08);
      }
      .products__summary h2 {
        margin-top: 0;
        color: #0b1f3a;
      }
      .products__summary ul {
        margin: 0;
        padding-left: 1.2rem;
        line-height: 1.8;
        color: rgba(24, 49, 83, 0.7);
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
