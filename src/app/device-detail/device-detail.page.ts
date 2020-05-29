import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../services/device/device.service";
import {Device} from "../models/Device";
import {KonektiloResponse} from "../models/KonektiloResponse";
import {KonektiloService} from "../services/konektilo/konektilo.service";

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage implements OnInit {
  device: Device;
  konektiloResponses: KonektiloResponse[] = [];

  constructor(public konektiloService: KonektiloService, private route: ActivatedRoute, public deviceService: DeviceService) {
    this.route.params.subscribe( params => {
      this.deviceService.getDevice(parseInt(params.id)).subscribe(device => {
        this.device = device;
        this.refreshOpcUaData();
      });
    });
  }

  ngOnInit() {
  }

  refreshOpcUaData() {
    this.konektiloResponses = [];
    this.device.nodes.forEach(node => {
      this.konektiloService.readNode(node.opcUaServer, node.namespace, node.identifier).subscribe(konektiloResponse => {
        this.konektiloResponses.push(konektiloResponse);
      })
    });
  }

}
