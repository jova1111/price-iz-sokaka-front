import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requestUrl } from '../constants/constants';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  contact(content) {
    return new Promise((resolve, reject) => {
      this.http.post(requestUrl() + '/contact_message', { content: content }).subscribe(
          success => {
            resolve('Порука успешно послатa.');
          },
          error => {
            reject('Дошло је до грешке приликом слања поруке.');
          }
      );
    });
  }

}
