import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="contact">
      <header>
        <h1>Conecta con nuestro equipo</h1>
        <p>
          Agenda una asesoría personalizada, solicita información detallada o comparte tus requerimientos
          técnicos. Estamos listos para acompañar tus próximos lanzamientos.
        </p>
      </header>

      <div class="contact__grid">
        <form class="contact__form" aria-label="Formulario de contacto">
          <label>
            Nombre completo
            <input type="text" placeholder="Tu nombre" required />
          </label>
          <label>
            Empresa / Marca
            <input type="text" placeholder="Nombre de la empresa" required />
          </label>
          <label>
            Correo electrónico
            <input type="email" placeholder="tu@empresa.com" required />
          </label>
          <label>
            Mensaje
            <textarea rows="5" placeholder="Cuéntanos sobre tu proyecto" required></textarea>
          </label>
          <button type="submit">Enviar mensaje</button>
        </form>

        <section class="contact__cards">
          <article>
            <h2>Canales directos</h2>
            <ul>
              <li>Ventas nacionales: ventas@suelastoty.com</li>
              <li>Exportaciones: export@suelastoty.com</li>
              <li>Soporte técnico: soporte@suelastoty.com</li>
            </ul>
          </article>
          <article>
            <h2>Redes sociales</h2>
            <ul>
              <li>Instagram · @suelastoty</li>
              <li>LinkedIn · Suelas Toty</li>
              <li>Facebook · /suelastoty</li>
            </ul>
          </article>
          <article>
            <h2>Horarios</h2>
            <p>Lunes a viernes, 8:00 a.m. – 6:00 p.m. (GMT-5)</p>
            <p>Sábados, 9:00 a.m. – 1:00 p.m.</p>
          </article>
        </section>
      </div>
    </section>
  `,
  styles: [
    `
      .contact {
        display: grid;
        gap: 2.5rem;
      }
      .contact header h1 {
        margin: 0;
        color: #183153;
      }
      .contact header p {
        margin: 0.75rem 0 0;
        max-width: 40rem;
        line-height: 1.6;
      }
      .contact__grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        align-items: start;
      }
      .contact__form {
        display: grid;
        gap: 1rem;
        background: #ffffff;
        border-radius: 1.5rem;
        padding: 2rem;
        box-shadow: 0 15px 45px rgba(15, 40, 70, 0.08);
      }
      .contact__form label {
        display: grid;
        gap: 0.5rem;
        font-weight: 600;
      }
      .contact__form input,
      .contact__form textarea {
        border: 1px solid rgba(24, 49, 83, 0.15);
        border-radius: 0.75rem;
        padding: 0.75rem 1rem;
        font-family: inherit;
        font-size: 1rem;
      }
      .contact__form input:focus,
      .contact__form textarea:focus {
        outline: 2px solid rgba(24, 49, 83, 0.25);
        outline-offset: 1px;
      }
      .contact__form button {
        margin-top: 0.5rem;
        background: #33658a;
        color: #ffffff;
        border: none;
        border-radius: 0.75rem;
        padding: 0.9rem 1.4rem;
        font-weight: 600;
        cursor: pointer;
      }
      .contact__cards {
        display: grid;
        gap: 1.5rem;
      }
      .contact__cards article {
        background: #ffffff;
        border-radius: 1.25rem;
        padding: 1.75rem;
        box-shadow: 0 12px 35px rgba(15, 40, 70, 0.08);
      }
      .contact__cards h2 {
        margin-top: 0;
        color: #12263a;
      }
      .contact__cards ul {
        margin: 0;
        padding-left: 1rem;
        line-height: 1.7;
      }
    `
  ]
})
export class ContactComponent {}
