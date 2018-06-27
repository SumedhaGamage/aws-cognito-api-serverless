import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  verificationCode: boolean = false;
  isError: boolean = false;
  error: String = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser(registerForm: NgForm) {
    const name = registerForm.value.fullName;
    const email = registerForm.value.email;
    const password = registerForm.value.password;
    this.auth.registerUser(email, password).subscribe(
      data => {
        this.verificationCode = true;
      },
      err => {
        this.isError = true;
        this.error = err.message;
      }
    );
  }

  loginUser(loginForm: NgForm) {

    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.auth.signIn(email, password).subscribe(
      data => {
        this.router.navigate(["welcome"]);
      },
      err => {
        this.isError = true;
        this.error = err.message;
      }
    );

  }

  verifyCode(verifyForm: NgForm) {
    this.auth.authCodeConfirm(verifyForm.value.code).subscribe(
      data => {
        this.verificationCode = false;
      },
      err => {
        this.isError = true;
        this.error = err.message;
      }
    );
  }

}
