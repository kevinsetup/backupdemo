import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegridadLaboralComponent } from './integridad-laboral/integridad-laboral.component';
import { ServiciosComponent } from './servicios.component';


const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    children: [
      {
        path: 'integridad-laboral',
        component: IntegridadLaboralComponent,
      },
   
      { path: '', redirectTo: 'integridad-laboral', pathMatch: 'full' },
      { path: '**', redirectTo: 'integridad-laboral', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioslRoutingModule {}
