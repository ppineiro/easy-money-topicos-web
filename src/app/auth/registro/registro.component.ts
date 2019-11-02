import { Component, ChangeDetectorRef } from '@angular/core';
import { NbRegisterComponent, NbAuthService } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent extends NbRegisterComponent {
  constructor(
    private authService: AuthService,
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
  ) {
    super(service, {}, cd, router);
  }

  register(): void {
    this.authService.registro(
      this.user.fullName,
      this.user.email,
      this.user.password,
      this.user.location,
    );
  }
}
