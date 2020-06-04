import {Injectable} from '@angular/core';
import {Device} from "../../models/Device";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  devices: Device[] = [
    {
      id: 1,
      name: 'konektilo Demo Machine',
      description: 'This is the konektilo demo machine',
      nodes: [
        {identifier: 'stringIdentStringVar', namespace: 3, opcUaServer: 'opcuatestserver'},
        {identifier: 1, namespace: 3, opcUaServer: 'opcuatestserver'},
      ]
    },
    {
      id: 2,
      name: 'CNC',
      description: 'CNC machine in Rosenheim',
      nodes: []
    },
    {
      id: 3,
      name: 'Third Machine',
      description: 'Description of third machine',
      nodes: []
    }
  ]

  constructor() {
  }

  getDevices(): Observable<Device[]> {
    return of(this.devices);
  }

  getDevice(id: number): Observable<Device> {
    let foundDevice = of(undefined);
    this.devices.forEach(device => {
      if (device.id === id) {
        foundDevice = of(device);
      }
    });
    return foundDevice;
  }
}
