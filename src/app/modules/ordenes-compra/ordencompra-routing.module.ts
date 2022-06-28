import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ocComponent } from './oc/oc.component';
import { OrdenCompraComponent } from './ordencompra.component';
import { PreOrdenComponent } from './pre-ordenes-compra/preorden.component';


const routes: Routes = [
  {
    path: '',
    component: OrdenCompraComponent,
    children: [
      {
        path: 'oc',
        component: ocComponent,
      },
      {
        path: 'pre-orden',
        component: PreOrdenComponent,
      },
      { path: '', redirectTo: 'oc', pathMatch: 'full' },
      { path: '**', redirectTo: 'oc', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenCompraRoutingModule {}
