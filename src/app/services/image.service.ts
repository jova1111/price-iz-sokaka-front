import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../model/Image';
import { requestUrl } from '../constants/constants';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/image').subscribe(
          (imagesResponse) => {
            const images = [];
            for (let index in imagesResponse) {
              if (imagesResponse.hasOwnProperty(index)) {
                images.push(new Image(imagesResponse[index]));
              }
            }
            resolve(images);
          },
          (error) => {
            reject(error.message);
          }
        );
    });
  }

  public save(image: Image) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      this.http.post(requestUrl() + '/image', image, { headers: headers }).subscribe(
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
      this.http.delete(requestUrl() + '/image/' + id, { headers: headers }).subscribe(
        success => {
          resolve('Успешно избрисано.');
        },
        error => {
          reject('Грешка приликом брисања.');
        }
      );
    });
  }

  public update(id, updatedImage: Image) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      this.http.put(requestUrl() + '/image/' + id, updatedImage, { headers: headers }).subscribe(
        success => {
          resolve('Успешно измењено.');
        },
        error => {
          reject('Грешка приликом измене.');
        }
      );
    });
  }

  public getById(id) {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/image/' + id).subscribe(
        success => {
          resolve(new Image(success));
        },
        error => {
          reject(error.message);
        }
      );
    });
  }
}
