import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  mouths : string[] = ['1','2','3','4','5','6','7','8','9','10','11','12']
  years : string[] = ['2022','2023','2024','2025','2026','2027','2028','2029']
  constructor() { }

  ngOnInit(): void {
  }

}
