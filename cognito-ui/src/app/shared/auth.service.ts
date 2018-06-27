import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { Observable } from "rxjs";

const userPoolData = {
  UserPoolId: 'us-east-1_uztDw1jl2',
  ClientId: '6493igsusdhakdqihcmlpcilg'
};

const userPool = new CognitoUserPool(userPoolData);
const accessToken: String;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cognitoUser: any;
  //accessToken: any;

  constructor() { }

  registerUser(email, password) {
    const attributeList: Array<any> = [];
    const emailAttribute = {
      Name: 'email',
      Value: email
    };

    attributeList.push(new CognitoUserAttribute(emailAttribute));
    //Using Observable to handle registration call
    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          if (result) {
            this.cognitoUser = result.user;
            observer.next(result);
            observer.complete();
          }
        }
      });
    });
  }


  authCodeConfirm(code) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };

    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(result);
          observer.complete();
        }
      });
    });
  }


  signIn(email, password) {
    const authData = {
      Username: email,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: function(result) {
          accessToken = result.getIdToken().getJwtToken();
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          observer.error(err);
        }
      });
    });
  }

  isAuthenticate() {
    return userPool.getCurrentUser() != null;
  };

  logOut() {
    return Observable.create(observer => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.signOut();
      }
      this.cognitoUser = null;
      observer.next();
      observer.complete();
    });
  };

  getAccessToken() {
    return accessToken;
  };

}

// // Initialize the Amazon Cognito credentials provider
// CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
//     getApplicationContext(),
//     "us-east-1:44ca1aa3-a52b-4609-b6f3-31ff9241411c", // Identity pool ID
//     Regions.US_EAST_1 // Region
// );
