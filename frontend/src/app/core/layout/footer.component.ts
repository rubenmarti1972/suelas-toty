import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly socials: SocialLink[] = [
    { label: 'Instagram', url: 'https://instagram.com/suelastoty', icon: 'assets/icons/instagram.svg' },
    { label: 'Facebook', url: 'https://facebook.com/suelastoty', icon: 'assets/icons/facebook.svg' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/suelastoty', icon: 'assets/icons/linkedin.svg' },
    { label: 'WhatsApp', url: 'https://wa.me/573000000000', icon: 'assets/icons/whatsapp.svg' }
  ];
}
