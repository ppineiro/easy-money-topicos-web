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
      console.log('VOLUNTAD ' + this.voluntad.operacion);
    });
    this.brouCotService.getCotizacion().subscribe(eventos => {
      if (this.voluntad.divisa.codigoISO == 'USD') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.USD.sell;
          console.log('VOLUNTAD 1' + this.cotizacionBrou);
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.USD.buy;
          console.log('VOLUNTAD 2' + this.cotizacionBrou);
          this.insertTransaccion();
        }
      }
      if (this.voluntad.divisa.codigoISO == 'ARS') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.ARS.sell;
          console.log('VOLUNTAD 1' + this.cotizacionBrou);
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.ARS.buy;
          console.log('VOLUNTAD 2' + this.cotizacionBrou);
          this.insertTransaccion();
        }
      }
      if (this.voluntad.divisa.codigoISO == 'BRL') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.BRL.sell;
          console.log('VOLUNTAD 1' + this.cotizacionBrou);
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.BRL.buy;
          console.log('VOLUNTAD 2' + this.cotizacionBrou);
          this.insertTransaccion();
        }
      }
      if (this.voluntad.divisa.codigoISO == 'EUR') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.EUR.sell;
          console.log('VOLUNTAD 1' + this.cotizacionBrou);
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.EUR.buy;
          console.log('VOLUNTAD 2' + this.cotizacionBrou);
          this.insertTransaccion();
        }
      }
    });
  }

  insertTransaccion() {
    this.transaccionService
      .insertTransaccion(this.crearTransaccionModel())
      .subscribe(resp => {
        this.voluntadService.inactivateVoluntad(this.voluntadid);
        this.router.navigateByUrl('/transaccion/' + resp._id);
      });
  }

  rechazar() {
    this.voluntadService.inactivateVoluntad(this.voluntadid);
    this.router.navigateByUrl('/dashboard');
  }
  async aceptar() {
    await this.getData();
    this.voluntadService.inactivateVoluntad(this.voluntadid);
    console.log(this.crearTransaccionModel());
  }
}
