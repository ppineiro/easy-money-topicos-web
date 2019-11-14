import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { BrouCotService } from 'src/app/services/broucot.service';
import { ActivatedRoute } from '@angular/router';
import { TransaccionModel } from 'src/app/services/models/transaccion.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-transaccion-tarjeta',
  templateUrl: './transaccion-tarjeta.component.html',
  styleUrls: ['./transaccion-tarjeta.component.css'],
})
export class TransaccionTarjetaComponent implements OnInit {
  @Input()
  fechaHora: Date;
  @Input()
  id: string;

  @Input()
  voluntadDivisa: string;
  @Input()
  voluntadDivisaDesc: string;
  @Input()
  voluntadMonto: number;
  @Input()
  voluntadOperacion: string;
  @Input()
  voluntadUsuario: string;
  @Input()
  voluntadUsuarioId: string;
  @Input()
  voluntadUsuarioCalif: number[];

  @Input()
  propuestaCotizOf: number;
  @Input()
  propuestaUsuario: string;
  @Input()
  propuestaUsuarioId: string;
  @Input()
  propuestaUsuarioCalif: number[];

  @Input()
  cotizacionBCU: number;
  @Input()
  califUsuarioVoluntad: number;
  @Input()
  califUsuarioPropuesta: number;
  @Input()
  cotizacion: number;
  @Input()
  ahorro: number;

  numbers: number[] = [];
  usuarioActualId: string;

  califUsuarioVoluntadBool = false;
  califUsuarioPropuestaBool = false;

  constructor(
    private authService: AuthService,
    private transaccionesService: TransaccionesService,
    private changeDetector: ChangeDetectorRef,
  ) {
    for (let n = 1; n <= 5; n++) {
      this.numbers.push(n);
    }
  }

  ngOnInit() {
    this.usuarioActualId = this.authService.getUsuarioActualId();
    if (this.voluntadUsuarioId === this.usuarioActualId) {
      this.califUsuarioVoluntadBool = true;
    } else if (this.propuestaUsuarioId === this.usuarioActualId) {
      this.califUsuarioPropuestaBool = true;
    }
  }

  calificar() {
    this.transaccionesService
      .updateCalificaciones(
        this.id,
        this.califUsuarioVoluntad,
        this.califUsuarioPropuesta,
      )
      .subscribe(() => {
        this.voluntadUsuarioCalif.push(this.califUsuarioVoluntad);
        this.authService
          .agregarCalificacion(
            this.voluntadUsuarioId,
            this.voluntadUsuarioCalif,
          )
          .subscribe(() => {
            this.propuestaUsuarioCalif.push(this.califUsuarioPropuesta);
            this.authService
              .agregarCalificacion(
                this.propuestaUsuarioId,
                this.propuestaUsuarioCalif,
              )
              .subscribe(() => {
                Swal.fire({
                  type: 'success',
                  title: 'Calificado!',
                  showConfirmButton: false,
                  timer: 1000,
                });
              });
          });
      });
  }
}
