import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
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
