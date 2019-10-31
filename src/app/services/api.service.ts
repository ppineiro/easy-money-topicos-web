import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    console.log('Service Listo');
  }

  getQuery(query: string) {
    const url = `http://localhost:8000/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQBwlKttm5fahFdJHjP0cKBwIXCcUhDxXY_uo0OmZ4_1UnDAIwkEUz328oWPO4thCeyl-X_zi17kLxHeXRVyyJ6dS-h1J1yC-FyAasqUW1FAfoZMPDio1i001-4zo2IxGoRWBc1fFtsUoMtTDbkdOWhjzp9ehDdz9O_9qg'
    });

    return this.http.get(url, { headers });
  }
}
