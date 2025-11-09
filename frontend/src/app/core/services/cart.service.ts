import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  reference: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Computed signals para datos derivados
  public items = this.cartItems.asReadonly();

  public totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  public subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  public tax = computed(() => this.subtotal() * 0.19); // IVA 19%

  public total = computed(() => this.subtotal() + this.tax());

  constructor() {
    // Cargar carrito desde localStorage
    this.loadCart();
  }

  /**
   * Agregar producto al carrito
   */
  addToCart(product: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(
      item => item.reference === product.reference && item.color === product.color
    );

    if (existingItemIndex > -1) {
      // Si ya existe, incrementar cantidad
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      this.cartItems.set(updatedItems);
    } else {
      // Si no existe, agregar nuevo item
      this.cartItems.set([...currentItems, { ...product, quantity }]);
    }

    this.saveCart();
  }

  /**
   * Remover producto del carrito
   */
  removeFromCart(reference: string, color?: string): void {
    const currentItems = this.cartItems();
    const filteredItems = currentItems.filter(
      item => !(item.reference === reference && item.color === color)
    );
    this.cartItems.set(filteredItems);
    this.saveCart();
  }

  /**
   * Actualizar cantidad de un producto
   */
  updateQuantity(reference: string, quantity: number, color?: string): void {
    if (quantity <= 0) {
      this.removeFromCart(reference, color);
      return;
    }

    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item => {
      if (item.reference === reference && item.color === color) {
        return { ...item, quantity };
      }
      return item;
    });

    this.cartItems.set(updatedItems);
    this.saveCart();
  }

  /**
   * Limpiar todo el carrito
   */
  clearCart(): void {
    this.cartItems.set([]);
    this.saveCart();
  }

  /**
   * Obtener cantidad de un producto específico
   */
  getItemQuantity(reference: string, color?: string): number {
    const item = this.cartItems().find(
      i => i.reference === reference && i.color === color
    );
    return item?.quantity ?? 0;
  }

  /**
   * Verificar si un producto está en el carrito
   */
  isInCart(reference: string, color?: string): boolean {
    return this.cartItems().some(
      item => item.reference === reference && item.color === color
    );
  }

  /**
   * Guardar carrito en localStorage
   */
  private saveCart(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('suelasToty_cart', JSON.stringify(this.cartItems()));
    }
  }

  /**
   * Cargar carrito desde localStorage
   */
  private loadCart(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem('suelasToty_cart');
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          this.cartItems.set(items);
        } catch (e) {
          console.error('Error loading cart from localStorage:', e);
        }
      }
    }
  }
}
