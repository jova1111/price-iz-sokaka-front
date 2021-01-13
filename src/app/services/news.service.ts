import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { News } from '../model/News';
import { requestUrl } from '../constants/constants';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  public getAllNews() {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/news').subscribe(
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
      this.http.get(requestUrl() + '/news/' + id).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      );
    });
  }

  public save(news: News) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      this.http.post(requestUrl() + '/news', news, { headers: headers }).subscribe(
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
      this.http.delete(requestUrl() + '/news/' + id, { headers: headers} ).subscribe(
        success => {
          resolve('Успешно избрисано.');
        },
        error => {
          reject('Грешка приликом брисања.');
        }
      );
    });
  }

  public update(id, updatedNews: News) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      this.http.put(requestUrl() + '/news/' + id, updatedNews, { headers: headers}).subscribe(
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
