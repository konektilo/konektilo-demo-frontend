import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {from, Subject} from "rxjs";
import {KonektiloSignalRResponse} from "../../models/KonektiloSignalRResponse";

@Injectable({
  providedIn: 'root'
})
export class KonektiloSignalRService {
  newData = new Subject<KonektiloSignalRResponse>();
  listenOnNewData = false;
  konektiloBaseUrl = 'ws://localhost';
  konektiloPort = '5000';
  apiVersion = 'v1';
  connection;


  constructor() {
  }

  connect() {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(this.konektiloBaseUrl + ':' + this.konektiloPort + '/ws/' + this.apiVersion,
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
      .build();

    return from(this.connection.start());
  }

  subscribe(opcUaServer: string, namespace: number, identifier: string) {
    if (this.connection.connectionState == signalR.HubConnectionState.Connected) {
      if (!this.listenOnNewData) {
        this.connection.on('Subscription', (nodeId, variableData, timestamp, variableStatusCode) => {
          const identifierMatchRes = nodeId.match(/;([isgb])=([\S,\s])+/);
          const identifier = identifierMatchRes[0].substring(3, identifierMatchRes[0].length);
          const namespaceMatchRes = nodeId.match(/ns=\d;/);
          const namespace = namespaceMatchRes[0].substring(3, namespaceMatchRes[0].length - 1);

          this.newData.next({
            identifier,
            namespace,
            variableData,
            timestamp,
            variableStatusCode
          });
        });
        this.listenOnNewData = true;
      }
      this.connection.send('Subscription', opcUaServer, namespace.toString(), identifier, null).then();
    } else {
      console.log('SignalR is disconnected!')
    }
  }

  getData() {
    return this.newData;
  }

  disconnect() {
    if (this.connection) {
      return from(this.connection.stop());
    }
  }
}
