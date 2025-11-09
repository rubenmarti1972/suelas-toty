import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ValuePillComponent } from '../../shared/components/value-pill/value-pill.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, ValuePillComponent],
  template: `
    <section class="hero">
      <div>
        <p class="hero__eyebrow">Fabricamos confianza para la industria del calzado</p>
        <h1 class="hero__title">Suelas que elevan tu marca</h1>
        <p class="hero__copy">
          Diseñamos, producimos y distribuimos suelas de alta tecnología que garantizan resistencia,
          confort y estilo en cada colección.
        </p>
        <div class="hero__values">
          <app-value-pill *ngFor="let value of values" [label]="value"></app-value-pill>
        </div>
      </div>
      <div class="hero__card">
        <h2>Nuestra promesa</h2>
        <ul>
          <li>Respuestas rápidas y soporte personalizado</li>
          <li>Producción flexible y entregas puntuales</li>
          <li>Integridad en cada relación comercial</li>
        </ul>
      </div>
    </section>

    <section class="vision">
      <article>
        <h2>Misión</h2>
        <p>
          Brindar soluciones en suelas de calzado que potencien el crecimiento de nuestros clientes,
          combinando innovación, compromiso social y procesos sostenibles.
        </p>
      </article>
      <article>
        <h2>Visión</h2>
        <p>
          Ser la empresa líder en Latinoamérica en fabricación de suelas, reconocida por la excelencia,
          el servicio excepcional y la colaboración estratégica.
        </p>
      </article>
      <article>
        <h2>Objetivos estratégicos</h2>
        <ul>
          <li>Impulsar el desarrollo de materiales reciclables y de alto desempeño.</li>
          <li>Implementar analítica de datos para pronosticar demanda e inventarios.</li>
          <li>Fortalecer la red logística para exportar a nuevos mercados.</li>
        </ul>
      </article>
    </section>
  `,
  styles: [
    `
      .hero {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        align-items: center;
        margin-bottom: 4rem;
      }
      .hero__eyebrow {
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #33658a;
      }
      .hero__title {
        margin: 0.5rem 0;
        font-size: clamp(2rem, 5vw, 3.5rem);
        color: #12263a;
      }
      .hero__copy {
        max-width: 32rem;
        line-height: 1.7;
        font-size: 1.05rem;
      }
      .hero__values {
        margin-top: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .hero__card {
        background: #fff;
        padding: 2rem;
        border-radius: 1.25rem;
        box-shadow: 0 20px 60px rgba(15, 40, 70, 0.12);
      }
      .hero__card h2 {
        margin-top: 0;
        color: #183153;
      }
      .hero__card ul {
        padding-left: 1.2rem;
        line-height: 1.7;
        margin: 0;
      }
      .vision {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      .vision article {
        background: #ffffff;
        border-radius: 1rem;
        padding: 1.75rem;
        box-shadow: 0 10px 30px rgba(15, 40, 70, 0.08);
      }
      .vision h2 {
        margin-top: 0;
        color: #183153;
      }
      .vision ul {
        margin: 0;
        padding-left: 1.2rem;
        line-height: 1.6;
      }
    `
  ]
})
export class HomeComponent {
  protected readonly values = ['Calidad', 'Honestidad', 'Respeto', 'Servicio', 'Compromiso', 'Trabajo en equipo'];
}
