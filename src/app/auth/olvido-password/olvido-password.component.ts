import { Component, ChangeDetectorRef } from '@angular/core';
import { NbRequestPasswordComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-olvido-password',
  templateUrl: './olvido-password.component.html',
})
export class OlvidoPasswordComponent extends NbRequestPasswordComponent {
  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private authService: AuthService,
  ) {
    super(service, {}, cd, router);
  }

  requestPass() {
    console.log(this.user.email);
    this.authService.olvidoPass(this.user.email);
  }
}
