import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PropuestaModel } from 'src/app/services/models/propuesta.model';
import { PropuestasService } from 'src/app/services/propuestas.service';
import { VoluntadesService } from 'src/app/services/voluntades.service';
@Component({
  selector: 'app-ficha-voluntad',
  templateUrl: './ficha-voluntad.component.html',
  styleUrls: ['./ficha-voluntad.component.scss'],
})
export class FichaVoluntadComponent {
  voluntadid: string;
  voluntad: string;
  nombre: string;
  reputacion: number;
  divisa: string;
  monto: number;

  resultado = [];
  data: PropuestaModel[] = [];

  constructor(
    private propuestasService: PropuestasService,
    private voluntadesService: VoluntadesService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.voluntadesService.getVoluntad(params.id).subscribe(res => {
        const voluntad = res;
        console.log(res);
        this.voluntadid = voluntad._id;
        this.divisa = voluntad.divisa.codigoISO;
        this.monto = voluntad.monto;
        this.nombre = voluntad.usuario.nombre;
        this.reputacion = voluntad.usuario.promedioCalif;

        if (voluntad.operacion === 1) {
          this.voluntad = 'COMPRO ';
        } else {
          this.voluntad = 'VENDO ';
        }

        this.getData();
      });
    });
  }

  getData() {
    this.propuestasService
      .getPropuestasPorVoluntad(this.voluntadid)
      .subscribe(propuestas => {
        console.log(propuestas);
        this.data = this.sustituirIntegracionesPorValores(propuestas);
        console.log(this.data);
        return this.data;
      });
  }

  sustituirIntegracionesPorValores(array: PropuestaModel[]): any[] {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      this.resultado.push(element);
      this.resultado[index].propuestaid = element._id;
      this.resultado[index].voluntadid = element.voluntad._id;
      this.resultado[index].username = element.usuario.nombre;
      this.resultado[index].cotizacion = element.cotizacionOf;
      this.resultado[index].monto = this.monto;
    }
    return this.resultado;
  }
}
