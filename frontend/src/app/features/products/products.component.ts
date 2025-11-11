import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import productsData from '../../../assets/data/products.json';
import { CartService } from '../../core/services/cart.service';

interface Product {
  reference: string;
  name: string;
  description?: string;
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
  styleUrl: './products.component.scss',
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
              <button type="button" class="product-card__action" (click)="addToCart(product)">Agregar al carrito</button>
              <button type="button" class="product-card__ghost">Solicitar muestra</button>
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
  `
})
export class ProductsComponent {
  protected readonly products: Product[] = productsData;
  public cartService = inject(CartService);

  // State for selected colors and quantities
  private selectedColors = signal<Map<string, string>>(new Map());
  private quantities = signal<Map<string, number>>(new Map());

  constructor() {
    // Initialize default quantities and colors
    this.products.forEach(product => {
      this.quantities().set(product.reference, 1);
      this.selectedColors().set(product.reference, product.colors[0]);
    });
  }

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

  protected addToCart(product: Product): void {
    const selectedColor = this.selectedColors().get(product.reference) || product.colors[0];
    const quantity = this.quantities().get(product.reference) || 1;

    this.cartService.addToCart(
      {
        reference: product.reference,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        color: selectedColor
      },
      quantity
    );
  }
}
