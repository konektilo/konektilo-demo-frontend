import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceOverviewPage } from './device-overview.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceOverviewPageRoutingModule {}
