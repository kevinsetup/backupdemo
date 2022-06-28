import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { DragComponent } from './drag/drag.component';



const routes: Routes = [
  {
    path: '',
    component: ConfiguracionComponent,
    children: [
      {
        path: 'questions',
        component: DragComponent,
      },
    
      { path: '', redirectTo: 'DragComponent', pathMatch: 'full' },
      { path: '**', redirectTo: 'oc', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}