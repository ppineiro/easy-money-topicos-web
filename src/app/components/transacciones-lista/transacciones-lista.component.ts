import { Component } from '@angular/core';
import { TransaccionModel } from '../../services/models/transaccion.model';
import { Router } from '@angular/router';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-transacciones-lista',
  templateUrl: './transacciones-lista.component.html',
  styleUrls: ['./transacciones-lista.component.css'],
  providers: [TransaccionesService],
})
export class TransaccionesListaComponent {
  data: TransaccionModel[] = [];
  usuarioId: string;
  ahorro: number;

  constructor(
    private authService: AuthService,
    private service: TransaccionesService,
  ) {
    this.usuarioId = this.authService.getUsuarioActualId();
    this.getData(this.usuarioId);
  }

  getData(usuarioId: string) {
    this.service.getTransacciones().subscribe(eventos => {
      console.log(eventos);
      this.data = this.filtrarUsuarioSustituirIntegValores(eventos, usuarioId);
      console.log(this.data);
      return this.data;
    });
  }

  filtrarUsuarioSustituirIntegValores(
    array: TransaccionModel[],
    usuarioId: string,
  ): any[] {
    const resultado = [];
    for (const transaccion of array) {
      if (
        transaccion.propuesta.usuario._id === usuarioId ||
        transaccion.voluntad.usuario._id === usuarioId
      ) {
        resultado.push(transaccion);
      }
      this.ahorro = Math.floor(
        (transaccion.cotizacionBCU - transaccion.propuesta.cotizacionOf) *
          transaccion.voluntad.monto,
      );
    }
    return resultado;
  }
}
