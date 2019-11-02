import { FichaVoluntadComponent } from './components/ficha-voluntad/ficha-voluntad.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoVoluntadComponent } from './components/ingreso-voluntad/ingreso-voluntad.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { ListaOfertasComponent } from './components/lista-ofertas/lista-ofertas.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ingreso-voluntad', component: IngresoVoluntadComponent },
  { path: 'ficha-voluntad/:id', component: FichaVoluntadComponent },
  { path: 'transaccion/:id', component: TransaccionComponent },
  { path: 'lista-ofertas', component: ListaOfertasComponent },
  { path: 'transaccion', component: TransaccionComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
