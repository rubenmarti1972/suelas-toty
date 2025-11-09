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
        padding: 0.45rem 1.35rem;
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(45, 212, 191, 0.35), rgba(56, 189, 248, 0.35));
        color: var(--color-primary);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        box-shadow: 0 12px 24px rgba(45, 212, 191, 0.25);
      }
    `
  ]
})
export class ValuePillComponent {
  @Input({ required: true }) label!: string;
}
