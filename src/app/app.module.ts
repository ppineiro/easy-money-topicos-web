import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresoVoluntadComponent } from './components/ingreso-voluntad/ingreso-voluntad.component';
import { TiposMonedaComponent } from './components/tipos-moneda/tipos-moneda.component';
import { VoluntadComponent } from './components/voluntad-tarjeta/voluntad.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ListaOfertasComponent } from './components/lista-ofertas/lista-ofertas.component';

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbActionsModule,
  NbCardModule,
  NbMenuModule,
  NbInputModule,
  NbUserModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbSelectModule,
  NbIconModule,
  NbDialogModule,
  NbWindowModule,
  NbToastrModule,
  NbDialogService,
  NbListModule,
  NbContextMenuModule,
  NbContextMenuComponent,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VoluntadesListaComponent } from './components/voluntades-lista/voluntades-lista.component';
import { FichaVoluntadComponent } from './components/ficha-voluntad/ficha-voluntad.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion/cotizacion.component';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    IngresoVoluntadComponent,
    TiposMonedaComponent,
    VoluntadComponent,
    NavbarComponent,
    LoadingComponent,
    DashboardComponent,
    VoluntadesListaComponent,
    FichaVoluntadComponent,
    PropuestaComponent,
    TransaccionComponent,
    CotizacionComponent,
    ListaOfertasComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule, // import the module

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    NbLayoutModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbIconModule,
    NbCardModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    NbListModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          delay: 3000,
        }),
      ],
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: [],
      },
    }),
  ],

  providers: [NbDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
