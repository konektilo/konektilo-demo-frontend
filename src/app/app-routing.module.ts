import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'device-overview',
    pathMatch: 'full'
  },
  {
    path: 'device-overview',
    loadChildren: () => import('./device-overview/device-overview.module').then( m => m.DeviceOverviewPageModule)
  },
  {
    path: 'device-detail/:id',
    loadChildren: () => import('./device-detail/device-detail.module').then( m => m.DeviceDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
