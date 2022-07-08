import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { QuillModule } from 'ngx-quill';

//Modulos para formato de Fecha

//Fin de modulos para formato de fecha
//Directiva de minimo y máximos
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CameraComponentComponent } from './camera-component.component';
import { DragexportsModule } from 'src/app/dragexports.module';

@NgModule({
  declarations: [CameraComponentComponent],
  
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    QuillModule.forRoot(),
  
    LeafletModule,
    
    ReactiveFormsModule,
    DragexportsModule
  ]
})
export class CameraComponentModule { }
