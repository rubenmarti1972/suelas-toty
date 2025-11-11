import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CustomerServiceComponent } from './features/customer-service/customer-service.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'Suelas Toty | Inicio' },
  { path: 'productos', component: ProductsComponent, title: 'Suelas Toty | Catálogo' },
  { path: 'quienes-somos', component: AboutComponent, title: 'Suelas Toty | Quiénes somos' },
  { path: 'checkout', component: CheckoutComponent, title: 'Suelas Toty | Finalizar Pedido' },
  { path: 'servicio-al-cliente', component: CustomerServiceComponent, title: 'Suelas Toty | Servicio al cliente' },
  { path: 'contacto', component: ContactComponent, title: 'Suelas Toty | Contacto y redes sociales' },
  { path: '**', redirectTo: '' }
];
