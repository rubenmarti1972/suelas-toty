import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CustomerServiceComponent } from './features/customer-service/customer-service.component';
import { ContactComponent } from './features/contact/contact.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'Suelas Toty | Inicio' },
  { path: 'productos', component: ProductsComponent, title: 'Suelas Toty | Catálogo' },
  { path: 'servicio-al-cliente', component: CustomerServiceComponent, title: 'Suelas Toty | Servicio al cliente' },
  { path: 'contacto', component: ContactComponent, title: 'Suelas Toty | Contacto y redes sociales' },
  { path: 'inventario', component: InventoryComponent, title: 'Suelas Toty | Inventario (Administración)' },
  { path: 'admin', component: AdminDashboardComponent, title: 'Suelas Toty | Panel administrativo' },
  { path: '**', redirectTo: '' }
];
