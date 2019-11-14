import { BrouCotService } from 'src/app/services/broucot.service';
import { CotizacionComponent } from './../cotizacion/cotizacion/cotizacion.component';
import { TransaccionCreateModel } from './../../services/models/transaccion.create.model';
import { TransaccionModel } from './../../services/models/transaccion.model';
import { TransaccionesService } from './../../services/transacciones.service';
import { Component, OnInit, Input } from '@angular/core';
import { PropuestaComponent } from '../propuesta/propuesta.component';
import { PropuestaModel } from 'src/app/services/models/propuesta.model';
import { DivisasService } from 'src/app/services/divisas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VoluntadesService } from 'src/app/services/voluntades.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.scss'],
  providers: [VoluntadesService, DivisasService, UsuariosService],
})
export class TransaccionComponent {
  fechaHora: Date;
  voluntadid: string;
  propuestaid: string;
  cotizacionBCU: number;
  califUsuarioVoluntad: number;
  califUsuarioPropuesta: number;
  cotizacion: number;
  ahorro: number;

  constructor(
    private transaccionService: TransaccionesService,
    private cotizacionservice: BrouCotService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.transaccionService.getTransaccion(params.id).subscribe(res => {
        const transaccion: TransaccionModel = res;
        this.voluntadid = transaccion.voluntad.usuario.nombre;
        this.propuestaid = transaccion.propuesta.usuario.nombre;
        this.fechaHora = transaccion.fechaHora;
        this.cotizacionBCU = transaccion.cotizacionBCU;
        this.cotizacion = transaccion.propuesta.cotizacionOf;
        this.califUsuarioVoluntad = transaccion.califUsuarioVoluntad;
        this.califUsuarioPropuesta = transaccion.califUsuarioPropuesta;
        this.ahorro = Math.floor(
          (transaccion.cotizacionBCU - transaccion.propuesta.cotizacionOf) *
            transaccion.voluntad.monto,
        );
      });
    });
  }

  getData() {
    this.cotizacionservice.getCotizacion().subscribe(eventos => {
      let rates = eventos['rates'];
      let peso = rates[0];
    });
  }
}
