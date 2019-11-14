import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransaccionModel } from './models/transaccion.model';
import { TransaccionCreateModel } from './models/transaccion.create.model';

const API_URL = 'https://easymoneyapi.azurewebsites.net/transacciones';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  constructor(private http: HttpClient) {}

  getTransacciones(): Observable<TransaccionModel[]> {
    return this.http.get<TransaccionModel[]>(API_URL);
  }

  getTransaccion(id: string): Observable<TransaccionModel> {
    return this.http.get<TransaccionModel>(`${API_URL}/${id}`);
  }

  getTransaccionesPorVoluntad(
    voluntad: string,
  ): Observable<TransaccionModel[]> {
    return this.http.get<TransaccionModel[]>(`${API_URL}/voluntad/${voluntad}`);
  }

  getTransaccionesPorPropuesta(
    propuesta: string,
  ): Observable<TransaccionModel[]> {
    return this.http.get<TransaccionModel[]>(
      `${API_URL}/propuesta/${propuesta}`,
    );
  }

  insertTransaccion(
    transaccion: TransaccionCreateModel,
  ): Observable<TransaccionModel> {
    return this.http.post<TransaccionModel>(API_URL, transaccion);
  }

  deleteTransaccion(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  updateTransaccion(
    id: string,
    transaccion: TransaccionCreateModel,
  ): Observable<any> {
    return this.http.patch(`${API_URL}/${id}`, transaccion);
  }

  updateCalificaciones(
    id: string,
    califVoluntad: number,
    califPropuesta: number,
  ): Observable<any> {
    return this.http.patch(`${API_URL}/${id}`, {
      califUsuarioVoluntad: califVoluntad,
      califUsuarioPropuesta: califPropuesta,
    });
  }
}
