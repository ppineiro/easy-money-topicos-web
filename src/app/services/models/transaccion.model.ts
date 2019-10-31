import { VoluntadModel } from './voluntad.model';
import { PropuestaModel } from './propuesta.model';

export class TransaccionModel {
  _id: string;
  voluntad: VoluntadModel;
  propuesta: PropuestaModel;
  fechaHora: Date;
  cotizacionBCU: number;
  califUsuarioVoluntad: number;
  califUsuarioPropuesta: number;
  _v: number;
}
