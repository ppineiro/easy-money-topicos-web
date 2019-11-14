import { VoluntadModel } from '../../services/models/voluntad.model';
import { VoluntadesService } from '../../services/voluntades.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-voluntades-lista',
  templateUrl: './voluntades-lista.component.html',
  providers: [VoluntadesService],
})
export class VoluntadesListaComponent {
  data: VoluntadModel[] = [];
  resultado = [];

  constructor(
    private service: VoluntadesService,
    private authService: AuthService,
  ) {
    this.getData();
  }

  getData() {
    this.service.getVoluntades().subscribe(eventos => {
      this.data = this.sustituirIntegracionesPorValores(eventos);
      return this.data;
    });
  }

  sustituirIntegracionesPorValores(array: VoluntadModel[]): any[] {
    for (const element of array) {
      if (
        element.usuario._id !== this.authService.getUsuarioActualId() &&
        element.activo
      ) {
        this.resultado.push(element);
        const largo = this.resultado.length;
        this.resultado[largo - 1].reputacion = this.promedio(
          element.usuario.calificaciones,
        );
        this.resultado[largo - 1].nombre = element.usuario.nombre;
        this.resultado[largo - 1].id = element._id;
        this.resultado[largo - 1].monto = element.monto;
        this.resultado[largo - 1].divisa = element.divisa.codigoISO;

        if (element.operacion === 1) {
          this.resultado[largo - 1].voluntad = 'COMPRO ';
        } else {
          this.resultado[largo - 1].voluntad = 'VENDO ';
        }
      }
    }
    return this.resultado;
  }

  promedio(array: Array<number>): number {
    if (array.length > 0) {
      let sum = 0;
      for (const i of array) {
        sum += i;
      }
      return sum / array.length;
    } else {
      return 0;
    }
  }
}
