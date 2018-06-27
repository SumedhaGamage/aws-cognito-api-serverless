import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './shared/auth.service';
import { ApiService } from './shared/api.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "welcome", component: WelcomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot()
  ],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
