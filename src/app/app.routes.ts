import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CatalogComponent } from './pages/catalog/catalog';
import { AboutComponent } from './pages/about/about';
import { DetailComponent } from './pages/detail/detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: '' }
];
