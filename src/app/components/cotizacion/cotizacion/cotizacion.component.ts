import { Component, OnInit } from '@angular/core';
import { BrouCotService } from 'src/app/services/broucot.service';
import { DivisaBrouModel } from 'src/app/services/models/divisabrou.model';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
})
export class CotizacionComponent {
  resultado = [];
  data = {
    base: '',
    timestamp: 0,
    rates: {
      ARS: { buy: 0, sell: 0 },
      BRL: { buy: 0, sell: 0 },
      EUR: { buy: 0, sell: 0 },
      USD: { buy: 0, sell: 0 },
    },
  };

  constructor(private service: BrouCotService) {
    this.getData();
  }

  headElements = ['Moneda', 'Compra', 'Venta'];

  getData() {
    this.service.getCotizacion().subscribe(eventos => {
      this.data = eventos;
    });
  }
}
