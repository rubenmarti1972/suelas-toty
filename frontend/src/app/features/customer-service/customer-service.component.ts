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
  template: `
    <section class="service">
      <header class="service__header">
        <h1>Servicio al cliente 360°</h1>
        <p>
          Acompañamos a nuestros aliados comerciales antes, durante y después de cada pedido.
          Nuestro equipo multidisciplinario asegura respuestas ágiles y seguimiento proactivo.
        </p>
      </header>

      <div class="service__channels">
        <article class="service-card" *ngFor="let channel of channels">
          <h2>{{ channel.title }}</h2>
          <p>{{ channel.description }}</p>
          <div class="service-card__meta">
            <span>Tiempo de respuesta: {{ channel.responseTime }}</span>
            <span>Contacto: {{ channel.contact }}</span>
          </div>
        </article>
      </div>

      <section class="service__workflow">
        <h2>Workflow de atención</h2>
        <ol>
          <li>Recepción y clasificación automática de tickets por prioridad.</li>
          <li>Asignación al especialista según tipo de producto o servicio requerido.</li>
          <li>Seguimiento continuo con reportes compartidos y NPS por pedido.</li>
        </ol>
      </section>
    </section>
  `,
  styles: [
    `
      .service {
        display: grid;
        gap: 2.5rem;
      }
      .service__header h1 {
        margin: 0 0 0.5rem;
        color: #183153;
      }
      .service__header p {
        margin: 0;
        max-width: 42rem;
        line-height: 1.65;
      }
      .service__channels {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
      .service-card {
        background: #ffffff;
        border-radius: 1.25rem;
        padding: 1.75rem;
        box-shadow: 0 15px 35px rgba(15, 40, 70, 0.08);
        display: grid;
        gap: 0.75rem;
      }
      .service-card h2 {
        margin: 0;
        color: #12263a;
      }
      .service-card__meta {
        display: grid;
        gap: 0.25rem;
        font-weight: 600;
        color: #33658a;
      }
      .service__workflow {
        background: linear-gradient(135deg, rgba(24, 49, 83, 0.07), rgba(51, 101, 138, 0.15));
        border-radius: 1.5rem;
        padding: 2rem;
      }
      .service__workflow h2 {
        margin-top: 0;
      }
      .service__workflow ol {
        margin: 0;
        padding-left: 1.5rem;
        line-height: 1.7;
      }
    `
  ]
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
