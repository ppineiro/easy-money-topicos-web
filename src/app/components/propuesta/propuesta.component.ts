import { VoluntadModel } from './../../services/models/voluntad.model';
import { VoluntadesService } from './../../services/voluntades.service';
import { DivisaBrouModel } from './../../services/models/divisabrou.model';
import { BrouCotService } from 'src/app/services/broucot.service';
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
  cotizacionBrou: number;
  voluntad: VoluntadModel;

  constructor(
    private router: Router,
    private transaccionService: TransaccionesService,
    private brouCotService: BrouCotService,
    private voluntadService: VoluntadesService,
  ) {
    // console.log('cotizacion ' + this.cotizacionBrou);
  }

  crearTransaccionModel(): TransaccionCreateModel {
    const transaccionNew: TransaccionCreateModel = {
      voluntad: this.voluntadid,
      propuesta: this.propuestaid,
      cotizacionBCU: this.cotizacionBrou,
      califUsuarioVoluntad: 3,
      califUsuarioPropuesta: 4,
    };
    return transaccionNew;
  }

  async getData() {
    this.voluntadService.getVoluntad(this.voluntadid).subscribe(eve => {
      this.voluntad = eve;
      console.log('VOLUNTADD ' + this.voluntad.operacion);
    });
    this.brouCotService.getCotizacion().subscribe(eventos => {
      if (this.voluntad.operacion === 1) {
        this.cotizacionBrou = eventos.rates.USD.sell;
        console.log('VOLUTAD 1' + this.cotizacionBrou);
        this.insertTransaccion();
      } else {
        this.cotizacionBrou = eventos.rates.USD.buy;
        console.log('VOLUTAD 2' + this.cotizacionBrou);
        this.insertTransaccion();
      }
    });
  }

  insertTransaccion() {
    this.transaccionService
      .insertTransaccion(this.crearTransaccionModel())
      .subscribe(resp => {
        this.router.navigateByUrl('/transaccion/' + resp._id);
      });
  }

  rechazar() {}
  async aceptar() {
    await this.getData();
    console.log(this.crearTransaccionModel());
  }
}
