import { Component} from '@angular/core';
import { TransaccionModel } from '../../services/models/transaccion.model';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transacciones-lista',
  templateUrl: './transacciones-lista.component.html',
  styleUrls: ['./transacciones-lista.component.css'],
  providers: [TransaccionesService],
})
export class TransaccionesListaComponent {
  data: TransaccionModel[] = [];
  cotizacionBCU: Number;

  resultado= []

  constructor(private service: TransaccionesService) {
    this.getData();
   }

   getData() {
    this.service.getTransacciones().subscribe(eventos => {
      console.log(eventos);
      this.data = this.sustituirIntegracionesPorValores(eventos);
      console.log(this.data);
      return this.data;
    });
  }

    sustituirIntegracionesPorValores(array: TransaccionModel[]): any[] {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        this.resultado.push(element);
        this.resultado[index].cotizacionBCU = element.cotizacionBCU;
      }  
      return this.resultado;
    }
  }


