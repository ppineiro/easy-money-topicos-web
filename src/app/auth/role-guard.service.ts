import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const perfilEsperado = route.data.perfilEsperado;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    // console.log(tokenPayload);
    if (
      !this.auth.estaAutenticado() ||
      tokenPayload.perfil !== perfilEsperado
    ) {
      this.router.navigate(['auth', 'login']);
      return false;
    }
    return true;
  }
}
