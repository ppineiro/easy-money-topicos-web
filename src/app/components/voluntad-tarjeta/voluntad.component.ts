import { VoluntadModel } from '../../services/models/voluntad.model';
import { VoluntadesService } from '../../services/voluntades.service';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-voluntad',
  templateUrl: './voluntad.component.html',
  styleUrls: ['./voluntad.component.scss'],
})
export class VoluntadComponent {
  @Input()
  voluntadid: string;
  @Input()
  voluntad: string;
  @Input()
  usernombre: string;
  @Input()
  divisa: string;
  @Input()
  monto: number;
  @Input()
  reputacion: number;

  isInDashboard = false;
  data: VoluntadModel[] = [];
  stars: Array<number>;

  constructor(
    private service: VoluntadesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.stars = Array(this.reputacion).fill(4);

    this.activatedRoute.url.subscribe(res => {
      if (res.toString().includes('dashboard')) {
        this.isInDashboard = true;
      }
    });
  }

  verVoluntad() {
    this.router.navigate(['/ficha-voluntad', this.voluntadid]);
  }
  ingresarPropuesta() {
    this.router.navigate(['/ingreso-propuesta', this.voluntadid]);
  }
}
