import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, InjectionToken } from '@angular/core';
import { ServiceDataHttpConfig } from '@backbase/foundation-ang/data-http';
import * as Data from './portal-content-data.interfaces';

export const PORTAL_CONTENT_DATA_CONFIG = new InjectionToken(
  'ServiceDataHttpConfig'
);
@Injectable({
  providedIn: 'root'
})
export class PortalContentDataService {
  constructor(
    private readonly http: HttpClient,
    @Inject(PORTAL_CONTENT_DATA_CONFIG)
    private readonly config: ServiceDataHttpConfig
  ) {}
  postPortalContentQueryRecord(
    body: any,
    headers: HttpHeaders = new HttpHeaders({})
  ): Observable<HttpResponse<any>> {
    const uri = `${this.config.apiRoot}/contentservices/api/content/query`;
    return this.http.request<any>('post', uri, {
      body,
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false
    });
  }
}
interface NormalizedHttpParameters {
  [k: string]: string | string[];
}
interface HttpParameters {
  [k: string]: string | string[] | undefined | number;
}
