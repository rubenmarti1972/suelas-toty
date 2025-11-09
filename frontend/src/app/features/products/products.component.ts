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
          <header>
            <h2>{{ product.name }}</h2>
            <span class="product-card__reference">Ref. {{ product.reference }}</span>
          </header>
          <p class="product-card__price">
            {{ product.price | currency: product.currency:'symbol':'1.2-2' }} / par
          </p>
          <div class="product-card__meta">
            <div>
              <h3>Colores</h3>
              <ul>
                <li *ngFor="let color of product.colors">{{ color }}</li>
              </ul>
            </div>
            <div>
              <h3>Inventario</h3>
              <p>{{ product.stock | number }} unidades</p>
              <span class="product-card__status" [attr.data-status]="statusBadge(product.status)">
                {{ product.status }}
              </span>
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
        gap: 2.5rem;
      }
      .products__header {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: space-between;
        align-items: center;
      }
      .products__header h1 {
        margin: 0;
        color: #183153;
      }
      .products__header p {
        margin: 0.5rem 0 0;
        max-width: 38rem;
        line-height: 1.6;
      }
      .products__cta {
        background: #183153;
        color: #ffffff;
        border: none;
        border-radius: 0.75rem;
        padding: 0.9rem 1.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      .products__cta:hover {
        transform: translateY(-2px);
      }
      .products__grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
      .product-card {
        background: #ffffff;
        border-radius: 1.25rem;
        padding: 1.75rem;
        display: grid;
        gap: 1rem;
        box-shadow: 0 15px 40px rgba(15, 40, 70, 0.1);
      }
      .product-card header {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .product-card h2 {
        margin: 0;
        color: #12263a;
        font-size: 1.35rem;
      }
      .product-card__reference {
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #4b5d6b;
      }
      .product-card__price {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
        color: #33658a;
      }
      .product-card__meta {
        display: flex;
        gap: 1.5rem;
        justify-content: space-between;
      }
      .product-card__meta ul {
        margin: 0;
        padding-left: 1rem;
      }
      .product-card__status {
        display: inline-flex;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .product-card__status[data-status='ok'] {
        background: rgba(0, 171, 85, 0.12);
        color: #007b55;
      }
      .product-card__status[data-status='low'] {
        background: rgba(255, 193, 7, 0.16);
        color: #b76e00;
      }
      .product-card__status[data-status='scheduled'] {
        background: rgba(51, 101, 138, 0.12);
        color: #183153;
      }
      .products__summary {
        background: #f8fafc;
        border-radius: 1.5rem;
        padding: 2rem;
      }
      .products__summary h2 {
        margin-top: 0;
      }
      .products__summary ul {
        margin: 0;
        padding-left: 1.2rem;
        line-height: 1.7;
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
}
