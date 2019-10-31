import { TransaccionModel } from './../../services/models/transaccion.model';
import { TransaccionesService } from './../../services/transacciones.service';
import { PropuestaModel } from './../../services/models/propuesta.model';
import { PropuestasService } from './../../services/propuestas.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TransaccionCreateModel } from 'src/app/services/models/transaccion.create.model';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.scss'],
})
export class PropuestaComponent {
  @Input()
  propuestaid: string;
  @Input()
  voluntadid: string;
  @Input() // <-----
  username: string;
  @Input() // <-----
  cotizacion: number;
  @Input() // <-----
  monto: number;
  transaccion: TransaccionModel;

  constructor(
    private router: Router,
    private transaccionService: TransaccionesService,
  ) {}

  crearTransaccionModel(): TransaccionCreateModel {
    const transaccionNew: TransaccionCreateModel = {
      voluntad: this.voluntadid,
      propuesta: this.propuestaid,
      cotizacionBCU: 32,
      califUsuarioVoluntad: 3,
      califUsuarioPropuesta: 4,
    };
    return transaccionNew;
  }

  insertTransaccion() {
    this.transaccionService
      .insertTransaccion(this.crearTransaccionModel())
      .subscribe(resp => {
        this.router.navigateByUrl('/transaccion/' + resp._id);
      });
  }
  rechazar() {}
  aceptar() {
    this.insertTransaccion();
  }
}
