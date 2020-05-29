import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {KonektiloResponse} from "../../models/KonektiloResponse";

@Injectable({
  providedIn: 'root'
})
export class KonektiloService {
  konektiloBaseUrl = 'http://localhost';
  konektiloPort = '5000';
  apiVersion = 'v1';

  constructor(public http: HttpClient) {
  }

  readNode(opcUaServer: string, namespace: number, identifier: string): Observable<KonektiloResponse> {
    return this.http.get<KonektiloResponse>(this.urlBuilder(opcUaServer, namespace, identifier));
  }

  private urlBuilder(opcUaServer: string, namespace: number, identifier: string): string {
    return this.konektiloBaseUrl + ':' + this.konektiloPort + '/api/' + this.apiVersion + '/server/' + opcUaServer +
      '/namespace/' + namespace.toString() + '/identifier/' + identifier;
  }
}
