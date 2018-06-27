import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import { ApiService } from "../shared/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  message: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut().subscribe(
      data => {
        this.router.navigate(["register"]);
      },
      err => {
        console.log(err.message);
      }
    );
  };

  getHelloWorld() {
    console.log('In hello world');
    this.api.getHelloWorld().subscribe(
      data => {
        this.message = data.message;
        console.log(data);
      });
  };

}
