import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoluntadModel } from './models/voluntad.model';
import { VoluntadCreateModel } from './models/voluntad.create.model';

const API_URL = 'https://easymoneyapi.azurewebsites.net/voluntades';

@Injectable({
  providedIn: 'root',
})
export class VoluntadesService {
  constructor(private http: HttpClient) {}

  getVoluntades(): Observable<VoluntadModel[]> {
    return this.http.get<VoluntadModel[]>(API_URL);
  }

  getVoluntad(id: string): Observable<VoluntadModel> {
    return this.http.get<VoluntadModel>(`${API_URL}/${id}`);
  }

  getVoluntadesPorUsuario(usuario: string): Observable<VoluntadModel[]> {
    return this.http.get<VoluntadModel[]>(`${API_URL}/usuario/${usuario}`);
  }

  getVoluntadesPorDivisa(divisa: string): Observable<VoluntadModel[]> {
    return this.http.get<VoluntadModel[]>(`${API_URL}/propuesta/${divisa}`);
  }

  insertVoluntad(voluntad: VoluntadCreateModel): Observable<VoluntadModel> {
    return this.http.post<VoluntadModel>(API_URL, voluntad);
  }

  deleteVoluntad(id: string): Observable<HttpEvent<any>> {
    return this.http.delete<HttpEvent<any>>(`${API_URL}/${id}`);
  }

  updateVoluntad(
    id: string,
    voluntad: VoluntadCreateModel,
  ): Observable<HttpEvent<any>> {
    return this.http.patch<HttpEvent<any>>(`${API_URL}/${id}`, voluntad);
  }

  inactivateVoluntad(id: string): Observable<HttpEvent<any>> {
    return this.http.patch<HttpEvent<any>>(`${API_URL}/inactivate/${id}`, {});
  }
}
