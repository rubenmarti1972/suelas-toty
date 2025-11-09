import { Component } from '@angular/core';
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
  template: `
    <section class="inventory">
      <header>
        <h1>Control de inventario</h1>
        <p>
          Zona exclusiva para administradores. Desde aquí se monitorean existencias, lotes, trazabilidad y
          planes de producción para satisfacer la demanda de los clientes.
        </p>
      </header>

      <div class="inventory__kpis">
        <article *ngFor="let kpi of kpis">
          <h2>{{ kpi.label }}</h2>
          <p class="inventory__value">{{ kpi.value }}</p>
          <span class="inventory__trend" [attr.data-trend]="kpi.trend">{{ trendLabel(kpi.trend) }}</span>
          <p class="inventory__description">{{ kpi.description }}</p>
        </article>
      </div>

      <section class="inventory__process">
        <h2>Procesos clave</h2>
        <ul>
          <li>Conciliación automática de inventario contra ventas y producción cada hora.</li>
          <li>Gestión de lotes con fechas de fabricación, proveedor y número de molde.</li>
          <li>Alertas de cumplimiento para pedidos críticos y compromisos con clientes estratégicos.</li>
        </ul>
      </section>
    </section>
  `,
  styles: [
    `
      .inventory {
        display: grid;
        gap: 2.5rem;
      }
      .inventory header h1 {
        margin: 0;
        color: #183153;
      }
      .inventory header p {
        margin: 0.75rem 0 0;
        max-width: 44rem;
        line-height: 1.65;
      }
      .inventory__kpis {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      .inventory__kpis article {
        background: #ffffff;
        border-radius: 1.25rem;
        padding: 1.75rem;
        box-shadow: 0 15px 35px rgba(15, 40, 70, 0.08);
        display: grid;
        gap: 0.5rem;
      }
      .inventory__value {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
        color: #12263a;
      }
      .inventory__trend {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        display: inline-flex;
        width: fit-content;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
      }
      .inventory__trend[data-trend='up'] {
        background: rgba(0, 171, 85, 0.12);
        color: #007b55;
      }
      .inventory__trend[data-trend='down'] {
        background: rgba(220, 38, 38, 0.12);
        color: #b4231a;
      }
      .inventory__trend[data-trend='flat'] {
        background: rgba(51, 101, 138, 0.12);
        color: #183153;
      }
      .inventory__description {
        margin: 0;
        line-height: 1.5;
        color: #4b5d6b;
      }
      .inventory__process {
        background: #f8fafc;
        border-radius: 1.5rem;
        padding: 2rem;
      }
      .inventory__process h2 {
        margin-top: 0;
      }
      .inventory__process ul {
        margin: 0;
        padding-left: 1.2rem;
        line-height: 1.7;
      }
    `
  ]
})
export class InventoryComponent {
  protected readonly kpis: InventoryKpi[] = [
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
  ];

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
