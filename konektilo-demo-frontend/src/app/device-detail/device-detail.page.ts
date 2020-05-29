import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../services/device/device.service";
import {Device} from "../models/Device";

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage implements OnInit {
  device: Device;

  constructor(private route: ActivatedRoute, public deviceService: DeviceService) {
    this.route.params.subscribe( params => {
      this.deviceService.getDevice(parseInt(params.id)).subscribe(device => {
        this.device = device;
        console.log(device);
      });
    });
  }

  ngOnInit() {
  }

}
