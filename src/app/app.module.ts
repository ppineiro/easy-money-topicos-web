import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresoVoluntadComponent } from './components/ingreso-voluntad/ingreso-voluntad.component';
import { VoluntadComponent } from './components/voluntad-tarjeta/voluntad.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
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

@NgModule({
  declarations: [
    AppComponent,
    IngresoVoluntadComponent,
    VoluntadComponent,
    NavbarComponent,
    LoadingComponent,
    DashboardComponent,
    VoluntadesListaComponent,
    FichaVoluntadComponent,
    PropuestaComponent,
    TransaccionComponent,
  ],
  imports: [
    HttpClientModule, // import the module

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbInputModule,
    NbCardModule,
    NbLayoutModule,
    NbActionsModule,
    NbButtonModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbIconModule,
    NbCardModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    NbListModule,
  ],
  providers: [NbDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
