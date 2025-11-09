import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface AdminModule {
  name: string;
  description: string;
  accessLevel: 'Restringido' | 'Lectura' | 'Total';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  protected readonly modules: AdminModule[] = [
    {
      name: 'Inventario avanzado',
      description: 'Gestión detallada de lotes, reservas, niveles mínimos y conciliación con ERP.',
      accessLevel: 'Total'
    },
    {
      name: 'Clientes y CRM',
      description: 'Control de cuentas estratégicas, historial de pedidos, KPIs de satisfacción y segmentación.',
      accessLevel: 'Restringido'
    },
    {
      name: 'Pagos y finanzas',
      description: 'Autorización de cobros, conciliación bancaria, devoluciones y reportes fiscales.',
      accessLevel: 'Restringido'
    },
    {
      name: 'Configuración del sistema',
      description: 'Administración de roles, parámetros operativos, pasarelas de pago y proveedores logísticos.',
      accessLevel: 'Total'
    }
  ];
}
