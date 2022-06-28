import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComercialRoutingModule } from '../comercial/comercial-routing.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CarritoRoutingModule } from './carrito-routing.module';



@NgModule({
  declarations: [
    CarritoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarritoRoutingModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule,
    
  ]
})
export class CarritoModule { }
