import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'comercial/',
    loadChildren: () =>
      import('../modules/comercial/comercial.module').then((m) => m.ComercialModule),
  },
  {
    path: 'page/orden-compra',
    loadChildren: () =>
      import('../modules/ordenes-compra/ordecompra.module').then((m) => m.OrdenCompraModule),
  },
  {
    path: 'page/pedidos',
    loadChildren: () =>
      import('../modules/comercial/comercial.module').then((m) => m.ComercialModule),
  },
  {
    path: 'page',
    loadChildren: () =>
      import('../modules/carrito/carrito.module').then((m) => m.CarritoModule),
  },
  {
    path: 'page/cart',
    loadChildren: () =>
      import('../modules/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'page/servicios',
    loadChildren: () =>
      import('../modules/servicios/servicios.module').then((m) => m.ServiciosModule),
  },
  {
    path: 'page/configuracion',
    loadChildren: () =>
      import('../modules/configuracion/configuracion.module').then((m) => m.ConfiguracionModule),
  },


  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
