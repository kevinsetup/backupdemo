import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DragComponent } from './drag.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { QuillModule } from 'ngx-quill';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OwlDateTimeIntl,
} from 'ng-pick-datetime';
//Modulos para formato de Fecha
import { DatePipe } from '@angular/common';
import { DateFilterPipe } from './date-filter.pipe';
//Fin de modulos para formato de fecha
//Directiva de minimo y máximos
import { MinMaxDirective } from './min-max.directive';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { DragexportsModule } from '../../dragexports.module';
import { DragRoutingModule } from './drag-routing.module';

const exampleRoutes: Route[] = [
  {
      path     : '',
      component: DragComponent
  }
];

export class DefaultIntl extends OwlDateTimeIntl {
  //Para modificar los textos
  constructor() {
    super();
    this.getLang();
  }
  public getLang() {
    this.cancelBtnLabel = 'Cancelar';
    this.setBtnLabel = 'Ok';
  }
}
@NgModule({
  declarations: [
  DragComponent,
    DateFilterPipe,

],
imports     : [
    NgbModule,
    RouterModule.forChild(exampleRoutes),
    CommonModule,
    FormsModule,
    DragexportsModule,
    QuillModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LeafletModule,
    NgbTooltipModule,
    DragRoutingModule
   
],
providers: [{ provide: OwlDateTimeIntl, useClass: DefaultIntl }, DatePipe],
})
export class DragModule { }
