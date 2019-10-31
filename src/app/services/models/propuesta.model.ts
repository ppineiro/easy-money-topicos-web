import { UsuarioModel } from "./usuario.model";
import { VoluntadModel } from "./voluntad.model";

export class PropuestaModel {
  _id: string;
  usuario: UsuarioModel;
  voluntad: VoluntadModel;
  cotizacionOf: number;
  activo: boolean;
  _v: number;
}
