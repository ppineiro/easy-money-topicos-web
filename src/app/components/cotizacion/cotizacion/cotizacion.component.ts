import { Component, OnInit } from "@angular/core";
import { BrouCotService } from "src/app/services/broucot.service";
import { DivisaBrouModel } from "src/app/services/models/divisabrou.model";

@Component({
  selector: "app-cotizacion",
  templateUrl: "./cotizacion.component.html",
  styleUrls: ["./cotizacion.component.css"]
})
export class CotizacionComponent {
  resultado = [];
  data: DivisaBrouModel;

  constructor(private service: BrouCotService) {
    this.getData();
    console.log(this.data);
  }

  headElements = ['Moneda', 'Compra', 'Venta'];

  getData(): void {
    this.service.getCotizacion().subscribe(eventos => {
      console.log(eventos);
      this.data = eventos;
    });
  }
}
