import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
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
//Fin de modulos para formato de fecha
//Directiva de minimo y máximos
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DragexportsModule } from '../../dragexports.module';

import { DateFilterPipe } from './date-filter.pipe';
import { PrevisualComponentComponent } from './previsual-component.component';


const exampleRoutes: Route[] = [
  {
      path     : '',
      component: PrevisualComponentComponent
  }
];
@NgModule({
  declarations: [
    PrevisualComponentComponent,
    DateFilterPipe
],
  imports: [
    NgbModule,
    RouterModule.forChild(exampleRoutes),
    CommonModule,
    FormsModule,
    QuillModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LeafletModule,
    DragexportsModule
  ]
})
export class PrevisualComponentModule { }
