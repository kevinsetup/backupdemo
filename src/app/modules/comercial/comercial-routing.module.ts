import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComercialComponent } from './comercial.component';
import { PedidosComponent } from './pedidos/pedidos.component';


const routes: Routes = [
  {
    path: '',
    component: ComercialComponent,
    children: [
      {
        path: 'registro',
        component: PedidosComponent,
      },
  
      { path: '', redirectTo: 'registro', pathMatch: 'full' },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComercialRoutingModule {}
