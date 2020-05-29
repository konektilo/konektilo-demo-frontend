import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../services/device/device.service";
import {Device} from "../models/Device";
import {KonektiloResponse} from "../models/KonektiloResponse";
import {KonektiloService} from "../services/konektilo/konektilo.service";
import {KonektiloSignalRService} from "../services/konektilo-signalr/konektilo-signal-r.service";
import {KonektiloSignalRResponse} from "../models/KonektiloSignalRResponse";

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage implements OnInit, OnDestroy {
  autoModeMaxArrSize = 5
  refreshManually = true;
  manualRefreshDisabled = false;
  device: Device;
  konektiloResponses: KonektiloResponse[] = [];

  constructor(public konektiloService: KonektiloService,
              public konektiloSignalRService: KonektiloSignalRService,
              private route: ActivatedRoute,
              public deviceService: DeviceService) {
    this.route.params.subscribe(params => {
      this.deviceService.getDevice(parseInt(params.id)).subscribe(device => {
        this.device = device;
        this.refreshOpcUaData();
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  refreshOpcUaData() {
    this.konektiloResponses = [];
    this.device.nodes.forEach(node => {
      this.konektiloService.readNode(node.opcUaServer, node.namespace, node.identifier).subscribe(konektiloResponse => {
        this.konektiloResponses.push(konektiloResponse);
      })
    });
  }

  refreshManuallyToggled(event) {
    // We need this to stop firing an toggled event when we enter an page that is already initialized
    if (event.detail.checked === this.refreshManually) {
      return;
    }

    this.refreshManually = event.detail.checked;
    this.manualRefreshDisabled = !this.refreshManually;

    if (!this.refreshManually) {
      this.konektiloResponses = [];
      this.konektiloSignalRService.connect().subscribe(() => {
        this.konektiloSignalRService.getData().subscribe(signalRResponse => this.signalRResponse(signalRResponse));

        this.device.nodes.forEach(node => {
          this.konektiloSignalRService.subscribe(node.opcUaServer, node.namespace, node.identifier);
        });
      });
    } else {
      this.konektiloSignalRService.disconnect();
      this.refreshOpcUaData();
    }
  }

  signalRResponse(signalRResponse: KonektiloSignalRResponse) {
    this.konektiloResponses.unshift({
      description: undefined,
      messages: undefined,
      success: undefined,
      result: {
        variableDisplayname: signalRResponse.identifier,
        variableData: signalRResponse.variableData,
        variableType: undefined,
        variableStatusCode: signalRResponse.variableStatusCode,
        statusCode: {Code: undefined}
      }
    });

    if (this.konektiloResponses.length > this.autoModeMaxArrSize) {
      this.konektiloResponses.splice(this.autoModeMaxArrSize, this.konektiloResponses.length);
    }
  }

}
