import { Component, OnInit } from '@angular/core';
import {BrouCotService} from 'src/app/services/broucot.service';
import {DivisaBrouModel} from 'src/app/services/models/divisabrou.model';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent {
  resultado = [];
  data: DivisaBrouModel[] = [];
  
  constructor(private service: BrouCotService) {
    this.getData();
  }
 
  getData() {
    this.service.getCotizacion().subscribe(eventos => {
      console.log(eventos);
      this.data = this.sustituirIntegracionesPorValores(eventos);
    /*  console.log(this.data);*/
      return this.data;
    });
  }

  sustituirIntegracionesPorValores(array: DivisaBrouModel[]): any[] {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      this.resultado.push(element);
      this.resultado[index].monto = element.rates.ARS.buy;
      console.log(element);
      
    }
    return this.resultado;
  }
}
