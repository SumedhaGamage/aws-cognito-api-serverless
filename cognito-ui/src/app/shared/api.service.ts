import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  apis = {
    getHelloWorld: " https://hv5r40mveh.execute-api.us-east-1.amazonaws.com/Prod/hello"
  };
  getHelloWorld() {
    console.log('in api serive');
    console.log(this.auth.getAccessToken());
    const httOptions = {
      headers: new HttpHeaders(
        { "Authorization": this.auth.getAccessToken() }
      )
    };
    return this.http.get(this.apis.getHelloWorld, httOptions);
  }

}
