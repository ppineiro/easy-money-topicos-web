import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  nombreUsuario: string;

  constructor(private authService: AuthService) {
    this.nombreUsuario = this.authService.getUsuarioActualNombre();
  }

  logout(): void {
    this.authService.logout();
  }
}
