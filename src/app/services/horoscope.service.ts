import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Horoscope } from '../model/Horoscope';
import { requestUrl } from '../constants/constants';

@Injectable()
export class HoroscopeService {

  constructor(private http: HttpClient) {
  }

  public getAllHoroscopes() {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/horoscope').subscribe(
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
      this.http.get(requestUrl() + '/horoscope/active').subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error.message);
          }
        );
    });
  }

  public getById(id) {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/horoscope/' + id).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      );
    });
  }

  public save(horoscope: Horoscope) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
      this.http.post(requestUrl() + '/horoscope', horoscope, { headers: headers }).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      );
    });
  }

  public delete(id) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
      this.http.delete(requestUrl() + '/horoscope/' + id, { headers: headers }).subscribe(
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
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
      this.http.put(requestUrl() + '/horoscope/' + id, updatedHoroscope, { headers: headers }).subscribe(
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
