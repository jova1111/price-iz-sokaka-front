import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WeatherReport } from '../model/WeatherReport';
import { requestUrl } from '../constants/constants';

@Injectable()
export class WeatherReportService {

  constructor(private http: HttpClient) { }

  public getAllWeatherReports() {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/weather_report').subscribe(
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
      this.http.get(requestUrl() + '/weather_report/' + id).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      );
    });
  }

  public getWeekly() {
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl() + '/weather_report/weekly').subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      );
    });
  }

  public save(weatherReport: WeatherReport) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + token });
      this.http.post(requestUrl() + '/weather_report', weatherReport, { headers: headers }).subscribe(
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
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
      this.http.delete(requestUrl() + '/weather_report/' + id, { headers: headers }).subscribe(
        success => {
          resolve('Успешно избрисано.');
        },
        error => {
          reject('Грешка приликом брисања.');
        }
      );
    });
  }

  public update(id, updatedWeatherReport: WeatherReport) {
    return new Promise((resolve, reject) => {
      const tokenStr = localStorage.getItem('token');
      const token = JSON.parse(tokenStr).value;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      this.http.put(requestUrl() + '/weather_report/' + id, updatedWeatherReport, { headers: headers }).subscribe(
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
