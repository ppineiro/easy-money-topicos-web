import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { VoluntadesService } from 'src/app/services/voluntades.service';
import { VoluntadCreateModel } from 'src/app/services/models/voluntad.create.model';
import { DivisasService } from 'src/app/services/divisas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'ingreso-voluntad',
  providers: [VoluntadesService, DivisasService, UsuariosService],
  styleUrls: ['./ingreso-voluntad.component.scss'],
  templateUrl: './ingreso-voluntad.component.html',
})
export class IngresoVoluntadComponent {
  divisa: string;
  monto: number;
  operacion: number;
  usuario: string;

  divisas = [];
  operaciones = [{ id: 1, nombre: 'Compra' }, { id: 2, nombre: 'Venta' }];
  usuarios = [];

  constructor(
    private voluntadesService: VoluntadesService,
    private divisasService: DivisasService,
    private usuariosService: UsuariosService,
  ) {
    this.getDivisas();
    this.getUsuarios();
    console.log(this.divisas);
    console.log(this.operaciones);
    console.log(this.usuarios);
  }

  crearVoluntadModel(): VoluntadCreateModel {
    const voluntad: VoluntadCreateModel = {
      divisa: this.divisa,
      monto: this.monto,
      operacion: this.operacion,
      usuario: this.usuario,
    };
    return voluntad;
  }

  insertVoluntad() {
    console.log(this.crearVoluntadModel());
    this.voluntadesService
      .insertVoluntad(this.crearVoluntadModel())
      .subscribe(resp => {
        this.monto = 0;
        this.divisa = '';
        this.operacion = 0;
        this.usuario = '';
        console.log(resp);
      });
  }

  getDivisas() {
    this.divisasService.getDivisas().subscribe(res => {
      for (const i of res) {
        const temp = new Object();
        temp['id'] = i._id;
        temp['codigoISO'] = i.codigoISO;
        temp['divisa'] = i.divisa;
        console.log(temp);
        this.divisas.push(temp);
      }
    });
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(res => {
      for (const i of res) {
        const temp = new Object();
        temp['id'] = i._id;
        temp['nombre'] = i.nombre;
        temp['email'] = i.email;
        this.usuarios.push(temp);
      }
    });
  }
}
