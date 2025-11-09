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
  category?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DecimalPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
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

  selectColor(reference: string, color: string): void {
    this.selectedColors().set(reference, color);
    this.selectedColors.set(new Map(this.selectedColors()));
  }

  getSelectedColor(reference: string): string {
    return this.selectedColors().get(reference) || '';
  }

  getQuantity(reference: string): number {
    return this.quantities().get(reference) || 1;
  }

  setQuantity(reference: string, event: any): void {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      this.quantities().set(reference, value);
      this.quantities.set(new Map(this.quantities()));
    }
  }

  increaseQuantity(reference: string): void {
    const current = this.getQuantity(reference);
    this.quantities().set(reference, current + 1);
    this.quantities.set(new Map(this.quantities()));
  }

  decreaseQuantity(reference: string): void {
    const current = this.getQuantity(reference);
    if (current > 1) {
      this.quantities().set(reference, current - 1);
      this.quantities.set(new Map(this.quantities()));
    }
  }

  addToCart(product: Product): void {
    const color = this.getSelectedColor(product.reference);
    const quantity = this.getQuantity(product.reference);

    this.cartService.addToCart({
      reference: product.reference,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      color: color
    }, quantity);

    // Show success feedback (optional - you can add a toast notification here)
    alert(`¡${quantity} ${product.name} (${color}) agregado(s) al carrito!`);
  }

  requestSample(product: Product): void {
    // Navigate to contact form or show modal
    alert(`Solicitud de muestra para ${product.name}. Redirigiendo a contacto...`);
    // You can implement navigation here
  }
}
