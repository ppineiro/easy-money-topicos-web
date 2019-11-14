import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropuestaModel } from './models/propuesta.model';
import { PropuestaCreateModel } from './models/propuesta.create.model';

const API_URL = 'https://easymoneyapi.azurewebsites.net/propuestas';

@Injectable({
  providedIn: 'root',
})
export class PropuestasService {
  constructor(private http: HttpClient) {}

  getPropuestas(): Observable<PropuestaModel[]> {
    return this.http.get<PropuestaModel[]>(API_URL);
  }

  getPropuesta(id: string): Observable<PropuestaModel> {
    return this.http.get<PropuestaModel>(`${API_URL}/${id}`);
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

  deletePropuesta(id: string): Observable<HttpEvent<any>> {
    return this.http.delete<HttpEvent<any>>(`${API_URL}/${id}`);
  }

  updatePropuesta(
    id: string,
    propuesta: PropuestaCreateModel,
  ): Observable<HttpEvent<any>> {
    return this.http.patch<HttpEvent<any>>(`${API_URL}/${id}`, propuesta);
  }
}
