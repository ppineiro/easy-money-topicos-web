import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoluntadModel } from './models/voluntad.model';
import { VoluntadCreateModel } from './models/voluntad.create.model';

const API_URL = 'http://localhost:8000/voluntades';

@Injectable({
  providedIn: 'root',
})
export class VoluntadesService {
  constructor(private http: HttpClient) {
    console.log('Service Listo');
  }

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

  deleteVoluntad(id: string): any {
    return this.http.delete(`${API_URL}/${id}`);
  }

  updateVoluntad(id: string, voluntad: VoluntadCreateModel): any {
    return this.http.patch(`${API_URL}/${id}`, voluntad);
  }
}
