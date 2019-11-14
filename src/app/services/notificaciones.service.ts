import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://easymoneyapi.azurewebsites.net';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  constructor(private http: HttpClient) {}

  notificarTransaccionVoluntad(
    emailVoluntad: string,
    asunto: string,
    textoVoluntad: string,
  ): Observable<any> {
    return this.http.post<any>(`${API_URL}/notificarTransaccionVoluntad`, {
      asunto,
      emailVoluntad,
      textoVoluntad,
    });
  }

  notificarTransaccionPropuesta(
    emailPropuesta: string,
    asunto: string,
    textoPropuesta: string,
  ): Observable<any> {
    return this.http.post<any>(`${API_URL}/notificarTransaccionPropuesta`, {
      asunto,
      emailPropuesta,
      textoPropuesta,
    });
  }
}
