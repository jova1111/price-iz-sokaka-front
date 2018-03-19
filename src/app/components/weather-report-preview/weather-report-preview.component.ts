import { Component, OnInit, Input } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';
import { WeatherReportService } from '../../services/weather-report.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-weather-report-preview',
  templateUrl: './weather-report-preview.component.html',
  styleUrls: ['./weather-report-preview.component.css']
})
export class WeatherReportPreviewComponent implements OnInit {

  @Input()
  public weatherReport: WeatherReport;
  public isLogged: boolean;

  constructor(private authService: AuthService, private weatherReportService: WeatherReportService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

  public delete() {
    this.weatherReportService.delete(this.weatherReport.id)
      .then(success => {
        alert(success);
        this.router.navigate(['/weather_report']);
        window.location.reload(true);
      })
      .catch(error => {
        alert(error);
      })
  }

  public update() {
    this.router.navigate(['/edit_weather_report/' + this.weatherReport.id]);
  }
}
