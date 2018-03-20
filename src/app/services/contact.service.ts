import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  contact(content) {
    return new Promise((resolve, reject) => {
      this.http.post('http://127.0.0.1:8000/api/contact_message', { content: content }).subscribe(
          success => {
            resolve('Порука успешно послатa.');
          },
          error => {
            console.log(error)
            reject('Дошло је до грешке приликом слања поруке.');
          }
      );
    });
  } 

}
