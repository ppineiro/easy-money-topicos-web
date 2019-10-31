import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PropuestaModel } from "./models/propuesta.model";
import { PropuestaCreateModel } from "./models/propuesta.create.model";

const API_URL = "http://localhost:8000/propuestas";

@Injectable({
  providedIn: "root"
})
export class PropuestasService {
  constructor(private http: HttpClient) {
    console.log("Service Listo");
  }

  getPropuestas(): Observable<PropuestaModel[]> {
    return this.http.get<PropuestaModel[]>(API_URL);
  }

  getPropuesta(id: string): Observable<PropuestaModel[]> {
    return this.http.get<PropuestaModel[]>(`${API_URL}/${id}`);
  }

  getPropuestasPorUsuario(usuario: string): Observable<PropuestaModel[]> {
    return this.http.get<PropuestaModel[]>(`${API_URL}/usuario/${usuario}`);
  }

  getPropuestasPorVoluntad(voluntad: string): Observable<PropuestaModel[]> {
    return this.http.get<PropuestaModel[]>(`${API_URL}/voluntad/${voluntad}`);
  }

  insertPropuesta(propuesta: PropuestaCreateModel): Observable<PropuestaModel> {
    return this.http.post<PropuestaModel>(API_URL, propuesta);
  }

  deletePropuesta(id: string): any {
    return this.http.delete(`${API_URL}/${id}`);
  }

  updatePropuesta(id: string, propuesta: PropuestaCreateModel): any {
    return this.http.patch(`${API_URL}/${id}`, propuesta);
  }
}
