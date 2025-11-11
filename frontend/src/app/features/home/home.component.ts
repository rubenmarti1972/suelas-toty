import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import productsData from '../../../assets/data/products.json';
import {
  COMPANY_MISSION,
  COMPANY_OBJECTIVES,
  COMPANY_VALUES,
  COMPANY_VISION
} from '../../core/data/company-info';
interface ProcessStep {
  order: string;
  title: string;
  detail: string;
}

interface Differentiator {
  icon: string;
  title: string;
  detail: string;
}

type Product = (typeof productsData)[number];

type FeaturedProduct = Product & { category: string };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly router = inject(Router);

  private readonly products = signal<Product[]>(productsData as Product[]);

  private readonly categoryMap: Record<string, string> = {
    'ST-2101': 'Línea deportiva',
    'ST-3104': 'Colección casual',
    'ST-5110': 'Sandalias premium',
    'ST-7202': 'Calzado industrial'
  };

  protected readonly heroHighlights = [
    { value: '+30 años', label: 'de experiencia en diseño y manufactura' },
    { value: '16 líneas activas', label: 'con entregas rápidas y flexibles' },
    { value: 'ISO 9001', label: 'Procesos certificados y trazables' }
  ];

  protected readonly objectiveBullets = COMPANY_OBJECTIVES;

  protected readonly mission = COMPANY_MISSION;

  protected readonly vision = COMPANY_VISION;

  protected readonly valuesDetailed = COMPANY_VALUES;

  protected readonly process: ProcessStep[] = [
    {
      order: '01',
      title: 'Descubrimiento estratégico',
      detail: 'Analizamos el perfil de usuario, segmentación del mercado y objetivos de colección junto a tu equipo.'
    },
    {
      order: '02',
      title: 'Diseño y prototipado ágil',
      detail: 'Laboratorio interno para ensayos, renders 3D y pruebas de calce en ciclos iterativos rápidos.'
    },
    {
      order: '03',
      title: 'Industrialización inteligente',
      detail: 'Maquinaria de última generación optimiza moldes, tiempos de inyección y control de calidad.'
    },
    {
      order: '04',
      title: 'Logística sostenible',
      detail: 'Coordinamos entregas, reciclaje de excedentes y seguimiento postventa con indicadores en vivo.'
    }
  ];

  protected readonly differentiators: Differentiator[] = [
    {
      icon: '🧪',
      title: 'Laboratorio certificado',
      detail: 'Ensayos de abrasión, tracción y fatiga avalados por normas internacionales.'
    },
    {
      icon: '🌱',
      title: 'Economía circular',
      detail: 'Programas de reciclaje y trazabilidad para reducir la huella ambiental de cada colección.'
    },
    {
      icon: '⚙️',
      title: 'Automatización integral',
      detail: 'Monitoreo en tiempo real de maquinaria y mantenimiento predictivo para cero paradas.'
    },
    {
      icon: '🤝',
      title: 'Acompañamiento experto',
      detail: 'Equipo multidisciplinario de diseño, ingeniería y servicio al cliente a tu lado.'
    }
  ];

  protected readonly featuredProducts = computed<FeaturedProduct[]>(() =>
    this.products()
      .slice(0, 4)
      .map((product) => ({
        ...product,
        category: this.categoryMap[product.reference] ?? 'Línea destacada'
      }))
  );

  navigateToProducts(): void {
    void this.router.navigate(['/productos']);
  }
}
