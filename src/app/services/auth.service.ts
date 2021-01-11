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
      email: user.email,
      password: user.password
    };

    return new Promise((resolve, reject) => {
      this.http.post('https://price-iz-sokaka.herokuapp.com/api/authenticate', data).subscribe(
        (response: any) => {
          this.authenticate(response.token, response.expires_in);
          resolve("Успешно улоговани!");
        },
        (error: HttpErrorResponse) => {
          reject('Нисте унели исправне податке!');
        });
    });
  }

  private authenticate(tokenStr: string, expDate: number) {
    let token = { value: tokenStr, expirationDate: Date.now() + expDate}
    localStorage.setItem('token', JSON.stringify(token));
  }

  public isAuthenticated(): boolean {
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
    let user = { email: 'rada@gmail.com', name: "biliciku", password: "biliciku95"}
    const headers: HttpHeaders = new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})
                                     .append('Content-Type', 'application/json');
    return this.http.post('https://price-iz-sokaka.herokuapp.com/api/user', user, { headers: headers } ).subscribe(
      (success) => {
        console.log(success);
      }, (error) => {
        console.error(error);
      }
    )
  }

}
