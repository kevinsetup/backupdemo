import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosComponent } from './servicios.component';
import { IntegridadLaboralComponent } from './integridad-laboral/integridad-laboral.component';
import { RouterModule } from '@angular/router';
import { ServicioslRoutingModule } from './servicios-rouiting.module';
@NgModule({
  declarations: [
    
    IntegridadLaboralComponent,
    ServiciosComponent

  ],
  imports: [
    CommonModule,
    ServicioslRoutingModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule
  ],
})
export class ServiciosModule {}
