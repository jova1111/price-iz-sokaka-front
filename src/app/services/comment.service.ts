import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  public getComments(id, type) {
    return new Promise((resolve, reject) => {
      if (type == "news") {
        this.http.get('https://price-iz-sokaka.herokuapp.com/api/news/' + id + '/comments').subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      } else if (type == "horoscope") {
        this.http.get('https://price-iz-sokaka.herokuapp.com/api/horoscope/' + id + '/comments').subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      }  else if (type == "weather_report") {
        this.http.get('https://price-iz-sokaka.herokuapp.com/api/weather_report/' + id + '/comments').subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      }
    });
  }

  public add(id, type, content) {
    return new Promise((resolve, reject) => {
      if (type == "news") {
          this.http.post('http://127.0.0.1:8000/api/news/' + id + '/comments', { content: content }).subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      } else if (type == "horoscope") {
        this.http.post('http://127.0.0.1:8000/api/horoscope/' + id + '/comments', { content: content }).subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      }
    });
  }

}
