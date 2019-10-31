import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DivisaBrouModel } from "./models/divisabrou.model";

const API_URL = 'https://cotizaciones-brou.herokuapp.com/api/currency/latest';

@Injectable({
  providedIn: "root"
})
export class BrouCotService {
  constructor(private http: HttpClient) {
    console.log("Service Listo");
  }



  getCotizacion(): Observable<DivisaBrouModel[]> {
    return this.http.get<DivisaBrouModel[]>(API_URL);
  }



}
