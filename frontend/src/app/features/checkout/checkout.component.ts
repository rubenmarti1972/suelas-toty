import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
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
