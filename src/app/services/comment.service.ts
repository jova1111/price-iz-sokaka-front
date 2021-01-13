import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestUrl } from '../constants/constants';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  public getComments(id, type) {
    return new Promise((resolve, reject) => {
      if (type === 'news') {
        this.http.get(requestUrl() + '/news/' + id + '/comments').subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      } else if (type === 'horoscope') {
        this.http.get(requestUrl() + '/horoscope/' + id + '/comments').subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      } else if (type === 'weather_report') {
        this.http.get(requestUrl() + '/weather_report/' + id + '/comments').subscribe(
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
      if (type === 'news') {
          this.http.post(requestUrl() + '/news/' + id + '/comments', { content: content }).subscribe(
          success => {
            resolve(success);
          },
          error => {
            reject(error.message);
          }
        );
      } else if (type === 'horoscope') {
        this.http.post(requestUrl() + '/horoscope/' + id + '/comments', { content: content }).subscribe(
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
