import { Component, OnInit, Input } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';
import { AuthService } from '../../services/auth.service';
import { WeatherReportService } from '../../services/weather-report.service';

@Component({
  selector: 'app-weather-report-list',
  templateUrl: './weather-report-list.component.html',
  styleUrls: ['./weather-report-list.component.css']
})
export class WeatherReportListComponent implements OnInit {
  public isLogged: boolean;
  public isLoaded: boolean;
  public allWeatherReports: WeatherReport[] = [];

  constructor(private authService: AuthService, private weatherReportService: WeatherReportService) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
    this.weatherReportService.getWeekly()
      .then(responseWeatherReports => {
        for(let index in responseWeatherReports) {
          this.allWeatherReports.push(new WeatherReport(responseWeatherReports[index]));
        }
        this.isLoaded = true;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
