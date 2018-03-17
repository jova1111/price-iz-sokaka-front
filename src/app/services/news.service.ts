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
    let tokenStr = localStorage.getItem("token");
    let token = JSON.parse(tokenStr).value;
    let headers = new HttpHeaders({"Authorization": "Bearer " + token});
    return new Promise((resolve, reject) => {
      this.http.post('https://frozen-coast-28508.herokuapp.com/api/news', news, {headers: headers}).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      )
    })
  }
 }
