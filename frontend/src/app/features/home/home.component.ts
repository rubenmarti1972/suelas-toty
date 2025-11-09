import { Component, inject, signal, computed } from '@angular/core';
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
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

  // Usar signal para los productos
  protected readonly allProducts = signal<Product[]>(productsData);

  // Computed signal para productos destacados
  protected readonly featuredProducts = computed(() =>
    this.allProducts().slice(0, 3)
  );

  navigateToProducts(): void {
    this.router.navigate(['/productos']);
  }
}
