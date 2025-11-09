import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';

interface InventoryKpi {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  description: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NgFor],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  // Usar signal para KPIs - permite actualizaciones reactivas
  protected readonly kpis = signal<InventoryKpi[]>([
    {
      label: 'Disponibilidad total',
      value: '1,125 pares',
      trend: 'up',
      description: 'Inventario asegurado para cubrir los próximos 45 días de demanda proyectada.'
    },
    {
      label: 'Órdenes pendientes',
      value: '18 pedidos',
      trend: 'flat',
      description: 'Pedidos en cola para despacho, priorizados por ventana de entrega y nivel de cliente.'
    },
    {
      label: 'Alertas activas',
      value: '5 referencias',
      trend: 'down',
      description: 'Reducción de alertas gracias a la sincronización con proveedores estratégicos.'
    }
  ]);

  protected trendLabel(trend: InventoryKpi['trend']): string {
    switch (trend) {
      case 'up':
        return 'Tendencia positiva';
      case 'down':
        return 'Requiere atención';
      default:
        return 'Estable';
    }
  }
}
