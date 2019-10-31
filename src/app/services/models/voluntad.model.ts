import { UsuarioModel } from './usuario.model';
import { DivisaModel } from './divisa.model';

export class VoluntadModel {
  _id: string;
  usuario: UsuarioModel;
  divisa: DivisaModel;
  monto: number;
  operacion: number;
  activo: boolean;
  _v: number;
}