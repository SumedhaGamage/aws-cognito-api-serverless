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
    getHelloWorldApiUrl: "https://xxxx.execute-api.us-east-1.amazonaws.com/xxx/xxx" //Your api
  };
  getHelloWorld() {
    const httOptions = {
      headers: new HttpHeaders(
        { "Authorization": this.auth.getAccessToken() }
      )
    };
    return this.http.get(this.apis.getHelloWorldApiUrl, httOptions);
  }

}
