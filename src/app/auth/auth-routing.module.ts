import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { OlvidoPasswordComponent } from './olvido-password/olvido-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'olvido-contrasena',
        component: OlvidoPasswordComponent,
      },
      {
        path: 'reseteo-contrasena',
        component: ResetPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
