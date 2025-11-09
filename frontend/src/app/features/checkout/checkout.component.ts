import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <section class="checkout">
      <div class="checkout__container">
        <h1 class="checkout__title">Finalizar Pedido</h1>

        @if (cartService.items().length === 0) {
          <div class="empty-checkout">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para continuar con tu compra</p>
            <button class="btn-primary" (click)="navigateToProducts()">
              Explorar Productos
            </button>
          </div>
        } @else {
          <div class="checkout__layout">
            <!-- Order Summary -->
            <div class="order-summary">
              <h2>Resumen del Pedido</h2>

              <div class="order-items">
                @for (item of cartService.items(); track item.reference + (item.color || '')) {
                  <div class="order-item">
                    <img [src]="item.image" [alt]="item.name">
                    <div class="order-item__info">
                      <h3>{{ item.name }}</h3>
                      <p class="ref">REF: {{ item.reference }}</p>
                      @if (item.color) {
                        <p class="color">Color: {{ item.color }}</p>
                      }
                      <p class="quantity">Cantidad: {{ item.quantity }}</p>
                    </div>
                    <div class="order-item__price">
                      <span class="unit-price">\${{ item.price.toFixed(2) }}</span>
                      <span class="total-price">\${{ (item.price * item.quantity).toFixed(2) }}</span>
                    </div>
                  </div>
                }
              </div>

              <div class="order-totals">
                <div class="total-row">
                  <span>Subtotal:</span>
                  <span>\${{ cartService.subtotal().toFixed(2) }}</span>
                </div>
                <div class="total-row">
                  <span>IVA (19%):</span>
                  <span>\${{ cartService.tax().toFixed(2) }}</span>
                </div>
                <div class="total-row shipping">
                  <span>Envío:</span>
                  <span>A calcular</span>
                </div>
                <div class="total-row grand-total">
                  <span>Total:</span>
                  <span>\${{ cartService.total().toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Checkout Form -->
            <div class="checkout-form">
              <h2>Información de Contacto</h2>

              <form [formGroup]="checkoutForm" (ngSubmit)="submitOrder()">
                <div class="form-section">
                  <h3>Datos Personales</h3>

                  <div class="form-group">
                    <label for="fullName">Nombre Completo *</label>
                    <input
                      type="text"
                      id="fullName"
                      formControlName="fullName"
                      placeholder="Juan Pérez"
                    />
                    @if (checkoutForm.get('fullName')?.invalid && checkoutForm.get('fullName')?.touched) {
                      <span class="error">El nombre es requerido</span>
                    }
                  </div>

                  <div class="form-group">
                    <label for="email">Correo Electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      placeholder="correo@ejemplo.com"
                    />
                    @if (checkoutForm.get('email')?.invalid && checkoutForm.get('email')?.touched) {
                      <span class="error">Ingresa un correo válido</span>
                    }
                  </div>

                  <div class="form-group">
                    <label for="phone">Teléfono *</label>
                    <input
                      type="tel"
                      id="phone"
                      formControlName="phone"
                      placeholder="+57 300 123 4567"
                    />
                    @if (checkoutForm.get('phone')?.invalid && checkoutForm.get('phone')?.touched) {
                      <span class="error">El teléfono es requerido</span>
                    }
                  </div>

                  <div class="form-group">
                    <label for="company">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      formControlName="company"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                </div>

                <div class="form-section">
                  <h3>Dirección de Envío</h3>

                  <div class="form-group">
                    <label for="address">Dirección *</label>
                    <input
                      type="text"
                      id="address"
                      formControlName="address"
                      placeholder="Calle 123 #45-67"
                    />
                    @if (checkoutForm.get('address')?.invalid && checkoutForm.get('address')?.touched) {
                      <span class="error">La dirección es requerida</span>
                    }
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="city">Ciudad *</label>
                      <input
                        type="text"
                        id="city"
                        formControlName="city"
                        placeholder="Bogotá"
                      />
                      @if (checkoutForm.get('city')?.invalid && checkoutForm.get('city')?.touched) {
                        <span class="error">La ciudad es requerida</span>
                      }
                    </div>

                    <div class="form-group">
                      <label for="postalCode">Código Postal</label>
                      <input
                        type="text"
                        id="postalCode"
                        formControlName="postalCode"
                        placeholder="110111"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="notes">Notas del Pedido</label>
                    <textarea
                      id="notes"
                      formControlName="notes"
                      rows="4"
                      placeholder="Instrucciones especiales para la entrega..."
                    ></textarea>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="button" class="btn-secondary" (click)="navigateToProducts()">
                    Continuar Comprando
                  </button>
                  <button type="submit" class="btn-primary" [disabled]="checkoutForm.invalid || isProcessing()">
                    @if (isProcessing()) {
                      Procesando...
                    } @else {
                      Enviar Pedido
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .checkout {
      min-height: 80vh;
      padding: 2rem 0;
      color: #f4f7fa;
    }

    .checkout__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .checkout__title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: #f4f7fa;
      text-align: center;
    }

    .empty-checkout {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6rem 2rem;
      text-align: center;
      gap: 1.5rem;
    }

    .empty-checkout svg {
      color: rgba(245, 165, 36, 0.3);
    }

    .empty-checkout h2 {
      font-size: 2rem;
      margin: 0;
      color: #f4f7fa;
    }

    .empty-checkout p {
      color: rgba(244, 247, 250, 0.6);
      font-size: 1.125rem;
      margin: 0;
    }

    .checkout__layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 2.5rem;
      align-items: start;
    }

    .order-summary {
      background: linear-gradient(135deg, rgba(20, 37, 63, 0.9), rgba(11, 29, 58, 0.95));
      border: 1px solid rgba(245, 165, 36, 0.2);
      border-radius: 1.5rem;
      padding: 2rem;
      position: sticky;
      top: 2rem;
    }

    .order-summary h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
      color: #f4f7fa;
    }

    .order-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
      max-height: 400px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .order-item {
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1rem;
      padding: 1rem;
      background: rgba(28, 49, 82, 0.4);
      border: 1px solid rgba(245, 165, 36, 0.1);
      border-radius: 1rem;
    }

    .order-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 0.75rem;
      background: #f4f7fa;
    }

    .order-item__info h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #f4f7fa;
    }

    .order-item__info p {
      margin: 0.25rem 0;
      font-size: 0.875rem;
      color: rgba(244, 247, 250, 0.7);
    }

    .order-item__info .ref {
      color: rgba(245, 165, 36, 0.8);
    }

    .order-item__price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .order-item__price .unit-price {
      font-size: 0.875rem;
      color: rgba(244, 247, 250, 0.6);
    }

    .order-item__price .total-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f5a524;
    }

    .order-totals {
      border-top: 1px solid rgba(245, 165, 36, 0.2);
      padding-top: 1.5rem;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 1rem;
      color: rgba(244, 247, 250, 0.8);
    }

    .total-row.shipping {
      font-style: italic;
      font-size: 0.875rem;
    }

    .total-row.grand-total {
      border-top: 2px solid rgba(245, 165, 36, 0.3);
      margin-top: 1rem;
      padding-top: 1rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #f4f7fa;
    }

    .total-row.grand-total span:last-child {
      color: #f5a524;
    }

    .checkout-form {
      background: linear-gradient(135deg, rgba(20, 37, 63, 0.9), rgba(11, 29, 58, 0.95));
      border: 1px solid rgba(245, 165, 36, 0.2);
      border-radius: 1.5rem;
      padding: 2rem;
    }

    .checkout-form h2 {
      margin: 0 0 2rem 0;
      font-size: 1.5rem;
      color: #f4f7fa;
    }

    .form-section {
      margin-bottom: 2.5rem;
    }

    .form-section h3 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      color: #f5a524;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(245, 165, 36, 0.2);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      color: rgba(244, 247, 250, 0.9);
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.875rem 1rem;
      background: rgba(11, 29, 58, 0.6);
      border: 1px solid rgba(245, 165, 36, 0.2);
      border-radius: 0.75rem;
      color: #f4f7fa;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: rgba(245, 165, 36, 0.5);
      background: rgba(11, 29, 58, 0.8);
    }

    .form-group textarea {
      resize: vertical;
      font-family: inherit;
    }

    .form-group .error {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #ff4444;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary,
    .btn-secondary {
      flex: 1;
      padding: 1rem 2rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #f5a524 0%, #ff8c00 100%);
      color: #0b1d3a;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(245, 165, 36, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: rgba(245, 165, 36, 0.1);
      border: 1px solid rgba(245, 165, 36, 0.3);
      color: #f5a524;
    }

    .btn-secondary:hover {
      background: rgba(245, 165, 36, 0.2);
    }

    @media (max-width: 1024px) {
      .checkout__layout {
        grid-template-columns: 1fr;
      }

      .order-summary {
        position: static;
      }
    }

    @media (max-width: 640px) {
      .checkout__title {
        font-size: 2rem;
      }

      .order-item {
        grid-template-columns: 60px 1fr;
      }

      .order-item img {
        width: 60px;
        height: 60px;
      }

      .order-item__price {
        grid-column: 1 / -1;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CheckoutComponent {
  public cartService = inject(CartService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public isProcessing = signal(false);

  public checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [''],
      notes: ['']
    });
  }

  navigateToProducts(): void {
    this.router.navigate(['/productos']);
  }

  async submitOrder(): Promise<void> {
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isProcessing.set(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderData = {
      ...this.checkoutForm.value,
      items: this.cartService.items(),
      subtotal: this.cartService.subtotal(),
      tax: this.cartService.tax(),
      total: this.cartService.total(),
      orderDate: new Date().toISOString()
    };

    console.log('Order submitted:', orderData);

    // Show success message
    alert(`¡Pedido enviado con éxito!\n\nTotal: $${this.cartService.total().toFixed(2)}\n\nRecibirás un correo de confirmación en ${this.checkoutForm.value.email}`);

    // Clear cart
    this.cartService.clearCart();

    this.isProcessing.set(false);

    // Navigate to home
    this.router.navigate(['/']);
  }
}
