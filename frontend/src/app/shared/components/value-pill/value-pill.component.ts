import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-value-pill',
  standalone: true,
  templateUrl: './value-pill.component.html',
  styleUrl: './value-pill.component.scss'
})
export class ValuePillComponent {
  @Input({ required: true }) label!: string;
}
