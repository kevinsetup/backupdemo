import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  modal :boolean = false

  constructor() {}
  payData = {};
  ngOnInit(): void {}
  data =  [
    {
      codigo: "1",
      emision: "08/06/2022",
      entrega : 'frasicos',
      registro : 'FACTURA',
      observaciones : 'NINGUNA',
      total : '100',
      solicitante : 'CORPORACION EXCELLENT S.A.C',
      producto : 'Verficacion de Riesgo Gold',
      cantidad : 5,
      total_p : 5000
    },
    {
      codigo: "2",
      emision: "08/06/2022",
      entrega : 'frasicos',
      registro : 'NINGUNA',
      observaciones : 'F001-46882',
      total : '100',
      solicitante : 'CORPORACION EXCELLENT S.A.C',
      producto : 'Test de confiabilidad',
      cantidad : 5,
      total_p : 5000

      
    },
  
    

    
  ]
  pay(i :any){
    this.payData = this.data[i]
  }

}
