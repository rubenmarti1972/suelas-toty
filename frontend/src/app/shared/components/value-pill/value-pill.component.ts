import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-value-pill',
  standalone: true,
  styleUrl: './value-pill.component.scss',
  template: `
    <span class="value-pill">{{ label }}</span>
  `
})
export class ValuePillComponent {
  @Input({ required: true }) label!: string;
}
