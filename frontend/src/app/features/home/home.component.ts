import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import productsData from '../../../assets/data/products.json';

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
  category?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__subtitle">Bienvenido a</span>
          Suelas Toty
        </h1>
        <p class="hero__description">
          La mejor selección de suelas premium para tu negocio.
          Calidad garantizada, entrega rápida y precios competitivos.
        </p>
        <div class="hero__buttons">
          <button class="btn-primary" (click)="navigateToProducts()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            Ver Catálogo Completo
          </button>
          <a routerLink="/contacto" class="btn-secondary">
            Solicitar Cotización
          </a>
        </div>

        <div class="hero__features">
          <div class="feature">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <div>
              <strong>6 Categorías</strong>
              <p>Variedad para cada necesidad</p>
            </div>
          </div>
          <div class="feature">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 7h-9M14 17H5M20 7a1 1 0 0 0 1-1 1 1 0 0 0-1-1M14 17a1 1 0 0 0 1-1 1 1 0 0 0-1-1M5 17a1 1 0 0 1-1 1 1 1 0 0 1-1-1M5 17V7M20 7v10"></path>
            </svg>
            <div>
              <strong>Envío Rápido</strong>
              <p>Despacho inmediato en stock</p>
            </div>
          </div>
          <div class="feature">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div>
              <strong>Calidad Premium</strong>
              <p>Materiales certificados</p>
            </div>
          </div>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__image-grid">
          <img src="/assets/images/products/suela-deportiva.svg" alt="Suela Deportiva" class="grid-img grid-img-1" />
          <img src="/assets/images/products/suela-casual.svg" alt="Suela Casual" class="grid-img grid-img-2" />
          <img src="/assets/images/products/suela-running.svg" alt="Suela Running" class="grid-img grid-img-3" />
          <img src="/assets/images/products/suela-formal.svg" alt="Suela Formal" class="grid-img grid-img-4" />
        </div>
      </div>
    </section>

    <section class="featured-products">
      <div class="section-header">
        <h2>Productos Destacados</h2>
        <a routerLink="/productos" class="view-all">
          Ver todos
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

      <div class="products-grid">
        @for (product of featuredProducts; track product.reference) {
          <div class="product-card">
            <div class="product-image">
              <img [src]="product.image" [alt]="product.name" />
              <span class="product-badge" [class.low-stock]="product.status.includes('Bajo')">
                {{ product.status }}
              </span>
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-colors">
                @for (color of product.colors.slice(0, 3); track color) {
                  <span class="color-badge">{{ color }}</span>
                }
                @if (product.colors.length > 3) {
                  <span class="color-more">+{{ product.colors.length - 3 }}</span>
                }
              </div>
              <div class="product-footer">
                <div class="product-price">
                  <span class="price">${{ product.price.toFixed(2) }}</span>
                  <span class="unit">/ par</span>
                </div>
                <button class="btn-add" (click)="navigateToProducts()">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2>¿Necesitas grandes volúmenes?</h2>
        <p>Contamos con soluciones especiales para mayoristas y fabricantes de calzado</p>
        <div class="cta-buttons">
          <a routerLink="/contacto" class="btn-primary">Contactar Ventas</a>
          <a routerLink="/servicio-al-cliente" class="btn-secondary">Soporte Técnico</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    section {
      margin-bottom: 4rem;
    }

    .hero {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
      background: linear-gradient(135deg, rgba(20, 37, 63, 0.95), rgba(11, 29, 58, 1));
      border-radius: 2rem;
      padding: 4rem;
      margin-bottom: 5rem;
      border: 1px solid rgba(245, 165, 36, 0.2);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 80%;
      height: 200%;
      background: radial-gradient(circle, rgba(245, 165, 36, 0.1) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero__content {
      position: relative;
      z-index: 1;
    }

    .hero__subtitle {
      display: block;
      font-size: 1.25rem;
      font-weight: 600;
      color: #f5a524;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .hero__title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      color: #f4f7fa;
      margin: 0 0 1.5rem 0;
      line-height: 1.1;
    }

    .hero__description {
      font-size: 1.25rem;
      color: rgba(244, 247, 250, 0.8);
      line-height: 1.6;
      margin: 0 0 2.5rem 0;
      max-width: 600px;
    }

    .hero__buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }

    .hero__features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(245, 165, 36, 0.2);
    }

    .feature {
      display: flex;
      gap: 1rem;
      align-items: start;
    }

    .feature svg {
      color: #f5a524;
      flex-shrink: 0;
    }

    .feature strong {
      display: block;
      color: #f4f7fa;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .feature p {
      color: rgba(244, 247, 250, 0.7);
      font-size: 0.875rem;
      margin: 0;
    }

    .hero__visual {
      position: relative;
      z-index: 1;
    }

    .hero__image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 1rem;
      position: relative;
    }

    .grid-img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      background: rgba(244, 247, 250, 0.05);
      border: 1px solid rgba(245, 165, 36, 0.2);
      border-radius: 1rem;
      padding: 1rem;
      transition: all 0.3s ease;
    }

    .grid-img:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(245, 165, 36, 0.3);
      border-color: rgba(245, 165, 36, 0.5);
    }

    .featured-products {
      padding: 0 1rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #f4f7fa;
      margin: 0;
    }

    .view-all {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #f5a524;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;
    }

    .view-all:hover {
      gap: 0.75rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: linear-gradient(135deg, rgba(20, 37, 63, 0.9), rgba(11, 29, 58, 0.95));
      border: 1px solid rgba(245, 165, 36, 0.2);
      border-radius: 1.5rem;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(245, 165, 36, 0.2);
      border-color: rgba(245, 165, 36, 0.4);
    }

    .product-image {
      position: relative;
      height: 250px;
      background: rgba(244, 247, 250, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .product-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(76, 175, 80, 0.9);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .product-badge.low-stock {
      background: rgba(255, 152, 0, 0.9);
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-category {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #f5a524;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
    }

    .product-info h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f4f7fa;
      margin: 0 0 0.75rem 0;
    }

    .product-description {
      font-size: 0.875rem;
      color: rgba(244, 247, 250, 0.7);
      line-height: 1.5;
      margin: 0 0 1rem 0;
    }

    .product-colors {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }

    .color-badge {
      padding: 0.35rem 0.75rem;
      background: rgba(245, 165, 36, 0.15);
      border: 1px solid rgba(245, 165, 36, 0.3);
      border-radius: 999px;
      font-size: 0.75rem;
      color: rgba(244, 247, 250, 0.8);
    }

    .color-more {
      padding: 0.35rem 0.75rem;
      background: rgba(244, 247, 250, 0.1);
      border-radius: 999px;
      font-size: 0.75rem;
      color: rgba(244, 247, 250, 0.6);
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid rgba(245, 165, 36, 0.2);
    }

    .product-price {
      display: flex;
      flex-direction: column;
    }

    .product-price .price {
      font-size: 1.75rem;
      font-weight: 700;
      color: #f5a524;
    }

    .product-price .unit {
      font-size: 0.875rem;
      color: rgba(244, 247, 250, 0.6);
    }

    .btn-add {
      background: rgba(245, 165, 36, 0.2);
      border: 1px solid rgba(245, 165, 36, 0.4);
      color: #f5a524;
      padding: 0.75rem 1.5rem;
      border-radius: 999px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-add:hover {
      background: rgba(245, 165, 36, 0.3);
      transform: translateY(-2px);
    }

    .cta-section {
      background: linear-gradient(135deg, #f5a524, #ff8c00);
      border-radius: 2rem;
      padding: 4rem 3rem;
      text-align: center;
      margin-top: 5rem;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #0b1d3a;
      margin: 0 0 1rem 0;
    }

    .cta-content p {
      font-size: 1.25rem;
      color: rgba(11, 29, 58, 0.8);
      margin: 0 0 2rem 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary,
    .btn-secondary {
      padding: 1rem 2rem;
      border-radius: 999px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #f5a524, #ff8c00);
      color: #0b1d3a;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    }

    .btn-secondary {
      background: rgba(11, 29, 58, 0.15);
      border: 2px solid rgba(11, 29, 58, 0.3);
      color: #0b1d3a;
    }

    .btn-secondary:hover {
      background: rgba(11, 29, 58, 0.25);
      transform: translateY(-2px);
    }

    .cta-section .btn-primary {
      background: #0b1d3a;
      color: #f5a524;
    }

    .cta-section .btn-secondary {
      background: transparent;
      border-color: #0b1d3a;
      color: #0b1d3a;
    }

    .cta-section .btn-secondary:hover {
      background: rgba(11, 29, 58, 0.1);
    }

    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 3rem 2rem;
        gap: 3rem;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
    }

    @media (max-width: 640px) {
      .hero__buttons,
      .cta-buttons {
        flex-direction: column;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        justify-content: center;
      }

      .section-header {
        flex-direction: column;
        align-items: start;
        gap: 1rem;
      }

      .hero__features {
        grid-template-columns: 1fr;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  private router = inject(Router);
  protected readonly allProducts: Product[] = productsData;

  // Show first 3 products as featured
  protected readonly featuredProducts: Product[] = this.allProducts.slice(0, 3);

  navigateToProducts(): void {
    this.router.navigate(['/productos']);
  }
}
