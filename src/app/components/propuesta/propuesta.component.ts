import { VoluntadModel } from './../../services/models/voluntad.model';
import { VoluntadesService } from './../../services/voluntades.service';
import { DivisaBrouModel } from './../../services/models/divisabrou.model';
import { BrouCotService } from 'src/app/services/broucot.service';
import { TransaccionModel } from './../../services/models/transaccion.model';
import { TransaccionesService } from './../../services/transacciones.service';
import { PropuestaModel } from './../../services/models/propuesta.model';
import { PropuestasService } from './../../services/propuestas.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransaccionCreateModel } from 'src/app/services/models/transaccion.create.model';
import Swal from 'sweetalert2';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.scss'],
})
export class PropuestaComponent implements OnInit {
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
  propuesta: PropuestaModel;
  cotizacionBrou: number;
  voluntad: VoluntadModel;

  constructor(
    private router: Router,
    private transaccionService: TransaccionesService,
    private brouCotService: BrouCotService,
    private voluntadService: VoluntadesService,
    private propuestaService: PropuestasService,
    private notificacionesService: NotificacionesService,
  ) {}

  ngOnInit() {
    this.propuestaService.getPropuesta(this.propuestaid).subscribe(res => {
      this.propuesta = res;
    });
  }

  crearTransaccionModel(): TransaccionCreateModel {
    const transaccionNew: TransaccionCreateModel = {
      voluntad: this.voluntadid,
      propuesta: this.propuestaid,
      cotizacionBCU: this.cotizacionBrou,
      califUsuarioVoluntad: 0,
      califUsuarioPropuesta: 0,
    };
    return transaccionNew;
  }

  async getData() {
    this.voluntadService.getVoluntad(this.voluntadid).subscribe(eve => {
      this.voluntad = eve;
    });
    this.brouCotService.getCotizacion().subscribe(eventos => {
      if (this.voluntad.divisa.codigoISO === 'USD') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.USD.sell;
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.USD.buy;
          this.insertTransaccion();
        }
      }
      if (this.voluntad.divisa.codigoISO === 'ARS') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.ARS.sell;
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.ARS.buy;
          this.insertTransaccion();
        }
      }
      if (this.voluntad.divisa.codigoISO === 'BRL') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.BRL.sell;
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.BRL.buy;
          this.insertTransaccion();
        }
      }
      if (this.voluntad.divisa.codigoISO === 'EUR') {
        if (this.voluntad.operacion === 1) {
          this.cotizacionBrou = eventos.rates.EUR.sell;
          this.insertTransaccion();
        } else {
          this.cotizacionBrou = eventos.rates.EUR.buy;
          this.insertTransaccion();
        }
      }
    });
  }

  insertTransaccion() {
    this.transaccionService
      .insertTransaccion(this.crearTransaccionModel())
      .subscribe(resp => {
        let operacion: string;
        if (this.voluntad.operacion === 1) {
          operacion = 'COMPRA';
        } else {
          operacion = 'VENTA';
        }
        this.notificacionesService
          .notificarTransaccionVoluntad(
            this.voluntad.usuario.email,
            'Nueva transacción',
            `Se ha creado una nueva transacción.\n\nDivisa: ${this.voluntad.divisa.codigoISO} - ${this.voluntad.divisa.divisa}\n
            Operación: ${operacion}\n
            Monto: ${this.voluntad.monto}\n
            Cotización ofrecida: ${this.propuesta.cotizacionOf}\n\n
            Contactarse con ${this.propuesta.usuario.nombre} al e-mail ${this.propuesta.usuario.email}!\n\nSaludos,\nEasyMoney.`,
          )
          .subscribe(() => {
            this.notificacionesService
              .notificarTransaccionPropuesta(
                this.propuesta.usuario.email,
                'Nueva transacción',
                `Se ha creado una nueva transacción.\n\nDivisa: ${this.voluntad.divisa.codigoISO} - ${this.voluntad.divisa.divisa}\n
                Operación: ${operacion}\n
                Monto: ${this.voluntad.monto}\n
            Cotización ofrecida: ${this.propuesta.cotizacionOf}\n\n
            Contactarse con ${this.voluntad.usuario.nombre} al e-mail ${this.voluntad.usuario.email}!\n\nSaludos,\nEasyMoney.`,
              )
              .subscribe(() => {
                this.router.navigateByUrl('/transaccion/' + resp._id);
              });
          });
      });
  }

  rechazar() {
    this.propuestaService
      .deletePropuesta(this.propuestaid)
      .subscribe(res => window.location.reload());
  }

  aceptar() {
    this.getData()
      .then(res => {
        this.voluntadService
          .inactivateVoluntad(this.voluntadid)
          .subscribe(res => {
            Swal.fire({
              type: 'success',
              title: 'Nueva transacción!',
              showConfirmButton: true,
            });
          });
      })
      .catch(error => {});
  }
}
