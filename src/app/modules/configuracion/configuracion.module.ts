import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DragComponent } from '../drag/drag.component';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { RouterModule } from '@angular/router';

import { DragModule } from '../drag/drag.module';
import { BrowserModule } from '@angular/platform-browser';
import { DragexportsModule } from 'src/app/dragexports.module';

@NgModule({
  declarations: [

    ConfiguracionComponent

  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    DragexportsModule


  

    
    
  ],
})
export class ConfiguracionModule {}
