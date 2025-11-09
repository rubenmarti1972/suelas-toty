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
        padding: 0.35rem 1.1rem;
        border-radius: 999px;
        background: rgba(51, 101, 138, 0.1);
        color: #183153;
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
