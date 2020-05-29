import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceOverviewPageRoutingModule } from './device-overview-routing.module';

import { DeviceOverviewPage } from './device-overview.page';
import {DeviceCardComponent} from "../device-card/device-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceOverviewPageRoutingModule
  ],
  declarations: [DeviceOverviewPage, DeviceCardComponent]
})
export class DeviceOverviewPageModule {}
