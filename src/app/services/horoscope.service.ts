import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Horoscope } from '../model/Horoscope';

@Injectable()
export class HoroscopeService {

  constructor(private http: HttpClient) {

  }

  public getAllHoroscopes() {
    return new Promise((resolve, reject) => {
      this.http.get('https://price-iz-sokaka.herokuapp.com/api/horoscope').subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error.message);
          }
        );
    });
  }

  public getActive() {
    return new Promise((resolve, reject) => {
      this.http.get('https://price-iz-sokaka.herokuapp.com/api/horoscope/active').subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error.message);
          }
        );
    })
  }

  public getById(id) {
    return new Promise((resolve, reject) => {
      this.http.get('https://price-iz-sokaka.herokuapp.com/api/horoscope/' + id).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      )
    })
  }

  public save(horoscope: Horoscope) {
    return new Promise((resolve, reject) => {
      let tokenStr = localStorage.getItem("token");
      let token = JSON.parse(tokenStr).value;
      let headers = new HttpHeaders({"Authorization": "Bearer " + token});
      this.http.post('https://price-iz-sokaka.herokuapp.com/api/horoscope', horoscope, {headers: headers}).subscribe(
        success => {
          resolve(success);
        },
        error => {
          console.log(error);
          reject(error.message);
        }
      )
    });
  }

  public delete(id) {
    return new Promise((resolve, reject) => {
      let tokenStr = localStorage.getItem("token");
      let token = JSON.parse(tokenStr).value;
      let headers = new HttpHeaders({"Authorization": "Bearer " + token});
      this.http.delete('https://price-iz-sokaka.herokuapp.com/api/horoscope/' + id, { headers: headers} ).subscribe(
        success => {
          resolve('Успешно избрисано.');
        },
        error => {
          reject('Грешка приликом брисања.');
        }
      );
    });
  }

  public update(id, updatedHoroscope: Horoscope) {
    return new Promise((resolve, reject) => {
      let tokenStr = localStorage.getItem("token");
      let token = JSON.parse(tokenStr).value;
      let headers = new HttpHeaders({"Authorization": "Bearer " + token});
      this.http.put('https://price-iz-sokaka.herokuapp.com/api/horoscope/' + id, updatedHoroscope, { headers: headers}).subscribe(
        success => {
          resolve('Успешно измењено.');
        },
        error => {
          reject('Грешка приликом измене.');
        }
      );
    });
  }

}
