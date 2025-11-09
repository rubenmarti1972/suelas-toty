import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface ServiceChannel {
  title: string;
  description: string;
  responseTime: string;
  contact: string;
}

@Component({
  selector: 'app-customer-service',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-service.component.html',
  styleUrl: './customer-service.component.scss'
})
export class CustomerServiceComponent {
  protected readonly channels: ServiceChannel[] = [
    {
      title: 'Gestión comercial',
      description: 'Cotizaciones, acuerdos comerciales, soporte en especificaciones técnicas y estimación de tiempos de producción.',
      responseTime: 'Menos de 4 horas hábiles',
      contact: 'asesor@suelastoty.com'
    },
    {
      title: 'Soporte postventa',
      description: 'Acompañamiento en calidad, reclamaciones, logística inversa y seguimiento de indicadores de satisfacción.',
      responseTime: '24 horas hábiles',
      contact: 'postventa@suelastoty.com'
    },
    {
      title: 'Mesa técnica',
      description: 'Pruebas de laboratorio, documentación de materiales y desarrollo de nuevos moldes personalizados.',
      responseTime: '48 horas hábiles',
      contact: 'tecnica@suelastoty.com'
    }
  ];
}
