import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ComercialRoutingModule } from './comercial-routing.module';
import { RouterModule } from '@angular/router';
import { ComercialComponent } from './comercial.component';
import { CarritoModule } from '../carrito/carrito.module';

@NgModule({
  declarations: [
    ComercialComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComercialRoutingModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule,
    CarritoModule

  ],
})
export class ComercialModule {}