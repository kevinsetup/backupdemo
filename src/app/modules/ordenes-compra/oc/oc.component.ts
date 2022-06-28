import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-oc',
  templateUrl: './oc.component.html',
})
export class ocComponent implements OnInit {
  modal : boolean = false;

  constructor() {}
  data =  [
    {
      codigo: "1",
      f_orden: "08/06/2022",
      usuario : 'frasicos',
      tipo_documento : 'FACTURA',
      nro_oc : 'F001-46882',
      ruc : '20601989108',
      razon_social : 'CORPORACION EXCELLENT S.A.C'

    },
    {
      codigo: "2",
      f_orden: "13/06/2022",
      usuario : 'frasicos',
      tipo_documento : 'FACTURA',
      nro_oc : 'F001-46882',
      ruc : '20522254771',
      razon_social : 'CORPORACION EXCELLENT S.A.C',
      
    },
  
    

    
  ]
  ngOnInit(): void {}

 
}
