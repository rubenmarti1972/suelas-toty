import { Component } from '@angular/core';
import {
  COMPANY_MISSION,
  COMPANY_OBJECTIVES,
  COMPANY_VALUES,
  COMPANY_VISION
} from '../../core/data/company-info';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly objectives = COMPANY_OBJECTIVES;
  protected readonly mission = COMPANY_MISSION;
  protected readonly vision = COMPANY_VISION;
  protected readonly values = COMPANY_VALUES;
}
