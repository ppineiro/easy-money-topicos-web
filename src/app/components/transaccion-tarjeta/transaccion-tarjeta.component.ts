import { Component, OnInit, Input } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { BrouCotService } from 'src/app/services/broucot.service';
import { ActivatedRoute } from '@angular/router';
import { TransaccionModel } from 'src/app/services/models/transaccion.model';

@Component({
  selector: 'app-transaccion-tarjeta',
  templateUrl: './transaccion-tarjeta.component.html',
  styleUrls: ['./transaccion-tarjeta.component.css'],
})
export class TransaccionTarjetaComponent {
  @Input()
  fechaHora: Date;
  @Input()
  voluntadid: string;
  @Input()
  propuestaid: string;
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

  constructor() {}
}
