import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-overlay" (click)="close.emit()">
      <div class="cart-panel" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="cart-header">
          <h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Mi Carrito
          </h2>
          <button class="close-btn" (click)="close.emit()" aria-label="Cerrar carrito">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="cart-items">
          @if (cartService.items().length === 0) {
            <div class="empty-cart">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Tu carrito está vacío</p>
              <button class="btn-primary" (click)="navigateToProducts()">
                Explorar Productos
              </button>
            </div>
          } @else {
            @for (item of cartService.items(); track item.reference + (item.color || '')) {
              <div class="cart-item">
                <img [src]="item.image" [alt]="item.name" class="item-image">
                <div class="item-details">
                  <h3>{{ item.name }}</h3>
                  <p class="item-ref">REF: {{ item.reference }}</p>
                  @if (item.color) {
                    <p class="item-color">Color: {{ item.color }}</p>
                  }
                  <p class="item-price">{{ item.currency }} ${{ item.price.toFixed(2) }}</p>
                </div>
                <div class="item-actions">
                  <div class="quantity-controls">
                    <button
                      (click)="decreaseQuantity(item)"
                      [disabled]="item.quantity <= 1"
                      aria-label="Disminuir cantidad">
                      −
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button
                      (click)="increaseQuantity(item)"
                      aria-label="Aumentar cantidad">
                      +
                    </button>
                  </div>
                  <p class="item-subtotal">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                  <button
                    class="remove-btn"
                    (click)="removeItem(item)"
                    aria-label="Eliminar del carrito">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            }
          }
        </div>

        <!-- Footer -->
        @if (cartService.items().length > 0) {
          <div class="cart-footer">
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span class="amount">${{ cartService.subtotal().toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>IVA (19%):</span>
                <span class="amount">${{ cartService.tax().toFixed(2) }}</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span class="amount">${{ cartService.total().toFixed(2) }}</span>
              </div>
            </div>

            <div class="cart-actions">
              <button class="btn-secondary" (click)="close.emit()">
                Continuar Comprando
              </button>
              <button class="btn-primary" (click)="proceedToCheckout()">
                Proceder al Pago
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(7, 15, 31, 0.8);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      justify-content: flex-end;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .cart-panel {
      width: 100%;
      max-width: 480px;
      background: linear-gradient(135deg, #0b1d3a 0%, #14253f 100%);
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .cart-header {
      padding: 2rem;
      border-bottom: 1px solid rgba(245, 165, 36, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cart-header h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #f4f7fa;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0;
    }

    .cart-header h2 svg {
      color: #f5a524;
    }

    .close-btn {
      background: rgba(245, 165, 36, 0.1);
      border: 1px solid rgba(245, 165, 36, 0.3);
      color: #f5a524;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: rgba(245, 165, 36, 0.2);
      transform: rotate(90deg);
    }

    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .empty-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
      gap: 1.5rem;
    }

    .empty-cart svg {
      color: rgba(245, 165, 36, 0.3);
    }

    .empty-cart p {
      color: rgba(244, 247, 250, 0.6);
      font-size: 1.125rem;
    }

    .cart-item {
      background: rgba(28, 49, 82, 0.4);
      border: 1px solid rgba(245, 165, 36, 0.15);
      border-radius: 1rem;
      padding: 1.25rem;
      margin-bottom: 1rem;
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1rem;
      transition: all 0.2s;
    }

    .cart-item:hover {
      border-color: rgba(245, 165, 36, 0.3);
      box-shadow: 0 4px 12px rgba(245, 165, 36, 0.1);
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 0.75rem;
      background: #f4f7fa;
    }

    .item-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .item-details h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #f4f7fa;
      margin: 0;
    }

    .item-ref {
      font-size: 0.75rem;
      color: rgba(245, 165, 36, 0.8);
      margin: 0;
    }

    .item-color {
      font-size: 0.875rem;
      color: rgba(244, 247, 250, 0.7);
      margin: 0;
    }

    .item-price {
      font-size: 0.875rem;
      font-weight: 600;
      color: #f5a524;
      margin: 0;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(11, 29, 58, 0.6);
      border: 1px solid rgba(245, 165, 36, 0.2);
      border-radius: 0.5rem;
      padding: 0.25rem;
    }

    .quantity-controls button {
      width: 28px;
      height: 28px;
      border: none;
      background: rgba(245, 165, 36, 0.2);
      color: #f5a524;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .quantity-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity-controls button:not(:disabled):hover {
      background: rgba(245, 165, 36, 0.3);
    }

    .quantity-controls span {
      color: #f4f7fa;
      font-weight: 600;
      min-width: 32px;
      text-align: center;
    }

    .item-subtotal {
      font-size: 1.125rem;
      font-weight: 700;
      color: #f5a524;
      margin: 0;
    }

    .remove-btn {
      background: rgba(255, 68, 68, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      color: #ff4444;
      width: 32px;
      height: 32px;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .remove-btn:hover {
      background: rgba(255, 68, 68, 0.2);
    }

    .cart-footer {
      border-top: 1px solid rgba(245, 165, 36, 0.2);
      padding: 1.5rem 2rem;
      background: rgba(11, 29, 58, 0.6);
    }

    .cart-summary {
      margin-bottom: 1.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      color: rgba(244, 247, 250, 0.8);
      font-size: 0.875rem;
    }

    .summary-row.total {
      border-top: 1px solid rgba(245, 165, 36, 0.2);
      margin-top: 0.5rem;
      padding-top: 1rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: #f4f7fa;
    }

    .summary-row .amount {
      color: #f5a524;
      font-weight: 600;
    }

    .cart-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-primary,
    .btn-secondary {
      flex: 1;
      padding: 0.875rem 1.5rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #f5a524 0%, #ff8c00 100%);
      color: #0b1d3a;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(245, 165, 36, 0.4);
    }

    .btn-secondary {
      background: rgba(245, 165, 36, 0.1);
      border: 1px solid rgba(245, 165, 36, 0.3);
      color: #f5a524;
    }

    .btn-secondary:hover {
      background: rgba(245, 165, 36, 0.2);
    }

    @media (max-width: 640px) {
      .cart-panel {
        max-width: 100%;
      }

      .cart-item {
        grid-template-columns: 60px 1fr;
        gap: 0.75rem;
      }

      .item-image {
        width: 60px;
        height: 60px;
      }

      .item-actions {
        grid-column: 1 / -1;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .cart-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CartComponent {
  public close = output<void>();
  public cartService = inject(CartService);
  private router = inject(Router);

  increaseQuantity(item: any): void {
    this.cartService.updateQuantity(
      item.reference,
      item.quantity + 1,
      item.color
    );
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(
        item.reference,
        item.quantity - 1,
        item.color
      );
    }
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item.reference, item.color);
  }

  navigateToProducts(): void {
    this.router.navigate(['/productos']);
    this.close.emit();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
    this.close.emit();
  }
}
