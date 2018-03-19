import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WeatherReport } from '../model/WeatherReport';

@Injectable()
export class WeatherReportService {

  constructor(private http: HttpClient) { }

  public getAllWeatherReports() {
    return new Promise((resolve, reject) => {
      this.http.get('https://price-iz-sokaka.herokuapp.com/api/weather_report').subscribe(
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
      this.http.get('https://price-iz-sokaka.herokuapp.com/api/weather_report/' + id).subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      )
    });
  }

  public getWeekly() {
    return new Promise((resolve, reject) => {
      this.http.get('https://price-iz-sokaka.herokuapp.com/api/weather_report/weekly').subscribe(
        success => {
          resolve(success);
        },
        error => {
          reject(error.message);
        }
      )
    });
  }

  public save(weatherReport: WeatherReport) {
    return new Promise((resolve, reject) => {
      let tokenStr = localStorage.getItem("token");
      let token = JSON.parse(tokenStr).value;
      let headers = new HttpHeaders({"Authorization": "Bearer " + token});
      this.http.post('https://price-iz-sokaka.herokuapp.com/api/weather_report', weatherReport, {headers: headers}).subscribe(
        success => {
          resolve(success);
        },
        error => {
          console.log(error);
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
      this.http.delete('https://price-iz-sokaka.herokuapp.com/api/weather_report/' + id, { headers: headers} ).subscribe(
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
      let tokenStr = localStorage.getItem("token");
      let token = JSON.parse(tokenStr).value;
      let headers = new HttpHeaders({"Authorization": "Bearer " + token});
      this.http.put('https://price-iz-sokaka.herokuapp.com/api/weather_report/' + id, updatedWeatherReport, { headers: headers}).subscribe(
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
