import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-value-pill',
  standalone: true,
  template: `
    <span class="value-pill">{{ label }}</span>
  `,
  styles: [
    `
      .value-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.4rem 1.2rem;
        border-radius: 999px;
        background: linear-gradient(120deg, rgba(45, 212, 191, 0.25), rgba(14, 116, 144, 0.25));
        color: var(--color-primary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
    `
  ]
})
export class ValuePillComponent {
  @Input({ required: true }) label!: string;
}
