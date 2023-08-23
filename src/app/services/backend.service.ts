import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor( private http: HttpClient, private router: Router,) {}
      async makePostApiCall(endpoint: string, payload: any): Promise<any> {
        let url = `${environment.baseUrlAF}${endpoint}`;
        return await this.http.post(url, payload).toPromise();
      }
      async makeGetApiCall(endpoint: string, payload?: any): Promise<any> {
        let url = `${environment.baseUrlAF}${endpoint}`;
        return await this.http.get(url, payload).toPromise();
      }
    }