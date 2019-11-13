import { VoluntadModel } from './../../services/models/voluntad.model';
import { VoluntadesService } from './../../services/voluntades.service';
import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { PropuestasService } from 'src/app/services/propuestas.service';
import { PropuestaCreateModel } from 'src/app/services/models/propuesta.create.model';
import { DivisasService } from 'src/app/services/divisas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-propuesta',
  providers: [PropuestasService, DivisasService, UsuariosService],
  styleUrls: ['./ingreso-propuesta.component.scss'],
  templateUrl: './ingreso-propuesta.component.html',
})
export class IngresopropuestaComponent {
  divisa: string;
  cotizacion: number;
  operacion: number;
  usuario: string;
  voluntadid: string;
  voluntad: VoluntadModel;

  divisas = [];

  constructor(
    private propuestasService: PropuestasService,
    private divisasService: DivisasService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private voluntadService: VoluntadesService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.voluntadid = params.id;
    });
    this.getdata();
  }

  crearpropuestaModel(): PropuestaCreateModel {
    const propuesta: PropuestaCreateModel = {
      voluntad: this.voluntadid,
      cotizacionOf: this.cotizacion,
      usuario: this.authService.getUsuarioActualId(),
    };
    return propuesta;
  }

  getdata() {
    {
      this.voluntadService.getVoluntad(this.voluntadid).subscribe(res => {
        this.voluntad = res;
        console.log(res);
      });
    }
  }

  insertPropuesta() {
    this.propuestasService
      .insertPropuesta(this.crearpropuestaModel())
      .subscribe(
        resp => {
          Swal.fire({
            type: 'success',
            title: 'Ingreso correcto',
            showConfirmButton: true,
          });
          this.router.navigate(['/dashboard']);
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
          this.router.navigate(['/dashboard']);
        },
      );
  }
}
