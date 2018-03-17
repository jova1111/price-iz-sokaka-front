import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: User) {
    var data = {
      client_id: '4',
      client_secret: 'g6S6CO3BhrgimfurXO5gjPgTk7ESJfGAFagy1NZv',
      grant_type: 'password',
      username: user.email,
      password: user.password
    };
    return new Promise((resolve, reject)=> {
      this.http.post('https://frozen-coast-28508.herokuapp.com/oauth/token', data).subscribe(
        (response: any) => {
          console.log(response);
          this.authenticate(response.access_token, response.expires_in);
          resolve("Successfully logged in!");
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          reject('Нисте унели исправне податке!');
        });
    });
  }

  private authenticate(tokenStr: string, expDate: number) {
    let token = { value: tokenStr, expirationDate: Date.now() + expDate}
    localStorage.setItem('token', JSON.stringify(token));
  }

  public isAuthenticated():boolean {
    let tokenJson = localStorage.getItem('token');
    if (!tokenJson) {
      return false;
    }
    let token = JSON.parse(tokenJson);
    if(Date.now() > token.expirationDate) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

  public register() {
    let user = { email: 'joca95@gmail.com', name: "joca", password: "joca1995"}
    const headers: HttpHeaders = new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})
                                     .append('Content-Type', 'application/json');
    return this.http.post('https://frozen-coast-28508.herokuapp.com/api/user', user, { headers: headers } ).subscribe(
      (success) => {
        console.log(success)
      }, (error) => {
        console.error(error)
      }
    )
  }

}
