import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdenCompraRoutingModule } from './ordencompra-routing.module';
import { ocComponent } from './oc/oc.component';
import { PreOrdenComponent } from './pre-ordenes-compra/preorden.component';
import { RouterModule } from '@angular/router';
import { OrdenCompraComponent } from './ordencompra.component';
@NgModule({
  declarations: [
    ocComponent,
    PreOrdenComponent,
    OrdenCompraComponent

  ],
  imports: [
    CommonModule,
    OrdenCompraRoutingModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule
  ],
})
export class OrdenCompraModule {}
