import { VoluntadModel } from '../../services/models/voluntad.model';
import { VoluntadesService } from '../../services/voluntades.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluntades-lista',
  templateUrl: './voluntades-lista.component.html',
  providers: [VoluntadesService],
})
export class VoluntadesListaComponent {
  data: VoluntadModel[] = [];

  voluntad: string;
  usernombre: string;
  reputacion: number;
  divisa: string;
  monto: number;

  resultado = [];

  constructor(private service: VoluntadesService) {
    this.getData();
  }

  getData() {
    this.service.getVoluntades().subscribe(eventos => {
      console.log(eventos);
      this.data = this.sustituirIntegracionesPorValores(eventos);
      console.log(this.data);
      return this.data;
    });
  }

  sustituirIntegracionesPorValores(array: VoluntadModel[]): any[] {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      this.resultado.push(element);
      this.resultado[index].reputacion = element.usuario.promedioCalif;
      this.resultado[index].nombre = element.usuario.nombre;
      this.resultado[index].id = element._id;
      this.resultado[index].monto = element.monto;
      this.resultado[index].divisa = element.divisa.codigoISO;

      if (element.operacion === 1) {
        this.resultado[index].voluntad = 'COMPRO ';
      } else {
        this.resultado[index].voluntad = 'VENDO ';
      }
    }

    return this.resultado;
  }
}
