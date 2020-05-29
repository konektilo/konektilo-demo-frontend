import {Component, OnInit} from '@angular/core';
import {Device} from "../models/Device";
import {DeviceService} from "../services/device/device.service";

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.page.html',
  styleUrls: ['./device-overview.page.scss'],
})
export class DeviceOverviewPage implements OnInit {
  devices: Device[];

  constructor(public deviceService: DeviceService) {
    this.deviceService.getDevices().subscribe(devices => this.devices = devices);
  }

  ngOnInit() {
  }

}
