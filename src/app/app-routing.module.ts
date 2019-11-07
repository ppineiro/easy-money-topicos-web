import { IngresopropuestaComponent } from './components/ingreso-propuesta/ingreso-propuesta.component';
import { FichaVoluntadComponent } from './components/ficha-voluntad/ficha-voluntad.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoVoluntadComponent } from './components/ingreso-voluntad/ingreso-voluntad.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion/cotizacion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { ListaOfertasComponent } from './components/lista-ofertas/lista-ofertas.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { TransaccionesListaComponent } from './components/transacciones-lista/transacciones-lista.component';
import { MistransaccionesComponent } from './components/mistransacciones/mistransacciones.component';
import { MisVoluntadesComponent } from './components/mis-voluntades/mis-voluntades.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ingreso-voluntad',
    component: IngresoVoluntadComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mis-voluntades',
    component: MisVoluntadesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ficha-voluntad/:id',
    component: FichaVoluntadComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ingreso-propuesta/:id',
    component: IngresopropuestaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'transaccion/:id',
    component: TransaccionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'lista-ofertas',
    component: ListaOfertasComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'transaccion',
    component: TransaccionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mistransacciones',
    component: MistransaccionesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cotizacion',
    component: CotizacionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
