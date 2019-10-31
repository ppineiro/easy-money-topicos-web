import { Component, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {
  constructor(
    private authService: AuthService,
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
  ) {
    super(service, {}, cd, router);
  }

  login(): void {
    console.log(this.authService);
    this.authService.login(this.user.email, this.user.password);
  }
}
