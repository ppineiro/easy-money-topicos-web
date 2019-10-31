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
  @Input() // <-----
  voluntadid: string;
  @Input() // <-----
  voluntad: string;
  @Input() // <-----
  usernombre: string;
  @Input() // <-----
  divisa: string;
  @Input() // <-----
  monto: number;
  @Input() // <-----
  reputacion: number;

  isInDashboard = false;
  data: VoluntadModel[] = [];
  numbers: Array<number>;

  constructor(
    private service: VoluntadesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // this.getData();

    this.numbers = Array(3).fill(4); // [4,4,4,4,4]

    this.activatedRoute.url.subscribe(res => {
      console.log(res.toString());
      if (res.toString().includes('dashboard')) {
        this.isInDashboard = true;
      }
    });
  }

  // getData() {
  //   this.service.getVoluntades().subscribe(eventos => {
  //     console.log(eventos);
  //     this.data = this.sustituirIntegracionesPorValores(eventos);
  //     console.log(this.data);
  //     return this.data;
  //   });
  // }

  // sustituirIntegracionesPorValores(array: VoluntadModel[]): any[] {
  //   const resultado = [];
  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];
  //     resultado.push(element);
  //     this.reputacion = element.usuario.promedioCalif;
  //     this.usernombre = element.usuario.nombre;
  //     if ((element.operacion = 1)) {
  //       this.header = 'COMPRO ' + element.divisa.codigoISO + element.monto;
  //     } else {
  //       this.header = 'VENDO ' + element.divisa.codigoISO + element.monto;
  //     }
  //   }
  //   return resultado;
  // }

  verVoluntad() {
    this.router.navigate(['/ficha-voluntad', this.voluntadid]);
  }
}
