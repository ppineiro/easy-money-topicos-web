import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { VoluntadesService } from 'src/app/services/voluntades.service';
import { VoluntadCreateModel } from 'src/app/services/models/voluntad.create.model';
import { DivisasService } from 'src/app/services/divisas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-moneda',
  providers: [VoluntadesService, DivisasService, UsuariosService],
  styleUrls: ['./tipos-moneda.component.scss'],
  templateUrl: './tipos-moneda.component.html',
})
export class TiposMonedaComponent {
  divisa: string;
  monto: number;
  operacion: number;
  usuario: string;

  divisas = [];
  operaciones = [{ id: 1, nombre: 'Compra' }, { id: 2, nombre: 'Venta' }];

  constructor(
    private voluntadesService: VoluntadesService,
    private divisasService: DivisasService,
    private authService: AuthService,
  ) {
    this.getDivisas();
  }

  crearVoluntadModel(): VoluntadCreateModel {
    if (
      this.monto > 0 &&
      (this.operacion.toString() === '1' || this.operacion.toString() === '2')
    ) {
      console.log('entro');
      const voluntad: VoluntadCreateModel = {
        divisa: this.divisa,
        monto: this.monto,
        operacion: this.operacion,
        usuario: this.authService.getUsuarioActualId(),
      };
      return voluntad;
    } else {
      return null;
    }
  }

  insertVoluntad() {
    this.voluntadesService.insertVoluntad(this.crearVoluntadModel()).subscribe(
      resp => {
        Swal.fire({
          type: 'success',
          title: 'Ingreso correcto',
          showConfirmButton: true,
        });
        this.monto = 0;
        this.divisa = '';
        this.operacion = 0;
        console.log(resp);
      },
      err => {
        console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Error. Verifique los datos',
        });
      },
    );
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
}
