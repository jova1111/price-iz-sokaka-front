import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { News } from '../model/News';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  public getAllNews() {
    return new Promise((resolve, reject) => {
      this.http.get('https://frozen-coast-28508.herokuapp.com/api/news').subscribe(
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
      this.http.get('https://frozen-coast-28508.herokuapp.com/api/news/' + id).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      )
    })
  }

  public save(news: News) {
    return new Promise((resolve, reject) => {
      let tokenStr = localStorage.getItem("token");
      let token = JSON.parse(tokenStr).value;
      let headers = new HttpHeaders({"Authorization": "Bearer " + token});
      this.http.post('https://frozen-coast-28508.herokuapp.com/api/news', news, {headers: headers}).subscribe(
        success => {
          resolve(success);
        },
        error => {
          console.log(error);
          alert(error);
          alert(error.message);
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
      this.http.delete('https://frozen-coast-28508.herokuapp.com/api/news/' + id).subscribe(
        success => {
          resolve('Успешно избрисано.');
        },
        error => {
          reject('Грешка приликом брисања.');
        }
      );
    });
  }

 }
